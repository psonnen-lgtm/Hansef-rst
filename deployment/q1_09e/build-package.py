"""Build only five static allowlisted files, with no network/deployment/server."""
from pathlib import Path
import argparse, csv, hashlib, io, json, re, shutil, zipfile

ROOT = Path(__file__).resolve().parents[2]
GAME = 'c7201c089dbb8079c0b5a5e3e1728b5b0888f49e'
BASE = 'ebad74f02307d596cdaa4f05b02142626d9041d9'
EXPECTED = {
    'Hansefuerst_0_4.html': '50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048',
    'tests/safety/q1_09d/Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip': '9568fc76954bd5decbc2b26a95180b509da72fd0a85d1856ee6292f4a959f8fb',
    'tests/safety/q1_09d/geraete-ergebnisse.csv': '8022155d0e72ee6d7507f7c45ffdda9ddafbecc57ec652c27c950c12aa4951fa',
}
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', required=True, type=Path, help='NEW directory; never replace old data')
args = parser.parse_args()
output = args.output.resolve()
if output.exists():
    raise SystemExit('Output exists: choose a new directory. Nothing overwritten.')

def sha(data):
    return hashlib.sha256(data).hexdigest()

for name, expected in EXPECTED.items():
    if sha((ROOT / name).read_bytes()) != expected:
        raise SystemExit('Pinned source mismatch: ' + name)
entries = {
    'Hansefuerst_0_4.html': ROOT / 'Hansefuerst_0_4.html',
    'index.html': ROOT / 'deployment/q1_09e/site/index.html',
    'geraeteabnahme.html': ROOT / 'deployment/q1_09e/site/geraeteabnahme.html',
    'Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip': ROOT / 'tests/safety/q1_09d/Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip',
    'geraete-ergebnisse.csv': ROOT / 'tests/safety/q1_09d/geraete-ergebnisse.csv',
}
site = output / 'site'
site.mkdir(parents=True)
files = []
for name, source in sorted(entries.items()):
    target = site / name
    shutil.copyfile(source, target)
    data = target.read_bytes()
    assert data == source.read_bytes()
    files.append({'file': name, 'bytes': len(data), 'sha256': sha(data)})
assert {p.name for p in site.iterdir()} == set(entries)
local_links = 0
for name in ['index.html', 'geraeteabnahme.html']:
    html = (site / name).read_text()
    assert 'HANSEFÜRST – TESTVERSION Q1.09c' in html
    assert not re.search(r'<(?:script|iframe|form)\b|http-equiv\s*=\s*[\"\']refresh', html, re.I)
    for link in re.findall(r'href="([^"]+)"', html):
        if link.startswith('https:'):
            continue
        assert link in entries, 'Missing static link: ' + link
        local_links += 1
with (site / 'geraete-ergebnisse.csv').open(encoding='utf-8-sig', newline='') as stream:
    rows = list(csv.DictReader(stream))
assert len(rows) == 42
assert all(r['Status'] == 'Nicht getestet' and not r['Tatsächliches Ergebnis'] for r in rows)
with zipfile.ZipFile(site / 'Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip') as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == 7
archive_path = output / 'HANSEFUERST_Q1_09e_NETLIFY_UPLOAD.zip'
with zipfile.ZipFile(archive_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for name in sorted(entries):
        info = zipfile.ZipInfo(name, date_time=(2026, 10, 30, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, (site / name).read_bytes())
with zipfile.ZipFile(archive_path) as archive:
    assert set(archive.namelist()) == set(entries) and archive.testzip() is None
    assert all(archive.read(name) == (site / name).read_bytes() for name in entries)
proof = {
    'date': '2026-10-30 Europe/Berlin', 'preparedFromCommit': BASE,
    'testedGameCommit': GAME, 'gameByteIdentical': True,
    'files': files, 'publishedFilesIfDeployed': len(entries),
    'staticLocalLinksChecked': local_links, 'deviceRowsNotTested': len(rows),
    'uploadZIP': {'file': archive_path.name, 'bytes': archive_path.stat().st_size, 'sha256': sha(archive_path.read_bytes()), 'allFiveFilesByteIdentical': True},
    'websiteDeployed': False, 'onlineGameTestsPerformed': 0,
    'netlifyFreePlanVerified': False, 'automaticTopUpVerifiedDisabled': False,
    'buildRequiresNetwork': False, 'buildDeploysAnything': False,
}
(output / 'package-manifest.json').write_text(json.dumps(proof, indent=2) + '\n')
print(json.dumps(proof, indent=2))
