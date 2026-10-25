// Requested recurring routes with actual time, capacity, trade and travel risks.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{prototype,flow}=require('./phase05h2-run.cjs'),clean=x=>JSON.parse(JSON.stringify(x));
const routes=[{name:'Nowgorod–Brügge',a:9,b:8,out:10,back:5},{name:'Bergen–Lübeck',a:6,b:0,out:4,back:0},{name:'Danzig–Brügge (Getreide)',a:5,b:8,out:0,back:5},{name:'Danzig–Brügge (Holz)',a:5,b:8,out:2,back:5},{name:'Venlo–Brügge',a:10,b:8,out:6,back:5},{name:'Venlo–Hamburg',a:10,b:1,out:6,back:2},{name:'Lübeck–Hamburg',a:0,b:1,out:3,back:1}],rows=[];
for(const model of ['B','F'])for(const seed of [62001,62002,62003])for(const requested of [22,90])for(const route of routes){
 const g=create(seed);g.load(prototype+'\n'+flow);g.eval(model==='B'?"installRegionalEconomy('B')":'installRegionalFlow()');g.eval(`advance(2160);s.gold=5000;s.city=${route.a};ship().city=${route.a};observe()`);
 const result=clean(g.eval(`(()=>{const trips=[];for(let leg=0;leg<16;leg++){
 const from=s.city,j=leg%2?${route.back}:${route.out},dest=leg%2?${route.a}:${route.b},m=s.markets[s.city][j],n=Math.max(0,Math.min(m.stock,${requested},Math.floor(Math.max(0,s.gold-100)/m.price))),cash=s.gold,buyPrice=m.price,stockBefore=m.stock,destinationBefore={...s.markets[dest][j]};
 if(n){$('qty'+j).value=n;trade(j,1)}pending=null;planTravel(dest);if(!pending)return {trips,stopped:true,gold:s.gold};const days=pending.days;arrive();const surviving=ship().cargo[j]||0,salePrice=s.markets[s.city][j].price,destinationStockBeforeSale=s.markets[s.city][j].stock;if(surviving){$('qty'+j).value=surviving;trade(j,-1)}trips.push({leg,from,to:dest,j,n,surviving,days,cashNet:s.gold-cash,buyPrice,stockBefore,destinationBefore,salePrice,destinationStockBeforeSale,event:pending.event});validate(s)
 }return {trips,stopped:false,gold:s.gold,wealth:netWorth()}})()`));
 rows.push({model,seed,route:route.name,requested,initialCash:5000,warmupDays:2160,initialLocationIsFixture:true,...result});
}
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify({gameSHA256:hash,kind:'controlled_fixed_route_fixtures_not_complete_strategy_games',routes,rows})+'\n',{flag:'wx'});console.log('PASS '+rows.length+' route fixtures / '+rows.reduce((n,r)=>n+r.trips.length,0)+' actual journeys; blocked '+rows.filter(r=>r.stopped).length);
