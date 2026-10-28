'use strict';
// Eight bounded single-voyage fixtures, not a trade strategy or career simulation.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process'),M=require('./model.cjs');
process.env.HANSE_GAME=M.root+'/Hansefuerst_0_4.html';const {create}=require('../../simulation/headless.cjs');
const out=process.argv[2],marker=__dirname+'/results/dynamic-started.json';if(!out||fs.existsSync(out)||fs.existsSync(marker))throw Error('new output and unused budget marker required');
const testedCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();fs.writeFileSync(marker,JSON.stringify({testedCommit,plannedContexts:8,maximumAuthorized:12})+'\n');
const paths=[];let created=0;const names=['routeTravelDays','routeHandlingDays','planTravel','rollTravel','arrive','advance','regionalStock','regionalPrice','regionalMarketDay','trade','completeQuests','questWindow'];
function run(name,{from,to,type=1,model='A',convoy=false,prefix=[.6],quest=false}){
 assert(++created<=8);const g=create(71401,null,{city:from,player:'Ulf',name:'P14'}),row={name,from,to,type,model,completed:false};paths.push(row);
 const hashes=()=>Object.fromEntries(names.map(n=>[n,crypto.createHash('sha256').update(g.eval(n+'.toString()')).digest('hex')]));
 const snapshot=()=>({game:M.clean(g.eval('s')),pending:M.clean(g.eval('pending')),events:M.clean(g.events)});
 try{
  g.eval(`s.gold=500;s.bank=0;s.debt=1000;s.ships=[makeShip(${type},{id:1,city:${from}})];s.active=0;s.city=${from};ensureCargoRecords(ship());ship().cargo[0]=30;ship().costs[0]=8;ship().bookCosts[0]=8;ship().origins[0]=[{city:${from},n:30}];${quest?'s.quests=[{city:'+to+',j:0,n:30,reward:100,until:totalDay()+8}];':'s.quests=[];'}${convoy?'s.ships.push({...makeShip(2,{id:2,city:'+from+'}),condition:30});s.ships.push(makeShip(1,{id:3,city:6}));':''}observe();validate(s);`);
  row.start=snapshot();row.initialFunctionHashes=hashes();let state=71401,index=0,draws=0;
  g.context.Math.random=()=>{draws++;if(index<prefix.length)return prefix[index++];state=(state+0x6D2B79F5)>>>0;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296};
  g.eval(`planTravel(${to},${convoy})`);const actual=M.clean(g.eval('pending'));assert(actual);row.originalNativePlan=actual;
  const qs=row.start.game.ships.filter(q=>actual.qs.includes(q.id)),slowest=Math.min(...qs.map(q=>q.speed*(.65+.35*q.condition/100))),days=M.days(from,to,slowest,model);assert.equal(actual.days,M.days(from,to,slowest,'A'));
  // Explicitly staged proposal duration, NOT replacement of any production function.
  g.eval(`pending.days=${days};arrive();validate(s)`);row.arrived=snapshot();
  assert.equal(row.arrived.game.year*360+row.arrived.game.day-(row.start.game.year*360+row.start.game.day),days);assert.equal(row.arrived.game.city,to);
  assert(Math.abs(row.arrived.game.debt-1000*Math.exp(Math.log1p(.06)*days/360))<1e-7);
  assert.equal(row.arrived.game.gold,500-actual.fee);assert.equal(g.events.filter(e=>e.type==='travel').length,1);
  if(convoy){assert.deepEqual(actual.qs,[1,2]);assert.equal(actual.fee,13);assert.equal(days,4);assert.equal(row.arrived.game.ships[2].city,6);assert.equal(row.arrived.pending.event,'storm');assert(row.arrived.game.ships[0].condition<100);assert.equal(row.arrived.game.ships[1].condition,30);}
  const beforeAgain=snapshot();g.eval('arrive()');assert.deepEqual(snapshot(),beforeAgain);
  const available=g.eval('ship().cargo[0]||0');g.eval(`$('qty0').value='${available}';trade(0,-1);validate(s)`);row.final=snapshot();
  const sales=g.events.filter(e=>e.type==='sell'),reward=g.events.filter(e=>e.type==='quest_reward').reduce((s,e)=>s+e.reward,0),lost=g.events.filter(e=>e.type==='pirate_loss').reduce((s,e)=>s+e.quantity,0);
  assert.equal(row.final.game.gold,500-actual.fee+sales.reduce((s,e)=>s+e.total,0)+reward);assert.equal(available+lost,30);assert.equal(g.eval('load(ship())'),0);
  if(quest)assert.equal(reward,days<=8&&lost===0?100:0);
  assert.deepEqual(hashes(),row.initialFunctionHashes);row.completed=true;row.evidence={days,fee:actual.fee,revenue:sales.reduce((s,e)=>s+e.total,0),knownGoodsCost:30*8,lost,questReward:reward,finalGold:row.final.game.gold,debtInterest:row.final.game.debt-1000,cargoSold:available,plannedSpeed:slowest,event:row.arrived.pending.event,duplicateArrivalNoEffect:true,nativeFunctionsUnchanged:true,rngDraws:draws,postPrefixRngState:state,controlledInitialWeatherPrefix:prefix};console.log('PASS '+name);
 }catch(e){row.error=e.stack;console.error('FAIL '+name+' '+e.stack);try{row.failure=snapshot()}catch(ignore){}}
 fs.writeFileSync(out,JSON.stringify({incomplete:true,testedCommit,created,paths},null,2)+'\n');
}
for(const model of ['A','B','C'])run('Luebeck-Hamburg-'+model,{from:0,to:1,model,quest:true});
for(const model of ['A','B','C'])run('Bergen-Novgorod-Holk-'+model,{from:6,to:9,type:2,model});
run('native-damaged-convoy-storm-remote-excluded',{from:2,to:0,type:0,convoy:true,prefix:[.2]});
run('native-pirates-real-cargo-and-explicit-quest-shortfall',{from:0,to:1,prefix:[.01,.99,0],quest:true});
const result={phase:'P1.4',testedCommit,base:'ffc0bfad0e36e4547f7a5750bb68b169f93f8009',htmlHash:M.hash,created,maximumAuthorized:12,paths,passed:paths.every(p=>p.completed),limits:['single voyage per fixture,30 preowned foreign-eligible grain,500 cash,1000 debt','proposal B/C only pending.days in private fixture; no production function modified','weather branch deliberately fixed; not Monte Carlo event frequencies','no public crisis or election system implemented','no price-profit forecast or multi-year career']};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({created,completed:paths.filter(p=>p.completed).length,passed:result.passed}));if(!result.passed)process.exitCode=1;
