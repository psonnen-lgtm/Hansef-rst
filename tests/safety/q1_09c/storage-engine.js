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
function safetyBusy(value){try{if(value&&!SafetySession.committing)SafetySession.commitFocus=document.activeElement;SafetySession.committing=value;if(document.body)document.body.inert=value;if(value){const box=$('storageStatus');if(box){box.hidden=false;box.textContent='Spielzug wird lokal gespeichert …'}}else{if(SafetySession.commitFocus?.isConnected)SafetySession.commitFocus.focus?.({preventScroll:true});SafetySession.commitFocus=null}}catch(e){}}
// END Q109c ATOMIC LOCAL STORE
