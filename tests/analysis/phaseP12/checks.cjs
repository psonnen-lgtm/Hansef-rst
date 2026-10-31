'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const H=require('./harness.cjs'),{attach}=require('./adapter.cjs'),{clean,hash,root,gameHash}=H,out=process.argv[2];
if(!out||fs.existsSync(out))throw Error('new output required');
const paths=[],checks=[],comparisons=[];
function run(name,options,fn){const h=H.createCase(name,options),start=h.snapshot();let adapter=null;const row={name,start,completed:false};paths.push(row);try{const value=fn(h,()=>adapter??=attach(h));row.completed=true;row.evidence=value;console.log('PASS '+name)}catch(e){row.error=e.stack;console.error(e.stack)}finally{row.final=h.snapshot();if(adapter)row.supply=adapter.side();h.assertNativeUnchanged();row.nativeFunctionsUnchanged=true;}}
function ok(r){assert(r.ok,JSON.stringify(r));return r.value}
function no(r){assert.equal(r.ok,false);return r.reason}
function metrics(h,a){const x=h.state();return {gold:x.gold,owned:x.ships.reduce((n,q)=>n+(q.cargo[0]||0),0)+(x.warehouses[0].cargo[0]||0),market:x.markets[0][0].stock,price:x.markets[0][0].price,nextBuyPrice:x.markets[0][0].price,nextSellPrice:x.markets[0][0].price,consumed:a?a.side().consumed:0,remaining:a?.side().need?.remaining??null,rep:x.rep,rank:x.rank,day:x.year*360+x.day,financial:h.g.eval('netWorth()'),rng:h.rng()}}
function unchanged(h,a,fn){const before={game:h.state(),supply:a.side(),events:clean(h.g.events),disk:h.backend.get(),rng:h.rng()};const result=fn();assert.deepEqual({game:h.state(),supply:a.side(),events:clean(h.g.events),disk:h.backend.get(),rng:h.rng()},before);return result}
function arithmeticChecks(){
 const rows=[];for(const mode of ['A','B','C'])for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){let q=90,available=90,total=0,consumed=0;const p=mode==='A'?30:mode==='B'?16:0;for(const n of parts){const use=Math.min(n,q);q-=use;available-=n;consumed+=use;total+=n*p}assert.equal(q,0);assert.equal(available,0);assert.equal(consumed,90);assert.equal(total,90*p);rows.push({mode,parts:parts.length,total,consumed})}
 for(const [stock,n,publicN,valid]of [[1e9-10,20,0,false],[1e9-10,20,20,true],[0,90,90,true],[20,120,90,true]])assert.equal(stock+n-publicN<=1e9,valid);
 checks.push({name:'pure amount splits and native market upper-bound arithmetic',passed:true,rows});
}
arithmeticChecks();
// Four identical starting V13 games; no alternate economy, no model calibration.
run('01-existing-V13-without-public-consumption',{},h=>{
 const before=metrics(h),event=h.ordinary(90,-1);assert.equal(event.total,2700);assert.equal(event.profit,1980);const immediate=metrics(h);assert.equal(immediate.market,110);assert.equal(immediate.gold,12700);
 assert(h.ordinary(90,1));assert(h.ordinary(90,-1));assert.equal(h.state().gold,12700);assert.equal(h.state().markets[0][0].stock,110);
 const nextPriceSamples=[0,.125,.25,.375,.5,.625,.75,.875,.999].map(draw=>({draw,stock110:h.g.eval(`regionalPrice(30,110,16,${draw})`),stock20:h.g.eval(`regionalPrice(30,20,16,${draw})`)}));const nextStockSamples=[0,.25,.5,.75,.999].map(draw=>({draw,stock110:h.g.eval(`regionalStock(110,0,0,0,${draw})`),stock20:h.g.eval(`regionalStock(20,0,0,0,${draw})`)}));const days=[];for(let i=0;i<7;i++){h.advance(1);days.push(metrics(h))}
 comparisons.push({mode:'V13',initialHash:hash(JSON.stringify(paths.at(-1).start.game)),before,immediate,days});return {immediate,ordinaryRoundTripNoNewGold:true,days,nextPriceSamples,nextStockSamples};
});
for(const mode of ['A','B','C'])run('0'+({A:2,B:3,C:4}[mode])+'-public-'+mode,{},(h,get)=>{
 const a=get();ok(a.certify());const before=metrics(h,a),rng=h.rng(),receipt=ok(a.publicDelivery({id:'delivery:'+mode,mode,n:90})),immediate=metrics(h,a);
 assert.equal(receipt.accepted,90);assert.equal(immediate.market,20);assert.equal(immediate.owned,0);assert.equal(immediate.remaining,0);assert.equal(immediate.consumed,90);assert.deepEqual(h.rng(),rng);
 assert.equal(receipt.actualRevenue,mode==='A'?2700:mode==='B'?1440:0);assert.equal(h.state().gold,10000+receipt.actualRevenue);assert.equal(receipt.foregoneRevenue,mode==='A'?0:mode==='B'?1260:2700);
 if(mode==='C'){assert(!h.g.events.some(e=>e.type==='sell'));assert.equal(h.state().rep,0)}
 unchanged(h,a,()=>no(a.publicDelivery({id:'oversized-rebuy-not-delivery',mode:'C',n:1})));
 const days=[];for(let i=0;i<7;i++){ok(a.advance(1));days.push(metrics(h,a));assert.equal(a.recognitions().length,1);assert.equal(a.side().consumed,90)}
 comparisons.push({mode,initialHash:hash(JSON.stringify(paths.at(-1).start.game)),before,immediate,days});return {receipt,immediate,days,noNewRecognitionOnDays:true};
});
run('05-under-and-over-need-with-mixed-modes',{quantity:140,cost:12},(h,get)=>{
 const a=get();ok(a.certify());const r1=ok(a.publicDelivery({id:'small',mode:'A',n:30}));assert.equal(r1.accepted,30);assert.equal(a.side().need.remaining,60);
 const r2=ok(a.publicDelivery({id:'over',mode:'B',n:90}));assert.equal(r2.accepted,60);assert.equal(r2.actualRevenue,1440);assert.equal(r2.publicRevenue,960);assert.equal(h.state().markets[0][0].stock,50);assert.equal(a.side().consumed,90);assert.equal(metrics(h,a).owned,20);
 unchanged(h,a,()=>no(a.publicDelivery({id:'donation-after-covered',mode:'C',n:20})));
 no(a.certify('another-id'));const r3=ok(a.publicDelivery({id:'normal-after-covered',mode:'A',n:10}));assert.equal(r3.accepted,0);assert.equal(r3.recognitionStatus,'not_recognized');assert.equal(a.recognitions().length,2);return {receipts:[r1,r2,r3],final:metrics(h,a),noNeedRefill:true};
});
for(const [name,parts]of [['06-nine-times-ten',Array(9).fill(10)],['07-ninety-times-one',Array(90).fill(1)]])run(name,{},(h,get)=>{
 const a=get();ok(a.certify());const receipts=[];let i=0;for(const n of parts)receipts.push(ok(a.publicDelivery({id:'part:'+i++,mode:'A',n})));
 assert.equal(receipts.reduce((n,r)=>n+r.accepted,0),90);assert.equal(receipts.reduce((n,r)=>n+r.actualRevenue,0),2700);assert.equal(h.state().gold,12700);assert.equal(h.state().markets[0][0].stock,20);assert.equal(a.side().consumed,90);
 unchanged(h,a,()=>assert(a.publicDelivery({id:'part:'+(parts.length-1),mode:'A',n:parts.at(-1)}).replayed));return {parts:parts.length,receiptQuantitySum:90,receipts,final:metrics(h,a),note:'native V13 reputation is action dependent; no new election points awarded'};
});
run('08-own-ships-warehouse-and-unknown-costs',{quantity:60,cost:8,warehouseQuantity:60,warehouseCost:null,warehouseBook:12,secondShip:true},(h,get)=>{
 const a=get();ok(a.certify());const initial=metrics(h,a);ok(a.transfer(30,1));ok(a.select(1));ok(a.transfer(60,-1));const before=h.state().ships[1];assert.equal(before.costs[0],null);assert.equal(before.origins[0].reduce((n,l)=>n+l.n,0),60);
 const donation=ok(a.publicDelivery({id:'unknown-cost-gift',mode:'C',n:60}));assert.equal(donation.actualGoodsCost,null);assert(Math.abs(donation.consumedBookValue-640)<1e-7);ok(a.select(0));const sale=ok(a.publicDelivery({id:'other-own-ship',mode:'A',n:30}));assert.equal(a.side().consumed,90);assert.equal(h.state().warehouses[0].cargo[0],30);
 return {initial,donation,sale,remainingWarehouse:h.state().warehouses[0],final:metrics(h,a)};
});
run('09-self-created-scarcity-and-buy-return',{quantity:0,stock:110,warehouseQuantity:90},(h,get)=>{
 const a=get();ok(a.buy(80));assert.equal(h.state().markets[0][0].stock,30);assert.equal(a.side().debt,80);const refused=unchanged(h,a,()=>no(a.certify()));assert(a.side().need===null);
 ok(a.ordinarySale(80));assert.equal(h.state().gold,10000);assert.equal(h.state().markets[0][0].stock,110);assert.equal(a.side().debt,0);assert.equal(a.recognitions().length,0);return {refused,final:metrics(h,a),noArtificialNeed:true,warehouseUnchanged:h.state().warehouses[0]};
});
run('10-own-withdrawal-pre-election-sale-and-real-next-days',{day:359},(h,get)=>{
 const a=get();ok(a.certify());ok(a.buy(20));assert.equal(a.side().debt,20);const r=ok(a.publicDelivery({id:'before-vote-date',mode:'A',n:90}));assert.equal(r.accepted,70);assert.equal(a.side().need.remaining,20);assert.equal(h.state().markets[0][0].stock,20);assert.equal(h.state().ships[0].cargo[0],20);
 const before=metrics(h,a);ok(a.advance(2));assert.equal(h.state().year,1351);const rejected=unchanged(h,a,()=>no(a.buy(90)));assert.equal(a.side().consumed,70);assert.equal(a.recognitions().length,1);
 return {receipt:r,before,after:metrics(h,a),rebuyRejected:rejected,rankUnchanged:h.state().rank===0,noActualElectionProgrammed:true};
});
run('11-failure-atomicity-quests-export-and-idempotence',{quest:true},(h,get)=>{
 const a=get();ok(a.certify());const req={id:'saved-delivery',mode:'A',n:90};
 unchanged(h,a,()=>no(a.publicDelivery({...req,cancel:true})));unchanged(h,a,()=>no(a.publicDelivery({...req,n:999})));
 unchanged(h,a,()=>no(a.publicDelivery({...req,mode:'B',fairPrice:30})));unchanged(h,a,()=>no(a.publicDelivery({...req,city:1})));unchanged(h,a,()=>no(a.publicDelivery({...req,expectedRevision:999})));
 h.backend.fail=true;const quota=unchanged(h,a,()=>no(a.publicDelivery(req)));h.backend.fail=false;assert.equal(h.state().quests.length,1);assert.equal(h.state().completed,0);
 const stored=h.backend.get();h.disk['p12-analysis']='other-tab';const beforeMemory=hash(JSON.stringify(h.state()));no(a.publicDelivery(req));assert.equal(hash(JSON.stringify(h.state())),beforeMemory);assert.equal(h.backend.get(),'other-tab');h.disk['p12-analysis']=stored;
 let reentry=false;h.backend.beforeWrite=()=>{reentry=true;no(a.publicDelivery({id:'reentrant',mode:'A',n:1}));};const r=ok(a.publicDelivery(req));h.backend.beforeWrite=null;assert(reentry);assert.equal(h.state().gold,12800);assert.equal(h.state().completed,1);assert.equal(h.state().quests.length,0);assert.equal(h.g.events.filter(e=>e.type==='quest_reward').length,1);assert.equal(h.g.events.filter(e=>e.type==='public_grain_recognition').length,1);
 const raw=a.export(),before=a.snapshot();assert(a.reload(raw).ok);assert.deepEqual(a.snapshot(),before);unchanged(h,a,()=>assert(a.publicDelivery(req).replayed));unchanged(h,a,()=>no(a.publicDelivery({...req,mode:'C'})));
 for(let i=0;i<5;i++)assert.equal(a.recognitions().length,1);assert.deepEqual(a.snapshot(),before);
 const bad=JSON.parse(raw);delete bad.supply;assert(!a.reload(JSON.stringify(bad)).ok);assert.deepEqual(a.snapshot(),before);
 return {receipt:r,quotaFailure:quota,questReward:100,singleQuestAndRecognition:true,fullAnalysisExportReload:true,reentryBlocked:true,staleStorageBlocked:true,final:metrics(h,a)};
});
// Twelfth trajectory is an exact repeat of A, not another calibration or strategy.
if(paths.every(p=>p.completed))run('12-identical-seed-exact-A-reproduction',{},(h,get)=>{
 const a=get();ok(a.certify());ok(a.publicDelivery({id:'delivery:A',mode:'A',n:90}));for(let i=0;i<7;i++)ok(a.advance(1));
 const original=paths.find(p=>p.name==='02-public-A');assert.deepEqual(h.state(),original.final.game);assert.deepEqual(h.rng(),original.final.rng);assert.deepEqual(h.g.events,original.final.events);assert.deepEqual(a.side(),original.supply);return {identicalGameEventsRngAndSupply:true,reference:'02-public-A',final:metrics(h,a)};
});
// At most twelve short trajectories, including the repeat. Do not rerun the suite.
assert(paths.length<=12);assert(H.count()<=12);
if(comparisons.length===4){assert(comparisons.every(c=>c.initialHash===comparisons[0].initialHash));for(let i=0;i<7;i++)for(const c of comparisons)assert.deepEqual(c.days[i].rng,comparisons[0].days[i].rng)}
const result={phase:'P1.2',base:'22fe3c4d92c9dbac439f247ac294104d388b2f6a',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash,gameCodeCommit:'c42c25cf5cf372c210b47f25b00b9f0106044ed3',scope:{city:0,good:0,maxTrajectories:12,created:H.count(),actualElections:false,actualVotes:false,newProductSaveVersion:false},checks,paths,comparisons,acceptance:{allPathsCompleted:paths.every(p=>p.completed),productReady:false}};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({trajectories:paths.length,completed:paths.filter(p=>p.completed).length,failures:paths.filter(p=>!p.completed).length,arithmeticGroups:checks.length}));if(paths.some(p=>!p.completed))process.exitCode=1;
