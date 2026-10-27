'use strict';
// Exact fractions serialized as decimal strings, never lossy JSON numbers.
const MAX_DIGITS=4096;
function gcd(a,b){a=a<0n?-a:a;while(b){const t=a%b;a=b;b=t<0n?-t:t}return a}
function rat(n,d=1n){n=BigInt(n);d=BigInt(d);if(d<=0n)throw Error('denominator');const g=gcd(n,d);n/=g;d/=g;if(n.toString().length>MAX_DIGITS||d.toString().length>MAX_DIGITS)throw Error('exact precision budget exceeded');return {n:n.toString(),d:d.toString()}}
function valid(x){if(!x||Object.keys(x).sort().join()!= 'd,n'||!/^(-?[0-9]{1,4096})$/.test(x.n)||!/^([0-9]{1,4096})$/.test(x.d))throw Error('fraction schema');const y=rat(x.n,x.d);if(y.n!==x.n||y.d!==x.d)throw Error('noncanonical fraction');return x}
const add=(a,b)=>rat(BigInt(a.n)*BigInt(b.d)+BigInt(b.n)*BigInt(a.d),BigInt(a.d)*BigInt(b.d));
const neg=a=>rat(-BigInt(a.n),a.d),sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>rat(BigInt(a.n)*BigInt(b.n),BigInt(a.d)*BigInt(b.d));
const div=(a,b)=>{if(BigInt(b.n)<=0n)throw Error('positive divisor required');return rat(BigInt(a.n)*BigInt(b.d),BigInt(a.d)*BigInt(b.n))};
const cmp=(a,b)=>{const x=BigInt(a.n)*BigInt(b.d)-BigInt(b.n)*BigInt(a.d);return x<0n?-1:x>0n?1:0};
const number=a=>{const n=BigInt(a.n),d=BigInt(a.d),whole=n/d,rem=n%d;return Number(whole)+Number(rem*1000000000000000n/d)/1e15};
function decimal(n){if(!Number.isFinite(n))throw Error('number');let [m,e='0']=String(n).split('e');const dec=(m.split('.')[1]||'').length;m=m.replace('.','');const exponent=Number(e)-dec;return exponent>=0?rat(BigInt(m)*10n**BigInt(exponent)):rat(m,10n**BigInt(-exponent))}
module.exports={rat,valid,add,sub,mul,div,cmp,number,decimal,MAX_DIGITS};
