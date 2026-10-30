// BEGIN Q109 SAFETY FOUNDATION — verbatim audited block, no new career/economic rules.
const SAFETY_LOCK='hansefuerst-safety1-writer';
const SafetySession={expected:null,loaded:false,error:'',active:null};
const safetyCopy=x=>x==null?x:JSON.parse(JSON.stringify(x));
function validateSafety(x){
 const a=x.politics.safety,keys=(o,k)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===k.length&&k.every(n=>Object.hasOwn(o,n));
 if(!keys(a,['version','revision','person'])||a.version!==1||!Number.isSafeInteger(a.revision)||a.revision<0||!keys(a.person,['city','source','at']))throw Error('Ungültige Sicherheitsrevision');
 const p=a.person,now=x.year*360+x.day;
 if(p.source==='unknown'){if(p.city!==null||p.at!==null)throw Error('Unbekannter Personenort enthält erfundene Daten')}
 else if(!['new_start','legacy_anchor','arrival'].includes(p.source)||!isCityIndex(p.city)||!Number.isSafeInteger(p.at)||p.at<0||p.at>now)throw Error('Ungültiger persönlicher Aufenthaltsort');
}
function safetyUpgrade(x,source='unknown'){
 const y=safetyCopy(x);validate(y);
 if(y.politics.version===1){y.politics.version=2;y.politics.safety={version:1,revision:0,person:source==='new_start'?{city:y.city,source,at:y.year*360+y.day}:{city:null,source:'unknown',at:null}};}
 validate(y);return y;
}
function safetyStageWrite(){if(!SafetySession.active)throw Error('Schreibversuch außerhalb der gemeinsamen Grenze');SafetySession.active.dirty=true;}
function safetyBackupRaw(raw,label='original'){
 if(!SafetySession.active||SafetySession.active.readOnly)throw Error('Keine geschützte Schreibgrenze');
 const base=KEY+'-'+label;
 for(let i=0;i<100;i++){const key=base+(i?'-'+i:''),old=localStorage.getItem(key);if(old===raw)return key;if(old===null){localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('Originalsicherung nicht bestätigt');return key;}}
 throw Error('Kein freier Originalsicherungsplatz; bitte exportieren');
}
function safetyMessage(text,modal=true){SafetySession.error=text;storageWarning=true;try{renderStorageStatus();if(modal)notice(text)}catch(e){}return false;}
function safetyReadView(fn){
 const before=s,oldPending=safetyCopy(pending),oldTx=SafetySession.active;SafetySession.active={readOnly:true,dirty:false};s=safetyCopy(s);
 try{return fn()}finally{s=before;pending=oldPending;SafetySession.active=oldTx;try{renderStorageStatus()}catch(e){}}
}
async function safetyRun(fn,{expected=SafetySession.expected,viewOnly=false}={}){
 if(SafetySession.active)return fn();
 if(typeof navigator==='undefined'||!navigator.locks?.request){
  if(viewOnly){const result=safetyReadView(fn);safetyMessage('Dieser Browser bietet hier keine verlässliche Schreibsperre. Die Partie ist nur lesbar; Export bleibt möglich.',false);return result;}
  return safetyMessage('Änderung abgebrochen: Web Locks sind unter dieser Adresse nicht verfügbar. Bitte einen unterstützten Browser unter HTTPS/localhost verwenden. Die gespeicherte Partie bleibt erhalten.');
 }
 try{return await navigator.locks.request(SAFETY_LOCK,{mode:'exclusive'},()=>{
  const disk=localStorage.getItem(KEY);
  if(disk!==expected){if(viewOnly){const result=safetyReadView(fn);safetyMessage('Ein anderes Fenster hat die Partie geändert. Nur Ansicht; bitte den aktuellen Stand laden.',false);return result;}return safetyMessage('Veralteter Stand: Ein anderes Fenster hat gespeichert. Der Vorgang wurde nicht ausgeführt. Bitte den aktuellen Stand laden.');}
  const before=s,oldPending=safetyCopy(pending),oldDraft=safetyCopy(startDraft),oldEvents=Testlog.event,oldSnapshot=Testlog.snapshot,oldRoute=Testlog.setRoute,events=[],snapshots=[],routes=[];
  const oldText=JSON.stringify(s);let committed=false;
  SafetySession.active={dirty:false,readOnly:false};s=safetyCopy(s);
  Testlog.event=(type,details={})=>events.push([type,safetyCopy(details)]);Testlog.snapshot=reason=>snapshots.push(reason);Testlog.setRoute=(...args)=>routes.push(args);
  let result;
  try{
   result=fn();if(result&&typeof result.then==='function')throw Error('Asynchroner Untervorgang innerhalb der Schreibgrenze');
   if(result===false){s=before;pending=oldPending;startDraft=oldDraft;return false;}
   if(s){validate(s);const changed=JSON.stringify(s)!==oldText;
    if(changed){const previous=disk?JSON.parse(disk).politics?.safety?.revision??0:0;if(previous>=Number.MAX_SAFE_INTEGER)throw Error('Sicherheitsrevision ausgeschöpft');s.politics.safety.revision=previous+1;validate(s);const bytes=JSON.stringify(s);localStorage.setItem(KEY,bytes);committed=true;SafetySession.expected=bytes;}
   }
   storageWarning=false;SafetySession.error='';
  }catch(e){if(!committed){s=before;pending=oldPending;startDraft=oldDraft;}return safetyMessage(committed?'Die Aktion ist gespeichert, aber die Ansicht konnte nicht abgeschlossen werden. Bitte den aktuellen Stand laden.':'Vorgang vollständig abgebrochen. Die bisher gespeicherte Partie bleibt unverändert. '+(e.message||'Bitte Speicher prüfen.'));}
  finally{Testlog.event=oldEvents;Testlog.snapshot=oldSnapshot;Testlog.setRoute=oldRoute;SafetySession.active=null;}
  // Observations are published only after the canonical game write succeeds.
  try{for(const args of routes)oldRoute?.(...args);for(const args of events)oldEvents(...args);for(const reason of snapshots)oldSnapshot(reason);renderStorageStatus();}catch(e){safetyMessage('Die Aktion ist gespeichert; die Testaufzeichnung oder Ansicht konnte nicht aktualisiert werden.',false);}
  return result;
 });}catch(e){return safetyMessage('Kein sicherer Schreibzugriff möglich. Die Aktion wurde abgebrochen. '+(e.message||''));}
}
function safetyExportText(){
 const raw=localStorage.getItem(KEY)??SafetySession.expected;
 if(raw!==null){const x=migrate(JSON.parse(raw));if(!x)throw Error('Gespeicherte Revision nicht unterstützt');return raw;}
 const old=startOriginal();if(old.raw!==null){if(!migrate(JSON.parse(old.raw)))throw Error('Originalstand nicht lesbar');return old.raw;}
 throw Error('Noch keine gespeicherte Partie vorhanden');
}
async function safetyReload(){
 if(typeof navigator==='undefined'||!navigator.locks?.request)return safetyMessage('Kein sicherer Schreibzugriff unter dieser Adresse. Export des vorhandenen Stands bleibt möglich.');
 try{return await navigator.locks.request(SAFETY_LOCK,{mode:'exclusive'},()=>{const raw=localStorage.getItem(KEY);if(raw===null)throw Error('Kein aktiver Sicherheitsstand');const x=migrate(JSON.parse(raw));if(!x||x.politics.version!==2)throw Error('Nicht unterstützte aktive Revision');s=x;SafetySession.expected=raw;pending=null;startDraft=null;SafetySession.error='';storageWarning=false;render();return true;});}catch(e){return safetyMessage('Laden abgebrochen; Originaldaten bleiben erhalten. '+e.message);}
}
async function safetyBoot(){
 SafetySession.expected=localStorage.getItem(KEY);
 const load=()=>{
  const original=startOriginal();if(original.raw===null){s=null;return;}
  const parsed=JSON.parse(original.raw),x=migrate(parsed);if(!x)throw Error('Spielstand oder neuere Revision nicht unterstützt');
  if(original.key===KEY&&x.politics.version!==2)throw Error('Aktiver Sicherheitsstand hat keine gültige Sicherheitsrevision');
  if(original.key!==KEY){safetyBackupRaw(original.raw,'v13-original');s=safetyUpgrade(x);}else s=x;
 };
 if(typeof navigator==='undefined'||!navigator.locks?.request){try{const original=startOriginal();s=original.raw===null?null:migrate(JSON.parse(original.raw));SafetySession.loaded=true;if(s)render();else welcome();safetyMessage('Nur lesbar: Web Locks fehlen. Originale bleiben erhalten; Export ist möglich.',false);}catch(e){safetyMessage('Original konnte nicht gelesen werden; keine Änderung vorgenommen. '+e.message);}return false;}
 const ok=await safetyRun(load);SafetySession.loaded=true;if(s)render();else welcome();checkNews();return ok!==false;
}
const SAFETY_ACTIONS=['changeWarehouseRent','payWarehouseArrears','warehouseTransfer','warehouseSelect','startShipbuilding','completeShipbuilding','waitShipbuilding','acceptPoliticalJob','witnessPoliticalJob','finishPoliticalAccord','runMayorElection','resignMayor','reviewMayor','requestPoliticalEndorsement','acceptHanseAgreement','witnessHanseAgreement','finishHanseAgreement','runHanseAssembly','buyInformation','buyInformationArchive','fileExistingInformation','buyTradeLetter','trade','takeBath','donate','bankOp','sellShip','performHarborWork','repairShip','armShip','buyShip','selectFleetShip','marketSelect','promote','advance','planTravel','arrive','cancelVoyagePreparation','startGame'];
const SAFETY_VIEWS=['show','closeSheet','marketView','warehouseView','harborView','bookView','questsView','regionalReport'];
function safetyInstall(){for(const name of [...SAFETY_ACTIONS,...SAFETY_VIEWS]){const fn=globalThis[name];if(typeof fn!=='function')throw Error('Sicherheitsgrenze fehlt: '+name);globalThis[name]=function(...args){if(SafetySession.active)return fn.apply(this,args);return safetyRun(()=>fn.apply(this,args),{viewOnly:SAFETY_VIEWS.includes(name)});};}}
safetyInstall();
// END Q109 SAFETY FOUNDATION
