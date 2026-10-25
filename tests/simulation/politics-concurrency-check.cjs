// One controlled cross-feature fixture, not a complete economic career.
const fs=require('node:fs'),assert=require('node:assert/strict'),{fixture,cycle}=require('./politics-checks.cjs'),{hash}=require('./headless.cjs');
const g=fixture();for(let i=0;i<4;i++)cycle(g);assert(g.eval('runMayorElection()'));
// Actual material purchases before a long idle fixture phase; no invented goods.
for(const [j,n] of [[2,24],[7,8],[8,6],[9,6]])g.eval("$('qty"+j+"').value="+n+";trade("+j+",1)");
assert.equal(g.eval('load()'),44);const deeds=g.eval('s.politics.records.length');
g.eval('advance(341)');assert(g.eval('startShipbuilding(0)'));g.eval('advance(18);s.gold=0;s.debt=creditLimit();validate(s)');
assert(g.eval('harborWorkEligibility().allowed'));assert.equal(g.eval('s.politics.office.until-totalDay()'),1);assert.equal(g.eval('s.shipyard.orders[0].ready-totalDay()'),2);
let writes=0;g.context.localStorage.setItem=()=>writes++;assert(g.eval('performHarborWork()'));
assert.equal(writes,1);assert.equal(g.eval('s.gold'),20);assert.equal(g.eval('s.politics.office'),null);assert.equal(g.eval('s.shipyard.orders.length'),0);assert.equal(g.eval('s.ships.length'),2);assert.equal(g.eval('s.rank'),3);assert.equal(g.eval('s.politics.records.length'),deeds);assert(!g.eval('performHarborWork()'));g.eval('validate(s)');
const result={kind:'one_controlled_integration_fixture_not_full_career',gameSHA256:hash,passed:true,actualMaterialPurchases:true,fixtureForcedCashAndDebtForAid:true,days:3,finalActionWrites:1,mayorTermEnded:true,shipCompletedAtCorrectCity:g.eval('s.ships[1].city')===0,harborWageOnce:20,titleKept:true,noNewPoliticalReceiptFromMaterials:true};
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log('PASS concurrent mayor term end, ship completion and one-time harbor work in one staged commit');
