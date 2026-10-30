'use strict';
// Quote/decision preparation ONLY. No mutation, trip resolver or RNG here.
function remoteQuote(state,destination,convoy,routeDays){
 const from=state.city,p=state.politics.safety.person;
 if(!p||p.city===null||p.city===from)throw Error('Needs a known person in another harbor');
 if(!Number.isInteger(destination)||!state.markets[destination]||destination===from)throw Error('Invalid destination');
 const active=state.ships[state.active];if(!active||active.city!==from)throw Error('No selected local hull');
 const ships=convoy?state.ships.filter(q=>q.city===from):[active];
 const speed=Math.min(...ships.map(q=>q.speed*(.65+.35*q.condition/100)));
 const days=routeDays(from,destination,speed),fee=ships.reduce((n,q)=>n+[4,6,9][q.type],0);
 if(!Number.isSafeInteger(days)||days<1||state.gold<fee)throw Error('No payable valid route');
 return {mode:'unaccompanied-proposal',from,destination,ids:ships.map(q=>q.id),days,fee,personUnchanged:JSON.parse(JSON.stringify(p)),expectedRevision:state.politics.safety.revision,activated:false};
}
module.exports={remoteQuote};
