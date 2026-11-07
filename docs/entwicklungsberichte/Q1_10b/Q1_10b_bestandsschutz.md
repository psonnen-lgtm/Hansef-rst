# Q1.10b – V13 und Mehrpartien-Bestandsschutz

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Speicherformat unverändert

V13, Politikversion 2, Sicherheitsversion 3 und die Q1.10a-Bibliothek bleiben lesbar. Reguläre IndexedDB `hansefuerst-local-safety3`, Datenbankversion 2; kein Q1.09f-Namensraum. Partien, Katalog, Backups, eindeutige IDs, Web Locks, atomare Transaktionen und Revisions-/Generationsschutz werden weiter verwendet. Keine neue dauerhafte Reise- oder Personenmigration, keine zweite aktive Speicherquelle.

Die ursprünglichen Q1.10a-Funktionen zur Migration, zum Import, Löschen, Aktivieren und atomaren Speichern bleiben im Quelltext unverändert. Bestehende V13-Originale bleiben exakt gesichert. Keine echten Nutzerdateien importiert oder verändert; alle neuen Nachweise verwenden synthetische Profile.

## Persönliche Altdaten und Verträge

Personenort, Quellen, Zeitstempel, historische Besuche, Titel, Amtsdaten, Urkunden und Vertragsstationen werden weiterhin validiert und erhalten. Nur ihre bisherige persönliche Zugangsschranke entfällt. Unbekannter Personenort benötigt keine neue Bestätigung.

Neue persönliche Altverankerungen und Altfristschonungen sind nicht mehr erforderlich: Eigene Schiffe ersetzen die zusätzlichen persönlichen Ankunftswege. `confirmLegacyPresence` verändert nichts mehr und erklärt die Regel; `applyLegacyGrace` erzeugt keine neuen Nachweise. Kein neues „noch einmal +5 Tage“ durch Laden/Importieren.

Bereits in Q1.09c/Q1.10a belegte Schonungen bleiben unverändert gültig. `politicalDeadline`, Nachweisvalidierung und Importzusammenführung bleiben erhalten. Der Originalvertrag behält `until`; ein bestehender Schonungsnachweis bestimmt weiterhin seine wirksame Frist. Nichts wird rückwirkend gelöscht, automatisch abgeschlossen oder belohnt.

Gruppe 29 erzeugt den historischen +5-Tage-Nachweis im tatsächlichen unveränderten Q1.10a-HTML, lädt ihn anschließend im neuen HTML und ersetzt dieselbe Partie mit seinem Export. Originalfrist und exakter Nachweis bleiben erhalten; keine weitere Verlängerung. Eine frische alte V13-Datei erhält unter Q1.10b dagegen keine neue Schonung.

## Geprüfter Umfang

Gruppen 01–40 prüfen weiter Neues Spiel/Fortsetzen, fünf unabhängige Partien, Autosave, Umbenennen, bestätigtes Löschen, Import/Export, Originalbackup/Wiederherstellung, Migrationsfehler, Transaktionsabbruch nach erfolgreichem Put, zwei Tabs derselben beziehungsweise verschiedener Partien, verzögerte Dateien, erschöpfte Revisionen und ID-Kollisionen. Gruppen 50/51 ergänzen den Reiseabbruch und Partiewechsel während wartender Aktionen. Gruppen 15/16/49 prüfen alte Ämter, Titel und Verträge ausdrücklich.

Unterdrückung echter Speicherplatzfehler ist nicht behauptet: Quota-Fehler sind injiziert; zusätzlich wurden native IndexedDB-Transaktionen tatsächlich abgebrochen. Keine Garantie gegen Browserdatenlöschung, OS-Ausfall oder manuelle Manipulation. Vor Wechsel/Rückkehr zu alten Clients extern exportieren; bereits Q1.10a hebt das Datenbankschema von 1 auf 2 an, sodass ältere Q1.09c-Clients nicht parallel weiterarbeiten sollten.

[Testbelege](../../../tests/features/q1_10b/results/native-release.json) · [offene Probleme](Q1_10b_offene_probleme.md).
