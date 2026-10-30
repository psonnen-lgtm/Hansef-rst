# Q1.09b – Sicherheitsprüfung und Entscheidungsvorbereitung

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

**Teilabschluss; keine vollständige Sicherheitsfreigabe.** Der vorhandene Speicher- und Anwesenheitsschutz ist nun zusätzlich im echten Chromium geprüft. Q001 bleibt aktiv reproduzierbar und fachlich offen. Safari/WebKit, echte Apple-Geräte und vollständiger Offline-Kaltstart sind nicht abgenommen.

## Ausgangslage und unveränderter Spielstand

GitHub vor Beginn frisch geprüft: Entwicklung `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`. Der Folgebranch stammt vom tatsächlichen Q1.09-Abschluss. Ursprünglicher Sicherheitsbranch, Produkt-HTML, Dist/Pages, alle historischen Simulationsergebnisse und Q1.09-Dateien bleiben unverändert.

Die44 bestandenen VM-Prüfgruppen, acht Handelsfälle und das native Schiffbau-Gegenpaar aus Q1.09 werden mit Quellenhashes übernommen, nicht unnötig neu ausgeführt. Frühere Berichte Q1.02/03/06/07/08 bleiben Grundlage; ModellC ist konzeptionell gewählt, hier weder implementiert noch aktiviert.

## Status nach dieser Runde

|Bereich|Tatsächliches Ergebnis|Grenze|
|---|---|---|
|Q002 Speicherung|19 zusätzliche native Chromium-Prüfgruppen insgesamt, darunter reale Tabs, Web Locks, Dateien und Speicherfehler|Ein Teil der Fehler ist kontrolliert eingespritzt; kein Stromausfall-/Physiktest|
|Q003 Anwesenheit|Fernansicht verweigert persönliche Vorsprache; echter Hin-/Rückweg ermöglicht genau eine Urkunde|Unbegleitete Fernreise bleibt sicher gesperrt|
|V13|Native Importe/Exporte/Reloads erhalten alle Felder einschließlich Titel/Ämter; Originale bytegleich|Nur synthetische und abgeleitete historische Kopien, keine echten Nutzerdateien|
|Alte Tests|19 Basis- und18 Phase-1-Prüfungen bestanden; synchroner Treiber verweigert asynchronen Rootcode|Kein vollständiger Umbau aller alten Simulatoren/Strategien|
|W1-S, Reisen, Fristschonung|17 getrennte Vorschlagsprüfungen bestanden|Nur Rechen-/Angebotsmodelle, keine Spielregel aktiviert|
|Q001|Bisherige Handels-/Baugegenfälle bleiben gültig|Nicht geschlossen; Referenz-/Sicherheitenentscheidung nötig|
|Geräte/Offline|375/820/1280px mit echtem Chromium und Touch-Emulation, geladene Seite offline nutzbar|Keine Apple-Hardware; WebKit fehlt; Offline-Neustart offen|

**74 neue gezielte Prüfgruppen bestanden:**19 Browser +37 alte Basistest-Aussagen +17 isolierte Vorschlagsgruppen +1 Treibersperrprüfung. Diese Zahl ist keine Zahl von Spielverläufen, keine Wiederholung der44 historischen Gruppen und keine Vollabnahme der offenen Regeln.

## Tatsächlich geänderte Dateien

- `tests/test-v04.cjs`, `tests/phase1.cjs`: bestehende Prüfaussagen asynchron abwarten; neuer enger Adapter lädt die wirkliche Root-HTML statt unbemerkt eine Dist-Fassung. Historische Fixture-Details kontrolliert erhalten.
- `tests/simulation/headless.cjs`: eindeutiger Abbruch, wenn der rein synchrone historische Treiber Q1.09-Code erhält. Historische HTML-Overrides bleiben lesbar.
- Neue Prüfungen, isolierte Vorschläge, unveränderte Fehlversuchprotokolle und Ergebnisse in `tests/safety/q1_09b/`.
- Diese sieben Berichte und ergänzter Berichtsindex.

Keine Preise, Wirtschaftsformeln, Titel, Gebühren, Speicherfelder oder Reise-/Vertragsregeln geändert. Kein Sicherheitsfehler im Produkt eigenmächtig als behoben ausgegeben: die zusätzlichen Korrekturen betreffen Testtreiber und deren Fixtures. Produktive Ruftrennung, Gilde, Karriere, Spielszenen, ModellC und Gebühren bleiben außerhalb dieses Auftrags.

## Quellen und Prüfungen

[Arbeitsplan](../../../tests/safety/q1_09b/plan.json), [übernommene Belege](../../../tests/safety/q1_09b/inherited-evidence.json), [native Browserabnahme](../../../tests/safety/q1_09b/results/browser-acceptance.json), [neue Gesamtmatrix](../../../tests/safety/q1_09b/acceptance-summary.json). Befehle und echte Fehler stehen im [Testbericht](Q1_09b_regressionstests.md).

AGENTS.md verlangt bei Spielregeländerungen große Vergleichsläufe. Hier gibt es keine solche Änderung; der ausdrückliche Nutzerauftrag begrenzt neue Prüfungen. Keine Großsimulation und keine Ableitung menschlicher Spielstunden aus Spieltagen.

## Sicherung und nächste nötige Freigabe

[Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/fix/q1-09b-safety-completion), [Produktcode unverändert](https://github.com/psonnen-lgtm/Hansef-rst/blob/fix/q1-09b-safety-completion/Hansefuerst_0_4.html), [Vergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/fix/q1-09-safety-foundation...fix/q1-09b-safety-completion).

Zwischenstände: `503b0ea` Bestandsaufnahme; `7e53fb9` Browserprüfer vor Lauf; `ea0595f` erste native Ergebnisse und Prüferkorrektur; `cef6ba0` isolierte Vorschläge/alte Treiber vor Prüfung; `0ec09b8` historische Fixtures und Synchronsperre; `8f18c85` Fixture-Sicherung vor gültiger Basisprüfung. Vollständige IDs/Prüfquellen stehen in den Rohdaten und im Abschlussnachweis. Veröffentlichtes Paket einschließlich vollständiger Haupt-HTML wird unabhängig von GitHub zurückgelesen.

W1-S einschließlich Werftlohn und Verbrauchern, unbegleitete Schifffahrt und enge Fristschonung benötigen konkrete Entscheidungen; siehe [Vorlage](Q1_09b_entscheidungsvorlage.md). Danach ist echte Safari-/Geräte-/Offlineabnahme erforderlich. Kein Merge, keine Pages-Änderung, keine automatische Folgephase.

## Abschließende lokale Kontrolle

[Nachweis](../../../tests/safety/q1_09b/results/verification.json):3330 bestehende Dateien gegen Q1.09 geprüft. Nur die beiden Basistreiber, die gezielte Synchronsperre in `tests/simulation/headless.cjs` und der ausschließlich ergänzte Berichtsindex unterscheiden sich. Produktdatei, alle ursprünglichen Q1.09-Dateien und historischen Ergebnisse einschließlich Pages/Dist unverändert. Alle37 alten Prüfaussagen erhalten, neun Skripte syntaktisch gültig, sieben Berichte und deren lokale Verweise geprüft. Keine neue aktive Regel; Q001 und vollständige Abnahme ausdrücklich offen.

Die neuen Ergebnisstände sind mit ihren tatsächlichen Quellencommits gesichert. [Prüfmatrix](../../../tests/safety/q1_09b/test-matrix.csv), [Sicherungsstände](../../../tests/safety/q1_09b/checkpoints.json). Nach Veröffentlichung wird das Paket einschließlich vollständiger Spiel-HTML unabhängig aus GitHub geladen und byteweise verglichen. Der Nachweis benennt den gelesenen Commit; keine selbstreferenzielle Test-ID.
