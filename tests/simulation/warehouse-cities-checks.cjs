// Shared-warehouse extension: small deterministic fixtures, no economy simulation.
const path=require('node:path'),assert=require('node:assert/strict');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create}=require('./headless.cjs');const clean=x=>JSON.parse(JSON.stringify(x));let checks=0;
function check(name,fn){fn();checks++;console.log('PASS '+name)}
function game(){const g=create(42);g.eval(`const sail=dest=>{pending={from:s.city,dest,days:2,fee:6,qs:[ship().id],resolved:true,event:null};arrive()};const buy=(j,n)=>{$('qty'+j).value=n;trade(j,1)};`);return g}
function move(g,n,dir=1,j=0){g.eval(`$('warehouseQty${j}').value=${JSON.stringify(n)}`);return g.eval(`warehouseTransfer(${j},${dir})`)}
check('five distinct stores, all five cities deposit/withdraw independently',()=>{
 const g=game();assert.equal(g.eval('Object.keys(s.warehouses).length'),11);assert(g.eval('s.warehouses[0]!==s.warehouses[1]'));
 for(let city=0;city<5;city++){g.eval(`s.city=${city};ship().city=${city};buy(0,${city+1})`);const worth=g.eval('netWorth()');assert(move(g,city+1));near(g.eval('netWorth()'),worth);assert.equal(g.eval(`s.warehouses[${city}].cargo[0]`),city+1)}
 for(let city=0;city<5;city++){g.eval(`s.city=${city};ship().city=${city}`);assert(move(g,city+1,-1));assert(move(g,city+1));}
 for(let city=0;city<5;city++)assert.equal(g.eval(`s.warehouses[${city}].cargo[0]`),city+1);
});
function near(a,b){assert(Math.abs(a-b)<1e-7,`${a} != ${b}`)}
check('only actual ship transport changes access to goods in another city',()=>{
 const g=game();g.eval('buy(0,10)');assert(move(g,6));g.eval('sail(1)');assert(!move(g,1,-1));assert.equal(g.eval('s.warehouses[0].cargo[0]'),6);assert(move(g,4));assert.equal(g.eval('s.warehouses[1].cargo[0]'),4);assert.equal(g.eval('s.warehouses[0].cargo[0]'),6);
});
check('FIFO provenance and weighted acquisition/book values survive three city visits',()=>{
 const g=game();g.eval('buy(0,10)');const cost=g.eval('ship().costs[0]');assert(move(g,10));assert(move(g,10,-1));g.eval('sail(1)');assert(move(g,7));assert(move(g,7,-1));g.eval('sail(2)');assert(move(g,10));assert.deepEqual(clean(g.eval('s.warehouses[2].origins[0]')),[{city:0,n:3},{city:0,n:7}]);assert.equal(g.eval('s.warehouses[2].costs[0]'),cost);assert(move(g,10,-1));assert.equal(g.eval('ship().costs[0]'),cost);
});
check('remote active ships cannot transfer or be selected in any city',()=>{
 const g=game();for(let city=0;city<5;city++){g.eval(`s.city=${city};ship().city=(${city}+1)%5;ship().cargo[0]=5;ship().costs[0]=10;ship().origins={0:[{city:0,n:5}]}`);const before=g.eval('JSON.stringify(s)');assert(!move(g,1));assert(!move(g,1,-1));g.eval('warehouseSelect(0)');assert.equal(g.eval('JSON.stringify(s)'),before)}
});
check('multiple local ships can use only the current city store',()=>{
 const g=game();g.eval('sail(4);buy(0,8);s.ships.push({...makeShip(0),city:4})');assert(move(g,8));g.eval('warehouseSelect(1)');assert(move(g,3,-1));assert.equal(g.eval('s.ships[1].cargo[0]'),3);assert.equal(g.eval('s.ships[0].cargo[0]||0'),0);assert.equal(g.eval('s.warehouses[4].cargo[0]'),5);assert.equal(g.eval('Object.keys(s.warehouses[0].cargo).length'),0);
});
check('capacity, cash, markets, worth and RNG protections in every city',()=>{
 for(let city=0;city<5;city++){const g=game();g.eval(`s.city=${city};ship().city=${city};buy(0,10)`);const snap=()=>clean(g.eval('({gold:s.gold,bank:s.bank,debt:s.debt,markets:s.markets,worth:netWorth(),credit:creditLimit(),day:s.day})'));const before=snap();g.eval('const rng=Math.random;let draws=0;Math.random=()=>{draws++;return rng()}');assert(move(g,10));assert(move(g,10,-1));assert.deepEqual(snap(),before);assert.equal(g.eval('draws'),0);assert(move(g,10));g.eval('ship().capacity=15;ship().cargo[1]=10;ship().costs[1]=20;ensureCargoRecords(ship())');assert(!move(g,6,-1));assert(move(g,5,-1));assert(!move(g,1,-1));}
});
check('no-storage old saves gain five empty stores without changing economic fields',()=>{
 const g=game();g.eval('s=migrate(s);s.questAvailableAt??=0;s.electionAvailableAt??=0;for(const q of s.ships){q.bookCosts??={};q.origins??={}}s.v=4;s.markets=s.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(s.journal))v.prices=v.prices.slice(0,7);delete s.warehouses');const raw=g.eval('JSON.stringify(s)');g.context.raw=raw;g.eval('s=migrate(JSON.parse(raw))');assert.equal(g.eval('Object.keys(s.warehouses).length'),11);const actual=clean(g.eval('s'));delete actual.warehouses;actual.v=4;actual.markets=actual.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(actual.journal))v.prices=v.prices.slice(0,7);assert.deepEqual(actual,JSON.parse(raw));
});
check('Luebeck-only saves keep all lots/costs; four other stores are added empty',()=>{
 const g=game();g.eval('buy(6,5)');assert(move(g,5,1,6));g.eval('s=migrate(s);s.questAvailableAt??=0;s.electionAvailableAt??=0;for(const q of s.ships){q.bookCosts??={};q.origins??={}}s.v=4;s.markets=s.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(s.journal))v.prices=v.prices.slice(0,7);s.warehouses={0:s.warehouses[0]}');const old=clean(g.eval('s')),migrated=clean(g.eval('migrate(s)'));assert.deepEqual(migrated.warehouses[0],old.warehouses[0]);for(let c=1;c<5;c++)assert.deepEqual(migrated.warehouses[c],{cargo:{},costs:{},bookCosts:{},origins:{}});const {warehouses,...rest}=migrated;const {warehouses:ignored,...oldRest}=old;rest.v=4;rest.markets=rest.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(rest.journal))v.prices=v.prices.slice(0,7);assert.deepEqual(rest,oldRest);
});
check('100 save/load cycles retain all city stores without multiplication or loss',()=>{
 const g=game();for(let c=0;c<5;c++){g.eval(`s.city=${c};ship().city=${c};buy(0,${c+1})`);assert(move(g,c+1))}g.eval('s=migrate(s)');const before=g.eval('JSON.stringify(s)');const store={};g.context.localStorage.setItem=(k,v)=>store[k]=v;for(let i=0;i<100;i++){g.eval('save()');g.context.raw=store['hansefuerst-v04'];g.eval('s=migrate(JSON.parse(raw))')}assert.equal(g.eval('JSON.stringify(s)'),before);
});
check('malformed existing stores and invalid city/good/magnitude inputs never get repaired',()=>{
 const g=game();for(const patch of ['x.warehouses[1]=null','x.warehouses[11]=emptyWarehouse()','delete x.warehouses[0]','x.warehouses[0].cargo={0:-1}','x.warehouses[2].costs={11:1}'])assert.equal(g.eval(`(()=>{const x=JSON.parse(JSON.stringify(s));${patch};return migrate(x)})()`),null,patch);
 for(const city of ['-1','11','1.5','NaN','"0"']){g.eval(`s.city=${city}`);assert(!move(g,1));assert(!move(g,1,-1));}
 g.eval('s.city=0;buy(0,5)');for(const qty of [-1,0,1.5,'Infinity',true,null])assert(!move(g,qty));for(const j of [-1,11,0.5])assert(!move(g,1,1,j));
});
check('partial migration backup is distinct and never replaces first-stage original backup',()=>{
 const g=game();g.eval('s.v=4;s.markets=s.markets.slice(0,5).map(c=>c.slice(0,7));for(const v of Object.values(s.journal))v.prices=v.prices.slice(0,7);s.warehouses={0:s.warehouses[0]}');const raw=g.eval('JSON.stringify(s)'),store={'hansefuerst-v04-warehouse-migration-backup':'first stage'};g.context.raw=raw;g.context.localStorage.getItem=k=>store[k]??null;g.context.localStorage.setItem=(k,v)=>store[k]=v;g.eval('backupWarehouseMigration(raw)');assert.equal(store['hansefuerst-v04-warehouse-cities-migration-backup'],raw);assert.equal(store['hansefuerst-v04-warehouse-migration-backup'],'first stage');g.eval('backupWarehouseMigration(raw)');assert.equal(store['hansefuerst-v04-warehouse-cities-migration-backup'],raw);
});
check('local or unknown goods do not acquire foreign origin through a city store',()=>{
 for(let city=0;city<5;city++)for(const origin of [city,null]){const g=game();g.eval(`s.city=${city};ship().city=${city};ship().cargo[0]=5;ship().costs[0]=10;ship().origins={0:[{city:${origin},n:5}]};s.quests=[{city:${city},j:0,n:5,reward:300,until:totalDay()+20}]`);assert(move(g,5));assert(move(g,5,-1));g.eval("$('qty0').value=5;trade(0,-1)");assert.equal(g.eval('s.completed'),0)}
});
check('genuine transported foreign goods keep eligibility, only real sale rewards once',()=>{
 const g=game();g.eval('buy(0,10)');assert(move(g,10));assert(move(g,10,-1));g.eval('sail(3);s.quests=[{city:3,j:0,n:10,reward:300,until:totalDay()+20}]');assert(move(g,10));assert(move(g,10,-1));assert.equal(g.eval('s.completed'),0);g.eval("$('qty0').value=10;trade(0,-1);completeQuests(0,10)");assert.equal(g.eval('s.completed'),1);
});
console.log(checks+' multi-city warehouse checks passed; no economy simulation');
