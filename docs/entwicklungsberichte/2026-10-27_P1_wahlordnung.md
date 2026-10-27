# Phase P1 – Neue politische Wahlordnung

27.10.2026 · Europe/Berlin · **Konzeptphase, keine produktive Implementierung.**

Frisch geprüfte GitHub-Basis: **`a5ec92a19018a4049567c80f8e8fbd687f3a8d3e`**, Merge #42. Branch **`analysis/p1-election-concept`**. Produktiver Stand unverändert **0.8d.1b / V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kleines Analyseprogramm und Vorschlagsparameter vor Prüfung veröffentlicht: **`9fd3b0851738ec161b19d6d370e99e7a62a19eac`**. Spätere Berichtscommits sind keine angeblichen neuen Spielcode-Teststände.

**Verbindlich beschlossen** sind Wahlen mit absoluten Stimmen, elf Stadtbevölkerungen mit begrenztem Wahlkörper, aktive finanzierte Konkurrenz, Abschaffung aktiver Kaufmannsränge und Vermögens-/Ansehenshürden sowie Bestandsschutz. **Alle nachstehenden konkreten Zahlen, Intervalle, Gruppen-, Finanzierungs- und Übergangsregeln sind begründete Vorschläge zur Entscheidung**, noch keine genehmigte Balance.

[Wahlordnung](2026-10-27_P1_wahlordnung.md) · [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md) · [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md) · [Bestandsschutz/Änderungsliste](2026-10-27_P1_bestandsschutz.md) · [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md).
## Kern des Vorschlags

Der Kaufmann bleibt Kaufmann. Er kann eine Stadt von seiner Kandidatur überzeugen, eine reguläre Bürgermeisterwahl gegen aktive Mitbewerber gewinnen und später in einer Hanseversammlung zum Eldermann gewählt werden. **Weder Vermögen noch globale Ansehenspunkte vergeben ein Amt oder eine Kandidatur.** Bürgerstimmen sind begrenzte Personenbestände; Geld wirkt nur über tatsächlich bezahlte, begrenzte gesellschaftliche Leistungen.

Das produktive Spiel bleibt auf seiner bisherigen Stückpreiswirtschaft. B3/K500 und die Preis-/Politikmodelle aus 0.8d.2a.2/3 waren isolierte Forschung; sie werden durch P1 weder integriert noch als freigegeben vorausgesetzt. Die neue Wahlordnung muss auch mit der unveränderten bestehenden Handelswirtschaft funktionieren.

## 1. Bestandsaufnahme im tatsächlichen Code

[HTML an der Basis](https://github.com/psonnen-lgtm/Hansef-rst/blob/a5ec92a19018a4049567c80f8e8fbd687f3a8d3e/Hansefuerst_0_4.html), besonders Zeilen 348–610,874–910,986–990,1028–1064. Vollständige lexikalische Fundstellen stehen im [lesenden Quellennachweis](../../tests/analysis/phaseP1/results/concept-attempt1.json). Keine ausgedachten Konkurrenzvermögen im Ist-Zustand.

| Vorhandener Baustein | Tatsächliches Verhalten | Spätere Behandlung |
|---|---|---|
| `fresh`, `newMerchantGame`, `freshPolitics` | V13, Rang 0, Ansehen0; politische Urkunden/Jobs/Amtsfelder, elf Stadtindizes | Startausstattung/Standort bewahren; neue Politikdaten ergänzen; neue aktive Ranglaufbahn entfällt. |
| `promote` | Rang 1 ab 18.000 G, Rang 2 ab 45.000/25; ab Rang 2 an Bürgermeisterverfahren delegiert | Aktive Rangfunktion/Aufstiegsknopf entfernen; kein versteckter Ersatzaufruf. |
| `politicalWorth`, `politicalSupport` | Buchwert minus Mietschuld; Unterstützung aus Wirtschaft, Ansehen, Diensten, Zusagen, Entscheidungen | Geld-/Buchwertrechnung finanziell erhalten; gesamte alte Stimmen-/Siegableitung abschalten, nicht in Bürgerstimmen skalieren. |
| `mayorQuote`, `runMayorElection` | Ratsherr,45.000 bzw.85.000 G,55 Ansehen,6 Dienste/3 Abschnitte/2 Arten, Miet-/Amts-/Kalendersperren; Score gegen Stadtziel | Rang-/Geld-/Ansehens-/Scorehürden entfallen. Neuer Kandidaturstatus und reguläre tatsächliche Auszählung ersetzen das gesamte Wahlverfahren. |
| `politicalOffer`, `acceptPoliticalJob`, `politicalRecord` | Regionale Bedarfsware, begrenzte Angebote/Fristen, eindeutige Urkunden-IDs | Nachweiskern/Atmosphäre erhalten; eindeutige Dienste begrenzt für Wählerwirkung verwenden, nicht pro Verkaufsklick. |
| `politicalTrade`, `completePoliticalSupply`, `consumeOrigins` | Originalverkauf mit fremder FIFO-Stadtherkunft und atomarem Dienstbeleg | Finanz-/Herkunftsregeln bewahren; neue Stimmenbuchung künftig in denselben sicheren Übergang einbeziehen. Herkunft allein beweist keine endgültige öffentliche Versorgung. |
| Ratsvereinbarungen | Persönliche Vorsprache und Rückkehr, einmaliger Beleg | Als reale politische Leistung erhalten; Auftrags- und Stimmen-ID gegen doppelte Anerkennung verbinden. |
| `politicalOfficeProof`, `politicalCloseOffice`, `resignMayor`, `reviewMayor` | Zwei neue Dienste in zwei Abschnitten inklusive Vereinbarung;360 Tage Amt; Titel bleibt | Amtsbeweis weiterverwendbar. Amtszeit-/Schlusslogik an Wahltermine binden; alte Amtsfristen bis Ende respektieren. |
| `POLITICAL_CITIES` | Zwei benannte Unterstützergruppen, lokale Anliegen, Handelsraum und abstraktes Rivalenziel | Stadtidentitäten/Anliegen/Regionen behalten. `rivalTarget` und Gruppen-als-Pseudokandidaten entfallen; Gruppen sind Hintergrundmilieu, keine aktiven Personen. |
| `politicalLeagueAccess`, `politicalHome`, Stadtsiegel/Hansevertrag | Zugang über Rang 4/Amt/bewährte Amtszeit; persönliche Fürsprache/Vertrag | Zugang an wirkliche/geschützte Amtsnachweise binden, nicht Ränge; Belege/Verbindungen erhalten. |
| `hanseQuote`, `runHanseAssembly` | Voraussetzungen180.000/90, Bewährung,4 Siegel/3 fremde/2 Räume/Vertrag; danach sicherer Titel | Geld-/Ansehenshürden und automatische Amtsvergabe streichen. Kandidatur aus Amtsnachweis; tatsächlicher Delegiertenentscheid. Siegel/Verträge schaffen begrenzte Fürsprache, keinen garantierten Sieg. |
| `donationGain`, `donate`, `trade`, `arrive`, `completeQuests` | Bestehende Ansehensquellen; Spenden50/200 G mit abnehmendem Ansehensnutzen | Finanz-/Ansehenswerte erhalten. **Kein Umrechnen globalen Ansehens in Stimmen.** Spendenwirkung aus tatsächlich bezahltem kumuliertem Gold. |
| Rathaus/Kontor/Status/Testlog | Rang, Voraussetzungen, abgeleitete Unterstützung, Amtsräume/Chronik | Neue Amts-/Wahlansicht; historische Titel separat. Finanzen/Journal bleiben, aktive Rangknöpfe und falsche Stimmenversprechen entfernen. |
| `advance`, `politicsClock` | Tagesweise Wirtschaft, Zinsen, Miete, Briefe, Bau, Politikablauf | Vorhandene wirtschaftliche Reihenfolge erhalten; expliziten politischen Tagesabschluss hinzufügen. Keine Echtzeit-Hintergrundsimulation oder Wahl beim Öffnen. |
| Validatoren, Migration, Speichern/Import | Strikte V13-Felder, alte30/60-/45.000/85.000-Regeln und Rangbezüge | Neue Formatfassung nötig; Legacy-Validatoren für alte Kopien behalten, neue Wahlregeln getrennt validieren. |

Grundlagen: [0.8c.3](2026-10-27_0.8c3_politischer_fortschritt.md), [0.8d.2a.2](2026-10-27_0.8d2a2_politischer_rueckhandel.md), [0.8d.2a.3](2026-10-27_0.8d2a3_entscheidung.md). Dort nachgewiesene Buchwert-/Klick-/Zwischenrangprobleme begründen: **Normaler Warenverkauf, Rückkauf, Schiffswechsel, Vermögen und globales Ansehen sind keine neuen Wahlleistungsereignisse.** Die alten wirtschaftlichen Befunde werden nicht als durch P1 behoben ausgegeben.

## 2. Bürgermeisterwahl: vollständiger vorgeschlagener Ablauf

- **Termin:** jährlich am Ende von Spieltag360, gleicher Kalender in allen elf Städten. Das Spiel hat360 Tage/Jahr; keine stillschweigende365-Tage-Rechnung.
- **Kandidaten:** drei namentliche NPC-Personen, mit Spieler vier; zulässiger späterer Rahmen2–6 insgesamt. Ein Spielerplatz wird bis Nominierungsschluss freigehalten; keine verdrängte NPC-Stimme durch einen bloß zusätzlichen Null-Unterstützer.
- **Kandidatur:** kostenfreie ausdrückliche Eintragung im Rathaus bis einschließlich Tag 270; persönlich dort unterschreiben. Keine Mindestwerte für Gold, Buchvermögen, Ansehen, Kaufmannsrang oder alte Dienstzahl; auch Kredite/Mietschulden sind keine automatische politische Sperre. Ein Spieler kandidiert pro Jahresrunde in genau einer Stadt und kann höchstens ein örtliches aktives Amt führen. Wer anderswo ein fortbestehendes Amt hat, muss vor Anmeldung bewusst niederlegen; kein stiller Amtsverlust.
- **Wahlkampf:** Tag 271–360 einschließlich =90 Tage. Öffentliche gesellschaftliche Leistungen können auch vorher entstehen; nur ihre noch wirksamen, belegten Anteile zählen. Keine rückwirkend erfundenen Kampagnenaktionen.
- **Wählerliste:** zum Beginn von Tag 271 festschreiben. Kandidaten und feste Los-/Rundungsprioritäten gleichzeitig speichern; der Spieler bekommt durch Registrierung keine Gratisstimmen.
- **Stimmen:** jeder Wahlberechtigte genau einer disjunkten Gruppe und genau einem Kandidaten oder „unentschlossen“ zugeordnet. Alle fest zugesagten Unterstützer stimmen am Wahltag für ihren Kandidaten; Unentschlossene werden Nichtwähler. Zunächst kein zweiter zufälliger Beteiligungsfaktor.
- **Sieger:** höchste absolute Stimmenzahl bei mindestens einer abgegebenen Stimme. Kein erforderlicher Vermögens-/Ansehens-/Unterstützungsscore. Stimmenprotokoll nennt alle Kandidaten, Nichtwähler und Gesamtzahl.
- **Gleichstand:** nur die gleichauf führenden Kandidaten gehen in eine siebentägige Stichwahl; gleicher Wahlkörper. Nichtfinalisten scheiden öffentlich aus, ihre Bindungen werden nach veröffentlichten Gewichten neu verteilt; die Zahl der Personen bleibt gleich. Nach erneutem positivem Stimmengleichstand entscheidet ein im Wahlzustand vorab festgelegtes öffentliches Los. Kein Neuwürfeln beim Laden. Bei insgesamt 0 Stimmen kein Losamt: Ratsverwaltung, nächste reguläre Wahl.
- **Amt:** Sieger tritt nach erfolgreichem Abschluss/Commit der Auszählung am Folgetag an. Amtsintervalle technisch halboffen `[start,until)`, entsprechend der vorhandenen Ablaufprüfung. Amt bis zum nächsten regulären Jahreswechsel; nach Stichwahl entsprechend etwas kürzer. Ein solcher Folgetermin muss im gültigen Spielkalender liegen. Bei Wiederwahl lückenloser Übergang; historische Titel und bewährte Amtsführung bleiben unabhängig vom aktiven Amt.
- **Niederlage:** keine neue Amtsvergabe, nächstes reguläres Jahr wieder kandidieren. Dienste, Siegel, Geld und gültige historische Erfolge bleiben. Zeitlich befristete Wählerbindungen dürfen normal auslaufen. Die erneute Kandidatur setzt den politischen Lebenslauf nicht zurück.
- **Abwahl/Aufgabe:** eine verlorene Wiederwahl beendet das aktive Amt zum geordneten Übergang, nicht den früher erworbenen Titel. Freiwilliger Rücktritt bestätigt, Datum protokolliert; bis zur nächsten Wahl eine unparteiische Ratsverwaltung. Keine zusätzliche jederzeitige Zufallsabwahl im ersten Entwurf.
- **Verpasster Wahltag/Reise:** Simulation schließt alle betroffenen Tage/Wahlen genau einmal, auch bei mehrtägiger Fahrt. Abwesenheit verhindert weder Stimmen noch Ergebnis; Kandidatur musste zuvor wirksam sein. Nach Rückkehr Ergebnisbrief. Ohne Kandidatur kein automatisch verliehenes Spieleramt.

Ratsverwaltung ist ein Übergangsstatus, **kein neu als gewählter Bürgermeister erfundener NPC**. Anfangs-NPC dürfen im Prolog als Startamtsinhaber bezeichnet werden; dafür keine historischen Stimmenzahlen erzeugen.

### Tagesabschluss und Laden

Während eines Spieltags sind bestätigte Kosten/Reservierungen sofort atomar gespeichert; politische Wirkungen für diesen Tag werden gesammelt. Die Rathausansicht zeigt getrennt den letzten abgeschlossenen Stand und die aus bekannten eigenen Ereignissen abgeleitete Vorschau. NPC-Absichten verwenden den veröffentlichten **Vortagsstand**, reagieren nicht sofort auf jeden Klick.

Beim Verlassen von Tag d: fällige bereits zugesagte Leistungen abschließen, alle angenommenen Tagesereignisse sammeln, Wirkungen/Verfall gemeinsam berechnen, Stimmen **einmal** ganzzahlig verteilen und auf d=360 bzw. Stichwahlende auszählen; dann den nächsten Tag samt dessen bestehenden Wirtschaftsschritten ausführen. Bestehende Tagesmarkt-/Zins-/Bau-/Brief-/Reise-RNG-Reihenfolge nicht verändern. Ein Zeitmarker `lastClosedDay` und Wahl-ID verhindern Doppelzählung. Detailintegration erfordert eigene Regressionen; sie wurde nicht gebaut.

Öffnen, Scrollen und Laden zeigen nur gespeicherte Ergebnisse. Wenn beim Laden ein bereits bestätigter Zustand vor einem noch offenen Tagesabschluss liegt, muss genau dieser Abschluss im festgelegten Übergang fortgesetzt werden; keine durch Darstellung ausgelöste Wahl. Ein erneut importierter vollständiger alter Export bleibt im Offline-Spiel eine frühere Zeitlinie, kein serverseitig lösbarer Manipulationsnachweis.

## 3. Leistungen, Kosten und begrenzte Wirkung

Vier Gruppen in Tabellenreihenfolge: **B**ürgerhaushalte, **H**andwerk, **S**ee-/Hafenleute, **K**aufleute/Ratsfamilien. Zahlen B/H/S/K sind interne maximale Bindungsgewichte, **keine garantierten zusätzlich geschaffenen Stimmen**. Jeder Gruppen-Normalbestand hat Gesamtgewicht1.000. Die konkrete Stimmenwirkung hängt vom endlichen Wahlkörper und der Konkurrenz ab und wird als echte Differenz angezeigt. Dauer linear auslaufend; je Kategorie/Wahlkörper/Kandidat gilt zusätzlich der gemeinsame Deckel aus der Tabelle. Gestapelte Einzelbelege überschreiten ihn nicht.

| Handlung | Voraussetzung und tatsächlicher Aufwand | Max. B/H/S/K; Dauer | Wiederholung, negative Folge, Nachweis |
|---|---|---|---|
| Lebensmittelversorgung | Öffentliche, einmalige Bedarfs-ID;6–16 Fass (`max(6,ceil(E/500))`) geeignete Lebensmittel aus nachgewiesener fremder Herkunft endgültig an öffentliche Versorgung abgeben. Alternative öffentlich bepreiste Beschaffung für alle Kandidaten gleich |180/60/45/15;180 Tage | Höchstens ein neuer Bedarf je 30 Tage; Teilmengen erfüllen denselben Beleg. Öffentliche Abgabe nicht rückkaufbar; kein Bonus für bloße Marktverkäufe. Verspätung ohne Erfüllung schafft keine Wirkung. |
| Knappe Waren | Nachweisbarer veröffentlichter kommunaler Bedarf nach vorhandenen regionalen Warenrollen; gleiche begrenzte Menge, echte Ware oder gleiche Beschaffungsrechnung |70/140/120/40;180 Tage | Einmalige Bedarfs-ID/30 Tage. Nicht aus geheimen Fernmarktpreisen. Reine Bestandsverschiebung erzeugt keinen Bedarf. |
| Ratsauftrag | Tatsächlicher Reise-/Vermittlungsdienst mit Urkunden-ID; bestehende Reise-/Gebührenkosten, keine neue Geldprämie |30/70/40/130;180 Tage | Neue erkennbare Leistung; maximal ein anerkannter Ratsauftrag je 60 Tage. Auftrag, Abschluss und Stimme referenzieren dieselbe ID. |
| Kirchliche Spende | Tatsächliche50-/200-G-Spende; bestehende Preise/Ansehensformel erhalten |80/30/20/30;60 Tage | Kumuliertes Gold eines festen30-Tage-Abschnitts, sättigende Wirkung;4×50=1×200. Neue Abschnitte stapeln nicht über den Kategoriehöchstwert. Keine Stimme aus globalem Ansehen. |
| Soziale Einrichtung | Öffentliches einmaliges Hilfsprojekt, z.B.300 G; echter unwiderruflicher Zuschuss |150/60/45/15;120 Tage | Ein Projekt/90 Tage; nicht beliebig neu erstellbar. Falsch deklarierte Mittel/gebrochene zweckgebundene Zusage wirken negativ. |
| Hansefest | Vorankündigung mindestens 7 Tage; voller Etat `600+ceil(E/5)` G plus nachgewiesene Organisation; Budget vorab reservieren |160/120/100/80;90 Tage | Ein Fest/90 Tage/Kandidat, gleicher Kategoriedeckel; kein reines Knopf-Fest. Abbruch/früh veröffentlichte Nichterfüllung verliert vorbereiteten Vorteil, Teilkosten bleiben nachvollziehbar. Keine künstliche Zufallskatastrophe. |
| Öffentlicher Hafen/Handel | Einmalige gemeinsame Projekt-ID, Beitrag z.B.1.000 G; Baufortschritt/Abnahme aus öffentlichem Etat |30/110/150/90;180 Tage | Ein Projekt/180 Tage; Teilbeiträge kumulieren. **Kein neues privates Lager/Schiff, Rabatt oder Preisbonus.** |
| Belegte Zusage gehalten | Konkretes Ziel mit Frist/ID; Aufwand aus zugehöriger echter Maßnahme |50/60/50/80;180 Tage | Nicht zusätzlich zum gleichen Dienst voll auszahlen: dieses Gewicht ist alternativ oder Ergänzung innerhalb desselben Kategoriedeckels, keine doppelte Anerkennung. |
| Versprechen gebrochen | Wirklich angenommene öffentliche Zusage verfehlt; keine frei erzeugte Strafe |−100/−100/−100/−150;90 Tage | Genau einmal je Zusagen-ID, kein Strafklick. Öffentlichkeit nennt Ursache und Frist. |
| Schlechte Versorgung | Veröffentlichtes unerfülltes kommunales Problem in Zuständigkeit des amtierenden Bürgermeisters; keine Verantwortung des neuen Spielers für Weltzustand bei Spielbeginn |−150/−70/−50/−30;60 Tage | Ein Krisenbeleg je 30 Tage; Warnung/Abhilfefrist. Nicht alle Kandidaten ohne Anlass bestrafen, keine geheime Marktpreisstrafe. |
| Gescheitertes Fest | Tatsächlicher Abbruch oder belegte nicht erbrachte angekündigte Leistung |−80/−60/−50/−40;60 Tage | Dieselbe Veranstaltungs-ID; keine zusätzliche doppelte „Versprechen gebrochen“-Strafe aus identischer Ursache. Kostenverlust/offene Reservierung getrennt zeigen. |

**Öffentliche Versorgung wäre eine spätere neue freiwillige Aktion**, keine hier heimlich umgesetzte Warenänderung. Beim minimalen politischen Einstieg kann eine für Spieler und NPC identische öffentlich bepreiste Essens-/Beschaffungsfinanzierung verwendet werden. Physische Frachtabgabe muss später separat freigegeben werden: echte Menge in öffentlichem Verbrauch, kein sofortiges Wiederangebot auf dem freien Markt, keine Änderung normaler Handelspreise/-formeln. NPC-Beschaffung erfolgt über dieselbe offen bezifferte Rechnung mit gleicher Lieferfrist, nicht über gratis erfundene Ware. Liefert jemand stattdessen selbst, sind tatsächliche Fracht/Herkunft, unwiderrufliche Übergabe und Kosten zu buchen. Keine Annahme, dass heutiges Herkunfts-FIFO allein jede Lieferkreisschwäche löst.

Normale Handelsgewinne, Goldbestände, Umbuchen, Reparieren, Marktansichten und globales Ansehen haben **Stimmenwirkung0**. Leistungen müssen echte Kosten/öffentliche Abnahme oder tatsächlichen Dienst tragen. Damit verschwinden die alten neutralen Buchwertkreise als direkte Wahlquelle; die Sicherheit des zukünftigen Belegpfads ist noch zu testen.

## 4. Eldermannwahl als eigener Wahlkörper

Vorschlag: **drei benannte Delegierte je Stadt,33 insgesamt**, unabhängig von Stadtgröße. Sie repräsentieren Bürgerschaft, Gilden/Hafen und Rat/Fernhandel, haben je eine Stimme und eine dauerhafte ID `city:seat`. Das sind keine zusätzlich gezählten Einwohnerstimmen: eine andere, ausdrücklich benannte Wahlversammlung. Eine Einwohnerwahl darf nicht als33-fach wiederholte Abstimmung interpretiert werden.

Alle720 Tage eine ordentliche Hansewahl,120 Tage Vorlauf; erste neue Versammlung erst, nachdem mindestens ein kompletter regulärer Bürgermeisterwahlgang möglich war und der Vorlauf eingehalten wird. Konkreter gemeinsamer Starttermin wird beim neuen Regelsystem gespeichert; Wahlbeginn/Frist nicht vom Öffnen abhängig machen.

Kandidaturvorschlag: tatsächlich gewonnene Bürgermeisterwahl oder anerkanntes geschütztes altes Amtsmandat, dazu bewährte Amtsführung nach belegten neuen örtlichen Diensten. Vorhandene Bewährungsurkunden zählen. **Keine Geld-/Ansehensgrenze.** Zwei NPC-Gegenkandidaten und der Spieler, Rahmen2–4. NPC müssen ebenfalls Amts-/Leistungsnachweise besitzen, keine eigens bei Spieleranmeldung erfundenen Siege.

Stadtsiegel, regional bewährte Zusammenarbeit und beurkundeter Hansevertrag schaffen nachvollziehbare Delegiertenzusagen; kein automatisches Amt aus vier Siegeln. Pro Delegiertem genau ein Kandidat oder Enthaltung; öffentliche Interessen und konkrete Gesprächs-/Leistungsbelege bestimmen die aktuelle Bindung. Ein neutraler Gold-/Warentausch reicht nicht. Eine alte Siegelurkunde ist ein Nachweis, noch keine erfundene heutige Delegiertenstimme; neue ausdrückliche Bestätigung protokollieren.

Empfehlung zur Entscheidung: mindestens **17 der33 tatsächlichen Delegiertenstimmen** für den Vorsitz. Dies ist eine Stimmenmehrheit eines endlichen Gremiums, keine alte Vermögens-/Ansehenshürde. Fehlt sie,15 Tage Stichverhandlung der zwei führenden Kandidaten; danach ohne17 kein neues Amt, neue öffentlich terminierte Versammlung nach 90 Tagen. Bisheriges befristetes Amt läuft nur bis seiner gültigen Frist, danach geschäftsführender Rat; kein automatisch verlängerter Spieleranspruch. Bei exakt gleichem Platz für die Stichwahl einmaliges vorher gespeichertes öffentliches Los. Alternative relative Mehrheit ist ausdrücklich noch offen.

Neue Amtsdauer720 Tage mit möglicher Wiederwahl; erworbener Titel bleibt. Bereits bestehende V13-Eldermannrechte werden von dieser neuen Befristung **nicht rückwirkend abgeschnitten**; gesonderte geschützte Altfallregel im Bestandsschutzbericht. Keine unbekannte alte Amtszeit oder Stadt ergänzen.

Eldermannkandidaten finanzieren bundesweite Auftritte aus demselben öffentlich geführten eigenen Geldpool; keine elf neuen Budgets pro Kandidat und keine gratis Zusatzmittel für die Hanse. Delegiertenentscheidungen sind gespeichert/deterministisch; kein Geld-/Ansehens- oder Siegel-Automatismus. Noch keine Eldermannmechanik implementiert.

## 5. Spielgefühl, Oberfläche und offene Balance

Am Rathausanschlag stehen Termin, Kandidatennamen, belegte Unterstützerzahlen des letzten Tagesabschlusses und letzte belegte Veränderungen. Eine knappe Zeile zeigt „5.000 Wahlberechtigte = … Kandidatenunterstützer + … Unentschlossene“. Kandidatendetails nennen Budget, letzte bezahlte Aktion und Wirkdauer; keine abstrakte Siegchance.

Badehausgerüchte erzählen erkennbare Vorhaben, geben keine kostenlosen exakten Fernmarktpreise preis. Die Chronik meldet angekündigte Feste, Belege, Auszählung und Amtsantritt. Stimmenänderungen nur auf abgeschlossenen Vorgängen; Ansichten rein lesend. Bei Wahlsieg kurze Zeremonie im vorhandenen Rathaus, bei Hansewahl dieselbe Ratskammer als Versammlung. Keine neuen Grafiken/großen Menüs.

Auf375/390 Pixeln vertikale Kandidatenkarten, feste Schließen-/Zurückfunktion und mindestens 44-Pixel-Bedienflächen; iPad820 und PC1280 dürfen Karten nebeneinander zeigen. Screenreader erhalten Namen, absolute Stimmen, Gruppen und Termine als Text; keine nur farbigen Zustände. Ein eigener Bestätigungsdialog zeigt Kosten/Frist und mögliche Relevanz, niemals garantierte Stimmen vor den Rivalenaktionen. **Nur Gestaltungsvorschlag, kein Browsertest.**

Zehn geforderte Entwicklungsverläufe sind im [Entscheidungsbericht](2026-10-27_P1_entscheidungsgrundlage.md) qualitativ bewertet.90–100 aktive menschliche Stunden bis Eldermann bleiben ein unvalidierter Designrahmen; keine Umrechnung aus Tagen und keine Behauptung einer hier gemessenen Karrieredauer.
