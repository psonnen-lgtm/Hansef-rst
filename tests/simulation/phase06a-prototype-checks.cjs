// Exactly 3 x 11 x 8 x 7 arithmetic assessments, no game engine or random draws.
const fs=require('node:fs'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict'),path=require('node:path');
const {profiles,portfolios,assess}=require('./politics-concept-prototype.cjs');
assert.equal(profiles.cities.length,11);assert.equal(portfolios.length,8);
const rows=[];
for(const model of ['A','B','C'])for(const city of profiles.cities)for(const p of portfolios)for(let mood=-3;mood<=3;mood++)rows.push(assess(model,p,city,mood));
assert.equal(rows.length,1848);
// No repetitions of entire games: pure-call equivalence and invariants only.
for(const r of rows){
 const p=portfolios.find(p=>p.id===r.candidate),city=profiles.cities[r.city];
 assert.deepEqual(assess(r.model,p,city,r.mood),r);
 if(['rich_only','new_local','supply_only','arrears','outsider'].includes(p.id))assert(!r.eligible&&!r.won);
 if(r.model!=='C')assert.equal(r.won,assess(r.model,p,city,0).won);
 if(r.model==='C'&&r.eligible&&r.support>=r.threshold+3)assert(r.won);
 if(r.model==='C'&&r.eligible&&r.support<r.threshold-3)assert(!r.won);
}
assert(rows.filter(r=>r.candidate==='networked').every(r=>r.won));
assert(rows.filter(r=>r.candidate==='modest_local').every(r=>r.won));
const groups=[];
for(const model of ['A','B','C'])for(const city of profiles.cities){const a=rows.filter(r=>r.model===model&&r.city===city.city);groups.push({model,city:city.city,name:city.name,assessments:a.length,eligible:a.filter(r=>r.eligible).length,won:a.filter(r=>r.won).length,reliableMoodWins:a.filter(r=>r.candidate==='reliable'&&r.won).map(r=>r.mood)})}
const file=process.argv[2];assert(file);const result={kind:'synthetic_arithmetic_not_economic_or_human_career_simulation',parameterStatus:'unapproved_proposal',assessments:rows.length,models:['A','B','C'],cities:11,portfolios:8,moodValues:7,wealthAndReputationCannotReplaceServices:true,ineligibleNeverWins:true,AandBIgnoreMood:true,CboundedMoodOnly:true,repeatablePureCalls:true,groups,rows,sourceSHA256:Object.fromEntries(['politics-concept-profiles.json','politics-concept-prototype.cjs','phase06a-prototype-checks.cjs'].map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,f))).digest('hex')])),limits:['illustrative portfolios, no observed achievement acquisition','no gameplay duration or start-city balance tested','counts are not election probabilities','no persistence, historical migration or integration of proposed rules tested']};
fs.writeFileSync(file,zlib.gzipSync(JSON.stringify(result)),{flag:'wx'});console.log('PASS 1848 arithmetic assessments; no full games, game RNG or productive integration');
