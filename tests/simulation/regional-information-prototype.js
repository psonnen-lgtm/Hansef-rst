// Public prototype knowledge, not a live remote price table. Kept out of saves.
function regionalInformationPlan(strategy,v,normal,profiles,reports){
 const p=observedPolicy(strategy);if(!p)return normal;
 const reserve=Math.max(p.cashFloor,v.gold*p.cashFraction),space=Math.floor(v.space*p.loadFraction),now=v.day;
 const median=a=>{const b=a.slice().sort((a,b)=>a-b);return b.length%2?b[(b.length-1)/2]:(b[b.length/2-1]+b[b.length/2])/2};
 // Public qualitative categories are converted into uncertain planning priors.
 // These are fixed for BOTH B and F; never read either model's price parameters.
 const typical=role=>role===1?.60:role===-1?1.40:1;
 const estimate=(city,j)=>{
  const known=v.journal[city];if(known)return {price:known.prices[j],age:Math.max(0,now-known.day),basis:'own_pricebook'};
  const samples=Object.entries(v.journal).filter(([,x])=>Number.isFinite(x.prices[j])&&x.prices[j]>0).map(([key,x])=>x.prices[j]/typical(profiles[+key][j]));
  if(!samples.length)return null;
  const report=reports.filter(r=>r.city===city&&r.j===j&&now-r.day<=90).sort((a,b)=>b.day-a.day)[0];
  const reportFactor=report?.band==='abundant'?.90:report?.band==='scarce'?1.10:1;
  return {price:median(samples)*typical(profiles[city][j])*reportFactor,age:report?now-report.day:90,basis:report?'public_stock_report':'typical_region',report:report??null};
 };
 let best=normal?.kind==='trade'?normal:null,bestScore=best?.score??0;
 for(const dest of v.destinations){
  for(let j=0;j<v.local.length;j++){
   const m=v.local[j],quote=estimate(dest.city,j);if(!quote)continue;
   const uncertain=quote.basis!=='own_pricebook',haircut=uncertain?.20:Math.min(.20,p.discount+quote.age*p.ageDiscount);
   const n=Math.max(0,Math.min(m.stock,space,Math.floor((v.gold-reserve-dest.fee)/m.price)));
   const gain=n*(quote.price*(1-haircut)-m.price)-dest.fee,score=gain/Math.pow(dest.days,p.timePower);
   if(n>0&&gain>0&&score>bestScore){bestScore=score;best={city:dest.city,good:j,quantity:n,reserve,fee:dest.fee,days:dest.days,quote:quote.price,quoteDay:quote.basis==='own_pricebook'?v.journal[dest.city].day:null,expectedGain:gain,score,kind:'trade',publicInformation:uncertain?{basis:quote.basis,report:quote.report??null,good:j,estimatedSale:quote.price,haircut}:null}}
   // Economically scored source excursion. Return is a plan, never guaranteed.
   if(!v.journal[dest.city]&&profiles[dest.city][j]===1){
    const estimatedBuy=quote.price*1.20,backFee=dest.fee,qty=Math.max(0,Math.min(space,60,Math.floor((v.gold-reserve-dest.fee-backFee)/estimatedBuy)));
    const gain=qty*(m.price*.80-estimatedBuy)-dest.fee-backFee,score=gain/Math.pow(dest.days*2,p.timePower);
    if(qty>0&&gain>0&&score>bestScore){bestScore=score;best={city:dest.city,good:null,quantity:0,reserve,fee:dest.fee,days:dest.days,expectedGain:gain,score,kind:'observe',publicInformation:{basis:'source_excursion',good:j,estimatedBuy,estimatedReturnSale:m.price*.80,plannedQuantity:qty,plannedRoundTripDays:dest.days*2,report:quote.report??null}}}
   }
  }
 }
 return best??normal;
}
function installRegionalInformation(enabled){
 const trace={enabled,reports:[],decisions:[],knowledge:'static regional roles; public dated stock bands; own observed prices',priors:{surplus:.60,neutral:1,shortage:1.40,unknownSaleHaircut:.20,unknownBuySurcharge:.20,reportMaxAge:90}},profiles=REGIONAL_PROFILES.map(row=>[...row]);
 const originalObserve=observe,originalPlan=planObserved;let lastPublished='';
 function publish(){
  if(!enabled)return;const key=totalDay()+':'+s.city;if(key===lastPublished)return;lastPublished=key;
  // Exactly one nonlocal report, selected WITHOUT looking for a favorable price.
  const choices=CITIES.map((_,city)=>city).filter(city=>city!==s.city),city=choices[(totalDay()+s.city)%choices.length],goods=profiles[city].map((role,j)=>({role,j})).filter(x=>x.role!==0),j=goods[(totalDay()+city)%goods.length].j;
  const stock=s.markets[city][j].stock,band=stock>=140?'abundant':stock<=60?'scarce':'ordinary';
  const report={city,j,day:totalDay(),band,publishedAt:s.city};trace.reports.push(report);
 }
 observe=()=>{originalObserve();publish()};publish();
 if(enabled)planObserved=(strategy,v)=>regionalInformationPlan(strategy,v,originalPlan(strategy,v),profiles,trace.reports);
 // Record the FINAL choice even when the old explorer overrides an info proposal.
 const marker='const choice=planObserved(strategy,view);metrics.decisions++;',source=simulateObserved.toString();
 if(source.split(marker).length!==2)throw Error('information decision insertion guard');
 const record=(choice,v)=>{if(choice?.publicInformation)trace.decisions.push({day:v.day,from:s.city,to:choice.city,good:choice.good,quantity:choice.quantity,expectedGain:choice.expectedGain,...choice.publicInformation})};
 simulateObserved=eval('('+source.replace(marker,'const choice=planObserved(strategy,view);record(choice,view);metrics.decisions++;')+')');
 return ()=>JSON.parse(JSON.stringify(trace));
}
