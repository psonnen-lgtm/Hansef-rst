"""Read secured historical data only, never run a simulator."""
from pathlib import Path
import hashlib,gzip,json,statistics,sys
root=Path(__file__).resolve().parents[3];out=Path(sys.argv[1]);assert not out.exists()
current=hashlib.sha256((root/'Hansefuerst_0_4.html').read_bytes()).hexdigest()
def read(f):
 p=root/f;b=p.read_bytes();return json.loads(gzip.decompress(b) if f.endswith('.gz') else b),{'path':f,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
sets=[]
for name,file,key in [('old1500','tests/simulation/results.json.gz','results'),('phase1alias','tests/simulation/phase1-results.json.gz','results'),('phase15e90','tests/simulation/phase15e-results.json.gz','rows')]:
 x,meta=read(file);rs=x[key];groups=[]
 for strategy in sorted(set(r['strategy'] for r in rs)):
  a=[r for r in rs if r['strategy']==strategy];cash=[r.get('gold',r.get('final',{}).get('gold')) for r in a];wealth=[r.get('wealth',r.get('final',{}).get('wealth')) for r in a];days=[r['days'] for r in a]
  groups.append({'strategy':strategy,'n':len(a),'cashMin':min(cash),'cashMedian':statistics.median(cash),'cashMax':max(cash),'wealthMedian':statistics.median(wealth),'daysMin':min(days),'daysMedian':statistics.median(days),'daysMax':max(days),'warning':'different historical engine/horizons; not representative V13 player distribution'})
 sets.append({'id':name,**meta,'rows':len(rs),'gameHash':x.get('sourceSHA256',x.get('gameSHA256')),'sameCurrentGame':x.get('sourceSHA256',x.get('gameSHA256'))==current,'groups':groups,'registry':x.get('registry')})
m,mm=read('tests/simulation/phase16c-20261024-01/manifest.json');s,sm=read('tests/simulation/phase16c-20261024-01/summary.json')
assert s['results']==2250
sets.append({'id':'phase16c2250','manifest':mm,'summary':sm,'identity':m['identity'],'results':s['results'],'identicalReplays':s['identicalReplays'],'failedAttempts':s['failedAttempts'],'groups':s['strategies'],'rawArchiveStatus':[{'path':str(p.relative_to(root)),'bytes':p.stat().st_size} for p in sorted((root/'tests/simulation/phase16c-20261024-01').glob('*.tar.gz'))],'archiveSimulationNotRerun':True})
alias=sets[0]['sha256']==sets[1]['sha256'];assert alias
out.write_text(json.dumps({'phase':'Q1.04','readOnly':True,'currentGameHash':current,'sets':sets,'resultsAndPhase1AreByteIdenticalAliasesNot3000IndependentRuns':alias,'newDynamicRuns':0},ensure_ascii=False,indent=2)+'\n');print(json.dumps({'historicalCounts':[1500,1500,90,2250],'aliasNotIndependent':alias,'newDynamicRuns':0}))
