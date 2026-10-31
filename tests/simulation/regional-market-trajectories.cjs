// Controlled 6-year market trajectories, not additional full strategy games.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{prototype,MODELS}=require('./phase05h-run.cjs');
const clean=x=>JSON.parse(JSON.stringify(x)),rows=[];
for(const model of MODELS)for(const seed of [60001,60002])for(const scenario of ['idle','pulse']){
 const g=create(seed);g.load(prototype);g.eval(`installRegionalEconomy('${model}');s.gold=1000000`);
 const initial=clean(g.eval('s.markets')),annual=Array.from({length:6},()=>initial.map(row=>row.map(m=>({n:0,price:0,stock:0,minPrice:Infinity,maxPrice:0,minStock:Infinity,maxStock:0,floor:0,cap:0})))),monthly=[],impulses=[];
 for(let day=1;day<=2160;day++){
  if(scenario==='pulse'&&[360,720].includes(day)){
   // Deliberate fixture: one local trader per city represented by repositioning
   // the test ship. These are controlled stock shocks, NOT legitimate voyages.
   const x=clean(g.eval(`(()=>{const rows=[];for(let c=0;c<11;c++){s.city=c;ship().city=c;for(let j=0;j<11;j++){let n;if(${day}===360){n=Math.min(20,s.markets[c][j].stock);$('qty'+j).value=n;trade(j,1);$('warehouseQty'+j).value=n;warehouseTransfer(j,1)}else{n=s.warehouses[c].cargo[j]||0;$('warehouseQty'+j).value=n;warehouseTransfer(j,-1);$('qty'+j).value=n;trade(j,-1)}rows.push({c,j,n,price:s.markets[c][j].price,stock:s.markets[c][j].stock})}}return rows})()`));impulses.push({day,action:day===360?'buy_and_store':'unload_and_sell',cells:x});
  }
  g.eval('advance(1)');const markets=clean(g.eval('s.markets'));
  for(let c=0;c<11;c++)for(let j=0;j<11;j++){
   const m=markets[c][j],a=annual[Math.floor((day-1)/360)][c][j];
   assert(Number.isInteger(m.price)&&Number.isFinite(m.price)&&m.price>=4);assert(Number.isInteger(m.stock)&&m.stock>=3&&m.stock<=240);
   a.n++;a.price+=m.price;a.stock+=m.stock;a.minPrice=Math.min(a.minPrice,m.price);a.maxPrice=Math.max(a.maxPrice,m.price);a.minStock=Math.min(a.minStock,m.stock);a.maxStock=Math.max(a.maxStock,m.stock);a.floor+=m.price===4;a.cap+=m.stock===240;
  }
  if(day%30===0)monthly.push({day,markets});
 }
 g.eval('validate(s)');rows.push({model,seed,scenario,days:2160,initial,annual,monthly,impulses,final:clean(g.eval('s.markets')),finalCash:g.eval('s.gold'),nextRandom:g.eval('Math.random()')});
 console.log('PASS trajectory '+model+'/'+seed+'/'+scenario);
}
// Same draws for idle/pulse; market differences must result from real impulses.
for(const model of MODELS)for(const seed of [60001,60002]){const a=rows.find(r=>r.model===model&&r.seed===seed&&r.scenario==='idle'),b=rows.find(r=>r.model===model&&r.seed===seed&&r.scenario==='pulse');assert.equal(a.nextRandom,b.nextRandom);if(model==='control')assert.deepEqual(a.monthly.map(x=>x.markets.map(row=>row.map(m=>m.price))),b.monthly.map(x=>x.markets.map(row=>row.map(m=>m.price))))}
const payload={kind:'controlled_market_fixtures_not_full_strategy_games',gameSHA256:hash,rows};assert(process.argv[2],'explicit unused output path');fs.writeFileSync(process.argv[2],JSON.stringify(payload)+'\n',{flag:'wx'});
