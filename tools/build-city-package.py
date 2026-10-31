"""Additional static asset package. Canonical standalone HTML is never replaced."""
from pathlib import Path
import argparse,base64,hashlib,json,re,zipfile
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--directory',default='build/hansefuerst-0.8a-package')
parser.add_argument('--zip',dest='archive',default='releases/hansefuerst-0.8a-assets.zip')
args=parser.parse_args()
target=(root/args.directory).resolve();archive=(root/args.archive).resolve()
assert target.is_relative_to(root) and archive.is_relative_to(root)
assert not target.exists(),target
assert not archive.exists(),archive
catalog=json.loads((root/'assets/cities/city-assets.json').read_text())
html=(root/'Hansefuerst_0_4.html').read_text();canonical=html;sha=lambda b:hashlib.sha256(b).hexdigest()
def replace(match):
    name=match[1];data=base64.b64decode(match[2]);assert data==(root/catalog[name]).read_bytes()
    return '<img data-city-art="'+name+'" src="'+catalog[name]+'">'
html,count=re.subn(r'<img data-city-art="([^"]+)" src="data:image/webp;base64,([^"]+)">',replace,html)
assert count==len(catalog)
assert re.search(r'<script>([\s\S]*?)</script>',html)[1]==re.search(r'<script>([\s\S]*?)</script>',canonical)[1]
target.mkdir(parents=True)
files={'Hansefuerst_0_4.html':html.encode()}
for file in catalog.values():files[file]=(root/file).read_bytes()
files['BITTE_LESEN.txt']='''Hansefürst 0.8a – zusätzliches Grafikpaket

Das ZIP vollständig entpacken. Hansefuerst_0_4.html und den Ordner assets zusammenlassen.
Das HTML verwendet relative lokale Bilder und benötigt dafür keinen externen Dienst.
Die bisherige vollständige Einzeldatei bleibt als Alternative erhalten.

WICHTIG FÜR VORHANDENE PARTIEN:
Vor Wechsel der Datei, Adresse, des Browsers oder Geräts den Spielstand exportieren.
Dann bei Bedarf in der anderen Ausgabe importieren. Browser teilen lokale Daten nicht
zuverlässig zwischen verschiedenen Dateipfaden oder Ursprüngen. Keine Accounts oder
automatische Übertragung; Speicherformat V11 und Speicherregeln bleiben unverändert.

Desktopbrowser können lokale Ordner-HTML je nach Richtlinie öffnen. iPhone/iPad und
Safari-Dateivorschau sind nicht auf echten Geräten abgenommen. Die Codex-Cloud sperrt
file:// administrativ; dort wurde das Paket über HTTP geprüft. Für den einfachen
gemeinsamen Gerätetest eignet sich eine unveränderte Bereitstellung des ganzen Ordners
unter einer festen Webadresse; die Ausgabe enthält keine Onlinedienstabhängigkeit.
Die lokale Datei-/Offlinebedienung auf dem eigenen Gerät muss zuvor geprüft werden.
'''.encode()
manifest={'scope':'additional static HTML plus relative image files; canonical standalone retained','canonicalHTMLSHA256':sha(canonical.encode()),'packageHTMLSHA256':sha(html.encode()),'sameGameScript':True,'saveVersion':11,'cities':[{k:c[k] for k in ['city','id','name']} for c in json.loads((root/'assets/cities/city-layouts.json').read_text())],'files':{p:{'bytes':len(data),'sha256':sha(data)} for p,data in files.items()}}
files['MANIFEST.json']=(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n').encode()
for name,data in files.items():
    p=target/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
archive.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(archive,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for name,data in sorted(files.items()):
        info=zipfile.ZipInfo(name,date_time=(2026,10,25,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,data)
print(json.dumps({'directory':str(target.relative_to(root)),'zip':str(archive.relative_to(root)),'standaloneBytes':len(canonical.encode()),'packageHTMLBytes':len(html.encode()),'packageTotalBytes':sum(map(len,files.values())),'zipBytes':archive.stat().st_size,'zipSHA256':sha(archive.read_bytes()),'cities':len(manifest['cities'])},indent=2))
