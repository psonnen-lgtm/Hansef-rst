const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path'),{execFileSync}=require('node:child_process');
const base=process.env.HANSE_BROWSER_BASE||'http://127.0.0.1:8766',shots=process.env.HANSE_GOODS_SHOTS||'/tmp';
(async()=>{const browser=await chromium.launch({executablePath:process.env.HANSE_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage({hasTouch:true,viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());await page.goto(base+'/Hansefuerst_0_4.html');
 const oldHtml=execFileSync('git',['show','f3a711a:Hansefuerst_0_4.html'],{encoding:'utf8',maxBuffer:10*1024*1024}),old=await browser.newPage();await old.route('**/old-seven.html',r=>r.fulfill({body:oldHtml,contentType:'text/html'}));await old.goto(base+'/old-seven.html');await old.evaluate(()=>{s=migrate(fresh('Ulf','Seven'));marketView();$('qty6').value=2;trade(6,1);warehouseView();$('warehouseQty6').value=1;warehouseTransfer(6,1);s.bank=100.25;s.debt=77.75;save()});const raw=await old.evaluate(()=>JSON.stringify(s));
 await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw);localStorage.setItem(KEY+'-warehouse-migration-backup','keep old backup')},raw);await page.reload();
 assert.equal(await page.evaluate(()=>s.v),5);assert.equal(await page.evaluate(()=>s.markets[0].length),11);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-goods11-migration-backup')),raw);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-warehouse-migration-backup')),'keep old backup');assert.deepEqual(await page.evaluate(()=>s.warehouses),JSON.parse(raw).warehouses);
 // Startup observes the current city; other old notes must remain unknown for new goods.
 await page.evaluate(()=>{s.journal[1]={day:1,year:1350,prices:GOODS.map((g,j)=>j<7?g[2]:null)};show('book')});assert(!await page.locator('#sheet').innerText().then(t=>t.includes('null G')));
 for(const size of [{width:390,height:844},{width:820,height:1180},{width:1280,height:900}]){
  await page.setViewportSize(size);await page.evaluate(()=>{s=migrate(fresh('Ulf','Eleven'));render();show('market')});assert.equal(await page.locator('#sheet input[id^="qty"]').count(),11);
  for(let j=7;j<11;j++){
   await page.locator('#qty'+j).fill('2');await page.locator('#qty'+j).locator('..').getByRole('button',{name:'Kaufen',exact:true}).click();assert.equal(await page.evaluate(j=>ship().cargo[j],j),2);
  }
  await page.evaluate(()=>closeSheet());await page.locator('#warehouseSpot').tap();assert.equal(await page.locator('#sheet input[id^="warehouseQty"]').count(),11);
  for(let j=7;j<11;j++){
   const row=page.locator('#warehouseQty'+j).locator('..');await row.locator('input').fill('1');await row.getByRole('button',{name:'Einlagern',exact:true}).click();assert.equal(await page.evaluate(j=>s.warehouses[0].cargo[j],j),1);await page.locator('#warehouseQty'+j).locator('..').getByRole('button',{name:'Aufs Schiff',exact:true}).click();assert.equal(await page.evaluate(j=>ship().cargo[j],j),2);
  }
  await page.evaluate(()=>show('market'));for(let j=7;j<11;j++){await page.locator('#qty'+j).fill('1');await page.locator('#qty'+j).locator('..').getByRole('button',{name:'Verkaufen',exact:true}).click();assert.equal(await page.evaluate(j=>ship().cargo[j],j),1)}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.locator('#qty7').scrollIntoViewIfNeeded();if(size.width===390)await page.screenshot({path:path.join(shots,'2026-10-24_0.5c_handelswaren-mobile.png'),fullPage:true});
  await page.evaluate(()=>show('book'));assert.equal(await page.locator('#sheet thead th').count(),13);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert(await page.locator('.scroll').evaluate(e=>e.scrollWidth>=e.clientWidth));
  if(size.width===1280)await page.screenshot({path:path.join(shots,'2026-10-24_0.5c_preisbuch-desktop.png'),fullPage:true});
  await page.reload();assert.equal(await page.evaluate(()=>s.v),5);for(let j=7;j<11;j++)assert.equal(await page.evaluate(j=>ship().cargo[j],j),1);
  console.log('PASS eleven goods: real buys/sales/storage/book/reload, layout '+size.width+'x'+size.height);
 }
 const current=await page.evaluate(()=>JSON.stringify(s));await page.evaluate(raw=>importGame({target:{files:[new File([raw],'seven.json',{type:'application/json'})],value:'seven.json'}}),raw);await page.waitForFunction(()=>localStorage.getItem(KEY+'-goods11-import-backup')!==null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-backup')),current);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-goods11-import-backup')),raw);assert.equal(await page.evaluate(()=>s.v),5);assert.deepEqual(await page.evaluate(()=>s.warehouses),JSON.parse(raw).warehouses);
 const once=await page.evaluate(()=>JSON.stringify(s));await page.evaluate(()=>{save();s=migrate(JSON.parse(localStorage.getItem(KEY)));save()});assert.equal(await page.evaluate(()=>JSON.stringify(s)),once);
 await page.evaluate(raw=>{localStorage.clear();localStorage.setItem(KEY,raw)},raw);await page.addInitScript(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.endsWith('-goods11-migration-backup'))throw Error('quota');return set.call(this,k,v)}});await page.reload();assert.equal(await page.evaluate(()=>s),null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)),raw);assert.deepEqual(errors,[]);
 const broken=JSON.parse(raw);broken.markets[1].pop();const brokenRaw=JSON.stringify(broken);await page.evaluate(text=>{localStorage.clear();localStorage.setItem(KEY,text)},brokenRaw);await page.reload();assert.equal(await page.evaluate(()=>s),null);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)),brokenRaw);assert.equal(await page.evaluate(()=>localStorage.getItem(KEY+'-goods11-migration-backup')),null);
 console.log('PASS actual seven-good migration/import backups, idempotence and quota-failure preservation; no page errors');await old.close();
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
