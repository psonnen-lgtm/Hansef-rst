# Q1.09c – Native Browserprüfung und manueller Geräteplan

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

## Tatsächlich verfügbar und ausgeführt

**Chromium154.0.8037.57** wurde nativ ausgeführt.31 Prüfgruppen bestanden, zusätzlich zwei kritische Konfliktfälle je dreimal. WebKit-Datei fehlt; keine Downloads versucht. **Keine Safari- und keine echten iPhone-/iPad-Prüfungen.** [Umgebung](../../../tests/safety/q1_09c/results/capabilities.json), [native Ergebnisse](../../../tests/safety/q1_09c/results/final-acceptance/browser.json).

Der temporäre localhost-Testserver liefert nur die tatsächliche vollständige Haupt-HTML. Keine Serverfunktion im Spiel und kein Deployment. Jedes Szenario verwendet ein isoliertes Browserprofil mit eigenen Testkopien.

Die aktive Partie liegt ausschließlich in IndexedDB `hansefuerst-local-safety3`, Store `game`, Schlüssel `active`, als vollständiges validiertes V13-JSON. Web Locks bleiben verpflichtend. Die echte `readwrite`-Transaktion vergleicht den aktuellen Datensatz und schreibt den Kandidaten atomar. Alter LocalStorage-Spielstand/Originalbackups bleiben unverändert; keine aktive LocalStorage-Zweitkopie. Ältere Clients können die neue Sicherheitsrevision nicht stillschweigend importieren und den neuen aktiven Datensatz nicht überschreiben.

## Abgenommene Szenarien

- Gleichzeitiges Erstöffnen: einmalige kanonische Übernahme, beide Tabs laden denselben aktuellen Stand.
- Zwei echte Tabs mit unter echter Sperre wartenden Aktionen: genau ein Vorgang, veraltete Aktion verworfen, Reload aktuell. Dasselbe für verzögerten FileReader-Import, unbegleitete Ankunft und einmalige Altfristvergabe.
- Doppelbestätigung im selben Tab; Schließen wartenden Tabs; Freigabe nach Schließen des Sperrhalters.
- Echter IndexedDB-Transaktionsabbruch **nach** erfolgreicher Put-Anforderung: vollständiger Rückfall auf alten Datensatz; erneuter Versuch einmalig. Daneben eingespritzter Quota-Fehler vor Put und kontrollierte Lesesperre. Kein physisch vollgeschriebenes Gerät und kein Stromausfalltest.
- Fehlende Web Locks beziehungsweise fehlendes IndexedDB: verständlicher Abbruch ohne unsicheren Schreibfallback; Originaldownload soweit Quellspeicher zugänglich.
- Alte Safety1-LocalStorage-Partie wird auf Kopie übernommen, Quelle bytegleich. Gültiger Personenort bleibt bei fehlendem optionalem Alttracking erhalten. Keine erfundene M2-Erstübernahme/Schonung.
- Wirkliche Blob-Downloads, FileReader-Import, Rohoriginal-/Vorherbackup, vollständige Wiederherstellung und Reload; ungültige, korrupte oder neuere Daten überschreiben nichts stillschweigend.
- Ratsherr-, Bürgermeister- und Eldermann-Kopien behalten alte Daten. Persönliche Ratsrunde funktioniert, Fernansicht und passende unbegleitete Zielankunft erfüllen keine persönliche Station.
- W1-S nach drei tatsächlichen neutralen Handelskreisen: Referenz/Kredit gleich, historischer Buchwert getrennt. Echte unbegleitete Fahrt, bewusste Landwahl im bestehenden Dialog, Weltzeit/Zinsen, eine Gebühr, Person/Ansehen/Besuche unverändert.
- Wiederholter Reiseversuch nach Schreibfehler verwendet genau ein verborgenes Risiko. Alter Fristbeleg und Originalfrist über tatsächlichen Dateidownload/-import und Neustart genau einmal.

375×812 und820×1180 mit **Chromium-Touch-Emulation**,1280×900 per Maus: Spendenangebot/Gutschrift, keine neuen Tage, Speicherdialog ohne horizontalen Überlauf, erreichbares Schließen. [375px](../../../tests/safety/q1_09c/results/final-acceptance/viewport-375.png), [820px](../../../tests/safety/q1_09c/results/final-acceptance/viewport-820.png), [1280px](../../../tests/safety/q1_09c/results/final-acceptance/viewport-1280.png). Das sind keine echten Apple-Geräte. Nicht jeder Bildschirm und jede Spielansicht ist damit vollständig visuell abgenommen.

Zusätzlich kontrolliert verzögertes Speichern: Eine blickdichte Speicheranzeige verdeckt die noch unbestätigte Ankunft. Kanonischer Datensatz bleibt bis zum Commit alt; erst danach verschwindet die Anzeige und das Risiko wird sichtbar. `inert`/`aria-hidden`, oberste Deckschicht und echte DB-Grenze geprüft; kein VoiceOver-Gerätetest.

## Offline und Blockaden

Bereits geladene Seite bei ausgeschaltetem Netz: lokale Transaktion und echter Export bestehen. Neuladen der nicht gecachten HTTP-Testseite scheitert mit `ERR_INTERNET_DISCONNECTED`; kein Nachweis eines Offline-Kaltstarts. Direkte lokale HTML-Datei ist hier durch `ERR_BLOCKED_BY_ADMINISTRATOR` gesperrt. Dieser Fall ist blockiert, nicht bestanden. Keine Umgehung und kein Pages-Deployment.

## Kurzer manueller Plan für PC, iPhone und iPad

Nur Testkopien verwenden; Browser/Version, Datum und genaue Adresse/Dateikontext notieren.

1. Originaldatei exportieren und extern aufbewahren. Alte V13- und Safety1-Kopie importieren, Geld/Schulden, Ladung/Herkunft, Lager, Bauten, Titel, Ämter, Siegel und Originalfristen vergleichen. Neu exportieren, Browser schließen, neu öffnen, erneut vergleichen.
2. Zwei Tabs gleichzeitig öffnen. Einen Spielzug ausführen, danach im alten Tab handeln/importieren: Konflikt statt Überschreiben. Gleichzeitige Bestätigung darf keine doppelte Gebühr, Reise oder Schonung erzeugen. Aktuellen Stand laden und erneut vergleichen.
3. Fernes Schiff ansehen und unbegleitet fahren; Kaufmann bleibt. Passenden politischen Besuch am Ziel versuchen: gesperrt. Persönlich hinreisen: Besuch erst am tatsächlichen Ort. Im eigenen Hafen bewusst an Land bleiben testen.
4. Nachweisbaren knappen Altvertrag einmalig ankern: nur exakter Fehlbetrag, Originalfrist sichtbar, keine automatische Station/Prämie. Download/Import/Neustart darf nicht nochmals verlängern. M2 ohne Erstnachweis bleibt unverändert.
5. iPhone/iPad-Safari: Hoch-/Querformat, Scrollen, Touch-Ziele, Dialogschließen, Dateien-App-Export/-import, Hintergrundwechsel und Wiederaufnahme. Fehlende Speicher-/Lock-Unterstützung muss sicher und verständlich abbrechen.
6. Flugmodus: geladene Partie speichern/exportieren; danach wirklichen Kaltstart unter derselben Datei/Adresse versuchen. Kaltstart und Datenerhalt separat erfassen. Nach Browser-/Adress-/Gerätewechsel nur manuell übertragen, keine Synchronisierung erwarten.

Safari/WebKit, echte Geräte, langfristige Browser-Datenaufbewahrung, OS-Abbruch und Offline-Kaltstart bleiben ausdrücklich offen. Keine vollständige plattformübergreifende Freigabe.
