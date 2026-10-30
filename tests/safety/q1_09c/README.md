# Q1.09c – Prüfbelege

Maßgeblich: `results/final-acceptance/`, vollständiger Entwicklungsbericht unter `docs/entwicklungsberichte/Q1_09c/`. Alle früheren Ordner einschließlich `final`, `accepted`, `release` sind unveränderte Zwischen-/Fehlerstände, keine Freigaben. Fehler werden nicht durch spätere grüne Wiederholungen allein aufgehoben: der native LocalStorage-Race erforderte die konkrete atomare Speicheränderung.

Produktquelle ist ausschließlich `Hansefuerst_0_4.html`. `storage-engine.js`, `legacy-rules.js`, `safety-boundary.js` dienen als bytegleiche prüfbare Auszüge; sie werden nicht separat ins Spiel geladen. `harness.cjs` verwendet tatsächlichen Rootcode, modelliert Web Locks/IndexedDB für VM-Prüfungen und trennt logischen kanonischen Datensatz von alten LocalStorage-Quellen. `browser-checks.cjs` verwendet echtes Chromium und echte Speicher-/Datei-/Lock-APIs.

Sicherheitsrevision3, RootV13/Politik2. Ein aktiver IndexedDB-Datensatz; alte LocalStorage-Daten bleiben nur Quelle/Backup. Keine Großsimulation, keine echte Nutzerdatei, kein Deployment. Q001-Finanzschutz bestanden, verbleibender politischer Ansehenspfad ausdrücklich offen.

Aktueller Basistestpfad: `node tests/safety/q1_09c/basic-checks.cjs <neue-ergebnisdatei.json>`. Die alten direkten Testeinstiege sind historische Referenzen ihrer damaligen Speicher-/VM-Schnittstelle.
