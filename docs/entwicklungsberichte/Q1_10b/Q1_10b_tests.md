# Q1.10b – Tatsächlich ausgeführte Prüfungen

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Maßgebliche Abnahme

**57/57 Prüfgruppen bestanden**, Chromium **154.0.8037.57**, null ungefangene Seitenfehler. Vollständiger Lauf am 7. November 2026:

```sh
node tests/features/q1_10b/browser-checks.cjs tests/features/q1_10b/results/native-release.json
```

[Unveränderte Rohdatei](../../../tests/features/q1_10b/results/native-release.json). Sie nennt Codecommit, HTML-Hash, Browser, jede Gruppe und deren Befunde. Frische synthetische Browserkontexte, temporärer Loopbackserver, echte IndexedDB/Web Locks/FileReader/Downloads; keine Website veröffentlicht, keine echten Nutzerimporte und kein VM-Ersatz für die Browserabnahme.

## Gruppen und bewusste Änderungen an alten Erwartungen

| Gruppen | Nachweis |
|---|---|
| 01–26 | Start, fünf Partien, Autosave/Isolation, Metadaten, bestätigtes Löschen, Fortsetzen, V13, Originalbackup, Wiederherstellung, atomare Fehler, Mehrfenster und verzögerter Import |
| 27 | W1-S/Kredit unverändert; bekannter globaler Ansehensfehler weiter reproduzierbar |
| 28 | Statt persönlicher/unbegleiteter Wahl: selbstständige Hin-/Rückfahrt, gleiche Kosten/Tage, historische Person unverändert, kein Ankunftsbonus; politische Aktion mit Schiff erlaubt, ohne Schiff gesperrt |
| 29 | Statt neuer persönlicher Schonung: keine neue Schonung; tatsächlichen alten Q1.10a-Nachweis erhalten, ohne Friststapelung |
| 30–40 | Risikoretry, fehlende Speicherprimitive, Touchverwaltung, Schiffbau-Sicherheiten, FileReader-Reihenfolge, Namen/TEST-Abgrenzung, ID-Kollision und Revisionsüberlauf |
| 41–44 | 33 direkte lokale Aktionszugänge, zehn Gebäudeansichten/neun Navigationswege, zwei Häfen, konkrete Schiffsauswahl; Lagerherkunft, Miete, Bank/Kredit, Reparatur, Bad und Spende |
| 45–47 | Vorbereitung noch im Hafen; tatsächlicher Fahrtzustand ohne Zugangsrecht; beschädigter Konvoi; vier native Alt-/Neu-Reisevergleiche |
| 48–49 | Ausdrückliche Ratsbestätigungen einmalig; historische Verträge, Amtsort und Titel |
| 50–51 | Native Transaktionsabbruch-Reise mit wiederverwendetem Piratenereignis; kein Schreiben/Ankommen in einer anderen Partie |
| 52 | Smartphone hoch/quer, Tablet und Desktop: Reise, Kirche und Partienverwaltung |
| 53–54 | Fachliche Wahlvoraussetzungen, einmalige Ernennung trotz zweier Schiffe; Hansevertrag mit zwei Handelsräumen und einmaligen Stationsbelegen |
| 55–57 | Keine neuen Fern-Hafennachrichten, fahrendes Schiff trotz örtlichen Begleitschiffs gesperrt, Lieferherkunft und einmalige Prämien/Versorgungsbelege |

Der neue Treiber leitet sich vom Q1.10a-Treiber ab. Alte Datei und alte Ergebnisse wurden nicht angepasst. Gruppen 28/29 ersetzen ausdrücklich durch Nutzerbeschluss überholte Aussagen; keine stille Löschung von Schutzprüfungen. Die 17 neuen Gruppen ergänzen die Abnahme. Im Rohfeld `equalEconomicFields` von Gruppe 47 steht 16; konkret verglichen wurden 15 Zustandsbereiche plus Reiseereignis, außerdem die Zufallsabrufzahl. Keine Behauptung einer zusätzlichen ungesehenen Kennzahl.

## Zwischenläufe und Fehler

1. `native-attempt-1.json`: **48/54**, Code `b889f1234ee9166cec5120b7c5a5977c356e4454`, keine Seitenfehler. Sechs rote Treiberfälle: `show()` liefert traditionell keinen Rückgabewert; absichtlich deaktiviertes Mengenfeld ließ sich nicht füllen; synthetische neue Schiffe hatten noch keine `bookCosts`/`origins`; künstliches Setzen des Tages übersprang den erforderlichen Handelsbrief-Zeitfortschritt; zwei Fürsprecher lagen im selben Handelsraum. Zwei Prüfungen waren von den fehlenden Ladungsfeldern betroffen. Schutzregeln nicht abgeschwächt, gültige Vorbereitung und eigentliche Zustands-/Nebenwirkungsassertionen ergänzt.
2. `Q110B_ONLY='^(42|43|44|50|53|54|55|56|57) ' node tests/features/q1_10b/browser-checks.cjs tests/features/q1_10b/results/native-focused-1.json`: **8/9** auf finalem Spielcode. Gruppe 44 übersah 1 Gold vorhandene Tagesmiete zusätzlich zu 15 Gold Badekosten. Erwartung auf 16 Gold berichtigt, Wirtschaftsregel unverändert.
3. Vollständiger abschließender Lauf: **57/57**. Die ursprünglichen roten JSON-Dateien bleiben erhalten. Erste Bildschirmbilder sind vor Aktualisierung unter `attempt-1-screenshots/` archiviert; `attempt-1-screenshot-archive.json` ordnet die ursprünglichen Pfade zu.

Zusätzliche Quellprüfung erkannte fern erzeugbare Hafennachrichten im globalen Handelsbuch; gezielt geschützt und in Gruppe 55 abgedeckt. Aktuelle Dateiänderungen, unveränderte Wirtschafts-/Speicherfunktionen und Rekonstruktion des gesamten Basis-HTML werden separat geprüft:

```sh
node --check /tmp/q110b-current.js
node --check tests/features/q1_10b/browser-checks.cjs
python tests/features/q1_10b/static-checks.py tests/features/q1_10b/results/static-verification.json
```

Der temporäre JavaScriptpfad wurde aus dem einzigen eingebetteten Scriptblock der aktuellen HTML extrahiert. [Statische Ergebnisse](../../../tests/features/q1_10b/results/static-verification.json): 3.588 alte Dateien verglichen; nur Spiel-HTML und angehängter Berichtsindex geändert. 40 begrenzte Patches rekonstruieren rückwärts das komplette Q1.10a-HTML bytegenau. 28 Wirtschafts-/Reise-/Speicherfunktionen stimmen im Quelltext exakt überein; sieben Berichte einschließlich Bestandsaufnahme und 15 relative Links geprüft. Der erste statische Durchlauf beanstandete seinen eigenen noch nicht erzeugten Ergebnislink; der Prüfer berücksichtigt jetzt ausschließlich den gerade zu erzeugenden Ergebnispfad und verlangt bei allen anderen Links weiterhin vorhandene Dateien. Abschließender statischer Lauf bestanden.

## Browserbilder und Grenzen

375×812, 812×375, 820×1180 und 1280×900. Touch-Emulation, ausreichend große Reise-/Schließenknöpfe, kein horizontaler Dokument-/Dialogüberlauf, tatsächlicher Klick auf Weitersegeln und anschließende lokale Gebäudenutzung. Bilddateien `fleet-travel-*.png`, `fleet-church-*.png`, `fleet-manager-*.png` und `save-manager-*.png` unter den neuen Ergebnissen. Telefon-Reisebild, Tablet-Reisebild und Telefonquerformat-Verwaltung wurden zusätzlich visuell gesichtet; Inhalte auf kleinen Displays benötigen den vorhandenen Dialogscroll.

Keine echten Safari-/iPhone-/iPad-Tests dieser Phase. Keine vollständige Wirtschafts-/Karrieresimulation; keine neue Langzeitstatistik. Reale Quota-Erschöpfung, private Browserprofile, OS-Absturz, Offline-Kaltstart und alle möglichen manipulierten Zustände sind nicht durch diese Abnahme abgedeckt. [Offene Probleme](Q1_10b_offene_probleme.md).
