"""Read secured 0.6c data only; never starts a game or rewrites a raw result."""
from pathlib import Path
import json,gzip,statistics,csv
root=Path(__file__).resolve().parents[2]
out=root/'tests/simulation/phase06c-20261025-01'
names=['Lübeck','Hamburg','Rostock','Stralsund','Stettin','Danzig','Bergen','Visby','Brügge','Nowgorod','Venlo']
rows=[]
for group in ['pilot','main']:
    manifest=json.loads((out/group/'manifest.json').read_text())
    files=sorted((out/group).glob('*.json.gz'))
    assert len(files)==len(manifest['tasks'])
    for file in files:
        data=json.load(gzip.open(file));r=data['row'];t=data['task'];events=r['events'];s=r['summary'];t0=r['initial']['year']*360+r['initial']['day']
        assert r['gameSHA256']==manifest['identity']['gameSHA256']
        assert r['initial']['gold']==5000 and r['initial']['city']==t['city'] and r['initial']['ships'][0]['city']==t['city']
        assert r['final']['beginning']['city']==t['city']
        mayors=[e for e in events if e['type']=='political_election' and e.get('won')]
        assert not mayors or mayors[0]['city']==r['home']
        visited={names[t['city']]}|{e['to'] for e in events if e['type']=='travel'}
        # Legacy runner summary counted departure observations (`at`), which can omit the final new port.
        # The report uses actual arrival destinations from travel events instead.
        rows.append(dict(group=group,file=str(file.relative_to(root)),task=t,replay=data['replayVerified'],home=r['home'],mayorDay=r['mayorDay'],eldDay=r['eldDay'],rank=r['rank'],days=r['days'],blocked=r['blocked'],wealth=r['wealth'],cash=r['gold'],initialWorth=r['initialWorth'],tradeProfit=s['tradeProfit'],fees=s['fees'],arms=s['arms'],journeys=s['journeys'],visited=sorted(visited),cities=len(visited),runnerCities=s['citiesVisited'],services=s['services'],endorsements=s['endorsements'],firstTrade=s.get('firstTradeDay'),firstLetter=s.get('firstCivicAcceptedDay'),firstService=s.get('firstServiceDay'),worth180=s['at180']['wealth'],cash180=s['at180']['cash'],worth360=s['at360']['wealth'],cash360=s['at360']['cash'],mayorCash=mayors[0]['cash'] if mayors else None,mayorWorth=mayors[0]['wealth'] if mayors else None,mayorCity=mayors[0]['city'] if mayors else None,rentArrears=s['rentArrears'],financialStop=[e for e in r['trace'] if e['event']!='trip'],remainingReasons=None))
def med(values):
    a=[v for v in values if v is not None]
    return statistics.median(a) if a else None
def summarize(a):
    result={'n':len(a),'mayors':sum(r['mayorDay'] is not None for r in a),'eld':sum(r['rank']==4 for r in a),'blocked':sum(r['blocked'] for r in a),'endRanks':{str(i):sum(r['rank']==i for r in a) for i in range(5)}}
    for key in ['mayorDay','eldDay','wealth','cash','tradeProfit','fees','journeys','cities','services','endorsements','firstTrade','firstLetter','firstService','worth180','cash180','worth360','cash360','mayorCash','mayorWorth']:result[key+'Median']=med(r[key] for r in a)
    result['cashMin']=min(r['cash'] for r in a);return result
main=[r for r in rows if r['group']=='main'];pilot=[r for r in rows if r['group']=='pilot'];policies=['wealth','early','supply','remote','balanced']
byCity=[{'city':i,'name':n,**summarize([r for r in main if r['task']['city']==i]),'normal':summarize([r for r in main if r['task']['city']==i and r['task']['condition']=='normal']),'earlyArms':summarize([r for r in main if r['task']['city']==i and r['task']['condition']=='early-arms'])} for i,n in enumerate(names)]
byPolicy=[{'behavior':b,'normal':summarize([r for r in main if r['task']['behavior']==b and r['task']['condition']=='normal']),'earlyArms':summarize([r for r in main if r['task']['behavior']==b and r['task']['condition']=='early-arms'])} for b in policies]
pairs=[]
for city in range(11):
    for behavior in policies:
        normal=next(r for r in main if r['task']['city']==city and r['task']['behavior']==behavior and r['task']['condition']=='normal')
        poor=next(r for r in main if r['task']['city']==city and r['task']['behavior']==behavior and r['task']['condition']=='early-arms')
        assert normal['task']['seed']==poor['task']['seed']
        pairs.append(dict(city=city,behavior=behavior,wealthDelta=poor['wealth']-normal['wealth'],cashDelta=poor['cash']-normal['cash'],mayorDelay=poor['mayorDay']-normal['mayorDay'] if poor['mayorDay'] is not None and normal['mayorDay'] is not None else None,eldDelay=poor['eldDay']-normal['eldDay'] if poor['eldDay'] is not None and normal['eldDay'] is not None else None))
historical=json.loads((root/'tests/simulation/phase06b-20261025-01/summary.json').read_text())
result={'scope':'read-only secured raw event analysis; no simulation','distinct':len(rows),'replays':sum(r['replay'] for r in rows),'executions':len(rows)+sum(r['replay'] for r in rows),'pilot':summarize(pilot),'main':summarize(main),'normal':summarize([r for r in main if r['task']['condition']=='normal']),'earlyArms':summarize([r for r in main if r['task']['condition']=='early-arms']),'cities':byCity,'policies':byPolicy,'pairs':pairs,'pairedSummary':{'pairs':len(pairs),'wealthDeltaMedian':med(p['wealthDelta'] for p in pairs),'mayorDelayMedianAmongBothSuccesses':med(p['mayorDelay'] for p in pairs),'eldDelayMedianAmongBothSuccesses':med(p['eldDelay'] for p in pairs),'wealthImprovedDespiteArms':sum(p['wealthDelta']>0 for p in pairs)},'incomplete':[r for r in main if r['rank']<4],'pilotDifferentOffice':[r for r in pilot if r['home']!=r['task']['city']],'arrivalCountDisagreements':[r['file'] for r in rows if r['cities']!=r['runnerCities']],'historical06b':{'source':'tests/simulation/phase06b-20261025-01/summary.json','main':historical['main'],'byCity':historical['byCity'],'notRerun':True},'rows':rows,'limits':['one seed in main, one separate pilot seed; paired starts not independent population samples','political target differs intentionally in half pilot; do not pool pilot as city difficulty','conditional title medians exclude censored cases; show counts','early arms is a real choice with protection and capacity effects, not a pure cash experiment','wealth180/360 is the last observed action before that day, not exact-day interpolation','no human-hour conversion','visited ports are recomputed from actual arrival destinations, not runner departure observations']}
for file,data in [('summary.json',result)]:
    with (out/file).open('x') as f:json.dump(data,f,ensure_ascii=False,indent=2);f.write('\n')
with (out/'cities.csv').open('x',newline='') as f:
    writer=csv.writer(f);writer.writerow(['city','name','condition','n','mayors','eld','mayorDayMedian','eldDayMedian','wealthMedian','cashMedian','firstTradeMedian','firstServiceMedian'])
    for city in byCity:
        for condition in ['normal','earlyArms']:
            s=city[condition];writer.writerow([city['city'],city['name'],condition,*[s[k] for k in ['n','mayors','eld','mayorDayMedian','eldDayMedian','wealthMedian','cashMedian','firstTradeMedian','firstServiceMedian']]])
print(json.dumps({k:result[k] for k in ['distinct','replays','executions','main','normal','earlyArms','pairedSummary']},ensure_ascii=False,indent=2))
