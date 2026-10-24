const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const base=process.env.HANSE_BROWSER_BASE||'http://127.0.0.1:8765';const url=base+'/Hansefuerst_0_4.html';
(async()=>{const browser=await chromium.launch({executablePath:process.env.HANSE_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage({viewport:{width:1280,height:900},hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
const oldHtml=execFileSync('git',['show','a8ca4f5:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024});
// An actual pre-warehouse game state, built in a separate old-code browser page.
const oldPage=await browser.newPage();await oldPage.route('**/warehouse-old.html',r=>r.fulfill({contentType:'text/html',body:oldHtml}));await oldPage.goto(base+'/warehouse-old.html');await oldPage.evaluate(()=>{s=fresh('Ulf','Altstand');s=migrate(s);marketView();$('qty0').value=10;trade(0,1);save()});
const raw=await oldPage.evaluate(()=>JSON.stringify(s));assert(!Object.hasOwn(JSON.parse(raw),'warehouses'));
await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw)},raw);await page.reload();
assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-migration-backup')),raw);
let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));const {warehouses,...rest}=saved;assert.deepEqual(rest,JSON.parse(raw));assert.deepEqual(warehouses,Object.fromEntries([0,1,2,3,4].map(city=>[city,{cargo:{},costs:{},bookCosts:{},origins:{}}])));
await page.getByRole('button',{name:'📦 Lagerhaus am Kontor',exact:true}).click();await page.getByLabel('Menge Getreide',{exact:true}).fill('4');await page.getByRole('button',{name:'Einlagern',exact:true}).first().click();
assert.equal(await page.evaluate(()=>s.warehouses[0].cargo[0]),4);assert.equal(await page.evaluate(()=>ship().cargo[0]),6);
await page.reload();assert.equal(await page.evaluate(()=>s.warehouses[0].cargo[0]),4);await page.getByRole('button',{name:'📦 Lagerhaus am Kontor',exact:true}).click();
await page.getByLabel('Menge Getreide',{exact:true}).fill('2');await page.getByRole('button',{name:'Aufs Schiff',exact:true}).first().click();assert.equal(await page.evaluate(()=>ship().cargo[0]),8);
for(const size of [{width:390,height:844},{width:820,height:1180},{width:1280,height:900}]){
 await page.setViewportSize(size);assert(await page.getByLabel('Menge Getreide',{exact:true}).isVisible());
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);assert.equal(overflow,false,'horizontal page overflow '+size.width);
 const bounds=await page.getByRole('button',{name:'Einlagern',exact:true}).first().boundingBox();assert(bounds.width>40&&bounds.height>=44);
 console.log('PASS browser warehouse layout '+size.width+'x'+size.height);
}
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'✕',exact:true}).tap();await page.locator('#warehouseSpot').tap();console.log('PASS touch opens warehouse from city without overlapping controls');await page.screenshot({path:process.env.HANSE_WAREHOUSE_SCREENSHOT||'/tmp/hansefuerst-warehouse-mobile.png',fullPage:true});
// Actual FileReader import preserves the current warehouse save and the original legacy input.
page.on('dialog',d=>d.accept());const preImport=await page.evaluate(()=>JSON.stringify(s));
await page.evaluate(raw=>importGame({target:{files:[new File([raw],'legacy.json',{type:'application/json'})],value:'legacy.json'}}),raw);
await page.waitForFunction(()=>localStorage.getItem(KEY+'-warehouse-import-backup')!==null);
assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-import-backup')),raw);
assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-backup')),preImport);
assert.equal(await page.evaluate(()=>Object.keys(s.warehouses[0].cargo).length),0);
console.log('PASS real FileReader legacy import and both backups');
// Remote active ship must be selected explicitly; local ship selector changes it safely.
await page.evaluate(()=>{s.ships.push({...makeShip(0),city:1});s.active=1;warehouseView()});assert(await page.getByRole('button',{name:'Aufs Schiff',exact:true}).first().isDisabled());await page.getByLabel('Schiff in Lübeck',{exact:true}).selectOption('0');assert.equal(await page.evaluate(()=>s.active),0);
await page.evaluate(()=>{s.city=1;render();closeSheet()});assert.equal(await page.locator('#warehouseSpot').isVisible(),true);await page.locator('#warehouseSpot').click();assert(await page.getByRole('heading',{name:'📦 Lagerhaus Hamburg',exact:true}).isVisible());
// Backup write failure must not replace the legacy main save.
await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw)},raw);
await page.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.endsWith('-warehouse-migration-backup'))throw Error('simulated quota');return original.call(this,k,v)}});
await page.reload();assert.equal(await page.evaluate(()=>s),null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)),raw);
assert.deepEqual(errors,[]);console.log('PASS actual legacy browser migration backup, transfer/reload, ship selection, city gating and quota-failure protection; no page errors');
await oldPage.close();
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
