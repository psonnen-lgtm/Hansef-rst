const legacyProjection=value=>{const x=JSON.parse(JSON.stringify(value));x.v=4;x.markets=x.markets.map(c=>c.slice(0,7));for(const e of Object.values(x.journal))e.prices=e.prices.slice(0,7);return x};
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const base=process.env.HANSE_BROWSER_BASE||'http://127.0.0.1:8765',shots=process.env.HANSE_WAREHOUSE_SHOTS||'/tmp';
(async()=>{const browser=await chromium.launch({executablePath:process.env.HANSE_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:1280,height:900},hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());await page.goto(base+'/Hansefuerst_0_4.html');
 const oldHtml=execFileSync('git',['show','104ff41:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});const old=await browser.newPage();await old.route('**/old-luebeck.html',r=>r.fulfill({body:oldHtml,contentType:'text/html'}));await old.goto(base+'/old-luebeck.html');
 await old.evaluate(()=>{s=migrate(fresh('Ulf','Luebeck save'));marketView();$('qty6').value=5;trade(6,1);warehouseView();$('warehouseQty6').value=3;warehouseTransfer(6,1);s.bank=100.25;s.debt=77.75;save()});const raw=await old.evaluate(()=>JSON.stringify(s));assert.equal(Object.keys(JSON.parse(raw).warehouses).length,1);
 await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw);localStorage.setItem(KEY+'-warehouse-migration-backup','first-stage original')},raw);await page.reload();
 assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-cities-migration-backup')),raw);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-migration-backup')),'first-stage original');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY))),original=JSON.parse(raw);assert.deepEqual(saved.warehouses[0],original.warehouses[0]);for(let c=1;c<5;c++)assert.deepEqual(saved.warehouses[c],{cargo:{},costs:{},bookCosts:{},origins:{}});const {warehouses,...rest}=saved;const {warehouses:ignored,...oldRest}=original;assert.deepEqual(legacyProjection(rest),oldRest);await page.reload();assert.deepEqual(await page.evaluate(()=>s.warehouses),saved.warehouses);
 console.log('PASS actual Luebeck-only startup extension, original backup, data preservation and repeated reload');
 for(const size of [{width:390,height:844},{width:820,height:1180},{width:1280,height:900}]){
  await page.setViewportSize(size);await page.evaluate(()=>{s=migrate(fresh('Ulf','Warehouse journey'));s.gold=10000;render();closeSheet()});
  for(let city=0;city<5;city++){
   if(city)await page.evaluate(city=>{planTravel(city);arrive();closeSheet()},city);
   await page.evaluate(()=>{marketView();$('qty0').value=10;trade(0,1);closeSheet()});
   await page.locator('#warehouseSpot').tap();const name=await page.evaluate(()=>CITIES[s.city]);assert(await page.getByRole('heading',{name:'📦 Lagerhaus '+name,exact:true}).isVisible());assert(await page.getByLabel('Schiff in '+name,{exact:true}).isVisible());
   await page.getByLabel('Menge Getreide',{exact:true}).fill(String(city+1));await page.getByRole('button',{name:'Einlagern',exact:true}).first().click();assert.equal(await page.evaluate(city=>s.warehouses[city].cargo[0],city),city+1);
   await page.getByLabel('Menge Getreide',{exact:true}).fill('1');await page.getByRole('button',{name:'Aufs Schiff',exact:true}).first().click();assert.equal(await page.evaluate(city=>s.warehouses[city].cargo[0]||0,city),city);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const box=await page.getByRole('button',{name:'Einlagern',exact:true}).first().boundingBox();assert(box.height>=44&&box.width>40);
   if((size.width===390&&city===1)||(size.width===1280&&city===4)){const file=size.width===390?'2026-10-24_0.5b_lagerhaeuser-hamburg-mobile.png':'2026-10-24_0.5b_lagerhaeuser-stettin-desktop.png';await page.screenshot({path:path.join(shots,file),fullPage:true})}
   await page.getByRole('button',{name:'✕',exact:true}).tap();
  }
  await page.reload();assert.equal(await page.evaluate(()=>s.city),4);assert.deepEqual(await page.evaluate(()=>CITIES.map((_,city)=>s.warehouses[city].cargo[0]||0)),[0,1,2,3,4]);
  console.log('PASS five-city access, real journeys, transfers, separation, reload and layout '+size.width+'x'+size.height);
 }
 await page.locator('#warehouseSpot').click();await page.evaluate(()=>{s.ships.push({...makeShip(0),city:4});s.ships[0].city=0;s.active=0;warehouseView()});assert(await page.getByRole('button',{name:'Aufs Schiff',exact:true}).first().isDisabled());await page.getByLabel('Schiff in Stettin',{exact:true}).selectOption('1');assert.equal(await page.evaluate(()=>s.active),1);
 const preImport=await page.evaluate(()=>JSON.stringify(s));await page.evaluate(raw=>importGame({target:{files:[new File([raw],'luebeck.json',{type:'application/json'})],value:'luebeck.json'}}),raw);await page.waitForFunction(()=>localStorage.getItem(KEY+'-warehouse-cities-import-backup')!==null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-cities-import-backup')),raw);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-backup')),preImport);assert.deepEqual(await page.evaluate(()=>s.warehouses[0]),original.warehouses[0]);assert.equal(await page.evaluate(()=>Object.keys(s.warehouses).length),5);
 console.log('PASS local ship selection and real FileReader import preserves Luebeck stock and both backups');
 await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw)},raw);await page.addInitScript(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.endsWith('-warehouse-cities-migration-backup'))throw Error('simulated quota');return set.call(this,k,v)}});await page.reload();assert.equal(await page.evaluate(()=>s),null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)),raw);assert.deepEqual(errors,[]);
 console.log('PASS failed extension backup leaves original save intact; no page JavaScript errors');await old.close();
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
