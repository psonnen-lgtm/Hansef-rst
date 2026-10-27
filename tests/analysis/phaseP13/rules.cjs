'use strict';
// Pure proposal math: no game VM, no votes, no automatic population consumption.
const assert=require('node:assert/strict');
const integer=n=>Number.isSafeInteger(n)&&n>=0;
function populationCap(population){assert(integer(population)&&population>0);return population<=10000?15:population<=30000?30:45;}
// Two candidates only. All constants remain unapproved proposal parameters.
function evaluate({variant='recovery',population=25000,observations,actions=[],current=null,now}){
 assert(['recovery','chronic'].includes(variant));assert(integer(now));
 if(current&&current.remaining>0)return {allowed:false,reason:'one shared open need'};
 if(observations.length<2)return {allowed:false,reason:'two observations required'};
 const recent=observations.slice(-2);
 if(recent[1].day!==now||recent[0].day!==now-1||recent.some(o=>!o.regular))return {allowed:false,reason:'consecutive ordinary days required'};
 const last=actions.at(-1),recovered=!last||observations.some((o,i)=>i>0&&o.day>last.created&&observations[i-1].day>last.created&&o.day===observations[i-1].day+1&&o.stock>=90&&observations[i-1].stock>=90&&o.regular&&observations[i-1].regular);
 // All suppliers' outstanding local withdrawals, plus public depletion since last
 // genuine free-market recovery. Never reset on year/election/ship changes.
 const recoveryDays=observations.filter((o,i)=>i>0&&o.regular&&observations[i-1].regular&&o.stock>=90&&observations[i-1].stock>=90&&o.day===observations[i-1].day+1).map(o=>o.day);
 const recoveryDay=recoveryDays.at(-1)??-1;
 const publicDepletion=actions.filter(a=>a.filledDay>recoveryDay).reduce((a,b)=>a+b.consumed,0);
 const corrected=recent.map(o=>o.stock+o.debt+publicDepletion);
 if(corrected.some(c=>c>40))return {allowed:false,reason:'no newly confirmed corrected shortage',corrected,publicDepletion};
 if(last&&now-last.filledDay<90)return {allowed:false,reason:'90-day minimum interval since final help',corrected};
 if(variant==='recovery'&&!recovered)return {allowed:false,reason:'free market has not recovered',corrected};
 const window=actions.filter(a=>a.created>now-360),reserved=window.reduce((s,a)=>s+a.capacity,0);
 if(window.length>=2||reserved>=60)return {allowed:false,reason:'rolling 360-day budget exhausted'};
 const pop=populationCap(population),severity=Math.max(...corrected)<=20?pop:Math.min(15,pop);
 const capacity=Math.min(severity,110-Math.max(...corrected),60-reserved);
 if(capacity<1)return {allowed:false,reason:'no quantity budget'};
 return {allowed:true,capacity,populationCap:pop,corrected,publicDepletion,recovered,normalSupplyReference:110,variant};
}
// Shared allocation arithmetic for future suppliers, NOT an NPC game integration.
function allocate(state,{supplier,id,quantity}){
 assert(integer(quantity)&&quantity>0);const key=supplier+':'+id;
 if(state.receipts[key]){assert.equal(state.receipts[key].offered,quantity);return state.receipts[key];}
 const accepted=Math.min(state.remaining,quantity);state.remaining-=accepted;
 return state.receipts[key]={supplier,id,offered:quantity,accepted};
}
module.exports={populationCap,evaluate,allocate};
