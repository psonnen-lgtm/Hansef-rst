# Lübeck – eigenständige Stadtszene 0.7a

`luebeck-1350.png` ist eine neue, für Hansefürst erzeugte Pixelillustration. `cog.png` ist ein eigens dazu erzeugtes Frachtschiff mit transparentem Hintergrund. Keine Originalgrafiken anderer Spiele übernommen. Die bisherigen Projektgrafiken und Innenräume bleiben erhalten. Erstellung: Bildgenerierung am 25.10.2026; Stadtszene `exec-b6bf7a78-304d-4f85-ba08-928dfdfcc278.png`, Schiff `exec-26cce437-8fa1-4ab9-8226-8bafaa7c5239.png`. Die erzeugten Originaldateien wurden unverändert kopiert.

Gestaltungsauftrag: Lübeck um 1350, erhöhte Dreiviertelansicht, zusammenhängender Rathausmarkt, Backsteingotik mit Marienkirche, Bankhaus, Kontor, Badehof, Kai mit Speichern und Werft. Warme Ziegel-/Holz-/Pergamentfarben, gedämpftes Tealwasser, einheitlicher Lichteinfall; kein Holstentor und keine Beschriftungen im Bild. Offene Wege und Wasser für separat animierte Figuren und Boote. Schiff mit passender Perspektive/Palette und vollständiger Transparenz. Die Grafik ist generiert, keine behauptete handgezeichnete historische Spielgrafik oder exakte Rekonstruktion des mittelalterlichen Stadtplans.

Renderer/CSS liegen eine Ebene höher. Logische Bühne 960×640, große native Eingänge in Weltkoordinaten, unabhängige dekorative Uhr, eigene einfache Pixelsprites. Andere Städte erhalten keine Kopie dieses Stadtplans. Spätere eigene Grafiken benötigen eigene Eingänge, Laufwege und Dekorationen; Uhr, Pausen, Eingabeverhalten und Spritebausteine sind wiederverwendbar.

`python tools/encode-city-art.py` erstellt ausschließlich verlustfreie WebP-Transportkopien. Sämtliche dekodierten RGBA-Bytes werden mit den unveränderten PNG-Originalen verglichen; Nachweis in `encoding.json`. Keine Verkleinerung, Umfärbung oder sonstige Bildänderung.

`python tools/embed-city-life.py` bettet die kleineren WebP-Grafikbytes, CSS und JS in die weiter allein nutzbare `Hansefuerst_0_4.html` ein. Bilder liegen in einem inerten HTML-Template außerhalb des Spielskripts; die bestehenden Headless-Tests müssen die Grafikdaten nicht ausführen. Keine externen Grafik-Downloads beim Spielen. Nach Änderungen erneut einbetten und die Gleichheit prüfen.

Visuelle Grenzen ausdrücklich im Entwicklungsbericht bewerten: generierte Pixeltextur, unabhängige kleine Figuren, schematischer statt vermessener Stadtgrundriss, statische Darstellung eines Stadtausschnitts. Dekorative Boote sind keine zusätzlichen Schiffe im Spielstand.
