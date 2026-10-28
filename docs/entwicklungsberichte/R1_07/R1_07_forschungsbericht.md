# R1.07 - Handelskarte, regulärer Spielstart und erste Handelsmessungen

28.10.2026. Forschungsbasis `4b4722f32657c53408cf4f1e3e19963e678d66c4`, eigener Branch `research/r1-07-trade-map`. R1.05/R1.06 bleiben erhalten. Keine Hansefürst-Code-, Pages- oder Spielstandänderung, keine Hansefürst-Simulation. Ziel langfristig ungefähr 90 aktive Stunden bis Eldermann ist als neue Projektvorgabe übernommen; diese kurze Originalprobe validiert keine reale Spieldauer. Keine Folgephase begonnen.

## Ergebnis

Passende historische Handelskarte heruntergeladen, entpackt und bildlich geprüft. Unveränderte deutsche DOS-Fassung hat die regulären Antworten Aalborg und beim Laden Reval akzeptiert. Werft, Hafen und Lübecker Stadtfunktionen sind erreichbar. Speichern und Laden wurden tatsächlich geprüft. Ein örtlicher Getreidekauf und -verkauf sowie zwei Hafentage wurden beobachtet. **Keine abgeschlossene Schiffsreise**, weil die Abfahrtsprüfung abweist und die Anwerbung wiederholt keine Mannschaft liefert.

## Karte und Kompatibilität

Quelle: [Old-Games-Angebot](https://www.old-games.ru/game/download/2331.html), Dokumentationseintrag fileid 18221, angeboten als JPG-Karte für die Wappenabfrage, Herkunft laut Anbieter hol.abime.net. Der Webleser erhielt am get.php-Link 403. Ein normaler curl-Abruf desselben Links lieferte die Downloadseite mit regulärem US-Mirror-Link auf Patrician_Map_JPG.rar. Archiv tatsächlich heruntergeladen, nicht nur Suchtreffer gelesen. Kein CAPTCHA umgangen. Eine parallel geprüfte HOL-Alternative erbrachte keine verwendete Karte; nach erfolgreichem Hauptdownload keine weitere Quellensuche nötig.

Libarchive meldete fehlende Unterstützung für Solid-RAR; Ubuntu-7zip konnte die Methode ebenfalls nicht entpacken. Gelöst mit unrar-nonfree aus Ubuntu noble/multiverse, Paket 1:7.0.7-1build1, lokal entpackt; UNRAR meldete alle Dateien OK. Keine fremden Archivprogramme aus dem Kartenpaket ausgeführt. Enthalten: old-games.nfo, Patrician_map_big.jpg und Patrician_map_med_hq.jpg. Große Karte 3459×2434 Pixel. Hashes und Dateigrößen in JSON, Bilddaten ausschließlich privat.

Die Karte trägt einen englischen Spieltitel; der Katalog nennt 1993, unsere bereitgestellten Dateien 1992. Keine vollständige Editionsidentität behauptet. Tatsächliche Kompatibilität: Das erste Wappen wurde zunächst fälschlich für Riga gehalten und entsprechend abgewiesen. Vergrößerter Vergleich zeigte Aalborg (Türme/Himmelszeichen/Wasserlinien); diese Korrektur wurde mit positiver Rückmeldung akzeptiert. Beim Laden wurde das weitere Wappen anhand der Karte als Reval identifiziert und sofort akzeptiert. Es gab keine Programmänderung, keine Antwortlisten-/Codeextraktion und kein blindes Durchprobieren. Nicht alle Kartenwappen sind geprüft.

## Ausgangszustand und Save/Load

Testfigur hanse test, Heimat Lübeck, normales statt schnelles Spiel. Schiffstaufe Albatross. Erster dokumentierter Kalender 29. Brachet 1355; Schiffskasse vor Handel 83 Taler, freier Laderaum 28. Das gesamte Startvermögen einschließlich Kontor ist nicht erfasst. Der vorgesehene Kraier des normalen Starts wurde nicht zusätzlich über eine Typanzeige bestätigt; keine numerischen Geschwindigkeiten daraus abgeleitet.

Schiffsbuch: vier Mann vorhanden, fünf benötigt. Der Startspielstand wurde **nach dem ersten Kauf**, vor Kredit und Hafenwarten angelegt: SPIELE.SAV/SPIEL.PSD, 28048 Bytes. Die erste Speicherung wurde versehentlich mit halt abgebrochen; die erfolgreiche spätere Bestätigung war weiter. Nicht als zwei erfolgreiche Saves gezählt. Private Kopie start-after-one-buy.PSD gesichert.

Verifikation: Spiel über Optionen verlassen, weiteres Spiel gewählt, Laden im Hauptmenü, SPIEL gewählt. Erneute Kartenabfrage regulär beantwortet. Danach 29. Brachet, Stadtbestand Getreide 1170, Schiffbestand 1 und Kasse 15 wieder beobachtet. Das bestätigt diesen Spielzustand, keine vollständige Bitidentität jedes internen Feldes. Der abschließende erneute Speicherversuch wurde nicht erfolgreich bestätigt: Die zunächst als Schlusskopie gelesene Datei war bytegleich mit dem Startsave. Sie wird deshalb nicht als Finalspielstand ausgeliefert. Die Schlussmessung ist durch private Bildschirmbelege gesichert.

## Messungen

| Zustand | Spieltag | Modus | Getreide Stadt | Schiff | Preis | Schiffskasse |
|---|---|---|---:|---:|---:|---:|
| vor Kauf | 29. Brachet 1355 | Kauf | 1171 | 0 | 68 | 83 |
| nach Kauf 1 | 29. Brachet 1355 | Kauf | 1170 | 1 | 68 | 15 |
| nach Laden | 29. Brachet 1355 | Verkauf | 1170 | 1 | 47 | 15 |
| nach Kredit 100 und 1 Hafentag | 30. Brachet 1355 | Verkauf | 1170 | 1 | 47 | 115 |
| nach weiterem Hafentag | 1. Heuet 1355 | Verkauf | 1170 | 1 | 47 | 115 |
| nach Verkauf 1 | 1. Heuet 1355 | Verkauf | 1171 | 0 | 47 | 162 |

CSV ergänzt Beobachtungszeitstempel Europe/Berlin und Hash des privaten Bildschirmbelegs. Zeitstempel beziehen sich auf die Sicherung des Screenshots, nicht sekundengenau auf den Klick. Preisangaben sind sichtbare Preise pro eingegebener Handelseinheit; keine ungeprüfte Umrechnung in Fass/Tonnen/Last. Die Kassenänderung bestätigt Kaufkosten 68 und Verkaufserlös 47. Realisierter lokaler Warenverlust **21 Taler**. Kredit 100 ist Finanzierung, kein Gewinn. 83 + 100 - 68 + 47 = 162. Das ist eine Schiffskassenprüfung, keine vollständige Kontor-, Steuer-, Zins- oder Gesamtvermögensbilanz.

Kaufpreis und Verkaufspreis dürfen nicht als zeitliche Preisänderung verglichen werden. Auch die Zeit zwischen Speichern und Laden beweist keine Marktaktualisierung. Über zwei reine Hafentage blieb Getreide konstant; andere Bestände änderten sich beim ersten Hafentag: Fleisch 194→197, Fisch 87→90, Bier 276→273, Honig 35→38, Tuch 242→245, Geschirr 315→318, Holz 792→795, Wein 173→158. Das zeigt Bestandsaktualisierungen, beweist weder tägliche Verbrauchs-/Produktionsformeln noch deren Ursache. Am zweiten beobachteten Hafentag waren die genannten sichtbaren Werte unverändert.

## Reiseversuch und Ereignisbezugsgröße

Klick auf die Kontorkarte führte bereits vor Auswahl eines Zielhafens zur abgewiesenen Auslaufprüfung mit Kontor/heuern als Rückwegen. Es wurde deshalb **keine bestätigte Route nach Rostock gestartet**. Vier Mann bei benötigten fünf sind unmittelbar beobachtet; die vollständige Liste aller Sperrbedingungen wurde nicht rekonstruiert. Kneipen-Anwerbung lieferte am 29./30. Brachet und 1. Heuet keine Mannschaft. Ein Kredit erhöhte die Kasse von 15 auf 115, ohne die Meldung aufzuheben; Bargeld allein erklärt sie nicht. Keine unbelegte Aussage über ein monatliches Personalangebot.

Zwei explizite eintägige Hafenwarteaktionen führten 29.→30. Brachet→1. Heuet. Die Chronik formuliert auch nach Hafenwarten eine Ankunft in Lübeck. Das darf nicht als Seereise gezählt werden. Abgeschlossene Reisen: **0**. Deshalb Reiseereignisse/ereignisfreie Reisen nicht als 0/0-Rate interpretieren: beide Reisegruppen haben Umfang null, eine Häufigkeit ist nicht definiert. Keine ungewöhnlichen Spielereignisse während der kurzen Hafenprobe beobachtet; Kredit-/Personal-/Speicherdialoge sind keine zufälligen Reiseereignisse. Reise-CSV enthält nur Kopfzeile, keine erfundenen Reisetage, Rostocker Preise oder Fahrtkosten.

## Bedienanalyse

Details: R1_07_bedienwege.csv. Klickzahlen zählen den erfolgreichen Weg aus dem Hafen ohne Suchklicks, Mausbewegungen oder Texteingabe; Abweichungen sind ausdrücklich markiert. Keine gemessenen Bedienzeiten. In dieser Umgebung näherungsweise SDL-X=halbe Screenshot-X, SDL-Y=Screenshot-Y; vor jeder Aktion Bildschirm geprüft.

- Kontor per unterer Kontortür (1 Klick); Markt, kleines Buch oder Optionen je ein weiterer Klick. Markt zeigt Stadt-/Schiffsvorrat, Modus/Preis, Abakus, Ladekapazität und Kasse. Ware wählen, Zahl eingeben, Return handelt tatsächlich. Escape schließt die Bücher.
- Federn öffnen Optionen. Speichern benötigt vom Hafen fünf Klicks einschließlich Dateidialog und weiter. Laden vom Hauptmenü drei Klicks plus Kartenantwort und Zugbestätigung. Unterdialoge sind nicht immer mit Escape schließbar: Personal-/Speicherbestätigungen verlangen eine Antwort.
- Bank im Obergeschoss des Mittelhauses (1 Klick). Nehmen zeigt Partnerliste mit Handwerker und Kaufleuten; Auswahl des Handwerkers zeigt maximal 250 Taler, 24 Prozent und 324 Tage. Tatsächlich 100 aufgenommen; 15→115 in Schiffsbuch bestätigt. Keine Aussage über effektiven Jahreszins oder bereits gezahlte Zinsen.
- Hafenkneipe im unteren Mittelhaus (1 Klick). Personalhotspot bei den Figuren vor dem Kamin; Meldung ohne Anwerbung. Andere Suchklicks in der Kneipe hatten keine bestätigte Wirkung und werden nicht als eigene Mechaniken ausgegeben.
- Marktplatz über Gasse rechts vom Mittelhaus (1 Klick), Rathaus über mittlere Tür (2), Wahltafel als dritter Klick: Ratswahl 19. Scheiding 1356, Auktion 24. Nebelung 1356. Keine Wahl, Kandidatur oder Bürgermeisterrechte getestet.
- Badehaus über linkes Gebäude am Platz (2 Klicks). Badestube tatsächlich gesehen; Klick auf mittlere Figur führte zum Marktplatz zurück. Keine Bestechung, Kosten- oder Rufänderung nachgewiesen.
- Kirche und Gilde äußerlich gesehen, ihre inneren Funktionen nicht untersucht. Werft nach Schiffstaufe gesehen; Reparatur/Inspektion nicht ausgeführt. Hafenwarten über vorderen Schiffsrumpf: ein weiterer Klick auf warten bestätigt den vorgeschlagenen Folgetag.

## Sicherung, Prüfung und Grenzen

DOSBox 0.74-3 und Konfiguration aus R1.06 unverändert weiterverwendet. Helfer nicht nochmals verändert; keine unnötige Neuinstallation. Ergänzt wurden Archivwerkzeuge, keine DOS-Spielpatches. PATR.EXE, PATRIZ.EXE und SCHLACHT.EXE am Schluss bytegleich mit den unverändert entpackten Originalarchiven geprüft. Karte, Screenshots und der bestätigte Startspielstand ausschließlich privat gesichert; kein geschützter Bild-/Programm-/Spielstandinhalt im öffentlichen Git-Baum. Öffentlich nur Bericht, CSV, Metadaten und eigene Konfiguration.

Hansefürst-Regeln und Simulator nicht geändert; frühere 1500er-Ergebnisse nur Hintergrund, keine Neuberechnung und keine neue Freigabe. Nicht getestet: Rostock, abgeschlossene Reise, Reisegeschwindigkeit, Reiseereignisse, vollständiges Startvermögen, Schiffsunterhalt und langfristige Karriere. Save/Load ist nur für den einen genannten Zustand bestätigt.

## Erkenntnisse für Hansefürst

Bestände, sichtbarer Kauf-/Verkaufsspread und Finanzierungsbedarf können schon mit kleinen Beträgen echte Entscheidungen erzeugen. Allerdings kann fehlendes Personal vor der ersten Reise den Handlungsfluss blockieren. Für Hansefürst sollten nötige Abfahrtsvoraussetzungen und Beschaffungswege verständlich sein; die Originalprobe rechtfertigt keine automatische Übernahme solcher Engpässe oder der beobachteten Kreditkonditionen. Die Stadtfunktionen sind räumlich eingebettet, einzelne Trefferflächen und Modalantworten erfordern jedoch Suche; Touch-Bedienbarkeit bleibt ein eigenes Designziel.

Ein begrenzter künftiger Auftrag könnte ausschließlich die fehlende Mannschaft aus diesem gesicherten Zustand beschaffen und anschließend Lübeck–Rostock–Lübeck messen. R1.08 wurde nicht gestartet; R1.07 endet mit dem vorliegenden Befund.
