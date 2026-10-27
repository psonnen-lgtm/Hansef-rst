# Phase P1.1 – Stadtversorgung, Preise und Schutz gegen Warenkreise

27.10.2026 · Europe/Berlin · **Regelentwurf und begrenzte Mathematik, keine produktive Implementierung.**

GitHub vor Beginn geprüft: `development/v04-foundation` **`808d3a981093d99b3b57be94bc96184191398066`**, Merge #43, entspricht dem Auftrag. Neuer Branch **`analysis/p11-year-round-support`**. Produktive HTML unverändert **0.8d.1b/V13**, letzter Spielcodecommit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**.

Erster vor Prüfungen gesicherter Rechenkern: **`edc0bc7cd6c3ab70843b97cc9f24ae86c66d3204`**. Abschließende13 Rechengruppen tatsächlich auf **`699b6d3b101e119e0c67d26115e04f7e4b2d021d`**, zusätzliche negative Wahlterminprobe auf **`12dc5d0dc61f805aa0c6842e3fb9766aabfa0944`**, sechs Mengenbilanzproben endgültiger Abnahme auf **`379a86099abc5e486f5f6f62c3b243c0bd691c2e`**. Alle zugehörigen Programme vorher committet/veröffentlicht; spätere Berichte sind keine selbstreferenziellen Teststände.

**Verbindlich:** ganzjährige Unterstützung ohne besondere Wahlkampfphase, aktive begrenzte Konkurrenz, echte absolute Stimmen, politischer Nutzen auch normaler hilfreicher Lieferungen, Schutz gegen Warenkreise und Bestandsschutz. **Nur Kalibrierungsvorschläge:** alle Gewichte, Schwellen, Fristen, Budgets, Mengen und die konkrete technische Umsetzung. Bestehende P1-Berichte bleiben historische Konzeptstände; widersprechende Vorschläge werden durch diesen neuen Entwurf ersetzt, nicht in alten Dateien korrigiert.

[Ganzjährige Unterstützung](2026-10-27_P11_ganzjaehrige_unterstuetzung.md) · [Stadtversorgung](2026-10-27_P11_stadtversorgung.md) · [Entscheidung und Prüfgrenzen](2026-10-27_P11_entscheidung.md).
## Empfehlung

**Ein gemeinsamer begrenzter öffentlicher Bedarf je Stadt/Ware; Stimmenrelevanz erst für endgültig abgenommene Mengen.** Der Spieler darf diese Menge normal mit Gewinn verkaufen, freiwillig günstiger verkaufen oder kostenlos geben. Politisch stärker gewertete Hilfsbereitschaft darf echte Kosten haben; normaler Gewinn schließt den öffentlichen Nutzen nicht aus.

Ein reiner Beleg über kurzzeitig mehr frei rückkaufbaren Marktbestand genügt nicht. Die 13 Rechengruppen prüfen einen solchen Mengenbeobachter; ein zusätzlicher Wahlgrenzenfall widerlegt seine allgemeine Eignung. Die empfohlene endgültige Abnahme ist eine anschließende **kleine Regeloption**, durch sechs Mengenbilanzen gestützt, noch nicht als integrierter Spielpatch geprüft oder freigegeben.

## 1. Was V13 wirklich kennt

[Produktive HTML an der Basis](https://github.com/psonnen-lgtm/Hansef-rst/blob/808d3a981093d99b3b57be94bc96184191398066/Hansefuerst_0_4.html):

| Funktion/Daten | Tatsächlicher Befund | Bedeutung für P1.1 |
|---|---|---|
| `initialMarkets`, `GOODS`, `REGIONAL_PROFILES` | Elf Städte/elf Waren, lokale Preise/Bestände, Rollen−1/0/+1. Getreide0/Basis16, Bier1/25, Salz3/31, Fisch4/22 | Bestehende Identitäten beibehalten; erste Versorgung vor allem Getreide/Fisch. Bier/Salz als wichtige ergänzende Bedarfe prüfen. Luxus/Hansegras nicht automatisch gleichwertige Nothilfe. |
| `regionalStock` | Bestehender regionaler Fluss, Rückkehr zu Referenz110, Zufall/Stochastikrundung, Begrenzung3–240; Tuch/Pelze0,35-Fluss, Bergen/Fisch1,5 | Rückgang ist **kein einzeln nachgewiesener Bürgerverbrauch**. Nicht jede entfernte Einheit als endgültig verzehrt buchen. |
| `regionalPrice`, `regionalMarketDay` | Preisupdate mit 35%-Chance, alte Preisformel, danach Bestandsfortschreibung; Grenze4 und alte Sonderrundung | Hoher Preis allein beweist keine Notlage. Keine neuen Ziehungen/Preisformeln zur Diagnose. |
| `regionalReport`/Information | Vorhandenes Wort „knapp“ bei Bestand≤60, eigene datierte Berichte | Nicht mit dem vorgeschlagenen strengeren öffentlichen Hilfsbedarf verwechseln. Alte Berichte unverändert. Keine kostenlose Fernpreiskarte. |
| `trade` | Sofortiger regulärer Einheitskurs, Verkauf erhöht Marktbestand um n; Kauf senkt ihn. Gleicher Preis bis Tagesänderung; bestehende Gewinne/Ansehen pro Aktion | Normale Versorgung ist wirtschaftlich real verfügbare Ware, bleibt aber käuflich. Neue Wahlwirkung nicht aus `sell.profit` oder Klickzahl ableiten. |
| `consumeOrigins`, `completeQuests`, `completePoliticalSupply`, `politicalTrade` | FIFO-Stadtherkunft, fremde nachgewiesene Menge, bestehende Quest-/Dienst-IDs; politischer Verkauf auf Kopie gespeichert | Herkunfts-/Geld-/Dienstfunktionen bewahren; nicht als individuelle Einkaufskostenlose missverstehen. Keine doppelte neue Wahlprämie für denselben Quellenbeleg. |
| `donate`, `donationGain`, `advance`, `politicsClock` |50/200 Gold, tatsächliches vermindertes Ansehen; Tage/Fristen/Wirtschaft laufen im bestehenden Takt | Neue Stimmen getrennt aus echten Zahlungen/Leistungen; keine Verwertung des alten manipulierbaren Gesamtscores. |

V13 besitzt keine Bevölkerungskonsumrechnung, keinen öffentlichen Warenvorrat und keine nachweisbare Markt-Kundenliste. „Markt fällt um5“ darf deshalb nicht als Beweis gelten, dass exakt fünf zuvor markierte Fass an Bürger verkauft wurden. Auch eine240er-Bestandskappung nach großer Lieferung ist kein solcher Verbrauch.

## 2. Echte Knappheit: kleine beobachtbare Regel

Vorschlag: zwei **aufeinanderfolgende reguläre Tagesbeobachtungen**, nach natürlicher Marktfortschreibung und vor neuen freiwilligen Handlungen. Kein erneutes Prüfen/Erzeugen durch Ansicht. Pro Stadt/Ware:

`bereinigterBestand = tatsächlicherMarktbestand + SummeOffenerEntnahmeschulden`.

Ein öffentlicher Bedarf kann bescheinigt werden, wenn beide bereinigten Beobachtungen≤40 sind. Bestand≤60 kann weiterhin allgemeine Knappheit heißen; die 40 ist ein unbeschlossener strengerer Vorschlag für politische Notlagen.

Preis≥125% des Warenbasiswerts stützt die Meldung, **ist aber weder alleiniger Auslöser noch Stimmenmultiplikator**. Echter sehr niedriger Bestand bei billigem Preis bleibt anerkennungsfähig; sonst würden bekannte niedrige Preiszustände Hilfe blockieren. Beispiel Getreide20 Fass/30 G: niedrig und teuer, Referenz110 ⇒90 Fass begrenzter Bedarf. Ein Preis100 bei Bestand70 eröffnet keinen Bedarf. Fass20 plus90 offene eigene Entnahmen ergibt bereinigt110 ⇒ keine künstlich erzeugte Notlage.

Mengenrahmen: `R=min(90,max(0,110−max(bereinigteBeobachtungen)))`. Es gibt **einen** gemeinsamen R-Topf für A/B/C und alle Akteure. Kein eigener90er-Vorrat pro Kandidat, Schiff oder Liefermodus. R ist eine kleine öffentliche Abnahmequote, kein neues simuliertes weltweites Nachfrage-/Lagersystem und keine behauptete Zahl versorgter Personen.

Bescheinigung enthält IDs, Ware/Stadt, beide Beobachtungsdaten/Bestände/Entnahmeschulden, Basis-/damaligen Preis, Restmenge, Gültigkeit und verwendete Quellen. Maximal90 Tage Gültigkeit als Kalibrierungsvorschlag; Öffnen/Abbruch/Laden verlängert sie nicht. Eine neue Bescheinigung braucht neuen eindeutigen Zeitpunkt/Grund und darf nicht allein wegen eines leeren alten Topfs entstehen.

Der mathematisch geprüfte konservative Beobachter verlangt vor einer neuen Notlage zusätzlich Ablauf der alten Frist und zwei Erholungsbeobachtungen≥90. Das kann dauerhaft importabhängige Städte zu stark ausschließen. Für chronische echte Knappheit wäre eine explizite begrenzte Fortschreibung z.B. nach 90 Tagen möglich, **aber nur mit erneut wirklich benötigten und endgültig verbrauchten Mengen**. Diese Wiederholungsregel ist offen; die kleine Erstimplementierungsprobe sollte zunächst keine automatischen Folgebescheinigungen erzeugen.

**Grenze:** bereinigter Bestand ist ein konservativer Schutzsaldo, kein exakter Markt „ohne Spieler“. Bestehende Produktion/Rundung reagieren auf den tatsächlichen Bestand. Alle Marktänderer und lange dynamische Folgen sind noch nicht durchgespielt. Sondertipp-/manuell überschriebene Bestandsbeobachtungen werden im Modell ausgeschlossen; eine spätere Umsetzung muss vom Spieler verursachte Sonderabzüge ebenfalls als Ursache/Schuld verfolgen. Zwei bloße Tagesmarken ersetzen keinen Herkunftsnachweis einer Marktänderung.

## 3. Entnahmen zuerst ausgleichen, eigentümerweit

Je tatsächlichem Akteur/Stadt/Ware ein persistenter Schuldstand D aus früheren Nettoentnahmen. Kein Bezug zu Einkaufsbuchwert oder politischem Vermögen. Alle eigenen Schiffe/Lager gehören demselben Akteur. Jahreswechsel, Wahl, Ansicht, Import und neue Notlagen setzen D nicht zurück.

Für denselben Tag vor neuer Anerkennung: sämtliche regulären Verkäufe V, Käufe K und vorbestehendes D zusammenfassen. Eigene Wiedergutmachung zuerst:

`Dneu=max(0,Dalt+K−V)`

`neueMengenchance=max(0,V−K−Dalt)`

`anrechenbareFremdmenge≤min(nachgewiesenFremd,neueMengenchance,Restbedarf)`.

90 gekauft/90 zurückverkauft ⇒0 neue Mengenchance, unabhängig von Klicks oder durchschnittlichen Buchkosten. Nach80 früher entnommenen Fass ergeben90 zurückgebrachte höchstens 10 neue Hilfsfass. Die anderen80 sind Wiederherstellung, keine frische Retterleistung. Unbekannte/örtliche Herkunft schafft keine fiktive neue Fremdlieferung. Diese konservative Regel kann regelmäßig exportierende Kaufleute später lange als Wiederhersteller behandeln; das ist offen zu bewerten und muss sichtbar sein, nicht heimlich verfallen.

Für eine Warenspende gilt: vorhandene Entnahmeschuld derselben Ware in dieser Stadt muss vorher durch wirkliche Marktrückgabe ausgeglichen sein. Die Spende darf nicht gleichzeitig den freien Markt entleeren, eine Notlage erzeugen und dafür Vertrauen kassieren. Öffentliche Spende füllt den freien Markt nicht wieder auf, deshalb löscht sie D nicht einfach. Frühere endgültige Hilfsleistungen bleiben historische Verdienste; neue Entnahme ist eine neue Handlung.

Die vorhandenen tatsächlichen FIFO-Ursprünge bleiben unangetastet. Der Beobachter verbraucht/liest sie bei der echten Transaktion, rekonstruiert keine fremden Lose aus politischen Punkten. Bestehende Quest-/Ratsprämien bleiben eigene beurkundete Mechaniken, keine zusätzliche normale Handelsmarge. Eine Quelle darf für neue Wahlleistung nicht unter Verkauf, Ratsauftrag und Zusage dreimal voll zählen.

## 4. A/B/C – gleicher Bedarf, unterschiedliche Großzügigkeit

| Variante | Wirtschaftliche Regel des Vorschlags | Politische Leistung |
|---|---|---|
| **A normal** | Derselbe tatsächliche örtliche normale Verkaufspreis; Gewinn voll behalten |1 Einheit je endgültig bestätigtem Hilfsfass; kein Gewinnverbot, keine politische Einkommensgrenze. |
| **B fair** | Freiwilliger Preis unter dem tatsächlichen gleichzeitigen normalen Angebot; z.B.`max(4,min(Warenbasis,Normalpreis−1))`, nur falls strikt günstiger |1½ Einheiten je endgültig bestätigtem Fass. Bonus nur für echten Preisverzicht, nicht bloßes Umbenennen. |
| **C kostenlos** | Ware aus vorhandenem Bestand tatsächlich endgültig abgeben, Erlös0 |2 Einheiten je endgültig bestätigtem Fass, echter Warenaufwand. Kein erfundener negativer Verkauf/zusätzlicher Goldabzug. |

Vorschlagsbeispiel90 Fass mit bekannten Einkaufskosten8, normalem lokalen Preis30 und fairer Variante16:

| Variante | Erlös | Tatsächlicher Warengewinn/-aufwand | Bürgervertrauen | aktuelle Bürgerbeliebtheit | Unterstützer des Spielers im isolierten1.000-Wähler-Beispiel |
|---|---:|---:|---:|---:|---:|
| A |2.700 G |+1.980 G |284 |90 |212 |
| B |1.440 G |+720 G |344 |98 |246 |
| C |0 G |−720 G Warenaufwand |385 |102 |270 |

Andere Kandidaten und U verlieren genau die entsprechende Zahl vorhandener Personen. Die vier Gruppensummen bleiben1.000. Das sind Kalibrierungswerte der Unterstützungsformel bei als gültig angenommenem90-Fass-Beleg, keine allgemeine Stimmenprämie. Bei endgültiger Aufnahme müssen diese 90 tatsächlich bestätigt sein. Bei unbekannten Einkaufskosten keinen Gewinn erfinden; Bedürfnis/Preisverzicht und reale Menge sind trotzdem prüfbar.

B soll z.B. als freiwillige Preiswahl an der bestehenden lokalen Verkaufsmenge im Markt/Kontor auftauchen, mit normalem Vergleichserlös und sichtbarem Verzicht. C über bestehendes Kontor/Lager oder Rathausbedarfsbrief: verfügbare eigene Ware, Herkunft, Kostenunbekanntheit und endgültige Menge bestätigen. Kein neues großes Menü, keine Oberfläche gebaut. Fairer Ausführungspreis ändert nur den freiwilligen Erlös dieser Transaktion, nicht den normalen Marktpreis/dessen Formel. Das wäre künftig trotzdem eine neue Transaktionsoption, nicht bereits vorhandenes Verhalten.

## 5. Warum ein reiner Marktbeobachter nicht reicht

[13 Gruppen](../../tests/analysis/phaseP11/results/checks-attempt2.json) prüfen Nettozufuhr, Rücknahmeschulden, gemeinsame Quoten und exakte Unterstützungsformeln. A/B-Mengenbelege werden beim späteren Rückkauf berichtigt, auch an Tag 400; öffentliche echte Spende C bleibt. Alter Belegverlust eröffnet nicht unbeabsichtigt Plätze in einem **anderen** neuen Bedarfstopf. Negative Quellen-ID-/Warenbestandsprüfungen erkennen Duplikate und kostenlose Lieferfiktion.

Das Beobachterskript ist keine Produktvorlage: Bei Wiedergutmachung behandelt es seine Restquote bewusst als konservativen Anerkennungsrahmen. Dieser Restwert ist nicht mit einer künftig tatsächlich noch offenen öffentlichen Abnahmemenge gleichzusetzen. Die spätere finale Bilanz zählt allein die wirklich übernommenen q; das Beispiel mit 20 früher entnommenen/90 neuen Fass lässt deshalb20 tatsächlichen Restbedarf.

Aber [zusätzliche Wahlterminprobe](../../tests/analysis/phaseP11/results/election-boundary.json) widerlegt die allgemeine Freigabe:

- Tag 359:90 vorhandene Fass regulär verkaufen; Markt20→110, Gold10.000→12.700.
- Tag 360: Spieler211 Stimmen, höchste andere Zahl176; der Spieler könnte die reguläre Wahl gewinnen.
- Tag 361:90 zurückkaufen; Gold wieder10.000, eigene Ware90, Markt20. Politische aktuelle Spielerunterstützung nach Berichtigung0.
- Kein endgültiger Bürgerverbrauch wurde bewiesen. Ein später geschützter Wahlsieg wäre durch spätere Punkteberichtigung nicht beseitigt. Kein Amt wurde im Prüfprogramm tatsächlich vergeben.

**Dieser Probeausgang ist ein fehlgeschlagener politischer Abnahmepunkt**, kein bestandener Exploitschutz. Man könnte zeitweilige echte Verfügbarkeit am Wahlstichtag fachlich genügen lassen; dann wäre strategischer späterer Rückkauf aber bewusst zugelassen. Für das strenge Ziel gegen reines Warenkarussell empfehlen wir stattdessen endgültige Abnahme. Eine feste Wartezeit allein verschiebt den Angriff nur.

## 6. Kleinste belastbare Regeloption: endgültige öffentliche Abnahme

Für den bestätigten Teil q einer normalen/fairen Lieferung: normaler oder freiwilliger Erlös wird wie angeboten bezahlt, aber **q Fass gehen nachweislich unmittelbar an den begrenzten öffentlichen Bedarf statt zurück in den frei käuflichen Markt**. Bei Verkauf n:

`MarktbestandNeu = MarktbestandAlt + n − q`

`EigeneWareNeu = EigeneWareAlt − n`

`öffentlicherBedarfNeu = öffentlicherBedarfAlt − q`.

C nimmt nur die tatsächlich angenommene öffentliche Menge aus eigener Ware; nicht angenommene Reservierung bleibt beim Spender. Öffentliche Abnahme ist sofort endgültiger Verbrauch/Übergang, **kein neues handelbares Rathauslager**. Es braucht weder zweite Stadtpreise, zweite Produktion, simulierte Kunden noch eine neue laufende Weltverbrauchsrechnung.

Ein normaler gewinnbringender Verkauf kann so tatsächlich helfen und zählen. Nur nicht angenommener Rest bleibt gewöhnlicher, später kaufbarer Handelsbestand ohne diesen endgültigen Hilfsbeleg. Beleg, Gold, Ursprünge/Buchkosten, Marktbestand, Bedarf und politische Quelle müssen gemeinsam atomar gebucht werden. Eine noch offene Reservierung bekommt keine endgültigen Wahlstimmen.

Die sechs [zusätzlichen Mengenbilanzen](../../tests/analysis/phaseP11/results/final-receipts.json) zeigen:

- A/B/C mit 90 endgültig angenommenen Fass und anfänglich20 am Markt: danach jeweils 20 frei am Markt,90 beim öffentlichen Verbrauch,0 eigene Lieferware. A erhält2.700, B1.440, C0 Gold.
- Dieselben90 können nicht am unveränderten Markt zurückgekauft werden: nur20 sind noch frei. Selbst Kauf aller20 stellt den ursprünglichen eigenen Bestand90 nicht wieder her. Erst echte neue Warenzufuhr würde den Zustand ändern.
-20 vorher selbst entnommene Fass plus90 später verkaufte: erst20 Wiederherstellung, höchstens 70 endgültige neue Hilfe; ursprünglicher90er-Bedarf behält20 Rest. Eine reine20er-Kauf/Rückverkaufsrunde bringt0 neue Hilfe.
- Zwei Akteure60+60 bei 90 Bedarf: mit bindender Reservierung werden höchstens 90 bestätigt; Beispiel zuerst60, danach30. Nicht angenommene30 gespendete Fass verbleiben beim zweiten Akteur. Keine120fach gezählten öffentlichen Einheiten.

Hier gilt eine bewusste einfache Vergabe nach erster verbindlicher Reservierung. Andere Reihenfolge kann die **Ressourcenzuteilung** ändern, nie Mengen-/Stimmenbilanz. Der erste Beobachter prüft alternativ gleichzeitige Pro-rata-Tageszuteilung45/45. Beides nicht als dieselbe bereits implementierte Politik ausgeben; die einfachere bindende Reservierung ist der bevorzugte erste Entwurf.

**Materielle Grenze:** Das ist gegenüber V13 eine neue bedarfsbezogene Verbrauchsregel. Trotz unveränderter Preisformel bleiben nach qualifizierter Lieferung weniger freie Marktware und damit möglicherweise andere spätere Preise. Es ist deshalb **keine behauptete wirtschaftlich wirkungslose Korrektur**. Sie braucht ausdrückliche Freigabe und später einen kleinen isolierten Handels-/Mengenvergleich. In P1.1 wurde nichts davon produktiv eingebaut oder wirtschaftlich kalibriert.

## 7. Minimaler Speicher-/Belegaufwand und Rivalen

Erforderlich: Bedarf-ID/Restquote/Beobachtungen; sparse Entnahmeschuld je Akteur/Stadt/Ware; verbindliche Reservierungs-/Quellen-ID; Menge und A/B/C-Preisvergleich; finaler Übernahmezeitpunkt; kumulierte Vertrauensleistung und wenige zeitliche Beliebtheitskohorten. Keine individuellen politischen Kostenlose oder neue Preisanker. Im bloßen Beobachter waren lebenslang widerrufbare A/B-Belege nötig; die empfohlene endgültige Abnahme macht diese Rückabwicklung echter bestätigter Ware unnötig.

NPC brauchen wirklich gekaufte verfügbare Ware oder eine belegte bezahlte Fracht aus vorhandenen Märkten. Ein kleiner Sendungsdatensatz genügt statt kompletter Konkurrenzflotte, aber Quelle, Kaufkosten, Marktentnahme, Laufzeit/Frachtkosten und Zielabnahme müssen real gebucht sein. Kein kostenloser „Beschaffungsauftrag erfüllt“-Stempel. Entscheidung nutzt veröffentlichte lokale Bedarfe und zulässige Informationen, kein geheimes Fernpreis-Orakel. Spieler und NPC haben dieselben Schuld-, Herkunfts-, Quoten-, Preis- und Finalitätsregeln.

Offene Integrationsfragen: alle Marktänderer/Sondertipps, gemeinsame mehrere Tabs sichere Speicherung, Preis-/Bestandsnebenwirkung, langfristige Quoten bei chronischem Mangel, volle Rats-/Quest-Doppelanerkennung und korrekte tatsächliche C-Herkunfts-/Kostenentnahme. Rechenbelege sind konstruierte Eingaben, keine Manipulationssicherheit gegen frei erfundene Spielfiles. Keine Vollsimulation und keine vollständige Freiheit von Exploits behaupten.
