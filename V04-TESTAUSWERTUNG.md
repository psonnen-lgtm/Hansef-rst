# Lokale Testauswertung 0.4
Im Kontor ausdrücklich aktivieren. Standardmäßig aus; Einwilligung lokal gemerkt. Keine Netzwerkaufrufe der Telemetrie, keine Namen oder Gerätekennungen. Separater Schlüsselbereich hansefuerst-test-v1-; Spielstände unverändert.

Aktivzeit: monotone Uhr, sichtbarer und fokussierter Tab, letzte echte Bedienung höchstens 60 Sekunden zurück; Unterbrechungen über zehn Sekunden zählen nicht. Näherungswert, keine Zeitmessung per erstem/letztem Start. Jede Browser-Ladesitzung erhält eine lokale zufällige Kennung; keine serverseitige Identität.

Ereignisse: Kauf, Verkauf inklusive gewichtetem Einstand und realisiertem Warengewinn, Reisen mit Route, Manifest und Gebühren, Piraten und Warenverlust, Schiffe, Reparaturen, Bewaffnung, Gerüchte, Bankgeschäfte, Auftragsprämien, Spenden und Aufstiege. Vermögensstand an Ereignissen. Regelmäßige Momentaufnahmen (Minute bei aktiver Seite) und Meilensteine. RouteIds helfen Zuordnung je Schiff; gemischte Bestände und Laden/Import verhindern eine lückenlose Herkunftsbuchhaltung. Fehlende Einkaufskosten null. Neue Spiele/Import starten neue Runs, keine erfundene Spielzeit bis Eldermann.

JSON exportiert Sitzungen, Ereignisse, aktive Millisekunden, Momentaufnahmen und Methodik. CSV: UTF-8 BOM, Semikolon, gequotete Felder, strukturierte Details als JSON-Spalte. Nur ausdrücklicher Download, keine automatische Übertragung. Bei Fehlern pausiert Aufzeichnung; Spiel bleibt bedienbar.

Aufbewahrung: je Ladesitzung maximal 3000 Ereignisse und 120 Momentaufnahmen; Kürzungen gezählt. Ältere Sitzungen bleiben bis zum Löschen lokal. Speichern höchstens alle 15 Sekunden sowie bei Pause/Seitenwechsel/Export. Browser-Speicherlimits gelten; regelmäßig exportieren. Löschen entfernt Aufzeichnung und Einwilligung, nicht den Spielstand.

Validierung: 19 Spieltests und separate Telemetrietests (Opt-in, Sichtbarkeit, Fokus, Leerlauf, Unterbrechungen, Grenzen, unveränderter Zustand, Pause und Löschen). Browser-/Safari-Prüfung weiter offen.
