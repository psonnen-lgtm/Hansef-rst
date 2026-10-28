# R1.08 - Besatzung gelöst, erste Fahrten und Vergleichskatalog

28.10.2026. Basis `21440703255dd7df3a7360d8c63cf7f51ce31492`, eigener Zweig `research/r1-08-crew-voyages-catalog`. Keine Hansefürst-Spielausführung, Code-/Pages-/Spielstandänderung oder Wirtschaftssimulation. Historische Forschungsdateien bleiben erhalten; Korrekturen stehen hier ausdrücklich daneben. Ziel90 aktive Stunden bis Eldermann ist eine Projektvorgabe, keine durch diese Probe bewiesene Spieldauer.

## Entscheidend: Korrektur des bisherigen Befunds

Die Anwerbung war nicht durch einen belegten Matrosenmangel blockiert. In R1.07 wurde die falsche Figur/Region im Hintergrund angesprochen. Die Originalhandbuchabbildung (bereitgestelltes PDF56, gedruckt3.22) weist den Besatzungsbereich weiter rechts vor dem Kamin aus, während die Hintergrundfigur als Pirat markiert ist. SDL-Koordinate ungefähr280/315, im Bildschirm560/315, öffnet den echten Anwerbedialog.

Dort standen **0 Mann**, nicht vier, Platz für weitere113 und15Taler. Eingabe5+Return ergab5Mann, Platz108 und10Taler. Im Schiffsbuch stehen5 vorhanden und5 nötig. Die bisherige Vier-Mann-Angabe war ein Ablesefehler und ist durch diesen Befund widerlegt. Es braucht fünf Einstellungen, nicht nur eine. Die Meldung an der alten Klickstelle beweist keine Matrosenverfügbarkeit.

113 ist angezeigter weiterer **Platz**, nicht die Zahl arbeitsuchender Matrosen. Das verfügbare Personalangebot wird nicht als eigener Bestand angezeigt. In diesem Zustand ließen sich fünf einstellen. Die Kosten betragen tatsächlich fünf Taler; daraus keine allgemeine Lohn-/Reiseformel ableiten. Warenraum: eine Getreideeinheit, freier Laderaum27 blieb erhalten; Mannschaftsplatz und Warenplatz dürfen nicht ungeprüft gleichgesetzt werden.

Quellen: [Online-Originalhandbuch](https://www.mogelpower.de/manuals/Der_Patrizier_Handbuch.pdf), bereitgestellter ausführlicher Scan PDF56/57; zusätzlich [zeitgenössische Amiga-Rezensionen von1993](https://www.amigareviews.leveluphost.com/patricia.htm), die Matrosen vor dem Kamin beschreiben. Die Rezension ist Primärzeugnis ihrer Zeit, jedoch eine andere Plattform: Kosten/Hotkeys wurden nicht allein daraus als DOS-Regel übernommen. Die alternative TasteC wurde nach dem Schlussload in der Kneipe einmal getestet: keine sichtbare Änderung. Daraus keine generelle Nichtunterstützung ableiten. Die funktionierende Mausroute machte eine Übernahme fremder Hotkeys unnötig. F2 im Schiffsbuch zeigte keine bestätigte Wirkung. Jeder Versuch steht in R1_08_besatzungsversuche.csv.

## Ausgangszustand und Finanzen

Albatross, HeimatLübeck, 29.Brachet1355, Normalstart. TypKraier ist durch die dokumentierte Normalstartregel gestützt; in dieser Runde kein separater Typtext abgelesen. Inspektion vor Reise meldet besten Zustand, ohne Prozentwert. Startsave ausR1.07 enthält bereits eine Getreideeinheit mit damaligem Kaufpreis68 und15Taler Schiffskasse. Original-SPIEL und private Startkopie bleiben unverändert; SHA-256 `a61c8d454b296bac1e289eb572ba55029988aded9665ecf79346f99d00568374`.

Nach Anwerbung10Taler. Die nächste Abfahrtsprüfung verweist auf Bank/Kontor statt auf Personal. Später werden-2Taler sichtbar, eine zusätzliche12-Taler-Differenz, deren genaue Ursache nicht isoliert wurde. Sie wird weder als zweiter Anwerbepreis noch als bewiesene Hafengebühr ausgegeben. Regulärer Kredit100 beim Handwerker; angenommenes Angebot31Prozent/241Tage, danach98Taler im Buch. Ein davor sichtbares35Prozent/228Tage-Angebot wurde nicht als abgeschlossener Kredit bestätigt. Zinshorizont/Jahresbezug und Gesamtschulden wurden nicht vollständig auditiert. Kreditprincipal ist kein Gewinn.

## Tatsächliche Fahrten

| ID | Zweig | Strecke | Abfahrt | Ankunft | Verstrichene Spieltage | Schiffskasse |
|---|---|---|---|---|---:|---:|
| A1 | erster Versuch | Lübeck→Rostock |29.Brachet1355|1.Heuet1355|2|98→84|
| A2 | Fehlklick | Rostock→Hamburg |1.Heuet1355|19.Heuet1355|18|69→40|
| B1 | Vorabfahrts-Save neu geladen | Lübeck→Rostock |29.Brachet1355|1.Heuet1355|2|98→84|
| B2 | korrigierter Rückweg | Rostock→Lübeck |1.Heuet1355|4.Heuet1355|3|84→63|

Damit vier abgeschlossene Fahrten, davon eine ungewollte. ZweigB ist die verlangte Rundreise mit fünf verstrichenen Tagen. Zweige sind keine voneinander unabhängigen Partien. Zeitangaben sind Abfahrt/Ankunft im Spiel, keine menschlichen Stunden und keine isolierte Segelzeit ohne mögliche Hafen-/Zwischenphasen. Der Monatswechsel mit30.Brachet war bereits inR1.07 unmittelbar beobachtet.

Rostock→Hamburg war mein Navigationsfehler. Die Fahrt wird nicht gelöscht oder als Lübeck-Rückkehr umgedeutet. Nach Dokumentation wurde der Vorabfahrts-Save regulär geladen, um den Fehler zu korrigieren; kein Ereignis wurde gezielt erzeugt oder auf ein günstiges Ergebnis neu gewürfelt. Die nebenstehenden Lübeck-/Hamburg-Stadtikonen wurden danach vergrößert geprüft. Ein Hover lieferte keine verlässliche Zielvorschau; die Stadt ist erst durch die Chronik sicher bestätigt.

Besatzung bei allen fotografierten Ankünften5. LadungA1/RückkehrB2 jeweils1Getreide; die Zwischenladung beiA2 undB1 wurde nicht separat fotografiert und bleibt in der Reise-CSV leer. Es gab inB keine Zwischenhandelsaktion. Zustand vorA1 bester, nachA1/vorA2 inRostock bester, nachB2 inLübeck bester. Für A2-Ankunft und B1-Ankunft/vorB2 fehlt eine eigene Inspektion; nicht rückwirkend mit100Prozent auffüllen.

Kassenabgänge14/29/14/21 sind gemessen. Chronik nennt beiA2 Liegegebühr21, beiB1/B2 jeweils14. BeiA1 wurde stattdessen zunächst ein Heilerangebot sichtbar. Die verbleibenden Differenzen sind nicht vollständig Heuer/Zinsen/Gebühren zugeordnet. ZweigB kostet zusammen35 Schiffskassentaler. Daraus keine allgemeine Kostenformel ableiten.

## Markt und Handelsbilanz

Rostock am1.Heuet im ZweigA: Getreide Stadt1889, Schiff1, Verkauf32/Kauf47. Verkauf1: Stadt1890, Schiff0, Kasse84→116. Kauf1: Stadt1889, Schiff1, Kasse116→69. Der geerbte Einkauf68 wurde mit32 realisiert: Warenverlust36. Der neue Einkauf47 lag am Ende des verworfenen Zweigs noch an Bord; kein Gewinn daraus. Nicht mit ZweigB zusammenrechnen.

Lübeck nachB2 am4.Heuet: Stadt1170, Schiff1, Kauf68/Verkauf47, Kasse63. Verkauf1: Stadt1171, Schiff0, Kasse110. Warenverlust21 gegenüber dem geerbten Einkauf68. Zuzüglich35 Kassenabgänge der Rundreise, fünf Anwerbekosten und der ungeklärten12-Taler-Differenz ergibt sich eine wirtschaftliche Belastung73 gegenüber dem vorR1.07-Warenkauf liegenden Kassenwert83, wenn der Kredit100 getrennt bleibt: 83+100-68-5-12-35+47=110. Das ist eine nachvollziehbare Schiffskassenrechnung dieses Versuchszweigs, keine Vollbilanz sämtlicher Kontorwerte/Schulden/Zinsen. Die Aktivität endet mit110Taler, nicht mit27Taler Handelsgewinn.

Weitere sichtbar erfasste Rostocker Preise/Bestände können aus privaten Bildern nachgeprüft werden; diese Runde veröffentlicht nur die vollständig transkribierten Getreidedaten. Keine behauptete Preisformel aus wenigen Werten. Preise sind pro angegebener Handelseinheit, keine ungeprüfte Umrechnung in Tonnen.

## Ereignisse

A1: Zusätzliches Heilerangebot63Taler im Übergang zurAnkunft; abgelehnt. Exaktes Auslösedatum innerhalb29.Brachet–1.Heuet und Einordnung als See- oder Ankunftsereignis offen. A2/B1/B2: keine zusätzlichen Angebote, Piraten- oder Sturmmeldungen beobachtet; normale/zusätzliche Liegegebühren sind separat erfasst. Keine verlorene Ladung festgestellt, aber nicht jede Zwischenladung separat abgelesen.

Rein deskriptiv erschien bei1von4 Fahrten ein solches Zusatzangebot, also25Prozent. Das ist **keine Original-Seereigniswahrscheinlichkeit**: n=4, gemischte Routen, wiederhergestellter Start und unklare Ereignisklassifikation. Keine Piraten-/Sturmrate daraus ableiten. Reisen ohne beobachteten Sondervorfall sind ausdrücklich enthalten.

## Spielstände und Wiederanlauf

Ein eigener R108PRE wurde nach Anwerbung/Inspektion angelegt und regulär geladen (Utrecht akzeptiert); der frühe Save-Kassenwert wurde nicht isoliert bestätigt. Der letzte zuvor abgelesene Stand war10, der nächste Bankstand-2. Später wurde der Save innerhalb dieser Arbeitsrunde mit dem auslaufbereiten Zustand5Mann/98Taler aktualisiert. Die ursprünglicheSPIEL-Datei bleibt unverändert. Die98er-Fassung ist privat separat gesichert und wurde nach dem Fehlklick erfolgreich geladen: Aarhus regulär akzeptiert, Buch zeigt29.Brachet,5Mann,98Taler.

Dazwischen schlug ein Ladetest an einer weiteren Wappenabfrage fehl: Das Schiffswappen wurde der Kartenbeschriftung Helsingør zugeordnet; Helsingor/Helsingoer wurden abgewiesen, danach endete das Original regulär amDOS-Prompt. Später geklärt: Die reguläre deutsche Eingabe Helsingör mit echtem ö wurde akzeptiert (DOS-Alt-Eingabe148). Die zuvor verwendeten Schreibweisen waren falsch. Kein Karten-/Programmfehler daraus belegt. Kein Patch, keine Routine/Antwortliste aus dem Programm extrahiert, kein blindes Durchprobieren. Der folgende normale Neustart und die neueAarhus-Abfrage sind dokumentiert. Die Kartenkompatibilität ist damit nur für bestätigte Fälle belegt.

Eine laufende Emulatorsitzung war nach der zusätzlichen Nutzeranweisung nicht mehr ansprechbar; deshalb Wiederanlauf vom gespeicherten Zustand, keine Wiederholung von Installation/Grundforschung. Einzelne direkte Bildschirmlesevorgänge trafen eine gerade geschriebeneBMP-Datei oder eine Übergangsfläche; sie wurden nicht als Spieldefekte/Messdaten gewertet.

Der Schluss-Spielstand nach Rückkehr wird getrennt gesichert. Sein Status und der tatsächliche Ladetest stehen im Abschlussnachtrag und JSON; keine bloße Dateianlage als bestandenen Ladetest ausgeben.

## Dauerhafter Forschungs- und Vergleichskatalog

[README](../forschungskatalog/README.md), [vollständiges JSON](../forschungskatalog/mechaniken.json), [CSV](../forschungskatalog/mechaniken.csv). Acht Bereiche mit stabilen IDs, getrennten Quellenregeln/Originalbeobachtungen/Codebelegen, Stärken/Schwächen, Vorschlägen, vermuteter Spielspaßwirkung, qualitativem Aufwand und Priorität. Alle vier Evidenzklassen sind definiert. Empfehlungen sind keine genehmigten Implementierungen.

Hansefürst wurde zuerst lesend am festen Entwicklungscommit `02ee6b8fc1507ad078b6b596c333e50d91eeea64` geprüft. Maßgeblich ist Hansefuerst_0_4.html mit sichtbarer0.8d.1b/V13-Kennung, nicht der ebenfalls vorhandene viel ältere Hansefuerst_Spiel.html-Prototyp. Kein Live-Pages-Abgleich und kein Laufzeittest. Codefunktionen und Zeilen/Blob sind im Katalog gepinnt.

Bereits vorhanden: regionaler Bestands-/Preisrücklauf, Schiffe mit Zustand/Bewaffnung, örtliche Konvois, Reisevorbereitung mit Ziel/Kosten, Ereignisauflösung bei bestätigter Fahrt, Banken, Badehausinformationen, politisches Leistungsbuch/Mehrheiten/Stadtsiegel/Hansevertrag. In den konkret geprüften Schiffs- und Reisefunktionen keine Anwerbe-/Mindestbesatzung. Hansefürst nutzt drei Typen; das Originalhandbuch vier einschließlichKraier. Solche Unterschiede sind keine automatischen Fehler. Gerade die Korrektur der falschen Klickstelle mahnt, keine neue Personalhürde aus einem vermeintlichen Originalengpass abzuleiten.

## Prüfungen und offene Fragen

Originalprogrammdateien unverändert; Startsavehash erhalten. CSV/JSON strukturell geprüft, Finanzdifferenzen und Rundreisezeit getrennt berechnet. Keine neuen1500er-Simulationen: Vorbefunde nur Hintergrund, nicht erneut getestet. Keine Produktfreigabe oder Validierung von90 aktiven Stunden.

Offen: präzise Reise-/Lohn-/Liegegebührenformel,12-Taler-Anpassung, Höchstpersonalformel, Zahl verfügbarer Arbeitskräfte, allgemeine DOS-Hotkey-Unterstützung, isolierter Zustand vor jederEinzelfahrt, volle Schulden-/Kontorbilanz, weitere sprachliche Besonderheiten der Kartenantworten, belastbare Ereignisstatistik und Langzeitkarriere. Keine Folgephase begonnen.


## Abschlussnachtrag: Schluss-Spielstand und Grenzen der Kostenrechnung

R108RET.PSD wurde nach Rückkehr, Verkauf und Schlussinspektion separat mit dem Original-Speicherdialog angelegt (28048Bytes). Dateiname im Dialog bearbeitet; keine Spielstandbytes editiert. Die Liste ist nach Speicherzeit sortiert; deshalb wurde beim ersten Schlussladetest versehentlich nochmalsR108PRE gewählt. Auch diese Wiederherstellung wurde protokolliert und nicht als neue Fahrt gezählt. Erst der danach gezielt ausgewählteR108RET ist der Rückkehrsave.

Die Abfrage Lübeck wurde regulär mit ü beantwortet (DOS-Alt129). Danach Buch4.Heuet1355,5Mann,104Taler; Markt bestätigt0Getreide anBord undStadt1171. Damit sowohl Vorabfahrts- als auch Rückkehrsave tatsächlich geladen. Der letzte überprüfte Zustand ist privat gesichert; OriginalSPIEL undR1.07-Startkopie haben weiterhin denselben unveränderten Hash.

Die110Taler gelten unmittelbar nach dem Warenverkauf, die104Taler nach Schlussinspektion, Speichern und Laden. Die Differenz6 wurde nicht in einem isolierten A/B-Test der Inspektion zugeordnet und ist keine zusätzliche bewiesene Reisegebühr. Der oben ausgewiesene Warenverlust21 und die Rundreise-Kassenabgänge35 bleiben unverändert. Für den tatsächlich geladenen Schlussstand erweitert sich die reine Schiffskassenabstimmung um6: 83+100-68-5-12-35+47-6=104. Keine Behauptung, dass Laden selbst6Taler kostet.

Der einmalige C-Test in der Kneipe zeigte keinen sichtbaren Wechsel; die erfolgreiche Matrosen-Anwerbung bleibt der Mausweg. Die Sitzung wurde anschließend beendet, keine weiteren Fahrten oder Folgephase gestartet.
