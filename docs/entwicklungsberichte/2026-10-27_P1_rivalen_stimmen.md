# Phase P1 – Aktive Rivalen und echte Stimmen

27.10.2026 · Europe/Berlin · **Konzeptphase, keine produktive Implementierung.**

Frisch geprüfte GitHub-Basis: **`a5ec92a19018a4049567c80f8e8fbd687f3a8d3e`**, Merge #42. Branch **`analysis/p1-election-concept`**. Produktiver Stand unverändert **0.8d.1b / V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kleines Analyseprogramm und Vorschlagsparameter vor Prüfung veröffentlicht: **`9fd3b0851738ec161b19d6d370e99e7a62a19eac`**. Spätere Berichtscommits sind keine angeblichen neuen Spielcode-Teststände.

**Verbindlich beschlossen** sind Wahlen mit absoluten Stimmen, elf Stadtbevölkerungen mit begrenztem Wahlkörper, aktive finanzierte Konkurrenz, Abschaffung aktiver Kaufmannsränge und Vermögens-/Ansehenshürden sowie Bestandsschutz. **Alle nachstehenden konkreten Zahlen, Intervalle, Gruppen-, Finanzierungs- und Übergangsregeln sind begründete Vorschläge zur Entscheidung**, noch keine genehmigte Balance.

[Wahlordnung](2026-10-27_P1_wahlordnung.md) · [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md) · [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md) · [Bestandsschutz/Änderungsliste](2026-10-27_P1_bestandsschutz.md) · [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md).
## 1. Ein endlicher Wahlkörper statt addierter Bonusstimmen

Jede Stadt hat E Wahlberechtigte, aufgeteilt in vier disjunkte Gruppen Ng. Pro Gruppe existieren ganzzahlige Unterstützerzahlen für jeden Kandidaten und U für Unentschlossene. Keine überlappenden Mitgliedschaften, keine mehrfachen Kandidatenstimmen.

Intern werden begrenzte Bindungsgewichte verwendet; **sie sind keine politischen Hürden oder Bürgerstimmen**. Die öffentliche Darstellung zeigt die daraus eindeutig berechneten tatsächlichen Personenbestände. Vorschlag bei drei NPC:

| Kandidat / Restpool | Bürgerhaushalte | Handwerk | See-/Hafenleute | Kaufleute/Ratsfamilien |
|---|---:|---:|---:|---:|
| Kaufmann aus Ratsfamilie |130 |170 |180 |320 |
| Stadtversorger |270 |200 |240 |130 |
| Gastgeber/Vermittler |200 |230 |180 |150 |
| Unentschlossene |400 |400 |400 |400 |
| Spieler vor erster bestätigter Leistung |0 |0 |0 |0 |
| **Summe je Gruppe** |**1.000** |**1.000** |**1.000** |**1.000** |

Das ist eine **offengelegte Ausgangsverteilung**, keine erfundene historische Wahl. Sie erzeugt nur eine erste Partition der bereits vorhandenen E Personen. Kandidaten erhalten nachher keine versteckten Zusatzstimmen. Bei2–6 Kandidaten muss eine festgelegte Zahl von 600 NPC-Basisgewichten je Gruppe auf die jeweiligen Personen verteilt werden; weitere Kandidaten dürfen den Ausgangs-NPC-Pool nicht vergrößern. Der Spieler startet mit 0 statt kostenloser Bindung. Rechtmäßig gespeicherte neue frühere Wahlaktivität wirkt weiter, solange ihre Dauer nicht abgelaufen ist.

Beispielpersonen für Lübeck: **Hinrich Holt** (Kaufmann/Ratsfamilie), **Grete Voss** (verlässliche Versorgerin), **Cord Witte** (Gastgeber/Vermittler). Namen/biografische Rollen sind Spielweltvorschläge, keine historischen Behauptungen. Für jede Stadt eigene stabile Personen-IDs und zur Stadt passende Namen; bestehende Ratsgruppen liefern Milieu, ersetzen aber keine individuellen Konten. „Ratsfamilie“ ist hier ein Charakterhintergrund, **kein wieder eingeführter aktiver Rang Ratsherr**.

### Berechnung

Für Kandidat i und Gruppe g:

`A(i,g)=max(0,Basis(i,g)+Σ begrenztePositiveKategorie(i,g)−Σ begrenzteNegativeUrsache(i,g))`.

Der unentschlossene Grundpool behält Gewicht400. Je positiver Kategorie wird die Summe aller noch wirksamen Belege auf das Maximum der Handlungsmatrix gekappt. Negative Belege sind ebenfalls je Ursache/Zeitraum begrenzt. Kein unbegrenztes Aufstapeln von Feste- oder Spendenbelegen.

Vor Verteilung wird jeder einzelne Ereignisbeitrag mit seiner Restdauer berechnet: `floor(Maximum×Resttage/Dauer)`, danach Kategoriebegrenzung. Für Spenden zuerst **gesamtes Gold im gemeinsamen Abschnitt** und dann sättigende Gesamtwirkung berechnen; nicht jede Miniaktion einzeln aufrunden. Alle Gewichte und Zwischenprodukte brauchen sichere Ganzzahlen/BigInt bei der späteren JS-Implementierung.

Stimmenaufteilung je Gruppe:

1. Gesamtgewicht T aller Kandidaten **plus Unentschlossene** bilden; T ist wegen des Restpools positiv.
2. `v(i)=floor(Ng×A(i)/T)`, ebenso für U.
3. Die noch fehlenden Personen nach absteigendem Divisionsrest verteilen. Gleicher Rest wird durch feste gespeicherte Priorität entschieden. Diese Reihenfolge kann je Wahl aus eigenem gespeicherten Politik-Seed abgeleitet werden; sie darf nicht beim Rendern wechseln.
4. Gruppenergebnisse addieren. Stets `Σv+U=E`; bei Wahl `Nichtwähler=U`, `Beteiligung=E−U`.

Dies ist ein aggregierter Zensus: keine Simulation tausender einzelner Menschen, aber eindeutige disjunkte Personenzahlen. Im Übergangsprotokoll werden Differenzen der alten und neuen Verteilung mit ihren veröffentlichten Ursachen angegeben. Bei mehreren gleichzeitigen Ursachen ist die **Gesamtdifferenz** exakt; eine künstlich eindeutige Kausalität jeder einzelnen Stimme wird nicht behauptet. Details können in kanonischer Ereignisreihenfolge erklärt werden, ohne Zwischenresultate nochmals zu buchen.

## 2. Konkretes Übertragungsbeispiel

| Pool | Vorher | Nachher | Veränderung |
|---|---:|---:|---:|
| Spieler |180 |300 |+120 |
| Konkurrent A |320 |273 |−47 |
| Konkurrent B |300 |256 |−44 |
| Unentschlossene |200 |171 |−29 |
| **Wahlberechtigte** |**1.000** |**1.000** |**0** |

Rechengewichte vorher1.260/2.240/2.100/1.400, nachher2.460/2.240/2.100/1.400; Ganzzahlverfahren ergibt genau die Tabelle. Es ist eine **Illustration für Bindungsänderung**, kein Versprechen „jedes Fest gibt genau 120“. Sind kaum Wechselwähler vorhanden, muss ein Vorteil aus bestehenden Konkurrentenbindungen kommen oder geringer ausfallen; niemals zusätzliche Personen erzeugen.

### Gleichzeitige Aktionen und Tage ohne Spieler

Alle für Tag d bereits rechtswirksam angenommenen Ereignisse werden als Menge nach ID verarbeitet, nicht nach Klickreihenfolge ausgezählt. Erst vollständige Kategorie-/Verfallsrechnung, dann eine Stimmenverteilung. Sechs Permutationen eines kleinen Drei-Aktionssatzes lieferten im Rechentest denselben Endbestand. Das beweist nur diese arithmetische Reihenfolgeeigenschaft, **noch keine implementierte Mehrfenster- oder Reservierungslogik**.

Bei einem knappen einmaligen öffentlichen Auftrag darf die Annahme fachlich „wer zuerst verbindlich reserviert“ sein. Das ist eine sichtbare Ressourcenkonkurrenz und kann die **Menge angenommener Ereignisse** ändern; hierfür keine falsche Reihenfolgenneutralität behaupten. Reservierung/Kosten/ID müssen atomar feststehen, Ablehnung muss Geld und Wirkung unverändert lassen. Ein späteres Duplikat darf weder dieselbe Ware noch dieselben Stimmen nochmals verbrauchen.

Während der Spieler reist oder schweigt, verstreichen Bindungsdauern und echte NPC-Termine. Ohne Ursache keine zufälligen wandernden Stimmen. Bei identischem Startzustand und denselben bestätigten Eingaben muss das Ergebnis gleich sein; beliebig unterschiedliche Handlungen sind keine identischen Seedszenarien.

## 3. Begrenzte, nachhaltige Rivalenfinanzierung

Jeder NPC besitzt eine stabile ID, Stadt, Typ/Stärken, sichtbare Ausgangsbindung, Geldkonto, begrenztes politisches Jahresbudget, buchbares privates Geschäftseinkommen, Termine, zugesagte Projekte und tatsächliche Aktionen. Keine Konkurrenzflotte oder zweite komplette Handels-KI erforderlich.

Für E Stadtwähler vorgeschlagen:

- Jährlicher Ausgabenrahmen `B=1.200+ceil(E/5)` G, **einschließlich** politischer Aktivität außerhalb der90 Kampagnentage.
- Anfängliches liquides Vermögen `2B`; Geld darf nie negativ werden. Liquide Rücklage höchstens `3B`; Kosten sofort reservieren/abbuchen.
- Öffentliches Jahresgeschäftseinkommen höchstens `900+ceil(E/10)` G und höchstens 3% des dokumentierten produktiven Privatkapitals. Typkapital z.B.40.000/24.000/30.000 G für Kaufmann/Versorger/Gastgeber. Gutschrift genau einmal je vollendetem Geschäftsjahr, nur bis zur Rücklagengrenze.
- Keine Kreditaufnahme, kostenlose Auffüllung beim Zurückliegen, automatische Reaktion mit frischem Gold oder neues Budget durch einen Reload. Privatkapital ist keine Bürgermeister-Voraussetzung.
- Auch ein Hansewahlkampf belastet dasselbe Konto und den tatsächlich freien Rahmen. Kein eigener Geldpool je besuchter Stadt. Sichtbare Zahlungen von Unterstützern wären später echte belastete Gegenkonten, keine versteckten Sponsorprämien.

Das begrenzte Geschäftseinkommen ist eine **bewusste Modellabstraktion einer privaten NPC-Wirtschaft**, nicht im heutigen Spiel vorhandener realer Handel. Es ist zeitlich/kapitalmäßig begrenzt und öffentlich, aber keine geschlossene Gesamtrechnung aller Weltmärkte. Diese Einnahmequelle braucht ausdrückliche Entscheidung; alternativ endliche Anfangsrücklage ohne Einkommen wäre einfacher, macht Rivalen nach mehreren Wahljahren zunehmend passiv. Keine dieser Einnahmen wurde implementiert.

| Beispiel | E | Jahresrahmen B | Liquider Start | Festkosten | Nach einem Fest noch im Jahresrahmen |
|---|---:|---:|---:|---:|---:|
| Venlo |1.000 |1.400 |2.800 |800 |600 |
| Lübeck |5.000 |2.200 |4.400 |1.600 |600 |
| Brügge |8.000 |2.800 |5.600 |2.200 |600 |

Der Kaufmann in Lübeck kann bei 40.000 G Produktivkapital höchstens 1.200 G Jahresgeschäftseinkommen erhalten (`min(1.400,1.200)`), sofern unter dem Rücklagendeckel; der Versorger bei 24.000 Kapital höchstens 720 G. Einnahmen und Reservierungsstände werden im Kandidatenprotokoll mit genauem Betrag ausgewiesen, nicht als Vermutung über eine historische Handelsstrategie.

Alle Kandidaten, einschließlich Spieler, verwenden dieselben Aktionskosten, Bedarfsreservierungen und Wirkungskappen. NPC können einen öffentlichen Beschaffungsdienst bezahlen; Spieler können dieselbe Finanzierung wählen oder später ausdrücklich freigegebene echte Fracht liefern. Ein NPC darf kein kostenloses „6 Fass geliefert“-Ereignis erfinden. Liefer-/Projektfrist läuft für beide, Stimmen erst bei nachgewiesener Leistung. Private Lieferverträge müssen in der Oberfläche als finanzierte Beschaffung statt eigener Schifffahrt bezeichnet sein.

## 4. Einfaches aktives Verhalten

Während der Kampagne ein geplanter Entscheidungszeitpunkt je 15 Tage/Kandidat, sonst je 30 Tage. Termine aus stabilem Politik-Seed/ID versetzt, nicht durch Öffnen erzeugt. In einem reinen Kommunalwahljahr höchstens 15 Entscheidungen je Kandidat:9 außerhalb und 6 innerhalb der Kampagne. Im Jahr einer120-tägigen Hansekampagne höchstens 16 gemeinsame Entscheidungstermine (8 innerhalb,8 außerhalb); keine zweite parallele Gratis-Aktionsuhr für denselben Kandidaten. Bei drei Rivalen in elf Städten also höchstens 495 kurze Entscheidungen pro360 simulierte Tage, meist nur „weiter sparen“ oder eine bezahlte Aktion; keine Echtzeitintervalle.

Entscheidungsreihenfolge:

1. Bestehende Zusagen und fällige Kosten/Fristen sichern; fehlende Mittel führen zu dokumentierter abgesagter/neuerlich nicht gestarteter Aktion, nie zu Gratiswirkung.
2. Nur veröffentlichte lokale Bedarfe, eigene Interessen/Budgets, bekannte Leistungsurkunden und den abgeschlossenen Vortagsstand betrachten. Keine versteckten Fernmarktpreise oder Kenntnis zukünftiger Spielerentscheidungen.
3. Zulässige, bezahlbare Aktionen nach erwarteter begrenzter Gruppenwirkung, Charaktervorliebe und Kosten ordnen; bei Gleichstand feste gespeicherte Priorität. Dokumentierter Entscheidungsgrund, z.B.„Versorgungsbedarf offen, Restbudget340 G“.
4. Aktion ausdrücklich reservieren, Leistung/Frist verfolgen und erst dann Wirkung abrechnen. Ein eigenes Fest braucht Vorlauf, Spende wird bezahlt, Ratsvermittlung tatsächlich fristgerecht bearbeitet. Wiederholungskappen für NPC genauso wie Spieler.
5. Kein sofortiges Spiegeln jeder Spielerhandlung: Typ bevorzugt sein Gebiet, aber überprüft beim nächsten eigenen Termin einen wirklichen Rückstand oder ungedeckten Bedarf. Keine künstliche Gummibandregel.

Typen: Ratsfamilien-Kaufmann bevorzugt verlässliche Vereinbarungen/öffentliche Infrastruktur; Versorger offene Lebensmittel-/Materialbedarfe; Gastgeber sorgfältig geplante Feste/soziale Projekte. Ein sparsamer vierter Typ könnte später über kleine verlässliche Leistungen konkurrieren; nicht nötig für den ersten Umfang.

**Kein Spielerhandeln** heißt nicht „Spieler gewinnt durch bloßes Warten“: seine aktive Bindung bleibt0/abgelaufen, während NPC Grundunterstützung behalten und aus ihren endlichen Möglichkeiten arbeiten. Ein reicher untätiger Spieler gewinnt keine Stimme aus seinem Konto. Ob ein normal engagierter Anfänger tatsächlich gewinnen kann, ist eine spätere Balance-/Menschenprüfung, keine hier behauptete Garantie.

## 5. Spenden, Lieferungen und früher nachgewiesene Exploits

Spenden sammeln je Stadt/Kandidat/festem30-Tage-Kalenderabschnitt tatsächliches Gold G. Für jede Gruppe mit Höchstwert C:

`Gewicht=C×G/(G+H)`, ganzzahlig abgerundet, `H=300×E/1.000` mit rationaler Ganzzahlrechnung.

4×50 und 1×200 im gleichen Abschnitt ergeben identischen Endwert. Der Beginn eines neuen Abschnitts erzeugt keine Freispiele: je Kategorie bleibt die Summe aller noch wirksamen Spendenbelege auf C begrenzt. Als gemeinsamer Wirkursprung gilt der **öffentlich bekannte Abschnittsanfang**, damit ein erster1-G-Klick nicht den Verfallszeitpunkt des gesamten Topfs bestimmt. Heutige50-/200-G-Spendenpreise bleiben maßgeblich; ein1-G-Teilchen ist nur ein arithmetischer Missbrauchstest, kein neuer Angebotsknopf. Unterschiedlich datierte Abschnitte dürfen wegen echten Zeitverfalls unterschiedlich wirken.

Öffentliche Bedürfnisse sind endlich, mit echter Abnahme und einmaliger Erfüllungs-ID. Teilmengen kumulieren auf denselben Bedarf, bringen keine Einzelstimmen. Umlagern/Verkaufen/Wiederkaufen auf dem freien Markt erfüllt ihn nicht. Bei Vertrag/Versprechen/Dienst aus derselben Leistung eine gemeinsame Ursprungs-ID; keine doppelte Prämie unter zwei Kategorien. Pflichtverletzungen werden ebenfalls genau einmal registriert.

Die vorherigen2a.2/3-Gegenfälle werden später als Regressionsfixtures wiederverwendet:44.610→45.595-Buchwert, gemischter+2.056-G-Kreis,90/9×10/90×1 und Aufstieg zwischen neutralen Handelsaktionen. **Im neuen Entwurf hat reiner Handel keinen Wahlereignispfad**, daher keinen direkten Stimmen-/Amtsauslöser. Dass eine zukünftige Implementierung keinen versehentlichen alten Pfad offenlässt, ist noch zu prüfen.

## 6. Technische Machbarkeit und Grenzen

Vier Gruppen, höchstens 6 Kandidaten plus U und elf Städte bedeuten höchstens 308 aktive Ganzzahlzellen. NPC halten kleine Profile und fällige Termine; keine Wähler-Einzelobjekte, Hintergrundflotten oder dauernden Browser-Timer. Politische Seed-/Prioritätsdaten werden einmal erzeugt und gespeichert; Wirtschaftszufallsfolge nicht anzapfen. Konkret empfohlen: SHA256 einer kanonisch serialisierten, fest dokumentierten Identitätsliste `[Regelkennung, Aktivierungstag, Spielerkennung, Name, bekannterStarthafenOderNull, ersteSchiffsIdOderNull]`. Keine Marktpreise, Goldwerte, `Date.now()` oder neuen `Math.random()`-Aufrufe verwenden. Kandidatentermine/Rundungsprioritäten über `SHA256(seed|electionId|candidateId|purpose)` ableiten; IDs und einmal festgelegte Prioritätslisten speichern. Gleiches vollständiges Ausgangssnapshot reproduziert damit dieselben Prioritäten. Das ist ein Reproduktionsentwurf, kein kryptografischer Schutz vor bearbeiteten Offline-Spielständen.

Unterstützerzahlen können aus demselben versionierten Zustand hergeleitet und gegen gespeicherte Resultate geprüft werden. Ansichten dürfen keine Nachberechnung mit Zustandsänderung buchen. Aktive Effekte/Spendentöpfe begrenzt halten, abgeschlossene alte Perioden gegen Wiederannahme sperren. Alte Quittungen/Archive nicht still löschen. Eine kompakte politische Erweiterung im Bereich einiger zig bis weniger hundert KB ist ein **Entwurfsziel**, kein gemessener Speicher-/Safari-Nachweis; Wahlhistorie und vorhandene V13-Archive können größer werden.

Die Konzeptprüfung bestätigt40 ganzzahlige Verteilungen, ein120-Stimmen-Beispiel, sechs Aktionspermutationen, Spendenaggregation und elf Budgetrechnungen. Keine Rivalen-KI oder Wahlengine ausgeführt. Seed-/Reload-/Duplikat-/Quota-/Gerätebehauptungen bleiben zukünftige Abnahmeziele.
