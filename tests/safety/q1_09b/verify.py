"""Read-only game/source/provenance checks; no game actions or simulation."""
from pathlib import Path
import csv, hashlib, json, re, subprocess

root = Path(__file__).resolve().parents[3]
phase = root / "tests/safety/q1_09b"
baseline = "e3498f8522ec456287fb4328dd6e895b96a1d07a"
game_hash = "dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95"


def git(*args):
    return subprocess.check_output(["git", *args], cwd=root)


def digest(data):
    return hashlib.sha256(data).hexdigest()


assert digest((root / "Hansefuerst_0_4.html").read_bytes()) == game_hash
old_files = git("ls-tree", "-r", "--name-only", baseline).decode().splitlines()
allowed = {"tests/test-v04.cjs", "tests/phase1.cjs", "tests/simulation/headless.cjs", "docs/entwicklungsberichte/README.md"}
old_changed = []
for file in old_files:
    before = git("rev-parse", baseline + ":" + file).strip()
    after = git("hash-object", file).strip()
    if before != after:
        assert file in allowed, file
        old_changed.append(file)
assert set(old_changed) == allowed
old_index = git("show", baseline + ":docs/entwicklungsberichte/README.md")
assert (root / "docs/entwicklungsberichte/README.md").read_bytes().startswith(old_index)

for file, expected in [("tests/test-v04.cjs", 19), ("tests/phase1.cjs", 18)]:
    pattern = r"test\('([^']+)','((?:\\.|[^'])*)'\);"
    before = re.findall(pattern, git("show", baseline + ":" + file).decode())
    after = re.findall(pattern, (root / file).read_text())
    assert len(before) == len(after) == expected
    for (old_name, old_body), (new_name, new_body) in zip(before, after):
        assert old_name == new_name
        if old_name == "remote cargo cannot be traded":
            assert new_body.endswith(old_body) and new_body.startswith("s.city=1;s.ships.push(")
        else:
            assert new_body == old_body, old_name
    assert (root / file).read_text().count("await test(") == expected

for item in json.loads((phase / "inherited-evidence.json").read_text())["files"]:
    assert digest((root / item["path"]).read_bytes()) == item["sha256"]

summary = json.loads((phase / "acceptance-summary.json").read_text())
assert summary["gameHash"] == game_hash
assert summary["newTotalGroupsPassed"] == 74
assert not any(summary[x] for x in ["productionGameChanged", "Q001Fixed", "W1SActivated", "unaccompaniedVoyageActivated", "contractGraceActivated", "fullQ109bAcceptance"])
for name, count in [("legacy-basic-review3.json", 19), ("legacy-phase1-review2.json", 18), ("proposals-attempt1.json", 17), ("browser-extra.json", 2)]:
    data = json.loads((phase / "results" / name).read_text())
    assert data["passed"] and len(data["checks"]) == count and all(x["passed"] for x in data["checks"])
    assert data["gameHash"] == game_hash
    # The recorded actual code tree must have the exact product tested today.
    assert digest(git("show", data["sourceCommit"] + ":Hansefuerst_0_4.html")) == game_hash

browser = json.loads((phase / "results/browser-acceptance.json").read_text())
assert browser["nativeBrowserGroupsPassed"] == 19 and browser["blockedGroups"] == 1
assert browser["failedAuthoritativeGroups"] == 0 and not browser["fullBrowserAcceptance"]
for row in browser["checks"]:
    source = json.loads((phase / row["source"]).read_text())
    original = next(x for x in source["checks"] if x["name"] == row["name"])
    if row["status"] == "PASS":
        assert original["passed"] and original["evidence"] == row["evidence"]
    else:
        assert original["evidence"]["status"] == "BLOCKED_NOT_TESTED"

matrix = list(csv.DictReader((phase / "test-matrix.csv").open()))
assert sum(row["status"] == "PASS" for row in matrix) == 74
reports = sorted((root / "docs/entwicklungsberichte/Q1_09b").glob("*.md"))
assert len(reports) == 7
links = 0
for file in reports:
    body = file.read_text()
    assert "15c2e3792d855afcddf26ba0572d6317504d8b46" in body
    for target in re.findall(r"\]\(([^)]+)\)", body):
        if "://" not in target and not target.startswith("#"):
            assert (file.parent / target.split("#", 1)[0]).exists(), (str(file), target)
            links += 1

scripts = list(phase.glob("*.cjs")) + [root / "tests/test-v04.cjs", root / "tests/phase1.cjs", root / "tests/simulation/headless.cjs"]
for file in scripts:
    subprocess.run(["node", "--check", str(file)], check=True, cwd=root, capture_output=True)
subprocess.run(["git", "diff", "--check", baseline], check=True, cwd=root)
subprocess.run(["git", "diff", "--cached", "--check"], check=True, cwd=root)
for file in git("ls-files", "--others", "--exclude-standard").decode().splitlines():
    assert file.startswith(("tests/safety/q1_09b/", "docs/entwicklungsberichte/Q1_09b/")), file

proof = {"headAtVerification": git("rev-parse", "HEAD").decode().strip(), "verificationScriptSHA256": digest(Path(__file__).read_bytes()), "testedGameCommit": summary["testedGameCommit"], "gameHash": game_hash,
         "existingFilesChecked": len(old_files), "existingChangedOnly": sorted(old_changed), "indexAppendOnly": True,
         "productionQ109HistoricalResultsAndPagesUnchanged": True, "oldAssertionsPreserved": 37,
         "scriptSyntaxChecked": len(scripts), "reports": 7, "validRelativeLinks": links, "newPassedGroups": 74,
         "Q001Fixed": False, "fullAcceptance": False, "scopeValid": True, "diffCheck": True}
(phase / "results/verification.json").write_text(json.dumps(proof, indent=2) + "\n")
print(json.dumps(proof, indent=2))
