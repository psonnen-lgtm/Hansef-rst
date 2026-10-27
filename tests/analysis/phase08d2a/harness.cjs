'use strict';
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), crypto=require('node:crypto'), assert=require('node:assert/strict');
const Q=require('./quantity-model.cjs');
const root=path.resolve(__dirname,'../../..'), file=path.join(root,'Hansefuerst_0_4.html');
const html=fs.readFileSync(file,'utf8'), hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// Opt-in local test analysis.')[0].replace(/^const ART=.*;$/m,'const ART={};');
const clean=x=>JSON.parse(JSON.stringify(x));
function create(seed=81001, city=0, model='A', saved=null) {
  assert(['A','B'].includes(model));
  let randomState=seed>>>0, draws=0, clock=1700000000000, anchors=null;
  const events=[], nodes={}, disk={}, routes=new Map();
  const random=()=>{randomState=(randomState+0x6D2B79F5)>>>0;draws++;let t=randomState;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296};
  const math=Object.create(Math); math.random=random;
  const context={console,Math:math,Date:class extends Date {static now(){return clock++}},confirm:()=>true,alert(){},
    localStorage:{getItem:k=>disk[k]??null,setItem(k,v){disk[k]=v}},
    document:{getElementById(id){return nodes[id]??={value:'1',innerHTML:'',style:{},classList:{add(){},remove(){}}}}},
    Testlog:{data:{activeMs:0},event:(type,details)=>events.push(clean({type,...details})),snapshot(){},route:id=>routes.get(id)??null,setRoute(id,r){routes.set(id,r)},panel(){return ''}}};
  vm.createContext(context); const evaluate=code=>vm.runInContext(code,context);
  evaluate(source);
  evaluate('render=()=>{};show=()=>{};openSheet=()=>{};notice=()=>{};marketView=()=>{};harborView=()=>{};bankView=()=>{};hallView=()=>{};bathView=()=>{};drawCity=()=>{};warehouseView=()=>{};');
  if (saved) {
    assert.equal(saved.analysisOnly,true); assert.equal(saved.model,model); assert.equal(saved.gameHash,hash(html));
    context.loaded=clean(saved.game); evaluate('validate(loaded);s=loaded;');
    randomState=saved.rng.state; draws=saved.rng.draws; clock=saved.clock; anchors=clean(saved.anchors);
    if(model==='B') {
      assert.equal(anchors.length,11);
      anchors.forEach((row,c)=>{assert.equal(row.length,11);row.forEach((a,j)=>{Q.anchor(a.price,a.stock);const m=saved.game.markets[c][j];assert.equal(m.price,Q.edge(a,Math.max(1,m.stock)))})});
    }
  } else {
    evaluate(`s=newMerchantGame('Ulf','Mengenprobe',${city});`);
    anchors=clean(evaluate('s.markets')).map(row=>row.map(m=>Q.anchor(m.price,m.stock)));
  }
  const edits=[];
  if(model==='B') {
    // Change only a VM function string; the repository HTML stays byte-identical.
    let trade=evaluate('trade.toString()');
    function replaceOnce(before,after){assert.equal(trade.split(before).length-1,1,before);trade=trade.replace(before,after);edits.push({before,after})}
    replaceOnce("if(dir===1){if(n>m.stock", "let quantityTotal=analysisAmount(s.city,j,m.stock,n,dir);if(!Number.isFinite(quantityTotal)||(dir===-1&&s.gold+quantityTotal>1e12))return notice('Prototype domain limit');if(dir===1){if(n>m.stock");
    replaceOnce('profit=q.costs[j]==null?null:n*(m.price-q.costs[j])','profit=q.costs[j]==null?null:quantityTotal-n*q.costs[j]');
    for(const token of ['n*m.price','m.price*n']){assert(trade.includes(token));edits.push({replaceAll:token,with:'quantityTotal'});trade=trade.replaceAll(token,'quantityTotal')}
    assert.equal(trade.split('unitPrice:m.price').length-1,2);trade=trade.replaceAll('unitPrice:m.price','unitPrice:quantityTotal/n');
    replaceOnce('m.stock-=n;','m.stock-=n;analysisPrice(s.city,j,m);');
    replaceOnce('m.stock+=n;','m.stock+=n;analysisPrice(s.city,j,m);');
    context.analysisAmount=(c,j,stock,n,dir)=>{
      // Invalid request still follows the original refusal path, with no mutation.
      try{return Q.quote(anchors[c][j],stock,n,dir).total}catch{return Infinity}
    };
    context.analysisPrice=(c,j,m)=>{m.price=Q.edge(anchors[c][j],Math.max(1,m.stock))};
    context.analysisAnchor=(m,c,j)=>{anchors[c][j]=Q.anchor(m.price,m.stock)};
    evaluate(trade);
    // Same daily price/stock rules, order and random draws. Anchor refreshed only after real market progress.
    evaluate('const originalRegionalDay=regionalMarketDay;regionalMarketDay=function(m,c,j){originalRegionalDay(m,c,j);analysisAnchor(m,c,j)};');
  }
  function snapshot(){return {analysisOnly:true,model,gameHash:hash(html),game:clean(evaluate('s')),anchors:clean(anchors),rng:{state:randomState,draws},clock}}
  return {eval:evaluate,context,events,disk,edits,snapshot,
    rng:()=>({state:randomState,draws}),
    state:()=>clean(evaluate('s')),
    resetAnchors(){anchors=clean(evaluate('s.markets')).map(row=>row.map(m=>Q.anchor(m.price,m.stock)))},
    quote(j,n,dir){const state=evaluate('s'),m=state.markets[state.city][j];return model==='B'?Q.quote(anchors[state.city][j],m.stock,n,dir):{total:m.price*n,average:m.price,quantity:n,stockAfter:m.stock-dir*n}},
    max(j,reserve=0){const state=evaluate('s'),q=evaluate('ship()'),m=state.markets[state.city][j],free=evaluate('capacity()-load()'),gold=Math.max(0,state.gold-reserve);return model==='B'?Q.maxBuy(anchors[state.city][j],m.stock,gold,free).quantity:Math.floor(Math.min(m.stock,free,gold/m.price))},
    trade(j,n,dir){const before=events.length;evaluate(`$('qty${j}').value=${JSON.stringify(String(n))};trade(${j},${dir});`);return events.slice(before).find(e=>e.type===(dir===1?'buy':'sell'))??null},
    transfer(j,n,dir){evaluate(`$('warehouseQty${j}').value=${JSON.stringify(String(n))};`);return evaluate(`warehouseTransfer(${j},${dir})`)},
  };
}
module.exports={Q,root,file,html,hash,clean,create};
