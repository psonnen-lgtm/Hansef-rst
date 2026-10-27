'use strict';
// Static closed-form sensitivity of the EXISTING linear stock-return component.
// No market trajectory, no game VM, no random numbers, no forecast.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const out=process.argv[2];if(!out||fs.existsSync(out))throw Error('new output required');
const html=fs.readFileSync(path.resolve(__dirname,'../../../Hansefuerst_0_4.html'),'utf8');assert(html.includes('stockReturn:.015'));assert(html.includes('stockReference:110'));
const returnRate=.015,rows=[[15,30],[30,90],[60,90],[30,360]].map(([q,interval])=>{
 const retention=(1-returnRate)**interval,relativeDeficitJustAfter=q/(1-retention),relativeDeficitJustBefore=relativeDeficitJustAfter-q;
 assert(relativeDeficitJustAfter>=q&&Number.isFinite(relativeDeficitJustAfter));assert(Math.abs(relativeDeficitJustBefore-retention*relativeDeficitJustAfter)<1e-9);
 return {q,interval,retention,relativeDeficitJustAfter,relativeDeficitJustBefore};
});
const result={phase:'P1.3',pureMath:true,newGameContexts:0,testedCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),returnRate,formula:'D_after=q/(1-(1-.015)^interval)',meaning:'quantity gap against same scheduled ordinary deliveries without public removal, under unclamped linear mean-return approximation',rows,limits:['not absolute equilibrium stock','no random, clamp, player response or price effects modeled','not a new price or production formula','not evidence for long-run economic stability']};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({pureMath:true,newGameContexts:0,examples:rows.length,rows}));
