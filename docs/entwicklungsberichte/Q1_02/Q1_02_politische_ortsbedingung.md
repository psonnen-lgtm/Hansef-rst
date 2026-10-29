# Q1.02 – Persönliche politische Vorsprache

29.10.2026. Branch `audit/q1-02-exploit-validation` direkt von erneut remote bestätigtem Entwicklungsstand **02ee6b8fc1507ad078b6b596c333e50d91eeea64**. Produkt0.8d.1b/V13, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Referenz [Q1.01](https://github.com/psonnen-lgtm/Hansef-rst/tree/d4cf42868a5347ec6e660f52faafb8132df5b209/docs/entwicklungsberichte/Q1_01). Keine Produktänderung oder Reparatur.

Prüfung: Node-VM lädt die Originalfunktionen aus der Hauptdatei; reine Anzeige-/Renderfunktionen und DOM-Eingaben sind ersetzt, Speicher ist eine isolierte Map, Bestätigungen werden angenommen. Originalvalidator prüft künstliche V13-Stände. RNG konstant0,5, keine Reise/Wirtschaftstage simuliert. Kein Browser-/Touch-/Persistenzfehlernachweis. Quellhash wird vor Ausführung geprüft. [Skript](Q1_02_probe.cjs), [vollständige Rohdaten](Q1_02_rohdaten.json). Befehl: `node Q1_02_probe.cjs /pfad/Hansefuerst_0_4.html /temp/results.json`. Node/Playwright wird für dieses Skript nicht benötigt außer Node selbst; keine zusätzlichen Pakete. Ausgabe nur in gesonderten Testpfad schreiben.


## Tatsächliche Reproduktion B01

Künstlicher gültiger V13-Stand:10000 Gold, zwei gesunde Koggen mit IDs1/2 in Lübeck/Hamburg; politischer Abschnitt0. Die zweite Kogge ist gesetzte Testvoraussetzung, nicht gratis im normalen Spiel erworben. `acceptPoliticalJob("accord")` in Lübeck; Originalpartner Hamburg. `selectFleetShip(1)` setzt Stadt auf Hamburg, `witnessPoliticalJob(id)` akzeptiert; `selectFleetShip(0)` zurück nach Lübeck; `finishPoliticalAccord(id)` erstellt genau eine Urkunde.

Vorher/nachher: Tag486001 identisch,10000 Gold identisch, beide Schiffe unverändert in ihren Häfen. Eine Ratsvereinbarung beurkundet, Job entfernt; kein Ankunftsruf. Reguläre intakte Kogge:2 Tage hin+2 zurück, Gebühren6+6=12 Gold ohne Konvoi. Das ist eine native Zeit-/Gebührenrechnung, keine zusätzlich ausgeführte Fahrt. **Die neue politische Rundreise wurde umgangen**, nicht die frühere Flottenpositionierung.

## Vier Orte sind heute keine vier gespeicherten Variablen

`q.city`: Hafen des Schiffs. `s.city`: betrachteter Hafen, zugleich Spiel-/Handlungsort. Ein unabhängig gespeicherter tatsächlicher Aufenthaltsort des Kaufmanns fehlt. Deshalb ist kein historisch rekonstruierbarer „wahrer Spielerort“ nachweisbar. Schiffsauswahl975–978 setzt `s.active` und `s.city` ohne Tage/Kasse; die Meldung nennt ausdrücklich bloße Ansicht. Politische Funktionen benutzen genau dieses Feld als persönliche Präsenz.

[Code453–459](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L453) und [975–978](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L975).

Weitere statisch betroffene Pfade: Annahme örtlicher Dienste425ff, Kandidatur461ff, Siegel472ff, Hansevertrag476–486 und Versammlung488ff. Sie verwenden aktuellen Ort bzw. dortige Belege; zusätzliche Rang-/Leistungsbedingungen bleiben aktiv. Nur Ratsvereinbarung wurde dynamisch geprüft. Kein ganzer Hansevertrag und keine Wahl im Test als erfüllt behauptet.

## Auswirkungen einer Trennung

Handel und Lager müssen weiter örtliche Schiffshäfen prüfen, Flottenfernansicht muss kostenlos möglich bleiben. Rathausanzeige kann fern sichtbar sein, persönliche Aktion braucht später entweder eigenständigen Anwesenheitsnachweis oder ausdrücklich erlaubte Delegation. `s.city` blind überall durch neuen Spielerort ersetzen würde Markt, Karte, Schiffsbuch, Kontor und Migration verändern. Vorhandene Aufträge und politische Heimat sind nicht automatisch der Spielerort. Die künftige Regel wird hier nicht entschieden.
