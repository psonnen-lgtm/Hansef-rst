# Phase 0.8d.2a.1 – festgelegte Kalibrierung, kein Spielpatch

27.10.2026 (Europe/Berlin). Basis `0c8db09056a7dd8e3881ba73684d244fcc3bc4fd`, Branch `analysis/phase08d2a1-price-calibration`. Unverändertes Spiel 0.8d.1b/V13, HTML-SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`.

## Vor Ergebnissen festgelegt

Genau die drei beauftragten Varianten **B1=220, B2=350, B3=500**. Kein zusätzlicher K-Wert, kein Tuning nach Daten. `E(k)=clamp(4,10^9,round_half_up(Pa*(K²+Sa²)/(K²+k²)))`. Kauf-/Verkaufssummen derselben festen ganzzahligen Übergänge wie [0.8d.2a](../phase08d2a/README.md). BigInt-Brüche und gemeinsame Anker bleiben erhalten. `getModel` akzeptiert ausschließlich diese drei Kennungen.

**Genau 54 neue kurze Arme**: Seeds 81001/81002/81003 × Kreise Lübeck/Salz↔Hamburg/Bier, Bergen/Fisch↔Lübeck/Getreide, Nowgorod/Pelze↔Brügge/Tuch × Richtlinien ≤22/≤90 × drei neue Kurven. Die neun vollständigen gespeicherten V13-Anfangsexporte aus `../phase08d2a/results/comparison-01/start-*.json` werden **gelesen**, nicht neu erzeugt. Beide alten Modelle A und H110 (im historischen JSON `B`) mit insgesamt 36 Armen ebenfalls nur lesen. Alte Manifeste, Skripte, Berichte und Rohdaten bleiben unverändert.

Der damalige Fahrt-/Entscheidungs-/Bilanzloop ist übernommen: 5.000 G, intakte unbewaffnete Kogge, keine Kredite, kein Bad-/Info-/Archivkauf, kein Neubau/Reparatur/Warten, feste Warenwahl ohne Fernpreis-Orakel. Menge begrenzt auf örtlichen Bestand, tatsächliche Kurvenkosten, Ladung und 6 G Abreisereserve. Eine nicht finanzierbare Wunschmenge wird kleiner geplant, nicht erfolglos ausgeführt. Leere fest geplante Fahrten bleiben wie damals zulässig. Diese einfache Mengenrichtlinie wird nicht während des Vergleichs verbessert.

Harte Grenzen je Arm: **12 Fahrten oder 120 Tage oder 30 Entscheidungen**, zuerst erreichte Grenze. Nächste zu lange Fahrt vor Kauf/Abreise ablehnen. Echte ursprüngliche Seed-Gefahren/Markt-/Politikregeln; keine zusätzliche risikofreie Vergleichsserie. Vollständiger Spiel- und RNG-Anfang identisch zu den historischen Armen, Quellhash und Source-Commit im Laufplan. Rohdaten jeden abgeschlossenen Arm sofort neu schreiben. Bestehendes Ergebnisverzeichnis verweigern. Kein Arm wiederholen, um schönere Zahlen zu erhalten.

## Vorrichtung und begrenzte Einzelprüfungen

Neue Dateien als explizite Ableitung der alten Module, ohne sie zu editieren:

- `quantity-model.cjs`: gleicher Rechenkern, `12100` wird `K²`, Vorschau aus identischer Quote. Keine vierte Variante.
- `harness.cjs`: gleiche HTML-VM, identischer RNG/Uhr/Handelsersetzungen/Tageshook. Analyseexport speichert jetzt die eindeutige Parameterkennung. Zusätzliche **nur in der VM** ergänzte Ankerhooks direkt nach originaler Sondertipp-Injektion beziehungsweise Ablauf. Diese Wege werden in den 54 Festkreisarmen nicht aufgerufen; sie dienen den ausdrücklich verlangten zeitlichen Einzelfixtures. Leerer ursprünglicher Markt ohne verfügbares Kaufangebot darf mit unveränderter gespeicherter Notierung geladen werden.
- `checks.cjs`: je Variante ursprüngliche technische 16 Gruppen weiterführen; zusätzliche feste Gruppen für Anfängerbudget/Einzelverlust+Folgegeschäft, vorhandene Schiffe/Mischladung, Sondertipps/Jahresgrenze, Belege und zeitlichen Anker. Keine weiteren Routenstrategien. Die A-Kennung der Vorrichtung wird nur für kleine Regel-/Exploitfixtures verwendet; keine alten 36 Verläufe neu gestartet.
- Statische Mengen: echte Güter Getreide/Salz/Pelze, ausdrücklich synthetische 16→24/31→46/110→165-G-Angebote bei Quellbestand180/Ziel110; Mengen1/5/10/20/25/45/50/90/140. Alle Summen korrekt, große teure Ladungen benötigen ausdrücklich ausreichendes Kapital. Keine Produktions-/Bestandsregel geändert.
- Budgetfälle 5.000/200/20 G, Schnigge/Kogge und feste Wunschmengen5/20/50/90, nur bezahlbare/zulässige Teile; Einzelverlust und günstiges kleines Folgegeschäft, keine ganze Rettungskarriere. Synthetische Gegenmärkte sind keine garantierten realen Reiseresultate.
- Zeitliche Anker: echte Tages-/Reisehooks, neues und bereits gespeichertes Sonderangebot/Ablauf, Jahreswechsel, vollständiger Analyseexport, unveränderte B-/C-Belege. Kontrollierte Zufallswerte in einzelnen Fixtures verbrauchen die ursprüngliche Ziehung weiterhin, ohne neue Spiel-Zufallsaufrufe.
- Rundungsbedingtes Reankern auch bei unveränderter Zielnotierung/-bestand statisch prüfen (6 Preise ×6 Ausgangsbestände je K); pro Variante höchstens einen tatsächlichen kontrollierten **Eintages**-Gegenfall nachvollziehen. Ein Warnbefund ist kein verschwiegener bestandener allgemeiner Arbitragebeweis.
- Rückhandel/Ansehen: vorhandene günstige Ware verkaufen/rückkaufen, gewichtete Kosten/Buch-/politisches Vermögen, FIFO und 90/9×10/90×1 untersuchen; keine Politikregel ändern.

Code und dieser Plan zuerst committen/veröffentlichen, danach Tests und genau eine neue Vergleichsserie. Fehlschläge unverändert protokollieren; nur notwendige Vorrichtungsreparaturen mit neuem Commit vor dem nächsten Versuch. Keine Parameteränderung.

```sh
node tests/analysis/phase08d2a1/checks.cjs <neues-qa-json>
node tests/analysis/phase08d2a1/compare.cjs <neues-vergleichsverzeichnis>
node tests/test-v04.cjs
HANSE_GAME=Hansefuerst_0_4.html node tests/phase1.cjs
```

V13 und dessen normale Exporte bleiben produktiv unverändert. Die vollständig analysemarkierte Exporthülle ist **kein** V14 und kein zur Spielseite gehörendes Speichersystem. Erhaltene Anker zeigen nur das Prinzip; produktive Quota/Mehrtabellen/Altclient-/Migrationssicherheit braucht einen späteren eigenen Auftrag. Keine Pages-/UI-Änderung, keine Vollkarriere, keine Folgephase. Die beiden geforderten neuen Berichte folgen nach Auswertung; ältere Berichte werden nicht ergänzt.
