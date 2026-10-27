'use strict';
// Read saved evidence only. No import of the harness and no game function call.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const directory=path.join(__dirname,'results/comparison-01'),s=JSON.parse(fs.readFileSync(path.join(directory,'summary.json')));
const hash=x=>crypto.createHash('sha256').update(x).digest('hex'),checks=[];
assert.equal(s.arms.length,36);const pairs=new Map();
for(const r of s.arms){
 const raw=JSON.parse(fs.readFileSync(path.join(directory,r.id+'.json'))),initial=JSON.parse(fs.readFileSync(path.join(directory,`start-${r.route}-${r.seed}.json`)));
 assert.equal(hash(JSON.stringify(initial)),r.initialHash);assert.equal(hash(JSON.stringify(initial.game)),r.initialGameHash);
 assert.deepEqual(raw.metrics,r);assert(raw.legs.length<=12&&r.days<=120&&r.decisions<=30);
 const events=raw.events,buy=events.filter(e=>e.type==='buy'),sell=events.filter(e=>e.type==='sell'),travel=events.filter(e=>e.type==='travel'),pirates=events.filter(e=>e.type==='pirate_loss');
 const sum=(a,f)=>a.reduce((n,x)=>n+f(x),0),close=(a,b)=>assert(Math.abs(a-b)<1e-7,`${r.id}: ${a} != ${b}`);
 close(sum(sell,x=>x.profit),r.realizedProfit);close(sum(travel,x=>x.fee),r.fees);close(sum(pirates,x=>x.quantity*x.averageCost),r.pirateBookLoss);
 close(initial.game.gold-sum(buy,x=>x.total)+sum(sell,x=>x.total)-r.fees,r.cash);
 close(5000+r.realizedProfit-r.fees-r.pirateBookLoss-r.openInventoryCost,r.cash);
 assert.equal(sum(buy,x=>x.quantity)-sum(sell,x=>x.quantity)-sum(pirates,x=>x.quantity),r.openInventory);
 for(const leg of raw.legs){assert(leg.travel.days>0);assert(leg.elapsed<=120);if(leg.buy){assert(leg.buy.quantity<=leg.decisionInput.stock);assert(leg.buy.quantity<=leg.decisionInput.free);assert(leg.buy.total<=leg.decisionInput.cash-6);assert.equal(leg.quote.total,leg.buy.total)}}
 for(const type of ['quest_reward','bank','warehouse_rent','information_purchase','trade_letter_purchase'])assert(!events.some(e=>e.type===type));
 const pairKey=`${r.route}-${r.seed}-${r.policy}`;if(!pairs.has(pairKey))pairs.set(pairKey,[]);pairs.get(pairKey).push(r);
 checks.push({id:r.id,gameHash:raw.end.gameHash,startHash:r.initialHash,actualEvents:events.length,cashLedger:true,realizationLedger:true,goodsLedger:true,bounded:true,endCashPaysKoggeFee:r.cash>=6,creditAvailable:r.creditAvailable,openGoods:r.openInventory});
}
for(const pair of pairs.values()){assert.equal(pair.length,2);assert.equal(pair[0].initialHash,pair[1].initialHash);assert.deepEqual(pair[0].rng,pair[1].rng)}
const cols=['id','seed','route','policy','model','trips','days','decisions','bought','sold','buyCost','revenue','realizedProfit','fees','pirateBookLoss','net','profitPerSoldBarrel','profitPerDay','netPerDay','cash','minimumCash','netWorth','politicalWorth','debt','creditAvailable','freeHold','openInventoryCost','negativeSales','emptyTrips','stop'];
const csv=[cols.join(','),...s.arms.map(r=>cols.map(k=>JSON.stringify(r[k]??null)).join(','))].join('\n')+'\n';
fs.writeFileSync(path.join(__dirname,'results/comparison.csv'),csv);
fs.writeFileSync(path.join(__dirname,'results/audit.json'),JSON.stringify({readOnlyAudit:true,gameFunctionsExecuted:0,arms:36,pairs:pairs.size,checks},null,2)+'\n');
console.log('36 raw event, cash, goods and realization ledgers; 18 identical start/RNG pairs verified without replay.');
