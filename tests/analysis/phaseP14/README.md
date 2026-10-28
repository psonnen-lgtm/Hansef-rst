# P1.4 – Reisezeiten, Ereigniserreichbarkeit und Grenzen

28.10.2026 Europe/Berlin. GitHub-Basis vor Beginn geprüft: `ffc0bfad0e36e4547f7a5750bb68b169f93f8009`; Branch `analysis/p14-voyage-times`. Produkt0.8d.1b/V13 unverändert, letzter HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`.

`model.cjs` extrahiert ausschließlich wörtliche Kataloge/DIST und reine produktive Zeitfunktionen. Keine Spielpartie in dieser statischen VM, keine Zufallsaufrufe/Markttage. DIST besitzt keine Kilometer-/Seemeileneinheit. `static.cjs` prüft55 Paare, beide Richtungen, drei Schiffstypen,100/30% Zustand, drei Modelle und alle121 Ausgangs-/Ereignisortkombinationen einschließlich Heimatort. Modelle B/C ausdrücklich unbeschlossene Spielzeit-Sensitivitäten, keine historischen Distanzmessungen.

- A: echte V13-Reisezeit.
- B: Rechenbasis `D+ceil(.25*max(0,D-4))`, Nord-/Ostseewechsel mindestens10. Danach gleicher Geschwindigkeitsdivisor und unveränderter Binnenzuschlag3 pro Endpunkt Nowgorod/Venlo.
- C: Rechenbasis `D+ceil(.75*max(0,D-4))`, Nord-/Ostseewechsel mindestens16, sonst gleicher Aufbau. Keine Behauptung, dass diese Werte quellenkalibriert sind.
- Nordseegruppe für diese Vorschläge: Hamburg, Bergen, Brügge, Venlo. Alle anderen Ostsee/Binnenanschluss. Kein neues geografisches Entfernungsmodell.

Erreichbarkeit: direkte geladene Fahrt;7 Tage Nachrichtenverzug+10 Tage Vorbereitung; Beschaffung über best-/ungünstigsten anderen Lieferort; zweite Lieferung mit Beschaffungsrückfahrt. Alle Lieferquellen nur Möglichkeiten, weder Bestände noch Käufe/Finanzierung garantiert. Vorbereitung und Nachrichtendauer sind hypothetische Rechenparameter. Fristen60/90/120, gleicher Maßstab für künftige NPC. Ein Ankunftstag am letzten Fristtag zählt als rechtzeitig; keine bereits implementierte Ereignisabnahme behauptet.

Wirtschaftliche Obergrenzen rechnen mit360 Tagen, vollen Ladungen und optional konstant8 Gold Marge/Fass. Keine erfundenen Jahresgewinnprognosen. Native Hafengebühr pro Fahrt/Schiff4/6/9; Zinsen mit tatsächlicher jährlicher Formel; Ereignisrisiko pro Fahrt, nicht pro Tag. Auslastung/Bewaffnung/Flotten-Serialität gesondert dokumentieren.

## Vor Ausführung begrenzte acht dynamische Fixtures

`dynamic.cjs`: drei kurze Lübeck–Hamburg-Fälle A/B/C mit Kogge und bestehendem8-Tage-Auftrag; drei Bergen–Nowgorod-Fälle A/B/C mit Holk. Jeweils nur eine Fahrt,500 Gold,1000 Schuld,30 vorhandene Fass zu8, anschließend echter Verkauf. B/C ausschließlich durch privaten `pending.days`-Szenariowert; sämtliche produktiven Funktionskörper bleiben unverändert. Kein neuer Simulatorumbau.

Zusätzlich ein nativer Konvoi mit gesunder Schnigge, beschädigtem Holk und fernem zurückbleibenden Schiff; gezielter Sturm ohne Zusatzreisetag. Ein nativer Piratenfall mit echtem Verlust/einem Fass zu wenig für den Auftrag. Startmarker sperrt versehentliche Wiederholung. Maximal8 geplante von12 erlaubten Kontexten, keine Karriere, keine Wirtschaftsserie. Fehler erhalten. Keine große Neuberechnung gemäß allgemeiner AGENTS-Regel: ausdrückliche kleine Prüfgrenze dieses Auftrags hat Vorrang.

Historische08a-Reichweitentabelle und P1.2/P1.3-Ergebnisse nur lesen, nicht neu ausführen. Quellenzugang: vier externe Versuche durch Proxy403 gesperrt, siehe `source-access.json`; keine behaupteten abgerufenen historischen Fakten/Zitate. Allgemeine historische Einordnung, Schätzungen und unbestätigte Literaturhinweise im eigenen Bericht trennen.
