// Presentation only. Inputs are a city index and navigation callbacks, never a save object.
// This file is embedded verbatim into the standalone HTML by tools/embed-city-life.py.
const CityLife=(()=>{
 const W=960,H=640,FPS=20;
 const places=Object.freeze([
  {id:'church',name:'Kirche',hint:'Spenden und Einkehr',x:140,y:162,view:'church'},
  {id:'hall',name:'Rathaus',hint:'Rat, Briefe und politische Karriere',x:475,y:205,view:'hall'},
  {id:'market',name:'Marktplatz',hint:'Waren kaufen und verkaufen',x:392,y:260,view:'market'},
  {id:'bath',name:'Badehaus',hint:'Gerüchte und Hafennachrichten',x:145,y:322,view:'bath'},
  {id:'bank',name:'Bankhaus',hint:'Guthaben und Kredite',x:686,y:235,view:'bank'},
  {id:'contor',name:'Kontor',hint:'Dein Kaufmannsbuch und deine Bilanz',x:837,y:337,view:'contor'},
  {id:'warehouse',name:'Lagerhaus',hint:'Waren, Mietbuch und Rückstände',x:555,y:465,view:'warehouse'},
  {id:'harbor',name:'Hafenmeister',hint:'Schiffe, Konvois und Hafenarbeit',x:330,y:443,view:'harbor'},
  {id:'yard',name:'Schiffswerft',hint:'Materialien, Bauaufträge und Schiffsverkauf',x:878,y:558,view:'harbor',focus:'.shipyard-panel'},
  {id:'map',name:'Seekarte am Kai',hint:'Reiseziele und Routen',x:260,y:351,view:'map'},
  {id:'book',name:'Handelsbuch',hint:'Eigene Preisaufzeichnungen',x:357,y:325,view:'book'}
 ].map(Object.freeze));
 const actors=Object.freeze([
  {id:'market-merchant',route:[[392,246],[411,254],[429,260],[447,266]],speed:6,phase:7,coat:'#7e483d',scale:.82},
  {id:'council-courier',route:[[708,270],[725,284],[741,297]],speed:8,phase:14,coat:'#45605d',scale:.86},
  {id:'bath-citizen',route:[[175,344],[204,354],[236,363]],speed:5,phase:32,coat:'#7d7043',scale:.9},
  {id:'church-monk',route:[[195,367],[225,377],[249,386]],speed:5,phase:18,coat:'#554b43',scale:.8},
  {id:'kontor-merchant',route:[[840,353],[858,366],[871,383]],speed:6,phase:5,coat:'#6c4e65',scale:.92},
  {id:'barrel-carrier',route:[[368,455],[412,471],[452,484]],speed:7,phase:8,coat:'#3e6661',scale:1.05,load:true},
  {id:'quay-worker',route:[[542,490],[578,510],[618,520]],speed:6,phase:29,coat:'#86613e',scale:1.05,load:true},
  {id:'yard-worker',route:[[749,562],[753,581],[775,598]],speed:6,phase:43,coat:'#77514b',scale:1.1,load:true},
  {id:'market-seller',route:[[531,247],[534,248]],speed:1,phase:12,coat:'#846b3e',scale:.82},
  {id:'shipwright',route:[[924,525],[927,526]],speed:1,phase:24,coat:'#52635a',scale:1.03,hammer:true}
 ]);
 let root=null,world=null,canvas=null,ctx=null,host=null,scroll=null,motionButton=null,labelButton=null,status=null;
 let city=-1,open=null,fallback=null,failed=false,raf=0,time=0,last=0,lastDraw=0,inside=true,manualMotion=null,media=null,observer=null,panelObserver=null;
 let mounts=0,frames=0,maxPending=0,frameCosts=[],boat=null,boatReady=false;
 function enabled(){return manualMotion===null?!media?.matches:manualMotion}
 function reasons(){const r=[];if(city!==0||!root||root.hidden)r.push('other-city');if(typeof document!=='undefined'&&document.hidden)r.push('hidden-page');if(!inside)r.push('offscreen');if(!enabled())r.push('reduced-motion');const overlay=typeof document!=='undefined'?document.getElementById('overlay'):null;if(overlay&&!overlay.classList.contains('hidden'))r.push('dialog');return r}
 function queue(){if(!raf&&!reasons().length){raf=requestAnimationFrame(tick);maxPending=Math.max(maxPending,Number(!!raf))}}
 function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;lastDraw=0}
 function sync(){if(!root)return;motionButton.setAttribute('aria-pressed',String(enabled()));motionButton.textContent=enabled()?'Stadtleben pausieren':'Stadtleben einschalten';status.textContent=!enabled()?'Ruhendes Stadtbild':reasons().length?'Stadtleben ruht außerhalb der Ansicht':'Am Kai wird gearbeitet, auf dem Markt gehandelt';if(reasons().length)stop();else queue()}
 function pathPosition(actor,t){
  const route=actor.route,lengths=route.slice(1).map((p,i)=>Math.hypot(p[0]-route[i][0],p[1]-route[i][1])),length=lengths.reduce((n,v)=>n+v,0),travel=length/actor.speed,pause=2.5,cycle=2*(travel+pause),clock=(t+actor.phase)%cycle,back=clock>=travel+pause;
  let distance=Math.min(travel,back?clock-travel-pause:clock)*actor.speed;if(back)distance=length-distance;
  let segment=0;while(segment<lengths.length-1&&distance>lengths[segment])distance-=lengths[segment++];const p=route[segment],q=route[segment+1],fraction=lengths[segment]?distance/lengths[segment]:0;
  return {x:p[0]+(q[0]-p[0])*fraction,y:p[1]+(q[1]-p[1])*fraction,back,walking:clock% (travel+pause)<travel};
 }
 function box(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
 function person(actor,p){
  const step=p.walking&&Math.sin((time+actor.phase)*7)>0?1:0,face=p.back?-1:1;ctx.save();ctx.translate(Math.round(p.x),Math.round(p.y));ctx.scale(actor.scale,actor.scale);
  ctx.globalAlpha=.24;box(-5,1,12,2,'#302b27');ctx.globalAlpha=1;
  // Deliberate small silhouettes: cap, face, shoulders, separate boots and carried load.
  box(-4,-5,3,6-step,'#343c38');box(1,-5+step,3,6,'#343c38');box(-5,0-step,4,2,'#292d29');box(1,1,5,2,'#292d29');
  box(-5,-14,10,11,'#343932');box(-4,-13,8,9,actor.coat);box(-4,-12,1,7,'#4c4435');box(-1,-13,2,3,'#d8c397');box(-4,-5,8,1,'#534331');
  box(-6,-12+step,2,6,actor.coat);box(4,-12-step,2,6,actor.coat);box(-6,-6+step,2,2,'#c2a072');box(4,-6-step,2,2,'#d9b887');
  box(-3,-20,6,6,'#564733');box(-2,-19,4,4,'#cba679');box(face>0?1:-3,-18,2,2,'#e0bd8c');box(face>0?1:-2,-18,1,1,'#4a3d2c');
  box(-2,-23,5,3,'#524834');box(-4,-21,8,2,'#6e5c3b');box(-2,-23,4,1,'#8e774c');
  if(actor.load){const bx=face>0?4:-11;box(bx,-12,7,9,'#694a31');box(bx+1,-12,5,1,'#c3a174');box(bx,-10,7,1,'#ae8c57');box(bx+1,-9,2,4,'#a77a48');box(bx,-6,7,1,'#3c4036');box(bx+1,-4,5,1,'#b18c57')}
  if(actor.hammer){const lift=Math.sin(time*3+actor.phase)>0?4:0;box(6,-13-lift,1,6,'#765735');box(5,-14-lift,5,2,'#7e8170')}
  ctx.restore();
 }
 function water(){
  ctx.save();ctx.beginPath();[[0,355],[0,640],[777,640],[540,576],[365,497],[240,434],[75,374]].forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();
  for(let i=0;i<54;i++){const x=(i*91+Math.sin(time*.5+i)*8)%850,y=380+(i*47)%260;ctx.globalAlpha=.10+.05*Math.sin(time*.8+i);box(x,y,7+(i%5)*3,1,'#c6d4b4')}
  ctx.globalAlpha=.15;for(let i=0;i<3;i++)box(100+i*28+Math.sin(time*.5+i)*3,546+i*8,26,1,'#e2d2a8');ctx.restore();
 }
 function ship(){
  const bob=Math.sin(time*.8)*1.2;
  if(boatReady){ctx.save();ctx.translate(172,502+bob);ctx.rotate(Math.sin(time*.55)*.004);const h=224*boat.naturalHeight/boat.naturalWidth;ctx.drawImage(boat,-112,65-h,224,h);ctx.restore()}
  // A small local service skiff is decorative, never an owned inventory ship.
  ctx.save();ctx.translate(Math.round(432+Math.sin(time*.18)*5),Math.round(590+Math.sin(time*.9+2)));
  ctx.globalAlpha=.25;box(-29,6,56,3,'#1c494e');ctx.globalAlpha=1;box(-27,0,52,5,'#473b2b');box(-23,5,44,3,'#7b5734');box(-25,-1,48,2,'#bc9661');box(-19,1,35,2,'#ad8450');box(-1,-6,4,7,'#4f625b');box(0,-9,3,3,'#d7af78');box(-13,2,29,1,'#41372b');box(7,-2,2,13,'#b39460');ctx.restore();
 }
 function details(){
  // Actual small objects in the street are also native keyboard-accessible entrances.
  box(252,347,16,3,'#795c37');box(253,350,2,7,'#594b36');box(265,350,2,7,'#594b36');box(254,342,12,6,'#d5bc83');box(257,344,6,1,'#688c7b');box(259,342,1,5,'#66816d');
  box(350,322,14,3,'#765535');box(351,325,2,6,'#4f4231');box(361,325,2,6,'#4f4231');box(352,317,5,5,'#d9c592');box(357,317,5,5,'#c8b17b');box(356,317,1,5,'#79573d');
  const flag=Math.round(Math.sin(time*2)*1.5);box(488,109,1,21,'#5c5035');box(489,111,9,3,'#a14c3b');box(489,114,8,3,'#e5d2a3');box(497,111+flag,2,3,'#a14c3b');box(496,114+flag,2,3,'#e5d2a3');
  for(let i=0;i<4;i++){const p=(time*.12+i*.25)%1;ctx.globalAlpha=(1-p)*.18;box(70+p*8,183-p*24,5+Math.floor(p*6),3,'#e3d6b5');box(73+p*8,181-p*24,4+Math.floor(p*5),2,'#e3d6b5')}ctx.globalAlpha=1;
  for(let i=0;i<3;i++){const x=94+((time*(7+i)+i*113)%310),y=432+i*17+Math.sin(time*.7+i)*7,wing=Math.sin(time*4+i)>0?1:-1;box(x,y,2,1,'#e0d8b7');box(x-3,y+wing,3,1,'#e0d8b7');box(x+2,y+wing,3,1,'#e0d8b7')}
 }
 function draw(){if(!ctx)return;const started=performance.now();ctx.clearRect(0,0,W,H);ctx.imageSmoothingEnabled=false;water();ship();details();actors.map(a=>({actor:a,p:pathPosition(a,time)})).sort((a,b)=>a.p.y-b.p.y).forEach(a=>person(a.actor,a.p));frames++;frameCosts.push(performance.now()-started);if(frameCosts.length>300)frameCosts.shift()}
 function tick(now){raf=0;if(reasons().length){stop();return}if(!last)last=now;if(now-lastDraw>=1000/FPS){time+=Math.min(.2,(now-last)/1000);last=now;lastDraw=now;draw()}queue()}
 function pan(id,focus=false){if(!root||city!==0)return;const p=places.find(q=>q.id===id);if(!p)return;const button=root.querySelector('[data-place="'+id+'"]');const x=p.x/W*world.clientWidth-scroll.clientWidth/2,y=p.y/H*world.clientHeight-scroll.clientHeight/2;scroll.scrollTo({left:Math.max(0,x),top:Math.max(0,y),behavior:enabled()?'smooth':'auto'});if(focus)button.focus({preventScroll:true})}
 function activate(place){if(city!==0||root.hidden)return;root.querySelectorAll('.city-door').forEach(b=>b.removeAttribute('data-selected'));const b=root.querySelector('[data-place="'+place.id+'"]');b.setAttribute('data-selected','true');open(place.view);if(place.focus){const el=document.querySelector(place.focus);if(el)el.scrollIntoView({block:'start',behavior:'auto'})}sync()}
 function asset(name){return document.getElementById('citySceneAssets')?.content.querySelector('[data-city-art="'+name+'"]')?.getAttribute('src')||''}
 function build(openView,onFallback){
  if(typeof document==='undefined'||typeof document.createElement!=='function'||typeof requestAnimationFrame!=='function')return false;
  host=document.getElementById('cityScene');if(!host)return false;open=openView;fallback=onFallback;media=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
  root=document.createElement('section');root.className='living-city';root.hidden=true;root.setAttribute('aria-label','Lübeck: begehbare Handelsstadt');
  root.innerHTML='<div class="living-city-heading"><div><span class="city-kicker">DIE KÖNIGIN DER HANSE</span><h2>Lübeck <span>an der Trave</span></h2></div><p>Zwischen Ratsglocke und Hafenkai</p></div><div class="living-city-scroll" tabindex="0" role="region" aria-label="Lübecker Stadtbild, waagerecht und senkrecht verschiebbar"><div class="living-city-world"><img class="living-city-background" alt="Zusammenhängende Backsteinstadt mit Marienkirche, Rathausmarkt, Kaufmannsgassen, Kai, Lagerhäusern und Werft"><canvas class="living-city-animation" width="960" height="640" aria-hidden="true"></canvas><nav class="living-city-doors" aria-label="Gebäude in Lübeck"></nav></div></div><div class="living-city-caption"><p>Goldene Türmarken öffnen Gebäude und Bücher. <span class="city-pan-hint">Verschiebe die Stadt, um die Gassen und den Kai zu erkunden.</span></p><div class="city-tools"><button type="button" data-city-tool="labels" aria-pressed="false">Orte zeigen</button><button type="button" data-city-tool="harbor">Zum Hafenkai</button><button type="button" data-city-tool="motion" aria-pressed="true">Stadtleben pausieren</button></div><p class="city-life-status" aria-live="off"></p></div>';
  host.prepend(root);world=root.querySelector('.living-city-world');scroll=root.querySelector('.living-city-scroll');canvas=root.querySelector('canvas');ctx=canvas.getContext('2d');motionButton=root.querySelector('[data-city-tool="motion"]');labelButton=root.querySelector('[data-city-tool="labels"]');status=root.querySelector('.city-life-status');
  const nav=root.querySelector('nav');for(const place of places){const b=document.createElement('button');b.type='button';b.className='city-door';b.dataset.place=place.id;b.setAttribute('aria-label',place.name+' – '+place.hint);b.title=place.name+' · '+place.hint;b.style.left=place.x/W*100+'%';b.style.top=place.y/H*100+'%';b.innerHTML='<span class="city-door-mark" aria-hidden="true"></span><span class="city-door-name" aria-hidden="true">'+place.name+'</span>';b.addEventListener('click',()=>activate(place));b.addEventListener('focus',()=>{b.scrollIntoView({block:'nearest',inline:'nearest',behavior:'auto'})});nav.append(b)}
  motionButton.addEventListener('click',()=>{manualMotion=!enabled();sync();draw()});labelButton.addEventListener('click',()=>{const on=labelButton.getAttribute('aria-pressed')!=='true';labelButton.setAttribute('aria-pressed',String(on));labelButton.textContent=on?'Ortsnamen ausblenden':'Orte zeigen';root.classList.toggle('city-show-labels',on)});root.querySelector('[data-city-tool="harbor"]').addEventListener('click',()=>pan('harbor',true));
  const bg=root.querySelector('img');bg.onload=()=>{root.classList.add('city-art-ready');draw()};bg.onerror=()=>{failed=true;hide();if(fallback)fallback()};bg.src=asset('luebeck');
  boat=new Image();boat.onload=()=>{boatReady=true;draw()};boat.src=asset('cog');
  document.addEventListener('visibilitychange',sync);media?.addEventListener('change',sync);
  if(typeof IntersectionObserver==='function'){observer=new IntersectionObserver(entries=>{inside=entries[0].isIntersecting;sync()},{threshold:.03});observer.observe(scroll)}
  const overlay=document.getElementById('overlay');if(overlay&&typeof MutationObserver==='function'){panelObserver=new MutationObserver(sync);panelObserver.observe(overlay,{attributes:true,attributeFilter:['class']})}
  mounts++;return true;
 }
 function hide(){city=-1;stop();if(root)root.hidden=true;if(host)host.classList.remove('city-live')}
 function mount(index,openView,onFallback){
  if(index!==0||failed){hide();return false}if(!root&&!build(openView,onFallback))return false;
  const first=city!==0;city=0;open=openView;fallback=onFallback;root.hidden=false;host.classList.add('city-live');document.getElementById('cityArt').hidden=true;document.getElementById('cityCanvas').style.display='none';
  if(first){inside=true;draw();scroll.scrollTo({left:Math.max(0,475/W*world.clientWidth-scroll.clientWidth/2),top:0,behavior:'auto'})}sync();return true;
 }
 function diagnostics(){const costs=[...frameCosts].sort((a,b)=>a-b);return {city,mounts,frames,pending:!!raf,maxPending,time,renderFPSLimit:FPS,pausedReasons:reasons(),motionEnabled:enabled(),actors:actors.map(a=>({id:a.id,...pathPosition(a,time)})),boatReady,frameMS:{samples:costs.length,median:costs[Math.floor(costs.length*.5)]||0,p95:costs[Math.floor(costs.length*.95)]||0,max:costs.at(-1)||0},places:places.map(p=>({...p}))}}
 return Object.freeze({mount,hide,pan,diagnostics});
})();
