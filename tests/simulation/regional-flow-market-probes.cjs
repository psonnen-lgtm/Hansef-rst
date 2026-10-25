// Long deterministic market/ablation fixtures, not complete strategy games.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),zlib=require('node:zlib');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{prototype,flow}=require('./phase05h2-run.cjs'),clean=x=>JSON.parse(JSON.stringify(x));
const variants=['B','B_no_direct_region','F','F_no_anchor','F_no_regional_flow'],rows=[];
for(const variant of variants)for(const seed of [61001,61002]){
 const g=create(seed);g.load(prototype+'\n'+flow);
 g.eval(variant==='B'?"installRegionalEconomy('B')":variant==='B_no_direct_region'?"REGIONAL_MODELS.B.spread=0;installRegionalEconomy('B')":variant==='F_no_anchor'?'installRegionalFlow({anchorScale:0})':variant==='F_no_regional_flow'?'FLOW_PARAMS.netRegionalFlow=0;installRegionalFlow()':'installRegionalFlow()');
 g.eval('const termsAudit={updates:0,anchor:0,inventory:0,absAnchor:0,absInventory:0};const originalTerms=flowPriceTerms;flowPriceTerms=(...args)=>{const t=originalTerms(...args);termsAudit.updates++;termsAudit.anchor+=t.anchor;termsAudit.inventory+=t.inventory;termsAudit.absAnchor+=Math.abs(t.anchor);termsAudit.absInventory+=Math.abs(t.inventory);return t}');
 const initial=clean(g.eval('s.markets')),annual=Array.from({length:6},()=>initial.map(row=>row.map(()=>({n:0,price:0,stock:0,minPrice:Infinity,maxPrice:0,minStock:Infinity,maxStock:0,floor:0,cap:0})))),monthly=[];
 for(let day=1;day<=2160;day++){
  g.eval('advance(1)');const markets=clean(g.eval('s.markets'));
  for(let c=0;c<11;c++)for(let j=0;j<11;j++){const m=markets[c][j],a=annual[Math.floor((day-1)/360)][c][j];assert(Number.isInteger(m.price)&&Number.isFinite(m.price)&&m.price>=4&&Number.isInteger(m.stock)&&m.stock>=3&&m.stock<=240);a.n++;a.price+=m.price;a.stock+=m.stock;a.minPrice=Math.min(a.minPrice,m.price);a.maxPrice=Math.max(a.maxPrice,m.price);a.minStock=Math.min(a.minStock,m.stock);a.maxStock=Math.max(a.maxStock,m.stock);a.floor+=m.price===4;a.cap+=m.stock===240}
  if(day%30===0)monthly.push({day,markets});
 }
 g.eval('validate(s)');rows.push({variant,seed,days:2160,initial,annual,monthly,contributions:clean(g.eval('termsAudit'))});console.log('PASS market '+variant+'/'+seed);
}
// Actual bought-and-stored inventories provide controlled isolated impulses.
const impulses=[];
for(const model of ['B','F'])for(const quantity of [20,90]){
 const pair=[create(61101),create(61101)];for(const g of pair){g.load(prototype+'\n'+flow);g.eval(model==='B'?"installRegionalEconomy('B')":'installRegionalFlow()');g.eval('advance(2160);s.gold=1000000')}
 const [control,treated]=pair;treated.eval(`s.city=9;ship().city=9;const amount=Math.min(${quantity},s.markets[9][10].stock);$('qty10').value=amount;trade(10,1);$('warehouseQty10').value=amount;warehouseTransfer(10,1)`);
 const samples=[];for(let day=0;day<=360;day++){if(day){control.eval('advance(1)');treated.eval('advance(1)')}if([0,1,7,30,60,90,180,360].includes(day))samples.push({day,control:clean(control.eval('s.markets[9][10]')),treated:clean(treated.eval('s.markets[9][10]'))})}
 assert.equal(control.eval('Math.random()'),treated.eval('Math.random()'));impulses.push({model,requested:quantity,actual:treated.eval('amount'),samples});
}
assert(process.argv[2]);fs.writeFileSync(process.argv[2],zlib.gzipSync(JSON.stringify({gameSHA256:hash,kind:'controlled_markets_and_ablations_not_full_strategy_games',rows,impulses}),{level:9}),{flag:'wx'});
