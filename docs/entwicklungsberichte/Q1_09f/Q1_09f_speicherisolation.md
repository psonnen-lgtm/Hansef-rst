# Q1.09f – Speicherisolation der separaten Testkopie

31.10.2026 Europe/Berlin · Branch `test/q1-09f-github-isolated`.
Unveränderte Q1.09c-Quelle `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, SHA256 `50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`.
Tatsächlich getestete Kopie **`393006ff89f5945a501e3df79c891907721682cb`**, SHA256 **`8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`**; weiterhin V13/Politik2/Sicherheit3 mit zusätzlicher testinterner Markierung. Keine Änderung an der Hauptdatei.

## Vollständige Bestandsaufnahme

Ein Spielskript,52 statisch erfasste Speicher-/Lock-Aufrufstellen beziehungsweise Ausdrücke: [Inventar](../../../tests/safety/q1_09f/storage-inventory.json). Darunter sämtliche LocalStorage-get/set/remove-Aufrufe, beide bisherigen globalen Enumerationen, IndexedDB-Öffnung und aktiver Datensatz sowie Web-Lock-Zugriffe. Keine SessionStorage-, CacheStorage- oder Service-Worker-Nutzung im untersuchten Spielskript. Zeilenreferenzen beziehen sich auf das Skript mit ausgeblendeter einzeiliger Grafikdefinition, nicht auf hypothetischen Ersatzcode.

Geprüfte Gruppen: alte Stadt-/Waren-/Lager-/Miet-/Regional-/Schiffbau-/Politik-/Informations-/Briefmigrationen mit Backups; Kaufbestätigungen mit Speichervergleich; Startbuch/Neustart; Sicherheitsbackups, Originalexport, Reload und Fehlerbehandlung; Versionshinweise; freiwillige Testaufzeichnung und sämtliche Datei-Exports. Alle Spielaktionen münden weiterhin in derselben atomaren Transaktionslogik. [Originale Hauptversionen](../../../tests/safety/q1_09f/results/main-storage-inventory.json) zusätzlich vom tatsächlichen main-Commit gelesen; sie verwenden unter anderem `hansefuerst-v01`/`hansefuerst-v03` und bleiben unverändert.

## Getrennte Kennungen

| Zweck | Q1.09c / bisherige Version | Testkopie Q1.09f |
| --- | --- | --- |
| IndexedDB | `hansefuerst-local-safety3` | `hansefuerst-q109f-v1-database` |
| Object Store | `game` | `q109f-game` |
| Kanonischer Datensatz | `active` | `q109f-active` |
| Gemeinsame Schreibsperre je Version | `hansefuerst-safety1-writer` | `hansefuerst-q109f-v1-writer` |
| Backup-/logischer Speicherschlüssel | `hansefuerst-v04-safety3` | `hansefuerst-q109f-v1-save` |
| Frühere Kennungen | `hansefuerst-v04`, `…-safety1`, `…-v03`, `…-v01` | Eigene `hansefuerst-q109f-v1-legacy-*`; **keine automatische Suche** |
| Hinweis „Was ist neu?“ | `hansefuerst-news-seen` | `hansefuerst-q109f-v1-news` |
| Aufzeichnungspräfix/Consent/Sitzung | `hansefuerst-test-v1-*` | `hansefuerst-q109f-v1-log-*` |
| Backups | Vom bisherigen KEY abgeleitete Namen | Ausschließlich `hansefuerst-q109f-v1-save-*` |
| Spielstandexport | `hansefuerst-spielstand.json` | `hansefuerst-TEST-Q1_09f-spielstand.json` |
| Originalexport | `hansefuerst-original-erstuebernahme.json` | `hansefuerst-TEST-Q1_09f-original.json` |
| Aufzeichnungsexport | `hansefuerst-testauswertung-*` | `hansefuerst-TEST-Q1_09f-auswertung-*` |

Der LocalStorage-Adapter gilt **nur lexikalisch innerhalb der Testkopie**. Er verweigert jeden Schlüssel außerhalb des Testpräfixes vor dem nativen get/set/remove. Er ersetzt keine globalen APIs, sodass eine andere produktive Seite nicht auf Testdaten umgelenkt wird. Direkte native LocalStorage-Verwendung gibt es im Testskript nur an diesen drei geprüften Adapterstellen. Keine `clear()`-/`key()`-/`length`-/Gesamtenumeration. Die Testaufzeichnung liest/löscht nur eigenen Consent und aktuelle Sitzung; keine globale Suche nach alten Sitzungen. Das ist eine bewusst engere Testfunktion, keine neue Spielregel.

## Start, Import und Wiederherstellung

Ohne eigene aktive Testpartie erscheint ein leerer Neubeginn. Keine Suche nach produktiven oder alten Test-LocalStorage-Daten, kein stiller Erstimport, keine automatische Startup-Migration. Eine vorhandene aktuelle markierte Testpartie darf normal wieder geladen werden. Ältere Testformate müssen ausdrücklich importiert werden und die Eingangsprüfung bestehen.

Explizite Dateiauswahl akzeptiert nur die fünf bekannten künstlichen Q1.09d-Dateien (Hash des geparsten JSON) oder eigene Exporte mit TEST-Namen und `flags.q109fSynthetic=true`. Neue Partien werden mit TEST-Namen/Marker erzeugt; Marker bleibt in eigenen Exporten. Manuell veränderte Daten ohne Marker bzw. nur ähnlich benannte Fremddateien werden zurückgewiesen. Der Marker ist **keine digitale Signatur**; absichtlich präparierte Dateien sind damit nicht als echt synthetisch beweisbar. Keine echten Partien auswählen oder senden.

Vor Ersetzen bleiben eingehende Rohdatei und bisherige Testpartie in eigenen Backups. Wiederherstellung erfolgt durch expliziten Reimport einer eigenen Testbackup-Datei. Originalexport liest nur die eigenen import-original/safety-original-Backups, niemals produktive Fallbackadressen. Fehlerhafte Importe oder fehlgeschlagene Transaktionen lassen den bisherigen aktiven Teststand erhalten. Eine fehlende Web-Lock-/IndexedDB-API führt zu Schreibverweigerung, nie zu produktiver Ersatzspeicherung.

Gemeinsame Testtabs verwenden eigenen Web Lock plus atomaren Vergleich/Put in eigener IndexedDB. Veraltete Aktion wird verworfen. Test und Produkt verwenden verschiedene Sperren und Datenbanken; keine gemeinsame Transaktion zwischen ihnen. Die tatsächliche Person-/Reise-/Kreditlogik bleibt unverändert. Alle34 Änderungen sind im [Patchaudit](../../../deployment/q1_09f/patch-audit.json) einzeln beschrieben; Umkehr ergibt die gesamte Originaldatei bytegenau einschließlich Grafiken.

## Tatsächlicher Nachweis und Grenze

[17 native Chromium-Gruppen](../../../tests/safety/q1_09f/results/acceptance.json), synthetische produktive Daten im selben Browserprofil und derselben Origin. 665 native Testaufrufe: 148 LocalStorage-, 453 IndexedDB-/Transaktions- und 64 Lock-Aufrufe. Alle aufgezeichneten Testzugriffe innerhalb eigener Kennungen; keine produktiven Aufrufe. Produktive Kontrollbytes bleiben während Testaktionen unverändert. Zusätzlich gleichzeitige **ausdrücklich ausgelöste produktive** Spende und Testspende: jede wirkt nur in ihrem Datensatz, produktive eigene Handlung wird nicht fälschlich als unveränderte Partie ausgegeben.

**Keine harte Origin-Isolation:** Beide Seiten teilen native Berechtigungen, Browserquote und mögliche Bereinigung bei Speicherdruck. Andere gleichursprüngliche Skripte, XSS, absichtlich veränderte Dateien oder DevTools könnten die native Grenze umgehen; die lexikalische Prüfung ist keine Sandbox. Eine Namespace-Trennung kann Browser-Löschung/Eviction nicht verhindern. Deshalb keine absolute Garantie gegen jeden Datenverlust, keine Sicherheitsfreigabe für beliebige Fremdskripte. Externe produktive Backups bleiben sinnvoll, ohne in diesem Auftrag echte Dateien anzufordern.

Testmodus ohne Löschaktion beenden: Testtab schließen. Produktive Version bleibt nutzbar; eigene Testdaten bleiben für einen späteren Besuch erhalten. Eine spätere Entfernung der Testseite muss keine Browserdaten löschen. Keine Cloud-Synchronisierung, neue Registrierung oder fremder Anbieter.
