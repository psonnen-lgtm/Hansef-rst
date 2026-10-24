# Hansefürst 0.4.2 – Phase 1: Fehlerbehebung und Exploit-Schutz

## Änderungen
1. Reisevorschau enthält keine gewürfelten Ereignisse. Erst verbindliches Weitersegeln löst genau ein Ereignis aus; Ankunft prüft außerdem Flottenstandort und Zahlungsfähigkeit erneut.
2. Warenmengen tragen Herkunftshäfen; FIFO-Verbrauch verhindert Erfüllung durch lokalen Kauf/Verkauf. Mischbestände, Teilverkäufe und Piratenverluste werden berücksichtigt. Altwaren ohne Herkunft bleiben handelbar, aber zählen nicht für Lieferaufträge.
3. Guthaben/Kredite werden täglich mit den effektiven Jahresfaktoren 1,02^(1/360) bzw. 1,06^(1/360) verzinst. Kein zusätzlicher Jahreswechselzins, keine tägliche Ganzzahlrundung. Vollständige Abhebung/Tilgung berücksichtigt Bruchteile. Historische Salden werden nicht rückwirkend korrigiert.
4. Warenwert für Kredit und Karriere ist der gewichtete Einstandspreis. Bei unbekannten Altkosten wird einmalig der kleinere Wert aus Basispreis und Preis des Schiffshafens als Buchwert eingefroren. Unbekannte tatsächliche Einkaufskosten bleiben unbekannt. Ränge werden nicht zurückgesetzt.

Spielstandschlüssel und Schema v4 bleiben erhalten. Neue optionale Felder pro Schiff: origins (Herkunftsmengen) und bookCosts (Bewertungsbasis). Bestehende Sicherungen werden übernommen; keine Grafikänderung. Die aktualisierte Ereignisbeschreibung erscheint nach der Überfahrt. In „Was ist neu?“ ist 0.4.2 dokumentiert.

Keine weiteren Balanceänderungen: Warenpreise, Bestände, politische Schwellen, Prämien, Gebühren, Reparaturtarife und Piratenwahrscheinlichkeiten sind unverändert.

## Verifikation
- `node tests/test-v04.cjs` (GitHub) bzw. `node tests/game.cjs` (Sites): 19 bestehende Prüfungen.
- `node tests/phase1.cjs`: 18 neue Regressionen, einschließlich Spielstandübernahme, Herkunft/FIFO, Zinsen über Jahresgrenzen, effektiven Jahresraten, Bruchteilen und realisiertem/unrealisiertem Gewinn.
- `node tests/simulation/edges.cjs`: 14 aktualisierte Mechanikprüfungen.
- `node tests/telemetry.cjs` und `node tests/share.cjs`: unveränderte Opt-in-/Datenschutz-/Teilen-Verträge.
- 1.500 neue Verläufe: sechs unveränderte Strategien × 250 gleiche Startseeds. Zufall Mulberry32, Seeds 10001..10250, Horizont 1.440 Tage/800 Entscheidungen. Keine Umrechnung in menschliche Stunden.
- Quellcode-Hash der finalen Spieldatei passt zum neuen Datensatz. Ein neuer Lauf wurde exakt reproduziert. Ein Vorher-Lauf war vor den Änderungen exakt reproduzierbar.

## Ergebnisse
| Strategie | Median-Endvermögen vorher → nachher | Eldermann /250 | Median Spieltage vorher → nachher |
|---|---:|---:|---:|
| Vorsichtig | 556.689 → 556.689 G | 250 → 250 | 614 → 614 |
| Normal | 677.054 → 542.906 G (−19,8 %) | 250 → 250 | 477 → 616,5 |
| Aggressiv | 805.181 → 810.786 G (+0,7 %) | 250 → 250 | 499,5 → 500 |
| Optimiert (vollständige Preissicht) | 873.832 → 732.026 G (−16,2 %) | 250 → 250 | 403,5 → 485,5 |
| Fünf schlechte Entscheidungen, dann Erholung | 536.040 → 536.040 G | 250 → 250 | 632 → 632 |
| Bis zu 30 schlechte Entscheidungen | 2.190 → 2.164 G | 2 → 2 | 586,5 → 586,5 (nur zwei Erfolge) |

Keine rechnerische Insolvenz (Nettovermögen ≤0) und keine geprüften ungültigen Zustände in den neuen Verläufen. 248/250 lang anhaltende Fehlentscheidungs-Verläufe bleiben trotzdem ohne Reiseliquidität stehen. Die Medianzahl erfolgreicher Piratenangriffe bleibt je Strategie gleich; Wahrscheinlichkeiten wurden nicht geändert. Unterschiede der Bankkosten kommen aus der Zeitanteiligkeit und verändertem Verlauf.

Vergleichsgrenze: Normaler/optimierter Bot versucht weiterhin den bisherigen lokalen Auftragskauf. Dieser erhält jetzt keine Prämie. Die Simulation optimiert nicht neue legitime Lieferstrategien; die gemessene Differenz ist kein allgemeines Renditeversprechen. Dieselben Seeds bedeuten bei unterschiedlichen Handlungsfolgen nicht identische spätere Ereignisse. Endwerte nach Schlussverkauf sind nicht direkt von unrealisierten Buchwerten aufgebläht; Bewertungsänderungen wirken vorher über Kredit/Karriere.

## Verbleibende Probleme
Preisdrift und fehlende Mengenwirkung; kein Notverkauf von Schiffen bei Liquiditätsstillstand; schwach skalierende Piratenverluste und gleiche Reparaturtarife je Zustandspunkt; Buchwerte berücksichtigen keine aktuellen Marktwertverluste. Browser-Spielstände bleiben lokal editierbar. Schutz gegen absichtlich wiederhergestellte alte Sicherungen ist nicht Gegenstand dieser Offline-Korrekturen. Echte Safari-/Gerätetests stehen aus.

## Dateien und Reproduktion
- Wirtschaftstest_0_4.html: aktueller Vergleichsbericht mit Diagramm (Sites: /testbericht.html).
- tests/simulation/phase1-results.json.gz: neue 1.500 Rohverläufe.
- tests/simulation/baseline/results.json.gz: unveränderte bisherige 1.500 Verläufe.
- tests/simulation/baseline/game-0.4.1.html.gz und strategies.js: vor der Änderung archivierter Code. Die damaligen Rohdaten entstanden vor dem rein grafischen/Neuigkeiten-Update 0.4.1; die Wirtschaftsregeln waren gleich, ein Vorher-Seed-Replay wurde bestätigt.
- tests/simulation/summary-phase1.json: maschinenlesbarer Vergleich.
- `SIM_OUTPUT=phase1-results.json node tests/simulation/run.cjs` erzeugt neue Rohdaten. `python tests/simulation/compare-phase1.py` erzeugt den Bericht (NumPy, Matplotlib); vorhandene gzip-Daten werden ohne Entpacken gelesen.
- Optionaler Baseline-Lauf: `HANSE_GAME=tests/simulation/baseline/game-0.4.1.html.gz SIM_DRIVER=tests/simulation/baseline/strategies.js SIM_OUTPUT=baseline-replay.json node tests/simulation/run.cjs`.

Testadapter liest die tatsächlichen Spielregeln aus der HTML-Datei; nur Oberfläche, Speicherung und Telemetrie sind im Simulator ersetzt. Der Simulator selbst ändert keine ausgelieferten Zufallswerte oder Spielstände. Die Messung wurde für Ereignisse nach Abfahrt und tägliche Zinsbuchungen angepasst, die Entscheidungslogik der Strategien nicht.
