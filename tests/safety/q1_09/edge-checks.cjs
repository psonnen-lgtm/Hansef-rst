'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process'),{environment:E,originalState:S,original,html,hash}=require('./harness.cjs');
const KEY='hansefuerst-v04-safety1',OLD='hansefuerst-v04',checks=[];
async function check(name,fn){try{checks.push({name,passed:true,evidence:await fn()});console.log('PASS '+name)}catch(e){checks.push({name,passed:false,error:e.stack});throw e;}}
async function boot(old,opts={}){const g=E({stored:{[OLD]:JSON.stringify(old)},...opts});await g.ready();return g;}
function sourceFunction(h,name){const s=h.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^const ART=.*;$/m,'const ART={};'),a=s.indexOf('function '+name+'(');assert(a>=0);const next=s.slice(a+1).search(/^(?:function |const |\/\/ BEGIN|\/\/ END)/m);return s.slice(a,next<0?s.length:a+1+next).trim();}
(async()=>{
 await check('native economic formulas prices goods distances interest and fees remain byte-identical',async()=>{
 const names=['dailyMarketPrice','regionalPrice','regionalStock','regionalMarketDay','creditLimit','cargoBookPrice','cargoWorth','warehouseWorth','shipyardWorth','netWorth','bankOp','shipbuildingQuote','routeTravelDays','routeHandlingDays','donationGain','completeQuests','politicalSupport'];for(const n of names)assert.equal(sourceFunction(html,n),sourceFunction(original,n),n);
 for(const name of ['GOODS','SHIPTYPES','DIST','SHIPBUILD_RECIPES','WAREHOUSE_RULES']){const line=h=>h.split('\n').find(l=>l.startsWith('const '+name+'='));assert.equal(line(html),line(original),name);}return {functions:names,constants:['GOODS','SHIPTYPES','DIST','SHIPBUILD_RECIPES','WAREHOUSE_RULES']};
 });
 await check('old V11 actual historical endpoint imports without loss before technical upgrade',async()=>{
 const old=require('../../simulation/political-progress-fixtures.cjs').state('elder'),g=await boot(old);assert(g.state());assert.equal(g.state().gold,old.gold);assert.equal(g.state().debt,old.debt);assert.equal(g.state().rank,4);assert.deepEqual(g.state().politics.records,old.politics.records);assert.equal(g.disk.get(OLD),JSON.stringify(old));return {sourceVersion:old.v,outputVersion:g.state().v,elderKept:true};
 });
 await check('unknown historical cost and source remain unknown in copied V13',async()=>{
 const old=S('ship().cargo={0:5};ship().costs={0:null};ship().bookCosts={0:9};ship().origins={0:[{city:null,n:5}]}'),g=await boot(old);assert.equal(g.state().ships[0].costs[0],null);assert.equal(g.state().ships[0].origins[0][0].city,null);assert.equal(g.state().ships[0].bookCosts[0],9);return {noHistoryInvented:true};
 });
 await check('post-commit observer fault does not roll back a successfully stored action',async()=>{
 const g=await boot(S());g.ctx.Testlog.event=()=>{throw Error('observer unavailable')};const cash=g.state().gold;await g.eval('donate(50,2)');assert.equal(g.state().gold,cash-50);assert.equal(JSON.parse(g.disk.get(KEY)).gold,cash-50);const h=E({stored:g.disk,locks:g.locks});await h.ready();assert.equal(h.state().gold,cash-50);return {afterCommitFailureRecoverable:true};
 });
 await check('current M2 export re-import preserves confirmed person and completed political receipts',async()=>{
 const g=await boot(S());await g.eval('confirmLegacyPresence()');await g.eval("acceptPoliticalJob('accord')");const raw=g.eval('safetyExportText()'),p=g.state().politics.safety.person;g.selectImport(raw);await g.finishImport();assert.deepEqual(g.state().politics.safety.person,p);assert.equal(await g.eval('confirmLegacyPresence()'),false);assert.equal(g.state().politics.jobs.length,1);return {noSecondAnchorOrJob:true};
 });
 await check('no random draw during old V13 copy activation or repeated safety reload',async()=>{
 const g=E({stored:{[OLD]:JSON.stringify(S())}});g.eval('globalThis.safetyDraws=0;const savedRandom=Math.random;Math.random=()=>{safetyDraws++;return savedRandom()}');await g.ready();await g.eval('safetyReload()');assert.equal(g.eval('safetyDraws'),0);return {draws:0};
 });
 await check('original-overflow backup slots fail closed without overwriting any original',async()=>{
 const raw=JSON.stringify(S()),disk=new Map([[OLD,raw]]);for(let i=0;i<100;i++)disk.set(KEY+'-v13-original'+(i?'-'+i:''),'occupied-'+i);const before=[...disk.entries()],g=E({stored:disk});assert.equal(await g.ready(),false);assert.deepEqual([...disk.entries()],before);return {numberedSlots:100,noOriginalOverwritten:true};
 });
 await check('download helper preserves complete canonical and original bytes for manual restoration',async()=>{
 const old=S('s.gold=22222'),raw=JSON.stringify(old),g=await boot(old),files=[];g.ctx.Blob=class{constructor(parts){files.push(parts.join(''))}};g.ctx.URL={createObjectURL:()=>"blob:test",revokeObjectURL(){}};g.ctx.document.createElement=()=>({click(){},remove(){}});g.ctx.document.body={append(){}};g.ctx.setTimeout=()=>{};g.eval('exportGame();exportGame(true)');assert.equal(files[0],g.disk.get(KEY));assert.equal(files[1],raw);const restored=S('s=migrate('+files[1]+')');assert.deepEqual(restored,old);return {exactCanonicalExport:true,exactLegacyDownload:true,oldReaderRestoresOriginal:true,downloadDOM:'stub, not actual browser transfer'};
 });
 await check('unsupported active bytes can only be replaced after confirmation with exact original preserved',async()=>{
 const future=S();future.politics.version=999;const raw=JSON.stringify(future),g=E({stored:{[KEY]:raw}});assert.equal(await g.ready(),false);assert.equal(g.state(),null);g.ctx.confirm=()=>false;g.selectImport(JSON.stringify(S('s.gold=12000')));await g.finishImport();assert.equal(g.disk.get(KEY),raw);g.ctx.confirm=()=>true;g.selectImport(JSON.stringify(S('s.gold=12000')));await g.finishImport();assert.equal(g.state().gold,12000);assert([...g.disk.values()].includes(raw));return {unsupportedOriginalKept:true,confirmationRequired:true};
 });
 await check('corrupt active text is backed up byte-exactly before explicit manual recovery',async()=>{
 const raw='{broken active original',g=E({stored:{[KEY]:raw}});assert.equal(await g.ready(),false);g.selectImport(JSON.stringify(S('s.gold=14000')));await g.finishImport();assert.equal(g.state().gold,14000);assert([...g.disk.values()].includes(raw));return {badOriginalNeverDiscarded:true,explicitRecoveryWorks:true};
 });
 await check('denied localStorage read at startup fails closed without an unhandled activation',async()=>{
 const old=S(),g=E({stored:{[OLD]:JSON.stringify(old)}});g.ctx.localStorage.getItem=()=>{throw Error('synthetic storage access denied')};assert.equal(await g.ready(),false);assert.equal(g.state(),null);assert.equal(g.disk.get(OLD),JSON.stringify(old));assert(!g.disk.has(KEY));return {noActivation:true,originalKept:true};
 });
 await check('actual opt-in logger retains original interest days when observations are deferred until commit',async()=>{
 const g=await boot(S('s.debt=1000'));g.ctx.performance={now:()=>42};g.ctx.window={addEventListener(){}};g.ctx.document.addEventListener=()=>{};g.ctx.document.hidden=false;g.ctx.document.hasFocus=()=>true;g.ctx.setInterval=()=>0;
 const script=html.match(/<script>([\s\S]*?)<\/script>/)[1],part=script.slice(script.indexOf('// Opt-in local test analysis.')).split('safetyBoot();')[0];g.eval(part);g.eval('Testlog.toggle()');const day=g.state().day;await g.eval('advance(2)');const observed=JSON.parse(g.eval('JSON.stringify(Testlog.data)')).events.filter(e=>e.type==='interest');assert.deepEqual(observed.map(e=>e.day),[day,day+1]);assert.equal(g.state().day,day+2);return {actualNativeLogger:true,capturedDays:[day,day+1],commitDay:day+2,API:'controlled DOM/performance stubs, not browser'};
 });
})().then(()=>{fs.writeFileSync(process.argv[2],JSON.stringify({sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),gameHash:hash,checks,passed:true},null,2)+'\n');}).catch(e=>{fs.writeFileSync(process.argv[2],JSON.stringify({gameHash:hash,checks,passed:false,error:e.stack},null,2)+'\n');console.error(e);process.exitCode=1;});
