// Bounded analysis; importing this module never starts simulations.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib'),assert=require('node:assert/strict'),{execFile}=require('node:child_process');
const {execFileSync}=require('node:child_process');
const oldHTML=execFileSync('git',['show','ff741a6:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});
const headless=require('./headless.cjs'),nativeCreate=headless.create;let currentGroup=null;
headless.create=seed=>nativeCreate(seed,currentGroup==='regional'?null:oldHTML);
const {registry,runOne}=require('./integrated.cjs');
const BASE='ff741a6421176e904e622f4c01af455efe6092cd',MODELS=['legacy','F_info','regional'],IDS=['cautious','normal','aggressive','optimized','remote','explorer'];
const dir=__dirname,read=f=>fs.readFileSync(path.join(dir,f),'utf8'),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const historical=require('./phase05h2-run.cjs'),previous=require('./phase05h-run.cjs'),flow=read('regional-flow-prototype.js'),information=read('regional-information-prototype.js');
const prototype=read('regional-economy-prototype.js'),remote=read('phase05e-remote-strategy.js'),explorer=read('regional-explorer-strategy.js');
// Extend the existing daily observer with year windows, leaving its checks intact.
let observer=read('phase05e-observer.js');
const marker='function __phaseDay(){data.observations++;';assert.equal(observer.split(marker).length,2);
observer=observer.replace(marker,`data.yearWindows=Array.from({length:5},()=>s.markets.map(row=>row.map(()=>({n:0,price:0,stock:0,floor:0,cap:0}))));
 ${marker}const age=totalDay()-(data.initialState.year*360+data.initialState.day);if(age>0&&age<=1800){const window=data.yearWindows[Math.min(4,Math.floor((age-1)/360))];for(let c=0;c<CITY_COUNT;c++)for(let j=0;j<GOOD_COUNT;j++){const m=s.markets[c][j],a=window[c][j];a.n++;a.price+=m.price;a.stock+=m.stock;a.floor+=m.price===4;a.cap+=m.stock===240}}`);
function identity(){const files=['phase05h3-run.cjs','phase05h2-run.cjs','regional-flow-prototype.js','regional-information-prototype.js','phase05h-run.cjs','regional-economy-prototype.js','regional-explorer-strategy.js','phase05e-observer.js','phase05e-remote-strategy.js','integrated.cjs','headless.cjs','strategies.js','delivery-strategy.js','recovery-strategy.js','../../Hansefuerst_0_4.html'];return {node:process.version,hashes:Object.fromEntries(files.map(f=>[f,sha(fs.readFileSync(path.join(dir,f)))]))};}
function plan(){return {phase:'0.5h.3',schema:1,base:BASE,models:MODELS,strategies:IDS,seeds:Array.from({length:12},(_,i)=>10001+i),distinctCases:216,pilotCases:18,pilotReplays:18,maxFullExecutions:234,limits:{days:1440,decisions:800,lastTripMayExceed:true,timeoutSeconds:120,workers:4},initial:'real fresh Lübeck, 5000 cash / 9960 book wealth',rng:'mulberry32; model stock range differs but draw count per cell preserved',baselineHTMLSHA256:sha(oldHTML),identity:identity()}}
function policy(model,id){
 assert(MODELS.includes(model)&&IDS.includes(id));
 if(model==='legacy')return previous.policy('control',id);
 if(model==='F_info')return historical.policy('F_info',id);
 const known=registry.find(p=>p.id===id),p=known??{id,family:'trade',information:id==='remote'?'fixed_tour':'own_pricebook_explorer'};
 const pureInfo=information.slice(0,information.indexOf('function installRegionalInformation('));
 const invocation=id==='remote'?'simulatePhase05eRemote(1440,800)':id==='explorer'?'simulateRegionalExplorer(1440,800)':`simulate('${id}',1440,800)`;
 const enabled=['cautious','normal','aggressive','explorer'].includes(id);
 return {...p,invoke:`(()=>{${remote}\n${explorer}\n${pureInfo}\n${observer}\nconst informationDecisions=[];const oldPlan=planObserved;
 if(${enabled})planObserved=(strategy,v)=>{regionalReport();return regionalInformationPlan(strategy,v,oldPlan(strategy,v),REGIONAL_PROFILES,s.economy.reports)};
 const record=(choice,v)=>{if(choice?.publicInformation)informationDecisions.push({day:v.day,from:s.city,to:choice.city,quantity:choice.quantity,expectedGain:choice.expectedGain,...choice.publicInformation})};
 const marker='const choice=planObserved(strategy,view);metrics.decisions++;',body=simulateObserved.toString();if(body.split(marker).length!==2)throw Error('decision guard');simulateObserved=eval('('+body.replace(marker,'const choice=planObserved(strategy,view);record(choice,view);metrics.decisions++;')+')');
 const finish=installPhase05eObserver();const result=${invocation};result.phase05e=finish();result.phase05h3Information={enabled:${enabled},decisions:informationDecisions,reports:JSON.parse(JSON.stringify(s.economy.reports))};return result})()`};
}
function execute(task,replay=false){
 currentGroup=task.model;const started=Date.now(),row=runOne(policy(task.model,task.strategy),task.seed);
 assert.equal(row.raw.phase05e.daysObserved,row.days);
 assert.equal(row.raw.phase05e.questChecks.length,row.deliveries.completed);
 assert.equal(row.raw.phase05e.questChecks.reduce((a,q)=>a+q.paid,0),row.deliveries.premiums);
 if(replay)assert.deepEqual(row,runOne(policy(task.model,task.strategy),task.seed),'complete deterministic replay');
 return {status:'ok',task,row,replayVerified:replay,wallMs:Date.now()-started};
}
function publish(file,bytes){fs.writeFileSync(file,bytes,{flag:'wx'})}
function readCase(file,task){const r=JSON.parse(zlib.gunzipSync(fs.readFileSync(file)));assert.equal(r.status,'ok');assert.deepEqual(r.task,task);return r}
async function run(directory,pilot){
 const manifest=path.join(directory,'manifest.json'),config=plan();
 if(fs.existsSync(manifest))assert.deepEqual(JSON.parse(fs.readFileSync(manifest)),config,'code/config changed since pilot');else{fs.mkdirSync(directory,{recursive:true});publish(manifest,JSON.stringify(config,null,2)+'\n')}
 const lock=path.join(directory,'active.lock');publish(lock,String(process.pid));
 const tasks=MODELS.flatMap(model=>IDS.flatMap(strategy=>config.seeds.filter(seed=>!pilot||seed===10001).map(seed=>({model,strategy,seed}))));
 const log=x=>fs.appendFileSync(path.join(directory,'attempts.jsonl'),JSON.stringify({at:new Date().toISOString(),...x})+'\n');let index=0,completed=0,skipped=0,failed=0;
 log({event:'start',pilot,tasks:tasks.length});
 async function work(){while(index<tasks.length){const task=tasks[index++],file=path.join(directory,`${task.model}-${task.strategy}-${task.seed}.json.gz`);if(fs.existsSync(file)){readCase(file,task);skipped++;continue}
  try{const value=await new Promise((resolve,reject)=>execFile(process.execPath,[__filename,'--worker',task.model,task.strategy,String(task.seed),...(pilot?['--replay']:[])],{timeout:120000,maxBuffer:32*1024*1024},(err,out,stderr)=>err?reject(Error(String(err)+' '+stderr.slice(-2500))):resolve(JSON.parse(out))));assert.deepEqual(value.task,task);publish(file,zlib.gzipSync(JSON.stringify(value),{level:6}));completed++;log({event:'ok',task,replay:value.replayVerified,wallMs:value.wallMs});if(pilot||completed%24===0)console.log(JSON.stringify({completed,skipped,failed,last:task}));}
  catch(e){failed++;log({event:'failed',task,error:e.stack});console.error('FAILED',JSON.stringify(task),e.message);break}
 }}
 try{await Promise.all(Array.from({length:4},work));const result={pilot,completed,skipped,failed,planned:tasks.length};publish(path.join(directory,pilot?'pilot-complete.json':'execution-complete.json'),JSON.stringify(result,null,2)+'\n');log({event:'end',...result});console.log(JSON.stringify(result));if(failed)process.exitCode=1;return result}finally{fs.unlinkSync(lock)}
}
async function main(){const args=process.argv.slice(2);if(args[0]==='--worker'){const task={model:args[1],strategy:args[2],seed:Number(args[3])};assert(MODELS.includes(task.model)&&IDS.includes(task.strategy)&&task.seed>=10001&&task.seed<=10012&&Number.isInteger(task.seed));process.stdout.write(JSON.stringify(execute(task,args.includes('--replay'))));return}if(!args.includes('--execute')){console.log(JSON.stringify(plan(),null,2));return}const i=args.indexOf('--directory');assert(i>=0&&args[i+1],'explicit output directory required');await run(path.resolve(args[i+1]),args.includes('--pilot'))}
if(require.main===module)main().catch(e=>{console.error(e.stack);process.exitCode=1});
module.exports={BASE,MODELS,IDS,identity,plan,policy,execute,readCase,observer,prototype,flow,information,explorer};
