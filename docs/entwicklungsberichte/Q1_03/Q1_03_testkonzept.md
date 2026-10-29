# Q1.03 – Konkreter Regressions- und Abnahmeplan

29.10.2026 · **Dieser Plan ist keine bestandene Featureprüfung.** Gilde, neue Politik, neue Anwesenheit und Migration wurden nicht implementiert/ausgeführt. [Gesamtbericht](Q1_03_gesamtbericht.md) · [Matrix](Q1_03_entscheidungsmatrix.csv).

## Tatsächlich in Q1.03 geprüft

Der vorab committete [lesende Inspektor](../../../tests/analysis/q1_03/inspect.py) liest die produktive HTML und12 Grundlagenartefakte direkt aus festen Q1.01/Q1.02/R1.11-Commits. Er prüft den Produkt-SHA256, speichert Blob-/SHA-Herkunft,224 Funktionszeilen,107 textuelle `s.city`-Verwendungszeilen und Rufschreibstellen. Das ist keine vollständige AST-/Sicherheitsanalyse. Er liest acht historische Handelsfälle und die historische Q-003-Probe, ohne deren Skripte zu starten.

Reine neue Rechnungen: W1/W2 über die acht gespeicherten Fixturezustände; lokale Komponenten maximal75 gegen Lübecks Ziel80; mögliche Normierung65→86,67; Gebühren250/500/1.000 relativ zu5.000 Startgold. Assertions erfolgreich. Keine Spiel-VM, keine Reise-/Handelstage, kein Gilden-/Präsenzprototyp. [Ergebnis](../../../tests/analysis/q1_03/inspection.json), [Log](../../../tests/analysis/q1_03/inspection.log).

Befehl auf vorab veröffentlichtem **`520903f0d979c0b146e8f4ca44421cb11c01cff8`**:

`PYTHONDONTWRITEBYTECODE=1 python tests/analysis/q1_03/inspect.py tests/analysis/q1_03/inspection.json`

Prüfstatus: Ausführung erfolgreich, keine dynamischen Wiederholungen. Q1.02-A01–A08/B01 bleiben **historisch protokollierte** Reproduktionen, keine neue Rückversicherung einer inzwischen reparierten Fassung. Die beiden Fehler sind unverändert offen. Keine echte Partie/Datei migriert, keine bestehenden Tests angepasst/geschwächt. Keine1.500er-/2.250er-Serie: der explizite Konzeptauftrag überstimmt die allgemeine AGENTS-Großsimulationsregel.

## Regeln für spätere autorisierte Tests

Vorab tatsächlichen Spielcodecommit sichern, getrennte neue Ergebnisdateien/Seeds/Fixtures; vor/nach jede Aktion Gold, Bank, Schuld, Mengen je Eigentümer/Stadt/Ware, Kosten, FIFO, Kreditbasis, Ruf, Gildenstatus, Person/View/Schiffe, Jobs/Urkunden und Revisionsdaten protokollieren. Keine Endzustandsassertion als Schutz gegen zwischenzeitlichen Rang-/Kreditzugang ausgeben. Fehler und erste Ausgaben erhalten; keine vollständigen Serien wegen kosmetischer Korrektur wiederholen.

Wirtschaftliche Wahrheit, Quellenbelege und politische Zulassung getrennt prüfen. Unter W1 ist ein unveränderter Marktwert beim Verkauf einer bereits vorher bewerteten stillen Wertsteigerung korrekt; Finanzmarge+660 bleibt trotzdem bestehen. Unter W2 darf ein echter Warenkauf Liquidität/Sicherheit binden, ohne als Exploit zu gelten. Nach gewählter Variante eindeutige erwartete Ergebnisse festschreiben, nicht nach einem Test nachkalibrieren.

Alle folgenden Fälle **geplant, nicht ausgeführt**:

## H – Handel und Bewertungsgrundlagen

| ID | Prüffall | Erwartetes Ergebnis nach freigegebener Korrektur |
|---|---|---|
|H01|Q1.02-A01 ohne Altware kaufen/verkaufen|Kasse/Mengen/Qualifikationsbasis neutral, kein politischer Ruf |
|H02|A02 mit Altware/Gewichtskosten, beide Handelsrichtungen,3 Kreise|Historische Kostenrechnung darf sichtbar bleiben; sichere Zulassungsbasis und Politikzugang nicht aus Kreis steigen |
|H03|A03 Teilkauf/Teilverkauf, echte Mengenbindung|Reale+15 Ware/−450 Bargeld korrekt, kein pauschales Exploitverbot, W1/W2-spezifische Erwartung |
|H04|A04 reiner Lagertransfer und zurück|Identische Gesamtwerte/Herkunft, kein Ruf/Beleg |
|H05|A05 zweite/dritte eigene Schiffe und Lager, interleavte Mengen|Eigentümerweit am selben Ort neutral, kein Umgehen durch Auswahl/Container |
|H06|A06/A07 reale Gewinne/Verluste|Erlös und Finanzmarge+660/−300 bleiben, keine automatische politische Handelsanerkennung |
|H07|Normale Käufe/Verkäufe/Ankünfte mit hohem/niedrigem Alt-Ruf|Keine politische Rufbuchung und kein direkter örtlicher Unterstützungsgewinn; keine versehentliche alte `rep`-Schreibstelle |
|H08|A08 direkt vor18k/45k/180k und Ruf25/55/90, Antrag zwischen Teilaktionen|Kein Übergang durch Kostenkreis; falls Schwellen bleiben nur sichere Basis; Gilde/Verdienste nicht umgehbar |
|H09|Kreditaufnahme, Rückzahlung, Bankumbuchung vor/nach Kreis|Geld und Schuld korrekt; weder Kreditkumulierung noch erhöhter Rahmen aus Restbuchwert, keine Zwangstilgung alter Schuld |
|H10|Mehrere Waren, vorheriger Verlust, alte V14-Gegenfälle/Min-Kappung|Gewinne/Verluste separat korrekt, keine gemischte Gegenbuchung als neuer Zugang; keine Übernahme gescheiterter Formel |
|H11|Unbekannte Kosten/Herkunft, veralteter Fernkurs, sehr große zulässige Menge|Keine erfundenen Lose/Preise; W1-Referenzregel fail-safe, W2 nicht aus Kosten beeinflusst; Caps/Präzision beachten |
|H12|Echter Stadtwechsel/Preisänderung/Schaden/Zins, laufende Werftwerte|Legitime wirtschaftliche Änderungen zulässig; nicht mit neutralem Kreis verwechseln; keine manipulierbaren Materialbuchwerte als Umwegkredit |

## G – Gilde

| ID | Prüffall | Erwartung |
|---|---|---|
|G01|Bewusster Antrag im Gildenhaus am Personenort|Exakt freigegebene Gebühr, genau ein Mitgliedsstatus/Beleg, kein Ruf/Rang/Sieg |
|G02|Zu wenig Bargeld, Abbruch, falscher Personenort|Keine Zahlung/Status-/Zeitänderung, verständlicher Grund |
|G03|Doppelklick, identischer Antrag, erneutes Öffnen|Einmalige Zahlung; Wiederholung liefert vorhandenen Status, kein zweiter Ruf/Beleg |
|G04|Zwei Fenster mit gleichem Ausgangsstand|Ein erfolgreicher atomarer Beitritt; zweiter Writer erkennt Status/Revision; kein Last-write-wins-Goldverlust |
|G05|Speichern/Laden/Reload nach erfolgreichem Antrag|Gleicher Status und Zahlungsbeleg, kein erneuter Einzug |
|G06|Vollständiger Export/Import, gleiche Partie/alter Originalexport|Keine implizite Zusammenführung, neue Revision nicht neu initialisieren; historische Zeitlinie sichtbar unterscheiden |
|G07|Quota/Unterbrechung vor/nach Commit, veralteter Kandidat|Entweder alter Geld-/Nichtmitgliedstand oder neuer Geld-/Mitgliedstand; niemals halbe Zahlung |
|G08|Geld-/Warenreichtum ohne Antrag; Altzugang ohne bezahlte Mitgliedschaft|Kein automatischer Beitritt/Ruf. Altzugang offen markiert, kein erfundener Gebührenbeleg |

## P – Politik und vorhandene Mechaniken

| ID | Prüffall | Erwartung |
|---|---|---|
|P01|Rang0/1, viel Geld/Ruf, keine Gilde|Kein neuer Ratsherr/Bürgermeister/Eldermann; Handel weiter möglich |
|P02|Mitglied, aber keine passenden Verdienste|Kein Aufstieg allein wegen Zahlung |
|P03|Mitglied, freigegebene echte örtliche Verdienste, persönlicher Antrag|Nur berechtigter Ratsherr-/Bürgermeisterschritt; keine neuen finanziellen Vorteile |
|P04|Unterstützungsgrenzen jeder Stadt, insbesondere75/80-Falle|Alle beabsichtigten Ziele erreichbar; reine Globalsummen0 Wirkung; keine angeblichen Bürgerstimmen aus Score |
|P05|Handel/Ankunft/Spenden in anderer Stadt mit unveränderten lokalen Belegen|Kein unbeschlossener globaler Unterstützungsdurchgriff; gesellschaftliche Quelle nur nach expliziter Regel |
|P06|Wahltermine/gespeicherte30/60-Abschnitte, Niederlage, neue Kandidatur|Keine Urkundenverluste, kein Datumreset, keine heimliche Verlängerung/Gratismehrheit |
|P07|Altes hohes `s.rep`, neues niedriges `s.rep`, identische lokale Belege|Aktive politische Zulassung nach freigegebener Formel unabhängig vom alten gemischten Ruf |
|P08|Gewöhnliche Quest und politischer Versorgungsbrief bei demselben Verkauf|Geldprämie korrekt, höchstens einmalige politische Tatquelle, FIFO/Frist/Menge unverändert |
|P09|Gewöhnlicher Auftrag ohne politischen Brief, normale Kirchenspende|Kein unbeschlossener politischer Ersatzverdienst; Geld/Rufdarstellung konsistent |
|P10|Bestehende Dienst-/Urkunden-IDs, erneuter Abschluss/Import, Amtsbewährung|Keine doppelte Urkunde; Belege vor Amtsantritt ersetzen nicht heimlich erforderliche neue Amtsdienste |
|P11|Siegel/Fürsprecher, Heimatmandat, zwei Handelsräume, Hansevertrag|Echte örtliche Quellen, Besuch/Rückbericht, keine Siegel nur aus Gilde/Geld |
|P12|Eldermannantrag ohne bewährtes Bürgermeisteramt, dann mit gültigen Belegen|Ohne Amtsnachweis ablehnen, legitimen späteren Schritt zulassen; alter Rang4 nie zurücknehmen |

## O – persönliche Anwesenheit

| ID | Prüffall | Erwartung |
|---|---|---|
|O01|Exaktes historisches Q1.02-B01 mit zwei stationierten Schiffen|Fernansicht unverändert möglich, aber keine fehlende persönliche Bestätigung/Urkunde durch Umschalten |
|O02|Echte persönliche Hinfahrt, Vorsprache, Rückfahrt, Rückbericht|Person und Schiffe passend, reguläre Tage/Gebühren, genau eine Urkunde |
|O03|Vorbereitung/Abbruch, beschädigter Konvoi, nur örtliche Teilnehmer|Person bewegt sich erst mit bestätigter zulässiger Mitreise; kein ferner Gratisstart |
|O04|Gilden-/Ratsherr-/Wahl-/Siegel-/Hansevertragsaktionen aus Fernansicht|Jeder mutierende persönliche Pfad verweigert, rein lesende Ansicht möglich |
|O05|Schiffswechsel, Markt/Lager/Bank/Werft aus gültiger Fernansicht|Keine pauschale `s.city`-Ersetzung, keine neue Personenbewegung/Politikurkunde |
|O06|Ortsbeleg alt/stale, Vorbereitung von anderem Personenort, doppelte Ankunft|Keine zweite Bewegung/ID; Ort und Spielrevision zusammen validieren |
|O07|Laden/Import im Fernhafen, einmaliger Legacy-Anker|Person bleibt gespeichert; Anker als Übergang markiert, kein fehlender Vertragsbesuch dadurch erledigt |
|O08|Quota/Unterbrechung bei Reisecommit, View ändert sich während Bestätigung|Keine Person ohne zugehörige Schiffs-/Geld-/Tagestransaktion; alte oder neue vollständige Revision |

## M – Bestandsschutz/Kompatibilität

| ID | Prüffall | Erwartung |
|---|---|---|
|M01|Originale V13/Politik1 ohne Gilde, ergänzend unterstützte V11/V12-Kopien|Originalbackup bytegleich; neue Pflichtdaten nur einmal auf Kopie, keine neuen Märkte/Geldwerte |
|M02|Rang1/Rang2 vor Übernahme, auch unter alter Q-001-Regel erreicht|Titel unverändert; dokumentierte Altzugangsregel, keine stillschweigende Mitgliedszahlung |
|M03|Aktives Amt/Rang3/Rang4 mit/ohne belegter Amtsstadt|Amt/Fristen/Bewährung/Titel erhalten; unbekannte Geschichte nicht erfinden |
|M04|Gespeicherte Regeln30/60 und45k/85k, nächste Wahl, firstReceipt|Werte/Historie erhalten, aktive neue Regelrevision explizit; keine zufällige Neuberechnung |
|M05|Gültige Urkunden/Siegel/Fürsprecher, Recordgrenze/volle Historie|Keine Löschung, kein Duplikat, kein automatischer Ersatz bei Erreichen der Grenze |
|M06|Gold/Bank/Schuld/Waren/Kosten/FIFO/Markt/Lager/Werft/Informationen/Ruf|Vor/nach tief vergleichen, unbekannte Werte bleiben unbekannt; Bewertungsansicht ≠ tatsächliche Bestandsänderung |
|M07|Laufende Vereinbarung, visited/witnessed, sehr kurze Restfrist|Fortschritt erhalten; freigegebene Altfall-/Fristschonungsregel exakt nur für bekannte IDs, kein neuer Topf |
|M08|Abbruch/volle Originalsicherung/Quota/Crash/zweites Fenster|Kein halb aktivierter Stand, kein Überschreiben des Originals; Wiederaufnahme konsistent |
|M09|Politik2 in altem Client, fehlende/gefälschte neue Felder|Sichere Ablehnung/Erklärung ohne Datenverlust, kein Rückfall auf Politik1; Status nicht aus View ableiten |
|M10|Export/Import/Reload über Geräte, älterer Originalexport|Komplette Regelrevision/IDs/Ort/Status, keine Teilübernahme; kein behaupteter weltweiter Offline-Anti-Rollback |

## U – Bedienung und spätere menschliche Validierung

| ID | Prüffall | Erwartung |
|---|---|---|
|U01|Gildenhaus als Weltgebäude, iPhone/iPad/PC|Erkennbar, gut bedienbar, keine neue Hauptmenükaskade; echte Safari-/Zielgeräte später prüfen |
|U02|Fee/Restgold/Status/Ruf/Altzugang im Dialog|Keine falschen Versprechen, verständliche Nichtzahlung/Altstatus, klare Bestätigung |
|U03|Fernansicht vs Person/Heimat, deaktivierte persönliche Aktion|Ort sichtbar, Grund nennt echte Bedingung; Flottenwirtschaft bleibt verständlich |
|U04|Ratstafel nach Formelanpassung, Tastatur/Screenreader|Keine alten Tipps zum Handelsruf/ungerechten Vermögenshebel, keine abgeschnittenen Pflichtinformationen |
|U05|Mehrere reale Spielstile/Anfänger/Fortsetzer über Karriereabschnitte|Aktive Entscheidung, Wiederholung, Leerlauf, Niederlage/Erholung und Motivation getrennt protokollieren |

## Reihenfolge einer späteren Freigabe

Zuerst Nutzerentscheidungen zu Gebühr/Fernkaufmann/Qualifikation/Formel/W1-W2/Migration/Altfristen. Dann eng begrenzte technische Implementierung mit aktuellen Regressionsfällen, anschließend persistente Mehrfenster-/Import-/Geräteabnahme. Menschliche90-Stunden-Validierung als gesonderter Auftrag. Keine implizite automatische Folgephase.

Abnahmebedingung wäre nicht nur „Tests grün“: Q-001 darf weder politische Anerkennung noch einen Kostenhebel auf Kredit/Zugang erzeugen; Q-003 muss neue persönliche Aktionen aus bloßer Fernansicht verhindern. Legitime Wirtschaft und gültige Altrechte müssen erhalten bleiben. Solange diese Umsetzung/Tests fehlen, lautet Status **Konzept vorbereitet, Fehler weiterhin offen**.
