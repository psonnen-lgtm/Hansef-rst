# Forschungs- und Vergleichskatalog – R1.09

28.10.2026. Fortschreibung der acht dauerhaften R1.08-Mechanik-IDs. [Vollständige JSON-Einträge einschließlich historischer R1.08-Basis](mechaniken_R1_09.json) · [Aussagen-CSV](mechaniken_R1_09.csv) · [Originalmessungen und Grenzen](../R1_09/R1_09_forschungsbericht.md). R1.08-Dateien bleiben erhalten. Diese Version ist der aktuelle Katalogstand; Empfehlungen sind Vorschläge, keine beschlossenen Änderungen.

Kategorien: **Direkt im Originalspiel gemessen** (O), **Durch Originaldokumentation belegt** (D), **Im Hansefürst-Code bestätigt** (H), **Hypothese** (Y), **Noch ungeprüft** (U). Ein Status gilt jeweils nur für die konkret bezeichnete Aussage. Erwarteter Spielspaß, Atmosphäre, Aufwand und Systemrisiken sind überall qualitative **Hypothesen**, keine Nutzertest-/Umsetzungsergebnisse.

Hansefürst-Code: `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, `Hansefuerst_0_4.html`, Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`. Remote-Blob am28.10.2026 erneut verglichen; vorhandene byteidentische Datei gelesen. Keine Ausführung oder Simulation. Zeilenverweise beziehen sich auf diesen festen Commit, nicht auf Pages.

## ECON-01 – Wirtschaft im Detail

| Mechanik | Original | Hansefürst tatsächlich | Unterschied und Empfehlung | Aufwand / Einfluss (Y) |
|---|---|---|---|---|
| Kauf-/Verkaufskurs | O: Lübeck Getreide68/47, Bier76/53, Holz64/45; lokale Rückverkäufe verlustreich | H: `m.price` für beide Richtungen; keine separate Handelsgebühr in `trade` | **Nicht übernehmen:** Originalspanne um30% ohne Balancetest. Ein Kurs bleibt gut verständlich | Mittel technisch, hoch für Balance; weniger Liquidität/Erholung, andere politische Lieferkosten |
| Sofortige Preisreaktion | O: kleine Einzeltransaktionen verändern Vorrat/Kasse, kein belegter Preiswechsel; U: größere Mengen/Schwellen | H: `trade` verändert `m.stock`, nicht `m.price` | **Weitere Forschung erforderlich:** bestehendes Verhalten nicht fälschlich als fehlende Wirtschaft ausgeben; Engpässe gezielt prüfen | Mittel bis hoch; sofortiger Preiseffekt könnte Kaufen/Verkaufen und Arbitrage fundamental verändern |
| Preis über Zeit | O: Getreide4→5.Heuet68/47→71/49; Bestand1171→951 ohne eigenen Handel | H: täglich35%-Prüfung, Rauschen und bestandsabhängiges Rücklaufziel | **Beibehalten:** Bestandsbezug als vorhandene Basis. Original-Updateformel U | Keine neue Umsetzung beschlossen; stärkere Rückkopplung kann Volatilität erhöhen |
| Angebot/Nachfrage | O: Ware wird zwischen Stadt/Schiff übertragen; Bestände schwanken auch ohne Spieler | H: Vorrat täglich mit Profil, Rücklauf und Rauschen angepasst | **Verbessern:** Ursachen verständlich anzeigen, soweit Code sie hergibt | Mittel; Erklärungen müssen tatsächliche Ursachen treffen, keine fiktive Produktionsbilanz behaupten |
| Regionen | O: Rostock8.Heuet Getreide48/33,Holz47/32,Bier79/53; Lübeck6.Heuet71/49,64/45,76/53. U: dauerhafte Vorteile, weil zeitversetzt | H: feste regionale Profile; Warenkunde und Versorgungsberichte vorhanden | **Beibehalten:** ortsbezogene Information und datierte Beobachtung; kein garantierter Profithafen | Niedrig für Erhalt; Änderungen können dominante Routen erzeugen |
| Produktion/Verbrauch | U: Ursache der Originalbestandsänderungen nicht getrennt; kein Rezeptnachweis | H: `regionalStock` als vereinfachter Nettofluss, keine stoffliche Rezept-/Einwohnerbilanz in dieser Routine | **Weitere Forschung erforderlich:** vollständige Produktionsketten hier nicht als notwendige Verbesserung ableiten | Hoch bei Rezeptmodell, einschließlich Nachfrage, Lagerung, Politik und Save-Migration |
| Bestände/Engpässe | O: reale Stadt-/Schiffswerte und Rücktransfer; Originalbestände deutlich größer | H: `trade` endliche Bestände; tägliche Anpassung begrenzt3–240 | **Weitere Forschung erforderlich:** Untergrenze bei Versorgungs-/Erholungszielen evaluieren | Mittel; vollständiges Leerlaufen könnte echte Engpässe, aber auch Stillstand erzeugen |
| Gewinne/Marktinformation | O: Kurse umschalten; kein automatischer Gewinnsaldo im untersuchten Buch sichtbar | H: Durchschnittseinstand, Warengewinn/Verlust, letzter Handelsbeleg, datierte Preise und regionale Nachrichten vorhanden | **Beibehalten** und Kostenkontext **Verbessern**, keine zweite Einstandsverwaltung einführen | Mittel; Verwechslung von Warengewinn und Gesamtrendite vermeiden |

H-Codebelege: [regionalPrice/regionalStock/regionalMarketDay und advance,855–874](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L855), [trade/Markt895–905](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L895), [Informationsberichte842–852](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L842), [Preisnotizen991](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L991).

**H – Formel im geprüften Hansefürst-Code:** Preisziel skaliert den Basispreis mit `2/(1+(stock/110)^2)`; tägliche Rückführungskomponente `0.020*(Ziel−Preis)`, zusätzlich Zufall und Rundung, Mindestpreis4. Preisänderung wird mit0,35 pro Markt/Ware/Tag geprüft. Bestand wird täglich über Rauschen−7…7 und `speed*(1.2*profile+0.015*(110−stock))` angepasst, stochastisch gerundet und3…240begrenzt. `speed` reduziert Tuch/Pelze auf0,35und steigert Bergen/Fisch auf1,5. Diese Formeln sind **keine Originalformeln**. Der ältere `dailyMarketPrice` allein erklärt den aktuellen Tagesablauf nicht; `advance` ruft `regionalMarketDay` auf.

**Stärken (Y):** Hansefürst hat schon verständliche Bestände, regionale Orientierung und belegbare Kostenbasis. **Schwächen/Risiken (Y):** Vereinfachter Nettofluss erklärt keine reale Versorgungskette; ohne sichtbare Ursachen können Preisbewegungen willkürlich wirken. Originalspread liefert Reibung, kann aber gerade kleine Startkapitalien stark belasten. Bessere Informationen sind voraussichtlich nützlicher als bloß zusätzliche Handelskosten.

## SHIP-01 – Schiffe, Besatzung, Konvois

O: R1.09 zwei Fahrten2+2Tage, weiterhin5Matrosen, ohne Fracht. R1.08-Rückfahrt3Tage ist kein fixer Streckenwert. D: Onlinehandbuch PDF16 beschreibt reiselängenabhängige Heuer aus Bordgeld; U: ihre Formel. H: [planTravel1019](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1019) verwendet Typgebühr4/6/9, Zustand und langsamstes Konvoischiff, zeigt Zeit/Kosten vor Bestätigung. Der R1.08-Befund fehlender Besatzungsfelder im geprüften Schiffs-/Reiseablauf bleibt historisch erhalten.

**Beibehalten, P1:** Kostenvorschau. **Weitere Forschung erforderlich:** Originalheuer/Wegeformel. Aufwand niedrig für Erhalt, mittel für bessere Abrechnung; Y: Transparenz kann Vorbereitung erleichtern, neue Personalkosten könnten Liquidität/Saveverträglichkeit beeinträchtigen.

## EVENT-01 – Piraten und Reiseereignisse

O: zwei neue Reisen ohne zusätzlichen Vorfall. Hafengebühr ist reguläre Kostenmeldung. U: Häufigkeiten/Auslöser des Originals. H: [rollTravel/arrive1020/1026](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1020) bilden Ereignisse bei bestätigter Reise ab; keine Originalkalibrierung.

**Weitere Forschung erforderlich, P2:** größere reguläre Stichprobe und getrennte Kosten. Aufwand mittel; Y: wenige verständliche Vorfälle können Atmosphäre stärken, Gebühren fälschlich als Ereignisse mitzuzählen würde die Balancebewertung verzerren.

## CITY-01 – Gebäude, Menüs und Marktinformation

O: zwei Öffnungsklicks vom Hafen zum Handelsbuch; aus Kaufmodus3Handlungen für Kauf1; zusätzlicher Moduswechsel für zweiten Kurs. Sichtbare Kasse/Vorräte, kein Gewinnsaldo im geprüften Buch. Ton war aus. H: [marketView901/903](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L901) und [bookView991](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L991) bieten bereits Vorräte, Einstand, Max-Mengen, Beleg und datierte Stadtpreise.

**Beibehalten, P1:** vorhandene Hilfen. **Verbessern:** zusammenhängende Kosteninformation. Aufwand niedrig bis mittel; Y: Originalbuch/Abakus geben Atmosphäre, wiederholtes Umschalten kostet Übersicht. Hansefürst muss keine hilfreichen Menüs entfernen, um dem Original näherzukommen. Touch-/Audio-Spielspaß bleibt U.

## FIN-01 – Banken, Finanzen und Rentabilität

O: neuer Kredit150, Angebot31%/202Tage; Kredit kein Gewinn. Reiseabgänge14und31; Gebührenmeldungen je14, Rest17auf Rückwegungeklärt. Endanzeige Schulden Lübeck250. R1.08-Abgang35 lässt nach zwei Gebühren14 rechnerisch7offen. Bezeichnung „Liegegebühr“ wird für den neuen direkten Meldungsbeleg zu **Hafengebühr** präzisiert; historische Dateien unangetastet.

H: [advance874](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L874) berechnet Bank2%/Schuld6% je360Tage täglich effektiv; [warehouseRentDay158](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L158) Lagergebühren; [marketReceipt884](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L884) trennt Warengewinn ausdrücklich von Nebenkosten. Keine Annahme, dass ein Reisegesamtsaldo bereits vorhanden sei.

**Verbessern, P1:** Kosten/Kassenüberleitung je Reise, Finanzierung separat, bekannte und unbekannte Einstandswerte korrekt. Aufwand mittel; Y: klare Kosten stärken Vertrauen und Verlust-Erholung. Risiko: doppelte Kostenerfassung, falsche Zuordnung bei mehreren Schiffen und neuen Savefeldern. Originalzinssatz nicht ungeprüft übernehmen; seine Periodisierung U.

## SOC-01 – Badehaus und gesellschaftliches Leben

U: keine neue Originalaktion inR1.09. R1.08-Belege bleiben im JSON historisch erhalten. H: [bathView/takeBath906/907](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L906) enthalten15Gold/1Tag für Informationen und mögliche Sondergeschäfte.

**Weitere Forschung erforderlich, P2:** Informationseffekt von Grundmarkt trennen. Aufwand mittel; Y: Gerüchte können Orientierung/Atmosphäre fördern; Sonderpreise beeinflussen langfristige Rendite. Keine neue Funktion empfohlen, bevor bestehende Wirkung geprüft ist.

## POL-01 – Bürgermeister und Eldermann

U: keine neue Originalwahlbeobachtung/Formel. H: [politicalSupport/mayorQuote368](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L368), [hanseQuote400](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L400) und Wahl-/Vertragsfunktionen sind weiter statisch belegte Basis. Keine neue Rivalen-KI-Behauptung aus bloßen Namen.

**Beibehalten, P2:** vorhandener Aufbau. Aufwand mittel bis hoch bei Wirtschaftsänderung; Y: Spreads und Versorgung können politische Lieferdienste und Karrierefinanzierung verändern. Keine Balanceänderung ohne Zustimmung.

## LONG-01 – Langzeitmotivation und Schwierigkeit

O: drei lokale Warenversuche verlieren105Taler, ohne dass Vorräte dauerhaft verändert werden. Neue Rundreise mit lokalem Rostock-Rückverkauf senkt Kasse254→194, davon15Warenverlust und45Reiseabgänge. U: langfristige Rendite, Original-Endspiel und echte aktive Stunden.

**Weitere Forschung erforderlich, P1:**90aktiveStunden bleiben Projektziel. Aufwand hoch für spätere menschliche Langzeitvalidierung; Y: nachvollziehbare Chancen, Risiken und Erholung können motivieren. Hohe Spreads oder längere Wartezeiten allein belegen keine90Stunden Spielspaß. Spieljahre nicht in menschliche Stunden umrechnen.

## Priorisierte Vorschläge

1. **Verbessern:** Reisekosten-/Kassenbeleg, mittel, Risiko falscher Zuordnung/doppelter Kosten.
2. **Beibehalten:** datierte Preisnotizen, regionale Warenkunde, Max und Gebührenvorschau; vorhanden, kein Neubau.
3. **Weitere Forschung erforderlich:** Engpassreaktion, mittel bis hoch; Versorgung, Arbitrage, Saveverträglichkeit und politische Dienste berücksichtigen.
4. **Nicht übernehmen:** ungefähr30%Originalspread ohne Balancetest; technisch mittel, wirtschaftliche Wirkung hoch.
5. **Verbessern:** verständliche Marktursachen, mittel; nur tatsächlich berechnete Ursachen erklären.

Alle fünf Spaß-/Aufwandseinschätzungen sind **Hypothesen**. Keine Umsetzung, keine neue Simulation und keine Folgephase begonnen.
