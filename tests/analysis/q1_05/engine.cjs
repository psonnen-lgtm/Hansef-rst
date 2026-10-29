'use strict';
// Native economy; small local-convoy adapter, no remote oracle, no production edits.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..');process.env.HANSE_GAME=root+'/Hansefuerst_0_4.html';
const H=require('../../simulation/headless.cjs'),P=require('./policies.cjs'),plan=require('./plan.json');assert.equal(H.hash,plan.productHash);
const clean=x=>JSON.parse(JSON.stringify(x)),hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const names=['trade','planTravel','arrive','advance','consumeOrigins','repairShip','bankOp','regionalPrice','regionalStock','creditLimit','promote'];
function run(spec,fee=0,timing=null){
 const sc=plan.scenarios.find(x=>x.id===spec.scenario);assert(sc);assert(plan.strategies.includes(spec.strategy));
 const g=H.create(spec.seed,null,{city:sc.city,player:'Ulf',name:'Economy Q1.05'}),origin=g.eval('totalDay()');
 if(!sc.nativeStart)g.eval(`s.gold=${sc.gold};s.ships=${JSON.stringify(sc.types)}.map((t,i)=>makeShip(t,{id:100+i,city:s.city}));s.active=0;validate(s)`);
 const state=()=>clean(g.eval('s')),events=g.events,initial=state(),native=()=>Object.fromEntries(names.map(n=>[n,hash(g.eval(n+'.toString()'))])),nativeBefore=native();
 const elapsed=()=>g.eval('totalDay()')-origin;
 const snapshots=[],voyages=[],decisions=[];const stress={losses:0,loadedAttempts:0};let paid=false,payment=null,recoveryStarted=null,stopReason='decision_limit';
 const net=()=>g.eval('s.gold+s.bank-s.debt');
 function metrics(){
  const s=state(),day=elapsed(),feeOwn=s.ships.reduce((n,q)=>n+[4,6,9][q.type],0),hulls=s.ships.length;
  assert(s.ships.every(q=>q.city===s.city),'adapter handles only one local fleet');
  const eligible=s.markets[s.city].filter(m=>m.stock>=10*hulls),basket=eligible.length?10*hulls*Math.min(...eligible.map(m=>m.price)):null;
  const allRoutes=clean(g.eval('CITIES.map((_,city)=>city).filter(city=>city!==s.city).map(city=>routeTravelDays(s.city,city,Math.min(...s.ships.map(q=>q.speed*(.65+.35*q.condition/100)))))'));
  const shortCycle=2*Math.min(...allRoutes),repairNow=s.ships.reduce((n,q)=>n+Math.ceil((100-q.condition)*8),0),futureInterest=s.debt*Math.expm1(Math.log1p(.06)*shortCycle/360),rentalRate=s.storage.rentals.reduce((n,r)=>n+r.blocks,0),rentArrears=s.storage.rentals.reduce((n,r)=>n+r.arrears,0);
  const reserve=basket===null?null:basket+feeOwn*2+80*hulls+repairNow+s.debt+futureInterest+rentalRate*shortCycle+rentArrears;
  const bad=spec.strategy==='poor_then_normal'&&stress.losses<2&&stress.loadedAttempts<6&&day<30;
  const [fraction,floor]=({cautious:[.55,800],normal:[.25,300],aggressive:[.05,40],optimized_observed:[.15,300],poor_then_normal:bad?[0,100]:[.25,300]})[spec.strategy];
  const required=reserve===null?null:Math.max(reserve+floor,reserve/(1-fraction));
  return {day,gold:s.gold,bank:s.bank,debt:s.debt,netCash:s.gold+s.bank-s.debt,earnedNetCash:s.gold+s.bank-s.debt-initial.gold+(paid?fee:0),wealth:g.eval('netWorth()'),cargoBook:g.eval('cargoWorth()'),warehouseBook:g.eval('warehouseWorth()'),cargoUnits:g.eval('s.ships.reduce((n,q)=>n+load(q),0)'),shipBook:g.eval('s.ships.reduce((n,q)=>n+SHIPTYPES[q.type].cost*(.45+.35*q.condition/100),0)'),shipSaleOffers:clean(g.eval('s.ships.map(shipSaleValue)')),conditions:s.ships.map(q=>q.condition),shipCount:hulls,city:s.city,reserve,reserveParts:{basket10PerHull:basket,twoFees:feeOwn*2,futureStormRepair:80*hulls,currentRepair:repairNow,principalBuffer:s.debt,shortCycleInterest:futureInterest,committedRental:rentalRate*shortCycle+rentArrears},policyReserve:{fraction,floor},requiredCash:required,freeCash:required===null?null:s.gold-required,rank:s.rank,rep:s.rep,paid,losses:stress.losses};
 }
 function established(m){const loaded=voyages.filter(v=>v.bought>=plan.milestone.meaningfulLoadedUnits),last=loaded.slice(-3);return loaded.length>=4&&m.earnedNetCash>0&&last.length===3&&last.reduce((n,v)=>n+v.netOperating,0)>0&&last.filter(v=>v.netOperating>0).length>=2&&last.every(v=>v.closing.freeCash!==null&&v.closing.freeCash>=0)&&m.freeCash!==null&&m.freeCash>=0;}
 function sell(){for(let i=0;i<state().ships.length;i++){g.eval(`s.active=${i}`);for(const [j,n]of Object.entries(state().ships[i].cargo)){if(!n)continue;const at=events.length;g.eval(`$('qty${j}').value='${n}';trade(${j},-1);validate(s)`);const sale=events.slice(at).find(e=>e.type==='sell');assert(sale,'native sale');if(sale.profit<0)stress.losses++;}}g.eval('s.active=0');}
 if(spec.strategy==='aggressive'){g.eval("$('loan').value='1500';bankOp('borrow');validate(s)");assert.equal(g.eval('s.debt'),1500);}
 for(let cycle=0;cycle<plan.maximumDecisionCycles;cycle++){
  const day=elapsed();if(spec.strategy==='poor_then_normal'&&recoveryStarted===null&&(stress.losses>=2||stress.loadedAttempts>=6||day>=30))recoveryStarted=day;
  let m=metrics();m.established=established(m);snapshots.push({...m,phase:'checkpoint'});
  if(fee&&!paid&&day<=plan.feeSearchDays&&m.gold>=fee&&(timing==='nominal'||(timing==='stabilized'&&m.established&&m.requiredCash!==null&&m.gold-fee>=m.requiredCash))){
   const pre=m;g.eval(`s.gold-=${fee};Testlog.event('hypothetical_guild_payment',{amount:${fee},elapsed:${day}});validate(s)`);paid=true;m=metrics();m.established=established(m);payment={day,pre,post:m,voyagesBefore:voyages.length,meaningfulBefore:voyages.filter(v=>v.bought>=10).length};snapshots.push({...m,phase:'post_payment'});
  }
  const postCount=payment?voyages.length-payment.voyagesBefore:0;
  if(paid&&day-payment.day>=plan.continuationDays&&postCount>=plan.continuationVoyages){stopReason='post_payment_horizon';break;}
  const horizon=fee?(paid?plan.absoluteFeeDays:plan.feeSearchDays):plan.maximumDays;
  if(day>=horizon){stopReason=fee&&!paid?'payment_unreached_censored':'day_limit';break;}
  const cycleStartNet=net(),eventStart=events.length;
  if(m.reserve!==null&&m.gold>=m.reserve){for(let i=0;i<state().ships.length;i++)if(state().ships[i].condition<70)g.eval(`s.active=${i};repairShip();validate(s)`);g.eval('s.active=0');}
  const s=state(),view={gold:s.gold,day:g.eval('totalDay()'),elapsed:day,space:g.eval('s.ships.reduce((n,q)=>n+capacity(q)-load(q),0)'),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:{},destinations:[]};
  for(const [city,k]of Object.entries(s.journal))view.journal[city]={day:k.year*360+k.day,prices:[...k.prices]};
  view.destinations=clean(g.eval('CITIES.map((_,city)=>city).filter(city=>city!==s.city).map(city=>({city,days:routeTravelDays(s.city,city,Math.min(...s.ships.map(q=>q.speed*(.65+.35*q.condition/100)))),fee:s.ships.reduce((n,q)=>n+[4,6,9][q.type],0)}))')).filter(d=>d.days<=horizon-day);
  if(!view.destinations.length){stopReason=fee&&!paid?'payment_unreached_censored':'horizon_no_fitting_route';break;}
  const vh=hash(view),choice=P.choose(spec.strategy,view,stress);assert.equal(hash(view),vh);if(!choice){stopReason='insufficient_travel_cash';break;}
  assert(view.destinations.some(d=>d.city===choice.city));if(choice.good!==null&&choice.good!==undefined){assert(view.journal[choice.city]);assert.equal(choice.quote,view.journal[choice.city].prices[choice.good]);}
  const before=metrics();let bought=0,remaining=choice.quantity||0;
  for(let i=0;i<s.ships.length&&remaining>0;i++){
   g.eval(`s.active=${i}`);const n=Math.min(remaining,g.eval('capacity(ship())-load(ship())'));if(n<=0)continue;
   const at=events.length;g.eval(`$('qty${choice.good}').value='${n}';trade(${choice.good},1);validate(s)`);const buy=events.slice(at).find(e=>e.type==='buy');assert(buy,'native buy');bought+=buy.quantity;remaining-=buy.quantity;
  }g.eval('s.active=0');assert.equal(remaining,0,'requested goods allocated over real hulls');
  if(spec.strategy==='poor_then_normal'&&choice.kind==='deliberate_observed_adverse'&&bought)stress.loadedAttempts++;
  const afterBuy=metrics(),at=events.length;g.eval(`pending=null;planTravel(${choice.city},${s.ships.length>1})`);const pending=clean(g.eval('pending'));assert(pending,'native departure');assert.equal(pending.qs.length,s.ships.length);assert.equal(pending.days,view.destinations.find(d=>d.city===choice.city).days);assert.equal(pending.fee,view.destinations.find(d=>d.city===choice.city).fee);
  g.eval('arrive();validate(s)');const arrival=events.slice(at).find(e=>e.type==='travel');assert(arrival);assert.equal(g.eval('s.city'),choice.city);sell();
  const closing=metrics(),cycleEvents=events.slice(eventStart),sales=cycleEvents.filter(e=>e.type==='sell');
  voyages.push({cycle,from:s.city,to:choice.city,startDay:day,endDay:elapsed(),bought,sold:sales.reduce((n,e)=>n+e.quantity,0),realisedProfit:sales.reduce((n,e)=>n+e.profit,0),netOperating:net()-cycleStartNet,closing,eventStart,eventEnd:events.length});
  decisions.push({cycle,view,choice,bought,before,afterBuy,closing,days:pending.days,fee:pending.fee,event:arrival.event});
 }
 const end=metrics();end.established=established(end);if(hash(end)!==hash(snapshots.at(-1)))snapshots.push({...end,phase:'end'});const final=state();assert.deepEqual(native(),nativeBefore);
 const sum=(type,key,f=()=>true)=>events.filter(e=>e.type===type&&f(e)).reduce((n,e)=>n+(e[key]??0),0),borrowed=sum('bank','amount',e=>e.operation==='borrow'),feeTotal=sum('travel','fee'),repair=sum('repair','cost'),sales=sum('sell','total'),buys=sum('buy','total'),profit=sum('sell','profit'),interest=sum('interest','debtInterest'),lossCost=events.filter(e=>e.type==='pirate_loss').reduce((n,e)=>n+e.quantity*(e.averageCost??0),0),hypo=sum('hypothetical_guild_payment','amount');
 assert(Math.abs(final.gold-(initial.gold+sales-buys+borrowed-feeTotal-repair-hypo))<1e-6,'cash ledger');assert(Math.abs(final.debt-(borrowed+interest))<1e-6,'debt ledger');assert(Math.abs((final.gold-final.debt-initial.gold)-(profit-feeTotal-repair-interest-lossCost-hypo))<1e-6,'realised net ledger');assert.equal(end.cargoUnits,0);assert.equal(end.warehouseBook,0);assert.equal(end.rank,0);assert.equal(events.filter(e=>e.type==='hypothetical_guild_payment').length,paid?1:0);
 return {spec,fee,timing,scenario:sc,origin,initial,final,days:end.day,stopReason,snapshots,voyages,decisions,events,paid,payment,recoveryStarted,stress,ledgers:{sales,buys,profit,feeTotal,repair,interest,borrowed,lossCost,hypotheticalFee:hypo,cashValid:true,debtValid:true,netCashValid:true},nativeBefore,nativeFunctionsUnchanged:true,information:'local market, own dated journal, known routes only; planner has no game globals'};
}
function creditProbe(){const g=H.create(10111,null,{city:0,player:'Ulf',name:'Credit boundary Q1.05'});const before=clean(g.eval('({gold:s.gold,debt:s.debt,wealth:netWorth(),limit:creditLimit(),day:totalDay()})'));g.eval(`$('loan').value='${before.limit}';bankOp('borrow');validate(s)`);const after=clean(g.eval('({gold:s.gold,debt:s.debt,wealth:netWorth(),limit:creditLimit(),day:totalDay()})'));g.eval("$('loan').value='1';bankOp('borrow');validate(s)");assert.equal(g.eval('s.gold'),after.gold);assert.equal(before.day,after.day);assert.equal(before.wealth,after.wealth);assert.equal(after.gold,before.gold+before.limit);return {seed:10111,before,after,additionalOneRejected:true,events:g.events};}
module.exports={run,hash,plan,creditProbe};
