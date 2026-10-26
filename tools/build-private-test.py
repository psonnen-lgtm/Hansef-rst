"""Package the reviewed, unchanged 0.8a game for phase 0.8b. Never publishes or changes settings."""
from pathlib import Path,PurePosixPath
import argparse,base64,hashlib,json,re,zipfile
root=Path(__file__).resolve().parents[1]
cli=argparse.ArgumentParser()
cli.add_argument('--directory',default='build/phase08b-preview')
cli.add_argument('--zip',dest='archive',default='releases/hansefuerst-0.8b-testpaket.zip')
a=cli.parse_args();target=(root/a.directory).resolve();archive=(root/a.archive).resolve()
assert target.is_relative_to(root) and archive.is_relative_to(root)
assert not target.exists(),target
assert not archive.exists(),archive
sha=lambda b:hashlib.sha256(b).hexdigest()
canonical=(root/'Hansefuerst_0_4.html').read_bytes();source=root/'releases/hansefuerst-0.8a-assets.zip'
with zipfile.ZipFile(source) as z:
    assert z.testzip() is None
    old=json.loads(z.read('MANIFEST.json'))
    assert old['canonicalHTMLSHA256']==sha(canonical),'Reviewed source package does not match current game; do not publish a stale game.'
    assert all(not PurePosixPath(n).is_absolute() and '..' not in PurePosixPath(n).parts and '\\' not in n for n in z.namelist())
    site={name:z.read(name) for name in old['files']}
    for name,meta in old['files'].items():assert len(site[name])==meta['bytes'] and sha(site[name])==meta['sha256'],name
    site['MANIFEST.json']=z.read('MANIFEST.json')
assert re.search(rb'<script>([\s\S]*?)</script>',canonical)[1]==re.search(rb'<script>([\s\S]*?)</script>',site['Hansefuerst_0_4.html'])[1]
assert re.search(rb'<style>([\s\S]*?)</style>',canonical)[1]==re.search(rb'<style>([\s\S]*?)</style>',site['Hansefuerst_0_4.html'])[1]
catalog=json.loads((root/'assets/cities/city-assets.json').read_text())
for name,file in catalog.items():
    encoded=re.search(rb'<img data-city-art="'+name.encode()+rb'" src="data:image/webp;base64,([^"]+)">',canonical)
    assert encoded and base64.b64decode(encoded[1])==site[file],name
content=root/'deployment/phase08b/site';expected={'index.html','kurzanleitung.html','spielstand-sichern.html','feedback.html','feedback-vorlage.txt','test.css'}
assert {f.name for f in content.iterdir()}==expected,'Only reviewed static guide files may be packaged.'
for name in sorted(expected):assert name not in site;site[name]=(content/name).read_bytes()
site['.nojekyll']=b''
meta={'distributionVersion':'0.8b','gameRelease':'0.8a','saveVersion':11,'scope':'static package preparation only; this builder performs no publication','canonicalHTMLSHA256':sha(canonical),'gameHTMLSHA256':sha(site['Hansefuerst_0_4.html']),'sourceArchive':'hansefuerst-0.8a-assets.zip','sourceArchiveSHA256':sha(source.read_bytes()),'sameGameScript':True,'sameGameCSS':True,'cities':old['cities'],'files':{name:{'bytes':len(data),'sha256':sha(data)} for name,data in sorted(site.items())}}
site['TESTPAKET.json']=(json.dumps(meta,ensure_ascii=False,indent=2)+'\n').encode()
files={'hansefuerst-0.8b/'+name:data for name,data in site.items()}
files['START_TEST.py']=(root/'deployment/phase08b/START_TEST.py').read_bytes()
files['LIESMICH.txt']='''Hansefürst – begleitetes Testpaket 0.8b (unverändertes Spiel 0.8a, V11)

ZIP vollständig entpacken. Der Ordner hansefuerst-0.8b bleibt zusammen.
Kein öffentlicher Host wird dadurch eingerichtet. Keine Accounts oder Cloud.

PC mit vorhandenem Python 3: im entpackten Ordner
  python START_TEST.py
(je nach System python3 oder py -3). Ein Browser öffnet die lokale Startseite.
Nur dieser PC ist standardmäßig erreichbar; mit Strg+C beenden.

iPhone/iPad im gleichen vertrauenswürdigen Heimnetz:
PC-Netzwerkeinstellungen: eigene private IPv4-Adresse nachsehen, z.B. 192.168.178.20.
  python START_TEST.py --lan 192.168.178.20
Dann auf dem Gerät http://192.168.178.20:8000/ in Safari öffnen.
Keine Router-/Internetfreigabe einrichten. PC eingeschaltet lassen; Firewall kann
Zugriff im privaten Netz verlangen. Dies ist ein lokaler Test, keine Internetseite.

Ohne Python: Das Paket ist auch für einen statischen Host vorbereitet. Öffentliche
GitHub-Pages-Bereitstellung ist noch NICHT freigegeben/aktiviert. Die beiliegenden
HTML-Dateien allein sind keine Garantie für funktionierende iOS-Dateivorschau.

Vor Datei-, Adress- oder Gerätewechsel die bisherige Partie im Spiel exportieren.
Sicherungsdateien und ausgefüllte Fragebögen außerhalb dieses Paketordners ablegen.
Einen normalen Browser-Tab verwenden. Ein Unterordner derselben Website ist kein
eigener Spielstand; ein anderer Ursprung/Browser/Gerät kann getrennte Daten führen.
Bei Speicherwarnung vor Neuladen/Schließen unbedingt die aktuelle Partie exportieren.

Startseite: hansefuerst-0.8b/index.html (über den lokalen Server öffnen).
Dort: kurzer erster Törn, Geräte-Sicherungsanleitung, Fragebogen als Textdatei.
Echte iPhone-/iPad-/Safari-Prüfung und Dateiexport/-import sind noch am Gerät nötig.
'''.encode()
target.mkdir(parents=True)
for name,data in files.items():
    p=target/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
archive.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(archive,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for name,data in sorted(files.items()):
        info=zipfile.ZipInfo(name,date_time=(2026,10,26,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,data)
print(json.dumps({'directory':str(target.relative_to(root)),'siteDirectory':str((target/'hansefuerst-0.8b').relative_to(root)),'zip':str(archive.relative_to(root)),'standaloneBytes':len(canonical),'gameHTMLBytes':len(site['Hansefuerst_0_4.html']),'siteBytes':sum(map(len,site.values())),'totalBytes':sum(map(len,files.values())),'zipBytes':archive.stat().st_size,'zipSHA256':sha(archive.read_bytes()),'canonicalHTMLSHA256':sha(canonical),'gameHTMLSHA256':sha(site['Hansefuerst_0_4.html']),'cities':len(meta['cities']),'publicDeploymentPerformed':False},indent=2))
