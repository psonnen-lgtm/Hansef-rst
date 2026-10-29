# Q1.07 – Politische Spielszenen und gesellschaftliche Anerkennung

29.10.2026 · **Konzept abgeschlossen, keine Umsetzung.** Eigener Branch `design/q1-07-political-scenes`, direkt von erneut remote bestätigtem Entwicklungsstand **02ee6b8fc1507ad078b6b596c333e50d91eeea64**. Produkt0.8d.1b/V13, Hauptdatei-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8` am Audittag erneut bestätigt. Keine Behauptung neuer Tests am Produkt. Der Prüfstand von Q1.06 ist damit weiterhin dieselbe Produktdatei.

## Vier spielbare Geschichten als Vorschlag

| Szene | Entscheidung | Nachweis und Konsequenz |
|---|---|---|
| A: Der leere Platz auf der Ratsbank | Versorgung und Ratsbrief mit Handel verbinden oder vorsichtig nacheinander angehen | Lieferung und Rückbericht getrennt belegt; Vorschlag Ratsherr aus beiden Tatarten. Zweiter Verlauf: Überinvestition, Verlustverkauf oder fehlende Zusage, alte Urkunde bleibt |
| B1: Fisch oder Pelze | Kurzfristige Versorgung oder länger stockendes Handwerk priorisieren | Nur die echte Lieferung erfüllt die gewählte Zusage; anderes Anliegen bleibt sichtbar, keine Preis-/Warenboni. Eigene gültige Herkunftsware kann neue Reise ersparen |
| B2: Zwei versiegelte Briefe | Eng begrenzte feste Lieferung oder ehrlicher datierter Auskunftsvertrag | Unterschiedliche Kapital-/Nachweisrisiken; Rückbericht allein reicht nicht für Lieferpflicht. Informationsnachweis ist neue Erweiterung, kein schon vorhandener Vertragstyp |
| C: Drei Siegel und ein gemeinsamer Satz | Mehrere Städte einigen sich auf Versorgung oder begrenzte Nachrichtenzusagen | Gleiche Vertragsfassung, wirkliche Zustimmung und erfüllte Verpflichtung statt Besuchsstempel. Amtsbewährung/Siegel/Räume bleiben; keine zusätzliche Pflicht-Rundreise |

Die Szenen sind vollständig im [Ratsherr-Ablauf](Q1_07_ratsherr_szene.md), [Bürgermeistergeschichten](Q1_07_buergermeister_szenen.md) und [Hansevertrag](Q1_07_eldermann_szene.md) erzählt. Zahlen, Termine und Eintrittsschwellen sind damit nicht neu beschlossen. Nicht jeder Rückschlag bedeutet Rufverlust; konkret nicht erfüllte neue Zusage bleibt aus, frühere Erfolge bleiben geschützt.

## Verbindliche Entscheidungen haben Vorrang

Der aktuelle Nutzerauftrag entscheidet **Modell C40/40/20**. Q1.06 empfahl A; diese Empfehlung ist durch den späteren Auftrag überholt. C wird nicht zurückgenommen, keine neue abschließende Formel festgelegt. Ebenso gelten: bewusster einmaliger hanseweiter Gildeneintritt ohne Aufnahmeaufgaben/weitere Vermögensgrenze;12500Gold vorläufig; kein politisches Eintrittsansehen. Kaufmann→Gilde→Ratsherr→Bürgermeister→Eldermann, Fernkaufmann freiwillig. Keine politischen Vermögensschranken, keine Ratsherr-Rabatte; normaler Handel, bloße Ankunft und Spende sind keine politischen Punktequellen im beschlossenen Zielbild.

**Noch nicht gleich Produktzustand:** Laut Q1.06 sind heutiger Mischruf und Vermögenshürden im Produkt weiterhin aktiv, Gildenstatus und neue Karriere nicht umgesetzt. Vorhandene Versorgungs-/Vereinbarungs-/Urkunden-/Amts-/Siegelstruktur ist wiederverwendbare Basis. Q-001 und Q-003 sind offen und werden durch Szenentexte nicht behoben. Keine neue Mechanik hier als bereits implementiert ausgegeben.

## Modell C und einmalige Anerkennung

Ein Lieferbeleg kann einen Dienst und eine daraus begründete Zusage beeinflussen; eine Vereinbarung kann ebenfalls in mehreren C-Komponenten wirken. Das ist echte Korrelation, nicht durch bloße eindeutige IDs gelöst. Vorgeschlagen wird ein kanonischer Tatbeleg mit Rückverweisen und abgeleiteter Unterstützung: keine zusätzliche Ereignis-XP oder separate Vollprämie für Dank, Teilhandlung und Vertragsabschluss. Keine verdeckte neue Punktwährung.

Offen bleibt, ob Zusagen weiter aus derselben Leistung abgeleitet oder stärker an sachlich andere Verpflichtungen gebunden werden. Letzteres verändert Qualifikation und braucht Nutzerentscheidung. C allein erzeugt weder Vielfalt noch Anti-Farming. [Gelegenheiten-/Anerkennungskonzept](Q1_07_politische_gelegenheiten.md).

## Gelegenheiten ohne Kalenderfarmen

Drei Ansätze: einmaliger Meilensteinbrief, zustandsgebundener Anlass, handgeschriebene Folge aus einer früheren Entscheidung. Empfehlung ist ein kleiner Hybrid: verlässlicher Einstieg plus echte Folgefrage, zunächst nur ein sauber geprüfter Marktanlass. Angebot bleibt für denselben Fall stabil, Abschluss einmalig; neue Öffnung/Tag/Schiffswechsel schafft keinen neuen Verdienst. Selbst erzeugte Knappheit, doppelte Teilabgabe und mehrfache Vertragsfassung brauchen spätere Schutzregeln; deren Zahlen/Frequenzen sind nicht beschlossen. Ohne Marktfälle bleibt ein anderes begründetes Vertragsanliegen erreichbar, nicht nur leeres Warten.

## Gesellschaft und Bedienung

Kleine freiwillige Szenen: Platz am Gildentisch, Dank mit Einschränkung, Brief im Kontor, skeptischer Badehausgast, Kirchendank ohne Stimmenkauf und Hafenkommentar nach realem Schaden. Die Gilde erhält eine gesellschaftliche Rolle, keine zweite politische Verwaltungsoberfläche. Die meisten Varianten brauchen lediglich Text-/Belegbezug und begrenzte Zustandsmerker, keine Händler-KI, Stadthaushalts- oder Kampfengine. [Optionale Ereignisse](Q1_07_gesellschaftliche_ereignisse.md).

Ein kurzer Brief je Entscheidung, höchstens zwei große Alternativen, Verpflichtung und Risiko vor Annahme sichtbar. Lange Erzähltexte sind Konzeptmaterial, keine erzwungene Smartphone-Lektüre. Ortsbesuch, Lagerware und vorhandene Handelsreise können politische Handlung tragen; keine Pflichtreise um ihrer selbst willen.

## Spielspaß und90 aktive Stunden

Mehr Verantwortung soll neue Entscheidungen schaffen: erst eigene Zusagen halten, dann lokale Anliegen priorisieren, später mehrere Interessen in einem tragfähigen Vertrag verbinden. Repetitive Großmengen und künstliche Wartezeiten sind keine Lösung. Ein Ratsherr-Szenario, zwei Bürgermeisterfälle und ein Höhepunkt reichen als Inhalt noch nicht zum Nachweis90 abwechslungsreicher Stunden. Alle Spaß-/Aufwandsurteile sind Hypothesen. [Bewertung und Karriereverteilung](Q1_07_spielspassbewertung.md).

Die R1.11-Budgets8/17/20/20/25 bleiben unverbindliche Zielabschnitte. Q1.05 simulierte Zahlungsfähigkeit ist keine aktive Zeitmessung; R1.12 lieferte keinen gemessenen Original-Gildenbeitritt. Keine Tage→Stunden-Umrechnung und kein neuer Spieltest in dieser Phase.

## Erste Empfehlung und noch offene Entscheidungen

Zuerst **A mit Rückschlagweg plus B1**, dazu eine kleine gesellschaftliche Rückmeldung, als später gesondert freizugebender vertikaler Ausschnitt. Keine universelle Ereignisengine. B2 und C zunächst inhaltlich abnehmen; Berichtsnachweis und Vertragsfassung nicht nebenbei als Textänderung implementieren. Grundlage vorher: sichere neue Karriere/Gilde, Anlassidentität, Anwesenheitsentscheidung und V13-Schutz. Keine neuen Pflichtaufgaben für die Gildenaufnahme.

Offen: Ratsherr-Qualifikation im Detail; Zusagenbindung und korrelierte Wirkung von C; echte neue Knappheit; Scheitern/Neuverhandlung; gleichwertige Informationsverträge; Anwesenheit versus Delegation; laufende Altvertragsregeln. [Kompakte Entscheidungsvorlage](Q1_07_entscheidungsvorlage.md) enthält acht konkrete Fragen. Kein Vorschlag ist Umsetzungsfreigabe.

## Quellen und Prüfgrenzen

Gelesen: [Q1.03](https://github.com/psonnen-lgtm/Hansef-rst/blob/15df03c02d6c3af3fdb9c8f24052f038885c2bb1/docs/entwicklungsberichte/Q1_03/Q1_03_gesamtbericht.md), [Q1.04](https://github.com/psonnen-lgtm/Hansef-rst/blob/e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36/docs/entwicklungsberichte/Q1_04/Q1_04_gesamtbericht.md), [Q1.05](https://github.com/psonnen-lgtm/Hansef-rst/blob/de4ae6b04268edc4292dfa07d37ca7680ebef4f8/docs/entwicklungsberichte/Q1_05/Q1_05_gesamtbericht.md), [Q1.06](https://github.com/psonnen-lgtm/Hansef-rst/blob/193e1d205181c608f40979902e5e9016fe12dd74/docs/entwicklungsberichte/Q1_06/Q1_06_gesamtbericht.md) samt Taten, Amtsfunktionen und Unterstützungsmodellen. Neuere explizite Nutzerentscheidungen haben Vorrang vor dortigen Empfehlungen.

Bestehende Funktionen nach dem commitgebundenen Q1.06-Inventar, keine neue vollständige Codeprüfung behauptet: `politicalOffer/Partner/Record/Support` (347–366/433ff), `completePoliticalSupply` (439ff), `witnessPoliticalJob/finishPoliticalAccord` (453–459), Amt/Fürsprecher/Vertrag (382–493), Ratstafel (555–605), Markt/Fremdherkunft (788–905), Stadt/Orte (878ff/1084ff). [Feste Hauptdatei](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L347). Der aktuelle Blobvergleich bestätigt dieselbe Datei. Keine bisherigen Tests erneut ausgeführt oder als neue Erfolge gezählt.

Acht Konzeptdokumente und angehängter Berichtsindex werden veröffentlicht und zurückgelesen. Produktdateien, Spielstände, alte Berichte, Wirtschaft und Pages bleiben unverändert. Keine Migration, Simulation, Exploitreparatur, neue Originalforschung oder Zusammenführung. Auftrag endet nach Sicherung; keine Folgeaufgabe gestartet.
