'use strict';
// Purpose-specific analysis transaction. The VM's trade()/production functions stay original.
const assert=require('node:assert/strict'),{clean,hash,gameHash}=require('./harness.cjs');
const integer=(n,lo=0,hi=1e12)=>Number.isSafeInteger(n)&&n>=lo&&n<=hi;
function foreignPrefix(q,n){let left=n,foreign=0;for(const lot of q.origins?.[0]??[]){const used=Math.min(left,lot.n);if(lot.city!==null&&lot.city!==0)foreign+=used;left-=used;if(!left)break}return {foreign,complete:left===0}}
function attach(h){
 const g=h.g;let side={version:1,scope:{city:0,good:0},supplier:'player',revision:0,debt:0,need:null,consumed:0,deliveries:{}};
 let busy=false,expected=null;const day=()=>g.eval('totalDay()');
 function envelope(){return {analysisOnly:true,kind:'P12-public-grain',version:1,gameHash,game:h.state(),supply:clean(side),rng:h.rng()}}
 function validateSide(x,game){assert.equal(x.version,1);assert.deepEqual(x.scope,{city:0,good:0});assert.equal(x.supplier,'player');assert(integer(x.revision));assert(integer(x.debt));assert(integer(x.consumed));
  let consumed=0;for(const [id,v] of Object.entries(x.deliveries)){assert.equal(v.receipt.deliveryId,id);const r=v.receipt;assert.equal(r.city,0);assert.equal(r.good,0);assert.equal(r.supplier,'player');assert(integer(r.accepted));assert(r.accepted<=r.transferredQuantity);assert(['A','B','C'].includes(r.mode));assert(['final','not_recognized'].includes(r.recognitionStatus));assert.equal(r.recognitionStatus,r.accepted?'final':'not_recognized');assert(r.date<=game.year*360+game.day);consumed+=r.accepted;}
  assert.equal(consumed,x.consumed);if(x.need){assert(integer(x.need.capacity,1,90));assert(integer(x.need.remaining,0,x.need.capacity));assert.equal(x.need.capacity-x.need.remaining,x.consumed);assert.equal(x.need.city,0);assert.equal(x.need.good,0);}else assert.equal(x.consumed,0);
 }
 function validateFrame(x){assert(integer(x.rng.state,0,0xffffffff));assert(integer(x.rng.draws));assert(integer(x.rng.clock,0,Number.MAX_SAFE_INTEGER));}
 function checkedEnvelope(){const x=envelope();validateFrame(x);g.context.p12Validate=x.game;g.eval('validate(p12Validate)');validateSide(x.supply,x.game);return x}
 function fail(message){const e=Error(message);e.refusal=true;throw e}
 function commit(label,fn){
  if(busy)return {ok:false,reason:'busy'};
  if(h.backend.get()!==expected)return {ok:false,reason:'stale-disk'};
  if(expected&&JSON.stringify(JSON.parse(expected).game)!==JSON.stringify(h.state()))return {ok:false,reason:'stale-memory'};
  const oldGame=h.state(),oldSide=clean(side),oldRng=h.rng(),captured=[];busy=true;
  g.context.p12Candidate=clean(oldGame);g.context.p12Capture=(type,details={})=>captured.push(clean({type,...details}));
  g.context.p12StageStorage={getItem:k=>h.disk[k]??null,setItem(){}};
  g.eval('p12SavedHooks={save,render,marketView,event:Testlog.event,storage:localStorage};s=p12Candidate;save=()=>{};render=()=>{};marketView=()=>{};Testlog.event=p12Capture;localStorage=p12StageStorage;');
  try{
   const value=fn();side.revision++;const candidate=checkedEnvelope(),raw=JSON.stringify(candidate);
   // Check again before final store; simulated reentry cannot enter while busy.
   if(h.backend.get()!==expected)fail('stale-before-commit');h.assertNativeUnchanged();h.backend.put(raw,expected);expected=raw;
   g.events.push(...captured);return {ok:true,value:clean(value??null),events:captured};
  }catch(e){h.setGame(oldGame);side=oldSide;h.restoreRng(oldRng);return {ok:false,reason:e.message};}
  finally{g.eval('save=p12SavedHooks.save;render=p12SavedHooks.render;marketView=p12SavedHooks.marketView;Testlog.event=p12SavedHooks.event;localStorage=p12SavedHooks.storage;');busy=false;}
 }
 // Fresh analysis wrapper only. Never writes a productive save format/key.
 expected=JSON.stringify(checkedEnvelope());h.backend.put(expected);
 function current(){const x=h.state();if(x.city!==0||x.ships[x.active].city!==0)fail('scope city');return {x,q:x.ships[x.active],m:x.markets[0][0]}}
 function native(n,dir){const start=0;g.eval(`$('qty0').value=${JSON.stringify(String(n))};trade(0,${dir})`);return start}
 function publicDelivery(req){
  if(!req||!['A','B','C'].includes(req.mode)||!integer(req.n,1,10000)||typeof req.id!=='string'||!/^[-\w:./]{1,100}$/.test(req.id))return {ok:false,reason:'invalid request'};
  if((req.city??0)!==0||(req.good??0)!==0||(req.supplier??'player')!=='player')return {ok:false,reason:'scope'};
  const request={id:req.id,mode:req.mode,n:req.n,sourceShipId:h.state().ships[h.state().active].id,fairPrice:req.fairPrice??null};
  if(['__proto__','prototype','constructor'].includes(req.id))return {ok:false,reason:'invalid id'};const existing=Object.hasOwn(side.deliveries,req.id)?side.deliveries[req.id]:null;if(existing){if(JSON.stringify(existing.request)!==JSON.stringify(request))return {ok:false,reason:'delivery-id-conflict'};return {ok:true,replayed:true,value:clean(existing.receipt),events:[]};}
  if(req.cancel)return {ok:false,reason:'cancelled'};
  if(req.expectedRevision!==undefined&&req.expectedRevision!==side.revision)return {ok:false,reason:'stale-revision'};
  return commit('public',()=>{
   const {q,m}=current(),need=side.need,n=req.n;
   if(!need||day()>need.until)fail('no active controlled need');
   if(n>(q.cargo[0]||0))fail('insufficient cargo');
   const prefix=foreignPrefix(q,n);if(!prefix.complete)fail('missing FIFO proof');
   const cost=q.costs[0]??null,book=g.eval('cargoBookPrice(ship(),0)'),quote=m.price;
   const fair=req.fairPrice??Math.max(4,Math.min(16,quote-1));
   if(req.mode==='B'&&(!integer(fair,4,1e9)||fair>=quote||fair>16))fail('no fair concession');
   const price=req.mode==='A'?quote:req.mode==='B'?fair:0;
   let accepted,transferred=n;
   if(req.mode==='C'){
    if(side.debt>0)fail('own withdrawals not restored');
    accepted=Math.min(n,need.remaining);if(!accepted)fail('need covered');
    // Do not skip the actual native FIFO to reach foreign goods behind local ones.
    const consumedPrefix=foreignPrefix(q,accepted);if(consumedPrefix.foreign!==accepted)fail('donation prefix not foreign');
    transferred=accepted;
    g.eval(`ensureCargoRecords(ship());consumeOrigins(ship(),0,${accepted},0);ship().cargo[0]-=${accepted};if(!ship().cargo[0])for(const k of ['cargo','costs','bookCosts','origins'])delete ship()[k][0];`);
    g.eval(`Testlog.event('public_grain_donation',{quantity:${accepted},revenue:0});observe()`);
   }else{
    accepted=Math.min(need.remaining,prefix.foreign,Math.max(0,n-side.debt));
    if(m.stock+n-accepted>1e9)fail('market stock limit');
    // Temporary execution quote only. Original V13 trade, weighted costs, FIFO/quests.
    g.eval(`s.markets[0][0].price=${price}`);native(n,-1);if((current().q.cargo[0]||0)!==(q.cargo[0]||0)-n)fail('native sale refused');g.eval(`s.markets[0][0].price=${quote};s.markets[0][0].stock-=${accepted};observe();`);
    side.debt=Math.max(0,side.debt-n);
   }
   need.remaining-=accepted;side.consumed+=accepted;
   const r={city:0,cityName:'Lübeck',good:0,goodName:'Getreide',needId:need.id,deliveryId:req.id,supplier:'player',sourceShipId:q.id,requestedQuantity:n,transferredQuantity:transferred,accepted,mode:req.mode,
    originalMarketPrice:quote,executedUnitPrice:price,actualRevenue:req.mode==='C'?0:n*price,publicRevenue:accepted*price,
    foregoneRevenue:req.mode==='C'?accepted*quote:n*(quote-price),publicPriceConcession:accepted*(quote-price),
    actualGoodsCost:cost===null?null:transferred*cost,publicGoodsCost:cost===null?null:accepted*cost,consumedBookValue:accepted*book,
    date:day(),recognitionStatus:accepted?'final':'not_recognized',historicalCostKnown:cost!==null};
   side.deliveries[req.id]={request,receipt:r};if(accepted)g.eval(`Testlog.event('public_grain_recognition',${JSON.stringify(r)})`);
   return r;
  });
 }
 return {
  publicDelivery,
  certify(id='p12:controlled:luebeck:grain:1',capacity=90){return commit('certify',()=>{const {m}=current();if(side.need)fail('one need only');if(!integer(capacity,1,90)||m.stock+side.debt>40||capacity>110-(m.stock+side.debt))fail('not a genuine controlled shortage');side.need={id,city:0,good:0,capacity,remaining:capacity,created:day(),until:day()+90,provenance:'controlled V13 fixture, no automatic crisis detector',stock:m.stock,correctedStock:m.stock+side.debt};return side.need;});},
  buy(n){return commit('buy',()=>{if(!integer(n,1,10000))fail('quantity');const before=current(),count=before.q.cargo[0]||0;native(n,1);const after=current();if((after.q.cargo[0]||0)!==count+n)fail('native buy refused');side.debt+=n;return {quantity:n,total:before.m.price*n};});},
  ordinarySale(n){return commit('ordinary-sale',()=>{if(!integer(n,1,10000))fail('quantity');const before=current(),count=before.q.cargo[0]||0;if(n>count||before.m.stock+n>1e9)fail('native sale limit');native(n,-1);if((current().q.cargo[0]||0)!==count-n)fail('native sale refused');side.debt=Math.max(0,side.debt-n);return {quantity:n};});},
  transfer(n,dir){return commit('transfer',()=>{current();if(!integer(n,1,10000)||![1,-1].includes(dir))fail('quantity');g.eval(`$('warehouseQty0').value=${JSON.stringify(String(n))}`);if(!g.eval(`warehouseTransfer(0,${dir})`))fail('native transfer refused');return true;});},
  select(index){return commit('select',()=>{if(!integer(index,0,h.state().ships.length-1))fail('ship');g.eval(`s.active=${index}`);current();return true;});},
  advance(days){return commit('advance',()=>{if(!integer(days,1,7))fail('bounded days');g.eval(`advance(${days})`);return {days};});},
  side:()=>clean(side),snapshot:()=>clean(checkedEnvelope()),export:()=>JSON.stringify(checkedEnvelope()),
  reload(raw){if(busy)return {ok:false,reason:'busy'};const oldGame=h.state(),oldSide=clean(side),oldRng=h.rng();try{const x=JSON.parse(raw);assert.equal(x.analysisOnly,true);assert.equal(x.kind,'P12-public-grain');assert.equal(x.version,1);assert.equal(x.gameHash,gameHash);validateFrame(x);validateSide(x.supply,x.game);h.setGame(x.game);side=clean(x.supply);h.restoreRng(x.rng);const rawCandidate=JSON.stringify(checkedEnvelope());h.backend.put(rawCandidate,expected);expected=rawCandidate;return {ok:true};}catch(e){h.setGame(oldGame);side=oldSide;h.restoreRng(oldRng);return {ok:false,reason:e.message}}},
  recognitions:()=>clean(Object.values(side.deliveries).map(d=>d.receipt).filter(r=>r.recognitionStatus==='final')),
 };
}
module.exports={attach,foreignPrefix};
