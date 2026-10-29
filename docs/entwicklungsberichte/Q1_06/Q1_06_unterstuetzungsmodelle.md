# Q1.06 – Drei Unterstützungsmodelle und alle elf Stadtziele

29.10.2026 · **Konzept, keine Umsetzung.** Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Produkt 0.8d.1b/V13, HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA 256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Alle neuen Regeln sind Empfehlungen bis zur Nutzerentscheidung.


## Bestand und konkrete Blockade

Heute: Wirtschaft≤10 + globaler Ruf≤15 + Dienste≤40 + örtliche Zusagen≤20 + gehaltene Vereinbarungen≤15. Entfernt man die ersten beiden Teile ersatzlos, bleiben 75. Lübeck 80, Hamburg 76 und Brügge 78 sind dann unmöglich. Andere Kandidaturbedingungen verschwinden dadurch ebenfalls nicht automatisch.

Die örtlichen Größen sind **keine zusätzlichen gespeicherten Punkte**: `D=min(40,5×örtlicheDienste)`, `Z=5×erfüllteZusagen` mit vier möglichen Zusagen, `V=min(15,5×Vereinbarungen)`. Zusagen werden aus 2 Versorgungen, 3 Versorgungen, 2 Vereinbarungen sowie 6 Diensten/3 Abschnitten/2 Arten abgeleitet. Das als `endorsements` benannte Formelglied sind diese örtlichen Zusagen, **nicht** die gespeicherten auswärtigen Stadtsiegel.

## A – Normierung, empfohlen

`Unterstützung = 100 × (D+Z+V) / 75`, alte Stadtziele 60–80 bleiben. Keine Abhängigkeit von Geld, Warenbuchwert oder allgemeinem Ruf. Der Vergleich erfolgt exakt, die Anzeige kann wie bisher auf eine Nachkommastelle gekürzt werden. Keine gerundete Anzeige als Entscheidungsgrundlage.

**Stärken:** Wenigste neue Gewichtungsentscheidungen, vorhandene Belege/Zusagen nutzbar, vertraute 100er-Skala und regionale Zielunterschiede bleiben. Ein erklärbarer abgeleiteter Index, kein Stimmenzähler und keine Wahlwahrscheinlichkeit. **Schwächen:** Gleiche Belege tragen teilweise mehrfach bei (Dienst, Zusage, Vereinbarung), Angebots-/Abschnittsmonotonie bleibt; Normierung alleine erzeugt keine neue Tätigkeit.

**Balancewirkung:** Nicht neutral gegenüber altem Globalruf-/Wirtschaftsmix. Bei 65 lokalen Punkten wird neu 86,67, früher je nach Globalanteil 65–90. Vermögende/hochrufende Spieler verlieren ihre Abkürzung; tatsächliche lokale Leistungen gewinnen relativ. Für die Zukunft vorgeschlagen, nicht rückwirkend auf gewonnene Ämter anwenden.

## B – Lokalskala und angepasste Stadtziele

`Unterstützung = D+Z+V`, also 0–75. Je Stadt `neuesZiel = ceil(3×altesZiel/4)`. Dadurch bleibt die beabsichtigte relative Zielhöhe. Anzeige erklärt beispielsweise „65 von 60 auf der örtlichen 75er-Skala“.

**Stärken:** Keine Normierung der einzelnen Beiträge; lokale Rechnung bleibt unverändert. **Schwächen:** Ungewohnte 75er-Skala und neue elf Zielwerte, historische 100er-Wahlsnapshots nicht direkt vergleichbar. **Wichtiger Befund:** Dieses konkrete proportional gerundete B ist für die geprüften ganzzahligen lokalen Werte **exakt wahlergebnisgleich mit A**. Es ist eine andere Darstellung/Parametrierung, keine zweite unabhängige Balancingverbesserung. Andere nichtproportionale Zielwerte wären zusätzliche, hier nicht freigegebene Änderungen.

## C – Lokale Gewichtung neu verteilen

`Unterstützung = D + 10×erfüllteZusagen + (20/3)×min(Vereinbarungen,3)`.

Maximal 40 Dienstpunkte +40 Zusagenpunkte +20 Vereinbarungspunkte=100, alte Stadtziele bleiben. Stärkeres Gewicht auf belegte Gruppenunterstützung statt reine Zahl weiterer Dienste. Kein neuer Geld-/Rufanteil und keine neue Währung.

**Stärken:** Inhaltliche Neuverteilung, breitere Zusagen besser erkennbar. **Schwächen:** Zusagen selbst hängen weiterhin an denselben Dienstanzahlen; neue Gewichtung bevorzugt bestimmte Mischungen und ist deutlich begründungs-/balancingbedürftiger. Beispiel eine Versorgung/sechs Vereinbarungen: A 80 gegenC 75, dadurch fallen Lübeck, Hamburg und Brügge aus der Gewinnergruppe. Keine höhere Vielfalt allein durch neue Zahlen.

## Stadtziele und rechnerische Erreichbarkeit

|Stadt|A: Ziel/100|B: Ziel/75|C: Ziel/100|Im Modell erreichbar A/B/C|
|---|---|---|---|---|
|Lübeck|80|60|80|ja/ja/ja|
|Hamburg|76|57|76|ja/ja/ja|
|Rostock|68|51|68|ja/ja/ja|
|Stralsund|65|49|65|ja/ja/ja|
|Stettin|67|51|67|ja/ja/ja|
|Danzig|74|56|74|ja/ja/ja|
|Bergen|62|47|62|ja/ja/ja|
|Visby|70|53|70|ja/ja/ja|
|Brügge|78|59|78|ja/ja/ja|
|Nowgorod|64|48|64|ja/ja/ja|
|Venlo|60|45|60|ja/ja/ja|

Belegbarer Zeuge für jede Stadt unter den **heutigen**6-Dienste-/3-Abschnitte-/2-Arten-Sperren: drei Versorgungen und drei Vereinbarungen aus drei Abschnitten. Lokale 65 → A 86,67, B 65, C 90; alle Ziele erreicht. Das ist ein rechnerisch konsistenter Belegsatz, **keine gespielte Karriere oder Garantie für Reise-/Markt-/Fristabwicklung**.100 ist in A/C bei vier+vier Diensten erreichbar, 75 in B.

819 konsistente Kombinationen (0–12 Versorgung/0–12 Vereinbarung, mögliche Zahl verschiedener Abschnitte), elf Städte und drei Modelle: **27.027 reine Modellvergleiche**, keine 27.027 Spielverläufe. A/B immer gleich, A/C in 81 Stadt-/Belegkombinationen unterschiedlich. [33 Stadt-/Modellzeilen](../../../tests/analysis/q1_06/results/city-models.csv), [acht anschauliche Beispiele](../../../tests/analysis/q1_06/results/model-examples.csv), [Quellen und genaue Brüche](../../../tests/analysis/q1_06/results/inspection.json).

## Stile, Wiederholungen und Grenzen

|Spielweise|A/B|C|Weiter nötige Voraussetzung|
|---|---|---|---|
|Nur reicher Handel/Spenden, keine Taten|0|0|Keine Kandidatur allein aus Geld/Ruf|
|Nur Versorgung oder nur Vereinbarungen|Teilscore möglich|Teilscore möglich|Beide Arten für örtliche Qualifikation nötig; eine Summe ersetzt das nicht|
|3+3 ausgewogen|Alle elf Ziele|Alle elf Ziele|Gültige örtliche IDs/Präsenz und sonstige Zulässigkeit|
|5Versorgungen+1Vereinbarung|66,67; vier Städte|66,67; vier Städte|Höhere Ziele brauchen weitere/breitere Leistungen|
|1Versorgung+6Vereinbarungen|80; alle elf|75; acht Städte|C gewichtet die fehlende Versorgungszusage stärker|

Keine Formelumstellung allein verhindert Wiederholungsfarmen. D/Z/V sind begrenzt, IDs müssen eindeutig, Stadtkontext gültig und reale Vorgänge einmal anerkannt sein. Zusagen beruhen heute auf Zahlen, nicht auf einer großen aktiven Rivalen-KI. Selben Beleg nur einmal in einer Summe zählen; vorhandene funktionale Überschneidung der Komponenten erklären statt zusätzliche fünf Punkte auf den Summenwert draufzuschlagen. Eine normale Handelsquest ist keine politische Urkunde.

Alle Modelle brauchen denselben echten Präsenzschutz und eine revisionsgebundene Regel für neue Aufträge. Alte Zusagen sind überwiegend **abgeleitet**, keine separat zu löschenden Tokens. Gespeicherte `endorsements`, `appointments.support` und Urkunden bleiben erhalten und behalten ihre historische Regelbedeutung; keine alten Siege nach neuem Index für ungültig erklären.

## Noch gemeinsam zu entscheiden

**A als Unterstützung empfehlen, nicht sämtliche heutigen Zulassungssperren automatisch mitbeschließen.** Gilden-/Ratsherr-/Präsenz-/Mietbedingungen, harte 6-/3-Abschnittssperren, Wiederantragsfrist und neue Ereignisgelegenheit sind getrennte Regeln. Der Karrieremodellbericht schlägt für neue Regeln Mehrheit+beide Arten ohne zusätzliche starre Sechs-/Drei-Sperre vor; der aktuelle Angebotskalender würde trotzdem weiter Wiederholungen begrenzen. Änderungen an `issued`, ID-Kontext und der vierten Zusage brauchen eine gemeinsame Definition, bevor Kalenderbindung gelöst werden kann. Keine stillschweigende Aufhebung im Rechenvergleich.

Die drei Modelle wurden **nicht** produktiv aktiviert. Tatsächliche Wahlen, Reisechronik, Gerätebedienung oder M2-Übernahme sind damit noch nicht getestet.

[Gesamtbericht](Q1_06_gesamtbericht.md) · [Karrieremodell](Q1_06_karrieremodell.md) · [Entscheidungsmatrix](Q1_06_entscheidungsmatrix.csv)

Die81 A/C-Abweichungen zählen reine Zielschwellenentscheide über alle konsistenten Belegsätze, einschließlich solcher ohne vollständige Kandidaturzulässigkeit. Sie sind **nicht81 gespielte oder81 zulässige abweichende Wahlen**. Die Beispieltabellen prüfen die heutigen Dienstsperren zusätzlich.
