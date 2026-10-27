'use strict';
// Analysis only. Never loaded by the HTML, deployment or existing simulator.
// Three user-fixed candidates only. No parameter search or post-result tuning.
const PARAMETERS=Object.freeze({B1:220,B2:350,B3:500});
function getModel(variant) {
  if(!Object.hasOwn(PARAMETERS,variant))throw Error('unapproved parameter');
  const REFERENCE=PARAMETERS[variant], square=BigInt(REFERENCE)**2n, FLOOR=4, CEILING=1e9;
function integer(n, lo, hi) {
  if (!Number.isSafeInteger(n) || n < lo || n > hi) throw Error('quantity model domain');
  return n;
}
function anchor(price, stock) {
  integer(price, FLOOR, CEILING); integer(stock, 0, 1e9);
  return { price, stock };
}
// Price of the edge between stock k-1 and k. BigInt gives exact half-up rounding.
function edge(a, k) {
  anchor(a.price, a.stock); integer(k, 1, 1e9);
  const numerator = BigInt(a.price) * (square + BigInt(a.stock) ** 2n);
  const denominator = square + BigInt(k) ** 2n;
  const rounded = (2n * numerator + denominator) / (2n * denominator);
  return Number(rounded < 4n ? 4n : rounded > 1000000000n ? 1000000000n : rounded);
}
function quote(a, stock, n, direction) {
  integer(stock, 0, 1e9); integer(n, 1, 10000);
  if (![1, -1].includes(direction) || (direction === 1 && n > stock) ||
      (direction === -1 && stock + n > 1e9)) throw Error('invalid stock path');
  let total = 0;
  for (let i = 0; i < n; i++) total += edge(a, direction === 1 ? stock-i : stock+i+1);
  if (!Number.isSafeInteger(total)) throw Error('invalid total');
  return { total, average: total/n, quantity: n, stockAfter: stock-direction*n };
}
// Quantity selection uses quotes, never total/initialPrice. No automatic partial execution.
function maxBuy(a, stock, gold, free) {
  if (!Number.isFinite(gold) || gold < 0) throw Error('invalid gold');
  integer(free, 0, 10000);
  let n=0, total=0;
  while (n < Math.min(stock, free)) {
    const next = edge(a, stock-n);
    if (total+next > gold) break;
    total += next; n++;
  }
  return {quantity:n,total};
}
function preview(a,stock,n,direction,gold) {
  const q=quote(a,stock,n,direction);
  return {...q,first:edge(a,direction===1?stock:stock+1),restGold:gold-direction*q.total};
}
return Object.freeze({REFERENCE,FLOOR,CEILING,anchor,edge,quote,maxBuy,preview});
}
module.exports={PARAMETERS,getModel};
