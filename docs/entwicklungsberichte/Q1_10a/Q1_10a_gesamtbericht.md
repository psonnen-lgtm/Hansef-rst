# Q1.10a – Mehrspielstand-Verwaltung und neuer Spielstart

31.10.2026 · Europe/Berlin · Branch **`feature/q1-10a-multiple-savegames`**.
Direkte Grundlage: geprüfter Q1.09c-Spielcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, nicht der aktuelle Pages-Zweig oder die Q1.09f-Testkopie.
Tatsächlich geprüfter finaler Spielcode **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**, 46.402.592 Bytes. Spielzustand weiterhin V13/Politik2/Sicherheit3, Bibliothek1/IndexedDB2. Nominale bisherige Spielanzeige0.8d.1b unverändert.

## Ergebnis für den Spieler

Die Verwaltung ist **tatsächlich implementiert und nativ geprüft**. Beim Öffnen stehen „Spiel fortsetzen“, „Neues Spiel“ und „Spielstände verwalten“ bereit. Fünf unabhängige Partien haben eigene IDs, frei wählbare Anzeigenamen, Datum und Übersicht über Tag, Hafen und Gold. Gleiche Namen sind erlaubt und durch Kennung/weitere Angaben unterscheidbar.

Neue Partie benutzt unverändert die bisherige Kaufmanns-/Startstadtwahl und 5.000 Gold, Kogge, leere Lager, keine Schulden/Ämter. Eine neue Handelsgeschichte ersetzt keine andere. Jede Spielaktion speichert automatisch ausschließlich die aktive Partie. Namen können geändert, Partien geladen/einzeln exportiert und erst nach klarer Namens-/Tag-/Kennungsbestätigung gelöscht werden. Eine gelöschte aktive Partie kann kein alter Tab wiederherstellen, indem er versehentlich weiter speichert.

Import prüft die Datei und bietet **neue Partie** oder **ausdrücklich gewählten Ersatz**. Andere Partien bleiben erhalten. Historische V13-Dateien werden unterstützt; Einzelexporte ergänzen nur Anzeigenamen-Metadaten und tragen eindeutige Dateinamen mit interner ID. Sicherungen sind in der Verwaltung exportierbar und als neue Partie wiederherstellbar. Keine Cloud-Synchronisierung, kein Benutzerkonto/Server.

## Architektur und Bestandsschutz

Die reguläre IndexedDB bleibt einzige aktive Quelle. Neue Stores für Partien, Verzeichnis und Backups werden gemeinsam atomar geschrieben, weiterhin unter Web Lock. Die alte Einzelpartie wird validiert und genau einmal auf Kopie übernommen; Originalbytes bleiben sowohl als Backup als auch in der alten Quelle erhalten. Keine zweite aktive LocalStorage-Partie und keine Übernahme aus dem Q1.09f-Namensraum.

Wartende Aktionen binden ID, Auswahlgeneration und Revision. Eine verspätete Datei/alte Aktion kann nicht nach einem Wechsel in die falsche Partie schreiben. Tabs derselben Partie melden Konflikte, Tabs unterschiedlicher Partien können unabhängig speichern. Scheitert ein Schreibvorgang, werden Partie, Katalog und Backup zusammen zurückgerollt. Erzwungene ID-Kollisionen und ausgeschöpfte Verzeichnisrevisionen überschreiben nichts.

Titel, Ämter, Verträge, persönliche Ortsdaten, Warenherkunft, Einstandskosten, Lager, Schiffe und Kredite bleiben erhalten. Fehlerhaftes Original wird nicht verworfen: Rohdownload und ausdrücklich bestätigter Beginn ohne Übernahme möglich. Keine neue Gebühr, Belohnung oder Aberkennung. Stadtgrafiken und wirtschaftliche/politische Funktionen bleiben erhalten. [Architektur](Q1_10a_speicherarchitektur.md), [Bestandsschutz](Q1_10a_bestandsschutz.md).

## Tatsächliche Abnahme

**40/40 native Chromium-Prüfgruppen bestanden**, keine ungefangenen Seitenfehler, [Rohdaten](../../../tests/features/q1_10a/results/native-release.json) und [Abnahmeübersicht](../../../tests/features/q1_10a/results/acceptance.json). Chromium 154.0.8037.57; echte IndexedDB/Web Locks/FileReader/Downloads in künstlichen Browserprofilen. Echte normale UI-Neuanlage sowie spezielle Fehler-/Mehrfensterfälle. Drei kleine Touch-/Desktopgrößen und ergänzend Handyquerformat geprüft; kein horizontaler Überlauf in der Verwaltung, Schließen/Touchziele erreichbar.

Besonders nachgewiesen: fünf gleichnamige unabhängige Partien, Autosave/Wechsel, Umbenennen/Löschen/Reload, Einzelexport/-import, alte kanonische/LocalStorage-V13-Übernahme ohne Duplikat, Titel/Ämter/Verträge, verspätete Aktionen und Dateiauswahlen, transaktionsweiter Rückfall, Wiederherstellung und TEST-Dateischutz. [Vollständiger Testbericht](Q1_10a_tests.md).

Ein Randfall wurde vor Abschluss korrigiert: Ein legitimer regulärer Kaufmannsname mit „TEST“ darf nicht in einer neu angelegten unspielbaren Partie enden. Herkunftsmarker, Eingangsprüfung fremder Dateien und eigene bestätigte Partien/Exporte werden nun unterschieden; der Q1.09f-Marker bleibt immer gesperrt. Danach nochmals vollständiger 40er-Lauf gegen den oben genannten finalen Code. Frühere rote Treiberbefunde und frühere grüne Zwischenstände bleiben als Geschichte erhalten und sind keine aktuelle Freigabe.

Der bekannte Ansehenspfad ist **weiter offen**: drei neutrale Handelskreise erzeugen +1 Ansehen/+1⁄6 Rufunterstützung, Sicherheiten und Kredit bleiben gleich. Kein uneingeschränkter Q001-Abschluss. Kein politischer Umbau, keine Kaufmannsgilde und keine vorgezogene Q1.10b-Schiffsanwesenheit.

## Nicht geprüft / Grenzen

Keine eigene neue Safari-/iPhone-/iPad-Abnahme der Bibliothek2. Nutzererfolge zur früheren isolierten Q1.09f-Version sind übernommen, nicht als Featureabnahme gezählt. Privatmodus, langfristige Browserbereinigung, tatsächlicher voller Datenträger/OS-Abbruch und Offline-Kaltstart bleiben Grenzen. Alle eigenen Fixtures synthetisch; keine echten Testerdateien angefordert/verändert. Keine großen Wirtschafts-/Karriereläufe; frühere 1.500er-Ergebnisse nur historische Referenz, keine neue Balanceauswertung.

Ältere reguläre Q1.09c-Clients können DB2 nicht schreiben. Externe V13-Exporte vor Versions-/Gerätewechsel behalten, alte LocalStorage-Software nicht parallel weiterspielen. Fünf aktuelle Plätze pro Browserprofil/Origin; Sicherungen benötigen zusätzlich lokalen Speicher und werden nicht automatisch als historische Originale gelöscht. [Offene Probleme/Freigabegrenzen](Q1_10a_offene_probleme.md).

## GitHub und Abschluss

[Spielcode](https://github.com/psonnen-lgtm/Hansef-rst/blob/feature/q1-10a-multiple-savegames/Hansefuerst_0_4.html) · [Feature-Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/feature/q1-10a-multiple-savegames) · [Tests](https://github.com/psonnen-lgtm/Hansef-rst/tree/feature/q1-10a-multiple-savegames/tests/features/q1_10a).

Kleine Commitfolge: 8ef0cb4 (Bibliothek/Start), a02415a (Recovery/Dateiauswahl), c8bb7d7/a9a1666 (Prüfkontrollen), 9aa7b7f (ID-/Revisionsschutz), e9c72e0 (Bild-/Querformatnachweise), 46d28dc (finale Herkunfts-/Namensabgrenzung). Final geprüften Code zuerst committed, Berichte und Finalbelege danach; keine selbstreferenzielle Berichts-Commit-ID behauptet.

GitHub vor Beginn geprüft: Entwicklung **`cb6d5892b5f9ad211e1197e3e53b22c59b9276da`**, isolierte Q1.09f **`aa2ef39bdc460dabd5f1c6a18830c447fd094803`**. Diese und main bleiben unberührt. Alle Änderungen nur auf eigenem, vom Sicherheitscode abgeleiteten Feature-Branch; keine Pages-Veröffentlichung, keine Zusammenführung. Bestehende Tests/Ergebnisse/Assets bleiben unverändert, nur Haupt-HTML und ergänzter Index sowie neue Featuretests/Berichte. Veröffentlichte Dateien werden abschließend vollständig von GitHub zurückgelesen. Danach keine Folgeaufgabe; Freigabe beim Nutzer.
