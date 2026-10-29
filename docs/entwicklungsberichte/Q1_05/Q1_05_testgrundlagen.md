# Q1.05 – Testgrundlagen und vorab festgelegter Plan

29.10.2026. Stufe A abgeschlossen; Stufe B/C noch nicht ausgeführt.

Aktueller GitHub-Basisstand: `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Produkt-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Q1.04 bei `e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36`, Q1.03 bei `15df03c02d6c3af3fdb9c8f24052f038885c2bb1`; Q1.01/Q1.02-Gesamtberichte ebenfalls gelesen. Neue Zielsetzung ersetzt die alte 1.100-Gold-Empfehlung; keine Gebühr beschlossen.

Q1.04: zehn unterschiedliche Lübeck/Kogge-Baselines, zwei Seeds,15 Zahlungsfälle. Vorsichtiger Fall mit5.600 Ausgabe und618 Restgold stagniert wegen800-Gold-Strategiereserve. Frühere 1.500/90/2.250-Archive verwenden ältere Wirtschaft und teilweise allwissende Strategien, daher keine aktuellen Gebührenstichproben. Keine Neuberechnung dieser Daten. Q-001/Q-003 bleiben offen.

Vorab festgelegtes Modell: [Plan](../../../tests/analysis/q1_05/plan.json), [Ausführungshinweise](../../../tests/analysis/q1_05/README.md). 75 neue Baselines (5 Szenarien ×5 Stile ×3 neue Seeds),3 exakte Pilotreplays,1 Kreditprobe; maximal36 gezielte Gegenläufe (3 datenabhängige Gebühren ×2 Zeitpunkte ×6 ausgewählte Fälle). Pilot muss zusätzliche Städte/Routen und beide Konvoischiffe tatsächlich nutzen. Bei Fehlern anhalten und dokumentieren. Keine technischen Ergebnisse vorweggenommen.

Analyse unterscheidet: Bargeldschwelle, schuldengepufferte strategiegerechte Liquidität, wiederholt profitable beladene Reisen, Belastbarkeit nach tatsächlichem Testabzug. E-Kriterium: mindestens4 sinnvolle beladene Reisen, positiver erwirtschafteter Nettogeldzuwachs, letzte3 beladene Reisen insgesamt profitabel und mindestens2 positiv,3 gedeckte Abschlussreserven. Kein formales Beitrittsrecht und keine neue Wartepflicht. Kredite sind kein Gewinn; Buchvermögen getrennt.

Gebührenauswahl erst nach Baselines anhand aller45 regulären Starts (auch nicht etablierte Fälle enthalten), Kontrollpunkt bis Tag120; Details und Rasterformel vorab im Plan. Zahlung nominal früh oder erst bei E plus verbleibender Reserve. Spätere Fortsetzung120 Tage und mindestens3 Reisen, insgesamt höchstens360 Tage. Unter10 gekaufte Einheiten pro Reise gelten nicht als sinnvoll beladener Handel;3 solche Reisen in Folge oder Abfahrtsblockade werden als Stillstandshinweis berichtet. Leere Erkundung und unumkehrbare Insolvenz sind gesondert zu beurteilen.

Synthetische Schnigge-/Konvoi-Unternehmen ergänzen Typ-/Kapitalsensitivität; kein regulärer Neuspielerstart und kein nachgespielter Flottenkauf. Keine Produktions-, Speicher-, Politik- oder Gildenänderung. Keine Stundenumrechnung. Gebührenwahl ausschließlich Nutzerentscheidung.

## Technischer Pilotabbruch und begrenzte Korrektur

Prüfcode vor erster Ausführung: `e56bd8166ba2a32a45bd683b74605524a224edf3` (vollständige ID im Stufenmarker). Kreditprobe bestanden:5.000+4.482 Kredit=9.482 liquide Gold bei unverändertem Nettovermögen und keinem neuen Tag. Bereits damit ist „Gebühr über5.000“ kein Schutz gegen sofortige Kreditfinanzierung.

Erster Bergen-Pilot plus exakte Wiederholung liefen durch native Validierung/Bilanzen und Reproduktionsvergleich, wurden aber anschließend von der zusätzlichen Abdeckungsassertion „mindestens3 Häfen je Fall“ gestoppt. Vorsichtiger Handel darf bei2 Häfen bleiben; ein dritter erzwungener Hafen würde die Strategie ändern. Diese Testannahme war zu eng und wird auf mindestens2 tatsächlich bereiste Häfen geändert. Die breitere Städte-/Routenabdeckung wird anschließend über die gesamte Serie gemessen, nicht behauptet. Keine Wirtschafts-/Strategieänderung. Originalfehler/Marker/Log bleiben erhalten.

Das erste Programm speicherte den vollständigen Rohpfad erst nach dieser Assertion; diese beiden Ausführungen sind deshalb **nicht als auswertbare Baselines gesichert**. Begrenzte Wiederholung der3 Pilotfälle mit vorgezogener Rohdatensicherung ist notwendig. Kreditprobe wird nicht wiederholt. Zusatzkosten2 Ausführungen, geplante Gesamtzahl Baseline-/Pilot-/Mechanikinstanzen81 statt79, weiterhin unter100. Keine anschließende Großserie bei erneuter ungeklärter technischer Störung.

## Pilot freigegeben

Begrenzte Korrektur vor Wiederholung veröffentlicht: `ef18beed12f797ab5b7f4c3dd0d5ed29c84967e4`. Drei Piloten mit jeweils exakter Wiederholung bestanden; native Validatoren, Bargeld-/Schulden-/Nettogeldbilanzen, beide tatsächlich genutzten Konvoirümpfe und reale zusätzliche Routen geprüft. [Gemessene Abdeckung](../../../tests/analysis/q1_05/results/pilot-coverage.json). Jetzt erst Freigabe der restlichen72 Baselines. Ergebnisdateien werden nicht vorweggenommen.

## Baselines abgeschlossen, Gebühren erst jetzt ausgewählt

75 verschiedene Baselines vollständig gespeichert. In45 regulären Starts betragen die vorab definierten25/50/75%-Quantile tragfähiger Gebührenkapazität am letzten beobachteten Kontrollpunkt bis Tag120 **12.495 /17.570 /26.437 Gold**. Aufrundung im500er-Testraster und Mindestabstand ergeben **12.500 /18.000 /26.500**. Synthetisch reichere Flotten sind aus dieser Auswahl ausgeschlossen. Alle75 Fälle erreichen das E-Analysekriterium; keine Voraussage für beliebige Spieler. Nun erst36 begrenzte Zahlungsgegenläufe, keine Gebührentscheidung.
