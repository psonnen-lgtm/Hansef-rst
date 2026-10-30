# Q1.09e – Apple-Kurzabnahme nach tatsächlicher Veröffentlichung

30.10.2026 · Europe/Berlin · unveränderter Spielcode `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, V13/Politik2/Sicherheit3. Basis Q1.09d `ebad74f02307d596cdaa4f05b02142626d9041d9`.

**Noch keine echte Testadresse. Nicht an der produktiven Spieladresse ausführen.** Erst nach bestätigter separater HTTPS-Bereitstellung und Online-Prüfung beginnen. Keine echten Spielstände anfordern/importieren, keine Browserdaten löschen. Alle Apple-Ergebnisse bleiben bis zur Rückmeldung „Nicht getestet“.

Zuerst auf dem **iPhone**, danach unabhängig auf dem **iPad**, jeweils normales Safari. Modell, Betriebssystem, Browser, Datum und vollständige Testadresse notieren. Die [statische Kurzseite](../../../deployment/q1_09e/site/geraeteabnahme.html) wird mit veröffentlicht; [ausführlicher Q1.09d-Plan](../Q1_09d/Q1_09d_geraeteanleitung.md) und [unveränderte Ergebnismatrix](../../../tests/safety/q1_09d/geraete-ergebnisse.csv) bleiben Grundlage.

| ID | Kurzer Ablauf | Erwartung |
| --- | --- | --- |
| A1 | Neue TEST-Partie in Lübeck beginnen | 5.000 Gold, eine Kogge, Tag 1/1350, Person Lübeck |
| A2 | Einmal 50 Gold klein spenden, automatische Speicherung abwarten; Tab schließen/online neu öffnen; danach zusätzlich Safari vollständig beenden und neu öffnen | 4.950 Gold, +2 Ansehen, gleicher Tag; beides getrennt bestätigen |
| A3 | „Spielstand“ → exportieren, in Dateien sichern und TEST-Namen/Werte prüfen | Tatsächliche nicht leere JSON-Datei vorhanden, nicht nur Vorschau |
| A4 | Synthetischen `TEST_02_altstand_v13.json` importieren, dann eigenen Export A3 reimportieren | Erst 5.200 Gold/TEST Q109d Altstand, danach wieder eigener TEST-Name/4950 Gold/Person Lübeck; erneutes Öffnen erhält Daten |
| A5 | Persönlich von Lübeck nach Hamburg segeln | Schiff und Person Hamburg, angekündigte Tage/Gebühr einmal; weitere gemeldete Risiken gesondert notieren |
| A6 | Rückreise Hamburg→Lübeck „Ohne persönliche Mitreise vorbereiten“, einmal weitersegeln; Person/Schiff und Rathaus-Ortsprüfung kontrollieren | Schiff Lübeck, Person Hamburg; keine persönliche Ankunft/Fernvorsprache |
| A7 | Geladene Seite im Flugmodus ohne WLAN speichern/exportieren; anschließend Safari komplett beenden und dieselbe Adresse weiterhin offline neu aufrufen | Geladene Offline-Seite und echter Kaltstart getrennt beobachten; Kaltstart kann scheitern und ist nicht zugesichert. Danach online Datenerhalt prüfen |

Vor Importen synthetisches ZIP in „Dateien“ entpacken und Originale unverändert behalten. Jeder Import ersetzt nur die gegenwärtige **Testpartie**. Original der Erstübernahme ist nicht automatisch das Original jedes späteren Imports. Bei fehlenden Speicherrechten/Web Locks stoppen und Meldung notieren; keine Sicherheitsoption abschalten. Normales und privates Safari getrennt behandeln, private Datenaufbewahrung nicht voraussetzen.

## Ausfüllbare Kurzübersicht

| Gerät | Betriebssystem/Browser | Schritt | Tatsächlich | Status | Fehler |
| --- | --- | --- | --- | --- | --- |
| iPhone | offen | A1–A7 jeweils einzeln melden | — | Nicht getestet | — |
| iPad | offen | A1–A7 jeweils einzeln melden | — | Nicht getestet | — |

Rückmeldung ohne Entwicklerwerkzeuge: „iPhone/Modell …, iOS …, Safari, Datum/Adresse …, A2 vollständiger Safari-Neustart, erwartet 4.950 Gold, tatsächlich …, Bestanden/Fehlgeschlagen/Nicht getestet, Meldung …“. Bei Teilfehlern den Teilschritt benennen. Optional Screenshot nur von Testdaten. Keine echten Spielstände senden.

Die bestehende 42-zeilige CSV ermöglicht die feinere Trennung: A1=T01, A2=T02/T03/T10, A3=T04, A4=T05/F02, A5=T06, A6=T07/T08, A7=T11/T12. App-Wechsel, weitere Fixtures und privates Safari zusätzlich nach Q1.09d. Kein tatsächlicher Gerätetest durchgeführt; Chromium-Touch-Emulation wäre kein Apple-Test.

Offline-Neustart ist ohne neue Offline-Architektur nicht garantiert. Ein Browser-Standbild zählt nicht als interaktive Seite, einmaliger Cache-Erfolg nicht als dauerhafte Offline-Zusage. Lokale HTML-Dateivorschau ist ein dritter, nicht freigegebener Weg. Keine Service-Worker-Änderung in diesem Auftrag.
