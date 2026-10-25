// Test policy only: actual trade, transfers, travel and construction functions.
function simulateShipbuilding(model,type,yard,maxDays=1440,maxDecisions=800){
 const recipes=[{materials:[24,8,6,6],wage:2500,days:20},{materials:[44,14,12,12],wage:3700,days:35},{materials:[75,24,20,22],wage:6200,days:55}],goods=[2,7,8,9],origin=totalDay(),recipe=recipes[Math.max(0,type)],circuit=[...new Set([yard,3,4,2,1,0])],trace=[];
 let started=0,collecting=false,collectionDay=0,nextTry=0,attempts=0,procurementTrips=0,procurementFees=0,blocked=false,decisions=0,eld=null,collectTrips=0;
 function local(){return s.ships.map((q,index)=>({q,index})).filter(v=>v.q.city===s.city)}
 function choose(){const a=local();if(!a.length)return false;s.active=a[0].index;return true}
 function sell(){for(const v of local()){s.active=v.index;for(const [j,n] of Object.entries({...v.q.cargo}))if(n&&!(collecting&&goods.includes(+j))){$('qty'+j).value=n;trade(+j,-1)}}choose()}
 function have(k){return (s.warehouses[yard].cargo[goods[k]]||0)+local().reduce((n,v)=>n+(v.q.cargo[goods[k]]||0),0)}
 function buyMaterial(){for(let k=0;k<4;k++){let missing=Math.max(0,recipe.materials[k]-have(k));for(const v of local()){s.active=v.index;const j=goods[k],price=s.markets[s.city][j].price,n=Math.max(0,Math.min(missing,s.markets[s.city][j].stock,capacity()-load(),Math.floor(Math.max(0,s.gold-recipe.wage-2000)/price)));if(n){$('qty'+j).value=n;trade(j,1);missing-=n}}}choose()}
 function store(){for(const v of local()){s.active=v.index;for(let k=0;k<4;k++){const j=goods[k],n=Math.min(v.q.cargo[j]||0,Math.max(0,recipe.materials[k]-(s.warehouses[yard].cargo[j]||0)));if(n){$('warehouseQty'+j).value=n;if(!warehouseTransfer(j,1))throw Error('material store rejected')}}}choose()}
 function view(){const a=local(),v={gold:s.gold,day:totalDay(),space:a.reduce((n,v)=>n+capacity(v.q)-load(v.q),0),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:{},destinations:[]},speed=Math.min(...a.map(v=>v.q.speed*(.65+.35*v.q.condition/100))),fee=a.reduce((n,v)=>n+[4,6,9][v.q.type],0);for(const [city,e] of Object.entries(s.journal))v.journal[city]={day:e.year*360+e.day,prices:[...e.prices]};for(let c=0;c<11;c++)if(c!==s.city)v.destinations.push({city:c,days:routeTravelDays(s.city,c,speed),fee});return v}
 for(let step=0;step<maxDecisions&&totalDay()-origin<maxDays;step++){
  decisions++;if(!choose()){blocked=true;break}sell();for(let k=0;k<4;k++)promote();if(s.rank===4&&eld===null)eld=totalDay()-origin;observe();let forced=null;
  if(collecting&&totalDay()-collectionDay>240){trace.push({event:'procurement_timeout',day:totalDay(),yard});collecting=false;nextTry=totalDay()+120;sell()}
  const open=model==='material'&&s.shipyard.orders.length>0;
  const completedAway=type>=0&&s.ships.some(q=>q.city===yard)&&s.city!==yard&&s.ships.length>local().length;
  if(completedAway)forced=yard;
  const materialBase=recipe.materials.reduce((n,q,k)=>n+q*GOODS[goods[k]][2],0),budget=recipe.wage+materialBase*(1.6+Math.min(attempts,2)*.3)+2000;
  if(type>=0&&!collecting&&!open&&started<2&&totalDay()>=nextTry&&s.gold>=budget){if(s.city!==yard)forced=yard;else if(model==='control'){const before=s.ships.length;buyShip(type);if(s.ships.length!==before+1)throw Error('instant control purchase rejected');started++;trace.push({event:'instant_purchase',day:totalDay(),type,yard});choose()}else{collecting=true;collectionDay=totalDay();attempts++;collectTrips=0;trace.push({event:'procurement_begin',day:totalDay(),type,yard,gold:s.gold})}}
  if(collecting){if(s.city===yard){for(let batch=0;batch<3&&collecting;batch++){store();buyMaterial();store();if(shipbuildingQuote(type).allowed){if(!startShipbuilding(type))throw Error('funded build rejected');started++;collecting=false;trace.push({event:'construction_begin',day:totalDay(),type,yard});choose()}}}else buyMaterial();
   if(collecting){const all=goods.every((_,k)=>have(k)>=recipe.materials[k]),full=local().every(v=>load(v.q)>=capacity(v.q));forced=all||full?yard:circuit[(circuit.indexOf(s.city)+1+circuit.length)%circuit.length];if(forced===s.city)forced=circuit.find(c=>c!==s.city)}}
  const v=view();let choice=planObserved('normal',forced===null?v:{...v,destinations:v.destinations.filter(d=>d.city===forced)});if(!choice){blocked=true;trace.push({event:'cash_stop',day:totalDay(),gold:s.gold});break}
  // Reserved material cargo is never sold or repurposed by the trading planner.
  if(!collecting&&choice.good!==null){let left=choice.quantity;for(const vessel of local()){s.active=vessel.index;const j=choice.good,n=Math.max(0,Math.min(left,capacity()-load(),s.markets[s.city][j].stock,Math.floor(Math.max(0,s.gold-choice.fee-1000)/s.markets[s.city][j].price)));if(n){$('qty'+j).value=n;trade(j,1);left-=n}}choose()}
  pending=null;planTravel(choice.city);if(!pending){blocked=true;trace.push({event:'departure_stop',day:totalDay(),gold:s.gold});break}const trip={from:s.city,to:choice.city,days:pending.days,fee:pending.fee,collecting};if(collecting){procurementTrips++;collectTrips++;procurementFees+=pending.fee}arrive();trace.push({event:'trip',day:totalDay(),...trip});validate(s);
 }
 collecting=false;sell();for(let k=0;k<4;k++)promote();if(s.rank===4&&eld===null)eld=totalDay()-origin;
 return {model,type,yard,days:totalDay()-origin,decisions,started,attempts,procurementTrips,procurementFees,blocked,eld,trace,wealth:netWorth(),gold:s.gold,fleet:s.ships.length,final:JSON.parse(JSON.stringify(s)),nextRandom:Math.random()};
}
