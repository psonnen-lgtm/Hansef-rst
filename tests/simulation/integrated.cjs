const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict'),zlib=require('zlib');
// Pin the same shipped file for all drivers, independent of any dist/ directory.
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs');
const sources=Object.fromEntries(['strategies.js','delivery-strategy.js','recovery-strategy.js'].map(f=>[f,fs.readFileSync(path.join(__dirname,f),'utf8')]));
const registry=[...['cautious','normal','aggressive','optimized'].map(id=>({id,family:'trade',information:id==='optimized'?'current_all_markets_oracle':'local_and_journal',horizon:'1440 days / 800 decisions',validation:id==='optimized'?'price access and trade validated; delivery accounting checked; legacy quest routing NOT validated':'observed trade and reserve policy validated',invoke:`simulate('${id}')`})),{id:'delivery',family:'delivery',information:'local_and_journal',horizon:'one regular order / fresh single ship',validation:'single-order delivery and provenance validated; multi-order career NOT validated',invoke:'simulateDelivery()'},...[5,10,20,30].map(n=>({id:'recovery'+n,family:'recovery',information:'loss phase: adversarial current_all_markets_oracle; recovery: local_and_journal',horizon:'up to 160 loss attempts; then 1440 days / 800 recovery decisions',validation:'loss counting and observed recovery validated; policy-specific, not general insolvency probability',invoke:`simulateRecovery(${n})`}))];
const setup=`
const __audit={observedDecisions:0,deliveryAssessments:0};
let __planning=false;
s.markets=new Proxy(s.markets,{get(target,key,receiver){if(__planning)throw Error('hidden market access from planner');return Reflect.get(target,key,receiver)}});
const __observed=planObserved;
planObserved=(strategy,v)=>{
 if(v.gold!==s.gold||v.day!==totalDay())throw Error('invalid observation state');
 if(JSON.stringify(v.local)!==JSON.stringify(s.markets[s.city].map(m=>({price:m.price,stock:m.stock}))))throw Error('nonlocal snapshot');
 const journal={};for(const [city,e]of Object.entries(s.journal))journal[city]={day:e.year*360+e.day,prices:[...e.prices]};
 if(JSON.stringify(v.journal)!==JSON.stringify(journal)||Object.values(journal).some(e=>e.day>totalDay()))throw Error('invented/future quote');
 __audit.observedDecisions++;__planning=true;try{return __observed(strategy,v)}finally{__planning=false}
};
const __assess=assessDelivery;
assessDelivery=o=>{
 const q=s.quests.find(q=>q.city===o.destination&&q.n===o.quantity&&q.reward===o.reward&&q.until===o.until);
 if(!q||o.source!==s.city||o.buyPrice!==s.markets[s.city][q.j].price||o.stock!==s.markets[s.city][q.j].stock||o.gold!==s.gold||o.knownSalePrice!==s.journal[o.destination]?.prices[q.j])throw Error('invalid delivery observation');
 __audit.deliveryAssessments++;__planning=true;try{return __assess(o)}finally{__planning=false}
};
const __snapshot=()=>({day:totalDay(),gold:s.gold,bank:s.bank,debt:s.debt,wealth:netWorth(),rank:s.rank,completed:s.completed,shipValue:s.ships.reduce((a,q)=>a+SHIPTYPES[q.type].cost*(.45+.35*q.condition/100),0),cargoValue:cargoWorth(),arrivalFee:s.ships.filter(q=>q.city===s.city).reduce((a,q)=>a+[4,6,9][q.type],0),creditAvailable:Math.max(0,creditLimit()-s.debt)});
`;
const clean=x=>JSON.parse(JSON.stringify(x));
function runOne(policy,seed){
 const g=create(seed);for(const source of Object.values(sources))g.load(source);g.load(setup);
 // Capture timestamps without changing random calls, clocks, rules or choices.
 g.load(`const __event=Testlog.event;Testlog.event=(type,details)=>__event(type,{...details,simDay:totalDay()});`);
 const initial=clean(g.eval('__snapshot()')),raw=clean(g.eval(policy.invoke)),final=clean(g.eval('__snapshot()')),audit=clean(g.eval('__audit')),events=clean(g.events);
 const sum=(type,key,filter=()=>true)=>events.filter(e=>e.type===type&&filter(e)).reduce((a,e)=>a+(e[key]??0),0),count=t=>events.filter(e=>e.type===t).length;
 const bank=op=>sum('bank','amount',e=>e.operation===op),unknownProfit=events.filter(e=>e.type==='sell'&&e.profit==null).length;
 const finance={borrowed:bank('borrow'),repaid:bank('repay'),deposited:bank('deposit'),withdrawn:bank('withdraw'),debtInterest:sum('interest','debtInterest'),bankInterest:sum('interest','bankInterest'),finalDebt:final.debt};
 const trading={purchases:count('buy'),sales:count('sell'),journeys:count('travel'),boughtUnits:sum('buy','quantity'),soldUnits:sum('sell','quantity'),purchaseCost:sum('buy','total'),salesRevenue:sum('sell','total'),realisedTradeProfit:sum('sell','profit'),unknownProfitSales:unknownProfit,cargoLossCost:events.filter(e=>e.type==='pirate_loss').reduce((a,e)=>a+e.quantity*(e.averageCost??0),0)};
 const deliveries={completed:count('quest_reward'),premiums:sum('quest_reward','reward')};
 const costs={harborFees:sum('travel','fee'),repairs:sum('repair','cost'),arms:sum('ship_arms','cost'),shipPurchases:sum('ship_purchase','cost'),rumors:sum('rumor','cost'),donations:sum('donation','cost')};
 const tolerance=1e-6;
 assert(Math.abs(final.gold-(initial.gold+trading.salesRevenue-trading.purchaseCost+deliveries.premiums+finance.borrowed-finance.repaid-finance.deposited+finance.withdrawn-Object.values(costs).reduce((a,b)=>a+b,0)))<tolerance,'cash ledger');
 assert(Math.abs(final.debt-(initial.debt+finance.borrowed-finance.repaid+finance.debtInterest))<tolerance,'debt ledger');
 assert(Math.abs(final.bank-(initial.bank+finance.deposited-finance.withdrawn+finance.bankInterest))<tolerance,'bank ledger');
 assert.equal(deliveries.completed,final.completed-initial.completed);
 assert(!unknownProfit,'fresh-run purchase costs must be known');
 const seeksOffice=policy.family==='trade',promotionIndex=events.findIndex(e=>e.type==='promotion'&&e.rank===4),promotion=events[promotionIndex];
 const career={seeksOffice,finalRank:final.rank,reachedEldermann:final.rank===4,daysToEldermann:promotion?promotion.simDay-initial.day:null,journeysToEldermann:promotion?events.slice(0,promotionIndex).filter(e=>e.type==='travel').length:null,decisionsToEldermann:promotion?events.slice(0,promotionIndex).filter(e=>e.type==='travel').length:null,decisionConvention:'completed single-trip trading/observation cycles before promotion; no office-seeking policy for delivery/recovery'};
 let economic=final.gold<final.arrivalFee&&final.bank<1&&final.creditAvailable<1;
 let stopReason=raw.stopReason??(policy.family==='delivery'?raw.status+':'+raw.reason:raw.metrics?.deadlock?'legacy_planner_no_action':raw.days>=1440?'day_limit':'decision_limit');
 const stopping={reason:stopReason,driverReportedBlock:raw.shipStranded??raw.metrics?.deadlock??raw.status==='failed',economicTravelBlocked:economic,shipStranded:economic&&final.shipValue>0};
 const warnings=[];if(policy.id==='optimized'){assert.equal(raw.metrics.quests,deliveries.completed,'optimized quest counter');assert.equal(raw.metrics.questProfit,deliveries.premiums,'optimized premium counter');warnings.push('Legacy quest routing is not validated as a delivery policy');}if(raw.metrics?.quests!=null&&raw.metrics.quests!==deliveries.completed)warnings.push('Native quest counter differs from actual reward events; uniform event ledger is authoritative');
 return {strategy:policy.id,seed,warnings,initial,final,days:final.day-initial.day,trading,deliveries,costs,finance,career,stopping,audit,raw,events};
}
function checkResults(rows){
 assert.equal(rows.length,90);for(const p of registry){const a=rows.filter(r=>r.strategy===p.id);assert.equal(a.length,10);assert.deepEqual(a.map(r=>r.seed),Array.from({length:10},(_,i)=>10001+i));}
 for(const r of rows){assert(r.trading.purchases>0&&r.trading.sales>0&&r.trading.journeys>0,'actual actions');if(['cautious','normal','aggressive'].includes(r.strategy)){assert(r.audit.observedDecisions>0);assert.equal(r.trading.realisedTradeProfit,r.raw.metrics.realisedProfit);}
 if(r.strategy==='delivery'){assert(r.audit.deliveryAssessments>0);assert(r.deliveries.completed>=1);assert.equal(r.deliveries.premiums,r.raw.premium);}
 if(r.strategy.startsWith('recovery')){const raw=r.raw;assert.equal(raw.lossCount,raw.lossTrades.filter(t=>t.counted).length);assert(raw.lossCount===raw.targetLosses||raw.lossStatus!=='completed');for(const t of raw.lossTrades.filter(t=>t.counted))assert(t.quantity>0&&t.sold>0&&t.from!==t.to&&t.tradeProfit<0);if(raw.shipStranded)assert(r.stopping.economicTravelBlocked);}
 }
 for(let seed=10001;seed<=10010;seed++){
 assert.equal(new Set(['cautious','normal','aggressive'].map(id=>JSON.stringify(rows.find(r=>r.strategy===id&&r.seed===seed).raw.decisions))).size,3,'different trading decisions');
 assert.equal(new Set([5,10,20,30].map(n=>JSON.stringify(rows.find(r=>r.strategy==='recovery'+n&&r.seed===seed).raw.lossTrades))).size,4,'different stress paths');
 }
}
function checkHistoricalParity(rows){
 const read=f=>{const b=fs.readFileSync(path.join(__dirname,f));return JSON.parse(f.endsWith('.gz')?zlib.gunzipSync(b):b)};
 const archive={trade:read('phase15b-results.json.gz').rows,optimized:read('phase15a-results.json').rows,delivery:read('phase15c-results.json').rows,recovery:read('phase15d-results.json.gz').rows};
 for(const r of rows){let old;if(r.strategy==='optimized')old=archive.optimized.find(x=>x.seed===r.seed).result;
 else if(['cautious','normal','aggressive'].includes(r.strategy))old=archive.trade.find(x=>x.seed===r.seed&&x.strategy===r.strategy).result;
 else if(r.strategy==='delivery')old=archive.delivery.find(x=>x.seed===r.seed);
 else old=archive.recovery.find(x=>x.seed===r.seed&&x.targetLosses===r.raw.targetLosses);
 for(const key of Object.keys(r.raw)){
  if(r.strategy==='optimized'&&key==='metrics'){
   // Only these two previously missing counters may differ from archived behavior.
   const {quests,questProfit,...current}=r.raw.metrics;
   const {quests:oldQuests,questProfit:oldProfit,...archived}=old.metrics;
   assert.equal(oldQuests,0);assert.equal(oldProfit,0);
   assert.equal(quests,r.deliveries.completed);assert.equal(questProfit,r.deliveries.premiums);
   assert.deepEqual(current,archived,'archived optimized metrics except corrected delivery counters');
  }else assert.deepEqual(r.raw[key],old[key],'archived raw behavior '+r.strategy+'/'+r.seed+'/'+key);
 }
 }
}
function main(){
 if(process.env.SIM_DRIVER||process.env.SIM_OUTPUT)throw Error('Historical overrides are unsupported here; use legacy-run-phase15.cjs for archives. Integrated run is fixed to ten seeds.');
 const rows=[];for(const p of registry){for(let seed=10001;seed<=10010;seed++){const a=runOne(p,seed),b=runOne(p,seed);assert.deepEqual(a,b,'replay '+p.id+'/'+seed);rows.push(a);}console.log('PASS '+p.id+' (10 seeds + exact replays)');}
 checkResults(rows);checkHistoricalParity(rows);
 const payload={schemaVersion:1,excludedStrategies:[{id:'informed',reason:'not sufficiently differentiated or validated; excluded'},...['bad5','bad10','bad20','bad30'].map(id=>({id,reason:'unvalidated legacy stress label; replaced by recovery driver'}))],baseCommit:'51478fba2d36b78ed6d49231a9bd4fe582e19ea4',gameSHA256:hash,harnessHashes:Object.fromEntries(['integrated.cjs','headless.cjs'].map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,f))).digest('hex')])),driverHashes:Object.fromEntries(Object.entries(sources).map(([f,s])=>[f,crypto.createHash('sha256').update(s).digest('hex')])),rng:'mulberry32',seeds:'10001..10010',registry,rows};
 const summary={...payload,rows:rows.map(({raw,events,...r})=>({...r,rawSummary:{lossCount:raw.lossCount??null,lossTarget:raw.targetLosses??null,lossStatus:raw.lossStatus??null,recovered:raw.recovered??null,deliveryStatus:raw.status??null,decisionCount:raw.decisions?.length??raw.metrics?.decisions??raw.recoveryTrades?.length??null}}))};
 fs.writeFileSync(path.join(__dirname,'phase15e-results.json.gz'),zlib.gzipSync(JSON.stringify(payload),{level:9}));
 fs.writeFileSync(path.join(__dirname,'phase15e-summary.json'),JSON.stringify(summary,null,2)+'\n');console.log('PASS integrated checks: 90 runs + 90 replays; no 2250-run simulation');
}
module.exports={registry,runOne,checkResults,checkHistoricalParity,setup,sources,main};
