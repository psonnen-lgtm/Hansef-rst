# R1.11 – Politik, Wahlen, Ansehen und Gesellschaft

Forschungsabschluss 28.10.2026. Branch `research/r1-11-politics-society`. Ausgangspunkt R1.10: `b71d467fd5437565fea8fa43ac2ea8c5b25d470b`. Frühere Forschung unverändert; keine Produktänderung, Simulation, Pages-Änderung oder Zusammenführung.

## Ergebnis und Nachweisgrenzen

**Direkt im Originalspiel beobachtet:** Geprüfter R1.10-Spielstand R110A regulär geladen. Ausgang Lübeck, 4. Heuet 1355, Kraier Albatross, fünf Matrosen, Schiffskasse 248 Taler. Rathaus mit Wahltafel, drei Türen und Ausliegerangebot; Volksmeinung, Kirche, Badehaus, Festangebot und Gildeneingang untersucht. Wahltafel: nächste Ratswahl 19. Scheiding 1356. Keine Kandidatur, Bürgermeisterwahl, Stimmverteilung oder Hansetag erreicht. Gesperrt wirkende Türen zeigten keine ausdrückliche Sperrmeldung; ihre Amtsvoraussetzung stammt aus dem Handbuch.

**Durch Originaldokumentation belegt:** Zuerst Bürgermeister der Heimatstadt, danach Ältermann als Siegziel; Bürgermeister- und Ältermannwahlen alle zwei Jahre. Gemeinwohl, gesellschaftliches Engagement und überregionaler Ruf werden als wichtig beschrieben. Vermögen allein wird als unzureichende Strategie dargestellt. Gildenmitgliedschaft verbessert Wahlchancen; eine zwingende Mitgliedschaft als Kandidaturbedingung ist damit nicht bewiesen. Feste/Hochzeiten können Ruf positiv oder negativ beeinflussen. Konvoischutz und Ausliegerdienst sind als verdienstvoll dokumentiert, hier nicht praktisch getestet. Keine exakten Wahl-, Spenden- oder Stimmenformeln rekonstruiert.

Primärquelle ist das bereitgestellte Originalhandbuch, nicht Patrizier II/III. Gedruckte Seiten und PDF-Seiten, Quellenstatus und Grenzen stehen im [Quellenbericht B](R1_11_B_karriere_und_quellen.md) und [Quellenregister](R1_11_B_quellen.json). Scans und geschützte Bildschirmbilder werden nicht veröffentlicht.

## Tatsächliche gesellschaftliche Versuche

| Versuch | Datum | Kasse vorher → nachher | Sichtbares Ergebnis |
|---|---|---:|---|
| Ausgangsstatus | 4. Heuet 1355 | 248 → 248 | Volksgunst: „nicht vorhanden“; Politik: „nicht vertreten“ |
| Kirchbauspende 100 angeboten | 4. Heuet | 248 → 248 | Zurückgewiesen; keine Zahlung; Status unverändert |
| Bettleralmosen 25 | 4. Heuet | 248 → 223 | Zahlung bestätigt; Status unmittelbar unverändert |
| Ein normaler Hafentag abgewartet | 5. Heuet | 223 → 223 | Beide qualitativen Kategorien unverändert |
| Badehaus, Antwort Nein auf Alleinbaden | 5. Heuet | 223 → 223 | Baderückmeldung; danach Kategorien unverändert |

Die vollständigen sichtbaren Kategorien stehen in der [Mess-CSV](R1_11_C_ansehensmessungen.csv). Keine numerischen Originalrufwerte erfunden. Unveränderte Kategorien beweisen keine fehlende interne Wirkung. Weihwasser am tatsächlichen Taufbecken war Voraussetzung der Kirchenbedienung; sein eigener Einfluss wurde nicht isoliert. Keine Kontrollgruppe ohne Handlung über denselben Tag. Festangebot abgelehnt, keine Hochzeit oder Bestechung durchgeführt. Gilde verlangte sichtbar 20.630 Taler; kein Beitritt. Siehe [Gesellschaftsbericht C](R1_11_C_gesellschaft_und_ansehen.md).

## Bedienung und Reproduzierbarkeit

[Menüs A](R1_11_A_politische_menues.csv) und [Gesellschaftsmenüs C](R1_11_C_gesellschaftsmenues.csv) nennen Einstieg, Aktionen, Rückkehr und gezählte Bedienhandlungen. Rathaus vom Hafen über Marktplatz: zwei Klicks; Wahltafel ein weiterer. Gezählt wurden beobachtete Wege, kein garantiertes Minimum. Keine menschliche Bedienzeit gemessen. Politische Informationen bleiben teilweise qualitativ; das macht kleine Fortschritte im Versuch unsichtbar. Diese Bewertung ist subjektiv, kein Beweis einer bestimmten internen Modellierung.

Bestehende DOSBox 0.74-3-Konfiguration weiterverwendet, keine Originalprogramme verändert. Ein verfrühter Klick in der Einleitung öffnete zunächst eine leere Charaktermaske; kein neuer Charakter angelegt, Emulator einmal neu gestartet und danach Hauptmenü visuell geprüft. Einzelne während des Schreibens gelesene Bildschirmdateien waren unvollständig und wurden erneut aufgenommen; ungültige Belege getrennt markiert.

Privater Ausgang vor Gesellschaft: SHA-256 `e43a37fbab4438d997a9dfc1e11b77b7372977ed2b9773587bf4d0e1b4999e59`. Separater Endstand R111C: `fdd69d652b8f8e72f6517f603c17e3d201fc91e174a373a1477d9995a760dc74`, 5. Heuet, 223 Taler, fünf Matrosen. Endstand regulär geschrieben und privat kopiert, **nicht erneut geladen**. Frühere Spielstände nicht überschrieben. Emulator nach Versuchsende beendet. Keine neue Seereise in R1.11.

## Vergleich mit Hansefürst

**Im Hansefürst-Code bestätigt:** Tatsächliche Entwicklungsfassung `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Datei `Hansefuerst_0_4.html`, Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`, ausschließlich statisch geprüft. Remote-Blob und lokale Datei stimmen überein; der Remote-Textabruf der großen Datei lieferte keinen Inhalt. Keine Ausführung oder Wirtschaftssimulation.

Bereits vorhanden sind fünf Karriereränge, örtliche Dienste und Ratszusagen, transparente Unterstützung, deterministische Bürgermeisterprüfung, Amtsbewährung, fremde Stadtsiegel und Hansevertrag. Vermögen allein genügt bereits nicht. Standardwerte umfassen 60-Tage-Ratsabschnitte, 360-Tage-Amtszeit und Ansehensschwellen 55/90; gespeicherte Regeln können abweichen. Die Rivalenanzeige bildet Unterstützerkreise ab, keine autonomen Gegenkandidaten mit eigenen Flotten/Vermögen. Spenden erhöhen globalen Ruf wiederholbar, ersetzen aber keine örtlichen Urkunden. Badehaus besitzt bereits politische Hinweise. Vollständige Formeln und feste Zeilenbelege: [Codevergleich](R1_11_D_vergleich_hansefuerst.md), [Vergleichstabelle CSV](R1_11_D_mechanikenvergleich.csv).

## Fünf unverbindliche Empfehlungen

1. **Beibehalten/Verbessern:** vorhandene Ratstafel und örtliche Ursachenbelege verständlich halten; keine zusätzliche undurchsichtige Rufleiste voraussetzen.
2. **Verbessern:** die zwei bestehenden Diensttypen inhaltlich variieren, mit wirtschaftlichen Entscheidungen statt repetitiver Pflichtspenden.
3. **Weitere Forschung erforderlich:** begrenzte aktive politische Konkurrenz mit sichtbaren Mitteln und erklärbaren Ergebnissen prüfen.
4. **Beibehalten/Verbessern:** sinnvolle Wahlfenster und Amtsentscheidungen; erworbene Fortschritte nach Niederlagen erhalten.
5. **Weitere Forschung erforderlich:** Spenden-, Handels-, Ankunfts- und Schutzverdienste gemeinsam bewerten, ohne den politischen Weg durch bloßes Geld oder Kurzrouten zu verkürzen.

Nutzen, Aufwand und Risiken sind **Hypothesen**, keine gemessenen Spaßergebnisse. Keine Umsetzung freigegeben. Wirtschaft, laufende Amtsfristen und Altspielstände müssten bei späteren Änderungen geschützt werden.

## 90 aktive Stunden – Ziel, keine Messung

[Karrierekonzept](R1_11_90_stunden_karrierekonzept.md): hypothetische Budgets 8 + 17 + 20 + 20 + 25 Stunden für Handelsbasis, örtliche Bekanntheit, Bürgermeisterkandidatur, Amtsbewährung und überregionalen Aufstieg. Keine künstlichen Mindestzeiten, keine Umrechnung von Spieltagen in Stunden. Abwechslungsreiche Zwischenziele, Erholung nach Rückschlägen und Weiterspielen nach Eldermann sind wichtiger als bloß erhöhte Schwellen. Aktuelle Spieldauer ist nicht validiert.

## Sicherungspunkte und offene Fragen

A: `a7a02ce7b0143caa4d36abfaa0ab149e83ec54c4` – politische Oberfläche.

B: `eb4723614bd6856ea05f3976285ac33a1853f91a` – Originalquellen und Karriere.

C: `0f366fb539d3dc0cd3558b36eb6519bd6a3c2d2f` – Gesellschaft und qualitative Messreihe.

D: dieser abschließende Commit – Vergleich, Katalog, Karrierekonzept und Gesamtergebnis. Alle veröffentlichten Dateien werden nach jedem Sicherungspunkt exakt zurückgelesen. Private Spielstände/Bildschirmbelege bleiben separat.

Offen: interne Rufvariablen, Wirkungsschwellen und Verzögerungen, Kandidatenauswahl und Mindestvermögen im Original, tatsächliche Stimmenverteilung, politische Badehausaktionen, Wiederwahl nach Niederlage und praktischer Hansetag. Keine Langzeitpartie erzwungen. Gezielter späterer Schritt wäre ein einziger isolierter Gesellschaftsversuch mit besser sichtbarer Ausgangskategorie oder ein regulär erreichbarer Wahltermin; keine Folgephase gestartet.

[Versionierter Vergleichskatalog](../forschungskatalog/R1_11_politik_gesellschaft.md) · [strukturierte Gesamtdaten](R1_11_daten.json).
