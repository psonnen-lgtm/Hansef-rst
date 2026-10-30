'use strict';
// Adapter only for the two bounded legacy statement suites. Assertions unchanged.
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const {environment,hash}=require('../q1_09/harness.cjs');
function createSuite(){
 const checks=[];
 async function test(name,statements){
  const g=environment();await g.ready();await g.eval('safetyRun(()=>{s=newMerchantGame("Ulf","Ulf",0)})');
  // Legacy tests made fresh games and explicit synthetic pending trips. Preserve
  // those fixtures, adding only the mandatory actual-start/revision provenance.
  const actions=g.eval('SAFETY_ACTIONS.concat(SAFETY_VIEWS).join("|")');
  const code=statements.replace(/fresh\("Ulf","Ulf"\)/g,'newMerchantGame("Ulf","Ulf",0)').replace(/pending=\{from:/g,'pending={safetyRevision:s.politics.safety.revision,resolved:true,from:').replace(new RegExp('(?<![\\w.])('+actions+')\\(','g'),'await $1(');
  try{assert.equal(await g.eval('(async()=>{'+code+'})()'),true,name);checks.push({name,passed:true});console.log('PASS '+name)}catch(e){checks.push({name,passed:false,error:e.stack});throw e}
 }
 function write(file){const data={sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),testedGameCommit:cp.execSync('git log -1 --format=%H -- Hansefuerst_0_4.html').toString().trim(),gameHash:hash,kind:'bounded legacy assertions with awaited native root actions; VM, not browser',checks,passed:checks.every(x=>x.passed)};if(file)fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n',{flag:'wx'});return data}
 return {test,checks,write};
}
module.exports={createSuite};
