// Controlled price/save regressions only. No strategy or economy simulation; no result files.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create}=require('./headless.cjs');
const old=execFileSync('git',['show','73ee7e0:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});
const current=fs.readFileSync(process.env.HANSE_GAME,'utf8');
const oldAdvance=old.split('\n').find(l=>l.startsWith('function advance('));
const helper="// Low-price rounding stays symmetric above the floor; reuse the existing random draw.\nfunction dailyMarketPrice(price,draw){return Math.max(4,price<9?price+(draw<.25?-1:draw>=.75?1:0):Math.round(price*(.94+draw*.12)))}\n";
const g=create(42);let checks=0;
function check(name,fn){fn();checks++;console.log('PASS '+name)}
const price=(p,u)=>g.eval(`dailyMarketPrice(${p},${u})`);
check('daily formula and non-price advance effects preserved despite intentional city expansion',()=>{
 assert(current.includes(helper));assert.equal(current.split('\n').find(l=>l.startsWith('function advance(')).replace('c<CITY_COUNT','c<5').replace('m.price=dailyMarketPrice(m.price,Math.random())','m.price=Math.max(4,Math.round(m.price*(.94+Math.random()*.12)))'),oldAdvance);
});
check('4 can rise; floor prevents downward movement',()=>{
 assert.equal(price(4,0),4);assert.equal(price(4,.5),4);assert.equal(price(4,.999999),5);
});
check('5 through 8 can move both directions or remain unchanged',()=>{
 for(let p=5;p<=8;p++){assert.equal(price(p,0),p-1);assert.equal(price(p,.5),p);assert.equal(price(p,.999999),p+1)}
 assert.equal(price(8,.749999),8);assert.equal(price(8,.75),9);assert.equal(price(9,0),8);
});
check('finite positive integers, floor, and exact old behavior for every sampled price >=9',()=>{
 for(const p of [4,5,6,7,8,9,10,16,17,100,999,1000000])for(const u of [0,.001,.249999,.25,.5,.749999,.75,.999999]){
  const actual=price(p,u);assert(Number.isFinite(actual)&&Number.isInteger(actual)&&actual>=4);
  if(p>=9)assert.equal(actual,Math.max(4,Math.round(p*(.94+u*.12))));
 }
});
check('no interior directional bias; floor boundary effect explicitly measured',()=>{
 const result=g.eval(`(()=>{const a=[];for(let p=4;p<=9;p++){let delta=0,up=0,down=0;for(let i=0;i<10000;i++){let next=dailyMarketPrice(p,(i+.5)/10000);delta+=next-p;up+=next>p;down+=next<p}a.push({p,delta,up,down})}return a})()`);
 for(const r of result){if(r.p===4){assert.equal(r.delta,2500);assert.equal(r.down,0)}else{assert.equal(r.delta,0);assert.equal(r.up,r.down)}}
 console.log('DETAIL conditional update means: 4 => +0.25; 5..9 => 0. Daily at 4: +0.0875 with unchanged 35% gate.');
});
function trajectory(seed,legacy=false){const h=create(seed);if(legacy)h.eval('advance='+oldAdvance.replace('c<5','c<CITY_COUNT')+';');return JSON.parse(JSON.stringify(h.eval(`(()=>{
 let draws=0;const random=Math.random;Math.random=()=>{draws++;return random()};
 s.markets=s.markets.map((c,city)=>c.map((m,j)=>({price:4+(city*7+j)%6,stock:50})));const states=[];
 for(let day=0;day<800;day++){advance(1);let a=s.markets.flat().map(m=>m.price);if(a.some(p=>!Number.isFinite(p)||!Number.isInteger(p)||p<4))throw Error('invalid price');states.push(a)}
 return {states,draws,final:s};})()`)))}
check('800 days across all 121 market cells; seeded trajectories repeat exactly',()=>{
 for(const seed of [1,42,10001,10250]){const a=trajectory(seed),b=trajectory(seed);assert.deepEqual(a,b);assert(a.states.some(x=>x.some(p=>p>9)));for(let cell=0;cell<121;cell++)assert(new Set(a.states.map(x=>x[cell])).size>1,'every city/good must move');console.log('DETAIL seed '+seed+': 800-day price range '+Math.min(...a.states.flat())+'..'+Math.max(...a.states.flat()))}
});
check('old/new random call counts and non-price world changes match over 800 days',()=>{
 const a=trajectory(42),b=trajectory(42,true);assert.equal(a.draws,b.draws);
 const strip=s=>({...s,markets:s.markets.map(c=>c.map(({price,...m})=>m))});
 assert.deepEqual(strip(a.final),strip(b.final));console.log('DETAIL 800-day RNG calls old=new: '+a.draws);
});
function boot(html,stored){
 const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^const ART=.*;$/m,'const ART={};');
 const store={...stored},nodes={};const sandbox={console,Date,Math,Map,File,Blob,URL,performance:{now:()=>0},setInterval(){},setTimeout(){},alert(){},confirm:()=>true,navigator:{},window:{addEventListener(){}},localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v,removeItem:k=>delete store[k]},document:{hidden:false,hasFocus:()=>true,addEventListener(){},getElementById(id){return nodes[id]??={innerHTML:'',value:1,style:{},classList:{add(){},remove(){}},getContext(){return null}}}}};
 vm.createContext(sandbox);
 // UI is outside scope; retain real save, migrate and startup loading statements.
 const pos=source.indexOf('try{let raw=localStorage.getItem(KEY)');assert(pos>0);
 vm.runInContext(source.slice(0,pos),sandbox);
 vm.runInContext('render=()=>{};drawMap=()=>{};drawCity=()=>{};welcome=()=>{};',sandbox);
 vm.runInContext(source.slice(pos),sandbox);
 return {store,eval:code=>vm.runInContext(code,sandbox)};
}
check('actual historical v4 startup preserves old markets/cargo/finance and reloads as v6',()=>{
 const h=boot(old,{});h.eval("s=fresh('Ulf','Historical');s=migrate(s);s.markets[0][0].price=4;s.markets[1][1].price=8;marketView=()=>{};render=()=>{};$('qty0').value=6;trade(0,1);s.bank=100.25;s.debt=77.75;");
 const raw=h.eval('JSON.stringify(s)'),app=boot(current,{'hansefuerst-v04':raw});assert.equal(app.eval('s.v'),6);app.eval('save()');const saved=JSON.parse(app.store['hansefuerst-v04']),before=JSON.parse(raw);
 for(const key of ['gold','bank','debt','ships'])assert.deepEqual(saved[key],before[key]);assert.deepEqual(saved.markets.slice(0,5).map(c=>c.slice(0,7)),before.markets);assert.equal(app.store['hansefuerst-v04-cities11-migration-backup'],raw);const reloaded=boot(current,app.store);assert.equal(reloaded.eval('JSON.stringify(s)'),JSON.stringify(saved));
 // v6 is intentionally newer: old releases must not silently truncate it.
 const older=boot(old,app.store);assert.equal(older.eval('s'),null);assert.equal(older.store['hansefuerst-v04'],app.store['hansefuerst-v04']);
});
check('v3 startup migration retains prior backup, reaches v6 without a rounding field',()=>{
 const h=boot(old,{});h.eval("s=migrate(fresh('Ulf','Historical v3'))");const state=JSON.parse(h.eval('JSON.stringify(s)'));state.v=3;delete state.ships[0].city;state.markets[0][0].price=5;
 const raw=JSON.stringify(state),app=boot(current,{'hansefuerst-v03':raw});assert.equal(app.eval('s.v'),6);assert.equal(app.eval('s.ships[0].city'),state.city);assert.equal(app.eval('s.markets[0][0].price'),5);assert.equal(app.store['hansefuerst-v04-migration-backup'],raw);app.eval('save()');assert(JSON.parse(app.store['hansefuerst-v04']));
});
check('loaded low-price save evolves without changing schema',()=>{
 const raw=create(10001).eval('JSON.stringify(s)'),app=boot(current,{'hansefuerst-v04':raw});app.eval('s.markets.forEach(c=>c.forEach(m=>m.price=8));advance(800);save()');
 assert(app.eval('s.markets.some(c=>c.some(m=>m.price!==8))'));assert.equal(JSON.parse(app.store['hansefuerst-v04']).v,6);
});
console.log(checks+' price/save checks passed; controlled daily updates only, no economy run');
