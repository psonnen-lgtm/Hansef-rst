'use strict';
// Read-only event/data audit, pure quote arithmetic. No VM, game calls or trajectory replay.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {getModel}=require('./quantity-model.cjs'),root=path.resolve(__dirname,'../../..'),out=path.join(__dirname,'results');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=b=>crypto.createHash('sha256').update(b).digest('hex'),sum=(a,k)=>a.reduce((n,r)=>n+(r[k]??0),0),median=a=>a.slice().sort((a,b)=>a-b)[Math.floor(a.length/2)],close=(a,b)=>assert(Math.abs(a-b)<1e-7,`${a} != ${b}`);
const frozen=read(path.join(__dirname,'frozen-plan.json'));
for(const x of frozen.historicalManifestVerified)assert.equal(hash(fs.readFileSync(path.join(root,x.path))),x.sha256,x.path);
for(const x of frozen.newSourceFilesBeforeTests)assert.equal(hash(fs.readFileSync(path.join(root,x.path))),x.sha256,x.path);
const hd=path.join(root,'tests/analysis/phase08d2a/results/comparison-01'),nd=path.join(out,'comparison-01'),old=read(path.join(hd,'summary.json')),current=read(path.join(nd,'summary.json'));
const metrics=[],rawChecks=[];
for(const [data,dir,historical] of [[old,hd,true],[current,nd,false]])for(const r of data.arms){
 const raw=read(path.join(dir,r.id+'.json')),model=historical?(r.model==='B'?'H110':'A'):r.model;
 const initial=read(path.join(hd,`start-${r.route}-${r.seed}.json`));assert.equal(hash(JSON.stringify(initial)),r.initialHash);assert.equal(hash(JSON.stringify(initial.game)),r.initialGameHash);
 assert.deepEqual(raw.metrics,r);assert(r.days<=120&&r.trips<=12&&r.decisions<=30);assert.equal(raw.legs.length,r.trips);
 const buys=raw.events.filter(e=>e.type==='buy'),sales=raw.events.filter(e=>e.type==='sell'),travel=raw.events.filter(e=>e.type==='travel'),pirates=raw.events.filter(e=>e.type==='pirate_loss');
 close(sum(sales,'profit'),r.realizedProfit);close(sum(travel,'fee'),r.fees);close(pirates.reduce((n,e)=>n+e.quantity*e.averageCost,0),r.pirateBookLoss);
 close(5000-sum(buys,'total')+sum(sales,'total')-r.fees,r.cash);close(5000+r.net-r.openInventoryCost,r.cash);
 assert.equal(sum(buys,'quantity')-sum(sales,'quantity')-sum(pirates,'quantity'),r.openInventory);
 close(r.netWorth,r.cash+r.openInventoryCost+6200*(.45+.35*r.condition/100));close(r.politicalWorth,r.netWorth);
 assert.equal(r.debt,0);assert.equal(r.bank,0);assert(r.cash>=0);
 const legs=raw.legs.map(l=>{const desired=Math.min(r.policy==='small22'?22:90,l.decisionInput.stock,l.decisionInput.free),actual=l.buy?.quantity??0;assert(actual<=desired);if(l.buy)assert(l.buy.total<=l.decisionInput.cash-6);
  if(!historical){const Q=getModel(model),m=l.decisionInput;
   if(l.buy){const preview=Q.preview(Q.anchor(m.initialPrice,m.stock),m.stock,actual,1,m.cash);assert.equal(preview.total,l.buy.total);assert.equal(preview.restGold,m.cash-l.buy.total);}
   if(l.sale){const m=l.arrivedMarket,preview=Q.preview(Q.anchor(m.price,m.stock),m.stock,l.sale.quantity,-1,l.cash-l.sale.total);assert.equal(preview.total,l.sale.total);assert.equal(preview.restGold,l.cash)}
  }
  return {desired,actual,constrained:actual<desired,zeroForGold:actual===0&&desired>0};
 });
 const row={...r,model,source:historical?'historical-read-only':'new',goldConstrainedPurchases:legs.filter(l=>l.constrained).length,zeroPurchasesForGold:legs.filter(l=>l.zeroForGold).length,failedExecutedPurchases:0,endCanPayFee:r.cash>=6,meanUnusedHold:legs.reduce((n,l)=>n+90-l.actual,0)/legs.length};
 if(!historical){assert.equal(r.goldConstrainedPurchases,row.goldConstrainedPurchases);assert.equal(r.zeroPurchasesForGold,row.zeroPurchasesForGold)}
 metrics.push(row);rawChecks.push({id:r.id,source:row.source,model,cashLedger:true,goodsLedger:true,profitLedger:true,bookAndPoliticalWorth:true,pureQuotesIndependentlyChecked:!historical,endCanPayFee:row.endCanPayFee});
}
assert.equal(metrics.filter(r=>r.source==='new').length,54);assert.equal(metrics.filter(r=>r.source!=='new').length,36);
const paired=[];
for(const b of metrics.filter(r=>r.source==='new')){
 const a=metrics.find(r=>r.model==='A'&&r.seed===b.seed&&r.route===b.route&&r.policy===b.policy),h=metrics.find(r=>r.model==='H110'&&r.seed===b.seed&&r.route===b.route&&r.policy===b.policy);
 for(const x of [a,h]){assert.equal(x.initialHash,b.initialHash);assert.deepEqual(x.rng,b.rng);assert.equal(x.days,b.days);assert.equal(x.trips,b.trips)}
 paired.push({seed:b.seed,route:b.route,policy:b.policy,model:b.model,baselineNet:a.net,net:b.net,deltaNetVsA:b.net-a.net,deltaProfitVsA:b.realizedProfit-a.realizedProfit,deltaNetVsH110:b.net-h.net,baselineAlreadyLosing:a.net<0,newlyUnprofitable:a.net>0&&b.net<=0,positivePreserved:a.net>0&&b.net>0});
}
const groups=[];
for(const model of ['A','H110','B1','B2','B3'])for(const route of current.plan.routes)for(const policy of current.plan.policies){
 const a=metrics.filter(r=>r.model===model&&r.route===route.id&&r.policy===policy),p=paired.filter(r=>r.model===model&&r.route===route.id&&r.policy===policy);
 groups.push({model,route:route.id,policy,days:a.map(r=>r.days),trips:a.map(r=>r.trips),count:a.length,profitMedian:median(a.map(r=>r.realizedProfit)),netMedian:median(a.map(r=>r.net)),profitRange:[Math.min(...a.map(r=>r.realizedProfit)),Math.max(...a.map(r=>r.realizedProfit))],deltaNetMedianVsA:p.length?median(p.map(r=>r.deltaNetVsA)):null,netPerDay:sum(a,'net')/sum(a,'days'),profitPerBarrel:sum(a,'realizedProfit')/sum(a,'sold'),cashMedian:median(a.map(r=>r.cash)),cashMinimum:Math.min(...a.map(r=>r.cash)),negativeSales:sum(a,'negativeSales'),sold:sum(a,'sold'),positive:a.filter(r=>r.net>0).length});
}
const totals=[];
for(const model of ['A','H110','B1','B2','B3']){
 const a=metrics.filter(r=>r.model===model),p=paired.filter(r=>r.model===model);
 totals.push({model,count:a.length,profit:sum(a,'realizedProfit'),net:sum(a,'net'),fees:sum(a,'fees'),pirateBookLoss:sum(a,'pirateBookLoss'),sold:sum(a,'sold'),days:sum(a,'days'),trips:sum(a,'trips'),positive:a.filter(r=>r.net>0).length,smallPositive:a.filter(r=>r.policy==='small22'&&r.net>0).length,negativeSales:sum(a,'negativeSales'),emptyTrips:sum(a,'emptyTrips'),goldConstrainedPurchases:sum(a,'goldConstrainedPurchases'),zeroPurchasesForGold:sum(a,'zeroPurchasesForGold'),failedExecutedPurchases:0,departureBlocks:a.filter(r=>r.travelBlock).length,endCantPayFee:a.filter(r=>!r.endCanPayFee).length,minCash:Math.min(...a.map(r=>r.cash)),medianCash:median(a.map(r=>r.cash)),maxCash:Math.max(...a.map(r=>r.cash)),worthRange:[Math.min(...a.map(r=>r.netWorth)),Math.max(...a.map(r=>r.netWorth))],meanUnusedHold:a.reduce((n,r)=>n+r.meanUnusedHold*r.trips,0)/sum(a,'trips'),openGoods:sum(a,'openInventory'),newlyUnprofitable:p.filter(r=>r.newlyUnprofitable).length,baselineBad:p.filter(r=>r.baselineAlreadyLosing).length});
}
const previewExamples=Object.fromEntries(['B1','B2','B3'].map(v=>{const Q=getModel(v);return [v,{synthetic:true,good:'Tuch',cityLabel:'Lübeck (synthetic market)',anchor:{price:45,stock:180},quote:Q.preview(Q.anchor(45,180),180,20,1,5000)}]}));
const cols=['source','id','seed','route','policy','model','trips','days','decisions','bought','sold','realizedProfit','profitPerSoldBarrel','profitPerDay','fees','pirateBookLoss','net','netPerDay','cash','minimumCash','netWorth','politicalWorth','openInventoryCost','goldConstrainedPurchases','zeroPurchasesForGold','failedExecutedPurchases','travelBlock','endCanPayFee','emptyTrips','meanUnusedHold','freeHold','negativeSales','creditAvailable','debt','stop'];
fs.writeFileSync(path.join(out,'all-models.csv'),[cols.join(','),...metrics.map(r=>cols.map(k=>JSON.stringify(r[k]??null)).join(','))].join('\n')+'\n');
fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({historicalManifestEntries:frozen.historicalManifestVerified.length,historicalArmsRead:36,newArmsRead:54,gameFunctionsExecuted:0,historyTrajectoriesReplayed:0,rawChecks,paired,groups,totals,previewExamples},null,2)+'\n');
console.log('Verified 54 new and 36 historical event/wealth/quantity ledgers; 108 same-start/RNG/horizon comparisons; historical manifests and frozen sources match. No game execution.');
