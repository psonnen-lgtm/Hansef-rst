const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),{spawnSync}=require('child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'hanse-regressions-'));
const archive=fs.readdirSync(__dirname).filter(f=>f.startsWith('phase15')&&/\.(json|gz)$/.test(f));
const hashes=()=>Object.fromEntries(archive.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,f))).digest('hex')]));const before=hashes();
const commands=['tests/test-v04.cjs','tests/phase1.cjs','tests/simulation/edges.cjs','tests/telemetry.cjs','tests/share.cjs','tests/simulation/optimized-phase15a.cjs','tests/simulation/observed-phase15b.cjs','tests/simulation/delivery-phase15c.cjs','tests/simulation/recovery-phase15d.cjs'];const results=[];
try{for(const file of commands){const r=spawnSync(process.execPath,['--require',path.join(__dirname,'regression-output.cjs'),file],{cwd:root,encoding:'utf8',env:{...process.env,HANSE_REGRESSION_OUTPUT:dir},maxBuffer:10*1024*1024});results.push({command:'node '+file,exitCode:r.status,stdout:r.stdout,stderr:r.stderr,error:r.error?.message??null});console.log((r.status===0?'PASS ':'FAIL ')+file);}
 assert.deepEqual(hashes(),before,'All earlier raw data preserved');
 fs.writeFileSync(path.join(__dirname,'phase15e-regressions.json'),JSON.stringify({historicalDataPreserved:true,results},null,2)+'\n');
 assert(results.every(r=>r.exitCode===0),'Some regressions failed: see phase15e-regressions.json');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
