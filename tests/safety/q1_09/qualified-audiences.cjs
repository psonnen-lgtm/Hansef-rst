'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process'),F=require('../../simulation/political-progress-fixtures.cjs'),{environment:E,originalState:S,hash}=require('./harness.cjs');
const checks=[];
(async()=>{for(const [kind,action]of [['candidate','runMayorElection()'],['proved','requestPoliticalEndorsement()'],['ready','runHanseAssembly()']]){
 const x=F.state(kind),old=S('s=migrate('+JSON.stringify(x)+');s.ships.push(makeShip(1,{id:9999999,city:1}));s.active=s.ships.length-1;s.city=1;'),g=E({stored:{'hansefuerst-v04':JSON.stringify(old)}});await g.ready();await g.eval('confirmLegacyPresence()');await g.eval('selectFleetShip(0)');
 assert.equal(g.state().city,0);assert.equal(g.state().politics.safety.person.city,1);
 if(kind==='candidate'){assert(g.eval('politicalSupport(0).score>=80'));assert(g.eval('politicalSupport(0).records>=6'));assert(g.eval('politicalWorth()>=s.politics.rules.mayorWealth'));assert(g.eval('s.rep>=55'));}
 if(kind==='proved')assert(g.eval('politicalLeagueAccess()&&politicalRecords(0).some(r=>r.kind==="accord")&&politicalRecords(0).some(r=>r.kind==="supply")&&!s.politics.endorsements[0]'));
 if(kind==='ready')assert(g.eval('hanseQuote().reasons.every(x=>x.includes("persönliche"))'));
 const before=JSON.stringify(g.state());assert.equal(await g.eval(action),false);assert.equal(JSON.stringify(g.state()),before);checks.push({kind,action,otherwiseQualified:true,remotePersonalActionRejected:true});}
 fs.writeFileSync(process.argv[2],JSON.stringify({sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),gameHash:hash,checks,passed:true},null,2)+'\n');console.log('PASS qualified audiences '+checks.length);
})().catch(e=>{fs.writeFileSync(process.argv[2],JSON.stringify({gameHash:hash,checks,passed:false,error:e.stack},null,2)+'\n');console.error(e);process.exitCode=1;});
