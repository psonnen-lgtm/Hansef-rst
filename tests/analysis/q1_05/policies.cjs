'use strict';
// Planning sandbox contains no game state, no markets outside supplied view, no RNG.
const fs=require('node:fs'),vm=require('node:vm');
const original=fs.readFileSync(__dirname+'/../../simulation/strategies.js','utf8');
const observed=original.slice(original.indexOf('function observedPolicy('),original.indexOf('function simulateObserved('));
const source=observed+`
function alternative(id,v,stress){
 if(id==='poor_then_normal'&&!(stress.losses<2&&stress.loadedAttempts<6&&v.elapsed<30))return planObserved('normal',v);
 const bad=id==='poor_then_normal',reserve=bad?100:Math.max(300,.15*v.gold);let best=null;
 for(const d of v.destinations){const k=v.journal[d.city];if(!k)continue;for(let j=0;j<v.local.length;j++){
  const m=v.local[j],p=k.prices[j];if(!Number.isFinite(p))continue;
  const n=Math.max(0,Math.min(m.stock,v.space,Math.floor((v.gold-reserve-d.fee)/m.price)));if(!n)continue;
  const expected=n*(p*(bad?1:1-Math.min(.3,.002*Math.max(0,v.day-k.day)))-m.price)-d.fee,score=bad?-expected:expected/(d.days+2);
  if((bad||expected>0)&&(!best||score>best.score))best={city:d.city,good:j,quantity:n,kind:bad?'deliberate_observed_adverse':'trade',score,quote:p,quoteDay:k.day,expectedGain:expected,days:d.days,fee:d.fee};
 }}return best??planObserved('normal',v);
}
(id,v,stress)=>['cautious','normal','aggressive'].includes(id)?planObserved(id,v):alternative(id,v,stress);
`;
const planner=vm.runInNewContext(source,{}, {timeout:1000});
module.exports={choose:(id,v,stress)=>JSON.parse(JSON.stringify(planner(id,JSON.parse(JSON.stringify(v)),JSON.parse(JSON.stringify(stress))))),observedSource:observed};
