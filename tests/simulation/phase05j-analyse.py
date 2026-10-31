"""Only read saved shipbuilding cases; never launch a strategy or game."""
import pathlib,gzip,json,statistics,collections,csv,subprocess,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[2];OUT=ROOT/'tests/simulation/phase05j-20261025-01'
rows=[json.loads(gzip.decompress(p.read_bytes()))['row'] for p in sorted((OUT/'main').glob('*.json.gz'))];assert len(rows)==240
groups=[];individual=[];costs=[]
for r in rows:
    starts=[e for e in r['events'] if e['type']=='shipbuilding_started'];built=[e for e in r['events'] if e['type']=='shipbuilding_completed']
    for o in starts:
        assert all(m['knownCost'] is not None for m in o['materials'])
        actual=sum(m['n']*m['knownCost'] for m in o['materials']);assert abs(actual-o['materialsBook'])<1e-6
        costs.append(dict(seed=r['task']['seed'],yard=r['yard'],type=r['type'],job=o['id'],materialCost=actual,wage=o['wage'],effectiveCost=actual+o['wage']))
    ids=[e['shipId'] for e in built];r['builtCount']=len(ids)
    r['builtCargoUsed']=sum(any(e['type']=='buy' and e['shipId']==sid for e in r['events']) for sid in ids)
    r['builtSailed']=sum(any(e['type']=='travel' and any(q['id']==sid for q in e['ships']) for e in r['events']) for sid in ids)
    r['timeouts']=sum(e['event']=='procurement_timeout' for e in r['trace'])
    collectDays={e['day'] for e in r['trace'] if e['event']=='trip' and e['collecting']}
    r['procurementLossCost']=sum(e['quantity']*(e['averageCost'] or 0) for e in r['events'] if e['type']=='pirate_loss' and e['simDay'] in collectDays)
    r['allInBuildCostPerShip']=(sum(o['wage']+o['materialsBook'] for o in starts)+r['procurementFees']+r['procurementLossCost'])/len(built) if built else None
    r['cities']=len({r['final']['city']}|{e['to'] for e in r['events'] if e['type']=='travel'})
    individual.append({k:r[k] for k in ['task','started','builtCount','builtCargoUsed','builtSailed','timeouts','days','blocked','gold','wealth','eld','procurementTrips','procurementFees','cities','procurementLossCost','allInBuildCostPerShip']})
def med(a):return statistics.median(a)
for model in ['control','material']:
 for t,yard in [(-1,0)]+[(t,y) for t in range(3) for y in [0,4,6]]:
    a=[r for r in rows if r['model']==model and r['type']==t and r['yard']==yard];assert len(a)==12
    cc=[c['effectiveCost'] for c in costs if c['type']==t and c['yard']==yard] if model=='material' else []
    groups.append(dict(model=model,type=t,yard=yard,runs=len(a),starts=sum(r['started'] for r in a),completed=sum(r['builtCount'] for r in a),builtCargoUsed=sum(r['builtCargoUsed'] for r in a),builtSailed=sum(r['builtSailed'] for r in a),costMedian=med(cc) if cc else None,costMin=min(cc) if cc else None,costMax=max(cc) if cc else None,allInCostMedian=med([r['allInBuildCostPerShip'] for r in a if r['allInBuildCostPerShip'] is not None]) if cc else None,procurementLossCost=sum(r['procurementLossCost'] for r in a),procurementTripsMedian=med([r['procurementTrips'] for r in a]),procurementFeesMedian=med([r['procurementFees'] for r in a]),timeouts=sum(r['timeouts'] for r in a),wealthMedian=med([r['wealth'] for r in a]),cashMedian=med([r['gold'] for r in a]),gainPerDayMedian=med([(r['wealth']-9960)/r['days'] for r in a]),profitMedian=med([r['summary']['tradeProfit'] for r in a]),eld=sum(r['final']['rank']==4 for r in a),eldDaysMedian=med([r['eld'] for r in a if r['eld'] is not None]) if any(r['eld'] is not None for r in a) else None,blocked=sum(r['blocked'] for r in a),arrears=sum(r['summary']['arrears'] for r in a),rent=sum(r['summary']['rent'] for r in a),daysMin=min(r['days'] for r in a),daysMax=max(r['days'] for r in a)))
index={(r['model'],r['type'],r['yard'],r['task']['seed']):r for r in rows};paired=[]
for t,yard in [(-1,0)]+[(t,y) for t in range(3) for y in [0,4,6]]:
    diffs=[index['material',t,yard,seed]['wealth']-index['control',t,yard,seed]['wealth'] for seed in range(82001,82013)]
    paired.append(dict(type=t,yard=yard,wealthDeltaMedian=med(diffs),better=sum(d>1e-6 for d in diffs),worse=sum(d< -1e-6 for d in diffs)))
for seed in range(82001,82013):
    a=index['material',-1,0,seed];b=index['control',-1,0,seed];state=json.loads(json.dumps(a['final']));state.pop('shipyard');state['v']=9
    assert state==b['final'] and a['events']==b['events'] and a['nextRandom']==b['nextRandom']
tree=subprocess.check_output(['git','ls-tree','-r','e382c0f','tests/simulation'],cwd=ROOT,text=True);old=[]
for line in tree.splitlines():
    meta,name=line.split('\t')
    if name.endswith(('.json','.json.gz','.tar.gz','.jsonl','.csv','.log')):old.append((name,meta.split()[2]))
actual=subprocess.check_output(['git','hash-object','--stdin-paths'],cwd=ROOT,input=''.join(n+'\n' for n,_ in old),text=True).splitlines();assert actual==[h for _,h in old]
summary={'groups':groups,'paired':paired,'effectiveBuildCosts':costs,'individual':individual,'fullCases':240,'exactReplays':20,'fullExecutions':260,'daysMin':min(r['days'] for r in rows),'daysMax':max(r['days'] for r in rows),'allCashLedgersPassed':True,'noBuildExactControls':12,'historicalFilesUnchanged':len(old),'limitations':['artificial policies, not optimal or human play','procurement fees count only explicitly collecting trips, not all yard approach/pickup costs','recipe expense is actual weighted consumed acquisition cost plus wages; all-in adds explicitly collecting voyage fees and pirate losses, excludes generic yard approach/pickup opportunity cost','book wealth includes nominal finished ship values, not resale cash','some new vessels may sail without individually loaded cargo']}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
with (OUT/'groups.csv').open('w') as f:w=csv.DictWriter(f,fieldnames=list(groups[0]));w.writeheader();w.writerows(groups)
(OUT/'historical-files.json').write_text(json.dumps({'base':'e382c0f8653eabcfa8d37986e251bd2748ed4b46','files':[dict(path=n,blob=h) for n,h in old]},indent=2)+'\n')
for g in groups:print(g['model'],g['type'],g['yard'],'cost',g['costMedian'],'wealth',round(g['wealthMedian']),'eld',g['eld'],'blocked',g['blocked'],'built/cargo/sail',g['completed'],g['builtCargoUsed'],g['builtSailed'],'procure',g['procurementTripsMedian'])
print('History files unchanged',len(old));print('Paired:',paired)
