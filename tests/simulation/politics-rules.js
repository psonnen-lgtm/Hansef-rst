// Production politics. Verbatim copy in the HTML; no financial privileges.
const POLITICAL_RULES=Object.freeze({sectionDays:30,mayorWealth:45000,rep:55,services:6,periods:3,kinds:2,termDays:360,maxRecords:8192});
let politicsBusy=false,politicalTradeStaging=false;
function freshPolitics(now=1350*360+1,legacyRank=0){return {version:1,since:now,rules:{sectionDays:POLITICAL_RULES.sectionDays,mayorWealth:POLITICAL_RULES.mayorWealth},legacyRank,records:[],issued:Array.from({length:CITY_COUNT},()=>({supply:-1,accord:-1})),jobs:[],office:null,terms:Array(CITY_COUNT).fill(null),appointments:Array(CITY_COUNT).fill(null),nextElection:Array(CITY_COUNT).fill(0),endorsements:Array(CITY_COUNT).fill(null),league:null,leagueIssued:Array(CITY_COUNT).fill(-1),elderman:null}}
function politicalPeriod(){return Math.floor((totalDay()-s.politics.since)/s.politics.rules.sectionDays)}
function politicalWorth(){return netWorth()-warehouseArrears()}
function politicalId(kind,city,period){return kind+':'+city+':'+period}
function politicalNote(text){s.messages.unshift('Tag '+s.day+': '+text);s.messages=s.messages.slice(0,40)}
function politicalRecords(city=s.city){return s.politics.records.filter(r=>r.city===city&&r.kind!=='league')}
function politicalPartner(city,period){const others=CITIES.map((_,c)=>c).filter(c=>c!==city).sort((a,b)=>routeTravelDays(city,a,1)-routeTravelDays(city,b,1)||a-b);return others[period%3]}
function politicalOffer(kind,city=s.city){
 if(!['supply','accord'].includes(kind)||!isCityIndex(city))return null;
 const period=politicalPeriod(),needs=REGIONAL_PROFILES[city].map((role,j)=>({role,j})).filter(q=>q.role===-1).map(q=>q.j),partner=kind==='accord'?politicalPartner(city,period):-1,good=kind==='supply'?needs[period%needs.length]:-1;
 return {id:politicalId(kind,city,period),city,kind,period,started:totalDay(),until:Math.min(360000000,totalDay()+Math.max(3*s.politics.rules.sectionDays,2*routeTravelDays(city,partner<0?politicalPartner(city,period):partner,.755)+10)),partner,good,n:kind==='supply'?6+city%3:0,witnessed:false};
}
function politicalRoom(){return s.politics.records.length+s.politics.jobs.length+Number(!!s.politics.league)<POLITICAL_RULES.maxRecords}
function politicalSupport(city=s.city){
 const records=politicalRecords(city),supply=records.filter(r=>r.kind==='supply').length,accord=records.filter(r=>r.kind==='accord').length,periods=new Set(records.map(r=>r.period)).size,kinds=new Set(records.map(r=>r.kind)).size;
 const pledges=[{name:'Bürgerschaft',ok:supply>=2,need:'zwei Versorgungsdienste'},{name:POLITICAL_CITIES[city].rivals[0],ok:supply>=3,need:'drei Versorgungsdienste'},{name:POLITICAL_CITIES[city].rivals[1],ok:accord>=2,need:'zwei gehaltene Ratsvereinbarungen'},{name:'Rat der Stadt',ok:records.length>=6&&periods>=3&&kinds>=2,need:'sechs Dienste über drei Abschnitte und zwei Arten'}];
 const components={economic:Math.min(10,Math.max(0,politicalWorth())/18000),reputation:Math.min(15,s.rep/6),services:Math.min(40,records.length*5),endorsements:pledges.filter(p=>p.ok).length*5,decisions:Math.min(15,accord*5)};
 return {records:records.length,supply,accord,periods,kinds,pledges,components,score:Object.values(components).reduce((a,b)=>a+b,0),target:POLITICAL_CITIES[city].rivalTarget};
}
function mayorQuote(city=s.city){
 const q=politicalSupport(city),reasons=[];
 if(s.rank<2)reasons.push('Zuerst den Rang Ratsherr erwerben.');
 if(politicalWorth()<s.politics.rules.mayorWealth)reasons.push(fmt(s.politics.rules.mayorWealth)+' G politisches Vermögen nötig.');
 if(s.rep<55)reasons.push('55 globales Ansehen nötig.');
 if(warehouseArrears()>0)reasons.push('Zuerst alle offenen Lagermieten begleichen.');
 if(q.records<6)reasons.push((6-q.records)+' weitere örtliche Dienste nötig.');
 if(q.periods<3)reasons.push('Dienste aus drei Ratsabschnitten nötig.');
 if(q.kinds<2)reasons.push('Versorgung und Ratsvereinbarung nötig.');
 if(totalDay()+360>360000000)reasons.push('Amtszeit überschreitet den gültigen Spielkalender.');
 if(s.politics.office)reasons.push('Zuerst das aktive Bürgermeisteramt beenden oder seine Amtsprüfung abschließen.');
 if(totalDay()<s.politics.nextElection[city])reasons.push('Nächste Wahl in '+(s.politics.nextElection[city]-totalDay())+' Spieltagen.');
 return {...q,reasons,eligible:!reasons.length,willWin:!reasons.length&&q.score>=q.target};
}
function politicalOfficeProof(office=s.politics.office){
 if(!office)return false;const a=s.politics.records.slice(office.firstReceipt).filter(r=>r.city===office.city&&r.kind!=='league'&&r.day>=office.start);
 return a.length>=2&&new Set(a.map(r=>r.period)).size>=2&&a.some(r=>r.kind==='accord');
}
function politicalCloseOffice(reason){
 const o=s.politics.office;if(!o)return;const proved=politicalOfficeProof(o);
 if(proved)s.politics.terms[o.city]={city:o.city,start:o.start,end:totalDay(),firstReceipt:o.firstReceipt};
 s.politics.office=null;politicalNote('Bürgermeisteramt in '+CITIES[o.city]+' beendet ('+reason+'). '+(proved?'Bewährte Amtsführung bleibt beurkundet.':'Für eine bewährte Amtsführung fehlten zwei Dienste in verschiedenen Abschnitten einschließlich Ratsvereinbarung.')+' Dein erworbener Titel bleibt erhalten.');
 Testlog.event('political_office_end',{city:o.city,proved,reason});
}
function politicsClock(){
 const p=s?.politics;if(!p)return;
 p.jobs=p.jobs.filter(q=>{if(q.until>=totalDay())return true;politicalNote('Ratsbrief in '+CITIES[q.city]+' abgelaufen; keine Leistung anerkannt.');return false});
 if(p.league&&p.league.until<totalDay()){politicalNote('Die Frist des Hansevertrags ist abgelaufen. Vorhandene Verdienste bleiben erhalten.');p.league=null}
 if(p.office&&p.office.until<=totalDay())politicalCloseOffice('Amtszeit abgelaufen');
}
function politicalLeagueAccess(){return s.rank===4||!!s.politics.office||s.politics.terms.some(Boolean)}
function politicalHome(){return s.politics.office?.city??s.politics.terms.find(t=>t)?.city??null}
function hanseQuote(){
 const home=politicalHome(),external=s.politics.endorsements.filter(e=>e&&e.city!==home),cities=home===null?[]:[home,...external.map(e=>e.city)],regions=new Set(cities.map(c=>POLITICAL_CITIES[c].region)),reasons=[];
 if(s.rank>=4)return {eligible:false,reasons:['Der Eldermann-Titel ist bereits erworben. Der Handel geht weiter.'],home,external,cities,regions:regions.size};
 if(home===null||!(s.politics.office?.city===home&&politicalOfficeProof()||s.politics.terms[home]))reasons.push('Bewährtes Bürgermeisteramt nötig: zwei neue Dienste in zwei Abschnitten, darunter eine Ratsvereinbarung.');
 if(politicalWorth()<180000)reasons.push('180.000 G politisches Vermögen nötig.');
 if(s.rep<90)reasons.push('90 Ansehen nötig.');
 if(warehouseArrears()>0)reasons.push('Zuerst alle Mietrückstände begleichen.');
 if(cities.length<4||external.length<3)reasons.push('Vier Stadtsiegel einschließlich drei auswärtiger Fürsprecher nötig.');
 if(regions.size<2)reasons.push('Siegel aus mindestens zwei Handelsräumen nötig.');
 if(!s.politics.records.some(r=>r.kind==='league'&&r.city===home))reasons.push('Einen überregionalen Hansevertrag mit zwei auswärtigen Vorsprachen halten.');
 return {eligible:!reasons.length,reasons,home,external,cities,regions:regions.size};
}
function politicalAction(message,change){
 if(politicsBusy||!s)return false;const original=s,expected=JSON.stringify(s);let committed=false,events=[],snapshots=[];politicsBusy=true;
 const oldEvent=Testlog.event,oldSnapshot=Testlog.snapshot;
 try{
  if(message&&!confirm(message))return false;
  if(JSON.stringify(s)!==expected)return false;
  s=JSON.parse(expected);Testlog.event=(type,details={})=>events.push({type,details});Testlog.snapshot=reason=>snapshots.push(reason);
  if(change()===false){s=original;return false}
  validate(s);localStorage.setItem(KEY,JSON.stringify(s));committed=true;
 }catch(e){if(!committed)s=original;notice('Politische Entscheidung nicht gespeichert. Deine Partie bleibt unverändert.');return false}
 finally{Testlog.event=oldEvent;Testlog.snapshot=oldSnapshot;politicsBusy=false}
 for(const event of events)oldEvent(event.type,event.details);for(const reason of snapshots)oldSnapshot(reason);render();hallView();return true;
}
function acceptPoliticalJob(kind){
 const offer=politicalOffer(kind);if(!offer)return false;
 if(!politicalRoom()||s.politics.issued[s.city][kind]>=offer.period||s.politics.jobs.some(q=>q.city===s.city&&q.kind===kind&&q.until>=totalDay()))return false;
 return politicalAction('Ratsbrief aus '+CITIES[s.city]+' annehmen? '+(kind==='supply'?offer.n+' Fass '+GOODS[offer.good][0]+' nachweislich aus anderer Stadt hier verkaufen.':'Persönlich im Rathaus von '+CITIES[offer.partner]+' vorsprechen und anschließend hier Bericht erstatten.')+' Frist: '+(offer.until-totalDay())+' Spieltage. Kein Goldbonus, einmaliger Verdienst. Kein Abbruch mit Neuangebot in diesem Abschnitt.',()=>{
  if(!politicalRoom()||s.politics.issued[s.city][kind]>=offer.period)return false;
  s.politics.issued[s.city][kind]=offer.period;s.politics.jobs=s.politics.jobs.filter(q=>!(q.city===s.city&&q.kind===kind));s.politics.jobs.push(offer);politicalNote('Versiegelten '+(kind==='supply'?'Versorgungsbrief':'Ratsvertrag')+' in '+CITIES[s.city]+' angenommen.');Testlog.event('political_job_accepted',{...offer});return true;
 });
}
function politicalRecord(job,witnesses=[]){
 if(s.politics.records.some(r=>r.id===job.id))return false;
 const receipt={id:job.id,city:job.city,kind:job.kind,period:job.period,day:totalDay(),partner:job.partner??-1,good:job.good??-1,n:job.n??0,witnesses};
 s.politics.records.push(receipt);politicalNote((job.kind==='supply'?'Fremde Ware ordnungsgemäß geliefert':job.kind==='accord'?'Ratsvereinbarung gehalten':'Überregionalen Hansevertrag gehalten')+' – Verdienst in '+CITIES[job.city]+' beurkundet.');Testlog.event('political_service',{...receipt});return true;
}
function politicalSupplyPending(j){return !!s?.politics?.jobs.some(q=>q.kind==='supply'&&q.city===s.city&&q.good===j&&q.until>=totalDay())}
function completePoliticalSupply(j,eligible){
 if(!politicalTradeStaging)return false;const q=s.politics.jobs.find(q=>q.kind==='supply'&&q.city===s.city&&q.good===j&&q.until>=totalDay()&&eligible>=q.n);
 if(!q||!politicalRecord(q))return false;s.politics.jobs=s.politics.jobs.filter(x=>x.id!==q.id);return true;
}
function politicalTrade(j,dir){
 if(politicsBusy||politicalTradeStaging)return false;const original=s,oldSave=save,oldRender=render,oldMarket=marketView,oldEvent=Testlog.event,oldSnapshot=Testlog.snapshot,events=[];let committed=false;politicsBusy=true;
 try{
  s=JSON.parse(JSON.stringify(original));save=()=>{};render=()=>{};marketView=()=>{};Testlog.snapshot=()=>{};Testlog.event=(type,details={})=>events.push({type,details});politicalTradeStaging=true;
  trade(j,dir);if(!events.some(e=>e.type==='sell')){s=original;return false}
  validate(s);localStorage.setItem(KEY,JSON.stringify(s));committed=true;
 }catch(e){if(!committed)s=original;notice('Verkauf und politischer Verdienst nicht gespeichert. Waren, Gold und Leistungsbuch bleiben unverändert.');return false}
 finally{save=oldSave;render=oldRender;marketView=oldMarket;Testlog.event=oldEvent;Testlog.snapshot=oldSnapshot;politicalTradeStaging=false;politicsBusy=false}
 for(const e of events)oldEvent(e.type,e.details);render();marketView();return true;
}
function witnessPoliticalJob(id){
 const q=s.politics.jobs.find(q=>q.id===id&&q.kind==='accord'&&q.partner===s.city&&!q.witnessed&&q.until>=totalDay());if(!q)return false;
 return politicalAction('Dem Rat von '+CITIES[s.city]+' den versiegelten Brief vorlegen? Danach persönlich in '+CITIES[q.city]+' Bericht erstatten.',()=>{const x=s.politics.jobs.find(x=>x.id===id);if(!x||x.witnessed||x.partner!==s.city)return false;x.witnessed=true;politicalNote('Ratsbrief aus '+CITIES[x.city]+' persönlich in '+CITIES[s.city]+' bestätigt.');return true});
}
function finishPoliticalAccord(id){
 const q=s.politics.jobs.find(q=>q.id===id&&q.kind==='accord'&&q.city===s.city&&q.witnessed&&q.until>=totalDay());if(!q)return false;
 return politicalAction('Die gehaltene Ratsvereinbarung in '+CITIES[s.city]+' beurkunden lassen?',()=>{const x=s.politics.jobs.find(x=>x.id===id);if(!x||!x.witnessed||x.city!==s.city||!politicalRecord(x))return false;s.politics.jobs=s.politics.jobs.filter(q=>q.id!==id);return true});
}
function runMayorElection(){
 const q=mayorQuote();if(!q.eligible){notice(q.reasons.join(' '));return false}
 return politicalAction('Bürgermeisterwahl in '+CITIES[s.city]+': '+q.score.toFixed(1)+' von '+q.target+' nötiger Ratsunterstützung. '+(q.willWin?'Die zugesagte Mehrheit reicht.':'Die Mehrheit reicht noch nicht; die Niederlage löscht keine Verdienste.')+' Kein Wahlzufall. Nächste Kandidatur nach einem Ratsabschnitt.',()=>{
  const quote=mayorQuote();if(!quote.eligible)return false;const p=s.politics;p.nextElection[s.city]=totalDay()+p.rules.sectionDays;
  if(quote.score>=quote.target){p.office={city:s.city,start:totalDay(),until:Math.min(360000000,totalDay()+360),firstReceipt:p.records.length};p.appointments[s.city]={city:s.city,day:totalDay(),support:quote.score};s.rank=Math.max(s.rank,3);politicalNote('Bürgermeisterwahl in '+CITIES[s.city]+' gewonnen. Die Mehrheit ist öffentlich belegt; ein Amt, keine Geldvergünstigungen.');Testlog.event('promotion',{rank:s.rank,officeCity:s.city})}
  else politicalNote('Bürgermeisterwahl in '+CITIES[s.city]+' verloren: '+quote.score.toFixed(1)+' von '+quote.target+' Unterstützung. Weitere gehaltene Dienste und Zusagen gewinnen; alle Verdienste bleiben.');
  Testlog.event('political_election',{city:s.city,won:quote.score>=quote.target,support:quote.score,target:quote.target});return true;
 });
}
function resignMayor(){if(!s.politics.office)return false;return politicalAction('Bürgermeisteramt in '+CITIES[s.politics.office.city]+' beenden? Örtliche Amtsrechte enden, Titel und erworbene Verdienste bleiben.',()=>{politicalCloseOffice('freiwillig niedergelegt');return true})}
function reviewMayor(){if(!s.politics.office||s.politics.office.until>totalDay())return false;return politicalAction(null,()=>{politicalCloseOffice('Amtsprüfung');return true})}
function requestPoliticalEndorsement(){
 const a=politicalRecords(),ids=['supply','accord'].map(kind=>a.find(r=>r.kind===kind)?.id);if(!politicalLeagueAccess()||s.politics.endorsements[s.city]||ids.some(id=>!id))return false;
 return politicalAction('Die beiden belegten örtlichen Leistungsarten dem Rat von '+CITIES[s.city]+' vorlegen und um ein Stadtsiegel als Fürsprecher bitten?',()=>{if(s.politics.endorsements[s.city])return false;s.politics.endorsements[s.city]={city:s.city,day:totalDay(),services:ids};politicalNote(CITIES[s.city]+' sagt als auswärtiger Fürsprecher Unterstützung zu. Kein Geldbonus.');Testlog.event('political_endorsement',{city:s.city});return true});
}
function acceptHanseAgreement(){
 const home=politicalHome()??s.city,period=politicalPeriod();if(!politicalLeagueAccess()||s.politics.league||s.politics.leagueIssued[home]>=period||!politicalRoom())return false;
 return politicalAction('Hansevertrag: mit zwei auswärtigen, bereits unterstützenden Städten mit mindestens zwei Handelsräumen einschließlich Heimat persönlich verhandeln und in '+CITIES[home]+' berichten. 720 Spieltage Frist, kein Goldbonus.',()=>{const p=s.politics;p.leagueIssued[home]=period;p.league={id:politicalId('league',home,period),home,period,started:totalDay(),until:Math.min(360000000,totalDay()+720),visited:[]};return true});
}
function witnessHanseAgreement(){
 const q=s.politics.league;if(!q||q.until<totalDay()||s.city===q.home||!s.politics.endorsements[s.city]||q.visited.includes(s.city))return false;
 return politicalAction('Mit dem Fürsprecher von '+CITIES[s.city]+' persönlich über den Hansevertrag verhandeln?',()=>{s.politics.league.visited.push(s.city);politicalNote('Hansevertrag in '+CITIES[s.city]+' persönlich bestätigt.');return true});
}
function finishHanseAgreement(){
 const q=s.politics.league;if(!q||s.city!==q.home||q.until<totalDay()||q.visited.length<2||new Set([q.home,...q.visited].map(c=>POLITICAL_CITIES[c].region)).size<2)return false;
 return politicalAction('Den gehaltenen überregionalen Vertrag in '+CITIES[s.city]+' versiegeln lassen?',()=>{const q=s.politics.league;if(!politicalRecord({id:q.id,city:q.home,kind:'league',period:q.period},q.visited))return false;s.politics.league=null;return true});
}
function runHanseAssembly(){
 const q=hanseQuote();if(!q.eligible){notice(q.reasons.join(' '));return false}
 return politicalAction('Die Hanseversammlung prüft deine bewährte Amtsführung, vier Stadtsiegel, Handelsräume, Fürsprecher und den gehaltenen Hansevertrag. Die Voraussetzungen reichen; kein Wahlzufall. Zum Eldermann wählen lassen?',()=>{
  const q=hanseQuote();if(!q.eligible)return false;if(s.politics.office)politicalCloseOffice('Übernahme des Eldermannamts');
  s.politics.elderman={day:totalDay(),home:q.home,cities:q.cities};s.rank=4;politicalNote('Die Hanseversammlung wählt dich zum Eldermann. Deine Leistungen und Fürsprecher sind beurkundet. Handel und Schiffbau gehen weiter.');Testlog.event('promotion',{rank:4});Testlog.snapshot('elderman');return true;
 });
}
function validatePolitics(x){
 const p=x.politics,now=x.year*360+x.day,object=o=>o&&typeof o==='object'&&!Array.isArray(o),keys=(o,names)=>object(o)&&Object.keys(o).length===names.length&&names.every(k=>Object.hasOwn(o,k)),int=(n,a=0,b=360000000)=>Number.isSafeInteger(n)&&n>=a&&n<=b,day=n=>int(n,p?.since,now),bad=()=>{throw Error('Ungültige politische Daten')};
 if(!keys(p,['version','since','rules','legacyRank','records','issued','jobs','office','terms','appointments','nextElection','endorsements','league','leagueIssued','elderman'])||p.version!==1||!int(p.since,0,now)||!keys(p.rules,['sectionDays','mayorWealth'])||![30,60].includes(p.rules.sectionDays)||![45000,85000].includes(p.rules.mayorWealth)||!int(p.legacyRank,0,x.rank))bad();
 const period=Math.floor((now-p.since)/p.rules.sectionDays);
 for(const field of ['issued','terms','appointments','nextElection','endorsements','leagueIssued'])if(!Array.isArray(p[field])||p[field].length!==CITY_COUNT)bad();
 if(!Array.isArray(p.records)||p.records.length>8192||!Array.isArray(p.jobs)||p.jobs.length>22||p.records.length+p.jobs.length+Number(!!p.league)>8192)bad();
 for(let city=0;city<CITY_COUNT;city++){if(!keys(p.issued[city],['supply','accord'])||!int(p.issued[city].supply,-1,period)||!int(p.issued[city].accord,-1,period)||!int(p.leagueIssued[city],-1,period)||!int(p.nextElection[city],0,360000000))bad()}
 const ids=new Set(),records=new Map();
 function content(q){
  if(!['supply','accord','league'].includes(q.kind)||!isCityIndex(q.city)||!int(q.period,0,period)||q.id!==politicalId(q.kind,q.city,q.period))bad();
  if(q.kind==='supply'){const needs=REGIONAL_PROFILES[q.city].map((r,j)=>({r,j})).filter(v=>v.r===-1).map(v=>v.j);if(q.good!==needs[q.period%needs.length]||q.n!==6+q.city%3||q.partner!==-1)bad()}
  if(q.kind==='accord'&&(q.partner!==politicalPartner(q.city,q.period)||q.good!==-1||q.n!==0))bad();
  if(q.kind==='league'&&(q.partner!==-1||q.good!==-1||q.n!==0))bad();
  const issued=q.kind==='league'?p.leagueIssued[q.city]:p.issued[q.city][q.kind];if(issued<q.period)bad();
 }
 let previous=-1;
 for(const r of p.records){
  if(!keys(r,['id','city','kind','period','day','partner','good','n','witnesses'])||!day(r.day)||r.day<p.since+r.period*p.rules.sectionDays||r.day<previous||ids.has(r.id)||!Array.isArray(r.witnesses))bad();
  content(r);if(r.kind!=='league'&&r.witnesses.length)bad();ids.add(r.id);records.set(r.id,r);previous=r.day;
 }
 for(let city=0;city<CITY_COUNT;city++){
  const e=p.endorsements[city];if(e!==null&&(!keys(e,['city','day','services'])||e.city!==city||!day(e.day)||!Array.isArray(e.services)||e.services.length!==2||new Set(e.services).size!==2||e.services.some(id=>!records.has(id)||records.get(id).city!==city||records.get(id).day>e.day)||new Set(e.services.map(id=>records.get(id)?.kind)).size!==2||e.services.some(id=>records.get(id)?.kind==='league')))bad();
  const a=p.appointments[city];if(a!==null&&(!keys(a,['city','day','support'])||a.city!==city||!day(a.day)||!Number.isFinite(a.support)||a.support<POLITICAL_CITIES[city].rivalTarget||a.support>100))bad();
  const t=p.terms[city];if(t!==null){if(!keys(t,['city','start','end','firstReceipt'])||t.city!==city||!day(t.start)||!day(t.end)||t.end<t.start||!int(t.firstReceipt,0,p.records.length)||!a)bad();const deeds=p.records.slice(t.firstReceipt).filter(r=>r.city===city&&r.kind!=='league'&&r.day>=t.start&&r.day<=t.end);if(deeds.length<2||new Set(deeds.map(r=>r.period)).size<2||!deeds.some(r=>r.kind==='accord'))bad()}
 }
 const active=new Set();
 for(const q of p.jobs){
  if(!keys(q,['id','city','kind','period','started','until','partner','good','n','witnessed'])||!['supply','accord'].includes(q.kind)||!day(q.started)||q.started<p.since+q.period*p.rules.sectionDays||!int(q.until,q.started,360000000)||typeof q.witnessed!=='boolean'||q.kind==='supply'&&q.witnessed||ids.has(q.id)||active.has(q.city+':'+q.kind))bad();
  content(q);active.add(q.city+':'+q.kind);ids.add(q.id);
 }
 const o=p.office;if(o!==null&&(!keys(o,['city','start','until','firstReceipt'])||!isCityIndex(o.city)||!day(o.start)||o.until!==Math.min(360000000,o.start+360)||!int(o.firstReceipt,0,p.records.length)||!p.appointments[o.city]||x.rank<3))bad();
 function witnesses(home,a){return Array.isArray(a)&&a.length>=2&&a.length<=10&&new Set(a).size===a.length&&a.every(c=>isCityIndex(c)&&c!==home&&p.endorsements[c])&&new Set([home,...a].map(c=>POLITICAL_CITIES[c].region)).size>=2}
 for(const r of p.records)if(r.kind==='league'&&!witnesses(r.city,r.witnesses))bad();
 const l=p.league;if(l!==null&&(!keys(l,['id','home','period','started','until','visited'])||!isCityIndex(l.home)||!int(l.period,0,period)||l.id!==politicalId('league',l.home,l.period)||p.leagueIssued[l.home]<l.period||!day(l.started)||!int(l.until,l.started,360000000)||!Array.isArray(l.visited)||l.visited.length>10||new Set(l.visited).size!==l.visited.length||l.visited.some(c=>!isCityIndex(c)||c===l.home||!p.endorsements[c])||ids.has(l.id)))bad();
 const e=p.elderman;if(e!==null&&(!keys(e,['day','home','cities'])||!day(e.day)||!isCityIndex(e.home)||!p.terms[e.home]||p.terms[e.home].end>e.day||!Array.isArray(e.cities)||e.cities.length<4||e.cities.length>11||new Set(e.cities).size!==e.cities.length||!e.cities.includes(e.home)||e.cities.some(c=>!isCityIndex(c)||c!==e.home&&!p.endorsements[c])||new Set(e.cities.map(c=>POLITICAL_CITIES[c].region)).size<2||!p.records.some(r=>r.kind==='league'&&r.city===e.home&&r.day<=e.day)||x.rank!==4))bad();
 if(x.rank>=3&&p.legacyRank<3&&!p.appointments.some(Boolean))bad();
 if(x.rank===4&&p.legacyRank<4&&!e)bad();
 if(!Number.isSafeInteger(x.completed)||x.completed<0||!Number.isSafeInteger(x.visits)||x.visits<1||(Object.hasOwn(x,'electionAvailableAt')&&!int(x.electionAvailableAt,0,360000000))||!Number.isSafeInteger(x.shipyard.lastShipId))bad();
 return p;
}
function migratePolitics(raw){
 try{
  if(raw?.v===11){const x=JSON.parse(JSON.stringify(raw));validate(x);return x}
  const x=migrateShipyard(raw);if(!x||Object.hasOwn(x,'politics'))return null;
  x.politics=freshPolitics(x.year*360+x.day,x.rank);x.v=11;
  if(!Number.isSafeInteger(x.completed)||x.completed<0)x.completed=0;
  if(!Number.isSafeInteger(x.visits)||x.visits<1)x.visits=1;
  if(Object.hasOwn(x,'electionAvailableAt')&&(!Number.isSafeInteger(x.electionAvailableAt)||x.electionAvailableAt<0||x.electionAvailableAt>360000000))x.electionAvailableAt=0;
  validate(x);return x;
 }catch(e){return null}
}
function backupPoliticsMigration(raw,imported=false,force=false){
 if(!force&&JSON.parse(raw).v===11)return;const base=KEY+'-politics-v11-'+(imported?'import':'startup')+'-backup';
 for(let i=0;i<100;i++){const key=base+(i?'-'+(i+1):''),old=localStorage.getItem(key);if(old===raw)return;if(old===null){localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('Originalsicherung fehlgeschlagen');return}}
 throw Error('Keine freie politische Originalsicherung. Bitte Sicherungen exportieren.');
}
function politicalRumorPanel(){const q=politicalSupport();return '<section class="item political-letter"><h3>🗣️ Stimmen aus dem Rat</h3><p>'+esc(POLITICAL_CITIES[s.city].rivals[0])+': „'+(q.supply>=3?'Deine Lieferzusagen sind belegt.':'Wir achten auf verlässliche Versorgung, nicht nur auf Gold.')+'“</p><p>'+esc(POLITICAL_CITIES[s.city].rivals[1])+': „'+(q.accord>=2?'Deine Ratsvereinbarungen sind gehalten.':'Eine persönliche Zusage muss auch auf der Rückreise tragen.')+'“</p><p class="muted">Verbindliche Wahlbedingungen stehen im Rathaus. Keine neue Zufallsziehung.</p><button class="ghost" onclick="show(\'hall\')">Zur Ratskammer</button></section>'}
function politicsHallView(){
 const p=s.politics,c=s.city,q=mayorQuote(),h=hanseQuote(),period=politicalPeriod(),next=p.since+(period+1)*p.rules.sectionDays,local=politicalRecords(),o=p.office,until=o?Math.max(0,o.until-totalDay()):0;
 const icon=ok=>ok?'✓':'○',rival=(name,index)=>'<div class="political-person"><span aria-hidden="true">👤</span><h4>'+esc(name)+'</h4><p>Einflussreicher Kaufmannskreis · '+(q.pledges[index+1].ok?'steht zu deiner Kandidatur':'erwartet '+q.pledges[index+1].need)+'.</p></div>';
 let html='<section class="political-letter"><h3>📜 Ratsbrief aus '+esc(CITIES[c])+'</h3><p>Dein erworbener Titel: <b>'+esc(rank())+'</b>. '+(p.legacyRank>=3&&!p.appointments.some(Boolean)?'Dein früherer Titel bleibt erhalten. Eine Amtsstadt wurde nicht erfunden; örtliche Amtsrechte erhältst du durch die unten erklärte Kandidatur.':'')+'</p><p>Politisches Vermögen: <b>'+fmt(politicalWorth())+' G</b> nach Abzug von '+fmt(warehouseArrears())+' G Mietrückstand. Allgemeines Buchvermögen und Kreditregeln bleiben unverändert.</p><p>Ratsabschnitt '+(period+1)+' · nächster Abschnitt in '+(next-totalDay())+' Spieltagen. Warten allein schafft keine Verdienste.</p></section>';
 if(s.rank<2){const wealth=[18000,45000][s.rank],rep=[0,25][s.rank];html+='<section class="item"><h3>Dein nächster Kaufmannsrang</h3><p>'+['Fernkaufmann','Ratsherr'][s.rank]+': '+fmt(wealth)+' G Buchvermögen und '+rep+' Ansehen.</p><button onclick="promote()" '+(netWorth()<wealth||s.rep<rep?'disabled':'')+'>Aufstieg beantragen</button></section>'}
 html+='<div class="grid political-rivals">'+rival(POLITICAL_CITIES[c].rivals[0],0)+rival(POLITICAL_CITIES[c].rivals[1],1)+'</div>';
 html+='<section class="political-letter"><h3>📖 Örtliches Leistungsbuch</h3><p>'+q.records+' beurkundete Dienste aus '+q.periods+' Ratsabschnitten. Benötigt: sechs Dienste, drei Abschnitte, Versorgung und Ratsvereinbarung.</p>'+q.pledges.map(v=>'<p>'+icon(v.ok)+' <b>'+esc(v.name)+'</b>: '+(v.ok?'Zusage belegt.':esc(v.need)+'.')+'</p>').join('')+'<details><summary>Die öffentliche Ratsmehrheit verstehen</summary><p>'+q.score.toFixed(1)+' von '+q.target+' nötiger Unterstützung. Wirtschaft '+q.components.economic.toFixed(1)+'/10, globales Ansehen '+q.components.reputation.toFixed(1)+'/15, Dienste '+q.components.services+'/40, Zusagen '+q.components.endorsements+'/20, gehaltene Vereinbarungen '+q.components.decisions+'/15. Diese Werte sind abgeleitet, keine weiteren Ansehensleisten.</p></details><p>'+q.reasons.map(esc).join(' ')+'</p><button id="mayorCandidate" onclick="runMayorElection()" '+(!q.eligible?'disabled':'')+'>'+(q.willWin?'Mit zugesagter Mehrheit kandidieren':'Bürgermeisterkandidatur prüfen')+'</button><p class="muted">Kein Wahlzufall. Ein verlorener Antrag löscht keine Dienste. Nächste mögliche Wahl: '+(Math.max(0,p.nextElection[c]-totalDay()))+' Spieltage.</p></section>';
 html+='<section class="political-letter"><h3>✉️ Versiegelte Bürger- und Ratsbriefe</h3><p>Ausdrückliche politische Dienste, keine zusätzlichen Goldprämien. Öffnen, Umlagern und Abbrechen schaffen kein neues Angebot.</p>';
 for(const kind of ['supply','accord']){const job=p.jobs.find(j=>j.city===c&&j.kind===kind),offer=politicalOffer(kind);html+='<div class="item"><h4>'+(kind==='supply'?'🧺 Versorgung der Bürgerschaft':'📜 Ratsvereinbarung')+'</h4>';
  if(job)html+='<p>'+(kind==='supply'?job.n+' Fass '+esc(GOODS[job.good][0])+' aus nachweislich anderer Stadt hier im Handel verkaufen.':'Persönlich im Rathaus von '+esc(CITIES[job.partner])+' vorsprechen, danach hier Bericht erstatten. '+(job.witnessed?'Vorsprache bestätigt.':'Vorsprache fehlt.'))+' Noch '+Math.max(0,job.until-totalDay())+' Spieltage.</p>'+(kind==='accord'&&job.witnessed?'<button onclick="finishPoliticalAccord(\''+job.id+'\')">Rückkehr und gehaltene Zusage beurkunden</button>':'');
  else html+='<p>'+(kind==='supply'?offer.n+' Fass '+esc(GOODS[offer.good][0])+' regelgerecht aus anderer Stadt liefern.':'Briefwechsel mit '+esc(CITIES[offer.partner])+': persönlich hinreisen, vorsprechen und zurückkehren.')+'</p><button onclick="acceptPoliticalJob(\''+kind+'\')" '+(p.issued[c][kind]>=period||!politicalRoom()?'disabled':'')+'>'+(p.issued[c][kind]>=period?'In diesem Abschnitt bereits vergeben':'Ratsbrief annehmen')+'</button>';
  html+='</div>';
 }
 for(const job of p.jobs.filter(j=>j.kind==='accord'&&j.partner===c&&!j.witnessed&&j.until>=totalDay()))html+='<div class="notice"><p>Botenbrief aus '+esc(CITIES[job.city])+' persönlich übergeben.</p><button onclick="witnessPoliticalJob(\''+job.id+'\')">Vor dem Rat vorsprechen</button></div>';
 html+='</section>';
 if(o)html+='<section class="political-letter mayor-room"><h3>🔏 Bürgermeisterzimmer · '+esc(CITIES[o.city])+'</h3><p>Ein aktives Amt, seit Tag '+o.start+'; noch '+until+' Spieltage. Stadtwechsel übertragen dein Siegel nicht.</p><p>'+icon(politicalOfficeProof())+' Amtsprüfung: zwei neue örtliche Dienste aus zwei Abschnitten einschließlich Ratsvereinbarung. '+(politicalOfficeProof()?'Bewährte Amtsführung belegt.':'Pflichten noch offen.')+'</p><p>Amtsvorteil: Zugang zu Hansevorhaben und auswärtigen politischen Ansprechpartnern. Keine Preis-, Hafen-, Lager-, Bank- oder Werftrabatte.</p><button onclick="resignMayor()">Amt ausdrücklich niederlegen</button>'+(until===0?'<button onclick="reviewMayor()">Fällige Amtsprüfung abschließen</button>':'')+'</section>';
 html+='<section class="political-letter hanse-room"><h3>🕯️ Die Hanseversammlung</h3><p>Stadtsiegel/Fürsprecher: '+p.endorsements.filter(Boolean).map(e=>esc(CITIES[e.city])).join(', ')+'.</p><p>'+h.reasons.map(esc).join(' ')+'</p>';
 if(politicalLeagueAccess()){const records=politicalRecords(),can=records.some(r=>r.kind==='supply')&&records.some(r=>r.kind==='accord');html+='<button onclick="requestPoliticalEndorsement()" '+(!can||p.endorsements[c]?'disabled':'')+'>'+(p.endorsements[c]?'Stadtsiegel bereits erhalten':'Um örtliches Stadtsiegel bitten')+'</button>'}
 const league=p.league;
 if(league)html+='<div class="notice"><p>Hansevertrag: zwei auswärtige Fürsprecher besuchen, persönlich bestätigen, anschließend nach '+esc(CITIES[league.home])+' zurück. Mindestens zwei Handelsräume einschließlich Heimat. Bestätigt: '+league.visited.map(c=>esc(CITIES[c])).join(', ')+'. Frist noch '+Math.max(0,league.until-totalDay())+' Tage.</p><button onclick="witnessHanseAgreement()">Mit dem hiesigen Fürsprecher verhandeln</button><button onclick="finishHanseAgreement()">Gehaltenen Vertrag in der Heimat versiegeln</button></div>';
 else if(politicalLeagueAccess())html+='<button onclick="acceptHanseAgreement()" '+(!politicalRoom()?'disabled':'')+'>Überregionalen Hansevertrag ansehen</button>';
 html+='<button id="hanseCandidate" onclick="runHanseAssembly()" '+(!h.eligible?'disabled':'')+'>Vor die Hanseversammlung treten</button>'+(s.rank===4?'<p>🏆 Dein Eldermann-Titel bleibt. Handel, Lagerwirtschaft und Schiffbau gehen weiter.</p>':'')+'</section>';
 html+='<details class="political-letter"><summary>Örtliche Urkunden lesen</summary>'+local.slice(-20).reverse().map(r=>'<p>🔖 '+(r.kind==='supply'?'Versorgung: '+esc(GOODS[r.good][0]):'Ratsvereinbarung mit '+esc(CITIES[r.partner]))+' · Abschnitt '+(r.period+1)+' · Tag '+r.day+'</p>').join('')+'<p>'+local.length+' Urkunden insgesamt, die letzten zwanzig angezeigt. Keine neue Anerkennung durch Laden oder Öffnen.</p></details>';
 openSheet('🏛️ Ratskammer von '+CITIES[c],html);
}
const POLITICAL_CITIES=Object.freeze([{"city":0,"id":"luebeck","name":"Lübeck","rivalTarget":80,"rivals":["alte Ratsfamilien","Fernhandelsbund"],"civicFocus":["Fischversorgung","vermittelnde Hanseaufträge"],"region":1},{"city":1,"id":"hamburg","name":"Hamburg","rivalTarget":76,"rivals":["Tuchhändlerkreis","Hafengilde"],"civicFocus":["Holz- und Pechversorgung","verlässliche Hafenzusagen"],"region":1},{"city":2,"id":"rostock","name":"Rostock","rivalTarget":68,"rivals":["Brauergilde","Speicherkaufleute"],"civicFocus":["Tuch und Eisenwaren","faire Versorgung der Handwerker"],"region":1},{"city":3,"id":"stralsund","name":"Stralsund","rivalTarget":65,"rivals":["Fischhändlerbund","alter Hafenrat"],"civicFocus":["Salz und Tuch","wiederholte verlässliche Lieferungen"],"region":1},{"city":4,"id":"stettin","name":"Stettin","rivalTarget":67,"rivals":["Holzhändlerkreis","Werftzunft"],"civicFocus":["Salz und Tuch","Ausgleich von Ausfuhr- und Bürgerinteressen"],"region":1},{"city":5,"id":"danzig","name":"Danzig","rivalTarget":74,"rivals":["Getreidespeicherfamilien","Fernhändlerkreis"],"civicFocus":["Tuch und Eisenwaren","Versorgung vor kurzfristiger Ausfuhr"],"region":1},{"city":6,"id":"bergen","name":"Bergen","rivalTarget":62,"rivals":["Fischhändler","Versorgungsrat"],"civicFocus":["Getreide, Bier und Hanf","witterungsfeste Versorgungszusagen"],"region":2},{"city":7,"id":"visby","name":"Visby","rivalTarget":70,"rivals":["Inselkaufleute","Umschlaghändler"],"civicFocus":["Getreide und Eisenwaren","Vermittlung zwischen Handelspartnern"],"region":2},{"city":8,"id":"bruegge","name":"Brügge","rivalTarget":78,"rivals":["Tuchgilden","Zwinhandelshaus"],"civicFocus":["Holz und Pelze","Ausgleich zwischen Handwerk und Fernhandel"],"region":0},{"city":9,"id":"nowgorod","name":"Nowgorod","rivalTarget":64,"rivals":["Waldwarenhändler","örtliche Handelsvermittler"],"civicFocus":["Bier, Salz und Tuch","verlässliche Binnenhandelsabsprachen"],"region":3},{"city":10,"id":"venlo","name":"Venlo","rivalTarget":60,"rivals":["Maaskaufleute","kleiner Stadtrat"],"civicFocus":["Fisch und Pelze","verlässlicher Fluss- und Fernhandel"],"region":0}].map(c=>Object.freeze({...c,rivals:Object.freeze(c.rivals),civicFocus:Object.freeze(c.civicFocus)})));
