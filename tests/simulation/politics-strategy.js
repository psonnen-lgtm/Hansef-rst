// Actual political and economic actions, local quotes/own journal only.
// No injected deeds, free goods, direct clock advancement or remote market oracle.
function simulatePoliticalCareer(behavior,home,maxDays=2160,maxDecisions=1200){
 const options={
  wealth:{begin:250000,breakTrips:3,localGoal:6},
  early:{begin:15000,breakTrips:1,localGoal:6},
  supply:{begin:25000,breakTrips:2,localGoal:10},
  remote:{begin:45000,breakTrips:3,localGoal:6},
  balanced:{begin:45000,breakTrips:2,localGoal:6}
 }[behavior];if(!options)throw Error('unknown career policy');
 const origin=totalDay(),initialWorth=netWorth(),trace=[],tour=[0,1,8,10,6,7,9,5,4,3,2];
 let cooldown=0,mayorDay=null,eldDay=null,decisions=0,blocked=false,tourIndex=(tour.indexOf(home)+1)%tour.length;
 const distance=(a,b)=>routeTravelDays(a,b,ship().speed*(.65+.35*ship().condition/100));
 const sorted=CITIES.map((_,city)=>city).filter(c=>c!==home).sort((a,b)=>distance(home,a)-distance(home,b)||a-b);
 const out=[sorted[0],sorted[1]],opposite=sorted.find(c=>POLITICAL_CITIES[c].region!==POLITICAL_CITIES[home].region&&!out.includes(c));
 if(out.every(c=>POLITICAL_CITIES[c].region===POLITICAL_CITIES[home].region)&&opposite!==undefined)out.push(opposite);else out.push(sorted.find(c=>!out.includes(c)));
 // Exploration-oriented policy chooses a farther but public third endorsement.
 if(behavior==='remote'){const far=sorted.slice().reverse().find(c=>!out.slice(0,2).includes(c)&&new Set([home,out[0],out[1],c].map(c=>POLITICAL_CITIES[c].region)).size>=2);if(far!==undefined)out[2]=far}
 function eligible(q){return (ship().origins?.[q.good]||[]).reduce((n,l)=>n+(l.city!==null&&l.city!==q.city?l.n:0),0)}
 function sell(){
  for(const [key,n] of Object.entries({...ship().cargo})){if(!n)continue;const j=+key,held=s.politics.jobs.filter(q=>q.kind==='supply'&&q.good===j&&q.until>=totalDay());
   if(held.some(q=>q.city!==s.city||eligible(q)<q.n))continue;
   $('qty'+j).value=n;trade(j,-1);
  }
 }
 function buyCivic(){
  for(const q of s.politics.jobs.filter(q=>q.kind==='supply'&&q.city!==s.city&&q.until>=totalDay())){
   const need=q.n-eligible(q),m=s.markets[s.city][q.good],n=Math.min(need,m.stock,capacity()-load(),Math.floor(Math.max(0,s.gold-500)/m.price));
   if(n>0){$('qty'+q.good).value=n;trade(q.good,1)}
  }
 }
 function view(target){
  const reserved=new Set(s.politics.jobs.filter(q=>q.kind==='supply').map(q=>q.good)),q=ship(),v={gold:s.gold,day:totalDay(),space:capacity(q)-load(q),local:s.markets[s.city].map((m,j)=>({price:m.price,stock:reserved.has(j)?0:m.stock})),journal:{},destinations:[]};
  for(const [city,e] of Object.entries(s.journal))v.journal[city]={day:e.year*360+e.day,prices:[...e.prices]};
  for(let c=0;c<CITY_COUNT;c++)if(c!==s.city&&(target===null||c===target))v.destinations.push({city:c,days:distance(s.city,c),fee:[4,6,9][q.type]});
  return v;
 }
 for(let step=0;step<maxDecisions&&totalDay()-origin<maxDays;step++){
  const beforeReceipts=s.politics.records.length;sell();
  for(let i=0;i<2&&s.rank<2;i++)promote();
  for(const q of [...s.politics.jobs]){
   if(q.kind==='accord'&&q.partner===s.city&&!q.witnessed)witnessPoliticalJob(q.id);
   if(q.kind==='accord'&&q.city===s.city&&q.witnessed)finishPoliticalAccord(q.id);
  }
  if(s.politics.office&&mayorDay===null)mayorDay=totalDay()-origin;
  if(s.rank===4&&eldDay===null)eldDay=totalDay()-origin;
  if(s.rank<4&&politicalLeagueAccess())requestPoliticalEndorsement();
  if(s.rank<4&&hanseQuote().eligible){runHanseAssembly();eldDay=totalDay()-origin}
  if(s.politics.records.length>beforeReceipts)cooldown=options.breakTrips;
  let focus=home,target=null;
  const proven=!!s.politics.terms[home]||s.politics.office?.city===home&&politicalOfficeProof();
  if(proven)focus=out.find(c=>!s.politics.endorsements[c])??home;
  const allSeals=out.every(c=>s.politics.endorsements[c]);
  if(s.rank<4&&proven&&allSeals&&!s.politics.records.some(r=>r.kind==='league'&&r.city===home)){
   if(!s.politics.league)acceptHanseAgreement();
   const league=s.politics.league;
   if(league){if(s.city!==home&&s.politics.endorsements[s.city])witnessHanseAgreement();
    const visited=league.visited,regions=new Set([home,...visited].map(c=>POLITICAL_CITIES[c].region));
    if(visited.length>=2&&regions.size>=2){if(s.city===home)finishHanseAgreement();else target=home}
    else{let next=out.find(c=>!visited.includes(c));if(visited.length>=1&&regions.size<2)next=out.find(c=>!visited.includes(c)&&POLITICAL_CITIES[c].region!==POLITICAL_CITIES[home].region)??next;target=next??home}
   }
  }
  if(s.rank<4&&s.city===home&&!s.politics.office&&!s.politics.terms[home]&&politicalSupport(home).records>=options.localGoal&&mayorQuote().willWin){
   runMayorElection();if(s.politics.office&&mayorDay===null)mayorDay=totalDay()-origin;
  }
  // Once elected, finish real home duties before collecting foreign supporters.
  if(s.politics.office?.city===home&&!politicalOfficeProof())focus=home;
  const financeReady=netWorth()>=options.begin&&s.gold>=1500;
  const needLocal=s.rank<4&&(!proven||!allSeals),active=s.politics.jobs.some(q=>q.city===focus&&q.until>=totalDay());
  if(target===null&&needLocal&&(active||financeReady&&cooldown<=0)){
   if(s.city===focus){
    for(const kind of ['supply','accord'])if(s.politics.issued[focus][kind]<politicalPeriod()&&!s.politics.jobs.some(q=>q.city===focus&&q.kind===kind))acceptPoliticalJob(kind);
   }else if(active||s.politics.issued[focus].supply<politicalPeriod()||s.politics.issued[focus].accord<politicalPeriod())target=focus;
   const accord=s.politics.jobs.find(q=>q.city===focus&&q.kind==='accord'),supply=s.politics.jobs.find(q=>q.city===focus&&q.kind==='supply');
   if(accord){if(!accord.witnessed&&s.city!==accord.partner)target=accord.partner;else if(accord.witnessed&&s.city!==focus)target=focus}
   if(!accord&&supply){if(eligible(supply)>=supply.n&&s.city!==focus)target=focus;else if(s.city===focus)target=politicalPartner(focus,supply.period)}
  }
  buyCivic();sell();
  // Returning with the required goods can remove the final supply job before planning.
  if(target===s.city)target=null;
  const wasPolitical=target!==null;
  if(target===null&&behavior==='remote'&&s.rank!==4){if(s.city===tour[tourIndex])tourIndex=(tourIndex+1)%tour.length;target=tour[tourIndex]}
  const choice=planObserved('normal',view(target));
  if(!choice){
   if(harborWorkEligibility().allowed&&performHarborWork()){trace.push({event:'harbor_work',day:totalDay()});continue}
   blocked=true;trace.push({event:'financial_stop',day:totalDay(),gold:s.gold,wealth:netWorth(),focus});break;
  }
  if(choice.quantity>0){$('qty'+choice.good).value=choice.quantity;trade(choice.good,1)}
  pending=null;planTravel(choice.city);if(!pending){blocked=true;trace.push({event:'departure_rejected',day:totalDay()});break}
  const from=s.city,days=pending.days,fee=pending.fee;arrive();if(s.city!==choice.city)throw Error('arrival rejected');
  decisions++;trace.push({event:'trip',day:totalDay(),from,to:s.city,days,fee,political:wasPolitical});
  if(!wasPolitical&&cooldown>0)cooldown--;validate(s);
 }
 sell();if(s.rank<4&&hanseQuote().eligible){runHanseAssembly();eldDay??=totalDay()-origin}
 return {behavior,home,days:totalDay()-origin,decisions,blocked,mayorDay,eldDay,rank:s.rank,wealth:netWorth(),politicalWorth:politicalWorth(),gold:s.gold,initialWorth,endorsementPlan:out,trace,final:JSON.parse(JSON.stringify(s)),nextRandom:Math.random()};
}
