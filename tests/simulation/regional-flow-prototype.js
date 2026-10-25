// 0.5h.2 extension of the existing B prototype; no productive entry point.
const FLOW_PARAMS={referenceStock:110,netRegionalFlow:1.2,stockReturn:.015,priceReturn:.020,scarcity:.90,minFactor:.40,maxFactor:2};
function flowPriceTerms(price,stock,base,anchorScale=1){
 const p=FLOW_PARAMS,factor=Math.max(p.minFactor,Math.min(p.maxFactor,1+p.scarcity*(p.referenceStock-stock)/p.referenceStock));
 return {anchor:p.priceReturn*(base-price)*anchorScale,inventory:p.priceReturn*base*(factor-1)};
}
function installRegionalFlow({anchorScale=1}={}){
 installRegionalEconomy('B');
 // Same shared binding as B, so the existing daily observer keeps its checks.
 regionalMarketStep=(m,c,j)=>{
  const p=FLOW_PARAMS;
  if(Math.random()<.35){const u=Math.random(),noisy=m.price<9?m.price+(u<.25?-1:u>=.75?1:0):m.price*(.94+.12*u),terms=flowPriceTerms(m.price,m.stock,GOODS[j][2],anchorScale);m.price=Math.max(4,Math.round(noisy+terms.anchor+terms.inventory))}
  // Net recurring production/consumption plus common local stock adjustment.
  const regionalNet=p.netRegionalFlow*REGIONAL_PROFILES[c][j],common=p.stockReturn*(p.referenceStock-m.stock);
  m.stock=Math.max(3,Math.min(240,Math.round(m.stock+r(-7,7)+regionalNet+common)));
 };
}
