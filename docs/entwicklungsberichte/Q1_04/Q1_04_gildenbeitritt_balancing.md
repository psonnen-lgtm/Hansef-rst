# Q1.04 – Aufnahmegebühr, Rücklagen und tatsächliche Zahlungsszenarien

29.10.2026 · **Keine Gebühr festgelegt und keine Gilde implementiert.** [Gesamtbericht](Q1_04_gesamtbericht.md) · [Wirtschaftsdaten](Q1_04_wirtschaftsentwicklung.md) · [Entscheidung](Q1_04_entscheidungsvorlage.md).

## Beschlossen und offen

Einmaliger bewusster Eintritt, hanseweite Mitgliedschaft, keine Aufnahmeaufgaben; politische Ämter ohne feste Vermögensgrenzen, Aufstieg durch nachgewiesene Verdienste, kein unmittelbares politisches Handelsansehen, Schutz alter Titel/V13. Diese neuen Vorgaben haben Vorrang vor noch offenen Q1.03-Optionen. Gebühr und wirtschaftlich sinnvoller Zeitpunkt bleiben Nutzerentscheidung. Das aktuelle Produkt implementiert diese neue Politik noch nicht.

## Drei verschiedene Aussagen

**Nominal bezahlbar:** Bargeld≥Gebühr. Kein Schiff, Buchwert oder Kreditrahmen als Geld ausgeben.

**Rücklagen rechnerisch gedeckt:** Nach Gebühr bleibt genug für ein offengelegtes Wiederanlaufpaket. Zunächst geprüftes R0:

`10 Fass günstigste aktuell ausreichend verfügbare Ware + zwei eigene Hafengebühren +80 für einen weiteren maximalen Sturmschaden + volle aktuelle Reparatur + vorhandene Schuld + kurze Schuldzinsreserve + gebundene Mieten/Mietschuld`.

Das ist ein vorsichtiger **Analyseproxy**, keine vorhandene Spielregel. Die gesamte Schuld zu reservieren ist konservativer als das Spiel ohne feste Kreditfälligkeit. Ein billiger Warenkorb garantiert keinen Gewinn; die kurze Zinsreserve deckt nicht jedes denkbare Fernreiseprogramm. Alte vorhandene Waren/Schiffe werden nicht als neue freie Kasse gezählt.

**Wirtschaftliche Fortsetzbarkeit tatsächlich gestützt:** Im eigenen Zahlungsszenario weiter kaufen/verkaufen, nicht bloß leer reisen; in den letzten30 Tagen wenigstens ein Kauf und Verkauf, keine geldbedingte Abfahrtsblockade, am Ende nicht negative einfache freie Reserve. Das ist ein begrenztes Beobachtungskriterium, keine dauerhafte Existenzgarantie.

Rücklagenempfehlung ist **keine zusätzliche Aufnahmebedingung oder Vermögensgrenze**. Eine spätere freiwillige Warnung wäre gesondert zu entscheiden; hier nur Balancingmaßstab, kein neues Gilden-Zulassungsrecht.

## Gebühren erst nach den tatsächlichen Baselines ausgewählt

Vorab eingefrorene Regel: je zehn unterschiedliche Fälle erster beobachteter Nachverkaufszustand abTag30;25%-Quantil ihres schuldengepufferten freien Bargelds. Tatsächliche Referenzpunkte liegen anTag30/31, freie Werte9.817–15.325,23; unteres Quartil **11.221 Gold**. Keine menschliche Population und kein exakter Tages30-Schnitt.

Prüfraster10/25/50% dieser Referenz, jeweils auf100 abgerundet: **1.100 /2.800 /5.600 Gold**. Bruchteile sind eine vorab offengelegte Sensitivitätswahl, kein naturgesetzliches Gebührenoptimum. Insbesondere kein vorher bevorzugter500-G-Wert aus Q1.03 übernommen. Niedrigere/feinere Gebühren wurden nicht einzeln getestet.

[Auswahl samt zehn Referenzzuständen](../../../tests/analysis/q1_04/results/fees.json). Kandidaten und Ausgangsdaten wurden vor Zahlungsszenarien veröffentlicht; keine Auswahl nach gewünschter Bestehensquote.

## Bezahlbarkeit der zehn ungezahlten Basisfälle

| Kandidat | Anteil5.000 Startgold | Nominal beim neuen Start | Nominal bis Testende | R0 irgendwann gedeckt | Erste R0-Deckung, Tage min/Median/max |
|---|---:|---:|---:|---:|---:|
|1.100 |22% |10/10 |10/10 |10/10 |0 /0 /0 |
|2.800 |56% |10/10 |10/10 |10/10 |0 /0 /0 |
|5.600 |112% |0/10 |10/10 |10/10 |4 /4 /19 |

100% bedeutet nur zehn ausgewählte deterministische Baselinefälle, **keinen Anteil aller Spieler**. Aggressiv kann nach dem sofortigen1.500-G-Kredit5.600 nominal schon anTag0 bezahlen; die volle Schuld in R0 verhindert, dies schon als freie Aufnahmefinanzierung zu zählen. Deshalb nominaler Erstzeitpunkt bei5.600 über die Baselines0–19, Median4, tatsächliche R0-Deckung erst4–19.

| Kandidat | Restbargeld am ersten R0-Zeitpunkt min/Median/max | Nach R0 zusätzlich frei min/Median/max |
|---|---:|---:|
|1.100 |3.900 /3.900 /5.400 |3.657,03 /3.662,51 /3.668 |
|2.800 |2.200 /2.200 /3.700 |1.957,03 /1.962,51 /1.968 |
|5.600 |468 /1.391,50 /4.332 |177,57 /694 /2.588,06 |

Maximalwerte bei frühen Gebühren enthalten die Kreditentscheidung des aggressiven Stils, nicht dessen zusätzlichen Gewinn. R0 selbst enthält den Schuldpuffer. Dezimalmediane sind Rechenkennzahlen, keine halbierten tatsächlichen Goldzahlungen.

## 15 unabhängige Zahlungsszenarien, keine neue Gildenfunktion

Fünf Stile×drei Gebühren, jeweilsSeed10001. Gleicher gültiger Start wie ungezahlte Kontrolle. Einmalige reine **Testausgabe** beim ersten R0-gedeckten Nachverkaufspunkt; keine Mitgliedschaft, keine Produktfelder und keine Preis-/Regeländerung. Anschließend dieselbe jeweilige Handelsstrategie fortgesetzt. Seed10002 wird nicht ebenfalls mit Gebühren neu simuliert.

| Stil | Kandidat | Zahlungstag | Kasse direkt danach | Endkasse | Handel bis Ende aktiv? |
|---|---:|---:|---:|---:|---|
|Vorsichtig|1.100|0|3.900|28.859|ja|
|Vorsichtig|2.800|0|2.200|24.842|ja|
|Vorsichtig|5.600|4|618|552|**nein, Strategie-Stillstand**|
|Normal|1.100|0|3.900|33.607|ja|
|Normal|2.800|0|2.200|30.021|ja|
|Normal|5.600|4|1.479|27.608|ja|
|Aggressiv|1.100|0|5.400|49.520|ja|
|Aggressiv|2.800|0|3.700|40.993|ja|
|Aggressiv|5.600|4|4.332|41.963|ja|
|Beobachtungsoptimiert|1.100|0|3.900|39.911|ja|
|Beobachtungsoptimiert|2.800|0|2.200|37.379|ja|
|Beobachtungsoptimiert|5.600|4|1.766|24.112|ja|
|Schlechter Anfang→normal|1.100|0|3.900|26.127|ja|
|Schlechter Anfang→normal|2.800|0|2.200|22.604|ja|
|Schlechter Anfang→normal|5.600|15|1.619|20.168|ja|

Technisch15/15 Kassen-/Schulden-/Nettogeldbilanzen bestanden. Wirtschaftliches Fortsetzungskriterium: **1.100:5/5,2.800:5/5,5.600:4/5**. Alle fünf tatsächlichen Zahlungen erfolgten jeweils; die höhere Gebühr wird erst nach ersten Gewinnen tragbar geprüft. Nicht vollständige Zahlungsunfähigkeit mit Strategie-Stagnation vermischen.

Aggressiv mit1.100 endet sogar mit mehr Geld als die unbezahlte Kontrolle. Geänderter Kaufumfang/Preiszeitpunkt verändert spätere Wege/Ergebnisse. Das ist kein Beweis, dass eine Gebühr Gewinn erzeugt; keine monotonen Ertragskurven aus gepaarten Seeds behaupten.

## Wichtigster Gegenfall: R0 allein reicht nicht

Vorsichtig/5.600: nach einem Warentörn Kasse6.218, Zahlung anTag4, Rest **618**. R0=242, scheinbar zusätzlich376 frei. Die vorsichtige Regel hält aber mindestens **800** Gold zurück. Damit finanziert sie keinen weiteren Wareneinkauf. Elf weitere leere Fahrten verbrauchen66 Gebühren; Schluss anTag119 **552 Gold**, letzte Ware anTag4 verkauft, **kein einziger neuer Kauf nach der Zahlung**.

Schlussbuchvermögen5.034,60, davon4.482,60 Koggenbuchwert. Diesen positiven Betrag als gesundes Handelskapital zu interpretieren wäre irreführend. Das letzte Schiff ist nicht verkäuflich. Dennoch keine bewiesene allgemeine Sackgasse:552 reicht noch für eine Fahrt/kleine Ware, und ein Spieler könnte Strategie oder Finanzierung ändern. Der getestete vorsichtige Bot tut das nicht. Keine zusätzliche Rettungssimulation begonnen.

Die5.600-G-Variante erfüllt bei diesem frühen Zahlungszeitpunkt das wirtschaftliche Ziel für diesen Stil **nicht**, obwohl Rechnung/Speicherzustand korrekt sind. Ein späterer Beitritt mit größerem Puffer könnte anders ausfallen; er wurde nicht als zusätzlicher Gegenlauf getestet. Der Befund widerlegt die frühe R0-Freigabe, nicht die grundsätzliche Finanzierbarkeit jeder5.600-G-Gebühr. Das Ergebnis bleibt erhalten, keine nachträgliche Gebührenverschiebung oder angepasste Strategie als Ersatzlauf.

## Verbesserter wirtschaftlicher Maßstab – nachträgliche Diagnose, noch kein neuer Nachweis

Zusätzlich zu R0 muss das **eigene beabsichtigte Handelsprofil** finanzierbar bleiben: individuell zurückgehaltenes Betriebskapital plus ein neues reales Handels-/Reisepaket. Im vorsichtigen Gegenfall ergibt der einfache kombinierte Diagnosecheck `R0 + Strategie-Rückhalt =242+800=1.042`, mehr als618 Rest. Er hätte vor der scheinsicheren Freigabe gewarnt.

Die [separate lesende Diagnose](../../../tests/analysis/q1_04/results/reserve-diagnostic.json) wurde ausdrücklich **nach** dem beobachteten Gegenfall entwickelt. Sie ändert weder Kandidaten, Pfade, Geldbeträge noch Zeitpunkt der gespeicherten Zahlungen. Rechenprüfung über die zehn unveränderten Baselines verschiebt z.B.5.600 beim vorsichtigen Stil aufTag9/13 statt früherer R0-Deckung. **Kein Beweis**, dass spätere Zahlung dann in jeder neuen Partie sicher wäre; dafür wurden keine weiteren Läufe ausgeführt.

Für menschliche Beratung deshalb keine einzelne feste „notwendige Reserve“ versprechen. Gebundene Kosten/Schuld, gewünschte Ladungsgröße, vorsichtiger Rückhalt und tatsächliche Wiederanlaufmöglichkeiten zusammen zeigen. Gildenbeitritt darf den Wechsel zu riskanterem Handel/Kredit nicht faktisch erzwingen.

## Erholung und Empfehlung

Die zwei ungezahlten Fehlentscheidungspfade erholen sich nach zwei tatsächlich negativen Verkäufen bisTag15/16 wieder auf5.000 Nettogeld. Im bezahlten Seed10001 bleibt fortgesetzter Handel auch beim schlechten Anfang in allen drei Kandidaten beobachtet. Das beweist keine Sicherheit gegen die viel härteren historischen20/30-Verlustserien oder andere Seeds. Rücklagenprofil und Restkasse sind aussagekräftiger als ein hoher Buchwert.

**Wenn jetzt ein Balancefavorit benannt werden soll:1.100 Gold als unterer geprüfter Kandidat**, ohne Festlegung. Er lässt im gewöhnlichen Start3.900 zurück, macht22% Startbargeld aus und zeigt in allen fünf geprüften Stilen aktive Fortsetzung.2.800 ist technisch ebenso fortsetzbar, belastet die frühen Reserven mit56% aber deutlich stärker.5.600 vorerst nicht empfehlen: frühe nominelle Gewinne kaschieren einen konkret beobachteten vorsichtigen Handelsstillstand.

1.100 ist kein bewiesenes Optimum. Weniger hohe Gebühren, andere Städte/Schiffe/Seeds und menschliche Entscheidungen sind nicht vergleichend validiert. Wirtschaftlich liegt der Beitritt bei den beiden kleineren Kandidaten **früh, bereits vor dem ersten Törn möglich**, nicht zwangsläufig erst nach einer Handelskarriere. Eine höhere Gebühr nur zur künstlichen Verlängerung auf90 aktive Stunden wäre aus diesen Daten nicht begründet. Der Nutzer entscheidet allein über Preis und gewünschte Belastung.
