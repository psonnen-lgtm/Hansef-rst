# P1.3 – Öffentlicher Getreidebedarf

**Empfehlung zur Entscheidung: Lübeck zunächst15–30 Fass je bestätigter Notlage, keine automatische Wiederholung allein nach Wartezeit.**60 Fass verzögern im kontrollierten Vergleich die Markterholung deutlich;90 bleiben ein historischer Referenzfall. Diese Mengen sind keine freigegebenen Spielwerte und keine Aussage, wie viele Menschen ein Fass ernährt.

Tatsächlich bearbeitet **28.10.2026, Europe/Berlin**. Die angeforderten Dateinamen behalten27.10. Produktives Spiel unverändert **0.8d.1b/V13**; nur isolierter Wirtschafts-/Regelprototyp für **Lübeck0/Getreide0**, keine Stimmen, Wahlen oder neuen Menüs.

[Marktbalance und Zahlen](2026-10-27_P13_marktbalance.md) · [Entscheidung, Tests und Übergabe](2026-10-27_P13_entscheidung.md) · [Analyseplan](../../tests/analysis/phaseP13/README.md).

## Herkunft und Stand

GitHub vor Beginn frisch geprüft: `development/v04-foundation` **`bfdc410059bdf935b110382a775410e30d1bef0e`**, erwarteter Merge von P1.2. Neuer Branch `analysis/p13-supply-market-balance`. Letzter tatsächlicher Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, HTML-SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Gelesene Grundlagen: [P1.2-Entscheidung](2026-10-27_P12_entscheidung.md), [P1.2-Wirtschaft](2026-10-27_P12_wirtschaftliche_auswirkungen.md), [P1.2-Adapter](2026-10-27_P12_getreideversorgung.md), [P1.1-Stadtversorgung](2026-10-27_P11_stadtversorgung.md), [P1.1-Entscheidung](2026-10-27_P11_entscheidung.md) und [P1-Einwohner](2026-10-27_P1_einwohner_waehler.md). Diese Quellen/Ergebnisse bleiben unverändert.

Vorabcode veröffentlicht in **`39bc6fb7cd8990d92c1acef7a07ec9b92234257a`**; korrigierte, tatsächlich mit elf abgeschlossenen Verläufen geprüfte Fassung **`69e41bc4f630c52e223bab8c42b3df5e4d66698c`**. Vollständige Rohdaten anschließend in **`ce835b064a4fc2ea64bdc5a26ab9a445611021b4`** veröffentlicht. Fehler/Abweichungen vom ursprünglichen Plan stehen offen im Entscheidungsbericht.

## Was hier „Bedarf“ bedeutet

Eine **kleine, einmalige öffentliche Zusatzabnahme** bei beobachteter Knappheit. Sie geht endgültig an Bürger, wird nicht erneut handelbar und erzeugt keinen zweiten vollständigen Bevölkerungsmarkt. Einwohner verbrauchen nicht zusätzlich jeden Tag automatisch neue Getreidemengen.

Ein gedeckter öffentlicher Bedarf ist **kein aufgefüllter freier Markt**. Wenn15 vorhandene Fass vollständig öffentlich übernommen werden, bleibt ein vorheriger Marktbestand20 unmittelbar20. Wenn90 Fass geliefert und nur15 öffentlich übernommen werden, bleiben75 frei verkauft: Markt20+90−15=95. Diesen Unterschied muss eine spätere Anzeige verständlich erklären.

Die P1-Bevölkerungswerte sind Vorschlagsparameter, keine historischen Statistiken. Lübeck25.000 Einwohner begründet eine begrenzte Aktionsgröße, aber keine frei erfundene „Fass pro Einwohner und Tag“-Rechnung. Die elf produktiven Märkte sind bisher nicht auf proportionalen Bevölkerungskonsum ausgelegt.

## Gemeinsamer Kern für genau zwei Regelvarianten

Alle nachfolgenden Zahlen sind **unbeschlossene Kalibrierungsvorschläge**. [Rechenkern](../../tests/analysis/phaseP13/rules.cjs), [neun reine Rechengruppen](../../tests/analysis/phaseP13/results/math-attempt1.json).

| Faktor | Vorgeschlagene Behandlung |
|---|---|
| Stadtgröße | Nicht proportional: bis10.000 Einwohner höchstens15 Fass, bis30.000 höchstens30, darüber45. Für Lübeck also30. Andere Städte nicht dynamisch geprüft.60 nur experimenteller Belastungsvergleich. |
| Tatsächliche Knappheit | Zwei aufeinanderfolgende reguläre Tagesbeobachtungen, jeweils bereinigter Bestand≤40. Keine Erteilung beim Öffnen einer Ansicht. Preis allein genügt nicht. |
| Stärke der Knappheit | Beide bereinigten Werte≤20: Einwohnerstaffel; bei20–40 höchstens15. Kleinste tatsächliche Lücke und verbleibendes Budget begrenzen zusätzlich. |
| Normale Marktversorgung | Bestehende Referenz110 und unveränderte natürliche Erholung verwenden. Kein eigener Produktionsbonus, keine geänderte Preisformel. |
| Eigene Marktentnahmen | Besitzerweite offene Entnahmesalden aller Schiffe/Lager erfassen; auch für künftige NPC dieselbe Regel. Rückgabe zuerst zur Wiederherstellung, erst echte zusätzliche fremde Ware anerkennen. |
| Bereits öffentlich verbraucht | Öffentliche Mengen seit der letzten bestätigten freien Markterholung zur Knappheitskorrektur addieren. Eigene Abnahme darf nicht selbst zur nächsten „neuen“ Krise werden. Kein Jahresreset. |
| Restbedarf | Ein offener gemeinsamer Rest je Stadt/Ware. Keine eigenen Quoten je Schiff, Kandidat, A/B/C oder Klick. Rest>0 blockiert neue Erteilung auch nach Jahreswechsel. |
| Wiederholabstand | Frühestens90 Tage nach letzter tatsächlicher Erfüllung, nicht bloß nach früher Auftragserteilung. |
| Mengen-/Häufigkeitsgrenze | Höchstens zwei Hilfsaktionen und insgesamt60 **reservierte** Fass in gleitenden360 Tagen. Keine frischen60 allein an Neujahr. |
| Frist | Je Bedarf90 Tage als Vorschlag. Ablaufen/Laden verlängert nicht und erzeugt keinen frischen Bedarfstopf. Offenen abgelaufenen Rest fachlich weiterbehandeln; noch keine produktive Verlängerungsregel implementiert. |

Bereinigung für jede aktuelle Beobachtung:

`C = freier Marktbestand + Summe offener lokaler Entnahmeschulden + öffentliche Verbrauchsmenge seit bestätigter Erholung`.

`q = min(Einwohnerstaffel beziehungsweise15 bei milder Knappheit, 110−max(C1,C2), verbleibendes360-Tage-Mengenbudget)`.

Nur bei erfüllten Auslöse-/Abstandsbedingungen und q>0. Zwei echte reguläre Beobachtungen mit **freiem** Bestand≥90 bestätigen Erholung; erst dann wird der Korrekturposten früherer öffentlicher Abnahme für spätere Notlagen beendet. Beleggeschichte, tatsächlicher Gesamtverbrauch und eigene Entnahmeschulden bleiben erhalten. Gekappte/extrem veränderte Märkte und spielerverursachte Sonderereignisse dürfen nicht unbesehen als normale Erholung gelten.

### Variante1 – Erst Erholung, dann neue Notlage (empfohlen)

Nach einer Hilfe zusätzlich zwei freie Bestandsbeobachtungen≥90 verlangen; anschließend muss eine **erneute** korrigierte Knappheit bestätigt werden. Das verhindert das bloße Umbenennen derselben dauerhaft niedrigen Marktlage. Auch eine lange Wartefrist ohne Erholung reicht nicht.

Vorteil: einfach erklärbar, begrenzte Zusatzentnahme und besonders vorsichtiger Schutz vor Serienbelegen. Nachteil: Eine chronisch importabhängige Stadt könnte lange keine weitere öffentliche Anerkennung ausgeben. Normaler Handel und Wiederauffüllung bleiben möglich; es entsteht kein Verbot weiterer Getreidelieferungen.

### Variante2 – Begrenzte chronische Fortschreibung

Gleiche Voraussetzungen/Mengenbudget, aber keine zwingende Erholung vor einer zweiten Aktion. Stattdessen muss selbst **nach Addition früherer öffentlicher Abnahme** weiterhin echte korrigierte Knappheit bestehen. Rechenbeispiel nach30 verbrauchten Fass: Markt20+30=50 → kein neuer Bedarf; Markt5+30=35 → frühestens nach90 Tagen höchstens15 weitere Fass, sofern Jahresbudget frei. Nie automatisch wieder30 nur wegen Zeitablauf.

Vorteil: kann eine zusätzliche schwere Versorgungslücke berücksichtigen. Nachteil: Kausale Korrektur ist nur konservativer Saldo, kein exakter Markt ohne Spieler; chronische Sonderfälle und wirtschaftliche Wiederholwirkung sind nicht integriert abgesichert. Deshalb zunächst nicht bevorzugt.

## Warum eine reine Wartefrist scheitert

Die ausdrücklich **unsichere Negativkontrolle**10 erteilt15 Fass an Tag1,31 und61 ohne erneuten Knappheitsnachweis. Zweite/dritte Erteilung erfolgen bei86/97 freien Fass. Trotzdem entstehen drei endgültige Belege über45 Fass. Die echte Knappheitsprüfung hätte dort verweigert. Kein Wahltermin und kein Kalenderdatum verwandelt diese Bestände in Notlagen.

Diese Gegenprobe ist keine dritte empfohlene Variante. Sie hält nicht den maximal90-Tage-Abstand der empfohlenen Regeln ein und dient gerade dem Nachweis, warum eine bloße Kalenderfreigabe unzureichend ist. Alle Waren/Zahlungen sind dennoch real bilanziert, nicht erfunden.

## Herkunft, Lieferanten und Missbrauch

P1.2-Handelsadapter als neue isolierte Kopie weiterverwendet: native V13-Verkäufe/FIFO, freiwilliger Preisnachlass nur in privater Transaktionskopie, C echte endgültige Ladungsentnahme ohne Verkauf. Nur historische abgeschlossene Bedarfe/IDs wurden für die wiederkehrende Negativkontrolle ergänzt. Entnahmeschuld und Lieferkennungen gehen beim Wechsel nicht verloren. **Automatische Bedarfsregel separat mathematisch geprüft, nicht produktiv mit allen V13-Schreibpfaden integriert.**

Tatsächliche Probe11: Markt110, Kauf80→30, Umladen durch Lager und zweites Schiff, Jahreswechsel1350/359→1351/1. Schuld80 bleibt; falscher Bedarf vor und nach Jahreswechsel verweigert. Rückverkauf stellt freien Markt115 her, Gold wieder10.000, eigene Gesamtware wieder60, neue Versorgungsanerkennung0. **Altes globales V13-Ansehen steigt trotzdem um2 durch unveränderte gewichtete Kosten.** Kein allgemeiner politischer Exploitschutz behauptet; alte Punkte dürfen künftig nicht automatisch in neue Stimmen umgerechnet werden.

Probe12: drei Lieferteile zu10 teilen denselben30er-Bedarf, keine weitere offene Quote. Probe10: Wiederanzeigen einer alten ID nach Bedarfwechsel ist reines Replay, keine neue Zahlung/Entnahme; Archiv und Gesamtverbrauch bleiben im Analyseexport erhalten. Das sind begrenzte technische Nachweise.

Lieferung kurz vor einer Wahl: Die historische P1.2-Probe10 enthält tatsächliche Lieferung an Tag359 und endgültige Abnahme; ihr Ergebnis wird hier nur gelesen. P1.3 prüft Datums-/Jahresgrenzen zusätzlich rechnerisch, führt jedoch keine neue Wahl oder neue Wahlgrenzen-Lieferung aus. Endgültige Hilfe hängt nicht vom Wahltermin ab; daraus folgt noch kein getesteter Schutz einer produktiven Wahlengine.

Verschiedene Lieferanten sind **nur mathematisch** geprüft: Ein gemeinsamer30er-Topf nimmt von20+20 angebotenen Fass20+10 an. Keine echten Rivalen mit Beschaffung/Transport/Finanzierung implementiert. Spätere Rivalen müssen echte bezahlte Herkunftsware liefern, dieselben Besitzer-/Quoten-/ID-Regeln nutzen und alle in denselben Bedarfstopf buchen. Kooperation/Kollusion verschiedener Eigentümer, alle Sondermarktänderer und echte Mehrfenstertransaktionen bleiben offen.

## Spätere einfache Anzeige – nur Skizze

> Lübeck benötigt30 Fass Getreide für seine Bürger. Geliefert10 · noch20 · Frist: [Spieltag/Jahr]. Normaler Ankauf heute30 Gold/Fass. Du kannst normal verkaufen, freiwillig einen niedrigeren Preis wählen oder Ware spenden. Deine endgültig anerkannte Hilfe:10 Fass. Öffentlich abgenommene Ware steht anschließend nicht am freien Markt.

Ausführungskurs und echter Verzicht müssen vor Bestätigung sichtbar sein. B gilt nur für ausgewählte öffentliche Menge; der hier getrennt verkaufte Marktüberhang behält den normalen Kurs. Herkunft/Entnahmeschuld und unbekannte historische Kosten offen erklären. Keine feste Stimmenzahl versprechen; politische Gewichtung bleibt offen. Kein Menü und keine Grafik gebaut.
