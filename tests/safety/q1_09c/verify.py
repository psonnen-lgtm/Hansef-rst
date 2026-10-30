"""Scope/provenance checks only. Does not run game actions or simulations."""
from pathlib import Path
import csv, hashlib, json, re, subprocess

ROOT = Path(__file__).resolve().parents[3]
PHASE = ROOT / "tests/safety/q1_09c"
BASE = "afb2bc9ce5496ecfcd8a5a17da1301825262f438"
CODE = "c7201c089dbb8079c0b5a5e3e1728b5b0888f49e"
SHA = "50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048"


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


def digest(data):
    return hashlib.sha256(data).hexdigest()


game = (ROOT / "Hansefuerst_0_4.html").read_bytes()
assert digest(game) == SHA == digest(git("show", CODE + ":Hansefuerst_0_4.html"))
assert git("log", "-1", "--format=%H", "--", "Hansefuerst_0_4.html").decode().strip() == CODE
old_files = git("ls-tree", "-r", "--name-only", BASE).decode().splitlines()
changed = []
for file in old_files:
    if git("rev-parse", BASE + ":" + file).strip() != git("hash-object", file).strip():
        assert file in {"Hansefuerst_0_4.html", "docs/entwicklungsberichte/README.md"}, file
        changed.append(file)
assert set(changed) == {"Hansefuerst_0_4.html", "docs/entwicklungsberichte/README.md"}
assert (ROOT / "docs/entwicklungsberichte/README.md").read_bytes().startswith(git("show", BASE + ":docs/entwicklungsberichte/README.md"))
assert not git("rev-list", "--merges", BASE + "..HEAD").strip()

text = game.decode()
before = git("show", BASE + ":Hansefuerst_0_4.html").decode()
assert re.sub(r"<script>[\s\S]*?</script>", "<script/>", text) == re.sub(r"<script>[\s\S]*?</script>", "<script/>", before)
art = lambda x: next(line for line in x.splitlines() if line.startswith("const ART="))
assert art(text) == art(before)
for name in ["GOODS", "SHIPTYPES", "DIST", "SHIPBUILD_RECIPES", "WAREHOUSE_RULES", "POLITICAL_RULES"]:
    line = lambda x: next(row for row in x.splitlines() if row.startswith("const " + name + "="))
    assert line(text) == line(before), name
assert text.count("store.put(bytes,'active')") == 1
assert "localStorage.setItem(KEY," not in text
assert "const SAFETY_DATABASE='hansefuerst-local-safety3'" in text
assert "db.transaction('game',write?'readwrite':'readonly')" in text

for item in json.loads((PHASE / "review-sources.json").read_text())["mirrors"]:
    raw = (ROOT / item["path"]).read_bytes()
    assert digest(raw) == item["sha256"]
    assert raw.decode().rstrip() in text, item["path"]

for item in json.loads((PHASE / "plan.json").read_text())["baselineEvidence"]:
    assert digest((ROOT / item["path"]).read_bytes()) == item["sha256"]

summary = json.loads((PHASE / "acceptance-summary.json").read_text())
assert summary["gameHash"] == SHA and summary["testedGameCommit"] == CODE
assert summary["newCasesPassed"] == 106 and summary["nativeChromiumGroupsPassed"] == 31
assert summary["financialQ001CriteriaPassed"] and not summary["Q001UnqualifiedClosed"]
assert not summary["fullIntegrationAcceptance"]

verified = PHASE / "results/final-acceptance"
counts = {"basic": 19, "storage": 12, "economic": 7, "grace": 14, "travel": 10}
for name, count in counts.items():
    data = json.loads((verified / (name + ".json")).read_text())
    assert data["passed"] and len(data["checks"]) == count and all(c["passed"] for c in data["checks"])
for file in verified.glob("*.json"):
    data = json.loads(file.read_text())
    assert data["gameHash"] == SHA, str(file)
    assert digest(git("show", data["sourceCommit"] + ":Hansefuerst_0_4.html")) == SHA
browser = json.loads((verified / "browser.json").read_text())
assert browser["passed"] and not browser["pageErrors"] and not browser["fullBrowserAcceptance"]
assert sum(c["passed"] is True for c in browser["checks"]) == 31
assert sum(c["status"] == "BLOCKED_NOT_TESTED" for c in browser["checks"]) == 1
for number in [1, 2, 3]:
    data = json.loads((verified / f"concurrency-{number}.json").read_text())
    assert data["passed"] and len(data["checks"]) == 2 and all(c["passed"] for c in data["checks"])
for name in ["risk", "person", "clock-integration"]:
    assert json.loads((verified / (name + ".json")).read_text())["passed"]
valuation = json.loads((verified / "valuation.json").read_text())
assert len(valuation["rows"]) == 8 and valuation["activeNeutralCollateralInvariant"]
for row in valuation["rows"]:
    assert row["after"]["currentCredit"] == row["after"]["W1Credit"]
    assert row["after"]["securityWorth"] == row["after"]["W1"]
construction = json.loads((verified / "construction.json").read_text())
assert construction["activeCollateralInvariant"] and len(construction["cases"]) == 2
assert all(case["creditLimit"] == 6732 and case["securityWorth"] == 14960 for case in construction["cases"])
probe = json.loads((verified / "reputation-open.json").read_text())
assert probe["passedDiagnostic"] and probe["legacyReputationDelta"] == 1 and not probe["Q001UnqualifiedClosure"]

# Preserve the 19 actual baseline statements, not just test names or truthy promises.
pattern = r"test\('([^']+)','((?:\\.|[^'])*)'\);"
assert re.findall(pattern, (PHASE / "basic-checks.cjs").read_text()) == re.findall(pattern, git("show", BASE + ":tests/test-v04.cjs").decode())
assert (PHASE / "basic-checks.cjs").read_text().count("await test(") == 19

matrix = list(csv.DictReader((PHASE / "test-matrix.csv").open()))
assert sum(row["status"] == "PASS" for row in matrix) == 106
assert sum(row["status"] == "BLOCKED_NOT_TESTED" for row in matrix) == 1
assert sum(row["status"] == "KNOWN_OPEN" for row in matrix) == 1
reports = sorted((ROOT / "docs/entwicklungsberichte/Q1_09c").glob("*.md"))
assert len(reports) == 7
links = 0
for file in reports:
    body = file.read_text()
    assert CODE in body and SHA in body
    for target in re.findall(r"\]\(([^)]+)\)", body):
        if "://" not in target and not target.startswith("#"):
            assert (file.parent / target.split("#", 1)[0]).exists(), (str(file), target)
            links += 1

scripts = sorted(list(PHASE.glob("*.cjs")) + list(PHASE.glob("*.js")))
for file in scripts:
    subprocess.run(["node", "--check", str(file)], cwd=ROOT, check=True, capture_output=True)
subprocess.run(["git", "diff", "--check", BASE], cwd=ROOT, check=True)
subprocess.run(["git", "diff", "--cached", "--check"], cwd=ROOT, check=True)
for file in git("ls-files", "--others", "--exclude-standard").decode().splitlines():
    assert file.startswith(("tests/safety/q1_09c/", "docs/entwicklungsberichte/Q1_09c/")), file

proof = {"headAtVerification": git("rev-parse", "HEAD").decode().strip(), "verificationScriptSHA256": digest(Path(__file__).read_bytes()),
         "testedGameCommit": CODE, "gameHash": SHA, "existingFilesChecked": len(old_files), "existingChangedOnly": sorted(changed),
         "indexAppendOnly": True, "embeddedGraphicsAndOuterHTMLCSSUnchanged": True, "historicTestsResultsPagesDistUnchanged": True,
         "canonicalAuthority": "one IndexedDB row with native readwrite compare-and-put; mandatory Web Lock", "localStorageCanonicalWrites": 0,
         "baselineStatementsPreserved": 19, "caseCount": 106, "nativeChromiumGroups": 31, "extraCriticalRepeatCases": 6,
         "financialCriteriaPassed": True, "unqualifiedQ001Closed": False, "fullAcceptance": False,
         "scriptSyntaxChecked": len(scripts), "reports": 7, "relativeLinks": links, "scopeValid": True, "diffCheck": True}
(PHASE / "results/verification.json").write_text(json.dumps(proof, indent=2) + "\n")
print(json.dumps(proof, indent=2))
