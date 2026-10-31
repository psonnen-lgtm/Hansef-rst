# Q1.09f – Separate GitHub-Testkopie, noch nicht veröffentlicht

31.10.2026 Europe/Berlin. Branch `test/q1-09f-github-isolated`, Basis `8a278d90b989d14ec1520b2184ee169385919818`.
Ursprung Q1.09c `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; tatsächlich getestete Kopie **`393006ff89f5945a501e3df79c891907721682cb`**, SHA256 **`8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`**, 46.390.644 Bytes.

`site/` ist der vollständige vorgesehene statische Testordner: Startseite, separate Test-HTML mit eingebetteten Grafiken, unverändertes synthetisches Q1.09d-ZIP und unveränderte leere CSV. Keine Abhängigkeit von produktiven Dateien oder Browserdaten. Kein Workflow, Autodeploy oder Service Worker. **Ein Branch und GitHub-Dateivorschau sind noch kein ausführbarer Testzugang.**

Vorgeschlagener späterer Pages-Pfad: `https://psonnen-lgtm.github.io/Hansef-rst/qa/q1-09f/` (nicht veröffentlicht oder auf Erreichbarkeit geprüft). Der reale Veröffentlichungsweg ist mangels zugänglicher Pages-Einstellungen noch nicht bestätigt. Nur nach separater Freigabe unter Beibehaltung aller bestehenden Site-Dateien und der bisherigen Pages-Quelle hinzufügen. Niemals den ganzen Live-Auftritt durch `site/` ersetzen oder den Veröffentlichungszweig auf den Testbranch umstellen.

## Kleine, überprüfbare Anpassung

`build-test-copy.py` erzeugt aus der gepinnten Hauptdatei genau die separate Testkopie und `patch-audit.json`.34 ausdrückliche Änderungen: Speicherkennungen/Grenze, abgeschaltete Alt-Suche, ausschließlich synthetische Importe/Markierung, andere Downloads, aktuelle Aufzeichnungssitzung und sichtbare Testhinweise. Rückwärts angewandt ergeben sie exakt die gesamte Original-HTML einschließlich aller Grafikbytes. Hauptdatei wird nie geschrieben; alle wirtschaftlichen/politischen Regeln und RNG-Aufrufe bleiben erhalten.

Bei Bedarf mit vorhandenem Python3/Node erneut erzeugen: `python deployment/q1_09f/build-test-copy.py`. Das überschreibt ausschließlich die generierte **Testkopie** und ihr Audit; keine Hauptdatei, keinen Browserstand und keine Veröffentlichung. Die zugehörige Quelle muss den erwarteten Originalhash haben.

Physische LocalStorage-Schlüssel dürfen ausschließlich mit `hansefuerst-q109f-v1-` anfangen. Ein lexikalischer Adapter prüft jeden get/set/remove vor dem nativen Zugriff. Native globale Storage-APIs werden nicht verändert. Keine Enumeration des gesamten Origin-Speichers. Testaufzeichnungs-Export/Löschen ist bewusst auf aktuelle Testsitzung begrenzt; alte Testsitzungen werden nicht automatisch eingesammelt oder gelöscht.

Datenbank `hansefuerst-q109f-v1-database`, Store `q109f-game`, Datensatz `q109f-active`, Lock `hansefuerst-q109f-v1-writer`. Kein Startimport aus alten LocalStorage-Adressen, auch nicht aus ähnlich benannten Test-Altständen. Neustart lädt nur die aktuelle eigene markierte Testpartie. Explizite Importe akzeptieren die fünf gepinnten synthetischen Dateien oder markierte eigene TEST-Exporte. Marker/Dateinamen sind kein kryptografischer Herkunftsschutz und von Hand fälschbar.

## Tatsächliche Prüfungen

[Abnahmenachweis](../../tests/safety/q1_09f/results/acceptance.json):17 native Chromium-Gruppen mit 665 protokollierten Test-Speicher-/Lock-Aufrufen. Synthetische produktive LocalStorage-/IndexedDB-Daten unter derselben Origin als strenge Kontrollwerte. Kein echter Nutzerstand. Erste Durchführung enthielt einen Kontrollfixturefehler im0.3-Journal; behoben und nur betroffener Fall wiederholt, rohe Fehlausgabe erhalten. Kein Produkt-/Testkopiefix und keine gelockerte Byteprüfung.

Vollständiger Treiber: `node tests/safety/q1_09f/browser-isolation.cjs <neue-ergebnisdatei.json>`. Er benutzt natives installiertes Chromium und einen temporären ausschließlich lokalen HTTP-Server; keine externe Bereitstellung. Neue Ergebnisdatei erforderlich. Selektive Wiederholung mit `Q109F_ONLY='^14 ' ...`; die Abnahme unterscheidet vollständigen Lauf und einzelnen Kontrollfall. Keine erneuten Großsimulationen.

Die Trennung ist programmatisch, keine Browser-Sicherheitsgrenze. Gleiche Origin kann über andere Skripte/DevTools weiterhin auf native APIs zugreifen; Speicherquote und mögliche Browserbereinigung bleiben geteilt. [Berichte](../../docs/entwicklungsberichte/Q1_09f/Q1_09f_gesamtbericht.md). Nicht als echte Apple- oder öffentliche Pages-Abnahme ausgeben.
