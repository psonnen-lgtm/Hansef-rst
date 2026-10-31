# Q1.09f – Tatsächliche Testnachweise

31.10.2026 Europe/Berlin · Branch `test/q1-09f-github-isolated`.
Getestete separate Spielkopie **`393006ff89f5945a501e3df79c891907721682cb`**, SHA256 **`8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`**, 46.390.644 Bytes. Q1.09c-Original **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`** unverändert. Daten weiterhin V13/Politik2/Sicherheit3, Testmarker nur in der Kopie.

## Aufbau und tatsächlich ausgeführte Befehle

Treiber [browser-isolation.cjs](../../../tests/safety/q1_09f/browser-isolation.cjs), echtes **Chromium 154.0.8037.57**, native IndexedDB, native Web Locks, FileReader und Download. Ein isoliertes temporäres Browserprofil pro Gruppe; ein ausschließlich auf 127.0.0.1 lauschender Testserver liefert Original/Kopie/alte Originaldateien. Produkt und Test laufen **unter derselben Origin**, damit eine falsche Annahme über Pfadtrennung auffallen würde. Kein öffentlicher Server, keine echten Nutzerprofile.

Synthetische produktive Kontrollwerte: v01/v03/v04/Safety1-LocalStorage, alte Backups, Versionshinweis, Aufzeichnungs-Consent/Sitzung, fremder App-Schlüssel und aktueller produktiver Safety3-IndexedDB-Datensatz. Strenger Bytevergleich nach Testaktionen; native Storage-/IDB-/Lock-Aufrufe der Testseite zusätzlich protokolliert und auf eigene Kennungen geprüft. Keine bloße Simulation des Speichermodells.

- `python deployment/q1_09f/build-test-copy.py`: 34 kontrollierte Änderungen erzeugt, vollständige Umkehr ergibt exakt das Original; kein Wirtschafts-/Politik-/RNG-Umbau.
- Code zuerst in `393006ff89f5945a501e3df79c891907721682cb` gesichert.
- `node tests/safety/q1_09f/browser-isolation.cjs tests/safety/q1_09f/results/native-attempt-1.json`: 16 Gruppen bestanden, Kontrollfall14 zunächst fehlgeschlagen; keine unbemerkte Umdeutung zum grünen Gesamtlauf.
- Kontrollfixture im Treiber korrigiert und in `b64bd1d304162e9c30b232b64d8025aea5bd0dbb` gesichert. **Kein Testspielcode geändert.**
- `Q109F_ONLY='^14 ' node tests/safety/q1_09f/browser-isolation.cjs tests/safety/q1_09f/results/native-legacy-control.json`: nur Gruppe 14 gezielt erneut ausgeführt, bestanden. Bereits erfolgreiche 16 Gruppen nicht unnötig wiederholt.
- Startbarkeitsnachweis anschließend um **sichtbare Gold-Statistik und Pageerror-Prüfung aller drei main-Clients** verstärkt, Treibercommit `79a4d1cfff159cff79ea65be0a0239a4870908d5`. Nur Gruppe14 mit derselben Filteroption nach `tests/safety/q1_09f/results/native-legacy-ui.json` ausgeführt; bestanden. Kein weiterer Gesamtlauf.

[Zusammengeführte Abnahme mit Herkunft je Gruppe](../../../tests/safety/q1_09f/results/acceptance.json): **17 bestandene Gruppen gegen exakt denselben Testkopiehash**. Nicht als zweiter vollständiger 17er-Lauf ausgegeben. [Erster Rohstand inklusive Fehler](../../../tests/safety/q1_09f/results/native-attempt-1.json), [gezielter Kontrolllauf](../../../tests/safety/q1_09f/results/native-legacy-control.json), [verstärkter UI-Kontrolllauf](../../../tests/safety/q1_09f/results/native-legacy-ui.json). Keine ungefangenen JavaScript-Seitenfehler.

## Ursache des Kontrollfehlers

Die künstliche 0.3-Referenz war aus einer frischen V13-Fixture abgeleitet. Märkte waren korrekt auf sieben Waren reduziert, das vorhandene Journal enthielt aber noch elf Preise. Beim regulären Öffnen setzte die **alte unveränderte** 0.3-Version ihre eigene Preisbeobachtung auf sieben Werte und speicherte sie. Deshalb schlug der produktive Bytevergleich an, obwohl dies keine Testseiten-Schreibaktion war.

Korrektur ausschließlich der synthetischen Referenz: ihr 0.3-Journal hat von Anfang an sieben Preise. Dieselbe unveränderte Testkopie und derselbe strenge Bytevergleich bestehen danach auch beim Öffnen aller drei alten main-Spiele. Keine Abschwächung auf einen bloßen Goldvergleich, keine Änderung an produktiver Datei, keine Wiederholung als Ersatz für Ursachenklärung. Vorheriger roter Rohstand bleibt erhalten.

## Abnahmekriterien

| Anforderung | Tatsächlicher Nachweis | Ergebnis |
| --- | --- | --- |
| Produktive Daten bytegleich | Nicht-Test-LocalStorage und produktiver IDB-Rohdatensatz vor/nach Testaktionen | Bestanden |
| Keine produktiven Lesezugriffe | Native Aufrufprüfung: alle Test-getItem/get/DB/Locks im Testnamensraum; produktiver Consent nicht übernommen | Bestanden |
| Keine produktiven Schreibzugriffe | Native set/remove/put-Aufrufe und Kontrollbytes; Adapter verweigert fremde Schlüssel vorher | Bestanden |
| Wiederholtes Speichern nur Testdaten | Native UI-Neubeginn, drei Spenden, Reload mit gleichem Teststand | Bestanden |
| Import/Export im Testmodus | Fünf bekannte synthetische V13-Dateien, eigener Marker, andere Downloadnamen, Originalexport, Reimport | Bestanden |
| Wiederherstellung nur Testbackups | Eigenes before-replacement-Backup wiederhergestellt, produktive Backup-Sentinels ignoriert | Bestanden |
| Parallele Tabs | Ein Gewinner/eine veraltete Testaktion; Test und Q1.09c zusätzlich gleichzeitig getrennt nutzbar | Bestanden |
| Fehlerhafte Importe | Defektes JSON, fremder Name, veränderte unmarkierte vermeintliche TEST-Datei verworfen; vorherige Testbytes erhalten | Bestanden |
| Produktive Version startbar | Alle drei tatsächlichen main-HTMLs mit sichtbarer Gold-Statistik/ohne Pageerror plus aktuelle Q1.09c-HTML mit ausschließlich synthetischen Daten | Bestanden lokal |
| Testmodus ohne Löschung beenden | Testtab schließen, eigene Partie wieder öffnen, produktive Kontrollbytes erhalten | Bestanden |

Weitere Gruppen: Quota-Schreibfehler mit vollständigem Rückfall/einmaligem Retry; fehlende Web Locks/IndexedDB ohne produktiven Fallback; eigene Testaufzeichnung/Export/Löschen ohne Origin-Enumeration; persönliche/unbegleitete Reise, korrekter Personenort und gesperrte politische Fernhandlung; keine automatische Übernahme selbst aus alten ähnlich benannten Testschlüsseln.

**665** geprüfte native Testaufrufe: 148 LocalStorage, 453 IndexedDB/Transaktion, 64 Web Locks. In Gruppe 17 wird ausdrücklich eine eigene produktive Spende ausgelöst; deren beabsichtigte Veränderung wird getrennt von den Testaktionen geprüft. „Produktive Daten unverändert“ bedeutet nicht, dass eine produktive Partie selbst keine regulären Aktionen mehr ausführen dürfte.

## Statisch und noch offen

[Patchaudit](../../../deployment/q1_09f/patch-audit.json) und [52 Aufrufstellen](../../../tests/safety/q1_09f/storage-inventory.json). Hauptdatei und sämtliche alten Testskripte/-ergebnisse unverändert; nur neuer Testmodus/Unterlagen und ergänzter Berichtsindex. Spielökonomie und politische Regeln nicht umgebaut. Historische Simulationen nicht neu ausgeführt, frühere 106 Q1.09c-/fünf Q1.09d-Prüfungen nur Referenz.

Nicht getestet: echte GitHub-Pages-Auslieferung, tatsächliche Pages-Konfiguration, Safari/WebKit, iPhone/iPad, reale Gerätespeicherbereinigung und Offline-Kaltstart. Kein voller Datenträger oder OS-Stromausfall. Shared-Origin-Angriffe sind keine durch einen Namespace verhinderbare Klasse. Keine vollständige Integrations-/Gerätefreigabe.
