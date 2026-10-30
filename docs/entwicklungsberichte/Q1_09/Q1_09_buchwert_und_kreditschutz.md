# Q1.09 – Q-001 bleibt fachlich offen

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


**Keine W1-/W2-Regel aktiviert. Die aktive Sicherheiteninvariante ist weiterhin verletzt.** Q1.09 Abschnitt 4 lässt die Bewertungsentscheidung ausdrücklich offen; eine konkrete Entscheidung wurde angefragt. Ohne Antwort keine Zustimmung unterstellen.

## Aktive Verbraucher

`cargoBookPrice`/`cargoWorth` und `warehouseWorth` verwenden historische/gemischte Kosten. `netWorth` addiert Geld/Bank−Schuld, Waren, Schiffswerte und **`shipyardWorth`**. Darauf bauen Kreditrahmen, frühe Ränge, politisches Vermögen/Unterstützung, Bürgermeister-/Hansezulassung und Anzeigen auf. Hafenarbeit hängt indirekt unter anderem am verfügbaren Kredit. Eine neue Bewertung verschiebt damit auch bisherige Zugänge, nicht nur eine Anzeige.

Kein isoliertes Entfernen des globalen Handels-/Ankunfts-/Spendenrufs in Q1.09. Ohne neuen Karrierepfad könnte das alte Ämterzugänge beeinträchtigen. Diese produktive Umstellung bleibt Q1.10 vorbehalten; alte Erfolge nicht entwerten.

## Acht aktuelle kleine Handelsregressionen

|Fall|Kassenänderung|Aktuelles Vermögen Δ|Aktueller Kreditrahmen Δ|Nur rechnerisch W1 Δ|Nur rechnerisch W2 Δ|
|---|---|---|---|---|---|
|A01-empty-neutral|0|0|0|0|0|
|A02-mixed-three-cycles|0|577.5|260|0|0|
|A03-partial|-450|165|74|0|-450|
|A04-warehouse-roundtrip|0|0|0|0|0|
|A05-two-ships|0|330|149|0|0|
|A06-real-profit|900|660|297|0|900|
|A07-real-loss|900|-300|-135|0|900|
|A08-old-rank-threshold|0|330|149|0|0|

A02/A05/A08 zeigen weiterhin künstliche Aufwertung bei gleichem Geld und gleicher Warenmenge. Die Regression bestätigt den offenen Fehler, **nicht** bestandenen Schutz. Legitime vollständige Verkäufe behalten 660 Gewinn bzw.−300 Verlust; Teilverkauf 165 Gewinn bleibt korrekt nach bestehender Berechnung. Preise, Mengen, Alt-Einstandswerte und Historie nicht umgeschrieben.

W1 hier nur als Vergleich: gemeinsame aktuelle Referenz je tatsächlicher Stadt/Ware für alle eigenen Schiffe und Lager. W2: diese Waren aus der Sicherungsbasis ausschließen. Derselbe aktuelle 45%-Faktor dient nur der Vergleichsrechnung. Keine Zahl oder Variante produktiv übernommen.

Der 45.000er-Grenzfall liegt aktiv 44.920→45.250; W1 wäre vorher/nachher 45.580, W2 bei 44.680. Damit würde W1 schon vorher einen alten Rangschwellwert erfüllen, W2 nicht. Nicht als balanceneutrale Korrektur verkaufen.

## Indirekter Bauwertpfad – enger zusätzlicher Gegenfall

Zwei kontrollierte Fixtures mit denselben physischen Baumaterialien, je 10.000 Startkasse, je 2.500 Werftlohn. Nur eine Variante führt vorher einen neutralen Holz-Kauf-/Verkaufskreis durch. Keine Bauvollendung oder große Simulation.

|Nach Auftragserteilung|Unvermischt|Nach neutralem Holzhandel|
|---|---:|---:|
|Bargeld|7.500|7.500|
|Materialbuchwert im Auftrag|352|616|
|Bauauftragswert nach bestehender Kappung|2.852|3.040|
|Aktuelles Gesamtvermögen|15.312|15.500|
|Aktueller Kreditrahmen|6.890|6.975|

**188 Wert/85 Kredit mehr ohne Geld- oder Materialzuwachs.** Das ist eine begrenzte zusätzliche Sicherheitenaufwertung, kein Beweis unbegrenzter Goldschöpfung. `shipyardWorth` übernimmt historische Materialbuchwerte; eine nur auf noch gelagerte/geladene Ware gerichtete W1/W2-Umstellung würde diesen Pfad übersehen.

Die oben gerechneten W1/W2-Vergleiche behalten noch die bisherige Bauwertbasis und sind deshalb **keine vollständige Sicherheitslösung für laufende Aufträge**. Die 8 Vergleichsfälle hatten keine laufende Werft. [Baugegenfall](../../../tests/safety/q1_09/results/acceptance/work-in-progress.json), [Handelsdaten](../../../tests/safety/q1_09/results/acceptance/valuation.json).

## Nötige fachliche Entscheidung

1. Eine gemeinsame aktive Zulassungs-/Sicherungsbasis festlegen, statt einzelne Verbraucher unterschiedlich zu reparieren.
2. W1: Referenzkurse/Ortsbezug und Umgang mit laufenden Baumaterialien ausdrücklich bestimmen. Aktuelle Hafenpreise, letzte bekannte Preise oder weitere konservative Regeln sind fachlich verschieden.
3. W2: Ausschluss von Waren und deren Materialanteil in Bauaufträgen klären; Umgang mit bezahltem Werftlohn ebenfalls festlegen. Konservative Sicherheit bedeutet keine Löschung historischer Kosten oder Waren.
4. Folgen für bestehende Kreditgrenzen, alte Schuld, Rang-/Rettungszugang beurteilen; keine automatische Zwangstilgung oder Aberkennung alter Titel.

Technisch unstrittig sind nun konsistente Speicherung und erhaltene Originaldaten. Für die finanzielle Bewertung gab es keinen unabhängig eindeutig genehmigten Ersatz; deshalb bleibt TeilD Diagnose und Entscheidungsvorbereitung. Keine ungeprüfte V14-Prototypübernahme. **Q-001 nicht vollständig behoben.**


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
