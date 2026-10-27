'use strict';
// Saved JSON only, no VM imports, no trajectory replay.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..'),dir=path.join(__dirname,'results/comparison-01'),old=JSON.parse(fs.readFileSync(path.join(root,'tests/analysis/phase08d2a1/results/comparison-01/summary.json'))),data=JSON.parse(fs.readFileSync(path.join(dir,'summary.json'))),hash=x=>crypto.createHash('sha256').update(x).digest('hex'),rows=[];
const sum=(a,k)=>a.reduce((n,r)=>n+(r[k]??0),0),close=(a,b)=>assert(Math.abs(a-b)<1e-7,`${a} != ${b}`);
let maxDigits=0;
for(const r of data.arms){
 const raw=JSON.parse(fs.readFileSync(path.join(dir,r.id+'.json'))),b=old.arms.find(b=>b.model==='B3'&&b.seed===r.seed&&b.route===r.route&&b.policy===r.policy),start=JSON.parse(fs.readFileSync(path.join(root,`tests/analysis/phase08d2a/results/comparison-01/start-${r.route}-${r.seed}.json`)));
 assert.equal(hash(JSON.stringify(start)),r.initialHash);assert.equal(r.initialHash,b.initialHash);assert.deepEqual(r.rng,b.rng);assert.equal(r.days,b.days);assert.equal(r.trips,b.trips);assert(r.days<=120&&r.trips<=12&&r.decisions<=30);
 const buy=raw.events.filter(x=>x.type==='buy'),sell=raw.events.filter(x=>x.type==='sell'),travel=raw.events.filter(x=>x.type==='travel'),pirates=raw.events.filter(x=>x.type==='pirate_loss');
 close(sum(sell,'profit'),r.realizedProfit);close(sum(travel,'fee'),r.fees);close(5000-sum(buy,'total')+sum(sell,'total')-r.fees,r.cash);close(5000+r.net-r.openInventoryCost,r.cash);assert.equal(sum(buy,'quantity')-sum(sell,'quantity')-sum(pirates,'quantity'),r.openInventory);
 for(const a of raw.end.anchors.flat()){assert(/^[0-9]+$/.test(a.n)&&/^[0-9]+$/.test(a.d));maxDigits=Math.max(maxDigits,a.n.length,a.d.length)}
 rows.push({route:r.route,seed:r.seed,policy:r.policy,trips:r.trips,days:r.days,oldNet:b.net,newNet:r.net,deltaNet:r.net-b.net,oldProfit:b.realizedProfit,newProfit:r.realizedProfit,oldCash:b.cash,newCash:r.cash,fees:r.fees,oldWorth:b.netWorth,newWorth:r.netWorth,oldSold:b.sold,newSold:r.sold,positiveBefore:b.net>0,positiveAfter:r.net>0,ledgersVerified:true,sameRng:true});
}
assert.equal(rows.length,9);const evidence={newArms:9,historicalArmsRead:9,totalComparedCases:18,gameCalls:0,rows,maxSerializedFractionDigitsObserved:maxDigits,maximumAllowed:4096,positiveBefore:rows.filter(r=>r.positiveBefore).length,positiveAfter:rows.filter(r=>r.positiveAfter).length,netDeltaRange:[Math.min(...rows.map(r=>r.deltaNet)),Math.max(...rows.map(r=>r.deltaNet))],note:'intermediate rational bases were not copied into every trade record; cash/event ledgers independently checked, quote formula covered by dedicated tests'};
fs.writeFileSync(path.join(__dirname,'results/audit.json'),JSON.stringify(evidence,null,2)+'\n');const keys=Object.keys(rows[0]);fs.writeFileSync(path.join(__dirname,'results/comparison.csv'),[keys.join(','),...rows.map(r=>keys.map(k=>JSON.stringify(r[k])).join(','))].join('\n')+'\n');console.log(JSON.stringify({newArms:9,oldRead:9,verified:9,maxDigits,delta:evidence.netDeltaRange,positiveAfter:evidence.positiveAfter}));
