'use strict';
// Five new data packages only; no simulation and no prior suite rerun.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {environment:E,clean,KEY}=require('../q1_09c/harness.cjs');
const folder=path.join(__dirname,'fixtures'),manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json'),'utf8'));
const out=process.argv[2];assert(out&&!fs.existsSync(out),'NEW result file required');
function withoutSafety(x){x=clean(x);delete x.politics.safety;x.politics.version=1;return x}
(async()=>{
 const cases=[];
 for(const meta of manifest.files){
  const raw=fs.readFileSync(path.join(folder,meta.file),'utf8'),input=JSON.parse(raw);
  assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),meta.sha256);
  assert.match(input.name,/^TEST /);assert(input.messages.some(t=>t.includes('SYNTHETISCHE TESTDATEN')));
  const g=E();assert(await g.ready());g.ctx.qaInput=clean(input);assert(g.eval('validate(qaInput)'));
  g.selectImport(raw);assert(await g.finishImport(),g.eval('SafetySession.error'));
  const first=g.state();assert.equal(first.politics.safety.version,3);
  assert.deepEqual(withoutSafety(first),withoutSafety(input),'migration changes only allowed safety/politics revision');
  assert([...g.disk.values()].includes(raw),'exact raw synthetic original backed up before migration');
  if(meta.expected.originalSafetyVersion===null){
   assert.equal(first.politics.safety.person.city,null);
   assert.equal(first.politics.safety.legacyTransfer.sourceHash,meta.sha256);
  }else assert.equal(first.politics.safety.person.city,0);
  const exported=g.eval('safetyExportText()');assert.equal(exported,g.disk.get(KEY));
  const h=E();assert(await h.ready());h.selectImport(exported);assert(await h.finishImport());
  const second=h.state();assert.deepEqual(withoutSafety(second),withoutSafety(input));
  assert.deepEqual(second.politics.safety.person,first.politics.safety.person);
  assert.deepEqual(second.politics.safety.grace,[]);
  const reloaded=E({stored:h.disk,locks:h.locks});assert(await reloaded.ready());assert.deepEqual(reloaded.state(),second);
  assert.equal(fs.readFileSync(path.join(folder,meta.file),'utf8'),raw);
  cases.push({file:meta.file,status:'PASS',rawSHA256:meta.sha256,productionValidator:true,importMigration:true,allNonSafetyFieldsPreserved:true,rawOriginalBackup:true,exportReimportReload:true,sourceFileUnchanged:true});
 }
 fs.writeFileSync(out,JSON.stringify({date:'2026-10-30 Europe/Berlin',testedGameCommit:manifest.testedGameCommit,gameSHA256:manifest.gameSHA256,kind:'five new synthetic fixtures: actual root game code with modeled DOM/IndexedDB/Web Locks in Node VM; NOT Safari, NOT native browser or Apple hardware',cases,passed:cases.every(x=>x.status==='PASS')},null,2)+'\n',{flag:'wx'});
 console.log('PASS five synthetic fixtures: validator, import, exact raw backup, retained fields, export/reimport/reload');
})().catch(e=>{console.error(e);process.exitCode=1});
