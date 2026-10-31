"""Read-only reconciliation and outcome evidence for the activated game."""
from pathlib import Path
import sys,json,gzip,statistics,collections
src=Path(sys.argv[1]);summary=json.loads(Path(sys.argv[2]).read_text());out=Path(sys.argv[3]);assert not out.exists();base=[16,25,19,31,22,56,84,32,28,72,110];cities=summary['cities'];roles=summary['profiles'];active=json.loads(json.dumps(roles));active[0][4]=-1
result=dict(legacyExact=0,historicalFInfoExact=0,information={},routes={},markets={})
for model in summary['manifest']['models']:
 for policy in summary['manifest']['strategies']:
  years=[dict(journeys=0,newArrivals=0,bergen=0) for _ in range(5)];infoTrips=[];sourceReturns=[];basis=collections.Counter()
  for seed in range(10001,10013):
   r=json.loads(gzip.decompress((src/f'{model}-{policy}-{seed}.json.gz').read_bytes()))['row']
   if model=='legacy':
    previous=json.loads(gzip.decompress((src.parent/'phase05h-20261025-02'/f'control-{policy}-{seed}.json.gz').read_bytes()))['row'];assert r==previous;result['legacyExact']+=1
   if model=='F_info':
    previous=json.loads(gzip.decompress((src.parent/'phase05h2-20261025-01'/f'F_info-{policy}-{seed}.json.gz').read_bytes()))['row'];assert r==previous;result['historicalFInfoExact']+=1
   trace=r['raw'].get('phase05h3Information',r['raw'].get('phase05h2Information',{'decisions':[]}));trips=[];incoming=None;loss=0
   for e in r['events']:
    if e['type']=='pirate_loss':loss+=e['quantity']*(e.get('averageCost') or 0)
    elif e['type']=='travel':
     incoming=dict(fromCity=e['from'],toCity=e['to'],depart=e['simDay']-e['days'],days=e['days'],net=-e['fee']-loss);loss=0;trips.append(incoming);y=min(4,max(0,(e['simDay']-r['initial']['day']-1)//360));years[y]['journeys']+=1;years[y]['newArrivals']+=e['to'] in cities[5:];years[y]['bergen']+=e['to']=='Bergen'
    elif e['type']=='sell':incoming['net']+=e['profit']
   for choice in trace['decisions']:
    matches=[(i,t) for i,t in enumerate(trips) if t['depart']==choice['day'] and t['fromCity']==cities[choice['from']] and t['toCity']==cities[choice['to']]];assert len(matches)==1;i,t=matches[0];infoTrips.append(dict(seed=seed,basis=choice['basis'],**t));basis[choice['basis']]+=1
    if choice['basis']=='source_excursion':
     back=trips[i+1] if i+1<len(trips) else None;returned=bool(back and back['fromCity']==t['toCity'] and back['toCity']==t['fromCity']);sourceReturns.append(dict(seed=seed,returnedImmediately=returned,net=t['net']+back['net'] if returned else None))
  trade=[t for t in infoTrips if t['basis']!='source_excursion'];days=sum(t['days'] for t in trade)
  result['information'][model+'/'+policy]=dict(years=years,decisions=len(infoTrips),basis=dict(basis),directTrips=len(trade),negativeDirect=sum(t['net']<0 for t in trade),directNetPerDay=sum(t['net'] for t in trade)/days if days else None,sourceExcursions=len(sourceReturns),immediateReturns=sum(t['returnedImmediately'] for t in sourceReturns),negativeImmediateReturnPairs=sum(t['net']<0 for t in sourceReturns if t['net'] is not None),trips=infoTrips,sourceReturns=sourceReturns)
choice=json.loads(gzip.decompress((src/'choice-probes.json.gz').read_bytes()))
for model in ['F','R1','R2']:
 for route in ['Nowgorod–Brügge','Bergen–Lübeck','Lübeck–Hamburg']:
  for qty in [22,90]:
   cases=[r for r in choice['rows'] if r['model']==model and r['route']==route and r['requested']==qty];trips=[t for r in cases for t in r['trips']]
   result['routes'][model+'/'+route+'/'+str(qty)]=dict(cases=len(cases),journeys=len(trips),negative=sum(t['net']<0 for t in trips),meanNet=statistics.mean(t['net'] for t in trips),netPerDay=sum(t['net'] for t in trips)/sum(t['days'] for t in trips),meanBought=statistics.mean(t['n'] for t in trips),firstMean=statistics.mean(t['net'] for t in trips if t['leg']<4),lastMean=statistics.mean(t['net'] for t in trips if t['leg']>=12),minimum=min(t['net'] for t in trips),maximum=max(t['net'] for t in trips))
markets=json.loads(gzip.decompress((src/'market-probes.json.gz').read_bytes()))
for model in ['legacy','F','regional']:
 rows=[r for r in markets['rows'] if r['model']==model];profiles=active if model=='regional' else roles;years=[]
 for year in range(6):
  cells=[[dict(price=statistics.mean(r['annual'][year][c][j]['price']/360 for r in rows),stock=statistics.mean(r['annual'][year][c][j]['stock']/360 for r in rows)) for j in range(11)] for c in range(11)];direction=[]
  for c in range(11):
   for j in range(11):
    if profiles[c][j]:direction.append((cells[c][j]['price']-statistics.mean(cells[ci][j]['price'] for ci in range(11) if profiles[ci][j]==0))*profiles[c][j]<0)
  years.append(dict(cells=cells,normalizedPrice=statistics.mean(cells[c][j]['price']/base[j] for c in range(11) for j in range(11)),meanStock=statistics.mean(x['stock'] for row in cells for x in row),priceMin=min(a['lowPrice'] for r in rows for row in r['annual'][year] for a in row),priceMax=max(a['highPrice'] for r in rows for row in r['annual'][year] for a in row),profileCorrect=sum(direction),profileTotal=len(direction),roles={str(role):dict(priceIndex=statistics.mean(cells[c][j]['price']/base[j] for c in range(11) for j in range(11) if profiles[c][j]==role),stock=statistics.mean(cells[c][j]['stock'] for c in range(11) for j in range(11) if profiles[c][j]==role)) for role in [-1,0,1]}))
 result['markets'][model]=years
assert result['legacyExact']==72 and result['historicalFInfoExact']==72
result['integratedR1Replays']=markets['replays'];out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('PASS 72 exact legacy and 72 exact F_info historical comparisons;',out)
