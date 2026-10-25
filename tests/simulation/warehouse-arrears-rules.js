// V9 rental arrears rules, copied verbatim into the playable HTML and checked by tests.
const WAREHOUSE_RULES=Object.freeze({base:150,step:100,maxBlocks:2,fee:1});
function freshStorage(now=1350*360+1){return {version:2,since:now,rentals:Array.from({length:CITY_COUNT},()=>({blocks:0,until:0,arrears:0}))}}
function warehouseRequired(city=s.city,x=s){const used=Object.values(x.warehouses[city].cargo).reduce((n,q)=>n+q,0);return used>WAREHOUSE_RULES.base+WAREHOUSE_RULES.maxBlocks*WAREHOUSE_RULES.step?0:Math.max(0,Math.ceil((used-WAREHOUSE_RULES.base)/WAREHOUSE_RULES.step))}
function warehouseArrears(){return s.storage.rentals.reduce((sum,r)=>sum+r.arrears,0)}
function warehouseUsed(city=s.city){return Object.values(s.warehouses[city].cargo).reduce((sum,n)=>sum+n,0)}
function warehouseCapacityLimit(){return WAREHOUSE_RULES.base+WAREHOUSE_RULES.step*WAREHOUSE_RULES.maxBlocks}
function warehouseCapacity(city=s.city){return WAREHOUSE_RULES.base+s.storage.rentals[city].blocks*WAREHOUSE_RULES.step}
function validateStorageV8(x){
 const a=x.storage,now=x.year*360+x.day;
 if(!a||Array.isArray(a)||a.version!==1||Object.keys(a).some(k=>!['version','rentals'].includes(k))||!Array.isArray(a.rentals)||a.rentals.length!==CITY_COUNT)throw Error('Ungültige Lagerversion');
 for(const r of a.rentals)if(!r||Array.isArray(r)||Object.keys(r).length!==2||!Object.hasOwn(r,'blocks')||!Object.hasOwn(r,'until')||!Number.isInteger(r.blocks)||r.blocks<0||r.blocks>WAREHOUSE_RULES.maxBlocks||!Number.isSafeInteger(r.until)||(r.blocks?r.until!==now+1:r.until!==0))throw Error('Ungültige Lagermiete');
}
function validateStorage(x){
 const a=x.storage,now=x.year*360+x.day;
 if(!a||Array.isArray(a)||a.version!==2||Object.keys(a).length!==3||!Object.hasOwn(a,'since')||!Number.isSafeInteger(a.since)||a.since<0||a.since>now||!Array.isArray(a.rentals)||a.rentals.length!==CITY_COUNT)throw Error('Ungültige Lagerversion');
 for(let city=0;city<CITY_COUNT;city++){const r=a.rentals[city];if(!r||Array.isArray(r)||Object.keys(r).length!==3||!['blocks','until','arrears'].every(k=>Object.hasOwn(r,k))||!Number.isInteger(r.blocks)||r.blocks<0||r.blocks>WAREHOUSE_RULES.maxBlocks||!Number.isSafeInteger(r.arrears)||r.arrears<0||r.arrears>WAREHOUSE_RULES.maxBlocks*WAREHOUSE_RULES.fee*(now-a.since)||!Number.isSafeInteger(r.until)||((r.blocks||r.arrears||warehouseRequired(city,x))?r.until!==now+1:!([0,now+1].includes(r.until))))throw Error('Ungültige Lagermiete oder Mietschuld')}
}
function migrateStorage(raw){
 try{if(raw?.v===9){const x=JSON.parse(JSON.stringify(raw));validate(x);return x}
 let x;if(raw?.v===8){x=JSON.parse(JSON.stringify(raw));validate(x)}else{x=migrateRegionalEconomy(raw);if(!x||Object.hasOwn(x,'storage'))return null}
 const now=x.year*360+x.day,previous=x.storage;x.v=9;x.storage=freshStorage(now);
 if(previous)x.storage.rentals=previous.rentals.map((r,city)=>({...r,until:r.blocks?r.until:(warehouseRequired(city,x)?now+1:0),arrears:0}));
 else for(let city=0;city<CITY_COUNT;city++)if(warehouseRequired(city,x))x.storage.rentals[city].until=now+1;
 validate(x);return x}catch(e){return null}
}
function backupStorageMigration(raw,imported=false,force=false){
 if(!force&&JSON.parse(raw).v===9)return;
 const base=KEY+'-storage-v9-'+(imported?'import':'startup')+'-backup';
 for(let i=0;i<100;i++){const key=base+(i?'-'+(i+1):''),existing=localStorage.getItem(key);if(existing===raw)return;if(existing===null){localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('Originalsicherung fehlgeschlagen');return}}
 throw Error('Keine freie Originalsicherung. Bitte Sicherungen exportieren.');
}
let warehouseRentBusy=false;
function changeWarehouseRent(blocks){
 if(warehouseRentBusy||!s||!isCityIndex(s.city)||!Number.isInteger(blocks)||blocks<0||blocks>WAREHOUSE_RULES.maxBlocks)return false;
 const r=s.storage.rentals[s.city];if(blocks===r.blocks)return true;
 if(blocks>r.blocks&&warehouseArrears()>0){notice('Bitte zuerst alle offenen Lagermieten begleichen. Freiwillige Erweiterungen und zusätzliche Einlagerungen sind bis dahin in allen Städten gesperrt.');return false}
 if(warehouseUsed()<=warehouseCapacityLimit()&&warehouseUsed()>WAREHOUSE_RULES.base+blocks*WAREHOUSE_RULES.step){notice('Bitte erst Waren auslagern, bis sie in die kleinere Lagerfläche passen.');return false}
 const cost=Math.max(0,blocks-r.blocks)*WAREHOUSE_RULES.fee;
 if(s.gold<cost){notice('Für die erste Tagesmiete fehlt Bargeld. Bankguthaben und Kredite bleiben unberührt.');return false}
 const expected=JSON.stringify(s);
 if(blocks>r.blocks){let accepted=false;warehouseRentBusy=true;try{accepted=confirm('Zusatzfläche: '+(blocks*WAREHOUSE_RULES.step)+' Fass. Tagesmiete: '+(blocks*WAREHOUSE_RULES.fee)+' G, davon jetzt '+cost+' G für den restlichen Miettag. Automatische tägliche Verlängerung nur bei genügend Bargeld. Bei Geldmangel endet unnötige Zusatzfläche; benötigte Fläche verursacht Mietrückstände ohne Zinsen. Waren bleiben erhalten. Rückstände sperren Einlagerung und Erweiterung in allen Städten. Anmieten?')}finally{warehouseRentBusy=false}if(!accepted)return false;if(JSON.stringify(s)!==expected){notice('Die Partie hat sich geändert. Bitte die Lagerfläche erneut prüfen.');return false}}
 const previous=s,candidate=JSON.parse(JSON.stringify(s)),next=candidate.storage.rentals[s.city];
 candidate.gold-=cost;next.blocks=blocks;next.until=blocks?(r.blocks?r.until:totalDay()+1):(r.arrears?r.until:0);
 try{validate(candidate);localStorage.setItem(KEY,JSON.stringify(candidate))}catch(e){notice('Lageränderung nicht gespeichert. Gold und Mietfläche bleiben unverändert. Bitte Speicher prüfen.');return false}
 s=candidate;Testlog.event('warehouse_rent_change',{city:s.city,from:previous.storage.rentals[s.city].blocks,blocks,cost});render();warehouseView();return true;
}
function warehouseRentDay(){
 const now=totalDay();
 for(let city=0;city<CITY_COUNT;city++){const r=s.storage.rentals[city];if(now<r.until)continue;
 const required=warehouseRequired(city),oldBlocks=r.blocks;if(!r.blocks&&!required&&!r.arrears){r.until=0;continue}let blocks=r.arrears?required:Math.max(r.blocks,required);
 if(s.gold<blocks*WAREHOUSE_RULES.fee)blocks=required;
 const cost=blocks*WAREHOUSE_RULES.fee;r.blocks=blocks;r.until=now+1;
 if(cost&&s.gold>=cost){s.gold-=cost;Testlog.event('warehouse_rent',{city,blocks,cost,day:now})}
 else if(cost){r.arrears+=cost;Testlog.event('warehouse_arrears',{city,blocks,cost,arrears:r.arrears,day:now});if(r.arrears===cost){s.messages.unshift('Tag '+s.day+': Unbezahlte Lagermiete in '+CITIES[city]+'. Waren bleiben erhalten; Auslagern und Verkaufen bleiben möglich. Rückstände im örtlichen Mietbuch begleichen.');s.messages=s.messages.slice(0,40)}}
 if(oldBlocks>blocks)Testlog.event('warehouse_rent_reduced',{city,from:oldBlocks,blocks,day:now});
 }
}
function payWarehouseArrears(){
 if(warehouseRentBusy||!s||!isCityIndex(s.city))return false;
 const cost=s.storage.rentals[s.city].arrears;if(!cost)return false;
 if(s.gold<cost){notice('Für die vollständige Begleichung fehlen '+fmt(cost-s.gold)+' G Bargeld. Bankguthaben oder reguläre Kredite kannst du selbst im Bankhaus nutzen.');return false}
 const expected=JSON.stringify(s);let accepted=false;warehouseRentBusy=true;
 try{accepted=confirm('Alle '+fmt(cost)+' G Mietrückstände in '+CITIES[s.city]+' jetzt aus Bargeld begleichen? Laufende Tagesmiete bleibt bestehen.')}finally{warehouseRentBusy=false}
 if(!accepted||JSON.stringify(s)!==expected)return false;
 const candidate=JSON.parse(JSON.stringify(s));candidate.gold-=cost;candidate.storage.rentals[s.city].arrears=0;
 try{validate(candidate);localStorage.setItem(KEY,JSON.stringify(candidate))}catch(e){notice('Tilgung nicht gespeichert. Gold und Mietschuld bleiben unverändert. Bitte Speicher prüfen.');return false}
 s=candidate;Testlog.event('warehouse_arrears_paid',{city:s.city,cost});render();warehouseView();return true;
}
function warehouseCapacityPanel(){
 const used=warehouseUsed(),r=s.storage.rentals[s.city],required=warehouseRequired(),total=warehouseCapacity(),free=Math.max(0,total-used),overflow=Math.max(0,used-total),arrears=warehouseArrears(),rate=s.storage.rentals.reduce((sum,r,city)=>sum+Math.max(r.blocks,warehouseRequired(city))*WAREHOUSE_RULES.fee,0);
 return `<div class="item warehouse-capacity"><h3>Dein Lagerraum</h3><p><b>${used} / ${total} Fass</b> belegt · <b>${free} Fass frei</b><br>Grundlager: ${WAREHOUSE_RULES.base} Fass kostenlos · Zusatzfläche: ${r.blocks*WAREHOUSE_RULES.step} Fass<br>Benötigter Zusatzraum: <b>${required*WAREHOUSE_RULES.step} Fass</b> · Tagesmiete hier: <b>${Math.max(r.blocks,required)*WAREHOUSE_RULES.fee} G</b> · alle Städte: <b>${rate} G/Tag</b>.</p>${used>warehouseCapacityLimit()?'<p class="notice">Geschützter Altbestand über 350 Fass: keine erfundenen Zusatzstufen und keine rückwirkende Pflichtmiete. Auslagern bleibt möglich, Einlagern gesperrt. Ab höchstens 350 Fass gelten ab dem nächsten fälligen Tag die regulären Mietstufen.</p>':overflow?`<p class="notice">${overflow} Fass über der angemieteten Fläche bleiben erhalten. Ab dem nächsten fälligen Tag wird benötigte Zusatzfläche bezahlt oder als Mietschuld erfasst.</p>`:''}<div class="warehouse-rent-book"><h3>📖 Das Mietbuch des Lagermeisters</h3><p>Offene Miete hier: <b id="warehouseLocalArrears">${fmt(r.arrears)} G</b> · insgesamt: <b>${fmt(arrears)} G</b>.</p>${arrears?`<p class="notice">Bis zur vollständigen Begleichung sind neue Einlagerungen und freiwillige Erweiterungen in allen Städten gesperrt. Auslagern und regulärer Verkauf bleiben erlaubt.</p><p>Offene Mietbücher: ${s.storage.rentals.map((r,c)=>r.arrears?esc(CITIES[c])+': '+fmt(r.arrears)+' G':'').filter(Boolean).join(' · ')}.</p>`:''}<button id="payWarehouseArrears" onclick="payWarehouseArrears()" ${!r.arrears||s.gold<r.arrears?'disabled':''}>Örtliche Rückstände begleichen · ${fmt(r.arrears)} G</button><p class="muted">Vollständige Zahlung aus Bargeld, keine Teilzahlungen, Mietzinsen oder automatischen Bankkredite.</p></div><p class="muted">Bis zu zwei Zusatzstufen zu je 100 Fass und 1 G pro Tag. Erster Miettag im Voraus, danach täglich auch auf See. Bei Geldmangel endet unnötige Zusatzfläche; weiter benötigte Fläche verursacht Mietrückstände. Nach Auslagerung sinkt die nötige Fläche. Alte Rückstände bleiben, bis du sie bezahlst. Verkleinern erst, wenn die Waren hineinpassen; keine Erstattung bezahlter Tage.</p><div class="actions">${Array.from({length:WAREHOUSE_RULES.maxBlocks+1},(_,blocks)=>`<button ${blocks===r.blocks||(arrears&&blocks>r.blocks)?'disabled':''} onclick="changeWarehouseRent(${blocks})">${blocks?'+'+blocks*WAREHOUSE_RULES.step+' Fass · '+blocks*WAREHOUSE_RULES.fee+' G/Tag':'Nur Grundlager · 0 G/Tag'}</button>`).join('')}</div></div>`;
}
