// Five-city preservation only: no new cities, migration or statistical economy run.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');const {create}=require('./headless.cjs'),clean=x=>JSON.parse(JSON.stringify(x));
const old=execFileSync('git',['show','ce96bd9:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024}),current=fs.readFileSync(process.env.HANSE_GAME,'utf8');
const driver=fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8'),oldDriver=execFileSync('git',['show','ce96bd9:tests/simulation/strategies.js'],{encoding:'utf8'});const line=(s,start)=>s.split('\n').find(l=>l.startsWith(start));let count=0;
function check(name,fn){fn();count++;console.log('PASS '+name)}
check('entire shipped HTML differs only by central extraction of unchanged map points',()=>{const restored=current.replace('// Presentation coordinates only; city indices remain the persistent catalog identity.\nconst CITY_MAP_POINTS=[[110,185],[53,120],[274,138],[359,167],[512,191]];\n','').replace('let pts=CITY_MAP_POINTS','let pts=[[110,185],[53,120],[274,138],[359,167],[512,191]]');assert.equal(restored,old);assert.equal(driver,oldDriver.replaceAll('c<5','c<CITIES.length'))});
check('five city IDs, eleven good IDs, distances and all presentation/profile dimensions unchanged',()=>{
 const g=create(42);assert.deepEqual(clean(g.eval('CITIES')),['Lübeck','Hamburg','Rostock','Stralsund','Stettin']);assert.deepEqual(clean(g.eval('GOODS.map(g=>g[0])')),['Getreide','Bier','Holz','Salz','Fisch','Tuch','Hansegras','Hanf','Pech','Eisenwaren','Pelze']);
 assert.deepEqual(clean(g.eval('DIST')),[[0,2,2,3,4],[2,0,3,4,5],[2,3,0,2,3],[3,4,2,0,2],[4,5,3,2,0]]);
 assert(g.eval('[CITIES,CITYART,CITY_MAP_POINTS,DIST,NEW_GOOD_STOCKS].every(x=>x.length===5)'));assert(g.eval('DIST.every((row,i)=>row.length===5&&row[i]===0&&row.every((d,j)=>d===DIST[j][i]))'));
 for(const prefix of ['const GOODS=','const CITIES=','const DIST=','const NEW_GOOD_STOCKS=','function fresh(','function initialMarkets(','function migrate(','function validate(','function promote(','function dailyMarketPrice(','function warehouseTransfer('])assert.equal(line(current,prefix),line(old,prefix),prefix);
});
function mapCommands(legacy){const g=create(42),commands=[],canvas=new Proxy({setLineDash:v=>commands.push(['dash',v]),beginPath:()=>commands.push(['begin']),fillRect:(...x)=>commands.push(['rect',...x]),moveTo:(...x)=>commands.push(['move',...x]),lineTo:(...x)=>commands.push(['line',...x]),fillText:(...x)=>commands.push(['text',...x]),stroke:()=>commands.push(['stroke']),fill:()=>commands.push(['fill']),closePath:()=>commands.push(['close'])},{set(t,k,v){commands.push(['set',k,v]);t[k]=v;return true}});g.context.document.getElementById=()=>({getContext:()=>canvas});g.eval(line(legacy?old:current,'function drawMap('));g.eval('drawMap()');return commands}
check('canvas drawing command sequence exactly equals old map including labels and pixel positions',()=>assert.deepEqual(clean(mapCommands(false)),clean(mapCommands(true))));
check('every existing route/time and arrival matches old functions for all hulls',()=>{
 for(let from=0;from<5;from++)for(let dest=0;dest<5;dest++)if(from!==dest)for(let type=0;type<3;type++){
  const run=legacy=>{const g=create(10001);if(legacy)for(const name of ['planTravel','arrive','rollTravel','advance'])g.eval(`${name}=${line(old,'function '+name+'(')};`);
   return clean(g.eval(`(()=>{s.city=${from};s.ships=[{...makeShip(${type}),city:${from}}];s.active=0;ship().condition=67;planTravel(${dest});const planned={...pending};if(planned.days!==Math.max(1,Math.ceil(DIST[${from}][${dest}]/(ship().speed*(.65+.35*.67)))))throw Error('time');arrive();let gold=s.gold,day=totalDay();arrive();if(s.gold!==gold||totalDay()!==day)throw Error('double arrival');return {state:s,planned,pending,next:Math.random()}})()`))};assert.deepEqual(run(false),run(true));
 }
});
check('pirate/storm/defence arrival effects and event records remain unchanged',()=>{
 for(const event of ['storm','pirates','defended',null]){const run=legacy=>{const g=create(42);if(legacy)g.eval('arrive='+line(old,'function arrive(')+';');g.eval(`$('qty7').value=5;trade(7,1);pending={from:0,dest:1,days:2,fee:6,qs:[ship().id],resolved:true,event:${JSON.stringify(event)},loss:2};arrive()`);return {state:clean(g.eval('s')),events:clean(g.events),next:g.eval('Math.random()')}};assert.deepEqual(run(false),run(true))}
});
check('v5 save round-trips with all eleven goods in all five warehouses and unchanged finance/ships',()=>{
 const g=create(42);g.eval(`for(let city=0;city<5;city++){s.city=city;ship().city=city;for(let j=0;j<11;j++){$('qty'+j).value=1;trade(j,1);$('warehouseQty'+j).value=1;warehouseTransfer(j,1)}}s.bank=100.25;s.debt=77.75;s=migrate(s)`);assert(g.eval('Object.values(s.warehouses).every(w=>Object.keys(w.cargo).length===11)'));
 const before=g.eval('JSON.stringify(s)'),store={};g.context.localStorage.setItem=(k,v)=>store[k]=v;for(let i=0;i<20;i++){g.eval('save()');g.context.text=store['hansefuerst-v04'];g.eval('s=migrate(JSON.parse(text))')}assert.equal(g.eval('JSON.stringify(s)'),before);
});
check('future/invalid city references remain rejected and inert',()=>{
 const g=create(42);for(const value of ['5','10','-1','1.5','NaN','"0"']){const before=g.eval('JSON.stringify(s)');g.eval(`planTravel(${value})`);assert.equal(g.eval('JSON.stringify(s)'),before)}
 for(const patch of ['x.city=5','x.ships[0].city=10','x.warehouses[5]=emptyWarehouse()','x.ships[0].cargo={0:1};x.ships[0].origins={0:[{city:5,n:1}]}','x.quests=[{city:5,j:0,n:1,reward:1,until:999999}]'])assert.equal(g.eval(`(()=>{let x=JSON.parse(JSON.stringify(s));${patch};return migrate(x)})()`),null,patch);
});
check('old/new optimized loops preserve short decisions, RNG and complete event records',()=>{
 function run(seed,source){const g=create(seed);g.load(source);const raw=clean(g.eval("simulate('optimized',60,12)"));return {raw,state:clean(g.eval('s')),events:clean(g.events),next:g.eval('Math.random()')}}
 for(const seed of [42,10001,10250])assert.deepEqual(run(seed,driver),run(seed,oldDriver));
});
console.log(count+' city-preparation checks passed; 5 cities/11 goods only');
