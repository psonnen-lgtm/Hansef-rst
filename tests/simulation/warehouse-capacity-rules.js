// These functions are copied verbatim into the playable HTML. Tests verify equality.
const WAREHOUSE_RULES=Object.freeze({base:150,step:100,maxBlocks:2,fee:1});
function freshStorage(){return {version:1,rentals:Array.from({length:CITY_COUNT},()=>({blocks:0,until:0}))}}
function warehouseUsed(city=s.city){return Object.values(s.warehouses[city].cargo).reduce((sum,n)=>sum+n,0)}
function warehouseCapacity(city=s.city){return WAREHOUSE_RULES.base+s.storage.rentals[city].blocks*WAREHOUSE_RULES.step}
function validateStorage(x){
 const a=x.storage,now=x.year*360+x.day;
 if(!a||Array.isArray(a)||a.version!==1||Object.keys(a).some(k=>!['version','rentals'].includes(k))||!Array.isArray(a.rentals)||a.rentals.length!==CITY_COUNT)throw Error('Ungültige Lagerversion');
 for(const r of a.rentals)if(!r||Array.isArray(r)||Object.keys(r).length!==2||!Object.hasOwn(r,'blocks')||!Object.hasOwn(r,'until')||!Number.isInteger(r.blocks)||r.blocks<0||r.blocks>WAREHOUSE_RULES.maxBlocks||!Number.isSafeInteger(r.until)||(r.blocks?r.until!==now+1:r.until!==0))throw Error('Ungültige Lagermiete');
}
function migrateStorage(raw){
 try{if(raw?.v===8){const x=JSON.parse(JSON.stringify(raw));validate(x);return x}
 const x=migrateRegionalEconomy(raw);if(!x||Object.hasOwn(x,'storage'))return null;x.v=8;x.storage=freshStorage();validate(x);return x}catch(e){return null}
}
function backupStorageMigration(raw,imported=false,force=false){
 if(!force&&JSON.parse(raw).v===8)return;
 const base=KEY+'-storage-v8-'+(imported?'import':'startup')+'-backup';
 for(let i=0;i<100;i++){const key=base+(i?'-'+(i+1):''),existing=localStorage.getItem(key);if(existing===raw)return;if(existing===null){localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('Originalsicherung fehlgeschlagen');return}}
 throw Error('Keine freie Originalsicherung. Bitte Sicherungen exportieren.');
}
let warehouseRentBusy=false;
function changeWarehouseRent(blocks){
 if(warehouseRentBusy||!s||!isCityIndex(s.city)||!Number.isInteger(blocks)||blocks<0||blocks>WAREHOUSE_RULES.maxBlocks)return false;
 const r=s.storage.rentals[s.city];if(blocks===r.blocks)return true;
 if(warehouseUsed()>WAREHOUSE_RULES.base+blocks*WAREHOUSE_RULES.step){notice('Bitte erst Waren auslagern, bis sie in die kleinere Lagerfläche passen.');return false}
 const cost=Math.max(0,blocks-r.blocks)*WAREHOUSE_RULES.fee;
 if(s.gold<cost){notice('Für die erste Tagesmiete fehlt Bargeld. Bankguthaben und Kredite bleiben unberührt.');return false}
 const expected=JSON.stringify(s);
 if(blocks>r.blocks){let accepted=false;warehouseRentBusy=true;try{accepted=confirm('Zusatzfläche: '+(blocks*WAREHOUSE_RULES.step)+' Fass. Tagesmiete: '+(blocks*WAREHOUSE_RULES.fee)+' G, davon jetzt '+cost+' G für den restlichen Miettag. Automatische tägliche Verlängerung nur bei genügend Bargeld. Bei Geldmangel endet die Zusatzfläche; Waren bleiben, übervolle Lager nehmen nichts Neues an. Anmieten?')}finally{warehouseRentBusy=false}if(!accepted)return false;if(JSON.stringify(s)!==expected){notice('Die Partie hat sich geändert. Bitte die Lagerfläche erneut prüfen.');return false}}
 const previous=s,candidate=JSON.parse(JSON.stringify(s)),next=candidate.storage.rentals[s.city];
 candidate.gold-=cost;next.blocks=blocks;next.until=blocks?(r.blocks?r.until:totalDay()+1):0;
 try{validate(candidate);localStorage.setItem(KEY,JSON.stringify(candidate))}catch(e){notice('Lageränderung nicht gespeichert. Gold und Mietfläche bleiben unverändert. Bitte Speicher prüfen.');return false}
 s=candidate;Testlog.event('warehouse_rent_change',{city:s.city,from:previous.storage.rentals[s.city].blocks,blocks,cost});render();warehouseView();return true;
}
function warehouseRentDay(){
 const now=totalDay();
 for(let city=0;city<CITY_COUNT;city++){const r=s.storage.rentals[city];if(!r.blocks||now<r.until)continue;
 const cost=r.blocks*WAREHOUSE_RULES.fee;
 if(s.gold>=cost){s.gold-=cost;r.until=now+1;Testlog.event('warehouse_rent',{city,blocks:r.blocks,cost,day:now})}
 else{const blocks=r.blocks;r.blocks=0;r.until=0;s.messages.unshift('Tag '+s.day+': Zusatzlager in '+CITIES[city]+' beendet: Tagesmiete '+cost+' G nicht verfügbar. Alle Waren bleiben erhalten; über der Grundkapazität ist Einlagern gesperrt.');s.messages=s.messages.slice(0,40);Testlog.event('warehouse_suspended',{city,blocks,quantity:warehouseUsed(city),day:now})}
 }
}
function warehouseCapacityPanel(){
 const used=warehouseUsed(),r=s.storage.rentals[s.city],total=warehouseCapacity(),free=Math.max(0,total-used),overflow=Math.max(0,used-total);
 return `<div class="item warehouse-capacity"><h3>Dein Lagerraum</h3><p><b>${used} / ${total} Fass</b> belegt · <b>${free} Fass frei</b><br>Grundlager: ${WAREHOUSE_RULES.base} Fass kostenlos · Zusatzfläche: ${r.blocks*WAREHOUSE_RULES.step} Fass<br>Tagesmiete hier: <b>${r.blocks*WAREHOUSE_RULES.fee} G</b> · alle Städte: <b>${s.storage.rentals.reduce((n,r)=>n+r.blocks*WAREHOUSE_RULES.fee,0)} G</b> pro Spieltag.</p>${overflow?`<p class="notice">${overflow} Fass über der aktuellen Grenze bleiben vollständig erhalten. Du kannst Waren aufs Schiff laden; neue Einlagerungen sind erst innerhalb der Grenze möglich. Für Altbestände entsteht keine rückwirkende Miete.</p>`:''}<p class="muted">Bis zu ${WAREHOUSE_RULES.maxBlocks} Zusatzstufen zu je ${WAREHOUSE_RULES.step} Fass und ${WAREHOUSE_RULES.fee} G pro Tag. Erster Tag im Voraus; danach automatische Verlängerung täglich, auch auf See. Ohne genügend Bargeld endet die Zusatzfläche ohne Schulden und ohne Warenverlust. Ein übervolles Restlager bleibt gesperrt für neue Ware. Bereits bezahlte Tage werden nicht erstattet; verkleinern erst, wenn die Ware hineinpasst.</p><div class="actions">${Array.from({length:WAREHOUSE_RULES.maxBlocks+1},(_,blocks)=>`<button ${blocks===r.blocks?'disabled':''} onclick="changeWarehouseRent(${blocks})">${blocks?'+'+blocks*WAREHOUSE_RULES.step+' Fass · '+blocks*WAREHOUSE_RULES.fee+' G/Tag':'Nur Grundlager · 0 G/Tag'}</button>`).join('')}</div></div>`;
}
