"""Optional local static preview, standard library only. Never serves personal backup files."""
import argparse,hashlib,ipaddress,json,sys,threading,webbrowser
from pathlib import Path,PurePosixPath
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from urllib.parse import unquote,urlsplit

def main():
    if sys.version_info<(3,9):sys.exit('Für den lokalen Helfer ist Python 3.9 oder neuer nötig.')
    cli=argparse.ArgumentParser(description='Hansefürst lokal öffnen; kein öffentlicher Host und kein Upload.')
    cli.add_argument('--lan',metavar='PRIVATE_PC_IP',help='Optional: eigene private IPv4 des PCs für dasselbe Heimnetz. Kein 0.0.0.0, keine öffentliche Adresse.')
    cli.add_argument('--port',type=int,default=8000)
    cli.add_argument('--no-browser',action='store_true')
    args=cli.parse_args();host='127.0.0.1'
    if not 1024<=args.port<=65535:cli.error('Port muss zwischen 1024 und 65535 liegen.')
    if args.lan:
        try:address=ipaddress.IPv4Address(args.lan)
        except ipaddress.AddressValueError:cli.error('Bitte die eigene private IPv4 des PCs angeben.')
        if not any(address in ipaddress.IPv4Network(n) for n in ['10.0.0.0/8','172.16.0.0/12','192.168.0.0/16']):cli.error('Nur eine private Heimnetzadresse ist erlaubt; keine öffentliche oder globale Bindung.')
        host=str(address)
    site=Path(__file__).resolve().parent/'hansefuerst-0.8b'
    try:
        manifest=json.loads((site/'TESTPAKET.json').read_text());allowed=set(manifest['files'])|{'TESTPAKET.json'}
        for name,meta in manifest['files'].items():
            p=(site/name).resolve();assert p.is_relative_to(site.resolve()) and p.is_file()
            data=p.read_bytes();assert len(data)==meta['bytes'] and hashlib.sha256(data).hexdigest()==meta['sha256'],name
    except Exception as exc:sys.exit('Paket unvollständig oder verändert. Frisches ZIP vollständig entpacken. '+str(exc))
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self,*a,**kw):super().__init__(*a,directory=str(site),**kw)
        def public_name(self):
            path=unquote(urlsplit(self.path).path).replace('\\','/')
            if '\x00' in path or '..' in PurePosixPath(path).parts:return None
            if path.endswith('/'):path+='index.html'
            name=path.lstrip('/')
            return name if name in allowed else None
        def translate_path(self,path):
            name=self.public_name()
            resolved=(site/name).resolve() if name else site/'__not_public__'
            return str(resolved) if resolved.is_relative_to(site.resolve()) else str(site/'__not_public__')
        def do_GET(self):
            if self.public_name() is None:self.send_error(404);return
            super().do_GET()
        def do_HEAD(self):
            if self.public_name() is None:self.send_error(404);return
            super().do_HEAD()
        def do_POST(self):self.send_error(405,'Dieser statische Testserver nimmt keine Daten an.')
        def list_directory(self,path):self.send_error(404);return None
    try:server=ThreadingHTTPServer((host,args.port),Handler)
    except OSError as exc:sys.exit('Testserver konnte nicht starten. Eigene PC-Adresse/Port prüfen: '+str(exc))
    url='http://'+host+':'+str(args.port)+'/'
    print('Hansefürst-Testpaket: '+url,flush=True)
    print('Nur statische Paketdateien. Spielstände bleiben im Browser. Mit Strg+C beenden.',flush=True)
    if args.lan:print('Nur im vertrauenswürdigen Heimnetz nutzen, keine Router-/Internetfreigabe einrichten.',flush=True)
    if not args.no_browser:threading.Timer(.3,lambda:webbrowser.open(url)).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
if __name__=='__main__':main()
