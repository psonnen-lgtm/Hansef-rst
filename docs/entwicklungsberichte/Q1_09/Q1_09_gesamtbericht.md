# Q1.09 – Technische Absicherung, Teil A

30.10.2026 Europe/Berlin. Eigener Branch `fix/q1-09-safety-foundation`, frisch bestätigte Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Produkt0.8d.1b/V13, Originalproduktcommit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Noch keine Produktänderung.

Q1.02/03/06 sowie die separat veröffentlichten Q1.07/08-Konzepte gelesen. Modell C ist inzwischen konzeptionell gewählt, wird in Q1.09 ausdrücklich nicht aktiviert. W1/W2 und Referenz-/Sicherheitenregel bleiben offen; keine vorzeitige wirtschaftliche Neubewertung. Keine Gilde/Karriere/Spielszenen oder Gebühr.

[Inventar](../../../tests/safety/q1_09/results/initial-inventory.json), [Prüfplan](../../../tests/safety/q1_09/plan.json). Vorhandene direkte und indirekte Schreiber, `s.city`-Verbraucher, Import/Export/Backups und politische Kandidatenaktionen erfasst. Die vorhandene `save`-Fehlerwarnung verhindert noch keinen halb angewendeten Zustand; bloßes Compare-before-write ist kein atomarer Mehrfensterschutz.

Die Q1.02-Reproduktion wurde bytegleich als feste historische Baseline übernommen und vor Ausführung gesichert. Kleine VM-/Browser-Faulttests folgen je Abschnitt. Keine Großsimulationen; der explizite begrenzte Sicherheitsauftrag ersetzt die allgemeine AGENTS-Großserie. Echte Nutzerstände/Pages/main/Entwicklungsbranch bleiben unverändert.

## Teil A – tatsächlich reproduziert

Prüfcode vor Ausführung: `e24d68106822f8fc41095416b99773fcb72b91ef`. Acht Q1.02-Handelsfälle und eine politische Fernvorsprache erneut am unveränderten Produkt bestätigt. Neutraler Mischkreis: Gold0, Buchwert+577,5, Ruf+1; Schwellenfall44.920→45.250/Ratsherr. Fernvorsprache:0 Tage/0 Gold/eine neue Urkunde. Keine allgemeine Karriere/Simulation. Ergebnisse und Original-Log im neuen Testordner gesichert.

Teil B wird separat implementiert: ein exklusiver Web-Lock, Kandidatenkopie, ein finaler aktiver Spielstandwrite, minimale Politik-Unterrevision2 mit Sicherheitsdaten und getrenntem aktivem Schlüssel. Noch keine neue politische Formel/Gilde, noch kein Q-001-Sicherheitenwechsel. Browserinstallation aktuell durch HTTP403 Domain forbidden blockiert; kein echter Browser-/Gerätetest behauptet.
