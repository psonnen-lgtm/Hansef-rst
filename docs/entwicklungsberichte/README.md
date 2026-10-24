# Entwicklungs- und Testberichte

Nach jeder abgeschlossenen Entwicklungsrunde wird hier ein kompakter Bericht abgelegt. Die verbindlichen Arbeitsregeln stehen in [AGENTS.md](../../AGENTS.md). Frühere Berichte bleiben erhalten; jeder Bericht nennt die vollständige Commit-ID des getesteten Spielcodes und unterscheidet neue Prüfungen von übernommenen Ergebnissen.

| Datum | Version / Phase | Bericht | Getesteter Code-Commit |
|---|---|---|---|
| 24.10.2026 | 0.4.2 / Phase 1 | [Fehlerbehebung und Exploit-Schutz](2026-10-24_0.4.2_phase-1.md) | `0c00030993ab0b0ac153de240dd8106ae4dfcf57` |

| 24.10.2026 | 0.4.2 / Phase 1.5a | [Optimierten Bot reparieren](2026-10-24_0.4.2_phase-1.5a.md) | `67efda6915db7e9068591315bebda59188911a56` |

| 24.10.2026 | 0.4.2 / Phase 1.5b | [Drei Handelsstrategien unterscheiden](2026-10-24_0.4.2_phase-1.5b.md) | `f6ddf8583687106aa1b7c1f4f065d0e22c530c21` |

| 24.10.2026 | 0.4.2 / Phase 1.5c | [Echte Lieferaufträge](2026-10-24_0.4.2_phase-1.5c.md) | `32362e4e1efdbb51acd6b6553c06b1e9321cd20b` |

| 24.10.2026 | 0.4.2 / Phase 1.5d | [Wirtschaftliche Erholung](2026-10-24_0.4.2_phase-1.5d.md) | `84e51a341127a9464bd14695b1f83da30806cf7a` |

Ältere ausführliche Nachweise bleiben an ihren bisherigen Pfaden erhalten, insbesondere [V04-PHASE1.md](../../V04-PHASE1.md). Wesentliche Änderungen an Spielmechaniken oder Balance benötigen vorherige Abstimmung mit dem Nutzer.


## Nachtrag: Sicherung Phase 1.5e

24.10.2026 – [Sicherungsstatus und fehlender Originalbericht](2026-10-24_0.4.2_phase-1.5e_sicherung.md). Simulatorstand: `1b7c816b7147aef8b8fb4de8231f901289b1c456`; Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`. Ausschließlich alte Ergebnisdateien und Dokumentation übernommen; keine neuen Tests oder Simulationen.


## Abschlussauswertung Phase 1.5e

24.10.2026 – [Neue Auswertung der 90 gesicherten historischen Ergebnisse](2026-10-24_0.4.2_phase-1.5e_abschluss.md). Grundlage: `b4dad87c31f70d30eb021158357d42b0500f12fc`; historischer Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`. Keine erneuten Simulationen oder Regressionstests; einschließlich Vergleichsgrenzen und Vorbereitungslücken für 2.250 Läufe.

## Phase 1.6a – Technische Vorbereitung

24.10.2026 – [Abschlussbericht und Start-/Resume-Anleitung](2026-10-24_0.4.2_phase-1.6a.md), [drei veröffentlichte Zwischenstände](2026-10-24_0.4.2_phase-1.6a_fortschritt.md). Separater 2.250er-Modus vorbereitet; acht technische Prüfgruppen und zwei Smoke-Ergebnisse mit je einem Replay erfolgreich. Kein großer Lauf; Spielcode und historische Ergebnisse unverändert. Geprüfter Runner: `1f937cc5aff04c79eedae4e879f37573bc478e63`; Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`.

## Phase 1.6b – Lieferaufträge des optimierten Händlers

24.10.2026 – [Abschlussbericht](2026-10-24_0.4.2_phase-1.6b.md), [beide Zwischenstände](2026-10-24_0.4.2_phase-1.6b_fortschritt.md). Automatische Auftragsabschlüsse werden jetzt korrekt gezählt; historische 90 Prämien/84.010 Gold herkunftsseitig geprüft. 16 gezielte Prüfgruppen, 18 Phase-1-Regressionen und Informationsschutzprüfungen bestanden; historische Fristdetails fehlen weiterhin. Keine große Simulation, keine Spielcodeänderung. Geprüfter Korrekturcommit: `c7b00b42c9b8663798e4970de18d184ce07aeee3`; Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`.

## Phase 1.6c – Große Wirtschaftssimulation

24.10.2026 – [Technischer Abschlussbericht](2026-10-24_0.4.2_phase-1.6c.md), [vier veröffentlichte Zwischenstände](2026-10-24_0.4.2_phase-1.6c_fortschritt.md). 2.250/2.250 Ergebnisläufe und identische Replays (4.500 Engineausführungen), keine Runnerfehler. [Vollständige Rohdaten, Manifeste und Prüfsummen](../../tests/simulation/phase16c-20261024-01/summary.json) über neun Strategiearchive gesichert in Commit `bd47c74`. Tatsächlich ausgeführter Codestand: `51a2384` (danach nur Fortschrittsdokumentation); Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`. Wirtschaftliche Abbrüche bleiben enthalten; keine Balanceänderung.

## Phase 1.6d – Wirtschaftliche Gesamtanalyse

24.10.2026 – [Wirtschaftsanalyse und A/B/C-Empfehlungen vor 0.5](2026-10-24_0.4.2_phase-1.6d.md), [beide Zwischenstände](2026-10-24_0.4.2_phase-1.6d_fortschritt.md), [abgeleitete Kennzahlen](2026-10-24_0.4.2_phase-1.6d_kennzahlen.json). Ausschließlich 2.250 archivierte Phase-1.6c-Ergebnisse ausgewertet; keine neue Simulation oder Codeänderung. Preisrundungsfalle, Routinedominanz und Liquiditätssackgassen getrennt von Botproblemen und ungeprüften Systemen eingeordnet. Historischer Spielcode: `0c00030993ab0b0ac153de240dd8106ae4dfcf57`.

## Phase 1.6e – Preisrundung

24.10.2026 – [Abschlussbericht](2026-10-24_0.4.2_phase-1.6e.md), [beide Zwischenstände](2026-10-24_0.4.2_phase-1.6e_fortschritt.md). Niedrigpreise unter 9 können symmetrisch schwanken, Untergrenze 4 bleibt; keine zusätzlichen Zufallsaufrufe/Speicherfelder. Zehn Preis-/Speicherprüfgruppen, 19 Basistests, 18 Phase-1-Regressionen und Informationsschutzprüfungen bestanden. Unvermeidbarer Untergrenzen-Randeffekt ausdrücklich dokumentiert. Geprüfter Spielcode: `e18943c9d50bff0e0d45044193f9f55d668a6795`. Keine neue Wirtschaftssimulation; historische Ergebnisse unverändert.

## Phase 0.5a – Fundament

24.10.2026 – [Städte/Waren technisch erweiterbar vorbereiten](2026-10-24_0.5a_fundament.md), [beide Zwischenstände](2026-10-24_0.5a_fortschritt.md). Zentrale Anzahlen/Indexprüfungen, explizit unveränderte Auftragsauswahl; keine neuen Inhalte oder Wirtschaftsregeln. Zehn neue Kompatibilitätsgruppen, 19 Basistests, 18 Regelregressionen, Informationsschutz, Telemetrie und Teilen bestanden. Speicherformat v4 unverändert; Erweiterungsmigration und 11×15-Geräte-/Kartenarbeit bewusst offen. Geprüfter Spielcode: `c4bfe2badf6fb142aaf3ef63aa40fbbcfb01cbff`.


## Phase 0.5b – Erstes Lagerhaus in Lübeck

24.10.2026 – [Abschlussbericht](2026-10-24_0.5b_lagerhaus-luebeck.md), [beide gesicherte Zwischenstände](2026-10-24_0.5b_fortschritt.md) und [mobiler Chromium-Screenshot](2026-10-24_0.5b_lagerhaus-mobile.png). Lagerhaus im Lübecker Kontor, Warenumlagerung mit FIFO-Herkunft/Kosten und konserviertem Vermögen; additive v4-Migration mit Backup. Laut Codex-Zwischenstand 19 Lagerprüfgruppen, 19 Basistests, 18 Regressionen sowie Browserproben bei drei Viewportgrößen bestanden. Abschlussdokumentation nachgetragen; keine neuen Tests hierfür ausgeführt. Keine große Wirtschaftssimulation.

## Version 0.5b – Bauabschnitt 2

24.10.2026 – [Lagerhäuser in allen fünf Städten](2026-10-24_0.5b_lagerhaeuser-alle-staedte.md), [beide Zwischenstände](2026-10-24_0.5b_alle-staedte_fortschritt.md). Gemeinsame Lagerfunktion mit getrennten örtlichen Beständen; Altstände ohne Lager und mit Lübecker Lager geschützt übernommen. 19 bisherige + 13 neue Lagergruppen, 19 Basistests, 18 Regelregressionen und weitere kleine Schutztests bestanden. Chromium: fünf Städte × drei Ansichten; tatsächliche Screenshots gesichert. Geprüfter Spielcode: `f679076ac8c4ed96cf51c24392d889bc3a235fe7`. Keine große Wirtschaftssimulation.

## Version 0.5c – Vier neue Handelswaren

24.10.2026 – [Abschlussbericht mit elf Basispreisen, Startprofilen und v5-Migration](2026-10-24_0.5c_vier-neue-waren.md), [beide Zwischenstände](2026-10-24_0.5c_fortschritt.md). Hanf/Pech/Eisenwaren/Pelze an Indizes 7–10; alle fünf Lager bleiben nutzbar. 16 neue Prüfgruppen plus vorhandene Basis-/Lager-/Regeltests bestanden; Chromium Handy/Tablet/Desktop samt echten Handels-/Lageraktionen, Altstandübernahme und Sicherungsfehlern geprüft. Zwei tatsächliche Bilder gesichert, keine große Wirtschaftssimulation. Geprüfter Spielcode: `2384479fa1d5eb0cda47250265e36097a584451b`.
