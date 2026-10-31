// Storage decisions use only current local quotes, own cargo and own stored lots.
// This driver is not injected into the playable game.
function installWarehouseStrategy(id,api){
 const p={none:{target:0,fraction:0,reserve:300,hold:0},occasional:{target:60,fraction:.12,reserve:900,hold:90},regional:{target:220,fraction:.30,reserve:500,hold:180},bulk:{target:400,fraction:.60,reserve:200,hold:360},stress:{target:400,fraction:.96,reserve:6,hold:720}}[id];
 if(!p)throw Error('unknown storage policy');
 const lots={},trace=[],old=planObserved;let maxStored=0,storageVisits=0;
 planObserved=(strategy,v)=>{
  const city=s.city;let w=s.warehouses[city],q=ship(),activity=false;
  for(const [good,n] of Object.entries({...w.cargo})){
   const j=+good,m=s.markets[city][j],entry=lots[city+':'+j]??{day:totalDay(),cost:w.costs[j]};
   if(m.price>=(entry.cost??m.price)*1.18||totalDay()-entry.day>=p.hold){
    const amount=Math.min(n,capacity(q)-load(q));if(amount){$('warehouseQty'+j).value=amount;if(warehouseTransfer(j,-1)){$('qty'+j).value=amount;trade(j,-1);activity=true;if(!w.cargo[j])delete lots[city+':'+j]}}
   }
  }
  if(p.target){
   const used=api.used(city),offer=s.markets[city].map((m,j)=>({j,...m,ratio:m.price/GOODS[j][2]})).filter(m=>m.stock>=140&&m.ratio<=.85).sort((a,b)=>a.ratio-b.ratio||a.j-b.j)[0];
   if(offer&&used<p.target){
    const blocks=Math.max(0,Math.min(2,Math.ceil((p.target-api.base)/100)));if(blocks&&api.rent)api.rent(blocks);w=s.warehouses[city];q=ship();
    const n=Math.max(0,Math.min(offer.stock,capacity(q)-load(q),p.target-used,api.capacity(city)-used,Math.floor(Math.min(s.gold*p.fraction,Math.max(0,s.gold-p.reserve))/offer.price)));
    if(n){$('qty'+offer.j).value=n;const before=q.cargo[offer.j]||0;trade(offer.j,1);const bought=(q.cargo[offer.j]||0)-before;if(bought){$('warehouseQty'+offer.j).value=bought;if(!warehouseTransfer(offer.j,1))throw Error('planned storage rejected');lots[city+':'+offer.j]??={day:totalDay(),cost:w.costs[offer.j]};trace.push({day:totalDay(),city,j:offer.j,n:bought,cost:offer.price});activity=true}}
   }
  }
  // A conscious return below the free limit ends rent; never rent empty unused space forever.
  if(api.rent&&api.used(city)<=api.base)api.rent(0);
  if(activity)storageVisits++;maxStored=Math.max(maxStored,...Array.from({length:11},(_,c)=>api.used(c)));
  v.gold=s.gold;v.space=capacity(q)-load(q);v.local=s.markets[city].map(m=>({price:m.price,stock:m.stock}));
  return old(strategy,v);
 };
 return ()=>({id,parameters:p,maxStored,storageVisits,trace,remaining:JSON.parse(JSON.stringify(s.warehouses))});
}
