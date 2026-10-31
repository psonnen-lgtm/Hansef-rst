# R1.05 - Emulation und Technik

Datum: 28.10.2026 (Europe/Berlin). Eigenständige private Untersuchung der bereitgestellten deutschen DOS-Dateien. Keine Änderung an Hansefürst-Spielcode, main, Spielständen oder GitHub Pages.

## Ergebnis und Abgrenzung

**DOSBox wurde tatsächlich ausgeführt. Der Original-Installer wurde grafisch dargestellt. PATRIZ.EXE/PATR.EXE erreichten nach ergänzter Dateianordnung die Einleitung und das Holstentor-Hauptmenü mit Laden/Starten. Eine vollständig spielbare Sitzung ist nicht nachgewiesen.** Das ist ein belegter Programmstart, noch keine erfolgreiche Handels-, Reise-, Wahl- oder Speicherprobe.

| Prüfpunkt | Ergebnis dieser Runde |
|---|---|
| DOS-Emulator startet | bestanden: DOS-Befehl erzeugte PROBE.TXT mit Testtext |
| Original-Installer startet | bestanden: Ziel-Laufwerk/-Pfad und Archiv-Entpackphase sichtbar |
| Installation komplett über Installer | nicht bestanden/nicht abgeschlossen; begrenzte Läufe wurden beendet |
| Originalspiel startet | teilweise bestanden: Einleitung und Hauptmenü sichtbar |
| Wirtschaft zugänglich | nicht nachgewiesen |
| Schiff steuerbar | nicht nachgewiesen |
| Spieltage vergehen | nicht nachgewiesen |
| Speichern und Laden | nicht nachgewiesen; keine Testspielstände erzeugt |
| Politik/Wahlen erreichbar | nicht nachgewiesen; Handbuch und Programmtexte vorhanden |

Die Abschlussphase zum regulären Neuspiel-Einstieg wird im Startprotokoll unten vermerkt. Aus fehlendem Gameplay folgt kein Beweis, dass das Original grundsätzlich nicht spielbar wäre.

## Originalquellen und Prüfsummen

| Eingabedatei | Bytes | SHA-256 |
|---|---:|---|
| Der_Patrizier_German_Disk_1(1).IMA | 1.474.560 | `15ff0e5d2b7f0a17d13f4b49ea5394ab8d97bc31415444ef5f21af2adc1f4a58` |
| Der_Patrizier_German_Disk_2(1).IMA | 1.474.560 | `2bbbf5cf8bb674bfdf1d97528a5eb387ab8ba9133ddb0b26e468e6a43f3aeeb2` |
| Patrician, The (1992)_manual-de(1).pdf | 81.076.425 | `7daf4f8b61cc91beb93df4a4240eac961aa30db66dca9eaec6ce59e0a5f9c816` |

Das Handbuch umfasst 116 gescannte PDF-Seiten; normale Textextraktion lieferte nur 116 Bytes. OCR mit Tesseract wurde privat über die Textseiten erstellt. Relevante Seiten wurden zusätzlich bildlich bzw. mit deutscher OCR geprüft. Seitenbelege in den Berichten bezeichnen PDF-Seiten, nicht die historische Kapitelzählung. OCR ist eine Suchhilfe; nicht alle Zahlen/Typografie sind zuverlässig erkannt.

Die Images sind lesbare FAT12-Disketten mit 512 Bytes/Sektor, einem Sektor/Cluster, zwei FATs, 224 Root-Einträgen und neun Sektoren/FAT. Diskette 1 enthält F1.EXE und INSTALL.EXE; Diskette 2 F0/F11/F2/F3/F6/F7.EXE und LHA213.EXE. Alle Größen und Prüfsummen stehen in `data/disk_files.csv` und `data/input_inventory.json`.

F*.EXE sind LHA-Selbstentpacker. Sie wurden auf dem Host **nicht ausgeführt**, sondern mit dem vertrauenswürdigen Lhasa-Datenleser als Archive gelesen. LHA213.EXE wurde nicht auf dem Host gestartet. Entpackt wurden 153 Dateien; ihr Hashinventar steht in `data/unpacked_inventory.json`. Vollständige Archiv- und Programminhalte bleiben privat und werden nicht veröffentlicht. FAT- und Archivlesbarkeit sind geprüft; eine vollständige forensische FAT-Konsistenzprüfung ist nicht behauptet.

PATR.EXE: 260.752 Bytes, MZ. PATRIZ.EXE: 2.784 Bytes, MZ. Dateidatierungen im Archiv reichen bis November 1992. Eine exakte kommerzielle Build-/Patchversion oder Herkunftsgeschichte der Abbilder wurde nicht unabhängig authentifiziert.

## Umgebung, Emulatoren und Bezugsquellen

Host: Linux x86_64, Ubuntu 24.04.3 LTS. Kein DOS-Emulator anfangs auf PATH; keine nutzbare grafische DISPLAY-Sitzung.

1. Offizielles DOSBox Staging 0.83.0 für Linux heruntergeladen. Archiv-SHA-256 `d3a94f7f1c3e68a47ec88d61145506c7904452adb0c9c5928cb8cfe2331d6c5c` stimmt mit der offiziellen Downloadseite überein. Schon `dosbox --version` endete mit Segmentation fault. Ursache nicht diagnostiziert; keine Aussage über einen allgemeinen Fehler dieser Version.
2. DOSBox-X `2024.03.01+dfsg-1build2` aus dem konfigurierten Ubuntu-Snapshot beschafft. Native Bibliotheken fehlten zunächst, später weiterhin libibverbs, libpipewire und libinstpatch. Um die Runde zu begrenzen, keine vollständige Abhängigkeitsinstallation mehr versucht.
3. **Erfolgreich verwendet: DOSBox 0.74-3**, Ubuntu-Paket `0.74-3-5build2`, mit SDL-Kompatibilitätsbibliotheken aus demselben Snapshot. Dies ist der tatsächlich getestete Emulator, nicht DOSBox-X oder Staging.

Offizielle Projektquellen: [DOSBox](https://www.dosbox.com/), [DOSBox-X](https://dosbox-x.com/), [DOSBox Staging Linux](https://www.dosbox-staging.org/download/linux/). Paketquelle: `https://snapshot.ubuntu.com/ubuntu/20260828T000000Z`, noble/noble-updates. Native Werkzeuge wurden ausschließlich aus diesen Quellen beschafft. Die erfolgreich heruntergeladenen Ubuntu-Pakete sind mit Versionen in `data/emulator_packages.csv` erfasst; das Inventar ist keine Liste vollständig installierter Systempakete.

## Technische Hindernisse und begrenzte Lösungen

- Normales apt update scheiterte beim Benutzerwechsel (`setgroups`, `setegid`, `seteuid`). Als bereits im Container vorhandener Benutzer wurden Paketlisten mit `APT::Sandbox::User=root` lesbar; keine zusätzliche Hostberechtigung erteilt.
- apt install scheiterte anschließend am Schreibzugriff auf `/var/cache/apt/archives/partial`. Daher Pakete mit apt download im privaten Arbeitsverzeichnis gespeichert und mit dpkg-deb in einen lokalen sysroot entpackt. Kein erfolgreiches globales apt install behauptet.
- Xvfb scheiterte zunächst an Listenern, anschließend an fehlendem xkbcomp. Ein lokal beschafftes xkbcomp konnte den zweiten Fehler beheben; nutzbare X11-Verbindungen entstanden trotzdem nicht. Ein TCP-Verbindungsversuch auf den Testdisplay-Port wurde abgewiesen. Der genaue Plattformgrund der Socketbeschränkung blieb offen.
- Deshalb SDL_VIDEODRIVER=dummy und SDL_AUDIODRIVER=dummy. Der DOS-Emulator rendert dabei in eine Speicherfläche.
- Ein selbst geschriebener, mit gcc gebauter SDL-Mitschnitt-Helfer speicherte diese Fläche über SDL_SaveBMP_RW. Für begrenzte Versuche wurden normale SDL-Tastatur-/Mausereignisse eingespeist. Es wurden keine Originalprogramme gepatcht, keine Prüfabfragen übersprungen und keine Schutzmechanismen umgangen.
- DOSBox 0.74-3 unterstützt in der hier verwendeten Form keine Liste mehrerer Floppy-Images bei einem imgmount: Die erste Mount-Zeile wurde mit einer entsprechenden Meldung abgewiesen. Danach nur ein Image gemountet. Zusätzlich wurde für einen Installationsversuch ein privates Verzeichnis mit den aus beiden Images gelesenen Installationsdateien als A: gemountet. Das ist eine angepasste Installationsquelle, keine gemessene Diskettenwechselprobe.

## Installation und Startprotokoll

1. Reproduzierbares FAT12-Inventar erstellt, F*.EXE rein als Archive entpackt.
2. DOSBox-Probebefehl: `echo EMULATOR_OK > c:\probe.txt`, anschließend exit; Ausgabedatei erfolgreich gelesen.
3. INSTALL auf A: innerhalb DOSBox gestartet. Zielauswahl/Pfadeingabe und das Entpacken der Bilder im Original-Installer bildlich nachgewiesen. Die begrenzten Läufe endeten vor einer verifizierten vollständigen Installation.
4. Ein flach entpackter Spielstart brach nachvollziehbar wegen fehlendem `C:\bilder\DM.PPT` ab. Das war ein Layoutfehler, kein beschädigter Bildbeleg.
5. Der Installer hatte unter C:\PATRIZ die Ordner BILDER, SON&SAM, SPIELE.DAT, SPIELE.SAV und GAMEDAT mit Unterordnern angelegt. Unveränderte Dateien wurden entsprechend ihrer Typen ergänzt: PPT nach BILDER, DATEI.* nach SPIELE.DAT, Ton-/Musikdateien nach SON&SAM, EXE ins Hauptverzeichnis. PAK/FIL wurden den GAMEDAT-Unterordnern zugeordnet; deren vollständige Richtigkeit wurde mangels Gefecht nicht validiert.
6. `C:`, `CD PATRIZ`, `PATRIZ`: Originaleinleitung, Credits und nach einem auf 115 Sekunden begrenzten Lauf das Holstentor-Hauptmenü sichtbar. Kein Original-EXE direkt auf dem Host ausgeführt.
7. Separater auf 120 Sekunden begrenzter Lauf mit einem normalen Starten-Mausklick. Schlusszustand siehe Ergänzung am Ende dieses Berichts. Danach beendet, keine weiteren Emulator-/Debugger-Schleifen.

Alle Zeitlimits hier sind technische Laufzeiten der Versuche, **keine menschlichen Spielzeitmessungen**.

## Verwendete Konfiguration

```ini
[sdl]
output=surface
windowresolution=960x720
[render]
aspect=true
[cpu]
cycles=10000
[mixer]
nosound=true
[autoexec]
mount c private/game
imgmount a "upload/Der_Patrizier_German_Disk_1(1).IMA" -t floppy
c:
```

Umgebungsvariablen: `SDL_VIDEODRIVER=dummy`, `SDL_AUDIODRIVER=dummy`, `LD_LIBRARY_PATH` auf lokale Ubuntu-Bibliotheken; `LD_PRELOAD` ausschließlich auf den selbst geschriebenen Mitschnitt-Helfer. Kein Netzwerkadapter für den DOS-Gast eingerichtet. Nur private Spiel-/Installationsverzeichnisse und das einzelne Diskettenabbild als DOS-Laufwerke eingebunden, keine Benutzer- oder Repositorylaufwerke. Die DOS-Gastisolation ist kein nachgewiesener Linux-Sicherheitscontainer: bwrap-Namespace-Erstellung war hier nicht möglich. Das Original lief ausschließlich als emulierter DOS-Code.

Die private Evidenzsicherung enthält Screenshots und Protokolle, keine weiterzugebenden DOS-Programme, Diskettenabbilder, Tondateien oder extrahierten Bildarchive. Screenshots selbst bleiben ebenfalls außerhalb des öffentlichen Repositorys. Keine Testspielstände vorhanden.

## Reproduktion, Prüfung und Sicherungsumfang

```sh
python3 scripts/analyse_images.py EINGABE PRIVATER_AUSGABEORDNER --extract-private
# F*.EXE danach mit vertrauenswürdigem Lhasa als Archive lesen, nicht starten.
python3 scripts/check_structures.py PRIVAT_ENTPACKTE_DATEIEN METADATEN_AUSGABE
```

Die Skripte enthalten keine Originalprogrammteile. Eingabepfade und geschützte Ausgabedaten nie in einen öffentlichen Git-Commit aufnehmen. CSV/JSON unterscheiden Strukturwerte, Kandidatenzuordnungen und tatsächlich gemessene Daten. Leere Reise-/Wirtschaftstabellen sind beabsichtigt; es wurden keine Messzeilen erfunden.

Hansefürst-Referenzcommit: `ffc0bfad0e36e4547f7a5750bb68b169f93f8009`. Kein Hansefürst-Spielcode getestet. Vorhandene 1.500er-Simulation nur als vorgegebener Hintergrund übernommen, nicht erneut geprüft; keine Neuberechnung bei reiner Forschung/Dokumentation. Statische Disassemblierung führte zu keiner validierten Reise-, Preis- oder Wahlformel.

## Schlusszustand des Neuspielversuchs

Der zusätzliche 120-Sekunden-Lauf endete erneut im Holstentor-Hauptmenü. Ein bei ungefähr 100 Sekunden eingespeister Starten-Klick führte innerhalb dieses Laufs zu keinem beobachteten Menüwechsel. Ob der Klick vor der Menübereitschaft lag oder die kopflose Maussteuerung unzureichend war, wurde nicht weiter getestet. **Es wurde weder die Einbürgerung noch eine Kopierschutzabfrage erreicht.** Die im Handbuch (PDF 38) dokumentierte Wappen-/Kartenabfrage ist somit ein möglicher späterer Zugangspunkt, kein in diesem Lauf beobachteter Blocker. Keine Abfrage beantwortet oder umgangen.

Konkrete verbleibende Grenze: Es steht keine bedienbare grafische Sitzung zur Verfügung; die begrenzte SDL-Ereigniseinspeisung hat noch keinen regulären Neuspielablauf bestätigt. Dadurch keine Tages-, Reise-, Markt- oder Wahlmessung. Weitere Versuche wurden entsprechend der vorgegebenen Begrenzung eingestellt. Der letzte Hauptmenü-Bildschirm ist privat gesichert.
