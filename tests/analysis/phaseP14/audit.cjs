'use strict';
// Read saved evidence only; no model module, VM, markets or voyages initialized.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../../..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),out=process.argv[2];if(!out||fs.existsSync(out))throw Error('new output required');
const s=read('tests/analysis/phaseP14/results/static-attempt1.json'),d=read('tests/analysis/phaseP14/results/dynamic-attempt1.json'),plan=read('tests/analysis/phaseP14/frozen-plan.json');
for(const [f,h]of Object.entries(plan.sha256))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex'),h,f);
assert(s.groups.every(g=>g.passed));assert.equal(s.rows.length,55);assert.equal(s.reach.length,2178);assert.equal(d.created,8);assert(d.passed);assert(d.paths.every(p=>p.completed));
const ledgers=d.paths.map(p=>{
 const start=p.start.game,end=p.final.game,arrived=p.arrived.game,events=p.final.events,sales=events.filter(e=>e.type==='sell').reduce((s,e)=>s+e.total,0),reward=events.filter(e=>e.type==='quest_reward').reduce((s,e)=>s+e.reward,0),lost=events.filter(e=>e.type==='pirate_loss').reduce((s,e)=>s+e.quantity,0),sold=events.filter(e=>e.type==='sell').reduce((s,e)=>s+e.quantity,0),own=x=>x.ships.reduce((s,q)=>s+(q.cargo[0]||0),0);
 assert.equal(end.gold,start.gold-p.evidence.fee+sales+reward);assert.equal(own(end),own(start)-lost-sold);assert.equal(end.markets[p.to][0].stock,arrived.markets[p.to][0].stock+sold);assert.equal(end.year*360+end.day-start.year*360-start.day,p.evidence.days);
 assert(Math.abs(end.debt-start.debt*Math.pow(1.06,p.evidence.days/360))<1e-7);assert.equal(events.filter(e=>e.type==='travel').length,1);assert(p.evidence.duplicateArrivalNoEffect);assert(p.evidence.nativeFunctionsUnchanged);
 return {name:p.name,days:p.evidence.days,initialGold:start.gold,fee:p.evidence.fee,sales,questReward:reward,finalGold:end.gold,initialOwned:own(start),lost,sold,finalOwned:own(end),interest:end.debt-start.debt,goodsProfitAfterFeeAndInterest:sales+reward-240-p.evidence.fee-(end.debt-start.debt),event:p.evidence.event};
});
const history=read('tests/simulation/phase08a-20261026-01/rumor-route-feasibility.json');let historicalRoutesCompared=0;
for(let t=0;t<3;t++){const entry=history.rows[t];for(const r of entry.routes){const pair=s.rows.find(p=>p.from===Math.min(r.from,r.to)&&p.to===Math.max(r.from,r.to));assert.equal(pair['A_'+t+'_100'],r.days);historicalRoutesCompared++;}}
const summary=[];for(const model of ['A','B','C'])for(const condition of [100,30])for(const type of ['Schnigge','Kogge','Holk']){
 const rows=s.reach.filter(r=>r.model===model&&r.condition===condition&&r.type===type&&r.from!==r.to),v={model,condition,type,pairs:rows.length,maxDirect:Math.max(...rows.map(r=>r.directLoadedDays))};
 for(const window of [60,90,120])for(const kind of ['loaded','news7prep10','procureBest','procureWorst','secondBest'])v[kind+window]=rows.filter(r=>r[kind+window]).length;summary.push(v);
}
const perOrigin=[];for(let from=0;from<11;from++){
 const row={from,city:s.reach.find(r=>r.from===from).start};for(const model of ['A','B','C']){const r=s.reach.filter(r=>r.from===from&&r.to!==from&&r.model===model&&r.type==='Kogge'&&r.condition===100);row[model+'_directWith17Days90']=r.filter(r=>r.news7prep1090).length;row[model+'_worstProcurement90']=r.filter(r=>r.procureWorst90).length;}
 row.C_damagedHolkWith17Days90=s.reach.filter(r=>r.from===from&&r.to!==from&&r.model==='C'&&r.type==='Holk'&&r.condition===30&&r.news7prep1090).length;perOrigin.push(row);
}
const shortcuts=Object.fromEntries(['A','B','C'].map(m=>[m,s.shortcuts.filter(r=>r.model===m).length]));
const result={phase:'P1.4',readOnly:true,newDynamicContexts:0,testedSourceCommit:s.testedCommit,auditCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),historicalRoutesCompared,historicalSourceCommit:history.testedGameCommit,allEightLedgersPass:true,ledgers,summary,perOrigin,shortcutPairsByModelAcrossTypes:shortcuts,sourceFetchStatus:read('tests/analysis/phaseP14/source-access.json'),productionReady:false};fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({readOnly:true,ledgers:ledgers.length,historicalRoutesCompared,shortcuts,newDynamicContexts:0}));
