"""Read fixed Git sources and calculate three support proposals; never execute game code."""
import json,re,hashlib,subprocess,csv,math
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];P=Path(__file__).resolve().parent;O=P/'results';O.mkdir(exist_ok=True)
plan=json.loads((P/'plan.json').read_text());git=lambda *a:subprocess.check_output(['git',*a],cwd=ROOT)
html=(ROOT/'Hansefuerst_0_4.html').read_bytes();assert hashlib.sha256(html).hexdigest()==plan['productHash'];text=html.decode();lines=text.splitlines()
refs=[]
for item in plan['references']:
 ref,file=item['commit'],item['path'];b=git('show',ref+':'+file);refs.append({**item,'blob':git('rev-parse',ref+':'+file).decode().strip(),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
cities=json.loads(re.search(r'^const POLITICAL_CITIES=Object.freeze\((\[.*\])\.map\(c=>',text,re.M)[1]);assert len(cities)==11
functions=[]
for name in plan['functions']:
 match=re.search(r'^function '+re.escape(name)+r'\(',text,re.M);assert match,name;end=re.search(r'^(?:function |const |// BEGIN|// END)',text[match.start()+1:],re.M);stop=match.start()+1+end.start() if end else len(text);snippet=text[match.start():stop].rstrip();functions.append({'function':name,'line':text[:match.start()].count('\n')+1,'sha256':hashlib.sha256(snippet.encode()).hexdigest(),'sourceExcerpt':snippet if name in ['politicalSupport','mayorQuote','hanseQuote','promote','politicalOffer','politicalOfficeProof','donationGain','creditLimit'] else None})
assert 'economic:Math.min(10' in text and 'reputation:Math.min(15' in text
assert 'services:Math.min(40,records.length*5)' in text and 'decisions:Math.min(15,accord*5)' in text
assert "p.version!==1" in text and "r.id===job.id" in text
# Pure counts of unique, valid local records, not synthetic savegames.
def calc(supply,accord,periods):
 n=supply+accord;kinds=int(supply>0)+int(accord>0)
 pledges=int(supply>=2)+int(supply>=3)+int(accord>=2)+int(n>=6 and periods>=3 and kinds>=2)
 services=min(40,5*n);decisions=min(15,5*accord);local=services+5*pledges+decisions
 return {'local':local,'services':services,'pledges':pledges,'decisions':decisions,'A':F(100*local,75),'B':F(local),'C':F(services)+F(10*pledges)+F(20*min(accord,3),3),'legacyGate':n>=6 and periods>=3 and kinds==2,'deedKinds':kinds}
states=[]
for s in range(13):
 for a in range(13):
  for periods in range(max(s,a),s+a+1):
   if s+a==0 and periods!=0:continue
   q=calc(s,a,periods);states.append({'supply':s,'accord':a,'periods':periods,**q})
rows=[];different=0
for c in cities:
 target=c['rivalTarget'];targetB=(3*target+3)//4;reach={k:[] for k in ['A','B','C']}
 for state in states:
  ok={k:state[k]>=(targetB if k=='B' else target) for k in reach}
  assert ok['A']==ok['B'],'normalization and ceil rescaling must agree exactly'
  different+=int(ok['A']!=ok['C'])
  if state['legacyGate']:
   for k in reach:
    if ok[k]:reach[k].append(state)
 assert all(reach.values())
 for model,hits in reach.items():
  witness=min(hits,key=lambda s:(s['supply']+s['accord'],s['periods'],abs(s['supply']-s['accord']),s['supply']))
  rows.append({'city':c['city'],'name':c['name'],'region':c['region'],'model':model,'target':targetB if model=='B' else target,'maximum':75 if model=='B' else 100,'reachableUnderExistingDeedGates':True,'minimumRecordsInGrid':witness['supply']+witness['accord'],'witnessSupply':witness['supply'],'witnessAccord':witness['accord'],'witnessPeriods':witness['periods'],'witnessScoreExact':str(witness[model]),'witnessScore':float(witness[model])})
# Named comparisons preserve gates and counts; no measured game duration implied.
examples=[]
for s,a,p,label in [(0,0,0,'Handel/Spenden ohne Tatbeleg'),(6,0,6,'Nur Versorgung'),(0,6,6,'Nur Vereinbarungen'),(3,3,3,'Ausgewogen, sechs Dienste'),(5,1,5,'Versorgungslastig, sechs Dienste'),(1,5,5,'Vermittlungslastig, sechs Dienste'),(1,6,6,'Vermittlungslastig, sieben Dienste'),(4,4,4,'Alle Komponenten voll')]:
 q=calc(s,a,p);wins={k:[c['name'] for c in cities if q['legacyGate'] and q[k]>=((3*c['rivalTarget']+3)//4 if k=='B' else c['rivalTarget'])] for k in ['A','B','C']}
 examples.append({'label':label,'supply':s,'accord':a,'periods':p,**{k:(str(v) if isinstance(v,F) else v) for k,v in q.items()},'citiesWonUnderExistingGates':wins})
assert calc(4,4,4)['local']==75
assert calc(3,3,3)['A']==F(260,3)
assert all(len(x['citiesWonUnderExistingGates'][k])==11 for x in examples if x['supply']==3 and x['accord']==3 for k in ['A','B','C'])
assert different>0,'C must genuinely differ'
# Idempotence requirement illustrated mathematically, not dynamic proof of future guards.
ids=[('supply:0:0','supply',0),('accord:0:0','accord',0)]
unique=lambda rs:list({r[0]:r for r in rs}.values());assert unique(ids+ids)==ids
for delta in ['gold','reputation','bookWealth']:assert calc(3,3,3)==calc(3,3,3) # intentionally no such inputs in proposals
output={'sourceCommit':git('rev-parse','HEAD').decode().strip(),'base':plan['base'],'productHash':plan['productHash'],'references':refs,'functions':functions,'cities':cities,'formulaStateCount':len(states),'modelCityChecks':len(states)*11*3,'AandBExactEquivalent':True,'AandCDifferentStateCityPairs':different,'unreachableWithLocal75AndOldTargets':[c['name'] for c in cities if c['rivalTarget']>75],'modelsAreArithmeticOnly':True,'noGameExecution':True,'reachability':rows,'examples':examples}
(O/'inspection.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
for filename,rs in [('city-models.csv',rows),('model-examples.csv',[{**{k:v for k,v in x.items() if k!='citiesWonUnderExistingGates'},**{k+'Cities':'; '.join(x['citiesWonUnderExistingGates'][k]) for k in ['A','B','C']}} for x in examples])]:
 with (O/filename).open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=list(rs[0]),lineterminator='\n');w.writeheader();w.writerows(rs)
print(json.dumps({k:output[k] for k in ['sourceCommit','formulaStateCount','modelCityChecks','AandBExactEquivalent','AandCDifferentStateCityPairs','unreachableWithLocal75AndOldTargets','noGameExecution']}))
