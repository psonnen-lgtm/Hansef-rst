"""Read-only analysis of saved full-game events; never starts games."""
import collections, csv, gzip, hashlib, json, pathlib, statistics, subprocess
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'tests/simulation/phase05i-20261025-01'
rows=[json.loads(gzip.decompress(f.read_bytes()))['row'] for f in sorted((OUT/'main').glob('*.json.gz'))]
assert len(rows)==200
tour_rows=[json.loads(gzip.decompress(f.read_bytes()))['row'] for f in sorted((OUT/'tour').glob('*.json.gz'))]
assert len(tour_rows)==60
models=['before','capacity']; ids=['none','occasional','regional','bulk','stress']
def median(a):return statistics.median(a)
def total(events,t,key):return sum(e.get(key,0) or 0 for e in events if e['type']==t)
groups=[]; tour_groups=[]; individual=[]
for r in rows+tour_rows:
    events=r['events'];pending={};sales=[]
    for e in events:
        if e['type']=='warehouse_transfer' and e['direction']=='load':pending[(e['shipId'],e['good'])]=e
        if e['type']=='sell' and (e['shipId'],e['good']) in pending:
            load=pending.pop((e['shipId'],e['good']))
            assert e['quantity']==load['quantity']
            sales.append(dict(day=e['simDay'],city=load['city'],good=e['good'],quantity=e['quantity'],profit=e['profit']))
    r['storageSales']=sales
    r['storageProfit']=sum(s['profit'] for s in sales)
    r['storageNet']=r['storageProfit']-r['summary']['rent']
    r['daysToEldermann']=r['summary']['daysToEldermann']
    r['negativeStorageSales']=sum(s['profit']<0 for s in sales)
    r['arrivalsByCity']=dict(collections.Counter(e['to'] for e in events if e['type']=='travel'))
    r['longTrips']=[e for e in events if e['type']=='travel' and e['days']>=20]
    r['fullTripRents']=sum(e['cost'] for e in events if e['type']=='warehouse_rent')
    individual.append({k:r[k] for k in ['model','id','seed','storageProfit','storageNet','daysToEldermann','negativeStorageSales','arrivalsByCity']})
for cohort_rows,expected,target in [(rows,20,groups),(tour_rows,6,tour_groups)]:
    for model in models:
        for id in ids:
            a=[r for r in cohort_rows if r['model']==model and r['id']==id];assert len(a)==expected
            target.append(dict(model=model,strategy=id,runs=len(a),wealthMedian=median([r['result']['wealth'] for r in a]),cashMedian=median([r['final']['gold'] for r in a]),gainPerDayMedian=median([r['summary']['gainPerDay'] for r in a]),rentMedian=median([r['summary']['rent'] for r in a]),rentSum=sum(r['summary']['rent'] for r in a),rentShareOfRealisedProfit= sum(r['summary']['rent'] for r in a)/sum(r['summary']['realisedProfit'] for r in a) if sum(r['summary']['realisedProfit'] for r in a)>0 else None,storageProfitMedian=median([r['storageProfit'] for r in a]),storageNetMedian=median([r['storageNet'] for r in a]),negativeStorageNetRuns=sum(r['storageNet']<0 for r in a),storageProfitLossSales=sum(r['negativeStorageSales'] for r in a),storageSales=sum(len(r['storageSales']) for r in a),maxStored=max(r['summary']['maxStored'] for r in a),storedBookValueMedian=median([r['summary']['storedBookValue'] for r in a]),storageVisitsMedian=median([r['summary']['visits'] for r in a]),blocked=sum(r['summary']['travelBlocked'] for r in a),eld=sum(r['summary']['reachedEldermann'] for r in a),eldDaysMedian=median([r['daysToEldermann'] for r in a if r['daysToEldermann'] is not None]) if any(r['daysToEldermann'] is not None for r in a) else None,suspensions=sum(r['summary']['eventTypes'].get('warehouse_suspended',0) for r in a),daysMin=min(r['summary']['days'] for r in a),daysMax=max(r['summary']['days'] for r in a),longJourneys=sum(len(r['longTrips']) for r in a),rentMedianOverFees=median([r['summary']['rent']/max(1,r['summary']['harborFees']) for r in a])))
index={(r['model'],r['id'],r['seed']):r for r in rows}
paired=[]
for id in ids:
    d=[index['capacity',id,seed]['result']['wealth']-index['before',id,seed]['result']['wealth'] for seed in range(72001,72021)]
    n=[index['capacity',id,seed]['result']['wealth']-index['capacity','none',seed]['result']['wealth'] for seed in range(72001,72021)]
    paired.append(dict(strategy=id,wealthDeltaVsOldMedian=median(d),betterThanOld=sum(x>1e-6 for x in d),worseThanOld=sum(x< -1e-6 for x in d),wealthDeltaVsNoStorageMedian=median(n),betterThanNoStorage=sum(x>1e-6 for x in n),worseThanNoStorage=sum(x< -1e-6 for x in n)))
    if id in ['none','occasional']:
        for seed in range(72001,72021):
            a=index['capacity',id,seed];b=index['before',id,seed]
            final=json.loads(json.dumps(a['final']));del final['storage'];final['v']=7
            assert final==b['final'] and a['result']==b['result'] and a['events']==b['events'] and a['nextRandom']==b['nextRandom']
pilot=json.loads(gzip.decompress((OUT/'pilot-revised.json.gz').read_bytes()))['rows'];variants=[]
for base in [100,150,200]:
    for fee in [1,2]:
        a=[r for r in pilot if r['base']==base and r['fee']==fee]
        variants.append(dict(base=base,fee=fee,runs=len(a),wealthMedian=median([r['result']['wealth'] for r in a]),rentSum=sum(r['rent'] for r in a),eld=sum(r['final']['rank']==4 for r in a),suspensions=sum(len(r['suspensions']) for r in a)))
# Every historical result tracked at the base must still have the identical git blob.
tree=subprocess.check_output(['git','ls-tree','-r','a660d79','tests/simulation'],cwd=ROOT,text=True)
old=[]
for line in tree.splitlines():
    meta,name=line.split('\t');blob=meta.split()[2]
    if name.endswith(('.json','.json.gz','.jsonl','.tar.gz','.csv')):old.append((name,blob))
actual=subprocess.check_output(['git','hash-object','--stdin-paths'],input=''.join(name+'\n' for name,_ in old),cwd=ROOT,text=True).splitlines()
assert actual==[blob for _,blob in old]
verification={'historicalResultFilesUnchanged':len(old),'historicalFiles':[{'path':name,'gitBlob':blob} for name,blob in old],'sameGameAndRNGWithoutRentalAndBelowFreeLimit':40,'technicalWorkerFailures':0,'counts':{'variantPilotFirst':60,'variantPilotCorrected':60,'mainDistinctGames':200,'mainExactReplays':10,'supplementalTourGames':60,'supplementalTourExactReplays':4,'totalFullExecutions':394,'savedFullGameRecords':380,'mainAndTourDistinctCases':260,'fullHorizonRecords':sum(r['result']['days']>=1440 for r in rows+tour_rows)+120,'earlyLiquidityStops':sum(r['summary']['travelBlocked'] for r in rows+tour_rows),'technicalMigrationOrMechanicCasesCountedAsGames':0},'testedGameCommit':json.loads((OUT/'main/manifest.json').read_text())['identity']['gameCommit'],'gameSHA256':hashlib.sha256((ROOT/'Hansefuerst_0_4.html').read_bytes()).hexdigest()}
(OUT/'verification.json').write_text(json.dumps(verification,indent=2)+'\n')
summary={'groups':groups,'tourGroups':tour_groups,'paired':paired,'variants':variants,'individual':individual,'tourRecoveryChecks':len(json.loads((OUT/'liquidity-checks.json').read_text())['checks']),'allTrialsHaveRealCashLedger':True,'noStrategyUsedBankLoans':True,'limitations':['20 seeds per group; artificial local pricebook policies','no human playtime inference','main had no unpaid suspension; supplemental tour had one, and 13 strategy liquidity stops were probed separately','end wealth contains unsold stocks at acquisition book value','no guarantee of optimal storage or all remote routes']}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
with (OUT/'groups.csv').open('w') as f:
    w=csv.DictWriter(f,fieldnames=list(groups[0]));w.writeheader();w.writerows(groups)
for g in groups+tour_groups: print(g['model'],g['strategy'],round(g['wealthMedian']),round(g['rentMedian']),round(g['storageNetMedian']),g['storageProfitLossSales'],g['storageSales'])
for p in paired:print(p)
print('Historical files unchanged:',len(old))
