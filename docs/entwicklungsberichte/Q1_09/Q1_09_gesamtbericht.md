# Q1.09 – Sicherheitsstand und begrenzter Abschluss

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


**Speicher- und Anwesenheitsschutz sind implementiert und in 44 gezielten VM-Prüfgruppen bestanden. Eine vollständige Q1.09-Abnahme liegt nicht vor:** Q-001 bleibt offen; echte Browser-/Geräteprüfung ist technisch blockiert. Der Branch dient der Prüfung und Entscheidung, wird nicht eigenständig zusammengeführt.

## Tatsächlicher Ausgang und vier Teile

Vor Änderungen GitHub neu geprüft/gefetcht: Entwicklungsbranch `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`. Q1.02/03/06 und separat veröffentlichte Q1.07 `354361e51360c7d57a9b619813114c15380f06ee` sowie Q1.08 `d6f0dbd118c9706b3a665e7ad29f5823741ef111` lesend berücksichtigt. Kein Konzeptbranch hineingemergt. Modell C ist konzeptionell gewählt, wird ausdrücklich nicht vorzeitig aktiviert.

|Teil|Tatsächlich erledigt|Abnahmestatus|
|---|---|---|
|A Bestandsprüfung|Schreiber/Stadtverbraucher und Import/Export geprüft; unveränderte Q1.02-Probe mit 8 Handelsfällen und 1 Fernvorsprache am Original wiederholt|Reproduktion bestanden, Fehler bestätigt|
|B Speicherung|Web Locks, Kandidatenkopie, Stale-Prüfung, ein finaler aktiver Write, Rollback, Original-/Import-/Vorersatzbackup, manueller Export und Wiederherstellung|Implementiert, VM getestet; native Browser-/Mehrfensterabnahme offen|
|C Personenort|Ansicht getrennt, tatsächliche Start-/Ankunftsbelege, kontrollierter unbekannter Altort, Guards für persönliche Politik, revisionsgebundene Fahrt|Implementiert, VM getestet; echte Geräte/knappe Altfristen/unbegleitete Fernfahrt offen|
|D Bewertung|8 native Handelsregressionen, W1/W2-Rechnung und enger Bauauftragsgegenfall|**Q-001 nicht behoben**; keine offene Sicherheitenregel aktiviert|

Originalprodukt vor Änderungen: `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA 256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. [Anfangsinventar](../../../tests/safety/q1_09/results/initial-inventory.json), [Plan/Referenzhashes](../../../tests/safety/q1_09/plan.json).

## Welche Sicherheitsprobleme sind tatsächlich abgesichert?

Alle regulären Spielaktionen passieren die gemeinsame exklusive Web-Lock-Grenze. Der gesamte geladene aktive Inhalt wird **innerhalb** dieser Sperre mit dem erwarteten Stand verglichen. Das ist kein ungeschützter Compare-and-Swap. Unter der Sperre entsteht eine validierte Kopie; erst ihr vollständiger Endstand wird gespeichert. Fehler davor setzen Geld, Waren, politische Belege, Person, Reisevorbereitung und Startentwurf zurück. Ohne verfügbare Sperre kein unsicherer Schreibfallback.

Ansicht eines entfernten eigenen Schiffs bleibt kostenlos möglich. Sie verschiebt die Person nicht. Qualifizierte politische Kandidaten und Vertragspartner werden am falschen persönlichen Ort abgewiesen; nach tatsächlicher Ankunft funktionieren die vorhandenen Handlungen. Keine Delegation oder neue Reiseautomatik eingebaut.

Alte V13-Daten werden auf Kopie übernommen. Geld/Schuld, Kosten, Warenursprung, Flotte, Lager, Ränge, Ämter, Urkunden, Siegel, Zusagen und Fristen bleiben erhalten. Ein unbekannter alter Personenort bleibt zunächst unbekannt. Die einmalige informierte Altverankerung ist keine historische Reise und erfüllt keine fehlende alte Vertragsstation.

## Was bleibt ausdrücklich offen?

**Q-001:** Neutraler Mischkreis erhöht weiterhin Buchwert/Kredit. Die aktive Bewertung wurde nicht eigenmächtig geändert. Zusätzlicher indirekter Verbraucher: Materialbuchwerte gehen in `shipyardWorth` ein. Ein bloßer Wechsel der Lager-/Ladungsbewertung löst diesen Bauwertpfad nicht. **Browser:** Kein realer Spielbrowser gestartet, Web Locks nur über kontrollierte API-Modellierung getestet. **Reisen:** Unbegleitete Fernreisebefehle mangels Regelentscheidung sicher abgelehnt; Fernansicht und Fernhandel bleiben. **Altfristen:** Keine automatische Verlängerung erfunden; knapp gewordene persönliche Altstationen brauchen gegebenenfalls gesonderte Schonungsentscheidung.

Die produktive Trennung des bisherigen Handels-/Ankunfts-/Spendenrufs ist Q1.10 vorbehalten. Isoliertes Entfernen könnte alte Ämterzugänge blockieren. Keine neue Gilde, Ratsherrkarriere, Szene, Aufnahmegebühr oder Modell-C-Formel. W1/W2 bleiben Varianten, keine beschlossene neue Wirtschaft.

## Konkrete Testergebnisse

- **44 Sicherheits-/Bestandsschutzgruppen:**12 Speicherung,15 Anwesenheit/Import/Titel,3 sonst qualifizierte Fernaktionen mit anschließender echter Ankunft,13 Rand-/Wiederherstellungs-/Regelidentitätsfälle,1 gekoppelte Reise mit Neubauabschluss. Alle am oben genannten Stand bestanden.
- **8 Handelsfälle:** Kassen/Teilverkäufe, gemischte Kosten, Lager, mehrere Schiffe und echte Gewinne/Verluste mechanisch erhalten. Bei neutralen Mischfällen bleiben die aktiven Sicherheiteninvarianten verletzt; das sind keine bestandenen Exploit-Schutztests.
- **2 Bauvergleichsfixtures:** Gleiche Kasse/physische Materialien, nach neutralem Holzhandel Bauwert+188/Kreditrahmen+85. Konkreter weiterer offener Q-001-Pfad.
- **Browserinstallation/Launch:** Chromium/WebKit fehlen; Download HTTP 403 „Domain forbidden“, beide Startversuche ohne ausführbare Datei. Keine UI-, nativen Zwei-Tab-, Safari-, Touch- oder echten iPhone/iPad/PC-Abnahmen behauptet.

[Prüfbericht/Befehle](Q1_09_regressionstests.md), [vollständige Endergebnisse](../../../tests/safety/q1_09/results/acceptance/storage.json), [Q-001-Diagnose](../../../tests/safety/q1_09/results/acceptance/valuation.json), [Bauwertgegenfall](../../../tests/safety/q1_09/results/acceptance/work-in-progress.json).

## Technische Grenzen für die Übernahme

Neue Top-Level-Aktionen sind asynchron; interne Schritte innerhalb einer Aktion bleiben synchron. Alte Testskripte mit unmittelbaren Bool-Erwartungen sind deshalb **nicht unverändert als neue Abnahme geeignet**. Sie wurden nicht fälschlich grün gerechnet. Der neue Harness wartet Aktionen ab und verwendet vorhandene historische Fixtures. Alte Skripte/Ergebnisdateien bleiben unverändert; vor einer breiteren Integration müssen weitere relevante Testtreiber angepasst und echte Browser geprüft werden.

Der Schutz gilt für kooperierende Clients derselben Origin/Schreibgrenze. Kein allgemeiner Schutz gegen externe JSON-Manipulation, DevTools oder komplettes Zurücksetzen einer Offline-Partie. Web Locks arbeiten lokal, kein Server/Cloudkontakt. Unterstützte sichere Browserkontexte erforderlich; nicht geeignete Datei-URLs/Browser bleiben lesbar und exportierbar, Änderungen brechen sicher ab.

## GitHub und Abschluss

[Code](https://github.com/psonnen-lgtm/Hansef-rst/blob/fix/q1-09-safety-foundation/Hansefuerst_0_4.html) · [Testordner](https://github.com/psonnen-lgtm/Hansef-rst/tree/fix/q1-09-safety-foundation/tests/safety/q1_09) · [Vergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...fix/q1-09-safety-foundation). Mehrere Teilcommits, getesteter Endstand `15c2e3792d855afcddf26ba0572d6317504d8b46`. Abschließende Datei-/GitHub-Rücklesebelege folgen im letzten Sicherungsabschnitt.

Keine Pages-/Dist-Aktualisierung, kein Merge, keine echte Nutzerdatei gelesen oder verändert. Alle Spielstände in Prüfungen synthetisch bzw. aus historischen Testendpunkten abgeleitet. Keine Großsimulation, neue Karriere oder Anschlussaufgabe. Vollständige Freigabe erst nach offenen Sachentscheidungen und Browserabnahme.


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
