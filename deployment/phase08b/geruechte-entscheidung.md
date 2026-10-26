# Badehaus: drei Varianten zur Entscheidung – nicht implementiert

Grundlage sind die gesicherten statischen Reisedauern aus Phase 0.8a, keine neue Simulation. Der aktuelle Code bleibt unverändert: seltene Sondertipps 3–6 Tage, normale/falsche Hinweise 6–12 Tage. Auf der unbeschädigten Kogge sind nur 28 von 110 gerichteten Stadtpaaren binnen höchstens sechs Tagen erreichbar. Das ist keine Zielwahrscheinlichkeit oder Gewinnquote. Tagesmärkte und Transportkosten bleiben zusätzlich unsicher.

## 1. Empfohlen: Frist nach öffentlicher Referenzreise

Konkreter Vorschlag: Die bestehende zufällige 3–6-Tage-Frist weiter ziehen und dann mindestens die bekannte direkte Reisezeit mit unbeschädigter Kogge plus **drei Spieltage Reserve** gewähren: `max(bisherige Frist, Referenzreise + 3)`. Keine Wahl der besten Route oder des besten Marktpreises; Ziel/Ware bleiben nach bisherigem Verfahren bestimmt. Eine absichtlich langsame/beschädigte aktive Flotte verlängert den Hinweis dadurch nicht. Keine Garantie für Gewinn oder denselben Preis bei Ankunft.

**Vorteile:** Auch entfernte Startstädte bekommen nutzbare Chancen; nachvollziehbarer Bezug zur vorhandenen Seekarte; kein neuer Aufgabentyp oder dauerhafter Speicherbereich nötig. Der vorhandene Zufallszug für die Frist kann erhalten bleiben.

**Nachteile:** Lange Sonderfenster verändern wirtschaftliche Chancen. Spieler könnten länger von demselben Marktimpuls profitieren; Tagesmärkte verändern den Preis ohnehin. Vor Freigabe konkrete Frist-/Ablauf-/Wiederholungs-/Mehrfachhinweisfälle prüfen, ohne Gewinn zu versprechen. Keine solche Änderung oder neue Wirtschaftsserie in 0.8b.

Beispiele aus den vorhandenen zehn Zielwegen je Starthafen, unbeschädigte Kogge, sofortige Abfahrt. Letzte Spalte ist ausschließlich der vorgeschlagene Mindestwert, **nicht aktiv**:

| Start | Bestehende direkte Reisezeiten | Vorgeschlagene Mindestfristen |
|---|---:|---:|
| Bergen | 10–33 Tage | 13–36 Tage |
| Nowgorod | 15–35 Tage | 18–38 Tage |
| Brügge | 7–31 Tage | 10–34 Tage |
| Venlo | 7–35 Tage | 10–38 Tage |

## 2. Einfacher, aber gröber: einheitlich 45 Tage

Jeder seltene Tipp erhält 45 Spieltage, unabhängig von Ort oder Flotte.

**Vorteile:** Sehr leicht verständlich, deckt die vorhandenen unbeschädigten Koggenwege samt Reserve ab; Bergen, Nowgorod, Brügge und Venlo werden nicht ausgeschlossen.

**Nachteile:** Kurze Kernrouten bekommen viel zu große Fenster; stärkt wiederholte Verkäufe und kann den außergewöhnlichen Charakter schwächen. Wirtschaftlich deutlich stärkere pauschale Ausweitung als Variante 1. Die bisherige Zufallsstreuung der Frist entfällt oder müsste zusätzlich neu entschieden werden. Nicht bevorzugt.

## 3. Atmosphärisch, aber wartungsintensiv: regionale Fenster

Beispiel für künftige feste Bereiche: Kernnetz 8–12, West 12–18, Nord 18–24, Ost 30–36 Tage; das größere Fenster der Start-/Zielregion zählt. Die bestehenden Handelsräume könnten wiederverwendet werden.

**Vorteile:** Ortscharakter leicht erklärbar, bessere Chancen für die vier entfernten Startorte als heute, weniger pauschal als 45 Tage.

**Nachteile:** Regionengrenzen sind grob; einige lange Verbindungen können am unteren Rand weiterhin unerreichbar sein. Mehr Tabellenpflege und Sonderfälle bei späteren Städten, wirtschaftlicher Vergleich trotzdem nötig. Weniger zuverlässig als Bezug auf die tatsächlich bekannte Route. Nicht bevorzugt.

## Entscheidung

**Variante 1 zur späteren Freigabe empfohlen.** Gewünschte Reserve von drei Spieltagen und mögliche Obergrenzen wirtschaftlich bewusst entscheiden. Keine Implementierung hinter einem Schalter, keine Frist-, Preis-, Bestands- oder Wahrscheinlichkeitsänderung vorgenommen. Für die erste begleitete Testrunde den vorhandenen Fristmangel offen benennen und im Fragebogen festhalten; nicht jedes misslungene Gerücht als Bedienfehler werten.
