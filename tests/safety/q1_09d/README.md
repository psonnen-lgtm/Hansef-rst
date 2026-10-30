# Q1.09d – Ausschließlich synthetische Testdaten

30.10.2026 Europe/Berlin. Kein Nutzerstand, kein archivierter Simulationsendstand. Alle fünf JSON-Dateien sind künstlich aus frischen Spielzuständen erzeugt; Name und Chronik kennzeichnen sie als TEST. Politische Titel/Ämter in Datei05 sind bewusst gesetzte Prüfdaten, keine erspielte Karriere.

Basis `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`; tatsächlicher unveränderter Spielcode `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, SHA256 `50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`. Das Q1.09d-Paket ändert das Spiel nicht.

| Datei in `fixtures/` | Inhalt |
| --- | --- |
| `TEST_01_neustart_v13_safety3.json` | 5000 Gold, ein Schiff, persönlicher Startort Lübeck bekannt; V13/Politik2/Sicherheit3 |
| `TEST_02_altstand_v13.json` | 5200 Gold, 4 Ansehen, ein Schiff; regulärer V13-Altstand ohne Sicherheitsrevision |
| `TEST_03_mehrere_schiffe_v13.json` | 20000 Gold, Kogge Lübeck, Schnigge Hamburg, Holk Rostock |
| `TEST_04_kredit_waren_v13.json` | 12000 Gold, Bank2500, Schulden700; Getreide7@8/Hamburg an Bord; Salz12@10/Stettin im Lübecker Lager |
| `TEST_05_politik_vertrag_v13.json` | 50000 Gold, 80 Ansehen; historischer Bürgermeistertitel, Amt Lübeck, laufender Ratsvertrag |

Alle beginnen Tag1/1350 in Lübeck. Die vier Altstände haben Politikrevision1 ohne Sicherheitsfelder; nach Import ist der persönliche Ort zunächst unbekannt und muss ausschließlich für diese künstliche Partie ausdrücklich verankert werden. Datei01 prüft eine aktuelle Importreferenz zusätzlich zum echten UI-Neubeginn. Originaldateien nicht überschreiben; Manifest enthält SHA256 und Vergleichswerte einschließlich Kosten/Herkunft, Ämtern und Fristen.

Das kleine ZIP enthält nur diese fünf JSON, Manifest und diese Kurzinfo. Es enthält keine Spiel-HTML, keine Nutzerdateien und keine Serverfunktion. Auf Apple-Geräten ZIP in „Dateien“ entpacken. Nur am separat freigegebenen HTTPS-Testzugang importieren; nie in die produktive Partie. Vor Ersetzen immer den gegenwärtigen **Teststand** exportieren. Eine sichere Test-Origin ist noch nicht bereitgestellt.

[Geräteanleitung](../../../docs/entwicklungsberichte/Q1_09d/Q1_09d_geraeteanleitung.md) · [Testzugang](../../../docs/entwicklungsberichte/Q1_09d/Q1_09d_testzugang.md) · [Matrix](../../../docs/entwicklungsberichte/Q1_09d/Q1_09d_testmatrix.md).

## Tatsächlich ausgeführt

- `node tests/safety/q1_09d/prepare-fixtures.cjs /tmp/q109d-generated` und `/tmp/q109d-generated-final`: fünf synthetische Datenpakete erzeugt; nur neue Zielordner. Ausschließlich Beschreibung „Salz“ richtiggestellt, Dateiinhalte unverändert. Zwei Erzeugungen haben identische fünf Spielstandbytes.
- `node tests/safety/q1_09d/check-fixtures.cjs tests/safety/q1_09d/results/fixture-validation.json`: **fünf Fälle bestanden**. Originalvalidator, Import, exaktes Rohbackup, alle nicht sicherheitsbezogenen Felder, Export/Reimport/Reload gegen tatsächlichen Root-Spielcode im VM-Modell geprüft. Kein Safari, keine native Browserprüfung, kein echtes Gerät. IndexedDB/Web Locks und DOM dabei modelliert.
- Statische Paket-/ZIP-/Link-/Hash- und Änderungskontrolle mit `python tests/safety/q1_09d/verify-package.py --repro-a /tmp/q109d-generated --repro-b /tmp/q109d-generated-final`; keine Spielsimulation. Der erste Lauf hielt am eigenen noch nicht geschriebenen Ergebnislink an; nur diese konkrete spätere Ausgabedatei wird nun beim Linkcheck zugelassen. Ergebnis in `results/package-verification.json`.

Die historischen106 Q1.09c-Prüfungen einschließlich31 nativer Chromium-Gruppen werden nur als bestehende Referenz übernommen, nicht neu ausgeführt oder als Q1.09d-Gerätetests gezählt.

## Erneute gezielte Prüfung bei Bedarf

Mit vorhandenem Node genügt für diese neuen Daten: `node tests/safety/q1_09d/check-fixtures.cjs /tmp/q109d-neues-ergebnis.json` (neuer Pfad erforderlich). Der Generator schreibt ausschließlich in einen neuen angegebenen Ordner. Keine Netzwerk-/Deploymentfunktion. Der spätere Geräteablauf braucht keine Entwicklerwerkzeuge und keinen Node-Zugang.

Die statische Startseite unter `site/` ist eine nicht veröffentlichte Vorlage; relative Spiel-/ZIP-/CSV-Links werden erst im ausdrücklich freigegebenen Uploadpaket zusammengelegt. Nicht als lokale ausführbare Spielversion missverstehen.
