const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto'),zlib=require('zlib'),{execFileSync}=require('child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');const {create,hash}=require('./headless.cjs');
const base='99822c3e1c74223fd51edd78d9eb981770b5d031',driver=fs.readFileSync(path.join(__dirname,'recovery-strategy.js'),'utf8'),policies=fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8');
for(const f of ['Hansefuerst_0_4.html','tests/simulation/strategies.js','tests/simulation/delivery-strategy.js','tests/simulation/headless.cjs'])assert.equal(fs.readFileSync(path.resolve(__dirname,'../..',f),'utf8'),execFileSync('git',['show',base+':'+f],{encoding:'utf8',maxBuffer:10*1024*1024}),'unchanged '+f);
const clean=x=>JSON.parse(JSON.stringify(x)),checks=[],rows=[];
function run(n,seed,setup=''){const g=create(seed);g.load(policies);g.load(driver);if(setup)g.eval(setup);const r=clean(g.eval(`simulateRecovery(${n})`)),events=clean(g.events);
 assert.equal(r.lossCount,r.lossTrades.filter(x=>x.counted).length);
 assert(r.lossCount===n||r.lossStatus!=='completed');
 for(const t of r.lossTrades.filter(t=>t.counted))assert(t.quantity>0&&t.sold>0&&t.from!==t.to&&t.trip&&t.tradeProfit<0&&t.netResult<0);
 for(const t of [...r.lossTrades,...r.recoveryTrades])assert.equal(t.dayAfter-t.dayBefore,t.trip.days);
 const borrowed=events.filter(e=>e.type==='bank'&&e.operation==='borrow').reduce((a,e)=>a+e.amount,0),interest=events.filter(e=>e.type==='interest').reduce((a,e)=>a+e.debtInterest,0);
 const tradeProfit=events.filter(e=>e.type==='sell').reduce((a,e)=>a+(e.profit??0),0);assert(Math.abs(tradeProfit-[...r.lossTrades,...r.recoveryTrades].reduce((a,t)=>a+t.tradeProfit,0))<1e-7);
 const trades=[...r.lossTrades,...r.recoveryTrades];
 assert.equal(events.filter(e=>e.type==='buy').length,trades.filter(t=>t.quantity>0).length);
 assert.equal(events.filter(e=>e.type==='sell').length,trades.filter(t=>t.sold>0).length);
 assert.equal(events.filter(e=>e.type==='travel').length,trades.length);
 assert(Math.abs(r.final.debt-(r.start.debt+borrowed+interest))<1e-6,'actual debt/interest accounting');
 assert(Math.abs(r.final.gold-(r.start.gold+borrowed+trades.reduce((a,t)=>a+t.netResult,0)))<1e-6,'cash accounting');
 if(r.shipStranded){assert(r.final.gold<g.eval('[4,6,9][ship().type]'));assert(r.final.creditAvailable<1&&r.final.bank<1);}
 return {seed,...r,borrowed,interest,eventsSummary:{buys:events.filter(e=>e.type==='buy').length,sells:events.filter(e=>e.type==='sell').length,trips:events.filter(e=>e.type==='travel').length},tradeProfit};}
for(const n of [5,10,20,30])for(let seed=10001;seed<=10010;seed++){const a=run(n,seed);assert.deepEqual(a,run(n,seed),'replay '+n+'/'+seed);rows.push(a);console.log(JSON.stringify({n,seed,count:a.lossCount,loss:a.lossStatus,cash:Math.round(a.lossEnd.gold),recovered:a.recovered,stop:a.stopReason,borrowed:a.borrowed}));}
checks.push('40 loss-count proofs with cross-harbor buy/travel/sell','40 exact replays','actual sale profit reconciliation','actual travel-time reconciliation','actual buy/sell/travel event counts','actual debt, interest and cash accounting','economic stop requires exhausted bank and credit');
// A genuine liquidity stop is explicit, with no borrowing capacity; only fixture state differs.
const stuck=run(5,42,'s.gold=0;s.bank=0;s.debt=4000');assert(stuck.lossCount===0&&stuck.lossStatus==='loss_purchase_unaffordable'&&stuck.shipStranded);checks.push('zero-cash ship owner cannot sail with exhausted credit');
const funded=run(5,42,'s.gold=0;s.bank=0');assert(funded.borrowed>0&&!funded.shipStranded);checks.push('available existing bank credit is actually used');
for(let seed=10001;seed<=10010;seed++){const a=rows.filter(x=>x.seed===seed);assert(new Set(a.map(x=>JSON.stringify(x.lossTrades))).size===4,'Different stress lengths or explicitly early stops');}
const payload={baseCommit:base,gameSHA256:hash,driverSHA256:crypto.createHash('sha256').update(driver).digest('hex'),rng:'mulberry32',seeds:'10001..10010',checks,fixtures:{stuck,funded},rows};
fs.writeFileSync(path.join(__dirname,'phase15d-results.json.gz'),zlib.gzipSync(JSON.stringify(payload),{level:9}));
fs.writeFileSync(path.join(__dirname,'phase15d-summary.json'),JSON.stringify({...payload,fixtures:{stuck:{lossCount:stuck.lossCount,stopReason:stuck.stopReason},funded:{borrowed:funded.borrowed,stopReason:funded.stopReason}},rows:rows.map(({lossTrades,recoveryTrades,...r})=>({...r,lossTrades:lossTrades.map(t=>({quantity:t.quantity,sold:t.sold,from:t.from,to:t.to,tradeProfit:t.tradeProfit,netResult:t.netResult,counted:t.counted})),recoveryDecisions:recoveryTrades.length,recoveryProfit:recoveryTrades.reduce((a,t)=>a+t.tradeProfit,0)}))},null,2)+'\n');
console.log('PASS recovery strategy regression checks');
