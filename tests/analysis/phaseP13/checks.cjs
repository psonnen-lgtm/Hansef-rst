'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const H=require('./harness.cjs'),{attach}=require('./adapter.cjs'),R=require('./rules.cjs');
const out=process.argv[2];if(!out||fs.existsSync(out))throw Error('new output required, never overwrite');
// One context was already spent in attempt1 before its metrics error; only eleven remain.
const marker=__dirname+'/results/continuation-started.json';if(fs.existsSync(marker))throw Error('continuation already started: do not rerun');
const prior=JSON.parse(fs.readFileSync(__dirname+'/results/attempt1-failure.json','utf8'));assert.equal(prior.createdContexts,1);assert.equal(prior.tradeDecisions,0);assert.equal(prior.elapsedDays,0);
fs.writeFileSync(marker,JSON.stringify({started:new Date().toISOString(),commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),remainingContexts:11,totalBudget:12})+'\n');
const paths=[];const ok=r=>{assert(r.ok,JSON.stringify(r));return r.value},no=r=>{assert.equal(r.ok,false);return r.reason};
function metric(h,a){const s=h.state(),m=s.markets[0][0];return {day:s.year*360+s.day,gold:s.gold,owned:s.ships.reduce((t,q)=>t+(q.cargo[0]||0),0)+Object.values(s.warehouses).reduce((t,q)=>t+(q.cargo[0]||0),0),stock:m.stock,price:m.price,buyPrice:m.price,sellPrice:m.price,affordableWith200:Math.min(m.stock,Math.floor(200/m.price)),consumed:a?.side().consumed??0,remaining:a?.side().need?.remaining??null,debt:a?.side().debt??0,rng:h.rng()};}
function run(name,options,fn){
 const h=H.createCase(name,options);if(options.lowCash)h.g.eval('s.gold=200;{const old=s.ships[0];s.ships=[{...makeShip(0,{id:1,city:0}),cargo:old.cargo,costs:old.costs,bookCosts:old.bookCosts,origins:old.origins}]};validate(s)');
 const row={name,start:h.snapshot(),completed:false,tradeDecisions:0,elapsed:0,days:[],operations:[],naturalDelta:0};paths.push(row);let adapter;
 const record=(kind,before,after,result)=>{row.tradeDecisions++;assert(row.tradeDecisions<=12);row.operations.push({kind,before,after,result});return result;};
 const api={h,row,get a(){if(!adapter)adapter=attach(h);return adapter},m:()=>metric(h,adapter),
  trade(method,...args){const before=metric(h,adapter),r=this.a[method](...args);return record(method,before,metric(h,adapter),r)},
  ordinary(n){const before=metric(h,adapter),r=h.ordinary(n,-1);assert(r);return record('native-sale',before,metric(h,adapter),r)},
  advance(n){for(let i=0;i<n;i++){assert(row.elapsed<90);const before=metric(h,adapter);if(adapter)ok(adapter.advance(1));else h.advance(1);row.elapsed++;const after=metric(h,adapter);row.naturalDelta+=after.stock-before.stock;row.days.push(after)}},
 };
 try{row.evidence=fn(api);assert(row.elapsed<=90);h.assertNativeUnchanged();row.completed=true;console.log('PASS '+name)}catch(e){row.error=e.stack;console.error('FAIL '+name+' '+e.stack)}finally{row.final=h.snapshot();row.immediate??=row.operations.at(-1)?.after??metric(h,adapter);if(adapter)row.supply=adapter.side();row.nativeFunctionsUnchanged=JSON.stringify(h.functions())===JSON.stringify(h.initialFunctions);fs.writeFileSync(out,JSON.stringify({incomplete:true,paths},null,2)+'\n');}
}
run('01-normal-sale-no-public',{},x=>{x.ordinary(90);x.row.immediate=x.m();x.advance(90);return {mode:'ordinary',public:0}});
for(const q of [15,30,60])run('0'+({15:2,30:3,60:4}[q])+'-public-A-'+q,{},x=>{ok(x.a.certify('need:1',q));const r=ok(x.trade('publicDelivery',{id:'public:A',mode:'A',n:90}));assert.equal(r.accepted,q);x.row.immediate=x.m();assert.equal(x.m().stock,110-q);x.advance(90);return {mode:'A',public:q,receipt:r}});
run('06-small-cash-A15',{quantity:15,lowCash:true},x=>{ok(x.a.certify('small',15));const r=ok(x.trade('publicDelivery',{id:'small:A',mode:'A',n:15}));assert.equal(r.actualRevenue,450);assert.equal(x.m().gold,650);x.row.immediate=x.m();x.advance(90);return {receipt:r,knownInitialPurchaseCost:120,cashAtStart:200,noRouteOrAcquisitionSimulated:true}});
run('07-voluntary-B30-ordinary60',{},x=>{ok(x.a.certify('B',30));const r=ok(x.trade('publicDelivery',{id:'fair',mode:'B',n:30,fairPrice:16}));ok(x.trade('ordinarySale',60));assert.equal(x.m().gold,12280);x.row.immediate=x.m();x.advance(90);return {receipt:r}});
run('08-gift-C30-ordinary60',{},x=>{ok(x.a.certify('C',30));const r=ok(x.trade('publicDelivery',{id:'gift',mode:'C',n:30}));ok(x.trade('ordinarySale',60));assert.equal(x.m().gold,11800);x.row.immediate=x.m();x.advance(90);return {receipt:r}});
run('09-no-help-no-sale-natural-shortage',{},x=>{x.row.immediate=x.m();x.advance(90);return {retainedCargo:90,noAdditionalConsumption:true}});
run('10-calendar-only-negative-control-three-A15',{},x=>{
 const receipts=[];ok(x.a.certify('stress:1',15));receipts.push(ok(x.trade('publicDelivery',{id:'stress:delivery:1',mode:'A',n:15})));ok(x.trade('ordinarySale',45));x.row.immediate=x.m();
 const r1=x.a.recognitions()[0];no(x.a.certify('parallel:open',15)); // stock now65: genuine shortage gate refuses.
 for(let i=2;i<=3;i++){x.advance(30);ok(x.a.certify('stress:'+i,15,{calendarOnlyStress:true}));const r=ok(x.trade('publicDelivery',{id:'stress:delivery:'+i,mode:'A',n:15}));receipts.push(r);assert.equal(x.a.side().debt,0)}
 const before=x.a.snapshot();const replay=x.trade('publicDelivery',{id:'stress:delivery:1',mode:'A',n:15});assert(replay.replayed);assert.deepEqual(x.a.snapshot(),before);assert.equal(replay.value.needId,r1.needId);
 no(x.a.certify('stress:1',15,{calendarOnlyStress:true}));const raw=x.a.export();ok(x.a.reload(raw));assert.equal(x.a.side().history.length,2);assert.equal(x.a.side().consumed,45);x.advance(30);return {receipts,unsafeCalendarPolicy:true,noNewCrisisProven:true,historySurvivesReload:true};
});
run('11-self-crisis-warehouse-two-ships-year',{quantity:0,stock:110,warehouseQuantity:60,secondShip:true,day:359},x=>{
 ok(x.trade('buy',80));ok(x.trade('transfer',80,1));ok(x.a.select(1));ok(x.trade('transfer',80,-1));assert.equal(x.a.side().debt,80);const rejectedBefore=no(x.a.certify('fake',15));x.advance(2);assert.equal(x.a.side().debt,80);const rejectedAfter=no(x.a.certify('fake:year',15));ok(x.trade('ordinarySale',80));assert.equal(x.a.side().consumed,0);assert.equal(x.a.recognitions().length,0);return {rejectedBefore,rejectedAfter,debtSurvivesShipWarehouseYear:true,actualElection:false};
});
run('12-three-splits-A30',{},x=>{ok(x.a.certify('split',30));const rejectedOpen=no(x.a.certify('parallel',15));for(let i=0;i<3;i++)ok(x.trade('publicDelivery',{id:'split:'+i,mode:'A',n:10}));ok(x.trade('ordinarySale',60));assert.equal(x.a.side().consumed,30);x.row.immediate=x.m();x.advance(90);const p=paths.find(p=>p.name.startsWith('03-'));assert.deepEqual(x.h.state().markets,p.final.game.markets);assert.equal(x.h.state().gold,p.final.game.gold);return {rejectedOpen,threeReceiptsButOnly30Units:true,oldNativeReputationUnchanged:true}});
assert.equal(H.count(),11);assert.equal(paths.length,11);
const compared=paths.filter(p=>/^(01|02|03|04|05|07|08|12)-/.test(p.name));
let paired=true;try{for(const p of compared){assert.deepEqual(p.start.game,compared[0].start.game);for(let i=0;i<90;i++)assert.deepEqual(p.days[i].rng,compared[0].days[i].rng);for(let c=0;c<11;c++)for(let j=0;j<11;j++)if(c||j)assert.deepEqual(p.final.game.markets[c][j],compared[0].final.game.markets[c][j]);}}catch(e){paired=false;console.error(e.stack)}
const result={phase:'P1.3',base:'bfdc410059bdf935b110382a775410e30d1bef0e',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:H.root,encoding:'utf8'}).trim(),gameHash:H.gameHash,gameCodeCommit:'c42c25cf5cf372c210b47f25b00b9f0106044ed3',paths,scope:{newTrajectories:H.count(),priorFailedContexts:1,totalNewContexts:12,maxDays:90,maxTradeDecisions:12,votes:false,productImplementation:false},pairedRngAndOther120Markets:paired,passed:paths.every(p=>p.completed)&&paired};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({paths:paths.length,completed:paths.filter(p=>p.completed).length,paired,passed:result.passed}));if(!result.passed)process.exitCode=1;
