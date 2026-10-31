# R1.05 - Schiffsreisezeiten

Stand: 28.10.2026. Eigenständige Untersuchung der beiden bereitgestellten Diskettenabbilder. **Keine einzige abgeschlossene Reise gemessen.** Leere Messfelder sind fehlende Werte, keine Null-Tage-Reisen.

## Evidenzklassen

- A-D: unmittelbar nachgewiesene Dateistruktur.
- A-H: ausdrückliche Handbuchregel, noch kein Nachweis ihrer Implementierung.
- A-O: im Emulator beobachteter Ablauf.
- B: plausible Zuordnung oder Rekonstruktion.
- C: Vorschlag für Hansefürst, keine Originalregel.

## Die mutmaßliche Entfernungstabelle

A-D: DATEI.1 hat 1.128 Bytes. An Dateioffset `0x0000` beginnen genau 256 als unsigned little-endian 16-Bit-Werte interpretierbare Einträge, entsprechend 512 Bytes. Als 16×16-Tabelle sind sie vollständig symmetrisch; alle 16 Diagonalwerte sind null. Kleinster positiver Wert 93, größter Wert 3.219. Die Datei enthält dahinter weitere Daten, unter anderem Waren- und Monatsnamen. Sie ist daher keine reine Entfernungsmatrix.

A-D: In DATEI.PSA und DATEI.PSB stehen 16 Pascal-artige Stadtnamen an `0x0220 + i * 419`: ein Längenbyte und anschließend CP437-Text. Beide Dateien haben dieselbe Namensfolge. Es gibt also eine nachvollziehbare Kandidatenreihenfolge für die Matrix. **Der Zugriff des Programms auf diese Matrix mit genau diesen Stadtindizes wurde nicht verfolgt.** Auch 419 ist hier der Abstand der Namen, noch keine vollständig dekodierte Record-Definition.

B: Eine Seeentfernungstabelle ist angesichts Symmetrie, Null-Diagonale und 16 Städten plausibel. Die Einheit ist unbekannt. Weder Meilen, Kilometer, Pixel, Zehnteltage noch unmittelbar verwendete Fahrzeiten sind nachgewiesen.

| Strecke | Tabellenwert bei Kandidatenzuordnung | Reisetage gemessen | Status |
|---|---:|---|---|
| Lübeck - Rostock | 93 | offen | B, Index 0/2 |
| Lübeck - Danzig | 620 | offen | B, Index 0/1 |
| Lübeck - Hamburg | 1.226 | offen | B, Index 0/7 |
| Lübeck - Brügge | 1.409 | offen | B, Index 0/15 |
| Bergen - Lübeck | 1.102 | offen | B, Index 9/0 |
| Danzig - Nowgorod | 1.432 | offen | B, Index 1/12 |

Diese Zahlen sind ausgelesene Dateiwerte unter einer unbestätigten Stadtzuordnung. Sie sind **keine Messung von Reisen**. Die Symmetrie der Tabelle beweist insbesondere keine identischen Hin- und Rückreisezeiten: nachgelagerte Wetter-, Zustands- oder Zufallsfaktoren könnten asymmetrisch wirken.

## Schiffstypen und Reiseablauf laut Handbuch

A-H, PDF-Seiten 42-44: Kraier als preiswerter kleiner Segler mit kleiner Besatzung; Schnigge als besonders schneller kleiner Typ für wertvolle Fernfrachten; Kogge als Standardtyp; Holk als Massengutfrachter, dessen Kapazität sich im Verlauf besonders entwickelt. Keine numerischen Geschwindigkeiten aus diesen Angaben ableitbar. Schiffsneubauten benötigen örtlich vorhandene Materialien und freie Werftkapazität.

A-H, PDF-Seiten 50-51: Das Absenden eines Schiffes oder Konvois beendet den Zug. Die nächste Handlungsmöglichkeit kommt mit einer eigenen Schiffsankunft. Eine Flotte mit mehreren Schiffen kann damit die Häufigkeit eigener Entscheidungen erhöhen. Das ist ein struktureller Motivationsansatz, kein Nachweis einer bestimmten Reisezeit.

A-H, PDF-Seiten 37 und 69: Lübeck und Hamburg besitzen einen Landtransport, der den Seeweg um Jütland erspart. Die beiden Städte sollten deshalb nicht als kurze direkte Seeverbindung behandelt werden.

A-H, PDF-Seiten 80-83: Fremde Konvoiführer bestimmen das Ziel; beim eigenen Konvoi werden Waren/Geld im Führungsschiff zusammengefasst, einzelne Schiffe können herausgelöst werden. Die kürzeste beschriebene Hafenwartezeit beträgt einen Tag. Eine Geschwindigkeitsregel des Konvois, insbesondere „langsamstes Schiff“, ist in dieser Runde nicht nachgewiesen.

A-H, PDF-Seiten 40, 48 und 57: Verschleiß, Ladung, Sturmrisiko und reiseabhängige Heuer werden beschrieben. Daraus folgt keine belegte Wetterkorrektur der Fahrtdauer.

## Formelsuche und Grenzen

PATR.EXE liegt unverändert mit 260.752 Bytes vor, besitzt einen MZ-Header und enthält sowohl Programmcode als auch Inline-Texte. Ein begrenzter Rohdisassemblierungsversuch mit GNU objdump wurde durchgeführt. Der Bereich bei Dateioffset `0x7450` enthält Wahltexte; blindes Dekodieren erzeugt dort scheinbare Instruktionen aus Text. Solche Ausgaben sind kein Beweis für ausführbaren Code.

Keine durch Aufrufkette, Datensegment, Feldbedeutung und Ergebnisvergleich validierte Routine zur Umrechnung der Matrixwerte wurde identifiziert. Insbesondere werden keine Divisoren, Rundungsregeln, Geschwindigkeitskonstanten oder Zufallsbereiche behauptet.

## Reproduktion und nächste Messung

`python3 scripts/check_structures.py PRIVAT_ENTPACKTES_VERZEICHNIS AUSGABE` prüft Symmetrie und Namensabstände und schreibt Metadaten. `data/matrix_structure.json`, `data/city_records.csv` und `data/route_candidates.csv` dokumentieren die Befunde. `data/travel_measurements.csv` enthält bewusst nur die Kopfzeile: n=0.

Nach erfolgreichem regulärem Spielzugang: einen unveränderten Startspielstand sichern, Kraier Lübeck-Rostock ohne Konvoi ablegen lassen, Datum unmittelbar vor Abfahrt und bei Ankunft notieren, identisch zurückfahren; Typ, Ladung, Zustand, Besatzung und Ereignisse festhalten. Erst danach mit einer zweiten Strecke und einem zweiten Typ die Formel eingrenzen. Keine Skalierung allein anhand von 93.
