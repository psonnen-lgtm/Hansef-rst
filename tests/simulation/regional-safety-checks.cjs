// Additional cross-checks of rescue, ship sale and unchanged nonmarket rules.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');process.env.HANSE_GAME=path.resolve(__dirname,'../../Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{prototype,MODELS}=require('./phase05h-run.cjs'),clean=x=>JSON.parse(JSON.stringify(x)),checks=[];
for(const model of MODELS){
 const g=create(919),control=create(919);g.load(prototype);g.eval(`installRegionalEconomy('${model}')`);
 const names=['trade','warehouseTransfer','consumeOrigins','completeQuests','creditLimit','bankOp','planTravel','arrive','rollTravel','shipSaleQuote','sellShip','harborWorkEligibility','performHarborWork','dailyMarketPrice','migrateToCitiesV6','validate','fresh','promote'];
 for(const name of names)assert.equal(g.eval(`${name}.toString()`),control.eval(`${name}.toString()`));
 g.eval("s.gold=0;s.debt=1000;ship().condition=0;let written=null;localStorage.setItem=(key,value)=>{written=value};let beforeAid=JSON.parse(JSON.stringify(s));let allowedAid=harborWorkEligibility().allowed");assert.equal(g.eval('allowedAid'),true);
 assert.equal(g.eval('performHarborWork()'),true);assert.equal(g.eval('s.gold'),20);assert.equal(g.eval('s.flags.harborWorkUsed'),true);assert.equal(g.eval('JSON.parse(written).flags.harborWorkUsed'),true);assert.equal(g.eval('performHarborWork()'),false);
 const after=clean(g.eval('({markets:s.markets,day:s.day,year:s.year,debt:s.debt})'));
 // A state JSON reset does not reset RNG. Use an independent same-seed context.
 control.load(prototype);control.eval(`installRegionalEconomy('${model}');s.gold=0;s.debt=1000;ship().condition=0;advance(3)`);
 assert.deepEqual(clean(control.eval('({markets:s.markets,day:s.day,year:s.year,debt:s.debt})')),after);
 g.eval("s=fresh('Ulf','Sale');s.ships.push(makeShip(0));let spare=s.ships[1];let quote=shipSaleQuote(spare.id);let beforeGold=s.gold;sellShip(spare.id)");assert.equal(g.eval('quote.price'),2320);assert.equal(g.eval('s.gold-beforeGold'),2320);assert.equal(g.eval('s.ships.length'),1);assert.equal(g.eval('shipSaleQuote(s.ships[0].id).allowed'),false);
 checks.push({model,unchangedRuleBodies:names,harborWorkDays:3,harborWorkGold:20,persistentOneShot:true,spareSaleGold:2320,lastShipProtected:true});console.log('PASS safety '+model);
}
const result={kind:'controlled_cross_mechanic_checks_not_full_strategy_games',gameSHA256:hash,checks};assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n',{flag:'wx'});
