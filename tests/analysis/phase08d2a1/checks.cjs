'use strict';
// Bounded technical fixtures only; historical route arms are never executed here.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const H=require('./harness.cjs'),{PARAMETERS,getModel,root,html,hash,clean}=H;
const out=process.argv[2];if(!out)throw Error('new output JSON path required');if(fs.existsSync(out))throw Error('output exists');
const checks=[],allQuantities=[],allHulls=[];
let currentVariant;
function check(name,fn){const evidence=fn();checks.push({variant:currentVariant,name,passed:true,evidence});console.log('PASS '+currentVariant+' '+name)}
function close(a,b){assert(Math.abs(a-b)<1e-7,`${a} != ${b}`)}
for(const variant of Object.keys(PARAMETERS)) {
 currentVariant=variant;const Q=getModel(variant);
 const create=(seed=81001,city=0,model=variant,saved=null)=>H.create(seed,city,model,saved);
function fixture(model=variant,price=20,stock=240,gold=100000,type=2){const g=create(81001,0,model);g.eval(`s.gold=${gold};s.ships[0]={...makeShip(${type},{id:1,city:0})};s.markets[0][0]={price:${price},stock:${stock}};observe();validate(s);`);g.resetAnchors();return g}
function buyParts(parts,options={}){let g=fixture();for(const n of parts){assert(g.trade(0,n,1));if(options.reload)g=create(0,0,variant,g.snapshot());if(options.views)g.eval('informationBookPanel();tradeLetterPanel();harborGossip();observe()')}return g}
check('production HTML and all existing tracked files untouched; exact VM substitutions recorded',()=>{
 const b=execFileSync('git',['show','0c8db09056a7dd8e3881ba73684d244fcc3bc4fd:Hansefuerst_0_4.html'],{cwd:root,maxBuffer:100000000});assert.equal(hash(html),hash(b));
 const g=fixture();return {gameHash:hash(html),release:html.match(/const RELEASE='([^']+)'/)[1],saveVersion:g.eval('s.v'),substitutions:g.edits};
});
check('integer totals split neutral for 90, 9x10 and 90x1 buys including reload/views',()=>{
 const a=buyParts([90]),b=buyParts(Array(9).fill(10),{reload:true}),c=buyParts(Array(90).fill(1),{views:true});
 for(const g of [b,c]){assert.equal(g.state().gold,a.state().gold);assert.deepEqual(g.state().markets,a.state().markets);assert.deepEqual(g.state().ships[0].cargo,a.state().ships[0].cargo);close(g.state().ships[0].costs[0],a.state().ships[0].costs[0]);assert.deepEqual(g.state().ships[0].origins,a.state().ships[0].origins);assert.deepEqual(g.rng(),a.rng())}
 return {cost:100000-a.state().gold,stockAfter:a.state().markets[0][0].stock,costBasisWithin:1e-7};
});
check('sale 90, 9x10, 90x1 and both round-trip directions have exactly equal gold',()=>{
 const states=[];for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){let g=fixture();assert(g.trade(0,90,1));for(const n of parts)assert(g.trade(0,n,-1));assert.equal(g.state().gold,100000);assert.equal(g.state().markets[0][0].stock,240);states.push(g.state().gold)}
 const g=fixture();g.eval('ship().cargo[0]=90;ship().costs[0]=12;ship().bookCosts={0:12};ship().origins={0:[{city:1,n:90}]};');const initial=g.snapshot();assert(g.trade(0,90,-1));assert(g.trade(0,90,1));assert.equal(g.state().gold,initial.game.gold);assert.equal(g.state().markets[0][0].stock,240);return {roundTripGold:states,sellThenBuyGold:g.state().gold};
});
check('mathematical path additivity monotone edges floor ceiling and exact half-up rounding',()=>{
 let paths=0;for(const p of [4,5,8,9,16,31,56,110,1e9])for(const stock of [0,1,3,7,45,90,110,240,1000000000]){
  const a=Q.anchor(p,stock);for(const k of [1,2,10,110,240,10000,1e9]){const x=Q.edge(a,k);assert(Number.isSafeInteger(x)&&x>=4&&x<=1e9);if(k<1e9)assert(Q.edge(a,k+1)<=x)}
  if(stock>=90){const total=Q.quote(a,stock,90,1).total;let split=0;for(let i=0;i<90;i++)split+=Q.quote(a,stock-i,1,1).total;assert.equal(split,total);assert.equal(Q.quote(a,stock-90,90,-1).total,total);paths++}
 }
 // 5*(12100+110^2)/(12100+110^2) = exactly 5; half-up checked with independent rational bounds.
 for(let k=1;k<=240;k++){const a=Q.anchor(31,110),n=31n*(BigInt(Q.REFERENCE)**2n+12100n),d=BigInt(Q.REFERENCE)**2n+BigInt(k*k),v=Q.edge(a,k);assert(2n*BigInt(v)*d<=2n*n+d && 2n*BigInt(v)*d>2n*n-d)}
 assert.throws(()=>Q.anchor(NaN,10));assert.throws(()=>Q.anchor(3,10));assert.throws(()=>Q.quote(Q.anchor(20,1),1,2,1));assert.throws(()=>Q.quote(Q.anchor(20,1e9),1e9,1,-1));
 return {priceStockCombinations:81,additivePaths:paths,rationalRoundingChecks:240,legacyPriceBelow4:'explicitly unsupported, migration decision required'};
});
check('stock zero one three, fractional or insufficient gold, capacity and partial load bounded',()=>{
 for(const stock of [0,1,3]){const g=fixture(variant,4,stock,20,0),before=g.state();assert.equal(g.max(0),stock);assert.equal(g.trade(0,stock+1,1),null);assert.deepEqual(g.state(),before);if(stock)assert(g.trade(0,stock,1));assert(g.state().gold>=0);assert(g.state().markets[0][0].stock>=0);g.eval('validate(s)')}
 const g=fixture(variant,20,240,205.75,0),n=g.max(0);assert(g.quote(0,n,1).total<=205.75);assert(g.quote(0,n+1,1).total>205.75);assert.equal(g.trade(0,n+1,1),null);assert(g.trade(0,n,1));assert(g.state().gold>=0);
 const c=fixture(variant,20,240,100000,0);c.eval('ship().cargo[1]=50;ship().costs[1]=25;ship().origins={1:[{city:0,n:50}]};');assert.equal(c.max(0),5);assert.equal(c.trade(0,6,1),null);assert(c.trade(0,5,1));c.eval('validate(s)');return {lowStocks:[0,1,3],fractionalGold:205.75,buyable:n,remainingGold:g.state().gold,partialSchniggeFree:5};
});
check('no trade part may exceed money, stock or ship space even when all limits coincide',()=>{
 const g=fixture(variant,20,10,100,0),before=g.state();g.eval('ship().cargo[1]=53;ship().costs[1]=25;ship().origins={1:[{city:0,n:53}]};');const state=g.state();assert.equal(g.max(0),2);assert.equal(g.trade(0,3,1),null);assert.deepEqual(g.state(),state);assert(g.trade(0,2,1));assert.equal(g.max(0),0);assert.equal(g.trade(0,1,1),null);assert(g.state().gold>=0);g.eval('validate(s)');return {combinedLimits:true,executed:2,rejected:3};
});
check('own ships and warehouse movement share market path and preserve origins and costs',()=>{
 const bulk=buyParts([90]);const g=fixture();g.eval('s.ships.push(makeShip(0,{id:2,city:0}));');const rng=g.rng();assert(g.trade(0,45,1));const first=g.quote(0,45,1).total;assert(g.transfer(0,45,1));g.eval('s.active=1;');assert(g.trade(0,45,1));assert(g.transfer(0,45,1));assert.equal(g.state().gold,bulk.state().gold);assert.equal(g.state().warehouses[0].cargo[0],90);close(g.state().warehouses[0].costs[0],bulk.state().ships[0].costs[0]);assert.equal(g.state().warehouses[0].origins[0].reduce((s,l)=>s+l.n,0),90);assert.deepEqual(g.rng(),rng);const before=g.state().gold;g.eval('s.active=0;');assert(g.transfer(0,90,-1));assert(g.trade(0,90,-1));assert.equal(g.state().gold,100000);return {twoOwnShips:true,warehouseRoundTrip:true,next45Total:first,remainingCargo:0,originsAndWeightedCostPreserved:true};
});
check('existing mixed lots and unknown purchase cost preserve accounting semantics',()=>{
 for(const unknown of [false,true]){const g=fixture();g.eval(`ship().cargo[0]=20;ship().costs[0]=${unknown?'null':10};ship().bookCosts={0:10};ship().origins={0:[{city:1,n:7},{city:2,n:13}]};`);const cost=g.quote(0,10,1).total;assert(g.trade(0,10,1));assert.equal(g.state().ships[0].origins[0].length,3);if(unknown)assert.equal(g.state().ships[0].costs[0],null);else close(g.state().ships[0].costs[0],(200+cost)/30);const sale=g.trade(0,9,-1);if(unknown)assert.equal(sale.profit,null);else close(sale.profit,sale.total-9*(200+cost)/30);assert.deepEqual(g.state().ships[0].origins[0],[{city:2,n:11},{city:0,n:10}]);g.eval('validate(s)')}
 return {oldOriginsFIFO:true,oldKnownCostWeighted:true,unknownStaysUnknown:true};
});
check('same game seed, clocks, rules and random state repeat; quotes consume zero RNG',()=>{
 const states=[];for(const seed of [81001,81002,81003]){const a=create(seed),b=create(seed);assert.deepEqual(a.snapshot(),b.snapshot());const rng=a.rng();for(let i=0;i<30;i++)a.quote(0,1,1);assert.deepEqual(a.rng(),rng);a.eval('advance(1)');b.eval('advance(1)');assert.deepEqual(a.snapshot(),b.snapshot());states.push({seed,rng:a.rng(),stateHash:hash(JSON.stringify(a.snapshot()))})}return {oneDayRuleProbes:states,fullComparisonTrajectoriesNotRepeated:true};
});
check('with no trading all daily markets risks letters politics rates and next random are identical',()=>{
 const a=create(81002,0,'A'),b=create(81002,0,variant);for(const g of [a,b]){g.eval('s.bank=1000;s.debt=1000;planTravel(6,false);arrive();validate(s)')}
 assert.deepEqual(a.state(),b.state());assert.deepEqual(a.events,b.events);assert.deepEqual(a.rng(),b.rng());return {actualTrip:'Lübeck–Bergen',days:a.state().day-1,letterCount:a.state().information.letters.index,sameEconomyAndRng:true};
});
check('existing V13 data stay V13; prototype sidecar reload retains anchor without a game migration',()=>{
 const g=buyParts([45]),saved=g.snapshot(),loaded=create(1,0,variant,saved);assert.deepEqual(saved,loaded.snapshot());assert.deepEqual(g.quote(0,45,1),loaded.quote(0,45,1));const bad=clean(saved);bad.anchors[0][0].price++;assert.throws(()=>create(1,0,variant,bad));assert.equal(saved.game.v,13);return {saveVersion:13,analysisOnlyEnvelope:true,noProductiveMigration:true,changedAnchorRejected:true};
});
check('capital constrained entry F2 remains a distinct static probe, not proof of rescue',()=>{
 const rows=[];for(const p of [4,16,31,110])for(const model of ['A',variant]){const g=fixture(model,p,110,20,1);const n=g.max(0,6);if(n)assert(g.trade(0,n,1));rows.push({model,price:p,quantity:n,cash:g.state().gold,canPayFee:g.state().gold>=6});assert(g.state().gold>=6)}return {fixture:'20 gold, no debt, reserve actual Kogge fee 6',rows};
});
check('sale splits across reloads and repeated views retain the same market anchor',()=>{
 const bulk=buyParts([90]);assert(bulk.trade(0,90,-1));let split=buyParts([90]);
 for(let i=0;i<9;i++){assert(split.trade(0,10,-1));split=create(0,0,variant,split.snapshot());split.eval('informationBookPanel();tradeLetterPanel();observe()')}
 assert.equal(split.state().gold,bulk.state().gold);assert.deepEqual(split.state().markets,bulk.state().markets);
 return {saleParts:9,quantityPerPart:10,reloads:9,gold:split.state().gold};
});
check('same-day gold neutrality does not erase old book-wealth and reputation wash-trade risk',()=>{
 const rows=[];for(const model of ['A',variant]){const g=fixture(model,20,110);g.eval('ship().cargo[0]=45;ship().costs[0]=8;ship().bookCosts={0:8};ship().origins={0:[{city:1,n:45}]};');
 const before={gold:g.state().gold,worth:g.eval('netWorth()'),rep:g.state().rep};const sale=g.trade(0,45,-1);assert(sale);assert(g.trade(0,45,1));
 assert.equal(g.state().gold,before.gold);rows.push({model,before,after:{gold:g.state().gold,worth:g.eval('netWorth()'),rep:g.state().rep},recordedProfit:sale.profit});}
 assert(rows.every(r=>r.after.worth>r.before.worth&&r.after.rep>r.before.rep));return {existingRuleRiskNotFixed:true,rows};
});
// Static, independent quantity tables: no journeys or market-day simulation.
const quantities=[];
for(const good of [{j:0,name:'Getreide',buy:16,sell:24},{j:3,name:'Salz',buy:31,sell:46},{j:10,name:'Pelze',buy:110,sell:165}])for(const n of [1,5,10,20,25,45,50,90,140])for(const model of ['A',variant]){
 const a=Q.anchor(good.buy,180),b=Q.anchor(good.sell,110),cost=model==='A'?n*good.buy:Q.quote(a,180,n,1).total,revenue=model==='A'?n*good.sell:Q.quote(b,110,n,-1).total;
 const minShip=n<=55?'Schnigge':n<=90?'Kogge':'Holk';quantities.push({fixture:'synthetic quotes for real good, not real city price',model,good:good.name,quantity:n,sourceStock:180,destinationStock:110,initialBuy:good.buy,initialSell:good.sell,cost,revenue,averageBuy:cost/n,averageSell:revenue/n,profit:revenue-cost,profitPerSoldBarrel:(revenue-cost)/n,sourceStockAfter:180-n,destinationStockAfter:110+n,minimumShip:minShip,capitalRequired:cost});
}
check('all nine quantities for low middle high goods respect actual ship caps and availability',()=>{
 assert.equal(quantities.length,54);for(const row of quantities){const capacity={Schnigge:55,Kogge:90,Holk:140}[row.minimumShip];assert(row.quantity<=capacity);assert(row.sourceStockAfter>=0);assert(Number.isSafeInteger(row.cost)&&Number.isSafeInteger(row.revenue))}return {rows:54,quantities:[1,5,10,20,25,45,50,90,140],stocks:'synthetic 180/110, neither production nor caps changed'};
});
// At most twelve pure hull probes; no additional trajectories.
const hulls=[];
for(const type of [0,1,2])for(const n of [25,45,90,140]){
 const cap=[55,90,140][type],allowed=n<=cap;let row={type,ship:['Schnigge','Kogge','Holk'][type],capacity:cap,requested:n,allowed};
 if(allowed){const g=fixture(variant,16,180,100000,type);assert(g.trade(0,n,1));row={...row,actual:n,buyCost:100000-g.state().gold,free:cap-n,fee:[4,6,9][type],speed:[1.5,1,.72][type]}}else{const g=fixture(variant,16,180,100000,type);assert.equal(g.trade(0,n,1),null);row.actual=0}hulls.push(row);
}
check('twelve bounded hull probes keep current types capacity speed fee and partial loads',()=>({probes:hulls.length,valid:hulls.filter(r=>r.allowed).length,rejected:hulls.filter(r=>!r.allowed).length}));

allQuantities.push(...quantities.map(r=>({...r,variant})));allHulls.push(...hulls.map(r=>({...r,variant})));

check('current hulls full partial luxury mixed and incremental cargo have bounded costed roles',()=>{
 const rows=[];
 const cases=[
  ...[0,1,2].flatMap(type=>[18,24].map(sell=>({name:'full grain',type,goods:[{j:0,n:[55,90,140][type],buy:16,sell}]}))),
  {name:'partial Holk',type:2,goods:[{j:0,n:50,buy:16,sell:24}]},
  {name:'small luxury parcel',type:2,goods:[{j:10,n:20,buy:110,sell:165}]},
  {name:'mixed Kogge',type:1,goods:[{j:0,n:50,buy:16,sell:24},{j:10,n:20,buy:110,sell:165}]},
  {name:'planned cargo',type:1,goods:[{j:0,n:50,buy:16,sell:24}]},
  {name:'planned plus extra',type:1,goods:[{j:0,n:50,buy:16,sell:24},{j:3,n:20,buy:31,sell:46}]}
 ];
 for(const c of cases){const g=fixture(variant,16,180,5000,c.type),capacity=g.eval('capacity()'),fee=[4,6,9][c.type];
  const parts=c.goods.map(w=>({...w,cost:Q.quote(Q.anchor(w.buy,180),180,w.n,1).total,revenue:Q.quote(Q.anchor(w.sell,110),110,w.n,-1).total}));
  const load=parts.reduce((a,w)=>a+w.n,0),cost=parts.reduce((a,w)=>a+w.cost,0),revenue=parts.reduce((a,w)=>a+w.revenue,0);
  assert(load<=capacity&&load<=180&&cost+fee<=5000);
  rows.push({...c,parts,capacity,load,unused:capacity-load,cost,revenue,fee,net:revenue-cost-fee,restGold:5000-cost-fee,
   speed:g.eval('ship().speed'),mapDaysLuebeckHamburg:g.eval('routeTravelDays(0,1,ship().speed)'),referenceCost:g.eval('SHIPTYPES[ship().type].cost'),currentBuildRecipe:clean(g.eval('SHIPBUILD_RECIPES[ship().type]')),ownedHullAssumed:true});
 }
 const baseline=rows.find(r=>r.name==='planned cargo'),extra=rows.find(r=>r.name==='planned plus extra');assert.equal(extra.fee,baseline.fee);
 return {syntheticQuotesNoJourney:true,rows,incrementalCargoProfit:extra.net-baseline.net,acquisitionNotDoubleCharged:true,lifecycleRentabilityNotProven:true};
});
check('5000 and low gold budgets preserve genuine affordability and current ship capacities',()=>{
 const rows=[];
 for(const gold of [5000,200,20])for(const type of [0,1])for(const quantity of [5,20,50,90]){
  const g=fixture(variant,4,180,gold,type),before=g.state(),affordable=g.max(0,6),n=Math.min(quantity,affordable);
  const buy=n?g.trade(0,n,1):null;
  assert(g.state().gold>=6);assert(g.eval('load()<=capacity()'));
  rows.push({gold,type,requested:quantity,actual:n,cost:buy?.total||0,restGold:g.state().gold,fee:[4,6][type],space:g.eval('capacity()-load()')});
 }
 return {syntheticAffordableOnly:true,rows};
});
check('single known loss followed by a small favorable mass-good deal permits local recovery without gifts',()=>{
 const g=fixture(variant,16,180,20,1);
 g.eval('ship().cargo[0]=10;ship().costs[0]=30;ship().bookCosts={0:30};ship().origins={0:[{city:1,n:10}]};');
 const loss=g.trade(0,10,-1);assert(loss.profit<0);const afterLoss=g.state().gold;
 // New independent two-market fixture: no journey, no production or claimed route outcome.
 g.eval('s.markets[0][1]={price:4,stock:180};');g.resetAnchors();const buy=g.trade(1,5,1);assert(buy);
 g.eval('s.city=1;ship().city=1;s.markets[1][1]={price:8,stock:110};');g.resetAnchors();const sale=g.trade(1,5,-1);assert(sale&&sale.profit>6);
 assert(g.state().gold-6>afterLoss);g.eval('validate(s)');
 return {fixture:'synthetic immediate two-market prices, transport not executed; actual fee 6 subtracted arithmetically',loss:loss.profit,afterLoss,smallDealProfit:sale.profit,netAfterFee:sale.profit-6,cashAfterFee:g.state().gold-6,noNewGoldSource:true,notLongTermRecoveryProof:true};
});
check('new special injection and expiry update anchors without extra random draws or rewriting receipts',()=>{
 const a=create(81001,0,'A'),b=create(81001);
 const install=g=>g.eval('const specialRandom=Math.random;Math.random=()=>{specialRandom();return .01};');
 for(const g of [a,b]){install(g);g.eval('takeBath();Math.random=specialRandom;validate(s)')}
 assert.deepEqual(a.state(),b.state());assert.deepEqual(a.rng(),b.rng());
 const tip=b.state().rumors[0];assert(tip.special);const anchor=b.snapshot().anchors[tip.city][tip.j];assert.deepEqual(anchor,b.state().markets[tip.city][tip.j]);
 let loaded=create(0,0,variant,b.snapshot());assert.deepEqual(loaded.snapshot(),b.snapshot());
 const remaining=tip.until-b.eval('totalDay()')+1;
 for(const g of [a,b])g.eval(`advance(${remaining});validate(s)`);
 assert.deepEqual(a.state(),b.state());assert.deepEqual(a.rng(),b.rng());
 const expired=b.state().markets[tip.city][tip.j];assert.deepEqual(b.snapshot().anchors[tip.city][tip.j],expired);
 return {newSpecial:{city:tip.city,good:tip.j,anchor},expiry:expired,extraRandomDraws:0,fullPrototypeReloadDuringSpecial:true};
});
check('already saved special and year crossing preserve original market and information state',()=>{
 const a=create(81002,0,'A'),b=create(81002);
 for(const g of [a,b])g.eval("s.day=355;s.storage=freshStorage(totalDay());s.politics=freshPolitics(totalDay());s.information.letters=freshTradeLetters(totalDay());s.markets[1][0]={price:38,stock:20};s.rumors=[{city:1,j:0,price:38,until:totalDay()+8,special:true,falseTip:false,text:'Saved special fixture'}];validate(s)");
 b.resetAnchors();const loaded=create(0,0,variant,b.snapshot());assert.deepEqual(loaded.snapshot(),b.snapshot());
 for(const g of [a,b])g.eval('advance(10);validate(s)');
 assert.equal(b.state().year,1351);assert.equal(b.state().day,5);assert.deepEqual(a.state(),b.state());assert.deepEqual(a.rng(),b.rng());
 return {oldSavedSpecialLoaded:true,year:b.state().year,day:b.state().day,expiryAnchor:b.snapshot().anchors[1][0],sameMarketAndRng:true};
});
check('paid B and C snapshots remain immutable after quantity trade special changes travel and reload',()=>{
 let g=create(81003);g.disk['hansefuerst-v04']=g.eval('JSON.stringify(s)');assert(g.eval('buyInformation(1,0)'));assert(g.eval('buyInformationArchive()'));
 g.eval('advance(s.information.letters.nextDay-totalDay())');g.disk['hansefuerst-v04']=g.eval('JSON.stringify(s)');
 const offer=g.state().information.letters.offer;assert(offer);assert(g.eval(`buyTradeLetter('${offer.id}')`));
 const before=JSON.stringify({reports:g.state().information.reports,receipts:g.state().information.letters.receipts,filed:g.state().information.filed});
 assert(g.trade(0,5,1));g.eval('planTravel(1,false);arrive();validate(s)');
 g=create(0,0,variant,g.snapshot());assert.equal(JSON.stringify({reports:g.state().information.reports,receipts:g.state().information.letters.receipts,filed:g.state().information.filed}),before);
 assert.deepEqual(g.state().information.letters.receipts[0].offer,offer);
 return {prices:{B:20,C:60,archive:300},paidHistoricalValuesUnchanged:true,actualMultiDayTrip:true,completePrototypeReload:true};
});
check('rounded reanchoring alone can change the price path: record actual one-day counterexample',()=>{
 const witnesses=[];
 for(const price of [8,16,20,31,56,110])for(const stock of [140,160,180,200,220,240]){
  const n=stock-110,a=Q.anchor(price,stock),cost=Q.quote(a,stock,n,1).total,next=Q.edge(a,110),reanchored=Q.anchor(next,110),back=Q.quote(reanchored,110,n,-1).total;
  witnesses.push({price,stock,quantity:n,cost,next,afterUnchangedDayRevenue:back,goldDelta:back-cost});
 }
 const w=witnesses.find(w=>w.goldDelta>0);assert(w,'expected finite rounded reanchoring witness');
 const g=fixture(variant,w.price,w.stock,100000,2);assert(g.trade(0,w.quantity,1));const market=clean(g.state().markets[0][0]);
 // Preserve original RNG consumption, return .5 only for this one controlled day.
 // At city0/good0 profile0 and stock110, target price/stock both remain unchanged.
 g.eval('const dayRandom=Math.random;Math.random=()=>{dayRandom();return .5};advance(1);Math.random=dayRandom;validate(s)');
 assert.deepEqual(g.state().markets[0][0],market);const sale=g.trade(0,w.quantity,-1);assert(sale);
 assert.equal(g.state().gold-100000,w.goldDelta);assert(w.goldDelta>0);
 return {WARNING:'time-anchor precision risk, not a same-anchor arbitrage failure; blocks unconditional integration',witness:w,actualGoldGain:g.state().gold-100000,unchangedTargetMarket:market,elapsedDays:1,all36StaticWitnesses:witnesses};
});
check('split profitable old inventory sales can change reputation while sale gold is split neutral',()=>{
 const rows=[];
 for(const model of ['A',variant])for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){
  const g=fixture(model,110,110);g.eval('ship().cargo[0]=90;ship().costs[0]=8;ship().bookCosts={0:8};ship().origins={0:[{city:1,n:90}]};');
  const before={gold:g.state().gold,netWorth:g.eval('netWorth()'),politicalWorth:g.eval('politicalWorth()'),rep:g.state().rep};
  for(const n of parts)assert(g.trade(0,n,-1));const sold={gold:g.state().gold,netWorth:g.eval('netWorth()'),politicalWorth:g.eval('politicalWorth()'),rep:g.state().rep};
  assert(g.trade(0,90,1));assert.equal(g.state().gold,before.gold);
  rows.push({model,parts:parts.length,before,sold,rebought:{gold:g.state().gold,netWorth:g.eval('netWorth()'),politicalWorth:g.eval('politicalWorth()'),rep:g.state().rep,cost:g.state().ships[0].costs[0],origins:g.state().ships[0].origins[0]}});
 }
 for(const model of ['A',variant]){const same=rows.filter(r=>r.model===model);assert(same[1].sold.rep>same[0].sold.rep);assert.equal(same[1].sold.gold,same[0].sold.gold);assert.equal(same[2].sold.gold,same[0].sold.gold)}
 return {existingPoliticalExploitNotFixed:true,rows};
});

}
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify({phase:'0.8d.2a.1',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash:hash(html),parameters:PARAMETERS,checks,quantities:allQuantities,hulls:allHulls},null,2)+'\n');console.log(`${checks.length} focused groups passed; 0 route comparison arms in this script`);
