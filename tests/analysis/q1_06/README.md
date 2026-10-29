# Q1.06 – ausschließlich lesende Konzeptprüfung

`python tests/analysis/q1_06/inspect.py` liest commitfeste Quellen und rechnet drei Unterstützungsmodelle mit exakten Brüchen. Importiert weder Headless-Engine noch Spielcode; startet keine Partie/Simulation, erzeugt oder migriert keinen Spielstand. Alle Modelle sind Diskussionsvorschläge, nicht aktive Spielregeln. Synthetische Beleganzahlen sind keine gespielten Karrieren.

Quellen/Umfang in `plan.json`. Ausgabe `results/inspection.json`, `city-models.csv`, `model-examples.csv`. Historische Q1.02-/Q1.05-Ergebnisse nur übernommen, nicht wiederholt. Die allgemeine AGENTS-Großsimulationsregel gilt nicht für diesen ausdrücklichen Konzeptauftrag. Keine Produkt-/Wirtschafts-/Pages-Änderungen; nur neue Q1_06-Dateien plus ergänzter Berichtsindex.

Abgeschlossenes Konzeptpaket: acht Dateien unter `docs/entwicklungsberichte/Q1_06/`,48 Entscheidungsposten und42 geplante/nicht ausgeführte Regressionen.819 konsistente Belegsätze ergeben27.027 reine Modellvergleiche; das sind keine Simulationen.33 Routenzeilen sind statische Rechnung, keine Reisen. Die81 A/C-Schwellenabweichungen schließen nicht kandidaturfähige Belegsätze ein, keine81 gespielten Wahlen.

`routes.py` liest ausschließlich Distanzmatrix und Städte. `verify.py` prüft ausschließlich Dateien/Quellhashes/Verweise/Umfang. Kein Import einer Spielengine und kein tatsächlicher Save benutzt. Prüfcodes zuerst veröffentlicht, ausgeführte Commit-IDs in Logs/Metadaten. Historische Dynamikprüfungen wurden nicht wiederholt.
