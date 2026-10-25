// Bounded pre-integration choices; final helpers will be copied verbatim to HTML.
const ACTIVATION_RULES={luxuryFlow:.35,bergenFlow:1.5,stockReference:110,netFlow:1.2,stockReturn:.015,priceReturn:.020};
function regionalPrice(price,stock,base,draw){
 const factor=2/(1+(stock/ACTIVATION_RULES.stockReference)**2),pull=ACTIVATION_RULES.priceReturn*(base*factor-price);
 let next;
 if(price<9){const step=draw<.25?-1:draw>=.75?1:0,residual=draw<.25?draw*4:draw<.75?(draw-.25)*2:(draw-.75)*4,exact=price+step+pull,whole=Math.floor(exact);next=whole+(residual<exact-whole?1:0)}
 else next=Math.round(price*(.94+.12*draw)+pull);
 return Math.max(4,Math.min(1e9,next));
}
function regionalStock(stock,profile,city,j,draw){
 const speed=([5,10].includes(j)?ACTIVATION_RULES.luxuryFlow:1)*(city===6&&j===4?ACTIVATION_RULES.bergenFlow:1);
 const bucket=draw*15,noise=Math.floor(bucket)-7,exact=stock+noise+speed*(ACTIVATION_RULES.netFlow*profile+ACTIVATION_RULES.stockReturn*(ACTIVATION_RULES.stockReference-stock)),whole=Math.floor(exact);
 return Math.max(3,Math.min(240,whole+(bucket-Math.floor(bucket)<exact-whole?1:0)));
}
function regionalMarketDay(m,c,j){
 if(Math.random()<.35)m.price=regionalPrice(m.price,m.stock,GOODS[j][2],Math.random());
 m.price=Math.max(4,Math.min(1e9,m.price));
 m.stock=regionalStock(m.stock,REGIONAL_PROFILES[c][j],c,j,Math.random());
}
function installActivationPrototype(choice){
 if(!['R1','R2'].includes(choice))throw Error('unknown bounded choice');
 if(choice==='R2'){ACTIVATION_RULES.luxuryFlow=.20;ACTIVATION_RULES.bergenFlow=1.25}
 REGIONAL_PROFILES[0][4]=-1;
 installRegionalFlow();regionalMarketStep=regionalMarketDay;
}
