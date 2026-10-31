// Offline proposal. Never imported by the game; no save schema, game RNG or economy.
const profiles = require('./politics-concept-profiles.json');
const portfolios = [
  {id:'rich_only', wealth:1000000, rep:500, services:0, periods:0, kinds:0, endorsements:0, decisions:0},
  {id:'new_local', wealth:60000, rep:60, services:2, periods:1, kinds:1, endorsements:1, decisions:0},
  {id:'supply_only', wealth:100000, rep:70, services:8, periods:4, kinds:1, endorsements:2, decisions:1},
  {id:'reliable', wealth:90000, rep:75, services:8, periods:3, kinds:3, endorsements:2, decisions:2},
  {id:'networked', wealth:160000, rep:100, services:10, periods:5, kinds:3, endorsements:4, decisions:3},
  {id:'arrears', wealth:1000000, rep:500, services:12, periods:5, kinds:3, endorsements:4, decisions:3, arrears:5000},
  {id:'outsider', wealth:200000, rep:120, services:10, periods:4, kinds:3, endorsements:4, decisions:3, local:false},
  {id:'modest_local', wealth:50000, rep:70, services:8, periods:4, kinds:3, endorsements:3, decisions:3}
].map(p => Object.freeze({rank:2, local:true, arrears:0, ...p}));

function assess(model, candidate, city, mood=0) {
  const q=profiles.commonProposal;
  if(!['A','B','C'].includes(model)||!profiles.cities.includes(city)||!Number.isInteger(mood)||mood<q.moodMin||mood>q.moodMax)throw Error('invalid prototype input');
  const reasons=[];
  if(candidate.rank<q.rank)reasons.push('rank');
  if(candidate.wealth<q.wealth)reasons.push('wealth');
  if(candidate.rep<q.rep)reasons.push('reputation');
  if(candidate.arrears)reasons.push('arrears');
  if(!candidate.local)reasons.push('local_membership');
  if(candidate.services<q.services)reasons.push('verified_services');
  if(candidate.periods<q.periods)reasons.push('distinct_periods');
  if(candidate.kinds<q.kinds)reasons.push('distinct_kinds');
  const components={
    economic:Math.min(10,Math.max(0,candidate.wealth)/18000),
    reputation:Math.min(15,Math.max(0,candidate.rep)/6),
    services:Math.min(40,Math.max(0,candidate.services)*5),
    endorsements:Math.min(20,Math.max(0,candidate.endorsements)*5),
    decisions:Math.min(15,Math.max(0,candidate.decisions)*5)
  };
  const support=Object.values(components).reduce((a,b)=>a+b,0);
  const threshold=model==='C'?city.rivalTarget:q.uniformRivalTarget;
  const appliedMood=model==='C'?mood:0;
  return {model,city:city.city,candidate:candidate.id,mood,eligible:reasons.length===0,reasons,components,support,threshold,appliedMood,won:reasons.length===0&&(model==='A'||support+appliedMood>=threshold)};
}

module.exports={profiles,portfolios,assess};
