# R1.11 – Originalpolitik und tatsächlich vorhandenes Hansefürst

28.10.2026. **Reine statische Codeprüfung**, keine Spielausführung oder Simulation. Geprüft: Entwicklungsbranch `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Hauptdatei `Hansefuerst_0_4.html`, Git-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`, Release0.8 d.1 b/Save V13. Remote-Blob erneut abgefragt und mit vorhandener byteidentischer Datei verglichen. Remote-Textabruf der großen HTML-Datei blieb leer; statisch wurde die hashgleiche lokale Kopie gelesen. Alter Prototyp `Hansefuerst_Spiel.html` ist keine Vergleichsbasis.

Status: **Direkt im Originalspiel beobachtet** (O), **Durch Originaldokumentation belegt** (D), **Im Hansefürst-Code bestätigt** (H), **Hypothese** (Y), **Noch ungeprüft** (U). Spielspaß, Aufwand, Priorität und Änderungsrisiken sind qualitative Designurteile, keine Testresultate. Alle Vorschläge bleiben ohne Umsetzungsfreigabe.

## Politische Struktur und Ansehen

| Mechanik | Original | Hansefürst tatsächlich (H) | Unterschied / Bewertung (Y) |
|---|---|---|---|
| Karriere | D: Heimat-Bürgermeister vor Ältermann; weitere zwingende Rangfolge U | `rank`: Kaufmann→Fernkaufmann→Ratsherr→Bürgermeister→Eldermann | Hansefürst bietet ausdrückliche Zwischenränge; diese sind keine nachgewiesenen Originalränge |
| Frühe Ränge | Original-Mindestvermögen U | `promote`: Fernkaufmann18.000 G; Ratsherr45.000 G und25Ansehen; ausdrücklicher Antrag | Bestehende Zwischenziele beibehalten, nicht als fehlend neu erfinden |
| Allgemeiner Ruf | O: zwei qualitative Anzeigen, ohne Punktzahlen | Ein globales `s.rep`, Zuwachs durch Handel, Ankünfte, Aufträge, Spenden | Direktere Rückmeldung in Hansefürst; Original-internes Variablenmodell U |
| Örtliche Unterstützung | D: Volksgunst/Politikpopularität und Heimat-/Fernverdienste | `politicalSupport`: je Stadt abgeleiteter Wert aus globalen Größen und örtlichen Urkunden/Zusagen | Bereits stadtbezogener politischer Fortschritt; keine zusätzliche Rufleiste als vermeintlich fehlende Basis verlangen |
| Vermögen | D: Gemeinwohl statt bloßer Bereicherung; Originalschwellen U | `politicalWorth = netWorth − warehouseArrears`; Mindestvermögen plus Dienste und Unterstützung | Vermögen allein reicht bereits im aktuellen Code nicht |
| Politische Heimat | D: zuerst Bürgermeister der Heimatstadt | Kandidatur gilt für aktuell betrachtete Stadt mit deren Leistungsbuch; ein aktives Amt zur Zeit | Mehr örtliche Wahlfreiheit in Hansefürst; Heimatbindung ist keine 1:1 Originalübernahme |

Belege: [Rang799](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L799), [promote988](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L988), [political Worth/Support351–380](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L351).

**H – nachgewiesene Unterstützungsformel:** Wirtschaft `min(10,max(0,politicalWorth)/18000)`; globaler Ruf `min(15,rep/6)`; örtliche Dienste `min(40,Anzahl*5)`; erfüllte Zusagen je5 bis20; Ratsvereinbarungen `min(15,accord*5)`. Summe maximal100, gegen stadtbezogenen festen Zielwert. Das ist **keine Zahl simulierter Bürgerstimmen**. Die Ratstafel sagt dies ausdrücklich. Keine unabhängige allgemeine Stadt-Rufzahl in diesem Politikmodell; lokale Urkunden liefern die Ortsbindung.

## Bürgermeister und Kalender

**H:** Standardregeln aus `POLITICAL_RULES`:60 Tage je Ratsabschnitt,45.000 G politisches Vermögen,55 globales Ansehen,6 örtliche Dienste aus3Abschnitten und2Dienstarten. Gespeicherte `politics.rules` führen Abschnittslänge/Bürgermeistervermögen weiter; Standardwerte nicht jeder Altpartie ungeprüft zuschreiben. Rang Ratsherr, keine Mietrückstände, kein aktives Amt und abgelaufene Kandidaturfrist sind zusätzliche Sperrbedingungen.

Zulässigkeit und Mehrheit sind getrennt: `eligible` prüft Voraussetzungen, `willWin` zusätzlich Unterstützung≥Stadtziel. `runMayorElection` würfelt nicht, zeigt die Lage vor Bestätigung und setzt die nächste Kandidatur auf jetzt+einen Ratsabschnitt, bei Sieg wie Niederlage. Amtszeit360Tage. Niederlage löscht keine Dienste. Amtsende trennt aktives Amt vom dauerhaft erworbenen Titel.

**O/D:** Originaltafel zeigt einmal19.Scheiding1356; Handbuch beschreibt zweijährliche Wahlen. Kandidatur, Stimmverteilung und tatsächliche Wahl U. Keine Übernahme vermeintlicher Originalformeln. Hansefürst hat keinen hier belegten identischen periodischen Wahltag; seine Kandidaturprüfung und Abklingfrist sind ein anderes Modell.

Belege: [Standardregeln347](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L347), [Wahl461–470](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L461), [Ratstafel555–588](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L555).

## Dienste, Unterstützer und echte Konkurrenz

**H:** Je Stadt/Abschnitt zwei Briefarten. Versorgungsdienst verlangt6–8 Einheiten geeigneter Fremdware, nachgewiesen über Herkunftsaufzeichnung. Ratsvereinbarung verlangt persönliche Vorsprache in Partnerstadt und Rückbericht. Urkunden haben stabile IDs; erneutes Öffnen/Laden verleiht keine weitere Urkunde. Es gibt Fristen, abgelaufene Briefe ohne Anerkennung, und keine Goldprämie für politische Dienste. Wirtschaftliche Kosten entstehen durch Warenbindung, Wege und Gebühren; ein Dienst kann zugleich mit profitablen Handelsgeschäften verbunden werden, daher kein pauschaler Nettoverlust jedes Dienstes behauptet.

Zusagen: Bürgerschaft nach2Versorgungsdiensten; erste Ratsgruppe nach3; zweite nach2Ratsvereinbarungen; Rat nach6Diensten/3 Abschnitten/2 Arten. Rivalenziele sind feste Stadtwerte, z.B.Lübeck80,Rostock68. **Die UI benennt die beiden Rivalen als Unterstützerkreise und sagt ausdrücklich, dass für sie keine eigenen Vermögen,Flotten oder Bürgerstimmen geführt werden.** Keine autonome politische Konkurrenz aus bloßen Namen ableiten. Das gezeigte Rivalenmodell ist bereits vorhanden, aber anders als aktive Gegenkandidaten mit eigenständiger Karriere.

**D:** Originalhandbuch beschreibt Konkurrenten als politische Gegner und Gildeninformationen über sie. **O:** Gildengebühr20630gesehen, nicht bezahlt; keine Konkurrentenliste als Mitglied geöffnet. Aktive Original-Wahlkampfaktionen U.

Belege: [Dienste356–359/425–459](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L356), [Rivalen587](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L587), [Stadtprofile607](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L607).

## Eldermann und Weiterspielen

**H:** `hanseQuote` verlangt bewährtes Bürgermeisteramt:2 neue Dienste in2Abschnitten seit Amtsantritt, darunter Ratsvereinbarung, oder entsprechenden abgeschlossenen Amtsnachweis. Eine volle360-Tage-Amtszeit ist dafür nicht immer nötig; aktives bewährtes Amt kann reichen. Dazu180.000 G politisches Vermögen,90 Ansehen, keine Mietrückstände,4 Stadtsiegel einschließlich Heimat und3auswärtige Fürsprecher, mindestens2Handelsräume sowie beurkundeter überregionaler Hansevertrag.

Fremdes Siegel benötigt beide örtlichen Dienstarten und politischen Zugang. Hansevertrag verlangt zwei auswärtige bereits unterstützende Städte, persönliche Bestätigung und Rückkehr, mindestens2Handelsräume,720 Tage Frist. `runHanseAssembly` überprüft Bedingungen ohne Wahlzufall und vergibt Rang4. Handel,Lager,Schiffbau bleiben zugänglich. Keine Folgekarriere oder aktive KI daraus hinzuerfinden.

**D:** Original benennt Ältermann als Siegziel und überregionalen Ruf, genaue Stimmformel U. **Y:** Hansefürst hat schon deutlich sichtbare Zwischenbelege; die Gefahr repetitiver Stempelrouten muss an echtem Spielen geprüft werden.90 aktive Stunden sind aus diesen Tages-/Urkundenanforderungen nicht bewiesen.

Belege: [Amtsbewährung382–410](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L382), [Hansevertrag/Versammlung472–493](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L472), [Weiterspielhinweis603](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L603).

## Gesellschaft, Rufquellen und Missbrauchsrisiken

**H:** Kirchenspenden50G/+2 oder200G/+5 im Ausgang, tatsächlicher Zuwachs `max(1,Basis−floor(rep/55))`. Kein Spenden-Cooldown in `donate`, positiver Mindestzuwachs1. **Statische Inferenz/Y:** Ausreichendes Geld kann wiederholte globale Rufsteigerung finanzieren; das ersetzt weder örtliche Dienste noch Siegel oder Amtsbewährung. Kein getesteter Exploit und kein Beweis, dass der gesamte Aufstieg kaufbar wäre. Kostenlose Urkunden durch Spenden sind im geprüften Ablauf nicht vorhanden.

Badehaus 15 G und ein Spieltag, Handelsgerüchte mit möglichen Falschtipps und Sondergeschäften. Zusätzlich `politicalRumorPanel` mit Stimmen aus dem Rat und Verweis auf verbindliche Rathausbedingungen; keine neue Wahlzufallsziehung. Bereits vorhanden, nicht als fehlende Politikinformation vorschlagen. Originalbadehaus in R1.11 nur Bad-Rückmeldung, politische Manipulation U.

Handelsgewinn kann Ruf geben: bei positivem Warengewinn `min(2,floor(profit/250))`; Auftrag+4; Ankunft+1 auch bei Gefahren. Imgeprüften `arrive` kein zusätzlicher politischer Konvoischutzbonus: Waffen/Konvoi wirken auf Abwehr, die Rufbuchung bleibt allgemeine Ankunft. Original-Konvoischutzpopularität ist nur dokumentiert. Eine vollwertige Fest-/Hochzeitskarriere ist im geprüften Gesellschafts-/Politikablauf nicht nachgewiesen; nicht pauschal jede Datei ausgeschlossen.

**O:** Original-Almosen25bezahlt, sichtbare Kategorien unverändert; Kirchbauspende100zurückgewiesen; Festangebot abgelehnt; Badbesuch ohne beobachtete Geld-/Datumsänderung. Keine numerischen Originalrufwerte mit Hansefürst-Punkten gleichsetzen.

Belege: [Badehaus/Spende906–910](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L906), [politische Gerüchte553](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L553), [Handel905/Auftrag990](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L905), [Ankunft1026](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1026).

## Fünf priorisierte Vorschläge – alle unverbindlich

| Vorschlag | Empfehlung / Priorität | Erwarteter Nutzen (Y) | Aufwand (Y) / Wirtschaft und Saves |
|---|---|---|---|
|Bestehende Ratstafel um deutliche lokale Ursachen-/Wirkungsbelege ergänzen, wo nötig|Beibehalten/Verbessern;hoch|Verständliches Vertrauen ohne weitere undurchsichtige XP-Leiste|niedrig–mittel; bestehende Urkunden bevorzugen, keine alten Ränge entziehen|
|Vorhandene zwei Diensttypen inhaltlich abwechslungsreicher machen; mehrere wirtschaftlich kostende Wege statt Pflichtspende|Verbessern;hoch|Weniger Routine, echte Handels-/Versorgungsentscheidungen|mittel–hoch; Warenquellen,Fristen und politische Anforderungen können Wirtschaft verändern;Migration nötig bei neuen Feldern|
|Begrenzte aktive politische Gegenkandidaten als gesondertes Konzept prüfen|Weitere Forschung erforderlich;hoch|Rivalität und nachvollziehbare Rückschläge statt fester Zielschwelle allein|hoch; KI-Budgets/Aktionen/Mehrheiten/Saveversion, keine versteckten Gratisstimmen|
|Sinnvolle Wahlfenster und Amtsentscheidungen prüfen, Fortschritt nach Niederlage bewahren|Beibehalten/Verbessern;mittel|Vorfreude und Verantwortung ohne künstliche Wartezeit|mittel–hoch; heutige60/360-Tage-Regeln und laufende Amts-/Fristdaten berücksichtigen; keine zweijährige Originalpflicht kopieren|
|Rufquellen aus Spende, Ankunft, erfolgreichem Schutz und Gemeinwohl gegeneinander prüfen; Konvoiverdienst nur bei belegter Leistung|Weitere Forschung erforderlich;mittel|Unterschiedliche Spielstile; weniger reine Spenden-/Kurzroutenroutine|mittel; mögliche Auswirkungen aufrep55/90, Handel und Karrierezeit; keine Parameteränderung ohne Auftrag|

Keine dieser Ideen ist ein bereits gemessenes Spaßergebnis. Mehrere Bestandteile sind ausdrücklich **schon implementiert**. Das [90-Stunden-Konzept](R1_11_90_stunden_karrierekonzept.md) beschreibt eine mögliche Zielstruktur, keine Vorhersage der aktuellen Spieldauer und keine Freigabe neuer Mechaniken.
