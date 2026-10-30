# Q1.09d – Ausfüllbare Geräteabnahme

30.10.2026 · Europe/Berlin · V13/Politik2/Sicherheit3. Unveränderter Q1.09c-Spielcode `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, Basis `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`. **Keine iPhone-/iPad-/Safari-Prüfung durchgeführt.** Alle42 Gerätezeilen beginnen mit „Nicht getestet“. Die fünf bestandenen VM-Datenprüfungen sind ausdrücklich keine Geräteabnahme.

[CSV herunterladen](../../../tests/safety/q1_09d/geraete-ergebnisse.csv): pro Gerät eine Zeile je Schritt; Spalten **Gerät, Betriebssystem, Browser, Testschritt, Erwartetes Ergebnis, Tatsächliches Ergebnis, Status, Fehlerbeschreibung**, zusätzlich Testadresse und Datum. In Numbers/Excel öffnbar; alternativ Schritt-ID und Ergebnis als Nachricht melden. CSV mit UTF-8-BOM zur einfachen Übernahme vorbereitet. Keine Uploadfunktion und keine automatische Datenerfassung.

Erlaubte Statuswerte: **Bestanden / Fehlgeschlagen / Nicht getestet**. „Erwartet“ ist kein tatsächliches Ergebnis. Eine Blockade als Nicht getestet samt Grund eintragen; eine durchgeführte, am Ziel gescheiterte Prüfung als Fehlgeschlagen. Beispiel Offline-Kaltstart: Netzfehler tatsächlich beobachtet → Fehlgeschlagen für diesen Kaltstart, auch wenn das bereits als offene Grenze bekannt war. L01 ist nur ein getrennter, hier nicht freigegebener Zugangsweg. P02 ohne tatsächliche Sperre nicht als bestanden markieren.

Vor dem ersten Schritt konkrete separate Testadresse und Backupvoraussetzungen nach [Testzugangsplan](Q1_09d_testzugang.md) bestätigen. Keine echten Dateien verwenden oder Browserdaten löschen. Bei einer unbekannten Partie am Testzugang sofort stoppen. [Anleitung mit Sollwerten](Q1_09d_geraeteanleitung.md).

Die folgende Übersicht ist ebenfalls unausgefüllt. Betriebssystem/Browserbuild und vollständige Testadresse in die CSV übernehmen; tatsächliches Ergebnis und Fehlermeldung wörtlich ergänzen.

| Gerät | Betriebssystem | Browser | Testschritt / Erwartung | Tatsächlich | Status | Fehlerbeschreibung |
| --- | --- | --- | --- | --- | --- | --- |
| iPhone | offen | Safari/Build offen | T01: Neustart normal: TEST-Name, 5000 Gold, Kogge, Lübeck, Tag1; keine Speicherwarnung | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T02: Eine kleine Spende: 4950 Gold, +2 Ansehen, kein neuer Tag; automatisch gespeichert | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T03: Tab schließen/gleiche Adresse öffnen: Stand T02 erhalten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T04: Export als nicht leere JSON in Dateien gesichert; TEST-Name und Werte geprüft | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T05: Nach zweiter Spende Export T04 importieren: 4950 Gold; Reload identisch | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T06: Persönliche Reise Lübeck nach Hamburg: Schiff und Person am Ziel; Gebühren/Tage einmal | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T07: Unbegleitet Hamburg nach Lübeck: Schiff Lübeck; Person Hamburg; keine persönliche Ankunft | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T08: Ansicht/Schiffshafen/Person getrennt; persönliche Handlung in Lübeck gesperrt | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T09: App-Wechsel: vollständiger letzter Stand, keine doppelte Reise | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T10: Safari vollständig beenden/online neu öffnen: letzter gespeicherter TEST-Stand erhalten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T11: Bereits geladene Seite offline: lokale Aktion und Export möglich; genau eine Spende | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | T12: Offener Offline-Kaltstartversuch: interaktive Seite oder Netzfehler/Standbild dokumentieren; danach online Daten erhalten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | F01: Neustart-Referenz: 5000 Gold, Kogge Lübeck; Export/Reimport/Reload erhält Daten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | F02: Altstand: 5200 Gold, 4 Ansehen, Altort unbekannt; Original extern gesichert; Export/Reimport/Reload | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | F03: Flotte: 20000 Gold, drei Hafenstandorte; Hamburger Schiff unbegleitet fahren; Kaufmann bleibt Lübeck | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | F04: Kredit/Waren: Gold12000/Bank2500/Schulden700; Getreide7@8/Hamburg, Salz12@10/Stettin erhalten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | F05: Politik: Bürgermeistertitel/Amt Lübeck, Vertrag/Originalfrist und keine automatische Station erhalten | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | P01: Privates Safari getrennt; Speicher/Export beobachten; kein garantierter Datenerhalt nach allen privaten Tabs | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | P02: Nur bei vorhandener Sperre: verständliche Warnung, keine unsichere Teilaktion; sonst Nicht getestet | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | U01: Hoch/Querformat: Scrollen, Schließen, Touch, Download und Dateiauswahl bedienbar | — | Nicht getestet | — |
| iPhone | offen | Safari/Build offen | L01: Lokale HTML nicht freigegeben/abgenommen: Nicht getestet; nicht mit HTTPS-Kaltstart verwechseln | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T01: Neustart normal: TEST-Name, 5000 Gold, Kogge, Lübeck, Tag1; keine Speicherwarnung | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T02: Eine kleine Spende: 4950 Gold, +2 Ansehen, kein neuer Tag; automatisch gespeichert | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T03: Tab schließen/gleiche Adresse öffnen: Stand T02 erhalten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T04: Export als nicht leere JSON in Dateien gesichert; TEST-Name und Werte geprüft | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T05: Nach zweiter Spende Export T04 importieren: 4950 Gold; Reload identisch | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T06: Persönliche Reise Lübeck nach Hamburg: Schiff und Person am Ziel; Gebühren/Tage einmal | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T07: Unbegleitet Hamburg nach Lübeck: Schiff Lübeck; Person Hamburg; keine persönliche Ankunft | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T08: Ansicht/Schiffshafen/Person getrennt; persönliche Handlung in Lübeck gesperrt | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T09: App-Wechsel: vollständiger letzter Stand, keine doppelte Reise | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T10: Safari vollständig beenden/online neu öffnen: letzter gespeicherter TEST-Stand erhalten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T11: Bereits geladene Seite offline: lokale Aktion und Export möglich; genau eine Spende | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | T12: Offener Offline-Kaltstartversuch: interaktive Seite oder Netzfehler/Standbild dokumentieren; danach online Daten erhalten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | F01: Neustart-Referenz: 5000 Gold, Kogge Lübeck; Export/Reimport/Reload erhält Daten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | F02: Altstand: 5200 Gold, 4 Ansehen, Altort unbekannt; Original extern gesichert; Export/Reimport/Reload | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | F03: Flotte: 20000 Gold, drei Hafenstandorte; Hamburger Schiff unbegleitet fahren; Kaufmann bleibt Lübeck | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | F04: Kredit/Waren: Gold12000/Bank2500/Schulden700; Getreide7@8/Hamburg, Salz12@10/Stettin erhalten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | F05: Politik: Bürgermeistertitel/Amt Lübeck, Vertrag/Originalfrist und keine automatische Station erhalten | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | P01: Privates Safari getrennt; Speicher/Export beobachten; kein garantierter Datenerhalt nach allen privaten Tabs | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | P02: Nur bei vorhandener Sperre: verständliche Warnung, keine unsichere Teilaktion; sonst Nicht getestet | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | U01: Hoch/Querformat: Scrollen, Schließen, Touch, Download und Dateiauswahl bedienbar | — | Nicht getestet | — |
| iPad | offen | Safari/Build offen | L01: Lokale HTML nicht freigegeben/abgenommen: Nicht getestet; nicht mit HTTPS-Kaltstart verwechseln | — | Nicht getestet | — |

## Noch zu bestätigen

- Normales Safari: Web Locks und IndexedDB sind produktiv verpflichtend. Erfolgreiche gespeicherte Aktion plus Reload prüft ihren nutzbaren gemeinsamen Pfad; keine einzelne API nur aus dem Browsernamen als verfügbar abhaken.
- Privates Safari: separat und ohne Versprechen dauerhafter Speicherung.
- iOS-Dateiverwaltung: echter Download/Import, nicht nur sichtbare Vorschau.
- App-Wechsel, vollständiger Browserabschluss, Offline-Nutzung der geladenen Seite und Offline-Kaltstart getrennt melden.
- Ein erfolgreicher Einzeltest garantiert keine dauerhafte Aufbewahrung durch iOS oder Browsercache. Testexporte extern behalten.

Freigabeumfang bleibt beim Nutzer. Kein automatisches Deployment, kein Merge, keine Folgephase.
