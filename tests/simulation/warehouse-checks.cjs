const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create}=require('./headless.cjs');let count=0;
const clean=x=>JSON.parse(JSON.stringify(x));
function game(code=''){const g=create(42);g.eval(code);return g}
function check(name,fn){fn();count++;console.log('PASS '+name)}
function move(g,n,dir=1,j=0){g.eval(`$('warehouseQty${j}').value=${JSON.stringify(n)}`);return g.eval(`warehouseTransfer(${j},${dir})`)}
const buy="$('qty0').value=10;trade(0,1);";
const near=(a,b)=>assert(Math.abs(a-b)<1e-7,`${a} != ${b}`);
check('store, load and partial amounts conserve quantities and cargo capacity',()=>{
 const g=game(buy);assert(move(g,4));assert.equal(g.eval('ship().cargo[0]'),6);assert.equal(g.eval('s.warehouses[0].cargo[0]'),4);
 assert(move(g,2,-1));assert.equal(g.eval('ship().cargo[0]'),8);assert.equal(g.eval('s.warehouses[0].cargo[0]'),2);
 assert(move(g,2,-1));assert(!g.eval('Object.hasOwn(s.warehouses[0].cargo,0)'));assert(g.eval('migrate(s)!==null'));
});
check('overdraws and invalid quantities leave the complete state unchanged',()=>{
 const g=game(buy);for(const n of [11,0,-1,1.5,'Infinity','NaN','abc','',1e30,true,null]){const before=g.eval('JSON.stringify(s)');assert(!move(g,n));assert.equal(g.eval('JSON.stringify(s)'),before)}
 assert(!move(g,1,-1));assert(move(g,5));const before=g.eval('JSON.stringify(s)');assert(!move(g,6,-1));assert.equal(g.eval('JSON.stringify(s)'),before);
});
check('withdrawal cannot exceed free capacity, including armed ship capacity',()=>{
 const g=game(buy);assert(move(g,10));g.eval('ship().arms=3;ship().cargo[1]=59;ship().costs[1]=20;ensureCargoRecords(ship())');assert(move(g,1,-1));const before=g.eval('JSON.stringify(s)');assert(!move(g,1,-1));assert.equal(g.eval('JSON.stringify(s)'),before);
});
check('no local or remote ship can use a warehouse from another city',()=>{
 const g=game(buy);g.eval('s.ships.push({...makeShip(0),city:1})');assert(move(g,5));g.eval('s.active=1');const before=g.eval('JSON.stringify(s)');assert(!move(g,1,-1));assert(!move(g,1));assert.equal(g.eval('JSON.stringify(s)'),before);
 g.eval('s.active=0;s.city=1');assert(!move(g,1,-1));assert(!move(g,1));
});
check('FIFO city and unknown origins split and append without relabelling',()=>{
 const g=game("ship().cargo[0]=10;ship().costs[0]=12;ship().origins={0:[{city:1,n:3},{city:0,n:4},{city:null,n:3}]};");
 assert(move(g,5));assert.deepEqual(clean(g.eval('s.warehouses[0].origins[0]')),[{city:1,n:3},{city:0,n:2}]);
 assert.deepEqual(clean(g.eval('ship().origins[0]')),[{city:0,n:2},{city:null,n:3}]);assert(move(g,4,-1));
 assert.deepEqual(clean(g.eval('ship().origins[0]')),[{city:0,n:2},{city:null,n:3},{city:1,n:3},{city:0,n:1}]);assert(g.eval('migrate(s)!==null'));
});
check('weighted purchase costs and total book value survive different-cost merging',()=>{
 const g=game("s.markets[0][0].price=10;$('qty0').value=10;trade(0,1);");assert(move(g,10));g.eval("s.markets[0][0].price=20;$('qty0').value=10;trade(0,1)");const worth=g.eval('netWorth()');assert(move(g,5));near(g.eval('s.warehouses[0].costs[0]'),200/15);assert(move(g,10,-1));near(g.eval('ship().costs[0]'),(5*20+10*200/15)/15);near(g.eval('netWorth()'),worth);
});
check('unknown acquisition costs remain unknown; conservative book basis is conserved',()=>{
 const g=game('ship().cargo[0]=10;ship().costs[0]=null;ship().bookCosts={0:7};ship().origins={0:[{city:null,n:10}]}');const worth=g.eval('netWorth()');assert(move(g,5));assert.equal(g.eval('s.warehouses[0].costs[0]'),null);assert.equal(g.eval('s.warehouses[0].bookCosts[0]'),7);assert(move(g,5,-1));assert.equal(g.eval('ship().costs[0]'),null);near(g.eval('netWorth()'),worth);
});
check('mixing known and unknown lots retains conservative total book basis',()=>{
 const g=game('ship().cargo[0]=5;ship().costs[0]=null;ship().bookCosts={0:7};ship().origins={0:[{city:null,n:5}]}');assert(move(g,5));g.eval("s.markets[0][0].price=20;$('qty0').value=5;trade(0,1)");const worth=g.eval('netWorth()');assert(move(g,5));assert.equal(g.eval('s.warehouses[0].costs[0]'),null);near(g.eval('s.warehouses[0].bookCosts[0]'),13.5);assert(move(g,10,-1));near(g.eval('netWorth()'),worth);assert.equal(g.eval('ship().costs[0]'),null);
});
check('transfer changes no gold, bank, debt, markets, rank, quests, day or RNG',()=>{
 const g=game(buy),before=clean(g.eval('({gold:s.gold,bank:s.bank,debt:s.debt,markets:s.markets,rank:s.rank,rep:s.rep,quests:s.quests,day:s.day,worth:netWorth(),credit:creditLimit()})'));
 g.eval('let draws=0;const rng=Math.random;Math.random=()=>{draws++;return rng()}');assert(move(g,4));assert(move(g,2,-1));assert.equal(g.eval('draws'),0);
 const after=clean(g.eval('({gold:s.gold,bank:s.bank,debt:s.debt,markets:s.markets,rank:s.rank,rep:s.rep,quests:s.quests,day:s.day,worth:netWorth(),credit:creditLimit()})'));assert.deepEqual(after,before);
});
check('warehouse value does not follow market-price inflation',()=>{
 const g=game(buy);assert(move(g,10));const w=g.eval('netWorth()'),credit=g.eval('creditLimit()');g.eval('s.markets[0][0].price=9999');near(g.eval('netWorth()'),w);assert.equal(g.eval('creditLimit()'),credit);
});
check('repeated transfers keep exact quantity and FIFO count without duplication',()=>{
 const g=game(buy),worth=g.eval('netWorth()');for(let i=0;i<100;i++){assert(move(g,3));assert(move(g,3,-1))}assert.equal(g.eval('ship().cargo[0]'),10);assert.equal(g.eval('load()'),10);near(g.eval('netWorth()'),worth);assert(g.eval('migrate(s)!==null'));
});
check('stock can move to another owned ship in Luebeck',()=>{
 const g=game(buy);assert(move(g,10));g.eval('s.ships.push({...makeShip(0),city:0});warehouseSelect(1)');assert(move(g,7,-1));assert.equal(g.eval('s.ships[0].cargo[0]||0'),0);assert.equal(g.eval('s.ships[1].cargo[0]'),7);assert.equal(g.eval('s.warehouses[0].cargo[0]'),3);
});
check('old v4 state migration adds only empty storage after existing normalizations',()=>{
 const g=game(buy);g.eval('s=migrate(s);s.questAvailableAt??=0;s.electionAvailableAt??=0;for(const q of s.ships){q.bookCosts??={};q.origins??={}}s.v=4;s.markets=s.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(s.journal))v.prices=v.prices.slice(0,7);delete s.warehouses');const raw=g.eval('JSON.stringify(s)');g.context.oldRaw=raw;g.eval('s=migrate(JSON.parse(oldRaw))');assert.deepEqual(clean(g.eval('s.warehouses')),Object.fromEntries(Array.from({length:11},(_,i)=>i).map(city=>[city,{cargo:{},costs:{},bookCosts:{},origins:{}}])));const actual=clean(g.eval('s'));delete actual.warehouses;actual.v=4;actual.markets=actual.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(actual.journal))v.prices=v.prices.slice(0,7);assert.deepEqual(actual,JSON.parse(raw));
});
check('warehouse save/load round-trip preserves cost, origin and quantities',()=>{
 const g=game(buy);assert(move(g,7));const store={};g.context.localStorage.setItem=(k,v)=>store[k]=v;g.eval('save()');g.context.rawSave=store['hansefuerst-v04'];g.eval('s=migrate(JSON.parse(rawSave))');assert.equal(g.eval('s.warehouses[0].cargo[0]'),7);assert(move(g,7,-1));assert.equal(g.eval('ship().cargo[0]'),10);
});
check('invalid warehouse data is rejected, never silently emptied',()=>{
 const g=game(buy);assert(move(g,5));for(const patch of ['x.warehouses=null','x.warehouses[11]=x.warehouses[0]','x.warehouses[0].cargo[0]=-1','x.warehouses[0].cargo[0]=Infinity','x.warehouses[0].origins[0][0].n=999','x.warehouses[0].costs[0]=-2','x.warehouses[0].bookCosts[0]=null','x.warehouses[0].cargo[11]=1'])assert.equal(g.eval(`(()=>{const x=JSON.parse(JSON.stringify(s));${patch};return migrate(x)})()`),null,patch);
});
check('local cargo cannot become foreign quest cargo by warehousing',()=>{
 const g=game(buy);g.eval('s.quests=[{city:0,j:0,n:10,reward:500,until:totalDay()+20}]');assert(move(g,10));assert(move(g,10,-1));g.eval("$('qty0').value=10;trade(0,-1)");assert.equal(g.eval('s.completed'),0);assert(!g.events.some(e=>e.type==='quest_reward'));
});
check('unknown legacy cargo cannot become foreign quest cargo',()=>{
 const g=game('ship().cargo[0]=10;ship().costs[0]=null;ship().bookCosts={0:7};ship().origins={0:[{city:null,n:10}]};s.quests=[{city:0,j:0,n:10,reward:500,until:totalDay()+20}]');assert(move(g,10));assert(move(g,10,-1));g.eval("$('qty0').value=10;trade(0,-1)");assert.equal(g.eval('s.completed'),0);
});
check('genuine foreign cargo remains eligible only on actual sale, pays once',()=>{
 const g=game('ship().cargo[0]=10;ship().costs[0]=12;ship().origins={0:[{city:1,n:10}]};s.quests=[{city:0,j:0,n:10,reward:500,until:totalDay()+20}]');assert(move(g,10));assert(move(g,10,-1));assert.equal(g.eval('s.completed'),0);g.eval("$('qty0').value=10;trade(0,-1);completeQuests(0,10)");assert.equal(g.eval('s.completed'),1);assert.equal(g.events.filter(e=>e.type==='quest_reward').length,1);
});
check('one-time pre-migration backup stays byte-identical; backup failure propagates',()=>{
 const g=game(),raw=g.eval('JSON.stringify((({warehouses,...rest})=>rest)(s))'),store={};g.context.localStorage.getItem=k=>store[k]??null;g.context.localStorage.setItem=(k,v)=>store[k]=v;g.context.backupRaw=raw;g.eval('backupWarehouseMigration(backupRaw)');assert.equal(store['hansefuerst-v04-warehouse-migration-backup'],raw);g.eval('backupWarehouseMigration(backupRaw)');assert.equal(store['hansefuerst-v04-warehouse-migration-backup'],raw);g.context.localStorage.getItem=()=>null;g.context.localStorage.setItem=()=>{throw Error('full')};assert.throws(()=>g.eval('backupWarehouseMigration(backupRaw)'),/full/);
});
console.log(count+' warehouse checks passed; no economy simulation');
