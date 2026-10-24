// Separate, single-order strategy. All actions use the unchanged shipped game functions.
function assessDelivery(o){
 if(o.source===o.destination)return {ok:false,reason:'local_source'};
 if(o.now+o.travelDays>o.until)return {ok:false,reason:'deadline'};
 if(o.capacity<o.quantity)return {ok:false,reason:'capacity'};
 if(o.stock<o.quantity)return {ok:false,reason:'stock'};
 const purchase=o.quantity*o.buyPrice;
 if(o.gold<purchase+o.returnFee)return {ok:false,reason:'cash'};
 const expectedTradeProfit=o.quantity*(o.knownSalePrice-o.buyPrice);
 const expectedNet=expectedTradeProfit+o.reward-o.outboundFee-o.returnFee;
 if(expectedNet<=0)return {ok:false,reason:'unprofitable',expectedNet};
 return {ok:true,purchase,expectedTradeProfit,expectedNet};
}
function simulateDelivery(){
 const start=totalDay(),trace=[],moneyStart=s.gold;let fees=0,purchase=0,realisedTradeProfit=0,premium=0,cargoLossCost=0,source=null;
 const conservativeDays=(a,b)=>routeTravelDays(a,b,ship().speed*(.65+.35*.30));
 function result(status,reason,order=null){return {strategy:'delivery',status,reason,seedOrder:order,days:totalDay()-start,source,fees,purchase,realisedTradeProfit,premium,cargoLossCost,retainedCargoCost:Object.entries(ship().cargo).reduce((a,[j,n])=>a+n*(ship().costs[j]??0),0),cashDelta:s.gold-moneyStart,completed:s.completed,trace};}
 function travel(to){pending=null;planTravel(to);if(!pending)return false;const p={...pending},cargoBefore=Object.entries(ship().cargo).reduce((a,[j,n])=>a+n*(ship().costs[j]??0),0);arrive();cargoLossCost+=cargoBefore-Object.entries(ship().cargo).reduce((a,[j,n])=>a+n*(ship().costs[j]??0),0);if(s.city!==to||!pending.arrived)return false;fees+=p.fee;trace.push({action:'travel',from:p.from,to:p.dest,days:p.days,fee:p.fee,event:pending.event,day:totalDay()});return true;}
 // Opening the ordinary quest screen is the only way this strategy requests offers.
 questsView();const available=s.quests.filter(q=>q.until>=totalDay());
 const order=available.find(q=>q.city===s.city)||available[0];if(!order)return result('skipped','no_offer');
 const q={...order},destination=q.city;trace.push({action:'offer',...q,day:totalDay()});
 if(destination!==s.city)return result('skipped','destination_not_observed',q);
 const quote=s.journal[destination]?.prices[q.j];if(!Number.isFinite(quote))return result('skipped','no_sale_quote',q);
 const fee=[4,6,9][ship().type];
 // Unknown source prices are never read. A short, affordable observation trip precedes buying.
 const candidates=CITIES.map((_,city)=>city).filter(c=>c!==destination&&totalDay()+conservativeDays(s.city,c)+conservativeDays(c,destination)<=q.until).sort((a,b)=>DIST[s.city][a]-DIST[s.city][b]||a-b);
 if(!candidates.length)return result('skipped','no_reachable_source',q);
 if(s.gold<fee*2)return result('skipped','travel_cash',q);
 source=candidates[0];if(!travel(source))return result('failed','source_travel_rejected',q);
 const m=s.markets[s.city][q.j]; // now visible locally
 const assessment=assessDelivery({source,destination,now:totalDay(),until:q.until,travelDays:conservativeDays(source,destination),quantity:q.n,capacity:capacity()-load(),stock:m.stock,gold:s.gold,buyPrice:m.price,knownSalePrice:quote,reward:q.reward,outboundFee:fees,returnFee:fee});
 trace.push({action:'assessment',...assessment,sourcePrice:m.price,knownSalePrice:quote,requiredQuantity:q.n,day:totalDay()});
 if(!assessment.ok)return result('skipped',assessment.reason,q);
 const before=ship().cargo[q.j]||0;$('qty'+q.j).value=q.n;trade(q.j,1);const bought=(ship().cargo[q.j]||0)-before;
 purchase=bought*m.price;trace.push({action:'buy',city:s.city,good:q.j,quantity:bought,unitPrice:m.price,origins:JSON.parse(JSON.stringify(ship().origins[q.j]||[])),day:totalDay()});
 if(bought!==q.n)return result('failed','purchase_rejected',q);
 if(!travel(destination))return result('failed','delivery_travel_rejected',q);
 const have=ship().cargo[q.j]||0,origins=ship().origins[q.j]||[];
 const eligible=origins.reduce((a,lot)=>a+(lot.city!==null&&lot.city!==destination?lot.n:0),0);
 const valid=totalDay()<=q.until&&have>=q.n&&eligible>=q.n;
 // Sell the entire eligible shipment in ONE transaction; split sales cannot sum to a quest.
 const n=valid?q.n:have,completedBefore=s.completed,goldBefore=s.gold,cost=ship().costs[q.j],price=s.markets[s.city][q.j].price;
 if(n){$('qty'+q.j).value=n;trade(q.j,-1);realisedTradeProfit=n*(price-cost);premium=s.gold-goldBefore-n*price;}
 trace.push({action:'sell',city:s.city,good:q.j,quantity:n,eligible,unitPrice:price,realisedTradeProfit,premium,day:totalDay(),completedBefore,completedAfter:s.completed});
 if(s.completed===completedBefore+1&&premium===q.reward)return result('completed','regular_delivery',q);
 return result('failed',totalDay()>q.until?'expired':eligible<q.n?'insufficient_foreign_cargo':'reward_missing',q);
}
