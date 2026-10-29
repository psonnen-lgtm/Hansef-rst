# Q1.04 – begrenzte Wirtschaftsanalyse ohne Gildenimplementierung

29.10.2026 Europe/Berlin. Frisch bestätigte Entwicklungsbasis02ee6b8fc1507ad078b6b596c333e50d91eeea64; eigener Branch audit/q1-04-guild-economy. Produkt0.8d.1b/V13, HTMLc42c25cf5cf372c210b47f25b00b9f0106044ed3, SHA256c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924 unverändert. Q1.01/Q1.02/Q1.03 sind eigene Auditbranches, nicht hier hineingemergt.

## Reihenfolge und feste Grenzen

1. Historische Daten lesen:1500er-Archiv, identischen phase1-Alias nicht doppelt zählen,90 integrierte1.5e und2250er-Manifest/Zusammenfassung. Keine historische Simulation starten. Unterschiedliche Engine, Strategien/Information/Horizonte ausdrücklich trennen.
2. Kleiner tatsächlicher Pilot: normal/10001,120 Tage oder60 Entscheidungen, identische Reproduktion. Passt der Treiber nicht, stoppen und Befund sichern. Der Pilot ist bereits einer der später ausgewerteten Baselinefälle, kein zusätzlicher weggeworfener Vorlauf.
3. Nur nach bestandenem Pilot neun weitere Fälle:5 Stile×2 Seeds insgesamt10 verschiedene Baselines. Eine exakte Reproduktion zählt separat,11 Engineausführungen.
4. Erst danach Gebühren aus Baseline ableiten: je Fall erster beobachteter Nachverkaufszustand ab30 Tagen (bei frühem Ende letzter);25%-Quantil der zehn schuldengepufferten freien Cashwerte;10/25/50% davon, auf100 abrunden. Keine vorher gewählte Goldgebühr, keine Optimierung nach gewünschter Aufnahmequote. Rasteranteile sind Sensitivitätsannahmen, keine genehmigten Regeln.
5. Höchstens15 Gegenläufe: gleiche fünf Strategien, Seed10001, höchstens drei abgeleitete Gebühren. Einmaliger hypothetischer Geldabzug beim ersten reservegedeckten Nachverkaufszustand, kein Gildenstatus/Produktfeld. Höchstens26 Engineausführungen insgesamt, je120 Tage/60 Entscheidungszyklen, keine unkontrollierte Erweiterung oder Großserie.

## Simulator und Informationsgrenze

Unveränderter bestehender `headless.cjs` lädt ausdrücklich die aktuelle Haupt-HTML, `newMerchantGame` mit5.000 Gold/gesunder Kogge90 in Lübeck, keine Ware/Bank/Schuld. Sichtbare Zustandsdaten/Steuerfunktionen werden für Messung angesprochen; **Planer in separater reiner VM ohne Spielglobale** sehen nur örtliche aktuelle Angebote, eigenes datiertes Journal, bekannte Reisedauer/Gebühr. Keine fremden Livepreise/Zukunftspreise/RNG-Werte. Rohdaten speichern tatsächliche Planungsinputs und gewählte alte Notierung.

Vorsichtig/normal/aggressiv verwenden die bestehenden reinen `observedPolicy`/`planObserved`-Funktionen; nicht den alten vollständigen Simulator mit `promote`. Aggressiv nimmt am Anfang ausdrücklich1.500 regulären Kredit auf, dadurch unterscheiden sich Finanzierung/Risiko. Alle anderen0. Neue Vergleichsregel optimized_observed nutzt dieselben zulässigen Informationen mit eigener Ertrag/Tag-Schätzung und Altersabschlag; kein allwissendes historisches Optimum.

poor_then_normal versucht bis zu2 tatsächlich negative Verkäufe anhand **bereits beobachteter** ungünstiger Preisrelationen, höchstens6 beladene Versuche/30 Tage; danach normale Regel. Keine künstlichen Preise/Verluste. Wird das Verlustziel nicht erreicht, genau so berichten. Dies ist adversarielle Entscheidungssensitivität, keine typische Fehlerwahrscheinlichkeit. Keine Garantie wirtschaftlicher Erholung.

Alle laden lokal, reisen wirklich, verkaufen komplett, reparieren unter70% nur bei vorhandener Reserve. Keine Flottenvergrößerung, Waffen, aktiven Aufträge, Informationskäufe, Lagervermietung, Spenden oder Karriere. Die vollständigen V13-Tagesregeln laufen. Native Handels-/Reise-/Bank-/Preisfunktionen bleiben unverändert. Historische Rufschreibungen bleiben im Produkt, werden nicht als wirtschaftlicher Erfolg oder politische Zulassung gewertet. Kein Q-003-Pfad, da nur ein Schiff/keine politischen Aktionen.

## Maßstab für Bezahlbarkeit

Nominal: ausreichend Bargeld. Vorsichtig reservegedeckt: nach Abzug bleibt mindestens ein10-Fass-Warenkorb zur günstigsten aktuell verfügbaren Ware, zwei eigene Gebühren,80 Gold für einen maximalen weiteren Sturmschaden, volle aktuelle Reparatur, gesamte bestehende Schuld plus kurze Zinsreserve und gebundene Mietkosten. Dies ist **ein Analysemaßstab**, keine neue Spielpflicht. Volle Schuld als Puffer ist konservativer als das Spiel ohne feste Kreditfälligkeit.

Rücklagen reichen für neue Aktivität, garantieren aber keinen Gewinn. Gegenläufe prüfen tatsächliche Weiterfahrt/Handel/Kassenentwicklung und Blockaden. Der jeweils niedrigste Warenkorb ist nicht garantiert eine profitable Route, nur ein kleiner Wiederanlauf. Stichprobenanteile sind keine Anteile aller menschlichen Spieler. Buchvermögen wird in Geld/Waren/Schiff zerlegt; native letzte-Schiff-Verkaufssperre beachten. W1/W2 nicht integriert.

Quellen-/Ereignis-/Kassen-/Schulden-/Netto-Cashbilanzen und genaue Wiederholung prüfen. Stopgrund unterscheidet tatsächlichen Geldmangel von Tages-/Entscheidungslimit. Daten nicht überschreiben; Stufenmarker sperren Wiederholung. Keine Spieltage/Handelszyklen in aktive menschliche Stunden umrechnen. Allgemeine AGENTS-Großserie durch ausdrücklichen begrenzten Auftrag überstimmt.
