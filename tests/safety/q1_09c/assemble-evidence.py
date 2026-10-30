"""Assemble existing final evidence; does not execute game actions or tests."""
from pathlib import Path
import csv, hashlib, json, subprocess
ROOT = Path(__file__).resolve().parents[3]
P = ROOT / 'tests/safety/q1_09c'
V = P / 'results/final-acceptance'
def read(name): return json.loads((V / (name + '.json')).read_text())
def rel(path): return str(path.relative_to(ROOT))
def git(*args): return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()
sha = hashlib.sha256((ROOT / 'Hansefuerst_0_4.html').read_bytes()).hexdigest()
code = git('log', '-1', '--format=%H', '--', 'Hansefuerst_0_4.html')
rows = []
for name, category in [('basic','VM Basisaussagen'),('storage','VM Speicher'),('economic','VM W1-S-Verbraucher'),('grace','VM Altfristen'),('travel','VM Reisen')]:
    data = read(name); assert data['passed'] and data['gameHash'] == sha
    for c in data['checks']: rows.append({'category': category, 'name': c['name'], 'status': 'PASS' if c['passed'] else 'FAIL', 'source': rel(V/(name+'.json'))})
data=read('valuation');assert data['activeNeutralCollateralInvariant'] and data['gameHash']==sha
for r in data['rows']: rows.append({'category':'native VM historische Handelsfälle','name':r['id'],'status':'PASS','source':rel(V/'valuation.json')})
data=read('construction');assert data['activeCollateralInvariant'] and data['gameHash']==sha
for r in data['cases']: rows.append({'category':'native VM Bau-Fixture','name':'neutraler Holzhandel' if r['dirty'] else 'unvermischte Materialien','status':'PASS','source':rel(V/'construction.json')})
for name in ['risk','person','clock-integration']:
    data=read(name);assert data['passed'] and data['gameHash']==sha
    rows.append({'category':'gezielte VM Integration','name':name,'status':'PASS','source':rel(V/(name+'.json'))})
browser=read('browser');assert browser['passed'] and browser['gameHash']==sha
for c in browser['checks']: rows.append({'category':'echter Chromium','name':c['name'],'status':c['status'],'source':rel(V/'browser.json')})
assert sum(r['status']=='PASS' for r in rows)==106
assert sum(c['passed'] is True for c in browser['checks'])==31
for i in [1,2,3]:
    data=read(f'concurrency-{i}');assert data['passed'] and len(data['checks'])==2 and data['gameHash']==sha
probe=read('reputation-open');assert probe['passedDiagnostic'] and not probe['Q001UnqualifiedClosure'] and probe['gameHash']==sha
rows.append({'category':'offener Anerkennungspfad','name':'neutrales Geschäft +1 globales Ansehen / politische Unterstützung +1/6','status':'KNOWN_OPEN','source':rel(V/'reputation-open.json')})
for name in ['Safari/WebKit','echtes iPhone/iPad','Offline-Kaltstart','physischer Speicher-/OS-Abbruch']:
    rows.append({'category':'noch nicht abgenommen','name':name,'status':'NOT_ACCEPTED','source':'docs/entwicklungsberichte/Q1_09c/Q1_09c_browserabnahme.md'})
rows.append({'category':'konservativer Ausschluss','name':'unklarer Flottenwechsel / fortgeschrittene M2 ohne Erstnachweis','status':'MANUAL_REVIEW_NO_AUTO_GRACE','source':'docs/entwicklungsberichte/Q1_09c/Q1_09c_altvertragsfristen.md'})
with (P/'test-matrix.csv').open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=['category','name','status','source'],lineterminator='\n');w.writeheader();w.writerows(rows)
summary={'date':'2026-10-30 Europe/Berlin','branch':'fix/q1-09c-safety-finalization','parent':'afb2bc9ce5496ecfcd8a5a17da1301825262f438','testedGameCommit':code,'gameHash':sha,'rootVersion':13,'politicsVersion':2,'safetyVersion':3,
'canonicalStorage':{'backend':'IndexedDB','database':'hansefuerst-local-safety3','objectStore':'game','key':'active','value':'one complete JSON string','WebLocksMandatoryForWrites':True,'readwriteCompareAndPutIsNativeTransaction':True,'localStorageCanonicalWrites':False,'legacyLocalStorageUntouched':True},
'approvedRulesImplemented':['W1-S','unaccompanied voyages','one-time evidenced legacy grace'],'newCasesPassed':106,'nativeChromiumGroupsPassed':31,'VMGroupsAndCasesPassed':75,'stabilityRepetitions':{'rounds':3,'casesEach':2,'allPassed':True},'fileURLBlockedNotPassed':1,'financialQ001CriteriaPassed':True,'Q001UnqualifiedClosed':False,'legacyGlobalReputationPathOpen':True,'Q002NativeScopedAcceptance':True,'Q003NativeScopedAcceptance':True,'fullIntegrationAcceptance':False,'webKitTests':0,'realAppleDeviceTests':0,'offlineColdStartAccepted':False,'largeSimulations':0,'realUserSavesUsed':0,'merged':False,'PagesDistChanged':False,'historicalResultsChanged':False,'old44And74':'historical references only, not falsely rerun as complete suites','authoritativeResultsDirectory':rel(V)}
(P/'acceptance-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
lines=git('log','--reverse','--format=%H%x09%s','afb2bc9ce5496ecfcd8a5a17da1301825262f438..HEAD').splitlines()
(P/'checkpoints.json').write_text(json.dumps({'testedGameCommit':code,'commits':[dict(zip(['commit','subject'],line.split('\t',1))) for line in lines],'note':'future report/proof commits are separate; no self-referential tested commit'},indent=2)+'\n')
(P/'review-sources.json').write_text(json.dumps({'gameHash':sha,'mirrors':[{'path':rel(P/name),'sha256':hashlib.sha256((P/name).read_bytes()).hexdigest()} for name in ['storage-engine.js','legacy-rules.js','safety-boundary.js']]},indent=2)+'\n')
print(json.dumps({'cases':106,'nativeChromium':31,'repeatedCriticalCases':6,'code':code,'sha256':sha,'unqualifiedQ001Closed':False},indent=2))
