# P1.4 – Bestand der Schiffsreisezeiten

**Alle55 Städtepaare sind verbunden. Die heutige Dauer ist richtungssymmetrisch, aber eine schematische Spielzeit und keine nautisch vermessene Entfernung.** Besonders auffällig ist Lübeck–Hamburg: dieselben2 Tage für eine intakte Kogge wie Lübeck–Rostock, ohne eigenen Landumschlag oder dänischen Seeweg im Zeitmodell.

28.10.2026 Europe/Berlin · Analysebranch `analysis/p14-voyage-times` · frisch geprüfte GitHub-Basis **`ffc0bfad0e36e4547f7a5750bb68b169f93f8009`**. Produkt unverändert **0.8d.1b/V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Programme/Prüfplan vor Ausführung veröffentlicht: **`86ad5c5bd650d8d9137b6c939d7e00c2faa30681`**. [Statische Rohdaten](../../tests/analysis/phaseP14/results/static-attempt1.json), [55-Paare-CSV inklusive B/C und beschädigten Schiffen](../../tests/analysis/phaseP14/results/routes55.csv), [Analyseplan](../../tests/analysis/phaseP14/README.md).

[Historische Einordnung](2026-10-28_P14_historischer_vergleich.md) · [Ereignisreichweite](2026-10-28_P14_ereignisse_erreichbarkeit.md) · [Entscheidung/Wirtschaft/Tests](2026-10-28_P14_entscheidung.md).

## Wirklich vorhandene Berechnung

Wörtlich aus HTML: `routeTravelDays(from,to,speed)` berechnet `ceil(DIST[from][to]/speed)` mit mindestens1 Tag für verschiedene Orte und addiert feste Binnenzuschläge. Gleicher Ort0, ungültiger Ort/Geschwindigkeit `null`.

Effektives Tempo je Schiff: `gespeicherte speed × (0,65 + 0,35 × Zustand/100)`. Konvoi: langsamstes tatsächlich mitreisendes örtliches Schiff. Es gibt keinen zusätzlichen Einfluss von Ladungsmenge, Windrichtung, Jahreszeit oder Reiseentfernung auf dieses Tempo. `DIST` ist eine symmetrische11×11-Matrix **ohne physikalische Einheit**. Die gezeichnete Seekartenlinie bestimmt nicht die Reisedauer.

| Typ | Unbewaffnete Kapazität | Grundtempo | Tempo bei30% Zustand | Gebühr je Fahrt | Kaufpreis im bestehenden Katalog |
|---|---:|---:|---:|---:|---:|
| Schnigge |55 Fass |1,5 |1,1325 |4 Gold |3.800 |
| Kogge |90 |1 |0,755 |6 |6.200 |
| Holk |140 |0,72 |0,5436 |9 |10.500 |

Bewaffnung belegt10 Fass je Stufe; Mindestkapazität15. Keine laufenden Mannschafts-/Proviantkosten, keine tägliche Frachtgebühr und kein normaler Verschleiß je Seetag implementiert. Reparatur kostet unverändert8 Gold je fehlendem Zustandspunkt, unabhängig vom Typ. Nicht als historisch vollständige Betriebskostenrechnung ausgeben.

Nowgorod und Venlo kosten je berührtem Endpunkt **3 feste Umschlagtage**, unabhängig vom Schiffstempo. Nowgorod–Venlo daher6. Andere Häfen haben keinen festen Hafenaufenthalt. Im Code steht Nowgorod für den logischen Warenweg über Newa/Ladoga/Wolchow und Venlo für Maas-Umschlag, nicht für ein physisch durchgehend bis dorthin fahrendes Seeschiff. Brügge erwähnt Zwin-Umschlag, bekommt aber keinen eigenen zusätzlichen Zeitposten.

## Vollständige Tabelle: heutiges Modell A

Intakte Schiffe, sofortige Abfahrt. Zeiten in **Spieltagen** einschließlich U. Spalten S/K/H: Schnigge/Kogge/Holk. DIST ist der echte Spielwert, keine Kilometerzahl. Rückfahrt bei unverändertem Zustand jeweils gleich. Kürzel: N/O=Nord-/Ostseewechsel im **Analysemodell**, Ng=Nowgorod-Binnenanschluss, V=Venlo-Binnenanschluss. Für **jede Zeile** gelten dieselben möglichen Piraten-/Sturmereignisse ohne Zusatzreisetage; siehe unten.

| Start | Ziel | DIST | U | S | K | H | Hinweis |
|---|---|---:|---:|---:|---:|---:|---|
|Lübeck|Hamburg|2|0|2|2|3|N/O|
|Lübeck|Rostock|2|0|2|2|3|–|
|Lübeck|Stralsund|3|0|2|3|5|–|
|Lübeck|Stettin|4|0|3|4|6|–|
|Lübeck|Danzig|8|0|6|8|12|–|
|Lübeck|Bergen|12|0|8|12|17|N/O|
|Lübeck|Visby|7|0|5|7|10|–|
|Lübeck|Brügge|10|0|7|10|14|N/O|
|Lübeck|Nowgorod|19|3|16|22|30|Ng|
|Lübeck|Venlo|11|3|11|14|19|N/O · V|
|Hamburg|Rostock|3|0|2|3|5|N/O|
|Hamburg|Stralsund|4|0|3|4|6|N/O|
|Hamburg|Stettin|5|0|4|5|7|N/O|
|Hamburg|Danzig|9|0|6|9|13|N/O|
|Hamburg|Bergen|10|0|7|10|14|–|
|Hamburg|Visby|8|0|6|8|12|N/O|
|Hamburg|Brügge|8|0|6|8|12|–|
|Hamburg|Nowgorod|20|3|17|23|31|N/O · Ng|
|Hamburg|Venlo|9|3|9|12|16|V|
|Rostock|Stralsund|2|0|2|2|3|–|
|Rostock|Stettin|3|0|2|3|5|–|
|Rostock|Danzig|7|0|5|7|10|–|
|Rostock|Bergen|13|0|9|13|19|N/O|
|Rostock|Visby|5|0|4|5|7|–|
|Rostock|Brügge|11|0|8|11|16|N/O|
|Rostock|Nowgorod|17|3|15|20|27|Ng|
|Rostock|Venlo|12|3|11|15|20|N/O · V|
|Stralsund|Stettin|2|0|2|2|3|–|
|Stralsund|Danzig|6|0|4|6|9|–|
|Stralsund|Bergen|14|0|10|14|20|N/O|
|Stralsund|Visby|7|0|5|7|10|–|
|Stralsund|Brügge|12|0|8|12|17|N/O|
|Stralsund|Nowgorod|19|3|16|22|30|Ng|
|Stralsund|Venlo|13|3|12|16|22|N/O · V|
|Stettin|Danzig|4|0|3|4|6|–|
|Stettin|Bergen|15|0|10|15|21|N/O|
|Stettin|Visby|8|0|6|8|12|–|
|Stettin|Brügge|13|0|9|13|19|N/O|
|Stettin|Nowgorod|20|3|17|23|31|Ng|
|Stettin|Venlo|14|3|13|17|23|N/O · V|
|Danzig|Bergen|19|0|13|19|27|N/O|
|Danzig|Visby|5|0|4|5|7|–|
|Danzig|Brügge|17|0|12|17|24|N/O|
|Danzig|Nowgorod|17|3|15|20|27|Ng|
|Danzig|Venlo|18|3|15|21|28|N/O · V|
|Bergen|Visby|18|0|12|18|25|N/O|
|Bergen|Brügge|18|0|12|18|25|–|
|Bergen|Nowgorod|30|3|23|33|45|N/O · Ng|
|Bergen|Venlo|19|3|16|22|30|V|
|Visby|Brügge|16|0|11|16|23|N/O|
|Visby|Nowgorod|12|3|11|15|20|Ng|
|Visby|Venlo|17|3|15|20|27|N/O · V|
|Brügge|Nowgorod|28|3|22|31|42|N/O · Ng|
|Brügge|Venlo|4|3|6|7|9|V|
|Nowgorod|Venlo|29|6|26|35|47|N/O · Ng · V|

## Ereignisse, Transport und Tagesfortschritt

- Vorbereitung `planTravel`: Dauer, Gebühr und Schiffs-IDs stehen fest; noch kein Tag, kein Gold und kein Reiseereignis. Nur Schiffe im Ausgangshafen, keine Flottenteile anderer Häfen. Konvoi nimmt alle örtlichen Schiffe.
- `arrive`: ein Ereigniswurf pro Fahrt, Gebühr einmal, `advance(days)`, danach Sturm-/Piratenfolgen und Ortswechsel. Eine wiederholte Ankunft derselben Vorbereitung erzeugt im geprüften Fall keine zweite Bewegung/Zahlung.
- Piratenbegegnung13% je Fahrt. Abwehr `min(0,94;0,3+0,21×Bewaffnungsstufen+0,09×Schiffsanzahl)`. Ein unbewaffnetes Einzelschiff wehrt39% der Begegnungen ab; erfolgreicher Überfall daher rechnerisch7,93% je Fahrt, kein Tagesrisiko. Bei Misserfolg1–3 Fass aus dem ersten beladenen teilnehmenden Schiff und dessen tatsächlichem Herkunftsbestand entfernen.
- Sturm14% je Fahrt, jedes mitreisende Schiff verliert3–10 Zustandspunkte, mindestens30 bleiben. Kein Sinken und **keine zusätzlichen Tage**. Ein späterer Rückweg kann durch den beschädigten Zustand länger werden.
- Weitere13% liefern eine freundliche Begegnungsgeschichte; sonst normale Fahrt. Auch günstiger Wind in der Geschichte verkürzt keinen Tag. Keine echten Wind-/Strömungs-/Saison-/Wintereisregeln.
- Alle121 Warenmärkte, Kreditzinsen, Bankzinsen, Lagerfristen/-mieten, Werft und politische Fristen schreiten mit der **globalen Spieluhr** fort. Auch entfernte Schiffe stehen währenddessen in ihren Häfen. Der aktuelle Code führt keine gleichzeitig laufenden autonomen Reiseaufträge der Flotte aus.
- Nach der Ankunft gewöhnlicher Handel zum dann geltenden Preis. Waren werden während der Fahrt nicht am Ausgangsmarkt zurückgesetzt und nicht automatisch verkauft. Keine zusätzliche Frische-/Verderbsmechanik.

Der Klick überspringt die Spieltage, er verlangt keine entsprechende reale Wartezeit. Daraus folgen weder menschliche Spielstunden noch eine Aussage zur tatsächlichen UI-Laufzeit langer Tagesfortschritte; Browserperformance hier nicht geprüft.

## Aufträge und bestehende politische Reisen

Gewöhnlicher Lieferauftrag: beim Angebotsaufruf zufällige Ware aus bestehendem Pool0–5,6–18 Fass, Prämie `n×Basispreis×2`. Erfüllung durch wirklichen Verkauf am Ziel, fremde tatsächliche FIFO-Herkunft, mindestens geforderte Menge, Fristtag noch gültig. Keine gesonderten allgemeinen Passagier-/Kurieraufträge implementiert.

Die fünf ursprünglichen Städte behalten zufällig8–15 Tage Frist. Die sechs späteren Städte erhalten mindestens die kürzeste fremde Hin-/Rückfahrt mit dem ausgewählten Schiff bei30% Zustand plus3 Tage. Das berücksichtigt nur den nächsten Beschaffungsort, keine garantierte Ware dort. Bestehende normale Aufträge können durch Piratenmengenverlust oder auslaufende Frist scheitern.

Das **alte produktive** Politiksystem hat eigene Versorgungs-/Ratsvereinbarungen: persönlicher Besuch beim Partner und Rückkehr; Frist mindestens drei Ratsabschnitte, sonst berechnete doppelte Partnerfahrt bei Tempo0,755 plus10. Bei aktuellen60-Tage-Abschnitten also mindestens180 Tage. Partnerauswahl sortiert nach heutiger Route bei Tempo1. Längere Zeiten würden Partnerauswahl, Dienstfristen, Amtspflege und Ratsabschnitte berühren. Historische Altparameter können abweichen und müssen erhalten werden.

Die beschlossene neue Wahlordnung mit örtlichem Vertrauen ist **noch nicht produktiv implementiert**. Diese Bestandsaufnahme bewertet keine neuen Stimmen oder Ämter aus den alten Rang-/Ansehensfunktionen.

## Symmetrie und historische Ergebnisse

Alle55 Entfernungen und alle errechneten A/B/C-Zeiten beider Richtungen bei gleichen Schiffsdaten stimmen überein. Tatsächliche Rückfahrten müssen wegen Sturmzustand, Konvoizusammensetzung oder neuer Vorbereitung nicht gleich sein. Windabhängige Richtungsunterschiede gibt es nicht.

Das lesende Audit vergleicht zusätzlich330 gespeicherte gerichtete Reisezeiten aus [Phase08a](../../tests/simulation/phase08a-20261026-01/rumor-route-feasibility.json), damaliger Spielcommit `a826d9d531efc1ea148a1aa2d38657e1f8a45e7d`: alle entsprechen heutigen A-Werten. Keine damaligen Tests oder Reisen neu ausgeführt. Ältere [0.5d-Dokumentation](2026-10-24_0.5d_elf-spielbare-staedte.md) bezeichnet Entfernungen/Umschlag ausdrücklich als vorläufige Spielwerte, keine historische Vermessung.
