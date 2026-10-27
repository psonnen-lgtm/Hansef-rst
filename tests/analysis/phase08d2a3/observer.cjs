'use strict';
// Analysis VM adapter; no productive save or migration. Existing price harness reused unchanged.
const assert=require('node:assert/strict'),{Ledger,R}=require('./ledger.cjs'),H=require('../phase08d2a2/harness.cjs');
const holders=x=>[...x.ships.map(q=>({id:'s:'+q.id,city:q.city,item:q})),...Object.entries(x.warehouses).map(([c,w])=>({id:'w:'+c,city:+c,item:w}))];
function attach(g,saved=null){
 const before=g.state(),ledger=new Ledger(saved?.ledger),gameHash=()=>H.hash(JSON.stringify(g.state()));
 if(saved){assert.equal(saved.version,1);assert.equal(saved.gameHash,gameHash());assert.equal(saved.priceHash,H.hash(JSON.stringify(g.snapshot().anchors)))}
 else for(const h of holders(before))for(const [j,n]of Object.entries(h.item.cargo)){const known=h.item.costs[j]!=null;const cost=h.item.costs[j]??h.item.bookCosts?.[j]??Math.min(g.eval(`GOODS[${j}][2]`),before.markets[h.city][j].price);const campaign='legacy:'+j+':'+String(cost)+':'+String(known);ledger.seed(h.id+':'+j,n,R.decimal(cost),known,campaign)}
 function consistent(){const keys=new Set();for(const h of holders(g.state()))for(const [j,n]of Object.entries(h.item.cargo)){const key=h.id+':'+j;keys.add(key);assert.equal(ledger.x.holdings[key]?.length??0,n,'unobserved inventory change')}for(const [key,a]of Object.entries(ledger.x.holdings))assert.equal(a.length,keys.has(key)?a.length:0,'missing physical holding');}
 function worth(){consistent();let v=ledger.inventory();for(const n of [g.state().gold,g.state().bank,-g.state().debt,-g.eval('warehouseArrears()'),g.eval('shipyardWorth()'),...g.state().ships.map(q=>g.eval(`SHIPTYPES[${q.type}].cost*(.45+.35*${q.condition}/100)`))])v=R.add(v,R.decimal(n));return v}
 g.context.analysisPoliticalWorth=()=>R.number(worth());const promote=g.eval('promote.toString()');g.eval('politicalWorth=()=>analysisPoliticalWorth()');g.eval(promote.replace('netWorth()','politicalWorth()'));
 g.eval('const p2NativeTrade=trade,p2NativeTransfer=warehouseTransfer;');let busy=false;
 function native(j,dir){const n=g.events.length;g.eval(`p2NativeTrade(${j},${dir})`);return g.events.slice(n).find(e=>e.type===(dir===1?'buy':'sell'))??null}
 function trade(j,n,dir){consistent();if(!Number.isInteger(j)||j<0||j>=11||![1,-1].includes(dir)||!Number.isSafeInteger(n)||n<1)return null;const x=g.state(),q=x.ships[x.active];if(q.city!==x.city||dir===-1&&n>(q.cargo[j]||0))return native(j,dir);let prices;try{prices=g.units(j,n,dir)}catch{return native(j,dir)}
 const e=native(j,dir);if(!e)return null;
 const a=g.snapshot().anchors[x.city][j],campaign='purchase:'+x.city+':'+j+':'+a.revision;ledger.trade('s:'+q.id+':'+j,x.city+':'+j,prices,dir,campaign);
 const original=dir===-1&&e.profit>0?Math.min(2,Math.floor(e.profit/250)):0,delta=ledger.settle();g.eval(`s.rep+=${delta-original}`);consistent();return e;}
 function transfer(j,n,dir){consistent();const x=g.state(),ship='s:'+x.ships[x.active].id+':'+j,warehouse='w:'+x.city+':'+j;const ok=g.eval(`p2NativeTransfer(${j},${dir})`);if(ok)ledger.move(dir===1?ship:warehouse,dir===1?warehouse:ship,n);consistent();return ok}
 g.context.p2Trade=(j,dir)=>{if(busy)return native(j,dir);busy=true;try{return trade(j,Math.floor(Number(g.eval(`$('qty${j}').value`))),dir)}finally{busy=false}};
 g.context.p2Transfer=(j,dir)=>transfer(j,Number(g.eval(`$('warehouseQty${j}').value`)),dir);
 g.eval('trade=function(j,dir){return p2Trade(j,dir)};warehouseTransfer=function(j,dir){return p2Transfer(j,dir)};');
 return {ledger,worth,trade:(j,n,dir)=>g.trade(j,n,dir),transfer:(j,n,dir)=>g.transfer(j,n,dir),snapshot:()=>({version:1,gameHash:gameHash(),priceHash:H.hash(JSON.stringify(g.snapshot().anchors)),ledger:ledger.snapshot()})};
}
module.exports={attach,holders,...H};
