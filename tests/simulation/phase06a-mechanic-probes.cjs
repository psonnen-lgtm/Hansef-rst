// Characterise unchanged production rules. No full game, new rules or real storage writes.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),html=fs.readFileSync(process.env.HANSE_GAME,'utf8');
const clean=x=>JSON.parse(JSON.stringify(x)),checks=[];
function check(name,fn){const evidence=fn();checks.push({name,observedAsExpected:true,evidence});console.log('OBSERVED '+name)}
function standing(rank,rep,wealth){const g=create(42);g.eval(`s.rank=${rank};s.rep=${rep};s.gold+=${wealth}-netWorth();validate(s)`);return g}
function cargo(g,origin,n=12){g.eval(`ship().cargo={0:${n}};ship().costs={0:10};ship().bookCosts={0:10};ship().origins={0:[{city:${origin===null?'null':origin},n:${n}}]};s.markets[0][0].price=20;s.quests=[{city:0,j:0,n:6,reward:192,until:totalDay()+10}];validate(s)`)}
function sell(g,n){g.eval(`$('qty0').value=${n};trade(0,-1)`)}

check('existing rank names and rich respected merchant can gain every title without civic deeds',()=>{
 const g=standing(0,100,1000000);let draws=0;g.context.Math.random=()=>{draws++;return .99};const names=[g.eval('rank()')];
 for(let i=0;i<3;i++){g.eval('promote()');names.push(g.eval('rank()'))}
 assert.equal(g.eval('s.rank'),3);assert.equal(draws,1);g.eval('s.day+=10;promote()');names.push(g.eval('rank()'));assert.equal(g.eval('s.rank'),4);assert.equal(draws,2);
 assert.equal(g.eval('s.completed'),0);assert.equal(g.eval('s.visits'),1);assert.equal(g.eval('Object.hasOwn(s,"politics")'),false);
 return {names,electionDraws:draws,completed:0,visits:1,officeCityStored:false};
});
check('wealth alone allows Fernkaufmann but not Ratsherr without reputation',()=>{
 const g=standing(0,0,1000000);g.eval('promote();promote()');assert.equal(g.eval('s.rank'),1);return {wealth:1000000,rep:0,rank:1};
});
check('18 percent election boundary and ten-day cooldown are independent of deeds; UI omits cooldown disable',()=>{
 for(const [draw,expected] of [[.179999,2],[.18,3]]){const g=standing(2,100,1000000);g.context.Math.random=()=>draw;const now=g.eval('totalDay()');g.eval('promote()');assert.equal(g.eval('s.rank'),expected);assert.equal(g.eval('s.electionAvailableAt'),now+10);g.eval('promote()');assert.equal(g.eval('s.rank'),expected)}
 const g=standing(2,55,85000);g.eval('s.electionAvailableAt=totalDay()+10');let rendered='';g.context.openSheet=(title,body)=>rendered=body;g.load(html.split('\n').find(l=>l.startsWith('function hallView(')));g.eval('hallView()');assert(!rendered.match(/<button onclick="promote\(\)" disabled/));
 return {losesBelow:.18,winsAt:.18,cooldown:10,cooldownNotExplainedInButton:true};
});
check('ordinary arrival grants global reputation without cargo or civic service',()=>{
 const g=create(42),before=g.eval('totalDay()');g.eval('planTravel(1);arrive()');assert.equal(g.eval('s.rep'),1);assert.equal(g.eval('s.completed'),0);assert.equal(g.eval('s.city'),1);return {rep:1,actualAdvancedDays:g.eval('totalDay()')-before,emptyShip:true};
});
check('trade reputation is per sale and splitting the same profitable lot can increase it',()=>{
 const results=[];for(const batches of [[9],[3,3,3]]){const g=create(42);g.eval("s.markets[0][0].price=10;$('qty0').value=9;trade(0,1);s.markets[0][0].price=110");for(const n of batches)sell(g,n);results.push({batches,rep:g.eval('s.rep'),profit:g.events.filter(e=>e.type==='sell').reduce((a,e)=>a+e.profit,0),day:g.eval('totalDay()')})}
 assert.equal(results[0].rep,2);assert.equal(results[1].rep,3);assert.equal(results[0].profit,results[1].profit);assert.equal(results[0].day,results[1].day);return {fixturePricesArtificial:true,results};
});
check('donations buy global reputation with no elapsed time and retain at least one point',()=>{
 const g=standing(2,165,1000000),day=g.eval('totalDay()');g.eval('donate(50,2);donate(50,2)');assert.equal(g.eval('s.rep'),167);assert.equal(g.eval('totalDay()'),day);return {cost:100,gained:2,days:0,localEndorsement:false};
});
check('foreign delivery pays once; local unknown expired and separate partial sales do not satisfy an order',()=>{
 const results=[];for(const origin of [0,null,1]){const g=create(42);cargo(g,origin);sell(g,6);sell(g,6);const rewards=g.events.filter(e=>e.type==='quest_reward');assert.equal(rewards.length,origin===1?1:0);results.push({origin,rewards:rewards.length,eventKeys:rewards[0]?Object.keys(rewards[0]).sort():[]})}
 const expired=create(42);cargo(expired,1);expired.eval('s.quests[0].until=totalDay()-1');sell(expired,6);assert.equal(expired.eval('s.completed'),0);
 const partial=create(42);cargo(partial,1);sell(partial,3);sell(partial,3);assert.equal(partial.eval('s.completed'),0);
 return {results,expiredRewards:0,splitThreePlusThreeDoesNotAccumulate:true,stableQuestIdOrCityInHeadlessReward:false};
});
check('arrears are omitted by wealth and election; proposed separate political net stays invariant on repayment',()=>{
 const g=standing(2,55,85000);g.eval('s.year=1360;s.storage.rentals[0]={blocks:0,until:totalDay()+1,arrears:5000};validate(s)');const before=clean(g.eval('({worth:netWorth(),arrears:warehouseArrears(),credit:creditLimit()})'));
 g.context.Math.random=()=>.99;g.eval('promote()');assert.equal(g.eval('s.rank'),3);assert(g.eval('payWarehouseArrears()'));const after=clean(g.eval('({worth:netWorth(),arrears:warehouseArrears(),credit:creditLimit()})'));
 assert.equal(before.worth,85000);assert.equal(after.worth,80000);assert.equal(before.worth-before.arrears,after.worth-after.arrears);
 return {artificialValidArrearsFixture:true,before,after,promotionDespiteArrears:true,proposedPoliticalNet:80000,productionFormulaUnchanged:true};
});
check('construction book is prepaid capped and not liquid; existing credit formula includes it',()=>{
 const values=[];for(let type=0;type<3;type++){const g=create(42);g.eval(`s.gold=100000;SHIPBUILD_GOODS.forEach((j,k)=>{let n=SHIPBUILD_RECIPES[${type}].materials[k],w=s.warehouses[0];w.cargo[j]=n;w.costs[j]=GOODS[j][2];w.bookCosts[j]=GOODS[j][2];w.origins[j]=[{city:1,n}]});validate(s)`);const before=g.eval('netWorth()'),cash=g.eval('s.gold');assert(g.eval(`startShipbuilding(${type})`));const data=clean(g.eval('({cash:s.gold,worth:netWorth(),wip:shipyardWorth(),credit:creditLimit(),order:s.shipyard.orders[0]})'));assert(data.worth<=before);assert(data.wip<=g.eval(`SHIPTYPES[${type}].cost*.8`));assert.equal(cash-data.cash,data.order.wage);values.push({type,before,...data})}return values;
});
check('V10 roundtrip preserves rank rep finances FIFO quests chronicle harbor aid and open construction',()=>{
 const g=create(42);g.eval('s.gold=100000;SHIPBUILD_GOODS.forEach((j,k)=>{let n=SHIPBUILD_RECIPES[0].materials[k],w=s.warehouses[0];w.cargo[j]=n+1;w.costs[j]=GOODS[j][2];w.bookCosts[j]=GOODS[j][2];w.origins[j]=[{city:1,n:n+1}]});startShipbuilding(0);s.rank=3;s.rep=77.5;s.completed=4;s.bank=100.25;s.debt=77.75;s.flags.harborWorkUsed=true;s.quests=[{city:0,j:0,n:6,reward:192,until:totalDay()+10}];s.electionAvailableAt=totalDay()+10;validate(s)');
 const raw=g.eval('JSON.stringify(s)');g.context.saved=JSON.parse(raw);assert.deepEqual(clean(g.eval('migrate(saved)')),JSON.parse(raw));return {allFieldsExact:true,version:10,openOrder:true,legacyTitlesKept:true};
});
check('mayor eligibility is currently identical in Luebeck and Venlo; no office ownership field',()=>{
 const results=[];for(const city of [0,10]){const g=standing(2,55,85000);g.eval(`s.city=${city};ship().city=${city};validate(s)`);g.context.Math.random=()=>.99;g.eval('promote()');assert.equal(g.eval('s.rank'),3);results.push({city,rank:g.eval('s.rank'),keys:clean(g.eval('Object.keys(s).filter(k=>/mayor|office|politic|home/i.test(k))'))})}return results;
});
check('rank and rep are checked but completed and current election timestamp lack strict V10 validation',()=>{
 const g=create(42);assert(g.eval('(()=>{const x=JSON.parse(JSON.stringify(s));x.completed=-1;x.electionAvailableAt=-99;return !!migrate(x)})()'));
 assert.equal(g.eval('(()=>{const x=JSON.parse(JSON.stringify(s));x.rank=5;return migrate(x)})()'),null);
 return {knownValidationGap:true,negativeCompletedAndElectionTimestampAccepted:true,rankFiveRejected:true,noProductionFixAuthorized:true};
});
assert.equal(checks.length,12);assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify({kind:'characterisation_not_security_clearance_no_full_games',testedGameCommit:'b988a648f8750c5e7874f440613a42488dade750',gameSHA256:hash,probeCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),checks},null,2)+'\n',{flag:'wx'});
