# Q1.09c – W1-S, Kredit und historische Gegenfälle

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

## Getrennte Bedeutungen

**Buchwerte** beschreiben die gespeicherten Einstandskosten. **Referenzvermögen** bewertet vorhandene Mengen zum aktuellen Warenhafenpreis und dient wirtschaftlichen Zulassungen/Kreditsicherheiten. **Warengewinn** bleibt Verkaufserlös minus bisherige Einkaufskosten. Ein Verkauf kann deshalb einen Warengewinn ausweisen, obwohl die bereits zum Marktpreis bewertete Sicherheit unverändert bleibt.

Aktive Rechnung:

`Referenz = Gold + Bank − Schuld + bisheriger Schiffswert + vorhandene Warenmengen × aktueller Preis ihres tatsächlichen Hafens + min(bezahlter Werftlohn, 80% Typkosten) je laufendem Auftrag`.

Schiffsladung und Lager derselben Stadt verwenden denselben Kurs. Materialbuchwerte laufender Aufträge zählen nicht, es gibt keine erfundene tägliche Bauleistung. Unbekannte historische Kosten/Herkunft bleiben unbekannt. W2-S wurde nicht aktiviert.

## Verbraucher und Grenzen

|Verbraucher|Aktive Verwendung|
|---|---|
|`creditLimit`, `bankOp`|Referenzbasis, unverändert45% und1000-Untergrenze|
|Frühe wirtschaftliche Rangzulassung/Schaltfläche|Dieselbe Referenzbasis|
|`politicalWorth`|Referenzbasis minus bestehende Mietrückstände einmalig|
|Politische wirtschaftliche Unterstützung/Bürgermeister-/Hansequoten|Über `politicalWorth` konsistent|
|Hafenarbeit|Indirekt derselbe verfügbare Kredit|
|Bauaufträge|Nur bezahlter Lohn bis zur bisherigen Kappung|
|Kontor/Statistik/Testhistorie|Buchwerte getrennt erhalten; Kontor erklärt Referenzwert zusätzlich|

Keine Zwangstilgung von Altschuld, kein Schuldenerlass und keine Aberkennung vorhandener Titel/Ämter. Übernommene Schulden über dem neuen Rahmen bleiben stehen; eine weitere Aufnahme ist gesperrt, reguläre Tilgung möglich. Marktpreisänderungen und echte Ortswechsel von Waren dürfen Referenzwerte verändern. Es ist keine neue Gewinnrechnung und keine Behauptung balanceneutraler Kreditgrenzen.

## Erneut tatsächlich ausgeführte historische Fälle

[8 aktive Fälle](../../../tests/safety/q1_09c/results/final-acceptance/valuation.json): leerer neutraler Kreis, drei gemischte Kreise, Teilverkauf, Lagerrundlauf, mehrere Schiffe/Lager, echter Gewinn, echter Verlust und alter Ranggrenzfall.

|Fall|Geldänderung|Historischer Buchwert Δ|Referenz/Kredit Δ|
|---|---:|---:|---|
|Drei gemischte Kreise|0|+577,5|0 /0|
|Mehrere Schiffe/Lager|0|+330|0 /0|
|Alter45000-Grenzfall|0|+330|0 /0|

Warengewinn im unveränderten Verfahren: Teilverkauf165, Gewinnfall660, Verlustfall−300. Mengen, Ursprungslose, Kosten und Transaktionen laufen durch die tatsächlichen Spielaktionen. Der frühere Grenzfall44920→45250 Buchvermögen hat jetzt45580 Referenzvermögen schon vorher/nachher. Ein weiterer aktiver Test mit44999 Referenz und über45000 Buchwert weist Rangaufstieg samt Schaltfläche ab.

## Schiffbau-Gegenfall

[Erneut beauftragtes Baupaar](../../../tests/safety/q1_09c/results/final-acceptance/construction.json): jeweils10000 Startkasse, gleiche physischen Materialien,2500 Werftlohn, ein Fall mit vorherigem neutralem Holzgeschäft.

|Nach Auftrag|Ohne Kreis|Mit Kreis|
|---|---:|---:|
|Gold|7500|7500|
|Materialbuchwert|352|616|
|Historischer Bauwert|2852|3040|
|Sicherungswert insgesamt|14960|14960|
|Aktiver Kreditrahmen|6732|6732|

Die188 Buchwertdifferenz bleibt historische Information und erzeugt **keine85 zusätzlichen Kreditpunkte**. Eine weitere native Prüfung führt den Bau zu Ende: Lohnsicherheit entfällt bei Übergabe, dann zählt das reale fertige Schiff.

Sieben zusätzliche [Verbraucherprüfgruppen](../../../tests/safety/q1_09c/results/final-acceptance/economic.json) prüfen alle121 Hafen-/Warenreferenzen, Kreditgrenzen, Altschuld, Rangzulassung, politische Wirtschaftsanteile, Hafenarbeit, echte Kursänderung und Bauübergang. Preise, Marktfortschreibung, Zinsen, Hafengebühren und Handelsgewinncode wurden zusätzlich mit dem Ausgangscode verglichen.

## Verbleibender Pfad

Die alte globale Ansehensregel honoriert weiterhin positive Handelsmargen. Der ausgeführte neutrale Fall erzeugt+1 Ansehen; die native politische Unterstützung übernimmt davon1/6. [Diagnose ohne erneute Handelsausführung](../../../tests/safety/q1_09c/results/final-acceptance/reputation-open.json). Wirtschaftlicher Unterstützungsanteil, Referenz und Kredit bleiben gleich.

Deshalb **finanzielle W1-S-Abnahme bestanden, keine uneingeschränkte Q001-Schließung**. Eine neue politische Anerkennungsregel wurde nicht unterstellt. Es gibt keinen Nachweis unbegrenzter Goldschöpfung oder eines vollständigen Karrierewegs allein aus diesem Restpfad.
