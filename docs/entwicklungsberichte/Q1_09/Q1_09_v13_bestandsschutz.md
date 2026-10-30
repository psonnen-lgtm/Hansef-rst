# Q1.09 – V13 auf Kopie übernehmen und Original wiederherstellen

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


## Minimal notwendige Unterrevision

Der wirtschaftliche Root bleibt V13. `politics.version=2` kennzeichnet nur die Sicherheitsgrundlage; keine neue Gilde, politische Formel, Rangkarriere oder Gebühr. Der bisherige Politikblock mit alten Regeln und Belegen bleibt vollständig erhalten, ergänzt um:

```json
{
  "version": 1,
  "revision": 1,
  "person": {"city": null, "source": "unknown", "at": null},
  "legacyPersonalJobs": ["accord:0:0"]
}
```

Dies ist ein Beispiel für `politics.safety`, kein vollständiger Spielstand. Revision ganzzahlig/monoton, Personenort und Quelle streng validiert. `at` ist Zeitpunkt der jeweiligen belegten Initialisierung/Ankunft, kein frei erfundener früherer Reisezeitpunkt. Neue Dateien enthalten die begrenzte Liste noch fehlender persönlicher Altstationen. Ein früherer technischer Zwischenstand ohne diese Liste wird kontrolliert übernommen, nicht als belastbare Personenhistorie behandelt.

Ein minimaler M2-Sicherheitsblock war für Q-002/Q-003 nötig. Die umfassende spätere Gilden-/Politikmigration wird **nicht** vorweggenommen; sie braucht wiederum ausdrücklich versioniertes Schema und eigene Abnahme.

## Was erhalten bleibt

|Bestand|Tatsächliche Prüfung|
|---|---|
|Kasse/Bank/Kredit und Zinsen|V13-Kopie feldgleich; kleine echte Bank-/Zinsaktionen, keine neue Schuldregel|
|Ladung/Einstand/Buchkosten/Herkunft|Gemischte und unbekannte Werte bleiben erhalten; keine Fremdherkunft erfunden|
|Schiffe/Konvoi/Lager|Standorte/Bestände kopiert, wirkliche kontrollierte Konvoiankunft und Neubauintegration geprüft|
|Handelsaufträge/Fristen|Übernahme unverändert; keine neuen politischen Punkte aus gewöhnlichen Aufträgen|
|Fernkaufmann/Ratsherr|Alte Rangcodes/Titel erhalten, keine Nachgebühr oder neue Gildenbedingung|
|Bürgermeister|Amt/Stadt/Zeiten/`firstReceipt` und Leistungsbuch erhalten; qualifizierte alte Kandidatur nach wirklicher Ankunft funktioniert|
|Eldermann|Titel, Siegel, Fürsprecher, Urkunden/Vertrag erhalten; vorhandene qualifizierte Versammlung funktioniert am richtigen persönlichen Ort|
|Rats-/Hanseverträge|IDs/`witnessed`/`visited`/Fristen nicht gelöscht; noch fehlende Stationen nicht gefälscht|
|Unterstützung und alte Regeln|Bisherige Berechnung und gespeicherte Regelfassung erhalten; Modell C nicht aktiviert|

Geprüft mit synthetischen gültigen V13-Dateien und aus historischen Testendpunkten abgeleiteten Kandidaten-/Amts-/Eldermannständen. Ein tatsächlicher historischer V11-Testendpunkt wurde zusätzlich direkt übernommen. **Keine echten Nutzerstände geöffnet, keine komplette neue Karriere simuliert.**

## Übernahme, neue Clients und Originale

1. Alte Bytes lesen und validieren, auf Kopie migrieren.
2. Bytegenaues nummeriertes Originalbackup vor aktiver Übernahme; Fehler/Quota/volle Sicherungsplätze verhindern den Commit.
3. Neuer aktiver Schlüssel `hansefuerst-v04-safety1`; bisheriger `hansefuerst-v04` unangetastet.
4. Ganze Sicherheitsrevision zusammen mit dem Spielzustand speichern; keine halbe Übernahme.
5. Regulärer Export liefert den konsistent gespeicherten neuen Stand. Optionaler Originaldownload liefert unveränderte Erstübernahmebytes; damit konnte der unveränderte alte V13-Leser den alten Stand wiederherstellen.
6. Manuelle Wiederherstellung verwendet denselben bestätigten Import mit Original-/Vorersatzbackup. Auch defekte/zu neue aktive Daten werden nicht ohne Sicherung und Ersatzbestätigung verdrängt.

Alte Clients lehnen neue Politikrevision 2 wegen ihrer strengen Schlüssel-/Versionsprüfung ab; das wurde am echten unveränderten alten Validator in VM bestätigt. Keine Zusage, dass alte Clients neue Exporte spielen könnten. Neue Revisionen werden bei fehlender Unterstützung abgewiesen, nicht still als veraltete V13 ohne Sicherheitsdaten zurückgesetzt. Getrennte Schlüssel verhindern Schreiben des alten Clients in den neuen aktiven Stand.

Ein beschädigter aktiver neuer Stand löst keine automatische Rückkehr auf ein möglicherweise veraltetes Legacy-Original aus. Eine ausdrücklich gewünschte Wiederherstellung wird gesichert und bestätigt. Originale sind keine Cloud und ersetzen keine externe Datei auf einem zweiten Gerät.

## Offene Bestandsschutzgrenze

V13 kennt keinen echten persönlichen Altort. Ein informierter Anker ist eine transparente Übergangsentscheidung; er darf fehlende alte Vorsprachen nicht rückwirkend erfüllen. Für jetzt zu knappe alte Fristen wurde keine neue Schonungsregel erfunden. Diese Fälle sind vor vollständiger Freigabe noch zu entscheiden. Bestehende Ämter/Titel verlieren dadurch weder Rang noch bereits gespeicherte Urkunde.

Browser-/iOS-Speicherbesonderheiten, tatsächliche Dateidownloads und manuelle Übertragung zwischen physischen Geräten sind noch nicht abgenommen. VM-Datei-/Blob-/DOM-Modelle sind kein Gerätetest.


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
