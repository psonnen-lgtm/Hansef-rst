# Q1.05 – Testgrundlagen, Reproduktion und Aussagegrenzen

29.10.2026 · Analysebranch `audit/q1-05-guild-milestone` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`.
Produkt **0.8d.1b/V13**, letzter Produkt-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Spielcode und Wirtschaftsregeln unverändert. Keine Gebühr beschlossen.


## Stufe A: Bestehende Arbeit verwenden

GitHub vor Beginn frisch geprüft: Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`, Q1.04 `e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36`, Q1.03 `15df03c02d6c3af3fdb9c8f24052f038885c2bb1`. Beide Auditbranches separat; nicht hineingemergt. Q1.01–Q1.03-Gesamtberichte sowie Q1.04-Bericht/Engine/Planer/Quellhashes gelesen.

Übernommen, **nicht neu ausgeführt**: Q1.04 zehn unterschiedliche Baselines/15 Zahlungsfälle mit 5.600-Gold-Stillstand, Q1.02 acht Handelsfixtures/Fernvorsprache, Q1.03 Konzept. Q1.04 ist am bytegleichen Produkt erhoben, jedoch nur Lübeck/Kogge/Seeds10001–10002/118–120 Tage. Neue Seeds10003–10005 und längerer Horizont sind keine gepaarte vorher/nachher-Balanceprüfung. Frühere1.500er-/90er-/2.250er-Reihen stammen aus älterer Wirtschaft und sind keine zusätzliche aktuelle Stichprobe; das1.500er-Archiv hat zwei bytegleiche Dateinamen, keine3.000 Fälle. Keine historische Serie wiederholt.

Q1.04 reine Policydatei bytegleich übernommen, per Git-Blob überprüft. `headless.cjs` und `strategies.js` unverändert. Root-HTML ausdrücklich gepinnt; kein versehentliches `dist`-Spiel. [Quellenhashes](../../../tests/analysis/q1_05/frozen-sources.json), [vorab festgelegter Plan](../../../tests/analysis/q1_05/plan.json).

## Stufe B: Technischer Pilot und ein offengelegter Abbruch

Erste Veröffentlichung vor Ausführung: `e56bd8166ba2a32a45bd683b74605524a224edf3`. Native Kreditprobe Seed 10111: Start5.000, Schiffsbuchwert4.960, Nettovermögen9.960, Kreditrahmen4.482. Legaler Kredit macht9.482 liquide Gold bei gleicher Nettovermögensbasis/gleichem Tag; weiterer1-Gold-Kredit abgelehnt. Kein manipulierter Altbestand und kein Gildenaufruf.

Erster Bergen-Pilot und exakter Replay bestanden Engine-/Bilanz-/Reproduktionsassertionen, wurden danach durch meine Zusatzannahme **mindestens3 Häfen je Pilot** gestoppt. Ein vorsichtiger Händler durfte tatsächlich bei zwei Häfen bleiben. Diese Abdeckungsvorgabe war ungeeignet, nicht die native Engine defekt. Das Programm speicherte vor diesem Abbruch leider noch keine vollständige Rohakte: diese2 Ausführungen sind nur durch Stufen-/Fehlerlog und Prüfcode belegt, **nicht Teil der75 auswertbaren Baselines**.

Kleine Korrektur vor Wiederholung `ef18beed12f797ab5b7f4c3dd0d5ed29c84967e4`: echte Route zwischen mindestens2 Häfen genügt; Rohdaten werden vor nachgelagerter Abdeckung gespeichert. Keine Spiel-/Planerregel geändert, keine erzwungene Exploration. Kreditprobe nicht wiederholt. Drei Pilotfälle (Bergen/vorsichtig, Nowgorod/normal, Lübeck-Konvoi/normal), jeweils exakter Replay, bestanden. Beide Konvoirümpfe kauften tatsächlich Waren und reisten gemeinsam. [Pilotabdeckung](../../../tests/analysis/q1_05/results/pilot-coverage.json), [ursprünglicher Fehler](../../../tests/analysis/q1_05/results/pilot-failure.json), [Originalprotokoll](../../../tests/analysis/q1_05/results/pilot.log). Kein weiterer ungeklärter Simulatorfehler.

## Stufe C: Begrenzte Matrix

5 Szenarien ×5 Stile ×3 Seeds=75 Baselines, davon3 bereits die erfolgreichen Piloten; nur 72 weitere. Jeweiliger Horizont240 Tage/200 Entscheidungen, keine über das Horizontende ragende Route. Tatsächlich235–240 Tage. Basisbudget einschließlich3 exakten Replays,2 früheren nicht gespeicherten Ausführungen und1 Kreditprobe **81<100**.

Szenarien: regulärer5.000/Kogge-Start Lübeck, Bergen, Nowgorod; ergänzend synthetisches Lübeck-Unternehmen mit Schnigge/5.000 sowie Kogge+Holk/8.000. Letztere kein regulärer Start und kein nachgespielter Flottenkauf. Schiffstypen Schnigge55 Kapazität/1,5 Geschwindigkeit, Kogge90/1, Holk140/0,72 unverändert. Konvoi fährt mit langsamstem örtlichen Schiff und addierten nativen Gebühren; Kaufmenge wird auf echte Rümpfe verteilt. Nur gemeinsame örtliche Flotte, kein verteiltes Fernflottenmanagement, kein Solo-Holk geprüft.

Stile: vorsichtig, normal, aggressiv, beobachtungsoptimiert, ungünstige Entscheidungen dann normal. Vorsichtig55%-Kassenanteil/mindestens800 behalten/35%-Beladung; normal25%/300/70%; aggressiv5%/40/100%, zusätzlich1.500 Startkredit. Optimiert15%/300/volle Kapazität, abgewertete alte Journalpreise pro Reisezeit. Stress bis zwei negativen Verkaufsereignissen, sechs ungünstigen beladenen Versuchen oder30 Tagen, danach normal. Ein Mehrschiffverkauf kann mehrere Verlustereignisse erzeugen; das ist nicht dieselbe Zahl wie Verlustreisen. Tatsächliche Schäden/Verluste werden separat ausgewertet, nicht aus Strategieetiketten behauptet.

Planer läuft in eigener VM ohne Spielzustand, fremde Livepreise oder RNG. Er kennt lokalen Markt, eigenes datiertes Journal, eigene Kasse/Kapazität und bekannte Reisezeiten/Gebühren. Unbekannte Häfen werden leer erkundet; nur bekannte Zielkurse für beladenen Handel. Gealterte Information kann verlustreich sein. Niemand kennt den zukünftigen Verkaufspreis. Alte allwissende Optimierung wurde nicht benutzt.

Native Funktionen: Handel, Ursprungsverbrauch, Reiseplanung/Ankunft, Tagesmarkt, Piraten, Stürme, Zinsen, Bank, Reparaturen und Validator. Funktionskörperhashes in jeder Partie vor/nach geprüft, gleiche Quellen in allen Fällen. Reparatur unter70 Zustand bei gedecktem R0, Kosten nach nativer Regel8/Schadenspunkt. Keine zusätzlichen Rettungskredite, Hafenarbeit, Schiffverkäufe, Aufträge, Lager-, Bau-, Informationskäufe oder politischen Anträge. Alle Ladungen nach Ankunft verkauft; Ende keine Waren-/Lagerbuchwerte.

## Gebühren und Gegenläufe

Auswahlregel wurde vor Baselines eingefroren. Bei allen45 regulären Starts letzter beobachteter Punkt bis Tag 120, keine Interpolation; E-false wäre Kapazität0. Quantile12.495/17.570/26.437; auf500 aufrunden, mittlere/obere Stufe mindestens25% über voriger. Untere Stufe zusätzlich oberhalb nativer Startkreditliquidität9.482. Ergebnis12.500/18.000/26.500; [jede Auswahlzeile](../../../tests/analysis/q1_05/results/fees.json).

6 feste Gegenfälle: vorsichtig Lübeck10003, vorsichtig Bergen10003, normal Nowgorod10004, aggressiv Lübeck10005, optimiert Schnigge10003, Erholung Konvoi10004. Absichtlich zwei vorsichtige Fälle, **keine ausgewogene repräsentative Beitrittsstichprobe**.3 Gebühren ×2 Zeitpunkte=36≤60. Die drei Seeds sind gemeinsame Bedingungen, keine75 unabhängigen Zufallswelten.

Nominal: erster Kontrollpunkt mit genug Bargeld. Stabilisiert: E erreicht und Restkasse deckt R*. Tatsächlicher einmaliger Testabzug, eigener Testlogeintrag; keine neue Speicher-/Statuslogik, kein Rufgewinn. Rerun des notwendigen Baseline-Präfixes vom gleichen Seed, weil native Headless-RNG-Closure keinen exportierbaren Weltcheckpoint besitzt. Alle36 Präfixe gegen gespeicherte Kontrollen exakt verglichen; fünf ohne Zahlung werden als volle identische Kontrolle geprüft. Unterschiedliche Zahlungszeitpunkte können danach andere Märkte/Entscheidungen/RNG-Ereignisse erzeugen; keine feste Ereignisfolge als kausaler Gleichlauf angenommen.

Suche höchstens bis Tag 240. Danach mindestens120 Tage und3 Reisen, insgesamt maximal360 Tage/200 Entscheidungen; tatsächliches Ende an erreichbarer Route. Nichtzahlung bleibt zensiert. Vier geldbedingte Abfahrtsblockaden und ein später nominaler Nowgorod-Hochgebührenfall erreichen das volle Nachfenster nicht; letzterer119 Folgetage bis Tag 355, keine Abfahrtsblockade. Vorzeitig blockierte Fälle bleiben negative Befunde.31 Zahlungen von 36 Akten, fünf nicht erreicht.111 gespeicherte Akten, **keine111 unabhängigen/verhaltensverschiedenen Pfade**; teils gleiche nominale/stabilisierte Zahlung und teils ungezahlte Baselinegleichheit.

## Tatsächliche Befehle, Quellcommits und Ergebnisse

| Vor Ausführung veröffentlichter Commit | Befehl / Ergebnis |
|---|---|
|`e56bd8166ba2a32a45bd683b74605524a224edf3`|Syntaxchecks vor Erstcommit erfolgreich (`node --check` für Engine/Fahrer); danach `node tests/analysis/q1_05/run.cjs pilot`; Kreditprobe bestanden, danach beschriebener Abdeckungsabbruch|
|`ef18beed12f797ab5b7f4c3dd0d5ed29c84967e4`|`node tests/analysis/q1_05/run.cjs pilot-retry`;3 Piloten +3 exakte Replays bestanden|
|`4da818950f73f69e6f8cff5603936c9e36746670`|`node tests/analysis/q1_05/run.cjs baseline` und `node tests/analysis/q1_05/select-fees.cjs`;72 weitere Akten und datenabhängige Kandidaten|
|`a3636b5b09f88f1a5c0165dd683d50445fe30049`|`node tests/analysis/q1_05/run.cjs fees`;36 Gegenläufe, keine technischen Abbrüche, wirtschaftliche Negativfälle erhalten|
|`cbb1d2766227379e31e039c3891068f8fe59da98`|`python tests/analysis/q1_05/audit.py`;111 Ereignisbilanzen, Reserven, E, Prüfsummen und36 Präfixe bestanden|
|`9b9fce46ce4111307af429fd14156d23a9a6ced1`|Lesendes Audit erneut nach präzisierter Fallzählungsbezeichnung; `python tests/analysis/q1_05/tables.py`; Tabellen +2 SVGs erzeugt, **keine weitere Partie**|

SVG-Export lieferte eine Fontconfig-Cachewarnung trotz erfolgreichem Abschluss; Matplotlib-Konfiguration liegt unter`/tmp`. Dateien erzeugt, keine Spiel-/Testergebnisse dadurch beeinflusst. Keine Browser-/Geräteprüfung nötig/ausgeführt: reine Analysedateien. Keine Migration, kein echter Spielstand geöffnet, keine Speicherkompatibilitätsprüfung neu behauptet.

## Tatsächliche Abdeckung und Grenzen

Baselines besuchen **sieben** Städte: Lübeck, Hamburg, Rostock, Stralsund, Bergen, Visby, Nowgorod. Alle elf Waren werden tatsächlich gehandelt. Einschließlich Gegenläufen elf Städte besucht, zusätzliche Häfen teils durch leere Stillstands-/Erkundungsreisen; keine Aussage „profitabler Handel in allen elf Städten“. [Abdeckung pro Fall](../../../tests/analysis/q1_05/results/coverage.json).

Bergen fast ausschließlich Bergen↔Hamburg, Nowgorod überwiegend Nowgorod↔Visby, Lübeck überwiegend Lübeck↔Hamburg. Daraus folgen Unterschiede in Reisezahl/Preisalterung; Startort und Bot-Routenpolitik lassen sich nicht isolieren. Lager-/Bauverpflichtungen werden rechnerisch im Reserveformat berücksichtigt, aber real keine solchen Schulden ausgelöst. Arrears/Notrettung nicht getestet, kein vollständiges Risikomodell.

Q-001/Q-003 offen. Keine neutralen Mischkostenzyklen und keine politische Fernaktion im Fahrer; keine Exploitbehebung behauptet. Produktiver Alt-Mischruf wird weiterhin nativ geschrieben, ignoriert und nicht in Ämter umgesetzt. Beschlossene künftige Politik ist nicht Gegenstand dieses Wirtschaftslaufs. Keine W1/W2, kein Gildenprototyp, keine Statistik für alle Spieler, keine90-Stunden-Aussage.

Die spezielle Auftragsgrenze überstimmt die generische AGENTS-1.500er-Vorgabe. Historische Dateien werden erhalten, nur neue Analyseordner und ergänzter Berichtsindex. Kein Merge oder Pages-Upload. Abschlusskontrollen und tatsächliches GitHub-Rücklesen werden am Ende gesondert belegt.


[Gesamtbericht](Q1_05_gesamtbericht.md) · [Testgrundlagen](Q1_05_testgrundlagen.md) · [Meilensteine](Q1_05_wirtschaftliche_meilensteine.md) · [Gebührenvergleich](Q1_05_gildengebuehren_vergleich.md) · [Spielspaß/Karriere](Q1_05_spielspass_und_karriere.md) · [Entscheidungsvorlage](Q1_05_entscheidungsvorlage.md)

## Formatkorrektur vor Abschlusskontrolle

Der vollständige Git-Diff meldete nachgestellte Leerzeichen in von Matplotlib erzeugten SVG-Pfadzeilen. Ausschließlich diese Leerzeichen entfernt und Gleichheit sämtlicher XML-Elemente, Attribute und Textinhalte bei normalisierter Whitespace geprüft; keine Diagrammkoordinate oder Wirtschaftszahl geändert. Exportskript führt die Formatnormalisierung künftig ebenfalls aus. Historische Rohdaten bleiben unverändert. `git diff --check` wird vor Abschluss erneut ausgeführt; keine Spielpartie dafür gestartet.
