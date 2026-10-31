// Dry-run only: original v6 is never replaced, no activation metadata is saved.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),zlib=require('node:zlib'),{execFileSync}=require('node:child_process');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{prototype,flow,information}=require('./phase05h2-run.cjs'),sha=x=>crypto.createHash('sha256').update(x).digest('hex'),checks=[];
const records=JSON.parse(execFileSync('python3',['-c',`import tarfile,json,gzip,pathlib
p=pathlib.Path('tests/simulation/phase05e-20261024-01');out=[]
for policy in ['normal','remote','recovery20']:
 with tarfile.open(p/(policy+'.tar.gz')) as t:
  for seed in range(10001,10009):
   r=json.loads(gzip.decompress(t.extractfile(f'{policy}-{seed}.json.gz').read()))['row'];out.append(dict(policy=policy,seed=seed,state=r['raw']['phase05e']['finalState']))
print(json.dumps(out))`],{cwd:path.resolve(__dirname,'../..'),maxBuffer:8*1024*1024}).toString());
for(const record of records){
 const original=JSON.stringify(record.state),g=create(919);g.load(fs.readFileSync(path.join(__dirname,'strategies.js'),'utf8'));g.load(prototype+'\n'+flow+'\n'+information);g.eval('s='+original+';validate(s);localStorage.setItem=()=>{throw Error("unexpected persistent activation")};const oldWorth=netWorth()');
 g.eval('installRegionalFlow();const finishInfo=installRegionalInformation(true)');assert.equal(g.eval('JSON.stringify(s)'),original);assert.equal(g.eval('netWorth()'),g.eval('oldWorth'));assert.equal(g.eval('JSON.stringify(migrateToCitiesV6(JSON.parse(JSON.stringify(s))))'),original);
 g.eval('const untouched={gold:s.gold,ships:JSON.stringify(s.ships),warehouses:JSON.stringify(s.warehouses),flags:JSON.stringify(s.flags)};advance(1);validate(s)');assert.equal(g.eval('s.gold'),record.state.gold);assert.equal(g.eval('JSON.stringify(s.ships)'),JSON.stringify(record.state.ships));assert.equal(g.eval('JSON.stringify(s.warehouses)'),JSON.stringify(record.state.warehouses));assert.equal(g.eval('JSON.stringify(s.flags)'),JSON.stringify(record.state.flags));
 checks.push({policy:record.policy,seed:record.seed,originalStateSHA256:sha(original),instantChanges:0,newPersistentFields:0,importRoundTripExact:true,nextDayPreservesCargoFIFOAndGold:true,bankInterestDelta:g.eval('s.bank')-record.state.bank,debtInterestDelta:g.eval('s.debt')-record.state.debt});
}
// Existing one-shot state remains intact for both marker states.
for(const used of [false,true]){const g=create(919);g.load(prototype+'\n'+flow);g.eval(`s.flags.harborWorkUsed=${used};const raw=JSON.stringify(s);installRegionalFlow();s=migrateToCitiesV6(JSON.parse(raw));validate(s)`);assert.equal(g.eval('s.flags.harborWorkUsed'),used)}
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify({gameSHA256:hash,kind:'v6_activation_dry_runs_not_productive_migrations',checks,harborMarkerVariants:2,productiveWrites:0},null,2)+'\n',{flag:'wx'});console.log('PASS '+checks.length+' historical v6 dry runs and both harbor-work marker states; no writes');
