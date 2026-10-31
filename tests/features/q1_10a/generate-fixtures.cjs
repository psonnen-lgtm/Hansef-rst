'use strict';
// Synthetic fresh states only, generated with the preserved historical factory.
const fs=require('node:fs'),{originalState:S}=require('../../safety/q1_09c/harness.cjs');
const f=code=>S('s.name="Synthetische Pruefung";s.ships[0].id=1;s.shipyard.lastShipId=1;'+code);
const basic=f('');
const rich=f('s.gold=12000;s.bank=2500;s.debt=700;ship().cargo={0:7};ship().costs={0:8};ship().bookCosts={0:8};ship().origins={0:[{city:1,n:7}]};s.warehouses[0]={cargo:{3:12},costs:{3:10},bookCosts:{3:10},origins:{3:[{city:4,n:12}]}};s.ships.push(makeShip(0,{id:2,city:1}));s.shipyard.lastShipId=2');
const political=f('s.gold=50000;s.rep=80;s.rank=3;s.politics.legacyRank=3;acceptPoliticalJob("accord");s.politics.appointments[0]={city:0,day:totalDay(),support:100};s.politics.office={city:0,start:totalDay(),until:totalDay()+360,firstReceipt:0}');
const grace=f('acceptPoliticalJob("accord");s.politics.jobs[0].until=totalDay()+1;ship().condition=50');
const m2=structuredClone(political);m2.politics.version=2;m2.politics.safety={version:1,revision:5,person:{city:0,source:'arrival',at:486001},legacyPersonalJobs:[]};
const regular=structuredClone(basic);regular.politics.version=2;regular.politics.safety={version:3,revision:0,person:{city:0,source:'new_start',at:486001},legacyPersonalJobs:[],legacyTransfer:null,grace:[]};
const test=structuredClone(regular);test.name='TEST Q109f Kopie';test.flags.q109fSynthetic=true;
const neutral=f('s.gold=10000;ship().cargo={0:30};ship().costs={0:8};ship().bookCosts={0:8};ship().origins={0:[{city:1,n:30}]};s.markets[0][0]={price:30,stock:110}');
const fixtures={syntheticOnly:true,basic,rich,political,grace,m2,regular,test,neutral};
const out=process.argv[2];if(!out||fs.existsSync(out))throw Error('New fixture output required');fs.writeFileSync(out,JSON.stringify(fixtures,null,2)+'\n',{flag:'wx'});console.log('Synthetic fixtures generated; no archived endpoints or real saves.');
