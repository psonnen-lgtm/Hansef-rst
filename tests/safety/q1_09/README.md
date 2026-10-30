# Q1.09 – gezielte Sicherheitsregressionen

Keine Großsimulationen. `historical-probe.cjs` ist unverändert aus Q1.02 und auf den alten Produkthash festgelegt; nur für Teil A am alten Stand ausgeführt. Neue Tests verwenden eine eigene kontrollierte VM und warten neue asynchrone Aktionsgrenzen ab. Echte Nutzerstände werden nie gelesen. Originale/Ergebnisse der alten Testordner bleiben unverändert.

`safety-foundation.js` spiegelt den identischen produktiven Sicherheitsblock in der HTML zur nachvollziehbaren Prüfung. HTML bleibt die gelieferte Spieldatei. Spiel-/Testcode vor Ausführung committen, Resultate getrennt danach. Keine Testumgehung im Produkt; VM stellt Browser-APIs bereit. Browserdownload403/fehlende echteGeräte ausdrücklich als Grenzen dokumentieren.
