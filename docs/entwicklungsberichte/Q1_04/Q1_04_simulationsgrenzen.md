# Q1.04 – Prüfgrenzen und tatsächliche Ausführungen

29.10.2026 · [Gesamtbericht](Q1_04_gesamtbericht.md) · [Historie](Q1_04_historische_testbasis.md) · [Balancing](Q1_04_gildenbeitritt_balancing.md).

## Was geprüft wurde

Aktueller Entwicklungsstand vor Beginn auf GitHub geprüft: `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Produkt0.8d.1b/V13, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`, HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`. Eigener Analysebranch, keine Änderungen an Produktcode, Politik, Speicherformat, echten Spielständen oder Pages.

`headless.cjs` führt die tatsächlich gelieferte Haupt-HTML aus; `HANSE_GAME` wird ausdrücklich darauf gesetzt, kein zufälliger `dist`-Stand. UI/DOM/Bestätigung/Speicher sind vorhandene Teststubs. Volle Bestätigung über70%-Investition wird entsprechend der Strategie angenommen. Kein Browser-/Touch-/Savequota-Beweis.

Die aktuelle Engine wurde im kleinen normalen Pilot und einer vollständigen identischen Wiederholung auf Kompatibilität mit diesem **begrenzten Wirtschaftspfad** geprüft. Danach weitere neun Baselines und15 Zahlungsszenarien. Keine alten1.500er-/2.250er-Tests erneut gerechnet. Die26 Ausführungen entsprechen25 unterschiedlichen Pfaden; die Reproduktion ist keine zusätzliche unabhängige Person.

| Prüfung | Tatsächlicher Stand |
|---|---|
| Historischer Leser `history.py` auf `a8f949de15c0acd7d889e0eefcff0420c04d8069` |1.500er/Alias,90er-Rohdaten,2.250er-Manifest/Summary gelesen; keine Simulation. Aliasgleichheit bestätigt. |
| Neuer Pilot `run.cjs pilot` auf `637f74d514d80a89d064d9d230e569ddcf45726f` |1 normaler Fall bisTag118 plus exakte Reproduktion, Spiel/Entscheidungen/Ereignisse identisch.2 Ausführungen. |
| `run.cjs baseline` auf `4688f7f5f3d00e5ed5f7302ab2fd1135916a9f70` |9 weitere Fälle bestanden, mit Pilot10 verschiedene Baselines. Gleiche unveränderte eingefrorene Engine. |
| `select-fees.cjs` auf demselben Stand |Erst nach vollständiger Basis:25%-Quantil11.221; Kandidaten1.100/2.800/5.600. Reine Rechnung, keine neue Spielpartie. |
| `run.cjs fee` auf `a7a88317ec7fd8f1e506f6f415021363580552ff` |15 kurze einmalige Geldabzugsszenarien, alle technischen Kassen-/Schulden-/Nettogeldprüfungen bestanden. Ein hoher Gebührenfall stagniert wirtschaftlich; nicht als sichere Gebühr bestanden. |
| Lesendes `audit.cjs` auf `f5d5dec0a3bb30a4005435f8c57982a1f1093ba0` |25 unterschiedliche gespeicherte Bilanzen, Quellenhashes, Pfadzahlen und Gruppenstatistiken geprüft; keine VM. |
| `reserve-diagnostic.py` auf `1220b696caab56002706d7b7cfe05a67f7a13f71` |Nachträgliche rein rechnerische Diagnose der beobachteten Rücklagenlücke, keine Pfade/Preise/Kandidaten verändert. Keine unabhängige Prognosevalidierung. |
| Syntax-/Datei-/Link-/Quellenkontrollen |Neue CJS-Syntax, native Funktionskörper und eingefrorene Quelldateien unverändert; abschließender Datei-/GitHub-Abgleich separat dokumentiert. |

Keine unerwarteten technischen Abbrüche und keine stillen Testwiederholungen. Der negative Gebührenbefund bleibt vollständig erhalten. Stufenmarker und neue Ausgabedateien verhindern versehentliches Wiederrechnen. Expliziter begrenzter Auftrag überstimmt die allgemeine AGENTS-Großsimulationsregel.

## Informationsfairness

Jeder Planer läuft in isolierter reiner VM ohne `s`, Märkte oder künftige Zufallszahlen. Eingaben nur örtliche Preise/Bestände, eigenes datiertes Journal und tatsächliche Routen/Gebühren. Beladene Zielwahl setzt beobachtetes Journal voraus, Notierung wird gegen dieses geprüft. Die Engine darf die echte Welt zur Fortschreibung lesen; **der Planer erhält davon keine fremden Livepreise**. Rohdateien speichern die tatsächlichen Inputs/Entscheidungen.

Vorsichtig/normal/aggressiv nutzen vorhandene reine beobachtungsbasierte Funktionen, nicht den kompletten alten Simulator. Der neue optimierte Vergleich ist eine Heuristik mit denselben Informationen, kein mathematisches Optimum. Selbst schlechte Geschäfte beruhen auf schon bekannten Relationen, keine künstlich eingestellten Verlustpreise/Allmarkt-Auswahl.

## Grenzen der Übertragbarkeit

- Nur zwei Seeds, Start Lübeck, eine Kogge. Sehr kleine gezielte Stichprobe, keine Prozentwerte für alle Spieler und keine Konfidenzintervalle.
- Gegenläufe nurSeed10001. Die zweite Baseline pro Stil wird statisch auf Bezahlbarkeit geprüft, nicht dynamisch mit Gebühr wiederholt. Je Kandidat fünf unterschiedliche Stile, nicht fünf unabhängige Marktstarts.
- Höchstens120 Tage/60 Zyklen; tatsächliche Enden118–120. Kein Mehrjahres-/Flotten-/Bau-/Lager-/Auftrags-/Informationskaufstil. Keine langfristige Garantie gegen Zahlungsstillstand.
- Keine laufenden Mannschaftskosten/Verderb erfunden. Vorhandene Kosten nur bei tatsächlichem Auslösen; weder Lohn- noch Mietfreiheit für alle menschlichen Partien behauptet.
- Aggressiv hat1.500 Anfangskredit; sein Vorteil ist deshalb nicht reine Risikoneigung bei gleichem Bargeld. Nettogeld/Schuld getrennt ausweisen.
- Alle Ladung wird je Ankunft verkauft, keine gemischten Restkostenkreise. Q-001 bleibt offen; native Buchwerte werden nicht als reales Vermögen für Gebühren genutzt. Kredit nur einmal anfangs aufgenommen, kein Ausnutzen später gestiegener Kostenbuchwerte. W1/W2 nicht implementiert.
- Q-003 nicht benutzt: ein Schiff, keine persönlichen politischen Aktionen. Bestehende Rufschreibungen bleiben, aber keine Rang-/Wahl-/Rufauswertung als Erfolg; keine politischen Regeln geändert.
- Die Rücklagenprüfung war eine **anfängliche Näherung**, kein bewiesener Schutz. Vorsichtige800-G-Mindestreserve fehlt darin; hoher Gebührenfall zeigt gerade deren Unzulänglichkeit. Nachträgliche Erweiterung nur Diagnose/Empfehlung, keine schön gerechneten Ersatzläufe.
- Native Schadens-/Marktpreise hängen von Tagen und Entscheidungen ab. Gleicher Seed gibt gleichen Start, aber geänderte Zahlung verändert Ladungen/Wege/Zeitpunkte und spätere Zufallsfolge. Endgeld muss deshalb nicht monoton mit Gebühr fallen; ein positiver Unterschied ist kein Gebührengewinn-Exploit.
- Fortschritt an30/60/90/120 wird aus realen Nachverkaufsbeobachtungen ohne Interpolation berichtet. Kandidatenreferenz verwendet ausdrücklich ersten Zustand **ab**30, sonst Tabellen letzten Zustand **bis**Zeitpunkt. Tatsächliches Datum immer gespeichert.
- Keine gemessene aktive menschliche Zeit. Simulationstage, Handelszyklen und reale aktive Spielstunden strikt getrennt. Das90-Stunden-Eldermannziel bleibt ungeprüft.

## Technische Plausibilität ist keine Balancefreigabe

Alle26 Engineausführungen waren technisch konsistent. Von15 Gebührpfaden erfüllt einer mit5.600 das wirtschaftliche Fortsetzungskriterium nicht. Damit sind die Messdaten belastbar für **diesen Gegenfall**, aber kein umfassender Balancenachweis für1.100 oder2.800. Die Aufnahmegebühr entscheidet allein der Nutzer. Keine automatische Folgephase.
