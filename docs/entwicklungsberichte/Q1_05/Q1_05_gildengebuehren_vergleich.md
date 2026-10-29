# Q1.05 – Drei datenbasierte Gebühren und ihre Folgen

29.10.2026 · Analysebranch `audit/q1-05-guild-milestone` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`.
Produkt **0.8d.1b/V13**, letzter Produkt-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Spielcode und Wirtschaftsregeln unverändert. Keine Gebühr beschlossen.


## Auswahl nach den Baselines

Keine Wunschgebühr vorgegeben. Auswahl vor Gegenläufen in [fees.json](../../../tests/analysis/q1_05/results/fees.json) gesichert: alle 45 regulären Starts, letzter tatsächlich beobachteter Punkt bis Tag 120; E vorhanden → freie Reserve als Gebührenkapazität, sonst 0. Quantile12.495/17.570/26.437,500er-Aufrundung plus Mindestabstand25% → **12.500 /18.000 /26.500 Gold**. Median und Quantile beziehen sich auf diese Versuchsgruppen, nicht auf die Spielerschaft. Alle45 waren beim Referenzpunkt bereits E; kein Auslassen langsamer Fälle, keine synthetische Konvoikasse in Auswahl.

Drei Testpunkte vertreten unteren, mittleren und oberen Bereich. Andere Werte innerhalb eines „Bereichs“ wurden nicht geprüft. Alle liegen über 5.000 und über der geprüften sofortigen Kreditliquidität9.482. 10.000/15.000/20.000 wurden weder beschlossen noch als Wunschpunkte benutzt. Auch1.100 bleibt verworfenes Q1.04-Ergebnis für die neue Meilensteinzielsetzung.

## Erstes Bargeld gegenüber tragfähigem Zeitpunkt

| Regulärer Start | Gebühr | Nominal erreicht | Mit E + Restreserve erreicht | Beladene Reisen bis tragbar |
|---|---|---|---|---|
| Lübeck/Kogge | 12.500 | 15/15; Tag 15–50 | 15/15; Tag 25–63 | 8–21 |
| Lübeck/Kogge | 18.000 | 15/15; Tag 39–101 | 15/15; Tag 43–106 | 13–36 |
| Lübeck/Kogge | 26.500 | 15/15; Tag 60–166 | 15/15; Tag 63–172 | 20–58 |
| Bergen/Kogge | 12.500 | 15/15; Tag 40–141 | 15/15; Tag 60–163 | 5–15 |
| Bergen/Kogge | 18.000 | 14/15; Tag 92–196 | 14/15; Tag 108–196 | 9–18 |
| Bergen/Kogge | 26.500 | 13/15; Tag 130–235 | 12/15; Tag 152–229 | 13–20 |
| Nowgorod/Kogge | 12.500 | 15/15; Tag 45–219 | 15/15; Tag 75–235 | 4–14 |
| Nowgorod/Kogge | 18.000 | 13/15; Tag 90–236 | 12/15; Tag 138–219 | 8–13 |
| Nowgorod/Kogge | 26.500 | 6/15; Tag 154–236 | 4/15; Tag 170–235 | 10–14 |


Je Stadt15 Fälle=5 Stile ×3 gemeinsame Seeds. „Nicht erreicht“ heißt bis zum letzten erreichbaren Kontrollpunkt vor 240 Tagen, kein dauerhafter Ausschluss. Keine Interpolation oder menschliche Stundenumrechnung. Nominale/stabilisierte Spannweiten enthalten unterschiedliche erreichte Fälle; Differenzen ihrer Grenzen sind keine individuellen Wartezeiten. Synthetische Schiffsprofile separat im [vollständigen CSV](../../../tests/analysis/q1_05/results/affordability.csv).

Regulär insgesamt:12.500 tragbar45/45;18.000: 41/45;26.500: 31/45. Der obere Kandidat scheitert im Zeitraum besonders häufig am Nowgorod-Profil (nur 4/15 tragbar), nicht an fehlender grundsätzlicher Handelsfähigkeit.

## Echte Testzahlung und Fortsetzung

Nicht nur errechnete Bezahlbarkeit: einmalig aus der Testkasse abgezogen, dann ursprüngliche Strategie weitergeführt, tatsächliche Käufe/Verkäufe/Reisen/Schäden verbucht. Keine Gildenmitgliedschaft oder politischen Punkte. Je Gebührenzeitpunkt sechs fest ausgewählte Fälle. Baseline-Präfix unverändert, nach Zahlung verändert die Liquidität echte Folgeentscheidungen. Keine zusätzliche Notkreditrettung; nur aggressiver Anfangskredit.

| Gebühr | Zahlungszeitpunkt | Bezahlt | Anhaltender Stillstand | Auch vorübergehende Hinweise | Abfahrt geldbedingt blockiert | ≥120 Tage +3 Reisen beobachtet |
|---|---|---|---|---|---|---|
| 12.500 | Erstes Bargeld | 6/6 | 5 | 5 | 3 | 3 |
| 12.500 | E + Restreserve | 6/6 | 0 | 0 | 0 | 6 |
| 18.000 | Erstes Bargeld | 5/6 | 3 | 4 | 0 | 5 |
| 18.000 | E + Restreserve | 5/6 | 0 | 0 | 0 | 5 |
| 26.500 | Erstes Bargeld | 5/6 | 2 | 2 | 1 | 3 |
| 26.500 | E + Restreserve | 4/6 | 0 | 0 | 0 | 4 |


Nominale anhaltende Stillstände5/6,3/5 und2/5 **zahlender Fälle**, nicht allgemeine Ruinwahrscheinlichkeiten. Alle10 haben nach Zahlung null Käufe; oft reichen Restmünzen nur für leere Fahrten. Vier enden tatsächlich ohne Geld zur Abfahrt. Bei18.000 kommt ein vorübergehender Stillstandshinweis im aggressiven Fall hinzu; später wieder33 beladene Reisen. Der obere nominale Nowgorod-Fall hat7 beladene Folgefahrten, endet aber nach 119 statt 120 Folgetagen am letzten passenden Kurs; deshalb unvollständige Nachbeobachtung.

Alle stabilisierten Zahlungen ohne Stillstandshinweis im Prüfzeitraum, aber fünf Akten ohne erreichte Zahlung sind nicht bestandenes Beitrittsverhalten.15 zahlende Fälle≥120 weitere Tage und≥3 Fahrten. Reihen sind gepaart/gezielt, kein statistischer Beweis für die gesamte Spielerschaft.

## Stabilisiert: Kasse direkt danach und weitere Geschäfte

| Gebühr | Fall | Zahltag | Restkasse | Freie Reserve danach | Beladene Reisen danach | Netto danach | Endkasse | Folgetage |
|---|---|---|---|---|---|---|---|---|
| 12.500 | Lübeck/Kogge / Vorsichtig | 44 | 1.839 | 559 | 45 | 22.923 | 24.762 | 120 |
| 12.500 | Bergen/Kogge / Vorsichtig | 163 | 1.564 | 522 | 11 | 4.390 | 5.954 | 121 |
| 12.500 | Nowgorod/Kogge / Normal | 75 | 1.145 | 603 | 8 | 10.242 | 11.387 | 127 |
| 12.500 | Lübeck/Kogge / Aggressiv (1.500 Kredit) | 27 | 2.699 | 811 | 42 | 32.373 | 35.102 | 121 |
| 12.500 | Lübeck/Schnigge* / Optimiert, beobachtet | 28 | 916 | 264 | 58 | 27.440 | 28.356 | 120 |
| 12.500 | Lübeck/Kogge+Holk* / Fehlentscheidungen → normal | 27 | 1.538 | 588 | 34 | 25.595 | 27.133 | 121 |
| 18.000 | Lübeck/Kogge / Vorsichtig | 77 | 2.225 | 941 | 45 | 19.338 | 21.563 | 120 |
| 18.000 | Bergen/Kogge / Vorsichtig | – | – | – | 0 | 0 | 17.331 | – |
| 18.000 | Nowgorod/Kogge / Normal | 138 | 1.450 | 828 | 8 | 13.266 | 14.716 | 132 |
| 18.000 | Lübeck/Kogge / Aggressiv (1.500 Kredit) | 57 | 2.342 | 425 | 42 | 30.824 | 33.196 | 121 |
| 18.000 | Lübeck/Schnigge* / Optimiert, beobachtet | 64 | 1.219 | 475 | 58 | 34.243 | 35.462 | 120 |
| 18.000 | Lübeck/Kogge+Holk* / Fehlentscheidungen → normal | 62 | 3.545 | 2.236 | 36 | 27.384 | 30.929 | 122 |
| 26.500 | Lübeck/Kogge / Vorsichtig | 106 | 1.313 | 231 | 44 | 24.770 | 26.083 | 121 |
| 26.500 | Bergen/Kogge / Vorsichtig | – | – | – | 0 | 0 | 17.331 | – |
| 26.500 | Nowgorod/Kogge / Normal | – | – | – | 0 | 0 | 27.186 | – |
| 26.500 | Lübeck/Kogge / Aggressiv (1.500 Kredit) | 90 | 2.219 | 188 | 43 | 28.000 | 30.249 | 120 |
| 26.500 | Lübeck/Schnigge* / Optimiert, beobachtet | 92 | 586 | 8 | 56 | 30.675 | 31.261 | 120 |
| 26.500 | Lübeck/Kogge+Holk* / Fehlentscheidungen → normal | 94 | 2.623 | 1.340 | 37 | 26.252 | 28.875 | 120 |


„Netto danach“ = realisierter Handelsüberschuss abzüglich tatsächlich anfallender Reisegebühren, Reparaturen, Piratenwareneinsatz und Schuldzinsen; keine Schiffs-/Warenbuchwertgewinne. Ausgabe selbst ist separat bereits aus der Restkasse abgezogen. Endkassen zu unterschiedlichen Endtagen/Folgetagen sind keine Gebühren-Rangliste. Günstiger oder hoher Endgewinn kann auch Folge anderer Strategiewege/Ereignisse sein.

In stabilisierten Fällen verbraucht die Gebühr ungefähr 82–98% der tatsächlich vorhandenen Kasse (genaue Anteile im CSV); sie ist ein spürbarer Einschnitt. Hoher optimierter Schnigge-Fall hat nur 8 Gold zusätzlich zur R*-Reserve: trotz gutem späterem Verlauf kein robuster Nachweis gegen zusätzliche ungetestete Pflichten/Katastrophen.

## Vorsichtiger Lübecker, gleicher Seed 10003

| Gebühr | Zeitpunkt | Zahltag | Beladen vorher | Restkasse | Freie Reserve | Beladen danach | Endkasse | Endtag |
|---|---|---|---|---|---|---|---|---|
| 12.500 | nominal | 38 | 12 | 146 | -1.124 | 0 | 80 | 158 |
| 12.500 | stabilized | 44 | 14 | 1.839 | 559 | 45 | 24.762 | 164 |
| 18.000 | nominal | 68 | 22 | 104 | -1.200 | 0 | 44 | 190 |
| 18.000 | stabilized | 77 | 25 | 2.225 | 941 | 45 | 21.563 | 197 |
| 26.500 | nominal | 97 | 34 | 61 | -1.031 | 0 | 1 | 212 |
| 26.500 | stabilized | 106 | 37 | 1.313 | 231 | 44 | 26.083 | 227 |


12.500 nominal:12.646 vorhanden,146 bleiben. R0=170 Waren+12 Gebühren+80 weiterer Sturm+208 aktuelle Reparatur=470. R*=max(470+800,470/0,45)=1.270. Freie Reserve **−1.124**; der800-Gold-Stilpuffer verhindert sämtliche Käufe. Es folgen11 leere Reisen und66 Gold Gebühren, Ende80. Keine unbegrenzte Unrettbarkeit behauptet.

12.500 stabilisiert:14.339 vorhanden,1.839 bleiben. R0=480 und R*=1.280, freie Reserve559. Zahlung nach 14 statt 12 beladenen Reisen;45 beladene Folgefahrten, positiver Nettoüberschuss22.923, Endkasse24.762. Andere Käufe/Routen/Ereignisse nach Zahlung sind Teil der Gegenrechnung.

Bergen besonders relevant:12.500 nominal Tag 141 mit 615 Restgold →12 leere Folgefahrten/543 Endgold; stabilisiert Tag 163 mit 1.564 →11 beladene Folgefahrten/4.390 Nettoüberschuss/5.954 Endgold. Beide sind über 120 weitere Tage beobachtet.18.000 und26.500 innerhalb240 Tagen weder nominal noch stabilisiert erreicht.

## Bewertung der drei Bereiche

| Geprüfter Anker | Wirtschaftlicher Aufbau | Bei gedeckter Reserve | Begrenzung / Empfehlung |
|---|---|---|---|
|12.500|Nicht am Start finanzierbar; regulär4–21 beladene Reisen bis tragbar|6/6 gezielte Fälle bezahlt und weiter gehandelt;45/45 Baselineprofile tragbar|Stärkster derzeitiger Kandidat; vorsichtiges Fernprofil braucht dennoch lange|
|18.000|Regulär8–36 beladene Reisen bis tragbar|5/6 gezielt bezahlt;41/45 regulär tragbar|Bedingte obere Diskussionsmarke, langsame Fälle benachteiligt|
|26.500|Regulär10–58 beladene Reisen bis tragbar|4/6 gezielt bezahlt;31/45 regulär tragbar|Derzeit kein allgemeiner Standard; hohe regionale Zensierung und knappe Restreserve|

Keine künstlichen Wartezeiten oder zusätzlichen Aufnahmeaufgaben. **Ein Preis allein verhindert frühe Selbstentkapitalisierung nicht**; die Kriterien beschreiben wirtschaftliche Vorsicht und sind keine neue Gildenprüfung. Menschliche Risikoentscheidung/Bedienhinweise sind hier nicht implementiert.


[Gesamtbericht](Q1_05_gesamtbericht.md) · [Testgrundlagen](Q1_05_testgrundlagen.md) · [Meilensteine](Q1_05_wirtschaftliche_meilensteine.md) · [Gebührenvergleich](Q1_05_gildengebuehren_vergleich.md) · [Spielspaß/Karriere](Q1_05_spielspass_und_karriere.md) · [Entscheidungsvorlage](Q1_05_entscheidungsvorlage.md)
