# Q1.05 – begrenzte Meilensteinanalyse (29.10.2026)

Keine Produktimplementierung. Vor Ausführung festgelegter Umfang und Auswahl: `plan.json`.

`node tests/analysis/q1_05/run.cjs pilot` → nur bei Erfolg `baseline` → lesende Gebührenauswahl → `fees`.
Stufenmarker verhindern versehentliche Wiederholung. Rohdaten je Verlauf gzip-komprimiert in `results/runs/`; Ereignisse, tatsächliche Planungsinputs, alle Schiffe und Kontrollpunkte gespeichert. `sourceCommit` in Stufenmarkern ist der vor Ausführung veröffentlichte Prüfcode. Root-HTML explizit gepinnt; keine dist-Verwechslung.

Policydatei bytegleich aus Q1.04 bei e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36 übernommen. Nur deren reine Informationsplaner, nicht der allwissende historische Simulator. Adapter ergänzt ausschließlich örtlich gemeinsam reisende Schiffe, aggregiert echte Kapazität und verteilt Käufe auf echte Schiffsrümpfe. Märkte/Reisen/Handel/Schäden/Zinsen/Validierung bleiben native Funktionen; Körperhashes vor/nach jeder Partie geprüft.

Nativer Start: 5.000 Gold/Kogge in Lübeck, Bergen, Nowgorod. Ergänzende Sensitivitäten: Schnigge/5.000 oder Kogge+Holk/8.000 in Lübeck sind synthetische bestehende Firmen, keine reguläre Schiffs-/Kapitalwahl beim Neustart. Kein Kauf-/Ausbaupfad dieser Flotten simuliert. Aggressiv nimmt einmal 1.500 echten Kredit auf. Keine Rettungskredite. Keine Lager-/Schiffbau-/Auftrags-/Politikstrategie; bestehender alter Mischruf ignoriert. Reale Spielstände unberührt.

E-Kriterium/Rücklagen siehe Plan: kein Vermögenszugang und keine künstliche Wartezeit, nur Auswertungsmodell. Eigene Analysekriterien sind weder bewiesene Sicherheitsgarantie noch neue Aufnahmebedingungen. Die Gebühren werden ausschließlich im Testzustand einmalig abgezogen, ohne Status-/Rufwirkung. Vorzahlungspfade müssen exakt zur passenden Baseline passen. Läufe mit fehlender Zahlung werden zensiert berichtet, keine unbegrenzte Suche.

Die expliziten kleinen Auftragsgrenzen ersetzen hier die allgemeine AGENTS-1.500er-Vorgabe. Keine Großserie, keine menschlichen Spielstunden aus Tagen ableiten. Q-001/Q-003 bleiben offen; kein W1/W2. Vorbestehende Archive werden ausschließlich als historische Befunde zitiert, nicht erneut simuliert.


Abschluss:75 Baselineakten +36 Gegenakten,117 Engineinstanzen einschließlich Replays/erstem Pilotabbruch und Kreditprobe.111 Akten sind keine unabhängigen Zufallsstichproben. `python tests/analysis/q1_05/audit.py` prüft ausschließlich gespeicherte Ereignisse und schreibt CSVs; `tables.py` exportiert Tabellen/SVGs ohne Spielstart; `verify.py` prüft Altdateien/Quellen/Verweise/Umfang. Stufen NICHT automatisch erneut ausführen: Marker und Ergebnisse absichtlich erhalten. Die Analyse ist abgeschlossen, Reproduktion nur bei gesondertem Bedarf.

Die6 Berichte stehen unter `docs/entwicklungsberichte/Q1_05/`. Tatsächlicher GitHub-Rücklesebeleg und Übergabedaten in `results/github-readback.json` bzw. `results/handoff.json`. Kein Produkt/Save angefasst, kein Merge, keine Gebühr entschieden. Q-001/Q-003 offen;90 aktive Stunden unvalidiert.
