// BEGIN Q109c LEGACY GRACE — copied verbatim into the playable HTML.
// Synchronous digest: no asynchronous operation inside the exclusive writer.
function safetyDigest(text){
 const bytes=Uint8Array.from(unescape(encodeURIComponent(text)),c=>c.charCodeAt(0)),length=bytes.length,padded=new Uint8Array(Math.ceil((length+9)/64)*64);padded.set(bytes);padded[length]=128;
 const view=new DataView(padded.buffer);view.setUint32(padded.length-8,Math.floor(length/536870912));view.setUint32(padded.length-4,(length*8)>>>0);
 const k=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],w=new Uint32Array(64),ro=(n,b)=>(n>>>b)|(n<<(32-b));
 for(let off=0;off<padded.length;off+=64){for(let i=0;i<16;i++)w[i]=view.getUint32(off+i*4);for(let i=16;i<64;i++){const a=w[i-15],b=w[i-2];w[i]=(w[i-16]+(ro(a,7)^ro(a,18)^(a>>>3))+w[i-7]+(ro(b,17)^ro(b,19)^(b>>>10)))>>>0}let [a,b,c,d,e,f,g,z]=h;for(let i=0;i<64;i++){const t=(z+(ro(e,6)^ro(e,11)^ro(e,25))+((e&f)^(~e&g))+k[i]+w[i])>>>0,u=((ro(a,2)^ro(a,13)^ro(a,22))+((a&b)^(a&c)^(b&c)))>>>0;z=g;g=f;f=e;e=(d+t)>>>0;d=c;c=b;b=a;a=(t+u)>>>0}for(const [i,v]of [a,b,c,d,e,f,g,z].entries())h[i]=(h[i]+v)>>>0}
 return h.map(n=>n.toString(16).padStart(8,'0')).join('');
}
function legacyStateDigest(x){const y=safetyCopy(x);if(y.politics.version===2){y.politics.version=1;delete y.politics.safety}return safetyDigest(JSON.stringify(y))}
function politicalDeadline(q,x=s){return x.politics.safety?.grace?.find(g=>g.contract.id===q.id&&g.contract.until===q.until)?.until??q.until}
function legacyShortest(from,to,speed,arrival=false){
 if(from===to){if(!arrival)return [];return CITIES.map((_,c)=>c).filter(c=>c!==from).map(c=>[...legacyShortest(from,c,speed),...legacyShortest(c,to,speed)]).sort((a,b)=>a.reduce((n,l)=>n+l.days,0)-b.reduce((n,l)=>n+l.days,0)||a.length-b.length)[0]}
 const dist=CITIES.map(()=>Infinity),previous=[],used=new Set();dist[from]=0;
 for(let i=0;i<CITY_COUNT;i++){let a=-1;for(let c=0;c<CITY_COUNT;c++)if(!used.has(c)&&(a<0||dist[c]<dist[a]))a=c;if(a===to)break;used.add(a);for(let b=0;b<CITY_COUNT;b++)if(b!==a){const next=dist[a]+routeTravelDays(a,b,speed);if(next<dist[b]){dist[b]=next;previous[b]=a}}}
 const legs=[];for(let at=to;at!==from;at=previous[at]){const start=previous[at];legs.unshift({from:start,to:at,days:routeTravelDays(start,at,speed)})}return legs;
}
function legacyItinerary(q,city,ship,endorsements){
 const speed=ship.speed*(.65+.35*ship.condition/100),journey=(stops,firstArrival=false)=>{let at=city,legs=[];for(const [i,dest]of stops.entries()){legs.push(...legacyShortest(at,dest,speed,i===0&&firstArrival));at=dest}return legs},score=legs=>legs.reduce((n,l)=>n+l.days,0),sort=(a,b)=>score(a)-score(b)||a.length-b.length;
 if(q.kind==='accord')return q.witnessed?journey([q.city]):journey([q.partner,q.city],true);
 const candidates=endorsements.filter(c=>c!==q.home&&!q.visited.includes(c)),paths=[[],...candidates.map(c=>[c]),...candidates.flatMap(a=>candidates.filter(b=>b!==a).map(b=>[a,b]))],plans=[];
 for(const missing of paths){const visited=[...q.visited,...missing];if(visited.length>=2&&new Set([q.home,...visited].map(c=>POLITICAL_CITIES[c].region)).size>=2)plans.push(journey([...missing,q.home],missing.length>0))}return plans.sort(sort)[0]??null;
}
function applyLegacyGrace(){
 const a=s.politics.safety,t=a.legacyTransfer;if(!SafetySession.active||SafetySession.active.readOnly)throw Error('Keine geschützte Fristübernahme');
 if(!t||a.person.source!=='unknown'||t.day!==totalDay()||legacyStateDigest(s)!==t.stateHash)return 0;
 const endorsements=s.politics.endorsements.map((e,c)=>e?c:null).filter(c=>c!==null),ships=s.ships.filter(q=>q.city===s.city),jobs=[...s.politics.jobs.filter(q=>q.kind==='accord'),...(s.politics.league?[s.politics.league]:[])];let count=0;
 for(const q of jobs){if(q.until<totalDay()||a.grace.some(g=>g.contract.id===q.id))continue;const choices=ships.map(ship=>({ship,legs:legacyItinerary(q,s.city,ship,endorsements)})).filter(p=>p.legs&&p.legs.length&&p.legs.length*[4,6,9][p.ship.type]<=s.gold).sort((x,y)=>x.legs.reduce((n,l)=>n+l.days,0)-y.legs.reduce((n,l)=>n+l.days,0)||x.legs.length*[4,6,9][x.ship.type]-y.legs.length*[4,6,9][y.ship.type]);if(!choices.length)continue;
  const {ship,legs}=choices[0],until=t.day+legs.reduce((n,l)=>n+l.days,0);if(until<=q.until||until>360000000)continue;
  a.grace.push({contract:safetyCopy(q),until,day:t.day,sourceHash:t.sourceHash,anchorCity:s.city,ship:{id:ship.id,type:ship.type,speed:ship.speed,condition:ship.condition},endorsements,legs});count++;
 }return count;
}
function validateLegacySafety(x){
 const a=x.politics.safety,t=a.legacyTransfer,now=x.year*360+x.day,keys=(o,n)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===n.length&&n.every(k=>Object.hasOwn(o,k)),int=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max,bad=()=>{throw Error('Ungültiger Altvertragsnachweis')};
 if(t!==null&&(!keys(t,['day','sourceHash','stateHash'])||!int(t.day,x.politics.since,now)||![t.sourceHash,t.stateHash].every(v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v))))bad();
 if(!Array.isArray(a.grace)||a.grace.length>12||new Set(a.grace.map(g=>g?.contract?.id)).size!==a.grace.length||a.grace.length&&!t)bad();
 for(const g of a.grace){if(!keys(g,['contract','until','day','sourceHash','anchorCity','ship','endorsements','legs'])||g.sourceHash!==t.sourceHash||g.day!==t.day||!isCityIndex(g.anchorCity)||!keys(g.ship,['id','type','speed','condition'])||!Number.isFinite(g.ship.id)||g.ship.id<0||g.ship.id>Number.MAX_SAFE_INTEGER||!Number.isInteger(g.ship.type)||!SHIPTYPES[g.ship.type]||!Number.isFinite(g.ship.speed)||g.ship.speed<.01||g.ship.speed>100||!Number.isFinite(g.ship.condition)||g.ship.condition<0||g.ship.condition>100||!Array.isArray(g.endorsements)||new Set(g.endorsements).size!==g.endorsements.length||g.endorsements.some(c=>!isCityIndex(c)||!x.politics.endorsements[c]||x.politics.endorsements[c].day>g.day)||!Array.isArray(g.legs)||g.legs.length>40)bad();
  const q=g.contract;if(q?.kind==='accord'){if(!keys(q,['id','city','kind','period','started','until','partner','good','n','witnessed'])||!isCityIndex(q.city)||!int(q.period,0,Math.floor((g.day-x.politics.since)/x.politics.rules.sectionDays))||q.id!==politicalId('accord',q.city,q.period)||q.partner!==politicalPartner(q.city,q.period)||q.good!==-1||q.n!==0||typeof q.witnessed!=='boolean')bad()}else if(!keys(q,['id','home','period','started','until','visited'])||!isCityIndex(q.home)||!int(q.period,0,Math.floor((g.day-x.politics.since)/x.politics.rules.sectionDays))||q.id!==politicalId('league',q.home,q.period)||!Array.isArray(q.visited)||new Set(q.visited).size!==q.visited.length||q.visited.some(c=>!g.endorsements.includes(c)||c===q.home))bad();
  if(!int(q.started,x.politics.since,g.day)||q.started<x.politics.since+q.period*x.politics.rules.sectionDays||!int(q.until,g.day,360000000)||!int(g.until,q.until+1,360000000))bad();
  const legs=legacyItinerary(q,g.anchorCity,g.ship,g.endorsements);if(!legs||!legs.length||JSON.stringify(g.legs)!==JSON.stringify(legs)||g.until!==g.day+legs.reduce((n,l)=>n+l.days,0))bad();
 }
}
// END Q109c LEGACY GRACE
