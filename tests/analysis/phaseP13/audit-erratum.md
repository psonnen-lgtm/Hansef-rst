# Lesende Auswertung: ursprüngliche und abschließende Fassung

`results/audit.json`/`ledger.csv` bleiben erhalten. Alle elf dort durch Assertions geprüften Cash-/Waren-/Bedarfsbilanzen sind richtig, aber zwei **Darstellungs-/Zuordnungsfehler** erfordern eine neue lesende Ausgabe:

1. Nach Wegfall von Fall05 verwendete die nachgeschaltete Stress-/Naturzuordnung noch feste Listenpositionen. Diese zeigten auf andere Verläufe. Jetzt eindeutige Fallnamen;90 gespeicherte Tagespaare statt zwei falscher Selbstentnahme-Tagespaare.
2. Der Selbstentnahmefall11 verkauft **nach** der letzten Tagesbeobachtung80 Fass zurück. Die Spalte `finalStock` muss den wirklichen Endspielstand115 verwenden, nicht die letzte vor Verkauf beobachtete35. Ledgerassertionen benutzten bereits den wirklichen Endstand115 und waren korrekt. Der Vergleich15/30/60 und die Erholungszeiten ändern sich nicht.

Korrigiertes `audit.cjs` erneut vor Ausführung committet; neue Dateien `audit-final.json`/`audit-final.log`/`ledger-final.csv`, keine alten Ausgaben überschreiben. **Keine weitere VM, kein neuer Spieltag/Handel, keine neue dynamische Probe.** Tagesminima und Erholungszeit beziehen sich weiter auf gespeicherte Tagesbeobachtungen; ein nachträglicher Verkauf ist noch kein zusätzlicher Erholungstag.
