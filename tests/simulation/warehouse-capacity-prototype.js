// Test-only candidate: uses the existing warehouses and FIFO transfer function.
// No installation happens merely by loading this file.
function installWarehouseCandidate(base,fee){
 const originalTransfer=warehouseTransfer,originalAdvance=advance;
 const rentals=Array.from({length:11},()=>({blocks:0,until:0}));
 const used=c=>Object.values(s.warehouses[c].cargo).reduce((a,n)=>a+n,0);
 const capacityAt=c=>base+rentals[c].blocks*100;
 globalThis.storageCandidate={base,fee,rentals,used,capacity:capacityAt,
  rent(blocks){const c=s.city,r=rentals[c];if(!Number.isInteger(blocks)||blocks<0||blocks>2||used(c)>base+blocks*100)return false;if(blocks===r.blocks)return true;const cost=Math.max(0,blocks-r.blocks)*fee;if(s.gold<cost)return false;const wasActive=r.blocks>0;s.gold-=cost;if(cost)Testlog.event('warehouse_rent',{city:c,cost,blocks,reason:'begin'});r.blocks=blocks;if(!blocks)r.until=0;else if(!wasActive)r.until=totalDay()+1;return true}
 };
 warehouseTransfer=(j,dir)=>dir===1&&used(s.city)+Number($('warehouseQty'+j).value)>capacityAt(s.city)?false:originalTransfer(j,dir);
 advance=days=>{for(let d=0;d<days;d++){originalAdvance(1);for(let c=0;c<11;c++){const r=rentals[c];if(r.blocks&&totalDay()>=r.until){const cost=r.blocks*fee;if(s.gold>=cost){s.gold-=cost;r.until=totalDay()+1;Testlog.event('warehouse_rent',{city:c,cost,blocks:r.blocks,reason:'renew'})}else{Testlog.event('warehouse_suspended',{city:c,quantity:used(c),blocks:r.blocks});r.blocks=0;r.until=0}}}}};
}
