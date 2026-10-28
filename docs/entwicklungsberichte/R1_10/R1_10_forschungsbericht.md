# R1.10 – Wiederaufnahme, fünf Seefahrten und Finanzierungsrisiken

28.10.2026 · Branch `research/r1-10-events-shipping` · Ausgangsbasis `7abf2eac15724d35839ca832fec6c0da9b7e1535`.

**Ergebnis:** Fünf neue abgeschlossene Fahrten,28 aufsummierte Reisetage, drei tatsächlich erreichte Städte. Keine identifizierte Piraten-/Sturm-/Heilermeldung; eine automatische Kreditmitteilung. Nach der langen Fahrt lautet das Inspektorurteil„gutem Zustand“statt„bestem Zustand“. Eine Wiederholung aus identischem Save dauerte3statt2Tage. Die Stichprobe liefert keine Originalwahrscheinlichkeiten oder vollständige Kostenformel.

## 1. Tatsächlicher Unterbrechungsstand und Sicherung

Vor Weiterarbeit Remote-Forschungszweige und lokale Dateien geprüft. Kein R1.10-Branch/Commit vorhanden; letzter Forschungscommit R1.09 wie angegeben. Lokal elf Helper-/Eingabe-/Bilddateien erhalten, keine abgeschlossene R1.10-Reise, kein R1.10-Save oder Messbericht. Erster Wappenversuch Nimwegen abgewiesen, danach Emulator neu gestartet; keine geladene Spielwelt aus Altdateien nachgewiesen. Nichts erneut gefahren, um frühere Ergebnisse zu reproduzieren.

Unveränderte private Kopie und separates Archiv angelegt. Öffentliche Metadaten/Bestandsaufnahme mit Commit **`a2876cfa832895742d77bc401bb876a8a488abd4`** gesichert, alle drei Dateien exakt zurückgelesen. [Bestandsaufnahme](R1_10_bestandsaufnahme.md), [Inventar/Prüfsummen](R1_10_bestand_bei_wiederaufnahme.json). Vorhandene R1.05–R1.09-Dateien erhalten.

Nach drei neuen Fahrten erneut Zwischenstand veröffentlicht: **`d389f2e8d7ce1dfe2949db107e823465cbae45e0`**, [Zwischenbericht](R1_10_etappe_A_zwischenbericht.md), [CSV](R1_10_etappe_A_drei_fahrten.csv), [JSON](R1_10_etappe_A_drei_fahrten.json). Alle drei zurückgelesen. Diese Zwischenstände bleiben unverändert; spätere Erkenntnisse hier daneben.

## 2. Testumgebung, Startsave und Nachweisqualität

**Direkt gemessen:** R109BASE regulär geladen, Karte Oldenburg akzeptiert. Lübeck4.Heuet1355, Albatross,254 Taler,5 Matrosen/5 nötig, keine Waren. Zustandsabfrage„bestem Zustand“. Nach vorbereitendem Kontrollweg248Taler. Neuer eigener Save R110A gespeichert, via Oldenburg regulär geladen: Datum,248 Taler und5Matrosen bestätigt. SHA-256 **`e43a37fbab4438d997a9dfc1e11b77b7372977ed2b9773587bf4d0e1b4999e59`**.

Endsave R110Z separat geschrieben und privat kopiert: **`480b02e6c7117ac85ca052028245702bae3b186fcc801fa620ad29d1b8753e54`**; nicht erneut geladen. Ausgangssave R110A bleibt unverändert. Alle früheren aktiven Originalspielstände nach Abschluss mit Inventarhashes verglichen; unverändert. DOS-Originalprogramme byteidentisch zu zuvor extrahierten Originalen, keine Patches. Keine Hansefürst-Saves verändert.

Vorhandene DOSBox0.74-3 und R1.06-Konfiguration weiterverwendet: SDLdummy/surface,cycles10000, Ton deaktiviert. Eigener vorhandener SDL-Helper übermittelt gewöhnliche Eingaben und erfasst Bildschirmbilder. Keine Spiellogik geändert. Je Fahrt begrenzte Bildfolge24Aufnahmen im Sekundenabstand, danach manuelle Sichtprüfung und getrennte Schiffsbuch-, Ladungs- und Inspektionsbelege. Keine unbegrenzte Automationsschleife. Reale Belegzeitstempel und SHA-256 in JSON, privates Gesamtinventar im Archiv.

**Grenzen:** Einsekundenabtastung kann sehr kurze Meldungen verpassen. „Kein Ereignis beobachtet“ bedeutet keinen identifizierten zusätzlichen Vorfall in dieser Beobachtung, keine Garantie absoluter Ereignisfreiheit. Zustandsangaben sind qualitative Urteile verschiedener Werften, keine Prozent-/Rumpfmessung. Frühere Ladefähigkeit nicht als neuer Test ausgegeben: zwei neue reguläre R110A-Ladungen sind separat dokumentiert.

Die Save-Namenseingabe reagierte verzögert. Dialog mit altem Dateinamen vor Schreiben abgebrochen; neuer Name R110A/R110Z vor Bestätigung sichtbar geprüft. Erfolgreiche Eingabestelle in dieser Sitzung SDL220/420. Ein verfrühter Screenshot zeigte statt Buch die Werft und blieb als ungültiger Pfadbeleg privat erhalten; keine falschen Messwerte daraus. Einzelne BMP-Leseversuche während Schreibens scheiterten, wurden erneut aufgenommen, nicht interpoliert. Hauptmenü hat weiterhin Darstellungsartefakte, Ladebuch/Spielwelt funktionierten.

## 3. Tatsächliche neue Fahrten

Alle Fahrten mit demselben Kraier Albatross,5 Matrosen, leerem Laderaum vor/nach; freier Warenraum28. **Der Typ Kraier ist jetzt direkt durch eigene Chronikmeldung bestätigt**, nicht nur durch dokumentierte Startregel. Keine neue Anwerbung, Handelsaktion oder Reparatur beauftragt.

| ID / Gruppe | Strecke | Abfahrt→Ankunft1355 | Tage | Kasse vor→Ankunft | Hafengebühr sichtbar | Ungeklärter Netto-Kassenrest |
|---|---|---|---:|---:|---:|---:|
|T01 / A|Lübeck→Rostock|4.→6.Heuet|2|248→234|14|0|
|T02 / A|Rostock→Lübeck|6.→9.Heuet|3|229→198|21|10|
|T03 / A|Lübeck→Rostock|9.→12.Heuet|3|192→79|14|99|
|T04 / B, R110A neu geladen|Lübeck→Rostock|4.→7.Heuet|3|248→234|14|0|
|T05 / B|Rostock→Hamburg|7.→24.Heuet|17|229→195|14|20|

**Direkt gemessen:** Zustand vor T01–T05 jeweils zuletzt„bestem Zustand“, nach T01–T04erneutbest, nach T05„gutem Zustand“. Vor T04 stammt das Urteil aus dem identischen geladenen Ausgangssave; keine weitere bezahlte/ungeklärte Kontrolle vor Abfahrt erzwungen. Kein Prozentwert erfunden. T05-Endbefund ist kein Nachweis eines Sturmereignisses oder einer konkreten Schadenshöhe. Tatsächlich erreichtes Hamburg durch Chronik und Stadtüberschrift bestätigt; keine Fehlfahrt als anderes Ziel ausgegeben.

A ist eine fortlaufende Serie bis12.Heuet:3 Fahrten/8 Tage. Wegen65Taler Restkasse, ungeklärter99Taler-Reisedifferenz und auffälliger Schuldübersicht wurde R110A regulär wieder geladen, Karte Helsingör mitö akzeptiert. B beginnt wieder4.Heuet mit248Taler/5 Matrosen, anschließend2Fahrten/20 Tage. Restore65→248 ist weder Einnahme noch Kredit.

28 ist die Summe tatsächlich beobachteter Reisezeitabschnitte inklusive wiederholter Kalendertage. Die beiden Zweige überlappen um8Tage; gesamte Kalender-Spanne4.→24.Heuet umfasst20verstrichene Tage. Keine28einzigartigen unabhängig gespielten Kalendertage behauptet. R1.05–R1.09-Fahrten werden nicht neu gezählt.

## 4. Ereignisse und Statistik

**Direkt gemessen:** Auf T01–T04keine zusätzliche eigene Ereignismeldung identifiziert. Andere Kaufleute fahren in der Chronik ab; das sind Beobachtungen der Welt, keine Angriffe auf unser Schiff. Hafengebühren sind gewöhnliche Kosten und bleiben aus der Zusatzereignisquote heraus.

Auf T05 meldet die Chronik am**19.Heuet1355** einen Kredit über**1596 Taler** fürhanse Test. Kein Entscheidungsdialog, keine selbst ausgelöste Kreditaufnahme in R1.10. Schiffskasse nicht um1596gestiegen; Kontor-/Zins-/Tilgungsbuchungen nicht isoliert. Kein Handelsgewinn und kein nachgewiesener Ereignisaufwand. Am Ankunftstag24.Heuet neues Inspektorurteil„gutem Zustand“. Keine aktiv gesteuerte Abwehr, kein Piraten-/Sturm-/Heilerangebot oder Besatzungsproblem beobachtet.

| Kennzahl, rein deskriptiv | Wert | Bedeutung |
|---|---:|---|
| neue abgeschlossene Fahrten |5|davon T04Wiederholung aus identischem Save|
| aufsummierte Reisetage |28|enthält überlappende Kalenderabschnitte|
| mittlere Reisedauer |5,6 Tage|vier kurze Fahrten und eine17-Tage-Fahrt|
| Fahrten mit zusätzlicher identifizierter Mitteilung |1/5=20%|nur Finanzierungsmitteilung, keine Seegefahrenrate|
| zusätzliche Mitteilungen je Fahrt |0,2|1 Mitteilung/5 Fahrten|
| zusätzliche Mitteilungen je100Reisetage |3,57|1/28×100, keine geschätzte Originalwahrscheinlichkeit|
| Piraten-/Sturmmeldungen |0/0|nicht beobachtet, nicht als unmöglich bewiesen|
| Heiler-/Besatzungsproblemmeldungen |0/0|nicht beobachtet|
| verändertes Inspektorurteil |1 Fahrt|separater Ergebnisbefund, kein identifizierter Zufallsauslöser|
| erweiterte Beobachtungen inkl.Inspektorbefund |2 auf1Fahrt|0,4 je Fahrt;7,14 je100Tage, andere Definition als Mitteilungsquote|
| mittlere eindeutig zugeordnete Ereigniskosten |nicht bestimmbar|keine isolierte Kostenbuchung; Kreditprincipal kein Aufwand|

**Noch ungeprüft:** echte Originalraten, Auslösebedingungen, Route-/Dauereffekt und seltene Ereignisse. n=5, zwei abhängige Zweige und nur eine andere Route erlauben keine Kalibrierung. Kein Schluss„lange Fahrten sind sicherer“aus einer ereignisarmen Hamburgfahrt. Auch ursprüngliches Ziel20/50 bleibt unerreicht; nach fünf Fahrten wird gemäß Fortsetzungsauftrag gesichert und abgeschlossen.

## 5. Lade- und Wiederholungsversuch

T01 und T04 starteten aus demselben unveränderten R110A:4.Heuet,Lübeck,248 Taler,5 Matrosen,0 Ware, zuletzt bester Zustand. T01dauerte2Tage und T04drei. Beide Ankunftskasse234, Hafengebühr14, kein zusätzlicher Dialog, bester Zustand. Ein kontrollierter Wiederholungsdurchlauf, keine fünfzigfachen Neustarts und keine Wiederherstellung für ein günstigstes Ereignis.

**Direkt gemessen:** Die Reisezeit ist bei diesem Restore nicht vollständig festgelegt. **Noch ungeprüft:** ob der RNG-Zustand gespeichert, zusätzlich eine Uhr verwendet oder die abweichende Bediensequenz ursächlich ist. Vor T04Schuldenpapier abgelesen; kein byteidentisches Timing/Inputprotokoll. Ereignisauswahl änderte sich hier nicht sichtbar, weil in beiden Fahrten keine zusätzliche Meldung beobachtet wurde. Daraus weder allgemeinen Save-Exploit noch dessen Ausschluss behaupten.

## 6. Kassenüberleitungen und offene Finanzmechanik

| Kontrollabschnitt | Kasse | Ungeklärter Nettoabgang |
|---|---:|---:|
|Vorbereitung vor R110A|254→248|6|
|nach T01|234→229|5|
|nach T02|198→192|6|
|nach T03|79→65|14|
|nach T04|234→229|5|
|nach T05|195→189|6|

**Ablesekorrektur:** Eine frühe Fortschrittsmeldung sprach fälschlich von„Werftrechnung6“. Die vergrößerte Seite sagt **Werftleitung** mit Stadtnamen; keine Rechnung. Die Kontrollabschnitte umfassen Markt-/Werft-/Buchbesuche und werden keiner bestimmten Kostenart zugerechnet. Keine als bewiesen ausgegebene Inspektionsgebühr.

Die fünf gemeldeten Hafengebühren summieren sich auf77Taler, Mittel15,4. Die Reise-Kassenabgänge summieren sich über beide Versuchsgruppen auf206;129 davon sind ungeklärte Nettoabgänge. Das ist **kein** einheitlicher Firmenaufwand: Gruppen wurden wiederhergestellt, und mögliche Finanzierung/Verrechnung ist nicht vollständig verfolgt. R1.08-Rest7und R1.09-Rest17bleiben ungeklärt; neue Gebühren21statt14dürfen alte Aufnahmen nicht ohne Beleg nachträglich umdeuten. Auch die neue3-Tage-Hinfahrt mit14Gebühr widerlegt eine vorschnelle7Taler-je Tag-Formel aus zwei Beispielen.

Bordkasse A:248−14−5−21−10−6−14−99−14=65. Bordkasse B:248−14−5−14−20−6=189. Getrennte [Kassen-CSV](R1_10_kassenueberleitungen.csv) enthält Transit, Kontrollen und Restore, eine zusätzliche Finanzierungsmitteilung getrennt vom Bordledger. Keine Käufe/Verkäufe/Reparaturaufträge/Tilgungen in R1.10 beauftragt; dies schließt automatische Buchungen nicht aus.

Schuldenpapier nach R110A-Restore: Lübeck250; Ende A:500; Ende B:1000. Diese angezeigten Summen werden nicht mit der Chronikmeldung1596gleichgesetzt. Darstellungsbasis, Kontorbestand, automatische Verrechnungen und Zinsanteile bleiben ungeprüft.

**Durch Originalquellen belegt:** Das [Originalhandbuch, PDF16](https://www.mogelpower.de/manuals/Der_Patrizier_Handbuch.pdf) beschreibt unfreiwillige Kredite bei stark negativem Heimatkontor nach Steuerabzug sowie Kontenausgleich bei Abfahrt aus Heimat. PDF16beschreibt außerdem reiselängenabhängige Heuer. Das macht Finanzierungs-/Kontorfolgen als Erklärung plausibel, weist aber weder unsere99Taler noch die Darstellungsdifferenz exakt zu. Keine Schutz-/Programmänderung zur Aufklärung.

## 7. Hansefürst und langfristiger Spielspaß

**Im Hansefürst-Code bestätigt:** Entwicklungsbranchweiterhin`02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Remote-Blob der tatsächlichen Hauptdatei`Hansefuerst_0_4.html`erneut mit byteidentischer vorliegender Kopie verglichen:`7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`. Leerer Textabruf der Großdatei deshalb nicht als fehlender Code gewertet. Nur statisch geprüft, keine Hansefürst-Ausführung/Simulation.

Der [versionierte Code-/Vergleichskatalog](../forschungskatalog/R1_10_codevergleich.md) belegt Typen, Zustand/Reparatur, Konvoi, Gebühren, Zufallsgrenzen und Persistenz. Besonders relevant:

- Hansefürst würfelt bei bestätigter Reise, nicht beim bloßen Vorbereiten.13%Piratenbegegnung,14%Sturm und13%freundlicher Kapitän im Code, unabhängig von Route/Dauer in dieser Funktion; keine Originalraten. Konvoi/Waffen verbessern Abwehr, nicht die Begegnungsschwelle.
- Sturm senkt Zustand, Reparatur setzt ihn unmittelbar gegen Geld auf100. Kein nachgewiesener zusätzlicher gewöhnlicher Verschleiß imgeprüften Ankunftsablauf. Originalhier nur qualitativer Zustandswechsel nach17Tagen.
- `pending.arrived/resolved`verhindert doppeltes Auflösen des laufenden Ablaufs;Vorbereitungverwerfen würfelt nicht. `pending`wird aber nicht mit`s`exportiert; ein allgemeiner persistenter Schutz gegen Ladenalter Vor-Reise-Exporte ist **nicht nachgewiesen**. Bestehende UISicherung nicht als Save-Rollback-Garantie ausgeben.

**Hypothesen/Bewertung:** Originalstadt, unterschiedliche Silhouetten, Werftbilder und Konkurrentenchronik schaffen Atmosphäre. Beim Wiederholen bleiben Zielwahl, Kasse, Zustand und Heimatfinanzen relevant; reine Buch-/Kontrollwechsel wiederholen sich stark. Keine Klangbewertung bei deaktiviertem Ton. Keine verwertbare menschliche Bedienzeitmessung: Skriptpausen/Bildsicherung/Toolwartezeit sind Forschungsaufwand, keine reale Spielzeit des Originals. Aus offenem Kontor genügte Karteanklicken/Zielikoneanklicken zum Auslaufen; kein weiterer Bestätigungsdialog beobachtet. Längere Reise war wirtschaftlich auffällig, aber kein statistisch belegtes höheres Piratenrisiko.

Unverbindliche Empfehlungen:

1. **Verbessern/P1:** zusammenhängender Reise-/Kontor-/Finanzierungsbeleg. Aufwandmittel, Zuordnungmehrerer Schiffe und Savebestand beachten. Könnte unerklärte Liquiditätsverluste und Doppelzählung verhindern.
2. **Beibehalten/P1:** klare Ziele, Kosten-/Teilnehmervorschau und kein Risiko Würfelnbeimbloßen Vorbereiten. Bereits implementiert, kein Neubau.
3. **Weitere Forschung erforderlich/P1:** gewünschte Persistenzgrenze bei Save-Rollback separat klären/testen. Aufwandmittelbishoch, Migration/Import/legitime Fehlerkorrektur bedenken.
4. **Weitere Forschung erforderlich/P1:** Risiko je Fahrt versus je Spieltag prüfen, bevor Koeffizienten geändert werden. Aufwandmittel, hohe Balancewirkung; keine Kalibrierung ausn=5.
5. **Verbessern/P2:** ruhige Atmosphäre und seltene Entscheidungen getrennt von Pflichtdialogen/Schadensereignissen gestalten; Zustand nach langen Fahrten verständlich vermitteln. Aufwandmittel; keine künstliche Wartezeit oder Liquiditätsfalle zur Streckung auf90Stunden.

Wirkung, Aufwand und Priorität sind Designhypothesen.90 aktive Stundenbis Eldermann bleiben Ziel, kein Messresultat. Keine Funktion implementiert.

## 8. Abschluss und Grenzen

Letzter abgeschlossener Schritt: fünf Fahrtenvollständig ausgewertet, separater Endsavegeschrieben, öffentlich nur eigene Texte/Daten/Skripte. Private Bildbelege/Spielstände/Originalkarte nicht im Git. Datenarithmetik/JSON/CSV/Referenzengeprüft, alle veröffentlichten Dateien exakt über Git Hubzurückgelesen. Frühere Forschungsdateien erhalten, keine Produktcode-/Pages-/produktive Saveänderung, kein Merge. Keine1.500 Simulationen: reine Forschung, ausdrücklich keine Neuberechnung. Frühere Simulatorberichte nicht als neuer Test ausgegeben.

Offen: Original-RNG, Piraten-/Sturmraten, Mannschaftsheuer, Reparaturablauf/-dauer, echte Schadenshöhe, genaue Kontor-/Kreditverrechnung, bisherige Kostenreste und Langzeitwirkung. Nach einer Wiederherstellung und auffälligen Finanzdaten endet diese kurze Etappebei5statt20/50, um zuverlässige Sicherungzupriorisieren. Keine weitere Reise, keine Phase R1.11.

Daten: [Reisen](R1_10_reisen.csv) · [Ereignisse](R1_10_ereignisse.csv) · [Statistik](R1_10_statistik.json) · [JSON](R1_10_daten.json) · [Ladeversuche](R1_10_lade_und_wiederholungsversuche.csv). Status-/Empfehlungskatalog: [JSON](../forschungskatalog/mechaniken_R1_10.json), [CSV](../forschungskatalog/mechaniken_R1_10.csv).
