# Q1.09 – Durchgeführte Prüfungen und echte Grenzen

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


## Tatsächlich geprüfter Stand

Alle Ergebnisse unter `tests/safety/q1_09/results/acceptance/` nennen denselben vor Ausführung veröffentlichten Commit **`15c2e3792d855afcddf26ba0572d6317504d8b46`** und Produkthash **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Quellcode zuerst gesichert, danach Befehle ausgeführt. Keine selbstreferenzielle Testcommit-ID.

|Skript|Umfang|Ergebnis und Grenze|
|---|---:|---|
|`storage-checks.cjs`|12 Gruppen|Bestanden: alte Kopie, einmaliger Commit, Stale/Quota/Backup/Export/Reload. Zwei VM-Kontexte mit gemeinsamer Lock-API, keine nativen Tabs|
|`presence-checks.cjs`|15 Gruppen|Bestanden: echter Start, Altanker, Fernsicht, reale Fahrt/Rückkehr, alte Stationen, Konvoi, Titel/Ämter, manuelle Übertragung, alter Leser|
|`qualified-audiences.cjs`|3 Gruppen|Bestanden: ansonsten qualifizierte Bürgermeister-/Siegel-/Hanseaktionen am falschen Ort abgewiesen und nach tatsächlicher Ankunft erlaubt|
|`edge-checks.cjs`|13 Gruppen|Bestanden: native Formeln/Konstanten, AltV 11, unbekannte Historie, Nachcommitfehler, M2-Wiederimport, null neue Übernahme-RNG-Ziehungen, volle Backupplätze, Downloadbytes, defekte/neue Revisionen, verweigerter Speicher, tatsächlicher Opt-in-Logger, Erstimport leeres Gerät|
|`cross-arrival-check.cjs`|1 Integration|Bestanden: teilnehmendes Schiff/Person am Ziel, während Neubau im richtigen Bauhafen bleibt|
|`valuation-checks.cjs`|8 Handelsfälle|Mechanik erhalten; **aktive Q-001-Invarianten weiterhin verletzt**, nicht als Exploit-Schutz bestanden|
|`work-in-progress-check.cjs`|2 gepaarte Baufixtures|Gegenfall+188 Wert/+85 Kredit nach neutraler Holzrunde bei gleicher Kasse bestätigt; Q-001 offen|

**44 Sicherheits-/Bestandsschutzgruppen bestanden**, zusätzlich getrennte Handels-/Offenfehlerdiagnosen. Die Nummer 44 ist keine Behauptung, alle früheren geplanten Q1.03-/Q1.06-/Q1.08-Fälle seien implementiert oder bestanden. Gilde, neue Karriere, Modell C und politische Szenen bleiben unimplementiert.

## Befehle

Jeweils `node tests/safety/q1_09/<skript> tests/safety/q1_09/results/acceptance/<datei>.json`, vollständiges Log neben dem JSON. Konkret: `storage-checks.cjs`, `presence-checks.cjs`, `qualified-audiences.cjs`, `edge-checks.cjs`, `cross-arrival-check.cjs`, `valuation-checks.cjs`, `work-in-progress-check.cjs`.

Vor Änderungen: bytegleich kopierte `historical-probe.cjs` aus Q1.02 mit Argumenten `Hansefuerst_0_4.html` und `results/A-historical-reproduction.json`, auf altem Hash festgelegt.8 Handels-/1 politische Gegenprobe bestätigt. Dieses Skript ist deshalb **nicht** für den neuen Produkthash freigeschaltet oder abgeschwächt. Eine spätere freiwillige Reproduktion benötigt die Originaldatei aus dem Basiscommit, nicht die neue Datei.

Syntax: extrahiertes aktuelles HTML-JavaScript mit `node --check /tmp/q109-script.js`; Sicherheitsblock ebenfalls mit `node --check` geprüft. Statische Endkontrolle und GitHub-Rücklesen werden getrennt dokumentiert.

## Bestehensbedingungen je Mindestbereich

|Bereich|Konkrete Bedingung|Nachweis|
|---|---|---|
|Handel|Geld/Mengen nach neutralem Kreis unverändert; echte Gewinne/Verluste erhalten|8 tatsächliche native kleine Fälle; Finanzmechanik erhalten|
|Sicherheiten|Neutraler Kreis darf aktive Sicherheit nicht erhöhen|**Nicht bestanden**; Q-001 aktiv und indirekt über Bauwert offen|
|Kosten/Teilverkäufe/Lager/mehrere Schiffe|Bestehende Einstands-/Herkunftslogik unverändert und gültige Bestände|Native Fälle plus Quellkörper/Konstantenvergleich|
|Kredit/Schuld/Zins|Legaler Kredit und Bankoperation, native Zinsen, keine Halbspeicherung|Echte kleine VM-Aktionen; keine neue Kreditbewertung|
|Person/Fernsicht|Ansicht bewegt weder Person noch Schiffe/Geld/Tage; falsche persönliche Aktion unverändert abweisen|Direkte VM-Gegenproben, qualifizierte Fälle und tatsächliche Ankunft|
|Ankunft|Geld, Tage, Schäden, Teilnehmer und Person gemeinsam gespeichert oder gar nicht|Quota-Rollback, veraltete Vorbereitung, Konvoi/Neubauintegration|
|Mehrfenster|Unter gemeinsamer exklusiver Grenze genau ein Schreiber, Stale-Zustand abweisen|Kontrollierte Lock-Queue zweier VM-Kontexte; native Browserabnahme fehlt|
|Import/Export|Vollständiger konsistenter Export, exakte Originalbytes, Bestätigung/Backup vor Ersatz|FileReader/Blob/DOM-Modelle und echter alter Validator in VM|
|Kapazität/Unterbrechung|Quota/Backupfehler vorher keine Änderung, Beobachterfehler nach Commit keine falsche Rücknahme|Fehlerinjektion und 100 belegte Backupslots; kein echter Prozessabbruch|
|Bestandsschutz|Alte Felder/Ränge/Ämter/Belege bleiben, unbekannte Daten nicht erfinden|Synthetische V13 plus abgeleitete historische Endpunkte; keine echten Spielerdateien|

## Nicht ausgeführt / nicht als bestanden ausgegeben

- Kein reales Chromium-/WebKit-Spiel geöffnet. Beide Engines fehlen. Ein Installationsversuch wurde durch HTTP 403 „Domain forbidden“ blockiert; tatsächliche Launchversuche dokumentieren fehlende ausführbare Dateien.
- Keine realen nativen Web Locks, zwei Browserfenster, Safari-/iOS-Quota-/Dateiübertragung, Touchbedienung, iPhone/iPad/PC-Geräteprüfung oder Offline-Browserabnahme.
- Keine große Wirtschafts-/Karrieresimulation oder Wiederholung historischer 1.500er/2.250er-Reihen. Keine menschliche aktive Zeit/90-Stunden-Aussage.
- Historische synchrone Testtreiber nicht unverändert am neuen asynchronen API ausgeführt. Andernfalls könnten Promises statt Bool-Ergebnissen falsche grüne Tests ergeben. Keine wichtigen Schutzprüfungen als bestanden ausgegeben oder gelöscht.

## Aufbewahrte Fehlanläufe und Korrekturen

1. Git-Quellpuffer 32MiB kleiner als das HTML mit eingebetteten Bildern: Harness auf 128MiB korrigiert, kein Produktfehler.
2. Synthetisches Lager ohne Pflicht-`bookCosts`: Fixture vervollständigt und vom ursprünglichen Validator bestätigt; keine Schutzbedingung abgeschwächt.
3. Zusätzliche Kalenderfixture war durch manuelles Datum mit Handelsbriefplan inkonsistent: auf dem konsistenten Ausgangskalender belassen. Der anschließende gekoppelte Ankunftstest bestand; keine spekulative Reisekorrektur nötig.
4. Frühere kleine Zwischenprüfungen bleiben separat gespeichert; nach tatsächlichen Quelländerungen erfolgten gezielte Wiederholungen. Maßgeblich ist der oben genannte Endstand mit einheitlichem Hash.

Logs/JSON mit Fehlern bleiben im neuen Ordner erhalten. Alte historische Ergebnisdateien unverändert. Quellhash-/Datei-/Link-/GitHub-Prüfung am Ende separat; keine Spielpartie dafür nötig.


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
