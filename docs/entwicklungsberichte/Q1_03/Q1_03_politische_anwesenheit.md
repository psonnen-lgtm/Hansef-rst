# Q1.03 – Q-003: Ansicht ist keine persönliche Anwesenheit

29.10.2026 · **Keine Ortsvariable oder Delegation implementiert.** [Gesamtbericht](Q1_03_gesamtbericht.md) · [V13-Übernahme](Q1_03_bestandsschutz_v13.md) · [Testplan](Q1_03_testkonzept.md).

## Bestätigte Ursache

Q1.02-B01 am unveränderten V13: zwei künstlich vorpositionierte Koggen Lübeck/Hamburg, Ratsvereinbarung annehmen, entfernten Schiffshafen auswählen, dort bestätigen, zurückschalten und beurkunden. Eine neue Urkunde bei0 Tagen/0 Gold, beide Schiffe unverändert. Regulärer Koggenweg rechnerisch4 Tage/12 Gold. Die frühere Aufstellung der zweiten Kogge war reale Voraussetzung; kein kostenloser Flottenaufbau bewiesen. [Fester historischer Nachweis](https://github.com/psonnen-lgtm/Hansef-rst/blob/8b20432506940ef1d33bf7af7f162884eec63c01/docs/entwicklungsberichte/Q1_02/Q1_02_politische_ortsbedingung.md). Hier nicht erneut ausgeführt.

`selectFleetShip`975–978 verändert `s.active` und `s.city`, ausdrücklich ohne Fahrt. `witnessPoliticalJob`453–455 und `finishPoliticalAccord`457–459 akzeptieren dieselbe Variable als persönliche Präsenz. Ein historisch wahrer unabhängiger Personenort ist nicht gespeichert. Weder Herkunft der Ladung noch Journalbesuch beweist, dass der Kaufmann selbst mitreiste.

## Empfohlenes Zustandsmodell – keine zweite Welt

| Bedeutung | Bestehende/empfohlene Daten | Wer darf verändern? |
|---|---|---|
| Betrachteter Hafen | `s.city` bleibt View-/Handelskontext | Schiffsauswahl/Karte wie bisher, ohne Tage |
| Schiffshafen | `ships[i].city` | Tatsächlich bestätigte Schiffsreise |
| Politische Heimat | Belegter Altamtsort oder für neue Partie `beginning.city`; versioniert festhalten | Nur ausdrücklich freigegebene einmalige Zuordnung, nicht Ansicht |
| Persönlicher Aufenthaltsort | Vorschlag `politics.presence.city` mit Belegart, Datum, letzter persönlicher Ankunfts-ID | Neuer Start, kontrollierte einmalige Altverankerung, echte mitbegleitete Reise |

Diese Felder liegen vorgeschlagen im bestehenden versionierten Politikblock, keine neue separate politische Karriere. Ein Ortsfeld allein ohne kontrollierte Schreibpfade reicht nicht. Nicht pauschal jedes `s.city` ersetzen: Das Inventar findet107 textuelle Verwendungszeilen, darunter Markt, Lager, Bank, Werft, Karte und Anzeige. Das ist eine Quelleninventur, kein vollständiger AST-/Sicherheitsnachweis.

## Welche Funktionen wie zu trennen sind

| Pfad | Ansicht weiterhin erlaubt | Künftig persönliche Aktionsbedingung |
|---|---|---|
| `selectFleetShip`, Schiffsbuch/Karte | Alle eigenen Schiffshäfen ohne Reisekosten ansehen | Darf nie presence, Heimat oder persönlichen Reisebeleg ändern |
| `trade`, `warehouseTransfer`, Bank-/Werftansichten | Bisherige örtliche Flotten-/Lagerprüfungen erhalten | Kein neuer politischer Präsenzbeweis durch Handel/Umladen; keine pauschale Sperre der Fernwirtschaft |
| Gildenhaus/Beitrittsantrag | Status/Information fern lesbar | Zahlung/Antrag nur persönlich im Ort |
| `acceptPoliticalJob`, persönliche Dienstbestätigung/Rückbericht | Brief und Gründe fern sichtbar | Persönliche Annahme/Vorsprache/Rückbericht nur bei presence=Aktionsort; laufende Altbriefe gesondert behandeln |
| `runMayorElection`, Ratsherr-Antrag | Voraussetzungen/Wahltermin fern lesbar | Gilde/Altzugang, richtige Heimat und persönliche Anwesenheit erneut prüfen |
| `requestPoliticalEndorsement` | Örtliche Belege/Siegel fern lesen | Persönlicher Siegelantrag vor Ort; Gilde ist kein Ortsnachweis |
| Hansevertrag und Versammlung | Fortschritt/Frist fern lesen | Je erforderlicher Station persönlich; Heimatrückbericht am belegten Heimatort |
| `resignMayor`/Amtsprüfung | Amt fern überblicken | Für jede mutierende Amtsentscheidung explizite Präsenz-/Fernregel entscheiden, kein unbeabsichtigtes Schlupfloch |

Siegel/Dienstbelege bleiben örtlich; ein Spieler in Lübeck kann Hamburger Angelegenheiten ansehen, ohne politisch in Hamburg zu sein. Die UI erklärt: „Du betrachtest Hamburg; dein Kaufmann befindet sich in Lübeck.“ Anzeigen sperren nur persönlich erforderliche Aktionen mit Grund, nicht die gesamte Fernansicht. Backend-/Zustandsfunktion prüft denselben Guard nochmals.

## Echte persönliche Reise

Kleinster klarer Vorschlag: Eine als persönliche Reise ausgelöste bestehende Fahrt setzt voraus, dass presence.city mit `pending.from` übereinstimmt und der Kaufmann auf einem tatsächlich mitreisenden örtlichen Schiff mitfährt. Vorbereitung hält Ausgangsort, Schiff-ID, Ziel und Spielrevision fest. Beim Bestätigen erneut prüfen; Gebühren, Tagesfortschritt, Schiffshäfen und persönlicher Zielort gemeinsam committen. Ein Abbruch, eine andere Ansicht oder ein Quota-/Stale-Fehler versetzt den Kaufmann nicht.

Ein fern betrachtetes Schiff kann so nicht zur kostenlosen Personenreise aus seinem Hafen benutzt werden. Die **Fernansicht einschließlich bisheriger Wirtschaftsübersicht bleibt erhalten**. Unbegleitete Fernfahrten, ein neuer Passagiertransport oder Stellvertreter sind damit nicht automatisch freigegeben. Wie bisher aus der Fernansicht initiierte Schiffsfahrten künftig wirtschaftlich behandelt werden sollen, ist eine sichtbar zu entscheidende Verhaltensgrenze; nicht heimlich als neue Delegation einbauen. Der sichere minimale persönliche Pfad würde Abfahrt von einem anderen Ort als presence verweigern. Keine Flotten-Auswahl generell verbieten.

Jeder neue persönliche Beleg referenziert die bestätigte Reise-/Partiekennung und die tatsächliche Ankunft, nicht bloß `journal`, `s.visits`, `s.active` oder `s.city`. Ein am Ziel neu gestarteter Kaufmann darf dort persönlich handeln; er benötigt nicht für jede lokale Handlung eine vorherige Seereise. Für Reiseaufträge gelten die jeweils erforderlichen Stationen/Zeiten. Bewegungsdaten müssen beim Import/Laden validiert werden; keine Ableitung der Person aus dem aktuell ausgewählten Schiff.

## Alter V13-Ort und laufende Verträge: unauflösbare Historie offen lassen

V13 enthält keinen beweisbaren letzten Personenort. Deshalb keine „Rekonstruktion“ aus dem letzten angeklickten Schiff. Empfohlen ist eine **einmalige ausdrücklich bestätigte Altverankerung** im gültigen aktuellen Hafen eines eigenen Schiffs, mit Kennzeichnung `legacy_anchor` und Zeitpunkt. Kein Schiff, Geld oder Tag wird dadurch verschoben; das ist eine transparente Übergangsentscheidung, kein nachträglich behaupteter Reisebeleg. Anschließend kein erneutes Auswählen über Ansichtswechsel/Reload.

Diese Verankerung darf **keine fehlende persönliche Zwischenstation eines bereits laufenden Vertrags neu bestätigen**. Bestehende gültige `witnessed`-/`visited`-Fortschritte und Urkunden bleiben hingegen erhalten. Für noch fehlende persönliche Stationen ist nach Aktivierung eine tatsächliche eigene Ankunft zu verlangen. So kann man nicht einfach einmal den fehlenden Partnerort als Startanker wählen und eine angeblich gereiste Vereinbarung beurkunden.

Daraus entsteht ein echter Übergangskonflikt: Ein alter Brief mit sehr kurzer Restfrist könnte durch die erstmals wirksam werdende Reisepflicht unmöglich werden. Zwei Optionen:

- Exakt bekannte alte Auftrags-IDs bis zum Abschluss nach eingefrorenen alten Regeln weiterführen. Einfach, aber Q-003 bleibt für diese begrenzten Altaufträge bewusst möglich; keine vollständige Fehlerbehebung behaupten.
- **Empfohlen zur Entscheidung:** neue persönliche Nachweise auch für fehlende Altstationen, bestehende Fortschritte bewahren und falls nötig eine einmalige ausdrücklich ausgewiesene Fristschonung nur für diese IDs gewähren. Keine neue Aufgabe/Prämie/Quote erzeugen, keine globalen Fristen zurücksetzen. Umfang der Schonung anhand nötiger regulärer Strecke und Restfrist festlegen; konkreter Puffer nicht beschlossen.

Ohne Entscheidung zu dieser Altfallbehandlung ist die Umsetzung blockiert. Hier keine Frist geändert, keine Migration ausgeführt. Veraltete Originalexporte bleiben als eigene historische Zeitlinie erhalten; ein rein lokales Offline-Spiel bietet keinen serverweiten Schutz gegen vollständiges Zurücksetzen der gesamten Partie.

## Sicherheitsgrenze

Q-003 wird für neue Regeln zuverlässig adressiert, wenn **alle** persönlichen Aktionspfade und **alle** Ortsänderungen dieselbe Anwesenheits-/Transaktionsregel verwenden. Ein zusätzliches Feld plus nur ein reparierter Button genügt nicht. Diese Architektur ist begründet, aber noch nicht implementiert oder dynamisch bewiesen. Keine Delegationsfunktion, kein Personentransportmenü, keine neue Reisezeitregel.
