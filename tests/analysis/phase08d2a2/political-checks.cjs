'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {create,clean,root,html,hash,Q}=require('./harness.cjs'),{attach}=require('./political-model.cjs'),R=Q.R,F=require('../../simulation/political-progress-fixtures.cjs'),out=process.argv[2],checks=[];
if(!out||fs.existsSync(out))throw Error('new output required');
function check(name,fn){const evidence=fn();checks.push({name,passed:true,evidence});console.log('PASS '+name)}
function fixture({origin=0,cost=8,quantity=90,gold=100000,price=110}={}){const g=create();g.eval(`s.gold=${gold};s.ships[0]=makeShip(2,{id:1,city:0});s.markets[0][0]={price:${price},stock:110};ship().cargo[0]=${quantity};ship().costs[0]=${cost===null?'null':cost};ship().bookCosts={0:${cost??8}};ship().origins={0:[{city:${origin===null?'null':origin},n:${quantity}}]};validate(s)`);g.resetAnchors();return g}
const equal=(a,b)=>assert.equal(R.cmp(a,b),0);
check('local sale/rebuy 90 9x10 and90x1 have no political wealth or reputation gains',()=>{
 const rows=[];for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){const g=fixture(),b=attach(g),before=b.worthExact(),gold=g.state().gold;for(const n of parts)assert(b.trade(0,n,-1));assert(b.trade(0,90,1));equal(b.worthExact(),before);assert.equal(g.state().rep,0);assert.equal(g.state().gold,gold);rows.push({parts:parts.length,safeWorth:R.number(b.worthExact()),financialWorth:g.eval('netWorth()'),rep:g.state().rep,actualCost:g.state().ships[0].costs[0]})}return rows;
});
check('buy then sell and repeated circles do not gain recognition',()=>{
 const g=fixture(),b=attach(g),before=b.worthExact();assert(b.trade(0,20,1));assert(b.trade(0,20,-1));for(let i=0;i<5;i++){assert(b.trade(0,90,-1));assert(b.trade(0,90,1))}equal(b.worthExact(),before);assert.equal(g.state().rep,0);return {circles:5,reverseOrder:true,politicalWorth:R.number(before)};
});
check('two ships warehouse and direct button callbacks share exact political accounting',()=>{
 const g=fixture();g.eval('s.ships.push(makeShip(0,{id:2,city:0}))');const b=attach(g),before=b.worthExact();assert(b.transfer(0,45,1));g.eval('s.active=1');assert(b.transfer(0,45,-1));
 g.eval("$('qty0').value=45;trade(0,-1)");assert(b.trade(0,45,1));assert(b.transfer(0,45,1));g.eval('s.active=0');assert(b.transfer(0,45,-1));assert(b.trade(0,90,-1));assert(b.trade(0,90,1));equal(b.worthExact(),before);assert.equal(g.state().rep,0);return {directTradeButton:true,twoShips:true,warehouse:true};
});
check('full analysis and political observer exports retain awards costs and worth',()=>{
 let g=fixture({origin:1}),b=attach(g);assert(b.trade(0,10,-1));const game=g.snapshot(),observer=b.snapshot(),worth=b.worthExact(),rep=g.state().rep;
 g=create(0,0,'precise',game);b=attach(g,observer);equal(b.worthExact(),worth);assert.equal(g.state().rep,rep);assert(b.trade(0,80,-1));return {restoredReputation:rep,finalReputation:g.state().rep,observerVersion:observer.version};
});
check('foreign genuine profits split neutrally but reveal a changed reputation rate',()=>{
 const rows=[];for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){const g=fixture({origin:1}),b=attach(g);let profit=0;for(const n of parts)profit+=b.trade(0,n,-1).profit;rows.push({parts:parts.length,profit,rep:g.state().rep,margin:b.snapshot().margin});assert(profit>0)}
 assert.equal(rows[0].rep,rows[1].rep);assert.equal(rows[1].rep,rows[2].rep);assert(rows[0].rep>2);return {WARNING:'cumulative rate differs from original per-click cap; policy decision required',rows};
});
check('honest old local profit is financially preserved but not fully credited politically',()=>{
 const g=fixture(),b=attach(g),before=b.worthExact(),oldFinancial=g.eval('netWorth()'),event=b.trade(0,90,-1);assert(event.profit>0);assert(g.eval('netWorth()')>oldFinancial);equal(b.worthExact(),before);assert.equal(g.state().rep,0);
 return {FAILED_ACCEPTANCE:'legitimate old local realized gain is not newly politically credited',actualProfit:event.profit,financialGain:g.eval('netWorth()')-oldFinancial,safeWorth:R.number(b.worthExact()),notReadyForProductiveUse:true};
});
check('real losses remain real and unknown legacy costs create no fictional recognition',()=>{
 const rows=[];for(const cost of [200,null]){const g=fixture({origin:1,cost}),b=attach(g),before=b.worthExact(),event=b.trade(0,90,-1);assert(cost===null?event.profit===null:event.profit<0);assert.equal(g.state().rep,0);assert(R.cmp(b.worthExact(),before)<=0);assert(b.trade(0,90,1));g.eval('validate(s)');rows.push({cost,profit:event.profit,rep:g.state().rep,worth:R.number(b.worthExact())})}return rows;
});
check('real transport market change and later repurchase are allowed without editing financial FIFO',()=>{
 const g=fixture({origin:0,price:16,quantity:20}),b=attach(g),before=b.worthExact();
 g.eval('planTravel(1,false);pending.resolved=true;pending.event=null;arrive();validate(s)');const transported=b.worthExact();const e=b.trade(0,20,-1);assert(e);assert(b.trade(0,20,1));assert.equal(g.state().ships[0].origins[0][0].city,1);
 const oldMarket=clean(g.state().markets[1][0]);g.eval('advance(1);validate(s)');assert(b.trade(0,20,-1));g.eval('validate(s)');return {realTrip:true,initialWorth:R.number(before),arrivalWorth:R.number(transported),realizedProfit:e.profit,marketBeforeDay:oldMarket,marketAfterDay:g.state().markets[1][0],rep:g.state().rep};
});
check('no unchanged-day reset of political protection',()=>{
 const g=fixture({price:9,quantity:30}),b=attach(g),before=b.worthExact();assert(b.trade(0,30,-1));assert(b.trade(0,30,1));
 // Pure unchanged economic callback preserves the same curve on a later date.
 const saved=g.snapshot(),a=saved.anchors[0][0],m=g.state().markets[0][0],updated=Q.update(a,m,m,a.day+1);assert.equal(a.n,updated.n);equal(b.worthExact(),before);assert.equal(g.state().rep,0);return {unchangedEconomicEpoch:true};
});
check('thresholds early rank mayor and elder do not accept local wash revaluation',()=>{
 const rows=[];for(const target of [18000,45000,180000]){const g=fixture();g.eval(`s.gold+=${target-1}-politicalWorth();s.rep=100;`);const b=attach(g),before=b.worthExact();assert(b.trade(0,90,-1));assert(g.eval('netWorth()')>=target);assert(R.cmp(b.worthExact(),R.rat(target))<0);
 if(target===18000){assert.equal(g.eval('promote()'),false);assert.equal(g.state().rank,0)}
 if(target===45000)assert(g.eval('mayorQuote().reasons.some(r=>r.includes("politisches Vermögen"))'));
 if(target===180000)assert(g.eval('hanseQuote().reasons.some(r=>r.includes("politisches Vermögen"))'));
 assert(b.trade(0,90,1));equal(b.worthExact(),before);rows.push({target,safeWorth:R.number(before),financialAfter:g.eval('netWorth()')})}return rows;
});
check('true foreign supply and quest rewards survive; local origins do not forge service',()=>{
 const rows=[];for(const foreign of [true,false]){const g=fixture({origin:foreign?1:0,quantity:6});g.eval("const job=politicalOffer('supply');s.politics.jobs=[job];for(const k of ['cargo','costs','bookCosts','origins']){ship()[k][job.good]=ship()[k][0];delete ship()[k][0]}s.quests=[{city:0,j:job.good,n:6,reward:100,until:totalDay()+5}];validate(s)");const good=g.state().politics.jobs[0].good,b=attach(g);assert(b.trade(good,6,-1));assert.equal(g.state().politics.records.length,foreign?1:0);assert.equal(g.state().completed,foreign?1:0);const n=g.events.filter(e=>e.type==='political_service').length;assert.equal(n,foreign?1:0);if(foreign)assert(g.state().rep>=4);rows.push({foreign,services:n,quests:g.state().completed,rep:g.state().rep})}return rows;
});
check('historical V11 mayor elder titles rules deeds and all game fields remain untouched at observer start',()=>{
 const rows=[];for(const legacy of [false,true])for(const kind of ['candidate','office','elder']){
 const raw=F.state(kind,legacy),g=create();g.context.historical=raw;g.eval('s=migrate(historical);validate(s)');g.resetAnchors();const state=clean(g.state()),financial=g.eval('politicalWorth()'),b=attach(g);
 assert.deepEqual(g.state(),state);assert.deepEqual(g.state().politics.rules,raw.politics.rules);assert.equal(g.state().rank,raw.rank);assert(Math.abs(R.number(b.worthExact())-financial)<1e-7);
 rows.push({kind,legacy,rules:state.politics.rules,rank:state.rank,records:state.politics.records.length,office:!!state.politics.office,elder:!!state.politics.elderman});
 }return {historicalStatesRead:6,noCareerRun:true,rows};
});
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify({phase:'0.8d.2a.2',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash:hash(html),checks,acceptance:{washAndSplitProtectionInFixtures:true,legitimateLocalRecognitionPreserved:false,reputationBalanceUnchanged:false,ready:false}},null,2)+'\n');console.log(checks.length+' political groups completed including explicit negative acceptance evidence');
