# Q1.09f – GitHub-Testmodus mit eigenem Speichernamensraum

31.10.2026 · Europe/Berlin · Arbeitsbranch **`test/q1-09f-github-isolated`**.
Basis Q1.09e **`8a278d90b989d14ec1520b2184ee169385919818`**, Q1.09d **`ebad74f02307d596cdaa4f05b02142626d9041d9`**.
Originalspiel Q1.09c **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`** unverändert, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**.
Tatsächlich getestete separate Kopie **`393006ff89f5945a501e3df79c891907721682cb`**, SHA256 **`8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`**, 46.390.644 Bytes. V13/Politik2/Sicherheit3 mit testinterner Markierung; **keine Bytegleichheit der Testkopie mit dem Original behauptet**.

## Ergebnis

**Ein programmatisch getrennter GitHub-Testmodus ist möglich, vorbereitet und nativ geprüft.** Er verwendet ausschließlich das bestehende Repository/Konto, eine separate Testdatei und eigene Speicherkennungen. Keine Registrierung, fremde Plattform oder kostenpflichtige Leistung. Eine öffentliche Testversion wurde **nicht** bereitgestellt.

Die Hauptdatei und alle produktiven Dateien bleiben unverändert. Nur [separate Testkopie und Begleitdateien](../../../deployment/q1_09f/README.md), neuer Sicherheitsprüftreiber, Belege und vier Berichte ergänzt; Berichtsindex ausschließlich erweitert. Keine Gilde, Karriere-, Wirtschafts-/RNG-Änderung, Cloud-Synchronisierung oder echte Nutzerdatei. Keine umfangreichen Simulationen und kein Merge.

## Was konkret getrennt wurde

Datenbank `hansefuerst-q109f-v1-database`, Store `q109f-game`, Datensatz `q109f-active`, Lock `hansefuerst-q109f-v1-writer`; sämtliche LocalStorage-/Backup-/Versions-/Aufzeichnungskennungen beginnen mit `hansefuerst-q109f-v1-`. Getrennte Downloads `hansefuerst-TEST-Q1_09f-*.json`.

Ein ausschließlich testlokaler Adapter verweigert fremde LocalStorage-Schlüssel vor dem nativen Aufruf; keine globale API-Umlenkung. Keine Aufzählung des gesamten Browser-Origin-Speichers. Optionale Aufzeichnung bewusst nur aktuelle Testsitzung. Kein automatischer Altstandimport, keine Startup-Migration, keine Suche nach produktiven Partien oder Originalbackups. Eigene aktuelle Testpartie wird normal wieder geladen. Nur ausdrücklicher Import der fünf bekannten künstlichen V13-Fixtures oder markierter eigener TEST-Exporte. Neue Partien eindeutig markiert, Kopfzeile/Banner sichtbar „HANSEFÜRST – TESTVERSION“.

[Speicherbericht](Q1_09f_speicherisolation.md): 52 ursprüngliche Speicher-/Lock-Ausdrücke vollständig inventarisiert; 34 kontrollierte Änderungen im [Patchaudit](../../../deployment/q1_09f/patch-audit.json). Vollständige Umkehr ergibt exakt die ganze Originaldatei einschließlich eingebetteter Grafik. Keine heimliche zusätzliche wirtschaftliche Spieländerung.

## Tatsächlich getestet

**17 bestandene native Chromium-Gruppen**, [Herkunft und Rohdaten](Q1_09f_testnachweise.md). Gleiche Origin, isolierte synthetische Browserprofile, produktive und Test-Speicher nebeneinander.665 protokollierte Test-Speicher-/Lock-Aufrufe blieben im Testnamensraum. Kontrollbytes bleiben bei Testaktionen unverändert; auch Originalbackups, fremde App-Daten und produktive Aufzeichnungsdaten werden nicht gelesen/überschrieben.

Neustart, wiederholtes Speichern, alle fünf V13-Fixtures, Import/Export/Restore, defekte Importe, Schreibfehler, parallele/stale Tabs, fehlende APIs sowie beide Reisearten mit Ortsprüfung bestehen. Drei tatsächliche alte main-Versionen (sichtbare Gold-Statistik, keine Seitenfehler) und aktuelle Q1.09c-Version bleiben mit synthetischen Daten startbar. Produktive eigene Aktion und Testaktion können zugleich getrennt speichern. Schließen des Testtabs löscht nichts; Teststand bleibt für Rückkehr erhalten.

Ein Kontrollfall schlug zunächst wegen einer falsch abgeleiteten sieben-Waren-Fixture mit elf Journalpreisen fehl. Nur Kontrollfixture korrigiert, strenger Bytevergleich unverändert, **keine Testkopie geändert**. Nur betroffenen Fall wiederholt,16 erfolgreiche Gruppen nicht nochmals ausgeführt. Erster roter Rohstand bleibt erhalten; keine Behauptung eines erneut komplett grünen 17er-Laufs. Der gleiche Kontrollfall wurde zusätzlich mit expliziter UI-/Pageerror-Prüfung verstärkt; kein neuer Gesamtlauf. Tatsächlich getestete Kopie durchgehend derselbe Commit/Hash.

## Gleiche Origin bleibt ein Restrisiko

Ein Speichernamensraum ist **keine Browser-Sicherheitsgrenze**. Native Berechtigungen und Quote/Bereinigung bleiben geteilt. Andere gleichursprüngliche Skripte, XSS, DevTools oder absichtlich veränderter Code könnten produktive Speicheradressen erreichen. Bei Speicherdruck kann der Browser originweit Daten entfernen. Keine absolute Datenverlustgarantie oder Sandbox behauptet.

Die synthetische Markierung ist keine Signatur. Produktive Importfunktionen bleiben unverändert und könnten eine vom Nutzer versehentlich dort gewählte TEST-Datei annehmen. Daher klare Dateinamen und Regel: **TEST-Dateien niemals in der produktiven Version importieren**. Das ist kein automatischer Zugriff des Testmodus. Keine echten Dateien zur Prüfung angefordert. Testmodus sicher beenden: nur Testtab schließen, keine Browserdaten löschen. Offen aus Q1.09c bleibt der globale Ansehenspfad; keine Integrationsfreigabe daraus ableiten.

## Vorgeschlagener Zugang und fehlende Schritte

Vorschlag: `https://psonnen-lgtm.github.io/Hansef-rst/qa/q1-09f/` – **nur ein Vorschlag, nicht veröffentlicht/erreichbar bestätigt**. [Pages-Bericht](Q1_09f_github_pages_testzugang.md) beschreibt den ergänzenden Vier-Dateien-Pfad, ohne produktive Startseite oder bisherigen Veröffentlichungszweig zu ändern. Branch/Dateivorschau allein reicht für Safari nicht.

Aktuelle Pages-Einstellungen, echte Basisadresse und Live-Dateibestand sind per API/Webadresse/CLI mit HTTP403 blockiert. main-Baum und vorhandene inaktive Deploymentvorlage wurden gelesen, aber daraus kein aktiver Veröffentlichungsweg erfunden. Datei liegt unter bekannten üblichen Git-Einzeldateigrenzen; aktuelle Pages-Gesamtgröße/Kontingente unbekannt. Kein neuer Account oder Anbieter ist nötig, sofern die bestehende kostenlose Pages-Konfiguration eine ergänzende Bereitstellung erlaubt.

Vor Freigabe: Besitzer bestätigt vorhandene Pages-Quelle und kostenlosen Tarif; aktuelle komplette Live-Site sichern; freien Testpfad prüfen; genau vier Dateien über den bisherigen Weg ergänzen. **Kein Deployment nur des Testordners als Ersatz für die komplette Site.** Bei notwendigen Publikationsbranch-Änderungen den konkreten Weg gesondert freigeben, nicht auf eigene Faust mergen/umschalten. Danach vollständiger HTTPS-Hashvergleich/Origin-Prüfung und erst dann echte Apple-Abnahme. Safari/iPhone/iPad/Offline-Kaltstart bleiben ungetestet.

## GitHub-Sicherung

Implementierung/Testkopie in `393006ff89f5945a501e3df79c891907721682cb`; Kontrollfixture/Rohstand in `b64bd1d304162e9c30b232b64d8025aea5bd0dbb`. Abschlussberichte/Belege danach separat gesichert; tatsächliche Abschluss-ID im Chat. [Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/test/q1-09f-github-isolated), [Testordner](https://github.com/psonnen-lgtm/Hansef-rst/tree/test/q1-09f-github-isolated/deployment/q1_09f), [Änderungsvergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/deploy/q1-09e-netlify-test...test/q1-09f-github-isolated).

Vor Beginn von GitHub geprüft: main `c1280228951d581c7b3131279b8ff164a8e36dfa`, Entwicklung `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Q1.09c-Abschluss `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`. Diese sowie Q1.09d/e bleiben unverändert. Veröffentlichte Dateien werden vollständig von GitHub zurückgelesen. Keine Pages-/Netlify-Veröffentlichung, keine automatische Folgeaufgabe. Endgültige Freigabe beim Nutzer.
