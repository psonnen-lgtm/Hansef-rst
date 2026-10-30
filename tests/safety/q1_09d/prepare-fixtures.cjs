'use strict';
// Local, synthetic data only. No network, browser profile, server or deployment.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {originalState:S,environment:E}=require('../q1_09c/harness.cjs');
const out=process.argv[2];
if(!out||fs.existsSync(out))throw Error('Provide a NEW output directory; existing data is never overwritten.');
const root=path.resolve(__dirname,'../../..');
const expectedHash='50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048';
const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
if(digest(fs.readFileSync(path.join(root,'Hansefuerst_0_4.html')))!==expectedHash)throw Error('Wrong game source');
fs.mkdirSync(out,{recursive:true});
function legacy(name,code=''){
 return S('s.name='+JSON.stringify(name)+';s.ships[0].id=1;s.ships[0].name="TEST Kogge Luebeck";s.shipyard.lastShipId=1;'+code+';s.messages.unshift("AUSSCHLIESSLICH SYNTHETISCHE TESTDATEN Q1.09d – keine echte Partie.")');
}
const g=E();g.eval('s=newMerchantGame("Ulf","TEST Q109d Neustart",0);s.ships[0].id=1;s.ships[0].name="TEST Kogge Luebeck";s.shipyard.lastShipId=1;s.messages.unshift("AUSSCHLIESSLICH SYNTHETISCHE TESTDATEN Q1.09d – keine echte Partie.");validate(s)');
const rows=[
 ['TEST_01_neustart_v13_safety3.json',g.state(),'Neustart-Referenz, persönlicher Ort Lübeck bekannt; ersetzt nicht den separaten UI-Neustarttest.'],
 ['TEST_02_altstand_v13.json',legacy('TEST Q109d Altstand','s.gold=5200;s.rep=4'),'Regulärer künstlicher V13-Altstand ohne Sicherheitsrevision, persönlicher Ort zunächst unbekannt.'],
 ['TEST_03_mehrere_schiffe_v13.json',legacy('TEST Q109d Flotte','s.gold=20000;s.ships.push(makeShip(0,{id:2,city:1}),makeShip(2,{id:3,city:2}));s.ships[1].name="TEST Schnigge Hamburg";s.ships[2].name="TEST Holk Rostock";s.shipyard.lastShipId=3'),'Drei Schiffe in Lübeck, Hamburg und Rostock; ohne Waren oder Schulden.'],
 ['TEST_04_kredit_waren_v13.json',legacy('TEST Q109d Kredit Waren','s.gold=12000;s.bank=2500;s.debt=700;ship().cargo={0:7};ship().costs={0:8};ship().bookCosts={0:8};ship().origins={0:[{city:1,n:7}]};s.warehouses[0]={cargo:{3:12},costs:{3:10},bookCosts:{3:10},origins:{3:[{city:4,n:12}]}}'),'Bargeld 12000, Bank 2500, Kredit 700; 7 Fass Getreide an Bord, 12 Fass Salz im Lübecker Lager.'],
 ['TEST_05_politik_vertrag_v13.json',legacy('TEST Q109d Politik','s.gold=50000;s.rep=80;s.rank=3;s.politics.legacyRank=3;acceptPoliticalJob("accord");s.politics.appointments[0]={city:0,day:totalDay(),support:100};s.politics.office={city:0,start:totalDay(),until:totalDay()+360,firstReceipt:0}'),'Künstlich gesetzter historischer Bürgermeistertitel, Amt Lübeck und laufender Ratsvertrag; kein Beleg einer erspielten Karriere.']
];
const manifest={date:'2026-10-30 Europe/Berlin',baseCommit:'be3f367ac1374cf6ca3525e34be44d51f0eaf24b',testedGameCommit:'c7201c089dbb8079c0b5a5e3e1728b5b0888f49e',gameSHA256:expectedHash,syntheticOnly:true,source:'Deterministic fresh game factories; no user save or archived simulation endpoint. Four legacy V13 fixtures use the preserved historical fresh-state factory; one current new_start factory.',files:[]};
for(const [file,x,purpose]of rows){
 const text=JSON.stringify(x,null,2)+'\n';fs.writeFileSync(path.join(out,file),text,{flag:'wx'});
 manifest.files.push({file,sha256:digest(text),purpose,expected:{v:x.v,name:x.name,city:x.city,day:x.day,year:x.year,gold:x.gold,bank:x.bank,debt:x.debt,rep:x.rep,rank:x.rank,ships:x.ships.map(q=>({id:q.id,name:q.name,type:q.type,city:q.city,cargo:q.cargo,costs:q.costs,bookCosts:q.bookCosts??{},origins:q.origins??{}})),warehouses:x.warehouses,office:x.politics.office,jobs:x.politics.jobs,originalSafetyVersion:x.politics.safety?.version??null}});
}
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
console.log('Generated five synthetic saves and manifest in '+out);
