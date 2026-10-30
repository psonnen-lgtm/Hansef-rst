'use strict';
// Actual root code and fixed historical fixture builder; IDB below is a VM model.
// Logical disk.get(KEY) addresses the canonical DB row, NOT LocalStorage.
const old=require('../q1_09/harness.cjs'),KEY='hansefuerst-v04-safety3',states=new WeakMap();
function environment(options={}){
 const g=old.environment(options),rawDisk=g.disk;let shared=states.get(rawDisk);
 if(!shared){shared={rows:new Map(),legacy:rawDisk};if(rawDisk.has(KEY)){shared.rows.set('active',rawDisk.get(KEY));rawDisk.delete(KEY)}}
 const rows=shared.rows,legacy=shared.legacy,fault=options.fault??(()=>false);
 const logical=new Proxy(legacy,{get(target,name){
  if(name==='get')return k=>k===KEY?rows.get('active'):target.get(k);
  if(name==='has')return k=>k===KEY?rows.has('active'):target.has(k);
  if(name==='set')return (k,v)=>{if(k===KEY)rows.set('active',v);else target.set(k,v);return logical};
  if(name==='delete')return k=>k===KEY?rows.delete('active'):target.delete(k);
  if(['entries','values','keys',Symbol.iterator].includes(name))return (...args)=>{const merged=new Map(target);if(rows.has('active'))merged.set(KEY,rows.get('active'));return merged[name](...args)};
  if(name==='size')return target.size+Number(rows.has('active'));
  const value=Reflect.get(target,name,target);return typeof value==='function'?value.bind(target):value;
 }});states.set(logical,shared);states.set(rawDisk,shared);
 function database(){return {objectStoreNames:{contains:()=>true},createObjectStore(){},close(){},transaction(store,mode){
  let pending=0,aborted=false,finished=false;const staged=new Map(),tx={error:null,oncomplete:null,onabort:null,onerror:null};
  const abort=()=>{if(finished||aborted)return;aborted=true;queueMicrotask(()=>tx.onabort?.())};tx.abort=abort;
  function request(fn){pending++;const req={result:undefined,error:null,onsuccess:null,onerror:null};queueMicrotask(()=>{
   if(aborted)return;try{req.result=fn();req.onsuccess?.({target:req})}catch(e){tx.error=e;abort()}pending--;
   if(!pending&&!aborted)queueMicrotask(()=>{if(pending||aborted||finished)return;finished=true;for(const [k,v]of staged){rows.set(k,v);g.writes.push({key:KEY,value:v,storage:'modeled IndexedDB transaction commit'})}tx.oncomplete?.()});
  });return req}
  tx.objectStore=()=>({get:k=>request(()=>staged.has(k)?staged.get(k):rows.get(k)),put(value,k){if(mode!=='readwrite')throw Error('readonly transaction');if(fault(KEY,String(value)))throw Error('controlled IndexedDB quota/write failure');return request(()=>{staged.set(k,value);return k})}});return tx;
 }}}
 g.ctx.indexedDB={open(){const req={onsuccess:null,onerror:null,onupgradeneeded:null,result:null};queueMicrotask(()=>{req.result=database();req.onsuccess?.()});return req}};
 return {...g,disk:logical,canonicalRows:rows};
}
module.exports={...old,environment,KEY};
