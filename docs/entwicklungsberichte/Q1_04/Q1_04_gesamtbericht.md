# Q1.04 – Wirtschaftliche Entwicklung und Gildenaufnahme

29.10.2026 Europe/Berlin · **Prüfauftrag abgeschlossen, keine Aufnahmegebühr festgelegt und keine Gilde implementiert.**

Der untere datenabhängig ausgewählte Kandidat **1.100 Gold** ist ein vorläufiger Balancefavorit, keine beschlossene Gebühr.2.800 funktioniert in den geprüften Fällen ebenfalls, belastet frühe Rücklagen stärker.5.600 führt bei vorsichtiger Spielweise zu einem konkreten Handelsstillstand, obwohl eine erste einfache Rücklagenrechnung die Zahlung zuließ. Das ist die wichtigste Einschränkung des Sicherheitsmaßstabs.

## Ausgangspunkt und verbindliche Regeln

GitHub vor Beginn frisch geprüft: Entwicklungsbranch **`development/v04-foundation` bei `02ee6b8fc1507ad078b6b596c333e50d91eeea64`**, eigener Branch **`audit/q1-04-guild-economy`**. Produkt unverändert **0.8d.1b/V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Grundlagen: [Q1.01 bei d4cf428](https://github.com/psonnen-lgtm/Hansef-rst/tree/d4cf42868a5347ec6e660f52faafb8132df5b209/docs/entwicklungsberichte/Q1_01), [Q1.02 bei8b20432](https://github.com/psonnen-lgtm/Hansef-rst/tree/8b20432506940ef1d33bf7af7f162884eec63c01/docs/entwicklungsberichte/Q1_02), [Q1.03 bei15df03c](https://github.com/psonnen-lgtm/Hansef-rst/blob/15df03c02d6c3af3fdb9c8f24052f038885c2bb1/docs/entwicklungsberichte/Q1_03/Q1_03_gesamtbericht.md) und [damalige Matrix](https://github.com/psonnen-lgtm/Hansef-rst/blob/15df03c02d6c3af3fdb9c8f24052f038885c2bb1/docs/entwicklungsberichte/Q1_03/Q1_03_entscheidungsmatrix.csv). Eigene Auditbranches wurden nicht hineingemergt.

Neu beschlossen: einmaliger bewusster hanseweiter Eintritt, keine Aufnahmeaufgaben, keine festen politischen Vermögensgrenzen, Verdienste statt unmittelbarem politischem Handelsansehen, Schutz alter Titel/V13. Die bislang offenen Q1.03-Optionen dazu sind damit entschieden. Die Produktfunktionen wurden **nicht** entsprechend umgebaut. Offen bleibt die Gebühr.

## 1. Welche historischen Wirtschaftsdaten waren verwertbar?

1.500er-Archiv,90 integrierte1.5e-Läufe,2.250er-Auswertung und spätere0.6b/0.6c-Berichte sind lesbar. Alte Produktquellen sind anhand gespeicherter Hashes abrufbar. `results.json.gz` und `phase1-results.json.gz` sind **derselbe byteidentische1.500er-Bestand**, keine zusätzlichen1.500 unabhängigen Läufe.

Frühe Archive stammen vom älteren Hash42db1b… mit anderer Wirtschaft/Strategien; optimierte und adversarielle Regeln nutzen teils fremde Livepreise. Liefer-/Erholungs-/Langhandelsläufe haben unterschiedliche Endbedingungen. Verwertbar als historische Fluss-/Risiko-/Reproduktionshinweise, **nicht** als heutige V13-Spielerquote oder Gebührenbasis. [Datenbasisbericht](Q1_04_historische_testbasis.md).

## 2. Wie schnell entwickeln sich Bargeld und Vermögen tatsächlich?

In zehn kleinen aktuellen Baselines starten alle mit5.000 Gold und einer Kogge in Lübeck; aggressiv zusätzlich1.500 Kredit. Nach118–120 simulierten Tagen betragen die Kassen **26.860–47.483 Gold**, ohne Aufnahmeausgabe. Buchvermögen31.820–50.566,63 enthält Schiffskapital und ist nicht vollständig ausgabefähig. Aggressive Kassen enthalten noch1.529,17–1.529,42 Schuld.

10.000 Bargeld werden je Stil erstmals nach6–31 Tagen beobachtet, aggressive Werte teils kreditfinanziert;20.000 nach42–74. Das sind konkrete Seed-/Regelergebnisse, keine allgemeine Spieldauerprognose. Keine menschliche aktive Zeit gemessen. [Verläufe, Meilensteine und Kapitalzerlegung](Q1_04_wirtschaftsentwicklung.md).

## 3. Wie groß sind die Strategieunterschiede?

Endkassen über je zwei Seeds: vorsichtig26.860–30.309, normal29.858–34.635, aggressiv36.815–47.483, beobachtungsoptimiert35.341–40.933, nach zwei ungünstigen Anfangsgeschäften27.241–28.899. Die neue optimierte Heuristik hat keine Zukunftsinformationen und ist nicht immer Gewinner. Aggressiver Vorteil ist nicht nur Risikoverhalten, sondern auch Kreditfinanzierung. Keine breite Spielerstil-Rangliste aus zwei Seeds.

## 4. Wann sind größere einmalige Ausgaben tragbar?

1.100/2.800 sind nominal schon aus5.000 Startgeld bezahlbar und in den zehn Baselines auch beim einfachen Rücklagenproxy sofort gedeckt. In jeweils fünf tatsächlichen Zahlungsszenarien bleibt anschließend Handel aktiv. Wirtschaftlich liegt der Beitritt hier **früh**; eine mehrjährige Ansparpflicht ist daraus nicht ableitbar.

5.600 erreicht der einfache Rücklagenproxy anTag4–19. Gerade das reicht nicht als Tragfähigkeitsnachweis: Restgeld muss auch zum individuellen Betriebskapital passen. Normales Buchvermögen oder „erstmals genug Bargeld“ genügt nicht. Rücklagen sind Analyse-/Beratungskriterium, **keine neue verpflichtende Beitrittsaufgabe oder Vermögensgrenze**.

## 5. Wie hoch ist das Stillstandsrisiko?

Baseline0/10 geldbedingte Abfahrtsblockaden und0/10 stagnierende letzte30 Tage. Gegenläufe0/15 technische Abfahrtsblockaden, aber **1/15 strategischer Handelsstillstand**, konkret1/5 bei5.600. Nach Zahlung bleibt dem vorsichtigen Stil618, weniger als sein800-G-Betriebspuffer. Keine weiteren Einkäufe, Schluss552 Gold nach weiteren leeren Reisen; Buchvermögen trotzdem5.034,60.

Das ist kein Beweis dauerhafter spielweiter Zahlungsunfähigkeit: der Mensch könnte anders handeln/finanzieren. Es ist ein echter negativer Befund für diesen Gebühren-/Strategiefall und zeigt die Unzulänglichkeit der einfachen Reserve. Anteile sind Fallzählungen, **keine Wahrscheinlichkeiten für alle Spieler**. Harte historische20/30-Verlustkrisen nicht erneut simuliert.

## 6. Welche Gebührenkandidaten ergeben sich?

Erst nach dem Pilot und zehn Baselines:25%-Quantil freier schuldengepufferter Kassen anTag30/31=**11.221**. Vorab definierte Rasteranteile10/25/50%, auf100 abgerundet: **1.100 /2.800 /5.600**. Keine vorher favorisierte Goldgebühr übernommen. [Auswahlrohdatei](../../../tests/analysis/q1_04/results/fees.json).

| Kandidat | Nominal bei neuem Start | R0 irgendwann gedeckt, Baselines | Aktiver fortgesetzter Handel nach echter Testzahlung |
|---|---:|---:|---:|
|1.100 |10/10 |10/10 |5/5 |
|2.800 |10/10 |10/10 |5/5 |
|5.600 |0/10 |10/10 |4/5 |

Bei5.600 kann aggressiv nach Kreditaufnahme bereitsTag0 nominal genug Bargeld haben, die Schuldreserve verhindert die Gleichsetzung mit freiem Kapital. NurSeed10001 wurde bezahlt fortgesetzt, nicht alle zehn Baselines. [Vollständiges Balancing](Q1_04_gildenbeitritt_balancing.md).

## 7. Welche Gebühr wäre aus Balancingsicht empfehlenswert?

**Vorläufig1.100 als unterer geprüfter Kandidat**, keine Festlegung.22% Startbargeld, normalerweise3.900 danach und in allen fünf bezahlten Stilen aktive Fortsetzung.2.800 verursacht56% Startbargeldbelastung ohne belegten zusätzlichen Spielspaß.5.600 vorerst nicht empfehlen. Niedrigere/feinere Gebühren wurden nicht vergleichend geprüft;1.100 ist kein bewiesenes Optimum und keine allgemeine Sicherheitsgarantie. [Entscheidungsvorlage](Q1_04_entscheidungsvorlage.md).

## 8. Welche Unsicherheiten bleiben?

Nur zwei Seeds, Lübeck, eine Kogge, kurze Zeit, keine menschlichen Entscheidungen. Keine Flotten-/Lager-/Bau-/Auftrags-/Informationskaufstrategie. Gebührengegenläufe ein Seed. Der nach dem Gegenfall erweiterte Reservecheck ist **nachträgliche Diagnose**, nicht unabhängig prognostisch validiert und nicht zum Neuberechnen schönerer Pfade benutzt. W1/W2 nicht integriert, Q-001/Q-003 offen.90 aktive Stunden bis Eldermann bleiben Produktziel; die hier gemessenen Tage/Zyklen liefern keine Stundenumrechnung.

## 9. Was wurde ausgeführt und bestanden?

- Historische JSON/GZ und Manifestdaten gelesen, Aliasgleichheit und historische Quellhashes geprüft; keine alte Simulation gestartet.
- Ein aktueller Pilot plus exakte Wiederholung, danach neun weitere Baselines und15 einmalige Zahlungsszenarien: **26 Ausführungen,25 verschiedene Pfade**, höchstens120 Tage/60 Zyklen, alle technischen Kassen-/Schulden-/Nettogeldassertionen bestanden.
- Reine Planer-VM ohne Spielglobale, tatsächliche Eingaben gespeichert, keine fremden Livepreise; native Funktionskörper/Quellenhash unverändert.
-25 gespeicherte unterschiedliche Bilanzen unabhängig lesend geprüft; Tabellen/CSV erzeugt. Fünf-Stile-Gebührenvergleich wirtschaftlich nicht vollständig bestanden: hoher vorsichtiger Fall stagniert.
- Rein lesende nachträgliche Reserve-Diagnose, keine weitere Spielpartie oder Kandidatenanpassung.

Keine umfangreichen Serien, politische Karriere, produktiven Änderungen, Migration oder Browser-/Gerätetests. [Befehle, Commits und genaue Grenzen](Q1_04_simulationsgrenzen.md). Kein unerwarteter technischer Testabbruch, keine heimliche Wiederholung. Expliziter kleiner Prüfauftrag überstimmt AGENTS-Großsimulationsregel.

## 10. Veröffentlichte Dateien

Sechs angeforderte Berichte: [Gesamtbericht](Q1_04_gesamtbericht.md), [historische Testbasis](Q1_04_historische_testbasis.md), [Wirtschaftsentwicklung](Q1_04_wirtschaftsentwicklung.md), [Gildenbalancing](Q1_04_gildenbeitritt_balancing.md), [Simulationsgrenzen](Q1_04_simulationsgrenzen.md), [Entscheidungsvorlage](Q1_04_entscheidungsvorlage.md). Berichtsindex ergänzt.

Strukturierte Daten: [Baseline-CSV](../../../tests/analysis/q1_04/results/baseline-summary.csv), [Gebührengegenläufe-CSV](../../../tests/analysis/q1_04/results/fee-continuations.csv), [Bezahlbarkeits-CSV](../../../tests/analysis/q1_04/results/affordability.csv), [Gesamtaudit JSON](../../../tests/analysis/q1_04/results/audit.json). Vollständige synthetische Start-/Endzustände, Ereignisse, Planungsinputs und Zeitpunkte in [Pilot](../../../tests/analysis/q1_04/results/pilot.json), [weiteren Baselines](../../../tests/analysis/q1_04/results/baseline.json) und [Zahlungsszenarien](../../../tests/analysis/q1_04/results/fee.json). Quellen/Plan/Prüfprogramme getrennt unter [tests/analysis/q1_04](../../../tests/analysis/q1_04/README.md).

## 11. Commits und direkte GitHub-Links

| Commit | Sicherung |
|---|---|
|`a8f949de15c0acd7d889e0eefcff0420c04d8069` |Historischer Leser und begrenzter Plan vor Ausführung |
|`637f74d514d80a89d064d9d230e569ddcf45726f` |Beobachtungsbasierte aktuelle Engine vor Pilot |
|`4688f7f5f3d00e5ed5f7302ab2fd1135916a9f70` |Erfolgreicher Pilot/Reproduktion, dann weitere Baselines ausgeführt |
|`a7a88317ec7fd8f1e506f6f415021363580552ff` |Zehn Baselines und datenabhängige Kandidaten gesichert, dann15 Zahlungsszenarien |
|`f5d5dec0a3bb30a4005435f8c57982a1f1093ba0` |Gegenläufe unverändert gesichert, lesendes Audit vor Ausführung |
|`1220b696caab56002706d7b7cfe05a67f7a13f71` |25 Audits/CSV und nachträglicher rein rechnerischer Diagnosecode vor Ausführung |

Abschlussberichte/Übergabe werden separat im letzten Sicherungsstand dokumentiert, keine selbstreferenzielle Testcommit-ID.

[GitHub-Gesamtbericht](https://github.com/psonnen-lgtm/Hansef-rst/blob/audit/q1-04-guild-economy/docs/entwicklungsberichte/Q1_04/Q1_04_gesamtbericht.md) · [Entscheidungsvorlage](https://github.com/psonnen-lgtm/Hansef-rst/blob/audit/q1-04-guild-economy/docs/entwicklungsberichte/Q1_04/Q1_04_entscheidungsvorlage.md) · [Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/audit/q1-04-guild-economy) · [Vergleich](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...audit/q1-04-guild-economy?expand=1).

Kein Merge, keine Änderung an main/Pages/echten Spielständen, keine Gilden-/Politikimplementierung. Entscheidung über die Aufnahmegebühr ausschließlich durch den Nutzer; keine automatische Folgephase.
