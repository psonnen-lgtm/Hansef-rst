"""Static route arithmetic from the pinned distance table; no game execution."""
import json,re,math,csv,hashlib,subprocess
from pathlib import Path
P=Path(__file__).resolve().parent;ROOT=P.parents[2];O=P/'results';plan=json.loads((P/'plan.json').read_text());b=(ROOT/'Hansefuerst_0_4.html').read_bytes();assert hashlib.sha256(b).hexdigest()==plan['productHash'];s=b.decode()
dist=json.loads(re.search(r'^const DIST=(\[.*\]);$',s,re.M)[1]);cities=json.loads((O/'inspection.json').read_text())['cities'];assert len(dist)==11 and all(len(r)==11 for r in dist)
def days(a,b):return dist[a][b]+(3 if a in [9,10] else 0)+(3 if b in [9,10] else 0)
rows=[]
for c in cities:
 a=c['city'];assert dist[a][a]==0
 for b in range(11):assert dist[a][b]==dist[b][a] and (a==b or dist[a][b]>0)
 partners=sorted((b for b in range(11) if a!=b),key=lambda b:(days(a,b),b))[:3]
 for p,b in enumerate(partners):rows.append({'city':c['name'],'offerPeriodModulo3':p,'partner':cities[b]['name'],'koggeOneWayAtCondition100':days(a,b),'koggeRoundtripAtCondition100':days(a,b)+days(b,a),'roundtripNativeFees':12,'note':'Arithmetic, not played. No storms, trade, interest, loading, availability or human active time included.'})
with (O/'route-arithmetic.csv').open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
print(json.dumps({'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'routeRows':len(rows),'matrixSymmetricPositive':True,'noGameExecution':True}))
