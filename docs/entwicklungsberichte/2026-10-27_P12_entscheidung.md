# Phase P1.2 – Entscheidung zur öffentlichen Getreideversorgung

27.10.2026 · Europe/Berlin · **Isolierter technischer Prototyp, keine Produktivimplementierung oder Wahlstimmen.**

GitHub vor Beginn frisch geprüft: `development/v04-foundation` **`22fe3c4d92c9dbac439f247ac294104d388b2f6a`**, Merge #44, entspricht dem Auftrag. Neuer Branch **`analysis/p12-public-grain`**. Produktive HTML unverändert **0.8d.1b/V13**, letzter Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Adapter/Prüfprogramme vor Ausführung committet und veröffentlicht: **`6179fa16df15c49afb80e550ba5c43874b0da5d9`**. Alle zwölf tatsächlichen V13-Verläufe auf diesem unverändert gebliebenen Stand. Lesendes Bilanzaudit auf **`108c64231fa079641946f315f9bcbac4ae231e85`**, keine neuen Spielaufrufe. Spätere Berichtscommits sind keine erfundenen Testcode-IDs.

Untersucht ausschließlich **Lübeck/Stadtindex0, Getreide/Warenindex0**. Preise30/16 G, Bedarf90 Fass und 90-Tage-Belegfrist sind kontrollierte Testwerte, keine beschlossene Balance. Keine neue Rang-/Wahl-/Rivalenmechanik und keine neue produktive Speicherfassung. Alle historischen Ergebnisse/Berichte bleiben erhalten.

[Getreideversorgung und Schutzprüfungen](2026-10-27_P12_getreideversorgung.md) · [Wirtschaftliche Auswirkungen](2026-10-27_P12_wirtschaftliche_auswirkungen.md) · [Entscheidung und Übergabe](2026-10-27_P12_entscheidung.md).
## Empfehlung

**Technisch im eng begrenzten V13-Prototyp machbar, aber keine Produktivfreigabe.** Gold, Ladung/Lager, Markt und endgültiger öffentlicher Verbrauch sind in allen zwölf Verläufen vollständig bilanziert. A/B/C sind als reale Transaktionen unterscheidbar; keine Stimmen oder Bürgermeisterwahl entwickelt.

Die aktuelle V13-Verkaufsfunktion kann als erprobter wirtschaftlicher Baustein dienen, **nicht allein als endgültiger Versorgungsweg**. Für eine spätere Integration ist eine eigene öffentliche, atomare Transaktion mit explizitem Ausführungspreis und finaler Warenentnahme der klarste Weg. Die gemessene zusätzliche freie Marktknappheit/Preiserhöhung muss fachlich entschieden werden; kein automatischer Ausgleich durch geänderte Formeln.

## Antworten auf die acht Abschlussfragen

| Frage | Belegter Stand / Grenze |
|---|---|
|1. Funktioniert endgültige Abnahme mit V13? | **Ja im isolierten Lübeck/Getreide-Adapter.** Echte native A/B-Verkäufe plus endgültige Entnahme; C eigene echte Warenabgabe. Keine neue Wirtschaftssimulation. |
|2. Gold/Waren vollständig bilanziert? | **Ja für alle zwölf Verläufe**, unabhängig lesend aus Ereignissen/Start-Enddaten geprüft. Natürliche Marktänderungen separat. C kein fiktiver Verkauf/Goldabzug; Questprämie separat. |
|3. A/B/C sauber getrennt? | Ja: regulärer Erlös2.700, fair1.440, Spende0 für dieselben90; tatsächlicher Preisverzicht und bekannte/unbekannte Kosten im Beleg. Politische Gewichtung bleibt offen. |
|4. Trick vor/nach Wahl verhindert? | Der **konkrete Warenrückholkreis** ist verhindert: öffentlich verbrauchte Ware nicht mehr am Markt,90er-Kauf nach zwei echten Tagen verweigert. Kein tatsächliches Wahl-/Amtsprogramm und keine allgemeine Garantie gegen alle Handelskreise. |
|5. Spieler und spätere Rivalen gleiche Bedarfsregeln? | Mengen-/ID-/Herkunftsregeln lassen sich gemeinsam nutzen; ein zentraler Bedarf muss für alle gelten. **Aktueller Adapter nur Spieler**, andere Lieferanten ausdrücklich noch nicht integriert/geprüft. Nicht pro Rivalen einen neuen Bedarfstopf kopieren. |
|6. Wirtschaftliche Nebenwirkungen? | Ja: nach sieben Tagen111 Fass/28 G ohne Abnahme,29 Fass/29 G mit A/B/C. Öffentlicher Bedarf gedeckt, freier Markt bleibt knapper; mehrerer Langzeitverläufe/alle Städte nicht untersucht. |
|7. Einfachster sicherer Integrationsweg? | Eigene öffentliche Transaktion mit gemeinsamem Mengen-/Geld-/FIFO-/Quest-/Beleg-/Bedarfscommit; normale V13-Handelsregeln wiederverwenden, Ausführungspreis explizit. Prototypische temporäre Preisänderung auf Privatkopie nicht als Produktivtechnik übernehmen. |
|8. Entscheidungen vor Einführung? | Quote/Häufigkeit/echter Krisennachweis, zusätzliche öffentliche Verbrauchswirkung und Finanzierungsrahmen, fairer Preis/Übermenge, C-/Questbehandlung, Anerkennungsgewicht, zentrale Lieferantenregel und atomare Speicher-/Migrationsfassung. |

## Tatsächlich umgesetzter Prototyp

[Adapter](../../tests/analysis/phaseP12/adapter.cjs) und [Harness](../../tests/analysis/phaseP12/harness.cjs) stehen ausschließlich unter dem neuen Analysepfad. Der vorhandene Headless-Helfer führt die unveränderten HTML-Funktionen aus. A/B rufen die native Verkaufsfunktion auf; B reduziert die tatsächliche Auszahlung über den temporären privaten Ausführungskurs und stellt die echte Notierung wieder her. C entfernt echte FIFO-/Bestandsware ohne Fake-Verkauf. Der öffentliche Anteil senkt freie Marktmenge und Bedarf genau einmal.

Der neue Anerkennungsbeleg enthält tatsächlich gelieferte/endgültig übernommene Menge, IDs/Lieferant/Quelle, A/B/C, reale Erlöse, Preisverzicht/Kosten, Datum und finalen Status. Keine neuen numerischen Politikboni, keine Rangvergabe. Die künftig beschlossene Politik mit gewählten Ämtern ist durch diese Phase **nicht** bereits in V13 implementiert; bestehende Rang-/Ansehensfunktionen bleiben unangetastet.

## Ausgeführte Prüfungen und Scope

| Befehl | Tatsächliches Ergebnis |
|---|---|
| `node --check tests/analysis/phaseP12/{harness,adapter,checks,audit}.cjs` jeweils einzeln | Syntaxprüfung erfolgreich. |
| `node tests/analysis/phaseP12/checks.cjs tests/analysis/phaseP12/results/checks-attempt1.json` | **Genau zwölf kurze tatsächliche V13-Verläufe**, alle beim ersten Versuch vollständig bestanden; höchstens sieben Tage,0 Reisen. Höchstens12 erlaubt, einschließlich identischer Wiederholung ausgeschöpft. [Log](../../tests/analysis/phaseP12/results/checks-attempt1.log). |
| Derselbe Lauf, reine Einzelprüfungen | Betrags-/Verbrauchssummen90/9×10/90×1 für A/B/C; obere Marktgrenze1e9 rechnerisch; kleine deterministische Aufrufe der tatsächlichen `regionalPrice`/`regionalStock` ohne Zustandsänderung/RNG-Ziehung. |
| `node tests/analysis/phaseP12/audit.cjs tests/analysis/phaseP12/results/audit.json` |12 gespeicherte Cash-/Eigenwaren-/Markt-/Verbrauchsbilanzen und 20 Anforderungszuordnungen, aktuelle Quellen gegen Vorab-Hashes; **keine VM und kein neuer Verlauf**. [Log](../../tests/analysis/phaseP12/results/audit.log), [CSV](../../tests/analysis/phaseP12/results/ledger.csv). |

V13 ohne Abnahme, A, B, C starten vollständig gleich. Jeder dieser vier Arme läuft sieben echte Tage; die Zufallszustände/Uhren sind je Tag gleich, andere120 Märkte nach sieben Tagen gleich. A wird einmal mit identischem Seed/Start wiederholt und hat vollständig gleiche Spiel-/Ereignis-/Zufalls-/Nebenbuchdaten. Es wird nicht behauptet, dass verschiedene echte Handlungen alle dieselben finanziellen Ergebnisse haben.

Kein unerwarteter Test-/Schutzfehlschlag. Die absichtlich abgelehnten Vorgänge (Quota, Storno, zu viel Ware, ungültiger fairer Preis, falscher Scope, veraltete Revision/Disk, doppelter Konflikt, reentrant) waren erwartete Schutzfälle. Die Einzelerfolge belegen keine allgemeine Missbrauchsfreiheit.

**Nicht ausgeführt:** produktive Browser-/Safari-/iPhone-/iPad-Integration, echte Mehrtabellenkonkurrenz oder tatsächliches Browserquota, historische V11/V12/V13-Migration, produktive neue Savefassung, automatische Krisenerkennung/-wiederholung, Rivalen-KI, vollständige Ämterkarriere,1.500er-/2.250er-Wirtschaftsreihe, vollständige bestehende Basistests. Auch die alten Buchwert-/Ansehensprobleme aus0.8d.2a.2/3 wurden nicht allgemein repariert. Keine Spielzeitprognose oder Umrechnung in menschliche Stunden. Die ausdrückliche Zwölf-Verläufe-Grenze geht der allgemeinen Simulationsregel in AGENTS.md vor.

## Technische Einschränkungen und offene Fälle

1. **Krise konstruiert:** Ein kontrollierter Bedarf wird einmal erteilt; keine vermeintlich bereits beobachtete echte Bevölkerungskrise. Konservative Entnahmeschuld schützt den geprüften Selbstentnahmefall, ist noch kein kontrafaktischer Marktbeweis für alle Tagesfolgen/Sondertipps.
2. **Abnahme wirkt wirtschaftlich:** Sie entfernt tatsächlich Ware; normale Preisformel reagiert später darauf. Die 90er-Menge ist kein ausbalancierter Wunschwert für alle Städte. Keine automatische neue Notlage nach Verbrauch.
3. **Begrenzte Varianten:** Tatsächliche90er-Splitverläufe betreffen A; B/C haben zusätzlich reine Betragsproben. Direktes Spenden ab Lager, alle gemischten Herkunftspräfixe, extreme zulässige Altmengen/Preise und sämtliche bestehenden Ratsauftragsvarianten sind nicht erschöpfend integriert.
4. **Nur Analysepersistenz:** Die Hülle speichert Game/Bedarf/Belege/Entnahmesaldo/RNG/Uhr gemeinsam und simuliert Compare-and-swap/Fehler. Kein Ersatz für eine produktive Browsertransaktion. Direkte V13-Schreibpfade außerhalb des Adapters wären in einer echten Integration zu konsolidieren.
5. **Alte Ansehensformel:** Je Aktion verschieden, hier unberührt. Neue politische Anerkennung muss auf tatsächlichen Mengen/Belegen beruhen, nicht auf Zahl der Verkaufsklicks, Belege oder alten globalen Ansehenspunkte.
6. **Lieferanten:** supplier`player` ist gegen andere Akteure gesperrt. Zukünftige NPC brauchen wirkliche Bestände/Kaufzahlungen/Fracht und dasselbe zentrale Restkonto. Keine freie Ware aus bloßer NPC-Ausgabenzeile.
7. **Alte Exporte:** Analyseexport/Reload geprüft; gewöhnlicher V13-Export enthält kein Nebenbuch. Rücksetzen einer kompletten Offline-Partie auf einen früheren Export ist eine frühere Zeitlinie und kein hier gelöster serverseitiger Mehrfachschutz. Wiederanzeigen desselben vollständigen aktuellen Belegs löst dagegen nichts erneut aus.

## Spätere Speicherung und Bestandsschutz, heute nicht ausgeführt

Empfohlene neue, separat zu beschließende Formatfassung (gegebenenfallsV14): pro zentralem Bedarf ID/Stadt/Ware/Kapazität/Rest/Erteilung/Frist/Quellbeobachtungen; je Lieferbeleg eindeutige Partie-/Lieferanten-/Lieferungs-ID mit Anfrage/Endstatus/realer Menge/Erlös/Nachlass; verarbeitete Anerkennungskennungen; Entnahmesaldo je Besitzer und Revision. Im produktiven Spiel keine zusätzliche RNG/Uhr simulieren; diese gehören hier nur zur reproduzierbaren Testhülle.

V11/V12 zuerst mit vorhandener bewährter Migration auf **Kopie** zu gültigem V13, V13 direkt validieren. Unverändertes Originalbackup einschließlich Originalversion/Schlüssel behalten; dann erst neue Felder aufbauen/prüfen. Beim Übernehmen keine rückwirkenden öffentlichen Lieferungen, Krisen oder Belege erfinden. Belege/Ämter/Ranghistorie, Gelder/Bank/Schuld, Waren/Kosten/FIFO/Schiffe/Lager/Bauten, Markt-/Sondertippdaten, Informationen/Archiv und Chronik vollständig erhalten. Bereits erreichte Bürgermeister-/Eldermannrechte weder durch Quoteneinführung noch Versionswechsel aberkennen.

Alle finanziellen/physikalischen Änderungen, public-q/Restbedarf und Belegstatus in **einer** atomaren Transaktion speichern; nicht erst originalen V13-Verkauf sichern und später in einem zweiten Write öffentlich entnehmen. Quota/Backup-/Validierungsfehler müssen vor Aktivierung die ganze Kopie verwerfen. Ein aktiver älterer Browserclient darf neue Daten nicht still inV13 zurückschreiben.

Parallele Fenster: gemeinsame Revision/Writer-Regel über **alle** Spielschreibpfade, z.B. echte Datenbanktransaktion statt bloß getItem/setItem-Vergleich. Der getestete in-memory-CAS/Busy-Guard beweist nicht die Browserimplementierung. Kompletten Zustand importieren/exportieren, fehlende neue Pflichtfelder nicht durch Bedarfsreset ersetzen. Historische unbekannte Einkaufskosten/Herkunft nicht nachträglich erfinden.

## Empfehlung für einen späteren Auftrag

**Kein produktiver Einbau ohne vorherige Entscheidung.** Der technisch einfachste Weg ist ein eigener öffentlicher Versorgungsaufruf, der vorhandene Handels-/FIFO-/Questbausteine mit expliziter Quote verbindet und insgesamt validiert/committet. Bestehenden normalen Handel ohne aktive öffentliche Abnahme unverändert lassen. Fairen Kurs als Transaktionsparameter führen, C nicht als Nullpreis-Verkauf tarnen. Ein gemeinsamer zentraler Bedarf, keine eigene Warenwirtschaft.

Zuerst Umfang/Frequenz/öffentliche Zahlung und den gewollten Preis-/Verfügbarkeitseffekt beschließen; ebenso Übermenge bei B und tatsächliche politische Gewichtung. Danach gegebenenfalls diesen isolierten Einzelmarktadapter in Richtung produktiver Speicher-/Abbruch-/Mehrfensterpfade absichern. Keine Ausdehnung auf andere Waren/Städte, keine autonome Wahl-/Rivalenentwicklung in diesem Auftrag begonnen.

## GitHub-Übergabe

Vorab-Code/Plan [6179fa1](https://github.com/psonnen-lgtm/Hansef-rst/commit/6179fa16df15c49afb80e550ba5c43874b0da5d9); Rohverläufe vor der Berichtserstellung in [108c642](https://github.com/psonnen-lgtm/Hansef-rst/commit/108c64231fa079641946f315f9bcbac4ae231e85) veröffentlicht. [Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/analysis/p12-public-grain) · [direkter Vergleich gegen development/v04-foundation](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...analysis/p12-public-grain?expand=1).

Drei Berichte, Bilanzauswertung und Index werden auf dem Analysebranch gesichert; tatsächliches PR-Ergebnis/Abschlusskontrollen nach Veröffentlichung ergänzen. Keine Zusammenführung oder Pages-Änderung, kein Folgeauftrag.
