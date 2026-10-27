# Phase P1 – Bestandsschutz, Datenentwurf und vollständige Änderungsliste

27.10.2026 · Europe/Berlin · **Konzeptphase, keine produktive Implementierung.**

Frisch geprüfte GitHub-Basis: **`a5ec92a19018a4049567c80f8e8fbd687f3a8d3e`**, Merge #42. Branch **`analysis/p1-election-concept`**. Produktiver Stand unverändert **0.8d.1b / V13**, letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kleines Analyseprogramm und Vorschlagsparameter vor Prüfung veröffentlicht: **`9fd3b0851738ec161b19d6d370e99e7a62a19eac`**. Spätere Berichtscommits sind keine angeblichen neuen Spielcode-Teststände.

**Verbindlich beschlossen** sind Wahlen mit absoluten Stimmen, elf Stadtbevölkerungen mit begrenztem Wahlkörper, aktive finanzierte Konkurrenz, Abschaffung aktiver Kaufmannsränge und Vermögens-/Ansehenshürden sowie Bestandsschutz. **Alle nachstehenden konkreten Zahlen, Intervalle, Gruppen-, Finanzierungs- und Übergangsregeln sind begründete Vorschläge zur Entscheidung**, noch keine genehmigte Balance.

[Wahlordnung](2026-10-27_P1_wahlordnung.md) · [Einwohner/Wähler](2026-10-27_P1_einwohner_waehler.md) · [Rivalen/Stimmen](2026-10-27_P1_rivalen_stimmen.md) · [Bestandsschutz/Änderungsliste](2026-10-27_P1_bestandsschutz.md) · [Entscheidungsgrundlage](2026-10-27_P1_entscheidungsgrundlage.md).
## Kein bestehender Spielstand wurde migriert

Diese Phase liest HTML und Testquellen als Text. Keine Partie geladen, keine historischen Dateien neu gespeichert und kein produktives Feld ergänzt. Der bestehende V11→V12→V13-Pfad bleibt unverändert. Die nachfolgenden Abläufe sind ein **technischer Migrationsplan**, kein bestandener Migrationsnachweis.

## 1. Kaufmannsränge wirklich aus der aktiven Karriere entfernen

Nicht nur den Knopf verstecken: neue Amtsvergabe darf weder `rank++`, Vermögens-/Ansehenstabellen noch alte Scorefunktionen aufrufen. Alte Werte werden als **historische Information** bewahrt; sie sind kein Fortschrittsautomat für neue Spiele. Rang 1/2 dürfen auch nach Laden, Tageswechsel, Handel oder Test-Hilfsaufruf nicht neu entstehen.

Die lesende Analyse findet31 Zeilen mit Rangzugriff/-funktion, Legacyfeld oder alten Rangbezeichnungen. Hinzu kommen die manuell gesichteten Literalfelder in `fresh` (Zeile 110) und der sehr alten Einzelschiffmigration (Zeile 337): **33 politische Rang-/Legacy-Fundstellen insgesamt** im aktuellen produktiven HTML. Die zwei zusätzlichen Literalfelder sind im [manuellen Inventurprotokoll](../../tests/analysis/phaseP1/results/manual-inventory.json) festgehalten. Der Nachweis speichert außerdem die betroffenen Funktionen und 41 bestehende Test-/Analysedateien mit Fundzeilen. Das ist eine Textinventur, kein Beweis sämtlicher dynamischer Aufrufbeziehungen.

| Bereich / Code an der Basis | Spätere Änderung | Bestandsschutz |
|---|---|---|
| `fresh`110, `newMerchantGame`1052–1055 | Neues Spiel nur Kaufmann ohne aktive Rangstufen; neue Amts-/Wahlfelder | Gold5.000, Kogge,11 Startorte, Name/Person/Anfangsprovenienz unverändert. |
| `validate`317 | Rang nicht länger zwingendes aktives Karrierefeld; neue Amtstypen getrennt prüfen | Altfeld auf seiner Originalfassung weiterhin validieren, nicht blind entfernen. |
| `migrateFiveCitySave`337/342 | Sehr alte `rank`-/`electionAvailableAt`-Übernahme als Legacy bewahren | Keine Umdeutung alter Daten in neue Wahlergebnisse. Keine Neuerfindung alter Stadt/Zeiten. |
| `freshPolitics`349, `migratePolitics`535–545 | Legacy-Rang in altem Politikarchiv; neuer Schemaaufbau | Alte Originalparameter/IDs/Datumsbezüge bleiben erhalten. |
| `mayorQuote`368–381, `promote`988 | Rang-/18.000-/45.000-/25-/55-/85.000-Hürden und alten Rangdispatcher streichen | Keine rückwirkende Aberkennung erworbener Titel; keine automatische Vergabe fehlender Ämter. |
| `politicalSupport`361–367, `POLITICAL_CITIES`610 | Alten score/target-Siegervergleich abschalten | Alte Gruppen-/Anliegen-/Regionsnamen behalten; frühere Scorewerte klar als historische Daten benennen. |
| `runMayorElection`461–469 | Keine Rang 3-Zuweisung nach Score; echte Wahl-ID/Resultat/Amt | Alte `appointments.support` nicht in Stimmen umrechnen. |
| `politicalLeagueAccess`398, `politicalHome`399, `hanseQuote`400–411 | Zugang/Heimat aus tatsächlichem oder geschütztem Amt; Geld-/Ansehens-/Rangchecks entfernen | Bekannte Heimat bewahren; unbekannt bleibt unbekannt. |
| `runHanseAssembly`488–494 | Kein automatisches Rang 4 nach Checkliste; Delegiertenwahl | Alter Eldermann-Nachweis und Titel bleiben gültig. |
| `validatePolitics`497/525/529–532 | Rang-Abhängigkeiten von Amt/Terminen und fixed-support-Validierung nur im Legacy-Validator | Neues Amt braucht Ergebnis/gewählte Regel oder ausdrücklich markierte Altfallprovenienz. Nicht alte Belege an neue Regeln anpassen. |
| `politicalCareerModel`556–573 | Bürgermeister-/Eldermannanzeigen ohne Rang-/Gold-/Ansehensbalken | Historische Erfolge getrennt von neuem Wahlstatus. |
| `politicalCareerBoard`575–578 | Rang-/Titeltext, Folgeschritt und falsche Karriere-Gates ersetzen | Aktives Amt, früher erworbener Titel und ehemaliger Kaufmannsrang unterscheiden. |
| `politicsHallView`580–606 | Aufstiegskasten586, Score-/Rivalentafel587–588, Hansegates/Knopf ersetzen | Urkunden, Ratsbriefe, bestehende Amtshistorie weiter lesbar. |
| `rank`799, `render`876 | Anzeige „Amt/Titel“ aus neuem Amtsmodell; keine indexbasierte aktive Rangliste | Kaufmann als Berufsbezeichnung; frühere Fernkaufmann-/Ratsherr-Ehrung optional im historischen Kaufmannsbuch. |
| `contorView`986, `hallView`987 | Rangabhängige Kontorstufe und Rangtexte aus aktiver Karriere lösen; Rathausroute bleibt | Bisher sichtbarer Kontorzustand als eingefrorene Alt-Darstellung übernehmen; spätere rein dekorative Entwicklung separat entscheiden, keine neue Besitzmechanik. |
| `save`782, `exportGame`1029, `importGame`1030, Startup1267 | Format-/Versionsprüfung, neue Politikfelder vollständig exportieren, atomare Kopie importieren | Alle sonstigen Werte und Originalbackup behalten. Alte Clients dürfen neue Felder nicht still verlieren. |
| `Testlog.event`1247, `snapshot`1248 | Neue Amts-/Wahl-ID/Ergebnisfelder; rank nur noch historisch | Gesicherte alte Ereignisse nicht umschreiben, keine rückdatierten Wahlereignisse. |
| Status, Rathaus/Kontor, Start-/Hilfe-/News-/Kartenaufrufe | Alle dargestellten Karrierewörter/Tastaturziele/Geräteansichten prüfen | Bestehende Städte-/Raumgrafiken und Navigation verwenden; keine Pflicht zu neuen Bildern. |

Die automatischen31 Fundzeilen stehen vollständig hier:

`317, 342, 349, 370, 398, 402, 465, 492, 497, 525, 529, 530, 531, 532, 539, 542, 558, 563, 565, 566, 567, 577, 584, 586, 603, 799, 876, 986, 988, 1247, 1248` sowie manuell `110,337`.

Diese Liste bezeichnet den eingefrorenen Basisstand; spätere Zeilennummern können sich verschieben. Historische HTML-Versionen, alte Analyseprogramme und Ergebnisdateien werden **nicht** nachträglich auf das neue Wahlverhalten umgebaut. Stattdessen neue Tests gegen die neue Regelfassung ergänzen, alte für ihren ursprünglichen Stand erhalten.

### Testquellen, die beim späteren Umstieg bewusst geprüft werden müssen

- `tests/phase1.cjs`: vor allem heutige positive Rangsteigerung nach echtem Gewinn und bestehende Alt-Rangbewahrung. Die neue Fassung muss „kein Amt/Rang nur durch Gewinn“ prüfen; alte Erwartung als historische Prüfung erhalten, nicht kommentarlos löschen.
- `tests/simulation/politics-rules.js`: derzeit wortgleiche Politik-Kopie des HTML; bei echter Umsetzung gemeinsam versionieren/abgleichen, keine heimliche zweite Wahlengine.
- `politics-checks`, `politics-post-title-check`, `politics-concurrency-check`, `politics-browser-checks`, `politics-browser-post-title`: alte Zugangsvoraussetzungen, Vermögensscore, Ämter/Legacy/Speicherpfade.
- `political-progress-{checks,browser,fixtures}` und `city-life-politics-browser`: Ratstafel/Buttons/Ranglabels/alte Importfixtures.
- `start-selection-*`, `information-checks`, `trade-letter-checks`, Lager-/Werft-/Hafen-/Schiffverkaufstests: Format-/Amts-/Rangfixtures und wirtschaftliche Unverändertheit.
- `politics-strategy.js`, `strategies.js`, `integrated.cjs`, historische Phase 06-/Analyseprogramme: Annahmen über Ränge/Ziele/`promote`. Alte Ergebnisvergleiche nicht mit neuer Regelfassung vermischen; neue Wahlstrategie später getrennt erstellen.

Alle41 konkret gefundenen Dateipfade samt Zeilen sind im letzten Prüfblock des [Quellennachweises](../../tests/analysis/phaseP1/results/concept-attempt1.json) aufgeführt. Kein bestehender Test wurde heute geändert oder ausgeführt.

## 2. Minimaler zukünftiger Datenentwurf

**Neue Speicherfassung erforderlich, Name „V14“ noch offen.** Heutige strikte V13-Validatoren lassen sich nicht sicher durch zusätzliche unkontrollierte Felder umgehen. Preisregel und Wahlregel unabhängig versionieren; keine automatische B3-Einführung mit der Wahlmigration.

Schematische Struktur, kein eingebautes Schema:

```text
v: nächste beschlossene Formatversion
politicalElection:
  schema, rulesVersion, activatedAt, politicalSeed, revision, lastClosedDay
  population[11]: {cityId, population, electors, groupSizes, rollDay}
  candidates: {id, homeCity, name, type, baseWeights, treasury,
               productiveCapital, annualIncomeId, annualSpent,
               nextActionDay, currentPledges}
  cities[11]: {electionId, nominationUntil, campaignFrom, countDay,
               frozenElectors, eligibleCandidateIds, tiePriority,
               currentSupportByGroup, undecidedByGroup, effects,
               pooledDonations, reservedNeedIds, lastClosedElectionId}
  pendingActions: {id, actorId, sourceId, day, kind, cost,
                  reservedResources, dueDay, resultStatus}
  results: {id, cityOrHanse, ruleVersion, electorate, candidateVotes,
            abstentions, countedAt, winnerId, tieResolution}
  offices: {mayor, elder, formerTitles, provedTerms}
  hanse: {electionId, delegates[33], candidateIds, dueDay, resultId}
  legacy: {originalVersion, originalDate, rank, oldPolitics,
           reconfirmedSourceIds, protectedOfficeProvenance}
```

Neue Wählerdaten, NPC-Konten, Wahltermine und Ergebnisbelege sind neue Daten, keine aus alten Scores abgeleiteten historischen Tatsachen. Aktuelle Unterstützerzahlen können überprüfbarer Cache der Gewichte sein; Validator muss Cachegleichheit verlangen oder ausschließlich aus dem kanonischen Zustand anzeigen. Eindeutige IDs enthalten Regelversion/Partie/Stadt/Zyklus/Beleg, nicht `Date.now()` bei jedem Öffnen.

Aktive Daten auf laufende Perioden begrenzen, abgelaufene IDs per Periodenabschluss gegen Wiedereinreichung sperren. Wahlausgänge als kleine append-only Protokolle bewahren. Keine gültigen Altdaten/gekauften Belege automatisch löschen. Vor Implementierung Größen-/Speichergrenzen mit langen Altständen messen; bei Erreichen eines harten Limits explizit ablehnen und Export anbieten, nicht Chronik still abschneiden. Keine heute angeblich gemessene KB- oder Leistungsfreigabe.

## 3. Unverändert zu bewahrende Felder und Beziehungen

| Altbestand | Übernahmeregel / Prüfkriterium |
|---|---|
| Gold, Bank, Schuld/Zinsen | Zahlen bit-/wertgleich vor/nach Kopienübernahme; kein Eintrittsgeld, keine Nachverzinsung oder Neubewertung. |
| Schiffe, IDs, Bauaufträge/`lastShipId`, Standorte/Aktivschiff | Reihenfolge, IDs und Verknüpfungen erhalten; kein Neustart, keine neue Zufallsziehung. |
| Ladung/Waren/gewichtete bekannte oder unbekannte Kosten/`bookCosts` | Alle Werte erhalten, unbekannt bleibt unbekannt; keine politischen Ersatzgewinne erfinden. |
| FIFO-Stadtherkunft | Lose/Mengen/Reihenfolge gleich; kein Wiederherstellen fremder Herkunft durch Wahlmigration. |
| Lager/Erweiterungen/Mietschuld/Fristen | Ganze Daten erhalten; keine Löschung übervoller Bestände oder Mietrückstände. |
| Märkte/Produktion/Journal/Sondertipps | Preise, Bestände, Datumsbezüge, `special`/Ablauf erhalten. Keine Preisanker aus Analyseprototypen übernehmen. |
| V12-/V13-Informanten/Handelsbriefe/Archiv | IDs, gekaufte Inhalte/Preise/Datum und eingetragene Belege unverändert; nichts neu bezahlen/neu erzeugen. |
| Politische Dienste/Versorgung/Ratsvereinbarungen | Vollständige alte Belege, Ursprung/Frist/Witnesses erhalten. Neue Wählerwirkung separat bezeichnen und gegen Doppelbestätigung schützen. |
| Siegel, Zusagen, Hansevertrag | Urkunden und tatsächliche Beziehungen erhalten; keine Umrechnung alter Unterstützung in heutige Wähler oder Delegiertenstimmen. |
| Aktive Ämter, frühere Titel, bewährte Amtszeiten | Gültige Rechte beibehalten; bekannte Städte/Zeiten erhalten, fehlende nicht erfinden. |
| Alte30-/60-Tage-/45.000-/85.000-Parameter, `legacyRank`, `nextElection`, `electionAvailableAt` | Als historischer Originalzustand speichern; niemals weiter aktive Rang-/Geldwahl auslösen. Ausstehende alte Jobs behalten zur Abwicklung ihre ursprüngliche Regelfassung. |
| Chronik, Ereignisse, `beginning`, Person/Startstadt, sonstige gültige Felder | Ganze Originaldaten übernehmen, keine neuen rückdatierten Wahlen/Spielerleistungen. Historische Scores als solche lesen. |

Normale Spielfortschreibung nach erfolgreicher Einführung darf Werte natürlich durch echte Aktionen ändern; Gleichheit gilt für die **Übernahme selbst**. Geschützte historische Datenteile bleiben unverändert referenzierbar.

## 4. Transparenter Umgang mit alten Diensten und Zusagen

Ein alter Unterstützungswert80 ist **keine** Aussage „80 Bürger“ oder „80% der heutigen Wähler“. Alte `appointments.support` bleiben im alten Ergebnisdatensatz, ohne daraus Stimmen/Wahlbeteiligung zu erzeugen.

Vorschlag: bei erster Aktivierung werden neue heutige Wählerlisten und öffentliche Ausgangsbindungen als **neuer gegenwärtiger Zustand** angelegt. Ein Übergangsbrief erklärt die Regeländerung, zeigt die erhaltenen Urkunden und den neuen ersten Wahltermin. Alte Leistungen müssen nicht erneut erbracht werden: aus einem gültigen alten Versorgungs- oder Ratsbeleg kann der Spieler je Stadt/Art einmal eine **öffentliche Neubestätigung** anfordern. Diese erzeugt erst jetzt ein aktuelles Bestätigungsereignis, mit begrenzter Wirkung im bereits gedeckelten Dienst-/Zusagenkonto und Vorschau auf die neuen absoluten Zahlen.

Dafür keine alte Datum-/Stimmenfiktion und kein direktes `alterScore×E`. Gleiche historische Beleg-ID kann nicht nach Reload erneut bestätigt werden. Viele alte Urkunden stapeln nicht unbegrenzt; maximal die heutigen Kategoriedeckel, z.B. Ratswirkung30/70/40/130 für180 Tage. Ein bereits derselben Quelle zugeordneter laufender Dienst erhält keine zweite volle Zusagenwirkung. Konkrete Großzügigkeit/Dauer des Übergangs ist noch zu genehmigen.

Laufende alte Briefe behalten Fristen, Herkunftsprüfung und vereinbarte echte Belohnung. Neues Angebotssystem stellt keine doppelten alten Jobs bereit. Beim Abschluss wird die alte Quelle genau einmal als neuer heutiger Nachweis referenziert; unbekannte Historie bleibt unbekannt. Das ist ein Adapter für bestehende Verpflichtungen, keine fortgesetzte alte Rangwahl.

## 5. Bestehende Ämter und erster Wahltermin

- V11/V12/V13 mit **aktivem Bürgermeisteramt und bekannten Daten**: Stadt, Beginn und ursprüngliches Ende bleiben. Keine vorzeitige neue Wahl beendet dieses Mandat. Erster neuer Stadtwahltermin nach dessen Ende, mit mindestens 90 Tagen Vorlauf seit Aktivierung. Nach Ablauf bis dahin Ratsverwaltung; historischer Titel/bewährte Amtsführung bleiben.
- Ein schon erworbener **Bürgermeistertitel ohne aktive Amtsstadt** bleibt so bezeichnet. Keine erfundene Stadt/Amtsdauer/Wahlstimmen. Bestehende nachgewiesene frühere Amtsführung kann für spätere Hansekandidatur zählen; bloßer alter Titel ersetzt fehlenden Nachweis nicht still.
- Ein bereits vorhandener **Eldermann-Nachweis oder geschützter Legacy-Titel** bleibt vollständig erworben. V13 kennt dafür keinen befristeten neuen Wahlzyklus. Vorschlag: als `protectedLegacy` mit bestehenden Rechten ohne rückwirkendes Ablaufdatum weiterführen; kein erforderliches Neugewinnen. Die vorgeschlagene720-Tage-Frist gilt erst für neu gewählte Mandate. Ein etwaiger freiwilliger Wechsel ins neue Wiederwahlsystem wäre eigene ausdrückliche Entscheidung.
- Rang 1/2 historisch behalten, aber nicht als Kandidaturrecht, Stimme oder aktiver nächster Karriereschritt verwenden. Noch nicht erreichte Ämter werden nie durch Übernahme verliehen.

Erste reguläre neue Stadtwahl am ersten Jahrstag360, der mindestens 90 vollständige Kampagnentage nach Aktivierung erlaubt; Nominierungsschluss muss noch erreichbar sein. Für geschützt später endende Altmandate lokale Ausnahme entsprechend verschieben. Weder bei Aktivierung spät im Jahr eine überraschende sofortige Niederlage noch ein still verlängertes altes Spieleramt.

## 6. Sicherer zukünftiger Übernahmeablauf

1. Quelle unverändert lesen, vollständiges Original inklusive Schlüssel/Version sichern. V11/V12 auf einer Kopie durch bestehenden bewährten V13-Pfad, V13 direkt validieren. Alte Validatoren/Versionskennungen erhalten; keine neuen Felder vor Prüfung ins aktive Original schreiben.
2. Originalpolitik samt altem Rang/Datum als unveränderliches Legacyobjekt sichern. Alle sonstigen wirtschaftlichen/Informationsfelder vollständig übernehmen, neue gegenwärtige Wahlwelt mit Herkunft `new-rules-activation` daneben aufbauen. Neue Amtsrechte ausschließlich aus eindeutigem Altbeleg oder künftigem Wahlergebnis.
3. Kandidaten-/Stimmen-/Gruppen-/Budget-/Terminsummen und Verweise validieren; alle bewahrten Felder gegen die validierte Ausgangskopie vergleichen. Neues Schema/rulesVersion eindeutig. Keine Änderung der bestehenden Spieluhr/RNG durch Übernahme.
4. Gesamte Partei mit Geld, Reservierungen, Urkunden, Kandidaten, Wählerstand, Wahlresultat und Ämtern **gemeinsam** atomar speichern; erst dann aktiven RAM/Zustand umschalten. Übernahmebericht erst nach dauerhaft bestätigtem Erfolg.
5. Bei Quota/Backup-/Parse-/Validierungsfehler Original/RAM/aktive Speicherung unberührt; Abbruch erklärt, Export erlaubt. Keine Teilspeicherung eines Amtseintrags ohne Ergebnis oder einer Zahlung ohne Beleg.
6. Import/Export enthalten die vollständige neue Fassung, Revision und alle Idempotenzdaten. Fehlende Pflichtfelder nicht durch neue Wählerwelt ersetzen. Alte Clients müssen eine höhere Version ablehnen, kein stiller V13-Export ohne Wahlfelder.

Für parallele Browserfenster reicht das heutige `politicsBusy` im selben Tab nicht. Spätere Veröffentlichung z.B. in **einer IndexedDB-Transaktion mit Vergleich der Revision** plus geregeltem Writer-Lock; Backup/Export/Information und Wirtschaft dürfen nicht daneben unabhängig unter altem `localStorage`-Schlüssel fortschreiben. Wenn nur Web-Locks verfügbar sind, müssen **alle** Schreibpfade dasselbe Protokoll verwenden; reines „lesen, vergleichen, setItem“ bietet keine atomare Mehrtabellen-Garantie. Mobile/Safari-Fallback bei fehlender sicherer Schreibkoordination: zweites Fenster nur lesend, niemals optimistisch beide schreiben lassen. Diese Infrastruktur ist Aufwand und noch nicht implementiert.

Bisherige politische Aktionen sparen auf Kopien und prüfen RAM-Zustand; normale Autosaves können bei Quota dem Datenträger voraus sein. Kein Anspruch, dass dieser Bestand bereits gemeinsame neue Wahltransaktionen absichert. Bei Einführung alle Schreibpfade konsolidieren und echte Speicher-/Browserprüfungen durchführen.

## 7. Test- und Erhaltungsgrenze

Die sieben aktuellen Prüfgruppen sind Text-/Rechenprüfungen; **keine Migration, kein Export-/Import-Rundlauf eines neuen Formats und kein Geräte-/Wahltest**. Historische erfolgreiche V11-/V12-/V13-Prüfungen aus0.8c.3/0.8d.1a/1b und 2a.2/3 werden nur als Vorwissen übernommen. Weder frühere14/6-Altstandproben noch19/18-Basistests wurden wiederholt.

Vor einer Implementierung zuerst Daten-/Berechtigungsentscheidung, atomarer Speicherpfad und konkreter Migrationsvertrag; danach gezielt gültige archivierte V11/V12/V13-Kopien prüfen, ohne Originale zu überschreiben. Vollständiger geplanter Abnahmekatalog im [Entscheidungsbericht](2026-10-27_P1_entscheidungsgrundlage.md).
