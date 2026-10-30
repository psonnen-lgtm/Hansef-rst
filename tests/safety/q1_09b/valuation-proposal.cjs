'use strict';
// Decision prototype ONLY. Never imported by the game. No writes, prices or RNG.
function valuation(state,types,variant='W1-S'){
 if(!['W1-S','W2-S'].includes(variant))throw Error('Unknown decision variant');
 const number=n=>{if(!Number.isFinite(n))throw Error('Non-finite valuation input');return n};
 const city=c=>{if(!Number.isInteger(c)||!Array.isArray(state.markets[c]))throw Error('Invalid actual harbor');return c};
 const lines=[];
 const stock=(cargo,c,kind,id)=>{city(c);return Object.entries(cargo).reduce((sum,[j,n])=>{
  if(!Number.isInteger(+j)||+j<0||!state.markets[c][j]||!Number.isSafeInteger(n)||n<0)throw Error('Invalid inventory reference');
  const price=number(state.markets[c][j].price);if(price<4)throw Error('Invalid reference quote');
  lines.push({kind,id,city:c,good:+j,n,referencePrice:price,value:n*price});return sum+n*price;
 },0)};
 let hulls=0,inventory=0,wages=0;
 for(const q of state.ships){if(!types[q.type]||!Number.isFinite(q.condition)||q.condition<0||q.condition>100)throw Error('Invalid hull');hulls+=number(types[q.type].cost)*(.45+.35*q.condition/100);inventory+=stock(q.cargo,q.city,'ship',q.id)}
 for(const [c,w] of Object.entries(state.warehouses))inventory+=stock(w.cargo,+c,'warehouse',+c);
 for(const o of state.shipyard.orders){if(!types[o.type]||!Number.isFinite(o.wage)||o.wage<0)throw Error('Invalid paid wage');wages+=Math.min(o.wage,types[o.type].cost*.8)}
 const cash=number(state.gold)+number(state.bank)-number(state.debt),S0=cash+hulls+wages;
 const security=number(S0+(variant==='W1-S'?inventory:0));
 return {variant,cash,hulls,paidWageSecurity:wages,materialBookSecurity:0,inventoryReference:inventory,inventoryIncluded:variant==='W1-S',security,creditLimit:Math.max(1000,Math.round(security*.45)),lines,activated:false};
}
module.exports={valuation};
