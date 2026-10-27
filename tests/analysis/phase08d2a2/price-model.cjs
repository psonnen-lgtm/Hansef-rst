'use strict';
const R=require('./rational.cjs'),K=500,SQUARE=250000n;
function integer(n,a,b){if(!Number.isSafeInteger(n)||n<a||n>b)throw Error('domain');return n}
const square=s=>{integer(s,0,1e9);return R.rat(SQUARE+BigInt(s)**2n)};
function basis(price,stock,day=0){integer(price,4,1e9);return {...R.mul(R.rat(price),square(stock)),revision:0,day};}
function validate(a){if(!a||Object.keys(a).sort().join()!=='d,day,n,revision')throw Error('basis schema');R.valid({n:a.n,d:a.d});if(BigInt(a.n)<=0n)throw Error('positive basis');integer(a.revision,0,1e12);integer(a.day,0,360000000);return a}
function edge(a,k){validate(a);integer(k,1,1e9);const n=BigInt(a.n),d=BigInt(a.d)*(SQUARE+BigInt(k)**2n),v=(2n*n+d)/(2n*d);return Number(v<4n?4n:v>1000000000n?1000000000n:v)}
function quote(a,stock,n,dir){integer(stock,0,1e9);integer(n,1,10000);if(![1,-1].includes(dir)||dir===1&&n>stock||dir===-1&&stock+n>1e9)throw Error('stock path');let total=0;for(let i=0;i<n;i++)total+=edge(a,dir===1?stock-i:stock+i+1);return {total,average:total/n,quantity:n,stockAfter:stock-dir*n};}
function maxBuy(a,stock,gold,free){if(!Number.isFinite(gold)||gold<0)throw Error('gold');integer(free,0,10000);let n=0,total=0;while(n<Math.min(stock,free)){const p=edge(a,stock-n);if(total+p>gold)break;total+=p;n++}return {quantity:n,total}}
function update(a,before,after,day,kind='daily',expected=a.revision){
 validate(a);integer(day,a.day,360000000);if(a.revision!==expected)throw Error('stale basis revision');
 for(const m of [before,after]){integer(m.stock,0,1e9);integer(m.price,4,1e9)}
 if(before.price===after.price&&before.stock===after.stock)return {...a,day};
 let next;
 if(kind==='daily'){
  // Retain the exact unit residual, apply ONLY the original integer price impulse.
  let unit=R.div(a,square(before.stock));
  if(R.cmp(unit,R.rat(4))<0)unit=R.rat(4);if(R.cmp(unit,R.rat(1e9))>0)unit=R.rat(1e9);
  unit=R.add(unit,R.rat(after.price-before.price));
  if(R.cmp(unit,R.rat(4))<0)unit=R.rat(4);if(R.cmp(unit,R.rat(1e9))>0)unit=R.rat(1e9);
  next=R.mul(unit,square(after.stock));
 }else if(kind==='special')next=R.mul(R.rat(after.price),square(after.stock));
 else throw Error('event kind');
 return {...next,revision:a.revision+1,day};
}
module.exports={R,K,basis,validate,edge,quote,maxBuy,update,square};
