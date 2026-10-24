// Small catalog/index/save parity checks; no statistical economy run or result-file writes.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create}=require('./headless.cjs');
const base='56e5ebc',old=execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});
const html=fs.readFileSync(process.env.HANSE_GAME,'utf8'),clean=x=>JSON.parse(JSON.stringify(x));let checks=0;
const line=(text,start)=>text.split('\n').find(l=>l.startsWith(start));
function check(name,fn){fn();checks++;console.log('PASS '+name)}
function legacy(g){for(const name of ['validate','advance','takeBath','trade','questsView','planTravel','importGame'])g.eval(`${name}=${name==='validate'?old.slice(old.indexOf('function validate('),old.indexOf('function migrate(')):line(old,'function '+name+'(')};`);return g}
check('catalog order, names, icons, base prices and distances exactly preserved',()=>{
 const g=create(42);assert.deepEqual(clean(g.eval('CITIES')),['Lübeck','Hamburg','Rostock','Stralsund','Stettin']);
 assert.deepEqual(clean(g.eval('GOODS')),[['Getreide','🌾',16],['Bier','🍺',25],['Holz','🪵',19],['Salz','🧂',31],['Fisch','🐟',22],['Tuch','🧵',56],['Hansegras','🌿',84]]);
 for(const start of ['const CITIES=','const GOODS=','const DIST=','const CITYART=','function dailyMarketPrice(','function fresh(','function migrate(','function save(','function capacity(','function promote('])assert.equal(line(html,start),line(old,start),start);
 assert.equal(g.eval('CITY_COUNT'),5);assert.equal(g.eval('GOOD_COUNT'),7);assert.deepEqual(clean(g.eval('QUEST_GOOD_INDICES')),[0,1,2,3,4,5]);
 const d=clean(g.eval('DIST'));assert.equal(d.length,5);d.forEach((row,i)=>{assert.equal(row.length,5);assert.equal(row[i],0);row.forEach((n,j)=>assert.equal(n,d[j][i]))});
});
check('canonical index keys and out-of-range state references rejected',()=>{
 const g=create(42);
 for(const k of ['0','1','4','6'])assert(g.eval(`isIndexKey(${JSON.stringify(k)},GOOD_COUNT)`));
 for(const k of ['7','-1','01','1.5','NaN','Infinity','x','0\n'])assert(!g.eval(`isIndexKey(${JSON.stringify(k)},GOOD_COUNT)`));
 const patches=['x.city=5','x.ships[0].city=5','x.ships[0].cargo={7:1}','x.ships[0].costs={7:1}','x.ships[0].bookCosts={7:1}','x.ships[0].cargo={0:1};x.ships[0].origins={0:[{city:5,n:1}]}','x.journal={5:{prices:GOODS.map(g=>g[2])}}','x.quests=[{city:0,j:7,n:1,reward:1,until:999999}]','x.rumors=[{city:5,j:0,until:999999,text:"x"}]','x.markets.pop()','x.markets[0].pop()'];
 for(const patch of patches)assert.equal(g.eval(`(()=>{const x=JSON.parse(JSON.stringify(s));${patch};return migrate(x)})()`),null,patch);
});
check('invalid public city/good actions are inert and consume no randomness',()=>{
 const g=create(42),before=g.eval('JSON.stringify(s)');g.eval('var draws=0;const rng=Math.random;Math.random=()=>{draws++;return rng()}');
 for(const value of ['-1','5','NaN','Infinity','1.5','"0"'])g.eval(`planTravel(${value})`);
 for(const value of ['-1','7','NaN','Infinity','1.5','"0"'])g.eval(`trade(${value},1)`);
 assert.equal(g.eval('JSON.stringify(s)'),before);assert.equal(g.eval('draws'),0);
});
check('all saved city/good slots round-trip with unchanged cargo and origin meaning',()=>{
 const g=create(42),o=legacy(create(42));
 const code=`(()=>{const a=[];for(let city=0;city<5;city++)for(let good=0;good<7;good++){
 s=fresh('Ulf','Compatibility');s.city=city;s.ships[0].city=city;s.gold=12345;s.bank=100.25;s.debt=77.75;
 s.ships[0].cargo[good]=3;s.ships[0].costs[good]=GOODS[good][2];s.ships[0].origins={[good]:[{city:(city+1)%5,n:3}]};
 s.quests=[{city,j:good,n:3,reward:100,until:totalDay()+10}];observe();let stored;localStorage.setItem=(key,value)=>{if(key===KEY)stored=value};save();s=migrate(JSON.parse(stored));if(!s)throw Error('load');save();a.push(JSON.parse(stored));}return a})()`;
 assert.deepEqual(clean(g.eval(code)),clean(o.eval(code)));
});
check('actual import and save retain prior backup and indexed last-city/last-good cargo',()=>{
 const run=oldVersion=>{const g=oldVersion?legacy(create(42)):create(42);const store={};
 g.context.localStorage.setItem=(k,v)=>store[k]=v;g.context.Testlog.newRun=()=>{};
 g.context.FileReader=class {readAsText(f){this.result=f.content;this.onload()}};
 const before=g.eval('JSON.stringify(s)');
 const raw=g.eval(`(()=>{const x=JSON.parse(JSON.stringify(s));x.city=4;x.ships[0].city=4;x.ships[0].cargo={6:2};x.ships[0].costs={6:84};x.ships[0].origins={6:[{city:3,n:2}]};x.bank=123.25;x.debt=44.75;return JSON.stringify(x)})()`);
 g.context.importEvent={target:{files:[{content:raw}],value:'file'}};g.eval('importGame(importEvent);save()');
 assert.equal(store['hansefuerst-v04-backup'],before);assert.equal(g.context.importEvent.target.value,'');
 const saved=JSON.parse(store['hansefuerst-v04']);assert.equal(saved.city,4);assert.equal(saved.ships[0].cargo[6],2);assert.equal(saved.ships[0].origins[6][0].city,3);assert.equal(saved.bank,123.25);assert.equal(saved.debt,44.75);
 return {state:clean(g.eval('s')),store}};
 assert.deepEqual(run(false),run(true));
});
check('v3 migration and legacy v1 migration have same index assignments',()=>{
 const code=`(()=>{const v3=fresh('Ulf','v3');v3.v=3;v3.city=4;delete v3.ships[0].city;v3.ships[0].cargo={6:2};v3.ships[0].costs={6:84};return [migrate(v3),migrate({version:1,city:3,ship:{cargo:{6:2}},markets:s.markets})]})()`;
 const a=clean(create(42).eval(code)),b=clean(legacy(create(42)).eval(code));assert.deepEqual(a,b);assert.equal(a[0].ships[0].city,4);assert.equal(a[1].ships[0].city,3);
});
check('all 35 goods/cities retain immediate trade prices, quantities and capacity behavior',()=>{
 const code=`(()=>{const a=[];for(let city=0;city<5;city++)for(let good=0;good<7;good++){
 s=fresh('Ulf','Trade');s.city=city;s.ships[0].city=city;const m=s.markets[city][good],p=m.price,gold=s.gold,stock=m.stock;$('qty'+good).value=2;trade(good,1);if(s.gold!==gold-2*p||load()!==2||m.price!==p||m.stock!==stock-2)throw Error('buy');trade(good,-1);if(s.gold!==gold||load()!==0||m.price!==p||m.stock!==stock)throw Error('sell');a.push(s)}return a})()`;
 assert.deepEqual(clean(create(42).eval(code)),clean(legacy(create(42)).eval(code)));
});
check('small mixed path preserves state, event sequence and RNG calls across four seeds',()=>{
 const run=(seed,oldVersion)=>{const g=oldVersion?legacy(create(seed)):create(seed);return clean(g.eval(`(()=>{
 let count=0;const random=Math.random;Math.random=()=>{count++;return random()};
 questsView();$('qty6').value=3;trade(6,1);planTravel(4);arrive();$('qty6').value=3;trade(6,-1);takeBath();advance(40);questsView();return {state:s,count,events:null}})()`))};
 // Capture events independently to compare the existing game functions directly.
 for(const seed of [1,42,10001,10250])assert.deepEqual(run(seed,false),run(seed,true));
 for(const seed of [42,10001]){
 const a=create(seed),b=legacy(create(seed));for(const g of [a,b])g.eval("questsView();$('qty0').value=3;trade(0,1);planTravel(1);arrive();trade(0,-1);takeBath();advance(40)");assert.deepEqual(clean(a.events),clean(b.events));
 }
});
check('400 daily updates preserve every market and complete final RNG state',()=>{
 for(const seed of [42,10001]){
 const a=create(seed),b=legacy(create(seed));for(const g of [a,b])g.eval('advance(400)');assert.deepEqual(clean(a.eval('s')),clean(b.eval('s')));assert.equal(a.eval('Math.random()'),b.eval('Math.random()'));
 }
});
check('market, book and map still generate seven goods/five destinations without new menus',()=>{
 const g=create(42);g.eval('openSheet=(title,content)=>globalThis.panel={title,content}');
 // Restore only the UI functions disabled by the headless harness.
 g.eval(line(html,'function marketView('));g.eval(line(html,'function harborView('));g.eval('drawMap=()=>{}');
 g.eval('marketView()');let content=g.eval('panel.content');assert.equal((content.match(/id="qty/g)||[]).length,7);
 g.eval('bookView()');content=g.eval('panel.content');assert.equal((content.match(/<tr>/g)||[]).length,6);
 g.eval('mapView()');content=g.eval('panel.content');assert.equal((content.match(/onclick="planTravel\(/g)||[]).length,5);
});
console.log(checks+' catalog/save parity checks passed; no economy run');
