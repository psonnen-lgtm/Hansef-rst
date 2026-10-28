# R1.05 - Erkenntnisse für Hansefürst

Stand 28.10.2026. Forschungsauftrag, keine Implementierung und keine Balanceänderung. Bezugspunkt des Analysebranches: `development/v04-foundation`, Commit `ffc0bfad0e36e4547f7a5750bb68b169f93f8009`. Hansefürst-Code wurde weder ausgeführt noch verändert. Der Branchname beweist keinen unverändert auf Version 0.4 stehenden Produktstand.

A bezeichnet belegte Originalbefunde, mit Zusatz H für Handbuch, D für Dateistruktur, O für beobachteten Emulatorablauf. B ist Rekonstruktion; C ist eine Empfehlung und bedarf für wesentliche Spielregeln der Nutzerentscheidung.

| Thema | A: Originalbeleg | B: noch unbestätigt | C: Empfehlung für Hansefürst |
|---|---|---|---|
| Reisen | D: symmetrische 16×16-Wertetabelle; H: vier Schiffstypen | Einheit, Stadtzuordnung im Code, Tagesformel | Bestehende Reisezeiten erst nach realer Messung neu kalibrieren |
| Lübeck/Hamburg | H: langer Seeweg und gesonderter Landtransport | genaue Dauer und Kosten | See- und Landverbindung als unterschiedliche Funktionen prüfen |
| Wirtschaft | H: Rohstoffe, Produktion, Bevölkerung und Nahrung gekoppelt | konkrete Updateformeln und Stabilität | Wenige verständliche Lieferketten und sichtbar wirksame Versorgung priorisieren |
| Politischer Aufstieg | H: Beliebtheit, Versorgung, Feste, Spenden und Gilden wirken | notwendige Mindestaktivitäten und Stimmengewichte | Wirtschaftlicher Erfolg schafft Handlungsspielraum; örtliche Anerkennung durch nachvollziehbare Leistungen verdienen lassen |
| Kosten der Politik | H: Fest verbraucht Vorräte, Flotte bindet Schiffe, Zusatztruppen kosten privat | exakte Erfolgs-/Kostenkurven | Politische Aktivitäten mit realen Ressourcen- und Zeitkosten verbinden, monotone Geldklicks vermeiden |
| Überregionale Verdienste | H: Bürgermeister/Hansetag und Ruf in anderen Niederlassungen | eigenständige Vertrauenswerte je Stadt | Stadtbezogenes Vertrauen und überregionale Leistungen bewusst als eigenes Design entscheiden |
| Ereignisse | H: Boykotte, Piraten, Belagerung; D: Feuer-/Pesttexte | Häufigkeit, Hilfswirkung, Timer | Wenige seltene, nachvollziehbare Ereignisse mit mehreren Reaktionsmöglichkeiten |
| Rivalen | H: wirtschaftliche und politische Gegner sowie Gildeninformationen | autonome Handels- und Wahlstrategie | Rivalen sichtbar handeln lassen; ihre Wirkung transparent genug halten, um Gegenstrategien zu ermöglichen |
| Bedienung | H: Kontor, Markt, Gilde, Rathaus und Kneipe als Funktionsorte | Qualität auf Touchgeräten | Weltintegrierte Orte beibehalten, Ziele und Kosten auch auf iPhone/iPad klar zeigen |
| Motivation | H: mehr Schiffe bedeuten mehr Ankunftsentscheidungen; neue politische Funktionen | tatsächlicher Leerlauf und Endspieldauer | Handlungstakt und neue Verantwortung messen; keine reale Stundenzahl aus Spieljahren ableiten |

## Annahmen, die wir überdenken sollten

- **19 Waren gleich 19 Standardmarktgüter:** Das Handbuch spricht von 18 und behandelt Waffen gesondert. Eine einzelne extrahierte Liste reicht nicht zur Übernahme des Marktkatalogs.
- **Matrixwert gleich Reisezeit:** 93 ist ein Dateiwert, keine beobachtete Tageszahl. Auch eine allgemeine Teilung durch einen geratenen Geschwindigkeitsfaktor ist unzulässig.
- **Reichtum gleich Wahlsieg:** Das dokumentierte Ziel ist Beliebtheit und Gemeinwohl. Ein Vermögensschwellwert allein wäre keine belegte Nachbildung des Originals. Umgekehrt ist auch ein obligatorischer Spendenzwang nicht nachgewiesen.
- **Originalgetreue Ereignisrate:** Es gibt noch keine gemessene Rate. Eine Hansefürst-Frequenz wäre eine eigene Balanceentscheidung.
- **Originalwahl mit sechzehn gleich gewichteten Städten:** Die Quellen unterscheiden Heimatstädte und Kontore. Stimmenverteilung bleibt offen.
- **Automatische Markterholung als Originalbeleg:** Eine solche Routine wurde hier nicht rekonstruiert. Bestehende Hansefürst-Erholung darf damit nicht historisch legitimiert werden.
- **20-30 Stunden durch historische Wahlperioden bewiesen:** Wahlkalender, Spieljahre, Zahl sinnvoller Entscheidungen und aktive menschliche Zeit sind vier verschiedene Größen.

Diese Punkte sind Prüfhinweise für die im Auftrag genannten Ziele, kein vollständiges Audit gegen die aktuelle Hansefürst-Implementierung.

## Bestandsschutz und Validierung

Keine Änderungen an HTML, Assets, Speicherformaten, Wirtschaft oder Simulator. Bestehende Spielstände bleiben durch diesen Auftrag unberührt. Kein Merge und kein Pages-Eingriff. Da weder Hansefürst-Regeln noch Simulator geändert wurden, wurden die 1.500 Wirtschaftssimulationen nicht erneut ausgeführt. Frühere Simulationsergebnisse werden ausschließlich als vom Auftrag vorgegebener Hintergrund übernommen, nicht hier erneut geprüft oder als bestanden ausgewiesen.

Reproduzierbar geprüft wurden stattdessen Dateiinventar/Prüfsummen, FAT12-Lesen, LHA-Datenentpackung, Matrixsymmetrie, Namensabstände und der dokumentierte Emulatorstart. Die Ergebnisse beweisen keine Freigabe einer neuen Spielbalance.

## Nächster sinnvoll begrenzter Forschungsschritt

Ein eigener, erst nach neuem Auftrag beginnender Messversuch: regulären Spielzugang in einer funktionsfähigen grafischen DOSBox-Umgebung herstellen; falls das Original seine Handelskarte abfragt, ausschließlich mit der rechtmäßig vorliegenden Karte beantworten. Danach **genau einen Ausgangsspielstand und zwei Hin-/Rückfahrten Lübeck-Rostock mit demselben Kraier**, dazu Marktbestand/Preis von Getreide vor und nach den Fahrten sichern. Keine Wahlkampagne und keine zusätzliche Hansefürst-Entwicklung in diesem Schritt. Bei erneutem Startblocker nach einer festen kurzen Sitzung abbrechen.

Die Runde R1.05 endet mit den vorliegenden Berichten; es wurde keine Folgephase gestartet.
