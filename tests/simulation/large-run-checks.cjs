// Technical runner checks only: fake rows, no game simulation.
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {plan,identity,publish,run,readRecord,IDS}=require('./large-run.cjs');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hanse-runner-'));let checks=0;
function check(label,fn){fn();checks++;console.log('PASS '+label)}
const config={...plan('smoke',true),identity:identity()};
const fake=task=>({row:{...task,events:[{type:'travel'}],trading:{journeys:1}},replayVerified:true,resources:{maxRSS:123},wallMs:1});
try{
 check('exactly nine strategies, 250 unique seeds each, 2250 pairs',()=>{
  const p=plan();assert.deepEqual(p.strategies,IDS);assert.equal(p.tasks.length,2250);
  for(const id of IDS)assert.deepEqual(p.tasks.filter(t=>t.strategy===id).map(t=>t.seed),Array.from({length:250},(_,i)=>10001+i));
 });
 check('invalid modes and altered task lists rejected',()=>{
  assert.throws(()=>plan('other'));assert.throws(()=>run({directory:path.join(tmp,'bad'),config:{...config,tasks:[]},worker:fake}));
 });
 check('atomic publication never overwrites existing bytes',()=>{
  const f=path.join(tmp,'protected');publish(f,'original');assert.throws(()=>publish(f,'changed'));assert.equal(fs.readFileSync(f,'utf8'),'original');
 });
 const dir=path.join(tmp,'run');
 check('failure logged; successful checkpoint remains readable',()=>{
  const r=run({directory:dir,config,worker:t=>{if(t.strategy==='delivery')throw Error('injected failure');return fake(t)}});
  assert.equal(r.complete,false);assert.equal(r.failed,1);assert.equal(r.totalComplete,1);
  assert(fs.readFileSync(path.join(dir,'attempts.jsonl'),'utf8').includes('injected failure'));
  readRecord(path.join(dir,'cautious-10001.json.gz'),config.tasks[0],true);
 });
 check('existing directory refused without resume',()=>assert.throws(()=>run({directory:dir,config,worker:fake})));
 check('resume skips success and retries failure without altering checkpoint',()=>{
  const f=path.join(dir,'cautious-10001.json.gz'),bytes=fs.readFileSync(f);let calls=0;
  const r=run({directory:dir,config,resume:true,worker:t=>{calls++;return fake(t)}});
  assert(r.complete);assert.equal(calls,1);assert.equal(r.skipped,1);assert.deepEqual(fs.readFileSync(f),bytes);
 });
 check('resume configuration mismatch and concurrent lock rejected',()=>{
  assert.throws(()=>run({directory:dir,config:{...plan('smoke',false),identity:identity()},resume:true,worker:fake}));
  fs.writeFileSync(path.join(dir,'active.lock'),'test');assert.throws(()=>run({directory:dir,config,resume:true,worker:fake}));fs.unlinkSync(path.join(dir,'active.lock'));
 });
 check('corrupt checkpoint blocks resume instead of being replaced',()=>{
  const f=path.join(dir,'delivery-10001.json.gz');fs.writeFileSync(f,'corrupt');
  assert.throws(()=>run({directory:dir,config,resume:true,worker:fake}));assert.equal(fs.readFileSync(f,'utf8'),'corrupt');
 });
 console.log(checks+' technical checks passed; no game runs');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
