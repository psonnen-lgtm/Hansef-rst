// Shared production shipyard rules; tests require a verbatim copy in the HTML.
const SHIPBUILD_GOODS=Object.freeze([2,7,8,9]);
const SHIPBUILD_RECIPES=Object.freeze([{materials:[24,8,6,6],wage:2500,days:20},{materials:[44,14,12,12],wage:3700,days:35},{materials:[75,24,20,22],wage:6200,days:55}].map(r=>Object.freeze({...r,materials:Object.freeze(r.materials)})));
let shipyardBusy=false,shipyardStaging=false;
function freshShipyard(ships=[]){return {version:1,nextId:1,lastShipId:Math.ceil(Math.max(0,...ships.map(q=>q.id))),orders:[]}}
function shipyardWorth(){return (s.shipyard?.orders||[]).reduce((sum,o)=>sum+Math.min(o.wage+o.materialsBook,SHIPTYPES[o.type].cost*.8),0)}
function validateShipyard(x){
 const y=x.shipyard,now=x.year*360+x.day;
 if(!y||Array.isArray(y)||!([3,4].includes(Object.keys(y).length))||Object.keys(y).some(k=>!['version','nextId','lastShipId','orders'].includes(k))||(Object.hasOwn(y,'lastShipId')&&(!Number.isSafeInteger(y.lastShipId)||y.lastShipId<0))||y.version!==1||!Number.isSafeInteger(y.nextId)||y.nextId<1||!Array.isArray(y.orders)||y.orders.length>1||x.ships.length+y.orders.length>500)throw Error('Ungültiger Werftstand');
 for(const o of y.orders){const r=SHIPBUILD_RECIPES[o?.type];if(!o||Object.keys(o).length!==8||!['id','type','city','started','ready','shipId','materialsBook','wage'].every(k=>Object.hasOwn(o,k))||!r||!Number.isInteger(o.type)||!isCityIndex(o.city)||!Number.isSafeInteger(o.id)||o.id<1||o.id>=y.nextId||!Number.isSafeInteger(o.shipId)||o.shipId<1||(Object.hasOwn(y,'lastShipId')&&o.shipId>y.lastShipId)||x.ships.some(q=>q.id===o.shipId)||!Number.isSafeInteger(o.started)||o.started<0||o.started>now||o.ready!==o.started+r.days||o.ready>360000000||o.wage!==r.wage||!Number.isFinite(o.materialsBook)||o.materialsBook<0||o.materialsBook>1e15)throw Error('Ungültiger Bauauftrag')}
}
function migrateShipyard(raw){try{if(raw?.v===10){const x=JSON.parse(JSON.stringify(raw));validate(x);if(!Object.hasOwn(x.shipyard,'lastShipId'))x.shipyard.lastShipId=Math.ceil(Math.max(0,...x.ships.map(q=>q.id),...x.shipyard.orders.map(o=>o.shipId)));validate(x);return x}const x=migrateStorage(raw);if(!x||Object.hasOwn(x,'shipyard'))return null;x.v=10;x.shipyard=freshShipyard(x.ships);validate(x);return x}catch(e){return null}}
function backupShipyardMigration(raw,imported=false,force=false){
 if(!force&&JSON.parse(raw).v>=10&&Object.hasOwn(JSON.parse(raw).shipyard||{},'lastShipId'))return;
 const base=KEY+'-shipyard-v10-'+(imported?'import':'startup')+'-backup';
 for(let i=0;i<100;i++){const key=base+(i?'-'+(i+1):''),existing=localStorage.getItem(key);if(existing===raw)return;if(existing===null){localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('Originalsicherung fehlgeschlagen');return}}
 throw Error('Keine freie Originalsicherung. Bitte zuerst Sicherungen exportieren.');
}
function shipbuildingSources(x=s){return x.ships.map((q,index)=>({q,index,source:'ship',shipId:q.id})).filter(v=>v.q.city===x.city).sort((a,b)=>Number(b.index===x.active)-Number(a.index===x.active)).concat([{q:x.warehouses[x.city],source:'warehouse'}])}
function shipbuildingQuote(type){
 const r=SHIPBUILD_RECIPES[type];if(!s||!Number.isInteger(type)||!r)return {allowed:false,reason:'Ungültiger Schiffstyp.'};
 const rows=SHIPBUILD_GOODS.map((j,k)=>({j,n:r.materials[k],have:shipbuildingSources().reduce((n,v)=>n+(v.q.cargo[j]||0),0)}));let reason='';
 if(s.shipyard.orders.length)reason='Die Werftmeister betreuen für dich bereits einen Auftrag. Erst die Übergabe abwarten.';
 else if(warehouseArrears()>0)reason='Bitte zuerst alle offenen Lagermieten begleichen. Werftverbrauch darf die Mietschuldensperre nicht umgehen.';
 else if(s.ships.length>=500)reason='Für einen Neubau fehlt ein freier Flottenplatz.';
 else if(totalDay()+r.days>360000000)reason='Die Bauzeit überschreitet den gültigen Spielkalender.';
 else if(!Number.isSafeInteger(Math.ceil(Math.max(s.shipyard.lastShipId||0,...s.ships.map(q=>q.id)))+1)||s.shipyard.nextId>=Number.MAX_SAFE_INTEGER)reason='Keine sichere Schiffsnummer verfügbar.';
 else if(rows.some(m=>m.have<m.n))reason='Es fehlen örtlich verfügbare Baumaterialien. Eigene Schiffe und Lager in anderen Städten zählen nicht.';
 else if(s.gold<r.wage)reason='Für die Werftarbeit fehlen '+fmt(r.wage-s.gold)+' G Bargeld.';
 return {allowed:!reason,reason,rows,wage:r.wage,days:r.days};
}
function startShipbuilding(type){
 if(shipyardBusy)return false;const quote=shipbuildingQuote(type);if(!quote.allowed){notice(quote.reason);return false}
 const expected=JSON.stringify(s);shipyardBusy=true;let committed=false;
 try{if(!confirm(SHIPTYPES[type].name+' in '+CITIES[s.city]+' bauen? '+quote.rows.map(m=>m.n+' Fass '+GOODS[m.j][0]).join(', ')+'. Dazu '+quote.wage+' G Werftlohn, '+quote.days+' Spieltage Bauzeit. Alles wird jetzt einmalig bezahlt/verbraucht. Nicht abbrechbar; keine spätere Nachforderung. Reise- und Mietreserve selbst behalten.'))return false;
  if(JSON.stringify(s)!==expected||!shipbuildingQuote(type).allowed){notice('Die Partie hat sich geändert. Bitte den Auftrag neu prüfen.');return false}
  const candidate=JSON.parse(JSON.stringify(s)),consumed=[];let materialsBook=0;
  for(const m of quote.rows){let left=m.n;for(const source of shipbuildingSources(candidate)){if(!left)break;const q=source.q,n=Math.min(left,q.cargo[m.j]||0);if(!n)continue;ensureCargoRecords(q);const book=cargoBookPrice(q,m.j),cost=q.costs[m.j]??null,origins=[];let need=n;for(const lot of q.origins[m.j]){const count=Math.min(need,lot.n);if(count)origins.push({city:lot.city,n:count});need-=count;if(!need)break}if(need)throw Error('Fehlende Herkunft');consumeOrigins(q,m.j,n,null);q.cargo[m.j]-=n;if(!q.cargo[m.j])for(const key of ['cargo','costs','bookCosts','origins'])delete q[key]?.[m.j];materialsBook+=n*book;consumed.push({source:source.source,shipId:source.shipId??null,j:m.j,n,bookCost:book,knownCost:cost,origins});left-=n}if(left)throw Error('Fehlendes Material')}
  const rental=candidate.storage.rentals[candidate.city];if(warehouseRequired(candidate.city,candidate)>0&&!rental.until)rental.until=totalDay()+1;
  const order={id:candidate.shipyard.nextId++,type,city:s.city,started:totalDay(),ready:totalDay()+quote.days,shipId:Math.ceil(Math.max(s.shipyard.lastShipId||0,...s.ships.map(q=>q.id)))+1,materialsBook,wage:quote.wage};candidate.shipyard.lastShipId=order.shipId;candidate.gold-=quote.wage;candidate.shipyard.orders.push(order);candidate.messages.unshift('Tag '+candidate.day+': '+SHIPTYPES[type].name+' in '+CITIES[order.city]+' beauftragt: '+quote.days+' Spieltage Bauzeit.');candidate.messages=candidate.messages.slice(0,40);validate(candidate);localStorage.setItem(KEY,JSON.stringify(candidate));s=candidate;committed=true;
  const {type:shipType,...eventOrder}=order;Testlog.event('shipbuilding_started',{...eventOrder,shipType,materials:consumed});render();harborView();return true;
 }catch(e){if(!committed)notice('Bauauftrag nicht gespeichert. Gold, Waren und Flotte bleiben unverändert. Bitte Speicher und Materialdaten prüfen.');return committed}finally{shipyardBusy=false}
}
function completeShipbuilding(){
 const order=s?.shipyard?.orders[0];if(!order||order.ready>totalDay())return false;
 try{const candidate=JSON.parse(JSON.stringify(s)),q=makeShip(order.type,{id:order.shipId,city:order.city});q.name=SHIPTYPES[order.type].name+' · Werft '+order.id;candidate.ships.push(q);candidate.shipyard.orders=[];candidate.messages.unshift('Tag '+candidate.day+': Die '+q.name+' ist fertig und liegt in '+CITIES[order.city]+'.');candidate.messages=candidate.messages.slice(0,40);validate(candidate);if(!shipyardStaging)localStorage.setItem(KEY,JSON.stringify(candidate));
  // Preserve existing ship objects referenced by an in-progress arrival/convoy.
  s.ships.push(q);s.shipyard=candidate.shipyard;s.messages=candidate.messages;Testlog.event('shipbuilding_completed',{orderId:order.id,shipId:q.id,shipType:q.type,city:q.city,ready:order.ready,day:totalDay()});return true;
 }catch(e){return false}
}
function waitShipbuilding(){
 if(shipyardBusy||!s.shipyard.orders.length)return false;const order=s.shipyard.orders[0],days=Math.min(7,Math.max(0,order.ready-totalDay()));if(!days){completeShipbuilding();render();harborView();return true}
 const original=s,oldPending=pending,expected=JSON.stringify(s);let committed=false;shipyardBusy=true;
 try{if(!confirm(days+' Spieltage bei der Werft warten? Märkte, Zinsen, Mieten und Fristen laufen weiter. Eine Reise muss anschließend neu geplant werden.'))return false;if(JSON.stringify(s)!==expected)return false;
  const candidate=JSON.parse(JSON.stringify(s)),oldSave=save,oldEvent=Testlog.event,oldSnapshot=Testlog.snapshot,oldStaging=shipyardStaging,events=[];s=candidate;
  try{save=()=>{};Testlog.event=(type,details={})=>events.push({type,details});Testlog.snapshot=()=>{};shipyardStaging=true;advance(days);validate(s)}finally{save=oldSave;Testlog.event=oldEvent;Testlog.snapshot=oldSnapshot;shipyardStaging=oldStaging}
  localStorage.setItem(KEY,JSON.stringify(candidate));committed=true;pending=null;for(const e of events)oldEvent(e.type,e.details);Testlog.event('shipyard_wait',{days});render();harborView();return true;
 }catch(e){if(!committed){s=original;pending=oldPending;notice('Warten nicht gespeichert. Tage, Gold und Bauauftrag bleiben unverändert.')}return committed}finally{shipyardBusy=false}
}
function shipyardPanel(){
 const order=s.shipyard.orders[0];
 return `<div class="item shipyard-panel"><h3>⚒️ Auf der Helling</h3><p>„Bring Holz für den Rumpf, Hanf fürs Tauwerk, Pech zum Dichten und Eisenwaren für die Beschläge. Unsere Leute bauen dir ein Schiff.“</p>${order?`<div class="notice shipyard-order"><h3>📜 Bauauftrag ${order.id}: ${SHIPTYPES[order.type].name}</h3><p>Werft: <b>${CITIES[order.city]}</b> · noch <b>${Math.max(0,order.ready-totalDay())} Spieltage</b><br>Übergabe: Tag ${(order.ready-1)%360+1}, Jahr ${Math.floor((order.ready-1)/360)}.<br>Material und ${order.wage} G Werftlohn sind bezahlt. Kein Abbruch, keine Nachforderung.</p><button id="shipyardWait" onclick="waitShipbuilding()">${order.ready<=totalDay()?'Übergabe erneut versuchen':'Bis zu 7 Spieltage warten'}</button><p class="muted">Märkte, Zinsen, Mieten und Fristen laufen weiter. Du kannst stattdessen handeln und reisen. Das neue Schiff bleibt in der Werftstadt, Auswahl und geplanter Konvoi bleiben unverändert.</p></div>`:''}<div class="grid">${SHIPTYPES.map((t,type)=>{const q=shipbuildingQuote(type);return `<div class="item shipbuilding-card" data-type="${type}"><h3>⛵ ${t.name}</h3><p>${t.cap} Fass · Tempo ${t.speed}× · <b>${q.days} Spieltage Bauzeit</b></p><p>${q.rows.map(m=>`${GOODS[m.j][1]} ${GOODS[m.j][0]}: <b>${m.n}</b> Fass benötigt · ${m.have} örtlich vorhanden`).join('<br>')}</p><p>Werftarbeit: <b>${fmt(q.wage)} G</b>, zusätzlich zu deinen bereits beschafften Materialien. Örtliche Schiffe zuerst, dann örtliches Lager. Keine automatische Beschaffung oder Kreditaufnahme.</p>${q.reason?`<p class="notice">${esc(q.reason)}</p>`:''}<button ${!q.allowed?'disabled':''} onclick="startShipbuilding(${type})">${t.name} in Auftrag geben</button></div>`}).join('')}</div><p class="muted">Höchstens ein laufender Auftrag insgesamt. Mietrückstände zuerst begleichen; Werftverbrauch ist kein Verkauf und erfüllt keinen Lieferauftrag.</p></div>`;
}
