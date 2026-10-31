// Read-only audit after interruption. Never advance days or replay a strategy.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),dir=path.join(__dirname,'phase05j-20261025-01'),inventory=JSON.parse(fs.readFileSync(path.join(dir,'resume-inventory.json'))),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),clean=x=>JSON.parse(JSON.stringify(x));
for(const [file,expected] of Object.entries(inventory.filesAtResume))assert.equal(sha(fs.readFileSync(file)),expected,file);
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'main/manifest.json'))),original=execFileSync('git',['show',manifest.identity.gameCommit+':Hansefuerst_0_4.html'],{maxBuffer:10000000});assert.equal(sha(original),manifest.identity.gameSHA256);
for(const [file,expected] of Object.entries(manifest.identity.files))assert.equal(sha(fs.readFileSync(path.join(__dirname,file))),expected,file);
const cases=fs.readdirSync(path.join(dir,'main')).filter(f=>f.endsWith('.json.gz'));assert.equal(cases.length,240);
const g=create(42),checks=[];let replays=0,material=0,completed=0;
for(const file of cases){const saved=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(dir,'main',file)))),r=saved.row;assert.equal(r.gameSHA256,r.model==='material'?manifest.identity.gameSHA256:sha(execFileSync('git',['show',manifest.base+':Hansefuerst_0_4.html'],{maxBuffer:10000000})));
 if(saved.replayVerified)replays++;
 assert(!r.events.some(e=>e.type==='ship_sale'),'main retained ships; ID reuse condition absent');
 g.context.archived=r.final;const upgraded=clean(g.eval('migrate(archived)'));assert(upgraded);const projected=clean(upgraded);if(r.model==='material'){material++;delete projected.shipyard.lastShipId}else{delete projected.shipyard;projected.v=9}assert.deepEqual(projected,r.final);
 assert(upgraded.shipyard.lastShipId>=Math.max(...upgraded.ships.map(q=>Math.ceil(q.id))));
 completed+=r.events.filter(e=>e.type==='shipbuilding_completed').length;
 checks.push({file,oldEconomicFieldsExact:true,noSaleInMain:true,safeWatermark:true});
}
assert.equal(replays,20);assert.equal(completed,216);assert.equal(material,120);
const result={kind:'read_saved_data_and_migrate_only_no_full_execution',testedGameCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),gameSHA256:hash,originalSimulationCommit:manifest.identity.gameCommit,fullDistinctCases:240,exactPilotReplays:20,fullExecutions:260,newFullExecutionsOnResume:0,inventoryFilesUnchanged:Object.keys(inventory.filesAtResume).length,savedFinalsMigrated:cases.length,materialShipsCompleted:completed,checks,limitation:'No complete economic run on the identity fix; existing full-game results retain original source identity.'};
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log('PASS saved inventory unchanged; 240 saved finals migrated, 20 stored exact replays; no full games executed');
