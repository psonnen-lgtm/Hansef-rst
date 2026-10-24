"""Read-only checkpoint analysis and new archive publication. No engine execution."""
from pathlib import Path
import json,gzip,hashlib,statistics,tarfile,sys,collections,subprocess,math
source=Path(sys.argv[1]);out=Path(sys.argv[2]);out.mkdir(exist_ok=False)
manifest=json.loads((source/'manifest.json').read_text());session=json.loads((source/'reconciled-complete.json').read_text());assert session['unresolvedCases']==0 and session['verifiedCases']==1500
IDS=manifest['strategies'];CITIES=['Lübeck','Hamburg','Rostock','Stralsund','Stettin','Danzig','Bergen','Visby','Brügge','Nowgorod','Venlo'];GOODS=['Getreide','Bier','Holz','Salz','Fisch','Tuch','Hansegras','Hanf','Pech','Eisenwaren','Pelze']
sha=lambda b:hashlib.sha256(b).hexdigest();mean=lambda a:statistics.mean(a) if a else None;median=lambda a:statistics.median(a) if a else None
stats=lambda a:dict(n=len(a),mean=mean(a),median=median(a),min=min(a) if a else None,max=max(a) if a else None)
summary={'schema':1,'run':out.name,'gameSHA256':manifest['identity']['hashes']['../../Hansefuerst_0_4.html'],'distinctResults':0,'replays':0,'strategies':{},'routes':{},'cities':{},'goods':{},'cases':[]};files=[];archives=[]
for policy in IDS:
 cases=[];routes=collections.defaultdict(lambda:dict(journeys=0,days=0,fees=0,tradeProfit=0,pirateLossCost=0,soldUnits=0,purchasedUnits=0,ladenArrivals=0,pirateEncounters=0,pirateLossJourneys=0,storms=0));cities={c:dict(arrivals=0,casesVisited=0,tradeProfit=0,sales=0,days=0) for c in CITIES};goods={g:dict(bought=0,sold=0,tradeProfit=0,lossUnits=0,lossCost=0,purchaseCost=0,revenue=0) for g in GOODS};market=[[dict(samples=0,priceSum=0,stockSum=0,priceMin=math.inf,priceMax=0,stockMin=math.inf,stockMax=0,atFloor=0,atStockCap=0,atStockFloor=0,endPriceSum=0,endStockSum=0) for _ in GOODS] for _ in CITIES]
 archive=out/(policy+'.tar.gz')
 with tarfile.open(archive,'w:gz',compresslevel=6) as tar:
  for seed in manifest['seeds']:
   name=f'{policy}-{seed}.json.gz';raw=(source/name).read_bytes();record=json.loads(gzip.decompress(raw));row=record['row'];assert record['status']=='ok' and record['replayVerified'] and row['seed']==seed and row['strategy']==policy
   files.append(dict(strategy=policy,seed=seed,file=name,bytes=len(raw),sha256=sha(raw)));tar.add(source/name,arcname=name)
   a=row['raw']['phase05e'];assert a['daysObserved']==row['days'];visited={'Lübeck'};last=None;pending_loss=0;pending_lost_units=0;route_purchases=0
   for e in row['events']:
    kind=e['type']
    if kind=='buy':goods[e['good']]['bought']+=e['quantity'];goods[e['good']]['purchaseCost']+=e['total'];route_purchases+=e['quantity']
    elif kind=='pirate_loss':
     cost=e['quantity']*(e.get('averageCost') or 0);pending_loss+=cost;pending_lost_units+=e['quantity'];goods[e['good']]['lossUnits']+=e['quantity'];goods[e['good']]['lossCost']+=cost
    elif kind=='travel':
     key=e['from']+' → '+e['to'];last=key;r=routes[key];r['journeys']+=1;r['pirateEncounters']+=e['event'] in ['pirates','defended'];r['pirateLossJourneys']+=e['event']=='pirates';r['storms']+=e['event']=='storm';r['days']+=e['days'];r['fees']+=e['fee'];r['pirateLossCost']+=pending_loss;r['purchasedUnits']+=route_purchases;r['ladenArrivals']+=any(any(qty>0 for qty in q['cargo'].values()) for q in e['ships']);pending_loss=0;pending_lost_units=0;route_purchases=0;cities[e['to']]['arrivals']+=1;cities[e['to']]['days']+=e['days'];visited.add(e['to'])
    elif kind=='sell':
     profit=e['profit'];assert profit is not None;goods[e['good']]['sold']+=e['quantity'];goods[e['good']]['tradeProfit']+=profit;goods[e['good']]['revenue']+=e['total'];destination=CITIES[a['finalState']['city']] if last is None else last.split(' → ')[1];cities[destination]['tradeProfit']+=profit;cities[destination]['sales']+=1
     if last is not None:routes[last]['tradeProfit']+=profit;routes[last]['soldUnits']+=e['quantity']
   assert not pending_loss
   for c in visited:cities[c]['casesVisited']+=1
   for ci,cellrow in enumerate(a['marketCells']):
    for j,c in enumerate(cellrow):
     dest=market[ci][j]
     for key in ['samples','priceSum','stockSum','atFloor','atStockCap','atStockFloor']:dest[key]+=c[key]
     for key in ['priceMin','stockMin']:dest[key]=min(dest[key],c[key])
     for key in ['priceMax','stockMax']:dest[key]=max(dest[key],c[key])
     dest['endPriceSum']+=a['finalState']['markets'][ci][j]['price'];dest['endStockSum']+=a['finalState']['markets'][ci][j]['stock']
   raw_result=row['raw'];career=row['career'];promotions=a['rankTransitions'];eld=next((p for p in promotions if p['rank']==4),None)
   case={k:row[k] for k in ['strategy','seed','initial','final','days','trading','deliveries','costs','finance','career','stopping','warnings','audit']};case.update(replayVerified=True,wallMs=record['wallMs'],maxRSSKiB=record['resources']['maxRSS'],visited=sorted(visited),actions=a['actions'],daysToEldermann=eld['day']-row['initial']['day'] if eld else None,actionsToEldermann=eld['actions'] if eld else None,minCash=a['minCash'],questAudits=len(a['questChecks']),dailyObservations=a['observations'],priceMax=max(c['priceMax'] for rr in a['marketCells'] for c in rr),priceMin=min(c['priceMin'] for rr in a['marketCells'] for c in rr),finalRank=row['final']['rank'])
   if policy=='recovery20':case['recovery']={k:raw_result.get(k) for k in ['targetLosses','lossCount','lossStatus','recovered','recoveryAt','stopReason','shipStranded','lossEnd']};case['recovery'].update(lossAttempts=len(raw_result['lossTrades']),recoveryDecisions=len(raw_result['recoveryTrades']),countedNegativeTradeEvents=sum(t['counted'] for t in raw_result['lossTrades']))
   else:case['decisionCount']=raw_result['metrics']['decisions']
   cases.append(case)
 for r in routes.values():r.update(netTradeAfterFeesAndPiracy=r['tradeProfit']-r['fees']-r['pirateLossCost'],tradeProfitPerTrip=r['tradeProfit']/r['journeys'],netPerTrip=(r['tradeProfit']-r['fees']-r['pirateLossCost'])/r['journeys'],netPerTravelDay=(r['tradeProfit']-r['fees']-r['pirateLossCost'])/r['days'])
 for rr in market:
  for c in rr:c.update(meanPrice=c['priceSum']/c['samples'],meanStock=c['stockSum']/c['samples'],fractionPriceFloor=c['atFloor']/c['samples'],fractionStockCap=c['atStockCap']/c['samples'],fractionStockFloor=c['atStockFloor']/c['samples'],meanEndPrice=c['endPriceSum']/250,meanEndStock=c['endStockSum']/250)
 s=dict(results=len(cases),identicalReplays=sum(c['replayVerified'] for c in cases),days=stats([c['days'] for c in cases]),wealth=stats([c['final']['wealth'] for c in cases]),cash=stats([c['final']['gold'] for c in cases]),debt=stats([c['final']['debt'] for c in cases]),tradeProfit=stats([c['trading']['realisedTradeProfit'] for c in cases]),wealthGainPerDay=stats([(c['final']['wealth']-c['initial']['wealth'])/c['days'] for c in cases if c['days']>0]),tradeProfitPerDay=stats([c['trading']['realisedTradeProfit']/c['days'] for c in cases if c['days']>0]),journeys=sum(c['trading']['journeys'] for c in cases),journeysPerCase=stats([c['trading']['journeys'] for c in cases]),eld=sum(c['career']['reachedEldermann'] for c in cases),eldDays=stats([c['daysToEldermann'] for c in cases if c['daysToEldermann'] is not None]),eldActions=stats([c['actionsToEldermann'] for c in cases if c['actionsToEldermann'] is not None]),rankCounts=dict(collections.Counter(c['finalRank'] for c in cases)),economicTravelBlocked=sum(c['stopping']['economicTravelBlocked'] for c in cases),driverReportedBlock=sum(c['stopping']['driverReportedBlock'] for c in cases),negativeWealth=sum(c['final']['wealth']<=0 for c in cases),deliveries=sum(c['deliveries']['completed'] for c in cases),premiums=sum(c['deliveries']['premiums'] for c in cases),pirateLossEvents=sum(c['trading']['boughtUnits']-c['trading']['soldUnits'] for c in cases),allCityCases=sum(len(c['visited'])==11 for c in cases),priceRange=[min(c['priceMin'] for c in cases),max(c['priceMax'] for c in cases)],wallMs=sum(c['wallMs'] for c in cases),maxRSSKiB=max(c['maxRSSKiB'] for c in cases),marketCells=market)
 for field in ['costs','finance']:s[field]={k:sum(c[field][k] for c in cases) for k in cases[0][field]}
 if policy=='recovery20':s['recovery']={key:sum(bool(c['recovery'][key]) for c in cases) for key in ['recovered','shipStranded']};s['recovery'].update(targetReached=sum(c['recovery']['lossCount']==20 for c in cases),countedLosses=stats([c['recovery']['lossCount'] for c in cases]),recoveredAmongFull20=sum(c['recovery']['lossCount']==20 and c['recovery']['recovered'] for c in cases),stopReasons=dict(collections.Counter(c['recovery']['stopReason'] for c in cases)),lossStatuses=dict(collections.Counter(c['recovery']['lossStatus'] for c in cases)),recoveryDaysSuccessful=stats([c['recovery']['recoveryAt']['days'] for c in cases if c['recovery']['recovered']]))
 s['rankReached']={str(rank):sum(c['finalRank']>=rank for c in cases) for rank in range(1,5)}
 s['pirateAttacks']=0;s['pirateLossIncidents']=0;s['storms']=0;s['lostUnits']=0
 # Re-read only event types for event incidence; keep aggregate labels distinct from lost units.
 for seed in manifest['seeds']:
  ev=json.loads(gzip.decompress((source/f'{policy}-{seed}.json.gz').read_bytes()))['row']['events'];s['pirateAttacks']+=sum(e['type']=='pirates' for e in ev);s['pirateLossIncidents']+=sum(e['type']=='pirate_loss' for e in ev);s['storms']+=sum(e['type']=='travel' and e['event']=='storm' for e in ev);s['lostUnits']+=sum(e['quantity'] for e in ev if e['type']=='pirate_loss')
 s.pop('pirateLossEvents')
 summary['strategies'][policy]=s;summary['routes'][policy]=dict(routes);summary['cities'][policy]=cities;summary['goods'][policy]=goods;summary['cases']+=cases;summary['distinctResults']+=len(cases);summary['replays']+=s['identicalReplays'];archives.append(dict(file=archive.name,bytes=archive.stat().st_size,sha256=sha(archive.read_bytes()),results=len(cases)));print('ARCHIVED',policy,len(cases),archive.stat().st_size,flush=True)
assert summary['distinctResults']==1500 and summary['replays']==1500
summary['sessions']=[json.loads(line) for line in (source/'attempts.jsonl').read_text().splitlines() if json.loads(line)['event'] in ['session_start','session_end']]
summary['executionCounts']={'distinctCases':1500,'replays':1500,'unobservedPilotParityExecutions':6,'successfulPublishedCaseExecutions':3000,'unobservedParityExecutions':7,'failedWorkerAttempts':1,'failedWorkerPartialExecutions':'not distinguishable whether initial pass or replay failed; 1..2 additional engine invocations','controlledRegressionFixturesExcluded':True}
for name in ['manifest.json','pilot-complete.json','execution-complete.json','observer-parity.json','attempts.jsonl','reconciled-complete.json','retry-validation.json']:(out/name).write_bytes((source/name).read_bytes())
(out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');(out/'results-manifest.json').write_text(json.dumps(dict(archives=archives,records=files),ensure_ascii=False,indent=2)+'\n')
(out/'SHA256SUMS').write_text(''.join(sha(p.read_bytes())+'  '+p.name+'\n' for p in sorted(out.iterdir()) if p.name!='SHA256SUMS'))
print('Complete',summary['distinctResults'],'cases; archives and derived summary saved',flush=True)
