'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..'),html=fs.readFileSync(path.join(root,'Hansefuerst_0_4.html'),'utf8'),hash=crypto.createHash('sha256').update(html).digest('hex');
assert.equal(hash,'c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924');
// Literal production definitions and two pure functions only, NO game initialized.
const names=['EXPANSION_CITIES','DIST','SHIPTYPES'],definitions=names.map(n=>{const line=html.split('\n').find(l=>l.startsWith('const '+n+'='));assert(line,n);return line});
const functions=['routeHandlingDays','routeTravelDays'],bodies=functions.map(n=>{const line=html.split('\n').find(l=>l.startsWith('function '+n+'('));assert(line,n);return line});
const source=[...definitions,'const CITIES=EXPANSION_CITIES,CITY_COUNT=CITIES.length;const isCityIndex=i=>Number.isInteger(i)&&i>=0&&i<CITY_COUNT;',...bodies,'({CITIES,DIST,SHIPTYPES,routeHandlingDays,routeTravelDays})'].join('\n');
const original=vm.runInNewContext(source,{}, {timeout:1000}),clean=x=>JSON.parse(JSON.stringify(x));
const {CITIES,DIST,SHIPTYPES}=clean(original),north=new Set([1,6,8,10]);
function effective(from,to,model){const d=DIST[from][to];if(from===to||model==='A')return d;assert(['B','C'].includes(model));const cross=north.has(from)!==north.has(to),extra=Math.ceil(Math.max(0,d-4)*(model==='B'?.25:.75));return Math.max(d+extra,cross?(model==='B'?10:16):0);}
function days(from,to,speed,model='A'){if(model==='A')return original.routeTravelDays(from,to,speed);if(from===to)return 0;return Math.ceil(effective(from,to,model)/speed)+original.routeHandlingDays(from,to);}
const speed=(type,condition=100)=>SHIPTYPES[type].speed*(.65+.35*condition/100);
module.exports={root,html,hash,CITIES,DIST,SHIPTYPES,original,days,effective,speed,clean,source,north};
