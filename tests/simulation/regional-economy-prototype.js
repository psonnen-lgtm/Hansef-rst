// Analysis-only injection into the ACTUAL game's VM. Never loaded by the HTML.
// +1: recurring surplus, -1: recurring shortage. Saved catalogs never reordered.
const REGIONAL_PROFILES=[
 [0,1,0,1,0,0,0,0,0,0,-1],
 [0,1,-1,0,0,1,0,0,-1,0,0],
 [1,1,0,0,0,-1,0,0,0,-1,0],
 [1,0,0,-1,1,-1,0,0,0,0,0],
 [0,0,1,-1,0,-1,0,1,1,0,0],
 [1,0,1,0,0,-1,0,0,0,-1,0],
 [-1,-1,0,0,1,0,0,-1,0,0,0],
 [-1,0,1,0,0,0,0,0,1,-1,0],
 [0,0,-1,0,0,1,0,0,0,1,-1],
 [0,-1,0,-1,0,-1,0,0,1,0,1],
 [0,1,0,0,-1,0,1,0,0,0,-1]
];
const REGIONAL_MODELS={
 control:null,
 A:{spread:.12,stockSpread:35,stockReturn:.025,priceReturn:.015,scarcity:.28,supplyResponse:0},
 B:{spread:.32,stockSpread:65,stockReturn:.035,priceReturn:.03,scarcity:.55,supplyResponse:0},
 C:{spread:.18,stockSpread:50,stockReturn:.025,priceReturn:.025,scarcity:.85,supplyResponse:3}
};
// Shared lexical binding lets the existing observer recompile advance safely.
let regionalMarketStep;
function installRegionalEconomy(model){
 if(!Object.hasOwn(REGIONAL_MODELS,model))throw Error('unknown regional model');
 const p=REGIONAL_MODELS[model];if(!p)return;
 const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
 regionalMarketStep=function(m,c,j){
  const profile=REGIONAL_PROFILES[c][j],base=GOODS[j][2],targetStock=110+p.stockSpread*profile;
  const targetFactor=clamp(1-p.spread*profile+p.scarcity*(targetStock-m.stock)/100,.45,1.8);
  // Exactly the existing gate and conditional price draw; no extra random draw.
  if(Math.random()<.35){
   const u=Math.random();
   const noisy=m.price<9?m.price+(u<.25?-1:u>=.75?1:0):m.price*(.94+.12*u);
   m.price=Math.max(4,Math.round(noisy+p.priceReturn*(base*targetFactor-m.price)));
  }
  const supply=clamp(p.supplyResponse*(m.price/(base*(1-p.spread*profile))-1),-2,2);
  m.stock=clamp(Math.round(m.stock+r(-7,7)+p.stockReturn*(targetStock-m.stock)+supply),3,240);
 }
 const old=advance.toString();
 const cell='if(Math.random()<.35)m.price=dailyMarketPrice(m.price,Math.random());m.stock=Math.max(3,Math.min(240,m.stock+r(-6,9)))';
 if(old.split(cell).length!==2)throw Error('prototype insertion guard: shipped cell changed');
 // The original interest, calendar, specials and quest expiration bodies remain.
 advance=eval('('+old.replace(cell,'regionalMarketStep(m,c,j)')+')');
}
