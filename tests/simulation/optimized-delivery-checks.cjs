// Bounded delivery fixtures and 12-decision optimized probes; never writes archives.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create}=require('./headless.cjs');
const normalize=require('./accounting-compat.cjs'),restoreRoutes=require('./city-route-compat.cjs');
const driver=fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8');
const base='978d6c4',old=execFileSync('git',['show',base+':tests/simulation/strategies.js'],{encoding:'utf8'});
const restoreFiveLoops=source=>{const marker='// Only the three Phase-1.5b policies',at=source.indexOf(marker);return source.slice(0,at).replaceAll('c<CITIES.length','c<5')+source.slice(at)};
const clean=x=>JSON.parse(JSON.stringify(x));let count=0;
function check(name,fn){fn();count++;console.log('PASS '+name)}
function fixture(code,source=driver){const g=create(10001);g.load(source);g.load(`
 const __sail=dest=>{pending={from:s.city,dest,days:2,fee:6,qs:[ship().id],resolved:true,event:null};arrive()};
 const __buy=(city,n)=>{if(s.city!==city)__sail(city);$('qty0').value=n;trade(0,1)};
 `);g.eval(code);return g}
function sell(g){const before=g.events.length,r=clean(g.eval("simulate('optimized',0,0)")),ev=clean(g.events.slice(before));const rewards=ev.filter(e=>e.type==='quest_reward');assert.equal(r.metrics.quests,rewards.length);assert.equal(r.metrics.questProfit,rewards.reduce((a,e)=>a+e.reward,0));return {r,ev,rewards}}
const offer="s.quests=[{city:0,j:0,n:6,reward:300,until:totalDay()+20}];";
check('source guard permits exact counter/route/catalog-loop edits; delivery game rules unchanged',()=>{
 assert.equal(restoreFiveLoops(normalize(restoreRoutes(driver))),old);
 const html=fs.readFileSync(process.env.HANSE_GAME,'utf8'),original=execFileSync('git',['show','4212c82:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});for(const name of ['trade','completeQuests','consumeOrigins'])assert.equal(html.split('\n').find(l=>l.startsWith('function '+name+'(')),original.split('\n').find(l=>l.startsWith('function '+name+'(')));
});
check('existing four historical source guards still execute without running their simulations',()=>{
 for(const file of ['optimized-phase15a.cjs','observed-phase15b.cjs','delivery-phase15c.cjs','recovery-phase15d.cjs']){
  const src=fs.readFileSync(path.join(__dirname,file),'utf8');
  const marker={'optimized-phase15a.cjs':'function run(', 'observed-phase15b.cjs':"const policies=",'delivery-phase15c.cjs':'const clean=', 'recovery-phase15d.cjs':'const clean='}[file];
  const prefix=src.slice(0,src.indexOf(marker));
  assert(prefix.length>0);const historicalRequire=name=>name==='fs'?{...fs,readFileSync:(file,encoding)=>{const rel=path.relative(path.resolve(__dirname,'../..'),file);const b=execFileSync('git',['show',base+':'+rel],{maxBuffer:10*1024*1024});return encoding?b.toString():b}}:require(name);vm.runInNewContext(prefix,{require:historicalRequire,__dirname,process,console},{filename:file});
 }
});
check('foreign shipment earns exact premium and counters on automatic final sale',()=>{
 const g=fixture("__buy(1,6);__sail(0);"+offer),before=g.eval('s.gold'),price=g.eval('s.markets[0][0].price');const x=sell(g);
 assert.equal(x.r.metrics.quests,1);assert.equal(x.r.metrics.questProfit,300);assert.equal(g.eval('s.gold')-before,6*price+300);assert.equal(g.eval('s.completed'),1);
});
check('any other source city is allowed; no fixed source rule exists',()=>{
 const g=fixture('__buy(2,6);__sail(0);'+offer);assert.equal(sell(g).rewards.length,1);
});
check('wrong destination cannot earn reward',()=>{
 const g=fixture('__buy(1,6);__sail(0);'+offer+'s.quests[0].city=2;');assert.equal(sell(g).rewards.length,0);
});
check('same-city buy/sell cannot earn reward',()=>{
 const g=fixture('__buy(0,6);'+offer);assert.equal(sell(g).rewards.length,0);assert.equal(g.eval('s.completed'),0);
});
check('unknown legacy origin cannot earn reward',()=>{
 const g=fixture('ship().cargo[0]=6;ship().costs[0]=10;ship().origins={0:[{city:null,n:6}]};'+offer);assert.equal(sell(g).rewards.length,0);
});
check('expired order cannot earn reward',()=>{
 const g=fixture('__buy(1,6);__sail(0);'+offer+'s.quests[0].until=totalDay()-1;');assert.equal(sell(g).rewards.length,0);
});
check('delivery at exact deadline is valid',()=>{
 const g=fixture('__buy(1,6);__sail(0);'+offer+'s.quests[0].until=totalDay();');assert.equal(sell(g).rewards.length,1);
});
check('mixed local and foreign cargo cannot inflate foreign quantity',()=>{
 const g=fixture('__buy(0,4);__buy(1,2);__sail(0);'+offer);assert.equal(sell(g).rewards.length,0);
});
check('split sales cannot sum to an order',()=>{
 const g=fixture('__buy(1,6);__sail(0);'+offer);g.eval("$('qty0').value=3;trade(0,-1);trade(0,-1)");assert.equal(g.events.filter(e=>e.type==='quest_reward').length,0);
});
check('piracy consumes origin proof and blocks insufficient delivery',()=>{
 const g=fixture('__buy(1,6);pending={from:1,dest:0,days:2,fee:6,qs:[ship().id],resolved:true,event:"pirates",loss:1};arrive();'+offer);
 assert.equal(g.eval('ship().origins[0].reduce((a,l)=>a+l.n,0)'),5);assert.equal(sell(g).rewards.length,0);
});
check('one order pays once even after a second eligible shipment',()=>{
 const g=fixture('__buy(1,6);__sail(0);'+offer);assert.equal(sell(g).rewards.length,1);
 g.eval('__buy(1,6);__sail(0)');assert.equal(sell(g).rewards.length,0);assert.equal(g.eval('s.completed'),1);
 assert.equal(g.events.filter(e=>e.type==='quest_reward').length,1);
});
// Inspect real offers immediately before the unchanged engine consumes them.
function probe(source){const g=create(10001);g.load(source);g.load(`
 const __checks=[];const __complete=completeQuests;
 completeQuests=(j,n)=>{const before=s.completed,gold=s.gold,day=totalDay(),city=s.city;
  const q=s.quests.find(q=>q.j===j&&q.city===city&&q.until>=day&&n>=q.n);
  __complete(j,n);
  if(s.completed>before){if(!q||q.until<day||q.city!==city||n<q.n||s.gold-gold!==q.reward||s.quests.includes(q))throw Error('invalid live delivery');
   __checks.push({order:{...q},day,city,eligible:n,paid:s.gold-gold});}
 };
 `);g.eval("s.city=1;ship().city=1;$('qty0').value=6;trade(0,1);pending={from:1,dest:0,days:2,fee:6,qs:[ship().id],resolved:true,event:null};arrive();s.quests=[{city:0,j:0,n:6,reward:300,until:totalDay()+20}]");const r=clean(g.eval("simulate('optimized',60,12)"));return {r,events:clean(g.events),checks:clean(g.eval('__checks'))}}
check('12-decision controlled foreign-cargo optimized probe: live offers/counters and exact replay',()=>{
 const a=probe(driver),b=probe(driver);assert.deepEqual(a,b);assert(a.checks.length>0,'must actually fulfil an order');
 const rewards=a.events.filter(e=>e.type==='quest_reward');assert.equal(a.r.metrics.quests,rewards.length);assert.equal(a.r.metrics.questProfit,rewards.reduce((n,e)=>n+e.reward,0));assert.equal(a.checks.length,rewards.length);
 const restored=probe(restoreRoutes(driver).replaceAll('c<CITIES.length','c<5')),historical=probe(old);assert.deepEqual(restored.events,historical.events);assert.deepEqual(restored.checks,historical.checks);
 const strip=r=>{const {quests,questProfit,...metrics}=r.metrics;return {...r,metrics}};assert.deepEqual(strip(restored.r),strip(historical.r));
 assert.equal(historical.r.metrics.quests,0);assert.equal(historical.r.metrics.questProfit,0);
 console.log('DETAIL controlled probe: '+rewards.length+' rewards / '+a.r.metrics.questProfit+' gold; '+a.events.filter(e=>e.type==='travel').length+' trips; historical five-destination route comparison unchanged');
});
check('integrated short run enforces both counters against actual reward events',()=>{
 const {registry,runOne}=require('./integrated.cjs');
 const policy={...registry.find(p=>p.id==='optimized'),invoke:"(()=>{s.city=1;ship().city=1;$('qty0').value=6;trade(0,1);pending={from:1,dest:0,days:2,fee:6,qs:[ship().id],resolved:true,event:null};arrive();s.quests=[{city:0,j:0,n:6,reward:300,until:totalDay()+20}];return simulate('optimized',60,12)})()"};
 const row=runOne(policy,10001);assert.equal(row.deliveries.completed,1);assert.equal(row.deliveries.premiums,300);
 assert(!row.warnings.some(w=>w.includes('counter differs')));
 for(const field of ['quests','questProfit'])assert.throws(()=>runOne({...policy,invoke:`(()=>{const r=simulate('optimized',0,0);r.metrics.${field}=1;return r})()`},10001),/optimized .* counter/);
});
check('historical parity permits only corrected counters and rejects other drift',()=>{
 const {checkHistoricalParity}=require('./integrated.cjs');
 const archive=JSON.parse(require('node:zlib').gunzipSync(fs.readFileSync(path.join(__dirname,'phase15e-results.json.gz'))));
 const row=clean(archive.rows.find(r=>r.strategy==='optimized'));
 row.raw.metrics.quests=row.deliveries.completed;row.raw.metrics.questProfit=row.deliveries.premiums;
 assert.doesNotThrow(()=>checkHistoricalParity([row]));
 row.raw.metrics.fees++;assert.throws(()=>checkHistoricalParity([row]));row.raw.metrics.fees--;
 row.raw.metrics.questProfit++;assert.throws(()=>checkHistoricalParity([row]));
});
console.log(count+' targeted checks passed; 4 controlled probes x at most 12 decisions; additional zero-decision counter-rejection fixtures, no large simulation');
