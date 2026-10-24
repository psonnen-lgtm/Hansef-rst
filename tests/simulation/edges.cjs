const {create}=require('./headless.cjs'),assert=require('assert/strict');let n=0;function check(name,code){const g=create(123);assert.equal(g.eval('(()=>{'+code+'})()'),true,name);console.log('PASS '+name);n++}
check('credit cannot compound through loans','let limit=creditLimit();for(let i=0;i<10;i++){$("loan").value=limit;bankOp("borrow")}return s.debt===limit');
check('same-city roundtrip gives no trading profit','let gold=s.gold;$("qty0").value=10;trade(0,1);trade(0,-1);return s.gold===gold');
check('weapons cannot overload ship','ship().cargo[0]=85;let gold=s.gold;armShip();return ship().arms===0&&load()<=capacity()&&s.gold===gold');
check('convoy uses slowest ship','s.ships.push(makeShip(2));planTravel(4);return pending.days===Math.ceil(4/.72)&&pending.qs.length===2&&pending.fee===15');
check('piracy destroys at most available cargo','ship().cargo[0]=1;ship().costs[0]=16;pending={from:0,dest:1,days:2,fee:6,qs:[ship().id],event:"pirates",loss:3};arrive();return load()===0&&s.gold===4994');
check('defended piracy preserves cargo','ship().cargo[0]=10;pending={from:0,dest:1,days:2,fee:6,qs:[ship().id],event:"defended"};arrive();return load()===10');
check('annual interest uses declared rates','s.bank=1000;s.debt=1000;s.day=360;advance(1);return s.bank===1020&&s.debt===1060');
check('special rumor expires on advance','s.markets[1][0].price=999;s.rumors=[{city:1,j:0,special:true,until:totalDay(),expired:false}];advance(1);return s.markets[1][0].price!==999&&s.rumors.length===0');
check('negative gold save rejected','let x=JSON.parse(JSON.stringify(s));x.gold=-1;return migrate(x)===null');
check('negative or excessive cargo rejected','let x=JSON.parse(JSON.stringify(s));x.ships[0].cargo[0]=91;return migrate(x)===null');
// These assert known exploitable behaviour rather than silently changing balance.
check('KNOWN: planning rerolls hazards without time or money','let outcomes=new Set(),gold=s.gold,day=s.day;for(let i=0;i<100;i++){planTravel(1);outcomes.add(pending.event)}return outcomes.size>1&&gold===s.gold&&day===s.day');
check('KNOWN: cheap purchases immediately inflate rank wealth','let before=netWorth();s.markets[0][6]={price:59,stock:100};$("qty6").value=50;trade(6,1);return netWorth()-before===1250');
check('KNOWN: standing still at year end earns full annual interest','s.day=360;s.bank=10000;advance(1);return s.bank===10200');
check('KNOWN: repair fee independent of hull type','s.ships=[makeShip(0),makeShip(2)];for(const q of s.ships)q.condition=50;let a=s.gold;repairShip();let x=a-s.gold;s.active=1;a=s.gold;repairShip();return x===a-s.gold&&x===400');
console.log(n+' deterministic mechanism checks passed');
