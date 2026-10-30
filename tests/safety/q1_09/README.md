# Q1.09 – gezielte Sicherheitsregressionen

Keine Großsimulationen. `historical-probe.cjs` ist unverändert aus Q1.02 und auf den alten Produkthash festgelegt; nur für Teil A am alten Stand ausgeführt. Neue Tests verwenden eine eigene kontrollierte VM und warten neue asynchrone Aktionsgrenzen ab. Echte Nutzerstände werden nie gelesen. Originale/Ergebnisse der alten Testordner bleiben unverändert.

`safety-foundation.js` spiegelt den identischen produktiven Sicherheitsblock in der HTML zur nachvollziehbaren Prüfung. HTML bleibt die gelieferte Spieldatei. Spiel-/Testcode vor Ausführung committen, Resultate getrennt danach. Keine Testumgehung im Produkt; VM stellt Browser-APIs bereit. Browserdownload403/fehlende echteGeräte ausdrücklich als Grenzen dokumentieren.


Maßgeblicher Endstand: `acceptance-summary.json` und `results/acceptance/*.json`.44 gezielte Sicherheits-/Bestandsschutzgruppen sind in VM bestanden;8 Handelsfälle erhalten die bisherige Mechanik, weisen aber weiterhin die bekannte Q-001-Aufwertung nach. Zwei native Baufixtures zeigen zusätzliche188 Wert/85 Kredit. Das ist **keine vollständige Sicherheitsfreigabe**. Browsergameprüfungen0, Hardwareprüfungen0.

Neue Endstandsbefehle mit `node <skript> <ergebnis.json>`: `storage-checks.cjs`, `presence-checks.cjs`, `qualified-audiences.cjs`, `edge-checks.cjs`, `cross-arrival-check.cjs`, `valuation-checks.cjs`, `work-in-progress-check.cjs`. `verify.py` ist ausschließlich lesende Umfangs-/Hash-/Verweisprüfung, keine Spielausführung. Die Daten unter früheren Teilständen bleiben erhalten und sind nicht mit dem Endstand zu vermischen. Vor vollständiger Integration echte Browser, offene Sicherheitenregel und unbegleitete Fernfahrten/Altfristen klären.

Für eine spätere ausdrücklich gewünschte Wiederholung neue Ausgabepfade wählen und gesicherte Ergebnisse nicht überschreiben. Die aufgeführten Endstandsbefehle wurden ausgeführt; sie sind keine Aufforderung zu einer automatischen Neuberechnung nach Auftragsende.
