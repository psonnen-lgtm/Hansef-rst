// Adversarial loss selection is deliberately all-knowing; recovery uses only observed prices.
function simulateRecovery(targetLosses,limits={lossAttempts:160,recoveryDays:1440,recoveryDecisions:800}){
 const start={gold:s.gold,wealth:netWorth(),debt:s.debt,day:totalDay()},lossTrades=[],recoveryTrades=[],history=[],bankActions=[];
 let lossCount=0,phase='loss',reason=null,recovered=false,recoveryAt=null;
 function snapshot(){return {day:totalDay(),gold:s.gold,wealth:netWorth(),debt:s.debt,bank:s.bank,shipValue:s.ships.reduce((a,q)=>a+SHIPTYPES[q.type].cost*(.45+.35*q.condition/100),0),creditAvailable:Math.max(0,creditLimit()-s.debt)};}
 function finance(minimum){
  if(s.gold>=minimum)return true;
  if(s.bank>=1){const before=s.gold;$('deposit').value=Math.floor(s.bank);bankOp('withdraw');bankActions.push({phase,op:'withdraw',amount:s.gold-before,...snapshot()});}
  if(s.gold<minimum){const amount=Math.max(0,Math.floor(creditLimit()-s.debt));if(amount){const before=s.gold;$('loan').value=amount;bankOp('borrow');bankActions.push({phase,op:'borrow',amount:s.gold-before,...snapshot()});}}
  return s.gold>=minimum;
 }
 function sail(to){pending=null;planTravel(to);if(!pending)return null;const p={...pending};arrive();if(s.city!==to||!pending.arrived)return null;return {from:p.from,to:p.dest,days:p.days,fee:p.fee,event:pending.event};}
 function execute(choice,tag){
  const j=choice.good,from=s.city,cashBefore=s.gold,dayBefore=totalDay();let quantity=0,cost=null;
  if(choice.quantity){$('qty'+j).value=choice.quantity;const old=ship().cargo[j]||0;trade(j,1);quantity=(ship().cargo[j]||0)-old;cost=ship().costs[j];if(quantity!==choice.quantity)throw Error('purchase rejected');}
  const trip=sail(choice.city);if(!trip)throw Error('planned journey rejected');
  const have=j==null?0:ship().cargo[j]||0,price=j==null?null:s.markets[s.city][j].price;
  let sold=0;if(have){$('qty'+j).value=have;trade(j,-1);sold=have-(ship().cargo[j]||0);}
  const tradeProfit=sold&&cost!=null?sold*(price-cost):0,lossCost=(quantity-sold)*(cost??0);
  const row={phase:tag,from,to:s.city,dayBefore,dayAfter:totalDay(),good:j,quantity,sold,purchasePrice:cost,salePrice:price,tradeProfit,cargoLossCost:lossCost,fee:trip.fee,trip,cashBefore,cashAfter:s.gold,netResult:tradeProfit-lossCost-trip.fee,...snapshot()};
  if(Math.abs((s.gold-cashBefore)-row.netResult)>1e-7)throw Error('trade cash reconciliation failed');
  history.push(row);return row;
 }
 function badCandidates(){const fee=[4,6,9][ship().type],out=[];for(let c=0;c<CITIES.length;c++)if(c!==s.city)for(let j=0;j<GOODS.length;j++){
   const local=s.markets[s.city][j],target=s.markets[c][j].price;if(local.stock<1||target>=local.price*.9)continue;
   const n=Math.min(local.stock,capacity()-load(),Math.floor(Math.max(0,s.gold-fee)/local.price),Math.max(1,Math.floor(s.gold*.70/local.price)));
   out.push({city:c,good:j,quantity:Math.max(0,n),minimum:local.price+fee,expectedLoss:Math.max(0,n)*(local.price-target)});
 }return out.sort((a,b)=>b.expectedLoss-a.expectedLoss||a.city-b.city||a.good-b.good);}
 for(let attempt=0;attempt<limits.lossAttempts&&lossCount<targetLosses;attempt++){
  let options=badCandidates(),choice=options.find(x=>x.quantity>0);
  if(!choice&&options.length){finance(Math.min(...options.map(x=>x.minimum)));options=badCandidates();choice=options.find(x=>x.quantity>0);}
  if(!choice){reason=options.length?'loss_purchase_unaffordable':'no_observed_loss_opportunity';break;}
  const row=execute(choice,'loss');row.counted=row.quantity>0&&row.sold>0&&row.from!==row.to&&row.tradeProfit<0;
  if(row.counted)lossCount++;row.countedLosses=lossCount;lossTrades.push(row);
 }
 const lossEnd=snapshot(),lossStatus=lossCount===targetLosses?'completed':reason||'loss_attempt_limit';
 phase='recovery';const recoveryStart=totalDay();reason=null;
 for(let k=0;k<limits.recoveryDecisions&&totalDay()-recoveryStart<limits.recoveryDays;k++){
  if(lossTrades.length>0&&netWorth()>=start.wealth){recovered=true;recoveryAt={decision:k,days:totalDay()-recoveryStart,...snapshot()};break;}
  const fee=[4,6,9][ship().type];if(!finance(fee)){reason='insufficient_travel_cash';break;}
  observe();const q=ship(),view={gold:s.gold,day:totalDay(),space:capacity()-load(),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:{},destinations:[]};
  for(const [city,e]of Object.entries(s.journal))view.journal[city]={day:e.year*360+e.day,prices:[...e.prices]};
  for(let c=0;c<CITIES.length;c++)if(c!==s.city)view.destinations.push({city:c,days:routeTravelDays(s.city,c,q.speed*(.65+.35*q.condition/100)),fee});
  const choice=planObserved('normal',view);if(!choice){reason='planner_failure_with_travel_cash';break;}
  const row=execute(choice,'recovery');row.requiredReserve=choice.reserve;row.kind=choice.kind;recoveryTrades.push(row);
 }
 if(!recovered&&lossTrades.length>0&&netWorth()>=start.wealth){recovered=true;recoveryAt={decision:recoveryTrades.length,days:totalDay()-recoveryStart,...snapshot()};}
 const final=snapshot(),stopReason=recovered?'start_wealth_regained':reason||(totalDay()-recoveryStart>=limits.recoveryDays?'recovery_day_limit':'recovery_decision_limit');
 return {targetLosses,lossCount,lossStatus,start,lossEnd,final,recovered,recoveryAt,stopReason,shipStranded:stopReason==='insufficient_travel_cash'&&final.shipValue>0,lossTrades,recoveryTrades,bankActions};
}
