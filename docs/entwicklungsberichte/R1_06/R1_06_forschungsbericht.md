# R1.06 - Erste Handelssitzung: Neuspielstart erreicht, Kartenabfrage blockiert

28.10.2026. Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, eigener Branch `research/r1-06-first-trade`. Keine Hansefürst-Spielausführung, Codeänderung, Spielstandänderung, Wirtschaftssimulation oder Pages-Veränderung. R1.05 bleibt vollständig erhalten.

## Ergebnis

Die Eingabesteuerung wurde funktionsfähig: DOSBox konnte das Hauptmenü verlassen, Spieler 1 einbürgern, Geschlecht und Familienwappen wählen, **Lübeck** als Heimatstadt anzeigen/bestätigen und ein normales Spiel wählen. Danach erschien erstmals beobachtet die originale Karten-/Wappenabfrage. Sie verlangt die Zuordnung eines Wappens zu einem Städtenamen anhand der zum Spiel gehörenden Karte.

Die separat verlangte Handelskarte gehört nicht zu den drei bereitgestellten Dateien. Die vorliegenden Quellen bestehen aus zwei IMA-Abbildern und dem Handbuch. Die Dokumentation aus R1.05 beschreibt die Karte ausdrücklich als eigene Beilage; die in R1.06 bildlich überprüften Einleitungs- und Abschlussseiten des Handbuchs enthalten sie nicht. Es wurde keine Stadtantwort eingegeben, kein Durchprobieren und keine Schutzumgehung vorgenommen. Der Bildschirm wurde privat gesichert, ohne Wappen oder weitere Originalinhalte öffentlich zu veröffentlichen.

**Damit liegt der aktuelle Blocker nach dem Neuspielstart bei der fehlenden Kartenquelle; die bisher ungelöste Mausbedienung ist nicht mehr der unmittelbare Blocker.** Keine Aussage, dass die nachfolgenden Häfen oder alle Spielszenen schon funktionsfähig getestet wären.

## Abgeschlossene Schritte

| Schritt | Ergebnis |
|---|---|
| R1.05-Stand identifizieren | Merge-Basis und vier Forschungsberichte vorhanden |
| Lokale Umgebung wiederverwenden | DOSBox, lokale Bibliotheken, private Spielverzeichnisse und Konfiguration erhalten; keine Neuinstallation |
| Vorhandene Spielstände suchen | SPIELE.SAV ohne Testspielstände |
| Tastatur unabhängig testen | DOS PAUSE durch verzögertes Return beendet; danach INPUT_OK in separater Diagnosedatei |
| Maus tatsächlich bedienen | Sichtbare Cursorbewegung und erfolgreiche Dialogauswahl |
| Neue Partie beginnen | Spieleranlage bis zur Auswahl Lübeck und normales Spiel erreicht |
| Original-Kartenabfrage | Tatsächlich beobachtet; keine Antwort versucht |
| Reproduzierbaren Startspielstand erzeugen | Nicht erreicht |
| Lübeck-Rostock-Lübeck | Nicht begonnen |
| Zweite Reise / Marktvergleich | Nicht begonnen |

## Tatsächlich gemessene Spielwerte

| Strecke / Markt | Kalenderdatum | Reisedauer | Getreidepreis | Getreidebestand |
|---|---|---|---|---|
| Lübeck → Rostock | nicht beobachtet | nicht gemessen | nicht zugänglich | nicht zugänglich |
| Rostock → Lübeck | nicht beobachtet | nicht gemessen | nicht zugänglich | nicht zugänglich |

Keine abgeschlossene Fahrt, kein Markt-Snapshot und keine Kalenderbeobachtung. Die Mess-CSV besitzt deshalb nur die Kopfzeile; Nullmessungen werden nicht mit Reisedauer 0 verwechselt. Keine Ereignisse während laufenden Spiels beobachtet. Insbesondere keine R1.05-Matrixwerte als Tageszahlen übernommen.

## Technische Untersuchung

Der vorhandene SDL-Mitschnitt-Helfer wurde um eine während der Sitzung lesbare Kommandodatei und Eingabeprotokollierung ergänzt. Damit entfiel das wiederholte Abspielen der gesamten Einleitung für jeden einzelnen Bedienversuch. Originaldateien wurden nicht verändert; nur DOSBox erhielt normale Eingabeereignisse.

Es gab vier begrenzte Originalprogramm-Sitzungen: bestehende Konfiguration; autolock=false; zusätzlich usescancodes=false und Fokusereignis; schließlich dieselbe Kombination mit verzögertem Eingabebeginn. Zwei kurze DOS-PAUSE-Diagnosen trennen Helferprotokollierung von tatsächlich wirksamer Tastaturbedienung. Der erste frühe Test schloss nicht ab; der zweite mit Eingabe nach mindestens 3 Sekunden erzeugte INPUT_OK. Das beweist Tastaturbedienung am DOS-Prompt, nicht jede Spielaktion.

Unter der finalen Kombination bewegte `move 0 0` den sichtbaren Cursor zum oberen linken Rand. Weitere Bewegungen, Klicks und Texteingaben erreichten die Einbürgerungsdialoge. Die anfangs angenommene 1:1-Zuordnung zwischen Screenshot und SDL-Koordinaten stimmte nicht: Für die abschließenden Dialoge funktionierte ungefähr halbierte X-Koordinate bei unveränderter Y-Koordinate. So wurde Lübeck gezielt angeklickt und zunächst als Stadtname sichtbar geprüft. Diese Beobachtung ist keine allgemein bewiesene Skalierungsformel; intern wurden SDL-Clipgröße und DOS-Mausbereich nicht instrumentiert.

Die pauschale Aussage „Escape funktioniert“ aus einem frühen R1.06-Zwischenstand war zu stark: Dort lag zunächst nur die Protokollierung plus späterer Bildwechsel vor. Belastbar sind die unabhängige PAUSE-Probe und die späteren konkreten Spielinteraktionen. Welche einzelne Konfigurationsänderung für welche Verbesserung notwendig war, wurde nicht durch vollständige A/B-Tests isoliert.

Der Name der Testfigur wurde während der Bedienprobe uneinheitlich eingegeben (leerer Vorname, Nachname test); es handelt sich um eine private Testfigur, keinen Referenzspielstand. Das Protokoll enthält auch frühe wirkungslose Befehle und ist deshalb keine unbeaufsichtigt geprüfte Wiederholungssequenz.

Zur Eingrenzung wurde der unveränderte DOSBox-0.74-3-Quelltext aus dem Ubuntu-Paketarchiv nur gelesen. Er unterscheidet Mausfang und automatische Mausaktivierung. Daraus wurde keine Originalspielmechanik abgeleitet. Das Spiel selbst wurde weder disassembliert noch gepatcht.

## Reproduzierbarkeit

`dosbox.conf` enthält ausschließlich selbst erstellte Emulatoroptionen ohne Originaldateien. `scripts/sdl_input_capture.c` ist ein selbst erstellter Helfer; gegenüber der verwendeten lokalen Fassung wurden nur IO-Pfade durch R106_IO_DIR ersetzt. Die portable Fassung wurde übersetzt, aber nicht nochmals in einer neuen Spielpartie geprüft.

```sh
gcc -shared -fPIC scripts/sdl_input_capture.c -o /tmp/r106-input.so -ldl
mkdir -p /tmp/r106-io
: > /tmp/r106-io/input
# DOSBox und die unveränderte, privat installierte Originalfassung selbst bereitstellen.
R106_IO_DIR=/tmp/r106-io SDL_VIDEODRIVER=dummy SDL_AUDIODRIVER=dummy \
LD_PRELOAD=/tmp/r106-input.so dosbox -conf dosbox.conf \
-c 'mount c /ABSOLUTER/PFAD/ZUM/PRIVATEN/DOS-LAUFWERK' -c c: -c 'cd PATRIZ' -c patriz
```

Kommandos werden an input angehängt: `key 13`, `release 13`, `move 182 90`, `down 182 90`, `up 182 90`. Zwischen Ereignissen liegen mindestens 150 ms, Eingaben beginnen frühestens nach drei Sekunden. Der Helfer speichert frame.bmp und input.log im IO-Verzeichnis. Die konkrete Spielmaske muss vor jeder Auswahl bildlich geprüft werden; kein blindes Replay in die Kartenabfrage.

Das vollständige input-attempts.log umfasst mehrere Neustarts mit erneut bei null beginnenden SDL-Zeiten; es ist eine Versuchshistorie, keine durchgehende Zeitachse. newgame-input.txt zeigt die zuletzt verwendete Befehlsfolge einschließlich Korrekturen. Keine rechtlich geschützte Karte, Originaldatei, Grafik oder Serienangabe in diesem Forschungsverzeichnis.

## Prüfung und Grenzen

Neue Metadaten/CSV auf Syntax geprüft, Helfer mit gcc übersetzt, nur neue R1.06-Dateien und Berichtsindex geändert. Keine 1.500 Hansefürst-Simulationen ausgeführt; frühere Simulationen ausschließlich als Hintergrund übernommen, nicht neu validiert. Keine Änderungen an R1.05, produktiven HTML-Dateien oder existierenden Spielständen.

Offen bleiben Startspielstand und Save/Load, Kraier-Bestätigung im Hafen, Reisetage, Getreidepreise/-bestände, Marktveränderungen und Ereignisse. Die gewählte Heimatstadt ist keine Marktbeobachtung.

## Erkenntnis für Hansefürst und Abschluss

R1.06 liefert einen besseren Forschungszugang, aber keine neue belastbare Wirtschafts- oder Reiseformel. Es folgt keine Balanceempfehlung aus fehlenden Messungen. Für künftige Bedienprüfungen sind unabhängige Eingabetests und bestätigte Bildwechsel entscheidend.

Eine mögliche Fortsetzung benötigt zuerst die rechtmäßig vorliegende originale Handelskarte als zusätzliche Quelle. Danach wären derselbe begrenzte Auftrag, ein Startspielstand und die beiden datierten Fahrten sinnvoll. Keine Folgephase gestartet. Die Sitzung wurde an der unbeantworteten Kartenabfrage beendet.
