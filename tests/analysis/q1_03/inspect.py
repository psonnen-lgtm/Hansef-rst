"""Read sources and historical JSON, perform arithmetic only. No game or policy implementation."""
from pathlib import Path
import hashlib,json,re,subprocess,sys
root=Path(__file__).resolve().parents[3]
out=Path(sys.argv[1]);assert not out.exists(),'new output required'
def git(*args):return subprocess.check_output(['git',*args],cwd=root)
plan=json.loads((Path(__file__).parent/'plan.json').read_text())
html=(root/'Hansefuerst_0_4.html').read_bytes();assert hashlib.sha256(html).hexdigest()==plan['productSHA256']
sources={
 'd4cf42868a5347ec6e660f52faafb8132df5b209':['Q1_01_gesamtbericht.md','Q1_01_politik_und_langzeitmotivation.md','Q1_01_prioritaeten.csv','Q1_01_entwicklungsempfehlungen.md'],
 '8b20432506940ef1d33bf7af7f162884eec63c01':['Q1_02_gesamtbericht.md','Q1_02_handelsexploit.md','Q1_02_politische_ortsbedingung.md','Q1_02_loesungsvarianten.md','Q1_02_rohdaten.json','Q1_02_testfaelle.csv'],
 'ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7':['R1_11_90_stunden_karrierekonzept.md','R1_11_D_vergleich_hansefuerst.md']}
evidence=[]
for ref,files in sources.items():
 for filename in files:
  directory='Q1_01' if filename.startswith('Q1_01') else 'Q1_02' if filename.startswith('Q1_02') else 'R1_11'
  p='docs/entwicklungsberichte/'+directory+'/'+filename;b=git('show',ref+':'+p)
  evidence.append({'commit':ref,'path':p,'blob':git('rev-parse',ref+':'+p).decode().strip(),'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)})
q=json.loads(git('show','8b20432506940ef1d33bf7af7f162884eec63c01:docs/entwicklungsberichte/Q1_02/Q1_02_rohdaten.json'))
assert q['hash']==plan['productSHA256'];assert len(q['rows'])==8
lines=html.decode().splitlines();functions={};city_uses=[];writers=[]
for i,line in enumerate(lines,1):
 if line.startswith('const ART=') or len(line)>40000:continue
 m=re.match(r'function (\w+)\(',line)
 if m:functions[m.group(1)]=i
 if re.search(r'\bs\.city\b',line):city_uses.append({'line':i,'text':line[:240]})
 if re.search(r'\bs\.rep\s*(?:\+=|=|\+\+)',line):writers.append({'line':i,'text':line[:240]})
for name in ['trade','promote','politicalSupport','mayorQuote','hanseQuote','selectFleetShip','witnessPoliticalJob','finishPoliticalAccord','witnessHanseAgreement','creditLimit','validatePolitics','arrive']:
 assert name in functions,name
assert "p.version!==1" in html.decode();assert "![3,4,5,6,7,8,9,10,11,12,13].includes(x.v)" in html.decode()
calculations=[]
for row in q['rows']:
 b,a=row['before'],row['after'];other=b['worth']-b['book']-b['gold']
 w1before=b['gold']+other+30*b['quantity'];w1after=a['gold']+other+30*a['quantity']
 w2before=b['gold']+other;w2after=a['gold']+other
 if row['id'].startswith(('A01','A02','A04','A05','A08')):
  assert b['gold']==a['gold'] and b['quantity']==a['quantity'];assert w1before==w1after;assert w2before==w2after
 calculations.append({'historicalCase':row['id'],'oldWorthBefore':b['worth'],'oldWorthAfter':a['worth'],'historicalRepDelta':a['rep']-b['rep'],'quantityBefore':b['quantity'],'quantityAfter':a['quantity'],'W1commonQuote30Before':w1before,'W1commonQuote30After':w1after,'W2inventoryExcludedBefore':w2before,'W2inventoryExcludedAfter':w2after,'method':'pure reading of saved synthetic Q1.02 fixture; other assets constant; no bank/debt/arrears in original fixture'})
assert q['rows'][-1]['before']['worth']==44920 and q['rows'][-1]['after']['rank']==2
p=q['politics'];assert p['after']['day']==p['before']['day'];assert p['after']['gold']==p['before']['gold'];assert p['after']['records']==p['before']['records']+1
local_max=40+20+15;assert local_max==75 and local_max<80
funding=[{'fee':f,'startGold':5000,'remaining':5000-f,'share':f/5000} for f in [250,500,1000]]
result={'phase':'Q1.03','inspectedCommit':git('rev-parse','HEAD').decode().strip(),'base':plan['base'],'productHash':plan['productSHA256'],'newDynamicRuns':0,'newMigrations':0,'newGuildOrPoliticsImplementation':False,'foundationArtifacts':evidence,'functionLines':functions,'cityUsesTextualNotCompleteAST':city_uses,'repWritesTextual':writers,'historicalEightCasesReadNotRerun':calculations,'historicalQ003ReadNotRerun':{'dayBefore':p['before']['day'],'dayAfter':p['after']['day'],'newRecords':1},'pureArithmetic':{'remainingLocalScoreMaximum':75,'existingLuebeckTarget':80,'proposalNormalization':100/75,'exampleLocal65Normalized':65*100/75,'membershipFeesIllustrativeOnly':funding},'limits':['no fresh Q001 or Q003 execution','no tested guild/person/save implementation','W1 simplified quote30 no caps unknown prices or elapsed time','W2 discards inventory collateral intentionally, not financial book values','no old-client migration run; strict schema source read only']}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'sourceArtifacts':len(evidence),'historicalCases':8,'cityUseLines':len(city_uses),'functions':len(functions),'newDynamicRuns':0,'localScoreMax':75,'existingLuebeckTarget':80}))
