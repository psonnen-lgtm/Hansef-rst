# Reproduzierbare Wirtschaftssimulation

`node tests/simulation/run.cjs` führt sechs Strategien mit je 250 gepaarten Seeds aus (1.500 Verläufe). `python tests/simulation/report.py` erzeugt den HTML-Bericht mit Diagrammen (NumPy, Matplotlib). Bestehende results.json.gz lässt sich auch ohne Neuberechnung lesen. `node tests/simulation/edges.cjs` prüft gezielte Mechaniken. `node tests/share.cjs` prüft Teilen/Fallback ohne echte Übertragung.

Der Headless-Adapter führt die tatsächlichen Funktionen aus dist/index.html bzw. Hansefuerst_0_4.html aus. Kein zweites Wirtschaftsmodell, kein geänderter Zufall in der ausgelieferten Spielversion. Der Adapter trennt UI und Tests durch Stubs; die bestehenden Spielfunktionen enthalten weiterhin DOM-Zugriffe. Ein vollständiger Umbau zu einer reinen Engine wurde bewusst vermieden, um Spielstände/Funktionen zu schützen.

Mulberry32, Seeds 10001..10250; pro Strategie identische Startseeds, danach strategieabhängige Zufallsaufrufe. Feste Date.now-Werte sorgen für reproduzierbare Schiffskennungen. Jeder Lauf stoppt nach mindestens 1440 Spieltagen (letzte Reise darf überschreiten), 800 Zyklen oder Liquiditätsstillstand. Menschliche Spielstunden werden nicht geschätzt. Rohdaten enthalten keine echten Spielerdaten. SHA-256 im Datensatz bindet den Lauf an die HTML-Version.

Die optimierte Strategie ist allwissend bezüglich aktueller Preise, die absichtlich schlechte Strategie ebenfalls für die Auswahl besonders schädlicher Geschäfte. Die anderen Strategien verwenden alte Preisaufzeichnungen bzw. Basispreise. Deshalb keine Aussage über typische Spieler oder faire Vergleiche mit perfekter Marktinformation. Details und Grenzen stehen im Bericht. KNOWN-Tests bestätigen vorhandene Exploits; sie sind keine Balancekorrekturen.

Änderungen am Spiel in diesem Schritt: ausschließlich freiwilliges natives Teilen einer Telemetrie-JSON mit Download-Fallback. Bei Abbruch des Teilen-Menüs kein Download. Keine automatische Übertragung. Kein geänderter Spielstandschlüssel und keine Balanceänderung. Funktion auf echten iOS-Geräten noch zu prüfen.
