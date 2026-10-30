'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process'),{environment:E,originalState:S,clean,hash}=require('./harness.cjs');
const KEY='hansefuerst-v04-safety1',OLD='hansefuerst-v04',checks=[];
async function check(name,fn){try{const evidence=await fn();checks.push({name,passed:true,evidence});console.log('PASS '+name);}catch(e){checks.push({name,passed:false,error:e.stack});throw e;}}
async function oldFixture(code='',opts={}){const old=S(code),g=E({stored:{[OLD]:JSON.stringify(old)},...opts});await g.ready();return {g,old};}
async function sail(g,to){await g.eval(`pending=null;planTravel(${to},false)`);assert(g.eval('pending!==null'));g.eval('pending.resolved=true;pending.event=null');await g.eval('arrive()');g.eval('validate(s)');assert.equal(g.state().city,to);}
function withoutSafety(x){const y=clean(x);y.politics.version=1;delete y.politics.safety;return y;}
(async()=>{
await check('old unknown person remains unknown until one explicit controlled anchor without invented deed',async()=>{
 const {g,old}=await oldFixture();assert.equal(g.state().politics.safety.person.city,null);const day=g.state().day,cash=g.state().gold;assert.equal(await g.eval("acceptPoliticalJob('accord')"),false);assert(await g.eval('confirmLegacyPresence()'));assert.equal(await g.eval('confirmLegacyPresence()'),false);assert.equal(g.state().politics.safety.person.city,0);assert.equal(g.state().day,day);assert.equal(g.state().gold,cash);assert.deepEqual(g.state().politics.records,old.politics.records);return {explicitAnchorOnce:true,noArrivalOrReceiptInvented:true};
});
await check('new game gets its chosen real start city without legacy anchoring',async()=>{
 const g=E();await g.ready();await g.eval('nativeWelcome();chooseStartCity(6);$("playername").value="New Q1.09";startGame()');assert.equal(g.state().city,6);assert.equal(g.state().politics.safety.person.city,6);assert.equal(g.state().politics.safety.person.source,'new_start');assert.equal(g.state().gold,5000);assert.equal(g.state().ships[0].city,6);return {chosenStart:6,nativeCashAndShip:true};
});
await check('Q1.02 remote audience reproduction is now refused with free fleet view preserved',async()=>{
 const {g}=await oldFixture('s.ships.push(makeShip(1,{id:2,city:1}))');await g.eval('confirmLegacyPresence()');assert(await g.eval("acceptPoliticalJob('accord')"));const id=g.state().politics.jobs[0].id,before=g.state();assert(await g.eval('selectFleetShip(1)'));assert.equal(g.state().city,1);assert.equal(g.state().politics.safety.person.city,0);assert.equal(await g.eval(`witnessPoliticalJob(${JSON.stringify(id)})`),false);assert.equal(g.state().politics.records.length,0);assert.equal(g.state().gold,before.gold);assert.equal(g.state().day,before.day);assert.deepEqual(g.state().ships,before.ships);return {freeView:true,noPoliticalTeleport:true};
});
await check('new accord succeeds only with actual outward and return personal travel',async()=>{
 const {g}=await oldFixture();await g.eval('confirmLegacyPresence()');assert(await g.eval("acceptPoliticalJob('accord')"));const q=g.state().politics.jobs[0],before=g.state().gold;await sail(g,q.partner);assert.equal(g.state().politics.safety.person.city,q.partner);assert.equal(g.state().politics.safety.person.source,'arrival');assert(await g.eval(`witnessPoliticalJob(${JSON.stringify(q.id)})`));assert.equal(await g.eval(`finishPoliticalAccord(${JSON.stringify(q.id)})`),false);await sail(g,0);assert(await g.eval(`finishPoliticalAccord(${JSON.stringify(q.id)})`));assert.equal(await g.eval(`finishPoliticalAccord(${JSON.stringify(q.id)})`),false);assert.equal(g.state().politics.records.length,1);assert.equal(g.state().gold,before-12);return {actualRoundtrip:true,fee:12,oneReceipt:true};
});
await check('an anchored missing legacy station is not silently treated as travelled; existing deadline stays',async()=>{
 const {g,old}=await oldFixture('acceptPoliticalJob("accord");s.ships.push(makeShip(1,{id:2,city:1}));s.city=1;s.active=1');const q=old.politics.jobs[0];await g.eval('confirmLegacyPresence()');assert.equal(await g.eval(`witnessPoliticalJob(${JSON.stringify(q.id)})`),false);assert.equal(g.state().politics.jobs[0].until,q.until);await sail(g,0);await sail(g,1);assert(await g.eval(`witnessPoliticalJob(${JSON.stringify(q.id)})`));return {noFakeOldVisit:true,untilPreserved:true,afterRealArrival:true};
});
await check('already witnessed legacy agreement and its return-right survive import',async()=>{
 const {g,old}=await oldFixture('acceptPoliticalJob("accord");s.politics.jobs[0].witnessed=true');const q=old.politics.jobs[0];await g.eval('confirmLegacyPresence()');assert(await g.eval(`finishPoliticalAccord(${JSON.stringify(q.id)})`));assert.equal(g.state().politics.records[0].id,q.id);return {oldWitnessKept:true,returnAllowedAtRealAnchor:true};
});
await check('remote unaccompanied departure is fail-closed, no ship or person movement invented',async()=>{
 const {g}=await oldFixture('s.ships.push(makeShip(1,{id:2,city:1}))');await g.eval('confirmLegacyPresence()');await g.eval('selectFleetShip(1)');const before=JSON.stringify(g.state());assert.equal(await g.eval('planTravel(2,false)'),false);assert.equal(g.eval('pending'),null);assert.equal(JSON.stringify(g.state()),before);return {unresolvedPolicySafelyRefused:true};
});
await check('arrival write fault rolls back money days ships person and pending completion',async()=>{
 let fail=false;const {g}=await oldFixture('',{fault:k=>fail&&k===KEY});await g.eval('confirmLegacyPresence();');await g.eval('planTravel(1,false)');g.eval('pending.resolved=true;pending.event=null');const before=JSON.stringify(g.state()),disk=g.disk.get(KEY),events=g.events.length;fail=true;assert.equal(await g.eval('arrive()'),false);assert.equal(JSON.stringify(g.state()),before);assert.equal(g.disk.get(KEY),disk);assert.equal(g.eval('pending.arrived??false'),false);assert.equal(g.events.length,events);return {wholeArrivalAtomic:true};
});
await check('stale planned trip cannot reuse an earlier revision after another action',async()=>{
 const {g}=await oldFixture();await g.eval('confirmLegacyPresence()');await g.eval('planTravel(1,false)');await g.eval('donate(50,2)');const before=JSON.stringify(g.state());await g.eval('arrive()');assert.equal(JSON.stringify(g.state()),before);assert.equal(g.state().politics.safety.person.city,0);return {replanRequired:true};
});
await check('actual selected convoy moves every participating hull and the person once',async()=>{
 const {g}=await oldFixture('s.ships.push(makeShip(0,{id:2,city:0}))');await g.eval('confirmLegacyPresence()');const cash=g.state().gold;await g.eval('planTravel(1,true)');g.eval('pending.resolved=true;pending.event=null');await g.eval('arrive()');assert(g.state().ships.every(q=>q.city===1));assert.equal(g.state().politics.safety.person.city,1);assert.equal(g.state().gold,cash-10);return {twoHullConvoy:true,nativeFee:10};
});
await check('old titles candidate offices elder evidence and contracts survive complete V13 copy loading',async()=>{
 const F=require('../../simulation/political-progress-fixtures.cjs'),out=[];
 for(const kind of ['candidate','office','proved','elder']){const raw=F.state(kind);const old=S('s=migrate('+JSON.stringify(raw)+')'),g=E({stored:{[OLD]:JSON.stringify(old)}});await g.ready();assert.deepEqual(withoutSafety(g.state()),old);out.push({kind,rank:g.state().rank,office:!!g.state().politics.office,records:g.state().politics.records.length,elder:!!g.state().politics.elderman});}
 const {g,old}=await oldFixture('s.rank=1;s.rep=30;s.politics.legacyRank=1');assert.deepEqual(withoutSafety(g.state()),old);return {fixtureKinds:out,fernkaufmannPreserved:true,syntheticDerivedHistoricalEndpointsNotNewCareers:true};
});
await check('wrong-place political functions refuse without affecting an existing title',async()=>{
 const {g}=await oldFixture('s.gold=500000;s.rep=100;s.rank=2;s.ships.push(makeShip(1,{id:2,city:1}))');await g.eval('confirmLegacyPresence()');await g.eval('selectFleetShip(1)');for(const code of ["acceptPoliticalJob('supply')","runMayorElection()","promote()","requestPoliticalEndorsement()","acceptHanseAgreement()","runHanseAssembly()"]){const before=JSON.stringify(g.state());await g.eval(code);assert.equal(JSON.stringify(g.state()),before,code);}assert.equal(g.state().rank,2);return {sixEntryPointsNoTeleport:true};
});
await check('manual import failure original backup export restoration and import-time stale guard',async()=>{
 const {g}=await oldFixture(),initial=g.disk.get(KEY);g.selectImport('{broken');await g.finishImport();assert.equal(g.disk.get(KEY),initial);
 const other=S('s.gold=12345;s.debt=500');const raw=JSON.stringify(other,null,2);g.selectImport(raw);await g.finishImport();assert.equal(g.state().gold,12345);assert.equal(g.state().debt,500);assert([...g.disk.values()].includes(raw));assert([...g.disk.values()].includes(initial));
 const stable=g.disk.get(KEY);g.selectImport(JSON.stringify(S('s.gold=22000')));await g.eval('donate(50,2)');const current=g.disk.get(KEY);assert.equal(await g.finishImport(),false);assert.equal(g.disk.get(KEY),current);assert.notEqual(current,stable);return {invalidFileSafe:true,rawOriginalPreserved:true,previousBackup:true,selectionTimeRevisionChecked:true};
});
await check('import commit fault restores everything and buffers the new-run observation',async()=>{
 let fail=false;const {g}=await oldFixture('',{fault:k=>fail&&k===KEY}),before=JSON.stringify(g.state()),events=g.events.length;g.selectImport(JSON.stringify(S('s.gold=17000')));fail=true;assert.equal(await g.finishImport(),false);assert.equal(JSON.stringify(g.state()),before);assert.equal(g.events.length,events);return {noPartialImport:true,noGhostNewRun:true};
});
await check('M2 export is rejected by the actual unchanged old V13 reader',async()=>{
 const {g}=await oldFixture();const raw=g.eval('safetyExportText()');assert.throws(()=>S('s=migrate('+raw+');if(!s)throw Error("old-reader-rejected")'),/old-reader-rejected/);return {actualOldValidatorRejectsNewPolitics:true,noOldClientWrite:true};
});
})().then(()=>{fs.writeFileSync(process.argv[2],JSON.stringify({sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),gameHash:hash,kind:'controlled_VM_native_actions_and_derived_historical_fixtures_not_browser_or_real_saves',checks,passed:true},null,2)+'\n');console.log('PASS total '+checks.length)}).catch(e=>{fs.writeFileSync(process.argv[2],JSON.stringify({gameHash:hash,checks,passed:false,error:e.stack},null,2)+'\n');console.error(e);process.exitCode=1;});
