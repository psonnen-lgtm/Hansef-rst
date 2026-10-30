# Q1.09c – Tatsächlich ausgeführte Regressionen

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

## Maßgeblicher Endstand

Nur `tests/safety/q1_09c/results/final-acceptance/` ist die abschließende gemeinsame Auswertung. Frühere Ordner `final`, `accepted`, `release` sind erhaltene **Zwischenstände, keine Integrationsfreigaben**. Jede neue Produktkorrektur wurde vor den relevanten Prüfungen committed. Der abschließende gemeinsame Spielcode ist die oben genannte vollständige Commit-ID; nachfolgende Berichts-/Belegcommits ändern diesen Spielcode nicht.

|Prüfung|Bestanden|Quelle im maßgeblichen Ordner|
|---|---:|---|
|Historische native Handelsfälle|8|`valuation.json`|
|Natives Baugegenpaar|2 Fixtures|`construction.json`|
|Reisen/Risiken/Anwesenheit|10 Gruppen|`travel.json`|
|Altfristen/Übernahme|14 Gruppen|`grace.json`|
|Speichersicherheit|12 Gruppen|`storage.json`|
|W1-S-Verbraucher und unveränderte Formeln|7 Gruppen|`economic.json`|
|Erhaltene alte Basisaussagen|19|`basic.json`|
|Kein Risikoneuwurf nach Schreibfehler|1|`risk.json`|
|Frühe M2-Personenkompatibilität|1|`person.json`|
|Gemeinsame Uhr/Ankunft/Bau/Ablauf|1|`clock-integration.json`|
|Native Chromium-Abnahme|31 Gruppen|`browser.json`|

**106 gezielte Fälle/Prüfgruppen bestanden.** Sechs zusätzliche Ausführungen der zwei kritischen Mehrfensterfälle in drei parallelen Wiederholungsrunden bestanden; keine zusätzlichen unabhängigen Strategieläufe. Ein Datei-URL-Fall blockiert, nicht bestanden. Politischer Ansehensrestpfad als **KNOWN_OPEN**, kein grüner Schutztest.

VM bedeutet: tatsächliche Spielregeln aus der Root-HTML, kontrollierte DOM-/Web-Lock-/IndexedDB-Modelle. Der neue Harness benennt den kanonischen Datensatz getrennt von den alten LocalStorage-Quellen. Die31 Browsergruppen verwenden echte Chromium-/IndexedDB-/Datei-/Web-Lock-APIs; kontrollierte Fehler sind ausgewiesen. Keine echten Apple-Geräte.

## Befehle

Alle Aufrufe aus dem Repositorystamm; Ergebnisse/Logs jeweils unter neuen Namen.

```sh
node tests/safety/q1_09c/valuation-checks.cjs tests/safety/q1_09c/results/final-acceptance/valuation.json
node tests/safety/q1_09c/work-in-progress-check.cjs tests/safety/q1_09c/results/final-acceptance/construction.json
node tests/safety/q1_09c/travel-checks.cjs tests/safety/q1_09c/results/final-acceptance/travel.json
node tests/safety/q1_09c/grace-checks.cjs tests/safety/q1_09c/results/final-acceptance/grace.json
node tests/safety/q1_09c/storage-checks.cjs tests/safety/q1_09c/results/final-acceptance/storage.json
node tests/safety/q1_09c/economic-checks.cjs tests/safety/q1_09c/results/final-acceptance/economic.json
node tests/safety/q1_09c/basic-checks.cjs tests/safety/q1_09c/results/final-acceptance/basic.json
node tests/safety/q1_09c/risk-retry-check.cjs tests/safety/q1_09c/results/final-acceptance/risk.json
node tests/safety/q1_09c/person-compatibility-check.cjs tests/safety/q1_09c/results/final-acceptance/person.json
node tests/safety/q1_09c/clock-integration-check.cjs tests/safety/q1_09c/results/final-acceptance/clock-integration.json
node tests/safety/q1_09c/browser-checks.cjs tests/safety/q1_09c/results/final-acceptance/browser.json
```

Gezielte Wiederholungen über `Q109C_ONLY='two native tabs queue|real import queued'`; Dateien `concurrency-1/2/3.json`. Die Restpfad-Diagnose liest die bereits ausgeführten Handelsdaten und die native Unterstützungsformel; kein erneutes Handeln. [Matrix](../../../tests/safety/q1_09c/test-matrix.csv), [Zusammenstellung](../../../tests/safety/q1_09c/acceptance-summary.json).

## Fehler und Korrekturen aufbewahrt

Die Commit-Sichtbarkeit wurde zusätzlich mit einem verzögerten tatsächlichen Schreibaufruf geprüft: keine visuelle Risikovorschau während noch unbestätigter Speicherung. Es wird kein tatsächlich durchgeführter Vor-Commit-Neuladeexploit gegen eine Altversion behauptet.

- Historischer neutraler Kredit-/Baufehler vor aktiver W1-S-Korrektur durch vorhandene Q1.09-Daten belegt; anschließend ausdrücklich erneut ausgeführt, neue Sicherheitswerte geprüft.
- Native LocalStorage-Methode: zwei abweichende Mehrfensterprüfungen und erneut ein verlorener Spielzug bei verzögertem Import. Erfolgreiche Zwischenwiederholungen wurden **nicht** als Entwarnung gewertet. Nach reproduzierter Überschreibung Wechsel zu genau einem atomaren IndexedDB-Datensatz; danach alle31 nativen Gruppen und drei zusätzliche Wiederholungsrunden bestanden. Rawdaten unter `final/`, `concurrency-diagnostic*`, `concurrency-repeat-*` erhalten.
- Ein Browserprüfer wartete bei identischem kanonischem Reimport fälschlich auf eine neue Revision. Identischer Zustand soll nicht neu geschrieben werden. Stattdessen tatsächliche Importbestätigung und unveränderte gespeicherte Bytes geprüft; keine Aussage abgeschwächt.
- IDB-VM-Umstellung: eine alte Assertion las direkt aus der LocalStorage-Fixture statt dem neuen kanonischen Datensatz. Prüfung auf tatsächliche kanonische API umgestellt; erwartete Einmaligkeit unverändert. Fehlversuch unter `idb-review/storage.*` erhalten.
- Fehlgeschlagener Reisecommit würfelte beim Neuversuch erneut: `risk-retry-before.*` rot, nach verborgener Wiederverwendung grün.
- Fehlendes optionales M2-Tracking verwarf gültigen Personenort: `person-compatibility-before.*` rot, Endprüfung grün.
- Schnellere entfernte Rückfahrt konnte Schonung zu groß machen: `remote-fleet-grace-before.*` rot; unklarer Flottenwechsel wird nun konservativ ausgeschlossen, Endprüfung grün.

Keine alten Assertions oder historischen Ergebnisdateien entfernt/geändert. Die19 Basisaussagen werden in einem getrennten asynchronen Treiber mit der neuen Speicherschnittstelle ausgeführt. Die alte18er-Phase-1-Suite wurde nicht blind erneut gestartet: ihre Aussage „unrealisierter Kursanstieg verändert Kredit nie“ widerspricht jetzt der ausdrücklich freigegebenen W1-S-Regel. Alte Quellen bleiben unverändert; die neuen aktiven Prüfungen testen die genehmigte Bedeutung.

Die44/74 alten Gruppen sind Referenzen mit ursprünglichen Grenzen, keine behauptete aktuelle Vollausführung. Keine komplette Wirtschafts-/Karrieresimulation, keine menschlichen Spielstunden aus Spieltagen abgeleitet. Testlaufdateien sind synthetische oder abgeleitete historische Kopien.

Aktueller Basistestaufruf ist der oben genannte getrennte Q1.09c-Treiber. Alte direkte Einstiegspunkte wie `node tests/test-v04.cjs` und historische Simulatorpfade bleiben Referenzen ihrer früheren VM-/LocalStorage-Schnittstelle; sie sind keine freigegebene Q1.09c-Neuabnahme.
