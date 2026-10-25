// Short deliberately repeated routes, separate from the 288 complete games.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{MODELS,prototype}=require('./phase05h-run.cjs'),clean=x=>JSON.parse(JSON.stringify(x));
const routes=[{name:'Venlo–Brügge',a:10,b:8,out:6,back:5},{name:'Danzig–Bergen',a:5,b:6,out:0,back:4},{name:'Nowgorod–Brügge',a:9,b:8,out:10,back:5}],rows=[];
for(const model of MODELS)for(const seed of [60011,60012,60013])for(const route of routes){
 const g=create(seed);g.load(prototype);g.eval(`installRegionalEconomy('${model}');s.gold=5000;s.city=${route.a};ship().city=${route.a};observe()`);
 // Six-year warmup with no ship movement: isolate established regional markets.
 g.eval('advance(2160)');const result=clean(g.eval(`(()=>{const trips=[];for(let leg=0;leg<24;leg++){
 const j=leg%2?${route.back}:${route.out},dest=leg%2?${route.a}:${route.b},m=s.markets[s.city][j],n=Math.max(0,Math.min(m.stock,90,Math.floor((s.gold-100)/m.price))),cash=s.gold;
 if(n){$('qty'+j).value=n;trade(j,1)}pending=null;planTravel(dest);if(!pending)return {trips,stopped:true,gold:s.gold};const days=pending.days;arrive();const surviving=ship().cargo[j]||0;if(surviving){$('qty'+j).value=surviving;trade(j,-1)}trips.push({from:leg%2?${route.b}:${route.a},to:dest,j,n,surviving,days,cashNet:s.gold-cash,price:s.markets[s.city][j].price});validate(s)
 }return {trips,stopped:false,gold:s.gold,wealth:netWorth()}})()`));
 assert.equal(result.trips.length,24);rows.push({model,seed,route:route.name,warmupDays:2160,initialTestCash:5000,initialLocationIsFixture:true,...result});
}
const payload={kind:'controlled_repeated_route_probes_not_complete_strategy_games',gameSHA256:hash,routes,rows};assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify(payload)+'\n',{flag:'wx'});console.log('PASS '+rows.length+' repeated-route fixtures / '+rows.reduce((a,r)=>a+r.trips.length,0)+' actual trips');
