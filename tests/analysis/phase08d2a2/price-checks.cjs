'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const H=require('./harness.cjs'),{Q,root,html,hash,clean,create}=H,R=Q.R,old=require('../phase08d2a1/harness.cjs'),out=process.argv[2],checks=[];
if(!out||fs.existsSync(out))throw Error('new output required');
function check(name,f){checks.push({name,passed:true,evidence:f()});console.log('PASS '+name)}
function fixture(p=20,S=240){const g=create();g.eval(`s.gold=100000;s.ships[0]=makeShip(2,{id:1,city:0});s.markets[0][0]={price:${p},stock:${S}};validate(s)`);g.resetAnchors();return g}
check('unchanged production source and only K500 selected',()=>{assert.equal(hash(execFileSync('git',['show','c4244a84e6f4a0ed4579291dc8ebe25ffd2a110e:Hansefuerst_0_4.html'],{cwd:root,maxBuffer:100000000})),hash(html));assert.equal(Q.K,500);return {gameHash:hash(html),k:Q.K}});
check('exact same B3 initial transition prices across required stock and price matrix',()=>{
 const O=require('../phase08d2a1/quantity-model.cjs').getModel('B3');let count=0;
 for(const p of [4,5,8,9,16,56,110,1e9])for(const S of [0,1,3,45,90,110,240,1e9])for(const k of [1,3,45,90,110,240,1e9]){const x=Q.edge(Q.basis(p,S),k);assert.equal(x,O.edge(O.anchor(p,S),k));assert(x>=4&&x<=1e9&&Number.isSafeInteger(x));count++}
 return {edgeComparisons:count,stockCases:[0,1,3,45,90,110,240,1e9],no220or350Executed:true};
});
check('unchanged economic market across arbitrary days retains exact basis and split costs',()=>{
 let paths=0;for(const p of [4,8,20,56,110,1e9])for(const S of [90,110,240,1e9]){
 const a=Q.basis(p,S),total=Q.quote(a,S,90,1).total;let b=a,stock=S,paid=0;
 for(let day=1;day<=90;day++){paid+=Q.quote(b,stock,1,1).total;stock--;const m={price:Q.edge(b,Math.max(1,stock)),stock};b=Q.update(b,m,m,day);assert.equal(b.n,a.n);assert.equal(b.d,a.d)}
 assert.equal(total,paid);assert.equal(Q.quote(b,stock,90,-1).total,total);paths++}return {paths,unchangedDayTransitions:paths*90};
});
check('old B3 +40 example becomes exactly zero after actual unchanged day and reload',()=>{
 let g=fixture(8,180);assert(g.trade(0,70,1));const buy=100000-g.state().gold,before=g.snapshot().anchors[0][0],m=clean(g.state().markets[0][0]);
 g=create(0,0,'precise',g.snapshot());g.eval('const normalRng=Math.random;Math.random=()=>{normalRng();return .5};advance(1);Math.random=normalRng;validate(s)');
 assert.deepEqual(g.state().markets[0][0],m);assert.equal(g.snapshot().anchors[0][0].n,before.n);assert.equal(g.snapshot().anchors[0][0].d,before.d);const sale=g.trade(0,70,-1);assert.equal(sale.total,buy);assert.equal(g.state().gold,100000);
 const savedOld=JSON.parse(fs.readFileSync(path.join(root,'tests/analysis/phase08d2a1/results/checks-attempt1.json')));const oldEvidence=savedOld.checks.find(x=>x.variant==='B3'&&x.name.startsWith('rounded reanchoring')).evidence;
 return {buy,sale:sale.total,goldGain:0,historicalOldGainReadOnly:oldEvidence.actualGoldGain};
});
check('90,9x10,90x1 actual VM buys and sales; reverse-first; no free view ship or warehouse reset',()=>{
 const runs=[];for(const parts of [[90],Array(9).fill(10),Array(90).fill(1)]){let g=fixture();for(const n of parts){assert(g.trade(0,n,1));g.eval('informationBookPanel();tradeLetterPanel();observe()')}runs.push(g)}
 for(const g of runs){assert.equal(g.state().gold,runs[0].state().gold);assert.deepEqual(g.state().markets,runs[0].state().markets);assert.equal(g.quote(0,90,-1).total,100000-g.state().gold)}
 const g=runs[0],basis=g.snapshot().anchors[0][0];g.eval('s.ships.push(makeShip(0,{id:2,city:0}));');assert(g.transfer(0,45,1));g.eval('s.active=1');assert(g.transfer(0,45,-1));assert.deepEqual(g.snapshot().anchors[0][0],basis);assert(g.trade(0,45,-1));g.eval('s.active=0');assert(g.trade(0,45,-1));assert.equal(g.state().gold,100000);
 const r=fixture();r.eval('ship().cargo[0]=90;ship().costs[0]=8;ship().origins={0:[{city:1,n:90}]};');assert(r.trade(0,90,-1));assert(r.trade(0,90,1));assert.equal(r.state().gold,100000);
 return {splits:[1,9,90],warehouseAndTwoShips:true,bothDirectionsNeutral:true};
});
check('true daily price and stock impulses retained; no-op does not create a revision',()=>{
 const a=Q.basis(8,180),before={price:9,stock:110};const n=Q.update(a,before,before,1);assert.equal(n.revision,0);
 const s=Q.update(a,before,{price:9,stock:120},1);assert.equal(s.revision,1);assert.notEqual(s.n,a.n);
 const p=Q.update(a,before,{price:12,stock:120},1);assert.equal(Q.edge(p,120),12);assert.throws(()=>Q.update(p,before,{price:12,stock:120},2,'daily',0));
 const special=Q.update(a,{price:8,stock:180},{price:38,stock:80},2,'special');assert.equal(Q.edge(special,80),38);return {stockImpulse:s,priceImpulse:p,absoluteSpecial:special};
});
check('bounds illegal stock/gold/space and exact difficult rounding schemas fail safely',()=>{
 for(const S of [0,1,3]){const g=fixture(4,S),before=g.state();assert.equal(g.trade(0,S+1,1),null);assert.deepEqual(g.state(),before)}
 const g=fixture();g.eval('s.gold=20');assert.equal(g.trade(0,90,1),null);assert.equal(g.state().gold,20);
 assert.throws(()=>Q.quote(Q.basis(20,1e9),1e9,1,-1));assert.throws(()=>Q.basis(3,110));assert.throws(()=>R.rat(1,0));assert.throws(()=>R.rat('1'+'0'.repeat(4096)));assert.throws(()=>R.valid({n:'02',d:'1'}));
 const a={n:'4250017',d:'2',revision:0,day:0};assert.equal(Q.edge(a,1),9);assert.equal(Q.edge({...a,...R.rat('4250016','2')},1),8);const p=Q.basis(1e9,1e9);assert.equal(Q.edge(p,1),1e9);
 return {lowStocks:[0,1,3],stockMax:1e9,precisionBudgetDigits:R.MAX_DIGITS,overflowRejectsInsteadOfRounding:true};
});
check('original no-trade daily markets and RNG; saved/new specials and expiry',()=>{
 const a=old.create(81001,0,'B3'),b=create(81001);
 for(const g of [a,b])g.eval('const normalSpecial=Math.random;Math.random=()=>{normalSpecial();return .01};takeBath();Math.random=normalSpecial;validate(s)');assert.deepEqual(a.state(),b.state());assert.deepEqual(a.rng(),b.rng());
 const tip=b.state().rumors[0];assert(tip.special);let restored=create(0,0,'precise',b.snapshot());assert.deepEqual(restored.snapshot(),b.snapshot());
 const days=tip.until-b.eval('totalDay()')+1;for(const g of [a,b])g.eval(`advance(${days});validate(s)`);assert.deepEqual(a.state(),b.state());assert.deepEqual(a.rng(),b.rng());
 return {actualOriginalBad:true,savedSpecial:true,expiryDays:days,noAdditionalDraws:true};
});
check('year crossing real multiday travel and original information snapshots survive complete export',()=>{
 let g=create(81003);g.eval('s.day=355;s.storage=freshStorage(totalDay());s.politics=freshPolitics(totalDay());s.information.letters=freshTradeLetters(totalDay());validate(s)');g.resetAnchors();g.disk['hansefuerst-v04']=g.eval('JSON.stringify(s)');assert(g.eval('buyInformation(1,0)'));
 g.eval('advance(s.information.letters.nextDay-totalDay())');g.disk['hansefuerst-v04']=g.eval('JSON.stringify(s)');const offer=g.state().information.letters.offer;assert(g.eval(`buyTradeLetter('${offer.id}')`));const info=clean(g.state().information);assert(g.trade(0,5,1));g.eval('planTravel(1,false);arrive();validate(s)');assert(g.state().year===1351);g=create(0,0,'precise',g.snapshot());assert.deepEqual(g.state().information.reports,info.reports);assert.deepEqual(g.state().information.letters.receipts,info.letters.receipts);return {year:g.state().year,paidBAndCPreserved:true,actualJourney:true,saveSchema:'analysis-only exact fractions',v:g.state().v};
});
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify({phase:'0.8d.2a.2',testedCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameHash:hash(html),checks},null,2)+'\n');console.log(checks.length+' price groups passed');
