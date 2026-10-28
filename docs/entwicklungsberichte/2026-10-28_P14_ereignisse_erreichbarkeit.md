# P1.4 – Erreichbarkeit seltener Stadtereignisse

**90 Tage sind im heutigen Modell eine plausible erste Reaktionsfrist für eine vorbereitete Einzellieferung aus jeder Stadt. Sie garantieren keine erfolgreiche Hilfskette.** Schlechter Zustand, entfernter Beschaffungsort, zweite Lieferung, Nachrichtenverzug und künftige Konkurrenz können die Reserve aufbrauchen.60 Tage sind deutlich enger;120 erleichtern lange Ketten, lösen aber fehlende Ware/Finanzierung nicht automatisch.

28.10.2026 Europe/Berlin · Basis **`ffc0bfad0e36e4547f7a5750bb68b169f93f8009`**, Branch `analysis/p14-voyage-times`. Produkt unverändert **0.8d.1b/V13**, HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Vorab geprüfter Analysecode **`86ad5c5bd650d8d9137b6c939d7e00c2faa30681`**; nachgeschaltetes lesendes Audit **`e07c973f1f5d78b3b8cdc4f954e465d7b275f6bd`**.

[Bestand/55 Paare](2026-10-28_P14_reisezeiten_bestand.md) · [Historischer Vergleich](2026-10-28_P14_historischer_vergleich.md) · [Entscheidung](2026-10-28_P14_entscheidung.md) · [sämtliche2.178 Erreichbarkeitszeilen](../../tests/analysis/phaseP14/results/reachability.csv) · [Rohwerte](../../tests/analysis/phaseP14/results/static-attempt1.json).

## Was bereits existiert und was Zukunft bleibt

Hungersnöte, Stadtbrände, Sturmfluten, Schiffsunglücke und ein gemeinsames neues Hilfsereignissystem sind **noch nicht produktiv implementiert**. Hier nur Erreichbarkeit auf Basis echter V13-Zeiten und hypothetischer neuer Fristen. Piraten/Sturm bei der heutigen Fahrt sind andere bestehende Mechaniken.

Schwere Hungersnot ungefähr alle fünf Spieljahre **in der gesamten Hanse** ist ein unbeschlossener Richtwert, keine heutige Ereignisrate. Bei360 Tagen/Jahr entspricht das rechnerisch etwa1.800 Tagen zwischen solchen globalen Ereignissen. Nicht elfmal separat „jede Stadt alle fünf Jahre“ ansetzen. Andere Katastrophen brauchen eigene Häufigkeiten/Leistungen; keine davon entwickelt.

## Annahmen der Erreichbarkeitsrechnung

Alle elf Ausgangsstädte × alle elf Ereignisorte, drei Typen, Zustände100/30%, ModelleA/B/C.11 Heimatfälle pro Kombination separat enthalten,110 verschiedene gerichtete Stadtverbindungen für die folgenden Zählungen. Zahlen wie110/110 sind **ungewichtete Fälle**, keine Spielwahrscheinlichkeiten oder Erfolgsquoten.

- **Geladen:** Ware bereits rechtmäßig verfügbar, sofortige Abfahrt, nur direkte Reisezeit.
- **Mit Vorlauf:**7 Tage Nachrichtenverzug plus10 Tage Vorbereitung, dann Fahrt. Beide Werte reine Sensitivitätsannahmen; keine vorhandene neue Nachrichtenmechanik behauptet.
- **Beschaffung:** erst zu einem tatsächlich vorhandenen anderen Ort als dem Krisenort, dann zum Ereignis; plus17 Tage. Günstigster und ungünstigster möglicher Lieferort ausgewiesen. Der Ausgangsort kann Lieferort sein. Keine Garantie, dass die Ware dort im Markt liegt, gekauft werden kann oder finanziert ist.
- **Zweite Lieferung:** erste direkte Lieferung, anschließend zum günstigsten anderen Beschaffungsort und zurück; plus17 Tage. Kein zusätzlicher täglicher Produktionsbonus oder kostenlose NPC-Ware.
- Ankunft spätestens am Fristtag zählt in der Rechnung als rechtzeitig; tatsächliche neue Hilfsabnahme/Reservierung am Fristende noch nicht implementiert. Stürme/Piraten verlängern heute nicht direkt die einzelne Fahrt; Piraten können aber eine Wiederbeschaffung nötig machen.

## 60,90 und120 Tage im Vergleich

Intakte Schiffe; jede Angabe zählt erreichbare unterschiedliche Stadtverbindungen von110. „Vorlauf“=17 Tage insgesamt; „ungünstige Beschaffung90“ wählt bewusst den entferntesten möglichen Beschaffungsort; kein realistisches Durchschnittsverhalten unterstellt.

| Modell / Typ | Längste Direktfahrt | Geladen60/90/120 | MitVorlauf60/90/120 | Ungünstige Beschaffung90 | Zweite Lieferung90 |
|---|---:|---:|---:|---:|---:|
|A / Schnigge|26|110/110/110|110/110/110|110/110|110/110|
|A / Kogge|35|110/110/110|110/110/110|110/110|110/110|
|A / Holk|47|110/110/110|106/110/110|76/110|107/110|
|B / Schnigge|30|110/110/110|110/110/110|110/110|110/110|
|B / Kogge|42|110/110/110|110/110/110|104/110|108/110|
|B / Holk|56|110/110/110|104/110/110|40/110|99/110|
|C / Schnigge|38|110/110/110|110/110/110|108/110|110/110|
|C / Kogge|54|110/110/110|104/110/110|46/110|102/110|
|C / Holk|73|104/110/110|90/110/110|2/110|91/110|

Für das heutige Modell sind alle direkten Fahrten selbst bei30% Zustand innerhalb60 Tagen möglich (maximal60). **Mit Vorlauf oder Beschaffung ist diese Aussage nicht mehr gleichbedeutend mit überall rechtzeitiger Hilfe.** Bei aktuellem beschädigtem Holk liegen mit17 Tagen Vorlauf alle110 direkten Ziele unter90, aber nur22/110 Fälle mit ungünstigster Beschaffung und96/110 günstigste zweite Lieferketten.

ModellC, Holk bei30%: längste Direktreise95 Tage;106/110 direkte Verbindungen innerhalb90, mit17 Tagen Vorlauf104/110, beste Beschaffung104/110, zweite Lieferung80/110. Bei120 Tagen alle direkten/mitVorlauf110, aber nur10/110 ungünstigste Beschaffungsketten und92/110 zweite Lieferketten. Deshalb selbst120 nicht als allgemeine Liefergarantie ausgeben.

**Modellschwäche:** B/C besitzen Abkürzungen über Zwischenstopps. Deshalb kann die „beste Beschaffung“ mit Zwischenhalt in einzelnen Fällen sogar schneller erscheinen als die direkte Fahrt. Das ist kein Gratistransport, sondern ein offener Konsistenzfehler dieser einfachen Vorschlagsformeln. Tabellen verwenden genau den eingefrorenen Stand und verschweigen ihn nicht. Keine eigenmächtige nachträgliche Siegerkalibrierung.

## Alle Ausgangsstädte bei90 Tagen

Jede Zahl bezieht sich auf die zehn anderen Ereignisorte. Mit intakter Kogge und17 Tagen Vorlauf sind **in A, B und C aus jeder Ausgangsstadt10/10 direkt erreichbar**. Unterschiede werden bei einer ungünstigen zusätzlichen Beschaffungsfahrt deutlich. Letzte Spalte zeigt den beschädigten Holk im strengeren ModellC mit17 Tagen Vorlauf.

| Ausgangsstadt | A ungünstige Beschaffung90 | B | C | C beschädigter Holk, Direkt+Vorlauf90 |
|---|---:|---:|---:|---:|
|Lübeck|10/10|10/10|6/10|10/10|
|Hamburg|10/10|10/10|7/10|10/10|
|Rostock|10/10|10/10|6/10|10/10|
|Stralsund|10/10|10/10|6/10|10/10|
|Stettin|10/10|10/10|6/10|10/10|
|Danzig|10/10|10/10|6/10|10/10|
|Bergen|10/10|8/10|0/10|9/10|
|Visby|10/10|10/10|7/10|10/10|
|Brügge|10/10|8/10|1/10|9/10|
|Nowgorod|10/10|10/10|1/10|7/10|
|Venlo|10/10|8/10|0/10|9/10|

Ein Ereignis in der eigenen Stadt hat mit vorhandener geeigneter Ware Reisezeit0. Müssen fremde Waren erst beschafft werden, ist auch für den Heimatfall Hin-/Rückfahrt nötig; das bildet die121er-Datentabelle ab. Ein vorhandenes Schiff am Krisenort spart nur Anreise, nicht automatisch Warenbeschaffung, Zahlung oder politische Leistungsnachweise.

## Konsequenzen für Fristen und faire Konkurrenz

**60 Tage:** Im aktuellen Modell für vorbereitete Direktfahrten gut, mit zusätzlichen Wegen für langsame Schiffe oft zu eng. UnterB/C gehen weitere Reaktionsmöglichkeiten verloren. Als einheitliche Frist schwerer seltener Hanseereignisse eher knapp.

**90 Tage:** UnterA/B breite Direktreaktion bei17 Tagen angenommener Verzögerung, auch bei beschädigten Schiffen. UnterC reichen für die langsamsten beschädigten Fernverbindungen nicht immer90. Als unbeschlossener Ausgangswert brauchbar, wenn möglichst früh und gleichberechtigt Nachricht ergeht, Teilmengen zählen und ein gemeinsamer Bedarf nicht vor der Nachricht bereits beliebig abgegriffen werden kann.

**120 Tage:** Mehr Beschaffungs-/Zweitlieferreserve, besonders für B/C und Binnenziele. Gleichzeitig längere Notlagenphase und potenziell mehr Belege; muss mit endlicher Menge/Erholungsregeln zusammenpassen. Nicht aus Reisezeiten allein die Ereignisdauer endgültig entscheiden.

Spieler und künftige Rivalen müssen dieselben Reise-/Zustands-/Kosten-/Nachrichtenregeln und denselben zentralen Restbedarf erhalten. Ein im Ziel ansässiger Kaufmann hat einen verständlichen örtlichen Vorteil; daraus darf kein kostenloser globaler NPC-Soforttransport werden. Konkurrenz braucht reale begrenzte Kasse und nachgewiesene Waren. Faire Reaktionschance bedeutet **nicht** garantierte Quote für jeden: Reihenfolge/Reservierungsfenster, Nachrichtenbeginn und Teilmengenverteilung sind noch zu entscheiden. Keine neue Rivalen-KI oder Reservierung implementiert.

Die beschlossenen [P1.3-Erkenntnisse](2026-10-27_P13_marktbalance.md) bleiben historische Daten: Ein öffentlicher Bedarf kann gedeckt sein, obwohl der freie Markt knapp bleibt; natürliche Marktknappheit kann sich schon während langer Anreise ändern. Ein90-Tage-Katastrophenereignis darf nicht allein durch seinen Kalender fortlaufend neue30er-Hilfsquoten erzeugen. Neue Frist, wirklicher Mangel und gemeinsamer Rest sind getrennte Fragen. Keine P1.3-Simulation erneut gestartet.

## Politische Beziehungen über die Hanse

Für die **künftige** Politik gelten die Vorgaben dieses Auftrags: Bürgermeisterwahl in Heimatstadt; Eldermann erst als Bürgermeister; örtliche Wähler/Vertrauen und nachgewiesene Beziehungen in mehreren Städten; ohne Beziehungen zunächst keine dortige Eldermannunterstützung. Keine Gold-/Altansehens-Stimmenumrechnung, ganzjährige Unterstützung ohne besondere Wahlkampfphase, echte begrenzte Rivalenressourcen. Das bestehende V13-Altpolitiksystem ist damit noch nicht ersetzt.

Als reine Wegsumme kann eine gesunde Kogge beispielsweise `Lübeck→Rostock→Stralsund→Stettin→Danzig→Visby→Nowgorod→Bergen→Hamburg→Brügge→Venlo→Lübeck` alle elf Städte besuchen:102 Tage inA,117 inB,143 inC;11 Gebühren=66 Gold. **Keine Optimierungsbehauptung, Handelskarriere oder bereits dadurch erworbene Unterstützung.** Aktionen, Aufenthalte, Beschaffung, Schaden und Rückkehrpflicht zum Heimatamt kommen dazu. Diese Größenordnung ermöglicht grundsätzlich überregionale Beziehungspflege innerhalb mehrerer Spieljahre; sie beweist keinen erfolgreichen Bürgermeister-/Eldermannweg.

Investitionen in weniger profitable Städte dürfen als tatsächliche politische Leistungen Gold kosten. Längere Wege sollten solche Besuche bewusst wertvoll machen, nicht profitable Routen als einzig finanzierbaren Weg erzwingen. Deshalb Nahwege behalten, Fernstrecken nur vorsichtig prüfen und keine bloße Reiseanwesenheit in Stimmen verwandeln. Kein Rückschluss von Spieltagen auf menschliche Spielstunden.
