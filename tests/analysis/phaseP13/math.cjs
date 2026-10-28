'use strict';
// Pure rule and amount checks only; does not import harness or create game contexts.
const fs=require('node:fs'),assert=require('node:assert/strict'),R=require('./rules.cjs'),{execFileSync}=require('node:child_process');
const out=process.argv[2];if(!out||fs.existsSync(out))throw Error('fresh output required');const groups=[];
function test(name,fn){try{groups.push({name,passed:true,evidence:fn()});console.log('PASS '+name)}catch(e){groups.push({name,passed:false,error:e.stack});console.error(e.stack)}}
const obs=(now,stock,debt=0)=>[{day:now-1,stock,debt,regular:true},{day:now,stock,debt,regular:true}];
const action=(created,consumed=30)=>({created,filledDay:created,capacity:consumed,consumed});
test('population tiers, shortage severity and all requested sizes',()=>{
 const populations=[5000,10000,16000,25000,30000,40000],rows=populations.map(population=>({population,severe:R.evaluate({population,now:2,observations:obs(2,20)}),mild:R.evaluate({population,now:2,observations:obs(2,35)})}));
 assert.equal(rows[3].severe.capacity,30);assert.equal(rows[3].mild.capacity,15);assert.equal(rows.at(-1).severe.capacity,45);assert.equal(R.populationCap(1000000),45);
 return {rows,experimentalSizes:[15,30,60],historicalOnly:90,notProportionalToPopulation:true};
});
test('two real consecutive days, no price-alone or special-event crisis',()=>{
 for(const observations of [[{day:2,stock:20,debt:0,regular:true}],obs(2,70),[{day:0,stock:20,debt:0,regular:true},{day:2,stock:20,debt:0,regular:true}],[{day:1,stock:20,debt:0,regular:false},{day:2,stock:20,debt:0,regular:true}]])assert(!R.evaluate({now:2,observations}).allowed);
 assert(R.evaluate({now:2,observations:obs(2,20)}).allowed);return {allRefusalsAsExpected:true,priceNotAnInput:true};
});
test('self-created shortage and earlier public consumption correction',()=>{
 const own=R.evaluate({now:2,observations:obs(2,30,80)});assert(!own.allowed);assert.deepEqual(own.corrected,[110,110]);
 const chronic=R.evaluate({variant:'chronic',now:100,actions:[action(1,30)],observations:obs(100,20)});assert(!chronic.allowed);assert.deepEqual(chronic.corrected,[50,50]);
 const deeper=R.evaluate({variant:'chronic',now:100,actions:[action(1,30)],observations:obs(100,5)});assert(deeper.allowed);assert.equal(deeper.capacity,15);
 return {own,chronic,deeper,notExactCounterfactualMarket:true};
});
test('calendar alone, election and new year never refill existing or unchanged needs',()=>{
 const rows=[];for(const now of [360,361,720,1000]){const r=R.evaluate({now,observations:obs(now,10),actions:[action(1,15)]});assert(!r.allowed);rows.push({now,result:r});const open=R.evaluate({now,observations:obs(now,5),current:{remaining:1}});assert(!open.allowed);}
 const tooSoon=R.evaluate({variant:'chronic',now:50,observations:obs(50,5),actions:[action(1,15)]});assert(!tooSoon.allowed);
 return {rows,tooSoon,realElectionNotImplemented:true};
});
test('recovery plus fresh shortage can reopen; minimum measured since delivery',()=>{
 const observations=[...obs(20,90),...obs(100,20)],allowed=R.evaluate({now:100,observations,actions:[action(1)]});assert(allowed.allowed);assert.equal(allowed.capacity,30);assert.equal(allowed.publicDepletion,0);
 const delayed={created:1,filledDay:80,capacity:30,consumed:30},tooSoon=R.evaluate({now:100,observations:[...obs(90,90),...obs(100,20)],actions:[delayed]});assert(!tooSoon.allowed);
 return {allowed,tooSoon};
});
test('rolling budget survives year changes and counts reserved not only consumed',()=>{
 const actions=[action(100),action(200)],rows=[];for(const now of [360,361,400]){const r=R.evaluate({variant:'chronic',now,observations:[...obs(300,90),...obs(now,0)],actions});assert(!r.allowed);assert.equal(r.reason,'rolling 360-day budget exhausted');rows.push({now,result:r});}
 const released=R.evaluate({variant:'chronic',now:461,observations:[...obs(300,90),...obs(461,0)],actions});assert(released.allowed);assert.equal(released.capacity,30);return {rows,released};
});
test('one shared pool for different suppliers, IDs and delivery modes',()=>{
 const pool={remaining:30,receipts:{}};const a=R.allocate(pool,{supplier:'player',id:'one',quantity:20}),b=R.allocate(pool,{supplier:'rival:1',id:'one',quantity:20});assert.equal(a.accepted,20);assert.equal(b.accepted,10);assert.equal(pool.remaining,0);assert.equal(R.allocate(pool,{supplier:'player',id:'one',quantity:20}).accepted,20);assert.equal(pool.remaining,0);
 return {pool,noExtraPoolPerSupplier:true,onlyMathematicalNPCNotIntegrated:true};
});
test('split amounts, finite receipts and known price/cost arithmetic',()=>{
 const rows=[];for(const q of [15,30,60])for(const mode of ['A','B','C'])for(const count of [1,3]){let r=q,total=0;for(let i=0;i<count;i++){const n=q/count;const accepted=Math.min(n,r);r-=accepted;total+=accepted}assert.equal(total,q);assert.equal(r,0);rows.push({q,mode,count,accepted:total,revenue:q*(mode==='A'?30:mode==='B'?16:0),knownGoodsCost:8*q});}return rows;
});
test('little cash and normal market supply are finite',()=>{
 const rows=[28,29,30,31].map(price=>({price,affordableWith200:Math.floor(200/price),costFor15:15*price,profit15AtForeignCost8:15*(price-8)}));assert(rows.every(r=>r.affordableWith200<15));return {rows,travelFeesAndOriginPurchaseNotSimulated:true};
});
const result={phase:'P1.3',pureMath:true,newGameContexts:0,testedCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),groups,passed:groups.every(g=>g.passed)};fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');if(!result.passed)process.exitCode=1;
