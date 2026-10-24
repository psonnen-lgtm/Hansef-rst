// Phase 1.6a: a separate, sequential runner. Historical entrypoints stay unchanged.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const zlib=require('node:zlib'),assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const IDS=['cautious','normal','aggressive','optimized','delivery','recovery5','recovery10','recovery20','recovery30'];
const ROOT=path.join(__dirname,'runs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function plan(mode='full',replay=false){
 assert(['full','smoke'].includes(mode),'mode must be full or smoke');
 assert.equal(typeof replay,'boolean');
 const ids=mode==='full'?IDS:['cautious','delivery'];
 const seeds=Array.from({length:mode==='full'?250:1},(_,i)=>10001+i);
 const tasks=ids.flatMap(strategy=>seeds.map(seed=>({strategy,seed})));
 assert.equal(new Set(tasks.map(t=>`${t.strategy}/${t.seed}`)).size,tasks.length);
 if(mode==='full'){
  assert.equal(tasks.length,2250);
  for(const id of IDS)assert.equal(new Set(tasks.filter(t=>t.strategy===id).map(t=>t.seed)).size,250);
 }
 return {schemaVersion:1,mode,replay,rng:'mulberry32',strategies:ids,seeds,tasks};
}
function identity(){
 const files=['large-run.cjs','integrated.cjs','headless.cjs','strategies.js','delivery-strategy.js','recovery-strategy.js','../../Hansefuerst_0_4.html'];
 return {node:process.version,hashes:Object.fromEntries(files.map(f=>[f,sha(fs.readFileSync(path.join(__dirname,f)))]))};
}
// Hard-link publication is atomic and refuses to replace an existing destination.
function publish(file,bytes){
 const tmp=file+'.tmp-'+crypto.randomUUID();
 fs.writeFileSync(tmp,bytes,{flag:'wx'});
 try{fs.linkSync(tmp,file)}finally{fs.unlinkSync(tmp)}
}
function execute(task,replay){
 const started=process.hrtime.bigint();
 const result=spawnSync(process.execPath,[__filename,'--worker',task.strategy,String(task.seed),replay?'replay':'once'],{
  encoding:'utf8',maxBuffer:128*1024*1024,timeout:120000
 });
 if(result.error||result.status!==0)throw Error(JSON.stringify({status:result.status,signal:result.signal,error:result.error?.message,stderr:result.stderr?.slice(-12000)}));
 const output=JSON.parse(result.stdout);
 return {...output,wallMs:Number(process.hrtime.bigint()-started)/1e6};
}
function validate(record,task,replay){
 assert.equal(record.status,'ok');assert.deepEqual(record.task,task);
 assert.equal(record.replayVerified,replay);
 assert.equal(record.row.strategy,task.strategy);assert.equal(record.row.seed,task.seed);
 assert.equal(record.row.events.filter(e=>e.type==='travel').length,record.row.trading.journeys);
 assert(record.wallMs>=0);assert(record.resources.maxRSS>0);
}
function readRecord(file,task,replay){
 const value=JSON.parse(zlib.gunzipSync(fs.readFileSync(file)));
 validate(value,task,replay);return value;
}
function run({directory,config,resume=false,worker=execute}){
 // Reconstruct the allowed plan instead of trusting a caller-supplied task list.
 const expected=plan(config.mode,config.replay);
 for(const [k,v] of Object.entries(expected))assert.deepEqual(config[k],v,'invalid plan '+k);
 assert.deepEqual(config.identity,identity(),'code/runtime identity changed');
 if(resume){
  assert(fs.lstatSync(directory).isDirectory()&&!fs.lstatSync(directory).isSymbolicLink(),'not a real run directory');
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory,'manifest.json'))),config,'resume configuration/code mismatch');
 }else{
  fs.mkdirSync(directory); // Deliberately no recursive/existOk: existing runs are protected.
  publish(path.join(directory,'manifest.json'),JSON.stringify(config,null,2)+'\n');
 }
 const lock=path.join(directory,'active.lock');
 const fd=fs.openSync(lock,'wx');fs.writeFileSync(fd,JSON.stringify({pid:process.pid,started:new Date().toISOString()}));fs.closeSync(fd);
 const session=crypto.randomUUID(),started=Date.now();let completed=0,failed=0,skipped=0;
 const log=entry=>fs.appendFileSync(path.join(directory,'attempts.jsonl'),JSON.stringify({time:new Date().toISOString(),session,...entry})+'\n');
 try{
  log({event:'session_start',resume});
  for(const task of config.tasks){
   const file=path.join(directory,`${task.strategy}-${task.seed}.json.gz`);
   if(fs.existsSync(file)){readRecord(file,task,config.replay);skipped++;continue}
   const before=Date.now();
   log({event:'start',task});
   let value;
   try{
    value={status:'ok',task,...worker(task,config.replay)};
    validate(value,task,config.replay);
   }catch(e){failed++;log({event:'failed',task,wallMs:Date.now()-before,error:e.stack});continue}
   publish(file,zlib.gzipSync(JSON.stringify(value)));
   completed++;log({event:'ok',task,wallMs:value.wallMs,resources:value.resources});
  }
  const result={event:'session_end',completed,skipped,failed,expected:config.tasks.length,wallMs:Date.now()-started};
  // Re-read every available checkpoint; incomplete runs must never claim success.
  const found=config.tasks.filter(t=>fs.existsSync(path.join(directory,`${t.strategy}-${t.seed}.json.gz`)));
  for(const t of found)readRecord(path.join(directory,`${t.strategy}-${t.seed}.json.gz`),t,config.replay);
  result.totalComplete=found.length;result.complete=found.length===config.tasks.length&&failed===0;
  log(result);return result;
 }finally{fs.unlinkSync(lock)}
}
function cli(args){
 if(args[0]==='--worker'){
  assert.equal(args.length,4);const strategy=args[1],seed=Number(args[2]),replay=args[3]==='replay';
  assert(IDS.includes(strategy)&&Number.isInteger(seed)&&seed>=10001&&seed<=10250);
  assert(['once','replay'].includes(args[3]));
  const {registry,runOne}=require('./integrated.cjs');
  assert.deepEqual(registry.map(p=>p.id),IDS,'strategy registry changed');
  const policy=registry.find(p=>p.id===strategy),row=runOne(policy,seed);
  if(replay)assert.deepEqual(runOne(policy,seed),row,'deterministic replay mismatch');
  process.stdout.write(JSON.stringify({row,replayVerified:replay,resources:process.resourceUsage()}));return;
 }
 let mode='full',replay=false,executeRequested=false,resume=false,name;
 const seen=new Set();
 for(let i=0;i<args.length;i++){
  const a=args[i];assert(!seen.has(a),'duplicate argument '+a);seen.add(a);
  if(a==='--smoke')mode='smoke';
  else if(a==='--replay')replay=true;
  else if(a==='--execute')executeRequested=true;
  else if(a==='--resume')resume=true;
  else if(a==='--run')name=args[++i];
  else throw Error('unknown argument '+a);
 }
 assert(!resume||executeRequested,'resume requires --execute');
 assert(!name||/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(name),'invalid run name');
 const config={...plan(mode,replay),identity:identity()};
 if(!executeRequested){console.log(JSON.stringify({mode,replay,strategies:config.strategies,seeds:config.seeds,results:config.tasks.length,engineExecutions:config.tasks.length*(replay?2:1),note:'Plan only. Use --execute --run NAME to run; full mode is 2250 results.'},null,2));return}
 assert(name,'execution requires explicit --run NAME');
 fs.mkdirSync(ROOT,{recursive:true});
 assert(!fs.lstatSync(ROOT).isSymbolicLink(),'runs root must not be symlink');
 const result=run({directory:path.join(ROOT,name),config,resume});
 console.log(JSON.stringify(result,null,2));if(!result.complete)process.exitCode=1;
}
if(require.main===module){try{cli(process.argv.slice(2))}catch(e){console.error(e.stack);process.exitCode=1}}
module.exports={IDS,plan,identity,publish,run,readRecord};
