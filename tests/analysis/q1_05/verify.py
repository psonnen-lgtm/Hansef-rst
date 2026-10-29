"""Read-only publication/scope checks; no game imports or executions."""
import hashlib,json,re,subprocess,csv,gzip
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];P=Path(__file__).resolve().parent;O=P/'results';plan=json.loads((P/'plan.json').read_text());base=plan['base']
git=lambda *args:subprocess.check_output(['git',*args],cwd=ROOT)
old=git('ls-tree','-r','-z',base).split(b'\0');count=0
for row in old:
 if not row:continue
 info,f=row.split(b'\t',1);mode,typ,oid=info.split();f=f.decode();data=(ROOT/f).read_bytes()
 if f=='docs/entwicklungsberichte/README.md':assert data.startswith(git('show',base+':'+f)),'index must only append'
 else:assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==oid.decode(),f
 count+=1
changes=git('diff','--name-only',base).decode().splitlines()
assert all(f.startswith(('tests/analysis/q1_05/','docs/entwicklungsberichte/Q1_05/')) or f=='docs/entwicklungsberichte/README.md' for f in changes)
required=['Q1_05_gesamtbericht.md','Q1_05_testgrundlagen.md','Q1_05_wirtschaftliche_meilensteine.md','Q1_05_gildengebuehren_vergleich.md','Q1_05_spielspass_und_karriere.md','Q1_05_entscheidungsvorlage.md']
D=ROOT/'docs/entwicklungsberichte/Q1_05';assert sorted(p.name for p in D.glob('*.md'))==sorted(required)
links=0
for file in [*D.glob('*.md'),P/'README.md']:
 for target in re.findall(r'\]\(([^)]+)\)',file.read_text()):
  if target.startswith(('https://','http://','#')):continue
  target=target.split('#')[0];assert (file.parent/target).resolve().exists(),(file.name,target);links+=1
for f,sha in json.loads((P/'frozen-sources.json').read_text()).items():assert hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==sha
assert hashlib.sha256((ROOT/'Hansefuerst_0_4.html').read_bytes()).hexdigest()==plan['productHash']
assert len(list((O/'runs').glob('*.json.gz')))==111
for f,n in [('baseline-summary.csv',75),('fee-continuations.csv',36),('affordability.csv',225)]:
 with (O/f).open() as h:assert len(list(csv.DictReader(h)))==n
 for line in (O/f).read_bytes().split(b'\n'):assert not line.endswith(b'\r')
for f in ['regionale_entwicklung.svg','vorsichtiger_zahlungszeitpunkt.svg']:assert '<svg' in (O/f).read_text()
git('diff','--check',base)
result={'sourceCommit':git('rev-parse','HEAD').decode().strip(),'base':base,'previousFilesChecked':count,'onlyAppendedOldIndex':True,'sixReports':required,'validRelativeLinks':links,'savedRunFiles':111,'frozenHashesValid':True,'productUnchanged':True,'noHistoryOverwritten':True,'scopeValid':True,'csvRowsValid':True,'gitDiffCheck':True}
(O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False))
