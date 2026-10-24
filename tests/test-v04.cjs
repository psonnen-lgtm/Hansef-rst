const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../Hansefuerst_0_4.html','utf8');let src=html.match(/<script>([\s\S]*?)<\/script>/)[1];src=src.slice(0,src.indexOf('try{let raw=localStorage.getItem(KEY)'));
const nodes={},ctx={console,Date,Math,alert(){},confirm:()=>true,localStorage:{setItem(){}},document:{getElementById(id){return nodes[id]??={value:1,innerHTML:'',classList:{remove(){},add(){}}}}}};vm.createContext(ctx);vm.runInContext(src,ctx);let checks=0;function test(name,code){assert.equal(vm.runInContext('(()=>{'+code+'})()',ctx),true,name);console.log('PASS '+name);checks++}
vm.runInContext('render=()=>{};drawMap=()=>{};s=fresh("Ulf","Ulf");',ctx);
test('fresh save validates','return migrate(s)?.v===4');
test('invalid v3 rejected','return migrate({v:3})===null');
test('negative gold rejected','let x=fresh("Ulf","Ulf");x.gold=-1;return migrate(x)===null');
test('v3 assigns all ship locations','let x=fresh("Ulf","Ulf");x.v=3;x.city=2;delete x.ships[0].city;return migrate(x).ships[0].city===2');
test('legacy cargo has unknown cost','let x=migrate({version:1,ship:{cargo:{0:10}},markets:s.markets});return x&&x.ships[0].costs[0]===null');
test('malformed cargo rejected','let x=fresh("Ulf","Ulf");x.ships[0].cargo={0:-1};return migrate(x)===null');
test('credit does not grow with borrowing','s=fresh("Ulf","Ulf");let a=creditLimit();s.gold+=a;s.debt+=a;return creditLimit()===a&&creditLimit()-s.debt===0');
test('single arrival moves only chosen ship and cannot repeat','s=fresh("Ulf","Ulf");s.ships.push(makeShip(0));pending={from:0,dest:1,days:2,qs:[s.ships[0].id],event:null};arrive();arrive();return s.day===3&&s.rep===1&&s.ships[0].city===1&&s.ships[1].city===0');
test('remote cargo cannot be traded','s.active=1;let gold=s.gold;document.getElementById("qty0").value=1;trade(0,1);return s.gold===gold');
test('quest completion waits five days for new offer','s=fresh("Ulf","Ulf");questsView();let q=s.quests[0];completeQuests(q.j,q.n);questsView();let empty=s.quests.length===0;advance(5);questsView();return empty&&s.quests.length===1');
test('expired quest gives no reward','s=fresh("Ulf","Ulf");s.quests=[{city:0,j:0,n:1,reward:100,until:totalDay()-1}];let gold=s.gold;completeQuests(0,1);return s.gold===gold');
test('unknown cost survives mixed purchase','s=fresh("Ulf","Ulf");ship().cargo[0]=1;ship().costs[0]=null;document.getElementById("qty0").value=1;trade(0,1);return ship().costs[0]===null');
test('known weighted purchase and partial sale','s=fresh("Ulf","Ulf");ship().cargo[0]=10;ship().costs[0]=10;s.markets[0][0].price=20;document.getElementById("qty0").value=10;trade(0,1);trade(0,-1);return ship().cargo[0]===10&&ship().costs[0]===15');
console.log(checks+' checks passed');
