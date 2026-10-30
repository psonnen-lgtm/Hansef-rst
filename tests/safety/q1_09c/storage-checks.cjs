'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process'),{environment:E,originalState:S,clean,LockQueue,hash}=require('./harness.cjs');
const KEY='hansefuerst-v04-safety3',OLD='hansefuerst-v04',checks=[];const json=x=>JSON.stringify(x);
async function check(name,fn){try{const evidence=await fn();checks.push({name,passed:true,evidence});console.log('PASS '+name);}catch(e){checks.push({name,passed:false,error:e.stack});throw e;}}
async function fixture(code='',opts={}){const old=S(code),raw=json(old),g=E({stored:{[OLD]:raw},...opts});await g.ready();return {g,old,raw};}
function unchanged(before,after){const x=clean(after);x.politics.version=1;delete x.politics.safety;assert.deepEqual(x,before);}
(async()=>{
await check('old V13 copy-import preserves all economic political and provenance fields and exact original',async()=>{
 const {g,old,raw}=await fixture('s.gold=13000;s.debt=1234;s.bank=500;ship().cargo={0:12};ship().costs={0:8};ship().origins={0:[{city:1,n:12}]};s.warehouses[0]={cargo:{1:3},costs:{1:20},bookCosts:{1:20},origins:{1:[{city:null,n:3}]}}');unchanged(old,g.state());assert.equal(g.disk.get(OLD),raw);assert.equal(g.eval("safetyOriginalText()"),raw);assert([...g.disk.values()].includes(raw));assert.equal(g.state().politics.safety.person.city,null);assert.equal(g.state().politics.safety.person.source,'unknown');return {allFieldsPreserved:true,originalBytes:true,noInventedPerson:true};
});
await check('opening an active safety state twice neither rewrites it nor changes revision',async()=>{
 const {g}=await fixture(),raw=g.disk.get(KEY),rev=g.state().politics.safety.revision,h=E({stored:g.disk,locks:g.locks});await h.ready();assert.equal(g.disk.get(KEY),raw);assert.equal(h.state().politics.safety.revision,rev);assert.equal(h.writes.filter(x=>x.key===KEY).length,0);return {noLoadWrite:true,revision:rev};
});
await check('successful donation commits once and preserves price reputation formula and game day',async()=>{
 const {g}=await fixture(),before=g.state(),writes=g.writes.length;await g.eval('donate(50,2)');const after=g.state();assert.equal(after.gold,before.gold-50);assert.equal(after.rep,before.rep+2);assert.equal(after.day,before.day);assert.equal(g.writes.slice(writes).filter(x=>x.key===KEY).length,1);assert.equal(after.politics.safety.revision,before.politics.safety.revision+1);return {oneCanonicalWrite:true,mechanicUnchanged:true};
});
await check('quota failure rolls back money reputation pending preparation and game observations',async()=>{
 let fail=false;const {g}=await fixture('',{fault:k=>fail&&k===KEY}),before=json(g.state()),disk=g.disk.get(KEY),n=g.events.length;fail=true;assert.equal(await g.eval('donate(200,5)'),false);assert.equal(json(g.state()),before);assert.equal(g.disk.get(KEY),disk);assert.equal(g.events.length,n);return {allOrNothing:true,noGhostEvents:true};
});
await check('two VM contexts share an exclusive lock and reject the stale queued writer',async()=>{
 const locks=new LockQueue(),disk=new Map([[OLD,json(S())]]),a=E({stored:disk,locks}),b=E({stored:disk,locks});await a.ready();await b.ready();const cash=a.state().gold,results=await Promise.all([a.eval('donate(50,2)'),b.eval('donate(50,2)')]);assert.equal(JSON.parse(await a.eval('safetyReadCanonical()')).gold,cash-50);assert.equal(results.filter(x=>x===false).length,1);assert.equal(await b.eval('safetyReload()'),true);assert.equal(b.state().gold,cash-50);return {contexts:2,oneCharge:true,staleAborted:true,model:'deterministic Web Locks API stub, not real browser tabs'};
});
await check('same-tab queued double confirmation cannot charge twice from one displayed revision',async()=>{
 const {g}=await fixture(),cash=g.state().gold;await Promise.all([g.eval('donate(50,2)'),g.eval('donate(50,2)')]);assert.equal(g.state().gold,cash-50);return {oneCharge:true,secondInvocationStale:true};
});
await check('missing Web Locks is fail-closed but read-only views and original export remain usable',async()=>{
 const old=S(),raw=json(old),g=E({stored:{[OLD]:raw},unsupported:true});await g.ready();const before=json(g.state());assert.equal(await g.eval('donate(50,2)'),false);await g.eval("show('save')");assert.equal(json(g.state()),before);assert.equal(g.eval('safetyExportText()'),raw);assert(!g.disk.has(KEY));return {noUnsafeFallback:true,readAndExport:true};
});
await check('blocked original backup prevents activation without touching old bytes',async()=>{
 const raw=json(S()),g=E({stored:{[OLD]:raw},fault:k=>k.includes('v13-original')});assert.equal(await g.ready(),false);assert(!g.disk.has(KEY));assert.equal(g.disk.get(OLD),raw);return {backupBeforeActivation:true};
});
await check('export returns committed complete state and reload retains the same values',async()=>{
 const {g}=await fixture();await g.eval('donate(50,2)');const raw=g.eval('safetyExportText()');assert.equal(raw,g.disk.get(KEY));const h=E({stored:{[KEY]:raw},locks:g.locks});await h.ready();assert.deepEqual(h.state(),g.state());return {completeExport:true,reloadNoMutation:true};
});
await check('future active safety revision cannot destroy current or fall back to stale V13',async()=>{
 const {g}=await fixture(),raw=g.disk.get(KEY),bad=JSON.parse(raw);bad.politics.safety.version=999;const h=E({stored:{[KEY]:json(bad),[OLD]:json(S())}});assert.equal(await h.ready(),false);assert.equal(h.disk.get(KEY),json(bad));assert.equal(h.state(),null);return {unknownRevisionRejected:true,noLegacyFallback:true};
});
await check('ordinary buy sell bank and warehouse actions remain valid under the shared boundary',async()=>{
 const {g}=await fixture('s.gold=10000;s.markets[0][0]={price:30,stock:110}');const cash=g.state().gold;g.nodes.qty0={value:'10'};await g.eval('trade(0,1)');assert.equal(g.state().gold,cash-300);await g.eval('trade(0,-1)');assert.equal(g.state().gold,cash);g.nodes.loan={value:'1000'};await g.eval("bankOp('borrow')");assert.equal(g.state().debt,1000);g.nodes.deposit={value:'500'};await g.eval("bankOp('deposit')");assert.equal(g.state().bank,500);await g.eval('advance(1)');assert(g.state().debt>1000);assert(g.state().bank>500);g.eval('validate(s)');return {nativeTrading:true,nativeLoansInterest:true};
});
await check('political receipt failure and double execution remain atomic',async()=>{
 let fail=false;const {g}=await fixture('',{fault:k=>fail&&k===KEY});await g.eval('confirmLegacyPresence()');const before=json(g.state()),n=g.events.length;fail=true;assert.equal(await g.eval("acceptPoliticalJob('accord')"),false);assert.equal(json(g.state()),before);assert.equal(g.events.length,n);fail=false;assert.equal(await g.eval("acceptPoliticalJob('accord')"),true);assert.equal(await g.eval("acceptPoliticalJob('accord')"),false);assert.equal(g.state().politics.jobs.length,1);return {oneJob:true,failureNoReceipt:true};
});
})().then(()=>{const out={sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),gameHash:hash,kind:'controlled_VM_IDB_transaction_and_LockQueue_models_not_native_browser',checks,passed:checks.every(x=>x.passed)};fs.writeFileSync(process.argv[2],json(out)+'\n');console.log('PASS total '+checks.length);}).catch(e=>{fs.writeFileSync(process.argv[2],json({gameHash:hash,checks,error:e.stack,passed:false})+'\n');console.error(e);process.exitCode=1;});
