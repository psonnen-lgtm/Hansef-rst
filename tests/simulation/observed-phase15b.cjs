const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto'),zlib=require('zlib'),{execFileSync}=require('child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs');
const base='aa9670db773114f393ffc7cb27d9a4e7940b4dbd';
const driver=fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8'),old=execFileSync('git',['show',base+':tests/simulation/strategies.js'],{encoding:'utf8'});
const guard="\n if(['cautious','normal','aggressive'].includes(strategy))return simulateObserved(strategy,maxDays,maxDecisions);";
assert.equal(driver.split('// Only the three Phase-1.5b policies')[0].replace(guard,'').trim(),old.trim(),'Legacy strategy body byte-identical, only explicit three-policy dispatch added');
assert.equal(fs.readFileSync(process.env.HANSE_GAME,'utf8'),execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024}),'Unchanged game');
const policies=['cautious','normal','aggressive'],g=create(10001);g.load(driver);
const view={gold:5000,day:10,space:100,local:[{price:50,stock:200}],journal:{1:{day:10,prices:[100]}},destinations:[{city:1,days:2,fee:6},{city:2,days:6,fee:6}]};
function choose(strategy,v){return JSON.parse(JSON.stringify(g.eval(`planObserved('${strategy}',${JSON.stringify(v)})`)))}
const fixture=policies.map(s=>({strategy:s,...choose(s,view)}));
assert.deepEqual(fixture.map(x=>x.quantity),[35,70,94]);assert.deepEqual(fixture.map(x=>x.reserve),[2750,1250,250]);
for(const d of fixture){assert(d.city===1&&d.quantity>0&&d.expectedGain>0);assert(view.gold-d.quantity*50-d.fee>=d.reserve);}
// Unknown overseas prices cannot cause a speculative purchase; learn by actual visits.
assert.equal(choose('normal',{...view,journal:{}}).kind,'observe');assert.equal(choose('normal',{...view,journal:{}}).quantity,0);
// The planner has no access to hidden remote markets, even if those would favor a different route.
g.eval(`s.markets=new Proxy(s.markets,{get(){throw Error('Planner attempted game market access')}})`);
for(const s of policies)assert.equal(choose(s,view).city,1);
// Stale optimistic quotes are discounted more by cautious, thin margins accepted by aggressive.
const thin={...view,journal:{1:{day:10,prices:[52]}}};assert.equal(choose('cautious',thin).kind,'observe');assert.equal(choose('aggressive',thin).kind,'trade');
const rows=[];
function run(strategy,seed){const h=create(seed);h.load(driver);const result=JSON.parse(JSON.stringify(h.eval(`simulate('${strategy}')`)));const counts=Object.fromEntries(['buy','sell','travel'].map(type=>[type,h.events.filter(e=>e.type===type).length]));assert.equal(result.metrics.realisedProfit,h.events.filter(e=>e.type==='sell').reduce((n,e)=>n+(e.profit??0),0),'Realised profit matches actual sell events');return {strategy,seed,...counts,result};}
for(const strategy of policies)for(let seed=10001;seed<=10010;seed++){
 const a=run(strategy,seed),b=run(strategy,seed);assert.deepEqual(a,b,'Exact replay '+strategy+'/'+seed);
 assert(a.buy>0&&a.sell>0&&a.travel>0,'Actual trade/reise '+strategy+'/'+seed);
 const m=a.result.metrics;assert.equal(m.bought,a.buy);assert.equal(m.sold,a.sell);assert.equal(m.trips,a.travel);
 assert(!m.negativeGold&&!m.invalidCargo&&!m.invalidPrice);
 for(const d of a.result.decisions)if(d.quantity)assert(d.cashAfterFee+1e-8>=d.requiredReserve,'Reserve after committed arrival fee');
 rows.push(a);console.log(JSON.stringify({strategy,seed,buy:a.buy,sell:a.sell,travel:a.travel,profit:m.realisedProfit,stop:a.result.stopReason}));
}
for(let seed=10001;seed<=10010;seed++)assert.equal(new Set(policies.map(s=>JSON.stringify(rows.find(r=>r.strategy===s&&r.seed===seed).result.decisions))).size,3,'Distinct traces '+seed);
const sums=policies.map(strategy=>{const a=rows.filter(x=>x.strategy===strategy),median=k=>{const b=a.map(k).sort((a,b)=>a-b);return (b[4]+b[5])/2};return {strategy,runs:a.length,buy:a.reduce((n,x)=>n+x.buy,0),sell:a.reduce((n,x)=>n+x.sell,0),travel:a.reduce((n,x)=>n+x.travel,0),deadlocks:a.filter(x=>x.result.metrics.deadlock).length,medianWealth:median(x=>x.result.wealth),medianProfit:median(x=>x.result.metrics.realisedProfit),medianExposure:median(x=>{const d=x.result.decisions.filter(d=>d.quantity);return d.reduce((n,d)=>n+(d.cashBefore-d.cashAfterBuy)/d.cashBefore,0)/d.length}),firstDecisions:a.map(x=>({seed:x.seed,decisions:x.result.decisions.slice(0,5)})),firstTrades:a.map(x=>({seed:x.seed,...x.result.decisions.find(d=>d.quantity)}))};});
const data={baseCommit:base,gameSHA256:hash,strategySHA256:crypto.createHash('sha256').update(driver).digest('hex'),rng:'mulberry32',seeds:'10001..10010',maxDays:1440,maxDecisions:800,fixture,summary:sums,rows};
fs.writeFileSync(path.join(__dirname,'phase15b-results.json.gz'),zlib.gzipSync(JSON.stringify(data),{level:9}));
fs.writeFileSync(path.join(__dirname,'phase15b-summary.json'),JSON.stringify({...data,rows:undefined},null,2)+'\n');
console.log('PASS planner information boundary, distinct decisions, reserve/risk policies, legacy isolation, 30 runs + 30 exact replays');
