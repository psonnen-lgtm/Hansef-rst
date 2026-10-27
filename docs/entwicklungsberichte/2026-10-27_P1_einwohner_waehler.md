# Phase P1 – Einwohner und Wahlberechtigte

27.10.2026 · Europe/Berlin · **Konzeptphase, keine produktive Implementierung.**

Frisch geprüfte GitHub-Basis: **`a5ec92a19018a4049567c80f8e8fbd687f3a8d3e`**, Merge #42. Branch **`analysis/p1-election-concept`**. Produktiver Stand unverändert **0.8d.1b / V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kleines Analyseprogramm und Vorschlagsparameter vor Prüfung veröffentlicht: **`9fd3b0851738ec161b19d6d370e99e7a62a19eac`**. Spätere Berichtscommits sind keine angeblichen neuen Spielcode-Teststände.

**Verbindlich beschlossen** sind Wahlen mit absoluten Stimmen, elf Stadtbevölkerungen mit begrenztem Wahlkörper, aktive finanzierte Konkurrenz, Abschaffung aktiver Kaufmannsränge und Vermögens-/Ansehenshürden sowie Bestandsschutz. **Alle nachstehenden konkreten Zahlen, Intervalle, Gruppen-, Finanzierungs- und Übergangsregeln sind begründete Vorschläge zur Entscheidung**, noch keine genehmigte Balance.

[Wahlordnung](2026-10-27_P1_wahlordnung.md) · [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md) · [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md) · [Bestandsschutz/Änderungsliste](2026-10-27_P1_bestandsschutz.md) · [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md).
## Vorschlagszahlen für die tatsächlich vorhandenen elf Städte

Die Reihenfolge entspricht unverändert `CITIES=EXPANSION_CITIES`, nicht einer neuen geografischen Sortierung. Die Zahlen sind **Spielwelt-Startwerte**, keine belegten Einwohnerstatistiken des Jahres1350. Sie sollen größere Handelszentren und kleinere Häfen unterscheidbar machen. Exakte historische Grenzen, städtische Vororte und Bürgerrechte sind unsicher; keine Quellenrecherche oder historische Genauigkeitsgarantie wird behauptet. Die einheitliche20%-Regel ist eine verständliche Spielabstraktion, keine Rekonstruktion mittelalterlichen Wahlrechts.

| ID | Stadt | Einwohner | Wahlberechtigte | Nichtwahlberechtigte | Untergrenze | Obergrenze |
|---:|---|---:|---:|---:|---:|---:|
| 0 | Lübeck | 25.000 | 5.000 | 20.000 | 12.500 | 37.500 |
| 1 | Hamburg | 16.000 | 3.200 | 12.800 | 8.000 | 24.000 |
| 2 | Rostock | 12.000 | 2.400 | 9.600 | 6.000 | 18.000 |
| 3 | Stralsund | 10.000 | 2.000 | 8.000 | 5.000 | 15.000 |
| 4 | Stettin | 9.000 | 1.800 | 7.200 | 4.500 | 13.500 |
| 5 | Danzig | 20.000 | 4.000 | 16.000 | 10.000 | 30.000 |
| 6 | Bergen | 8.000 | 1.600 | 6.400 | 4.000 | 12.000 |
| 7 | Visby | 6.000 | 1.200 | 4.800 | 3.000 | 9.000 |
| 8 | Brügge | 40.000 | 8.000 | 32.000 | 20.000 | 60.000 |
| 9 | Nowgorod | 30.000 | 6.000 | 24.000 | 15.000 | 45.000 |
| 10 | Venlo | 5.000 | 1.000 | 4.000 | 2.500 | 7.500 |
| **Summe** | | **181.000** | **36.200** | **144.800** | **90.500** | **271.500** |

## Wer zählt genau einmal?

- Einwohner P: alle dargestellten Bewohner, auch ohne Wahlrecht.
- Wahlberechtigte E: zur Wahl festgeschriebene Zahl `floor(P/5)`; keine auswählbaren Einzelpersonen mit eigener Wirtschaft nötig.
- Nichtwahlberechtigte: `P−E`. Diese Zahl enthält **keine** weiteren Kandidatenstimmen.
- Unterstützer: disjunkte Teilmengen von E, einem Kandidaten zugeordnet.
- Unentschlossene U: übriger Teil von E. Vor der Wahl ebenfalls wahlberechtigt, kein zusätzlicher Bevölkerungstopf.
- Nichtwähler am Wahltag: im vorgeschlagenen Mindestmodell genau U; alle eindeutig zugesagten Unterstützer stimmen ab. Eine zusätzliche zufällige Beteiligungsquote wird zunächst nicht eingeführt.

Damit gilt immer `ΣKandidatenunterstützer + U = E ≤ P`; am Wahltag `ΣabgegebeneStimmen = E−Nichtwähler`. Kandidaten, die selbst als Bewohner gedacht sind, erhalten keine Extra-Stimme außerhalb dieses Wahlkörpers. Die Gruppen sind ausschließlich wahlberechtigte Personen, nicht mehrfach zählende Berufs-/Familienzugehörigkeiten.

## Vier verständliche Wählergruppen

| Gruppe | Anteil an E | Politische Interessen | Abgrenzung |
|---|---:|---|---|
| Bürgerhaushalte |40% | Grundversorgung, soziale Hilfe, verlässliche Zusagen | Ein Wahlberechtigter wird dieser Hauptgruppe zugeordnet oder einer anderen, nie mehreren. |
| Handwerk |25% | Knappe Materialien, Ratsvermittlung, öffentliche Projekte | Keine weiteren Stimmen für gleichzeitig bestehende Kaufmannskontakte. |
| Seeleute/Hafenleute |20% | Versorgung, Hafenorganisation, Sicherheit öffentlicher Vorhaben | Kein eigener Wählerzuwachs durch Schiffsbestand. |
| Kaufleute/Ratsfamilien |15% | Verlässliche Vereinbarungen, Handelspartner, Amtsführung | Alte Ratsgruppen sind Milieu, keine zusätzlichen Wählerkonten. |

Die Prozente werden nur zur **einmaligen ganzzahligen Aufteilung** verwendet. Größte-Reste-Verfahren: `floor(E×Anteil/100)`, Restpersonen in absteigender Reihenfolge der Divisionsreste, Gleichstand nach gespeicherter fester Gruppenpriorität. Kein unabhängiges Runden jeder Gruppe nach oben. Bei den vorgeschlagenen Startzahlen sind alle Teilmengen ohne Rest exakt.

| Stadt | Bürgerhaushalte | Handwerk | See-/Hafenleute | Kaufleute/Ratsfamilien | Summe |
|---|---:|---:|---:|---:|---:|
| Lübeck | 2.000 | 1.250 | 1.000 | 750 | 5.000 |
| Hamburg | 1.280 | 800 | 640 | 480 | 3.200 |
| Rostock | 960 | 600 | 480 | 360 | 2.400 |
| Stralsund | 800 | 500 | 400 | 300 | 2.000 |
| Stettin | 720 | 450 | 360 | 270 | 1.800 |
| Danzig | 1.600 | 1.000 | 800 | 600 | 4.000 |
| Bergen | 640 | 400 | 320 | 240 | 1.600 |
| Visby | 480 | 300 | 240 | 180 | 1.200 |
| Brügge | 3.200 | 2.000 | 1.600 | 1.200 | 8.000 |
| Nowgorod | 2.400 | 1.500 | 1.200 | 900 | 6.000 |
| Venlo | 400 | 250 | 200 | 150 | 1.000 |

## Entwicklung und Grenzen

**Für einen ersten späteren Wahlordnungsstand empfohlen: P zunächst statisch halten.** Bürgerzahl ist zunächst nur Größe/Atmosphäre des Wahlkörpers. Eine echte Bevölkerungsdynamik ist nicht Voraussetzung für aktive Rivalen oder absolute Stimmen.

Optionaler späterer Entwurf: einmal pro360-Tage-Jahr wird aus veröffentlichten Versorgungs-/Krisenbelegen eine Veränderung ermittelt. Normalfall höchstens±2% von P, schwere belegte Krise bis−10%, positive Jahresentwicklung höchstens+2%. Mit Ganzzahlen/`floor` und Klammerung auf50–150% des Stadtstartwerts. Keine zusätzliche tägliche Zufallsbevölkerung und keine heimliche Rückwirkung auf Handel.

Beispiel Lübeck:25.000→höchstens 25.500 in einem guten Jahr, normale negative Entwicklung bis 24.500, schwere Krise bis 22.500; absolute Grenzen12.500–37.500. Eine einzelne Krise wird einmal je ID ausgewertet, nicht wiederholt beim Öffnen oder nach jedem Lieferklick. Versorgungskriterium aus echten öffentlichen Leistungen und fristgemäßer Abnahme, nicht aus Buchwert oder ungeschützten Ein-/Auslagerungen.

Einwohneränderung zum Jahresbeginn; neue Wählerzahl erst mit veröffentlichter nächster Wählerliste. Während der90-Tage-Kampagne P/E und Gruppengrößen einfrieren; weder ein Fest noch spontane Migration erzeugt in letzter Minute neue Wahlberechtigte. Große Krisen innerhalb dieser Zeit beeinflussen zunächst die politische Bewertung, die nächste Bevölkerungsfortschreibung später. Dadurch sind Wählerwechsel und Bevölkerungsänderung getrennte, prüfbare Ereignisse.

Grenzen begrenzen Wachstum, sind aber **keine getestete demografische Balance**. Wahlrechte bisheriger Personen dürfen bei Reduktion nicht mehrfach weitergezählt werden: nächste Gruppenpartitionierung ersetzt den gesamten neuen Wahlkörper, überträgt Bindungsanteile per Ganzzahlverfahren; alte Wahlergebnisse behalten ihre damalige Zahl.

## Spätere wirtschaftliche Relevanz – getrennte Freigabe nötig

P könnte künftig Lebensmittelbedarf, Verbrauch öffentlicher Vorräte, Krisenanfälligkeit oder die Größe öffentlicher Projekte skalieren. Dafür wäre ein eigener Bedarf-/Produktions-/Handelsabgleich nötig. Eine bloße Multiplikation des heutigen Warenverbrauchs mit Einwohnerzahlen könnte die elf Märkte und Fernhandelsbalance stark verschieben.

**P1 ändert deshalb weder Produktion, Marktbestand, Preise, Hafengebühren, Lager, Schiffe noch Kredite.** Auch die öffentliche Versorgungsaktion im Wahlkonzept ist nur ein zukünftiger Vorschlag; sie darf nicht unbemerkt den gesamten Warenmarkt neu modellieren. Einwohnerdaten benötigen erst bei tatsächlicher Einführung eine neue Speicherfassung; heute bleiben sie ausschließlich in [Vorschlagsdaten](../../tests/analysis/phaseP1/proposal.json).

## Durchgeführte und noch ausstehende Prüfung

[Konzeptnachweis](../../tests/analysis/phaseP1/results/concept-attempt1.json): elf Namen/Indizes gegen tatsächlichen HTML-Text, P/E/Grenzen und disjunkte Gruppen geprüft, Gesamtsumme181.000 Einwohner/36.200 Wahlberechtigte bestätigt. Keine HTML-Ausführung, keine Einwohner in eine Partie geschrieben.

Nicht geprüft: reale Bevölkerungsentwicklung, Krisenwirkung, Marktversorgung, Migration eines Wählerbestands, Langzeitmotivation und Geräteperformance. Die vorgeschlagenen Zahlen sind zur Entscheidung geeignet, keine empirisch kalibrierte Freigabe.
