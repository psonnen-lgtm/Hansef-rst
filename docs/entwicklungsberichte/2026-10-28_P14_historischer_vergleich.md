# P1.4 – Historische Plausibilität und Quellenbegrenzung

**Eine exakte historische Geschwindigkeitskalibrierung ist mit den zugänglichen Quellen hier nicht möglich.** Die aktuelle Spielmatrix enthält keine nautischen Entfernungen. Die Zwei-Tage-Verbindung Lübeck–Hamburg ist als durchgehende Schiffsreise besonders erklärungsbedürftig; daraus folgt nicht, dass sämtliche Fernreisen pauschal zu schnell sind.

28.10.2026 Europe/Berlin · Basis **`ffc0bfad0e36e4547f7a5750bb68b169f93f8009`**, Branch `analysis/p14-voyage-times`; unveränderte produktive V13/0.8d.1b, HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Zahlen zu Spielreisen aus dem vorab veröffentlichten Analysecommit **`86ad5c5bd650d8d9137b6c939d7e00c2faa30681`**.

[Tatsächliche55 Reisezeiten](2026-10-28_P14_reisezeiten_bestand.md) · [Erreichbarkeit](2026-10-28_P14_ereignisse_erreichbarkeit.md) · [Entscheidung](2026-10-28_P14_entscheidung.md).

## Was tatsächlich recherchiert werden konnte

Vier externe Seitenaufrufe per Python `urllib.request` wurden am28.10. versucht. Alle scheiterten bereits am Netzwerktunnel mit **`403 Forbidden`**, bevor Seiteninhalt abgerufen wurde. [Vollständiger Zugangsbeleg](../../tests/analysis/phaseP14/source-access.json). Keine langwierige Rekonstruktion oder vorgetäuschte Webrecherche.

| Gesuchter Nachweis / Quellenhinweis | Herkunft / Status |
|---|---|
| Museumsdaten zu Rekonstruktion Ottar/Skuldelev1 | [Viking Ship Museum, versuchte Adresse](https://www.vikingeskibsmuseet.dk/en/professions/boatyard/building-projects/ottar): gesperrt. Auch genaue aktuelle URL/Seitenexistenz nicht bestätigt. Früherer nordischer Handelsschiffbau wäre nur ergänzender Vergleich, kein direkter Koggennachweis. |
| Bremer Kogge / Rekonstruktion | [Deutsches Schifffahrtsmuseum, versuchte Adresse](https://www.dsm.museum/en/exhibition/our-ships/the-bremen-cog): gesperrt. Keine ausgelesene Höchst-/Durchschnittsgeschwindigkeit. |
| Moderne Kanalverbindung und historische Abgrenzung | [Versuchte Kiel-Canal-Adresse](https://www.kiel-canal.org/english.htm): gesperrt. Keine zitierte historische Fahrzeit. |
| Allgemeine Schiffsübersicht | [Wikipedia Cog, versuchte Adresse](https://en.wikipedia.org/wiki/Cog_(ship)): gesperrt; ohnehin keine unabhängige Primärquelle für55 konkrete Reisezeiten. |
| Philippe Dollinger: *Die Hanse* | Allgemein bekannter bibliographischer Recherchehinweis aus Vorwissen, hier nicht eingesehen; keine verifizierte Ausgabe/Seite oder behauptetes Zitat. |
| Richard W. Unger: *The Ship in the Medieval Economy 600–1600* | Literaturhinweis aus Vorwissen, hier nicht eingesehen; keine daraus übernommenen Zahlenbehauptungen. |
| Vorläufige Spielentfernungen/Binnenwege | Tatsächlich lesbare [0.5d-Projektdokumentation](2026-10-24_0.5d_elf-spielbare-staedte.md) und aktueller HTML-Code. Verifizierte Quelle für **Spielregeln**, keine unabhängige historische Reisequelle. |

Es liegen damit **keine frisch quellenbestätigten mittelalterlichen Geschwindigkeits- oder Hafen-zu-Hafen-Zeitdaten** vor. Quellenhinweise nicht mit gelesenen Belegen verwechseln. Ein präzises historisches ZeitmodellC ist heute ausdrücklich nicht validiert.

## Allgemeine historische Einordnung – hier nicht neu extern verifiziert

Historische Frachtschiffe besaßen keine feste Fahrplangeschwindigkeit. Windrichtung/-stärke, Kreuzen, Beladung, Rigg, Rumpf, Mannschaft, Küstennavigation und sichere Liegeplätze beeinflussten Fahrt und Wartezeit. Höchstgeschwindigkeit auf freiem Wasser, Geschwindigkeit während gesegelter Stunden und gesamte Reisezeit einschließlich Warten sind verschiedene Größen. Eine einzelne schnelle Rekonstruktionsfahrt belegt keinen ganzjährigen Mittelwert einer mittelalterlichen Flotte.

Für eine **bloße Sensitivitätsüberschlagung** kann man beispielhaft3–5 Knoten während des Segelns ansetzen. Das ist hier eine **unbestätigte Rechenannahme**, keine belegte typische Hansegeschwindigkeit und keine Geschwindigkeitsobergrenze. Ein Knoten=1,852 km/h;24 Stunden ununterbrochene Fahrt ergäben rechnerisch133,34–222,24 km. Daraus folgt keine Hafenankunft: Stunden ohne Fahrt, Wind und Umschlag fehlen. Diese Zahlen werden weder auf `DIST` übertragen noch zur Erfindung von55 nautischen Entfernungen verwendet.

| Historischer Gesichtspunkt | Vergleich zum Spiel / Unsicherheit |
|---|---|
| Küstennähe und offene See | Spiel verwendet nur eine feste effektive Matrix; keine Tagesetappen zu Ankerplätzen oder offene-Seefahrt-Wetterfenster. Gleiche DIST kann historisch sehr verschiedene Wege darstellen. |
| Nordsee–Ostsee | Hamburg liegt am Elb-/Nordseezugang, Lübeck an Trave/Ostsee. Eine echte Seefahrt muss den dänischen Raum berücksichtigen; ein heutiger Nord-Ostsee-Kanal darf für den mittelalterlichen Vergleich nicht vorausgesetzt werden. Ein Landtransport wäre eine andere ausdrückliche Logistikabstraktion. |
| Hafenaufenthalt | Im Spiel grundsätzlich0 zusätzliche Hafentage; Gebühr wird einmal je Fahrt bezahlt. Historisch könnten Warten, Laden, Zoll und Umschlag erheblich sein; keine hier belegte feste Anzahl Tage. |
| Binnenwege | Spiel beschreibt Nowgorod/Newa/Ladoga/Wolchow und Venlo/Maas als logische Umladeketten, je3 Tage. Keine Behauptung, dass die Kogge durchgehend dieselben Flüsse befährt. Flussrichtung, Tiefgang, Schleppen, Eis und Umladestufen fehlen. |
| Brügge | Spiel erwähnt Zwin-Zugang, hat aber keinen festen Extraaufenthalt. Historische Hafen-/Zugangsverhältnisse nicht quantitativ geprüft. |
| Schiffstypen | Klein/schnell und groß/langsam ist eine leicht verständliche Spielentscheidung. Eine feste Rangfolge bei jedem Wind/Seegang ist kein historisch nachgewiesenes Gesetz. „Schnigge“, „Kogge“, „Holk“ stehen hier für breite Spielklassen, nicht exakt datierte Einzelrekonstruktionen. |
| Wetter / Gefahren | Spielsturm/Piraten verursachen Schäden/Ladungsverlust, aber0 Zusatztage. Historische Wetterwartezeiten werden somit nicht abgebildet. Eine bloße historische Multiplikation würde diesen Unterschied nicht automatisch lösen. |

## Besonders auffällige Spielrouten

- **Lübeck–Hamburg:2/2/3 Tage S/K/H**, genau wie Lübeck–Rostock. Als reine Schiffsreise fehlt eine überzeugende Nord-/Ostseeweg-Erklärung; als bewusster Handelsabstraktionssprung müsste sie sichtbar benannt werden. Kein bewiesener JavaScript-Rechenfehler, sondern ein erheblicher Plausibilitätsvorbehalt zur Matrix.
- **Lübeck–Bergen:8/12/17 Tage**, **Bergen–Nowgorod:23/33/45 Tage**. Das sind bereits Zeiträume von mehreren Wochen. Ohne konkrete Distanzen/Quellen ist die pauschale Diagnose „alle Fernreisen unrealistisch kurz“ nicht gerechtfertigt.
- **Nowgorod–Venlo:26/35/47 Tage**, davon6 feste Binnenumschlagtage. Die lange logische Reisekette wird erkennbar, aber die wenigen festen Binnenzeiten sind nicht unabhängig historisch kalibriert.
- **Brügge–Venlo:6/7/9 Tage**, davon3 Binnenumschlag. Nicht durch eine Luftlinienrechnung beurteilen; kein tatsächlicher vollständiger Wasserweg vermessen.

Die heutigen Werte dürfen historisch als Abstraktion diskutiert werden. Ein neuer allgemeiner „Kilometer pro Spiel-DIST“-Faktor wäre hier unbelegt und könnte Küsten-, Binnen- und Nord-/Ostseewege zugleich falsch behandeln.

## B/C sind Spielzeitszenarien, keine historischen Messungen

ModellB verlängert größere effektive Wege vorsichtig und erzwingt einen exemplarischen Mindestweg beim Nord-/Ostseewechsel; C setzt stärkere Verlängerung. Diese Parameter stammen aus dem vorab eingefrorenen **Sensitivitätsplan**, nicht aus Museumsdaten. C bedeutet „stärker auf längere Reisewege ausgerichtet“, **nicht historisch authentifiziert**.

Der sinnvollste vorläufige Kompromiss ist eine gezielte B-ähnliche Korrekturrichtung, kurze echte Ostseewege behalten und auffällige Seegebietswechsel zuerst sachlich klären. Eine mathematisch konsistente Wegekette und zugängliche Quellen fehlen noch. Keine der untersuchten Formeln ist als fertige Produktionsänderung freigegeben.
