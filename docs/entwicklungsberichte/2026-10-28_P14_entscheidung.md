# P1.4 – Empfehlung zu Reisezeit und Ereignisfristen

**Empfohlen wird eine vorsichtige B-ähnliche Korrekturrichtung: echte Nahstrecken behalten, auffällige Nord-/Ostseewechsel und Fernwege gezielt plausibler machen. Die untersuchten B/C-Formeln sind noch nicht produktionsreif.90 Tage bleiben ein sinnvoller unbeschlossener Ausgangspunkt für seltene Hilfsereignisse.**

28.10.2026 Europe/Berlin · Basis frisch auf GitHub geprüft: **`development/v04-foundation` / `ffc0bfad0e36e4547f7a5750bb68b169f93f8009`**, erwarteter Merge vonP1.3. Neuer Analysebranch `analysis/p14-voyage-times`. Unverändertes Spiel **0.8d.1b/V13**, HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

[55-Paare-Bestand](2026-10-28_P14_reisezeiten_bestand.md) · [Historische Einordnung/Quellenzugang](2026-10-28_P14_historischer_vergleich.md) · [Ereignisse und alle Ausgangsorte](2026-10-28_P14_ereignisse_erreichbarkeit.md) · [Analyseprogramme](../../tests/analysis/phaseP14/README.md).

## Drei vorab festgelegte Modelle

Alle vorgeschlagenen Zahlen sind **nicht beschlossen** und keine aus Quellen rekonstruierte nautische Entfernung. Produktive HTML bleibt unverändert. Nordseegruppe inB/C: Hamburg, Bergen, Brügge, Venlo; andere Städte zur Ostsee-/Binnenanschlussgruppe gerechnet.

| Modell | Rechenweg | Einordnung |
|---|---|---|
| A | Echte native `ceil(DIST/Tempo)` plus3 Tage je Endpunkt Nowgorod/Venlo | Bestehende Spielwirtschaft, schnellere Relationen und bekannte Fristen erhalten. |
| B | Rechenbasis `D+ceil(0,25×max(0,D−4))`, bei Nord-/Ostseewechsel mindestens10; danach gleiche Tempo-/Umschlagsrechnung | Vorsichtige Fernwegverlängerung; Ausnahme Lübeck–Hamburg stark betroffen. Keine allgemeine „nur25% länger“-Behauptung. |
| C | Rechenbasis `D+ceil(0,75×max(0,D−4))`, Seegebietswechsel mindestens16; sonst gleich | Stärker nach Entfernung differenziert; historisch nicht quellenkalibriert. Deutliche Belastung langsamer Schiffe und Lieferketten. |

Beide Vorschläge behalten gleiche Schiffstypfaktoren und bestehende feste Binnenzuschläge. Keine neuen Wind-/Produktions-/Preis-/Gebührenregeln. Echte kurze Wege mitD≤4 innerhalb derselben Seegruppe bleiben unverändert; Lübeck–Hamburg ist trotzD2 eine bewusst gesonderte Seegebietsverbindung.

### Wichtige Strecken: intakte Kogge, Tage

| Strecke | A heute | B Vorschlag | C Vorschlag |
|---|---:|---:|---:|
|Lübeck–Hamburg|2|10|16|
|Lübeck–Rostock|2|2|2|
|Lübeck–Danzig|8|9|11|
|Lübeck–Bergen|12|14|18|
|Lübeck–Nowgorod|22|26|34|
|Lübeck–Venlo|14|16|20|
|Bergen–Nowgorod|33|40|53|
|Nowgorod–Venlo|35|42|54|
|Brügge–Venlo|7|7|7|
|Bergen–Brügge|18|22|29|

### Klarer Befund gegen die unveränderte Übernahme vonB/C

Für die drei intakten Schiffstypen wurde im heutigen ModellA kein statisch schnellerer Umweg gefunden. B erzeugt **35**, C **75** Städtepaare/Schiffstyp-Kombinationen mit schnellerer Fahrt über Zwischenhäfen, zusammen110 Befunde. Gezählt über55 Paare×3 Typen, nicht110 unterschiedliche Stadtpaare. Zusatzgebühren und weitere Ereigniswürfe des Umwegs dabei nicht eingerechnet.

BeispielB/Kogge: Lübeck–Danzig direkt9 Tage, über Lübeck–Stettin–Danzig4+4=8. Die streckenweise Zuschlagsfunktion verstößt damit gegen eine konsistente additive Wegekette. Das ist ein **nachgewiesenes Problem der neuen Analyseformeln**, kein nachträglich entdeckter produktiverA-Fehler. UnterC treten mehr solche Fälle auf. Die Befunde bleiben in [Rohdaten/shortcuts](../../tests/analysis/phaseP14/results/static-attempt1.json) erhalten; Parameter nicht nach Ergebnis passend gemacht.

Die Empfehlung betrifft deshalb die **moderate Größenordnung und gezielte Routenprüfung** vonB. Eine spätere freigegebene Umsetzung müsste Wege/Umstiege konsistent definieren und Fristen prüfen; diese Folgearbeit wurde nicht begonnen. Kein viertes Modell erfunden und keine selbständige Produktivintegration.

## Wirtschaftliche Auswirkungen

### Zeit ist ein Kosten-/Chancenfaktor, auch ohne tägliche Goldgebühr

Beispiel Lübeck–Hamburg, gesunde Kogge, unveränderter Zustand und sofortige Wechsel: A2, B10, C16 Tage je Strecke. Rechnerische Obergrenzen in360 Tagen: **90/18/11 vollständige Hin-/Rückfahrten**. Keine Gewinne pro Reise oder volle Laderäume garantiert. Mit Einkauf/Aufenthalten, Piraten, Sturm und politischen Wegen sinkt die Zahl.

Bestehende Gebühr bleibt6 Gold je Koggenfahrt,12 je Rundreise. Bei90 Fass nur0,0667 Gold/Fass/Fahrt; bei15 Fass0,4. Längere Fahrzeit erzeugt ohne Regeländerung **keine** höhere Hafengebühr. Zusätzliche1.000-G-Schuld kostet per bestehender6%-Jahreszinsformel während2/10/16 Tagen etwa0,324/1,620/2,593 Gold, sie wächst im Schuldfeld; nicht nochmals als bar bezahlte Gebühr buchen. Lager-/Werft-/Auftragsfristen laufen weltweit weiter.

Eine rein angenommene Marge8 Gold je Fass ergibt bei voller Kogge und6 Gebühr714 Gold/Fahrt, also357/71,4/44,625 Gold pro Reisetag inA/B/C. **Statische Sensitivität, kein tatsächlicher oder prognostizierter Jahresgewinn.** Die realen Preise ändern sich während längerer Reisen und können Marge sowohl senken als auch erhöhen. [Alle495 rechnerischen Routen-/Modell-/Typfälle](../../tests/analysis/phaseP14/results/economics.csv).

Auslastung: Holk140 vs Schnigge55 ist mehr Transport pro Fahrt, aber langsamer; für kleine Hilfe15 fährt jedes Schiff teilweise leer. Im bestehenden Modell beeinflusst Füllung das Tempo nicht. Bewaffnung kostet Kapazität. Ein Konvoi bündelt reale örtliche Ladungen mit einer Ereignisauflösung, zahlt jede Schiffsgebühr und richtet sich nach dem langsamsten Schiff.

Große Flotten erhalten nicht automatisch parallele Reisezeitersparnis: `advance` verschiebt die gemeinsame Weltuhr, ferne Schiffe liegen weiter in ihren Häfen. Mehrere nacheinander geklickte Reisen kosten nacheinander globale Tage. Künftige NPC dürfen nicht mit kostenloser Ware oder unsichtbar überlegener Kalender-/Reisemechanik helfen. Keine Flotten-KI neu geschrieben.

Piraten/Sturm werden einmal pro Fahrt gewürfelt. Bei weniger Fahrten pro Jahr gibt es im bestehenden Code weniger Begegnungswürfe, **nicht** ein unverändertes tägliches Piratenrisiko über mehr Seetage. Ein neuer Tagesrisikowurf wäre eine weitere Wirtschaftsänderung und wird nicht vorgeschlagen. Gesunde Rückfahrzeit in der Tabelle darf nach einem Sturm nicht ungeprüft verdoppelt werden.

### Acht echte isolierte V13-Prüfverläufe

Jeweils30 vorhandene Fass zu8 Gold,500 Bargeld,1.000 Schuld, eine Fahrt, danach tatsächlicher Verkauf. ModellB/C ändern ausschließlich den privaten geplanten `pending.days`-Wert; kein produktiver Funktionskörper ersetzt. Markt/Fristen/Zinsen/Verkauf folgen echtem V13. Wetterast bewusst kontrolliert, keine statistische Ereignishäufigkeit gemessen.

| Probe | Tage | Gebühr | Verkaufserlös | Questprämie | Goldende | Zinszuwachs Schuld |
|---|---:|---:|---:|---:|---:|---:|
|Lübeck–Hamburg-A|2|6|510|100|1104|0,324|
|Lübeck–Hamburg-B|10|6|510|0|1004|1,620|
|Lübeck–Hamburg-C|16|6|510|0|1004|2,593|
|Bergen–Nowgorod Holk-A|45|9|480|0|971|7,310|
|Bergen–Nowgorod Holk-B|55|9|510|0|1001|8,942|
|Bergen–Nowgorod Holk-C|73|9|630|0|1121|11,886|
|Nativer Sturmkonvoi|4|13|390|0|877|0,648|
|Nativer Piratenfall|2|6|493|0|987|0,324|

Der30er-Auftrag ist ein kontrolliertes gültiges Testfixture, kein vom normalen6–18-Fass-Angebotsgenerator neu erzeugter Auftrag.

Lübeck–Hamburg: gleiche tatsächliche Verkaufserlöse510, aber der konstruierte8-Tage-Auftrag zahlt nur beiA100 Zusatzgold. UnterB/C ist er abgelaufen. Das belegt ein Fristenrisiko, keine allgemeine geringere Marktpreisqualität. Bei Bergen–Nowgorod steigt der Verkaufserlös im einen Seed mit späterem Ankunftstag480→510→630; **kein Beweis, dass längere Reisen profitabler sind**. Zeitpunkt/Zufallsfolge und Marktpreis sind zeitabhängig.

Keine der acht kontrollierten Partien wird bargeldlos: Endgold877–1.121. Vorhandene Ware wurde jedoch nicht erst eingekauft;500 Startgeld und1.000 Schuld sind keine geprüfte Anfängerkarriere. Keine Insolvenz-/Liquiditätsstillstandsquote aus acht Fällen ableiten. Kleine Händler brauchen weiter Reserve für Gebühren, Reparaturen und Kreditlast; ungünstige Käufe könnten Verluste erzeugen. Sicherer wirtschaftlicher Aufstieg ist nicht bewiesen.

Nativer Sturmfall: beschädigter örtlicher Holk bestimmt4 Tage des Konvois, Gebühr13, fernes Schiff bleibt in Bergen. Sturm kostet Zustand, keine Extratage. Piratenfall:1 tatsächliches Fass verloren,29 verkauft,30er-Auftrag trotz rechtzeitiger Ankunft nicht erfüllt. Doppelte Ankunft in allen acht Fällen ohne zweite Zahlung/Zeitschritt. Die acht Cash-/Waren-/Zinsbilanzen bestehen im [lesenden Audit](../../tests/analysis/phaseP14/results/audit.json).

## Antworten auf die acht Entscheidungsfragen

1. **Zu schnell?** Nicht pauschal belegbar. Einige Relationen stark abstrahiert, besonders Lübeck–Hamburg. Ohne nautische Distanzen und zugängliche historische Vergleichsdaten keine verifizierte Knotengeschwindigkeit.
2. **Auffällige Verbindungen?** Lübeck–Hamburg2 Koggentage und fehlende echte Wetter-/Hafenwartezeiten; feste Binnenzuschläge nicht historisch kalibriert. B/C zusätzlich rechnerische Zwischenstoppabkürzungen.
3. **Nahstrecken behalten?** Ja als Empfehlung, z.B. Lübeck–Rostock2 Koggentage und Stralsund–Stettin2. Keine pauschale Verlängerung kurzer echter Küstenwege.
4. **Fernstrecken verlängern?** Gezielt/moderat prüfen, besonders Seegebietswechsel; nicht jede heutige mehrwöchige Reise automatisch stark erhöhen.
5. **Schiffstypen ausreichend?** Als Spielentscheidung klar unterscheidbar, nicht historisch verifiziert. Tempo1,5/1/0,72 plus Zustand/Konvoi sinnvoll verständlich; schwerer Holk kann bei stark verlängertemC an Ereignisfristen scheitern. Keine neuen Typwerte beschlossen.
6. **Wirtschaftliche Folgen?** Weniger Handelszyklen/Tagesspielraum, länger laufende Zinsen und unsicherere Preise, ablaufende Aufträge; Gebühr bleibt pro Fahrt. B/C dürfen nicht isoliert ohne Fristen-/Kleinhändlerprüfung freigegeben werden.
7. **90 Tage angemessen?** Als vorläufiger Ausgangspunkt unterA/B für vorbereitete Direktreaktion ja, keine Garantie bei Beschaffung/Mehrfachhilfe.60 enger,120 mehr Reserve; endgültige Dauer/Informationsregeln offen.
8. **Bester Kompromiss?** B-ähnliche moderate Richtung mit gezielter Klärung Lübeck–Hamburg, Nahstrecken erhalten. Die eingefroreneB-Formel wegen Umwegfehlern nicht unverändert übernehmen. A bleibt heute produktiv, C derzeit zu belastend und historisch unbestätigt.

## Prüfprotokoll, Herkunft und Grenzen

| Ausführung | Ergebnis |
|---|---|
| `node --check` neuer CJS-Dateien | Syntax erfolgreich, keine Spieltage. |
| `node tests/analysis/phaseP14/static.cjs tests/analysis/phaseP14/results/static-attempt1.json` auf **`86ad5c5bd650d8d9137b6c939d7e00c2faa30681`** |5 statische Prüfgruppen bestanden;55 Paare,2.178 Erreichbarkeitszeilen, A/B/C,100/30%,60/90/120 Tage; nur reine extrahierte Funktionen, keine Spielpartie.110 B/C-Umwegbefunde offen. |
| `node tests/analysis/phaseP14/dynamic.cjs tests/analysis/phaseP14/results/dynamic-attempt1.json` auf demselben Commit |**8 von8 vollständigen kurzen tatsächlichen V13-Verläufen bestanden**, jeweils1 Fahrt, höchstens73 Tage. [Log](../../tests/analysis/phaseP14/results/dynamic-attempt1.log), [vollständige Start-/Ankunfts-/Enddaten](../../tests/analysis/phaseP14/results/dynamic-attempt1.json). Keine Wiederholung/Fehlerkorrektur nötig. |
| Rohdaten gesichert in **`c0c25d77505063b8734e4bc810c78eb97f6d1934`** |Unmittelbar vor Audit und Berichten auf GitHub veröffentlicht. |
| `node tests/analysis/phaseP14/audit.cjs tests/analysis/phaseP14/results/audit.json` auf **`e07c973f1f5d78b3b8cdc4f954e465d7b275f6bd`** |8 Bilanzen, unveränderte Quellensummen,330 historische gerichtete08a-Routenwerte gegen heutigesA bestätigt. Keine VM/Reise neu initialisiert. [Log](../../tests/analysis/phaseP14/results/audit.log). |
| Vier externe historische Seitenaufrufe |Alle Tunnel403, kein Inhalt. Quellenhinweise ausdrücklich unbestätigt, keine exakten historischen Reisen erfunden. |

Neue Ergebnisse einmalig in neuen Dateien, alte Resultate unverändert. Keine1.500er-/2.250er-Wirtschaftsserien, vollständigen Karrieren, Browser-/Gerätetests, neue Save-Migration oder vollständigen Basissuiten. Kein Fehler im eigenen Testablauf; die B/C-Umwegschwäche ist ein inhaltlich negativer Modellbefund. Allgemeine AGENTS-Großsimulationsregel wird durch den ausdrücklichen begrenzten Analyseauftrag überstimmt. Keine menschlichen Spielzeitprognosen.

Die beschlossene neue Politik mit Heimatwahl, Bürgermeister vor Eldermann, stadtbezogenem Vertrauen und ganzjährigen begrenzten Rivalenressourcen bleibt Konzept. Die Reiseanalyse vergibt keine Ämter/Stimmen und korrigiert keine alten Kosten-/Ansehensexploits. Goldausgaben für echte Beziehungen dürfen ohne Profit sinnvoll sein; Reiseanwesenheit oder altes globales Ansehen allein reichen nicht als Vertrauensbeleg.

Bestandsschutz durch Nichtänderung: HTML/SpielstandformatV13, Importpfade, Ämter, Schiffe/Ladung/FIFO, Bank/Kredit, Märkte, Lager, Informationen und bisherige historische Daten bleiben unverändert. Keine neue Prüfung all dieser Mechaniken behauptet. Nur neue Analyse-/Berichtsdateien und Indexergänzung.

## GitHub-Übergabe

[Analysebranch](https://github.com/psonnen-lgtm/Hansef-rst/tree/analysis/p14-voyage-times) · [direkter Vergleich gegen development/v04-foundation](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...analysis/p14-voyage-times?expand=1). Berichte/Index und abschließender PR-Status werden mit den Übergabenachweisen gesichert. Keine Zusammenführung, keine Änderung an main oder GitHub Pages, keine Folgephase.

Vier Berichte/Index und Bilanzaudit veröffentlicht in [Commit `5a71e7e`](https://github.com/psonnen-lgtm/Hansef-rst/commit/5a71e7e1e08a16c059282815e36ea5847b52dcd5). PR tatsächlich versucht mit `gh pr create --draft --base development/v04-foundation --head analysis/p14-voyage-times --body-file /tmp/p14-voyage-times-pr.md`; GitHub antwortete **`Post "https://api.github.com/graphql": Forbidden`**. Kein PR erstellt; Git-Push funktioniert. Branch, Commit und direkter Vergleich oben stehen bereit.

Abschlusskontrolle:3.214 vorhandene Dateien geprüft, bis auf den nur ergänzten Berichtsindex bytegleich zur Basis. Testquellen unverändert zum tatsächlichen Testcommit, relative Verweise/Dateiumfang und `git diff --check` geprüft. GitHub-Basis weiterhin `ffc0bfad0e36e4547f7a5750bb68b169f93f8009`, main weiterhin `c1280228951d581c7b3131279b8ff164a8e36dfa`. [Übergabedaten](../../tests/analysis/phaseP14/results/handoff.json) und [Prüfsummen](../../tests/analysis/phaseP14/results/SHA256SUMS) sichern die neuen Artefakte. Keine weitere Aufgabe begonnen, Auftrag beendet.
