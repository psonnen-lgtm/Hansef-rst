// BEGIN Q109c ATOMIC LOCAL STORE — sole canonical state, old LocalStorage is backup/source only.
const SAFETY_DATABASE='hansefuerst-local-safety3';
function safetyOpenDatabase(){return new Promise((resolve,reject)=>{
 if(typeof indexedDB==='undefined')return reject(Error('IndexedDB ist hier nicht verfügbar'));
 let blocked=false;const request=indexedDB.open(SAFETY_DATABASE,1);
 request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('game'))request.result.createObjectStore('game')};
 request.onblocked=()=>{blocked=true;reject(Error('Spielstandspeicher durch ein anderes Fenster blockiert'))};
 request.onerror=()=>reject(request.error||Error('Spielstandspeicher nicht erreichbar'));
 request.onsuccess=()=>{const db=request.result;if(blocked){db.close();return}db.onversionchange=()=>db.close();resolve(db)};
})}
async function safetyCanonical(expected=undefined,bytes=undefined){
 const db=await safetyOpenDatabase();return new Promise((resolve,reject)=>{
  const write=bytes!==undefined,tx=db.transaction('game',write?'readwrite':'readonly'),store=tx.objectStore('game');let value=null,error=null;
  tx.oncomplete=()=>{db.close();resolve(value)};tx.onabort=tx.onerror=()=>{db.close();reject(error||tx.error||Error('Spielstandtransaktion abgebrochen'))};
  const request=store.get('active');request.onsuccess=()=>{try{value=request.result??null;if(value!==null&&typeof value!=='string')throw Error('Ungültiger aktiver Spielstand');if(write){if(value!==expected)throw Error('Veralteter Stand: Ein anderes Fenster hat gespeichert');store.put(bytes,'active');value=bytes}}catch(e){error=e;tx.abort()}};
 })
}
function safetyReadCanonical(){return safetyCanonical()}
function safetyWriteCanonical(expected,bytes){return safetyCanonical(expected,bytes)}
// The saving cover is installed before the first await after native actions render.
// No uncommitted arrival/risk can be observed through a painted candidate sheet.
function safetyBusy(value){try{
 if(value&&!SafetySession.committing)SafetySession.commitFocus=document.activeElement;
 SafetySession.committing=value;
 if(value){
  if(document.body){document.body.inert=true;SafetySession.commitAria=document.body.getAttribute?.('aria-hidden')??null;document.body.setAttribute?.('aria-hidden','true')}
  if(document.createElement&&document.documentElement){const mask=document.createElement('div');mask.id='safetyCommitMask';mask.setAttribute('role','status');mask.setAttribute('aria-live','polite');mask.tabIndex=-1;mask.textContent='Spielzug wird lokal gespeichert …';mask.style.cssText='position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#101b1a;color:#f0e0b8;font:20px Georgia,serif';mask.addEventListener('keydown',e=>{e.preventDefault();e.stopPropagation()});document.documentElement.append(mask);SafetySession.commitMask=mask;mask.focus({preventScroll:true})}
 }else{
  SafetySession.commitMask?.remove();SafetySession.commitMask=null;
  if(document.body){document.body.inert=false;if(SafetySession.commitAria===null)document.body.removeAttribute?.('aria-hidden');else if(SafetySession.commitAria!==undefined)document.body.setAttribute?.('aria-hidden',SafetySession.commitAria)}
  if(SafetySession.commitFocus?.isConnected)SafetySession.commitFocus.focus?.({preventScroll:true});SafetySession.commitFocus=null;SafetySession.commitAria=undefined;
 }
}catch(e){}}
// END Q109c ATOMIC LOCAL STORE
