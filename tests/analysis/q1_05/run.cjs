'use strict';
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),cp=require('node:child_process'),assert=require('node:assert/strict');
const E=require('./engine.cjs'),{plan}=E,stage=process.argv[2],out=path.join(__dirname,'results');fs.mkdirSync(out+'/runs',{recursive:true});
const id=s=>s.scenario+'__'+s.strategy+'__'+s.seed;
const all=plan.scenarios.flatMap(sc=>plan.strategies.flatMap(strategy=>plan.seeds.map(seed=>({scenario:sc.id,strategy,seed}))));
assert(['pilot','pilot-retry','baseline','fees'].includes(stage));
const stamp=out+'/'+stage+'-started.json';assert(!fs.existsSync(stamp),'stage already attempted; inspect stored state, do not blindly repeat');
fs.writeFileSync(stamp,JSON.stringify({stage,sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),node:process.version,started:new Date().toISOString()},null,2)+'\n');
function save(key,r){const raw=JSON.stringify(r);fs.writeFileSync(out+'/runs/'+key+'.json.gz',zlib.gzipSync(raw,{level:9}));return {id:key,spec:r.spec,fee:r.fee,timing:r.timing,days:r.days,paid:r.paid,paymentDay:r.payment?.day??null,stopReason:r.stopReason,traceHash:E.hash(r),ledgers:r.ledgers};}
const index=[];
try{
 if(stage==='pilot'||stage==='pilot-retry'){
  if(stage==='pilot'){const credit=E.creditProbe();fs.writeFileSync(out+'/credit-probe.json',JSON.stringify(credit,null,2)+'\n');}
  for(const spec of plan.pilot){const r=E.run(spec),repeat=E.run(spec);assert.equal(E.hash(r),E.hash(repeat),'exact seeded pilot replay');const saved=save(id(spec),r);assert(r.voyages.some(v=>v.bought>=10),'meaningful trade');assert(new Set(r.voyages.flatMap(v=>[v.from,v.to])).size>=2,'actual route coverage: a real route, not forced third-port exploration');if(spec.scenario==='luebeck_convoy'){for(const hull of r.initial.ships)assert(r.events.some(e=>e.type==='buy'&&e.shipId===hull.id),'both convoy hulls actually used');assert(r.events.filter(e=>e.type==='travel').every(e=>e.ships.length===2));}
   index.push({...saved,exactRepeatHash:E.hash(repeat)});console.log(JSON.stringify(index.at(-1)));fs.writeFileSync(out+'/pilot.json',JSON.stringify(index,null,2)+'\n');
  }
 }else if(stage==='baseline'){
  const pilots=JSON.parse(fs.readFileSync(out+'/pilot.json'));assert.equal(pilots.length,3);
  for(const spec of all.filter(s=>!plan.pilot.some(p=>id(p)===id(s)))){const key=id(spec);assert(!fs.existsSync(out+'/runs/'+key+'.json.gz'));const r=E.run(spec);index.push(save(key,r));console.log(JSON.stringify(index.at(-1)));fs.writeFileSync(out+'/baseline.json',JSON.stringify(index,null,2)+'\n');}
 }else{
  const fees=JSON.parse(fs.readFileSync(out+'/fees.json')).fees;assert.equal(fees.length,3);
  for(const fee of fees)for(const timing of ['nominal','stabilized'])for(const spec of plan.feeCases){const key=id(spec)+'__'+fee+'__'+timing;assert(!fs.existsSync(out+'/runs/'+key+'.json.gz'));const r=E.run(spec,fee,timing);index.push(save(key,r));console.log(JSON.stringify(index.at(-1)));fs.writeFileSync(out+'/fee.json',JSON.stringify(index,null,2)+'\n');}
 }
 fs.writeFileSync(out+'/'+stage+'-completed.json',JSON.stringify({stage,count:index.length,ended:new Date().toISOString()},null,2)+'\n');
}catch(error){fs.writeFileSync(out+'/'+stage+'-failure.json',JSON.stringify({stage,completed:index.length,error:error.stack},null,2)+'\n');throw error;}
