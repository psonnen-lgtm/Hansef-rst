// Bounded donation regression: actual game functions, no strategy or calendar simulation.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),zlib=require('node:zlib'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),base='a44671964f5eca752c537f4fd7d9b7ecb57446ad';
process.env.HANSE_GAME=path.join(root,'Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),{boot}=require('./start-selection-checks.cjs'),html=fs.readFileSync(process.env.HANSE_GAME,'utf8'),old=execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{cwd:root,encoding:'utf8',maxBuffer:100000000}),clean=x=>JSON.parse(JSON.stringify(x)),checks=[];
const line=(text,name)=>{const found=text.split('\n').find(x=>x.startsWith('function '+name+'('));assert(found,name);return found};
function record(name,fn){checks.push({name,passed:true,evidence:fn()});console.log('PASS '+name)}
function fixture(rep,gold=5000,source=null){const g=create(42,source);g.load(line(source??html,'notice'));g.eval(`s.rep=${rep};s.gold=${gold};s.day=360;openSheet=(title,html)=>{$('sheet').innerHTML=html};`);return g}
const sheet=g=>g.eval("$('sheet').innerHTML");
function offers(g){const h=sheet(g);return ['Small','Large'].map(name=>{const m=h.match(new RegExp('id="donation'+name+'Gain">\\+(\\d+) Ansehen'));assert(m,'offer '+name);return Number(m[1])})}
function donation(g,cost,base){const before=clean(g.eval('s')),count=g.events.length;g.eval(`donate(${cost},${base})`);const after=clean(g.eval('s')),gain=after.rep-before.rep;assert.equal(after.gold,before.gold-cost);assert.equal(after.day,before.day);assert.equal(after.year,before.year);assert.deepEqual(clean(g.events.slice(count)),[{type:'donation',cost,reputation:gain}]);assert.equal(after.messages[0],`Tag ${before.day}: ${cost} G für die Stadt gespendet (+${gain} Ansehen).`);assert(sheet(g).includes(`Spende verbucht: +${gain} Ansehen.`));return gain}

record('whole HTML unchanged except church view, extracted existing formula and donation feedback',()=>{
 const helper=line(html,'donationGain'),current=line(html,'donate'),previous=line(old,'donate');
 const formula=previous.match(/let gain=(.*?);s\.rep/)[1];
 assert.equal(helper,`function donationGain(rep){return ${formula}}`);
 assert.equal(current.replace('let gain=donationGain(rep)',`let gain=${formula}`).replace('churchView(gain)','churchView()'),previous);
 let projected=html.replace(helper+'\n','').replace(line(html,'churchView'),line(old,'churchView')).replace(current,previous);
 assert.equal(projected,old);
 assert(line(html,'churchView').includes('donationGain(2)'));assert(line(html,'churchView').includes('donationGain(5)'));
 new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
 return {formula,allOtherHTMLExact:true,saveFormat:11,noChangedEconomyPoliticsStorageCSSOrRNG:true};
});
record('18 boundary offers agree with actual credit, receipt, chronicle, event and original game',()=>{
 const rows=[];
 for(const rep of [0,54,55,109,110,164,165,219,220])for(const [cost,value,index] of [[50,2,0],[200,5,1]]){
  const g=fixture(rep),reference=fixture(rep,5000,old),before=g.eval('JSON.stringify(s)');g.eval('churchView()');const preview=offers(g)[index];assert.equal(g.eval('JSON.stringify(s)'),before);assert(!sheet(g).includes('id="donationReceipt"'));
  const gain=donation(g,cost,value);reference.eval(`donate(${cost},${value})`);
  assert.equal(preview,gain);assert.deepEqual(clean(g.eval('s')),clean(reference.eval('s')));assert.deepEqual(clean(g.events),clean(reference.events));assert.equal(g.eval('Math.random()'),reference.eval('Math.random()'));
  assert.equal(offers(g)[0],g.eval('donationGain(2)'));assert.equal(offers(g)[1],g.eval('donationGain(5)'));
  rows.push({rep,cost,preview,gain,after:offers(g),oneEvent:true,originalStateAndRNGExact:true});
 }return rows;
});
record('insufficient gold preserves complete state and emits no donation',()=>{
 const rows=[];for(const [cost,value] of [[50,2],[200,5]]){const g=fixture(109,cost-1),before=g.eval('JSON.stringify(s)');g.eval('churchView()');g.eval(`donate(${cost},${value})`);assert.equal(g.eval('JSON.stringify(s)'),before);assert.equal(g.events.length,0);assert(sheet(g).includes('Dafür reicht dein Gold nicht.'));rows.push({cost,gold:cost-1,stateExact:true,events:0})}return rows;
});
record('repeated mixed donations cross each threshold without double credits, days or rule changes',()=>{
 const rows=[];for(const rep of [54,109,164,219]){const g=fixture(rep),reference=fixture(rep,5000,old),gains=[];g.eval('churchView()');for(const [cost,value,index] of [[50,2,0],[200,5,1],[50,2,0],[200,5,1]]){const preview=offers(g)[index],gain=donation(g,cost,value);assert.equal(preview,gain);reference.eval(`donate(${cost},${value})`);assert.deepEqual(clean(g.eval('s')),clean(reference.eval('s')));gains.push(gain)}assert.equal(g.events.length,4);assert.equal(g.eval('Math.random()'),reference.eval('Math.random()'));rows.push({rep,gains,finalRep:g.eval('s.rep'),spent:500,events:4,days:0})}return rows;
});
record('reopening offers is observational and consumes no random number or storage write',()=>{
 const g=fixture(54),reference=fixture(54),before=g.eval('JSON.stringify(s)');let writes=0;g.context.localStorage.setItem=()=>writes++;for(let i=0;i<25;i++)g.eval('churchView()');assert.equal(g.eval('JSON.stringify(s)'),before);assert.equal(g.events.length,0);assert.equal(writes,0);assert.equal(g.eval('Math.random()'),reference.eval('Math.random()'));return {opens:25,writes,events:0,stateAndRNGExact:true};
});
record('eleven archived V11 city saves load, show church and save with every field unchanged',()=>{
 const rows=[],dir=path.join(__dirname,'phase06c-20261025-01/main');
 for(let city=0;city<11;city++){
  const file=`${city}-balanced-normal-93002.json.gz`,bytes=fs.readFileSync(path.join(dir,file)),x=JSON.parse(zlib.gunzipSync(bytes)).row.final,raw=JSON.stringify(x);assert.equal(x.v,11);
  const b=boot({'hansefuerst-v04':raw});b.load(raw);assert.equal(b.eval('JSON.stringify(s)'),raw);const writes=b.writes.length;b.eval('churchView()');assert.equal(b.writes.length,writes);assert.equal(b.eval('JSON.stringify(s)'),raw);b.eval('save()');assert.equal(b.store['hansefuerst-v04'],raw);b.load(b.store['hansefuerst-v04']);assert.deepEqual(clean(b.eval('s')),x);rows.push({file,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),version:11,allFieldsExact:true});
 }return rows;
});
assert(process.argv[2],'new JSON output path required');
fs.writeFileSync(process.argv[2],JSON.stringify({base,testedGameCommit:execFileSync('git',['log','-1','--format=%H','--','Hansefuerst_0_4.html'],{cwd:root,encoding:'utf8'}).trim(),gameSHA256:hash,scope:'bounded actual-function and archive roundtrip regression; no complete economic or career simulations; no real user saves',checks},null,2)+'\n',{flag:'wx'});
