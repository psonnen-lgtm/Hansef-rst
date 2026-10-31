# Q1.10a – Tatsächlich ausgeführte Prüfungen

31.10.2026 Europe/Berlin · Branch `feature/q1-10a-multiple-savegames`.
Basis `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; final geprüfter Spielcode **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**, 46.402.592 Bytes. V13/Politik2/Sicherheit3; IndexedDB-Schema2, Bibliothek1.

## Abschließendes Ergebnis

**40/40 native Chromium-Prüfgruppen bestanden**, keine ungefangenen JavaScript-Seitenfehler. Maßgeblich: [vollständiger letzter Lauf](../../../tests/features/q1_10a/results/native-release.json), [Abnahmeübersicht](../../../tests/features/q1_10a/results/acceptance.json), [Treiber und Befehle](../../../tests/features/q1_10a/README.md). Tatsächlich **Chromium 154.0.8037.57**, echte IndexedDB, Web Locks, FileReader und Downloads; keine ersatzweise behauptete VM- oder Apple-Abnahme.

Nur ein temporärer lokaler 127.0.0.1-Server und frische Browserprofile mit künstlichen Daten. Keine echte Nutzerdatei und keine öffentliche Website. Fixtures stammen aus frischen synthetischen Zuständen, nicht aus historischen Simulationsendständen. Bewusst gesetzte Bürgermeisterdaten sind Bestandsschutz-Prüfdaten und kein Nachweis einer gespielten Karriere.

| Bereich | Konkreter Nachweis |
| --- | --- |
| Start/Partien | Drei Startfunktionen, tatsächlicher UI-Neubeginn mit 5.000 Gold, fünf gleiche Namen mit unterschiedlichen IDs, sechste Anlage sicher abgelehnt, Wechsel und Autosave nur in aktiver Partie, Fortsetzen nach Reload |
| Umbenennen/Löschen | Umbenennen erhält Spielinhalt/ID; abgebrochene Löschung ändert nichts; bestätigte Löschung betrifft nur Ziel; gelöschte aktive Partie kann in anderem Tab nicht wiederauferstehen |
| Import/Export | Nichtaktive Partie einzeln exportiert, eindeutiger Dateiname, Name und V13-Inhalt bei Rundreise erhalten; neue ID bei Import als neue Partie; ausdrücklicher bestätigter Ersatz; defekte/neue unbekannte/isolierte TEST-Dateien abgelehnt |
| V13-Bestand | Alter kanonischer Q1.09c-Stand und LocalStorage-V13 übernommen, exaktes Originalbackup, alte Quelle bytegleich, wahrhaft gleichzeitig wartende Starttabs erzeugen nur eine Übernahme |
| Inhalte | Bargeld/Bank/Kredit, Schiffe, Waren/Kosten/Herkunft, Lager, Bürgermeistertitel/Amtsstadt und laufender Vertrag erhalten; frühe M2-Person erhalten, kein erfundener Erstnachweis |
| Fehler/Recovery | Fehlerhaftes Original exportierbar und nur ausdrücklich übersprungen; gescheiterte Migration hinterlässt keine halbe Bibliothek; Retry erzeugt genau eine Partie; eigener Backup-Export und Wiederherstellung als neue ID |
| Transaktionen | Tatsächlicher nativer Abbruch nach erfolgreichem Put-Request rollt Partie, Katalog und Backup gemeinsam zurück; fehlgeschlagene Neuanlage wechselt keine aktive Partie |
| Mehrfenster/Asynchronität | Gleiche Partie: ein Gewinner/eine veraltete Aktion; unterschiedliche Partien: beide speichern; alte Aktion nach Wechsel verworfen; verspäteter FileReader und überholte Dateiauswahl unwirksam; gleichzeitiger neuerer Zielstand verhindert alten Ersatzimport |
| Sicherheitsgrenzen | Fehlende Web Locks/IndexedDB ohne unsicheren Fallback; erzwungene ID-Kollision überschreibt nichts; Katalogrevision am sicheren Zahlenlimit bricht ohne Teiländerung ab; kein Wertzugriff auf Q1.09f-Testquellen |
| W1-S | Drei reale neutrale Kauf-/Verkaufskreise: Gold, Sicherheiten und Kreditrahmen unverändert; Materialbuchwert+188 im real gestarteten Bauauftrag ohne zusätzlichen Kredit, bezahlter Werftlohn bleibt berücksichtigt |
| Reisen/Ort | Persönliche Hinreise, unbegleitete Rückreise, originale Kosten/Tage, Kaufmann bleibt zurück, persönliche Fernhandlung gesperrt; Schreibfehler/Retry verwendet genau einen verborgenen Risikoausgang |
| Altfristen | Tatsächlicher6-Tage-Restweg bei 1 Tag Restfrist: genau +5; Originalfrist unverändert; Ersatz durch altes Original stapelt Schonung nicht |
| Namen/Bedienung | Überlange/leer vorhandene Kaufmannsnamen erhalten, nur Anzeigename begrenzt; legitimer selbst gewählter Rufname „TEST Kaufmann“ bleibt spielbar und per eigenem Export importierbar; echter Q1.09f-Marker immer abgelehnt |
| Ansichten | 375×812, 820×1180, 1280×900 und zusätzlich 812×375; kein horizontaler Überlauf in Verwaltung, Touch-Ziele/Schließen erreichbar, Abbruch eines Neubeginns erhält alle Partien |

## Bekannte Ansehensfrage ausdrücklich offen

Gruppe 27 bestätigt nach drei neutralen Handelskreisen weiterhin **+1 globales Ansehen und +1⁄6 politische Rufunterstützung**. Finanzielle Sicherheiten/Kreditrahmen steigen dabei nicht. Diese alte Regel ist unverändert; Q001 wird **nicht** als uneingeschränkt geschlossen ausgegeben. Keine vorgezogene politische Fachumstellung und keine Q1.10b-Schiffsanwesenheitsregel.

## Zwischenfehler nachvollziehbar erhalten

- `native-attempt-1.json`:30/32 bestanden. Quota-Test aktivierte seinen künstlichen Fehler auch nach Reload neu; Markt-Test wartete nicht auf die asynchrone Ansicht.
- `native-focused.json`: 6/7 bestanden. Erwartung exakt 80 statt höchstens 80 Zeichen war falsch, weil Anzeigenamen außen getrimmt werden. `native-name-limit.json` belegt die richtige Grenze; Spielname blieb vollständig erhalten.
- Nach ID-/Revisionsschutz vollständiger 38er-Lauf auf 9aa7b7f bestanden, danach eine zusätzliche Querformatgruppe. Diese Dateien bleiben ältere Zwischenbelege.
- Abschließender Randfall: Herkunftserkennung von isolierten TEST-Dateien von legitimen regulären Kaufmannsnamen getrennt. Code zuerst in 46d28dc gesichert, danach **vollständiger 40er-Lauf erneut bestanden**. Keine bloße grüne Wiederholung als Ersatz für Erklärung.

Endbefehl:

```sh
node tests/features/q1_10a/browser-checks.cjs tests/features/q1_10a/results/native-release.json
```

Ergebnisdateien werden nicht überschrieben; zur Wiederholung neuen Zielpfad wählen. Alte Screenshots vor Refresh bytegenau archiviert, Zuordnung im Test-README. Alle alten Q1.09-/b-/c-Testskripte und Ergebnisse bleiben unverändert.

## Grenzen der Aussagekraft

Quota-Fehler und ID-/Revisionsgrenzen sind kontrolliert eingespritzt, kein real voller Datenträger/OS-Stromausfall. Der Transaktionsabbruch selbst ist nativ. Mobilgrößen sind Chromium-Touch-Emulation; Desktopfälle laufen ohne mobile Emulation. **Keine eigene Safari-/WebKit-/iPhone-/iPad-Prüfung der neuen Mehrpartienfassung.** Die vom Nutzer berichteten Q1.09f-Geräteerfolge gelten für jene Testkopie, nicht automatisch für die neue Datenbankrevision.

Keine erneuten 1.500er-/2.250er-Wirtschaftsläufe, keine vollständige politische Karriere. Frühere Simulationen werden nicht neu bewertet und Spieltage nicht in menschliche Stunden umgerechnet. Wirtschafts-/Politikfunktionen bleiben im Quellvergleich erhalten; Fokus ist Speicher-/Bedienungssicherheit. Vor Integration bleibt die echte Apple-Abnahme offen.

Abschließende [statische Kontrolle](../../../tests/features/q1_10a/results/static-verification.json):3.557 bestehende Dateien gegen c7201c0 verglichen; nur Haupt-HTML und append-only Berichtsindex geändert. Alle elf eingegrenzten Änderungen rückwärts angewandt ergeben die gesamte ursprüngliche HTML einschließlich Grafikbytes. Fünf Berichte,15 relative Verweise, archivierte Screenshotbytes, JavaScript-Syntax und Git-Diff geprüft.
