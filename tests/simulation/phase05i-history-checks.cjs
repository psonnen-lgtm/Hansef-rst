// Broad historical v6 preservation, one future day only; no strategy replay.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),clean=x=>JSON.parse(JSON.stringify(x));
const records=JSON.parse(execFileSync('python3',['-c',`import json,tarfile,gzip,pathlib
p=pathlib.Path('tests/simulation/phase05e-20261024-01');out=[]
for policy,count in [('normal',12),('remote',12),('recovery20',250)]:
 with tarfile.open(p/(policy+'.tar.gz')) as t:
  for seed in range(10001,10001+count):
   r=json.loads(gzip.decompress(t.extractfile(f'{policy}-{seed}.json.gz').read()))['row'];out.append(dict(policy=policy,seed=seed,state=r['raw']['phase05e']['finalState']))
print(json.dumps(out))`],{cwd:path.resolve(__dirname,'../..'),maxBuffer:32*1024*1024}).toString()),checks=[];
for(const record of records){const g=create(record.seed);g.context.raw=record.state;const before=JSON.stringify(record.state);const upgraded=clean(g.eval('migrate(raw)'));assert(upgraded);assert.equal(upgraded.v,8);assert.deepEqual(upgraded.economy,{version:1,reports:[]});const projected=clean(upgraded);delete projected.economy;delete projected.storage;projected.v=6;assert.deepEqual(projected,record.state);assert.equal(JSON.stringify(record.state),before);g.context.upgraded=upgraded;g.eval('s=upgraded;const imported=JSON.stringify(s);s=migrate(JSON.parse(imported))');assert.equal(g.eval('JSON.stringify(s)'),g.eval('imported'));g.eval('advance(1);validate(s)');for(const key of ['gold','ships','warehouses','flags','completed','rank'])assert.deepEqual(clean(g.eval('s.'+key)),record.state[key]);checks.push({policy:record.policy,seed:record.seed,originalSHA256:crypto.createHash('sha256').update(before).digest('hex'),allOriginalFieldsPreserved:true,roundTripExact:true,oneDayKeepsGoldCargoFIFOAndFlags:true})}
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify({gameSHA256:hash,kind:'historical_state_preservation_not_complete_strategy_runs',checks},null,2)+'\n',{flag:'wx'});console.log('PASS '+checks.length+' exact historical v6 to v8 upgrades, serialization and one future day');
