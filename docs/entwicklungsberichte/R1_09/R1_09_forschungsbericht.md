# R1.09 – Preisbildung, Warenwirtschaft und Kosten

28.10.2026 · Forschungsbranch `research/r1-09-prices-economy` · Forschungsbasis `b462fb226ff8857d3b03bdb3696bfc1ac1a96b40`.

**Ergebnis:** Drei Waren, zwölf tatsächliche Einzeltransaktionen, zwei getrennte Versuchszweige, kontrollierte Tagesfortschritte und zwei weitere Seereisen. Kleine Transaktionen änderten Bestände und Kasse, jedoch keine belegte Preisstaffel. Zeitablauf änderte die Märkte erheblich. Die Originalformeln und die vollständige Kostenzerlegung bleiben offen.

## Quellen, Kennzeichnung und Grenzen

Aussagen sind als **Direkt im Originalspiel gemessen**, **Durch Originaldokumentation belegt**, **Im Hansefürst-Code bestätigt**, **Hypothese** oder **Noch ungeprüft** zu lesen. Empfehlungen sind keine Umsetzungsaufträge. Originalassets, Karte, Spielstände und Bildbelege bleiben privat. Frühere Phasen werden nicht überschrieben.

Originalquelle: [Originalhandbuch, Onlinehilfe](https://www.mogelpower.de/manuals/Der_Patrizier_Handbuch.pdf), PDF-Seiten 7–10 und16, insbesondere Handel S.9 und Mannschaft S.16 (PDF-Zählung ab1). **Durch Originaldokumentation belegt:** Kauf und Verkauf sind getrennte Modi; Mengen werden nach Warenauswahl eingegeben. Die Mannschaftsheuer hängt von der Reiselänge ab und belastet Bordgeld. Eine exakte Kostenformel liefert diese Stelle nicht. Dokumentierte Regeln werden nicht mit gemessenen Formeln gleichgesetzt.

Hansefürst: Entwicklungsbranch am Prüfungstag weiterhin `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Datei `Hansefuerst_0_4.html`, Git-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`, Release0.8d.1b/V13. Remote-Blob erneut abgefragt und mit lokalem `git hash-object` verglichen. Der Dateiinhaltsabruf des großen HTML lieferte diesmal leeren Inhalt bei passendem Blob; deshalb vorhandene, byteidentische R1.08-Kopie statisch gelesen. Der alte Prototyp `Hansefuerst_Spiel.html` ist nicht die Vergleichsbasis. Kein Hansefürst-Laufzeittest, keine Aussage über aktuell ausgelieferte Pages.

## Versuchsaufbau und Reproduzierbarkeit

**Direkt im Originalspiel gemessen:** R108RET regulär geladen; Wappen Rostock auf Originalkarte zugeordnet und akzeptiert. Ausgang: Lübeck, 4.Heuet1355, Albatross, fünf Matrosen/fünf nötig, keine Ware an Bord, Kasse104. Regulärer Zusatzkredit150 beim Handwerker: sichtbares Angebot maximal250,31Prozent,202Tage; anschließend Kasse254. Kredit ist Finanzierung, kein Ertrag. Ein erster Auswahlversuch mit0+Return kehrte ohne Geldänderung zurück; korrekt war0, danach getrennte Mengeneingabe150+Return.

Vor Versuchen separat als `R109BASE.PSD` gespeichert. ZweigA handelt lokal und wartet anschließend; ZweigB lädt genau diesen Save erneut (Kartenantwort Riga regulär akzeptiert) und bestätigt Datum/Kasse/Bestände, bevor ohne Handel gewartet wird. RNG-Zustand und Zufallseinfluss der Menübedienung wurden nicht kontrolliert. Rückverkäufe inA stellen dieselben Warenbestände wieder her; dies ist kein Versuch mit bleibendem Angebotsentzug.

Emulator DOSBox0.74-3, vorhandene R1.06-Konfiguration unverändert: SDL-Dummy, Surface, cycles10000, Ton deaktiviert. Vorhandener SDL-Eingabe-/Bildhelper in eigenem R1.09-Verzeichnis weiterverwendet; er übermittelt normale Tastatur-/Mauseingaben, greift nicht in die Spiellogik ein. Keine Originaldatei gepatcht, kein Schutz umgangen. Keine neue Installation nötig.

Original-R108RET SHA-256 `589bede3f74149c494845227ddfe5c6faa1c21ece144be3734934cc52bc5ff0a` blieb unverändert. R109BASE: `8cb4ab2f228c63dd36026ae5bb1d0b42e018d39c4dd681f1d85c576a126980f9`; regulär geladen und UI-Werte geprüft. Private Endkopie: `f8ab787d7cf6a4bb9a67c7c709d5d6959812ef3088aa42f53fb6458529a1a41c`; tatsächlicher DOS-Dateiname wegen fehlerhafter Namenseingabe `R109BASD.PSD`, getrennt vonR109BASE. Endsave geschrieben und kopiert, in dieser Runde nicht erneut geladen. Keine Savebytes verändert.

Die [Abläufe](R1_09_versuchsablaeufe.md) nennen Bedienwege und Fehlschritte. Messzeitstempel sind tatsächliche Kopierzeitpunkte der privaten Bildbelege in Europe/Berlin; Spielkalenderdatum steht getrennt daneben. SHA-256 und private Belegnamen sind in CSV/JSON enthalten, keine Screenshots im öffentlichen Repository.

## A – Unmittelbare Preisreaktion

**Direkt im Originalspiel gemessen**, Lübeck4.Heuet1355, alle Vorgänge am selben Spieltag:

| Ware | Kauf / Verkauf je angezeigter Einheit | Stadtbestand vor → nach Käufen → nach Rückverkauf | Einzelkäufe / Einzelverkäufe | Zahlungen / Erlöse | Realisierter Warengewinn |
|---|---:|---:|---:|---:|---:|
| Getreide |68 /47|1171→1168→1171|3 /3|204 /141|−63|
| Bier |76 /53|279→278→279|1 /1|76 /53|−23|
| Holz |64 /45|795→794→795|1 /1|64 /45|−19|

Je Transaktion wurde genau eine Einheit eingegeben. Die tatsächlich gezahlten Beträge ergeben sich aus Kassenänderungen; sie stimmen hier mit den angezeigten Einzelpreisen überein. Schiffsvorrat und Stadtvorrat ändern sich gegensinnig um eine Einheit. Keine zusätzliche Transaktionsgebühr wurde in diesen Kassenbewegungen sichtbar. Das beweist keine allgemeine Gebührenfreiheit in anderen Situationen.

Getreide-Kassenfolge:254→186→118→50→97→144→191. Bier:191→115→168. Holz:168→104→149. Gesamte Warenkäufe344, Rückverkauf239, realisierter Warenverlust105. Kein Restbestand und keine Finanzierung als Gewinn. Die Spannen entsprechen bei diesen Werten rund30,9Prozent (Getreide),30,3Prozent (Bier),29,7Prozent (Holz) des Kaufpreises; **keine daraus rekonstruierte universelle30-Prozent-Formel**.

Die Preise blieben in den belegten Nachzuständen konstant und entsprachen nach vollständigem Rückverkauf den Ausgangspreisen. BeiA02 zeigte das Kauf-Nachbild noch den Vorzustand; sein neuer Kaufkurs bleibt in der CSV leer. Das Verkaufs-Nachbild bestätigt dagegen Stadt1169, Schiff2, Kasse118 und Verkauf47. Der nächste vollständig belegte Zustand mit drei Einheiten zeigt wieder Kauf68. Die fehlende Einzelbeobachtung wird nicht interpoliert.

**Noch ungeprüft:** große Mengen, erschöpfte Märkte, Preisstaffelschwellen, Bestandsabhängigkeit innerhalb eines Tages und dauerhafte Preiswirkung eines nicht zurückgenommenen Warenentzugs. Drei Getreideeinheiten bei über1100Stadtbestand reichen nicht, um eine grundsätzlich fehlende Preiselastizität zu behaupten.

## B – Stadtvergleich

**Direkt im Originalspiel gemessen:**

| Stadt / Spieltag / Zweig | Getreide Kauf / Verkauf / Stadt | Bier Kauf / Verkauf / Stadt | Holz Kauf / Verkauf / Stadt |
|---|---:|---:|---:|
| Lübeck4.Heuet A/B |68 /47 /1171|76 /53 /279|64 /45 /795|
| Lübeck6.Heuet B |71 /49 /951|76 /53 /220|64 /45 /478|
| Rostock8.Heuet B |48 /33 /1709|79 /53 /86|47 /32 /172|
| Lübeck10.Heuet B |68 /47 /2039|76 /53 /223|64 /45 /853|

Rostock8.Heuet: Getreide gekauft48, danach Bestand1708/Schiff1/Kasse192; verkauft33, danach1709/0/225. Beide Kurse bleiben dabei48/33. Auch dieser kleine unabhängige Transaktionsabschnitt zeigt keine sofortige Preisänderung.

Getreide und Holz sind in diesen zeitversetzten Proben in Rostock günstiger; Bier ist dort beim Kauf teurer, beim Verkauf gleich teuer. R1.08 hatte Rostock1.Heuet47/32 für Getreide gemessen, jetzt48/33. **Noch ungeprüft:** dauerhafter Standortvorteil und wirtschaftliche Ursachen. Keine simultanen Märkte, keine garantierte profitable Route. Hamburg wurde zugunsten vollständiger Lübeck-/Rostock-Reihen nicht erneut angelaufen.

## C – Zeitliche Marktentwicklung

**Direkt im Originalspiel gemessen:** A nach vollständigem Rückverkauf; B ohne eigene Transaktion nach Savewiederherstellung. Jeweils einzelne Wartetage über das reguläre Warten-Fenster.

| Zweig / Spieltag | Getreide Stadt; Kauf/Verkauf | Bier Stadt; Kauf/Verkauf | Holz Stadt; Kauf/Verkauf | Kasse |
|---|---|---|---|---:|
| A4 nach Handel |1171;68/47|279;76/53|795;64/45|149|
| A5 |951;71/49|220;76/53|478;64/45|149|
| A6 |951;71/49|220;76/53|478;64/45|149|
| A7 |951;71/49|223;76/53|478;64/45|149|
| B4 |1171;68/47|279;76/53|795;64/45|254|
| B5 |951;71/49|220;76/53|478;64/45|254|
| B6 |951;71/49|220;76/53|478;64/45|254|

A undB liefern an den gemeinsamen Folgetagen identische Werte dieser drei Waren. Auf4→5Heuet fällt Getreide um220, Bier um59 und Holz um317; nur Getreide ändert hier den Kurs. Auf6→7 steigt Bier inA um3, ohne eigene Lieferung. Später erreicht Lübecks Getreidebestand2039 und sein Kurs wieder68/47, ohne eigenen Getreideverkauf inLübeck inB.

**Nachgewiesener Zusammenhang:** Märkte können sich ohne eigenen Handel verändern; ein Bestandssprung muss nicht jeden Warenpreis ändern. **Hypothesen:** periodische Auffüllung, örtlicher Verbrauch und Konkurrenzhandel können beitragen. Die Probe trennt diese Ursachen nicht. Insbesondere sind−220Getreide nicht als täglicher Bevölkerungsverbrauch bewiesen, +3Bier nicht als Brauereiformel und die großen Sprünge nicht als fester Wochenrhythmus. Produktionsrezepte, Einwohnerfaktoren und Marktupdate-Routine bleiben ungeprüft.

## D – Reisen und Kassenüberleitungen

**Direkt im Originalspiel gemessen**, ZweigB, keine Ware bei Abfahrt/Ankunft:

| Reise | Abfahrt → Ankunft | Tage | Kasse vor → nach | Hafengebühr laut Meldung | Ungeklärter Rest |
|---|---|---:|---:|---:|---:|
| Lübeck→Rostock |6.→8.Heuet1355|2|254→240|14|0|
| Rostock→Lübeck |8.→10.Heuet1355|2|225→194|14|17|

Besatzung bleibt5. Keine Anwerbung, Reparatur, Tilgung oder weitere Kreditaufnahme während dieser Reisen beauftragt. Keine zusätzliche Sturm-/Piraten-/Hilfsangebotsmeldung beobachtet; **zwei Reisen ohne zusätzlichen Vorfall sind keine belastbare Ereignisquote**. Schiffszustand wurde inR1.09 nicht erneut kostenpflichtig inspiziert und bleibt als neuer Messwert unbekannt.

Die Rückfahrt dauert hier2 statt der3Tage inR1.08. Eine feste Lübeck-/Rostock-Formel oder ein Wetterfaktor folgt daraus nicht. Beobachtet werden verstrichene Kalenderdaten inklusive nicht isolierter Hafenphasen, keine reine Seefahrzeit.

Die Bildfolge zeigt ausdrücklich **Hafengebühr**, nicht die inR1.08 verwendete Bezeichnung „Liegegebühr“. Frühere Dateien bleiben unverändert; der präzisierte Befund steht hier daneben. Bei neuer Hinfahrt stimmt die gemeldete14 mit dem gesamten Kassenabgang überein. Beim neuen Rückweg sind von31Talern nur14 über diese Meldung zugeordnet. Die restlichen17 werden weder als Heuer noch als Zins, Reparatur oder Kontorausgleich ausgegeben. Endschuldenübersicht zeigt Lübeck250, eine Summe der angezeigten Verbindlichkeiten; genaue Zinsabgrenzung nicht geprüft.

R1.08-Rundreise:98→84→63, Abgang35. Zwei dort notierte Gebührenbeträge14+14 ergeben28; rechnerischer Rest7. Dies ist eine engere Abgrenzung, **keine nachträglich bewiesene Heuerbuchung**. Ein längenabhängiger Mannschaftslohn ist dokumentiert, sein konkreter Anteil an35 jedoch weiter ungeprüft. Weder7Taler je Reisetag noch5Matrosen×Tageslohn wird als Originalformel behauptet.

Neue KassenüberleitungB:

- 104 Startkasse +150 Kredit =254 vor Versuch.
- 254 −14 Hinfahrt =240.
- 240 −48 Getreidekauf +33 Getreideverkauf =225; Warengewinn−15.
- 225 −14 gemeldete Hafengebühr −17 ungeklärt =194.

Die Auswertung in [Kassen-CSV](R1_09_kassenueberleitungen.csv) trennt Einnahmen, Ausgaben, Finanzierung, Tilgung und ungeklärte Abgänge. KasseB verändert sich ab Versuchsbeginn um−60: Warenverlust15 plus Reiseabgänge45. ZweigA verliert105 durch lokalen Warenhandel und wird **nicht** mitB addiert. Laden149→254 ist kein Ertrag. Die Untersuchung liefert keine vollständige Firmenbilanz.

## E – Bedienung und Atmosphäre

**Direkt im Originalspiel gemessen:** Vom Hafen zwei Öffnungsklicks (Kontor, großes Buch). Aus bereits geöffnetem Kaufmodus: Warenzeile anklicken, Ziffer1 eingeben, Return – drei Bedienhandlungen für eine Einheit, vier bei erforderlichem Moduswechsel. Mausbewegung wird nicht zusätzlich gezählt; mehrere Ziffern erhöhen die Zahl der Tastendrücke. Für beide Kurse ist ein Moduswechsel nötig, weil die Spalte jeweils nur einen Preis zeigt. Kasse, örtlicher Vorrat, Bordvorrat und freier Raum sind sichtbar. In diesem Handelsfenster wurde kein automatisch berechneter Einstandspreis, Warengewinn oder vollständiger Reisekostensaldo angezeigt.

**Subjektive Bewertung/Hypothese:** Kontor, Handelsbuch, Geldbeutel, Abakus und Hafenanimation verbinden die Rechnung mit einer glaubwürdigen Kaufmannsszene. Wiederholtes Umschalten erschwert Preisvergleiche; ohne eigene Notizen ist die Marge schwerer zu überblicken. Ein gleichzeitiger Kauf-/Verkaufskurs und datierte alte Marktwerte könnten Komfort erhöhen, ohne das Stadtgefühl aufzugeben. Die Darstellung ist beobachtet, ihr Spaßwert nicht durch Nutzertests belegt. Akustik wurde wegen deaktivierter Ausgabe nicht bewertet.

Technische Schwierigkeiten: Einige Eingabefolgen waren schneller als Menüwechsel/Chronikanzeige; die Messaufnahme prüfte deshalb tatsächlich sichtbare Fenster. Fehlaufnahmen eines Wartefensters statt Buch wurden privat als ungültige Pfadversuche abgelegt und nicht als Marktwerte gewertet. A02 bleibt explizit unvollständig. Eine beim laufenden BMP-Schreiben entstandene defekte Zwischenkopie wurde nicht ausgewertet. Hauptmenü nach Rückkehr erneut mit Darstellungsartefakten, Ladebuch und Spielwelt weiterhin bedienbar. Endsave-Namenseingabe ergabR109BASD stattR109END; Basissave blieb erhalten.

## F – Vergleich und Empfehlungen

Der [aktualisierte Katalog R1.09](../forschungskatalog/R1_09_vergleich.md) und seine [JSON-Version](../forschungskatalog/mechaniken_R1_09.json) enthalten Unterschiede, Codebelege, Status, Aufwand und Risiken. Wesentliche statische Ergebnisse:

- `trade` verändert Vorrat/Geld, jedoch nicht sofort den Preis; ein örtlicher Kurs für Kauf und Verkauf, keine separate Handelsgebühr in dieser Funktion. Einstandsmittel und realisierter Warengewinn sind bereits vorhanden (Zeilen895–905).
- `regionalMarketDay` prüft Preisänderung täglich mit0,35; `regionalPrice` verbindet Rauschen mit einem bestandsabhängigen Rücklaufziel. Bestände ändern sich täglich über regionale Profile, Rücklauf und Rauschen, begrenzt3–240 (Zeilen855–874). Diese Zahlen sind **Hansefürst-Code**, keine Originalmessungen.
- In dieser Marktaktualisierung keine stofflich bilanzierte Rezeptkette oder aus Einwohnerzahlen berechnete Verbrauchsmenge. Das ist eine Aussage über den geprüften Ablauf, keine Behauptung, jede andere Spielstelle vollständig ausgeschlossen zu haben.
- Regionale Warenkunde, datierte Versorgungsnachrichten und veraltende Preisnotizen sind bereits implementiert (Zeilen842–852,991). Sie sollen nicht nochmals als fehlende Funktionen vorgeschlagen werden.
- Reisegebühr4/6/9 nach Typ, vor Fahrt sichtbar; tägliche Zinsen und Lagermieten separat, Warengewinn ausdrücklich ohne Reisekosten (Zeilen158–166,874,884,903,1019,1026).

Empfehlungen, jeweils **Hypothese** zur Spielspaßwirkung, keine Umsetzung:

1. **Verbessern:** Bestehende Warengewinnanzeige um eine zusammenhängende Reisekosten-/Kassenüberleitung ergänzen. Aufwand mittel; benötigt saubere Reisezuordnung, ohne Kredit als Ertrag oder Warengewinn doppelt zu erfassen.
2. **Beibehalten:** Datierte eigene Preisnotizen, regionale Warenkunde, Max-Mengen und sichtbare Reisegebühren. Bereits vorhanden, keine Neuimplementierung. Kleine UI-Prüfung; kein Eingriff in Balance.
3. **Weitere Forschung erforderlich:** Deutliche, verständliche Bestands-/Preisreaktionen bei echten Engpässen prüfen, bevor Rücklauf/Elastizität verändert wird. Aufwand mittel bis hoch; Preisänderungen können Arbitrage, Versorgung, politische Lieferdienste und Saveverträglichkeit beeinflussen.
4. **Nicht übernehmen:** Die gemessene Originalspanne von ungefähr30Prozent ungeprüft einführen. Aufwand technisch mittel, Balancewirkung hoch: lokale Verkäufe, Startliquidität und Verlust-Erholung würden erheblich anders.
5. **Verbessern:** Bestehende Versorgungsanzeige um verständliche Änderungsursachen erweitern, soweit der Code diese tatsächlich hergibt. Aufwand mittel; keine künstlich als Fakt präsentierte Produktions-/Verbrauchserklärung. Könnte Entscheidungen nachvollziehbarer machen.

## Offene Fragen und Abschlussprüfung

Offen: Preisstaffeln bei relevanten Entnahmen; Zeitpunkte/Anteile von Versorgung, Verbrauch und Rivalenhandel; simultaner Städtevergleich; Originalpreisroutine; Heuer- und Gebührenformeln; zusätzliche17Taler auf Rückfahrt sowie Rest7 ausR1.08; langfristige Rentabilität und Erholung nach Verlusten.90 aktive Stunden bis Eldermann bleiben ein Entwicklungsziel, keine Folgerung aus den wenigen Spieltagen.

Geprüft: CSV-/JSON-Syntax und referenzielle Mengen-/Kassenkonsistenz; Widersprüche/fehlende Bilder markiert; Save-/Originaldateihashes erhalten. Keine automatisierten Hansefürst-Tests oder1.500Wirtschaftsläufe ausgeführt, weil reine Forschung/Dokumentation und ausdrücklich untersagt. Frühere Simulationsberichte sind historische Vorbefunde, hier weder neu berechnet noch als erneut bestanden bezeichnet. Keine Code-, produktive Save-, Pages- oder Mergeänderung. Veröffentlichung erfolgt ausschließlich mit eigenen Text-/Datendateien; alle veröffentlichten Dateien werden anschließend über GitHub exakt zurückgelesen.

Ein später sinnvoll begrenzter Schritt wäre ein einziger gesicherter, ausreichend finanzierter Entnahmeversuch über mehrere Mengenstufen mit paralleler Kostenkontrolle. **R1.10 wurde nicht begonnen.**

Daten: [39 Marktzeilen](R1_09_preise_bestaende.csv), [strukturierte Daten](R1_09_daten.json), [Kassen](R1_09_kassenueberleitungen.csv), [zwei Reisen](R1_09_reisen.csv).
