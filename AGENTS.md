# Hansefürst – Arbeitsregeln

## Verbindlicher Abschluss jeder Entwicklungsrunde
Nach jeder abgeschlossenen Entwicklungsphase oder Entwicklungsrunde ohne erneuten Auftrag einen kompakten Entwicklungs- und Testbericht unter `docs/entwicklungsberichte/` im GitHub-Repository ablegen. Dies gehört zum Abschluss der Runde.

- Frühere Berichte und Rohdaten aufbewahren; neue Berichte mit Datum, Version und Phase eindeutig benennen.
- Versionsstand, Datum, Branch und vollständige Commit-ID des tatsächlich getesteten Spielcodes nennen. Den Code zuerst committen und danach den Bericht mit dieser ID erstellen; keine selbstreferenzielle Commit-ID erfinden.
- Durchgeführte Änderungen und Ergebnisse automatisierter Tests dokumentieren, einschließlich Befehlen, Fehlern, ausgelassenen Prüfungen und Grenzen.
- Ergebnisse der 1.500 reproduzierbaren Wirtschaftssimulationen mit Seeds, Strategien, Horizont und Verweisen auf Rohdaten/Simulator dokumentieren. Bei Änderungen an Spielregeln oder Simulator erneut 1.500 Verläufe ausführen und mit der vorherigen Version vergleichen. Bei reinen Dokumentationsänderungen keine unnötige Neuberechnung: vorhandenen geprüften Stand ausdrücklich als übernommen kennzeichnen. Nicht ausgeführte Tests niemals als bestanden ausweisen.
- Vergleich zur vorherigen Version: Vermögensentwicklung, Insolvenz und Liquiditätsstillstand, Risiken und politischer Aufstieg. Simulierte Spieltage nicht in echte Spielstunden umdeuten.
- Erkannte Fehler, offene Probleme, Testgrenzen sowie noch erforderliche Nutzerentscheidungen nennen.
- `docs/entwicklungsberichte/README.md` als chronologischen Berichtsindex aktualisieren.
- Bericht und Ergebnisse im GitHub-Projekt sichern und im Abschluss darauf verlinken.

## Zustimmung und Bestandsschutz
Wesentliche Spielmechaniken oder Spielbalance ausschließlich nach vorheriger Abstimmung mit dem Nutzer ändern. Simulationsergebnisse berechtigen nicht zu eigenständigen Balanceänderungen. Bestehende Spielstände und Funktionen erhalten. Keine unnötigen Grafik- oder Bedienungsänderungen.
