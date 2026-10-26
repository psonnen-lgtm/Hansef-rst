# Vorbereitetes Testpaket 0.8b – noch keine neue öffentliche Spieladresse

[Testpaket 0.8b herunterladen](hansefuerst-0.8b-testpaket.zip), 34,67 MB. Vollständig entpacken, mit vorhandenem Python 3.9+ `START_TEST.py` starten (`python`, `python3` oder `py -3`). Die lokale Startseite öffnet sich nur auf dem PC. iPhone/iPad im gleichen Heimnetz: eigene private PC-IP nachsehen, z.B. `python START_TEST.py --lan 192.168.178.20`, dann diese Adresse mit Port 8000 in Safari öffnen. Keine Router-/Internetfreigabe einrichten; PC muss laufen. Alle Details in der beiliegenden `LIESMICH.txt`.

Enthält das **unveränderte Spiel 0.8a/V11**, Startseite, Törnanleitung, Sicherungsschritte und freiwilligen Fragebogen ohne Sendeformular. Original-HTML und ältere ZIPs bleiben erhalten. [Bericht mit Gerätenachweisen und Grenzen](../docs/entwicklungsberichte/2026-10-26_0.8b_private_testversion.md), [Bereitstellungshinweise](../deployment/phase08b/README.md). Echte Apple-/LAN-/Dateiproben fehlen noch.

GitHub Pages wäre öffentlich und ist für diese neue Testfassung nicht freigegeben/aktiviert. Die Repositoryquellen einschließlich ZIP sind wie bisher öffentlich lesbar. Vor öffentlicher Bereitstellung bestehende Pages-Inhalte prüfen; kein automatisches Überschreiben. Vor Datei-/Adress-/Gerätewechsel immer die vorhandene Partie extern exportieren, Sicherungen und ausgefüllte Antworten außerhalb des Paketordners halten. Keine Cloud-Synchronisierung.

Frühere Ausgaben:

---

# Aktuelle Prüffassung: Hansefürst 0.8a

[Zusatzpaket 0.8a herunterladen](hansefuerst-0.8a-assets.zip) (34,65 MB), vollständig entpacken und HTML/Assets zusammenlassen. Die vollständige HTML-Datei im Repository bleibt erhalten (46,30 MB). [Bericht mit Bildern und Grenzen](../docs/entwicklungsberichte/2026-10-26_0.8a_spielspass_bedienung_qualitaet.md).

Vor Wechsel von Adresse, Datei, Browser oder Gerät die bisherige Partie im Spiel exportieren. Am Ziel bei Bedarf importieren: keine Cloud, keine automatische Zusammenführung. Spielstände und freiwillige Testdaten sind verschiedene Dateien. Bei Speicherwarnung vor Neuladen/Schließen unbedingt den aktuellen Spielstand exportieren; Browserdaten nicht ungesichert löschen.

Für die erste private Runde den gesamten Assetordner unter einer festen Adresse verwenden oder die gewünschte lokale Dateiöffnung am Zielgerät prüfen. Chromium in vier Größen ist abgenommen; echte Safari-/iPhone-SE-/iPad- und native Offline-Dateiprüfung steht aus. Vor unbeaufsichtigter Verteilung dort mindestens eine vollständige Handelsfahrt und Export/Übertragung/Import/Reload ausprobieren.

Das folgende ältere 0.7b-Paket bleibt als bisheriger Stand unverändert erhalten.

---

# Hansefürst 0.7b ausprobieren

Die vollständige `Hansefuerst_0_4.html` im Repository bleibt die bisherige Einzeldatei (46,3 MB). Als zusätzliche Ausgabe gibt es [hansefuerst-0.7b-assets.zip](hansefuerst-0.7b-assets.zip), rund 34,65 MB.

1. Vor Datei-/Adress-/Gerätewechsel die laufende Partie im bisherigen Spiel exportieren.
2. ZIP vollständig entpacken. HTML und `assets` zusammenlassen. Für gemeinsame Gerätetests kann der gesamte Ordner unter einer festen statischen Webadresse liegen; keine fremden Grafikdienste nötig.
3. HTML öffnen und gegebenenfalls den exportierten V11-Spielstand importieren. Browser teilen Daten zwischen verschiedenen Orten nicht zuverlässig.

Alle elf Städte funktionieren in Chromium in drei Bildschirmgrößen. Native lokale Datei- und Offlinebedienung sowie echte Safari-/iPhone-/iPad-Geräte sind noch nicht abgenommen; die Cloud blockiert `file://`. Vor dem eigentlichen Test am Gerät prüfen.

[Bericht, Bildnachweise, technische Grenzen und Prüfsummen](../docs/entwicklungsberichte/2026-10-25_0.7b_elf_lebendige_hansestaedte.md).
