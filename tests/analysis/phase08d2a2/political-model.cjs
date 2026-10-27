'use strict';
// Separate proof-of-concept observer. Does NOT rewrite gold, book costs or origins.
// Explicit limitations: political valuation differs from the current cost valuation;
// local/unknown-origin gains earn no new trade reputation; existing awards are preserved.
const assert=require('node:assert/strict'),{Q,clean,hash}=require('./harness.cjs'),R=Q.R;
const sum=(a,b)=>R.add(a,b),num=R.decimal;
function holders(state){return [...state.ships.map(q=>({id:'s:'+q.id,city:q.city,item:q})),...Object.entries(state.warehouses).map(([c,w])=>({id:'w:'+c,city:+c,item:w}))]}
function attach(g,saved=null){
 const originalPromote=g.eval('promote.toString()'),costs={};
 function seedCosts(){for(const h of holders(g.state()))for(const [j,n] of Object.entries(h.item.cargo))costs[h.id+':'+j]={quantity:n,known:h.item.costs[j]!=null,total:R.mul(num(h.item.costs[j]??0),R.rat(n))}}
 function equity(){
  const x=g.state(),inventory=new Map();
  for(const h of holders(x))for(const [j,n] of Object.entries(h.item.cargo)){const k=h.city+':'+j;inventory.set(k,(inventory.get(k)||0)+n)}
  let v=R.rat(0);
  for(const a of [x.gold,x.bank,-x.debt,g.eval('shipyardWorth()'),-g.eval('warehouseArrears()'),...x.ships.map(q=>g.eval(`SHIPTYPES[${q.type}].cost*(.45+.35*${q.condition}/100)`))])v=sum(v,num(a));
  const snapshot=g.snapshot();
  for(const [key,n] of inventory){const [c,j]=key.split(':').map(Number),m=x.markets[c][j];
   if(n>10000||m.stock+n>1e9)throw Error('political liquidation domain unsupported');
   v=sum(v,R.rat(Q.quote(snapshot.anchors[c][j],m.stock,n,-1).total));
  }
  return v;
 }
 let state;
 if(saved){assert.equal(saved.version,1);assert.equal(saved.gameHash,hash(JSON.stringify(g.state())));state=clean(saved);Object.assign(costs,state.costs)}
 else{seedCosts();state={version:1,baselineWorth:num(g.eval('netWorth()-warehouseArrears()')),baselineEquity:equity(),margin:R.rat(0),awarded:0,costs,gameHash:null};}
 function worthExact(){const value=sum(state.baselineWorth,R.sub(equity(),state.baselineEquity)),financial=num(g.eval('netWorth()-warehouseArrears()'));return R.cmp(value,financial)>0?financial:value}
 g.context.protectedPoliticalWorth=()=>R.number(worthExact());g.eval('politicalWorth=()=>protectedPoliticalWorth()');
 // Early ranks use netWorth directly in production. Protect ONLY this VM career call.
 g.eval(originalPromote.replace('netWorth()','politicalWorth()'));
 g.eval('const tradeBeforeProtectedObserver=trade;const transferBeforeProtectedObserver=warehouseTransfer;');
 function nativeTrade(j,dir){const start=g.events.length;g.eval(`tradeBeforeProtectedObserver(${j},${dir})`);return g.events.slice(start).find(e=>e.type===(dir===1?'buy':'sell'))??null}
 function transaction(j,n,dir){
  if(!Number.isInteger(j)||j<0||j>=11||![1,-1].includes(dir)||!Number.isSafeInteger(n)||n<1)return null;
  const probe=g.state().ships[g.state().active];if(dir===-1&&n>(probe.cargo[j]||0))return nativeTrade(j,dir);
  const before=g.state(),q=before.ships[before.active],key='s:'+q.id+':'+j,cost=costs[key],units=dir===-1?g.units(j,n,-1):null;
  if(cost)assert.equal(cost.quantity,q.cargo[j]||0,'unobserved inventory consumption');
  const event=nativeTrade(j,dir);if(!event)return null;
  if(dir===1){const old=cost??{quantity:0,known:true,total:R.rat(0)};costs[key]={quantity:old.quantity+n,known:old.known,total:sum(old.total,R.rat(event.total))};}
  else{
   assert(cost&&cost.quantity>=n);let flags=[];for(const lot of q.origins?.[j]??[{city:null,n:q.cargo[j]}])for(let k=0;k<lot.n&&flags.length<n;k++)flags.push(lot.city!==null&&lot.city!==before.city);
   assert.equal(flags.length,n);const average=R.div(cost.total,R.rat(cost.quantity));
   if(cost.known)for(let i=0;i<n;i++)if(flags[i])state.margin=sum(state.margin,R.sub(R.rat(units[i]),average));
   costs[key]={...cost,quantity:cost.quantity-n,total:R.sub(cost.total,R.mul(average,R.rat(n)))};if(!costs[key].quantity)delete costs[key];
   const target=BigInt(state.margin.n)>0n?Number(BigInt(state.margin.n)/(BigInt(state.margin.d)*250n)):0;
   const award=Math.max(0,target-state.awarded);state.awarded+=award;
   const oldBonus=event.profit>0?Math.min(2,Math.floor(event.profit/250)):0;
   g.eval(`s.rep+=${award-oldBonus}`);
  }
  return event;
 }
 function transfer(j,n,dir){
  const x=g.state(),id='s:'+x.ships[x.active].id,other='w:'+x.city,source=(dir===1?id:other)+':'+j,target=(dir===1?other:id)+':'+j;
  const a=costs[source],b=costs[target]??{quantity:0,known:true,total:R.rat(0)};if(!a||a.quantity<n)return false;
  if(!g.eval(`transferBeforeProtectedObserver(${j},${dir})`))return false;const moved=R.mul(R.div(a.total,R.rat(a.quantity)),R.rat(n));
  costs[source]={...a,quantity:a.quantity-n,total:R.sub(a.total,moved)};if(!costs[source].quantity)delete costs[source];
  costs[target]={quantity:b.quantity+n,known:a.known&&b.known,total:sum(b.total,moved)};return true;
 }
 let busy=false;
 g.context.observePoliticalTrade=(j,dir)=>{if(busy)return nativeTrade(j,dir);busy=true;try{return transaction(j,Math.floor(Number(g.eval(`$('qty${j}').value`))),dir)}finally{busy=false}};
 g.context.observePoliticalTransfer=(j,dir)=>transfer(j,Number(g.eval(`$('warehouseQty${j}').value`)),dir);
 g.eval('trade=function(j,dir){return observePoliticalTrade(j,dir)};warehouseTransfer=function(j,dir){return observePoliticalTransfer(j,dir)};');
 function snapshot(){return clean({...state,costs,gameHash:hash(JSON.stringify(g.state()))})}
 return {trade:(j,n,dir)=>g.trade(j,n,dir),transfer:(j,n,dir)=>g.transfer(j,n,dir),worthExact,snapshot,equity,
  findings:{localOldGainNotFullyCredited:true,reputationRateDiffersFromOldClickCap:true,fullIntegrationReady:false}};
}
module.exports={attach,holders};
