// No hidden market, base-price, regional-profile or fixed-city-order knowledge.
// Same normal reserve/quantity policy; explicit price-discovery utility can beat
// a known immediate margin. This utility is NOT booked as revenue or profit.
function simulateRegionalExplorer(maxDays=1440,maxDecisions=800){
 const original=planObserved;let turns=0,lastDiscovery=0,seen=new Set([s.city]);
 planObserved=(unused,v)=>{
  turns++;
  for(const key of Object.keys(v.journal))if(!seen.has(+key)){seen.add(+key);lastDiscovery=turns;}
  const normal=original('normal',v),policy=observedPolicy('normal');
  const reserve=Math.max(policy.cashFloor,v.gold*policy.cashFraction);
  const unvisited=v.destinations.filter(d=>!v.journal[d.city]&&v.gold>=reserve+d.fee);
  if(!unvisited.length)return normal;
  // Learn dispersion only from own observations, including stale journal quotes.
  let spread=0;
  for(let j=0;j<v.local.length;j++){
   const quotes=[v.local[j].price,...Object.values(v.journal).map(x=>x.prices[j])].filter(x=>Number.isFinite(x)&&x>0);
   spread=Math.max(spread,Math.max(...quotes)-Math.min(...quotes));
  }
  const patience=Math.min(3,(turns-lastDiscovery+1)/8);
  const candidates=unvisited.map(d=>({...d,score:(Math.floor(v.space*.7)*spread*.5*patience-d.fee)/d.days})).sort((a,b)=>b.score-a.score||a.days-b.days||a.city-b.city);
  const d=candidates[0];
  if(normal?.kind==='trade'&&normal.score>=d.score)return normal;
  // Buy nothing on an information trip: no fabricated remote sale quote.
  return {city:d.city,good:null,quantity:0,reserve,fee:d.fee,days:d.days,kind:'observe',informationUtility:d.score};
 };
 try{return {...simulateObserved('normal',maxDays,maxDecisions),strategy:'explorer',information:'local_and_own_journal_only',discoveryPolicy:'observed_dispersion_times_capped_patience_per_travel_day',discovered:seen.size}}
 finally{planObserved=original}
}
