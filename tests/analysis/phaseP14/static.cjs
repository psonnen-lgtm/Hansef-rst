'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process'),M=require('./model.cjs');
const out=process.argv[2];if(!out||fs.existsSync(out))throw Error('fresh output required');
const rows=[],reach=[],yearly=[],deadlines=[],groups=[];
const csv=(file,items)=>{if(fs.existsSync(file))throw Error('existing CSV');fs.writeFileSync(file,Object.keys(items[0]).join(';')+'\n'+items.map(r=>Object.values(r).join(';')).join('\n')+'\n')};
for(let a=0;a<11;a++)for(let b=a+1;b<11;b++){
 const row={from:a,to:b,start:M.CITIES[a],destination:M.CITIES[b],gameDistance:M.DIST[a][b],handling:M.original.routeHandlingDays(a,b),events:'13% pirate encounter;14% storm;no added days',notes:[M.north.has(a)!==M.north.has(b)?'North/Baltic sea transition':'',a===9||b===9?'Novgorod handling3':'',a===10||b===10?'Venlo handling3':''].filter(Boolean).join(',')};
 assert.equal(M.DIST[a][b],M.DIST[b][a]);
 for(const model of ['A','B','C'])for(const condition of [100,30])for(let type=0;type<3;type++){const t=M.days(a,b,M.speed(type,condition),model);assert.equal(t,M.days(b,a,M.speed(type,condition),model));assert(t>=1);if(model!=='A')assert(t>=M.days(a,b,M.speed(type,condition),'A'));row[model+'_'+type+'_'+condition]=t;}
 rows.push(row);
 for(const model of ['A','B','C'])for(let type=0;type<3;type++){
  const time=row[model+'_'+type+'_100'],fee=[4,6,9][type],cargo=M.SHIPTYPES[type].cap;
  yearly.push({from:a,to:b,model,type:M.SHIPTYPES[type].name,oneWayDays:time,oneWayFees:fee,maxLegs360:Math.floor(360/time),maxCompleteReturnCycles360:Math.floor(360/(2*time)),fullCapacity:cargo,feePerFullBarrel:fee/cargo,illustrativeMarginPerBarrel:8,illustrativeProfitPerDay:(cargo*8-fee)/time,margin30BarrelsAfterFee:30*8-fee,margin30BarrelsPerDay:(30*8-fee)/time,debt1000Interest:1000*Math.expm1(Math.log1p(.06)*time/360),perLegPirateEncounter:.13,perDayExposureApprox:1-Math.pow(.87,1/time)});
 }
}
assert.equal(rows.length,55);groups.push({name:'55 literal production distance pairs; all model/type/condition reverse durations symmetric',passed:true});
assert.equal(M.days(0,1,1),2);assert.equal(M.days(6,9,1),33);assert.equal(M.days(9,10,1),35);assert.equal(M.original.routeTravelDays(-1,0,1),null);assert.equal(M.original.routeTravelDays(0,1,0),null);assert.equal(M.original.routeTravelDays(0,0,1),0);
groups.push({name:'known actual route durations and invalid endpoints/speed/self',passed:true});
for(let from=0;from<11;from++)for(let to=0;to<11;to++)for(const model of ['A','B','C'])for(let type=0;type<3;type++)for(const condition of [100,30]){
 const speed=M.speed(type,condition),direct=M.days(from,to,speed,model),suppliers=Array.from({length:11},(_,i)=>i).filter(i=>i!==to),procure=suppliers.map(v=>({city:v,time:M.days(from,v,speed,model)+M.days(v,to,speed,model)})).sort((a,b)=>a.time-b.time||a.city-b.city),repeat=suppliers.map(v=>direct+M.days(to,v,speed,model)+M.days(v,to,speed,model));
 const row={from,to,start:M.CITIES[from],event:M.CITIES[to],model,type:M.SHIPTYPES[type].name,condition,directLoadedDays:direct,delayedLoadedDays:direct+17,bestProcurementSupplier:M.CITIES[procure[0].city],bestProcurementTotalDays:procure[0].time+17,worstProcurementTotalDays:procure.at(-1).time+17,secondDeliveryBestTotalDays:Math.min(...repeat)+17};
 for(const window of [60,90,120])for(const [label,key]of [['loaded','directLoadedDays'],['news7prep10','delayedLoadedDays'],['procureBest','bestProcurementTotalDays'],['procureWorst','worstProcurementTotalDays'],['secondBest','secondDeliveryBestTotalDays']])row[label+window]=row[key]<=window;
 reach.push(row);
}
groups.push({name:'all121 origin/event combinations including home,3 models,3 types,2 conditions,60/90/120 windows',passed:true});
for(const model of ['A','B','C'])for(let city=0;city<11;city++)for(let type=0;type<3;type++){
 const s=M.speed(type,30),nearest=Math.min(...M.CITIES.map((_,i)=>i===city?Infinity:M.days(city,i,s,model)+M.days(i,city,s,model))),window=city<5?8:Math.max(8,nearest+3);
 deadlines.push({city:M.CITIES[city],model,type:M.SHIPTYPES[type].name,condition:30,bestForeignRoundTrip:nearest,illustrativeMinimumOfferWindow:window,oldFiveCity8DayOfferFeasible:nearest<=8,oldFiveCity15DayOfferFeasible:nearest<=15,note:'new city windows hypothetical helper using model; native productive helper remains A and consumes RNG8..15'});
}
groups.push({name:'quest foreign procurement roundtrip feasibility arithmetic, not new offers',passed:true});
// All-pairs least time using existing ports as intermediate stops: report possible shortcuts.
const shortcuts=[];
for(const model of ['A','B','C'])for(let type=0;type<3;type++){
 const d=M.CITIES.map((_,a)=>M.CITIES.map((_,b)=>M.days(a,b,M.speed(type),model))),best=d.map(r=>[...r]);for(let k=0;k<11;k++)for(let i=0;i<11;i++)for(let j=0;j<11;j++)best[i][j]=Math.min(best[i][j],best[i][k]+best[k][j]);
 for(let a=0;a<11;a++)for(let b=a+1;b<11;b++)if(best[a][b]<d[a][b])shortcuts.push({model,type:M.SHIPTYPES[type].name,from:M.CITIES[a],to:M.CITIES[b],direct:d[a][b],withStops:best[a][b],note:'extra fees and extra event rolls not included'});
}
const history=JSON.parse(fs.readFileSync(M.root+'/tests/simulation/phase08a-20261026-01/rumor-route-feasibility.json','utf8'));
groups.push({name:'historical08a table read only; old game commit retained, not rerun',passed:true,historicalGameCommit:history.testedGameCommit});
const result={phase:'P1.4',base:'ffc0bfad0e36e4547f7a5750bb68b169f93f8009',testedCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),htmlHash:M.hash,productCommit:'c42c25cf5cf372c210b47f25b00b9f0106044ed3',method:'only pure production constants/functions extracted; no initialized game or dynamic trade path',newDynamicPaths:0,groups,rows,reach,yearly,deadlines,shortcuts,assumptions:{proposalB:'D+ceil(.25*max(0,D-4));North/Baltic minimum10;unchanged handling3 per inland endpoint',proposalC:'D+ceil(.75*max(0,D-4));North/Baltic minimum16;unchanged handling',northCities:[1,6,8,10],delays:'7 days news plus10 preparation; hypothetical not measured',gain:'illustrative8 gold/barrel held fixed; no future price forecast',noPhysicalDistanceUnit:true}};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');csv(__dirname+'/results/routes55.csv',rows);csv(__dirname+'/results/reachability.csv',reach);csv(__dirname+'/results/economics.csv',yearly);csv(__dirname+'/results/quest-windows.csv',deadlines);
console.log(JSON.stringify({groups:groups.length,cityPairs:rows.length,reachRows:reach.length,shortcuts:shortcuts.length,newDynamicPaths:0}));
