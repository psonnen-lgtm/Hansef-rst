# Grafikstand Version 0.4

12 KI-generierte, für das Spiel komprimierte WebP-Grafiken sind direkt in Hansefuerst_0_4.html eingebettet. Kein externer Bildabruf, keine Änderung am Spielstandformat.

## Zuordnung
- Lübeck: bisheriger freigegebener Entwurf.
- Hamburg: Elbhafen, Fachwerkspeicher, Kräne, breiter Fluss.
- Rostock: Warnowhafen, Backsteingiebel, Fischhandel.
- Stralsund: Backsteingotik und türkisfarbenes Hafenwasser.
- Stettin: Oderufer, bewaldete Hügel und Burg.
- Markt, Badehaus, Kirche, Rathaus, Bank, Kontor, Werft: je eine eigene Gebäudeansicht.
- Nebenmenüs nutzen passende Motive: Aufträge/Markt, Schiffe/Werft, Bücher/Kontor, Gerüchte/Badehaus; Ankunft zeigt den Zielhafen. Die Seekarte bleibt als lokal gezeichnete Karte erhalten.

Gebäudeansichten werden in allen Städten gemeinsam genutzt. Stadtpanoramen unterscheiden sich. Die Motive sind atmosphärische Interpretationen, keine historischen Rekonstruktionen.

## Bedienung und Ausfallsicherheit
Gebäudeschaltflächen unter dem Panorama mit mindestens 44 Pixel Höhe. Keine interaktiven Texte in Bildern. Bilder haben Alternativtexte. Alle bisherigen Aktionen bleiben erhalten. Bei Bildfehlern steht die frühere Canvas-Stadtansicht als Rückfall bereit. Bilder sind in der heruntergeladenen HTML-Datei auch offline verfügbar.

## Erzeugung / Promptset
Erzeugt mit dem eingebauten Bildgenerator. Gemeinsame Vorgaben: original historical-scene game background, Hanse circa 1350, wide 2:1, nostalgic early 1990s VGA pixel art, visible pixel clusters, warm brick/ochre timber and muted teal palette, readable silhouettes, no UI/text/borders/modern objects.
Stadtprompts ergänzten die oben genannten Hafenmerkmale sowie Koggen, kleine Hafenarbeiter und eine erhöhte Sicht vom Wasser.
Raumprompts:
- Markt: covered trading hall, scales, grain sacks, beer barrels, folded cloth, fish and salt.
- Badehaus: wooden bathing tubs, linen-covered adult merchants chatting, steam and brick stove, no nudity.
- Kirche: brick gothic vaulted nave, benches, candle stand, alms chest.
- Rathaus: oak council table, councillors, parchment, gothic windows and modest banners.
- Bank: banker, coins, balance scales, iron-bound chest and ledger.
- Kontor: modest merchant office overlooking harbour, desk, quill, ledger, charts and crates.
- Werft: shipwright, cog under repair, timber ribs, hand tools, ropes, forge and tar barrels.

## Prüfung
19 bestehende automatisierte Logiktests bestehen nach Einbau weiterhin. Alle zwölf WebP-Dateien wurden erzeugt und in die HTML-Datei eingebettet. Browserlayout und echte Safari-/Geräteprüfung weiterhin offen (Testbrowserdownload zuletzt fehlgeschlagen).
