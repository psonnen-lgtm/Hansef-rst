# Q1.10b – Bestandsaufnahme und begrenzter Lösungsweg

7. November 2026, Europe/Berlin. Arbeitszweig `feature/q1-10b-fleet-presence`.

## Verifizierter Ausgangsstand

GitHub am 7. November frisch abgefragt: Q1.10a `ff92ce60d1c384a13313e37ba2b3954cf38e793b`, Entwicklung `cb6d5892b5f9ad211e1197e3e53b22c59b9276da`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`. Neuer Zweig direkt von Q1.10a abgeleitet. Tatsächlich damals geprüfter Spielcode: `46d28dc04901dde0d137fa3dd8869ae11b17a982`. Die dort dokumentierten 40 Chromium-Gruppen sind historische Ergebnisse vom 31. Oktober, keine heute erneut ausgeführten Prüfungen.

## Befund vor Änderungen

- Stadtansicht (`s.city`), ausgewähltes Schiff und historischer Personenort sind getrennt. Politische Funktionen benutzen `safetyPersonalRequired`/`safetyAt`; Bank, Kirche und Badehaus haben bisher keine einheitliche lokale Zugangsschranke.
- Handel, Umladen und Reparatur prüfen zusätzlich das konkrete Schiff. Solche Zuordnungen müssen erhalten bleiben. Kontor, Informanten und Lageranmietung benötigen ebenfalls die neue lokale Schranke, auch bei direktem Funktionsaufruf.
- Reisen werden synchron innerhalb einer atomaren Schreibaktion vollständig abgewickelt: Vorbereitung bedeutet noch Hafenliegezeit, danach Tagesfortschritt, Ereignisse und Ankunft in einem Commit. V13 speichert keinen eigenständigen Zustand „auf See“. Es wird kein neues Hintergrundreisesystem eingeführt.
- Persönliche Mitreise erzeugt bisher +1 Ansehen und erhöht `visits`. Diese automatische persönliche Anerkennung entfällt ausdrücklich. Historische Besuchs-, Amts- und Vertragsbelege bleiben unverändert.
- Die frühere einmalige Altfristschonung gleicht zusätzliche persönliche Ankunftswege aus. Dieser Anlass entfällt. Keine neue Schonung oder Verankerung anbieten; bereits belegte Schonungen weiterhin validieren und anwenden, ohne sie zu vervielfachen.
- Q1.10a-Speicherarchitektur (Datenbankversion 2, V13, Partien-ID, Revision, Web Locks, Backups) bleibt bestehen.

## Geplanter kleinster Eingriff

Zentrale Hafenanwesenheitsprüfung mit mindestens einem eigenen, nicht gerade reisenden Schiff; gemeinsame Schranke für lokale Aktionen und Gebäudeansichten sowie vorhandene schiffsbezogene Prüfungen. Persönliche Reisewahl und automatische persönliche Ankunftsgutschrift entfernen. Vorhandene Reisezeit-, Gebühren- und Ereignisformeln übernehmen. Ortsfelder und historische Fristnachweise weiter lesen, ohne neue zu erzeugen.

Q1.10a-Treiber und Rohdaten unverändert erhalten. Abgeleiteten Treiber unter `tests/features/q1_10b/` anlegen; jede wegen Nutzerbeschluss geänderte Assertion benennen. Gezielte native Chromium-Prüfungen einschließlich Fehler-Retry, Mehrpartien, Politik, V13 und Touch-Ansichten. Keine Großsimulation: Der Nutzerauftrag begrenzt die Abnahme ausdrücklich und hat Vorrang vor der allgemeinen 1.500-Läufe-Regel in AGENTS.md.

## Risiken / noch keine neue Abnahme

Mehrere Hafenstandorte erleichtern Verwaltung und politische Vorsprachen; keine eigenmächtige Ausgleichsgebühr. Automatische Baufortschritte und Amtsabläufe müssen als globale Zeitfolgen erhalten bleiben. Wirtschaftliche Langzeitwirkung und echte Apple-Geräte sind noch ungeprüft. Bekannter neutraler Handelskreis mit globalem Ansehensgewinn bleibt offen. Dieser Zwischenstand enthält noch keine Implementierung oder neuen Testergebnisse.
