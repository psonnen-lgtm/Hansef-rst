# Q1.10b – Native Flotten-/Mehrpartienprüfungen

7. November 2026, Europe/Berlin. Basis `ff92ce60d1c384a13313e37ba2b3954cf38e793b`; tatsächlich geprüfter Spielcode `ade1961b89dd5975b5a32b9c6f68383f6376c51e`, HTML SHA256 `803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`.

Maßgeblich: `results/native-release.json`, **57/57 Gruppen**, null ungefangene Seitenfehler, Chromium 154.0.8037.57. Tatsächliche IndexedDB/Web Locks/Downloads/FileReader, frische synthetische Profile, temporärer 127.0.0.1-Server. Keine echten Nutzerdateien oder Veröffentlichung.

## Wiederholen

Node, Playwright, Python 3 und `/usr/bin/chromium` müssen vorhanden sein. Vom Repository aus ausschließlich **neue** Ergebnisnamen verwenden:

```sh
node tests/features/q1_10b/browser-checks.cjs /tmp/q110b-neue-abnahme.json
Q110B_ONLY='^(45|46|47|50|51) ' node tests/features/q1_10b/browser-checks.cjs /tmp/q110b-neue-reisepruefung.json
python tests/features/q1_10b/static-checks.py /tmp/q110b-neue-statik.json
```

Die statische Prüfung erwartet den Spielcode zuvor committed, einen unveränderten Q1.10a-Bestand außer Spiel-HTML/Berichtsindex und nur neue Q1.10b-Berichte/-Testdateien. Sie verändert keine Projektdateien. Der Browsertreiber übernimmt die synthetischen Fixtures ausdrücklich aus `../q1_10a/fixtures.json`; die historischen Dateien bleiben unverändert. Für Gruppe 29 und 47 wird der tatsächliche Q1.10a-Basiscode mittels `git show` gelesen und nur am temporären lokalen Server als Vergleich bereitgestellt. Das ist keine zweite veröffentlichte Spielversion.

## Bewusste Abweichungen von Q1.10a

Der Treiber enthält die bisherigen 40 Gruppen. 28 prüft ausdrücklich selbstständige Reisen ohne persönliche Gutschrift und Zugang über Schiffe; 29 prüft keine neue persönliche Schonung, erhält aber einen im alten HTML erzeugten gültigen Nachweis. Alle anderen bisherigen Schutzthemen bleiben erhalten. Hinzu kommen 17 gezielte Gruppen 41–57. Die ursprüngliche Q1.10a-Treiberdatei und ihre Ergebnisse werden nicht überschrieben.

Der erste Lauf `native-attempt-1.json` enthält 48/54 bestandene Gruppen; die sechs Treiberfehler sind im Bericht erklärt. `native-focused-1.json` enthält 8/9: eine Erwartung übersah die laufende Tagesmiete beim Bad. Die abschließende vollständige Abnahme enthält 57/57. Rote Rohdaten bleiben erhalten. Erste Screenshots wurden vor dem Refresh bytegenau unter `attempt-1-screenshots/` archiviert; die Zuordnung steht in `attempt-1-screenshot-archive.json`.

In Gruppe 47 nennt das Rohfeld `equalEconomicFields` 16: tatsächlich sind es 15 einzeln verglichene Zustandsbereiche plus Ereignis; die Zufallsabrufzahl wird zusätzlich verglichen. Der Treiber wurde nach dem erfolgreichen Gesamtlauf nicht kosmetisch verändert und kein Rohdatum nachträglich berichtigt.

Aktuelle Bilder: `fleet-travel-*.png`, `fleet-church-*.png`, `fleet-manager-*.png`, `save-manager-*.png`. Größen 375×812, 812×375, 820×1180, 1280×900; Chromium-Touch-Emulation ist keine echte Apple-Abnahme. Bekannter globaler Ansehensfehler bleibt offen. Keine Wirtschafts-/Karriere-Großsimulation.

Berichte und genaue Befunde: [Q1.10b-Testbericht](../../../docs/entwicklungsberichte/Q1_10b/Q1_10b_tests.md), [Gesamtbericht](../../../docs/entwicklungsberichte/Q1_10b/Q1_10b_gesamtbericht.md).
