# Q1.09b – Überprüfbarer Vorschlag W1-S

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

**Technisch vorbereitet, nicht aktiviert. Q001 bleibt offen.** Ein neutraler Kreislauf verändert weder Geld noch Warenmenge, kann aber gemischte Einstandswerte erhöhen. Die jetzige Kreditberechnung verwendet diese Werte. Laufende Bauaufträge übernehmen darüber hinaus Materialbuchwerte.

## Nachgewiesene Ausgangsdaten, übernommen

|Historischer Gegenfall|Geldänderung|Künstliche Wertänderung|Kreditänderung|
|---|---:|---:|---:|
|A02: drei gemischte Kreisläufe|0|577,5|260|
|A05: zwei Schiffe/Lager|0|330|149|
|Baupaar: gleiche Materialien, gleicher Werftlohn|0|188|85|

[Originale acht Handelsfälle](../../../tests/safety/q1_09/results/acceptance/valuation.json), [Originales Baupaar](../../../tests/safety/q1_09/results/acceptance/work-in-progress.json). Nicht noch einmal gehandelt/gebaut, keine historischen Ergebnisse überschrieben. Tatsächlich dokumentierte Warengewinne sind660,−300 beim Verlust und165 beim Teilverkauf. Diese Größen sind Warengewinne nach alter Kostenrechnung, keine Reisekostenbereinigung und kein Beweis manipulationssicherer Kreditbewertung.

## Konkret empfohlene Entscheidungsvariante

`S0 = Bargeld + Bank − Schuld + bestehender Schiffswert + Summe(min(bezahlter Werftlohn, 80% Typkosten))`.

**W1-S = S0 + Summe(Warenmenge × aktueller Referenzpreis am tatsächlichen Warenhafen).**

- Referenzkurse: vorhandene `markets[city][good].price`, für alle11 Städte und11 Waren. Jeder Schiffsladung wird ihr tatsächlicher `ship.city` zugeordnet; Lager verwenden ihren festen Stadtschlüssel. Derselbe Hafen/dieselbe Ware erhält denselben Kurs, unabhängig von Schiff, betrachteter Stadt, Einstandswert oder Warenherkunft.
- Keine neuen Referenzkurse, Preisparameter oder Zufallsaufrufe. Keine Verwendung einer fremden Marktansicht als Personenort. Die Berechnung darf keine bislang unbekannten Fernkurse im Informationssystem offenlegen; Auswirkungen indirekter Kreditwertinformationen sind vor Aktivierung zu entscheiden.
- Geladene/gelagerte Waren zählen einmal. Bereits verbrauchte Baumaterialien zählen nicht nochmals als Bestand. Ihre gespeicherten Kosten bleiben historische Daten, erhalten aber **keinen Material-Sicherheitenwert im laufenden Auftrag**.
- Bezahlter Werftlohn wird bis zur bestehenden80%-Typkostengrenze angerechnet; keine erfundene prozentuale Tagesbauleistung. Diese Lohnbesicherung ist selbst genehmigungspflichtig. Die alten Aufträge speichern keine vollständigen Materialmengen und Kostenlose; eine rückwirkend präzise Neubewertung dieser Materialien wäre daher keine kleine sichere Migration.
- Nach realer Übergabe gilt der bestehende Schiffswert. Bei der Schnigge entspricht das3040 statt2500 während der Lohnphase:540 mehr beim tatsächlich fertiggestellten Schiff, kein täglicher Papiergewinn.
- Kreditvergleich vorläufig mit bisher45% und1000-Untergrenze. Bestehende Schuld, Guthaben und Zinsen bleiben unverändert. Sinkt der neue Rahmen unter die Altschuld: keine Zwangstilgung, kein Schuldenerlass; neue Aufnahme nur nach ausdrücklich bestätigter Regel.

**W2-S = S0** ist die geprüfte konservative Alternative: keine Waren als Sicherheit, ebenfalls kein Materialbuchwert aus Bauaufträgen. W2-S entfernt mehr Sicherheit und ist deshalb keine neutrale technische Standardentscheidung.

## Konkrete Wirkungen

Das gespeicherte Baupaar hat heute Kreditrahmen6890/6975. Bei identischer Kasse7500, altem Schiffswert4960 und bezahltem Lohn2500 liefern **beide** Kandidaten14960 Sicherungswert bzw.6732 Kreditrahmen. Der Unterschied verschwindet, aber der Kreditrahmen sinkt. Während eines Baus werden in W1-S zuvor bewertete Materialien bewusst nicht mehr besichert. Das muss fachlich freigegeben werden.

Im alten45000-Grenzfall liegt der Buchwert44920→45250. Die gemeinsame Hafenreferenz ergäbe45580 schon vor dem neutralen Kreis; W2 ergäbe44680. W1-S kann somit Zugänge früher ermöglichen, W2-S später. Tägliche Marktänderungen und echte Transporte zwischen unterschiedlich bewerteten Häfen verändern W1-S ebenfalls. **Keine Behauptung unveränderter Balance oder nur realisierter Gewinne.**

## Verbraucher vollständig berücksichtigen

|Heutiger Verbraucher|Bedeutung für eine spätere Korrektur|
|---|---|
|`cargoWorth`, `warehouseWorth`, `shipyardWorth`, `netWorth`|Historische Buchanzeige und neue Sicherheitsbasis klar unterscheiden|
|`creditLimit`, `bankOp`|Neue Kreditaufnahme konsistent auf genehmigter Basis;45%/1000 nicht nebenbei ändern|
|`politicalWorth`, Unterstützung, Bürgermeister-/Hansequote|Bisher allgemeiner Buchwert abzüglich Mietrückstand; keine doppelte Schuld-/Mietrechnung|
|Frühe Ränge/`promote` und Schaltflächen|Sonst bleibt politischer Aufstieg durch neutralen Buchwertkreis erreichbar|
|Hafenarbeit|Indirekter Zugang über freien Kredit verändert sich|
|Kontor/Statistik/Testereignisse|Buchvermögen nicht unbemerkt in eine andere Kennzahl umbenennen|

Empfehlung: eine benannte gemeinsame Sicherheits-/Zulassungsfunktion für die ausdrücklich genehmigten Verbraucher; historische Kostenanzeige getrennt erhalten. **Nicht nur die Bank reparieren und dann Q001 insgesamt schließen.** Ob und wie dieselbe Basis bestehende politische Schwellen beeinflussen soll, ist Teil der Entscheidung. Alte Titel/Ämter bleiben geschützt. Die bereits beschlossene spätere Trennung von Handelsruf und Politik wird hier nicht aktiviert.

## Tatsächliche Prüfungen

Zehn der17 isolierten Gruppen betreffen Bewertung: alle121 Hafen-/Warenreferenzen, Mischkosten, Schiffe/Lager, unbekannte Kosten, Baugegenpaar, Bauübergang, Lohnkappung, Kreditidentitäten, Gewinne/Verluste und ungültige Eingaben. [Quellmodell](../../../tests/safety/q1_09b/valuation-proposal.cjs), [Daten](../../../tests/safety/q1_09b/results/proposals-attempt1.json).

Das Modell schreibt nicht in Spielstände und wird vom Spiel nicht eingebunden. Native Bank-/Bauaktionen mit aktivem W1-S sind **nicht** getestet, weil W1-S nicht freigegeben ist. Nötig nach Freigabe: gezielte aktive Regressionen aller Verbraucher, echte Kreditaufnahme/-grenze, Altschuld, Rangschwellen und Fertigstellung. Kein neues Wirtschaftsmodell eigenmächtig aktiviert.
