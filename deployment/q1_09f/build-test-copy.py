"""Generate a separate Q1.09f copy. Main HTML stays immutable; no deployment."""
from pathlib import Path
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'Hansefuerst_0_4.html'
DEST=ROOT/'deployment/q1_09f/site/Hansefuerst_TEST_Q1_09f.html'
EXPECTED='50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048'
sha=lambda s:hashlib.sha256(s if isinstance(s,bytes) else s.encode()).hexdigest()
raw=SOURCE.read_bytes();assert sha(raw)==EXPECTED
text=raw.decode();patches=[]
def patch(before,after,reason,count=1):
 global text
 assert text.count(before)==count,(reason,text.count(before),count)
 text=text.replace(before,after)
 patches.append({'reason':reason,'count':count,'before':before,'after':after})
fixtures=ROOT/'tests/safety/q1_09d/fixtures'
# Hash the five exact parsed synthetic fixtures, not arbitrary TEST-named files.
import subprocess
canon=json.loads(subprocess.check_output(['node','-e','const fs=require("fs"),p=require("path"),c=require("crypto");const d=process.argv[1];console.log(JSON.stringify(fs.readdirSync(d).filter(n=>n.startsWith("TEST_")).map(n=>c.createHash("sha256").update(JSON.stringify(JSON.parse(fs.readFileSync(p.join(d,n))))).digest("hex"))))',str(fixtures)],text=True))
adapter="""
// Q1.09f: lexical adapter only. Never replace the origin's global Storage APIs.
const TEST_STORAGE_PREFIX='hansefuerst-q109f-v1-';
const localStorage=(()=>{
 const check=key=>{if(typeof key!=='string'||!key.startsWith(TEST_STORAGE_PREFIX))throw Error('TEST-Speichergrenze: fremder Schlüssel verweigert');return key};
 return Object.freeze({
  getItem:key=>window.localStorage.getItem(check(key)),
  setItem:(key,value)=>window.localStorage.setItem(check(key),value),
  removeItem:key=>window.localStorage.removeItem(check(key))
 });
})();
const TEST_SYNTHETIC_FIXTURES="""+json.dumps(canon)+""";
function testSyntheticState(x){return !!x&&typeof x.name==='string'&&x.name.startsWith('TEST ')&&(x.flags?.q109fSynthetic===true||TEST_SYNTHETIC_FIXTURES.includes(safetyDigest(JSON.stringify(x))))}
"""
patch("'use strict';","'use strict';\n"+adapter,'Closed lexical LocalStorage gate; no origin-wide enumeration; synthetic input gate')
for old,new in [
 ('hansefuerst-v04','hansefuerst-q109f-v1-legacy-v04'),
 ('hansefuerst-v04-safety1','hansefuerst-q109f-v1-legacy-safety1'),
 ('hansefuerst-v04-safety3','hansefuerst-q109f-v1-save'),
 ('hansefuerst-v03','hansefuerst-q109f-v1-legacy-v03'),
 ('hansefuerst-v01','hansefuerst-q109f-v1-legacy-v01'),
 ('hansefuerst-local-safety3','hansefuerst-q109f-v1-database'),
 ('hansefuerst-safety1-writer','hansefuerst-q109f-v1-writer'),
 ('hansefuerst-news-seen','hansefuerst-q109f-v1-news'),
 ('hansefuerst-test-v1-','hansefuerst-q109f-v1-log-'),
]:patch("'"+old+"'","'"+new+"'",'Separate identifier '+old)
patch("contains('game')","contains('q109f-game')",'Separate object store existence check')
patch("createObjectStore('game')","createObjectStore('q109f-game')",'Separate object store creation')
patch("db.transaction('game',","db.transaction('q109f-game',",'Separate object store transaction')
patch("tx.objectStore('game')","tx.objectStore('q109f-game')",'Separate object store reference')
patch("store.get('active')","store.get('q109f-active')",'Separate canonical key read')
patch("store.put(bytes,'active')","store.put(bytes,'q109f-active')",'Separate canonical key write')
patch("function startOriginal(){if(SafetySession.expected!==null)return {key:KEY,raw:SafetySession.expected};for(const key of [PRIORSAFETYKEY,LEGACYKEY,PREVIOUS,OLD]){const raw=localStorage.getItem(key);if(raw!==null)return {key,raw}}return {key:KEY,raw:null}}", "function startOriginal(){return {key:KEY,raw:SafetySession.expected}}",'No legacy LocalStorage lookup or automatic first import')
old="if(original.key!==KEY){safetyBackupRaw(original.raw,original.key===PRIORSAFETYKEY?'safety-original':'v13-original');s=safetyUpgrade(x,'unknown',original.raw);}else if(x.politics.safety.version<3||!Object.hasOwn(x.politics.safety,'legacyPersonalJobs')){safetyBackupRaw(original.raw,'safety-original');s=safetyUpgrade(x,'unknown',original.raw);}else s=x;"
new="if(parsed.flags?.q109fSynthetic!==true||x.politics.version!==2||x.politics.safety.version!==3||!Object.hasOwn(x.politics.safety,'legacyPersonalJobs'))throw Error('Nur eigene aktuelle TEST-Partie laden; synthetische Altdatei ausdrücklich importieren');s=x;"
patch(old,new,'No automatic startup migration, only current marked canonical test state')
old="function safetyOriginalText(){const raw=localStorage.getItem(KEY+'-v13-original')??localStorage.getItem(KEY+'-import-original')??localStorage.getItem(PRIORSAFETYKEY+'-v13-original')??localStorage.getItem(PRIORSAFETYKEY+'-import-original')??localStorage.getItem(LEGACYKEY)??localStorage.getItem(KEY+'-safety-original');if(raw===null)throw Error('Keine ursprüngliche Übernahme vorhanden');return raw;}"
new="function safetyOriginalText(){const raw=localStorage.getItem(KEY+'-import-original')??localStorage.getItem(KEY+'-safety-original');if(raw===null)throw Error('Keine ursprüngliche TEST-Übernahme vorhanden');return raw;}"
patch(old,new,'Original export restricted to own explicit test-import backups')
patch("function migrate(raw){return migrateInformation(raw)}","function migrate(raw){if(!testSyntheticState(raw))return null;const x=migrateInformation(raw);if(x){x.flags??={};x.flags.q109fSynthetic=true}return x}",'Only five pinned synthetic fixtures or marked own test exports; marker is not a security signature')
patch("const x=fresh(player,name.trim());","const x=fresh(player,name.trim().startsWith('TEST ')?name.trim():'TEST '+name.trim());x.flags.q109fSynthetic=true;",'Mark synthetic new games without changing economy/RNG')
patch('for(const k of Object.keys(localStorage))if(k.startsWith(PREFIX))','for(const k of [CONSENT,KEYLOG])if(k.startsWith(PREFIX))','Delete current test-log session only; never enumerate origin storage')
patch('for(const k of Object.keys(localStorage))if(k.startsWith(PREFIX+\'session-\'))','for(const k of [KEYLOG])if(k.startsWith(PREFIX+\'session-\'))','Export current test-log session only; no origin storage enumeration')
patch('Alle lokalen Testaufzeichnungen löschen und Aufzeichnung ausschalten?','Aktuelle TEST-Aufzeichnung löschen und Aufzeichnung ausschalten?','Accurate current-session log deletion text')
patch('Testdaten löschen</button>','Aktuelle TEST-Aufzeichnung löschen</button>','Accurate current-session log deletion button')
for old,new in [('hansefuerst-original-erstuebernahme.json','hansefuerst-TEST-Q1_09f-original.json'),('hansefuerst-spielstand.json','hansefuerst-TEST-Q1_09f-spielstand.json'),('hansefuerst-testauswertung-','hansefuerst-TEST-Q1_09f-auswertung-')]:patch(old,new,'Separate download name '+old)
patch('<title>','<title>HANSEFÜRST – TESTVERSION Q1.09f · ','Visible test title')
patch('<h1>⚓ Hansefürst <small','<h1>⚓ HANSEFÜRST – TESTVERSION <small','Visible test header')
patch('<main class="wrap">','<main class="wrap"><aside id="q109fTestNotice" class="card"><strong>HANSEFÜRST – TESTVERSION Q1.09f</strong><p>Nur synthetische Testpartien. Eigener Speicher-Namensraum, keine automatische Übernahme. Produktive Partien bleiben unangetastet. Dieselbe Origin ist keine Sicherheitsgrenze. Testexporte extern sichern; zum Beenden einfach diesen Testtab schließen.</p></aside>','Permanent test notice')
patch('V11-/V12-/V13-Originale werden auf Kopie übernommen.','Nur die fünf freigegebenen synthetischen V13-Dateien oder eigene markierte TEST-Exporte ausdrücklich importieren.','Accurate test-only import description')
patch('Die alte Speicheradresse bleibt unangetastet.','Produktive Speicheradressen werden nicht gelesen oder verändert.','Accurate test storage description')
patch('Frühere LocalStorage-Partien bleiben unveränderte Quellen und Sicherungen.','Keine Suche nach früheren Partien. Sicherungen entstehen ausschließlich im TEST-Namensraum; die freiwillige Aufzeichnung umfasst nur die aktuelle Testsitzung.','No misleading legacy auto-migration or log-history claim')
# All changes are invertible, audited literal replacements; no unlisted code/asset edits.
reverse=text
for p in reversed(patches):
 assert reverse.count(p['after'])==p['count'],p['reason']
 reverse=reverse.replace(p['after'],p['before'])
assert reverse.encode()==raw
assert 'Object.keys(localStorage)' not in text
DEST.parent.mkdir(parents=True,exist_ok=True);DEST.write_bytes(text.encode())
audit={'date':'2026-10-31 Europe/Berlin','baseCommit':'8a278d90b989d14ec1520b2184ee169385919818','originalGameCommit':'c7201c089dbb8079c0b5a5e3e1728b5b0888f49e','sourceSHA256':EXPECTED,'testCopySHA256':sha(text),'testCopyBytes':len(text.encode()),'sourceUnchanged':SOURCE.read_bytes()==raw,'inversePatchesRecoverEntireOriginal':True,'patches':patches}
(ROOT/'deployment/q1_09f/patch-audit.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({k:v for k,v in audit.items() if k!='patches'},indent=2));print('Audited patches:',len(patches))
