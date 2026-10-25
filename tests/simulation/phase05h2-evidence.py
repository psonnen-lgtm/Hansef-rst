"""Read-only information, ablation, route and historical-parity evidence."""
from pathlib import Path
import sys,json,gzip,statistics,collections
src=Path(sys.argv[1]);out=Path(sys.argv[2]);assert not out.exists();old=src.parent/'phase05h-20261025-02'
summary=json.loads(Path(sys.argv[3]).read_text());CITIES=summary['cities'];BASE=[16,25,19,31,22,56,84,32,28,72,110];profiles=summary['profiles'];result=dict(historicalBExact=0,unchangedInformationControls=0,information={},markets={},routes={})
for m in summary['manifest']['models']:
 for policy in summary['manifest']['strategies']:
  years=[dict(journeys=0,newArrivals=0) for _ in range(5)];infoTrips=[];reports=0;expected=[];categories=collections.Counter();returns=[]
  for seed in range(10001,10013):
   row=json.loads(gzip.decompress((src/f'{m}-{policy}-{seed}.json.gz').read_bytes()))['row'];trace=row['raw']['phase05h2Information'];reports+=len(trace['reports'])
   if m=='B':
    before=json.loads(gzip.decompress((old/f'B-{policy}-{seed}.json.gz').read_bytes()))['row'];copy=json.loads(json.dumps(row));copy['raw'].pop('phase05h2Information');assert copy==before;result['historicalBExact']+=1
   if m.endswith('_info') and policy in ['optimized','remote']:
    before=json.loads(gzip.decompress((src/f'{m.split("_")[0]}-{policy}-{seed}.json.gz').read_bytes()))['row'];assert row==before;result['unchangedInformationControls']+=1
   trips=[];incoming=None;loss=0
   for event in row['events']:
    if event['type']=='pirate_loss':loss+=event['quantity']*(event.get('averageCost') or 0)
    elif event['type']=='travel':
     incoming=dict(fromCity=event['from'],toCity=event['to'],departure=event['simDay']-event['days'],days=event['days'],net=-event['fee']-loss);loss=0;trips.append(incoming);y=min(4,max(0,(event['simDay']-row['initial']['day']-1)//360));years[y]['journeys']+=1;years[y]['newArrivals']+=event['to'] in CITIES[5:]
    elif event['type']=='sell':incoming['net']+=event['profit']
   for decision in trace['decisions']:
    matches=[(i,t) for i,t in enumerate(trips) if t['departure']==decision['day'] and t['fromCity']==CITIES[decision['from']] and t['toCity']==CITIES[decision['to']]];assert len(matches)==1
    i,t=matches[0];infoTrips.append(dict(seed=seed,basis=decision['basis'],good=decision['good'],quantity=decision['quantity'],expected=decision['expectedGain'],**t));categories[decision['basis']]+=1
    if decision['basis']=='source_excursion':
     back=trips[i+1] if i+1<len(trips) else None;same=bool(back and back['fromCity']==t['toCity'] and back['toCity']==t['fromCity']);returns.append(dict(seed=seed,returnedImmediately=same,net=t['net']+back['net'] if same else None))
   assert all(set(report)=={'city','j','day','band','publishedAt'} for report in trace['reports'])
  trade=[t for t in infoTrips if t['basis']!='source_excursion'];days=sum(t['days'] for t in trade)
  result['information'][m+'/'+policy]=dict(publicReports=reports,decisions=len(infoTrips),basis=dict(categories),years=years,tradeTrips=len(trade),tradeNet=sum(t['net'] for t in trade),tradeNetPerDay=sum(t['net'] for t in trade)/days if days else None,negativeTradeTrips=sum(t['net']<0 for t in trade),sourceExcursions=len(returns),immediateReturns=sum(t['returnedImmediately'] for t in returns),negativeImmediateReturnPairs=sum(t['net']<0 for t in returns if t['net'] is not None),sourceRoundTripNet=sum(t['net'] for t in returns if t['net'] is not None),trips=infoTrips,sourceReturns=returns)
market=json.loads(gzip.decompress((src/'market-probes.json.gz').read_bytes()))
for variant in sorted({r['variant'] for r in market['rows']}):
 rows=[r for r in market['rows'] if r['variant']==variant];years=[]
 for y in range(6):
  cells=[[dict(price=statistics.mean(r['annual'][y][c][j]['price']/360 for r in rows),stock=statistics.mean(r['annual'][y][c][j]['stock']/360 for r in rows)) for j in range(11)] for c in range(11)]
  correct=[]
  for c in range(11):
   for j in range(11):
    role=profiles[c][j]
    if role:correct.append((cells[c][j]['price']-statistics.mean(cells[ci][j]['price'] for ci in range(11) if profiles[ci][j]==0))*role<0)
  roles={str(role):dict(normalizedPrice=statistics.mean(cells[c][j]['price']/BASE[j] for c in range(11) for j in range(11) if profiles[c][j]==role),stock=statistics.mean(cells[c][j]['stock'] for c in range(11) for j in range(11) if profiles[c][j]==role)) for role in [-1,0,1]}
  total=2*121*360;years.append(dict(cells=cells,normalizedPrice=statistics.mean(cells[c][j]['price']/BASE[j] for c in range(11) for j in range(11)),stock=statistics.mean(x['stock'] for row in cells for x in row),roles=roles,profileCorrect=sum(correct),profileTotal=len(correct),capFraction=sum(a['cap'] for r in rows for row in r['annual'][y] for a in row)/total,floorFraction=sum(a['floor'] for r in rows for row in r['annual'][y] for a in row)/total,priceMin=min(a['minPrice'] for r in rows for row in r['annual'][y] for a in row),priceMax=max(a['maxPrice'] for r in rows for row in r['annual'][y] for a in row)))
 result['markets'][variant]=dict(years=years,contributions={k:sum(r['contributions'][k] for r in rows) for k in rows[0]['contributions']})
result['impulses']=market['impulses'];routes=json.loads((src/'route-probes.json').read_text())
for model in ['B','F']:
 for route in [r['name'] for r in routes['routes']]:
  for quantity in [22,90]:
   rows=[r for r in routes['rows'] if r['model']==model and r['route']==route and r['requested']==quantity];trips=[t for r in rows for t in r['trips']]
   first=[t for t in trips if t['leg']<4];last=[t for t in trips if t['leg']>=12]
   result['routes'][model+'/'+route+'/'+str(quantity)]=dict(fixtures=len(rows),journeys=len(trips),negative=sum(t['cashNet']<0 for t in trips),meanNet=statistics.mean(t['cashNet'] for t in trips),netPerDay=sum(t['cashNet'] for t in trips)/sum(t['days'] for t in trips),meanBought=statistics.mean(t['n'] for t in trips),meanGap=statistics.mean(t['salePrice']-t['buyPrice'] for t in trips),firstMeanNet=statistics.mean(t['cashNet'] for t in first),lastMeanNet=statistics.mean(t['cashNet'] for t in last),stopped=sum(r['stopped'] for r in rows),minNet=min(t['cashNet'] for t in trips),maxNet=max(t['cashNet'] for t in trips))
assert result['historicalBExact']==72 and result['unchangedInformationControls']==48
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('PASS 72 exact historical B cases and 48 unchanged info controls;',out)
