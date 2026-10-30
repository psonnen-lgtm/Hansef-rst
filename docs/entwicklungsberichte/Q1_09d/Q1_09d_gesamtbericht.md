# Q1.09d – Geschützte iPhone-/iPad-Abnahme vorbereitet

30.10.2026 · Europe/Berlin · Branch `test/q1-09d-ios-acceptance-preparation`.
Ausgangspunkt und vor Beginn von GitHub bestätigt: **`be3f367ac1374cf6ca3525e34be44d51f0eaf24b`** auf `fix/q1-09c-safety-finalization`.
Tatsächlich bereits in Q1.09c getesteter, hier **unveränderter** Spielcode: **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**. HTML-SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**, 46.389.124 Bytes. Anzeige 0.8d.1b; Speicher V13 / Politik2 / Sicherheit3.

## Ergebnis

Die Vorbereitung ist vorhanden: [isolierter Testzugang mit Einrichtungsplan](Q1_09d_testzugang.md), [Geräteanleitung ohne Entwicklerwerkzeuge](Q1_09d_geraeteanleitung.md), [ausfüllbare Ergebnismatrix](Q1_09d_testmatrix.md), [fünf synthetische Testspielstände](../../../tests/safety/q1_09d/fixtures/manifest.json), [kleines Download-ZIP](../../../tests/safety/q1_09d/Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip) und [statische Startseitenvorlage](../../../tests/safety/q1_09d/site/index.html).

**Noch keine Website, keine bestätigte Testadresse und keine echte Safari-/iPhone-/iPad-Abnahme.** Das GitHub-Veröffentlichen dieser Unterlagen ist kein Deployment. Öffentliches Bereitstellen einer Testwebsite bleibt ausdrücklich gesondert freizugeben. Es gibt keine Server- oder Synchronisierungsfunktion und keine neue Offline-Architektur.

## Sicherer Zugang und notwendige Entscheidung

Empfohlen ist eine neue manuell hochgeladene statische HTTPS-Site mit eigenem Hostnamen bei Netlify, ohne GitHub-Verknüpfung. Nur ein im Nutzerkonto bestätigter kostenloser Tarif kommt infrage. Vor Freigabe müssen konkrete Adresse, öffentliche Abrufbarkeit, Konto-/Uploadrechte, Grenzen und Kostenfolgen geprüft werden. Insbesondere ist die einzelne HTML-Datei44,24 MiB groß; Anbieterlimit nicht ungeprüft voraussetzen. Offizielle Tarif-/Hosting-/API-Dokumentationen waren in dieser Umgebung mit HTTP403 blockiert, siehe [Beleg](../../../tests/safety/q1_09d/results/reference-access.json). Kein Zugang angelegt und kein kostenpflichtiger Dienst bestellt.

Alternative: eigenes öffentliches Pages-Repository unter **separatem Besitzer/Organisation mit anderem Hostnamen**, nicht ein zweites Repository desselben bisherigen Pages-Besitzers. Ein anderer Pfad oder Branch unter `psonnen-lgtm.github.io` isoliert LocalStorage/IndexedDB nicht. Einfaches HTTP im Heimnetz bietet normalerweise nicht den für Web Locks erforderlichen sicheren Kontext.

Die getrennte Origin schützt produktive lokale Daten, ist aber keine Passwortsperre. Eine öffentliche Free-Site ist öffentlich abrufbar; `noindex` schützt nicht vor Zugriff. Nur das unveränderte Spiel und künstliche Daten würden nach Freigabe bereitgestellt. Unbekannte bereits vorhandene Partie am Testzugang → abbrechen, nichts löschen/importieren. Keine echte Nutzerdatei angefordert, gelesen oder verändert.

## Testdaten und überprüfbare Backups

| Datei | Zweck und wichtige Sollwerte |
| --- | --- |
| TEST01 | Aktuelle Neustartreferenz:5000 Gold, Kogge Lübeck, bekannter persönlicher Ort; zusätzlicher echter UI-Neustart bleibt erforderlich |
| TEST02 | Regulärer künstlicher V13-Altstand:5200 Gold,4 Ansehen, Sicherheitsfelder fehlen |
| TEST03 | Drei Schiffe mit festen IDs und getrennten Häfen Lübeck/Hamburg/Rostock |
| TEST04 | Gold12000, Bank2500, Kredit700; Getreide7@8/Hamburg, Salz12@10/Stettin mit getrennten historischen Kosten/Herkünften |
| TEST05 | Historischer Bürgermeistertitel, Amt Lübeck, laufender Ratsvertrag und unveränderte Originalfrist; bewusst gesetzte Testpolitik, keine erspielte Karriere |

Alle Namen/Dateien und Chronikeinträge markieren TEST/SYNTHETISCH. Es wurden frische Zustände erzeugt, **keine archivierten Simulationsendstände** umbenannt. Vier ältere V13-Zustände nutzen die bewahrte historische Fresh-State-Fabrik; die aktuelle Referenz nutzt den unveränderten Q1.09c-Neustart. Die Daten sind reproduzierbar mit festen Schiff-IDs, Märkten und Vergleichswerten im Manifest.

Vor jeder Altstandmigration liegt die externe ursprüngliche TEST-JSON in Dateien bereit; Hash/Sollwerte sind veröffentlicht. Importtests bestätigen exakte Rohbackups. Der Knopf „Original der Erstübernahme“ ist kein Export aller späteren Importoriginale. Anleitung erläutert diese Grenze und fordert keine Browserdatenlöschung zum Zurücksetzen der Erstübernahme. Echte Daten werden erst gar nicht in die Test-Origin übernommen.

## Tatsächlich ausgeführte und übernommene Prüfungen

- **Neu ausgeführt:** fünf gezielte Datensatzfälle gegen tatsächlichen Root-Spielcode im Node-VM-Modell: Produktionsvalidator, Importmigration, exakt erhaltenes Rohoriginalbackup, sämtliche nicht sicherheitsbezogenen Daten, Export/Reimport und erneutes Laden. Alle fünf bestanden. IndexedDB, Web Locks und DOM dabei modelliert; **keine nativen Browser-/Apple-Tests**. [Rohbeleg](../../../tests/safety/q1_09d/results/fixture-validation.json).
- Generator zweimal in jeweils neue `/tmp`-Ordner ausgeführt; die fünf eigentlichen Spielstanddateien sind bytegleich. Nur eine Beschriftung wurde von Holz auf das tatsächlich enthaltene Salz berichtigt. Fünf Dateien und Manifest im Testordner gesichert.
- Statische Paketkontrolle: alle alten Dateien gegen Basis, nur ergänzter Index zulässig; Spielhash und letzter Spielcodecommit unverändert; ZIP-Mitglieder vollständig identisch zu den fünf Daten und Manifest, relative Unterlagenlinks gültig,42 CSV-Gerätezeilen weiterhin „Nicht getestet“. Keine automatische Veröffentlichung in der Startseitenvorlage. Befehle/Details in [Test-README](../../../tests/safety/q1_09d/README.md), [Prüfskript](../../../tests/safety/q1_09d/verify-package.py) und [Prüfbeleg](../../../tests/safety/q1_09d/results/package-verification.json).
- **Nur übernommen:** Q1.09c106 gezielte Fälle/Prüfgruppen einschließlich31 nativer Chromium-Gruppen und sechs kritische Konfliktwiederholungen. [Vorheriger Browserbericht](../Q1_09c/Q1_09c_browserabnahme.md). Nicht unnötig neu gestartet; kein neues Bestehen für Safari daraus abgeleitet.
- **Nicht durchgeführt:** echte Geräte, Safari/WebKit, aktuelle Hostingabnahme, vollständiger Offline-Kaltstart am künftigen Testhost, physisch gesperrter/voller iOS-Speicher. Keine vollständige Wirtschafts-/Karrieresimulation. Frühere1500er-Ergebnisse bleiben historische Referenz, keine Q1.09d-Neuberechnung.

## Offene Risiken und Geräteabnahme

Die Matrix trennt normales/privates Safari, App-Wechsel, Tab-Neustart, vollständiges Beenden, Datei-Export/-Import, persönliche/unbegleitete Reisen, gespeicherte Herkunft/Kredite/Politik und getrennte Offline-Fälle. Der Nutzer meldet tatsächlich beobachtete Ergebnisse; kein Gerätefall ist vorab grün.

Fehlende Web Locks/IndexedDB müssen sicher abbrechen. Privater Kontext und mobile Speicherbereinigung bieten keine Daueraufbewahrungsgarantie. Online-Wiederöffnung kann lokal erhaltene Daten zeigen, obwohl das HTML offline nicht neu lädt. Eine geladene Seite offline zu bedienen, Offline-Kaltstart und lokale HTML-Datei sind drei getrennte Wege. Es gibt keinen Service Worker; Kaltstart bleibt unzugesichert. Keine Sicherheitsoptionen abschalten oder produktive Browserdaten löschen, um einen Test zu erzwingen.

Der aus Q1.09c offene globale Ansehenspfad bleibt unverändert offen: finanzielle Q001-Kriterien bestehen, aber keine uneingeschränkte Q001-/Integrationsfreigabe. Dieser Auftrag ist Testvorbereitung und enthält keine weitere Sicherheits-/Wirtschaftskorrektur.

## GitHub und Übergabe

[Arbeitsbranch](https://github.com/psonnen-lgtm/Hansef-rst/tree/test/q1-09d-ios-acceptance-preparation) · [Unterlagen](https://github.com/psonnen-lgtm/Hansef-rst/tree/test/q1-09d-ios-acceptance-preparation/docs/entwicklungsberichte/Q1_09d) · [Daten/Prüfungen](https://github.com/psonnen-lgtm/Hansef-rst/tree/test/q1-09d-ios-acceptance-preparation/tests/safety/q1_09d) · [Änderungsvergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/fix/q1-09c-safety-finalization...test/q1-09d-ios-acceptance-preparation).

Entwicklung vor Beginn `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`, Sicherheitsbranch `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`. Diese und historische Tests/Ergebnisse/Pages bleiben unangetastet. Nur neue Q1.09d-Unterlagen, Testdaten/-hilfen und ergänzter Berichtsindex. Veröffentlichung und vollständiges GitHub-Rücklesen werden mit tatsächlicher Commit-ID im Chat bestätigt; keine selbstreferenzielle Abschluss-ID behauptet. Kein Merge, kein Deployment und keine Folgephase. Die endgültige Geräte-/Integrationsfreigabe trifft der Nutzer.
