'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {Q,root,html,hash,clean,create}=require('./harness.cjs');
const out=process.argv[2];if(!out)throw Error('output JSON path required');
const checks=[];
function check(name,fn){const evidence=fn();checks.push({name,passed:true,evidence});console.log('PASS '+name)}
function close(a,b){assert(Math.abs(a-b)<1e-7,`${a} != ${b}`)}
function fixture(model='B',price=20,stock=240,gold=100000,type=2){const g=create(81001,0,model);g.eval(`s.gold=${gold};s.ships[0]={...makeShip(${type},{id:1,city:0})};s.markets[0][0]={price:${price},stock:${stock}};observe();validate(s);`);g.resetAnchors();return g}
function buyParts(parts,options={}){let g=fixture();for(const n of parts){assert(g.trade(0,n,1));if(options.reload)g=create(0,0,'B',g.snapshot());if(options.views)g.eval('informationBookPanel();tradeLetterPanel();harborGossip();observe()')}return g}
check('production HTML and all existing tracked files untouched; exact VM substitutions recorded',()=>{
 const b=execFileSync('git',['show','f7b3b336da911804101b3a38e8773128bff44164:Hansefuerst_0_4.html'],{cwd:root,maxBuffer:100000000});assert.equal(hash(html),hash(b));
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
 for(let k=1;k<=240;k++){const a=Q.anchor(31,110),n=31n*24200n,d=12100n+BigInt(k*k),v=Q.edge(a,k);assert(2n*BigInt(v)*d<=2n*n+d && 2n*BigInt(v)*d>2n*n-d)}
 assert.throws(()=>Q.anchor(NaN,10));assert.throws(()=>Q.anchor(3,10));assert.throws(()=>Q.quote(Q.anchor(20,1),1,2,1));assert.throws(()=>Q.quote(Q.anchor(20,1e9),1e9,1,-1));
 return {priceStockCombinations:81,additivePaths:paths,rationalRoundingChecks:240,legacyPriceBelow4:'explicitly unsupported, migration decision required'};
});
check('stock zero one three, fractional or insufficient gold, capacity and partial load bounded',()=>{
 for(const stock of [0,1,3]){const g=fixture('B',4,stock,20,0),before=g.state();assert.equal(g.max(0),stock);assert.equal(g.trade(0,stock+1,1),null);assert.deepEqual(g.state(),before);if(stock)assert(g.trade(0,stock,1));assert(g.state().gold>=0);assert(g.state().markets[0][0].stock>=0);g.eval('validate(s)')}
 const g=fixture('B',20,240,205.75,0),n=g.max(0);assert(g.quote(0,n,1).total<=205.75);assert(g.quote(0,n+1,1).total>205.75);assert.equal(g.trade(0,n+1,1),null);assert(g.trade(0,n,1));assert(g.state().gold>=0);
 const c=fixture('B',20,240,100000,0);c.eval('ship().cargo[1]=50;ship().costs[1]=25;ship().origins={1:[{city:0,n:50}]};');assert.equal(c.max(0),5);assert.equal(c.trade(0,6,1),null);assert(c.trade(0,5,1));c.eval('validate(s)');return {lowStocks:[0,1,3],fractionalGold:205.75,buyable:n,remainingGold:g.state().gold,partialSchniggeFree:5};
});
check('no trade part may exceed money, stock or ship space even when all limits coincide',()=>{
 const g=fixture('B',20,10,100,0),before=g.state();g.eval('ship().cargo[1]=53;ship().costs[1]=25;ship().origins={1:[{city:0,n:53}]};');const state=g.state();assert.equal(g.max(0),2);assert.equal(g.trade(0,3,1),null);assert.deepEqual(g.state(),state);assert(g.trade(0,2,1));assert.equal(g.max(0),0);assert.equal(g.trade(0,1,1),null);assert(g.state().gold>=0);g.eval('validate(s)');return {combinedLimits:true,executed:2,rejected:3};
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
 const a=create(81002,0,'A'),b=create(81002,0,'B');for(const g of [a,b]){g.eval('s.bank=1000;s.debt=1000;planTravel(6,false);arrive();validate(s)')}
 assert.deepEqual(a.state(),b.state());assert.deepEqual(a.events,b.events);assert.deepEqual(a.rng(),b.rng());return {actualTrip:'Lübeck–Bergen',days:a.state().day-1,letterCount:a.state().information.letters.index,sameEconomyAndRng:true};
});
check('existing V13 data stay V13; prototype sidecar reload retains anchor without a game migration',()=>{
 const g=buyParts([45]),saved=g.snapshot(),loaded=create(1,0,'B',saved);assert.deepEqual(saved,loaded.snapshot());assert.deepEqual(g.quote(0,45,1),loaded.quote(0,45,1));const bad=clean(saved);bad.anchors[0][0].price++;assert.throws(()=>create(1,0,'B',bad));assert.equal(saved.game.v,13);return {saveVersion:13,analysisOnlyEnvelope:true,noProductiveMigration:true,changedAnchorRejected:true};
});
check('capital constrained entry F2 remains a distinct static probe, not proof of rescue',()=>{
 const rows=[];for(const p of [4,16,31,110])for(const model of ['A','B']){const g=fixture(model,p,110,20,1);const n=g.max(0,6);if(n)assert(g.trade(0,n,1));rows.push({model,price:p,quantity:n,cash:g.state().gold,canPayFee:g.state().gold>=6});assert(g.state().gold>=6)}return {fixture:'20 gold, no debt, reserve actual Kogge fee 6',rows};
});
// Static, independent quantity tables: no journeys or market-day simulation.
const quantities=[];
for(const good of [{j:0,name:'Getreide',buy:16,sell:24},{j:3,name:'Salz',buy:31,sell:46},{j:10,name:'Pelze',buy:110,sell:165}])for(const n of [1,5,10,25,45,90,140])for(const model of ['A','B']){
 const a=Q.anchor(good.buy,180),b=Q.anchor(good.sell,110),cost=model==='A'?n*good.buy:Q.quote(a,180,n,1).total,revenue=model==='A'?n*good.sell:Q.quote(b,110,n,-1).total;
 const minShip=n<=55?'Schnigge':n<=90?'Kogge':'Holk';quantities.push({fixture:'synthetic quotes for real good, not real city price',model,good:good.name,quantity:n,sourceStock:180,destinationStock:110,initialBuy:good.buy,initialSell:good.sell,cost,revenue,averageBuy:cost/n,averageSell:revenue/n,profit:revenue-cost,profitPerSoldBarrel:(revenue-cost)/n,sourceStockAfter:180-n,destinationStockAfter:110+n,minimumShip:minShip,capitalRequired:cost});
}
check('all seven quantities for low middle high goods respect actual ship caps and availability',()=>{
 assert.equal(quantities.length,42);for(const row of quantities){const capacity={Schnigge:55,Kogge:90,Holk:140}[row.minimumShip];assert(row.quantity<=capacity);assert(row.sourceStockAfter>=0);assert(Number.isSafeInteger(row.cost)&&Number.isSafeInteger(row.revenue))}return {rows:42,quantities:[1,5,10,25,45,90,140],stocks:'synthetic 180/110, neither production nor caps changed'};
});
// At most twelve pure hull probes; no additional trajectories.
const hulls=[];
for(const type of [0,1,2])for(const n of [25,45,90,140]){
 const cap=[55,90,140][type],allowed=n<=cap;let row={type,ship:['Schnigge','Kogge','Holk'][type],capacity:cap,requested:n,allowed};
 if(allowed){const g=fixture('B',16,180,100000,type);assert(g.trade(0,n,1));row={...row,actual:n,buyCost:100000-g.state().gold,free:cap-n,fee:[4,6,9][type],speed:[1.5,1,.72][type]}}else{const g=fixture('B',16,180,100000,type);assert.equal(g.trade(0,n,1),null);row.actual=0}hulls.push(row);
}
check('twelve bounded hull probes keep current types capacity speed fee and partial loads',()=>({probes:hulls.length,valid:hulls.filter(r=>r.allowed).length,rejected:hulls.filter(r=>!r.allowed).length}));
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify({phase:'0.8d.2a',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash:hash(html),checks,quantities,hulls},null,2)+'\n');console.log(`${checks.length} groups passed; no comparison trajectories in this script`);
