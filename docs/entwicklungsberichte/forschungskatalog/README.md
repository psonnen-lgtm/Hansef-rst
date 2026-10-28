# Forschungs- und Vergleichskatalog


Version R1.08, 28.10.2026. Dauerhafte Mechanik-IDs; keine Umsetzung beschlossen. Maschinenlesbare vollständige Einträge: [JSON](mechaniken.json), Übersicht [CSV](mechaniken.csv).

Geprüfter Hansefürst-Quellstand: 02ee6b8fc1507ad078b6b596c333e50d91eeea64; `Hansefuerst_0_4.html`, Release0.8d.1b/V13. Nur statische Prüfung; kein Browser-/Simulationstest, keine Aussage über aktuell ausgelieferte Pages. Der ebenfalls vorhandene alte Prototyp `Hansefuerst_Spiel.html` wird nicht als aktueller Implementierungsstand ausgegeben.

Nachgewiesen = Beobachtung oder gekennzeichnete statische Codeprüfung; dokumentiert = Quellenregel; vermutet = Hypothese/Designwirkung; noch ungeprüft = offen. Aufwand/Priorität sind qualitative Empfehlungen, keine Schätzung in Entwicklertagen. Jede wesentliche Umsetzung braucht die Nutzerentscheidung.

Pflege: Neue Beobachtungen mit Phase, Quelle, Zustand und Datum ergänzen; Originalregel, Beobachtung und Hansefürst-Beleg getrennt halten. Codebelege beim nächsten Audit neu auf festen Commit pinnen. Historische Phasenberichte nicht überschreiben. Neue Katalogversion und Änderungsgrund angeben.


## ECON-01 - Handel, Preisbildung und Wirtschaftskreisläufe

**Original (nachgewiesen: Beobachtung; dokumentiert: Abhängigkeiten; noch ungeprüft: Formeln):** Dokumentiert: begrenzte Bestände, Angebot/Nachfrage und Rohstoff-/Bevölkerungsbezüge; exakte Originalformeln offen.

**Beobachtung:** R1.07 Kauf68/Verkauf47; R1.08 Rostock Kauf47/Verkauf32. Einzeltransaktionen ändern Stadt-/Schiffsvorrat und Kasse.

**Hansefürst (statisch nachgewiesen):** Markt und Kauf/Verkauf in trade; regionalMarketDay koppelt Profile, Bestände und Preisrücklauf. Kein Originalrezept-Nachweis daraus. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L802) Funktionen: trade, regionalPrice, regionalStock, regionalMarketDay, advance.

**Stärken:** Hansefürst führt endliche Bestände und protokollierbare Kosten; Originalspread gibt unmittelbare Handelsreibung. **Schwächen/Grenzen:** Original und Hansefürst unterscheiden sich bei Preis-/Spreadmodell; Original-Rezeptfaktoren noch unbekannt.

**Mögliche Verbesserung:** Spread, Engpassanzeige und regionale Versorgung getrennt bewerten, bevor Parameter geändert werden.

**Erwartete Wirkung (vermutet):** Verständliche Handelsmargen und merkbare Stadtversorgung könnten Entscheidungen stärken.

**Aufwand:** mittel **Priorität:** P1 **Empfehlung:** Zuerst Preis-/Kostenreihen vergleichen; keine ungeprüfte Originalformel übernehmen.


## SHIP-01 - Schiffe, Besatzung und Konvois

**Original (nachgewiesen: Besatzungsdialog/Fahrten; dokumentiert: Typ/Konvoi; noch ungeprüft: Konvoiverhalten):** Dokumentiert: vier Typen Kraier/Schnigge/Kogge/Holk, Besatzung in Kneipe; Konvois.

**Beobachtung:** Anwerbung0→5 kostet5, Plätze113→108; benötigt5. Vier reale Fahrten; ursprüngliche Vier-Mann-Annahme widerlegt. Kein Konvoi getestet.

**Hansefürst (statisch nachgewiesen):** Drei SHIPTYPES: Schnigge/Kogge/Holk. makeShip speichert Zustand, Waffen, Ladung, keine Besatzung; planTravel nutzt Zustand/Geschwindigkeit und langsamstes örtliches Konvoischiff. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L101) Funktionen: makeShip, routeTravelDays, planTravel, harborView.

**Stärken:** Hansefürst zeigt Kosten/Teilnehmer vor Fahrt; Original bindet Personal an Hafenort. **Schwächen/Grenzen:** In geprüften Schiffs-/Abfahrtsfunktionen keine Anwerbe-/Mindestbesatzung; dies ist bewusster prüfbarer Unterschied, kein pauschaler Fehler.

**Mögliche Verbesserung:** Personal nur nach Entscheidung ergänzen; falls gewünscht eine einfache sichtbare Voraussetzung und garantierte Beschaffungsoption prototypisch planen.

**Erwartete Wirkung (vermutet):** Verantwortung für Schiff kann Atmosphäre erhöhen; Suchklicks und unfreiwilliger Stillstand können Spielspaß senken.

**Aufwand:** hoch für vollständiges Personalmodell; niedrig bis mittel für UI-Hinweise **Priorität:** P1 **Empfehlung:** Keine Personalpflicht allein wegen Originalnähe einbauen.


## EVENT-01 - Piraten und Reiseereignisse

**Original (nachgewiesen: sichtbare Vorfälle; noch ungeprüft: Originalauslöser und Häufigkeiten):** Dokumentiert: Piraten, Sturm, aktive/passive Abwehr; Häufigkeiten offen.

**Beobachtung:** R1.08 Heilerangebot im Reise-/Ankunftsübergang; abgelehnt. Zweite Fahrt meldet Liegegebühr21. ZweigB schließt Lübeck–Rostock–Lübeck mit2+3Tagen ab. Keine beobachteten Sturm-/Piratengefechte.

**Hansefürst (statisch nachgewiesen):** rollTravel und arrive lösen Piraten/Abwehr/Sturm bei bestätigter Fahrt aus; Angriffsabwehr berücksichtigt Waffen und Anzahl Schiffe. Diese Codewahrscheinlichkeiten sind keine Originalraten. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1020) Funktionen: rollTravel, arrive, arrivalView.

**Stärken:** Wirkungen sind im Code und Log nachvollziehbar; Vorbereitung erzeugt keine Ereignisse. **Schwächen/Grenzen:** Nur vier Originalfahrten, eine fehlgeleitet und zwei aus wiederhergestelltem Ausgangssave; keine statistisch belastbare Ereignisrate.

**Mögliche Verbesserung:** Künftig Fahrtmanifest, Ereignisart und getrennte Kosten standardisiert erfassen; Hilfs-/Ankunftsangebote separat zählen.

**Erwartete Wirkung (vermutet):** Seltene verständliche Vorfälle könnten Spannung schaffen, ohne jede Fahrt zu unterbrechen.

**Aufwand:** mittel **Priorität:** P1 **Empfehlung:** Erst genügend reguläre Fahrten messen; keine Rate aus n=4 kalibrieren.


## CITY-01 - Städte, Gebäude und Menüs

**Original (nachgewiesen: Bedienbeobachtung; noch ungeprüft: Touchvergleich):** Dokumentiert: Hafen/Kontor/Markt/Rathaus/Kneipe/Bank als Funktionsorte.

**Beobachtung:** R1.07 Stadtwege geöffnet; R1.08 falscher Piraten-/Personalhotspot und Fehlklick Hamburg belegen Verwechslungsrisiken.

**Hansefürst (statisch nachgewiesen):** show/openSheet routen Funktionsorte; CityLife und Stadtlayouts sowie Seekartenmarker/Dropdown und Reisevorbereitung sind im Code vorhanden. Funktionale Schichten bleiben menü-/formularbasiert. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L878) Funktionen: show, openSheet, mapView, drawCity.

**Stärken:** Hansefürst bietet Marker, Zielnamen und Bestätigung vor Fahrt; Original verbindet Orte atmosphärisch. **Schwächen/Grenzen:** Original kleine Trefferzonen/Modalantworten fehleranfällig; Hansefürst-Touchqualität hier nicht zur Laufzeit geprüft.

**Mögliche Verbesserung:** Zielnamen vor Abfahrt und klare beschriftete Gebäude beibehalten; Bedienwege mit echten Touchtests bewerten.

**Erwartete Wirkung (vermutet):** Weniger Fehlklicks bei Erhalt des Stadtgefühls.

**Aufwand:** niedrig bis mittel **Priorität:** P1 **Empfehlung:** Bedienbarkeit priorisieren; keine pauschale Menüentfernung empfehlen.


## FIN-01 - Banken, Kredite und Finanzen

**Original (nachgewiesen: Angebote/Kassenwerte; noch ungeprüft: Originalzinsformel/Gesamtschuld):** Dokumentiert: Anbieter, Laufzeit, Zinsen, Tilgung und Rufabhängigkeit.

**Beobachtung:** R1.07 100 Kredit getrennt vom Handel. R1.08 angenommener Kredit100, Angebot31%/241Tage; zusätzliche12-Taler-Änderung nicht vollständig zugeordnet.

**Hansefürst (statisch nachgewiesen):** bankOp führt Guthaben/Schulden; creditLimit max(1000,45%Nettovermögen); advance berechnet tägliche Anteile zu effektiv2%/6% je360Tage. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L874) Funktionen: bankOp, creditLimit, advance.

**Stärken:** Hansefürst trennt Kreditprincipal und Ertrag sowie transparente feste Konditionen. **Schwächen/Grenzen:** Original variable Angebote schwer vergleichbar; Zeitraum der Originalprozentangabe nicht als Jahreszins nachgewiesen.

**Mögliche Verbesserung:** Finanzierung, Reiseaufwand und realisierten Warengewinn getrennt im Forschungsledger halten.

**Erwartete Wirkung (vermutet):** Transparente Kosten verhindern irreführende Erfolgserlebnisse und Frust.

**Aufwand:** niedrig für Katalog/Ledger; mittel für Produktdarstellung **Priorität:** P1 **Empfehlung:** Keine Originalzinssätze ungeprüft übernehmen; keine Kredite als Gewinn werten.


## SOC-01 - Badehaus und gesellschaftliches Leben

**Original (dokumentiert: Originalwirkung; nachgewiesen: Ortsbesuch; noch ungeprüft: genaue Originalaktionen):** Dokumentiert: Spenden, Feste, Hochzeit und politisch fragwürdiger Badehausweg.

**Beobachtung:** Badehaus besucht; Rückkehr per Figur, keine Bestechungs-/Rufwirkung belegt.

**Hansefürst (statisch nachgewiesen):** bathView/takeBath kostet15Gold und1Tag; erzeugt Handelstipps mit möglichen Falschtipps/Sondergeschäften. Kirchen-/Politikfunktionen sind separat vorhanden; keine Originalbestechung dadurch bewiesen. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L906) Funktionen: bathView, takeBath.

**Stärken:** Hansefürst verknüpft Information mit Zeit und Kosten; Original hat gesellschaftlichen Kontext. **Schwächen/Grenzen:** Original-Badehausmechanik nicht funktional untersucht; Informationsfunktion und politische Manipulation dürfen nicht gleichgesetzt werden.

**Mögliche Verbesserung:** Gesprächsinformation und politische Handlungen als eigenständige Mechaniken katalogisieren.

**Erwartete Wirkung (vermutet):** Gerüchte können Hafenleben beleben; zu viele künstliche Sonderpreise könnten Handel verzerren.

**Aufwand:** mittel **Priorität:** P2 **Empfehlung:** Bestehende Badehausfunktion evaluieren statt sie als fehlend auszugeben.


## POL-01 - Bürgermeisterwahlen und Eldermann

**Original (dokumentiert: Originalwahlregeln; noch ungeprüft: Originalwahlablauf/Formel):** Dokumentiert: sozialer Ruf, Gilde, Versorgung und zweijährige Wahlen; keine Stimmenformel rekonstruiert.

**Beobachtung:** R1.07 Wahltafel gelesen; keine tatsächliche Originalwahl.

**Hansefürst (statisch nachgewiesen):** politicalSupport/mayorQuote/runMayorElection prüfen Vermögen, Ruf, Leistungsbelege/Zusagen. Bürgermeistermehrheit deterministisch; hanseQuote/runHanseAssembly prüfen Amtsführung, Stadtsiegel, Regionen und Vertrag. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L347) Funktionen: politicalSupport, mayorQuote, runMayorElection, hanseQuote, runHanseAssembly.

**Stärken:** Überregionale Verdienste und nachvollziehbare Mehrheiten sind bereits implementiert; kein bloßer Geld-Aufstieg. **Schwächen/Grenzen:** Originalwahl noch unbeobachtet, daher keine Aussage zur Originaltreue der Gewichte. Aktive Rivalen-KI durch Namens-/Zielwerte allein nicht nachgewiesen.

**Mögliche Verbesserung:** Wahlfortschritt und Rivalenhandlungen separat prüfen; bei späteren Tests reale Entscheidungen und Ressourcen zählen.

**Erwartete Wirkung (vermutet):** Sichtbare politische Leistungen können Langzeitziele stärken.

**Aufwand:** mittel bis hoch für Rivalen-/Wahlkampferweiterungen **Priorität:** P2 **Empfehlung:** Bestehende Politik als Ausgangspunkt verwenden; keine Neuimplementierung ohne Auftrag.


## LONG-01 - Langzeitmotivation und Schwierigkeitsgrad

**Original (noch ungeprüft: reale Spielzeit, Original-Endspiel, Schwierigkeitskurve):** Dokumentiert: Handelsausbau, Rivalen, Bürgermeister und Ältermann als Karriere.

**Beobachtung:** R1.08 kurze Anfangsprobe; keine Wahlkampagne und keine menschliche Langzeitmessung.

**Hansefürst (statisch nachgewiesen):** advance lässt Märkte/Zinsen/Fristen fortlaufen; politischer Fortschritt benötigt Abschnitte, örtliche Leistungen, Fürsprecher und Hansevertrag. Keine belegte Garantie von90 aktiven Stunden. [Codebeleg](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L347) Funktionen: advance, politicalPeriod, hanseQuote, acceptHanseAgreement.

**Stärken:** Mehrstufige Aufgaben und Reisefristen sind codebelegt. **Schwächen/Grenzen:** Spieljahre, Ereigniszahl und aktive menschliche Stunden sind verschieden; Codeprüfung ersetzt keine Spielzeitstudie.

**Mögliche Verbesserung:** Später aktive Entscheidungszeit, Wiederholungsanteil, Sackgassen und Karriereetappen messen, Ziel90Stunden ausdrücklich validieren.

**Erwartete Wirkung (vermutet):** Längere Motivation braucht abwechslungsreiche Entscheidungen, nicht bloß längere Wartezeiten.

**Aufwand:** hoch für fundierte Langzeitvalidierung **Priorität:** P1 Forschung, keine sofortige Balanceänderung **Empfehlung:** 90Stunden als Ziel führen; kein Erfahrungswert aus dem Original ableiten.


## Quellen und Grenzen

[Originalhandbuch, online](https://www.mogelpower.de/manuals/Der_Patrizier_Handbuch.pdf); zusätzlich bereitgestelltes Originalhandbuch PDF56/57 und Werft PDF40. [Beobachtungen R1.07](../R1_07/R1_07_forschungsbericht.md), [R1.08 samt Korrekturen](../R1_08/R1_08_forschungsbericht.md). Die Erwähnung von Piraten oder Wahlen in einem Text beweist keine Rate oder Formel. Die Funktion `rollTravel` belegt nur Hansefürst-Regeln, keine Originalwahrscheinlichkeit.

## Fortschreibung R1.09 – aktueller Katalogstand

28.10.2026: [Vergleich und Empfehlungen R1.09](R1_09_vergleich.md), [vollständiger versionierter Katalog JSON](mechaniken_R1_09.json), [Aussagen-CSV](mechaniken_R1_09.csv). Drei Waren, kleine Transaktionsreihen, aktive/passive Tageskontrolle und zusätzliche Kostenbelege. Acht stabile IDs fortgeführt; exakte R1.09-Statuskategorien und Empfehlungskategorien je Aussage. Vorstehender R1.08-Inhalt sowie mechaniken.json/CSV bleiben als historischer Stand erhalten. Keine Umsetzung beschlossen.

## Fortschreibung R1.10 – aktueller Katalogstand

28.10.2026: [Codevergleich und neue Originalbeobachtungen](R1_10_codevergleich.md), [JSON](mechaniken_R1_10.json), [Aussagen-CSV](mechaniken_R1_10.csv), [Forschungsbericht](../R1_10/R1_10_forschungsbericht.md). Acht IDs fortgeführt. Fünf neue Fahrten/28 aufsummierte Reisetage, abhängiger Restore-Versuch und Hamburgfahrt; Kreditmitteilung und qualitatives Zustandsurteil getrennt von Seegefahren. Persistenter Schutz gegen Vor-Reise-Save-Rollback im geprüften Hansefürst-Code nicht belegt; vorhandene Vorbereitungs-/Doppelauslösesicherung enger beschrieben. Historische Dateien bleiben erhalten; keine Umsetzung beschlossen.
