"""Read-only artifact checks plus a new result JSON; no game/test suite execution."""
from pathlib import Path
import argparse, csv, hashlib, json, re, subprocess, zipfile

ROOT = Path(__file__).resolve().parents[3]
BASE = 'be3f367ac1374cf6ca3525e34be44d51f0eaf24b'
CODE = 'c7201c089dbb8079c0b5a5e3e1728b5b0888f49e'
HASH = '50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048'
FOLDER = ROOT / 'tests/safety/q1_09d'
OUTPUT = FOLDER / 'results/package-verification.json'
parser = argparse.ArgumentParser()
parser.add_argument('--repro-a', type=Path)
parser.add_argument('--repro-b', type=Path)
args = parser.parse_args()
assert bool(args.repro_a) == bool(args.repro_b), 'Specify both reproducibility directories or neither'

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)

def sha(data):
    return hashlib.sha256(data).hexdigest()

assert git('branch', '--show-current').decode().strip() == 'test/q1-09d-ios-acceptance-preparation'
html = (ROOT / 'Hansefuerst_0_4.html').read_bytes()
assert sha(html) == HASH and len(html) == 46389124
assert git('log', '-1', '--format=%H', '--', 'Hansefuerst_0_4.html').decode().strip() == CODE
originals = git('ls-tree', '-r', '--full-tree', BASE).decode().splitlines()
changed = []
for line in originals:
    header, name = line.split('\t', 1)
    mode, kind, oid = header.split()
    if kind != 'blob':
        continue
    current = ROOT / name
    assert current.is_file(), 'Missing old file: ' + name
    if git('hash-object', '--', name).decode().strip() != oid:
        changed.append(name)
        assert name == 'docs/entwicklungsberichte/README.md', 'Old file changed: ' + name
        previous = git('show', BASE + ':' + name)
        assert current.read_bytes().startswith(previous), 'Index must be append-only'
assert changed == ['docs/entwicklungsberichte/README.md']
old_names = {line.split('\t', 1)[1] for line in originals}
current_names = set(git('ls-files', '-z').decode().rstrip('\0').split('\0'))
current_names.update(git('ls-files', '--others', '--exclude-standard', '-z').decode().rstrip('\0').split('\0'))
for name in current_names - old_names - {''}:
    assert name.startswith(('docs/entwicklungsberichte/Q1_09d/', 'tests/safety/q1_09d/')), 'Unexpected new file: ' + name

manifest = json.loads((FOLDER / 'fixtures/manifest.json').read_text())
assert manifest['syntheticOnly'] and len(manifest['files']) == 5
assert manifest['gameSHA256'] == HASH and manifest['testedGameCommit'] == CODE
for meta in manifest['files']:
    raw = (FOLDER / 'fixtures' / meta['file']).read_bytes()
    assert sha(raw) == meta['sha256']
    data = json.loads(raw)
    assert data['v'] == 13 and data['name'].startswith('TEST ')
    assert any('SYNTHETISCHE TESTDATEN' in item for item in data['messages'])
    if args.repro_a is not None:
        assert raw == (args.repro_a / meta['file']).read_bytes(), 'Generator nondeterminism'
        assert raw == (args.repro_b / meta['file']).read_bytes(), 'Generator nondeterminism'
with zipfile.ZipFile(FOLDER / 'Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip') as archive:
    expected = {p.name: p.read_bytes() for p in (FOLDER / 'fixtures').glob('*.json')}
    expected['TESTDATEN_KURZINFO.txt'] = (FOLDER / 'TESTDATEN_KURZINFO.txt').read_bytes()
    assert set(archive.namelist()) == set(expected)
    assert all(archive.read(name) == data for name, data in expected.items())
    assert archive.testzip() is None
    zip_members = len(expected)

validation = json.loads((FOLDER / 'results/fixture-validation.json').read_text())
assert validation['passed'] and len(validation['cases']) == 5
assert validation['testedGameCommit'] == CODE and validation['gameSHA256'] == HASH
assert {r['file'] for r in validation['cases']} == {r['file'] for r in manifest['files']}
assert all(r['status'] == 'PASS' for r in validation['cases'])
with (FOLDER / 'geraete-ergebnisse.csv').open(encoding='utf-8-sig', newline='') as f:
    rows = list(csv.DictReader(f))
assert len(rows) == 42
assert {row['Gerät'] for row in rows} == {'iPhone', 'iPad'}
assert len({(row['Gerät'], row['Testschritt']) for row in rows}) == 42
assert all(row['Status'] == 'Nicht getestet' and not row['Tatsächliches Ergebnis'] for row in rows)

reports = sorted((ROOT / 'docs/entwicklungsberichte/Q1_09d').glob('*.md'))
assert len(reports) == 4
links = 0
for report in reports + [FOLDER / 'README.md']:
    for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', report.read_text()):
        if target.startswith(('https:', 'http:', '#')):
            continue
        path = (report.parent / target.split('#')[0]).resolve()
        assert path.is_file() or path == OUTPUT, f'Missing link {report.name}: {target}'
        links += 1
landing = (FOLDER / 'site/index.html').read_text()
assert '<script' not in landing.lower() and '<iframe' not in landing.lower()
assert '<form' not in landing.lower() and 'http-equiv="refresh"' not in landing.lower()
assert all(name in landing for name in ['Hansefuerst_0_4.html', 'Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip', 'geraete-ergebnisse.csv'])
for script in ['prepare-fixtures.cjs', 'check-fixtures.cjs']:
    subprocess.run(['node', '--check', str(FOLDER / script)], check=True)
subprocess.run(['git', 'diff', '--check', BASE], cwd=ROOT, check=True)
proof = {
    'date': '2026-10-30 Europe/Berlin', 'baseCommit': BASE,
    'testedGameCommit': CODE, 'gameSHA256': HASH, 'gameBytes': len(html),
    'oldTrackedEntriesChecked': len(originals), 'oldFilesChangedOnly': changed,
    'indexAppendOnly': True, 'gameAndOldTestsResultsPagesUnchanged': True,
    'syntheticFixtures': 5, 'generatorOutputFilesReproducible': True if args.repro_a else 'NOT_REPEATED',
    'newVMFixtureCasesPassed': 5, 'zipMembersChecked': zip_members,
    'deviceRowsAllNotTested': len(rows), 'relativeLinksChecked': links,
    'reports': len(reports), 'websiteDeployed': False, 'serverStarted': False,
    'nativeBrowserTestsRerun': 0, 'realAppleDevicesTested': 0,
    'codeSyntaxChecks': 2, 'diffCheck': True,
    'scopeValid': True,
    'initialStaticCheckCorrection': 'First run stopped at its own not-yet-created result link; checker now permits only its specific upcoming output path, all other links must already exist.',
}
OUTPUT.write_text(json.dumps(proof, indent=2) + '\n')
print(json.dumps(proof, indent=2))
