#!/usr/bin/env python3
"""Read-only scope, formula and history audit. Writes only a NEW requested result."""
from pathlib import Path
import subprocess, json, re, hashlib, sys

root = Path(__file__).resolve().parents[3]
out = Path(sys.argv[1])
assert not out.exists(), 'Use a new result path'
def git(*args):
    return subprocess.check_output(['git', *args], cwd=root)
def digest(data):
    return hashlib.sha256(data).hexdigest()

base = 'ff92ce60d1c384a13313e37ba2b3954cf38e793b'
game = (root/'Hansefuerst_0_4.html').read_bytes()
original = git('show', base+':Hansefuerst_0_4.html')
audit = json.loads((root/'tests/features/q1_10b/source-audit.json').read_text())
assert audit['baseCommit'] == base
assert digest(original) == audit['baseSHA256']
reversed_text = game.decode()
for patch in reversed(audit['patches']):
    assert reversed_text.count(patch['after']) == patch['count'], patch['label']
    reversed_text = reversed_text.replace(patch['after'], patch['before'])
assert reversed_text.encode() == original, 'Unscoped game or asset changes'

before = re.findall(r'<script[^>]*>([\s\S]*?)</script>', original.decode())[0]
after = re.findall(r'<script[^>]*>([\s\S]*?)</script>', game.decode())[0]
def function_source(js, name):
    lines = js.splitlines(keepends=True)
    start = next(i for i, line in enumerate(lines) if line.startswith(('function '+name+'(', 'async function '+name+'(')))
    if lines[start].rstrip().endswith('}'):
        return lines[start]
    end = next(i for i in range(start+1,len(lines)) if lines[i].rstrip() == '}')
    return ''.join(lines[start:end+1])

unchanged = ['makeShip','fresh','initialMarkets','routeHandlingDays','routeTravelDays',
             'dailyMarketPrice','regionalPrice','regionalStock','regionalMarketDay',
             'advance','rollTravel','donationGain','creditLimit','securityWorth',
             'warehouseRentDay','politicalRecord','politicalSupplyPending',
             'completePoliticalSupply','validateSafety','validateLegacySafety',
             'safetyUpgrade','safetyRun','safetyRetryPlan','partyInitialize',
             'partyImportCommit','partyDelete','partyActivate','safetyWriteCanonical']
function_hashes = {}
for name in unchanged:
    old, new = function_source(before,name), function_source(after,name)
    assert old == new, name+' changed unexpectedly'
    function_hashes[name] = digest(new.encode())

entries = [line.split('\t',1) for line in git('ls-tree','-r',base).decode().splitlines()]
tree = [name for _, name in entries]
assert all('\n' not in name and not name.startswith('"') for name in tree)
actual_hashes = subprocess.check_output(['git','hash-object','--stdin-paths'],
                                      input=('\n'.join(tree)+'\n').encode(), cwd=root).decode().splitlines()
assert len(actual_hashes) == len(entries)
modified = []
for (entry, name), actual in zip(entries, actual_hashes):
    local = root/name
    assert local.is_file(), 'Old file missing: '+name
    # Git blob hashing compares all old files without copying historical datasets to memory.
    expected = entry.split()[2]
    if actual != expected:
        modified.append(name)
assert sorted(modified) == ['Hansefuerst_0_4.html','docs/entwicklungsberichte/README.md'],modified
index_before = git('show',base+':docs/entwicklungsberichte/README.md')
assert (root/'docs/entwicklungsberichte/README.md').read_bytes().startswith(index_before)
assert git('merge-base',base,'HEAD').decode().strip() == base
assert not git('rev-list','--merges',base+'..HEAD').strip()
status = git('status','--porcelain','--untracked-files=all').decode().splitlines()
for line in status:
    name = line[3:]
    assert name == 'docs/entwicklungsberichte/README.md' or name.startswith(('docs/entwicklungsberichte/Q1_10b/','tests/features/q1_10b/')), line

reports = sorted((root/'docs/entwicklungsberichte/Q1_10b').glob('*.md'))
code_commit = git('log','-1','--format=%H','--','Hansefuerst_0_4.html').decode().strip()
links = 0
for report in reports:
    text = report.read_text()
    if report.name != 'Q1_10b_bestandsaufnahme.md':
        assert code_commit in text and digest(game) in text, report.name
    for target in re.findall(r'\]\(([^)]+)\)',text):
        if '://' in target or target.startswith('#'): continue
        linked = report.parent/target.split('#')[0]
        assert linked.exists() or linked.resolve() == out.resolve(), (report.name,target)
        links += 1

result = dict(date='2026-11-07 Europe/Berlin',baseCommit=base,testedGameCommit=code_commit,
              gameSHA256=digest(game),gameBytes=len(game),scopePatches=len(audit['patches']),
              inverseReconstructsBaseExactly=True,oldFilesCompared=len(tree),oldFilesChanged=modified,
              historicalTestsResultsAndAssetsUnchanged=True,unchangedFunctionHashes=function_hashes,
              reports=len(reports),relativeReportLinksChecked=links,noMerge=True,
              largeSimulationExecuted=False,realUserFilesUsed=False,passed=True)
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='unchangedFunctionHashes'},ensure_ascii=False))
