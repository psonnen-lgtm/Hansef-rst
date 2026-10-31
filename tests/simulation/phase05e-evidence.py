"""Additional journey-level evidence derived solely from the six secured archives."""
from pathlib import Path
import json,tarfile,gzip,statistics,collections,sys
root=Path(sys.argv[1]);out=Path(sys.argv[2]);assert not out.exists();s=json.loads((root/'summary.json').read_text());cities=list(s['cities']['normal']);goods=list(s['goods']['normal']);result={'source':'secured phase05e archives only; no engine execution','journeyEvidence':{},'peakPrices':{},'normalCityMarkets':{},'pairedOutcomes':{}}
for policy in s['strategies']:
 routes=collections.defaultdict(list);peak=None;ended=[]
 with tarfile.open(root/(policy+'.tar.gz'),'r:gz') as archive:
  for member in archive:
   row=json.loads(gzip.decompress(archive.extractfile(member).read()))['row'];trip=None;pendingLoss=0
   def flush():
    if trip is not None:routes[trip['route']].append(trip)
   for e in row['events']:
    if e['type']=='pirate_loss':pendingLoss+=e['quantity']*(e.get('averageCost') or 0)
    elif e['type']=='travel':
     flush();trip={'route':e['from']+' → '+e['to'],'days':e['days'],'gross':0,'loss':pendingLoss,'fees':e['fee'],'premium':0,'sales':0};pendingLoss=0
    elif e['type']=='sell' and trip is not None:trip['gross']+=e['profit'];trip['sales']+=1
    elif e['type']=='quest_reward' and trip is not None:trip['premium']+=e['reward']
   flush()
   for ci,rr in enumerate(row['raw']['phase05e']['marketCells']):
    for j,c in enumerate(rr):
     if peak is None or c['priceMax']>peak['price']:peak={'seed':row['seed'],'city':cities[ci],'good':goods[j],'price':c['priceMax']}
   ended.extend(q['condition'] for q in row['raw']['phase05e']['finalState']['ships'])
 evidence={}
 for route,trips in routes.items():
  values=[t['gross']-t['fees']-t['loss'] for t in trips];evidence[route]={'journeys':len(trips),'negativeNetJourneys':sum(v<0 for v in values),'zeroNetJourneys':sum(v==0 for v in values),'netMin':min(values),'netMedian':statistics.median(values),'netMax':max(values),'meanTravelDays':statistics.mean(t['days'] for t in trips),'salesJourneys':sum(t['sales']>0 for t in trips),'netSum':sum(values),'definition':'realized cargo profit minus fee and lost cargo cost; excludes premiums, interest and hull depreciation'}
  assert abs(evidence[route]['netSum']-s['routes'][policy][route]['netTradeAfterFeesAndPiracy'])<1e-6
 result['journeyEvidence'][policy]=evidence;result['peakPrices'][policy]=peak;result.setdefault('finalHullCondition',{})[policy]={'min':min(ended),'max':max(ended),'at30Percent':sum(v==30 for v in ended),'ships':len(ended)}
 print('EVIDENCE',policy,'routes',len(evidence),'peak',peak,flush=True)
for ci,city in enumerate(cities):
 cells=s['strategies']['normal']['marketCells'][ci];result['normalCityMarkets'][city]={'meanEndStockAcrossGoods':statistics.mean(c['meanEndStock'] for c in cells),'meanStockAcrossDaysAndGoods':sum(c['stockSum'] for c in cells)/sum(c['samples'] for c in cells),'stockCapFraction':sum(c['atStockCap'] for c in cells)/sum(c['samples'] for c in cells),'priceFloorFraction':sum(c['atFloor'] for c in cells)/sum(c['samples'] for c in cells)}
for better,worse in [('normal','cautious'),('aggressive','normal'),('optimized','aggressive'),('remote','normal')]:
 a={c['seed']:c for c in s['cases'] if c['strategy']==better};b={c['seed']:c for c in s['cases'] if c['strategy']==worse};result['pairedOutcomes'][better+'_above_'+worse]=sum(a[k]['final']['wealth']>b[k]['final']['wealth'] for k in a)
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
