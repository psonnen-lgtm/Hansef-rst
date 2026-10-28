# R1.05 - Wirtschaft, Politik und Ereignisse

Stand: 28.10.2026. Grundlage: bereitgestelltes deutsches Handbuch (PDF-Seitenzählung ab erster PDF-Seite) und eigene Untersuchung der Originaldateien. Keine laufende Wirtschaft und keine Wahl im Emulator beobachtet. Kennzeichnung: A-H = Handbuchregel; A-D = statischer Dateibefund; A-O = Emulationsbeobachtung; B = unbestätigte Rekonstruktion. Keine der folgenden qualitativen Handbuchregeln ist bereits eine nachgewiesene Programmformel.

## Wirtschaft

| Frage | Belastbares Ergebnis | Beleg / Grenze |
|---|---|---|
| Warenzahl | Handbuch nennt 18 Handelswaren; Datei enthält zusätzlich Waffen | A-H PDF 17, 76-77; A-D DATEI.1 |
| Warenbestände | Schiff und Lager besitzen Mengen; Handeln und Feste greifen auf Vorräte zu | A-H PDF 48, 61-62, 65; keine Zustandsmessung |
| Preise | Nach Handbuch dynamisch, innerhalb von Grenzen, abhängig von Angebot/Nachfrage und Stadtwirtschaft | A-H PDF 17; keine Preisfunktion |
| Kauf/Verkauf | Unterschiedliche angezeigte Preise und begrenzte Handelsmengen | A-H PDF 48; keine Spread-Höhe |
| Produktion | Bevölkerungs- und Rohstoffabhängigkeiten werden ausdrücklich beschrieben | A-H PDF 17, 62; keine Mengenformeln |
| Versorgung | Nahrung beeinflusst Bevölkerungsentwicklung | A-H PDF 17; keine Verbrauchsraten |
| Saison | Einige Waren werden saisonal produziert | A-H PDF 47; kein Kalenderprofil rekonstruiert |
| Eigenproduktion | Gehilfen produzieren aus eigenen Lagervorräten | A-H PDF 47, 57, 62 |
| Stadtkapital | Stadtunterschiede bei Geldreserven; luxuriöser Handel kann laut Handbuch die Stadt finanziell schwächen | A-H PDF 17, 36-38; keine Stadtkassenbilanz |
| Marktauffüllung | Keine tägliche/periodische Auffüllungsroutine nachgewiesen | offen |
| Anfangsbestände | PSA/PSB sind unterschiedliche Datenvorlagen; Feldbedeutungen nicht entschlüsselt | A-D; keine Werte als Marktbestand etikettiert |

Die in DATEI.1 gefundenen 19 Bezeichnungen: Waffen, Getreide, Fleisch, Fisch, Bier, Honig, Tuch, Geschirr, Holz, Wein, Pfeffer, Pelze, Tran, Roheisen, Wolle, Salz, Leder, Hanf, Pech. Die Liste allein beweist nicht 19 identische Standardmarkt-Waren. Das Handbuch behandelt Handwaffen gesondert über die Hafenkneipe. Deshalb ist **18 reguläre Handelswaren plus ein besonderer Waffenbereich** eine gut gestützte Lesart der Dokumentation; die vollständige Warenindexlogik bleibt offen.

Handbuchbeispiele für Verknüpfungen (A-H, PDF 17/62): Geschirr benötigt Roheisen und Leder, Tuch Wolle, Bier Getreide. Kein Rezeptfaktor nachgewiesen. Auch „echte Bestände“ und „vereinfachte Formeln“ sind kein Gegensatz: eine bestandsgeführte Simulation kann jeden Tag vereinfachte Produktions-/Verbrauchsformeln anwenden. Welche Aktualisierung das Original tatsächlich ausführt, wurde nicht ermittelt.

Kredite (A-H, PDF 53-55): Reputation beeinflusst die Bereitschaft und Konditionen der Kreditgeber. Ablehnen/Verhandeln kann sich verschlechtern. Tilgung ist in der Aufnahmestadt möglich; bei Fälligkeit wird aus dem Kontor eingezogen, gegebenenfalls ein Schiff gepfändet. Stadt- und Mitspielerkredite sowie automatische Rückzahlung ins Heimatkontor werden beschrieben. Monatliche Steuern und ein unfreiwilliger Kredit bei zu großem Kontorminus sind dokumentiert. Kein Zinssatz, kein Zinstakt und keine exponentielle Zinsformel aus dem Programm nachgewiesen. Keine Handelsrendite gemessen.

## Bürgermeister und Ältermann/Eldermann

Die Originalquellen verwenden unterschiedliche Schreibweisen, insbesondere Ältermann und Aeldermann. Hier bezeichnet Eldermann denselben Zielrang des Forschungsauftrags, keine zusätzlich gefundene Amtsstufe.

| Aspekt | Befund | Evidenz |
|---|---|---|
| Weg zum Bürgermeister | Geschickter Handel und soziales Engagement sollen Sympathie der Heimatstadt erzeugen | A-H PDF 17, 37-38 |
| Vermögen allein | Das Handbuch warnt ausdrücklich vor reinem privaten Gewinnstreben | A-H PDF 38; kein mathematischer Ausschlussbeweis |
| Kandidatur | Keine vollständige Liste harter Schwellen (Vermögen, Rang, Alter, Heirat, Gilde) rekonstruiert | offen |
| Wahlen | Bürgermeister- und Ältermannwahlen werden alle zwei Jahre beschrieben | A-H PDF 66; tatsächlicher Kalender nicht gemessen |
| Beliebtheit | Volksmeinung auf dem Marktplatz liefert qualitative Wahlaussichten | A-H PDF 66 |
| Spenden | Kirche, Kirchbau und Bettler als eigene Interaktionen | A-H PDF 67; Gewichte/Deckel offen |
| Feste | Lagergüter werden verbraucht; unzureichende Bewirtung schadet der Reputation und damit den Wahlaussichten | A-H PDF 65, 67 |
| Gilde | Mitgliedschaft erhöht laut Handbuch die Wahlchancen; verschiedene örtliche Gilden | A-H PDF 49, 71-72; keine zwingende Kandidaturbedingung belegt |
| Badehaus | Als potenziell ungesetzlicher letzter Weg kurz vor einer Wahl angedeutet | A-H PDF 68; genaue Bestechungs-/Erpressungswirkung offen |
| Bürgermeisterrechte | Eigene Kaperflotte, Stadtverteidigung und zusätzliche privat zu tragende Truppen | A-H PDF 86-87 |
| Steuern | Texte zu alter/neuer Steuer und Festsetzung befinden sich bei `0x8720` ff. in PATR.EXE | A-D; kein bedienter Dialog |
| Eldermannzugang | Bürgermeisteramt eröffnet Teilnahme am Hansetag und die Möglichkeit des Zielamts | A-H PDF 17, 37, 87 |
| Überregionale Rolle | Händler anderer Hansestädte und auswärtiger Kontore werden im Wahlkontext genannt; auswärtiger Ruf wird empfohlen | A-H PDF 17, 87 |
| Stimmen | Auszählung nach Städten/Kandidaten wird durch Wahltexte gestützt | A-D PATR.EXE um `0x7550` und `0x86a0`; keine Gewichte |

**Antwort auf die Kernfrage:** Das dokumentierte Spieldesign verlangt mehr als das Anhäufen von Geld: städtische Versorgung, Beliebtheit und politisches/gesellschaftliches Handeln stehen ausdrücklich im Mittelpunkt. Ob eine ausschließlich wirtschaftliche Strategie durch guten Versorgungshandel auch ohne Spenden/Feste gewinnen kann, ist nicht entschieden. „Soziale Investition wirkt“ ist dokumentiert; „jede erfolgreiche Partie muss mindestens X Spenden tätigen“ ist nicht bewiesen. Überregionale Bekanntheit darf nicht ohne Weiteres mit einer technisch bestätigten separaten Vertrauensvariable je Stadt gleichgesetzt werden.

Kein belegter Stimmenbonus je Taler, keine Halbwertszeit des Ansehens, keine Stadtgewichtung, keine exakte Rivalenstrategie und keine Wahlformel. Die 16 Datenstädte sind nicht automatisch 16 gleichberechtigte Wahlstädte; das Handbuch unterscheidet acht mögliche Heimatstädte und auswärtige Kontore.

## Ereignisse: Existenz und Beweisgrenzen

| Kandidat | Was tatsächlich belegt ist | Auswirkungen/Hilfe | Häufigkeit und Dauer |
|---|---|---|---|
| Pest | Meldung zum Ausbruch bei `0x93be`, Meldung zum Ende bei `0x2d6a7` in PATR.EXE | Textbezug zu Todesfällen; exakte Bevölkerung-/Ansehenswirkung offen | unbekannt; Endtext beweist keinen bestimmten Timer |
| Stadtfeuer | Meldungsblock um `0x93d9` enthält Feuer mit Übergriff auf den Hafen | Schaden, Spendenwirkung und Wiederaufbau nicht rekonstruiert | unbekannt |
| Sturm/Schiffsverlust | Verlustmeldung bei `0x5530`; Handbuch warnt bei schlechtem Zustand | A-H PDF 40: bis Totalverlust; keine Schadenskurve | unbekannt |
| Hungersnot | Nicht als eigenständiges Stadtereignis bestätigt | Nahrung/Bevölkerung laut Handbuch verknüpft; Hungertext bei Festen ist kein Hungersnotbeleg | nicht bestätigt |
| Sturmflut | Nicht als eigene aktive Spielmechanik bestätigt | Handbuch erwähnt historisches Schiffswrack, nicht automatisch ein Spielevent | nicht bestätigt |
| Piraten | Aktive/passive Gefechte und Schutzmaßnahmen dokumentiert | A-H PDF 77-86: Waffen, Mannschaft, Auslieger, Konvoi, Kaperflotte | keine Rate |
| Boykott | Hanse kann nach Übergriffen in einem Kontor einen Boykott beschließen | A-H PDF 86: Flotte kann Blockadebrecher aufbringen, Geldstrafe | keine Rate/Dauer |
| Belagerung | Anmarsch/Hilferuf über Chronik und militärische Verteidigung dokumentiert | A-H PDF 87: Materialhilfe möglich, Truppen benötigen Handwaffen/Tuch/Getreide/Fleisch | keine Rate; kein gemessener Hilfsbonus |
| Enteignung | Politischer Meldungsblock um `0x12200` in PATR.EXE | Eigentumsfolgen angedeutet; keine Feldänderung verfolgt | unbekannt |
| Amtsverlust | Absetzungsnachricht um `0x1053d` | Kontext militärischer Nachrichten; kausale Bedingung nicht gesichert | unbekannt |

Keines dieser Ereignisse trat in einem beobachteten Spielzug dieser Runde auf. Textfund, dokumentierte Spielregel und tatsächlich ausgeführte Wirkung bleiben getrennt. Es werden ausdrücklich **keine Ereigniswahrscheinlichkeiten** angegeben.

## Weitere verknüpfte Mechaniken und Langzeitmotivation

A-H: Schiffsverkauf an einen Landesfürsten kann später Kaperfahrer begünstigen (PDF 72). Unterstützung eines Piraten kann vergünstigte erbeutete Schiffe eröffnen (PDF 77). Solche Zusammenhänge verbinden ein kurzfristig lukratives Geschäft mit späterem Handelsrisiko.

A-H: Flottenaufrufe verlangen Schiffe an einem bestimmten Ort zu einem bestimmten Termin; Nichterfüllung führt zu Strafen, Schiffe sind zeitweise dem Handel entzogen und können verloren gehen (PDF 85-86). Als Bürgermeister werden zusätzliche Truppen über den städtisch gedeckten Rahmen hinaus privat finanziert (PDF 87). Dies sind konkrete wirtschaftliche Opportunitätskosten politischer Funktionen.

A-H: Rivalen werden bei der Einbürgerung vorgestellt und als politische Gegner beschrieben (PDF 38); die Gilde liefert Informationen über sie (PDF 71). Die Chronik bündelt Ankünfte und politische/historische Nachrichten (PDF 38-39). Nicht jede historische Erläuterung am Seitenrand des Handbuchs ist eine ausführbare Mechanik; insbesondere keine generelle Gerichts-/Bestechungssimulation aus historischen Passagen ableiten.

Keine Zahl von Spieljahren bis zum Bürgermeister oder Eldermann gemessen. Zweijährliche Wahlen sagen weder eine Mindestzahl erfolgreicher Wahlgänge noch reale Spielstunden voraus. Keine belastbare Angabe zu Reisen pro Jahr, Rivalendynamik, Leerlaufanteil oder menschlicher Dauer. Die Hansefürst-Zielzeit von 20-30 aktiven Stunden wird durch diese Runde weder bestätigt noch widerlegt.

## Offene Kernfragen

1. Regulärer Spielstart, Stadtmarkt und erster datierter Schiffszug.
2. Unterscheidung PSA/PSB, Datenfelder für Geld, Markt, Bevölkerung und Ansehen.
3. Tages-/Monatsaktualisierung und Preisanpassung bei Einzeltransaktionen.
4. Wahlauslöser, Kandidatenfilter, Berechnung der Stimmen pro Stadt und Rivalenwerte.
5. Ereignisgenerator, Timer und konkrete Wirkungen auf Bestand, Ruf und Wahlen.
6. Rechtmäßiger Zugang zu einer eventuell abgefragten Original-Handelskarte; keine Schutzumgehung.
