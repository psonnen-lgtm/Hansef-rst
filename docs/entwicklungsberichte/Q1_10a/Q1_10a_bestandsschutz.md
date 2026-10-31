# Q1.10a – Bestandsschutz und kontrollierte V13-Übernahme

31.10.2026 Europe/Berlin · `feature/q1-10a-multiple-savegames`.
Getesteter Code **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**. Grundlage **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, keine Übernahme der isolierten Q1.09f-Speicherarchitektur.

## Erstübernahme ohne Verlust des Originals

Beim ersten Start wird unter gemeinsamem Web Lock zunächst der reguläre alte IndexedDB-Datensatz `game/active` geprüft. Fehlt er, werden ausschließlich die bekannten regulären Altadressen in fester Reihenfolge geprüft: `hansefuerst-v04-safety1`, `hansefuerst-v04`, `hansefuerst-v03`, `hansefuerst-v01`. Kein Durchsuchen oder Übernehmen des Q1.09f-Namensraums.

Ein vorhandener bevorzugter, aber ungültiger Stand wird nicht still durch eine ältere Alternative ersetzt. Originalbytes werden zuerst validiert; die bestehende Q1.09c-Migration arbeitet auf einer Kopie. Partie, Verzeichnis/Herkunft und exaktes Rohoriginalbackup entstehen atomar. Der alte IndexedDB-Datensatz und LocalStorage-Quellen bleiben unverändert. Eine zwischenzeitlich veränderte beobachtete Quelle führt zum Abbruch. Bereits gesetzter Bibliotheksmarker verhindert erneute Übernahme und Duplikate, auch bei zwei gleichzeitigen Starttabs.

Bei fehlerhaftem Original wird keine Partie angelegt. Das Rohoriginal ist unmittelbar als Datei exportierbar. Erst nach ausdrücklicher Bestätigung darf der Nutzer das Original zusätzlich in der Bibliothek sichern und ohne Übernahme beginnen. Bei fehlgeschlagener Migrationstransaktion sind keine halbe Partie/kein halber Katalog vorhanden; die alte Quelle bleibt wiederherstellbar. Nach Beheben der Speichersituation kann neu geladen werden.

## Erhaltene Inhalte

Die native V13-/M2-Übernahme und Dateirundreise wurden mit synthetischen Kopien geprüft:

- Bargeld, Bankguthaben, bestehende Schulden und historische Einstandskosten.
- Schiffe, tatsächliche Häfen, Warenbestände, Ursprungsnachweise und Lager.
- Historischer Bürgermeistertitel, Amtsstadt, laufender Ratsvertrag und Originalfrist.
- Vorhandene gültige persönliche Ortsinformation einer frühen M2-Partie.
- Bereits gespeicherte Sicherheits-/Schonungsbelege; keine erfundene Erstübernahme bei M2.

Keine neue Gildengebühr, keine erneute Belohnung, kein Titelentzug und keine neue politische Voraussetzung. Neue Partien beginnen unverändert mit 5.000 Gold, einer unbeschädigten Kogge, leeren Lagern und ohne Schulden/Amt. Umbenennen ändert nur den Bibliotheksnamen, nicht den Kaufmann oder dessen Leistungen. Alte überlange/leere Kaufmannsnamen bleiben im Spielzustand erhalten; nur der notwendige Bibliotheks-Anzeigename wird sinnvoll begrenzt/ersetzt.

Bei Ersatz einer vorhandenen Partie wird deren Revision geprüft und sowohl der bisherige Stand als auch die eingehende Datei unverändert gesichert. Andere Partien bleiben unverändert. Sicherheitsbelege werden nur beim Ersatz derselben Partie passend weitergetragen; ein ausdrücklich als neue Partie importierter Export erhält eine neue interne ID.

Die bestehende enge Altfristschonung bleibt erhalten: nativer 6-Tage-Restweg bei 1 Tag Restfrist ergibt genau +5, Originalfrist bleibt gespeichert. Wiederimport des alten Originals als Ersatz derselben Partie stapelt keine Schonfrist. Keine automatische Station, keine Prämie. Ebenso bleiben W1-S und persönliche Ortsprüfungen bestehen; keine Vorwegnahme von Q1.10b.

## TEST-Dateien und echte Nutzerdateien

Q1.09f-Exporte mit `flags.q109fSynthetic` werden immer abgelehnt. Fremde unmarkierte Dateien mit klaren TEST-Kaufmannsnamen werden vorsorglich ebenfalls zurückgewiesen. Reguläre gespeicherte Altquellen und eigene mit gültiger Partienamens-Metadaten versehene Exporte bleiben auch bei einem legitimen solchen Rufnamen nutzbar. Die bisherige Test-Datenbank wird nicht als Quelle geöffnet. Ein TEST-Marker ist keine digitale Signatur; absichtliches Umschreiben einer Datei ist kein vom Offline-Spiel verhinderbares Ereignis.

Alle eigenen Tests verwenden künstliche Zustände aus einer frischen historischen Factory, keine archivierten Simulationsendstände oder Nutzerdateien. Historische Ämter in Fixtures sind bewusst gesetzte Prüfdaten, kein Nachweis einer neu gespielten Karriere. Die vom Nutzer gemeldeten externen Sicherungen wurden nicht angefordert, geöffnet oder geändert.

## Praktische Grenzen

Fünf aktuelle Partien gelten je Browserprofil und Origin, nicht browser-/geräteübergreifend. Sicherungen bleiben lokal; echte Geräte-/Browserwechsel benötigen weiterhin manuelle Exporte. Ältere Clients können die neue DB-Fassung nicht schreiben. Alte LocalStorage-Clients nicht parallel weiterverwenden; eine über alle alten Softwarestände atomare Synchronisierung wird nicht behauptet. Originalquellen bleiben für manuellen Rückgriff erhalten.

Explizite Originalsicherungen werden nicht automatisch gelöscht; sehr viele Importe/Löschungen können daher Speicher verbrauchen. Bei Quota-Fehler stoppt die Änderung sicher. Langfristige Browserbereinigung oder physischer Geräteverlust sind keine durch IndexedDB verhinderbaren Ereignisse. [Architektur](Q1_10a_speicherarchitektur.md), [Tests](Q1_10a_tests.md).
