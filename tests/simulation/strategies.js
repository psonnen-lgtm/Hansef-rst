function simulate(strategy,maxDays=1440,maxDecisions=800){
 if(['cautious','normal','aggressive'].includes(strategy))return simulateObserved(strategy,maxDays,maxDecisions);
 const origin=totalDay(), routes={}, metrics={fees:0,repairs:0,interest:0,borrowed:0,questProfit:0,quests:0,rumors:0,pirates:0,storms:0,realisedProfit:0,decisions:0,deadlock:false,negativeGold:false,invalidCargo:false,invalidPrice:false};
 const badTurns=({bad5:5,bad10:10,bad20:20,bad30:30})[strategy]||0, isBad=badTurns>0;
 let eld=null,dead=false,lowest=netWorth(), recovering=false,lossEvents=0;
 function tx(j,n,d){$('qty'+j).value=n;const q=ship(),before=q.cargo[j]||0,cost=q.costs[j],completedBefore=s.completed,goldBefore=s.gold;trade(j,d);if(d<0){const sold=before-(q.cargo[j]||0);metrics.quests+=s.completed-completedBefore;metrics.questProfit+=s.gold-goldBefore-sold*s.markets[s.city][j].price;if(cost!=null){const p=sold*(s.markets[s.city][j].price-cost);metrics.realisedProfit+=p;const label=CITIES[s.city]+' / '+GOODS[j][0];routes[label]??={sales:0,profit:0,fees:0};routes[label].sales+=sold;routes[label].profit+=p;}}}
 function localSell(){for(let i=0;i<s.ships.length;i++){s.active=i;if(ship().city===s.city)for(const [j,n] of Object.entries({...ship().cargo}))if(n)tx(+j,n,-1)}s.active=0}
 function borrowIfNeeded(minimum=150){if(s.gold<minimum&&s.debt<creditLimit()){const n=creditLimit()-s.debt;$('loan').value=n;bankOp('borrow');metrics.borrowed+=n}}
 function knownPrice(city,j){if(strategy==='optimized')return s.markets[city][j].price;if(city===s.city)return s.markets[city][j].price;const entry=s.journal[city];return entry?.prices?.[j]??(strategy==='optimized'?null:GOODS[j][2])}
 function orderPlan(){questsView();const q=s.quests.find(x=>x.until>=totalDay());if(!q)return null;const speed=ship().speed*.8,days=routeTravelDays(s.city,q.city,speed);if(q.city===s.city){const origins=ship().origins?.[q.j]||[];const eligible=origins.reduce((a,x)=>a+(x.city!==s.city?x.n:0),0);if((ship().cargo[q.j]||0)>=q.n&&eligible>=q.n)return {kind:'deliver',q};}
 for(let c=0;c<CITIES.length;c++)if(c!==q.city&&c!==s.city){const buy=knownPrice(c,q.j),sell=knownPrice(q.city,q.j);if(buy==null||sell==null)continue;const trip=routeTravelDays(s.city,c,speed)+routeTravelDays(c,q.city,speed);const cost=buy*q.n+q.reward*0+12+6;if(trip+days>q.until-totalDay())continue;if(sell*q.n+q.reward-cost>Math.max(30,q.reward*.08))return {kind:'source',q,city:c,qty:q.n,profit:sell*q.n+q.reward-cost};}return null}
 for(let step=0;step<maxDecisions&&totalDay()-origin<maxDays;step++){
 metrics.decisions++;localSell();for(let i=0;i<4;i++)promote();if(s.rank===4&&!eld)eld={day:totalDay()-origin,decision:step};
 if(isBad&&step<badTurns){ // Deliberate loss-making trades at the current harbor; then attempt recovery.
   recovering=true;let j=step%GOODS.length,m=s.markets[s.city][j],n=Math.min(8,m.stock,capacity()-load(),Math.floor(s.gold/Math.max(1,m.price)));if(n>0){tx(j,n,1);tx(j,n,-1);lossEvents++;}
 }
 if(s.gold<100&&recovering)borrowIfNeeded(500);
 if(s.gold<50&&s.bank>0){$('deposit').value=s.bank;bankOp('withdraw')}
 const order=orderPlan();let dest=-1,good=-1,best=0,qty=0;
 // Complete only source-to-destination orders with observed prices, known travel time and fee reserve.
 if(order?.kind==='source'&&s.city===order.city){dest=order.q.city;good=order.q.j;qty=order.qty;best=order.profit;}
 else if(order?.kind==='deliver'&&s.city===order.q.city){dest=s.city;}
 else {
   for(let c=0;c<CITIES.length;c++)if(c!==s.city)for(let j=0;j<GOODS.length;j++){
     const from=s.markets[s.city][j].price,to=knownPrice(c,j);if(to==null)continue;
     const fee=6, travel=routeTravelDays(s.city,c,ship().speed*.8),unit=to-from;
     const info=strategy==='optimized'?s.markets[c][j].price:to;
     const score=(info-from-fee/Math.max(1,capacity()))/travel;
     if(score>best){best=score;dest=c;good=j;}
   }
 }
 if(dest===s.city){let q=s.quests.find(x=>x.city===s.city&&x.until>=totalDay());if(q){s.active=0;let have=ship().cargo[q.j]||0,orig=(ship().origins?.[q.j]||[]).filter(x=>x.city!==s.city).reduce((a,x)=>a+x.n,0);if(have>=q.n&&orig>=q.n){tx(q.j,q.n,-1);}}dest=-1;}
 if(good>=0&&dest>=0&&s.city!==dest){let fee=[4,6,9][ship().type];let n=Math.min(s.markets[s.city][good].stock,capacity()-load(),Math.floor(Math.max(0,s.gold-fee-40)/s.markets[s.city][good].price));if(order?.kind==='source')n=Math.min(n,order.qty);if(n>0&&best>0)tx(good,n,1);}
 if(dest<0||dest===s.city){metrics.deadlock=true;dead=true;break}
 if(s.gold<([4,6,9][ship().type])){borrowIfNeeded(200);if(s.gold<([4,6,9][ship().type])){metrics.deadlock=true;dead=true;break}}
 const year=s.year,debt=s.debt;pending=null;planTravel(dest);if(!pending){dead=true;metrics.deadlock=true;break}const p={...pending},worth=netWorth();metrics.fees+=p.fee;arrive();metrics.pirates+=pending?.event==='pirates';metrics.storms+=pending?.event==='storm';if(s.year!==year)metrics.interest+=s.debt-debt;
 const label=CITIES[p.from]+' → '+CITIES[p.dest];routes[label]??={trips:0,fees:0,wealthDelta:0};routes[label].trips++;routes[label].fees+=p.fee;routes[label].wealthDelta+=netWorth()-worth;
 if(isBad&&recovering&&netWorth()>=9960)recovering=false;
 metrics.negativeGold ||=s.gold<0||!Number.isFinite(s.gold);metrics.invalidCargo||=s.ships.some(x=>load(x)>capacity(x));metrics.invalidPrice||=s.markets.flat().some(x=>!Number.isFinite(x.price)||x.price<1);lowest=Math.min(lowest,netWorth());
 }
 localSell();for(let i=0;i<4;i++)promote();if(s.rank===4&&!eld)eld={day:totalDay()-origin,decision:metrics.decisions};
 return {strategy,days:totalDay()-origin,wealth:netWorth(),gold:s.gold,debt:s.debt,rank:s.rank,eld,insolvent:netWorth()<=0,stranded:dead&&netWorth()>0,lowest,recovered:isBad&&!dead,metrics,routes,priceMin:Math.min(...s.markets.flat().map(x=>x.price)),priceMax:Math.max(...s.markets.flat().map(x=>x.price))};
}
// Only the three Phase-1.5b policies use this planner. No unseen market is exposed.
function observedPolicy(strategy){return {
 cautious:{cashFraction:.55,cashFloor:800,loadFraction:.35,discount:.05,ageDiscount:.002,timePower:2},
 normal:{cashFraction:.25,cashFloor:300,loadFraction:.70,discount:.02,ageDiscount:.001,timePower:1},
 aggressive:{cashFraction:.05,cashFloor:40,loadFraction:1,discount:0,ageDiscount:0,timePower:0}
}[strategy]}
function planObserved(strategy,v){
 const p=observedPolicy(strategy),reserve=Math.max(p.cashFloor,v.gold*p.cashFraction);
 let best=null;
 for(const dest of v.destinations){
  const known=v.journal[dest.city];if(!known)continue;
  const haircut=Math.min(.20,p.discount+Math.max(0,v.day-known.day)*p.ageDiscount);
  for(let j=0;j<v.local.length;j++){
   const m=v.local[j],quoted=known.prices[j];if(!Number.isFinite(quoted)||quoted<=0)continue;
   const n=Math.max(0,Math.min(m.stock,Math.floor(v.space*p.loadFraction),Math.floor((v.gold-reserve-dest.fee)/m.price)));
   const gain=n*(quoted*(1-haircut)-m.price)-dest.fee;
   const score=gain/Math.pow(dest.days,p.timePower);
   if(n>0&&gain>0&&(!best||score>best.score))best={city:dest.city,good:j,quantity:n,reserve,fee:dest.fee,days:dest.days,quote:quoted,quoteDay:known.day,expectedGain:gain,score,kind:'trade'};
  }
 }
 if(best)return best;
 // Learn actual prices by visiting a harbor; absence of a known margin is not insolvency.
 const choices=v.destinations.filter(d=>v.gold>=d.fee).slice().sort((a,b)=>{
  const ka=v.journal[a.city],kb=v.journal[b.city];
  return Number(!!ka)-Number(!!kb)||(ka?.day??0)-(kb?.day??0)||a.days-b.days||a.city-b.city;
 });
 const d=choices[0];return d?{city:d.city,good:null,quantity:0,reserve,fee:d.fee,days:d.days,kind:'observe'}:null;
}
function simulateObserved(strategy,maxDays,maxDecisions){
 const origin=totalDay(),initialWealth=netWorth(),decisions=[],routes={},trajectory=[];
 const metrics={fees:0,repairs:0,interest:0,borrowed:0,questProfit:0,quests:0,rumors:0,pirates:0,storms:0,realisedProfit:0,decisions:0,deadlock:false,negativeGold:false,invalidCargo:false,invalidPrice:false,bought:0,sold:0,trips:0,explorationTrips:0,pirateLostUnits:0};
 let eld=null,lowest=initialWealth,stopReason='decision_limit',incoming=null;
 function sell(){for(let i=0;i<s.ships.length;i++){s.active=i;if(ship().city!==s.city)continue;for(const [j,n] of Object.entries({...ship().cargo}))if(n){
  const cost=ship().costs[j];$('qty'+j).value=n;trade(+j,-1);const sold=n-(ship().cargo[j]||0);if(sold){metrics.sold++;const gain=cost==null?0:sold*(s.markets[s.city][j].price-cost);metrics.realisedProfit+=gain;if(incoming)routes[incoming].realisedProfit+=gain;}
 }}s.active=0;}
 function promoteNow(){for(let k=0;k<4;k++)promote();if(s.rank===4&&!eld)eld={day:totalDay()-origin,decision:metrics.decisions};}
 for(let step=0;step<maxDecisions&&totalDay()-origin<maxDays;step++){
  sell();promoteNow();observe();const q=ship();
  const view={gold:s.gold,day:totalDay(),space:capacity(q)-load(q),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:{},destinations:[]};
  for(const [city,entry] of Object.entries(s.journal))view.journal[city]={day:entry.year*360+entry.day,prices:[...entry.prices]};
  for(let c=0;c<CITIES.length;c++)if(c!==s.city)view.destinations.push({city:c,days:routeTravelDays(s.city,c,q.speed*(.65+.35*q.condition/100)),fee:[4,6,9][q.type]});
  const choice=planObserved(strategy,view);metrics.decisions++;
  if(!choice){metrics.deadlock=true;stopReason='insufficient_travel_cash';break;}
  const cashBefore=s.gold;let actualQuantity=0;
  if(choice.quantity){const before=q.cargo[choice.good]||0;$('qty'+choice.good).value=choice.quantity;trade(choice.good,1);actualQuantity=(q.cargo[choice.good]||0)-before;if(actualQuantity)metrics.bought++;}
  const row={decision:metrics.decisions,day:totalDay()-origin,from:s.city,to:choice.city,kind:choice.kind,good:choice.good,quantity:actualQuantity,cashBefore,cashAfterBuy:s.gold,requiredReserve:choice.reserve,cashAfterFee:s.gold-choice.fee,fee:choice.fee,days:choice.days,knownQuote:choice.quote??null,quoteDay:choice.quoteDay??null,expectedGain:choice.expectedGain??null};
  decisions.push(row);pending=null;planTravel(choice.city);
  if(!pending){stopReason='departure_rejected';metrics.deadlock=true;break;}
  const p={...pending};const label=CITIES[p.from]+' → '+CITIES[p.dest];routes[label]??={trips:0,fees:0,realisedProfit:0};
  const loadBefore=load(q);arrive();if(s.city!==choice.city){stopReason='arrival_rejected';metrics.deadlock=true;break;}
  metrics.trips++;metrics.fees+=p.fee;metrics.explorationTrips+=choice.kind==='observe';metrics.pirates+=pending.event==='pirates';metrics.storms+=pending.event==='storm';metrics.pirateLostUnits+=Math.max(0,loadBefore-load(q));routes[label].trips++;routes[label].fees+=p.fee;incoming=label;
  lowest=Math.min(lowest,netWorth());metrics.negativeGold||=s.gold<0||!Number.isFinite(s.gold);metrics.invalidCargo||=s.ships.some(x=>load(x)>capacity(x)||Object.values(x.cargo).some(n=>n<0||!Number.isFinite(n)));
  metrics.invalidPrice||=s.markets[s.city].some(m=>!Number.isFinite(m.price)||m.price<=0);
  if(step%20===0)trajectory.push({day:totalDay()-origin,wealth:netWorth(),gold:s.gold});
 }
 sell();promoteNow();if(!metrics.deadlock&&totalDay()-origin>=maxDays)stopReason='day_limit';
 return {strategy,days:totalDay()-origin,wealth:netWorth(),gold:s.gold,debt:s.debt,rank:s.rank,eld,insolvent:netWorth()<=0,stranded:metrics.deadlock&&netWorth()>0,lowest,recovered:false,metrics,routes,trajectory,decisions,stopReason};
}
