# Q1.10b – Politische Ortsregeln und einmalige Belege

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Ausdrücklich geänderte Voraussetzung

Q-003 „persönliche Anwesenheit“ ist durch den Nutzerbeschluss ersetzt: Eigenes Schiff im betreffenden Hafen und passende Stadtansicht. Dies gilt für Ratsbriefe, Vorsprachen, Vertragsabschlüsse, Stadtsiegel, Kandidaturen, Hanseversammlung und aktive Bürgermeisterhandlungen einschließlich Amtsniederlegung/-prüfung. Die reguläre automatische Amtszeitbeendigung bleibt eine globale Zeitfolge.

Ein historischer persönlicher Ort an anderer Stelle oder `unknown` blockiert nicht mehr. Ein Ansichtswechsel ohne eigenes Schiff wird weiterhin abgewiesen. Fachliche Bedingungen (Vermögen, Ansehen, Warenherkunft, Dienstzahl, Zeitabschnitte, Fürsprecher, Handelsräume, Fristen) bleiben unverändert.

## Keine automatische politische Ankunftsleistung

Eine Reise erhöht weder `s.visits` noch `s.rep` und verändert keine historischen Personenfelder. Reise-Testereignisse tragen `mode: fleet` und `personalArrival: false`. Vorhandene persönliche Besuchsnachweise und bereits bestätigte Vertragsstationen bleiben bestehen.

Auch mehrere Schiffe im Hafen bewirken keine automatische Vorsprache. Bestätigung und Abschluss sind weiterhin bewusste Aktionen. Bestehende Auftrags-IDs, `witnessed`, besuchte Städte, Perioden und eindeutige Leistungsbelege verhindern Wiederholungen. Diese bestehenden Regeln werden nicht durch einen neuen Belohnungsmechanismus ersetzt.

## Gezielte Nachweise

- Gruppe 48: Zwei stationierte Schiffe, ausdrückliche Ratsbestätigung im Partnerhafen und Abschluss im Ausgangshafen; genau ein Beleg, kein neues Gold/Ansehen, kein erneutes Angebot im selben Abschnitt. Die bloße Schiffsauswahl bestätigt nichts.
- Gruppe 49: Historisches Bürgermeisteramt/Personenort und vorhandener Ratsvertrag bleiben erhalten. Eine lokale Vertragsstation funktioniert ohne persönliche Anreise. Amtsniederlegung aus der falschen Ansicht wird abgewiesen; der erworbene Titel bleibt nach zulässiger Niederlegung bestehen.
- Gruppe 53: Ohne Vermögen/Rang/Dienste kein Aufstieg trotz Schiff. Mit synthetisch gültigen sechs Diensten in drei Abschnitten besteht eine Kandidatur; zwei Schiffe erzeugen genau eine Ernennung und keine zusätzliche Gold-/Ansehensgutschrift. Wiederholung und Fernanträge werden abgewiesen.
- Gruppe 54: Hansevertrag über drei Hafenstandorte und zwei Handelsräume; jede Fürsprecherbestätigung ausdrücklich, keine doppelte Station, genau ein Vertragsbeleg und keine automatische Prämie.
- Gruppe 57: Eigene/unklare Warenherkunft erfüllt weder Lieferprämie noch politische Versorgung; belegte Fremdware erfüllt beide einmalig. Umladen bleibt ohne Leistung.

Alle Ergebnisse stehen in den [Rohdaten](../../../tests/features/q1_10b/results/native-release.json). Das belegt diese kontrollierten Fälle, keine mathematische Ausschließbarkeit jedes denkbaren Exploits.

## Weiter offen

Der globale Ansehenspfad aus neutralen Handelskreisen bleibt ausdrücklich offen; Gruppe 27 reproduziert ihn weiterhin. Q1.10b führt kein Modell C, keine neue Karriere und keine Kaufmannsgilde ein. Neue langfristige Karrieregeschwindigkeit unter stationierter Flotte wurde nicht simuliert.
