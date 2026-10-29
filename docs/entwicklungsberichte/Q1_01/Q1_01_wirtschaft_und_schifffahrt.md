# Q1.01 – Wirtschaft, Handel, Schifffahrt und Ereignisse

29.10.2026. Sicherungspunkt B. Produktionsbasis durchgehend `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, HTML-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`. **Statische Codeprüfung und erneute Lektüre gesicherter Ergebnisse**, keine neue VM, Fahrt oder Wirtschaftssimulation. Codebelege: [Hauptdatei](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html). Bewertung von Spielspaß ist ein begründetes Designurteil.

## 1. Tatsächliche Wirtschaftsregeln

- Elf endliche örtliche Märkte und elf Waren; private Schiffs-/Lagerware wird nicht täglich verbraucht. Kauf/Verkauf zum gleichen aktuellen Stückpreis. Handelsmenge ändert sofort Bestand und Kasse, **nicht sofort den Preis**. Große Käufe verändern deshalb erst spätere Tagesmärkte. Keine allgemeine mengenabhängige Ausführung oder Kauf-/Verkaufsspanne implementiert (905).
- Täglicher regionaler Bestandsfluss: Profil +1/0/−1, saldiert 1,2 Fass, Rückkehr `0,015×(110−Bestand)`, Zufallsanteil und stochastische Rundung. Tuch/Pelze Faktor0,35; Bergen/Fisch Faktor1,5. Tagesgrenzen3–240, nach unmittelbarem Handel kurzzeitig außerhalb möglich (855–872). Produktion/Verbrauch sind vereinfachte Nettoflüsse, keine Haushalte oder Produktionsketten.
- Je Marktzelle und Tag 35% Preisupdatechance. Richtwert Warenbasis×`2/(1+(Bestand/110)^2)`, Rückführung0,020 sowie Zufallsbewegung. Preisgrenzen4–1e9 (856–872). Regionalität entsteht über Bestände, nicht einen pauschalen Stadtpreisrabatt. Keine unmittelbare Knappheitsprämie für den einzelnen letzten Fasskauf.
- Realisierter Warengewinn = Erlös minus gewichteter Einkauf der verkauften Menge; Herkunfts-FIFO ist **nicht** Kosten-FIFO. Kosten unbekannt: Gewinn unbekannt. Reisen/Miete/Zins/Reparatur kommen hinzu. Der letzte Handelsbeleg ist keine vollständige Nettoergebnisrechnung (788–792,903–905).
- `netWorth` bewertet Ladung/Lager zu Einkauf/Buchkosten, dazu Gold/Bank−Schuld, Schiffe/Bau. Hoher Buchwert ist weder verfügbare Liquidität noch unabhängiger politischer Leistungsnachweis. `politicalWorth` zieht Mietrückstände ab (351,792).

**Stärke:** Nachschub, Nachfrage, Aufkäufe und Lieferungen greifen ineinander, Informationsvorsprung bleibt begrenzt. **Risiko:** Große Soforttransaktionen zum unveränderten Preis und rein mengen-/kostenbasierte Anerkennung können Routinen fördern. Ein Mengenpreisprototyp ist keine freigegebene Lösung; B3/K500 verschlechterte einzelne Fern-/Bergenproben und hatte offene Schutzfragen.

## 2. Vorhandene Daten richtig einordnen

| Gesicherte Reihe | Ergebnis / Bedeutung | Geltungsgrenze |
|---|---|---|
| Phase1.6c | 2.250 Fälle und exakte Replays dokumentiert | Alte Wirtschaft und Politik; kein V13-Strategieranking |
| 0.5e | 1.500 unterschiedliche Fälle; vorsichtige/normale/aggressive/optimierte Gruppen und Stressprofile; starke kurze Routinen, 250 absichtliche Liquiditätsstressfälle | Vor heutigen Regionen, Rettung und Politik; Ergebnis nicht auf aktuellen Stand übertragen |
| 0.5h.3 | 216 Fälle/234 Ausführungen, 72 neue Händler erreichen Eldermann ohne finanzielle Reiseblockade; kurze Pelz-/Tuchprobe11/48 negative Fahrten statt0/48; Bergen-Vergleich63 statt14 Gold je Spieltag | Damaliger Code `2474007…`/abschließend `5c9c77c…`, begrenzte Seeds/Botregeln. Spätere Ämterregeln anders |
| 0.6b | 220 Hauptfälle:211 Bürgermeister,208 Eldermann,0 protokollierte finanzielle Blockaden; politisch früh aktive Gruppen schneller | Neue damalige Politik, aber keine Menschenmessung und kein aktueller Information-/UI-Gesamtnachweis |
| 0.6c | Hauptlauf110:104 Bürgermeister/102 Eldermann; normal55:53/52; früh bewaffnet55:51/50. Verschiedene Karriererichtlinien, ein Hauptseed | Bedingte Mediane schließen Nichtaufsteiger aus; gepaarte Starts nicht unabhängige Zufallsstichproben |
| P1.3 | Tatsächliche V13-Selbstkrisenprobe: Kauf/Verkauf je2400, Endgold10000 und Eigenware60 unverändert; Bericht bestätigt+2 globalen Ruf und höhere Restkosten | Ein begrenztes Fixture mit Umladen/Jahreswechsel, nicht unbegrenzt wiederholt; neue öffentliche Versorgung0. Produktive Herkunftsprüfung nicht ausgehebelt |
| P1.4 | Acht begrenzte V13-Kontrollverläufe zu Zeiten/Fristen/Zins/Verkauf, Wetterzweige kontrolliert; gleicher Produkt-Hash | Nicht integrierte B/C-Zeitvorschläge und keine Ereignisstatistik |

Quellen im festen Auditbasisbaum: [0.5h.3](../2026-10-25_0.5h3_regionale_wirtschaft_aktivierung.md), [0.6b summary](../../../tests/simulation/phase06b-20261025-01/summary.json), [0.6c summary](../../../tests/simulation/phase06c-20261025-01/summary.json), [P1.3 Bericht](../2026-10-27_P13_entscheidung.md), [korrigiertes audit-final](../../../tests/analysis/phaseP13/results/audit-final.json). JSON neu gelesen, alte Läufe nicht neu berechnet. Die P1.3-Rohdaten nennen12 Kontexte inklusive eines früheren Abbruchs, elf vollständige Pfade. Fehler des ersten Auswerters nicht übernehmen.

**Strategieurteil:** Vorsichtig/normal/aggressiv/optimiert waren historisch ausführbar, sind heute nicht als vier gleichwertige langfristige Spielstile nachgewiesen. Spätere Reihen unterscheiden unter anderem wealth/early/supply/remote/balanced; diese Namen dürfen nicht still mit alten Risikoprofilen gleichgesetzt werden. Bots nutzen begrenzte Informations- und Entscheidungsregeln. Weder bester menschlicher Weg noch allgemeine Sackgassenfreiheit oder Dominanzfreiheit ist belegt. Gezielte spätere gepaarte Kurzproben wären sinnvoll, kein neuer1500er-Auftrag aus diesem Audit.

## 3. Finanzen, Kosten und Erholung

| Posten | Tatsächliche Regel | Einordnung |
|---|---|---|
| Hafen | Schnigge4/Kogge6/Holk9 Gold je gereistem Schiff, einmal bei Ankunft | Nicht tageabhängig, nicht Original14Taler; Konvoi summiert Gebühren |
| Reparatur | `ceil((100−Zustand)×8)` Gold, Zustand100 danach | Keine zusätzliche Reparaturzeit im geprüften Funktionspfad |
| Bewaffnung | Stufen1/2/3 kosten550/1100/1650; je Stufe10 Fass weniger Kapazität | Geld/Laderaum gegen Abwehr; keine Besatzungsheuer |
| Bank | Effektiv2% Guthaben und6% Schuld je360 Spieltage, täglich exponentiell anteilig | Kreditprincipal kein Gewinn. Kein positiver Zinscarry durch Leihen/Anlegen zu diesen Sätzen |
| Kreditrahmen | max(1000,round(Nettovermögen×0,45)) | Buchwertabhängig, nicht Garantie dauernder Zahlungsfähigkeit |
| Lager | 150 Grundkapazität, optionale Stufen/Miete, tägliche Verlängerung bzw. Rückstände | Mietschulden sperren Einlagerung/Erweiterung und Politik; Auslagerung/Tilgung als Erholungsweg |
| Neubau | Materialentnahme und Werftlohn, mehrere Spieltage, ein Auftrag | Kein kostenloser Sofortflottenaufbau; während Wartezeit laufen Märkte/Fristen |
| Verkauf Zusatzschiff | konservativer Preis, leeres Schiff, letztes globales/örtliches Schiff geschützt | Liquiditätsquelle, kein garantiertes Rettungsrecht beim einzigen Schiff |
| Hafenarbeit | Einmal3 Tage/20 Gold bei belegter Notlage und Voraussetzungen | Überbrückt eine konkrete Abreise; keine wiederholbare Sozialkasse oder allgemeine Sanierung |

Belege: 148–188,190–246,874,911–972,1019–1026. In 0.5g waren historische250 Stressstände nach Hilfe wieder abreisefähig; langfristige Erholung nicht bewiesen. Wiederholtes Ausgeben aller Reserven nach verbrauchter Hilfe kann erneut festsetzen. Das ist ein zu untersuchendes wirtschaftliches Risiko, **kein neuer nachgewiesener dauerhaft unrettbarer V13-Spielstand**. Vor einer P0-Sanierungsbehauptung wären Bargeld, verkaufbare Waren, Bank, ungenutzter Kredit, Zusatzschiffe und Hafenarbeitsmarker gemeinsam zu prüfen.

## 4. Bestätigte Anerkennungslücke, kein behaupteter Goldgenerator

Produktivtrade (905) honoriert positive Verkaufsmarge pro Aktion mit höchstens2 Ruf, negative Marge entfernt keinen Ruf. Kosten verbleibender Ware werden gemittelt. Daher sind Goldneutralität und unveränderte Gesamtmenge kein Schutz gegen zusätzliche Ruf-/Buchwertanerkennung. P1.3 bestätigt dies am **bytegleichen Produktionscode**. Schon die Aktionsformel ist nicht allgemein aufteilungsneutral: Zwei getrennte Verkäufe mit je1.000 Gold ausgewiesener Marge geben zusammen4 Punkte; derselbe Gesamtgewinn2.000 in einem Verkauf höchstens2. Das ist reine Formelarithmetik. Keine neu simulierte Missbrauchsserie.

Nicht verwechseln: Die publizierten **44.610→45.595** und **+2.056** Gegenfälle in 0.8d.2a.2/.3 betreffen zusätzlich getestete **nicht integrierte** politische Schutzprototypen. Sie belegen deren fehlende Freigabereife, nicht genau diesen Betrag als neu bestätigten Produktionsfehler. Produktionsbasis übernimmt allerdings Buchkosten direkt in politisches Vermögen; dieser grundsätzliche Anerkennungsangriff ist statisch und durch P1.3 gestützt. Dienste/Siegel werden damit nicht automatisch erfüllt.

Empfehlung Q-001/P0: bestätigte Fortschrittsanerkennung zuerst fachlich spezifizieren und später gezielt absichern; P0 wegen beeinflussbarer Karrieregrundlagen, **keine sofortige Übernahme des fehlgeschlagenen V14-Modells**. Kein unbegrenzter Goldgewinn, Datenverlust oder kompletter Eldermann-Sofortweg behauptet.

## 5. Schiffe, Flotte und Reiseentscheidung

| Typ | Fass nominal | Tempo | Gebühr | Vorteil / Nachteil |
|---|---:|---:|---:|---|
| Schnigge |55|1,5|4|schnell und günstige Einzelfahrt, geringe Ladung |
| Kogge |90|1|6|mittlere Kapazität/Tempo |
| Holk |140|0,72|9|viel Ware je Wurf, längere Fristen-/Marktexposition |

Tage=`ceil(DIST/(Tempo×(0,65+0,35×Zustand/100)))` plus3 je Endpunkt Nowgorod/Venlo. Schiffszustand beeinflusst Tempo, Beladung nicht. Örtlicher Konvoi fährt nach langsamstem Teilnehmer, gemeinsam ein Ereigniszweig, Gebühren pro Schiff. Ferne Flotten liegen in ihren Häfen; nacheinander bestätigte Fahrten verschieben die **gemeinsame** Weltuhr nacheinander. Kein autonomer Paralleltransport und keine Besatzungsanwerbung im geprüften Schiffmodell.

P1.4, [fester Stand](https://github.com/psonnen-lgtm/Hansef-rst/blob/175c09f828084f9989888a2bccd01dadaa4dbadc/docs/entwicklungsberichte/2026-10-28_P14_entscheidung.md): heute gesunde Kogge Lübeck–Hamburg2, Lübeck–Rostock2, Bergen–Nowgorod33, Nowgorod–Venlo35 Tage. Werte sind **Codezeiten**, keine neue Originalmessung. B/C-Vorschläge erzeugten35/75 schnellere Zwischenhafenwege unter165 Paar/Typkombinationen. Dies ist ein Modellfehler der Vorschläge, kein nachgewiesener Fehler der aktuellen A-Zeiten. Verlängerungen nur zusammen mit Fristen, Märkten und Erholung planen.

## 6. Ereignisse: exakte Modellwahrscheinlichkeit und ihre Anreize

Ein Wurf pro bestätigter Fahrt, nicht pro Tag (1020). Zweige gegenseitig exklusiv:

| Zweig | Wahrscheinlichkeit laut Code | Folge |
|---|---:|---|
| Piratenversuch |13%|Abwehr abhängig von Waffen/Konvoigröße |
| Sturm |14%|3–10 Zustandspunkte je Schiff, mindestens30% Zustand |
| Freundlicher Kapitän |13%|Atmosphärischer Text, kein eigener Geldbonus |
| Ruhige Fahrt |60%|Atmosphärischer Standardtext |

Abwehr=`min(0,94;0,30+0,21×Waffensumme+0,09×Schiffszahl)`. Unbewaffnetes Einzelschiff39% Abwehr im Piratenzweig, also rechnerisch7,93% aller Fahrten mit nicht abgewehrtem Versuch. Bei vorhandener Ladung1–3 Fass Verlust aus der zuerst gefundenen Ware eines Schiffes; bei leerer Flotte kein solcher Warenverlust. Kein Sinken oder Totalverlust in diesen Zweigen. Wetter verändert hier den Zustand **nach** dem Zeitablauf, nicht rückwirkend die Dauer dieser Fahrt.

Statische Vergleichsrechnung bei unveränderten Fahrtdauern:50 Zweitagefahrten versus5 Zwanzigtagefahrten ergeben je100 Seetage erwartete6,5 versus0,65 Piratenversuche und7 versus0,7 Stürme. Keine empirischen Quoten, keine Jahresprognose. Langstrecken sind somit **nicht** wegen mehr Seetagen häufiger gefährdet; kurze Pendler würfeln öfter pro Spieljahr. Andererseits erhalten sie häufiger+1 Ankunftsruf und Handelsgelegenheiten. Große Flotten/Ladungen verteilen begrenzten Piratenverlust günstiger; Sturm trifft dagegen jedes Schiff. Keine automatische Empfehlung, stattdessen tägliche Würfe einzubauen: das würde insbesondere Holk, Konvoi und Fernhandel verändern.

Wenige Texte und begrenzte Entscheidungsmöglichkeiten bergen Wiederholungsrisiko. Abwehr wird automatisch entschieden, nicht durch interessante Ereigniswahl. Schwere Stadtkrisen/Heiler/Hochzeiten sind keine nachgewiesenen produktiven Reiseereignisse. Originalbeobachtungen aus R1.10 sind kein Kalibrierungsmaßstab für diese Prozentsätze.

## 7. Erneutes Würfeln und Persistenz

`planTravel` würfelt kein Ereignis. `pending.arrived` verhindert zweite Auslösung derselben bestätigten Reise im laufenden Speicherzustand; `resolved` schützt die vorhandene Ereignisauflösung. Das sind konkrete Schutzmaßnahmen. `pending` und `Math.random`-Zustand sind aber nicht als gesicherter Ereignisplan in der Partie persistiert. Laden eines Vor-Reise-Exports ist kein nachgewiesen geschützter Fall. Ein allgemeiner Schutz gegen Save-Rollback, externe Exportbearbeitung oder alte Browserkopien ist **nicht nachgewiesen**.

Zusätzlicher statischer Persistenzhinweis: `arrive` ruft nach `advance` Gebühren-/Ereignislogs auf; `log` speichert (784), bevor später der Zielhafen gesetzt wird (1026). Ein abrupter Abbruch innerhalb dieser synchronen Operation könnte einen Zwischenstand treffen; konkrete Häufigkeit und Wiederherstellungsfolgen wurden hier nicht getestet. Normale abschließende Speicherung ersetzt keinen allgemeinen Atomaritätsnachweis. Kandidatenkopien existieren in anderen spezialisierten Aktionen. Priorität Q-002/P1: begrenzte Fehler-/Mehrtab-/Unterbrechungsprüfung vor Releasezusage, keine Behauptung bereits beobachteten Datenverlusts.

## 8. Entscheidung

Starke Basis: reale Bestände, regionale Rollen, Reisemanifest und begrenzte Informationen. Wichtigste offene Punkte: Anerkennung neutraler Kreise, Vergleichbarkeit von Nettoertrag/Liquidität, Frist-/Wegkonsistenz und pro-Fahrt-Risiko. Keine Preise, Zeiten, Wahrscheinlichkeiten oder Schutzregeln in diesem Audit verändert. Nächster Sicherungspunkt: politische Gesamtkarriere und aktive Entscheidungszeit.
