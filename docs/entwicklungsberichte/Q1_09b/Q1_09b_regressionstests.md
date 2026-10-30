# Q1.09b – Ausgeführte Tests und ehrliche Grenzen

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

## Getrennte Ergebnisgruppen

|Gruppe|Ergebnis|Beleg|
|---|---|---|
|Q1.09-VM-Sicherheit|44 bestanden, hier nur übernommen|[Quellenhashes](../../../tests/safety/q1_09b/inherited-evidence.json)|
|Q1.09-Handel/Baupaar|8 Handelsfälle/2 Bau-Fixtures übernommen; Q001 weiterhin verletzt|[Historische Bewertung](../../../tests/safety/q1_09/results/acceptance/valuation.json)|
|Neue native Chromium-Gruppen|19 bestanden,1 Datei-URL-Gruppe blockiert|[Überprüfte Auswahl](../../../tests/safety/q1_09b/results/browser-acceptance.json)|
|Alter Basistreiber|19 bestanden|[Basis](../../../tests/safety/q1_09b/results/legacy-basic-review3.json)|
|Alter Phase-1-Treiber|18 bestanden|[Phase1](../../../tests/safety/q1_09b/results/legacy-phase1-review2.json)|
|Isolierte Vorschläge|17 bestanden;10 Bewertung,2 Reiseangebot,5 Altvertrag|[Vorschläge](../../../tests/safety/q1_09b/results/proposals-attempt1.json)|
|Synchroner Treiber|Aktueller asynchroner Code verweigert; historischer Override lesbar|[Beleg](../../../tests/safety/q1_09b/results/driver-fail-closed.json)|

Insgesamt74 neu bestandene gezielte Gruppen;44 historische Gruppen getrennt, nicht als neue Ausführung gezählt. Keine großflächige Wirtschafts-/Karrieresimulation. Die vorhandene kleine Jahreszinsprüfung enthält360 Tagesfortschreibungen in einer kontrollierten Fixture; das ist kein neuer Wirtschaftsvergleich mit Strategien/Seeds.

## Tatsächliche Befehle und Quellenstände

Alle Befehle im Repositorystamm, Ergebnisse jeweils unter neuem Namen, niemals historische Dateien überschrieben.

```sh
node tests/safety/q1_09b/browser-checks.cjs tests/safety/q1_09b/results/browser-attempt1.json
Q109B_ONLY='native boot|real FileReader|missing Web|denied canonical|local file|viewport|loaded page offline' node tests/safety/q1_09b/browser-checks.cjs tests/safety/q1_09b/results/browser-review2/checks.json
Q109B_ONLY='native title|native corrupt' node tests/safety/q1_09b/browser-checks.cjs tests/safety/q1_09b/results/browser-extra.json
node tests/safety/q1_09b/proposal-checks.cjs tests/safety/q1_09b/results/proposals-attempt1.json
node tests/test-v04.cjs tests/safety/q1_09b/results/legacy-basic-review3.json
node tests/phase1.cjs tests/safety/q1_09b/results/legacy-phase1-review2.json
```

Browser Erstlauf: `7e53fb9`; gezielte Nachprüfung: `ea0595f`; Zusatzfälle/Vorschläge: `cef6ba0`; Phase1/Synchronsperre: `0ec09b8`; gültiger Basislauf: `8f18c85`. Vollständige Commit-IDs jeweils in JSON. Tatsächlich ausgeführter Spielcode durchgehend `15c2e3792d855afcddf26ba0572d6317504d8b46`; kein angeblich selbstreferenzieller Abschlusscommit.

## Anpassung alter Treiber, ohne weichere Aussagen

`tests/test-v04.cjs` und `tests/phase1.cjs` behalten alle19 bzw.18 Namen und Prüfaussagen. Der enge neue Adapter [async-driver.cjs](../../../tests/safety/q1_09b/async-driver.cjs) wartet tatsächliche native Aktionen ab. Ein Promise wird nie als boolescher Erfolg gewertet. Root-HTML und vorhandene Q1.09-Funktion werden ausgeführt, keine zweite Handelsimplementierung.

Fixtures sind ausdrücklich Testvorbereitung: alte `fresh`-Partien werden ohne nachträglich erfundene Startfelder mit tatsächlichem Test-Startort versehen; manuell vorgegebene Reisen erhalten die notwendige Sicherheitsrevision. Reiseereignisse bleiben bei kontrollierten expliziten Trips wie vorgegeben, sonst native Zufallslogik. Direkt geänderte Ausgangsdaten werden vor der nativen Reiseplanung konsistent gespeichert; die echte Revisionsprüfung bleibt unverändert. Der vorher vom geteilten Testzustand abhängige Fernladefall erhält eine ausdrückliche gleichwertige Flottenvorbedingung. Keine Assertions entfernt.

Der historische `tests/simulation/headless.cjs` besitzt keinen asynchronen Web-Lock-Treiber. Er bricht nun beim Erkennen von Q1.09-Code klar ab, statt nicht ausgeführte Aktionen still zu akzeptieren. Alte explizite HTML-Overrides funktionieren. Ohne `HANSE_GAME` bevorzugt er weiterhin eine vorhandene Dist-Datei; solche Ergebnisse sind **keine Root-Abnahme**.

[Statische Treiberinventur](../../../tests/safety/q1_09b/test-driver-inventory.json):65 Kandidaten mit mutierenden Aktionsnamen. Das ist eine Suchliste, keine Behauptung65 konkret fehlgeschlagener Tests. Viele enthalten historische HTML-Vergleiche, alte Versions-/Speicheraussagen oder ganze Strategieläufe. Nur die beiden Basistreiber wurden vollständig angepasst; übrige aktuelle Root-Ausführungen mit synchronem gemeinsamen Treiber werden sicher abgewiesen. Ein vollständiger Umbau aller Simulatoren/Strategien war hier nicht Teil der begrenzten Sicherheitsrunde. Keine alten Vollsimulationen gestartet oder als grün gemeldet.

## Fehlversuche aufbewahrt

- Browser1: zeitabhängig neu erzeugte Schiffs-IDs in Erwartungsdateien; fehlendes Abwarten des asynchronen Dialogschließens. Nur Treiber korrigiert, nicht Produkt oder Assertion.
- Browser2: alle ausgewählten ausführbaren Gruppen bestehen; `file://` ist durch Administratorrichtlinie blockiert. Die Rohzeile „PASS“ dieses abgefangenen Blocks wird in der Abschlussmatrix korrekt BLOCKED_NOT_TESTED gewertet.
- Basis/Phase1 Versuch1: neue Startmetadaten machten künstlich zurückgestufte V3/V10-Fixtures ungültig. Historisch passende Fixture ohne neue Startmetadaten eingesetzt.
- Basis Versuch2: die Fixture wurde unmittelbar vor Planung geändert; Planung speicherte daher eine neue Revision und die Ankunft wurde korrekt als veraltet abgewiesen. Fixture vor Planung speichern, echte Schutzprüfung erhalten. Versuch3:19/19 bestehen.
- Phase1 Versuch2:18/18 bestehen. Ein erneuter voller Lauf nach der späteren reinen Fixture-Planungsergänzung wurde vermieden; der gültige Ergebnisstand und sein Adaptercommit sind explizit belegt. Der neue Planungspfad ist durch den19er-Basislauf geprüft.

Beim abschließenden Staging meldete `git diff --cached --check` CRLF-Zeilenenden der neuen CSV als Leerraumfehler. Matrix auf LF normalisiert und die statische Prüfung um den gestagten Diff ergänzt; keine Testaussage geändert.

Alle JSON-/Logdateien einschließlich Fehlern bleiben erhalten. Keine historischen Ergebnisdateien angepasst. Große Prüfungen, native aktive W1-S-Regeln, aktive unbegleitete Reisen und aktive Schonungsmigration **nicht durchgeführt**.

## Noch fehlende Abnahme

Safari/WebKit, echte iPhone/iPad-Geräte, Offline-Kaltstart, physische Quota/OS-Abbrüche; alle nicht aktivierten Regelvarianten; übrige asynchrone Strategietreiber. [Manueller Browserplan](Q1_09b_browserabnahme.md). Kein grünes Gesamturteil trotz gezielt bestandener Prüfungen.
