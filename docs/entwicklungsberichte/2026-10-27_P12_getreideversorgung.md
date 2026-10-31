# Phase P1.2 – Öffentliche Getreideversorgung im tatsächlichen V13-Code

27.10.2026 · Europe/Berlin · **Isolierter technischer Prototyp, keine Produktivimplementierung oder Wahlstimmen.**

GitHub vor Beginn frisch geprüft: `development/v04-foundation` **`22fe3c4d92c9dbac439f247ac294104d388b2f6a`**, Merge #44, entspricht dem Auftrag. Neuer Branch **`analysis/p12-public-grain`**. Produktive HTML unverändert **0.8d.1b/V13**, letzter Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Adapter/Prüfprogramme vor Ausführung committet und veröffentlicht: **`6179fa16df15c49afb80e550ba5c43874b0da5d9`**. Alle zwölf tatsächlichen V13-Verläufe auf diesem unverändert gebliebenen Stand. Lesendes Bilanzaudit auf **`108c64231fa079641946f315f9bcbac4ae231e85`**, keine neuen Spielaufrufe. Spätere Berichtscommits sind keine erfundenen Testcode-IDs.

Untersucht ausschließlich **Lübeck/Stadtindex0, Getreide/Warenindex0**. Preise30/16 G, Bedarf90 Fass und 90-Tage-Belegfrist sind kontrollierte Testwerte, keine beschlossene Balance. Keine neue Rang-/Wahl-/Rivalenmechanik und keine neue produktive Speicherfassung. Alle historischen Ergebnisse/Berichte bleiben erhalten.

[Getreideversorgung und Schutzprüfungen](2026-10-27_P12_getreideversorgung.md) · [Wirtschaftliche Auswirkungen](2026-10-27_P12_wirtschaftliche_auswirkungen.md) · [Entscheidung und Übergabe](2026-10-27_P12_entscheidung.md).
## Ergebnis

**Die endgültige öffentliche Getreideabnahme funktioniert im begrenzten VM-Prototyp mit vollständig bilanziertem Gold und Getreide.** Alle zwölf vorab geplanten Verläufe liefen beim ersten Versuch vollständig durch. Der kritische rückkaufbare Anteil wird wirklich aus dem freien Markt entfernt; nur tatsächlich übernommene Fass erhalten einen finalen technischen Beleg.

**Die normale V13-Verkaufsfunktion allein genügt dafür nicht.** Sie liefert reale Zahlung, gewichtete Kosten, FIFO und Lieferaufträge, legt aber die gesamte Ware wieder in den freien Markt. A/B nutzen sie deshalb innerhalb einer isolierten Transaktion; C ist eine eigene echte Warenentnahme ohne Verkaufsfiktion. Die öffentliche Verbrauchsregel hat einen gemessenen späteren Preiseffekt und ist nicht zur stillen Produktiveinführung freigegeben.

## 1. Quellen und verwendeter V13-Stand

Gelesene Grundlagen: [P1.1-Entscheidung](2026-10-27_P11_entscheidung.md), [P1.1-Stadtversorgung](2026-10-27_P11_stadtversorgung.md), [P1.1-Unterstützung](2026-10-27_P11_ganzjaehrige_unterstuetzung.md), [P1-Bestandsschutz](2026-10-27_P1_bestandsschutz.md), ferner die Gegenbeispiele aus [0.8d.2a.2](2026-10-27_0.8d2a2_politischer_rueckhandel.md) und [0.8d.2a.3](2026-10-27_0.8d2a3_politisches_vermoegen.md). Alte Buchwert-/Zwischenrangprobleme werden nicht als nebenbei repariert ausgegeben. Der neue Beleg liest weder Buchvermögen noch globales Ansehen als Anerkennungsschwelle.

[Vorhandener VM-Helfer](../../tests/simulation/headless.cjs) liest die tatsächliche [HTML an der Basis](https://github.com/psonnen-lgtm/Hansef-rst/blob/22fe3c4d92c9dbac439f247ac294104d388b2f6a/Hansefuerst_0_4.html). Keine Importierung des B3-Mengenpreismodells, keiner P1-Wahlengine und keiner zweiten Wirtschaft. Die vorhandenen UI-Stubs im Headless-Helfer bleiben Testinfrastruktur, keine Browserprüfung.

Neue Dateien: [Harness](../../tests/analysis/phaseP12/harness.cjs), [Adapter](../../tests/analysis/phaseP12/adapter.cjs), [Prüfprogramm](../../tests/analysis/phaseP12/checks.cjs), [lesendes Audit](../../tests/analysis/phaseP12/audit.cjs), [Vorabplan](../../tests/analysis/phaseP12/README.md), [Quellensummen](../../tests/analysis/phaseP12/frozen-plan.json) und Ergebnisse. Keine vorhandene Datei außer dem Berichtsindex verändert.

Die Funktionstexte von `trade`, `consumeOrigins`, `warehouseTransfer`, `completeQuests`, `completePoliticalSupply`, `regionalPrice`, `regionalStock`, `regionalMarketDay`, `advance`, `donate`, `promote` werden je Verlauf unverändert nachgewiesen. Die Quellen bleiben auch in der Test-VM erhalten; der Adapter ruft sie auf. Politische Rangfunktionen werden nicht aufgerufen.

## 2. Kontrollierte Ausgangssituation und echter Bedarfstopf

Standardfixture:10.000 G, ein intakter Holk mit 90 vorhandenen Getreidefass, bekannte gewichtete Kosten8 G, tatsächliche fremde FIFO-Herkunft Stadt1, Lübeck-Markt20 Fass zum Preis30. Keine Schulden/Bankguthaben, keine Miet-/Werftkosten. Die Ware liegt tatsächlich in validierten V13-Daten; es wurde keine neue Handelskarriere gespielt, um sie zu beschaffen.

Ein **kontrolliert erteilter** Bedarf `p12:controlled:luebeck:grain:1` hat90 Fass Kapazität/Rest. Der Adapter prüft beim Erteilen tatsächlichen Marktbestand plus eigene offene Entnahmeschuld≤40 und erlaubte Kapazität. Er stellt höchstens eine Bedarf-ID pro Verlauf bereit, füllt auch einen gedeckten Bedarf nicht neu.

Das ist bewusst **kein automatischer Krisendetektor** aus zwei echten Tagesbeobachtungen und keine neue Bevölkerungskonsumrechnung. Entstehung/Wiederholung chronischer Notlagen bleibt eine spätere Entscheidung. Beim selbst hergestellten Engpass aus Markt110→30 und 80 eigener Entnahme ist der bereinigte Wert110; der Adapter verweigert einen Hilfsbedarf.

## 3. Eingriffspunkt und A/B/C

| Variante | Ausgeführter isolierter Ablauf | Was erhalten bleibt |
|---|---|---|
| A normal | Echte V13-`trade(0,-1)`-Ausführung zum vorhandenen Preis. Danach öffentliches q aus dem neu erhöhten Marktbestand herausnehmen, gemeinsam committen. | Vollständiger regulärer Erlös, echte gewichtete Gewinne/Kosten, FIFO-Verbrauch, Original-Lieferauftrag. |
| B fair | Auf der privaten Spielkopie nur für diese native Verkaufsaktion den Ausführungspreis16 einsetzen; danach ursprüngliche Marktnotierung30 und korrektes eigenes Preisjournal wiederherstellen. Öffentliches q entnehmen. | Tatsächlich reduzierter Erlös, echter nativer Gewinn/FIFO/Questpfad; normale Preisformeln/folgende Marktpreise bleiben Original. |
| C Spende | Tatsächliche eigene FIFO-Menge aus Ladung entfernen, Original-Herkunftshelfer nutzen, bekannte Kosten/ersatzweise Buchwerte erhalten bzw. bei leerem Bestand bereinigen. Kein `trade`-Verkauf. | Kein fiktiver Erlös/Verkauf, keine künstliche Quest-/Verkaufs-Ansehensprämie. Unbekannte Einkaufskosten bleiben unbekannt. |

B benutzt eine bewusst begrenzte **Testtechnik**, keine für Produktion empfohlene vorübergehende Weltpreisänderung. Eine spätere Umsetzung sollte einen expliziten Ausführungspreis in einem eigenen öffentlichen Transaktionsweg führen; ansonsten könnten UI/Information oder Rückrufe Zwischenzustände sehen. Der hier verwendete Zustand ist bis zum Commit privat, Zwischenansichten/Speicheraufrufe unterdrückt. Die Preis-/Produktionsfunktionen werden nicht überschrieben.

Direktverbrauch wird nicht als frei handelbarer Ratslagerbestand geführt. A/B:

`Marktneu=Marktalt+verkauft−öffentlichAbgenommen`

`EigeneWareneu=EigeneWarealt−verkauft`

C:

`EigeneWareneu=EigeneWarealt−tatsächlichAngenommeneSpende`, Markt unverändert.

Nur q senkt die gemeinsame öffentliche Restmenge. Bei angebotener C-Menge über Rest würden unangenommene Fass beim Spender verbleiben; kein künstlicher Erlös und keine doppelte Entnahme. A/B können über Rest hinaus regulär verkaufen; nur q erhält Anerkennung. Im getesteten B-Fall gilt der freiwillige günstigere Preis für die **gesamte angebotene Verkaufsmenge**, auch für den unanerkannten Marktüberhang. Das muss später vor Bestätigung sichtbar sein; kein stiller Preisvorteil versprochen.

Die eigenen regulären Käufe erhöhen einen persistenten Entnahmesaldo. Verkäufe stellen ihn zuerst wieder her. Für A/B:

`q=min(Restbedarf,nachgewieseneFremdmenge,max(0,Verkaufsmenge−Entnahmeschuld))`.

Damit gelangen mindestens die zur Schuldwiederherstellung benötigten Fass wieder in den freien Markt. C ist bei offener Entnahmeschuld gesperrt; die tatsächlich entnommene FIFO-Präfixmenge muss fremd belegt sein. Kein Überspringen örtlicher Lose, keine erfundene Herkunft. Fremdherkunft als neue Anerkennungsbedingung ist ein konservativer Prototypvorschlag, nicht nachträglich verändertes V13-Herkunftsrecht.

## 4. Beleg, gemeinsame Transaktion und Wiederholschutz

Jede erfolgreiche Lieferkennung speichert Anfrage und Ergebnis: Stadt/Ware/Name, Bedarf-ID, Lieferungs-ID, Lieferant`player`, Quellschiff, angebotene/übertragene/endgültig angenommene Menge, A/B/C, normale Notierung/Ausführungspreis, tatsächlicher Gesamterlös und öffentlicher Teilerlös, gesamter/öffentlicher Preisverzicht, bekannte Warenkosten oder`null`, verbrauchter Buchwert, tatsächlicher Spieltag und Status`final` bzw.`not_recognized` bei q=0.

Beispiel B90: Erlös1.440, Verzicht gegenüber30 G insgesamt 1.260, öffentlich angenommen90, Kosten720, finaler Beleg. Beispiel B90 bei nur60 Rest: öffentlich angenommen60, öffentlicher Teilerlös960, öffentlicher Nachlass840; Gesamterlös bleibt1.440 und gesamter Nachlass1.260. Kein Erfinden unbekannter Einkaufskosten. Beispiel C60 mit gemischten unbekannten Alt-Kosten: Erlös0, historische Kosten`null`, tatsächlicher verbrauchter Ersatzbuchwert640, keine vermeintlich bewiesene historische Gewinnzahl.

Es gibt **keine neuen Stimmen oder Anerkennungspunkte**, nur technische Endbelege/Quellenereignisse. Einmalige90 Fass,9×10 und 90×1 erzeugen verschieden viele Teilbelege, aber jeweils exakt90 anerkannte Fass und 2.700 G. Spätere Politik darf nicht die Beleganzahl statt Menge/Leistung belohnen. Die vorhandenen V13-Verkaufs-Ansehenswerte bleiben dagegen absichtlich pro Aktion unterschiedlich; dieser Auftrag ändert diese alte Mechanik nicht.

Der Adapter führt die Aktion auf einer Kopie aus, sammelt native Ereignisse und unterdrückt produktive Zwischenwrites. Anschließend native V13-Validierung plus Quoten-/Belegvalidierung; Spiel, Bedarf, Belege, Entnahmesaldo und RNG/Uhr werden als **eine Analysehülle** geschrieben. Erst nach Erfolg werden Ereignisse freigegeben. Bei Abbruch/Quota/Stale bleiben RAM, Analyse-Disk, Geld, Ware, Quest und Anerkennung im getesteten Zustand unverändert.

Doppelte Lieferungs-ID mit gleicher Anfrage liefert nur den gespeicherten Beleg zurück; andere Anfrage unter gleicher ID abgelehnt. Reine Beleganzeige/Auswertung mehrfach ohne neue Leistung. Vollständiger Analyseexport und Wiederladen erhalten auch verarbeitete Kennungen. Das ist kein produktiver V13-Import; ein V13-Export ohne Nebenbuch wäre für diesen Prototyp unvollständig.

## 5. Alle zwanzig verlangten Prüfungen

Begrenzte Nachweise, **keine allgemeine Exploitfreiheit**. [Vollständiger Erstlauf](../../tests/analysis/phaseP12/results/checks-attempt1.json), [Log](../../tests/analysis/phaseP12/results/checks-attempt1.log), [lesende Zuordnung/Bilanzen](../../tests/analysis/phaseP12/results/audit.json).

| Nr. | Tatsächlicher Nachweis / Grenze |
|---:|---|
| 1 | Verlauf02: A90, echte native Zahlung2.700 und 90 öffentlich verbraucht. |
| 2 | 03: B90 zu16 statt30, Erlös1.440, normale Notierung anschließend30. |
| 3 | 04: C90 aus Besitz entfernt; kein Verkauf, kein Erlös/Questbonus. |
| 4 | 05: erste A30 lassen60 öffentlichen Rest. |
| 5 | 05: B90 übernimmt nur60 öffentlich;30 werden frei verfügbarer Überhang. |
| 6 | 05/06/07: derselbe Bedarf wird durch mehrere Teile gemeinsam gedeckt. |
| 7 | 02/06/07 tatsächlich A90/9×10/90×1, gleicher Erlös/Verbrauch; B/C zusätzliche reine Rechenproben. |
| 8 | 09: echter80er-Kauf/Rückverkauf in derselben Stadt, Gold wieder10.000, keine Anerkennung. |
| 9 | 10: Lieferung an Tag 359, zwei wirkliche Tage bis 1351/Tag 1,90er-Rückkauf mangels Ware verweigert; keine echte Wahl programmiert. |
| 10 | 09: selbst gekaufter Engpass30+Schuld80=110 eröffnet keinen Bedarf. |
| 11 | 10:20 frühere Entnahmen zuerst ausgleichen, nur70 von 90 öffentlich anerkannt. |
| 12 | 08: zwei eigene Schiffe und native Ein-/Auslagerung, kein Reset von Bedarf/Herkunft. |
| 13 | 07/11: gleicher ID-Request liefert nur vorhandenen Beleg; Konflikt abgewiesen. |
| 14 | 05: keine neue Bedarfs-ID nach Deckung; C verweigert, weitere A-Verkäufe ohne neue Anerkennung. |
| 15 | 01–04: sieben echte Tage, gemessene Markt-/Preisfolgen der geringeren freien Ware. |
| 16 | 02–04/10: Zeitfortschritt erzeugt keine erneuten Lieferbelege. |
| 17 | Kosten8/12, gewichtete12 nach Eigenkauf sowie unbekannte gemischte Kosten/FIFO in08. |
| 18 | Lesendes Audit aller12 Ereignis-/Gold-/Eigenwaren-/Markt-/Verbrauchsbilanzen. |
| 19 | 11: Storno, unzulässige Menge/fairer Preis/Scope/Revision, Quota, stale Disk und Reentry ohne Teilübernahme. |
| 20 | 12: A mit identischem Ausgang/Seed wiederholt; gesamtes Spiel, Ereignisse, RNG/Uhr und Nebenbuch identisch. |

Zusätzlich reine Betrags-/Grenzproben am bisherigen1e9-Marktlimit. Kein kompletter Extremzustands-VM-Test für alle denkbaren Gold-/Marktgrenzen. C mit allen denkbaren Herkunftsmischungen, direkte öffentliche Entnahme **aus** dem Lager statt vorheriger nativer Umladung und alle alten politischen Auftragsvarianten sind nicht vollständig integriert/geprüft.

## 6. Mengen-/Goldprüfung und Bestandsschutzgrenze

Das unabhängige **lesende** Audit führt keinen Spielverlauf erneut aus. Es prüft die gespeicherten Ereignisse und Start-/Enddaten:

`Goldende=Goldstart+nativeVerkaufserlöse−nativeKaufzahlungen+echteQuestprämien`.

`Eigenwareende=Eigenwarestart+Käufe−Verkäufe−direkteCSpenden`.

`Marktende=Marktstart+Verkäufe−Käufe−öffentlichesAB+beobachteteNatürlicheBestandsänderung`.

Damit`Eigenware+Markt+öffentlicherVerbrauch` vor/nach nur durch die tatsächlich beobachtete regionale Tagesänderung verschieden. C darf nicht nochmals als Marktverkauf oder als zusätzlicher Goldabzug erscheinen. Alle zwölf Bilanzen erfüllt; Buchkostenbruchteile nur mit 10⁻⁷-Toleranz, tatsächliche Waren/Goldtransaktionen hier ganzzahlig.

Ein Testauftrag über90 fremde Getreidefass zahlt bei A einmal100 Gold/+4 bestehendes Ansehen zusätzlich zum tatsächlichen Verkauf. Bei simuliertem Quota-Fehler wird auch dieser native Abschluss zurückgenommen. Nach erfolgreichem Retry ein Questabschluss/ein neuer Versorgungsbeleg; Replay erzeugt keinen zweiten. C ist kein ursprünglicher Verkaufsabschluss und erzeugt daher keine fiktive Questprämie. Bestehende politische Ratsfunktionen bleiben bytegleich; ein gültiger neuer Getreide-Ratsversorgungsbrief wurde nicht erfunden (Lübecks aktuelle Ratsbedarfe sind andere Waren).

Keine historische Partie migriert, keine Ämter verändert. Einmalige technische Anerkennung ist nachgewiesen in der Analysehülle; produktive Originalbackup-/V11/V12/V13-/Quota-/Mehrtabellenintegration bleibt Planung. Einzelheiten im Entscheidungsbericht.
