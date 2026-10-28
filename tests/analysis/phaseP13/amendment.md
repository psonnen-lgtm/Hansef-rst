# Vor Fortsetzung gesicherte Prüfplanänderung

Erster tatsächlicher Versuch auf `39bc6fb7cd8990d92c1acef7a07ec9b92234257a`: neun Rechengruppen bestanden. Ein erster VM-Kontext entstand, aber die allererste Kennzahlenabfrage warf `TypeError: s.warehouses.reduce is not a function`. V13 speichert Lagerhäuser als Objekt, keine Arrayliste. **0 Handelsaktionen,0 Spieltage**, keine Wirtschaftsergebnisse. Fehlerlog und Startmarker unverändert bewahrt; die Ausgabe-JSON wurde vor dem Fehler im `finally`-Block noch nicht geschrieben. Keine fehlenden Zustände rekonstruiert.

Korrektur ausschließlich neuer Analyseaggregation: `Object.values(s.warehouses)` sowohl in Kennzahlen als auch lesendem Audit. Keine Produktiv-/Preis-/Bedarfsregel geändert. Neue Ausgabe `dynamic-attempt2.json`, alter Logname bleibt erhalten.

Bereits erzeugter Kontext zählt zum Budget12. **Die geplante identische Wiederholung05 entfällt; genau elf neue verbleibende Kontexte**, insgesamt zwölf. Alle inhaltlichen Vergleichsarme, B/C, Kleinlieferant, Kalendernegativprobe, Eigenentnahmen und Splits bleiben. Keine Aussage, dass in P1.3 eine identische Wiederholung geprüft wurde; Determinismus aus gleichem RNG im Vergleich und historisch P1.2 getrennt ausweisen.

Der zweite Startmarker verhindert erneute Vollausführung. Neuer `continuation-plan.json` friert korrigierte neue Quellen ein; ursprünglicher `frozen-plan.json` bleibt historisch unverändert. Mathquelle unverändert zum bereits bestandenen ersten Lauf. Kein weiterer Gesamtdurchlauf bei ausgeschöpftem Budget.
