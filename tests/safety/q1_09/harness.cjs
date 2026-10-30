'use strict';
const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process'),crypto=require('node:crypto');
const path=require('node:path'),root=path.resolve(__dirname,'../../..');
const base='02ee6b8fc1507ad078b6b596c333e50d91eeea64';
const original=cp.execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{cwd:root,maxBuffer:128*1024*1024}).toString();
const html=fs.readFileSync(root+'/Hansefuerst_0_4.html','utf8');
const clean=x=>JSON.parse(JSON.stringify(x));
function source(h){return h.match(/<script>([\s\S]*?)<\/script>/)[1].split('// Opt-in local test analysis.')[0].replace(/^const ART=.*;$/m,'const ART={};');}
function originalState(code=''){
 const nodes={},c={console,Math:Object.create(Math),Date,confirm:()=>true,alert(){},document:{getElementById:id=>nodes[id]??={value:'0'}},localStorage:{getItem:()=>null,setItem(){}},Testlog:{event(){},snapshot(){},route(){return null}}};c.Math.random=()=>.5;vm.createContext(c);
 vm.runInContext(source(original).split('// BEGIN CITY LIFE LAYOUTS')[0],c);
 vm.runInContext('render=()=>{};marketView=()=>{};warehouseView=()=>{};hallView=()=>{};closeSheet=()=>{};notice=()=>{};s=newMerchantGame("Ulf","Synthetic Q1.09",0);'+code+';validate(s)',c);
 return clean(vm.runInContext('s',c));
}
class LockQueue{constructor(){this.tail=Promise.resolve();this.calls=0;}request(name,opts,fn){this.calls++;const task=this.tail.then(()=>fn({name,mode:opts.mode}));this.tail=task.catch(()=>{});return task;}}
function environment({stored={},locks=new LockQueue(),unsupported=false,fault=()=>false}={}){
 const disk=stored instanceof Map?stored:new Map(Object.entries(stored)),nodes={},events=[],writes=[],messages=[];
 let rng=42;const math=Object.create(Math);math.random=()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296};
 const ctx={console,Math:math,Date,Map,File,Blob,URL,Promise,setTimeout,clearTimeout,confirm:()=>true,alert:t=>messages.push(String(t)),FileReader:class{readAsText(f){this.result=f.text;ctx.reader=this}},navigator:unsupported?{}:{locks},document:{getElementById:id=>nodes[id]??={value:'0',innerHTML:'',textContent:'',hidden:false,style:{},classList:{add(){},remove(){},contains(){return false}},setAttribute(){},focus(){}}},localStorage:{getItem:k=>disk.get(k)??null,setItem(k,v){v=String(v);if(fault(k,v))throw Error('synthetic quota/write fault');disk.set(k,v);writes.push({key:k,value:v});},removeItem:k=>disk.delete(k)},Testlog:{data:{activeMs:0},event:(type,details)=>events.push({type,...clean(details??{})}),snapshot:reason=>events.push({type:'snapshot',reason}),newRun:reason=>events.push({type:'newRun',reason}),route:()=>null,setRoute(){},panel:()=>''}};
 vm.createContext(ctx);vm.runInContext(source(html),ctx);
 vm.runInContext('globalThis.nativeWelcome=welcome;drawMap=()=>{};drawCity=()=>{};openSheet=(title,html)=>{globalThis.lastSheet={title,html}};render=()=>{save()};notice=text=>{globalThis.lastNotice=text};checkNews=()=>{};welcome=()=>{};',ctx);
 return {ctx,disk,nodes,events,writes,messages,eval:code=>vm.runInContext(code,ctx),state:()=>clean(vm.runInContext('s',ctx)),ready:()=>vm.runInContext('safetyBoot()',ctx),selectImport(raw){ctx.fileEvent={target:{files:[{text:raw}],value:'file'}};vm.runInContext('importGame(fileEvent)',ctx);},finishImport:()=>ctx.reader.onload(),locks};
}
module.exports={environment,originalState,original,html,clean,LockQueue,hash:crypto.createHash('sha256').update(html).digest('hex'),base};
