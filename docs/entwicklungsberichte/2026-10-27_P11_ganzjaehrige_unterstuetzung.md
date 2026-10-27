# Phase P1.1 – Ganzjährige Bürgerunterstützung

27.10.2026 · Europe/Berlin · **Regelentwurf und begrenzte Mathematik, keine produktive Implementierung.**

GitHub vor Beginn geprüft: `development/v04-foundation` **`808d3a981093d99b3b57be94bc96184191398066`**, Merge #43, entspricht dem Auftrag. Neuer Branch **`analysis/p11-year-round-support`**. Produktive HTML unverändert **0.8d.1b/V13**, letzter Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Erster vor Prüfungen gesicherter Rechenkern: **`edc0bc7cd6c3ab70843b97cc9f24ae86c66d3204`**. Abschließende13 Rechengruppen tatsächlich auf **`699b6d3b101e119e0c67d26115e04f7e4b2d021d`**, zusätzliche negative Wahlterminprobe auf **`12dc5d0dc61f805aa0c6842e3fb9766aabfa0944`**, sechs Mengenbilanzproben endgültiger Abnahme auf **`379a86099abc5e486f5f6f62c3b243c0bd691c2e`**. Alle zugehörigen Programme vorher committet/veröffentlicht; spätere Berichte sind keine selbstreferenziellen Teststände.

**Verbindlich:** ganzjährige Unterstützung ohne besondere Wahlkampfphase, aktive begrenzte Konkurrenz, echte absolute Stimmen, politischer Nutzen auch normaler hilfreicher Lieferungen, Schutz gegen Warenkreise und Bestandsschutz. **Nur Kalibrierungsvorschläge:** alle Gewichte, Schwellen, Fristen, Budgets, Mengen und die konkrete technische Umsetzung. Bestehende P1-Berichte bleiben historische Konzeptstände; widersprechende Vorschläge werden durch diesen neuen Entwurf ersetzt, nicht in alten Dateien korrigiert.

[Ganzjährige Unterstützung](2026-10-27_P11_ganzjaehrige_unterstuetzung.md) · [Stadtversorgung](2026-10-27_P11_stadtversorgung.md) · [Entscheidung und Prüfgrenzen](2026-10-27_P11_entscheidung.md).
## Ergebnis und vorgeschlagener Grundsatz

**Vertrauen wächst durch belegte echte Verdienste; Beliebtheit reagiert schneller und klingt ab. Beides wirkt an allen360 Spieltagen, auch außerhalb einer Kandidatur. Eine Wahl zählt den aktuellen Stand, sie setzt ihn nicht zurück.** Die zusätzliche Wahlterminprobe zeigt zugleich: frei rückkaufbarer Marktbestand ist allein keine sichere Grundlage endgültiger Wahlleistung. Für dauerhafte Versorgungspunkte empfehlen wir deshalb eine begrenzte, tatsächlich endgültige öffentliche Abnahme des anerkannten Lieferanteils; Details und wirtschaftliche Konsequenz im Stadtversorgungsbericht.

Das ist noch keine Integrationsfreigabe. Der ursprüngliche Rücknahme-Beobachter ist an der Wahlgrenze ausdrücklich unzureichend. Die ergänzende Abnahmeregel hat sechs Mengenbilanzen, aber noch keinen gemeinsamen produktiven Handels-/Wahl-/Speicherpfad durchlaufen.

## 1. Geprüfte Grundlagen und Änderungen gegenüber P1

Gelesen wurden alle fünf Berichte: [Wahlordnung](2026-10-27_P1_wahlordnung.md), [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md), [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md), [Bestandsschutz](2026-10-27_P1_bestandsschutz.md), [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md). Ihre Hashgleichheit zur aktuellen Basis ist im [Rechennachweis](../../tests/analysis/phaseP11/results/checks-attempt2.json) festgehalten. Dazu tatsächliche V13-Funktionen für Markt, Zeit, Spenden, Herkunft und Politik; keine Annahme einer bereits eingebauten P1-Wahlordnung.

| P1-Vorschlag | Neuer P1.1-Entwurf |
|---|---|
|90-Tage-Kampagne mit Start an Tag 271 | Entfällt vollständig. Alle Leistungen und Rivalenaktivitäten ganzjährig mit identischen Regeln. |
| Unterschiedliche NPC-Takte innerhalb/außerhalb Wahlkampf | Ein fester ganzjähriger30-Tage-Takt als erster Vorschlag,12 Entscheidungen/Jahr/Kandidat. Kein Sofortspiegeln des Spielers. |
| Normaler Verkauf grundsätzlich0 Wahlwirkung | Ersetzt: echte hilfreiche, bestätigte Nettozufuhr bei natürlicher Knappheit darf auch mit Gewinn Anerkennung bringen. |
| Vorwiegend befristete Aktionsgewichte | Langfristiges Vertrauen plus begrenzte zeitliche Beliebtheit, ohne Reset nach Wahl/Jahreswechsel. |
| Wählerliste erst an Kampagnenbeginn | Zunächst statische P/E aus P1; Fortschreibung höchstens an festem Jahresstichtag, unabhängig von Kandidatur. |
| Anmeldung270/90 Tage Vorlauf | Administrativer Schluss z.B.30 Tage vor regulärer Wahl; weder Beginn der Wirkung noch Wahlkampfbeginn. Für neue Übernahme erreichbaren ersten Termin festlegen. |
|120-Tage-Hansewahlkampf | Ebenfalls kein Sonder-Wirkungszeitraum. Unterstützung/Beziehungen ganzjährig; Versammlungs-/Anmeldefristen nur organisatorisch. |

Unverändert bindend: keine aktiven Fernkaufmann-/Ratsherrstufen, keine Vermögens-/Ansehenshürden für Ämter, wirkliche Konkurrenz/Wahl und Bestandsschutz. P1-Bevölkerungszahlen, vier Gruppen, drei NPC sowie jährliche Bürgermeister-/33-Delegierten-/720-Tage-Hansevorschläge werden nicht neu beschlossen oder kalibriert. Der90-Tage-Wert bei Festwirkung oder Bedürfnisgültigkeit ist **eine Wirk-/Belegfrist, keine neue Wahlkampfphase**.

## 2. Vertrauen und Beliebtheit verständlich trennen

**Vertrauen T:** „Du hast der Stadt verlässlich geholfen.“ Langsam und gedeckelt wachsend, kein automatischer Jahresverfall. Nachgewiesene Dienste, endgültig abgenommene Versorgung und echte wiederholte Hilfe zählen. Alte Belege/Ämter werden nicht gelöscht. Unbestätigte frei rückkaufbare Lieferung zählt im bevorzugten Entwurf noch nicht als endgültige Leistung.

**Beliebtheit P:** „Dein Fest oder deine Hilfe ist gerade im Gespräch.“ Endliche Wirkzeit, nicht unbegrenzt stapelbar. Fest z.B.90 Tage, Spenden-/Versorgungsbegeisterung60 Tage. Neue echte Leistungen können den Eindruck erneuern; ein weiterer Klick auf denselben Beleg nicht.

Ein neuer öffentlicher Pflichtverstoß kann heutige Unterstützung vermindern, ohne eine alte Urkunde oder ein erworbenes Amt rückwirkend zu löschen. Konkrete Strafgewichte aus P1 bleiben spätere Vorschläge, in den hiesigen positiven Zahlenbeispielen nicht kalibriert.

## 3. Konkreter begrenzter Rechenvorschlag

Alle Größen zunächst interne Gewichte, **keine automatisch erzeugten Stimmen**. Gruppe g/Kandidat i:

`W(i,g)=max(0,öffentlicheAusgangsbindung(i,g)+T(i,g)+P(i,g)−belegteAktuelleNachteile(i,g))`.

Vier Gruppen wie P1: Bürgerhaushalte40%, Handwerk25%, See-/Hafenleute20%, Kaufleute/Ratsfamilien15%. Basisverteilung der drei NPC und U aus P1 nur als offengelegter Startvorschlag; keine neuen Gratisstimmen nach Wahlen. Spieler erhält Unterstützung für Leistungen auch wenn er noch kein Kandidat ist. Bis zu seiner ausdrücklichen Anmeldung sind das persönliche Bürgerbindungen, keine amtliche Kandidatenstimme; bei Wahl ohne Kandidatur gehen diese Personen nach klarer Regel in U, nicht heimlich an den Spieler. In den Beispielen ist Kandidatur für die rechnerische Jahresauszählung vorausgesetzt.

Für langfristige gewichtete Leistung M:

`T=floor(600×M/(100+M))`.

Die ersten Verdienste wirken mehr als später hinzugefügte. Immer0≤T<600 bei endlicher M. Gold oder globales Spielansehen stehen **nicht** in dieser Formel; nur bestätigte Leistungen. Kein Mindest-T als Kandidaturhürde.

Vorgeschlagene Leistungseinheiten:

| Quelle | Menge M vor Gruppenfaktor | Faktoren Bürger/Handwerk/See/Kaufleute |
|---|---:|---|
| A: normale bestätigte Versorgung |1 je anerkanntem Fass |1 /½ /½ /¼ |
| B: freiwillig fair bestätigte Versorgung |1½ je anerkanntem Fass |1 /½ /½ /¼ |
| C: endgültige öffentliche Warenspende |2 je anerkanntem Fass |1 /½ /½ /¼ |
| Kirchliche Geldspende |tatsächlich gezahltes Gold/100 |1 /½ /¼ /½ |
| Tatsächlich gehaltener Ratsdienst |20 je eindeutiger Dienstquelle |½ /1 /½ /1½ |
| Fest |keine automatischen langfristigen Einheiten | Nur befristete Begeisterung; weitere nachgewiesene soziale Leistung ggf. eigene Quelle, nicht doppelt dieselbe Feier. |

Eine gemeinsame reale Liefermenge wird **einmal** nach A/B/C klassifiziert, nicht dreimal. Kostenunbekanntheit erfindet keinen Gewinn; real verfügbare Ware kann trotzdem einen nachgewiesenen öffentlichen Nutzen haben.

Kurzfristige Vorschläge: Versorgungsbeleg mit M gleich `120×M/(30+M)` Spitzenbegeisterung, linear über60 Tage auslaufend; Spendentopf `120×Gold/(300+Gold)`, ebenfalls60 Tage; voll tatsächlich durchgeführtes Fest180 Spitze,90 Tage, Gruppenfaktoren1/¾/⅗/½. Je Kategorie Höchstwerte, insgesamt P≤300 pro Gruppe. Gruppenfaktoren aus dem Programm sind ausdrücklich Kalibrierungswerte.

Spenden50/200 G behalten ihre heutigen Preise und Ansehensberechnung. Politisch werden Zahlungen je Stadt/Person/festem30-Tage-Abschnitt kumuliert;4×50=1×200. Gemeinsamer bekannter Zeitursprung des Topfs ist der Abschnittsanfang. Dadurch verschafft ein Mini-Klick weder zusätzlichen Rundungsrest noch neuen Fristbeginn. Fortlaufende echte Spenden können langsam Vertrauen halten/aufbauen, keine unendlichen Stimmen. Die heutige `donationGain`-Formel wird nicht geändert oder als Stimmenquelle verwendet.

Erst vollständige Summen als exakte Brüche aggregieren, danach abrunden. Gleicher Tag, gleicher Gesamtbetrag, gleiche echte Lieferung ⇒ gleicher Wert unabhängig von Einzelklicks. Verschiedene reale Lieferdaten dürfen unterschiedliche **aktuelle Beliebtheit** ergeben; das ist zeitliche Wirkung, kein Klickbonus.

## 4. Endliche Stimmen und regelmäßige Wahlen

Je Gruppe die Wahlberechtigten mit dem größten-Reste-Verfahren auf Kandidaten und U verteilen: ganzzahlige Unterquoten aus W, verbleibende Personen nach Divisionsrest/fester Priorität. `ΣKandidaten+U=E`, immer. Alle fest zugesagten Kandidatenunterstützer geben im Mindestmodell eine Stimme ab; U sind am Wahltag Nichtwähler. Keine zusätzliche zufällige Beteiligung.

Beispieljahr mit E=1.000: Gruppen400/250/200/150. Der feste U-Grundwert400 aus P1 bleibt im Rechenmodell; Ergebnisse sind Personen, nicht Gewichte. Gleichstandprioritäten dauerhaft gespeichert, nicht bei jeder Jahreswahl neu gewürfelt. Eine unveränderte Lage darf sich nicht allein durch eine neue Wahl-ID um einen Rundungswähler verändern.

Jährliche Bürgermeisterwahl am Jahresende bleibt ein Vorschlag. Wahl liest die gültige Verteilung und speichert einen eigenen Ergebnisbeleg; kein Löschen von T, P, Diensthistorie oder Entnahmeschulden. Marktbelege/Reservierungen müssen vor Auszählung atomar abgeschlossen sein. Noch offene unverbindliche Lieferung darf kein endgültiger Wahlnutzen werden. Rathausschauen/Neuladen schließen keine Wahl ab und werfen keine Stimmen neu.

## 5. Kleine Jahresbeispiele mit aktivem Konkurrenten

**Fünf unterschiedliche feste Beleglisten plus deren ausdrückliche Jahresauszählung, keine Wirtschaftsläufe.** Der aktive Versorgerrivale erhält eine bereits als echt angenommene30-Fass-Leistung an Tag 120, zahlt200 G an Tag 180, absolviert einen Dienst240 und ein Fest300. Sein beispielhafter Jahresaufwand ist genau 1.400 G:240 Waren,200 Spende,800 Fest,60 Transport,100 Dienst. Die Annahme gültiger Beschaffung/Bestätigung ist hier ein Input, kein neu ausgeführter NPC-Handel.

| Profil | Spieler-/Rivalenunterstützer Tag 30 | Tag 180 | Tag 270 | Tag 360 |
|---|---:|---:|---:|---:|
| Weitgehend untätig | 0 / 225 | 0 / 304 | 0 / 332 | 0 / 358 |
| Zuverlässig:5×20 Fass und 1 Dienst | 91 / 204 | 174 / 250 | 181 / 270 | 182 / 291 |
| Regelmäßig50 G alle 30 Tage | 6 / 224 | 15 / 300 | 18 / 325 | 22 / 349 |
| Akute Notlage:90 Fass gespendet an Tag 300 | 0 / 225 | 0 / 304 | 0 / 332 | 202 / 283 |
| Engagiert:faire Lieferungen,Spende,Dienst,Fest | 0 / 225 | 188 / 245 | 180 / 271 | 245 / 268 |

Sechster geforderter Blick: **Wahl nach dem ganzen Jahr**, am Beispiel des zuverlässigen Versorgers: Spieler182, Versorgerrivale291, Kaufmann122, Gastgeber133, U272. Summe1.000;728 abgegebene Stimmen/272 Nichtwähler. Der Rivale hätte die höchste absolute Zahl. Kein Amt oder Spielrang wurde im Programm vergeben.

**Wichtiger Kalibrierungsbefund:** Der aktive Rivale liegt in allen fünf gewählten Beispielprofilen am Jahresende vorn; selbst der engagierte Spieler verliert245 zu268. Das ist kein Nachweis, dass man nicht gewinnen kann, aber auch kein Beleg einer guten Anfängerbalance. Nicht nachträglich Zahlen verändert, um einen Sieg vorzuführen. Festtermin, NPC-Grundbindung, Langzeitgewicht und Budget müssen vor einer Einführung überprüft/entschieden werden.

600 G regelmäßige tatsächliche Geldspenden im Jahr ergeben im Beispiel Bürgervertrauen33 und aktuelle Beliebtheit9 an Tag 360. Ohne weitere Spende an Tag 720 bleibt Vertrauen33, Beliebtheit0. Ein früher90-Fass-Beleg behält sein Bürgervertrauen284 über Tag 360/361/720, während die Begeisterung ausläuft. Bei späterer Rücknahme bleibt im **verworfenen Beobachtermodell** die Erinnerung als Ereignis erhalten, aber aktuelle Marktleistungsanerkennung muss berichtigt werden; endgültig abgenommene Ware hat diese Rücknahmemöglichkeit nicht.

Die Zahlenreihen wurden zunächst am frei verfügbaren Marktbeleg gerechnet. Sie zeigen die Unterstützungsarithmetik; sie sind **keine integrierten Prüfergebnisse der danach empfohlenen endgültigen Abnahme**. Für deren Anwendung müssen genau diese Eingabebelege tatsächlich final bestätigt sein.

## 6. Ganzjährig aktive Rivalen

Fester nächster Handlungstermin alle 30 Tage je Person/Stadt, unabhängig von Wahltermin und Spieleraktionen. Auch12 Monate ohne Spieler bleiben Termine wirksam. Charaktere wählen bezahlbare passende Leistungen: Versorger reale Knappheit, Gastgeber angekündigtes Fest, Kaufmann öffentliche Projekte/Zusagen. Kein sofortiges automatisches Nachmachen.

P1-Konto-/Budgetvorschläge bleiben Ausgangspunkt, keine neue Finanzierung beschlossen: `B=1.200+ceil(E/5)` pro ganzem Jahr, Anfangskasse2B, liquide Obergrenze3B, offengelegte begrenzte private Geschäftseinkünfte. Nicht das Jahresbudget mit Rücksetzung von Unterstützung verwechseln: Geldrahmen darf pro Geschäftsjahr erneuert werden, T/Quellen/Entnahmeschulden nicht. Ohne Geld/echte Ware/fristgerechte Leistung keine Wirkung; neue Konkurrenz bekommt keine Geldhilfe, weil der Spieler führt.

Für Versorgung braucht ein NPC dieselben Regeln wie der Spieler: echter finanzierter Bestand bzw. bezahlte nachweisbare Beschaffung, Ursprung und Frachtzeit, dieselbe knappe öffentliche Abnahme. Ein bloßer Ausgabenvermerk darf keine Ware erzeugen. Eine kleine bezahlte Sendung aus **bestehenden Märkten** benötigt keine komplette Konkurrenzflotte oder zweite Marktengine; sie benötigt aber noch eine sicher implementierte Mengen-/Geld-/Transportbuchung. Kein solcher NPC-Einkaufsalgorithmus wurde hier ausgeführt.

## 7. Noch nicht behauptete Sicherheit

Keine1.500er-/2.250er-Reihe, keine vollständige Karriere, keine produktive Wahl, kein Browsernachweis und keine Umrechnung in menschliche Stunden.13 positive Rechengruppen belegen begrenzte Eigenschaften; das Wahltermin-Gegenbeispiel belegt einen **fehlgeschlagenen** allgemeinen Schutz des Beobachters. Erst das vorgeschlagene finale Abnahmeereignis löst die konkrete Mengenrückholbarkeit, bisher nur in sechs Einzelbilanzen. Weitere Grenzen stehen in der Entscheidung.
