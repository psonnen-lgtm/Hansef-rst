// Bounded legacy baseline; actual Q1.09 top-level actions are asynchronous.
const {createSuite}=require('./async-driver.cjs');
const suite=createSuite(),{test}=suite;
(async()=>{
await test('fresh save validates','return migrate(s)?.v===13');
await test('invalid v3 rejected','return migrate({v:3})===null');
await test('negative gold rejected','let x=fresh("Ulf","Ulf");x.gold=-1;return migrate(x)===null');
await test('v3 assigns all ship locations','let x=fresh("Ulf","Ulf");x.v=3;delete x.information;delete x.politics;delete x.shipyard;delete x.economy;delete x.storage;x.markets=x.markets.slice(0,5).map(c=>c.slice(0,7));x.warehouses=emptyWarehouses(5);x.city=2;delete x.ships[0].city;return migrate(x).ships[0].city===2');
await test('legacy cargo has unknown cost','let x=migrate({version:1,ship:{cargo:{0:10}},markets:s.markets.slice(0,5).map(c=>c.slice(0,7))});return x&&x.ships[0].costs[0]===null');
await test('malformed cargo rejected','let x=fresh("Ulf","Ulf");x.ships[0].cargo={0:-1};return migrate(x)===null');
await test('credit does not grow with borrowing','s=fresh("Ulf","Ulf");let a=creditLimit();s.gold+=a;s.debt+=a;return creditLimit()===a&&creditLimit()-s.debt===0');
await test('single arrival moves only chosen ship and cannot repeat','s=fresh("Ulf","Ulf");s.ships.push(makeShip(0));pending={from:0,dest:1,days:2,qs:[s.ships[0].id],event:null};arrive();arrive();return s.day===3&&s.rep===1&&s.ships[0].city===1&&s.ships[1].city===0');
await test('remote cargo cannot be traded','s.city=1;s.ships.push(makeShip(0,{id:2,city:0}));s.active=1;let gold=s.gold;document.getElementById("qty0").value=1;trade(0,1);return s.gold===gold');
await test('quest completion waits five days for new offer','s=fresh("Ulf","Ulf");questsView();let q=s.quests[0];completeQuests(q.j,q.n);questsView();let empty=s.quests.length===0;advance(5);questsView();return empty&&s.quests.length===1');
await test('expired quest gives no reward','s=fresh("Ulf","Ulf");s.quests=[{city:0,j:0,n:1,reward:100,until:totalDay()-1}];let gold=s.gold;completeQuests(0,1);return s.gold===gold');
await test('unknown cost survives mixed purchase','s=fresh("Ulf","Ulf");ship().cargo[0]=1;ship().costs[0]=null;document.getElementById("qty0").value=1;trade(0,1);return ship().costs[0]===null');
await test('known weighted purchase and partial sale','s=fresh("Ulf","Ulf");ship().cargo[0]=10;ship().costs[0]=10;s.markets[0][0].price=20;document.getElementById("qty0").value=10;trade(0,1);trade(0,-1);return ship().cargo[0]===10&&ship().costs[0]===15');
await test('arrival fee is charged exactly once','s=fresh("Ulf","Ulf");pending={from:0,dest:1,days:2,fee:6,qs:[ship().id],event:null};let gold=s.gold;arrive();arrive();return s.gold===gold-6');
await test('fee by ship type','for(let i=0;i<3;i++){s=fresh("Ulf","Ulf");s.ships=[makeShip(i)];pending=null;planTravel(1);if(pending.fee!==[4,6,9][i])return false}return true');
await test('convoy fee excludes remote ship','s=fresh("Ulf","Ulf");s.ships.push(makeShip(0),makeShip(2));s.ships[2].city=2;planTravel(1);return pending.fee===10&&pending.qs.length===2');
await test('insufficient gold blocks departure','s=fresh("Ulf","Ulf");s.gold=5;pending=null;planTravel(1);return pending===null&&s.gold===5&&s.city===0');
await test('exact fee allows departure','s=fresh("Ulf","Ulf");s.gold=6;planTravel(1);pending.event=null;arrive();return s.gold===0&&s.city===1');
await test('planning does not charge fee','s=fresh("Ulf","Ulf");let gold=s.gold;planTravel(1);closeSheet();return s.gold===gold&&s.city===0');
console.log(suite.checks.length+' checks passed');
suite.write(process.argv[2]);
})().catch(e=>{suite.write(process.argv[2]);console.error(e);process.exitCode=1});
