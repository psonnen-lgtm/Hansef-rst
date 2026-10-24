// Revalidate archived final states only. No strategy, travel, market advance or simulation.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');const {create,hash}=require('./headless.cjs');
const archive=path.join(__dirname,'phase05e-20261024-01/recovery20.tar.gz');
const code=`import tarfile,gzip,json,sys
out=[]
with tarfile.open(sys.argv[1],'r:gz') as archive:
 for member in archive:
  record=json.loads(gzip.decompress(archive.extractfile(member).read()))
  out.append({'seed':record['row']['seed'],'state':record['row']['raw']['phase05e']['finalState']})
print(json.dumps(out))`;
const rows=JSON.parse(execFileSync('python3',['-c',code,archive],{encoding:'utf8',maxBuffer:20*1024*1024}));assert.equal(rows.length,250);const g=create(42);let blocked=0;
for(const row of rows){g.context.raw=row.state;g.eval('s=migrate(raw)');assert(g.eval('s!==null'));assert.equal(g.eval('s.ships.length'),1);assert(g.eval('s.gold>=0&&s.gold<=5'));const before=g.eval('JSON.stringify(s)');assert.match(g.eval('shipSaleQuote(ship().id).reason'),/letztes einsatzfähiges Schiff/);assert(!g.eval('sellShip(ship().id)'));assert.equal(g.eval('JSON.stringify(s)'),before);blocked++}
const result={gameSHA256:hash,sourceArchive:path.relative(path.join(__dirname,'../..'),archive),archivedFinalStates:250,validV6Loads:250,lastShipSaleBlocked:blocked,simulationExecutions:0,gameDaysAdvanced:0,conclusion:'The spare-ship sale deliberately does not rescue these historical one-ship deadlocks.'};if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log('PASS 250 historical v6 final states retain last-ship protection; no simulation or days advanced');
