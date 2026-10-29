# Q1.03 – Kaufmannsgilde, politische Taten und Bestandsschutz

29.10.2026 Europe/Berlin. **Konzeptionsauftrag abgeschlossen, keine Umsetzung oder Fehlerbehebung. Q-001 und Q-003 sind weiterhin offen.**

Empfohlen wird ein einfacher bewusster Gildenbeitritt im Weltgebäude, danach politische Ränge aus vorhandenen örtlichen Leistungsbelegen. Wirtschaft bleibt Finanzierung statt unmittelbarer Politikpunktquelle. Für Buchwertschutz und V13-Übernahme liegen jeweils zwei technische Varianten vor. Gebühren, Qualifikation, Unterstützungsformel, Bewertungs- und Migrationsdetails bleiben Nutzerentscheidungen.

## Herkunft und geprüfter GitHub-Stand

Frisch geprüfte Entwicklungsbasis **`02ee6b8fc1507ad078b6b596c333e50d91eeea64`**, neuer Branch **`audit/q1-03-guild-politics-design`**. Produkt unverändert **Hansefürst0.8d.1b/V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Remote-Forschungs-/Auditbranches vor Änderungen geprüft; [Referenzinventar](../../../tests/analysis/q1_03/plan.json). Keine fremden Zweige hineingemergt. Verbindliche technische Ausgangsgrundlagen liegen auf eigenen, nicht vollständig integrierten Branches und werden commitfest verlinkt:

- [Q1.01 bei d4cf42868a5347ec6e660f52faafb8132df5b209](https://github.com/psonnen-lgtm/Hansef-rst/tree/d4cf42868a5347ec6e660f52faafb8132df5b209/docs/entwicklungsberichte/Q1_01): Qualitätsaudit/Bestandsmechaniken, Speicher- und Geräteprüfgrenzen.
- [Q1.02 bei 8b20432506940ef1d33bf7af7f162884eec63c01](https://github.com/psonnen-lgtm/Hansef-rst/tree/8b20432506940ef1d33bf7af7f162884eec63c01/docs/entwicklungsberichte/Q1_02): acht historische Handelsfixtures und eine politische Fernvorsprache am bytegleichen Produkt; nicht erneut ausgeführt.
- [R1.11 bei ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7](https://github.com/psonnen-lgtm/Hansef-rst/blob/ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7/docs/entwicklungsberichte/R1_11/R1_11_90_stunden_karrierekonzept.md):90-Stunden-Entwurf, keine gemessene Spielzeit.

Zwölf Grundlagenartefakte sind mit Blob-/SHA256 und Größe im [lesenden Nachweis](../../../tests/analysis/q1_03/inspection.json) gesichert. Frühere P1-Vorschläge zur Abschaffung des Ratsherrn gelten hier nicht: Der neuere Q1.03-Auftrag erhält diesen politischen Rang. Fernkaufmann bleibt offen. Keine ungeprüfte Rückkehr zur fehlgeschlagenen V14-Prototypformel.

## Die acht angeforderten Lieferdateien

1. Dieser Gesamtbericht.
2. [Gildenmodelle](Q1_03_gildenmodelle.md): drei Varianten, Gebäude/Bedienung, Gebühr und atomarer Antrag.
3. [Karrieresystem](Q1_03_karrieresystem.md): Bestand/Anpassung/Save/Abhängigkeiten/Tests je Mechanik, R1.11-Ziel.
4. [Handels- und Buchwertschutz](Q1_03_handels_und_buchwertschutz.md): getrennte Ursachen, zwei Zulassungsbewertungen, legitime Buchhaltung.
5. [Politische Anwesenheit](Q1_03_politische_anwesenheit.md): Person/View/Schiff/Heimat, betroffene Aktionen und Altverträge.
6. [V13-Bestandsschutz](Q1_03_bestandsschutz_v13.md): zwei Übernahmevarianten und Titel-/Amtsschutz.
7. [Testkonzept](Q1_03_testkonzept.md): tatsächliche lesende Prüfung vs55 geplante Regressions-/Abnahmefälle.
8. [Entscheidungsmatrix CSV](Q1_03_entscheidungsmatrix.csv):37 Positionen; beschlossen, technisch empfohlen, offen und nicht implementierungsfreigegeben getrennt.

## Antworten auf die Abschlussfragen

### 1. Welche vorhandenen Mechaniken müssen angepasst werden?

Handels-/Ankunfts-Rufschreibungen, politischer Umgang mit gewöhnlichen Quests/Spenden, `promote`, Unterstützung/Kandidatur/Eldermann, persönliche Rats-/Hansevorsprachen, Kredit-/Vermögenszulassung, Schema/Import und Ratstafeltexte. Keine zweite Karriere: Dienste, Urkunden-IDs, Zusagen, Amtsbewährung, Siegel, Fürsprecher und Vertrag weiterverwenden. Die sechs geforderten Aspekte je Funktion stehen in der Karrierematrix.

### 2. Welches Gildenmodell und warum?

**A: einmaliger bewusster Eintritt im Gildenhaus**, ohne Zusatzpflichtfahrt.500 Gold als erster Testwert empfohlen,250/1.000 verglichen; keinerlei Preisfreigabe.500 wären10% von5.000 Startgold. Keine zusätzliche Vermögensschwelle empfohlen, keine Punkte/Titel, hanseweiter Status statt elf Gebühren als Vorschlag. B erhöht Nachweis-/Exploitaufwand, C die Gefahr vorgeschalteter Routine. Eigenes Weltgebäude, kurzer Dialog statt neuer Hauptmenükaskade.

### 3. Wie werden Wirtschaft und politische Anerkennung getrennt?

Handel schafft Gold und echte finanzielle Gewinne/Verluste. Politik beruht auf eindeutigen gültigen örtlichen Tatbelegen, nicht Verkaufsmarge, Umsatz, Ankunftszahl oder Buchvermögen. Globalen alten Mischruf `s.rep` bewahren, aber nach Empfehlung aus aktiven politischen Voraussetzungen/Unterstützung entkoppeln. Lokale Unterstützung aus bestehendem Leistungsbuch ableiten, keine zusätzliche Stadt-XP-Währung.

**Abhängigkeit:** Nur Wirtschaft10 und Globalruf15 zu löschen lässt höchstens75 Punkte; Lübecks Ziel80 wäre unmöglich. Normierung oder neue Stadtziele entscheiden. Beispiel `100×lokal/75` ist möglich, erleichtert manche Wahlen und ist nicht balanceneutral/freigegeben. Gewöhnliche Questprämie bleibt Geldgeschäft; nur ein gültiger politischer Brief ist politischer Nachweis. Gesellschaftliche Anerkennung/Spenden nicht als direkte Gold→Stimmen-Umrechnung behandeln.

### 4. Was verhindert Q-001?

Zwei getrennte Schutzteile: normale Geschäfte/Ankünfte geben keine politische Anerkennung; manipulierbare Restbuchkosten steuern keine aktiven Kredit-/Zugangsvoraussetzungen mehr. Nur Rufgewinn entfernen reicht nicht.

**W1 bevorzugte vollständige Richtung:** Mengen aller eigenen örtlichen Schiffe/Lager pro Ware zum selben transparenten Referenzkurs, nicht Kostenmischung. **W2 konservative Alternative:** Warenbuchwerte aus Sicherungs-/Zulassungsbasis ausschließen. W1 braucht saubere Fernkurs-/Grenzregeln; W2 kann warenreiche/kleine Händler stark belasten. Keine Variante implementiert/allgemein bewiesen.

Reine Rechnung aus historischem A08: altes Buchnetto44.920→45.250; W1 bei Kurs30 bereits45.580 **vor/nach**, W2 ohne Warenwert44.680 **vor/nach**. Kein neuer neutraler Schwellenübertritt. Legitime Marge+660/Verlust−300 und alte Kosten bleiben erhalten. FIFO allein oder Cooldown garantieren keinen Schutz; fehlgeschlagene V14-Min-Kappung nicht kopieren. Alle Kredit-/Rettungs-/Rangverbraucher müssen dieselbe sichere Basis nutzen.

### 5. Was verhindert Q-003?

Kontrollierter Personenort getrennt von `s.city`/Schiffshafen; jede persönliche Aktion prüft ihn am kanonischen Zustand erneut. Nur gültige persönliche Ankunft aktualisiert den Ort, kein Ansichtswechsel. Fernansicht/Wirtschaftsübersicht bleiben; keine Delegation. Migrationsanker darf fehlende Vertragsstationen nicht erfüllen. Die Behandlung fern initiierter Schiffsfahrten und alter Kurzfristverträge ist vor Umsetzung ausdrücklich zu entscheiden.

### 6. Wie bleibt V13 kompatibel?

M1 optionale Root-Felder bei Politik1 ist gegenüber alten Clients zu schwach. **M2 empfohlen: V13-Wirtschaftskern mit expliziter Politik-Unterrevision2**; neue Anwendung importiert Politik1 auf Kopie. Der alte strenge Validator würde die neue Revision nach Quellenlogik ablehnen; kein Laufzeittest. Neue Exporte brauchen neuen Client, Original-V13-Dateien/Backups bleiben erhalten. Getrennter aktiver Schlüssel und echte gemeinsame Transaktionsregel sind nötig. Schema/Schlüssel sind noch freizugeben.

### 7. Wie bleiben erworbene Titel geschützt?

Rang, Urkunden, Amt/Stadt/Beginn/Ende/`firstReceipt`, Siegel/Verträge erhalten. Empfohlener ausdrücklich markierter **Altzugang** statt erfundener bezahlter Gildenmitgliedschaft. Keine rückwirkende Gebühr/Rückstufung bestehender Ratsherren/Ämter/Eldermänner. Neue Partien brauchen Beitritt. Umfang Altzugang/Fernkaufmann und fehlende alte Amts-/Heimatdaten entscheiden. Auch unter alter Fehlerlage erreichte Titel werden nicht rückwirkend entzogen.

### 8. Welche Folgen für90 aktive Stunden?

R1.11-Budgets8+17+20+20+25 bleiben Hypothesen. Gilde früh integrieren, keine neue Wartephase. Ziele: Zugang, erste Dienste, Ratsherr/Heimatunterstützung, Amtspflege, fremde Fürsprecher/Vertrag. Nur zwei heutige Diensttypen können repetitiv werden; neue Quellen sind Optionen, keine genehmigten Mechaniken. Spielstilvielfalt/Wiederholung/Leerlauf später menschlich messen. Keine Zeitprognose aus Gold, Spieltagen oder Urkundenzahlen.

### 9. Welche Nutzerentscheidungen fehlen?

Gildenmodell/Preis/Geltungsbereich; Fernkaufmann; Ratsherr-Mindestverdienste; globale Ruf-/Vermögensschwellen und erreichbare Unterstützung; W1/W2/Kreditsicherheiten; M2-Schema/Schlüssel/Altzugang; Personenanker/Heimat; Fristschonung vs enges Altregelrecht laufender Verträge; unbegleitete fern initiierte Schiffsreise. Neue Quellen/Rivalen-/Wahlweiterentwicklung/Spieltests benötigen eigene Freigaben. CSV ordnet jede Position dem Status zu; keine produktive Implementierung ist freigegeben.

### 10. Welche Regressionen sind erforderlich?

55 geplante Fälle:12 Handel/Bewertung,8 Gilde,12 Politik,8 Ort,10 Bestandsschutz,5 Bedienung/Spieltests. Verbindliche IDs H01–H12/G01–G08/P01–P12/O01–O08/M01–M10/U01–U05. Kein Featurefall schon bestanden. Besonders: historische A01–A08/B01; Zwischenränge/Kreditzugang; atomare Zahlung/Status; jeder persönliche Pfad; alte Titel/Jobs/Regeln; Quota/Import/Zwei-Fenster/Safari. Erst Parameter-/Schemaentscheidung, dann gesonderte Freigabe zur Umsetzung/Prüfung.

## Tatsächliche Prüfungen und Aussagegrenze

Lesender Inspektor vor Ausführung in **`520903f0d979c0b146e8f4ca44421cb11c01cff8`** veröffentlicht; erfolgreich ausgeführt. Produkt-/Grundlagenhashes, zwölf Artefaktherkünfte, acht gespeicherte Handelsfälle und B01 geprüft; wenige reine Rechnungen.224 Funktionszeilen und107 textuelle `s.city`-Zeilen inventarisiert, keine vollständige AST-/Sicherheitsanalyse. Kein Spielcode ausgeführt, kein Gilden-/Anwesenheits-/Bewertungsprototyp, kein neuer Browserlauf, keine Migration oder Wirtschafts-/Karrierefolge. Historische Fehler weiterhin offen. Der explizite Konzeptauftrag überstimmt die allgemeine AGENTS-Großsimulationsvorgabe.

### 11. Gesicherte Zwischenstände

- **`520903f0d979c0b146e8f4ca44421cb11c01cff8`**: Ausgangsreferenzen/erster Gesamtbericht/Prüfplan vor Ausführung.
- **`a6abed3ae4ec187ba005dbb634cbaf7c8a4a8e7c`**: Gildenmodelle, Karriere, Bewertungsvarianten und lesende Ergebnisse.
- **`a16b54331ad0f7600ced5b19d7dd881f4662da9b`**: Anwesenheit, zwei V13-Übernahmevarianten,55 geplante Prüfungen.
- Abschlusscommit und GitHub-Rücklesebeleg werden in der letzten Übergabe ergänzt. Keine selbstreferenzielle Testcommit-ID erfunden.

### 12. Direkte GitHub-Links

[Gesamtbericht](https://github.com/psonnen-lgtm/Hansef-rst/blob/audit/q1-03-guild-politics-design/docs/entwicklungsberichte/Q1_03/Q1_03_gesamtbericht.md) · [Entscheidungsmatrix](https://github.com/psonnen-lgtm/Hansef-rst/blob/audit/q1-03-guild-politics-design/docs/entwicklungsberichte/Q1_03/Q1_03_entscheidungsmatrix.csv) · [Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/audit/q1-03-guild-politics-design) · [Vergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...audit/q1-03-guild-politics-design?expand=1).

Keine Produkt-/Parameter-/Spielstand-/Pages-Änderung. Keine Gilde/Politik-/Ortsfunktion implementiert, keine alten Forschungsergebnisse überschrieben, kein Merge. Alle veröffentlichten Dateien werden aus einem frischen GitHub-Fetch zurückgelesen. Danach endet der Auftrag, keine automatische Umsetzung.

## Abschließende Veröffentlichung und GitHub-Rücklesen

Das vollständige Paket mit acht Lieferdokumenten, Index und lesenden Nachweisen ist in **`de730939dc2f7c44c4de838ad7853f258fea4497`** veröffentlicht. Danach wurde ein **frisches unabhängiges Git-Objektverzeichnis** ausschließlich per HTTPS von GitHub befüllt; alle14 zu diesem Stand veröffentlichten Dateien inklusive aller acht Dokumente und Index wurden daraus archiviert, vollständig gelesen und byteweise mit der Arbeitskopie verglichen: **alle identisch**. [Commit-/Datei-/SHA-Nachweis](../../../tests/analysis/q1_03/github-readback.json). Kein bloßer Vergleich mit lokalen Trackingrefs. Die abschließenden Metadaten werden nach ihrem Push ebenfalls von GitHub zurückgelesen.

3.232 vorbestehende Dateien geprüft: bis auf den nur ergänzten Berichtsindex unverändert. Quelleninspektor unverändert zum tatsächlichen Ausführungscommit,37 Matrixpositionen/vier Statusgruppen und55 geplante IDs geprüft; relative Verweise und `git diff --check` ohne Befund. GitHub-Basis weiterhin `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main weiterhin `c1280228951d581c7b3131279b8ff164a8e36dfa`. [Übergabe](../../../tests/analysis/q1_03/handoff.json), [Prüfsummen](../../../tests/analysis/q1_03/SHA256SUMS).

Mehrere nachvollziehbare Sicherungscommits veröffentlicht, keine Implementierung oder Migration, keine großen Tests, keine Änderung an Pages/Altdateien, kein Merge. Auftrag endet hier; weitere Nutzerentscheidungen werden abgewartet.

Letzter Formatbefund im vollständigen Basisvergleich: Die CSV-Standardausgabe enthielt CRLF-Zeilenenden, von Git als nachgestellte Leerzeichen markiert. Ausschließlich auf LF vereinheitlicht; alle37 geparsten Einträge/Zellen unverändert geprüft. Kein fachlicher Wert oder Testergebnis verändert. Der korrigierte Abschluss wird erneut vollständig von GitHub zurückgelesen.
