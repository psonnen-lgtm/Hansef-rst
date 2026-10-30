'use strict';
const {createHash}=require('node:crypto');
// Read-only dossier, not a migration/clock patch. No contract dates are changed.
function graceProposal(originalRaw,anchor,routeDays,regions){
 const x=JSON.parse(originalRaw),now=x.year*360+x.day;
 if(x.v!==13||x.politics?.version!==1)throw Error('Only original pre-safety V13 is in scope');
 if(anchor.day!==now||!Number.isInteger(anchor.city)||!x.markets[anchor.city])throw Error('Requires first zero-day explicit import anchor; otherwise manual review');
 const hull=x.ships.find(q=>q.id===anchor.shipId&&q.city===anchor.city);if(!hull)throw Error('Anchor needs a real local hull');
 const speed=hull.speed*(.65+.35*Math.min(hull.condition,30)/100),fee=[4,6,9][hull.type];
 const originalHash=createHash('sha256').update(originalRaw).digest('hex'),rows=[];
 const journey=stops=>{
  let at=anchor.city,days=0,legs=[];
  for(const dest of stops){if(dest===at)continue;const d=routeDays(at,dest,speed);if(!Number.isSafeInteger(d)||d<1)throw Error('Invalid route');legs.push({from:at,to:dest,days:d});days+=d;at=dest}
  return {days,fee:legs.length*fee,legs};
 };
 // An anchor alone cannot witness a missing station. Require a real leave/return.
 const withFirstArrival=stops=>{
  if(stops[0]!==anchor.city)return journey(stops);
  return x.markets.map((_,c)=>c).filter(c=>c!==anchor.city).map(c=>journey([c,...stops])).sort((a,b)=>a.days-b.days||a.fee-b.fee)[0];
 };
 const offer=(q,plan)=>{
  if(q.until<now)return rows.push({id:q.id,eligible:false,reason:'already expired at original import'});
  if(!plan||plan.fee>x.gold)return rows.push({id:q.id,eligible:false,reason:'no proved payable itinerary; manual review'});
  const proposedUntil=Math.max(q.until,now+plan.days);
  if(proposedUntil>360000000)throw Error('Calendar boundary');
  rows.push({id:q.id,kind:q.kind??'league',originalHash,originalUntil:q.until,anchor:{...anchor},route:plan,proposedUntil,extension:proposedUntil-q.until,eligible:proposedUntil>q.until,reason:proposedUntil>q.until?'only exact demonstrated route deficit':'original deadline already sufficient',oneTimeOnly:true,activated:false});
 };
 for(const q of x.politics.jobs){if(q.kind!=='accord')continue;const plan=q.witnessed?journey([q.city]):withFirstArrival([q.partner,q.city]);offer(q,plan)}
 const l=x.politics.league;
 if(l){
  const candidates=x.politics.endorsements.map((e,c)=>e&&c!==l.home&&!l.visited.includes(c)?c:null).filter(c=>c!==null),plans=[];
  const complete=visited=>visited.length>=2&&new Set([l.home,...visited].map(c=>regions[c])).size>=2;
  const paths=[[],...candidates.map(c=>[c]),...candidates.flatMap(a=>candidates.filter(b=>b!==a).map(b=>[a,b]))];
  for(const missing of paths)if(complete([...l.visited,...missing]))plans.push(missing.length?withFirstArrival([...missing,l.home]):journey([l.home]));
  plans.sort((a,b)=>a.days-b.days||a.fee-b.fee);offer(l,plans[0]);
 }
 return {kind:'unapproved-one-time-contract-dossier',originalHash,importDay:now,anchor,rows,activated:false};
}
module.exports={graceProposal};
