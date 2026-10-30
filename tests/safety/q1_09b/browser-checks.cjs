'use strict';
// Real Chromium, real LocalStorage/FileReader/Web Locks. Synthetic QA saves only.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),cp=require('node:child_process');
const {chromium}=require('playwright'),{originalState:S,hash}=require('../q1_09/harness.cjs');
const root=path.resolve(__dirname,'../../..'),KEY='hansefuerst-v04-safety1',OLD='hansefuerst-v04';
const out=path.resolve(process.argv[2]||'');assert(process.argv[2]&&!fs.existsSync(out),'new result path required');
const bytes=fs.readFileSync(path.join(root,'Hansefuerst_0_4.html')),checks=[],pageErrors=[],screenshots=[];
let server,browser,origin;
const state=p=>p.evaluate(()=>JSON.parse(JSON.stringify(s))),disk=p=>p.evaluate(k=>localStorage.getItem(k),KEY);
async function download(p,original=false){const promise=p.waitForEvent('download');await p.evaluate(x=>exportGame(x),original);const d=await promise,stream=await d.createReadStream(),chunks=[];for await(const b of stream)chunks.push(b);return Buffer.concat(chunks).toString('utf8');}
async function boot({fixture=S(),viewport={width:1280,height:900},mobile=false,noLocks=false,readDenied=false,file=false}={}){
 const context=await browser.newContext({viewport,hasTouch:mobile,isMobile:mobile,acceptDownloads:true});
 await context.addInitScript(({fixture,OLD,KEY,noLocks,readDenied})=>{
  if(localStorage.getItem(OLD)===null&&fixture!==null)localStorage.setItem(OLD,JSON.stringify(fixture));
  window.qaFailWrite=false;window.qaWrites=[];
  const nativeSet=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){if(k===KEY&&window.qaFailWrite)throw new DOMException('controlled write failure','QuotaExceededError');window.qaWrites.push({key:k,value:String(v)});return nativeSet.call(this,k,v)};
  if(noLocks)Object.defineProperty(Navigator.prototype,'locks',{configurable:true,get:()=>undefined});
  if(readDenied){const read=Storage.prototype.getItem;Storage.prototype.getItem=function(k){if(k===KEY)throw new DOMException('controlled read denial','SecurityError');return read.call(this,k)}}
 },{fixture,OLD,KEY,noLocks,readDenied});
 const page=await tab(context,file);
 return {context,page};
}
async function tab(context,file=false){const page=await context.newPage();page.on('dialog',d=>d.accept());page.on('pageerror',e=>pageErrors.push(e.message));await page.goto(file?'file://'+path.join(root,'Hansefuerst_0_4.html'):origin+'/Hansefuerst_0_4.html');await page.waitForFunction(()=>SafetySession.loaded||SafetySession.error);if(await page.evaluate(()=>!!s))await page.waitForFunction(()=>CityLife.diagnostics().visualReady);return page;}
async function check(name,fn){try{const evidence=await fn();checks.push({name,passed:true,evidence});console.log('PASS '+name)}catch(e){checks.push({name,passed:false,error:e.stack});console.error('FAIL '+name+': '+e.message)}}
async function isolated(options,fn){const x=await boot(options);try{return await fn(x)}finally{await x.context.close()}}
async function hold(p){await p.evaluate(()=>{window.qaHeld=false;window.qaHold=navigator.locks.request(SAFETY_LOCK,{mode:'exclusive'},()=>{window.qaHeld=true;return new Promise(r=>window.qaRelease=r)})});await p.waitForFunction(()=>window.qaHeld)}
async function release(p){await p.evaluate(()=>window.qaRelease());await p.evaluate(()=>window.qaHold)}
const withoutSafety=x=>{x=JSON.parse(JSON.stringify(x));x.politics.version=1;delete x.politics.safety;return x};
(async()=>{
 server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return}if(req.url!=='/Hansefuerst_0_4.html'){res.writeHead(404);res.end();return}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(bytes)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 await check('native boot copies V13 byte-exact original and reload does not rewrite',()=>isolated({},async({page:p})=>{
  const x=await state(p),raw=await disk(p);assert.deepEqual(withoutSafety(x),S());assert.equal(await download(p,true),JSON.stringify(S()));assert.equal(await p.evaluate(()=>navigator.locks!==undefined),true);
  await p.reload();await p.waitForFunction(()=>SafetySession.loaded&&!!s);assert.equal(await disk(p),raw);assert.equal(await p.evaluate(k=>qaWrites.filter(w=>w.key===k).length,KEY),0);return {nativeWebLocks:true,noLoadWrite:true,legacyBytesExact:true};
 }));
 await check('two native tabs queue competing actions under one real Web Lock',()=>isolated({},async({context,page:a})=>{
  const b=await tab(context),before=await state(a);await hold(a);
  await Promise.all([a.evaluate(()=>{window.qaOp=donate(50,2)}),b.evaluate(()=>{window.qaOp=donate(50,2)})]);
  await a.waitForFunction(async()=>{const q=await navigator.locks.query();return q.pending.filter(x=>x.name===SAFETY_LOCK).length===2});await release(a);
  const results=await Promise.all([a.evaluate(()=>qaOp),b.evaluate(()=>qaOp)]),after=JSON.parse(await disk(a));assert.equal(results.filter(x=>x===false).length,1);assert.equal(after.gold,before.gold-50);assert.equal(after.rep,before.rep+2);assert.equal(after.politics.safety.revision,before.politics.safety.revision+1);
  const stale=results[0]===false?a:b;assert.match(await stale.locator('#storageStatus').innerText(),/Veralteter Stand/);assert(await stale.evaluate(()=>safetyReload()));assert.deepEqual(await state(stale),after);return {tabs:2,queuedRequests:2,canonicalWrites:1,oneCharge:true,staleRejected:true,reloadRecovered:true};
 }));
 await check('same-tab queued double confirmation credits exactly once',()=>isolated({},async({page:p})=>{
  const x=await state(p);const results=await p.evaluate(()=>Promise.all([donate(50,2),donate(50,2)]));assert.equal(results.filter(x=>x===false).length,1);const y=await state(p);assert.equal(y.gold,x.gold-50);assert.equal(y.rep,x.rep+2);return {oneCharge:true,oneReputationCredit:true};
 }));
 await check('closing a queued tab cancels its write before lock acquisition',()=>isolated({},async({context,page:a})=>{
  const b=await tab(context),raw=await disk(a);await hold(a);await b.evaluate(()=>{window.qaOp=donate(50,2)});await a.waitForFunction(async()=>{const x=await navigator.locks.query();return x.pending.some(q=>q.name===SAFETY_LOCK)});await b.close();await release(a);assert.equal(await disk(a),raw);await a.evaluate(()=>donate(50,2));assert.equal(JSON.parse(await disk(a)).gold,JSON.parse(raw).gold-50);return {closedQueuedWriterNoCharge:true,lockRemainsUsable:true,notAnOSPowerFailureTest:true};
 }));
 await check('closing lock holder releases native exclusion for surviving tab',()=>isolated({},async({context,page:a})=>{
  const b=await tab(context),gold=(await state(a)).gold;await hold(a);await b.evaluate(()=>{window.qaOp=donate(50,2)});await a.close();await b.evaluate(()=>qaOp);assert.equal((await state(b)).gold,gold-50);return {browserReleasesAbandonedLock:true,oneAtomicAction:true};
 }));
 await check('injected quota failure rolls back actual RAM disk and revision, then retry succeeds',()=>isolated({},async({page:p})=>{
  const x=await state(p),raw=await disk(p);await p.evaluate(()=>{qaFailWrite=true;Testlog.toggle()});const events=await p.evaluate(()=>Testlog.data.events.length);assert.equal(await p.evaluate(()=>donate(200,5)),false);assert.deepEqual(await state(p),x);assert.equal(await disk(p),raw);assert.equal(await p.evaluate(()=>Testlog.data.events.length),events);assert.match(await p.locator('#storageStatus').innerText(),/abgebrochen/);await p.evaluate(()=>{qaFailWrite=false});await p.evaluate(()=>donate(200,5));assert.equal((await state(p)).gold,x.gold-200);return {fault:'controlled Storage.setItem QuotaExceededError, not disk physically filled',rollbackComplete:true,noGhostEvent:true,retry:true};
 }));
 await check('real FileReader import and canonical/original downloads restore complete copies',()=>isolated({},async({page:p})=>{
  const before=await disk(p),imported=S('s.gold=12345;s.debt=777;s.bank=123;ship().cargo={0:7};ship().costs={0:null};ship().bookCosts={0:8};ship().origins={0:[{city:null,n:7}]}'),raw=JSON.stringify(imported,null,2);
  await p.locator('#file').setInputFiles({name:'copy-v13.json',mimeType:'application/json',buffer:Buffer.from(raw)});await p.waitForFunction(()=>s.gold===12345);assert.deepEqual(withoutSafety(await state(p)),imported);assert(await p.evaluate(text=>Object.values(localStorage).includes(text),raw));assert(await p.evaluate(text=>Object.values(localStorage).includes(text),before));
  const exported=await download(p);assert.equal(exported,await disk(p));assert.equal(await download(p,true),JSON.stringify(S()));
  const current=await state(p);await p.evaluate(()=>donate(50,2));await p.locator('#file').setInputFiles({name:'canonical.json',mimeType:'application/json',buffer:Buffer.from(exported)});await p.waitForFunction(()=>s.gold===12345);const restored=await state(p);current.politics.safety.revision=restored.politics.safety.revision;assert.deepEqual(restored,current);
  await p.reload();await p.waitForFunction(()=>SafetySession.loaded&&!!s);assert.deepEqual(await state(p),restored);return {nativeFileReader:true,actualBlobDownloads:true,rawImportedFileBackedUp:true,priorStateBackup:true,canonicalRestoration:true};
 }));
 await check('invalid and failed imports leave the active saved game intact',()=>isolated({},async({page:p})=>{
  const raw=await disk(p),x=await state(p);await p.locator('#file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{broken')});await p.waitForFunction(()=>document.querySelector('#sheet').textContent.includes('Übernahme abgebrochen'));assert.equal(await disk(p),raw);assert.deepEqual(await state(p),x);
  await p.evaluate(()=>{qaFailWrite=true});await p.locator('#file').setInputFiles({name:'other.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(S('s.gold=25000')))});await p.waitForFunction(()=>SafetySession.error.includes('abgebrochen'));assert.equal(await disk(p),raw);assert.deepEqual(await state(p),x);return {parseFailureSafe:true,commitFailureSafe:true};
 }));
 await check('real import queued behind another tab cannot overwrite that newer action',()=>isolated({},async({context,page:a})=>{
  const b=await tab(context),gold=(await state(a)).gold;await hold(a);await a.evaluate(()=>{window.qaOp=donate(50,2)});await b.locator('#file').setInputFiles({name:'stale.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(S('s.gold=25000')))});
  await a.waitForFunction(async()=>{const q=await navigator.locks.query();return q.pending.filter(x=>x.name===SAFETY_LOCK).length===2});await release(a);await a.evaluate(()=>qaOp);await b.waitForFunction(()=>SafetySession.error.includes('Veralteter Stand'));assert.equal(JSON.parse(await disk(a)).gold,gold-50);return {selectionTimeStateRespected:true,staleFileCallbackRejected:true};
 }));
 await check('missing Web Locks remains read-only with visible warning and exact export',()=>isolated({noLocks:true},async({page:p})=>{
  const x=await state(p);assert.equal(await p.evaluate(()=>donate(50,2)),false);assert.deepEqual(await state(p),x);assert.equal(await disk(p),null);assert.match(await p.locator('#storageStatus').innerText(),/Web Locks/);assert.equal(await download(p),JSON.stringify(S()));await p.evaluate(()=>show('save'));assert.deepEqual(await state(p),x);return {injectedUnavailableCapability:true,noLocalStorageLockFallback:true,readAndNativeExport:true};
 }));
 await check('denied canonical storage read aborts startup without rewriting original',()=>isolated({readDenied:true},async({page:p})=>{
  assert.equal(await p.evaluate(()=>s),null);assert.match(await p.locator('#storageStatus').innerText(),/Speicherzugriff verweigert/);assert.equal(await p.evaluate(k=>localStorage.getItem(k),OLD),JSON.stringify(S()));assert.equal(await p.evaluate(k=>qaWrites.filter(q=>q.key===k).length,KEY),0);return {controlledSecurityError:true,oldBytesPreserved:true};
 }));
 await check('native personal accord uses actual trips, remote view grants no witness',()=>isolated({fixture:S('s.ships.push(makeShip(1,{id:2,city:1}))')},async({page:p})=>{
  await p.evaluate(()=>confirmLegacyPresence());assert(await p.evaluate(()=>acceptPoliticalJob('accord')));const q=(await state(p)).politics.jobs[0],before=await state(p);await p.evaluate(()=>selectFleetShip(1));assert.equal((await state(p)).politics.safety.person.city,0);assert.equal(await p.evaluate(id=>witnessPoliticalJob(id),q.id),false);assert.equal(await p.evaluate(()=>planTravel(2,false)),false);assert.equal((await state(p)).day,before.day);assert.equal((await state(p)).gold,before.gold);
  await p.evaluate(()=>selectFleetShip(0));const travel=async dest=>{await p.evaluate(dest=>planTravel(dest,false),dest);await p.evaluate(()=>arrive());assert.equal((await state(p)).politics.safety.person.city,dest)};
  await travel(q.partner);assert(await p.evaluate(id=>witnessPoliticalJob(id),q.id));await travel(q.city);assert(await p.evaluate(id=>finishPoliticalAccord(id),q.id));assert.equal(await p.evaluate(id=>finishPoliticalAccord(id),q.id),false);assert.equal((await state(p)).politics.records.length,1);return {freeRemoteView:true,noRemoteWitness:true,unapprovedRemoteVoyageRefused:true,realRoundtrip:true,oneReceipt:true};
 }));
 await check('interrupted arrival write preserves person ships money days and allows one retry',()=>isolated({},async({page:p})=>{
  await p.evaluate(()=>confirmLegacyPresence());await p.evaluate(()=>planTravel(1,false));const x=await state(p),raw=await disk(p);await p.evaluate(()=>{qaFailWrite=true});assert.equal(await p.evaluate(()=>arrive()),false);assert.deepEqual(await state(p),x);assert.equal(await disk(p),raw);assert.equal(await p.evaluate(()=>pending.arrived??false),false);
  await p.evaluate(()=>{qaFailWrite=false});await p.evaluate(()=>arrive());const arrived=await state(p);assert.equal(arrived.politics.safety.person.city,1);assert.equal(arrived.ships[0].city,1);await p.evaluate(()=>arrive());assert.deepEqual(await state(p),arrived);return {controlledWriteInterruption:true,atomicRollback:true,arrivalOnce:true};
 }));
 await check('local file works offline with native storage lock reload and file transfer',()=>isolated({file:true},async({context,page:p})=>{
  await context.setOffline(true);const raw=await disk(p),hasLocks=await p.evaluate(()=>!!navigator.locks?.request);if(!hasLocks){assert.equal(await p.evaluate(()=>donate(50,2)),false);assert.equal(await disk(p),raw);return {fileURL:true,nativeWebLocks:false,safelyReadOnly:true,writableOfflineAcceptance:false}}
  await p.evaluate(()=>donate(50,2));const saved=await disk(p);assert.equal(JSON.parse(saved).gold,JSON.parse(raw).gold-50);await p.reload();await p.waitForFunction(()=>SafetySession.loaded&&!!s);assert.equal(await disk(p),saved);assert.equal(await download(p),saved);return {fileURL:true,nativeWebLocks:true,networkOffline:true,localSaveReloadAndDownload:true,doesNotProveSafariFileSupport:true};
 }));
 for(const [width,height,mobile] of [[375,812,true],[820,1180,true],[1280,900,false]])await check('Chromium viewport and native input '+width+'x'+height,()=>isolated({viewport:{width,height},mobile},async({page:p})=>{
  const press=async locator=>{await locator.scrollIntoViewIfNeeded();if(mobile)await locator.tap();else await locator.click()};
  await p.evaluate(()=>show('church'));const before=await state(p),preview=Number((await p.locator('#donationSmallGain').innerText()).match(/\d+/)[0]);await press(p.locator('button[onclick="donate(50,2)"]'));await p.waitForFunction(()=>!!document.querySelector('#donationReceipt'));const x=await state(p);assert.equal(x.gold,before.gold-50);assert.equal(x.rep,before.rep+preview);assert.equal(x.day,before.day);
  await p.evaluate(()=>show('save'));const overflow=await p.locator('#sheet').evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth}));assert(overflow.scroll<=overflow.client+1);assert(await p.getByRole('button',{name:'Zur Stadt zurück / Dialog schließen',exact:true}).isVisible());
  const shot=path.join(path.dirname(out),'viewport-'+width+'.png');assert(!fs.existsSync(shot));await p.screenshot({path:shot});screenshots.push(path.relative(root,shot));
  await press(p.getByRole('button',{name:'Zur Stadt zurück / Dialog schließen',exact:true}));assert(await p.locator('#overlay').evaluate(e=>e.classList.contains('hidden')));
  return {viewport:{width,height},input:mobile?'real Chromium tap with touch emulation':'real Chromium click',donationOfferMatchesCredit:true,dayUnchanged:true,saveDialogNoHorizontalOverflow:true,physicalDevice:false,engine:'Chromium, not Safari'};
 }));
 assert.deepEqual(pageErrors,[],'uncaught native browser page errors');
})().catch(e=>{checks.push({name:'browser harness completion',passed:false,error:e.stack});console.error(e.stack)}).finally(async()=>{
 const result={sourceCommit:cp.execSync('git rev-parse HEAD',{cwd:root}).toString().trim(),testedGameCommit:cp.execSync('git log -1 --format=%H -- Hansefuerst_0_4.html',{cwd:root}).toString().trim(),gameHash:hash,engine:browser?.version()??null,kind:'real native Chromium isolated synthetic saves; controlled faults explicitly identified',checks,pageErrors,screenshots,passed:checks.length>0&&checks.every(x=>x.passed)&&pageErrors.length===0,realAppleDevices:0,webKitTests:0,largeSimulations:0};
 fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));if(!result.passed)process.exitCode=1;
});
