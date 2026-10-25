// Presentation only. Inputs are a city index and navigation callbacks, never a save object.
// This file is embedded verbatim into the standalone HTML by tools/embed-city-life.py.
const CityLife=(()=>{
 const W=960,H=640,FPS=20;
 const profiles=new Map(CITY_LIFE_SCENES.map(c=>[c.city,c]));
 let config=profiles.get(0),places=config.places,actors=config.actors;
 let root=null,world=null,canvas=null,ctx=null,host=null,scroll=null,motionButton=null,labelButton=null,status=null;
 let city=-1,open=null,fallback=null,failedCities=new Set(),raf=0,time=0,last=0,lastDraw=0,inside=true,manualMotion=null,media=null,observer=null,panelObserver=null;
 let ready=false,imageSwaps=0,mounts=0,frames=0,maxPending=0,frameCosts=[],boat=null,boatReady=false,riverBoat=null,riverReady=false,riverFailed=false;
 function enabled(){return manualMotion===null?!media?.matches:manualMotion}
 function reasons(){const r=[];if(!profiles.has(city)||!root||root.hidden)r.push('other-city');if(typeof document!=='undefined'&&document.hidden)r.push('hidden-page');if(!inside)r.push('offscreen');if(!enabled())r.push('reduced-motion');if(!ready)r.push('loading');const overlay=typeof document!=='undefined'?document.getElementById('overlay'):null;if(overlay&&!overlay.classList.contains('hidden'))r.push('dialog');return r}
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
  if(actor.load&&actor.load!==true&&actor.load!=='barrel'){carriedLoad(actor.load,face)}else if(actor.load){const bx=face>0?4:-11;box(bx,-12,7,9,'#694a31');box(bx+1,-12,5,1,'#c3a174');box(bx,-10,7,1,'#ae8c57');box(bx+1,-9,2,4,'#a77a48');box(bx,-6,7,1,'#3c4036');box(bx+1,-4,5,1,'#b18c57')}
  if(actor.hammer){const lift=Math.sin(time*3+actor.phase)>0?4:0;box(6,-13-lift,1,6,'#765735');box(5,-14-lift,5,2,'#7e8170')}
  ctx.restore();
 }
 function carriedLoad(kind,face){
  const x=face>0?4:-12;
  if(kind==='cloth'){box(x,-12,8,9,'#554766');box(x+1,-11,6,6,'#7d6683');box(x+3,-12,1,9,'#d3bd88');box(x,-8,8,1,'#d3bd88')}
  else if(kind==='planks'){box(x-3,-12,14,3,'#75563b');box(x-2,-11,13,1,'#ba9a62');box(x+3,-13,1,5,'#594932')}
  else if(kind==='furs'){box(x,-12,8,9,'#50443a');box(x+1,-11,7,6,'#846f50');box(x+3,-11,2,7,'#c4ad7b');box(x+7,-9,2,5,'#69573e')}
  else if(kind==='fish'){box(x,-9,8,6,'#7d6341');box(x+1,-12,6,4,'#b3b8a1');box(x+2,-11,5,1,'#e0d2ac');box(x,-5,8,1,'#423f35')}
  else{box(x+1,-12,6,2,'#a89165');box(x,-10,8,7,'#b6a174');box(x+2,-12,3,9,'#cdb88b');box(x+1,-13,5,1,'#60513b')}
 }
 function water(){
  ctx.save();ctx.beginPath();config.water.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();const r=config.ripples;
  for(let i=0;i<r.count;i++){const x=r.x+(i*91+Math.sin(time*.5+i)*8)%r.w,y=r.y+(i*47)%r.h;ctx.globalAlpha=.10+.05*Math.sin(time*.8+i);box(x,y,7+(i%5)*3,1,config.waterLight||'#c6d4b4')}
  ctx.globalAlpha=.15;for(const p of config.sparkles||[[100,546,26],[128,554,26],[156,562,26]])box(p[0]+Math.sin(time*.5+p[0])*3,p[1],p[2],1,'#e2d2a8');ctx.restore();
 }
 function ship(){
  const bob=Math.sin(time*.8)*1.2;
  if(boatReady&&config.cog){const q=config.cog;ctx.save();ctx.translate(q.x,q.y+bob);ctx.rotate(Math.sin(time*.55)*.004);const h=q.width*boat.naturalHeight/boat.naturalWidth;ctx.drawImage(boat,-q.width/2,q.baseline-h,q.width,h);ctx.restore()}
  // A small local service skiff is decorative, never an owned inventory ship.
  const service=config.serviceBoat;if(!service)return;ctx.save();ctx.translate(Math.round(service.x+Math.sin(time*.18)*(service.sway??5)),Math.round(service.y+Math.sin(time*.9+2)));if(service.angle)ctx.rotate(service.angle);if(service.kind==='barge'){if(riverReady){const width=service.width||132,height=width*riverBoat.naturalHeight/riverBoat.naturalWidth;ctx.drawImage(riverBoat,-width/2,18-height,width,height)}else if(riverFailed)riverBarge(service);ctx.restore();return}
  ctx.globalAlpha=.25;box(-29,6,56,3,'#1c494e');ctx.globalAlpha=1;box(-27,0,52,5,'#473b2b');box(-23,5,44,3,'#7b5734');box(-25,-1,48,2,'#bc9661');box(-19,1,35,2,'#ad8450');box(-1,-6,4,7,'#4f625b');box(0,-9,3,3,'#d7af78');box(-13,2,29,1,'#41372b');box(7,-2,2,13,'#b39460');ctx.restore();
 }
 function riverBarge(q){
  const scale=(q.width||80)/80;ctx.scale(scale,scale);ctx.globalAlpha=.25;box(-40,8,80,3,'#1c494e');ctx.globalAlpha=1;box(-38,0,76,5,'#463a2c');box(-34,5,68,4,'#7b5734');box(-36,-2,71,2,'#ba9663');box(-29,0,58,4,'#ab8556');box(-20,-10,14,9,q.cargo==='cloth'?'#76627a':'#9d8559');box(-19,-9,12,2,'#c5b386');box(-15,-10,2,9,'#d5c28d');box(0,-8,16,8,'#806340');box(1,-6,14,1,'#b89a64');box(21,-8,4,8,'#4d645a');box(22,-11,3,3,'#d7af78');box(31,-5,1,20,'#ba9960');
 }
 function details(){
  const map=places.find(p=>p.id==='map'),book=places.find(p=>p.id==='book');ctx.save();ctx.translate(map.x-260,map.y-351);
  box(252,347,16,3,'#795c37');box(253,350,2,7,'#594b36');box(265,350,2,7,'#594b36');box(254,342,12,6,'#d5bc83');box(257,344,6,1,'#688c7b');box(259,342,1,5,'#66816d');ctx.restore();ctx.save();ctx.translate(book.x-357,book.y-325);
  box(350,322,14,3,'#765535');box(351,325,2,6,'#4f4231');box(361,325,2,6,'#4f4231');box(352,317,5,5,'#d9c592');box(357,317,5,5,'#c8b17b');box(356,317,1,5,'#79573d');ctx.restore();
  if(config.flag){const [x,y]=config.flag,flag=Math.round(Math.sin(time*2)*1.5);box(x,y,1,21,'#5c5035');box(x+1,y+2,9,3,config.flagColor||'#a14c3b');box(x+1,y+5,8,3,'#e5d2a3');box(x+9,y+2+flag,2,3,config.flagColor||'#a14c3b');box(x+8,y+5+flag,2,3,'#e5d2a3')}
  if(config.smoke){const [x,y]=config.smoke;for(let i=0;i<4;i++){const p=(time*.12+i*.25)%1;ctx.globalAlpha=(1-p)*.18;box(x+p*8,y-p*24,5+Math.floor(p*6),3,'#e3d6b5');box(x+3+p*8,y-2-p*24,4+Math.floor(p*5),2,'#e3d6b5')}}ctx.globalAlpha=1;
  if(config.birds){const b=config.birds;for(let i=0;i<(b.count||3);i++){const x=b.x+((time*(7+i)+i*113)%b.width),y=b.y+i*17+Math.sin(time*.7+i)*7,wing=Math.sin(time*4+i)>0?1:-1;box(x,y,2,1,'#e0d8b7');box(x-3,y+wing,3,1,'#e0d8b7');box(x+2,y+wing,3,1,'#e0d8b7')}}
 }
 function draw(){if(!ctx)return;const started=performance.now();ctx.clearRect(0,0,W,H);ctx.imageSmoothingEnabled=false;water();ship();details();actors.map(a=>({actor:a,p:pathPosition(a,time)})).sort((a,b)=>a.p.y-b.p.y).forEach(a=>person(a.actor,a.p));frames++;frameCosts.push(performance.now()-started);if(frameCosts.length>300)frameCosts.shift()}
 function tick(now){raf=0;if(reasons().length){stop();return}if(!last)last=now;if(now-lastDraw>=1000/FPS){time+=Math.min(.2,(now-last)/1000);last=now;lastDraw=now;draw()}queue()}
 function pan(id,focus=false){if(!root||!profiles.has(city))return;const p=places.find(q=>q.id===id);if(!p)return;const button=root.querySelector('[data-place="'+id+'"]');const x=p.x/W*world.clientWidth-scroll.clientWidth/2,y=p.y/H*world.clientHeight-scroll.clientHeight/2;scroll.scrollTo({left:Math.max(0,x),top:Math.max(0,y),behavior:enabled()?'smooth':'auto'});if(focus)button.focus({preventScroll:true})}
 function activate(place){if(!profiles.has(city)||root.hidden||!ready)return;root.querySelectorAll('.city-door').forEach(b=>b.removeAttribute('data-selected'));const b=root.querySelector('[data-place="'+place.id+'"]');b.setAttribute('data-selected','true');open(place.view);if(place.focus){const el=document.querySelector(place.focus);if(el)el.scrollIntoView({block:'start',behavior:'auto'})}sync()}
 function asset(name){return document.getElementById('citySceneAssets')?.content.querySelector('[data-city-art="'+name+'"]')?.getAttribute('src')||''}
 function build(openView,onFallback){
  if(typeof document==='undefined'||typeof document.createElement!=='function'||typeof requestAnimationFrame!=='function')return false;
  host=document.getElementById('cityScene');if(!host)return false;open=openView;fallback=onFallback;media=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
  root=document.createElement('section');root.className='living-city';root.hidden=true;root.setAttribute('aria-label','Lübeck: begehbare Handelsstadt');
  root.innerHTML='<div class="living-city-heading"><div><span class="city-kicker">DIE KÖNIGIN DER HANSE</span><h2><b class="city-title-name">Lübeck</b> <span class="city-title-water">an der Trave</span></h2></div><p class="city-flavor">Zwischen Ratsglocke und Hafenkai</p></div><div class="living-city-scroll" tabindex="0" role="region" aria-label="Lübecker Stadtbild, waagerecht und senkrecht verschiebbar"><div class="living-city-world"><span class="city-arrival-note">Die Stadt kommt in Sicht …</span><img class="living-city-background" alt="Zusammenhängende Backsteinstadt mit Marienkirche, Rathausmarkt, Kaufmannsgassen, Kai, Lagerhäusern und Werft"><canvas class="living-city-animation" width="960" height="640" aria-hidden="true"></canvas><nav class="living-city-doors" aria-label="Gebäude in Lübeck"></nav></div></div><div class="living-city-caption"><p>Goldene Türmarken öffnen Gebäude und Bücher. <span class="city-pan-hint">Verschiebe die Stadt, um die Gassen und den Kai zu erkunden.</span></p><div class="city-tools"><button type="button" data-city-tool="labels" aria-pressed="false">Orte zeigen</button><button type="button" data-city-tool="harbor">Zum Hafenkai</button><button type="button" data-city-tool="motion" aria-pressed="true">Stadtleben pausieren</button></div><p class="city-life-status" aria-live="off"></p></div>';
  host.prepend(root);world=root.querySelector('.living-city-world');scroll=root.querySelector('.living-city-scroll');canvas=root.querySelector('canvas');ctx=canvas.getContext('2d');motionButton=root.querySelector('[data-city-tool="motion"]');labelButton=root.querySelector('[data-city-tool="labels"]');status=root.querySelector('.city-life-status');
  const nav=root.querySelector('nav');for(const place of places){const b=document.createElement('button');b.type='button';b.className='city-door';b.dataset.place=place.id;b.setAttribute('aria-label',place.name+' – '+place.hint);b.title=place.name+' · '+place.hint;b.style.left=place.x/W*100+'%';b.style.top=place.y/H*100+'%';b.innerHTML='<span class="city-door-mark" aria-hidden="true"></span><span class="city-door-name" aria-hidden="true">'+place.name+'</span>';b.addEventListener('click',()=>activate(places.find(p=>p.id===place.id)));b.addEventListener('focus',()=>{b.scrollIntoView({block:'nearest',inline:'nearest',behavior:'auto'})});nav.append(b)}
  motionButton.addEventListener('click',()=>{manualMotion=!enabled();sync();draw()});labelButton.addEventListener('click',()=>{const on=labelButton.getAttribute('aria-pressed')!=='true';labelButton.setAttribute('aria-pressed',String(on));labelButton.textContent=on?'Ortsnamen ausblenden':'Orte zeigen';root.classList.toggle('city-show-labels',on)});root.querySelector('[data-city-tool="harbor"]').addEventListener('click',()=>pan('harbor',true));
  const bg=root.querySelector('img');bg.onload=()=>{if(city!==Number(bg.dataset.scene))return;ready=true;root.classList.add('city-art-ready');draw();sync()};bg.onerror=()=>{const failed=Number(bg.dataset.scene);failedCities.add(failed);if(city!==failed)return;ready=false;hide();if(fallback)fallback()};
  boat=new Image();boat.onload=()=>{boatReady=true;draw()};riverBoat=new Image();riverBoat.onload=()=>{riverReady=true;draw()};riverBoat.onerror=()=>{riverFailed=true;draw()};// The shared sea cog is loaded only when a city's water needs it.
  document.addEventListener('visibilitychange',sync);media?.addEventListener('change',sync);
  if(typeof IntersectionObserver==='function'){observer=new IntersectionObserver(entries=>{inside=entries[0].isIntersecting;sync()},{threshold:.03});observer.observe(scroll)}
  const overlay=document.getElementById('overlay');if(overlay&&typeof MutationObserver==='function'){panelObserver=new MutationObserver(sync);panelObserver.observe(overlay,{attributes:true,attributeFilter:['class']})}
  mounts++;return true;
 }
 function hide(){city=-1;stop();if(root)root.hidden=true;if(host)host.classList.remove('city-live')}
 function configure(index){
  stop();config=profiles.get(index);places=config.places;actors=config.actors;ready=false;imageSwaps++;root.classList.remove('city-art-ready');root.setAttribute('aria-label',config.name+': begehbare Handelsstadt');root.querySelector('.city-kicker').textContent=config.kicker;root.querySelector('.city-title-name').textContent=config.name;root.querySelector('.city-title-water').textContent=config.waterName;root.querySelector('.city-flavor').textContent=config.flavor;scroll.setAttribute('aria-label',config.name+': Stadtbild, waagerecht und senkrecht verschiebbar');root.querySelector('nav').setAttribute('aria-label','Gebäude in '+config.name);const bg=root.querySelector('img');bg.alt=config.alt;
  for(const p of places){const b=root.querySelector('[data-place="'+p.id+'"]');b.style.left=p.x/W*100+'%';b.style.top=p.y/H*100+'%';b.setAttribute('aria-label',p.name+' – '+p.hint);b.title=p.name+' · '+p.hint;b.querySelector('.city-door-name').textContent=p.name;b.removeAttribute('data-selected')}
  if(config.cog&&!boat.src)boat.src=asset('cog');if(config.serviceBoat?.kind==='barge'&&!riverBoat.src)riverBoat.src=asset('riverboat');bg.dataset.scene=String(index);bg.src=asset(config.art);world.style.background=config.seaColor||'#426e69';
 }
 function mount(index,openView,onFallback){
  if(!profiles.has(index)||failedCities.has(index)){hide();return false}if(!root&&!build(openView,onFallback))return false;
  const first=city!==index;city=index;open=openView;fallback=onFallback;root.hidden=false;host.classList.add('city-live');if(first)configure(index);document.getElementById('cityArt').hidden=true;document.getElementById('cityCanvas').style.display='none';
  if(first){inside=true;draw();scroll.scrollTo({left:Math.max(0,config.initial[0]/W*world.clientWidth-scroll.clientWidth/2),top:config.initial[1]||0,behavior:'auto'})}sync();return true;
 }
 function diagnostics(){const costs=[...frameCosts].sort((a,b)=>a-b);return {city,sceneId:config.id,configuredCities:[...profiles.keys()],assetReady:ready,visualReady:ready&&(!config.cog||boatReady)&&(config.serviceBoat?.kind!=='barge'||riverReady||riverFailed),imageSwaps,mounts,frames,pending:!!raf,maxPending,time,renderFPSLimit:FPS,pausedReasons:reasons(),motionEnabled:enabled(),actors:actors.map(a=>({id:a.id,...pathPosition(a,time)})),boatReady,riverReady,riverFailed,frameMS:{samples:costs.length,median:costs[Math.floor(costs.length*.5)]||0,p95:costs[Math.floor(costs.length*.95)]||0,max:costs.at(-1)||0},places:places.map(p=>({...p}))}}
 return Object.freeze({mount,hide,pan,diagnostics});
})();
