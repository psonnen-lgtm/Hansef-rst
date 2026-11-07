# Q1.10b – Flottensteuerung statt persönlicher Mitreise

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Ergebnis

Ein eigenes Schiff im tatsächlich betrachteten Hafen ermöglicht örtliche Aktionen. Der persönliche Ort ist keine Zugangsvoraussetzung mehr. Zwei Schiffe in unterschiedlichen Häfen erlauben die örtliche Verwaltung beider Städte ohne Kaufmannsreise. Eine bloße Fernansicht, ein Schiff auf Fahrt oder ein unfertiger Bauauftrag reichen nicht.

Reisen erfolgen selbstständig. Die Mitreiseauswahl entfällt. Reisezeiten, Hafengebühren und Risiken bleiben erhalten; eine bloße Ankunft erzeugt weder +1 Ansehen noch einen zusätzlichen Besuch oder politischen Beleg. Politische Bestätigungen müssen weiterhin ausdrücklich und unter den bestehenden fachlichen Voraussetzungen abgegeben werden.

## Verifizierte Grundlage und Änderungen

GitHub vor Beginn frisch abgefragt: Q1.10a `ff92ce60d1c384a13313e37ba2b3954cf38e793b`, Entwicklung `cb6d5892b5f9ad211e1197e3e53b22c59b9276da`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`. Eigener Zweig direkt von Q1.10a; keine Zwischenstände des Entwicklungszweigs übergangen oder zusammengeführt.

Geänderte bestehende Dateien: `Hansefuerst_0_4.html` und ausschließlich angehängter Abschnitt in `docs/entwicklungsberichte/README.md`. Neue Dateien nur in diesem Berichtsordner und `tests/features/q1_10b/`. Alte Tests, Rohdaten, Grafikdateien und die isolierte Q1.09f-Version unverändert.

- `fleetAt`/`fleetShipAt` bestimmen Hafenanwesenheit; 33 lokale Aktionszugänge und zehn Gebäudeansichten prüfen sie unter der bestehenden Schreibsperre. Konkrete Schiffsaktionen prüfen zusätzlich das ausgewählte Schiff.
- Während der synchronen Reiseabwicklung schließt eine vorübergehende Menge reisender Schiffs-IDs diese Schiffe aus. Keine neue dauerhafte Speicherstruktur und keine Hintergrundreise-KI.
- Reise-/Politiktexte und Hafenstatus erklären die neue Regel. Das globale Handelsbuch zeigt alte Belege weiterhin, holt ohne eigenes Schiff aber keine neuen örtlichen Hafennachrichten ein.
- Persönliche Altverankerung und neue Altfristschonungen sind stillgelegt. Vorhandene historische Daten und nachgewiesene Schonungen bleiben gültig.

## Tatsächliche Abnahme

**57/57 native Chromium-Prüfgruppen bestanden**, null ungefangene Seitenfehler. 40 von Q1.10a abgeleitete Gruppen, davon zwei ausdrücklich an die neue Ortsregel angepasst, sowie 17 Ergänzungen. Echte IndexedDB, Web Locks, FileReader und Downloads in frischen synthetischen Profilen; keine echten Nutzerdateien. [Rohdaten](../../../tests/features/q1_10b/results/native-release.json), [Testbericht](Q1_10b_tests.md).

Vier kontrollierte Reisen wurden im tatsächlichen Q1.10a-HTML und im neuen HTML verglichen: ruhige See, Sturm, erfolgreicher Piratenangriff, abgewehrte Piraten. Bargeld, Salden, Datum, Flotte/Ladung/Schäden, Märkte und weitere Zustandsbereiche sowie Ereignis und Zahl der Zufallsabrufe stimmen mit der früheren **unbegleiteten** Fahrt überein. Dieser Vergleich umfasst keine vollständige Wirtschaftssimulation.

Mehrpartien, Wiederherstellung, atomarer Fehler-Retry, V13-Migration, historische Titel, Vertragsstationen, einmalige Belege sowie Telefon-, Tablet- und Desktopansichten wurden nativ geprüft. Echte Safari-/Apple-Abnahme bleibt offen. Frühere Q1.09f-Nutzertests sind keine Q1.10b-Abnahme.

## Wirtschaftliche Wirkung

Die Verwaltung wird leichter: Bereits stationierte Schiffe ermöglichen Ratsbestätigungen und Bank-/Lageraktionen in mehreren Städten ohne zusätzlichen persönlichen Rückweg. Im gezielten Zweihafentest wurden solche Handlungen ohne neue Reisetage und ohne automatische Belohnung ausgeführt. Tatsächliche Schiffsreisen verbrauchen weiterhin die bisherigen Tage und Gebühren; Märkte, Mieten, Zinsen und Fristen laufen global weiter. Der bisherige persönliche Ankunftsbonus entfällt ausdrücklich.

Es wurden keine Ausgleichsgebühren, Wartezeiten oder Balanceparameter eingeführt. Langfristige Vermögensentwicklung, Insolvenz-/Stillstandsquoten, Risikoverteilung und Karrieregeschwindigkeit sind **nicht neu quantifiziert**. Historische Simulationen bleiben erhalten und können die Wirkung dieser Ortsregel nicht nachträglich belegen. Keine Umrechnung von Spieltagen in menschliche Spielstunden. Keine 1.500er-/2.250er-Simulation gemäß ausdrücklicher Auftragsgrenze; diese geht der allgemeinen AGENTS.md-Empfehlung vor.

## Grenzen und Abschluss

Der bekannte neutrale Handelskreis bleibt mit +1 globalem Ansehen und +1/6 Rufunterstützung nach drei Kreisen offen; Kreditrahmen/Sicherheiten steigen im Test nicht. Keine Behebung von Q-001 behauptet. Reale Apple-Geräte, Speichermangel/Browserlöschung, Offline-Kaltstart und langfristiges Balancing bleiben offen. Es gibt in dieser Basis kein eigenständiges funktionales Gildenhaus, dessen Mechanik geprüft werden könnte; keine neue Gilde ergänzt.

Kein Merge in Entwicklung/main, keine Pages-Veröffentlichung, keine Änderung echter Spielstände oder der Q1.09f-Testkopie. Freigabe ausschließlich durch den Nutzer.

Weitere Berichte: [Flottenregel](Q1_10b_flottenanwesenheit.md), [Politik](Q1_10b_politische_ortsregeln.md), [Bestandsschutz](Q1_10b_bestandsschutz.md), [offene Probleme](Q1_10b_offene_probleme.md). Frühere [Bestandsaufnahme](Q1_10b_bestandsaufnahme.md) bleibt als Vorabstand erhalten.
