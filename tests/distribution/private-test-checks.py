"""Read-only source/package controls and loopback-only launcher checks; no simulation or publication."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from urllib.request import urlopen,Request
from urllib.error import HTTPError,URLError
import hashlib,json,re,subprocess,sys,time,zipfile,yaml
root=Path(__file__).resolve().parents[2];out=root/'tests/distribution/phase08b-20261026-01';base='ad9982d7ec95c7f8ecf31cf63811230507af3404';checks=[];sha=lambda b:hashlib.sha256(b).hexdigest()
def check(name,fn):
    evidence=fn();checks.append({'name':name,'passed':True,'evidence':evidence});print('PASS '+name,flush=True)
pkg=json.loads((out/'package-accepted.json').read_text());site=root/pkg['siteDirectory'];canonical=(root/'Hansefuerst_0_4.html').read_bytes();manifest=json.loads((site/'TESTPAKET.json').read_text())
def source():
    old=subprocess.check_output(['git','show',base+':Hansefuerst_0_4.html'],cwd=root);assert old==canonical
    protected=['Hansefuerst_0_4.html','assets','tests/simulation','releases/hansefuerst-0.7b-assets.zip','releases/hansefuerst-0.8a-assets.zip']
    subprocess.run(['git','diff','--quiet',base,'--',*protected],cwd=root,check=True)
    assert manifest['saveVersion']==11 and manifest['gameRelease']=='0.8a'
    assert re.search(rb'<script>([\s\S]*?)</script>',canonical)[1]==re.search(rb'<script>([\s\S]*?)</script>',(site/'Hansefuerst_0_4.html').read_bytes())[1]
    return {'basis':base,'wholeCanonicalHTMLExact':True,'allProtectedRulesAssetsHistoricalSimulationFilesAndOldArchivesExact':True,'saveVersion':11,'newCompleteGames':0}
check('unchanged game, V11, graphics and historical data',source)
def integrity():
    for n,m in manifest['files'].items():
        b=(site/n).read_bytes();assert len(b)==m['bytes'] and sha(b)==m['sha256'],n
    with zipfile.ZipFile(root/pkg['zip']) as z:
        assert z.testzip() is None
        for n in z.namelist():assert not n.startswith('/') and '..' not in Path(n).parts and '\\' not in n
    a=sha((root/pkg['zip']).read_bytes());b=sha((root/'build/phase08b-replay.zip').read_bytes());assert a==b==pkg['zipSHA256']
    return {'manifestFiles':len(manifest['files']),'zipCRCValid':True,'twoBuildsByteIdentical':True,'zipSHA256':a,'allElevenCities':len(manifest['cities'])}
check('complete reproducible asset package',integrity)
class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.tags=[]
    def handle_starttag(self,tag,attrs):
        self.tags.append(tag)
        for k,v in attrs:
            if k in ['href','src']:self.links.append(v)
def pages():
    count=0
    for n in ['index.html','kurzanleitung.html','spielstand-sichern.html','feedback.html']:
        p=Links();p.feed((site/n).read_text());assert 'form' not in p.tags and 'script' not in p.tags and 'iframe' not in p.tags
        for link in p.links:
            u=urlsplit(link)
            if u.scheme=='data':continue
            assert not u.scheme and not u.netloc and not u.path.startswith('/'),link
            assert (site/unquote(u.path or n)).is_file(),link;count+=1
    assert (site/'feedback-vorlage.txt').is_file()
    return {'pages':4,'relativeLinks':count,'noFormsScriptsOrExternalEmbeds':True,'manualFeedbackTemplate':True}
check('relative navigation and local-only questionnaire',pages)
def inactive():
    w=yaml.load((root/'deployment/phase08b/github-pages.yml.example').read_text(),Loader=yaml.BaseLoader)
    assert set(w['on'])=={'workflow_dispatch'}
    condition=w['jobs']['publish']['if'];assert 'OEFFENTLICH-FREIGEGEBEN' in condition and "existing_site_reviewed == 'JA'" in condition
    assert not list(root.glob('.github/workflows/*'))
    return {'inactiveExampleOnly':True,'noPushPRScheduleTrigger':True,'publicAndExistingSiteAcknowledgmentsRequired':True,'githubExecution':'not performed; no publication approval'}
check('publication stays inactive',inactive)
def server():
    work=root/pkg['directory'];log=(out/'local-server.log').open('w');cmd=[sys.executable,str(work/'START_TEST.py'),'--port','8810','--no-browser'];proc=subprocess.Popen(cmd,cwd=work,stdout=subprocess.PIPE,stderr=log,text=True);dummy=site/'qa-unlisted-save.json';dummy.write_text('{"dummy_only":true}')
    origin='http://127.0.0.1:8810'
    def status(path,method='GET'):
        req=Request(origin+path,method=method,data=b'controlled-dummy' if method=='POST' else None)
        try:
            with urlopen(req,timeout=2) as r:return r.status,r.headers,r.read()
        except HTTPError as r:return r.code,r.headers,r.read()
    try:
        for _ in range(100):
            if proc.poll() is not None:raise RuntimeError('launcher exited; inspect local-server.log')
            try:
                if status('/')[0]==200:break
            except URLError:pass
            time.sleep(.05)
        else:raise RuntimeError('loopback startup timeout')
        first=proc.stdout.readline().strip();assert 'http://127.0.0.1:8810/' in first
        assert status('/Hansefuerst_0_4.html','HEAD')[0]==200
        images=[n for n in manifest['files'] if n.endswith('.webp')]
        for n in images:
            code,headers,_=status('/'+n,'HEAD');assert code==200 and 'image/webp' in headers['Content-Type']
        assert status('/qa-unlisted-save.json')[0]==404
        assert status('/%2e%2e/LIESMICH.txt')[0]==404
        assert status('/../START_TEST.py')[0]==404
        assert status('/assets/')[0]==404
        assert status('/spielstand','POST')[0]==405
        return {'defaultHost':'127.0.0.1','staticImageHeads':len(images),'unknownBackupRejected':True,'traversalAndListingRejected':True,'dummyPOSTRejected':405,'realLANDeviceTest':False}
    finally:
        dummy.unlink(missing_ok=True);proc.terminate()
        try:proc.wait(timeout=3)
        except subprocess.TimeoutExpired:proc.kill();proc.wait()
        log.close()
check('local server serves only reviewed static files on loopback',server)
def addresses():
    for host in ['0.0.0.0','8.8.8.8','::']:
        r=subprocess.run([sys.executable,str(root/pkg['directory']/'START_TEST.py'),'--lan',host,'--no-browser'],capture_output=True,text=True,timeout=4);assert r.returncode!=0
    return {'globalOrPublicBindingsRejected':['0.0.0.0','8.8.8.8','::'],'noLANBindingStartedByTests':True}
check('no accidental global or public binding',addresses)
result={'testedPackagingCommit':subprocess.check_output(['git','log','-1','--format=%H','--','tools/build-private-test.py','deployment/phase08b/START_TEST.py','deployment/phase08b/site'],cwd=root,text=True).strip(),'testedGameCommit':subprocess.check_output(['git','log','-1','--format=%H','--','Hansefuerst_0_4.html'],cwd=root,text=True).strip(),'gameSHA256':sha(canonical),'scope':'static delivery and localhost server only; no live Pages deployment or simulation','checks':checks}
with (root/sys.argv[1]).open('x') as f:json.dump(result,f,ensure_ascii=False,indent=2);f.write('\n')
