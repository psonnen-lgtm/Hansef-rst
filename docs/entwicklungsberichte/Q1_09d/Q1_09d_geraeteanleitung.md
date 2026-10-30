# Q1.09d – Kurzer Gerätetest ohne Entwicklerwerkzeuge

30.10.2026 · Europe/Berlin · Q1.09c-Spielcode `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, unverändert. **Noch keine Testadresse freigegeben oder veröffentlicht.** Diese Anleitung erst mit dem ausdrücklich bestätigten separaten HTTPS-Testlink benutzen. Ein GitHub-Branch ist kein Spielzugang.

## Vorbereiten

Auf iPhone und iPad **jeweils getrennt in normalem Safari** durchführen. Gerät, iOS-/iPadOS-Version (Einstellungen → Allgemein → Info), Datum und vollständige Testadresse notieren. Safari-Version soweit ermittelbar, sonst „mit Betriebssystem ausgeliefert, genaue Buildnummer unbekannt“. Die produktive Spieladresse bleibt geschlossen und unverändert. Keine echten Spielstände importieren, keine Browserdaten löschen.

Auf der späteren Teststartseite steht „NUR TESTDATEN“. Lade das synthetische ZIP herunter: bei Bedarf Safari-Downloadsymbol → Downloads → in „Dateien“ anzeigen → ZIP antippen, um es zu entpacken. Die Namen beginnen mit `TEST_`. Bewahre die ursprünglichen JSON-Dateien außerhalb des Browsers auf. Wenn die Dateiauswahl nicht funktioniert, als Fehler melden; keine Datei umbenennen oder Endung ändern. Das ZIP enthält **keine ausführbare Spiel-HTML**.

Das Spiel speichert Aktionen **automatisch**. Es gibt keinen zusätzlichen Speichern-Knopf. Warte vor Schließen/Wechseln, bis die Speicheranzeige verschwunden ist. Bei einer Speicherwarnung abbrechen und Meldung notieren; ein sichtbarer Spielzug allein beweist noch keine erfolgreiche Speicherung.

## Hauptablauf: für jedes Gerät ausfüllen

| Schritt | Bedienung | Erwartetes Ergebnis |
| --- | --- | --- |
| T01 Start | Bestätigten Testlink direkt in Safari öffnen; Spiel starten. Name `TEST iPhone` bzw. `TEST iPad`, Ulf, Startstadt Lübeck wählen. | Neuer Kaufmann: 5.000 Gold, eine Kogge, Tag 1/1350, persönlicher Ort Lübeck. Keine unbekannte echte Partie. Warnung zu Web Locks/IndexedDB bedeutet Abbruch, nicht bestanden. |
| T02 Kleine Aktion / Speichern | Kirche öffnen, **kleine Spende 50 Gold genau einmal** antippen. Bestätigung abwarten; Gold/Ansehen/Tag notieren. | 4.950 Gold, +2 Ansehen, Tag unverändert. Keine doppelte Abbuchung, keine Speicherwarnung. |
| T03 Tab-Neustart | Testtab schließen; gleiche bestätigte Testadresse in normalem Safari neu öffnen. | Derselbe TEST-Name, 4.950 Gold und unveränderter Tag. Kein neuer Start. Das prüft noch keinen vollständig beendeten Browser. |
| T04 Export | Unten „Spielstand“ → „Spielstand exportieren“. In Dateien herunterladen/aufbewahren, z.B. in eigenem Ordner `Q109d-iPhone`. Exportdatei nicht mit den unveränderten TEST-Originalen verwechseln. | Nicht leere JSON-Datei `hansefuerst-spielstand.json` vorhanden; Inhalt gehört zur Testpartie. Falls Safari nur eine Vorschau zeigt: Teilen → „In Dateien sichern“, danach tatsächliche Datei prüfen. |
| T05 Import / Wiederherstellung | Noch einmal klein spenden (nun 4.900 Gold), dann „Spielstand“ → „Spielstand importieren“, Datei aus T04 wählen, Ersetzen **nur dieser Testpartie** bestätigen. | Wieder exakt Name/Gold/Ansehen/Tag aus T04, also 4.950 Gold. Keine Vermischung und keine zusätzliche Spende. Erneut öffnen und vergleichen. |
| T06 Persönliche Reise | Seekarte: von Lübeck nach Hamburg, Einzelfahrt vorbereiten. Dialog muss „Persönliche Mitreise“ zeigen. Tage und Gebühr notieren; **einmal** „Weitersegeln“. | Kogge und Kaufmann in Hamburg; angebotene Spieltage verstrichen, Hafengebühr einmal. Ein Sturm/Piratenverlust kann weitere ausdrücklich gemeldete Kosten/Schäden verursachen; deshalb keinen pauschalen exakten Goldendwert erwarten. |
| T07 Unbegleitete Reise | Von Hamburg nach Lübeck vorbereiten. Im Dialog „Ohne persönliche Mitreise vorbereiten“ wählen, bis „Unbegleitete Schiffsreise – Kaufmann bleibt in Hamburg“ erscheint. Einmal „Weitersegeln“. | Kogge in Lübeck, Kaufmann weiterhin Hamburg; normale Zeit/Gebühr/Risiken. Keine persönliche Ankunftsgutschrift. |
| T08 Orte kontrollieren | „Spielstand“ öffnen, danach „Meine Schiffe“. Rathaus in der betrachteten Stadt Lübeck öffnen und eine angebotene persönliche Vorsprache versuchen. | Persönlicher Ort Hamburg, betrachteter Hafen/Schiff Lübeck. Ein Ortswechsel der Ansicht bewegt den Kaufmann nicht; persönliche Handlung in Lübeck bleibt gesperrt. Nur die Rathausansicht zu öffnen ist kein Nachweis einer erlaubten Vorsprache. |
| T09 App-Wechsel | Testpartie exportieren. Kurz zur Dateien-App wechseln, dann zu Safari zurückkehren. | Derselbe gespeicherte Stand, keine doppelte Reise/Gebühr, keine neue persönliche Ankunft. |
| T10 Safari vollständig beenden | Letzten Teststand exportieren und Werte notieren. Safari über den App-Umschalter schließen, erneut öffnen und dieselbe Testadresse aufrufen. | Letzter vollständig gespeicherter Stand bleibt im normalen Safari erhalten. Ein gewöhnlicher Tabwechsel zählt hier nicht. Andere persönliche Tabs nicht löschen. |
| T11 Offline: geladene Seite | Seite online laden; TEST-Stand exportieren. Flugmodus einschalten, WLAN zusätzlich ausschalten, Seite offen lassen. Kleine Spende durchführen und Export versuchen. | Geladene Seite kann lokale Aktion speichern/exportieren. Neuer Export hat genau eine zusätzliche Spende. Bei Fehler nicht weiterklicken. Das ist noch kein Kaltstart. |
| T12 Offline: Kaltstart | Mit weiter ausgeschaltetem Netz Safari vollständig beenden. Safari erneut starten und dieselbe Testadresse aktiv aufrufen, nicht nur eine alte Vorschau ansehen. | **Offene Prüfung, kein zugesagtes Bestehen.** Notieren: echte bedienbare Seite oder nur Standbild/Netzfehler? Bei funktionsfähigem Start Stand/Tag/Gold prüfen. Cache-Erfolg ist keine Garantie. Danach Netz wieder aktivieren; online muss der zuletzt bestätigte Stand erhalten sein. |

Bei einem Fehler stoppen, betroffene ID und die Fehlermeldung wörtlich notieren. Screenshot nur von Testdaten, nach Möglichkeit vollständige Testadresse mit angeben. Keine echten Spielstände oder produktiven Browserdaten zur Fehlersuche senden. Ist eine Datei nicht mehr lesbar, Original behalten und nicht durch einen neuen Export überschreiben.

## Fünf künstliche Dateien prüfen

Nach dem Hauptablauf den aktuellen **Teststand exportieren**, dann die Dateien nacheinander über „Spielstand importieren“ laden. Jeder Import ersetzt die gegenwärtige Testpartie. Vor jeder Altstandmigration liegt die heruntergeladene Originaldatei bereits unverändert in Dateien; nicht in der Vorschau überschreiben. Nach dem Import „Original der Erstübernahme exportieren“ verwenden. Achtung: Dieser Knopf bezieht sich auf die **erste** Übernahme dieser Browser-Origin und nicht zwingend auf jeden später importierten Altstand. Für spätere Importe bleibt jeweils die externe ursprüngliche TEST-Datei die überprüfbare Sicherung. Keine Browserdaten löschen, um eine neue Erstübernahme zu erzwingen.

| ID / Datei | Sofort nach Import prüfen, **vor** Spielaktionen |
| --- | --- |
| F01 `TEST_01_neustart_v13_safety3.json` | Name TEST Q109d Neustart, 5.000 Gold, eine Kogge in Lübeck, Tag 1/1350, persönlicher Ort Lübeck. Dies ist eine Importreferenz; der echte Neubeginn wird zusätzlich in T01 geprüft. |
| F02 `TEST_02_altstand_v13.json` | TEST Q109d Altstand, 5.200 Gold, 4 Ansehen, eine Kogge. Persönlicher Ort zunächst „historisch unbekannt“. Für Reisen in „Spielstand“ den künstlichen Altort Lübeck einmalig bestätigen. |
| F03 `TEST_03_mehrere_schiffe_v13.json` | TEST Q109d Flotte, 20.000 Gold: Kogge Lübeck, Schnigge Hamburg, Holk Rostock. Erst Altort Lübeck bestätigen. „Meine Schiffe“ → Hamburger Schnigge auswählen: nur Ansicht wechselt; danach unbegleitet nach Rostock schicken. Kaufmann bleibt Lübeck, Holk bleibt in Rostock, kein ungewollter Konvoi. |
| F04 `TEST_04_kredit_waren_v13.json` | TEST Q109d Kredit Waren: 12.000 Bargeld, Bank 2.500, Kredit 700; 7 Fass Getreide auf der Kogge (Einstand 8, Herkunft Hamburg), 12 Fass Salz im Lübecker Lager (Einstand 10, Herkunft Stettin). Prüfen, bevor ein Tag/Zinsen fortschreiten. |
| F05 `TEST_05_politik_vertrag_v13.json` | TEST Q109d Politik: 50.000 Gold, 80 Ansehen, Bürgermeistertitel und Amt Lübeck; Ratsvertrag Lübeck ↔ Hamburg läuft, Originalfrist Gesamttag 486181 = Tag 181/1350. Keine automatisch bestätigte Station. Künstlich gesetzte politische Daten sind kein Beleg einer erspielten Karriere. |

Für **jede** Datei: Importwerte vergleichen → exportieren → Tab schließen/neue Adresse öffnen → Werte erneut vergleichen → Export reimportieren. Die Politik- und Finanzdaten dürfen dabei nicht verschwinden. Altort nur für den jeweiligen synthetischen Test bestätigen, nicht als automatische Migration ausgeben. Ausführliche Rohvergleichswerte stehen im [Manifest](../../../tests/safety/q1_09d/fixtures/manifest.json).

## Zusätzliche Beobachtungen

- **Privatmodus P01:** Nur nach Sicherung der normalen Testpartie einen privaten Safari-Tab derselben Testadresse öffnen. Unabhängige TEST-Partie starten, speichern/exportieren und neu öffnen. Ergebnis getrennt melden. Nach Schließen aller privaten Tabs ist Datenerhalt ausdrücklich nicht zugesagt; keine Löschaufforderung für Browserdaten.
- **Speicher gesperrt P02:** Falls das Gerät von sich aus eine Speicher-/Web-Locks-Warnung meldet, Wortlaut erfassen. Erwartung: keine teilweise ausgeführte Aktion/unsichere Ersatzspeicherung. Fehler nicht durch Abschalten von Sicherheitsfunktionen provozieren. Ohne vorhandene Sperre „Nicht getestet“ eintragen.
- **Bedienung U01:** Hoch-/Querformat, Scrollen, große Schaltflächen, Schließen der Dialoge sowie Dateiauswahl und Download testen. Kein aktueller Spielzug darf von einem blockierten Dialog verdeckt bleiben.
- **Lokale HTML L01:** In diesem Auftrag kein freigegebener Zugangsweg. Dateien-App-Vorschau ist weder Safari-HTTPS noch Offline-Kaltstart. Als „Nicht getestet“ lassen.

Rückmeldung: Geräte-/Systemdaten plus Schritt-ID, Erwartung, tatsächliches Ergebnis und **Bestanden / Fehlgeschlagen / Nicht getestet**. Beispiel: „iPad … / iPadOS … / Safari / T05 / erwartet 4950, erhalten 4900 / Fehlgeschlagen / Meldung …“. [Ausfüllmatrix](Q1_09d_testmatrix.md). Keine Entwicklerwerkzeuge erforderlich.
