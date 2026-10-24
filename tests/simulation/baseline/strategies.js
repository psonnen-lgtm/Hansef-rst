function simulate(strategy,maxDays=1440,maxDecisions=800){
 const origin=totalDay(),wealth=[],route={},metrics={fees:0,repairs:0,interest:0,borrowed:0,quests:0,rumors:0,pirates:0,defended:0,storms:0,realisedProfit:0,shipPurchases:0,decisions:0,negativeGold:false,invalidCargo:false,invalidPrice:false},armTarget=strategy==='aggressive'?3:strategy==='normal'?1:0;
 let eld=null,dead=false,recovered=false,lowest=netWorth(),incomingRoute=null;const recklessTurns=strategy==='ruin'?30:5,reckless=['bad','ruin'].includes(strategy);
 function quantity(j,n,dir){$('qty'+j).value=n;let q=ship(),before=q.cargo[j]||0,paid=q.costs[j];trade(j,dir);if(dir===-1){let profit=(before-(q.cargo[j]||0))*(s.markets[s.city][j].price-(paid??s.markets[s.city][j].price));metrics.realisedProfit+=profit;if(incomingRoute&&route[incomingRoute])route[incomingRoute].realisedProfit+=profit;}}
 function sellAll(){for(let i=0;i<s.ships.length;i++){s.active=i;if(ship().city!==s.city)continue;for(const [j,n] of Object.entries({...ship().cargo}))if(n)quantity(+j,n,-1)}s.active=0}
 function loan(){let n=Math.max(0,creditLimit()-s.debt);if(n){$('loan').value=n;bankOp('borrow');metrics.borrowed+=n}}
 for(let step=0;step<maxDecisions&&totalDay()-origin<maxDays;step++){
 metrics.decisions++;sellAll();let previous=s.rank;for(let i=0;i<4;i++)promote();if(s.rank===4&&eld===null)eld={day:totalDay()-origin,decision:step};
 if(reckless&&step<recklessTurns){ // Deliberately buy the dearest item, sell next at the cheapest city.
 }else if(strategy==='optimized'||strategy==='normal'){
 let before=s.completed;questsView();const q=s.quests[0];if(q&&q.city===s.city&&q.until>=totalDay()){
 s.active=0;let m=s.markets[s.city][q.j];if(q.n<=capacity()-load()&&m.stock>=q.n&&s.gold>=m.price*q.n+20){quantity(q.j,q.n,1);quantity(q.j,q.n,-1);if(s.completed>before)metrics.quests++}}
 }
 if(strategy==='aggressive'&&step===0)loan();
 if(reckless&&s.gold<200)loan();
 if(s.gold<50&&s.bank>0){$('deposit').value=s.bank;bankOp('withdraw')}
 if(s.gold<20&&s.debt<creditLimit())loan();
 if((strategy==='aggressive'||strategy==='optimized')&&s.ships.length<(strategy==='aggressive'?4:2)&&s.gold>15000){buyShip(2);metrics.shipPurchases++}
 for(let i=0;i<s.ships.length;i++){s.active=i;if(ship().condition<(strategy==='cautious'?85:strategy==='aggressive'?65:55)){let cost=Math.ceil((100-ship().condition)*8);if(s.gold>cost+200){metrics.repairs+=cost;repairShip()}}if(ship().arms<armTarget&&s.gold>5000)armShip()}s.active=0;
 let destination=-1,chosen=-1,best=-Infinity;
 for(let c=0;c<5;c++)if(c!==s.city)for(let j=0;j<7;j++){
 const local=s.markets[s.city][j].price;
 const target=strategy==='optimized'?s.markets[c][j].price:(s.journal[c]?.prices[j]??GOODS[j][2]);
 let value=(target-local)/Math.max(1,DIST[s.city][c]);
 if(strategy==='aggressive')value=(target-local)*(.5+Math.random());
 if(reckless&&step<recklessTurns)value=local-s.markets[c][j].price;
 if(value>best){best=value;destination=c;chosen=j}
 }
 if(reckless&&step>=recklessTurns){ // Recovery switches to normal observed-price decisions.
 if(netWorth()>9960)recovered=true;
 }
 const fee=s.ships.reduce((a,q)=>a+[4,6,9][q.type],0),reserve=strategy==='cautious'?Math.max(800,s.gold*.4):strategy==='normal'?300:fee+20;
 if(chosen>=0){for(let i=0;i<s.ships.length;i++){s.active=i;let q=ship(),m=s.markets[s.city][chosen],n=Math.min(m.stock,capacity(q)-load(q),Math.floor(Math.max(0,s.gold-reserve)/m.price));if(n>0&&(best>0||(reckless&&step<recklessTurns)))quantity(chosen,n,1)}}s.active=0;
 if(strategy==='optimized'&&step%12===0&&s.gold>200){takeBath();metrics.rumors++;let tip=s.rumors[0];if(tip?.special){destination=tip.city}}
 const beforeGold=s.gold,year=s.year,debt=s.debt;pending=null;planTravel(destination);
 if(!pending){dead=true;break}
 const p={...pending};metrics.fees+=p.fee;metrics.pirates+=p.event==='pirates';metrics.defended+=p.event==='defended';metrics.storms+=p.event==='storm';let worthBefore=netWorth();arrive();if(s.year>year)metrics.interest+=s.debt-debt;
 let label=CITIES[p.from]+' → '+CITIES[p.dest];incomingRoute=label;route[label]??={trips:0,fees:0,wealthDelta:0,realisedProfit:0};route[label].trips++;route[label].fees+=p.fee;route[label].wealthDelta+=netWorth()-worthBefore;
 let w=netWorth();lowest=Math.min(lowest,w);if(w<=0)dead=true;
 metrics.negativeGold ||=s.gold<0||!Number.isFinite(s.gold);
 metrics.invalidCargo ||=s.ships.some(q=>load(q)>capacity(q)||Object.values(q.cargo).some(n=>n<0||!Number.isFinite(n)));
 metrics.invalidPrice ||=s.markets.some(c=>c.some(m=>!Number.isFinite(m.price)||m.price<1));
 if(step%20===0)wealth.push({day:totalDay()-origin,wealth:w});if(dead)break;
 }
 sellAll();for(let i=0;i<4;i++)promote();if(s.rank===4&&eld===null)eld={day:totalDay()-origin,decision:metrics.decisions};
 return {strategy,days:totalDay()-origin,wealth:netWorth(),gold:s.gold,debt:s.debt,rank:s.rank,eld,insolvent:netWorth()<=0,stranded:dead&&netWorth()>0,lowest,recovered,metrics,trajectory:wealth,routes:route,priceMin:Math.min(...s.markets.flat().map(x=>x.price)),priceMax:Math.max(...s.markets.flat().map(x=>x.price))};
}
