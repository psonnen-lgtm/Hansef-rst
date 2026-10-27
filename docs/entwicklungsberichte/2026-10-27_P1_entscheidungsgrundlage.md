# Phase P1 – Entscheidungsgrundlage zur neuen Wahlordnung

27.10.2026 · Europe/Berlin · **Konzeptphase, keine produktive Implementierung.**

Frisch geprüfte GitHub-Basis: **`a5ec92a19018a4049567c80f8e8fbd687f3a8d3e`**, Merge #42. Branch **`analysis/p1-election-concept`**. Produktiver Stand unverändert **0.8d.1b / V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kleines Analyseprogramm und Vorschlagsparameter vor Prüfung veröffentlicht: **`9fd3b0851738ec161b19d6d370e99e7a62a19eac`**. Spätere Berichtscommits sind keine angeblichen neuen Spielcode-Teststände.

**Verbindlich beschlossen** sind Wahlen mit absoluten Stimmen, elf Stadtbevölkerungen mit begrenztem Wahlkörper, aktive finanzierte Konkurrenz, Abschaffung aktiver Kaufmannsränge und Vermögens-/Ansehenshürden sowie Bestandsschutz. **Alle nachstehenden konkreten Zahlen, Intervalle, Gruppen-, Finanzierungs- und Übergangsregeln sind begründete Vorschläge zur Entscheidung**, noch keine genehmigte Balance.

[Wahlordnung](2026-10-27_P1_wahlordnung.md) · [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md) · [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md) · [Bestandsschutz/Änderungsliste](2026-10-27_P1_bestandsschutz.md) · [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md).
## Empfehlung in wenigen Sätzen

Jährlich90 Tage Wahlkampf, drei aktive Rivalen und ein Spielerplatz. Vier disjunkte Bürgergruppen verteilen einen festen Wahlkörper auf Kandidaten und Unentschlossene. Tatsächliche bezahlte/bestätigte Leistungen verschieben diese Stimmen mit abnehmender, zeitlich begrenzter Wirkung. Am Wahltag gewinnt die höchste absolute Zahl; Bürgermeisteramt360 Tage, Wiederwahl möglich. Der Eldermann wird in einem getrennten33-köpfigen Gremium gewählt.

**Konzept zur fachlichen Entscheidung geeignet, noch keine Implementierungs-/Balancefreigabe.** Zahlreiche neue Regeln sind ausdrücklich Vorschläge. Die endgültige politische Wirkung kann erst an einer später genehmigten isolierten Wahlprobe und menschlichen Bedienungs-/Motivationsprüfungen beurteilt werden.

## Verbindlich beschlossen und noch zu entscheiden

Bereits bindend: elf Städte mit Einwohnern/Wahlberechtigten; echte absolute Stimmen; aktive Rivalen mit begrenzten Ressourcen; Bürgermeister/Eldermann ausschließlich gewählt; aktive Fernkaufmann-/Ratsherrkarriere und Vermögens-/Ansehenshürden entfallen; keine Stimmen aus neutralem Warenkarussell/Klickspam; alte gültige Spielstände und erreichte Ämter erhalten.

Noch **Vorschlag**: alle konkreten Einwohnerzahlen/20%-Quote, vier Gruppen, Termine/90 Tage/Kandidatendichte, genaue Wirkungsgewichte und Kosten, NPC-Einkommensmodell, Stichwahl/Los,33 Delegierte/17-Stimmen-Mehrheit, Amtsdauer neuer Eldermänner, Übergangsbestätigungen und neues Speicherformat.

## Antworten auf die zwölf Entscheidungsfragen

| Frage | Konkreter Vorschlag |
|---|---|
| 1. Einwohner/Wahlberechtigte? | Tabelle unten,181.000/36.200 insgesamt. E=`floor(P/5)`, nur Spielabstraktion. Bevölkerung zuerst statisch; Dynamik später gesondert. |
| 2. Kandidatenzahl? | Drei namentliche NPC und ein reservierter Spielerplatz; Rahmen2–6 Bürgermeisterkandidaten. Gleiche Kosten/Wirkungskappen für alle. |
| 3. Wahlkampfdauer? | Tag 271–360 =90 Tage, jährliche Auszählung nach dem letzten Kampagnentag; Anmeldung bis 270. Kein nachträgliches Antreten beim Auszählen. |
| 4. Stimmen gewinnen/ver­lieren? | Endlich bestätigte Versorgung/Ratsdienste, echte50-/200-G-Spenden, soziale Projekte/Feste/Investitionen; begrenzte Kategorien/Wirkdauer. Gebrochene belegte Zusagen, verantwortete Versorgungskrise oder gescheiterte Veranstaltung können Bindung vermindern. Kein Geld-/Ansehens-/Buchwert-Automatismus. |
| 5. Stimmen zwischen Konkurrenten? | Disjunkte Gruppen, begrenzte Bindungsgewichte, einmalige ganzzahlige Verteilung inklusive Unentschlossener. Jede positive Änderung hat gleich große Abgänge aus vorhandenen Pools. |
| 6. Wie handeln Rivalen ohne unbegrenzte Mittel? | Eigene feste Termine, Typstrategien, tatsächlich gebuchtes liquides Vermögen, jährlicher harter Ausgabenrahmen und offengelegtes begrenztes privates Geschäftseinkommen. Kein Geld bei Rückstand/Reload, kein Fernpreis-Orakel. |
| 7. Sieger? | Bürgermeister: höchste positive absolute Stimmenzahl; bei Gleichstand7 Tage Stichwahl, danach gegebenenfalls gespeichertes öffentliches Los.0 Stimmen verleihen kein Amt. |
| 8. Niederlage? | Kein Amt, nächstes Jahr erneut kandidieren. Alte Titel/Dienste/Siegel bleiben; zeitlich befristete Wählerbindung verfällt normal. Kein kompletter Neustart. |
| 9. Eldermann? | Drei Delegierte je Stadt=33, eigene Interessen/Belege,2 NPC+Spieler;720-Tage-Zyklus/120 Tage Vorlauf. Vorschlag mindestens 17 Stimmen, sonst15 Tage Stichverhandlung; keine automatische Wahl aus Siegeln/Gold. |
| 10. Was entfällt? | `promote` als Ranglaufbahn, aktive Rang 1/2, Rang-/Geld-/Ansehensgates, alter score/target-Sieg und Hanse-Checklisten-Amt. Anzeigen/Validatoren/Testannahmen nach vollständiger Fundstellenliste umstellen. |
| 11. Alte Spielstände? | Originalbackup, bewährter V11/V12→V13-Kopienpfad, neue Regelwelt ohne erfundene Geschichte daneben; Wirtschaft/Belege unverändert, alte Ämter geschützt. Alte Scores niemals zu Stimmen umrechnen. Öffentliche begrenzte Neubestätigung alter Urkunden statt Neuverdienen. |
| 12. Noch nötige Entscheidungen? | Zahlen/Größe, Wahlkalender/Fristen, Wirkmatrix und echte öffentliche Abgabe, Rivalenfinanzierung, Hansemehrheit/Fristen, Übergangsrechte/Bestätigungen und technische Speicherfassung. Details unten. |

## Städteübersicht

| ID | Stadt | Einwohner | Wahlberechtigte | Nichtwahlberechtigte | Untergrenze | Obergrenze |
|---:|---|---:|---:|---:|---:|---:|
| 0 | Lübeck | 25.000 | 5.000 | 20.000 | 12.500 | 37.500 |
| 1 | Hamburg | 16.000 | 3.200 | 12.800 | 8.000 | 24.000 |
| 2 | Rostock | 12.000 | 2.400 | 9.600 | 6.000 | 18.000 |
| 3 | Stralsund | 10.000 | 2.000 | 8.000 | 5.000 | 15.000 |
| 4 | Stettin | 9.000 | 1.800 | 7.200 | 4.500 | 13.500 |
| 5 | Danzig | 20.000 | 4.000 | 16.000 | 10.000 | 30.000 |
| 6 | Bergen | 8.000 | 1.600 | 6.400 | 4.000 | 12.000 |
| 7 | Visby | 6.000 | 1.200 | 4.800 | 3.000 | 9.000 |
| 8 | Brügge | 40.000 | 8.000 | 32.000 | 20.000 | 60.000 |
| 9 | Nowgorod | 30.000 | 6.000 | 24.000 | 15.000 | 45.000 |
| 10 | Venlo | 5.000 | 1.000 | 4.000 | 2.500 | 7.500 |
| **Summe** | | **181.000** | **36.200** | **144.800** | **90.500** | **271.500** |

Die Werte sind keine verifizierten Statistiken1350. Kleinere Städte benötigen weniger absolute Stimmen, große mehr; prozentuale Gewichte dienen nur der konsistenten internen Verteilung. Alle Stadt-/Warenindizes und Märkte bleiben bestehen.

## Anschauliche Stimmenverteilung

Bei1.000 Wahlberechtigten kann eine bestätigte Wirkung den Spieler180→300 bringen, Konkurrent A320→273, B300→256, U200→171. Gewonnene120 kommen genau aus−47−44−29. Bei der Wahl stimmen829 Personen,171 enthalten sich. Kein Bürger stimmt doppelt und keine120 neuen Bewohner entstehen.

Drei Rivalen starten mit öffentlich sichtbaren unterschiedlichen Gruppenschwerpunkten. Der Versorger bezahlt tatsächliche öffentliche Beschaffung; der Gastgeber spart für ein angekündigtes Fest; der Kaufmann finanziert Vereinbarungen/Projekte. Sie handeln an eigenen Terminen nach Vortagsinformation. Eine unbezahlbare Aktion wird nicht ausgeführt. Die geplanten Konto-/Aktionseinträge erklären jede gebuchte Kosten-/Stimmenveränderung.

## Zehn plausible Verläufe – qualitative Bewertung, keine Simulation

| Profil/Fall | Begründete Erwartung des Entwurfs | Später zu prüfen |
|---|---|---|
| Neuer Spieler ohne Politik |0 neue Bindung/keine Kandidatur, kein Amt allein durch Handelserfolg; NPC bleiben aktiv. | Passivität darf keine automatische Wahl auslösen. |
| Vorsichtiger Kaufmann | Kleine tatsächliche Leistungen kumulieren, statt als Einzelklick unter einer Ansehensrundung zu verschwinden. | Preis-/Budgethöhe, Zugang auch in großen Städten, Zahl sinnvoller Tätigkeiten. |
| Aktiver Versorger | Echte öffentliche Abgabe/Bedarfs-ID überzeugt vor allem Bürgerhaushalte. | Lieferzeit, echte Kosten, endlicher Bedarf, kein Wiederkaufkreis. |
| Reich, gesellschaftlich unbeliebt | Gold selbst bringt0 Stimmen; gebrochene Zusagen bleiben trotz Reichtum wirksam. | Kann Geld über legitime Aktionen zu schnell alle Bindungen kaufen? Kappen/Fristen prüfen. |
| Gesellschaftlich engagiert | Breite unterschiedliche Leistungen erreichen mehrere Gruppen; dauerhafte Belege bleiben nach Niederlage. | Keine Pflichtliste aller Kategorien, mehrere erfolgversprechende Wege. |
| Gut vorbereitetes Fest | Vorlauf/finanzierter Vollzug nützen mehreren Gruppen, keine120-Stimmen-Garantie. | Kosten/Wirksamkeit gegenüber anderen Maßnahmen und NPC-Reaktionen. |
| Knapp verloren | Stimmenprotokoll zeigt Abstand/Ursachen; kein Amt, kein Verlust der gültigen Urkunden. | Knappheit motiviert statt Frust; Wirkung der Wiederholungsfristen. |
| Erneute Kandidatur nach Niederlage | Neue90-Tage-Chance, alter Leistungsnachweis weiter da; temporäre Bindung braucht Pflege. | Kein vollständiger Neustart, kein eingefrorener sicherer Sieg. |
| Sehr viel Gold, keine Unterstützung | Kann kandidieren, erhält aber ohne bezahlte/bestätigte Leistungen keine Stimme. | Kein Vermögenszugriff im Wahlpfad, auch nicht über alte `promote`-Aufrufe. |
| Besonders aktive Rivalen | Andere Strategien und bezahlte Aktionen können echte Stimmen entziehen. | Keine allwissende KI/unbegrenzte Mittel; Anfänger müssen durch bessere Auswahl gewinnen können. |

Das Ziel90–100 **aktive menschliche Stunden** bis Eldermann ist ein Designrahmen. Weder diese Tabelle noch360-/720-Tage-Zyklen belegen seine Erreichung. Keine simulierten Tage in menschliche Stunden umrechnen. Kein vollständiger Wirtschafts-/Karriereverlauf ausgeführt.

## Konkreter späterer Abnahmeplan

**Alle folgenden Systemprüfungen sind geplant und heute nicht ausgeführt.** Die fünf Berichte legen erwartete Invarianten und Testaufbauten fest; die sieben heutigen Rechen-/Textprüfungen ersetzen diese nicht.

| ID | Späterer Testaufbau | Verbindliches erwartetes Ergebnis |
|---|---|---|
| W01 | Alle11 Städte neu starten; P/E/Gruppen unter/auf/über zulässigen Grenzen | Exakte stabile Stadtzuordnung,0≤E≤P, Gruppen sum=E; ungültige Daten abgewiesen. |
| W02 |2–6 Kandidaten, E=1/3/7/1.000/8.000, gleiche Divisionsreste | Keine negativen Stimmen, Summe Kandidaten+U=E, feste Rundungspriorität. |
| W03 | Mehrere NPC/Spieler mit echten unterschiedlichen Aktivitäten | Mehr als ein Kandidat kann gewinnen; jeder Zuwachs hat dokumentierte Abgänge. |
| W04 | Gleicher bestätigter Tagesereignissatz in allen relevanten Reihenfolgen | Gleicher Endstand; getrennt erklären, wenn Reservierungsannahme die Ereignismenge änderte. |
| W05 | Mehrere Tage/Fahrt ohne Spieleraktionen | NPC-Termine/Kosten/Verfall genau einmal, keine gratis Stimmen/Geheimreaktion. |
| W06 |50/200-G-Spenden,4×50 vs1×200, Grenze30 Tage, Reload während Beitrag | Gleicher kumulierter Topf bei gleicher Periode; Sättigung/Kategoriedeckel; keine doppelte Zahlung/Wirkung. |
| W07 |90/9×10/90×1 Verkäufe, sofortiger Rückkauf, eigene Schiffe/Lager | Normaler Handel hat0 neue Wahlwirkung. Gold-/Warenregeln unverändert. |
| W08 | Alte44.610→45.595- und gemischte+2.056-G-Fälle, Klick zwischen Aktionen | Kein Stimmenevent und kein Rang-/Amtsauslöser; Wahlen ausschließlich am gültigen Termin. |
| W09 | Öffentliche Lieferungen richtige/falsche/unbekannte Herkunft; Teilabgaben/Rückkauf | Nur endgültig abgenommene richtige Leistung einmal; öffentliche Ware nicht am Markt rückkaufbar. |
| W10 | Derselbe Dienst zugleich Vertrag/Zusage/Quittung; doppelte ID/alter Periodenbeleg | Keine doppelte Anerkennung, abgelaufene Quellen nicht neu einreichbar. |
| W11 | Unbezahlbarer NPC-Plan, voller Jahresrahmen, Jahreswechsel/Reload | Keine negativen Konten, Kosten-/Einkommens-IDs einmalig, gleicher Haushaltsdeckel auch außerhalb Kampagne/Hanse. |
| W12 | Gleiche gespeicherte politische Seeds/Bestände, verschiedene Ansichtsaufrufe | Identische Absichten/Ergebnisse/Losprioritäten, keine Wirtschaftszufallsziehung. |
| W13 | Wahl positiv gewonnen/verloren/0 Stimmen/Gleichstand/Stichwahl | Richtiger Kandidat oder kein Amt; niemals Amt aus Vermögen. Stimmen/Beteiligung exakt. |
| W14 | Ohne Kandidatur, verspätete Anmeldung, mehr als eine Stadt, unterwegs am Wahltag | Keine heimliche Anmeldung, reguläres Ergebnis auch unterwegs, keine doppelten Ämter. |
| W15 | Wiederwahl, Niederlage als Amtsinhaber, Rücktritt | Korrekte Amtsgrenzen/Ratsverwaltung, erworbener Titel erhalten; keine automatische Verlängerung. |
| W16 | Export/Laden Tag 359/360, vor/nach Tagesabschluss und Auszählcommit | Gleiche Stimmen/Sieger, keine erneute Wahl/Gutschrift; vollständige Flags/Revisionen erhalten. |
| W17 | Gleichzeitige Tabs/Bestätigung nach alter Revision | Genau ein erfolgreicher Commit; zweites Fenster stale/read-only, keine halbe Zahlung/Amtsvergabe. |
| W18 | Quota/Transaktionsabbruch/kaputtes Backup/Importfehler | Original/RAM/Disk konsistent, kein Amt ohne Ergebnis/keine Kosten ohne Leistung, sicherer Export. |
| W19 | Gültige echte V11/V12/V13-Kopien, bekannte und unbekannte Einkaufskosten | Alle sonstigen Werte/Informationsbelege feldgleich, kein Rücksetzen/Neuwürfeln. |
| W20 | Alte Bürgermeister/Eldermänner und Rang 1/2 ohne Amtsdaten | Alle gültigen alten Rechte/Titel erhalten, fehlende Stadt/Wahl nicht erfunden, keine aktive Rangvergabe. |
| W21 | Alte Scores/Zusagen/Belege, erste Neubestätigung/erneuter Import | Kein numerischer Score→Stimmen-Konverter, explizite heutige begrenzte Wirkung einmalig. |
| W22 | Amtsende zwischen neuem Wahlkalender, Aktivierung spät im Jahr | Geschütztes Altmandat läuft regulär aus; erreichbare Anmeldung/90 Tage Vorlauf; keine Überraschungswahl. |
| W23 | Bürgermeister-/Eldermannkandidatur mit minimalem/maximalem Gold/Ansehen | Kein fester Gold-/Ansehensgrenzwert, alte Rang-/Scoreaufrufe vollständig inaktiv. |
| W24 |33 Delegierte, Siegel/Vertrag einmal/mehrmals,17-Stimmen-Grenze | Eindeutige Sitze, jeder höchstens 1 Stimme; nur wirkliche Mehrheit vergibt Amt, keine Checklisten-Autowahl. |
| W25 | Politik deaktiviert/aktiv ohne finanzierte Aktion, gleiche Handels-/Reiseinputs | Märkte/Preise/Geld/Waren/Gebühren und wirtschaftliche RNG gleich; neue politisch gebuchte Kosten separat genau erklärt. |
| W26 |100 wiederholte Rathaus-/Badehaus-/Kontoransichten | Keine Stimme, Wahl, Zahlung, Zeit oder Seedveränderung. |
| W27 |375/390 iPhone-,820 iPad-,1280 PC-Layouts plus Safari/Touch/Tastatur | Lesbare absolute Zahlen,44-Pixel-Ziele, erreichbarer Dialogschluss, keine verdeckte Bestätigung/Überläufe. |
| W28 | Lange Historien/Archive/aktiver Maximalzustand, große Tagesintervalle | Keine veralteten IDs neu auswerten, deterministische Grenzen, Speicher-/Performancefehler kontrolliert; keine stillen Altdatenverluste. |

Diese Liste ist **kein Auftrag, sie jetzt auszuführen**. Erst nach Freigabe von Regel-/Datenentwurf in eigener Implementierungsphase gezielt entwickeln; wirtschaftliche Vollserien nur in einem separat autorisierten Auftrag.

## Heute tatsächlich geprüft

Befehl: `python tests/analysis/phaseP1/check_concept.py tests/analysis/phaseP1/results/concept-attempt1.json` auf dem vorab gesicherten Analysecommit oben.

**Sieben Rechen-/Textgruppen vollständig erfolgreich:** elf Städte/P/E/Gruppen,40 ganzzahlige Verteilungsfälle inklusive fester Gleichstandsbehandlung,120-Stimmen-Übertrag, sechs Permutationen unabhängiger Tagesereignisse und Spendenaggregation, elf Budget-/Festkostenrechnungen,90-Tage-/33-Delegierten-Arithmetik, Quellensichtung/HTML-Gleichheit. [JSON](../../tests/analysis/phaseP1/results/concept-attempt1.json) · [Log](../../tests/analysis/phaseP1/results/concept-attempt1.log) · [Programm/Abgrenzung](../../tests/analysis/phaseP1/README.md) · [Vorschlagsparameter](../../tests/analysis/phaseP1/proposal.json).

Zusätzliche manuelle Textsichtung ergänzt die Rang-Literale in Zeilen 110/337. Es gab keinen technischen Prüfungsabbruch und keine nach Ergebnissen angepasste Wahlbalance. **Keine HTML-Ausführung, kein Wahlprototyp, keine Spielstandmigration, keine Browserprüfung, keine politische Karriere oder Wirtschaftssimulation.** Historische Berichte/Tests nur gelesen, nicht erneut bestanden. Die allgemeine1.500er-Regel in AGENTS.md erweitert diesen ausdrücklich reinen Konzeptauftrag nicht.

## Noch benötigte Entscheidungen

1. **Bevölkerung:** konkrete Tabelle/20%-Wahlrecht/vier Gruppen bestätigen oder anpassen; zunächst statisch empfohlen.
2. **Wahlkalender:** jährlicher Jahresschluss, Anmeldung270,90 Tage, drei Rivalen; bei frühen/späten Spielstarts und Altmandaten explizite Termine.
3. **Stimmenwirkung:** genaue Kappen/Dauer, ob die vorgeschlagene leichte gleichzeitige Gewichtsverteilung verständlich genug ist; keine Stimmen als sichere feste Prämie versprechen.
4. **Öffentliche Leistung:** zunächst gemeinsame beschränkte Finanzierung oder zusätzliche echte physische Frachtabgabe? Beides wäre neue freiwillige Aktion und benötigt eigene sichere Abnahme. Normale Warenwirtschaft unverändert lassen.
5. **Rivalen:** Jahresrahmen, Anfangskasse und offen begrenzte private Geschäftseinkünfte freigeben; keine unsichtbare Nachfinanzierung.
6. **Ämter/Hanse:** Stichwahl-/Losverfahren,33 Delegierte/17 Mehrheit vs relative Mehrheit,720-Tage-Zyklus und Amtsdauer neuer Eldermänner.
7. **Bestandsschutz:** begrenzte heutige Neubestätigung alter Urkunden, Schutz alter unbefristeter Eldermannrechte, Umgang mit altem Titel ohne bekannte Amtsstadt.
8. **Technik:** neue Speicherfassung (gegebenenfallsV14), unabhängige Regelversionen und gemeinsame atomare Persistenz einschließlich Wirtschaft/Information; kein bloßes Zusatzfeld anV13.

Keine dieser offenen Detailfragen wurde durch die vorliegenden Rechenproben automatisch entschieden. **Keine Produktivimplementierung oder nächste Phase begonnen.**

## GitHub-Übergabe

[Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/analysis/p1-election-concept) · [Vergleich gegen development/v04-foundation](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...analysis/p1-election-concept?expand=1). Alle fünf Berichte und Ergebnisse werden auf diesem Branch gesichert, kein Merge. Tatsächlicher PR-Ausgang und Abschlussprüfungen werden nach Veröffentlichung ergänzt.
