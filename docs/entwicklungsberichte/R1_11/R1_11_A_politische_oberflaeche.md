# R1.11 – Sicherungspunkt A: erreichbare politische Oberfläche

28.10.2026. Basis `b71d467fd5437565fea8fa43ac2ea8c5b25d470b`, eigener Branch `research/r1-11-politics-society`. Remote geprüft: R1.10 abgeschlossen, vorher kein R1.11-Zweig. Entwicklungsbranch weiterhin `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Codeblob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`. Nur statisch gelesen, kein Produktstart/Simulationstest.

Vorhandener Save R110A regulär geladen, historische Karte korrekt als Aalborg beantwortet. Lübeck4.Heuet1355, Albatross,5 Matrosen,248 Taler. Originaldatei unverändert; SHA-256 `e43a37fbab4438d997a9dfc1e11b77b7372977ed2b9773587bf4d0e1b4999e59`. Vorher einmal versehentlich leere Neuspiel-Namensmaske geöffnet: keine Figur angelegt, Sitzung beendet/neugestartet. Danach Hauptmenü sichtbar geprüft statt blind weiterzuklicken. DOSBox0.74-3/R1.06-Konfiguration weiterverwendet, keine Schutz- oder Programmänderung.

## Direkt im Originalspiel beobachtet

- Rathaus aus Hafen über Marktplatz und mittleren Torbogen:2 Öffnungsklicks. Halle mit drei Türen und zwei Tafeln.
- Vordere Tafel als3.Klick: nächste **Ratswahl am19.Scheiding1356**, Versteigerung24.Nebelung1356. Das ist die sichtbare Bezeichnung; nicht als bereits erlebte Bürgermeisterwahl oder Hansetag ausgeben. Keine Kandidaten, Stimmzahlen oder Wahlergebnisse beobachtet.
- Wehrwesen-/Flottentür angeklickt: kein neues Fenster, keine ausdrückliche Sperrmeldung. **Durch Originaldokumentation belegt:** diese Funktionen sind Bürgermeisterrechte. Die Quellenregel ergänzt die Beobachtung, ersetzt keine getestete Freischaltung.
- Umzugstür öffnet Ja/Nein-Frage. Nein gewählt; keine Heimatverlegung und keine gemessene Umzugsgebühr.
- Hintere Tafel: **Auslieger vor Lübeck gesucht**. Folgefrage, ob das aktuelle Schiff Auslieger werden soll; Nein gewählt. Keine Abwehraktion oder politische Belohnung ausgeführt. Escape allein schloss die Folgefrage nicht zuverlässig; explizite Antwort nötig.
- Personengruppe links neben Kirche:2 Klicks vom Hafen; sichtbare Aussagen **„In der Gunst des Volkes sind Sie nicht vorhanden“** und **„In der Politik sind Sie nicht vertreten!“**. Keine numerischen Rufpunkte.
- Kein erreichter Hansetag, kein geöffnetes Kandidaturfenster, keine tatsächliche Wahl. Weitere Voraussetzungen noch ungeprüft.

Zum Abschluss wieder Schiffsbuch geöffnet:4.Heuet,248 Taler,5 Matrosen. Diese reine Menüprobe veränderte die abgelesene Kasse und den Spieltag nicht. Spieljahre wurden nicht vorgespult. Kein alter Versuch als neu gezählt.

## Nachweise und Bedienung

[Menü-CSV](R1_11_A_politische_menues.csv) und [JSON](R1_11_A_beobachtungen.json) enthalten Wege, Klickzahlen, Rückwege, verfügbare/ungeöffnete Funktionen und private Bildhashes. Gezählt sind erfolgreiche Öffnungsklicks ab Hafen ohne Suchversuche, Mausbewegung oder Schließen. Keine menschlichen Bedienzeiten gemessen. In dieser Surface-Ausgabe SDL-X ungefähr halbe Bildschirm-X, Y gleich; Rathaus171/315, Wahltafel33/265, Wehr115/280, Flotte201/280, Umzug287/280, Auslieger58/250, Volksmeinung212/390. Keine allgemeingültigen Koordinaten behauptet.

Private Originalscreenshots/Spielstände bleiben außerhalb Git. Ein fehlgeleiteter Volksmeinungs-Screenshot zeigte stattdessen die Ausliegerbestätigung; als ungültiger Pfadversuch aufbewahrt und nicht als Rufmessung verwendet. Alte R1.07-Anzeigen werden nicht ungeprüft übernommen; frühere Besatzungsfehlablesung wurde bereits in R1.08 korrigiert.

Quellenprüfung läuft getrennt weiter: bereitgestelltes Originalhandbuch, PDF66–71 (gedruckte Kapitel4.6 ff.), online Originalhilfe. Rohseiten/OCR privat, keine Originalabbildungen veröffentlicht. Kein Rückschluss auf Wahlformeln allein aus Handbuchtexten.

Etappe A beendet und vor weiteren Experimenten auf Git Hub gesichert. Nächste genehmigte Etappe B: Quellen-/Karriereanalyse, ohne eine Langzeitpartie oder Wahl zu erzwingen. Kein Spielcode, produktiver Save, Pages oder Simulator geändert; kein Merge.
