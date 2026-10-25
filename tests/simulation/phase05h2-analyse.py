"""Read-only analysis of the frozen 0.5h records; never launches an engine."""
from pathlib import Path
import sys,json,gzip,hashlib,statistics,collections,math
src=Path(sys.argv[1]);target=Path(sys.argv[2]);assert not target.exists()
manifest=json.loads((src/'manifest.json').read_text());execution=json.loads((src/'execution-complete.json').read_text());assert execution['failed']==0 and execution['completed']+execution['skipped']==288
CITIES=['Lübeck','Hamburg','Rostock','Stralsund','Stettin','Danzig','Bergen','Visby','Brügge','Nowgorod','Venlo'];GOODS=['Getreide','Bier','Holz','Salz','Fisch','Tuch','Hansegras','Hanf','Pech','Eisenwaren','Pelze'];BASE=[16,25,19,31,22,56,84,32,28,72,110]
profiles=json.loads((src.parent/'phase05h-20261025-02/mechanism-checks.json').read_text())['checks'][0]['evidence']['profiles']
def stats(a):return dict(n=len(a),median=statistics.median(a) if a else None,mean=statistics.mean(a) if a else None,min=min(a) if a else None,max=max(a) if a else None)
def blank():return dict(n=0,price=0,stock=0,floor=0,cap=0)
def windows():return [[[blank() for j in GOODS] for c in CITIES] for y in range(4)]
def merge(dest,source):
 for y in range(4):
  for c in range(11):
   for j in range(11):
    for k in dest[y][c][j]:dest[y][c][j][k]+=source[y][c][j][k]
def window_summary(ws):
 output=[]
 for w in ws:
  cells=[[dict(meanPrice=a['price']/a['n'],meanStock=a['stock']/a['n'],floor=a['floor']/a['n'],cap=a['cap']/a['n'],samples=a['n']) for a in row] for row in w]
  roles={str(role):dict(normalizedPrice=statistics.mean(cells[c][j]['meanPrice']/BASE[j] for c in range(11) for j in range(11) if profiles[c][j]==role),meanStock=statistics.mean(cells[c][j]['meanStock'] for c in range(11) for j in range(11) if profiles[c][j]==role)) for role in [-1,0,1]}
  comparisons=[]
  for c in range(11):
   for j in range(11):
    role=profiles[c][j]
    if role:
     neutral=statistics.mean(cells[ci][j]['meanPrice'] for ci in range(11) if profiles[ci][j]==0)
     comparisons.append((cells[c][j]['meanPrice']-neutral)*role<0)
  output.append(dict(cells=cells,roles=roles,normalizedPrice=statistics.mean(cells[c][j]['meanPrice']/BASE[j] for c in range(11) for j in range(11)),meanStock=statistics.mean(a['meanStock'] for row in cells for a in row),capFraction=statistics.mean(a['cap'] for row in cells for a in row),floorFraction=statistics.mean(a['floor'] for row in cells for a in row),profileDirectionCorrect=sum(comparisons),profileDirectionTotal=len(comparisons)))
 return output
summary=dict(schema=1,source=src.name,manifest=manifest,distinctCases=288,fullExecutions=312,mainPilotReplays=24,initialAttemptControlRepeats=0,technicalAborts=0,groups={},models={},cases=[],records=[],cities=CITIES,goods=GOODS,profiles=profiles)
initial_by_seed={};modelwindows={m:windows() for m in manifest['models']}
for model in manifest['models']:
 for policy in manifest['strategies']:
  cases=[];visits={c:dict(arrivals=0,cases=0) for c in CITIES};goods={g:dict(bought=0,sold=0,profit=0,pirateLossCost=0) for g in GOODS};routes=collections.defaultdict(lambda:dict(journeys=0,days=0,profit=0,fees=0,pirateLossCost=0,negativeTrips=0));ws=windows();alltrips=[]
  for seed in manifest['seeds']:
   name=f'{model}-{policy}-{seed}.json.gz';raw=(src/name).read_bytes();record=json.loads(gzip.decompress(raw));assert record['status']=='ok' and record['task']==dict(model=model,strategy=policy,seed=seed)
   summary['records'].append(dict(file=name,bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest()))
   row=record['row'];audit=row['raw']['phase05e'];assert audit['daysObserved']==row['days']
   if seed in initial_by_seed:assert initial_by_seed[seed]==audit['initialState']
   else:initial_by_seed[seed]=audit['initialState']
   visited={'Lübeck'};trips=[];incoming=None;pending_loss=0
   for e in row['events']:
    t=e['type']
    if t=='buy':goods[e['good']]['bought']+=e['quantity']
    elif t=='pirate_loss':
     cost=e['quantity']*(e.get('averageCost') or 0);pending_loss+=cost;goods[e['good']]['pirateLossCost']+=cost
    elif t=='travel':
     incoming=dict(route=e['from']+' → '+e['to'],fromCity=e['from'],toCity=e['to'],days=e['days'],fees=e['fee'],profit=0,pirateLossCost=pending_loss);pending_loss=0;trips.append(incoming);visited.add(e['to']);visits[e['to']]['arrivals']+=1
    elif t=='sell':
     assert e['profit'] is not None;goods[e['good']]['sold']+=e['quantity'];goods[e['good']]['profit']+=e['profit']
     assert incoming is not None;incoming['profit']+=e['profit']
   assert not pending_loss
   assert len(trips)==row['trading']['journeys'];assert sum(t['days'] for t in trips)==row['days'];assert abs(sum(t['profit'] for t in trips)-row['trading']['realisedTradeProfit'])<1e-7
   for t in trips:
    t['net']=t['profit']-t['fees']-t['pirateLossCost'];r=routes[t['route']];r['journeys']+=1;r['days']+=t['days'];r['profit']+=t['profit'];r['fees']+=t['fees'];r['pirateLossCost']+=t['pirateLossCost'];r['negativeTrips']+=t['net']<0
   for c in visited:visits[c]['cases']+=1
   merge(ws,audit['yearWindows']);merge(modelwindows[model],audit['yearWindows'])
   case=dict(model=model,strategy=policy,seed=seed,days=row['days'],final=row['final'],trading=row['trading'],costs=row['costs'],finance=row['finance'],deliveries=row['deliveries'],career=row['career'],stopping=row['stopping'],visited=sorted(visited),cityCount=len(visited),newArrivals=sum(t['toCity'] in CITIES[5:] for t in trips),routeCount=len({t['route'] for t in trips}),lhTrips=sum({t['fromCity'],t['toCity']}=={'Lübeck','Hamburg'} for t in trips),negativeTrips=sum(t['net']<0 for t in trips),netTrade=sum(t['net'] for t in trips),longJourneys=sum(t['days']>=10 for t in trips),longNet=sum(t['net'] for t in trips if t['days']>=10),longDays=sum(t['days'] for t in trips if t['days']>=10),priceMin=min(a['priceMin'] for row_ in audit['marketCells'] for a in row_),priceMax=max(a['priceMax'] for row_ in audit['marketCells'] for a in row_),replayVerified=record['replayVerified'],audit=row['audit'])
   cases.append(case);alltrips.extend(trips)
  for r in routes.values():r['net']=r['profit']-r['fees']-r['pirateLossCost'];r['netPerTrip']=r['net']/r['journeys'];r['netPerDay']=r['net']/r['days']
  journeys=len(alltrips);net=sum(c['netTrade'] for c in cases);long=[t for t in alltrips if t['days']>=10];days=sum(c['days'] for c in cases)
  group=dict(results=len(cases),days=stats([c['days'] for c in cases]),wealth=stats([c['final']['wealth'] for c in cases]),cash=stats([c['final']['gold'] for c in cases]),cityCount=stats([c['cityCount'] for c in cases]),routeCount=stats([c['routeCount'] for c in cases]),allEleven=sum(c['cityCount']==11 for c in cases),journeys=journeys,newArrivals=sum(c['newArrivals'] for c in cases),newShare=sum(c['newArrivals'] for c in cases)/journeys,lhShare=sum(c['lhTrips'] for c in cases)/journeys,uniqueRoutes=len(routes),netTrade=net,netPerTrip=net/journeys,netPerDay=net/days,negativeTripShare=sum(t['net']<0 for t in alltrips)/journeys,longJourneys=len(long),longNetPerTrip=sum(t['net'] for t in long)/len(long) if long else None,longNetPerDay=sum(t['net'] for t in long)/sum(t['days'] for t in long) if long else None,longNegativeShare=sum(t['net']<0 for t in long)/len(long) if long else None,eld=sum(c['career']['reachedEldermann'] for c in cases),eldDays=stats([c['career']['daysToEldermann'] for c in cases if c['career']['daysToEldermann'] is not None]),insolvent=sum(c['final']['wealth']<=0 for c in cases),blocked=sum(c['stopping']['economicTravelBlocked'] for c in cases),plannerStopped=sum(c['stopping']['driverReportedBlock'] for c in cases),priceMin=min(c['priceMin'] for c in cases),priceMax=max(c['priceMax'] for c in cases),deliveries=sum(c['deliveries']['completed'] for c in cases),premiums=sum(c['deliveries']['premiums'] for c in cases),visits=visits,goods=goods,routes=dict(routes),years=window_summary(ws))
  summary['groups'][model+'/'+policy]=group;summary['cases'].extend(cases)
for model in manifest['models']:
 cases=[c for c in summary['cases'] if c['model']==model];standard=[c for c in cases if c['strategy'] in ['cautious','normal','aggressive']]
 paired=[]
 for c in cases:
  control=next(x for x in summary['cases'] if x['model']=='B' and x['strategy']==c['strategy'] and x['seed']==c['seed']);paired.append(dict(strategy=c['strategy'],seed=c['seed'],wealthDelta=c['final']['wealth']-control['final']['wealth'],cityDelta=c['cityCount']-control['cityCount'],netPerDayDelta=c['netTrade']/c['days']-control['netTrade']/control['days']))
 summary['models'][model]=dict(cases=len(cases),standardCityCount=stats([c['cityCount'] for c in standard]),standardLHShare=sum(c['lhTrips'] for c in standard)/sum(c['trading']['journeys'] for c in standard),standardNewArrivals=sum(c['newArrivals'] for c in standard),standardAllEleven=sum(c['cityCount']==11 for c in standard),eld=sum(c['career']['reachedEldermann'] for c in cases),blocked=sum(c['stopping']['economicTravelBlocked'] for c in cases),insolvent=sum(c['final']['wealth']<=0 for c in cases),priceRange=[min(c['priceMin'] for c in cases),max(c['priceMax'] for c in cases)],years=window_summary(modelwindows[model]),paired=paired)
assert len(summary['records'])==288 and sum(c['replayVerified'] for c in summary['cases'])==24
target.write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');print(target)
