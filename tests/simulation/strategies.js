function simulate(strategy,maxDays=1440,maxDecisions=800){
 const origin=totalDay(), routes={}, metrics={fees:0,repairs:0,interest:0,borrowed:0,questProfit:0,quests:0,rumors:0,pirates:0,storms:0,realisedProfit:0,decisions:0,deadlock:false,negativeGold:false,invalidCargo:false,invalidPrice:false};
 const badTurns=({bad5:5,bad10:10,bad20:20,bad30:30})[strategy]||0, isBad=badTurns>0;
 let eld=null,dead=false,lowest=netWorth(), recovering=false,lossEvents=0;
 function tx(j,n,d){$('qty'+j).value=n;const q=ship(),before=q.cargo[j]||0,cost=q.costs[j];trade(j,d);if(d<0){const sold=before-(q.cargo[j]||0);if(cost!=null){const p=sold*(s.markets[s.city][j].price-cost);metrics.realisedProfit+=p;const label=CITIES[s.city]+' / '+GOODS[j][0];routes[label]??={sales:0,profit:0,fees:0};routes[label].sales+=sold;routes[label].profit+=p;}}}
 function localSell(){for(let i=0;i<s.ships.length;i++){s.active=i;if(ship().city===s.city)for(const [j,n] of Object.entries({...ship().cargo}))if(n)tx(+j,n,-1)}s.active=0}
 function borrowIfNeeded(minimum=150){if(s.gold<minimum&&s.debt<creditLimit()){const n=creditLimit()-s.debt;$('loan').value=n;bankOp('borrow');metrics.borrowed+=n}}
 function knownPrice(city,j){if(strategy==='optimized')return s.markets[city][j].price;if(city===s.city)return s.markets[city][j].price;const entry=s.journal[city];return entry?.prices?.[j]??(strategy==='optimized'?null:GOODS[j][2])}
 function orderPlan(){questsView();const q=s.quests.find(x=>x.until>=totalDay());if(!q)return null;const speed=ship().speed*.8,days=Math.max(1,Math.ceil(DIST[s.city][q.city]/speed));if(q.city===s.city){const origins=ship().origins?.[q.j]||[];const eligible=origins.reduce((a,x)=>a+(x.city!==s.city?x.n:0),0);if((ship().cargo[q.j]||0)>=q.n&&eligible>=q.n)return {kind:'deliver',q};}
 for(let c=0;c<5;c++)if(c!==q.city&&c!==s.city){const buy=knownPrice(c,q.j),sell=knownPrice(q.city,q.j);if(buy==null||sell==null)continue;const trip=Math.ceil(DIST[s.city][c]/speed)+Math.ceil(DIST[c][q.city]/speed);const cost=buy*q.n+q.reward*0+12+6;if(trip+days>q.until-totalDay())continue;if(sell*q.n+q.reward-cost>Math.max(30,q.reward*.08))return {kind:'source',q,city:c,qty:q.n,profit:sell*q.n+q.reward-cost};}return null}
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
   for(let c=0;c<5;c++)if(c!==s.city)for(let j=0;j<GOODS.length;j++){
     const from=s.markets[s.city][j].price,to=knownPrice(c,j);if(to==null)continue;
     const fee=6, travel=Math.max(1,Math.ceil(DIST[s.city][c]/(ship().speed*.8))),unit=to-from;
     const info=strategy==='optimized'?s.markets[c][j].price:to;
     const score=(info-from-fee/Math.max(1,capacity()))/travel;
     if(score>best){best=score;dest=c;good=j;}
   }
 }
 if(dest===s.city){let q=s.quests.find(x=>x.city===s.city&&x.until>=totalDay());if(q){const before=s.completed; s.active=0;let have=ship().cargo[q.j]||0,orig=(ship().origins?.[q.j]||[]).filter(x=>x.city!==s.city).reduce((a,x)=>a+x.n,0);if(have>=q.n&&orig>=q.n){tx(q.j,q.n,-1);if(s.completed>before){metrics.quests++;metrics.questProfit+=q.reward;}}}dest=-1;}
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