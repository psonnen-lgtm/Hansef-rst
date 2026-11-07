# Q1.10b – Hafenanwesenheit und Schiffsreisen

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Entscheidungsregel

`fleetShipAt(q, city)` verlangt ein vorhandenes eigenes Schiff, einen gültigen Hafenindex, exakt diesen Schiffsstandort und keine laufende Fahrt dieser Schiffs-ID. `fleetAt(city)` verlangt mindestens ein solches Schiff. `fleetLocalRequired(city)` verlangt zusätzlich, dass dieser Hafen tatsächlich betrachtet wird. Der alte Personenort wird dabei nicht gelesen.

Die Schranke läuft innerhalb `safetyRun` nach Partien-/Revisionsprüfung und Web Lock, auch bei verschachtelten Aufrufen. Nicht nur deaktivierte Knöpfe, sondern die direkten Aktionsfunktionen werden geschützt. Markt, Bank, Kontor/Lager, Werft/Hafenmeister, Rathaus, Kirche, Badehaus und Lieferauftragsausgabe benutzen diese Grenze. Informanten, Archivkäufe und Handelsbriefkäufe sind eingeschlossen. Überlieferte Aufzeichnungen, Karte und Spielstandverwaltung bleiben global zugänglich; neue Hafennachrichten werden fern nicht erzeugt.

Handel, Umladen, Reparatur, Bewaffnung und Reisevorbereitung brauchen weiterhin das konkret ausgewählte eigene Schiff vor Ort. Ein zusätzliches örtliches Schiff autorisiert keinen Zugriff auf ein gerade fahrendes Schiff. Materialquellen des Schiffbaus schließen fahrende Schiffe ebenfalls aus. Ein Bauauftrag ist noch kein Schiff; automatische Fertigstellung bleibt eine bestehende globale Zeitfolge.

## Reiseablauf

Vorbereitung wählt örtliches Einzelschiff oder örtlichen Konvoi, Ziel, bisherige Dauer und Gebühren. Noch keine Abfahrt, keine Risikowürfe. Erst „Weitersegeln“ führt die synchrone Fahrt in derselben geschützten, atomaren Schreibaktion durch. Während der Tagesfortschreibung sind die Teilnehmer aus Hafenanwesenheit ausgeschlossen. Nach tatsächlicher Ankunft gelten ihre neuen Häfen. Es werden keine neuen dauerhaften Felder angelegt.

V13 bildet keine zwischen zwei Speicherungen fortdauernde Seereise ab. Es gibt deshalb keinen getrennten speicherbaren Zustand „auf See“ und keine gleichzeitig laufende Hintergrundfahrt. Die neue flüchtige Reisemenge wird auch bei Fehlern im `finally` zurückgesetzt. Andere tatsächlich liegende Schiffe können weiterhin eine Hafenanwesenheit begründen.

Gebühren je Schiff bleiben 4/6/9 Gold, Tempo und Schadenseinfluss sowie Binnenumschlag bleiben unverändert. Piratenabwehr, Ladungsverlust, Sturm und Zufallsreihenfolge bleiben erhalten. Ein fehlgeschlagener Speicher-Commit hält das bereits gewürfelte Ereignis in der vorhandenen privaten Retry-Vorbereitung fest: gleicher Auftrag, kein neuer Risikowurf. Partien-ID, Auswahlgeneration und Revision verhindern eine Ankunft in einer inzwischen gewechselten Partie.

## Nachweise

[Native Gruppen 41–57](../../../tests/features/q1_10b/results/native-release.json) prüfen Fernansichten, zwei Häfen, konkrete Schiffsauswahl, Fahrtzustand, beschädigten Konvoi, vier direkte Alt-/Neu-Reisevergleiche, Fehler-Retry und Touch-UI. Ein beschädigter örtlicher Konvoi zahlt im Test 10 Gold; beide Teilnehmer verlieren beim kontrollierten Sturm je vier Zustandspunkte, das dritte Schiff im anderen Hafen bleibt unverändert. Erneuter Ankunftsaufruf erzeugt keine zweite Buchung. Laden nach der Reise stellt den Zielhafen wieder her.

Bildschirmprüfungen: 375×812, 812×375, 820×1180 und 1280×900. Reiseauswahl ohne Mitreise-Schalter, Teilnehmer, Ziel, Dauer und Kosten sichtbar beziehungsweise per bestehendem Dialogscroll erreichbar. Keine umfassende grafische Neugestaltung und keine echte Apple-Abnahme.
