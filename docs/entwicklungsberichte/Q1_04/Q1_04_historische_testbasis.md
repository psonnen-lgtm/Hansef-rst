# Q1.04 – Verfügbare historische Wirtschaftsgrundlagen

29.10.2026 Europe/Berlin. **Alte Daten gelesen, keine historische Simulation erneut ausgeführt.** [Gesamtbericht](Q1_04_gesamtbericht.md) · [Grenzen](Q1_04_simulationsgrenzen.md).

Aktuell frisch bestätigte Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`; Branch `audit/q1-04-guild-economy`. Produkt0.8d.1b/V13, HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924` unverändert.

## Inventar und Verwendbarkeit

| Gesicherte Daten | Umfang und Nachweis | Wiederverwendbar | Keine heutige Aussage daraus |
|---|---|---|---|
| [results.json.gz](../../../tests/simulation/results.json.gz) |1.500 Ergebnisse, sechs damalige Strategien,250 Seeds je Gruppe | Historische Geld-/Vermögens-/Stillstandsverteilung und Simulatorgrenzen | Aktuelle Spielergeschwindigkeit, Gildengebühr oder heutige Strategierangfolge |
| [phase1-results.json.gz](../../../tests/simulation/phase1-results.json.gz) | Byteidentischer Inhalt zum vorigen Archiv | Alias erkennen, **nicht3.000 unabhängige Läufe zählen** | Zusätzliche unabhängige Stichprobe |
| [Phase1.5e Rohdaten](../../../tests/simulation/phase15e-results.json.gz), [Zusammenfassung](../../../tests/simulation/phase15e-summary.json) |90 historische Ergebnisse: vorsichtig/normal/aggressiv/optimiert, Lieferauftrag und Erholung nach5/10/20/30 Verlusten; zehn Seeds je Regel | Ereignisbasierte Umsätze, Gewinne, Kosten und alte Endbedingungen | Politische Karrierezeit oder einheitlicher gleich langer Strategievergleich |
| [Phase1.6c Manifest](../../../tests/simulation/phase16c-20261024-01/manifest.json), [Zusammenfassung](../../../tests/simulation/phase16c-20261024-01/summary.json) |2.250 Ergebnisse, damalige2.250 identische Reproduktionen,4.500 Engineausführungen,0 damalige Fehlversuche laut gesichertem Bericht; neun TAR-GZ-Archive vorhanden | Historische Stress-/Liquiditätsrisiken und dokumentierte Reproduktionsbasis | Neue Validierung jedes Archivinhalts oder aktueller V13-Balancebeweis |
| [0.6b-Zusammenfassung](../../../tests/simulation/phase06b-20261025-01/summary.json) |308 historische unterschiedliche Haupt-/Pilotfälle, politische Strategien/Starts/Budgets | Städtische/Politik-Abhängigkeiten und damalige Prüfgrenzen | Heutige reine Handels- oder Gebührenkohorte |
| [0.6c-Zusammenfassung](../../../tests/simulation/phase06c-20261025-01/summary.json) |132 unterschiedliche Fälle, meist ein Hauptseed, elf Städte/mehrere politische Regeln | Hinweise auf Stadt-/Start-/Strategieabhängigkeit | Repräsentative Bevölkerung, heutige optimale Geldentwicklung |
| Q1.01–Q1.03 | Gleiche heutige Produktdatei; Audit, echte damalige Q-001/Q-003-Proben, später nur Konzept | Aktuelle Fehler-/Interpretationsgrenzen, keine neue Gebührfreigabe | Bereits implementierte Gilde, neue Politik oder reparierte Bewertung |

Die Tabellenwerte der ersten drei Datensätze wurden direkt gelesen und strukturiert zusammengefasst: [historisches Dateninventar](../../../tests/analysis/q1_04/results/history.json), [Quellverfügbarkeit](../../../tests/analysis/q1_04/results/history-source-availability.json). Die Archive mit2.250 Fällen wurden **nicht nochmals alle entpackt oder pro Einzelverlauf bilanziert**; geprüft sind vorhandene Archivdateien sowie lesbare Manifest-/Summendaten. Spätere0.6b/0.6c-Übersichten wurden gelesen, nicht neu berechnet.

## Versionsunterschiede und Reproduzierbarkeit

Die1.500er-,90er- und2.250er-Daten tragen denselben damaligen Spielhash `42db1ba03b91f910be024dc69e31752054ef1204b170408686a40eca10d572af`, **nicht** den aktuellen V13-Hash. Gesicherte Produktquellen bei `51478fba2d36b78ed6d49231a9bd4fe582e19ea4` und `51a238499e7ff1ae8e02bf36fd0e5d335b67154a` sind abrufbar und ergeben genau diesen alten Hash.0.6c-HTML bei `fc241b5196439cc3577675951be8b3ff2df42169` ist ebenfalls vorhanden, Hash `fdc662deb06ab65de63fd113f1487a43ab4e12fe6bcbfef84771d19501bf9255`.

Damit sind Quellen und damalige Protokolle technisch referenzierbar. Eine **heute neu bestätigte vollständige Reproduktion** wird nicht behauptet: Dafür müssten auch alle historischen Treiber-/Harnessstände aus den passenden Commits wiederhergestellt werden. Die aktuellen `integrated.cjs`-/Treiber enthalten historische Paritätsbedingungen und schreiben alte Ausgabepfade; sie wurden ausdrücklich nicht gestartet.

Seit den frühen Daten: Preisrundung für niedrige Preise korrigiert, elf Städte/elf Waren aktiviert, Binnenumschlag und regionale Bestands-/Preisrückkehr, Schiffverkauf/Rettungsarbeit, Lagerkapazität/Miete, Materialschiffbau, politische Leistungen/Ämter, freie Startwahl, Handelsinformationen und UI-/Sicherungsregeln hinzugekommen. Die alte5-Städte-/7-Waren-Phase ist keine heutige Vollwirtschaft. Nicht jede spätere Änderung beeinflusst jeden reinen Törn, aber Gleichheit des gesamten alten Laufs folgt daraus nicht.

## Informationsstand und unterschiedliche Endbedingungen

Der alte optimierte Händler liest entfernte aktuelle Märkte. Alte absichtliche Verluststrategien wählen teilweise mit adversariellem Allmarkt-Orakel. Das ist kein zulässiger aktueller Spielermaßstab. Vorsichtig/normal/aggressiv nutzen beobachtete Preisnotizen, unterscheiden sich aber zwischen historischen Treibergenerationen. Neu verwendet werden nur die überprüften **reinen beobachtungsbasierten Planer**, keine alte komplette Karriereautomation.

Historischer Lieferlauf endet oft nach einem einzigen Auftrag in4–5 Tagen; normale Handelsläufe laufen bis ungefähr1.440 Tage, Verlust-/Erholungspfade haben wieder andere Stopps. Geldsummen solcher Endpunkte nicht als direkte Leistungsrangliste vergleichen. Bei1.5e sind tatsächliche Ereignisse maßgeblich: damals90 erfüllte Aufträge/84.010 Prämien im optimierten Arm trotz interner Nullzähler dokumentiert. Keine erneute Berechnung oder Änderung dieser historischen Dateien.

## Was die Altserien über Risiken zeigen

Die1.6c-Stressübersicht meldet nach20 Verlustzielen106/250 Reiseblockaden und144 Erholungen, nach30 Verlustzielen249/250 Blockaden und nur eine Erholung; nicht jeder Lauf erreicht sein Verlustziel. Positives Buchvermögen schließt Geldmangel also nicht aus. Das sind **historische, stark adversarielle Bedingungen**, keine aktuelle Insolvenzwahrscheinlichkeit. Der heutige Rettungsweg/andere Regeln existierten damals noch nicht entsprechend.

Q1.02 zeigt im heutigen Produkt Restbuchwert-/Rufgewinne bei gleicher Kasse/Menge. Deshalb keine alte/aktuelle `wealth`-Steigerung ungeprüft als ausgabefähigen Erfolg behandeln. Die neue Messung trennt Kasse, Schuld, tatsächlichen Handelsgewinn, Piratenverlust und Schiffsbuchwert; W1/W2 werden nicht übernommen.

## Warum zusätzliche kurze Läufe erforderlich waren

Kein gelesener Altbestand liefert gleichzeitig aktuelle V13, ausschließlich zulässige Informationen, fünf klar abgegrenzte Wirtschaftsstile, Zeitpunkte mit Rücklagen und gepaarte einmalige Gebührenfolgen. Daher erst kleiner aktueller Pilot mit Reproduktion, dann höchstens26 kurze Ausführungen nach eingefrorenem Plan. Keine neuen1.500er-/2.250er-Serien und keine historischen Ergebnisdateien überschrieben.
