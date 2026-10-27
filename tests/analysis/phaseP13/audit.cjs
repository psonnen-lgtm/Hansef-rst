'use strict';
// Read-only post-processing: never imports game VM or advances a market.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const dir=__dirname,root=path.resolve(dir,'../../..'),out=process.argv[2];if(!out||fs.existsSync(out))throw Error('new output required');
const read=p=>JSON.parse(fs.readFileSync(path.join(dir,p),'utf8')),x=read('results/dynamic-attempt1.json'),math=read('results/math-attempt1.json'),plan=read('frozen-plan.json');
for(const [p,h]of Object.entries(plan.sha256))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex'),h,p);
assert.equal(x.paths.length,12);assert(x.paths.every(p=>p.completed));assert(x.pairedRngAndOther120Markets);assert(math.passed);
const owned=s=>s.ships.concat(s.warehouses).reduce((a,q)=>a+(q.cargo[0]||0),0),sum=(ev,t,key)=>ev.filter(e=>e.type===t).reduce((s,e)=>s+e[key],0),rows=[];
for(const p of x.paths){
 const start=p.start.game,end=p.final.game,ev=p.final.events,receipts=Object.values(p.supply?.deliveries??{}).map(d=>d.receipt),consumed=p.supply?.consumed??0;
 const sales=sum(ev,'sell','total'),purchases=sum(ev,'buy','total'),sold=sum(ev,'sell','quantity'),bought=sum(ev,'buy','quantity'),gift=sum(ev,'public_grain_donation','quantity'),quest=sum(ev,'quest_reward','reward');
 assert.equal(end.gold,start.gold+sales-purchases+quest);assert.equal(owned(end),owned(start)+bought-sold-gift);
 const publicAB=receipts.filter(r=>r.mode!=='C').reduce((s,r)=>s+r.accepted,0);assert.equal(consumed,publicAB+gift);
 assert.equal(end.markets[0][0].stock,start.markets[0][0].stock+sold-bought-publicAB+p.naturalDelta);
 assert.equal(owned(start)+start.markets[0][0].stock+p.naturalDelta,owned(end)+end.markets[0][0].stock+consumed);
 assert.equal(receipts.reduce((s,r)=>s+r.accepted,0),consumed);assert(p.nativeFunctionsUnchanged);assert(p.elapsed<=90);assert(p.tradeDecisions<=12);
 for(const need of [...(p.supply?.history??[]),...(p.supply?.need?[p.supply.need]:[])])assert.equal(need.capacity-need.remaining,receipts.filter(r=>r.needId===need.id).reduce((s,r)=>s+r.accepted,0));
 const recoveredIndex=p.days.findIndex((d,i)=>i>0&&d.stock>=90&&p.days[i-1].stock>=90),last=p.days.at(-1),prices=p.days.map(d=>d.price),stocks=p.days.map(d=>d.stock);
 rows.push({name:p.name,days:p.elapsed,decisions:p.tradeDecisions,initialGold:start.gold,sales,purchases,quest,finalGold:end.gold,initialOwned:owned(start),sold,bought,gift,finalOwned:owned(end),consumed,initialStock:start.markets[0][0].stock,immediateStock:p.immediate.stock,immediatePrice:p.immediate.price,day7Stock:p.days[6]?.stock??null,day7Price:p.days[6]?.price??null,day30Stock:p.days[29]?.stock??null,day30Price:p.days[29]?.price??null,day60Stock:p.days[59]?.stock??null,day60Price:p.days[59]?.price??null,finalStock:last?.stock??end.markets[0][0].stock,finalPrice:last?.price??end.markets[0][0].price,naturalStockChange:p.naturalDelta,recoveryAfterDays:recoveredIndex<0?null:recoveredIndex+1,recoveryCensored:recoveredIndex<0,daysBelow90:stocks.filter(s=>s<90).length,daysAtMost40:stocks.filter(s=>s<=40).length,minStock:Math.min(...stocks),maxPrice:Math.max(...prices),minPrice:Math.min(...prices),endBelow90:last.stock<90,acknowledgements:receipts.filter(r=>r.accepted>0).length,publicReceipts:receipts.length,negativeControl:p.evidence.unsafeCalendarPolicy??false});
}
// Historical reference is read, never regenerated; compare only overlapping seven days.
const historical=JSON.parse(fs.readFileSync(path.join(root,'tests/analysis/phaseP12/results/checks-attempt1.json'),'utf8'));
const historic90=historical.paths.find(p=>p.name==='02-public-A'),historicNone=historical.paths.find(p=>p.name.startsWith('01-'));
assert.equal(historic90.supply.consumed,90);assert.equal(historic90.evidence.days.at(-1).market,29);assert.equal(historicNone.evidence.days.at(-1).market,111);
const historicalReference={source:'tests/analysis/phaseP12/results/checks-attempt1.json',testedCommit:historical.testedCommit,horizon:7,publicConsumed:90,immediateStock:20,day7Stock:29,day7Price:29,noPublicDay7Stock:111,noPublicDay7Price:28,recoveryWithinSevenDays:false,no90DayExtrapolation:true};
const normal=x.paths[0],single30=x.paths[2],stress=x.paths[9],natural=x.paths[8];
const counterfactual=stress.days.map((d,i)=>({day:i+1,stressStock:d.stock,naturalNoSaleStock:natural.days[i].stock,normal90SaleStock:normal.days[i].stock,single30Stock:single30.days[i].stock,stressPrice:d.price,single30Price:single30.days[i].price}));
// Evaluate proposals against SAVED observations, not a fresh dynamic run.
const R=require('./rules.cjs'),ruleEvaluations=[];
for(const p of [single30,stress,natural]){const actions=[];for(const r of Object.values(p.supply?.deliveries??{}).map(d=>d.receipt)){if(r.accepted)actions.push({created:r.date,filledDay:r.date,capacity:r.accepted,consumed:r.accepted})}
 const observations=p.days.map(d=>({day:d.day,stock:d.stock,debt:d.debt,regular:true}));for(const variant of ['recovery','chronic']){const lastDay=observations.at(-1).day;ruleEvaluations.push({path:p.name,variant,atFinalDay:R.evaluate({variant,now:lastDay,observations,actions})});}}
const result={phase:'P1.3',readOnly:true,newGameContexts:0,testedCommit:x.testedCommit,auditCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash:x.gameHash,allTwelveLedgersPass:true,pairedRngAndOther120Markets:true,mathGroups:math.groups.length,rows,historicalReference,counterfactual,ruleEvaluations,productionReady:false,limits:['one seed and controlled initial state','only Luebeck grain','calendar stress does not prove real recurring crises','proposed need detector tested mathematically, not integrated with every V13 write','no foreign purchase or route performed','no browser or productive migration','no votes or office effect','no claim of long-run balance from ninety days']};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
const csv=path.join(dir,'results/ledger.csv');if(fs.existsSync(csv))throw Error('CSV exists');fs.writeFileSync(csv,Object.keys(rows[0]).join(',')+'\n'+rows.map(r=>Object.values(r).map(v=>v??'').join(',')).join('\n')+'\n');
console.log(JSON.stringify({readOnly:true,newGameContexts:0,ledgers:rows.length,mathGroups:math.groups.length,historicalReference}));
