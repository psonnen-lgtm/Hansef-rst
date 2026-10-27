# Phase P1 – Konzeptprüfung, keine Wahlengine

Basis a5ec92a19018a4049567c80f8e8fbd687f3a8d3e,
Branch analysis/p1-election-concept.

proposal.json enthält ausschließlich vorgeschlagene Parameter für die fünf Berichte.
check_concept.py liest den unveränderten HTML-Text und vorhandene Testquellen;
es evaluiert keinen Spielcode, lädt/migriert keine Partie und spielt keine Wahl aus.
Es prüft Stadtidentitäten, vorgeschlagene Einwohner/Wähler, Gruppenpartitionierung,
ganzzahlige Verteilung, ein Stimmenübertragungsbeispiel, Aktionsreihenfolge bei identischem
angenommenem Ereignissatz, kumulierte Spendenwirkung, Budget- und Kalenderarithmetik.

Alle konkreten Zahlen sind Vorschläge, keine beschlossene Balance. Sieben erfolgreiche
Konzeptprüfungen wären kein Nachweis einer implementierten Wahlordnung oder Migration.
Produktive Basistests, Browser-/Wirtschafts-/Karriereserien werden hier nicht gestartet.
Code/Parameter werden vor der arithmetischen Prüfung committet. Bestehende Dateien und
Ergebnisse bleiben bis auf die spätere Indexergänzung unverändert.

Befehl: python tests/analysis/phaseP1/check_concept.py tests/analysis/phaseP1/results/concept-attempt1.json
