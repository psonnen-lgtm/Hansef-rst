"""Read-only final scope/source/data checks. No game or simulation execution."""
from pathlib import Path
import subprocess,hashlib,json,re,csv
ROOT=Path(__file__).resolve().parents[3];P=Path(__file__).resolve().parent;D=ROOT/'docs/entwicklungsberichte/Q1_09';O=P/'results';plan=json.loads((P/'plan.json').read_text());git=lambda *a:subprocess.check_output(['git',*a],cwd=ROOT)
count=0
for row in git('ls-tree','-r','-z',plan['base']).split(b'\0'):
 if not row:continue
 info,file=row.split(b'\t',1);f=file.decode();oid=info.split()[2].decode();b=(ROOT/f).read_bytes()
 if f=='Hansefuerst_0_4.html':continue
 if f=='docs/entwicklungsberichte/README.md':assert b.startswith(git('show',plan['base']+':'+f))
 else:assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid,f
 count+=1
changes=git('diff','--name-only',plan['base']).decode().splitlines();assert all(f in ['Hansefuerst_0_4.html','docs/entwicklungsberichte/README.md'] or f.startswith(('docs/entwicklungsberichte/Q1_09/','tests/safety/q1_09/')) for f in changes)
required={'Q1_09_gesamtbericht.md','Q1_09_speichersicherheit.md','Q1_09_persoenliche_anwesenheit.md','Q1_09_buchwert_und_kreditschutz.md','Q1_09_v13_bestandsschutz.md','Q1_09_regressionstests.md','Q1_09_offene_entscheidungen.md'};assert {f.name for f in D.glob('*.md')}==required
links=0
for p in [*D.glob('*.md'),P/'README.md']:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if target.startswith(('https://','http://','#')):continue
  assert (p.parent/target.split('#')[0]).resolve().exists(),(p.name,target);links+=1
for f,h in json.loads((P/'frozen-sources.json').read_text()).items():assert hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==h,f
h=(ROOT/'Hansefuerst_0_4.html').read_text();product=hashlib.sha256(h.encode()).hexdigest();assert (P/'safety-foundation.js').read_text() in h;assert h.count('// BEGIN Q109 SAFETY FOUNDATION')==1;assert h.count('localStorage.setItem(KEY,')==1
summary=json.loads((P/'acceptance-summary.json').read_text());assert product==summary['gameHash'];assert not summary['Q001Fixed'] and not summary['fullQ109Acceptance'];assert summary['VMGroupsPassed']==44
n=0
for name in ['storage','presence','qualified','edge','cross-arrival']:
 x=json.loads((O/'acceptance'/(name+'.json')).read_text());assert x['passed'] and x['gameHash']==product and x['sourceCommit']==summary['testedCommit'];n+=len(x.get('checks',[])) or 1
assert n==44
v=json.loads((O/'acceptance/valuation.json').read_text());assert len(v['rows'])==8 and not v['activeNeutralCollateralInvariant'] and v['W1W2NotActivated'] and v['gameHash']==product
w=json.loads((O/'acceptance/work-in-progress.json').read_text());assert w['wipWorthInflation']==188 and not w['activeCollateralInvariant'] and w['gameHash']==product
browser=json.loads((O/'browser-attempt.json').read_text());assert not browser['browserGameAbnahme'] and not browser['physicalDevicesTested'] and not browser['gameBrowserChecks'];assert all(not a['launched'] for a in browser['attempts'])
with (P/'test-matrix.csv').open() as f:matrix=list(csv.DictReader(f))
assert len(matrix)==54 and sum(r['status']=='VM_PASS' for r in matrix)==44 and sum(r['status']=='KNOWN_Q001_OPEN' for r in matrix)==4
assert b'\r' not in (P/'test-matrix.csv').read_bytes()
original=git('show',plan['base']+':Hansefuerst_0_4.html').decode()
def fn(s,name):
 a=s.index('function '+name+'(');m=re.search(r'^(?:function |const |// BEGIN|// END)',s[a+1:],re.M);return s[a:a+1+m.start()].strip() if m else s[a:].strip()
assert fn(h,'advance')==fn(original,'advance'),'interest/day/economy rules changed'
assert re.search(r'^const ART=.*$',h,re.M)[0]==re.search(r'^const ART=.*$',original,re.M)[0],'embedded graphics changed'
assert 'localStorage.setItem(LEGACYKEY' not in h
city=json.loads((O/'final-city-key-inventory.json').read_text());assert city['gameHash']==product and city['entries']
git('diff','--check',plan['base'])
result={'verificationCodeCommit':git('rev-parse','HEAD').decode().strip(),'testedGameCommit':summary['testedCommit'],'gameHash':product,'existingFilesExceptGameChecked':count,'onlyOldIndexAppended':True,'historicalTestsResultsPagesDistUnchanged':True,'productionChangesOnlyMainHTML':True,'embeddedGraphicsUnchanged':True,'advanceRulesUnchanged':True,'requiredReports':7,'validRelativeLinks':links,'VMGroupsPassed':44,'knownQ001OpenCases':4,'browserGameChecksExecuted':0,'fullQ109Acceptance':False,'scopeValid':True,'gitDiffCheck':True};(O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False))
