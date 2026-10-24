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
