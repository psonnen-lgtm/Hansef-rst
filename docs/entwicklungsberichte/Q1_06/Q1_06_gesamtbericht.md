# Q1.06 – Politische Karriere und gesellschaftliche Anerkennung

29.10.2026 · **Konzept- und Prüfauftrag, keine produktive Umsetzung.**

**Empfehlung:** Kaufmann → bewusster Gildenbeitritt → Ratsherr aus zwei örtlichen Tatarten → Bürgermeister mit belegter Mehrheit und eigenen Entscheidungen → Eldermann aus Amtsbewährung und hanseweiter Anerkennung. Fernkaufmann als freiwilligen Wirtschaftstitel daneben führen. Unterstützung nach **Modell A normieren**, vorhandene Urkunden-/Amts-/Vertragsstruktur wiederverwenden.

Die wichtigsten offenen Entscheidungen betreffen nicht weitere Goldschwellen, sondern tatsächliche Aufgabenvielfalt, Kalender-/Anlassregeln, gesellschaftliche Rückmeldung und sichere V13-Übernahme. **Eine abwechslungsreiche 90-Stunden-Karriere ist mit den heutigen zwei örtlichen Standardtypen nicht belegt.** Keine Wartezeit oder Pflichtwiederholung als Ersatz empfehlen.

## 1. Tatsächlicher Stand und Quellen

GitHub vor Beginn geprüft, dann frisch gefetcht: `development/v04-foundation` **`02ee6b8fc1507ad078b6b596c333e50d91eeea64`**, main **`c1280228951d581c7b3131279b8ff164a8e36dfa`**. Q1.05 **`de4ae6b04268edc4292dfa07d37ca7680ebef4f8`**, Q1.03 **`15df03c02d6c3af3fdb9c8f24052f038885c2bb1`**, Q1.02 **`8b20432506940ef1d33bf7af7f162884eec63c01`**. Eigener Branch **`audit/q1-06-political-career`**, keine fremden Auditbranches hineingemergt.

Produkt unverändert **0.8d.1b/V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA 256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.13 commitfeste Grundlagenartefakte aus Q1.01–Q1.05 und R1.11 mit Blob/SHA/Größe gelesen; 27 relevante Funktionen inventarisiert. [Quellen-/Funktionsnachweis](../../../tests/analysis/q1_06/results/inspection.json), [Prüfplan](../../../tests/analysis/q1_06/plan.json).

[Q1.01](https://github.com/psonnen-lgtm/Hansef-rst/tree/d4cf42868a5347ec6e660f52faafb8132df5b209/docs/entwicklungsberichte/Q1_01), [Q1.02](https://github.com/psonnen-lgtm/Hansef-rst/tree/8b20432506940ef1d33bf7af7f162884eec63c01/docs/entwicklungsberichte/Q1_02), [Q1.03](https://github.com/psonnen-lgtm/Hansef-rst/tree/15df03c02d6c3af3fdb9c8f24052f038885c2bb1/docs/entwicklungsberichte/Q1_03), [Q1.04](https://github.com/psonnen-lgtm/Hansef-rst/tree/e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36/docs/entwicklungsberichte/Q1_04), [Q1.05](https://github.com/psonnen-lgtm/Hansef-rst/tree/de4ae6b04268edc4292dfa07d37ca7680ebef4f8/docs/entwicklungsberichte/Q1_05), [R1.11-Zielkonzept](https://github.com/psonnen-lgtm/Hansef-rst/blob/ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7/docs/entwicklungsberichte/R1_11/R1_11_90_stunden_karrierekonzept.md). Das aktuelle Produkt nicht mit unintegrierten P1-Prototypen oder alten Wirtschaftstests verwechseln.

## 2. Befund, Beschluss, Empfehlung und ungetestete Zukunft

|Status|Aussage|
|---|---|
|Bestehende Implementierung|Zwei örtliche Typen Versorgung/Vereinbarung, deterministische Wahl, Amtsbelege, Fürsprecher, Siegel, Hansevertrag. Globaler Handels-/Spendenruf und Vermögenshürden noch aktiv. Kein Gildenstatus oder Gildenhaus-Aktionspfad|
|Verbindlicher Q1.06-Beschluss|Bewusster hanseweiter Eintritt ohne Aufnahmeaufgaben/weitere Vermögensschranke, Gilde Voraussetzung neuer politischer Aufstiege, keine politischen Handels-/Ankunftspunkte, Ämter ohne feste Vermögensschwellen, Ratsherr ohne Finanzbonus, Bestandsschutz|
|Vorläufiger Parameter|12.500 Gold Aufnahmegebühr ausdrücklich als Balancingwert, **nicht endgültig beschlossen**. Q1.05-Empfehlung jetzt so in die Konzeption übernommen, kein Preis aktiviert|
|Neue Empfehlung|Fernkaufmann optional, Ratsherr aus zwei örtlichen Arten, Modell A, wenige Amtsentscheidungen, M2/Altzugang. Alles benötigt Nutzerentscheidung|
|Noch nicht geprüft|Neue Karriere spielbar, neue Regeln wirtschaftlich/spielerisch balanciert, M2 sicher migrierbar, Gerätebedienung, aktive 90 Stunden. Kein entsprechender Test als bestanden ausgegeben|

## 3. Die zwölf Abschlussfragen

1. **Wie verläuft die Karriere?** Politische Linie Gilde → Ratsherr → Bürgermeister → Eldermann; freiwilliger Fernkaufmann als Wirtschaftsehre, nicht als politischer Pflichtvorgänger. Bestehende Struktur weiterentwickeln, keine zweite Karriere-Engine.
2. **Welche Voraussetzungen?** Gilde vorläufig 12.500 und bewusster Antrag, sonst keine wirtschaftliche Hürde. Ratsherr: Gilde/Altzugang, eine Versorgung und eine Vereinbarung derselben persönlich gewählten Ratsstadt. Bürgermeister: Ratsherr, örtliche beide Arten, persönliche Kandidatur, belegte Mehrheit und bestehende Mietfreiheit; kein Gold-/Rufminimum. Eldermann: bewährtes Amt, Heimatmandat plus drei auswärtige Fürsprecher, zwei Handelsräume, echter Hansevertrag. Kalender-/Anlassdetails bleiben ausdrücklich offen.
3. **Was wiederverwenden?** Fremdherkunftslose, Ratsbriefe/IDs/Fristen, `witnessed`, Leistungsbuch, abgeleitete Zusagen, Wahlgründe, `office/firstReceipt/terms`, Siegelreferenzen und `league/visited`. Die 17-zeilige Bestands- und Technikmatrix erläutert Ablauf, Nutzen, Schwächen, Anpassung, Wiederverwendung und Savefolge je Element.
4. **Wie keine eintönige Liste?** Lieferung und persönlicher Vertrag bleiben Kern; wenige begründete Prioritäts-/Vermittlungsentscheidungen ergänzen. Nicht höhere Mengen, zusätzliche Siegel oder längere Abschnitte als Spielzeitersatz. Ohne neue Anlassdefinition bleibt Vielfalt ungesichert.
5. **Welche Bürgermeisterfunktionen?** Zuerst begrenzte Versorgungspriorität und Ratsvermittlung mit echter Wahl, in vorhandenen Rathausbriefen. Informationshilfe ergänzend. Öffentliche Budgets, akute Krisen und Hilfsprojekte als spätere eigene Optionen; kein Gratisgeld/Steuer-/Rabattrecht.
6. **Was tut der Eldermann?** Bewährte örtliche Führung und echte überregionale Kooperation zusammenführen; Vertrag um eine begründete gemeinsame Interessenentscheidung im vorhandenen Reiseablauf ergänzen. Später freiwillige Hilfe/Vermittlung, keine zusätzliche Pflicht-Rangtreppe oder garantierte sichere Handelsroute.
7. **Welches Unterstützungsmodell?** **A: 100×örtlicher Beitrag/75**, alte Stadtziele behalten. Nur ersatzlos streichen sperrt Lübeck 80, Hamburg 76 und Brügge 78. B proportional gesenkte Ziele ist exakt ergebnisgleich; C gewichtet echte lokale Komponenten anders. Alle elf Städte rechnerisch erreichbar, keine gespielte Wahl behauptet.
8. **Wie Wirtschaft/Ansehen trennen?** Handel schafft Geld und finanziert echte Leistungen, keine politischen Punkte. Allgemeiner Alt-Mischruf bleibt sichtbar, aber politisch inaktiv. Gesellschaftliche Dankesbriefe statt neuer kaufbarer XP-Währung; Spenden kein politischer Erwerbsweg. Gewöhnlicher Lieferauftrag ist wirtschaftlich, ausdrücklicher Ratsbrief politisch.
9. **Welche Risiken?** Q-001-Kreditsicherheiten und Q-003-Personenort bleiben offen; weder W1/W2 noch Ortsguard hier umgesetzt. Wiederholbare Anerkennung, Doppel-ID, Belegvermischung, Voramtsurkunden, Kalenderfarmen, UI-/Funktionsunterschied bei erneutem Hansevertrag und Mehrfensterspeicherung beachten. Keine große Rivalen-KI voraussetzen.
10. **Wie V13 schützen?** M2 mit ausdrücklich neuer Politik-Unterrevision empfehlen, alte Titel/Ämter/Belege/Wirtschaftsdaten bewahren. Altzugang getrennt von bezahlter Mitgliedschaft. Personenhistorie nicht erfinden, bekannte Altfristen und laufende Bewährung schützen. Schema/Schlüssel/Fristschonung noch entscheiden; keine Migration ausgeführt.
11. **Was muss der Nutzer entscheiden?** Fernkaufmann F2/F1 und Kandidatenwerte; Ratsherr-Nachweis/Ortsbindung; A/B/C; Kalender-/Anlass-/Zusagenregeln und Wiederantrag; erste Amts-/Vertragsentscheidungen; Umgang mit gesellschaftlichem Ruf; M2/Altzugang/Personenanker/Altfristen/Fernfahrten; späterer Human-Test. Die 48-zeilige Matrix trennt Beschlossenes, Vorläufiges, Empfehlungen, offene Fragen und zurückgestellte Erweiterungen.
12. **Wo gesichert?** [audit/q1-06-political-career](https://github.com/psonnen-lgtm/Hansef-rst/tree/audit/q1-06-political-career), [Berichte](https://github.com/psonnen-lgtm/Hansef-rst/tree/audit/q1-06-political-career/docs/entwicklungsberichte/Q1_06), [Analysebelege](https://github.com/psonnen-lgtm/Hansef-rst/tree/audit/q1-06-political-career/tests/analysis/q1_06), [Vergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...audit/q1-06-political-career). Commits und tatsächlicher GitHub-Rücklesebeleg werden unten fortgeschrieben. Kein Merge und keine Programmierung des Spiels.

## 4. Was die Modell- und Zeitrechnung tatsächlich belegt

819 konsistente Beleganzahl-/Abschnittskombinationen ×11 Städte ×3 Modelle = **27.027 kleine Bruchvergleiche**, keine Spielverläufe. Unter unveränderten heutigen Dienstsperren machen drei Versorgungen/drei Vereinbarungen aus drei Abschnitten jede Stadt erreichbar: A 86,67/100, B 65/75, C 90/100. A/B für alle Kombinationen gleich, A/C in 81 Stadt-/Belegkombinationen verschieden. Das ist kein unabhängiger Reise-/Frist-/Markt-/Wahlnachweis.

33 statische Routenrechnungen aus vorhandener Distanzmatrix/Partnerrotation, Kogge bei 100 Zustand: erste Ratsrunde Lübeck 4, Bergen 20, Nowgorod 30 Welttage und jeweils 12 Gold Hafengebühr. Keine Stürme, Handel, Zinsen, Warenverfügbarkeit, spätere Verzögerungen oder Menschzeit enthalten. [Routentabelle](../../../tests/analysis/q1_06/results/route-arithmetic.csv).

**Rechnerische Erreichbarkeit ist nicht 90-Stunden-Spielspaß.** R1.11-Budget 8+17+20+20+25 bleibt Hypothese. Gilden-/Handelstage aus Q1.05 werden nicht in Stunden übersetzt. Menschlicher Testplan H1/H2 ist Vorschlag, nicht ausgeführt oder begonnen.

## 5. Tatsächliche Prüfungen und ausdrückliche Grenzen

|Veröffentlichter Prüfcode vor Ausführung|Befehl/Ergebnis|
|---|---|
|`d5015f25810df653edac5b29a2bdfa07a478e819`|`python tests/analysis/q1_06/inspect.py`: 13 Grundlagen, 27 Funktionsorte, 819 Kombinationen/27.027 Modellvergleiche; Assertions bestanden|
|`50e48c7dfc8b491e6a66a9a474533e55e1981572`|Lesenden Prüfer nach Entfernung einer nicht aussagekräftigen redundanten Assertion nochmals ausgeführt; gleiche Zahlen/Ergebnisse. `python tests/analysis/q1_06/routes.py`: 33 Routen, symmetrische positive Distanzmatrix; bestanden|
|Abschlussprüfung separat vor Ausführung gesichert|Dateiumfang, Altdateien, Quellenhashes, acht Lieferdateien, 48 Matrixzeilen, 42 **geplante** Regressionsfälle, CSV/Links und Git-Diff; Ergebnis wird separat verlinkt|

Die zweite Toolantwort meldete einen kurzzeitigen Transportabbruch. Danach vorhandene Abschlusslogs und Dateien gelesen: beide Skripte erfolgreich abgeschlossen, **keine blinde Wiederholung**. Vor dem zweiten Sicherungscommit drei überzählige Leerzeilen am Dokumentende korrigiert; kein fachlicher Wert geändert.

Historische Tests nur übernommen: Q1.02-Exploitbelege, Q1.04-Gebühren-/Stillstandsbeobachtung, Q1.05-Baselines/Gegenläufe. Kein Spiel-JavaScript ausgeführt, kein Headless-/Browserprozess, keine Wirtschaft oder Karriere neu simuliert. Keine Produkt-, Wirtschafts-, Save-, Migration-, Pages- oder Exploitänderung. Die 42 Fälle in der [Testplanung](../../../tests/analysis/q1_06/planned-regressions.csv) sind sämtlich **geplant/nicht ausgeführt**. Allgemeine AGENTS-Großserie durch diesen ausdrücklichen Konzeptauftrag nicht anwendbar.

## 6. Lieferdateien

1. Dieser Gesamtbericht.
2. [Karrieremodell und vollständige Bestands-/Technikmatrix](Q1_06_karrieremodell.md).
3. [Politische Taten, Gesellschaft und Weltgebäude](Q1_06_politische_taten.md).
4. [Bürgermeister-/Eldermannfunktionen und Bewertung aller sieben Themen](Q1_06_buergermeister_und_eldermann.md).
5. [Drei Unterstützungsmodelle, alle Stadtziele und Beispiele](Q1_06_unterstuetzungsmodelle.md).
6. [Spielspaß, 90-Stunden-Ziel und späteres Human-Testkonzept](Q1_06_spielspass_und_90_stunden.md).
7. [V13-Bestandsschutz und Exploitrisiken](Q1_06_bestandsschutz_und_exploits.md).
8. [Entscheidungsmatrix CSV](Q1_06_entscheidungsmatrix.csv): 48 Positionen. Statusverteilung: BESCHLOSSEN 9, EMPFEHLUNG 22, OFFEN 11, VORLAEUFIG 2, ZURUECKGESTELLT 4. Keine Empfehlung als bereits produktiv umgesetzt markiert.

## 7. Bisherige Sicherungsstände

- **`d5015f25810df653edac5b29a2bdfa07a478e819`**: Ausgangslage und lesende Modellprüfung vor erster Ausführung.
- **`50e48c7dfc8b491e6a66a9a474533e55e1981572`**: Bestands-/Karriere-/Tatvorschläge und erfolgreiche Modellrechnung; Routenprüfer vor seiner Ausführung.
- Vollständige acht Lieferdateien, Abschlusskontrolle und GitHub-Rücklesen folgen im letzten Sicherungsabschnitt. Keine selbstreferenzielle Testcommit-ID erfinden.

Die Untersuchung endet nach Veröffentlichung und Rücklesen. Keine Umsetzung, Zusammenführung oder automatische Folgephase.

## Lokale Abschlusskontrolle

Alle3.232 vorbestehenden Dateien gegen die tatsächliche Entwicklungsbasis geprüft: ausschließlich der Berichtsindex wurde ergänzt, alle übrigen Altdateien einschließlich Spielcode/Simulationen/Ergebnisse byteidentisch. Acht Pflichtdateien,48 Entscheidungsposten,42 ausdrücklich geplante Regressionen,33 Routen und Quellhashes geprüft. Die81 A/C-Abweichungen sind reine Zielschwellenentscheide, nicht81 tatsächlich ausgeführte oder notwendig zulässige Wahlen. [Prüfnachweis](../../../tests/analysis/q1_06/results/verification.json).

Vollständiger Berichtstand mit acht Lieferdateien: `bd66a449dfd67fb3ec53a861f18e011b5d08b259`. Die anschließende Endredaktion trennt Dezimalkommas/Begriffsnamen und ergänzt die Verweisnavigation; keine Formel, Quelldatei oder fachliche Empfehlung geändert. Der finale veröffentlichte Umfang wird anschließend unabhängig von GitHub zurückgelesen.
