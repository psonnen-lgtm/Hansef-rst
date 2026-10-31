# Phase P1.2 – Wirtschaftliche Auswirkungen der öffentlichen Getreideabnahme

27.10.2026 · Europe/Berlin · **Isolierter technischer Prototyp, keine Produktivimplementierung oder Wahlstimmen.**

GitHub vor Beginn frisch geprüft: `development/v04-foundation` **`22fe3c4d92c9dbac439f247ac294104d388b2f6a`**, Merge #44, entspricht dem Auftrag. Neuer Branch **`analysis/p12-public-grain`**. Produktive HTML unverändert **0.8d.1b/V13**, letzter Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Adapter/Prüfprogramme vor Ausführung committet und veröffentlicht: **`6179fa16df15c49afb80e550ba5c43874b0da5d9`**. Alle zwölf tatsächlichen V13-Verläufe auf diesem unverändert gebliebenen Stand. Lesendes Bilanzaudit auf **`108c64231fa079641946f315f9bcbac4ae231e85`**, keine neuen Spielaufrufe. Spätere Berichtscommits sind keine erfundenen Testcode-IDs.

Untersucht ausschließlich **Lübeck/Stadtindex0, Getreide/Warenindex0**. Preise30/16 G, Bedarf90 Fass und 90-Tage-Belegfrist sind kontrollierte Testwerte, keine beschlossene Balance. Keine neue Rang-/Wahl-/Rivalenmechanik und keine neue produktive Speicherfassung. Alle historischen Ergebnisse/Berichte bleiben erhalten.

[Getreideversorgung und Schutzprüfungen](2026-10-27_P12_getreideversorgung.md) · [Wirtschaftliche Auswirkungen](2026-10-27_P12_wirtschaftliche_auswirkungen.md) · [Entscheidung und Übergabe](2026-10-27_P12_entscheidung.md).
## Hauptbefund

**A erhält denselben sofortigen Gewinn wie ein gewöhnlicher V13-Verkauf. Die öffentliche Abnahme lässt aber deutlich weniger freie Ware zurück und kann den späteren Preis erhöhen.** Im kontrollierten Vergleich nach sieben tatsächlichen Tagen: normaler Markt111 Fass/28 G, A/B/C jeweils 29 Fass/29 G. Keine Preisformel verändert, kein ausgleichender Produktionsbonus eingebaut.

Das ist ein relevanter Zielkonflikt: Die Bevölkerung erhält die 90 endgültig bestimmten Fass, während der **freie** Getreidemarkt zunächst knapp bleibt. „Öffentlicher Bedarf gedeckt“ und „jeder kann nun billig Getreide kaufen“ sind verschiedene Aussagen. Eine Produktiventscheidung muss diese Folge bewusst akzeptieren oder einen anderen Abnahme-/Bedarfsumfang beschließen.

## 1. Vier gleiche Ausgangssituationen

Identische vollständige V13-Startdaten:10.000 G, Holk90 Getreide zu gewichteten Kosten8, Herkunft Stadt1, Lübeck20 Fass/30 G, keine Bank/Schuld/anderen Kosten. Kontrollierter öffentlicher Bedarf90 bei den drei Adaptervarianten. Native Wirtschaft aus produktiver V13, kein B3-Modell. Kontrollierter Seed71201 nach Fixtureaufbau, RNG ohne zusätzliche Ziehungen durch Abnahme. Die identische Gesamtpartie wurde per Hash zwischen allen vier Starts geprüft.

Im normalen Referenzfall wurde außerdem unmittelbar wieder gekauft/verkauft; dies änderte Gold, Markt, RNG und Endlage vor den Tageswerten nicht. Die Vergleichszeiten bleiben jeweils sieben Tage, keine gemischten Langzeitkennzahlen.

| Direkt nach dem Verkauf/der Gabe | V13 ohne Abnahme | A normal | B fair16 | C Spende |
|---|---:|---:|---:|---:|
| Gold |12.700 |12.700 |11.440 |10.000 |
| Waren im Spielerbesitz |0 |0 |0 |0 |
| Frei verfügbarer Marktbestand |110 |20 |20 |20 |
| Endgültig öffentlich verbraucht |0 |90 |90 |90 |
| Öffentlicher Restbedarf |nicht geführt |0 |0 |0 |
| Regulärer nächster Kaufpreis |30 |30 |30 |30 |
| Regulärer nächster Verkaufspreis |30 |30 |30 |30 |
| Tatsächlicher Verkaufserlös |2.700 |2.700 |1.440 |0 |
| Warengewinn / Warenaufwand |+1.980 |+1.980 |+720 |−720 Aufwand |
| Finanzielles Buchvermögen |21.100 |21.100 |19.840 |18.400 |

B verzichtet wirklich auf1.260 G Erlös gegenüber dem damaligen Angebot, erhält aber weiter720 G Warengewinn. C verliert90 vorhandene Fass zu720 bekannten Einkaufskosten, kein fiktiver Verkauf und kein neuer Goldabzug. Die öffentliche Zahlung A/B folgt der bisherigen impliziten V13-Marktabnahme; ein neuer separater städtischer Geldhaushalt wurde nicht erfunden. Auch ein technisch begrenzter Bedarf ist noch kein getestetes kommunales Finanzbudget.

Bei B ist16 nur der freiwillige Ausführungskurs. Die **gewöhnliche** nächste Marktnotierung bleibt30; weder ein allgemeiner Billigpreis noch ein anschließendes Kaufangebot16 wird versprochen. Bei zu niedriger normaler Notierung ohne möglichen echten Rabatt wäre B nicht verfügbar; nur die kontrollierte30→16-Variante wurde ausgeführt.

## 2. Sieben wirkliche Tagesfortschreibungen

Unveränderte V13-`advance`/`regionalMarketDay`/`regionalPrice`/`regionalStock` führen die Tage aus. Keine Waren-/Preisschocks für diesen Vergleich nach der Startkonstruktion, keine Fahrten, keine zusätzlichen Handelsentscheidungen während der sieben Tage. Alle vier Arme haben je Tag identischen RNG-Zustand/Zeichnungszähler/Uhr; die übrigen120 Märkte stimmen nach sieben Tagen vollständig überein. Die einzige öffentliche Integration betrifft Lübeck/Getreide; globale native Tagesupdates bleiben Original.

| Vergangene Tage | Normal: Bestand/Preis | A/B/C: Bestand/Preis |
|---:|---:|---:|
| 1 | 117 / 30 G | 28 / 30 G |
| 2 | 113 / 30 G | 26 / 30 G |
| 3 | 110 / 30 G | 24 / 30 G |
| 4 | 114 / 30 G | 29 / 30 G |
| 5 | 111 / 30 G | 27 / 30 G |
| 6 | 108 / 30 G | 25 / 30 G |
| 7 | 111 / 28 G | 29 / 29 G |

Nach sieben Tagen sind somit82 Fass weniger frei verfügbar und der Stückpreis1 G höher (29 statt28). Dass genau diese Differenz in einem einzigen kontrollierten Seed entsteht, ist **kein** Beweis einer allgemeinen Inflationsrate, dauerhaften Drift oder künftigen Erreichbarkeit politischer Ziele. Es ist aber ein tatsächlicher Nebenwirkungsnachweis und keine bloße Vermutung.

Die regionale V13-Rückführung regeneriert die niedrige Menge etwas schneller: im Vergleichspfad +9 Fass bei Abnahme, +1 ohne. Sie gleicht die entfernten90 innerhalb der sieben Tage nicht aus. Die Politikschicht erzeugt daraus **keine** neuen Verbrauchs- oder Anerkennungsbelege.

### Warum der Effekt aus vorhandenen Regeln folgt

`regionalPrice` zieht zur alten Referenz `Basis×2/(1+(Bestand/110)²)` mit 2%-Rückführung. Bei Getreide/Bestand110 ist diese Referenz16, bei Bestand20 ungefähr30,98. Der Anker30 hat beim niedrigen Bestand daher einen anderen Rückführungsimpuls. Die Preisänderung wird wie bisher nur mit 35%-Chance pro Tag angestoßen; ihre Rundung kann einen Unterschied verbergen oder sichtbar machen.

Reine Aufrufe derselben tatsächlichen V13-Funktion mit Preis30/Basis16 und identischem Draw0,375 ergeben bei Bestand110 den Preis29, bei 20 den Preis30. Bei Draw0,125 entsprechend28 bzw.29. Das sind kleine deterministische Funktionsproben **ohne zusätzliche Spielverläufe oder RNG-Verbrauch**, keine neue Preisformel.

Auch `regionalStock` reagiert auf die tatsächliche freie Menge. Bei Draw0,5 ergibt der nächste Bestand aus110 wieder110, aus20 dagegen21. Ein solcher Tagesfluss ist die vorhandene abstrahierte Wirtschaft; nicht behaupten, einzelne Kundengeschäfte/Personenverbrauch seien daraus nachgewiesen. Die zusätzlich öffentlich entzogenen90 sind dagegen explizit bilanziert.

## 3. Weitere tatsächliche Handelsmöglichkeiten

Ohne Abnahme kann der Spieler direkt90 zum gleichen Kurs zurückkaufen; freie Ware110 erlaubt es. Mit finaler Abnahme liegen nur20 vor. Der bekannte unmittelbare Verkaufs-/Rückkaufzustand kann nicht mehr allein durch dieselben90 wiederhergestellt werden. Nach neuer echter Produktion/importierten Waren wäre späterer Kauf wieder erlaubt, aber dann liegt eine wirkliche ökonomische Änderung vor.

Im separaten Jahreswechseltest: zunächst20 eigene Entnahmen ausgleichen, daher von 90 verkauften nur70 öffentlich verbraucht. Markt20/Spieler20 nach Lieferung, nach zwei tatsächlichen Tagen Markt26; der90er-Kauf wird vom unveränderten V13-Bestandscheck verweigert. Kein Wahlsystem oder wirklicher Amtsgewinn wurde ausgeführt. Die Aussage betrifft den konkreten Warenrückholkreis, nicht alle denkbaren Mehrwaren-/Mehrstadt-/Langzeitstrategien.

Eine nachfolgende Getreidelieferung kann wegen des länger hohen Preises finanziell attraktiv bleiben, obwohl der öffentliche Bedarf bereits gedeckt ist. Dieser weitere reguläre Handel darf **keine** neue Anerkennung aus demselben Bedarf erzeugen. Der getestete Adapter lässt A nach gedecktem Bedarf normal verkaufen, Status`not_recognized`, und verweigert C ohne Restbedarf. Automatische neue Notlagen sind ausgeschaltet.

## 4. Kosten, Herkunft und bestehende Mechaniken

Gewichtete Einkaufskosten bleiben V13-Original. Nach Kauf20 zu30 zusätzlich zu90 alten Fass zu8 liegen110 zu durchschnittlich12 vor. Ein Verkauf90 verwendet genau diese 12; nach echtem FIFO-Verbrauch bleiben20 örtlich gekaufte Fass. Die öffentliche Anteilmenge70 ist davon getrennt, kein höherer politischer Buchwert.

Zwei eigene Schiffe/Lager:60 bekannte Fass zu8 und 60 unbekannte mit Ersatzbuchwert12 werden mit den vorhandenen Umladefunktionen verteilt. Die 60-Fass-Gabe eines daraus unbekannt gewichteten Bestands hat tatsächliche historische Kosten`null`, verbraucht aber640 vorhandenen Buchwert. Keine erfundenen FIFO-Kostenlose. Restlager30 behält unbekannte Kosten, Buchwert10⅔ und dieselbe fremde Herkunft. Zweites Schiff verkauft30 bekannte Fass; Gesamtgeld und sämtliche Mengen bleiben bilanziert.

Die bestehende globale Verkaufs-Ansehensformel ist unverändert: ein90er-A-Verkauf hier+2,9×10 und 90×1 hier+0. Neu sind nur genau 90 technisch anerkannte Fass, keine neuen Punkte. Ein späteres Wahlsystem darf diese alten Aktionspunkte nicht wieder als Lieferstimmen zählen. Das ist keine eigenmächtige Korrektur der alten Ansehensbalance.

Ein echter ursprünglicher90er-Lieferauftrag kann beim nativen A-Verkauf zusätzlich einmal100 G/+4 Ansehen zahlen. Er wird nicht als Warengewinn oder zusätzliche öffentliche Menge umetikettiert. Eine Gabe C hat keinen Verkaufsabschluss und erzeugt deshalb keine falsche Prämie. Preis-/Produktion, Schiffs-/Lagerkapazität, Bank, Schulden, politische Ämter und andere Warenregeln bleiben im produktiven Code unverändert.

## 5. Dokumentierter Zielkonflikt und Alternativen

| Weg | Vorteil | Problem / Entscheidung |
|---|---|---|
| **Endgültige Abnahme q, hier prototypisiert** | Tatsächliche Konsum-/Belegbilanz; verhindert konkretes Rückholen desselben frei käuflichen Vorrats. Normale Gewinne bleiben. | Zusätzlicher öffentlicher Verbrauch senkt freien Bestand; spätere Preise können höher sein. Menge, Häufigkeit, öffentliche Finanzierung und Wirkung müssen beschlossen werden. |
| Normalen Markt vollständig füllen, Hilfe nur beobachten | Freie Waren/Preise bleiben genau wie normaler Verkauf. | V13 beweist keinen endgültigen Bürgerverbrauch. Nur Warte-/Rücknahmeregeln beheben das dokumentierte Wahlterminproblem nicht vollständig. Keine gleichwertige sichere Ersatzlösung behaupten. |
| Geringere/anders begrenzte öffentliche Quote oder Aufteilung frei/öffentlich | Kann Eingriff und freie Marktknappheit begrenzen. | Konkreter Umfang nicht kalibriert, zusätzliche Entscheidung; nicht nach Ergebnis automatisch verändert. Nurq darf endgültige Anerkennung tragen. |

Eine kompensierende Preis- oder Produktionsformel wäre eine zusätzliche Wirtschaftsänderung; sie wurde **nicht** ausprobiert/eingebaut. Ebenso keine neuen Lager oder rivalisierende Handelsflotten. Eine einmalige kontrollierte90er-Abnahme erlaubt keine Aussage über langfristige Versorgung aller elf Städte.

## 6. Prüfgrundlage und Grenzen

[Zwölf Rohverläufe/Start-Endzustände](../../tests/analysis/phaseP12/results/checks-attempt1.json), [lesendes Bilanzaudit](../../tests/analysis/phaseP12/results/audit.json), [CSV](../../tests/analysis/phaseP12/results/ledger.csv). Das Audit prüft tatsächliche gespeicherte Ereignisse, führt aber die gesamte dynamische Preisfolge **nicht unabhängig erneut aus**. Beobachtete Tagesdifferenzen werden als solche in der Warenbilanz geführt.

Maximal sieben Tage pro Verlauf,0 Reisen. Keine großen Wirtschaftsserien, keine Produktivkalibrierung, keine menschliche Spielzeitprognose. Der wirtschaftliche Nebeneffekt ist belegt; seine gewünschte Größe und politische Anerkennung sind offen. Keine Freigabe zum automatischen Umbau von Marktformeln.
