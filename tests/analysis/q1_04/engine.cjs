'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..');process.env.HANSE_GAME=root+'/Hansefuerst_0_4.html';
const H=require('../../simulation/headless.cjs'),P=require('./policies.cjs'),plan=require('./plan.json');assert.equal(H.hash,plan.productHash);
const clean=x=>JSON.parse(JSON.stringify(x)),hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
function run(strategy,seed,fee=0){
 const g=H.create(seed,null,{city:0,player:'Ulf',name:'Economy Q1.04'}),origin=g.eval('totalDay()'),events=g.events;
 const native=()=>Object.fromEntries(['trade','planTravel','arrive','advance','consumeOrigins','repairShip','bankOp','regionalPrice','regionalStock','creditLimit','promote'].map(n=>[n,hash(g.eval(n+'.toString()'))]));
 const nativeBefore=native();const state=()=>clean(g.eval('s'));const initial=state();const snapshots=[],decisions=[];let paid=false,paymentDay=null,stopReason='decision_limit',stress={losses:0,loadedAttempts:0},recoveryStarted=null;
 const metrics=()=>{const s=state(),q=s.ships[s.active],day=g.eval('totalDay()')-origin;
  const quotes=s.markets[s.city],eligible=quotes.filter(m=>m.stock>=10),basket=eligible.length?10*Math.min(...eligible.map(m=>m.price)):null,feeOwn=[4,6,9][q.type],allRoutes=g.eval('CITIES.map((_,city)=>city).filter(city=>city!==s.city).map(city=>routeTravelDays(s.city,city,ship().speed*(.65+.35*ship().condition/100)))'),shortCycle=2*Math.min(...allRoutes),repairNow=Math.ceil((100-q.condition)*8),futureInterest=s.debt*Math.expm1(Math.log1p(.06)*shortCycle/360),rentalRate=s.storage.rentals.reduce((n,r)=>n+r.blocks,0),rentArrears=s.storage.rentals.reduce((n,r)=>n+r.arrears,0),reserve=basket===null?null:basket+feeOwn*2+80+repairNow+s.debt+futureInterest+rentalRate*shortCycle+rentArrears;
  return {day,gold:s.gold,bank:s.bank,debt:s.debt,netCash:s.gold+s.bank-s.debt,wealth:g.eval('netWorth()'),cargoBook:g.eval('cargoWorth()'),warehouseBook:g.eval('warehouseWorth()'),cargoUnits:g.eval('load(ship())'),shipBook:s.ships.reduce((n,q)=>n+6200*(.45+.35*q.condition/100),0),shipSaleOffer:g.eval('shipSaleValue(ship())'),shipCondition:q.condition,shipCount:s.ships.length,city:s.city,reserve,reserveParts:{basket10:basket,twoFees:feeOwn*2,futureOneStormRepair:80,currentRepair:repairNow,principalBuffer:s.debt,shortCycleInterest:futureInterest,committedRental:rentalRate*shortCycle+rentArrears},freeCash:reserve===null?null:s.gold-reserve,rank:s.rank,rep:s.rep,paid,losses:stress.losses};
 };
 function sell(){const q=state().ships[0];for(const [j,n]of Object.entries(q.cargo)){if(!n)continue;const start=events.length;g.eval(`$('qty${j}').value='${n}';trade(${j},-1);validate(s)`);const sale=events.slice(start).find(e=>e.type==='sell');assert(sale,'native sale');if(sale.profit<0)stress.losses++;}}
 for(let cycle=0;cycle<plan.maximumDecisionCycles;cycle++){
  sell();const elapsed=g.eval('totalDay()')-origin;
  if(strategy==='aggressive'&&cycle===0){g.eval("$('loan').value='1500';bankOp('borrow');validate(s)");assert.equal(g.eval('s.debt'),1500);}
  if(strategy==='poor_then_normal'&&recoveryStarted===null&&(stress.losses>=2||stress.loadedAttempts>=6||elapsed>=30))recoveryStarted=elapsed;
  let m=metrics();
  if(fee&&!paid&&m.freeCash!==null&&m.freeCash>=fee){g.eval(`s.gold-=${fee};Testlog.event('hypothetical_guild_payment',{amount:${fee},elapsed:${elapsed}});validate(s)`);paid=true;paymentDay=elapsed;m=metrics();}
  snapshots.push(m);
  if(elapsed>=plan.maximumDays){stopReason='day_limit';break;}
  if(m.shipCondition<70&&m.reserve!==null&&m.gold>=m.reserve){g.eval('repairShip();validate(s)');m=metrics();}
  const s=state(),q=s.ships[0],view={gold:s.gold,day:g.eval('totalDay()'),elapsed,space:g.eval('capacity(ship())-load(ship())'),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:{},destinations:[]};
  for(const [city,k]of Object.entries(s.journal))view.journal[city]={day:k.year*360+k.day,prices:[...k.prices]};
  const destinations=g.eval('CITIES.map((_,city)=>city).filter(city=>city!==s.city).map(city=>({city,days:routeTravelDays(s.city,city,ship().speed*(.65+.35*ship().condition/100)),fee:[4,6,9][ship().type]}))');
  view.destinations=clean(destinations).filter(d=>d.days<=plan.maximumDays-elapsed);
  if(!view.destinations.length){stopReason='horizon_no_fitting_route';break;}
  const viewHash=hash(view),choice=P.choose(strategy,view,stress);assert.equal(hash(view),viewHash);
  if(!choice){stopReason='insufficient_travel_cash';break;}
  assert(view.destinations.some(d=>d.city===choice.city));
  if(choice.good!==null&&choice.good!==undefined){assert(view.journal[choice.city],'only previously visited destination for loaded trade');assert.equal(choice.quote,view.journal[choice.city].prices[choice.good]);}
  const before=metrics();let bought=0;
  if(choice.quantity){const start=events.length;g.eval(`$('qty${choice.good}').value='${choice.quantity}';trade(${choice.good},1);validate(s)`);const buy=events.slice(start).find(e=>e.type==='buy');assert(buy,'native buy');bought=buy.quantity;if(strategy==='poor_then_normal'&&choice.kind==='deliberate_observed_adverse')stress.loadedAttempts++;}
  const afterBuy=metrics(),start=events.length;g.eval(`pending=null;planTravel(${choice.city},false)`);const pending=clean(g.eval('pending'));if(!pending){stopReason='departure_rejected';break;}
  assert.equal(pending.days,view.destinations.find(d=>d.city===choice.city).days);g.eval('arrive();validate(s)');const arrival=events.slice(start).find(e=>e.type==='travel');assert(arrival);assert.equal(g.eval('s.city'),choice.city);
  decisions.push({cycle,view,choice,bought,before,afterBuy,arrivalBeforeSale:metrics(),event:arrival.event,days:pending.days,fee:pending.fee});
 }
 sell();const end=metrics();if(!snapshots.length||JSON.stringify(end)!==JSON.stringify(snapshots.at(-1)))snapshots.push(end);const final=state();assert.deepEqual(native(),nativeBefore);
 const sum=(type,key,f=()=>true)=>events.filter(e=>e.type===type&&f(e)).reduce((n,e)=>n+(e[key]??0),0),bank=op=>sum('bank','amount',e=>e.operation===op),feeTotal=sum('travel','fee'),repair=sum('repair','cost'),sales=sum('sell','total'),buys=sum('buy','total'),profit=sum('sell','profit'),interest=sum('interest','debtInterest'),borrowed=bank('borrow'),lossCost=events.filter(e=>e.type==='pirate_loss').reduce((n,e)=>n+e.quantity*(e.averageCost??0),0),hypo=sum('hypothetical_guild_payment','amount');
 assert(Math.abs(final.gold-(initial.gold+sales-buys+borrowed-feeTotal-repair-hypo))<1e-6,'cash ledger');assert(Math.abs(final.debt-(borrowed+interest))<1e-6,'debt ledger');
 assert.equal(end.cargoUnits,0);assert.equal(end.warehouseBook,0);assert.equal(end.rank,0);assert(Math.abs((final.gold-final.debt-initial.gold)-(profit-feeTotal-repair-interest-lossCost-hypo))<1e-6,'net cash realised ledger');
 return {strategy,seed,fee,origin,initial,final,days:end.day,stopReason,snapshots,decisions,events,paid,paymentDay,recoveryStarted,stress,ledgers:{sales,buys,profit,feeTotal,repair,interest,borrowed,lossCost,hypotheticalFee:hypo,cashValid:true,debtValid:true,netCashValid:true},nativeFunctionsUnchanged:true,information:'only local market and own dated journal, planner VM has no game globals'};
}
module.exports={run,hash,plan};
