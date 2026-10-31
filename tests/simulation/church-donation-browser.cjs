// Local-only actual HTML and native taps/clicks, with isolated synthetic V11 saves.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');process.env.HANSE_GAME=path.join(root,'Hansefuerst_0_4.html');const {create,hash}=require('./headless.cjs');
const file=fs.readFileSync(process.env.HANSE_GAME),key='hansefuerst-v04',g=create(42);g.eval('s.rep=54');const fixture=g.eval('JSON.stringify(s)');
async function downloadText(download){const stream=await download.createReadStream(),chunks=[];for await(const c of stream)chunks.push(c);return Buffer.concat(chunks).toString('utf8')}
(async()=>{
 assert(process.argv[2],'new JSON output path required');const out=path.resolve(process.argv[2]);assert(!fs.existsSync(out),'never overwrite existing results');
 const server=http.createServer((req,res)=>{if(req.method==='GET'&&req.url==='/Hansefuerst_0_4.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(file)}else{res.writeHead(404);res.end()}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;const checks=[],errors=[],shots=[];
 try{
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  for(const [width,height,mobile] of [[375,667,true],[820,1180,true],[1280,900,false]]){
   const context=await browser.newContext({viewport:{width,height},hasTouch:mobile,isMobile:mobile,acceptDownloads:true});
   await context.addInitScript(({key,fixture})=>{if(localStorage.getItem(key)===null)localStorage.setItem(key,fixture);localStorage.setItem('hansefuerst-test-v1-consent','yes')},{key,fixture});
   const p=await context.newPage();p.on('dialog',d=>d.accept());p.on('pageerror',e=>errors.push({width,message:e.message}));p.on('console',m=>{if(m.type()==='error')errors.push({width,message:m.text()})});
   await p.goto(`http://127.0.0.1:${server.address().port}/Hansefuerst_0_4.html`);await p.waitForFunction(()=>s?.v===11&&CityLife.diagnostics().visualReady);
   assert.equal(await p.evaluate(()=>JSON.stringify(s)),fixture);assert.equal(await p.evaluate(key=>localStorage.getItem(key),key),fixture);
   // Actual export and FileReader import of an existing V11 representation, before spending.
   await p.getByRole('button',{name:'💾 Spielstand',exact:true}).click();const downloaded=p.waitForEvent('download');await p.getByRole('button',{name:'⬇️ Spielstand exportieren',exact:true}).click();const text=await downloadText(await downloaded);assert.deepEqual(JSON.parse(text),JSON.parse(fixture));
   const chooser=p.waitForEvent('filechooser');await p.getByRole('button',{name:'⬆️ Spielstand importieren',exact:true}).click();await (await chooser).setFiles({name:'old-v11-church-fixture.json',mimeType:'application/json',buffer:Buffer.from(text)});await p.waitForFunction(()=>document.querySelector('#sheet').textContent.includes('Spielstand erfolgreich übernommen'));
   assert.equal(await p.evaluate(()=>JSON.stringify(s)),fixture);assert.equal(await p.evaluate(key=>localStorage.getItem(key),key),fixture);await p.reload();await p.waitForFunction(()=>s?.v===11&&CityLife.diagnostics().visualReady);assert.equal(await p.evaluate(()=>JSON.stringify(s)),fixture);
   const entrance=p.locator('[data-place="church"]');await entrance.scrollIntoViewIfNeeded();if(mobile)await entrance.tap();else await entrance.click();
   assert.equal(await p.locator('#donationSmallGain').innerText(),'+2 Ansehen');assert.equal(await p.locator('#donationLargeGain').innerText(),'+5 Ansehen');assert.equal(await p.locator('#donationReceipt').count(),0);
   const actions=p.locator('#sheet button[onclick^="donate("]');assert.equal(await actions.count(),2);
   for(const b of await actions.all()){await b.scrollIntoViewIfNeeded();const rect=await b.boundingBox();assert(rect.height>=44);assert(rect.x>=0&&rect.x+rect.width<=width+1)}
   assert(await p.locator('#sheet').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
   const before=await p.evaluate(()=>({day:s.day,year:s.year,gold:s.gold,rep:s.rep,count:Testlog.data.events.filter(e=>e.type==='donation').length}));
   const small=p.locator('button[onclick="donate(50,2)"]');await small.scrollIntoViewIfNeeded();if(mobile)await small.tap();else await small.click();
   assert.equal(await p.locator('#donationReceipt').innerText(),'Spende verbucht: +2 Ansehen.');assert.equal(await p.locator('#donationSmallGain').innerText(),'+1 Ansehen');assert.equal(await p.locator('#donationLargeGain').innerText(),'+4 Ansehen');
   const state=await p.evaluate(()=>({day:s.day,year:s.year,gold:s.gold,rep:s.rep,message:s.messages[0],events:Testlog.data.events.filter(e=>e.type==='donation').map(e=>({cost:e.details.cost,reputation:e.details.reputation}))}));
   assert.equal(state.gold,before.gold-50);assert.equal(state.rep,56);assert.equal(state.day,before.day);assert.equal(state.year,before.year);assert.equal(state.events.length,before.count+1);assert.deepEqual(state.events.at(-1),{cost:50,reputation:2});assert(state.message.includes('(+2 Ansehen)'));
   await p.locator('#donationReceipt').scrollIntoViewIfNeeded();const screenshot=path.join(root,`docs/entwicklungsberichte/2026-10-27_0.8c1_kirche-${width}.png`);assert(!fs.existsSync(screenshot),'never overwrite screenshots');await p.screenshot({path:screenshot});shots.push({file:path.relative(root,screenshot),sha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex')});
   const large=p.locator('button[onclick="donate(200,5)"]');await large.scrollIntoViewIfNeeded();if(mobile)await large.tap();else await large.click();assert.equal(await p.locator('#donationReceipt').innerText(),'Spende verbucht: +4 Ansehen.');assert.equal(await p.evaluate(()=>s.rep),60);assert.equal(await p.evaluate(()=>s.gold),4750);assert.equal(await p.evaluate(()=>Testlog.data.events.filter(e=>e.type==='donation').length),before.count+2);
   await p.reload();await p.waitForFunction(()=>s?.v===11);assert.equal(await p.evaluate(()=>s.rep),60);assert.equal(await p.evaluate(()=>s.gold),4750);assert.equal(await p.evaluate(()=>s.day),before.day);
   checks.push({name:`church and V11 file roundtrip at ${width}x${height}`,passed:true,viewport:{width,height},nativeInput:mobile?'tap':'click',previews:[2,5],firstGain:2,nextPreviews:[1,4],secondGain:4,donationEvents:2,noNewDays:true,saveBeforeDonationsExact:true,afterDonationReload:true,buttonsAtLeast44px:true,noHorizontalSheetOverflow:true});await context.close();
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(out,JSON.stringify({testedGameCommit:execFileSync('git',['log','-1','--format=%H','--','Hansefuerst_0_4.html'],{cwd:root,encoding:'utf8'}).trim(),gameSHA256:hash,browser:browser.version(),scope:'local Chromium viewport/touch emulation, not physical iPhone iPad or Safari; no complete simulations',checks,errors,screenshots:shots},null,2)+'\n',{flag:'wx'});console.log('PASS 3 browser sizes, actual donation events and V11 download/import/reload');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
