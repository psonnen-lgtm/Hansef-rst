'use strict';
// P2 only: reversible political cost lots, independent of financial costs/origins.
const assert=require('node:assert/strict'),R=require('../phase08d2a2/rational.cjs');
const copy=x=>JSON.parse(JSON.stringify(x)),zero=()=>R.rat(0);
class Ledger {
 constructor(saved=null){this.x=saved?copy(saved):{version:1,seq:0,holdings:{},tickets:{},campaigns:{},awarded:0};this.validate()}
 validate(){const x=this.x;assert.equal(x.version,1);assert(Number.isSafeInteger(x.seq)&&x.seq>=0);assert(Number.isSafeInteger(x.awarded)&&x.awarded>=0);for(const c of Object.values(x.campaigns))R.valid(c.margin);for(const units of [...Object.values(x.holdings),...Object.values(x.tickets)]){assert(Array.isArray(units)&&units.length<=10000);for(const u of units){R.valid(u.cost);assert(R.cmp(u.cost,zero())>=0);assert.equal(typeof u.known,'boolean');assert(Object.hasOwn(x.campaigns,u.campaign));}}return true}
 campaign(id){return this.x.campaigns[id]??=( {margin:zero()} )}
 seed(key,n,cost,known,campaign){assert(!this.x.holdings[key]);this.campaign(campaign);this.x.holdings[key]=Array.from({length:n},()=>({cost:copy(cost),known,campaign}));this.validate()}
 move(from,to,n){assert((this.x.holdings[from]?.length??0)>=n);const a=this.x.holdings[from].splice(0,n);(this.x.holdings[to]??=[]).push(...a);this.x.seq++;}
 trade(holder,market,prices,dir,newCampaign){assert([1,-1].includes(dir));assert(prices.every(p=>Number.isSafeInteger(p)&&p>=4&&p<=1e9));const h=this.x.holdings[holder]??=[],tickets=this.x.tickets[market]??=[];let delta=zero();
 if(dir===-1){assert(h.length>=prices.length);for(const price of prices){const u=h.shift();tickets.push(u);if(u.known){const d=R.sub(R.rat(price),u.cost);const c=this.campaign(u.campaign);c.margin=R.add(c.margin,d);delta=R.add(delta,d)}}}
 else for(const price of prices){let u=tickets.pop();if(u){if(u.known){const d=R.sub(u.cost,R.rat(price));const c=this.campaign(u.campaign);c.margin=R.add(c.margin,d);delta=R.add(delta,d)}}else{this.campaign(newCampaign);u={cost:R.rat(price),known:true,campaign:newCampaign}}h.push(u)}
 this.x.holdings[holder]=h;this.x.tickets[market]=tickets;this.x.seq++;this.validate();return {delta,sequence:this.x.seq};}
 inventory(){return Object.values(this.x.holdings).flat().reduce((a,u)=>R.add(a,u.cost),zero())}
 reputation(){let capped=0,total=zero();for(const c of Object.values(this.x.campaigns)){total=R.add(total,c.margin);const m=BigInt(c.margin.n)/(BigInt(c.margin.d)*250n);capped+=Number(m<=0n?0n:m>=2n?2n:m)}const net=BigInt(total.n)/(BigInt(total.d)*250n);return Math.min(capped,Number(net<0n?0n:net))}
 settle(){const target=this.reputation(),delta=target-this.x.awarded;this.x.awarded=target;return delta}
 snapshot(){this.validate();return copy(this.x)}
}
module.exports={Ledger,R};
