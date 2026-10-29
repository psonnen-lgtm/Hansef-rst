'use strict';
// Read baseline evidence first. No VM, game runs or predetermined fee amount.
const fs=require('node:fs'),assert=require('node:assert/strict'),dir=__dirname+'/results',out=dir+'/fees.json';if(fs.existsSync(out))throw Error('existing selection');
const pilot=JSON.parse(fs.readFileSync(dir+'/pilot.json')),batch=JSON.parse(fs.readFileSync(dir+'/baseline.json'));assert(pilot.passed&&batch.passed);const rows=[...pilot.rows,...batch.rows];assert.equal(rows.length,10);
const picked=rows.map(r=>({strategy:r.strategy,seed:r.seed,checkpoint:r.snapshots.find(s=>s.day>=30)??r.snapshots.at(-1)})),values=picked.map(r=>r.checkpoint.freeCash).filter(x=>x!==null).sort((a,b)=>a-b);
const position=(values.length-1)*.25,low=Math.floor(position),q25=values[low]+(values[Math.ceil(position)]-values[low])*(position-low),candidates=[...new Set([.10,.25,.50].map(f=>100*Math.floor(q25*f/100)).filter(n=>n>0))];assert(candidates.length>0);
fs.writeFileSync(out,JSON.stringify({phase:'Q1.04',readOnly:true,baselineCount:10,checkpointRule:'first observed post-sale checkpoint at or beyond30 days; last if early termination; no interpolation',referenceQ25FreeCash:q25,referenceValues:picked,candidateFractions:[.1,.25,.5],rounding:'down to100 gold',candidates,feeNotFixed:true,notHumanPopulationQuantiles:true},null,2)+'\n');console.log(JSON.stringify({q25,candidates,baselineCount:10}));
