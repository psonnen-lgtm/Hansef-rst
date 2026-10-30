'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),cp=require('node:child_process');
const {environment:E,originalState:S,clean,hash}=require('../q1_09/harness.cjs');
const {valuation}=require('./valuation-proposal.cjs'),{remoteQuote}=require('./travel-proposal.cjs'),{graceProposal}=require('./grace-proposal.cjs');
const g=E(),types=clean(g.eval('SHIPTYPES')),regions=clean(g.eval('POLITICAL_CITIES.map(c=>c.region)'));
const route=(from,to,speed)=>g.eval(`routeTravelDays(${from},${to},${speed})`),checks=[];
const out=process.argv[2];assert(out&&!fs.existsSync(out),'new result path required');
function check(name,fn){try{const evidence=fn();checks.push({name,passed:true,evidence});console.log('PASS '+name)}catch(e){checks.push({name,passed:false,error:e.stack});throw e}}
const base=S('s.gold=10000;ship().cargo={0:30};ship().costs={0:8};ship().bookCosts={0:8};ship().origins={0:[{city:1,n:30}]};s.markets[0][0]={price:30,stock:110}');
const val=(s=base,v='W1-S')=>valuation(s,types,v);
const anchor=x=>({city:x.city,shipId:x.ships[x.active].id,day:x.year*360+x.day});
const accord=()=>S('acceptPoliticalJob("accord");s.politics.jobs[0].until=totalDay()+1');
try{
check('all 121 city/good references use actual harbor quote and preserve input',()=>{
 const x=clean(base);x.ships[0].cargo={};x.warehouses=Object.fromEntries(x.markets.map((_,c)=>[c,{cargo:{},costs:{},bookCosts:{},origins:{}}]));let expected=0;
 for(let c=0;c<11;c++)for(let j=0;j<11;j++){x.markets[c][j].price=4+c*11+j;x.warehouses[c].cargo[j]=1;expected+=x.markets[c][j].price}
 const before=JSON.stringify(x),r=val(x);assert.equal(r.inventoryReference,expected);assert.equal(r.lines.length,121);assert.equal(JSON.stringify(x),before);return {references:121,sharedByShipAndWarehouse:true,source:'current actual harbor price; not base price, book cost or quote at viewed city'};
});
check('neutral mixed costs cannot change W1-S or W2-S but active failure remains open',()=>{
 const x=clean(base),y=clean(base);y.ships[0].costs[0]=27.25;y.ships[0].bookCosts[0]=27.25;
 for(const v of ['W1-S','W2-S'])assert.deepEqual(val(x,v),val(y,v));
 const old=require('../q1_09/results/acceptance/valuation.json');assert.equal(old.activeNeutralCollateralInvariant,false);assert.equal(old.mechanicalTradeRegressionsPassed,8);return {candidateInvariant:true,nativeQ001StillOpen:true,historicalEightCasesReusedNotRerun:true};
});
check('multiple ships and warehouses in different harbors receive one common local reference',()=>{
 const x=clean(base);x.ships.push({...clean(x.ships[0]),id:2,city:1});x.markets[1][0].price=50;x.warehouses[0].cargo={0:10};x.warehouses[1].cargo={0:20};
 const r=val(x);assert.equal(r.inventoryReference,30*30+30*50+10*30+20*50);x.city=8;assert.equal(val(x).security,r.security);return {inventoryReference:r.inventoryReference,viewIndependent:true,perActualHarbor:true};
});
check('unknown costs and provenance remain unknown without fallback invention',()=>{
 const x=clean(base);x.ships[0].costs[0]=null;x.ships[0].origins[0][0].city=null;delete x.ships[0].bookCosts[0];const before=JSON.stringify(x);assert.equal(val(x).inventoryReference,900);assert.equal(JSON.stringify(x),before);return {unknownRecordsUnchanged:true};
});
check('stored WIP counterexample loses all artificial material security in both candidates',()=>{
 const old=require('../q1_09/results/acceptance/work-in-progress.json'),rows=[];
 for(const c of old.cases){const x=clean(base);x.gold=c.gold;x.ships[0].cargo={};x.shipyard.orders=[{type:0,wage:2500,materialsBook:c.materialsBook}];const a=val(x),b=val(x,'W2-S');assert.equal(a.security,14960);assert.equal(a.creditLimit,6732);assert.equal(b.creditLimit,6732);rows.push({dirty:c.dirty,oldCredit:c.creditLimit,W1S:a.creditLimit,W2S:b.creditLimit,materialCollateral:a.materialBookSecurity,paidWageCollateral:a.paidWageSecurity})}
 assert.equal(old.wipWorthInflation,188);return {nativeBuildPairReusedNotRerun:true,rows,paidWageRuleStillRequiresApproval:true};
});
check('construction does not create candidate security while completion remains separately visible',()=>{
 const before=clean(base);before.ships[0].cargo={};for(const [j,n] of [[2,24],[7,8],[8,6],[9,6]])before.ships[0].cargo[j]=n;
 const during=clean(before);during.gold-=2500;during.ships[0].cargo={};during.shipyard.orders=[{type:0,wage:2500,materialsBook:616}];
 const complete=clean(during);complete.shipyard.orders=[];complete.ships.push({...clean(before.ships[0]),id:2,type:0,cargo:{}});
 assert(val(during).security<=val(before).security);assert.equal(val(during,'W2-S').security,val(before,'W2-S').security);assert.equal(val(complete).security-val(during).security,types[0].cost*.8-2500);
 return {before:val(before).security,during:val(during).security,afterCompletion:val(complete).security,completionChangeIsRealHullNotDailyProgress:true,noFabricatedOldMaterialQuantities:true};
});
check('paid wage cap and no invented proportional progress, W2 excludes only inventory',()=>{
 const x=clean(base);x.shipyard.orders=[{type:0,wage:2500,materialsBook:1e8,started:1,ready:20}];const a=val(x);x.shipyard.orders[0].started=-100;assert.equal(val(x).paidWageSecurity,a.paidWageSecurity);x.shipyard.orders[0].wage=1e8;assert.equal(val(x).paidWageSecurity,types[0].cost*.8);assert.equal(val(x).security-val(x,'W2-S').security,900);return {wageCapped:true,noTimeProgressValue:true,notNativeValidationAcceptance:true};
});
check('borrowing repayment deposits and existing floor preserve candidate credit identities',()=>{
 const x=clean(base),r=val(x);x.gold+=1000;x.debt+=1000;assert.equal(val(x).creditLimit,r.creditLimit);x.gold-=1000;x.debt-=1000;assert.equal(val(x).creditLimit,r.creditLimit);x.gold-=500;x.bank+=500;assert.equal(val(x).creditLimit,r.creditLimit);x.gold=0;x.bank=0;x.debt=100000;assert.equal(val(x).creditLimit,1000);return {same45PercentAnd1000FloorOnlyIllustrative:true,noRetroactiveDebtRewrite:true};
});
check('legitimate profit loss and partial-sale accounting remain historical native results',()=>{
 const rows=require('../q1_09/results/acceptance/valuation.json').rows;assert.equal(rows.find(x=>x.id.startsWith('A03')).realizedProfit,165);assert.equal(rows.find(x=>x.id.startsWith('A06')).realizedProfit,660);assert.equal(rows.find(x=>x.id.startsWith('A07')).realizedProfit,-300);
 const x=clean(base),a=val(x);x.ships[0].cargo={};x.gold+=900;assert.equal(val(x).security,a.security);assert.equal(val(x,'W2-S').security-val(base,'W2-S').security,900);return {profit660: true,lossMinus300:true,partial165:true,valuationsAreNotRealizedProfitMeasures:true,W1UsesAlreadyCurrentMarketValue:true};
});
check('reference price changes are explicitly economic changes, invalid inputs fail',()=>{
 const x=clean(base),a=val(x);x.markets[0][0].price=31;assert.equal(val(x).security-a.security,30);assert.equal(val(x,'W2-S').security,val(base,'W2-S').security);x.markets[0][0].price=NaN;assert.throws(()=>val(x),/Non-finite/);x.markets[0][0].price=30;x.ships[0].city=11;assert.throws(()=>val(x),/harbor/);return {notBalanceNeutral:true,perDayMarketRisk:true,noInvalidSilentlyZeroReference:true};
});
check('unaccompanied single convoy quotes keep native route time fees and person untouched',()=>{
 const x=clean(base);x.city=1;x.ships[0].city=1;x.ships.push({...clean(x.ships[0]),id:2,type:0,speed:1.4}, {...clean(x.ships[0]),id:3,city:0});x.politics.safety={revision:4,person:{city:0,source:'arrival',at:x.year*360+x.day}};const raw=JSON.stringify(x),rows=[];
 for(const convoy of [false,true]){const q=remoteQuote(x,8,convoy,route);assert.equal(q.fee,convoy?10:6);assert.deepEqual(q.ids,convoy?[x.ships[0].id,2]:[x.ships[0].id]);assert.equal(q.days,route(1,8,1));assert.equal(q.personUnchanged.city,0);assert.equal(q.expectedRevision,4);rows.push(q)}assert.equal(JSON.stringify(x),raw);return {rows,onlyQuoteTestedNotTripResolver:true};
});
check('remote quote cannot invent unknown person free trip or other-harbor convoy',()=>{
 const x=clean(base);x.politics.safety={revision:1,person:{city:null}};assert.throws(()=>remoteQuote(x,1,true,route),/known person/);x.politics.safety.person.city=1;x.gold=0;assert.throws(()=>remoteQuote(x,2,false,route),/payable/);x.gold=100;x.ships[0].city=1;assert.throws(()=>remoteQuote(x,2,false,route),/local hull/);return {unknownPersonRejected:true,unpaidFeeRejected:true,remoteHullNotAdded:true};
});
check('short original accord receives only demonstrated route deficit in dry-run dossier',()=>{
 const x=accord(),raw=JSON.stringify(x,null,2),r=graceProposal(raw,anchor(x),route,regions),q=r.rows[0];assert(q.eligible);assert(q.extension>0);assert.equal(q.proposedUntil,r.importDay+q.route.days);assert.equal(q.originalUntil,x.politics.jobs[0].until);assert.equal(raw,JSON.stringify(x,null,2));return {dossier:q,originalAndRewardsUntouched:true};
});
check('anchor at missing station requires actual detour and return evidence',()=>{
 const x=accord(),q=x.politics.jobs[0];x.city=q.partner;x.ships[0].city=q.partner;const r=graceProposal(JSON.stringify(x),anchor(x),route,regions).rows[0];assert(r.route.legs.length>=3);assert.equal(r.route.legs[1].to,q.partner);assert.equal(r.route.legs.at(-1).to,q.city);return {legs:r.route.legs,noAnchorAsWitness:true};
});
check('sufficient expired witnessed and nonpersonal contracts do not receive blanket grace',()=>{
 const x=accord();x.politics.jobs[0].until+=1000;assert.equal(graceProposal(JSON.stringify(x),anchor(x),route,regions).rows[0].eligible,false);
 x.politics.jobs[0].until=x.year*360+x.day-1;assert.equal(graceProposal(JSON.stringify(x),anchor(x),route,regions).rows[0].eligible,false);
 x.politics.jobs[0].until=x.year*360+x.day+1;x.politics.jobs[0].witnessed=true;assert.equal(graceProposal(JSON.stringify(x),anchor(x),route,regions).rows[0].eligible,false);
 const supply=S('acceptPoliticalJob("supply")');assert.equal(graceProposal(JSON.stringify(supply),anchor(supply),route,regions).rows.length,0);return {fourExclusions:true,noCompletedContractReplay:true};
});
check('old Hanse visited stations and region condition survive conservative remaining itinerary',()=>{
 const F=require('../../simulation/political-progress-fixtures.cjs');const x=S('s=migrate('+JSON.stringify(F.state('ready'))+');const oldLeague=s.politics.records.find(q=>q.kind==="league");s.politics.records=s.politics.records.filter(q=>q.id!==oldLeague.id);s.politics.league={id:oldLeague.id,home:oldLeague.city,period:oldLeague.period,started:totalDay(),until:totalDay()+1,visited:[oldLeague.witnesses[0]]};s.city=oldLeague.city;ship().city=s.city');const raw=JSON.stringify(x),r=graceProposal(raw,anchor(x),route,regions).rows[0];assert(r.eligible);assert.equal(r.route.legs.at(-1).to,x.politics.league.home);assert.equal(JSON.stringify(x),raw);return {existingVisited:x.politics.league.visited,route:r.route,extension:r.extension,noAutomaticVisitOrReceipt:true};
});
check('grace binds exact original hash contract and first zero-day explicit local anchor',()=>{
 const x=accord(),raw=JSON.stringify(x),a=anchor(x),r=graceProposal(raw,a,route,regions);assert.deepEqual(graceProposal(raw,a,route,regions),r);assert.throws(()=>graceProposal(raw,{...a,day:a.day+1},route,regions),/zero-day/);assert.throws(()=>graceProposal(raw,{...a,shipId:-1},route,regions),/real local hull/);x.politics.version=2;assert.throws(()=>graceProposal(JSON.stringify(x),a,route,regions),/original/);return {stableHash:r.originalHash,oneTimeLedgerDesignNotActivated:true,arbitraryReanchorExcluded:true};
});
}catch(e){console.error(e.stack);process.exitCode=1}finally{
 fs.writeFileSync(out,JSON.stringify({sourceCommit:cp.execSync('git rev-parse HEAD').toString().trim(),testedGameCommit:'15c2e3792d855afcddf26ba0572d6317504d8b46',gameHash:hash,kind:'isolated read-only proposal arithmetic and native route quotation, not activated game rules',checks,passed:checks.every(x=>x.passed),Q001Fixed:false,valuationActivated:false,unaccompaniedTravelActivated:false,graceActivated:false,largeSimulations:0},null,2)+'\n',{flag:'wx'});
}
