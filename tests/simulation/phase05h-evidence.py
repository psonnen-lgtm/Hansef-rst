"""Additional read-only evidence, including exact historical control parity."""
from pathlib import Path
import sys,json,gzip,tarfile,statistics,collections
src=Path(sys.argv[1]);out=Path(sys.argv[2]);assert not out.exists();root=src.parent
BASE=[16,25,19,31,22,56,84,32,28,72,110];summary=json.loads(gzip.decompress((src/'summary.json.gz').read_bytes()));models=summary['manifest']['models'];ids=summary['manifest']['strategies'];profiles=summary['profiles']
result=dict(historicalControlParity=[],yearlyVisits={},trajectories={},repeatedRoutes={})
for strategy in ['cautious','normal','aggressive','optimized','remote']:
 with tarfile.open(root/'phase05e-20261024-01'/f'{strategy}.tar.gz') as archive:
  for seed in range(10001,10013):
   name=f'{strategy}-{seed}.json.gz';old=json.loads(gzip.decompress(archive.extractfile(name).read()))['row'];now=json.loads(gzip.decompress((src/f'control-{name}').read_bytes()))['row']
   fields=['initial','final','days','trading','deliveries','costs','finance','career','stopping','events']
   for field in fields:assert old[field]==now[field],(strategy,seed,field)
   result['historicalControlParity'].append(dict(strategy=strategy,seed=seed,fields=fields,exact=True))
for model in models:
 for strategy in ids:
  years=[dict(journeys=0,newArrivals=0,lh=0) for y in range(5)]
  for seed in range(10001,10013):
   r=json.loads(gzip.decompress((src/f'{model}-{strategy}-{seed}.json.gz').read_bytes()))['row']
   for e in r['events']:
    if e['type']=='travel':
     y=min(4,max(0,(e['simDay']-r['initial']['day']-1)//360));a=years[y];a['journeys']+=1;a['newArrivals']+=e['to'] in summary['cities'][5:];a['lh']+={e['to'],e['from']}=={'Lübeck','Hamburg'}
  result['yearlyVisits'][model+'/'+strategy]=years
data=json.loads(gzip.decompress((src/'market-trajectories.json.gz').read_bytes()))
for model in models:
 rows=[r for r in data['rows'] if r['model']==model and r['scenario']=='idle'];years=[]
 for y in range(6):
  cells=[a for r in rows for row in r['annual'][y] for a in row];n=sum(a['n'] for a in cells)
  roles={str(role):dict(normalizedPrice=statistics.mean(r['annual'][y][c][j]['price']/r['annual'][y][c][j]['n']/BASE[j] for r in rows for c in range(11) for j in range(11) if profiles[c][j]==role),meanStock=statistics.mean(r['annual'][y][c][j]['stock']/r['annual'][y][c][j]['n'] for r in rows for c in range(11) for j in range(11) if profiles[c][j]==role)) for role in [-1,0,1]}
  years.append(dict(normalizedPrice=statistics.mean(a['price']/a['n']/BASE[j] for r in rows for row in r['annual'][y] for j,a in enumerate(row)),meanStock=statistics.mean(a['stock']/a['n'] for a in cells),capFraction=sum(a['cap'] for a in cells)/n,floorFraction=sum(a['floor'] for a in cells)/n,priceMax=max(a['maxPrice'] for a in cells),priceMin=min(a['minPrice'] for a in cells),roles=roles))
 pulses=[]
 for day in [360,390,450,720,750,840]:
  dp=[];ds=[]
  for seed in [60001,60002]:
   a=next(r for r in data['rows'] if r['model']==model and r['seed']==seed and r['scenario']=='idle');b=next(r for r in data['rows'] if r['model']==model and r['seed']==seed and r['scenario']=='pulse');a=next(m for m in a['monthly'] if m['day']==day)['markets'];b=next(m for m in b['monthly'] if m['day']==day)['markets']
   dp += [b[c][j]['price']-a[c][j]['price'] for c in range(11) for j in range(11)];ds += [b[c][j]['stock']-a[c][j]['stock'] for c in range(11) for j in range(11)]
  pulses.append(dict(day=day,meanPriceDifference=statistics.mean(dp),meanStockDifference=statistics.mean(ds),priceIncreases=sum(x>0 for x in dp),priceDecreases=sum(x<0 for x in dp),cells=len(dp)))
 result['trajectories'][model]=dict(years=years,pulses=pulses)
routes=json.loads((src/'route-probes.json').read_text())
for model in models:
 for route in [r['name'] for r in routes['routes']]:
  rows=[r for r in routes['rows'] if r['model']==model and r['route']==route];trips=[t for r in rows for t in r['trips']]
  result['repeatedRoutes'][model+'/'+route]=dict(cases=len(rows),journeys=len(trips),negative=sum(t['cashNet']<0 for t in trips),nonnegative=sum(t['cashNet']>=0 for t in trips),min=min(t['cashNet'] for t in trips),max=max(t['cashNet'] for t in trips),mean=statistics.mean(t['cashNet'] for t in trips),netPerDay=sum(t['cashNet'] for t in trips)/sum(t['days'] for t in trips))
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('PASS 60 historical exact control comparisons; all derived evidence written',out)
