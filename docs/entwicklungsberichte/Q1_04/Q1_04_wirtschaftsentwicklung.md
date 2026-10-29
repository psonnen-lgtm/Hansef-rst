# Q1.04 – Gemessene wirtschaftliche Entwicklung

29.10.2026 · **Zehn verschiedene kurze aktuelle Baselines, keine menschliche Spielerstichprobe.** [Gesamtbericht](Q1_04_gesamtbericht.md) · [Balancing](Q1_04_gildenbeitritt_balancing.md) · [Grenzen](Q1_04_simulationsgrenzen.md).

Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`; Spiel0.8d.1b/V13, HTML `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Pilotcode vor Ausführung `637f74d514d80a89d064d9d230e569ddcf45726f`, restliche Baselines auf `4688f7f5f3d00e5ed5f7302ab2fd1135916a9f70`, gleiche eingefrorene Engine/Planer.

## Start, Information und Regeln

Alle starten als Ulf in Lübeck:5.000 Gold, gesunde unbewaffnete Kogge90, keine Ware/Bank/Schuld, leere Lager, keine Aufträge. Aggressiv nimmt als ausdrückliche Finanzierungsentscheidung sofort1.500 regulären Kredit auf. Das schafft6.500 Bargeld, aber weiterhin5.000 Nettogeld; nicht als Handelsgewinn zählen.

Zwei Seeds10001/10002 je Stil. Höchstens120 Tage/60 Entscheidungszyklen, keine letzte Reise über den Horizont erzwingen. Tatsächliche Enden118–120 Tage,41–45 Fahrten; der schlechte Anfang ist Teil des Horizonts. Ein Zyklus kann auch eine Erkundungsfahrt ohne Ware sein. Die drei ursprünglichen Risiko-Planer laufen in separater VM ohne Spielzustand, sehen nur lokale Angebote, eigene datierte Preisnotizen und bekannte Routen. Der optimierte Vergleich hat denselben Informationszugang.

| Stil | Regel/Unterschied |
|---|---|
| Vorsichtig |55% Bargeld beziehungsweise mindestens800 zurückhalten, höchstens35% des Laderaums kaufen, ältere Preisnotizen stärker abschlagen, kurze Wege bevorzugen |
| Normal |25% beziehungsweise mindestens300 behalten,70% Laderaum, mittlerer Altersabschlag |
| Aggressiv |5% beziehungsweise mindestens40 behalten, voller Laderaum, kein Altersabschlag, zusätzlich1.500 Anfangskredit |
| Beobachtungsoptimiert |15% beziehungsweise mindestens300 behalten, voller möglicher Laderaum, Gewinnschätzung je Reisezeit+2, Altersabschlag; kein fernes Livepreiswissen und kein Beweis eines optimalen Spielstils |
| Schlechter Anfang→normal |Nach erster Preiserkundung bis zu2 tatsächlich negative Verkäufe über zuvor beobachtete ungünstige Relationen; höchstens6 beladene Versuche/30 Tage, dann normal |

Reparatur unter70% Zustand nur bei vorhandener gemessener Reserve. Keine neuen Schiffe/Waffen/Lagerflächen, Informationskäufe, aktiven Lieferaufträge, Spenden oder politischen Anträge. Alle nativen Markt-/Reise-/Zinsregeln laufen; die vorhandenen alten Rufzuwächse bleiben unberührt und werden wirtschaftlich nicht gewertet. Rang bleibt0.

## Endstände und beobachtete Meilensteine

Je Zelle Spanne über **nur zwei Seeds**, keine Konfidenzintervalle. Buchvermögen umfasst den geschätzten Koggenwert; Geld ist davon getrennt.

| Stil | Endbargeld | Nettogeld nach Schuld | Natives Buchvermögen | Erste10.000 Bargeld | Erste20.000 Bargeld |
|---|---:|---:|---:|---:|---:|
|Vorsichtig|26.860–30.309|26.860–30.309|31.820–34.922|24–31 Tage|70–74 Tage|
|Normal|29.858–34.635|29.858–34.635|34.818–39.248|18–19 Tage|47–60 Tage|
|Aggressiv|36.815–47.483|35.286–45.954|40.246–50.567|6–10 Tage|42–56 Tage|
|Beobachtungsoptimiert|35.341–40.933|35.341–40.933|40.301–45.502|16–21 Tage|45–60 Tage|
|Schlechter Anfang→normal|27.241–28.899|27.241–28.899|31.854–33.859|21–31 Tage|66–70 Tage|

Aggressiveres Handeln ist in diesen zwei Fällen schneller, verwendet aber Kredit und größere Warenrisiken. Der beobachtungsoptimierte Vergleich ist nicht in jedem Fall der beste: Heuristik und spätere Preisentwicklung entscheiden. Keine heutige sichere Rangfolge beliebiger menschlicher Spielweisen daraus ableiten.

## Kassenverlauf an tatsächlichen Beobachtungspunkten

Die Rohdaten messen Nachverkaufszustände. Eine Spalte30/60/90/120 bedeutet den letzten **wirklich beobachteten** Stand spätestens an diesem Tag, keine Interpolation. Beispielsweise normal/10001 liegt der60er-Wert beiTag59, der120er-Endwert bei118. Daten enthalten jeweils das tatsächliche Datum.

| Stil/Seed | BisTag30: tatsächlicher Tag / Kasse | Bis60 | Bis90 | Endtag / Kasse |
|---|---:|---:|---:|---:|
|Vorsichtig/10001|30 /11.496|59 /18.462|88 /23.161|118 /30.309|
|Vorsichtig/10002|28 /9.701|60 /16.240|88 /23.389|120 /26.860|
|Normal/10001|30 /14.351|59 /22.877|88 /27.830|118 /34.635|
|Normal/10002|28 /11.812|60 /20.015|88 /24.992|120 /29.858|
|Aggressiv/10001|30 /17.194|60 /26.169|89 /38.494|119 /47.483|
|Aggressiv/10002|28 /14.286|60 /21.561|88 /30.088|120 /36.815|
|Beobachtungsoptimiert/10001|30 /14.940|59 /23.351|88 /32.531|120 /40.933|
|Beobachtungsoptimiert/10002|28 /12.786|60 /20.061|88 /28.588|120 /35.341|
|Schlechter Anfang→normal/10001|30 /11.856|59 /17.854|88 /23.519|118 /27.241|
|Schlechter Anfang→normal/10002|28 /8.989|60 /19.100|88 /23.706|120 /28.899|

Beim aggressiven Stil enthält Bargeld1.500 Kredit plus aufgelaufene Schuld: beispielsweise Seed10001 am Endtag119 Bargeld47.483, Schuld1.529,17, Nettogeld45.953,83. Bankeinlagen/Abhebungen/Tilgungen bleiben in diesem Versuchsaufbau0, keine Aussage über ihren Nutzen.

## Waren und Schiffskapital

Am Nachverkaufscheckpoint ist die Ladung0, Lager0; **unterwegs wird echte Ware gekauft und transportiert**. Rohdaten speichern Menge/Buchkosten direkt nach Kauf und vor Verkauf; CSV nennt höchste beobachtete Ladung und Kapitalbindung. Keine Waren kostenlos erzeugt. Vollständiger Verkauf pro Törn vermeidet gerade den Q-001-Mischrestkreis; andere menschliche Bestandsstrategien sind damit nicht geprüft.

Der Koggenbuchwert beginnt bei4.960 (80% des Katalogpreises6.200), nicht bei verfügbarem Bargeld. Gesunder Werftverkaufsansatz3.280 ist ebenfalls kein sofortiger Geldbestand: **das letzte Schiff darf nicht verkauft werden**. Stürme verändern Zustand/Buchwert; Reparatur kostet8 Gold pro Punkt. Ein Buchvermögenssprung nach Reparatur ist keine zweite reale Einnahme. Gildenbezahlbarkeit wird ausschließlich aus Geld und Rücklagen abgeleitet.

## Echte Handelsresultate und Kosten

Realisierte Marge ist der native Verkaufserlös minus bekannte Einkaufskosten der verkauften Menge, **vor** Reise-/Reparatur-/Zins-/Piratenkosten. Keine Quest-/Spenden-/Amtsprämien in den neuen Läufen. Alle frischen Kosten sind bekannt, keine unbekannten Altlose schöngerechnet.

| Stil | Realisierte Marge vor Kosten | Gebühren | Reparaturen | Piratenwarenkosten |
|---|---:|---:|---:|---:|
|Vorsichtig|23.183–25.958|264–270|248–504|137–549|
|Normal|26.255–30.642|264–270|248–504|495–623|
|Aggressiv|31.668–41.519|264–270|248–504|24–579|
|Beobachtungsoptimiert|31.694–36.603|246–270|248–504|176–579|
|Schlechter Anfang→normal|23.237–25.178|264–270|248–504|484–505|

Schuldzinsen aggressiv29,17–29,42, übrige Stile0. Unveränderte6%-Jahresregel mit360 Spieltagen; keine Zinsen nochmals bar abziehen, sie erhöhen die Schuld. Gebühren je Koggenfahrt6. Vorhandene Mieten/Arme/Schiffbau/Informationskosten sind nicht verschwunden, werden hier schlicht nicht ausgelöst.

Unabhängig lesend für25 unterschiedliche Pfade bestätigt:

`Endkasse = 5.000 + Erlöse − Käufe + Kredite − Hafengebühren − Reparaturen − hypothetische Aufnahmezahlung`.

`Endschuld = aufgenommener Kredit + tatsächliche Schuldzinsen`.

Bei leerem Schlusslager/-schiff: `Nettogeldänderung = realisierte Marge − Gebühren − Reparaturen − Zinsen − Kosten geraubter Ware − hypothetische Zahlung`.

Alle Gleichungen stimmen, ebenso Zerlegung des nativen Buchvermögens. Diese technischen Prüfungen sind kein allgemeiner Balancenachweis.

## Schlechte Entscheidungen und Erholung

Seed10001: zwei bewusst ungünstige tatsächliche Verkäufe anTag4/6 mit−180/−1.681 Marge; niedrigster Nachverkaufsgeldstand3.121. Wechsel zum normalen Handel anTag6, Nettogeld5.000 wieder anTag15. Später tritt noch ein normaler Verlust auf: insgesamt drei negative Verkäufe sind nicht drei absichtliche Anfangsverluste.

Seed10002:−1.463/−1.200 anTag4/7; niedrigste Kasse2.319. Normale Strategie abTag7,5.000 Nettogeld wieder anTag16. Endstände27.241/28.899. Nur **diese zwei moderaten Stresspfade** erholen sich; keine Garantie für schwere Fehlentscheidungen oder die historischen20/30-Verlustfälle.

## Stillstand und Quellen

Baseline:0/10 technische Abfahrtsblockaden,0/10 Fälle ohne Kauf/Verkauf in den letzten30 Tagen. Das ist eine Beschreibung kleiner deterministischer Fälle, keine Ausfallwahrscheinlichkeit. Die Gebührengegenprobe liefert dagegen bei hoher Gebühr einen regelabhängigen Handelsstillstand trotz positivem Geld/Buchvermögen; siehe Balancingbericht.

[Pilotrohdatei](../../../tests/analysis/q1_04/results/pilot.json) · [weitere9 Baselines](../../../tests/analysis/q1_04/results/baseline.json) · [kompakte CSV](../../../tests/analysis/q1_04/results/baseline-summary.csv) · [lesendes Audit](../../../tests/analysis/q1_04/results/audit.json). Keine simulierten Tage/Zyklen in aktive menschliche Stunden umrechnen.
