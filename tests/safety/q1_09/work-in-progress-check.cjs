'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process'),{environment:E,originalState:S,hash}=require('./harness.cjs');
(async()=>{
 const old=S('s.gold=10000;ship().cargo={};ship().costs={};ship().origins={};ship().bookCosts={};for(let k=0;k<4;k++){const j=SHIPBUILD_GOODS[k],n=SHIPBUILD_RECIPES[0].materials[k];ship().cargo[j]=n;ship().costs[j]=8;ship().bookCosts[j]=8;ship().origins[j]=[{city:1,n}]}s.markets[0][2]={price:30,stock:110}');const cases=[];
 for(const dirty of [false,true]){const g=E({stored:{'hansefuerst-v04':JSON.stringify(old)}});await g.ready();const initialCash=g.state().gold;
  if(dirty){g.nodes.qty2={value:'24'};await g.eval('trade(2,1)');await g.eval('trade(2,-1)');}
  assert.equal(g.state().gold,initialCash);const beforeBuild=g.eval('netWorth()');assert(await g.eval('startShipbuilding(0)'));g.eval('validate(s)');const x=g.state();cases.push({dirty,initialCash,gold:x.gold,materialsBook:x.shipyard.orders[0].materialsBook,shipyardWorth:g.eval('shipyardWorth()'),netWorth:g.eval('netWorth()'),creditLimit:g.eval('creditLimit()'),beforeBuild,remainingGoods:g.eval('cargoWorth()+warehouseWorth()')});
 }
 const [a,b]=cases;assert.equal(a.gold,b.gold);assert.equal(a.remainingGoods,0);assert.equal(b.remainingGoods,0);assert.equal(b.shipyardWorth-a.shipyardWorth,188);assert(b.creditLimit>a.creditLimit);
 const out={sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),gameHash:hash,kind:'two_controlled_native_construction_actions_no_build_completion_or_large_simulation',cases,neutralMoneyInvariant:true,activeCollateralInvariant:false,wipWorthInflation:188,inventoryOnlyW1W2WouldStillInheritWIP:true,status:'OPEN_WIP_REFERENCE_OR_COLLATERAL_RULE_ALSO_NEEDS_DECISION'};fs.writeFileSync(process.argv[2],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out));
})().catch(e=>{fs.writeFileSync(process.argv[2],JSON.stringify({error:e.stack,status:'TEST_FAILED'},null,2)+'\n');console.error(e);process.exitCode=1;});
