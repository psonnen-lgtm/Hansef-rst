// Targeted regression and ten paired, reproducible optimized-bot runs. No full suite.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto');
const {execFileSync}=require('child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs');
const base='dd7d0cb7c2c55672a1223bc099f1a93e79fe40a3';
const old=execFileSync('git',['show',base+':tests/simulation/strategies.js'],{encoding:'utf8'});
const driver=fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8');
const prefix="function knownPrice(city,j){";
const optimizedBody=driver.split('// Only the three Phase-1.5b policies')[0].replace("\n if(['cautious','normal','aggressive'].includes(strategy))return simulateObserved(strategy,maxDays,maxDecisions);",'').trim();
// Phase 1.6b permits exactly the accounting edits, never different choices or rules.
const legacyOptimizedBody=require('./accounting-compat.cjs')(optimizedBody);
assert.equal(legacyOptimizedBody,old.replace(prefix,prefix+"if(strategy==='optimized')return s.markets[city][j].price;").trim(),'Legacy optimized body unchanged apart from the phase-1.5a fix and phase-1.6b accounting');
assert.equal(fs.readFileSync(process.env.HANSE_GAME,'utf8'),execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024}),'Game unchanged');
function run(seed,source=driver,maxDecisions=800,setup=''){
 const g=create(seed);g.load(source);if(setup)g.eval(setup);
 const result=JSON.parse(JSON.stringify(g.eval(`simulate('optimized',1440,${maxDecisions})`)));
 const counts=Object.fromEntries(['buy','sell','travel'].map(type=>[type,g.events.filter(e=>e.type===type).length]));
 const manifest=g.events.filter(e=>['buy','sell','travel'].includes(e.type));
 return {seed,...counts,deadlock:result.metrics.deadlock,days:result.days,decisions:result.metrics.decisions,wealth:result.wealth,realisedProfit:result.metrics.realisedProfit,firstActions:JSON.parse(JSON.stringify(manifest.slice(0,3))),result};
}
// No foreign journal entries at start: old bot stops on its first decision.
const before=run(10001,old,1);assert.equal(before.travel,0);assert.equal(before.deadlock,true);
// Stale journal says city 1 is best; current markets make city 2 overwhelmingly best.
const setup=`s.journal={};for(let c=0;c<5;c++){s.journal[c]={prices:GOODS.map(()=>c===1?999:1)};for(let j=0;j<GOODS.length;j++)s.markets[c][j]={price:c===0?10:c===2?200:10,stock:100}}`;
const probe=create(10001);probe.load(driver);probe.eval(setup);const outcome=JSON.parse(JSON.stringify(probe.eval("simulate('optimized',1440,1)")));
assert.equal(probe.eval('s.city'),2,'Choose current profitable target despite stale journal');
assert(probe.events.some(e=>e.type==='buy'&&e.quantity>0),'Buy cargo');assert(probe.events.some(e=>e.type==='travel'),'Travel');assert(probe.events.some(e=>e.type==='sell'&&e.quantity>0),'Sell at arrival');assert(outcome.metrics.realisedProfit>0,'Positive realised margin in fixture');
const rows=[];
for(let seed=10001;seed<=10010;seed++){
 const a=run(seed),b=run(seed);assert.deepEqual(a,b,'Replay '+seed);
 assert(a.buy>0&&a.sell>0&&a.travel>0,'Trade and travel '+seed);assert(a.days>0,'Time advances '+seed);
 assert(!a.result.metrics.negativeGold&&!a.result.metrics.invalidCargo&&!a.result.metrics.invalidPrice,'Valid state '+seed);
 rows.push(a);
 console.log(JSON.stringify({seed,buy:a.buy,sell:a.sell,travel:a.travel,deadlock:a.deadlock,days:a.days,decisions:a.decisions}));
}
const payload={phase:'1.5a',baseCommit:base,gameSHA256:hash,strategySHA256:crypto.createHash('sha256').update(driver).digest('hex'),rng:'mulberry32',seeds:'10001..10010',maxDays:1440,maxDecisions:800,checks:['only optimized price guard and delivery accounting changed','game byte-identical','old first-decision deadlock reproduced','current markets beat contradictory journal','profitable buy/travel/sell fixture','ten deterministic replays','ten nonempty trading runs','state invariants'],beforeFirstDecision:{buy:before.buy,sell:before.sell,travel:before.travel,deadlock:before.deadlock},rows};
fs.writeFileSync(path.join(__dirname,'phase15a-results.json'),JSON.stringify(payload,null,2)+'\n');
console.log('PASS optimized regression + 10 seeds + 10 exact replays');
