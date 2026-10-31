'use strict';
// Reuse existing production-code VM. No quantity-price or political prototype imports.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../..');process.env.HANSE_GAME=path.join(root,'Hansefuerst_0_4.html');
const {create:productionCreate,hash:gameHash}=require('../../simulation/headless.cjs');
const html=fs.readFileSync(process.env.HANSE_GAME,'utf8'),clean=x=>JSON.parse(JSON.stringify(x));
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');let created=0;
function createCase(name,{quantity=90,cost=8,book=8,stock=20,price=30,day=1,warehouseQuantity=0,warehouseCost=8,warehouseBook=8,quest=false,secondShip=false}={}){
 if(++created>12)throw Error('twelve trajectory budget exceeded');
 const g=productionCreate(71201),disk={},writes=[];let rngState=71201,draws=0,clock=1700000100000;
 g.context.Math.random=()=>{rngState=(rngState+0x6D2B79F5)>>>0;draws++;let t=rngState;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296};
 g.context.Date.now=()=>clock++;
 g.eval(`s.name='Getreideprobe';s.gold=10000;s.day=${day};s.ships=[makeShip(2,{id:1,city:0})];s.active=0;s.city=0;s.storage=freshStorage(totalDay());s.politics=freshPolitics(totalDay());s.information=freshInformation();s.information.letters=freshTradeLetters(totalDay());`);
 g.context.fixtureData={quantity,cost,book,warehouseQuantity,warehouseCost,warehouseBook};
 g.eval(`(()=>{const f=fixtureData,q=ship();ensureCargoRecords(q);if(f.quantity){q.cargo[0]=f.quantity;q.costs[0]=f.cost;q.bookCosts[0]=f.cost??f.book;q.origins[0]=[{city:1,n:f.quantity}]};const w=s.warehouses[0];if(f.warehouseQuantity){w.cargo[0]=f.warehouseQuantity;w.costs[0]=f.warehouseCost;w.bookCosts[0]=f.warehouseCost??f.warehouseBook;w.origins[0]=[{city:1,n:f.warehouseQuantity}]}})();s.markets[0][0]={price:${price},stock:${stock}};${quest?'s.quests=[{city:0,j:0,n:90,reward:100,until:totalDay()+20}];':''}${secondShip?'s.ships.push(makeShip(1,{id:2,city:0}));':''}observe();validate(s);`);
 const backend={fail:false,beforeWrite:null,get:()=>disk['p12-analysis']??null,put(raw,expectedValue){if(this.beforeWrite)this.beforeWrite(raw);if(expectedValue!==undefined&&this.get()!==expectedValue)throw Error('controlled compare-and-swap conflict');if(this.fail)throw Error('controlled analysis quota');disk['p12-analysis']=raw;writes.push('p12-analysis')}};
 g.context.localStorage={getItem:k=>disk[k]??null,setItem(k,v){disk[k]=v;writes.push(k)}};
 g.context.notice=t=>{g.lastNotice=t};g.eval('warehouseView=()=>{}');
 const functions=()=>Object.fromEntries(['trade','consumeOrigins','warehouseTransfer','completeQuests','completePoliticalSupply','regionalPrice','regionalStock','regionalMarketDay','advance','donate','promote'].map(n=>[n,hash(g.eval(n+'.toString()'))]));
 const initialFunctions=functions();
 return {name,g,backend,disk,writes,initialFunctions,functions,
  state:()=>clean(g.eval('s')),rng:()=>({state:rngState,draws,clock}),
  restoreRng(x){rngState=x.state;draws=x.draws;clock=x.clock},
  setGame(x){g.context.p12Incoming=clean(x);g.eval('validate(p12Incoming);s=p12Incoming;')},
  ordinary(n,dir){const start=g.events.length;g.eval(`$('qty0').value=${JSON.stringify(String(n))};trade(0,${dir})`);return clean(g.events.slice(start).find(e=>e.type===(dir===1?'buy':'sell'))??null)},
  advance(n){g.eval(`advance(${n});validate(s)`)},
  snapshot(){return {game:this.state(),rng:this.rng(),events:clean(g.events)}},
  assertNativeUnchanged(){assert.deepEqual(functions(),initialFunctions)},
 };
}
module.exports={root,html,gameHash,clean,hash,createCase,count:()=>created};
