# Q1.10a – Speicherarchitektur für fünf unabhängige Partien

31.10.2026 Europe/Berlin · Branch `feature/q1-10a-multiple-savegames`.
Basis `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; tatsächlich geprüfter Spielcode **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**. Spielzustände weiterhin **V13 / Politik2 / Sicherheit3**, Bibliotheksformat1.

## Eine Bibliothek statt widersprüchlicher aktiver Kopien

Die reguläre IndexedDB **`hansefuerst-local-safety3`** erhält Schemafassung2. Keine Q1.09f-Testkennungen und keine neue LocalStorage-Spielstandquelle.

| Store / Schlüssel | Aufgabe |
| --- | --- |
| `parties` / interne Partie-ID | Name, letztes Speicherdatum, eigene Revision und vollständiges V13-JSON jeder Partie |
| `catalog` / `library` | Bibliotheksversion, Katalogrevision, zuletzt gespielte ID und einmaliger Herkunftsnachweis |
| `backups` / Sicherungs-ID | Exakte Originale, letzte vorherige Fassung und Sicherungen vor Ersatz/Löschung |
| bisheriges `game` / `active` | Unveränderte alte Einzelpartie als Übernahmequelle; keine aktive zweite Schreibquelle |

Fünf aktuelle Partieplätze pro Browserprofil/Origin. IDs werden kryptografisch zufällig erzeugt und vor einer Neuanlage zusätzlich auf Kollision geprüft; Anzeigenamen sind unabhängig. Gleichnamige Partien bleiben durch Kennung, Datum, Hafen und Gold unterscheidbar. Automatisch migrierte Partie erhält eine deterministische Kennung aus dem Quellhash, gegen doppelte Anlage zusätzlich durch den gemeinsamen Initialisierungsvorgang geschützt.

Metadaten enthalten einen eigenen Partienamen; der Kaufmannsname im Spiel bleibt unverändert. Übersichtswerte Tag/Stadt/Bargeld stammen aus dem zugehörigen vollständigen Zustand. Kein separates finanzielles Spiegelkonto. Der zuletzt verwendete globale Zeiger entscheidet nur über „Spiel fortsetzen“; jedes Tab kann unabhängig eine andere Partie geladen halten.

## Schreiben, Wechsel und Konflikte

Alle Spiel-/Verwaltungsschreibvorgänge benutzen weiterhin den regulären exklusiven Web Lock `hansefuerst-safety1-writer`. Eine native IndexedDB-`readwrite`-Transaktion liest, prüft und schreibt Partie, Verzeichnis und zugehörige Sicherung zusammen. Erfolg erst bei `transaction.oncomplete`, nicht bereits nach `put`. Transaktionscallbacks sind synchron, ohne `await` zwischen Lesen und Schreiben.

Jede Spielaktion bindet beim Aufruf die **Partie-ID, lokale Auswahlgeneration, Zeilenrevision und erwarteten V13-Rohdaten**. Nach Warten auf den Lock werden diese erneut geprüft. Ein Wechsel macht wartende alte Aktionen ungültig. Verschiedene Partien vergleichen ihre eigenen Revisionen, nicht die globale Letztgespielt-Revision; deshalb dürfen zwei Tabs unterschiedliche Partien unabhängig speichern.

FileReader-Auswahl bindet ebenfalls die ursprüngliche Partieauswahl. Eine zusätzliche Auswahlkennung verwirft verspätete Ergebnisse einer älteren Datei. Import ersetzt erst nach ausdrücklicher Zielwahl/Bestätigung und erneuter Zielrevisionsprüfung innerhalb der Transaktion. Keine späte Datei kann in eine inzwischen ausgewählte andere Partie schreiben.

Gelöschte aktive Partie wird aus dem Arbeitsspeicher entfernt; andere Tabs können sie nicht durch alte Aktionen neu erzeugen. IDs aus Dateien werden nicht als interne Zielkennung übernommen. Katalog-/Partierevisionen und Zielreferenzen werden geprüft; erzwungene ID-Kollision und ausgeschöpfte Katalogrevision führen zum vollständigen Abbruch.

## Autosave, Backups und Export

Autosave aktualisiert ausschließlich den aktiven Partiedatensatz, dessen letzte Sicherung und den Letztgespielt-Zeiger. Andere Partie-Rohdaten und Backups bleiben unverändert. Nach fehlgeschlagener Speicherung bleiben bestätigte Daten erhalten; Reise-Risikoausgang wird beim Retry derselben Vorbereitung nicht neu gewürfelt. Speicheranzeige verdeckt unbestätigte Kandidaten bis zur Transaktionsgrenze.

Die letzte automatische Vorfassung heißt intern `previous:<Partie-ID>` und wird beim nächsten erfolgreichen Spielzug ersetzt. Exakte Übernahmeoriginale sowie Sicherungen vor Importersatz/Löschung bleiben separat erhalten. Wiederherstellen legt eine **neue** Partie mit neuer ID an, überschreibt keine andere und braucht einen freien Platz. Löschen entfernt die ausgewählte Partie nach Namens-/Tag-/Kennungsbestätigung, bewahrt ihre Sicherung und lässt andere Backups unberührt.

Einzelexport ist V13-JSON mit optionalem `_hansefuerstSave`-Block (`version:1`, Anzeigename). Dieser wird beim Import kontrolliert gelesen und vor der ursprünglichen Spielmigration entfernt. Historische reguläre V13-Dateien ohne diesen Block bleiben importierbar; die vorsorgliche Eingangsprüfung unmarkierter TEST-Namen bleibt gesondert bestehen. Im laufenden Spielzustand wird kein zusätzlicher Wirtschaftswert gespeichert. Dateiname enthält einen bereinigten Namen und die vollständige interne ID.

## Grenzen

Native DB-Fassung2 blockiert ältere Q1.09c-Clients, die ausdrücklich Version1 öffnen. Das verhindert alte Schreiber auf dem neuen Bestand. Rückkehr zu alter Software benötigt einen geeigneten externen V13-Export; Schema nicht durch Browserdatenlöschung zurücksetzen. Frühere LocalStorage-Versionen kennen diese Sperre nicht: nicht parallel mit ihnen weiter spielen. Ihre alten Quellen werden nicht gelöscht oder synchronisiert.

Release-Hinweis und freiwillige Testaufzeichnung bleiben vorhandene Hilfsdaten in LocalStorage; **aktive Partien und Bibliotheksbackups liegen ausschließlich in IndexedDB**. Keine Cloud, kein Server, keine globale Dateiverwaltung. Speicherquote/Bereinigung durch Browser oder Betriebssystem bleiben Grenzen lokaler Speicherung. [Nachweise](Q1_10a_tests.md), [Bestandsschutz](Q1_10a_bestandsschutz.md).
