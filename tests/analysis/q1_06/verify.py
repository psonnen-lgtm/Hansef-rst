"""Read-only scope, source and publication checks. Never imports game or analysis models."""
from pathlib import Path
import csv,json,hashlib,re,subprocess
ROOT=Path(__file__).resolve().parents[3];P=Path(__file__).resolve().parent;D=ROOT/'docs/entwicklungsberichte/Q1_06';O=P/'results';plan=json.loads((P/'plan.json').read_text());git=lambda *a:subprocess.check_output(['git',*a],cwd=ROOT)
count=0
for row in git('ls-tree','-r','-z',plan['base']).split(b'\0'):
 if not row:continue
 info,f=row.split(b'\t');name=f.decode();oid=info.split()[2].decode();data=(ROOT/name).read_bytes()
 if name=='docs/entwicklungsberichte/README.md':assert data.startswith(git('show',plan['base']+':'+name))
 else:assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==oid,name
 count+=1
paths=git('diff','--name-only',plan['base']).decode().splitlines();assert all(p.startswith(('docs/entwicklungsberichte/Q1_06/','tests/analysis/q1_06/')) or p=='docs/entwicklungsberichte/README.md' for p in paths)
expected={'Q1_06_gesamtbericht.md','Q1_06_karrieremodell.md','Q1_06_politische_taten.md','Q1_06_buergermeister_und_eldermann.md','Q1_06_unterstuetzungsmodelle.md','Q1_06_spielspass_und_90_stunden.md','Q1_06_bestandsschutz_und_exploits.md','Q1_06_entscheidungsmatrix.csv'};assert {p.name for p in D.iterdir() if p.is_file()}==expected
links=0
for p in [*D.glob('*.md'),P/'README.md']:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if target.startswith(('http://','https://','#')):continue
  assert (p.parent/target.split('#')[0]).resolve().exists(),(p.name,target);links+=1
with (D/'Q1_06_entscheidungsmatrix.csv').open() as f:decisions=list(csv.DictReader(f))
assert len(decisions)==48 and len({r['id'] for r in decisions})==48;assert {r['status'] for r in decisions}=={'BESCHLOSSEN','VORLAEUFIG','EMPFEHLUNG','OFFEN','ZURUECKGESTELLT'};assert all(r['produktiv_implementiert_in_Q1_06']=='nein' for r in decisions)
for r in decisions:assert (D/r['bericht']).exists()
with (P/'planned-regressions.csv').open() as f:tests=list(csv.DictReader(f))
assert len(tests)==42 and all(r['status']=='GEPLANT_NICHT_AUSGEFUEHRT' for r in tests)
a=json.loads((O/'inspection.json').read_text());assert a['noGameExecution'] and a['modelsAreArithmeticOnly'];assert a['formulaStateCount']==819 and a['modelCityChecks']==27027;assert len(a['references'])==13 and len(a['functions'])==27;assert len(a['reachability'])==33 and all(r['reachableUnderExistingDeedGates'] for r in a['reachability']);assert a['AandBExactEquivalent'] and a['AandCDifferentStateCityPairs']==81
with (O/'route-arithmetic.csv').open() as f:routes=list(csv.DictReader(f))
assert len(routes)==33
for file,digest in json.loads((P/'frozen-sources.json').read_text()).items():assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==digest,file
for p in [D/'Q1_06_entscheidungsmatrix.csv',P/'planned-regressions.csv',O/'city-models.csv',O/'model-examples.csv',O/'route-arithmetic.csv']:assert b'\r' not in p.read_bytes()
git('diff','--check',plan['base'])
result={'sourceCommit':git('rev-parse','HEAD').decode().strip(),'previousFilesChecked':count,'onlyAppendedOldIndex':True,'productAndHistoryUnchanged':True,'requiredDocuments':8,'decisionRows':48,'plannedNotExecutedRegressions':42,'validRelativeLinks':links,'staticRouteRows':33,'formulaComparisons':27027,'noGameExecution':True,'frozenSourcesValid':True,'scopeValid':True,'gitDiffCheck':True};(O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False))
