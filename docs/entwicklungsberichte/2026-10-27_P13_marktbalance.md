# P1.3 – Marktreaktion und wirtschaftliche Grenzen

**Kleine öffentliche Quoten sind im kontrollierten Vergleich weniger belastend. Der Effekt hängt stark davon ab, wie viel zusätzliche Ware frei verkauft wird.**15/30 Fass sind ein begründeter vorsichtiger Vorschlag für Lübeck;60/90 keine aus diesen Daten ableitbaren Standardwerte.

Tatsächlich bearbeitet28.10.2026 Europe/Berlin; angeforderter Dateiname27.10. Basis **`bfdc410059bdf935b110382a775410e30d1bef0e`**, Branch `analysis/p13-supply-market-balance`. Produkt **0.8d.1b/V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**, unverändert. Tatsächlich dynamisch geprüfter Analysecode **`69e41bc4f630c52e223bab8c42b3df5e4d66698c`**, abschließendes rein lesendes Audit **`c1f15ecb147257e611c261c11a235a9b8f73cd03`**.

[Bedarfsregel](2026-10-27_P13_versorgungsbedarf.md) · [Entscheidung/Fehler/Prüfprotokoll](2026-10-27_P13_entscheidung.md) · [Rohdaten](../../tests/analysis/phaseP13/results/dynamic-attempt2.json) · [maßgebliches Audit](../../tests/analysis/phaseP13/results/audit-final.json) · [CSV](../../tests/analysis/phaseP13/results/ledger-final.csv).

## Methode und vergleichbare Ausgangslagen

Nur Lübeck/Getreide. Hauptvergleich:10.000 Gold, Holk mit90 bereits vorhandenen fremden Fass, bekannte Kosten8/Fass, Markt20 Fass zu30 Gold. Seed71201 nach kontrolliertem Fixtureaufbau. **Keine Beschaffungsreise, keine neue Preis-/Produktionsformel, kein B3/K500.** Tatsächliche `advance`, `regionalMarketDay`, `regionalStock`, `regionalPrice` aus HTML; ursprünglicher P1.2-Harness wiederverwendet.

Bei allen vier Hauptarmen werden90 Fass am ersten Tag abgegeben, lediglich der öffentliche Anteil0/15/30/60 unterscheidet sich. Der Marktüberhang bleibt normal handelbar. Gleiche Startpartie, täglicher RNG-Zustand einschließlich Ziehungszahl/Uhr gleich, andere120 Märkte am Ende gleich. B/C/Splits ebenfalls mit diesem Start/RNG verglichen. Das trennt den Mengeneffekt vom Zufall innerhalb dieses **einen** Seeds, ersetzt aber keine Untersuchung vieler Ausgangslagen.

Erholung vorab definiert: erstmals **zwei aufeinanderfolgende tatsächliche Tagesbeobachtungen mit freiem Bestand≥90**; Zahlen zählen Tage nach Lieferung. Der Sofortbestand allein zählt nicht. Eine erste Erholung kann später zurückfallen, deshalb unten auch Tage unter90 und Endstände. „Dauerhaft stabil“ wird daraus nicht abgeleitet.

## 1. Hauptvergleich – jeweils90 Fass Gesamtlieferung

Jede Zelle „Bestand / Preis“ meint frei käufliche Fass / Gold je Fass. V13 hat hier denselben normalen Kauf- und Verkaufskurs.

| Öffentlicher Anteil | Zusätzlich gegenüber normalem Verkauf dem freien Markt vorenthalten | Sofort | Nach7 Tagen | Nach30 Tagen | Nach60 Tagen | Nach90 Tagen | Erste Erholung |
|---|---:|---:|---:|---:|---:|---:|---:|
| Keine öffentliche Hilfe, normaler Verkauf90 |0 |110 /30 |111 /28 |113 /19 |115 /17 |132 /19 |2 Tage |
| Kleine Hilfe15, freier Rest75 |15 |95 /30 |96 /28 |102 /19 |108 /17 |129 /19 |2 Tage |
| Mittlere Hilfe30, freier Rest60 |30 |80 /30 |84 /28 |96 /20 |106 /18 |127 /20 |14 Tage |
| Größere Hilfe60, freier Rest30 |60 |50 /30 |57 /28 |75 /21 |91 /19 |118 /22 |61 Tage |

Alle90-Tage-Arme enden über90. Das ist **kein** Beweis, dass wiederholte Hilfe oder Fremdkäufe Märkte nie leeren. Ohne Käufe Dritter ist die Erholung günstiger als in einer aktiven Mehrspieler-/Rivalenwirtschaft.

| Hauptarm | Tage mit Bestand<90 von90 | Spätere Rückfalltage nach erster Erholung | Niedrigster Tagesbestand | Höchster Preisabstand zum zeitgleichen normalen Verkauf |
|---|---:|---:|---:|---:|
| Ohne öffentliche Abnahme |0 |0 |99 |0 G |
|15 |1 |1 |88 |1 G |
|30 |17 |5 |81 |1 G |
|60 |63 |5 |52 |3 G |

Preise sinken in diesem Seed insgesamt gegenüber anfänglich30, liegen aber bei größerer Entnahme zeitweise höher als im Vergleichsarm. Deshalb weder „unkontrollierte Inflation bewiesen“ noch „kein Preiseffekt“ behaupten. Die bestehende Preisformel reagiert weiterhin auf Bestand, Tageszufall und Rückkehr; kein Preisschutz eingebaut.

## 2. Reine Kleinlieferung und natürliche Erholung

Probe06: Schnigge,200 Gold,15 bereits vorhandene fremde Fass zu8. Vollständige A15-Hilfe zahlt450, Gold danach650, echter Warengewinn330. **Freier Markt bleibt20**, weil nichts als Überschuss frei verkauft wird. Nach7/30/60/90 Tagen:29/56/79/112 Fass, Preise29/23/22/24. Erste Erholung77 Tage,75 Tagesbeobachtungen unter90,13 höchstens40. Das ist wesentlich langsamer als der90-Fass-Gesamtlieferfall mit15 öffentlichem Anteil.

Probe09 ohne jeden Verkauf/ohne öffentliche Hilfe: dieselben Marktwerte und77 Tage Erholung.90 eigene Fass bleiben an Bord, Gold10.000. Die direkte öffentliche Übernahme vorhandener fremder Kleinlieferung verschlechtert den anfänglichen freien Markt nicht **gegenüber Nichtlieferung**; sie bringt ihm aber auch keinen Nachschub. Gegenüber einem gewöhnlichen15er-Verkauf fehlen ihm diese15 Fass. Dieser weitere exakt gepaarte15er-Verkaufsarm wurde nicht zusätzlich ausgeführt.

Der kleine Händler kann mit15 helfen, muss keinen ganzen30er-Bedarf allein decken und keine Spende leisten. Ein200-G-Händler könnte am örtlichen30-G-Markt nur6 Fass kaufen; Kauf und Rückgabe sind ohnehin keine neue Hilfe. Fremder Einkauf zu8 würde rechnerisch120 für15 kosten und80 Reserve lassen. **Beschaffung, Reisegebühr, Piraten, Reparaturen und tatsächliche Anfängerkarriere sind nicht simuliert.** Günstige Fremdware wird nicht garantiert. Die dargestellte Hilfe ist daher ein begrenzter Nachweis der Abnahme, kein voll geprüfter Anfängerweg.

## 3. Gold, Kosten und Ware

Keine neuen öffentlichen Zusatzprämien. A erhält den normalen Verkaufspreis, der auch ohne öffentliche Quote gezahlt würde. B verzichtet real auf Erlös; C entfernt echte Ware ohne erfundenen Geldabzug.

| Variante bei30 öffentlich/90 insgesamt | Tatsächliche Gesamterlöse | Goldende | Bekannte Kosten aller90 | Gesamtergebnis aus Waren | Freier Markt sofort |
|---|---:|---:|---:|---:|---:|
| A30 + regulärer Rest60 |2.700 |12.700 |720 |+1.980 |80 |
| B30 zu16 + regulärer Rest60 zu30 |2.280 |12.280 |720 |+1.560 |80 |
| C30 kostenlos + regulärer Rest60 |1.800 |11.800 |720 |+1.080 |80 |

B: öffentliche Zahlung480 statt900, Verzicht420, öffentlicher Warengewinn240 nach bekannten Kosten240. C: öffentliche Zahlung0, Warenaufwand240, entgangene Erlösmöglichkeit900; diese900 werden **nicht zusätzlich** vom Gold abgezogen. Restware60 erzielt normalen Gewinn1.320. Alle drei Varianten haben hier dieselben Bestands-/Preisfolgen und14 Tage erste Erholung. Spenden erzeugen keinen kostenlosen Marktbestand.

Bei A15/30/60 bleiben Gesamterlös2.700 und Gewinn1.980 gleich, weil alle90 zum normalen Preis verkauft werden. Öffentlich zuordenbare Erlöse450/900/1.800 und bekannte Kosten120/240/480 sind Teile davon, keine weiteren Zahlungen. Hoher Reichtum schafft keine zusätzlichen Bedarfstöpfe; eine kommunale Kasse oder Preisobergrenze wurde jedoch nicht modelliert. Extreme bereits mögliche V13-Kurse und deren Finanzierbarkeit sind nicht kalibriert.

Lesendes Audit aller **elf** abgeschlossenen Verläufe:

- `Goldende = Goldstart + echte Verkäufe − echte Käufe + echte Questprämien`.
- `Eigenwareende = Eigenwarestart + Käufe − Verkäufe − C-Gaben`.
- `Marktende = Marktstart + Verkäufe − Käufe − öffentliches A/B + beobachtete natürliche Bestandsänderungen`.
- Eigenware + freier Markt + endgültig öffentlich verbraucht ändern sich nur um den gesondert erfassten natürlichen Fluss.

Alle erfüllt. Keine Zinsen/Bank-/Mietschuld in diesen Fixtures, keine Reise-/Reparaturkosten; keine fiktiven Nullkostenbehauptungen für echte Handelskarrieren. Native Funktionen byte-/Funktionshashgleich, Waren-FIFO und Kostenregeln erhalten. Ursprünglich unbekannte Kosten würden weiterhin `null` bleiben; entsprechende P1.2-Probe nur historisch übernommen.

## 4. Wiederkehrende Hilfe – belegter Gegenfall und offene Langzeitfrage

Negativkontrolle10: A15 bei0/30/60 Tagen,45 weitere Fass am ersten Tag normal verkauft. Endgültiger Verbrauch45, verkauft90, Erlös2.370, Gold12.370, eigene Restware0. Markt sofort65, nach7/30/60/90 Tagen70/86/97/122, Preise28/20/18/20. Erste Erholung18 Tage, aber42 Tage unter90 und26 Rückfalltage danach. Drei Hilfsbelege trotz86 beziehungsweise97 am Markt bei den Wiederholungen zeigen den **Fehler der reinen Wartefrist**.

Gesamtbilanz:90 anfangs eigene +20 Markt +57 natürliche Nettozufuhr =122 Markt +45 öffentlicher Verbrauch. Keine verlorene oder doppelte Ware. Die späteren15er-Lieferungen sind nach endgültiger Abnahme nicht rückkaufbar.

**Wichtige Vergleichsgrenze:** Hier werden30 Fass später geliefert als in den Einmalarmen. Ein niedrigerer Marktstand gegenüber sofortiger90er-Lieferung ist daher nicht allein der Häufigkeit zuzurechnen. Ein passender Arm mit exakt gleichem Liefertakt und ohne öffentliche Abnahme wurde nicht zusätzlich ausgeführt. Auch echte wiederholte neue Notlagen unter empfohlenen Regeln sind nicht dynamisch nachgewiesen. Diese Probe belegt missbräuchlich mögliche Serienbelege, keine langfristige allgemeine Austrocknung.

Zusätzliche [vier reine Sensitivitätsrechnungen](../../tests/analysis/phaseP13/results/sensitivity.json), Code vor Rechnung **`3bb864a487e4c651fa3bfe7092cc805c4c5115e6`**: Die bestehende Bestandsrückkehr nutzt1,5%/Tag. Ohne Kappung/Zufall/Verhaltensänderung ergibt wiederholt gegenüber denselben normalen Lieferungen vorenthaltenes q alle T Tage den rechnerischen Bestandsabstand unmittelbar danach `q/(1−0,985^T)`:

| Reine Annahme | Näherungsweiser Abstand zum gleichen Liefertakt ohne öffentliche Entnahme |
|---|---:|
|15 alle30 Tage |41,15 Fass |
|30 alle90 Tage |40,36 Fass |
|60 alle90 Tage |80,71 Fass |
|30 alle360 Tage |30,13 Fass |

**Keine absoluten Gleichgewichtsbestände oder Simulationsergebnisse.** Die Rechnung erklärt, warum kleine, oft wiederholte Entnahmen kumulieren können und der Mengenverlust nicht nur einmalig zu betrachten ist. Sie legitimiert keine zusätzlichen Produktivformeln und ersetzt keine spätere begrenzte Entscheidung über chronische Hilfe.

Lübecker Getreide hat im vorhandenen regionalen Profil Rolle0. Ungekappter mittlerer Rückkehrbeitrag bei Bestand20/80/95 beträgt rechnerisch1,35/0,45/0,225 Fass täglich, zuzüglich bestehender zufälliger Schwankungen. Das ist die alte normale Marktversorgung, kein neu angelegter Bevölkerungs-/Produktionsbonus.

## 5. Risiken getrennt bewerten

| Risiko | Gesicherter Befund / verbleibende Unsicherheit |
|---|---|
| Markt austrocknen | Nach90 Tagen keiner der untersuchten90-Tage-Arme leer; aber volle kleine öffentliche Lieferung hält Markt lange knapp. Andere Käufer/Seeds/Jahre offen. |
| Preise steigen | Bis+1 G bei15/30, bis+3 bei60 gegenüber zeitgleichem Standardverkauf. Keine unbegrenzte Preissteigerung nachgewiesen, Langzeitrisiko nicht ausgeschlossen. |
| Ungewöhnliche Gewinne | Kein neuer Zusatzgewinn durch A gegenüber gleichem normalen Verkauf. Vorhandene hohe Kurse, Risiko-/Transportkosten und kommunale Finanzierung nicht vollständig geprüft. |
| Kleine Händler ausgeschlossen | Teilmenge15 mit200 Startgold und vorhandener Ware möglich; lokale Wiederbeschaffung teuer, günstige Beschaffung nicht garantiert. Keine Mindestflotte/-vermögen vorgeschlagen. |
| Zwang zur Getreideversorgung | Keine neue Spielpflicht/Strafe eingeführt. Spätere politische Alternativen/Ämterbalance offen; normale Lieferungen weiterhin möglich. |
| Regionale Knappheit verstärkt | Gegenüber normalem Verkauf fehlt öffentliches q tatsächlich. Gegenüber Nichtlieferung bleibt die Ware am Markt unverändert; beide Vergleiche auseinanderhalten. |
| Zu viele Hilfsbelege | Kalendernegativprobe tatsächlich fehlerhaft im Regelziel. Gemeinsame Menge/Erholung/rolling Budget mathematisch begrenzt, keine Anzahl-Klickprämie. |
| Alter Ansehens-/Kostenkreis | Probe11: Gold und Eigenmenge zurück, neue Hilfe0, altes globales Ansehen trotzdem+2. Nicht behoben, nicht in Stimmen übernehmen. |

Aus diesem Einzelmarkt/Seed folgen keine allgemeine Wirtschaftsbalance, Insolvenzquote oder Karrierezeit. Keine neuen1.500er-/2.250er-Serien, keine menschlichen Spielstundenprognosen.
