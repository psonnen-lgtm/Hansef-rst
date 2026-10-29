# Q1.03 – Eine überarbeitete bestehende Karriere

29.10.2026 · **Keine neuen politischen Regeln implementiert.** [Gesamtbericht](Q1_03_gesamtbericht.md) · [Gilde](Q1_03_gildenmodelle.md) · [Regressionen](Q1_03_testkonzept.md).

## Beschlossen und noch zu entscheiden

Handel/Ankunft/Umladen schaffen keinen unmittelbaren politischen Ruf. Gildenmitgliedschaft wird bewusst beantragt, kostet eine noch offene Gebühr und ist Zugangsvoraussetzung. Ratsherr bleibt politischer Rang ohne automatische Finanzvorteile; Bürgermeister und Eldermann bauen auf echten Verdiensten/Unterstützung auf. Bestehende Titel und gültige Belege bleiben geschützt.

**Nicht beschlossen:** konkrete neue Rang-/Punkteschwellen, Gebühr, Behandlung Fernkaufmann, Ersatz der Vermögensanforderungen, Gewichtung gesellschaftlicher Beiträge und neue Diensttypen. Ältere P1-Vorschläge, Fernkaufmann/Ratsherr vollständig abzuschaffen, werden hier nicht übernommen. Frühere Modelle echter Bürgerstimmen/aktiver Rivalen sind keine bereits produktive Engine. Q1.03 entwickelt keine zweite Karriere daneben.

## Empfohlene Trennung von Wirtschaft und Anerkennung

`s.gold`, Bank, Schuld, Ladung, Kosten und realer Gewinn bleiben Wirtschaft. Der vorgeschlagene Gildenbeitritt ist eine reale Ausgabe mit Statusänderung, keine Pluspunktezahlung. Politische Wahrheit bleibt das vorhandene `politics.records`-Leistungsbuch mit eindeutigen Quellen, Ort, Art und Zeitpunkt; Siegel/Amts-/Vertragsdaten bleiben maßgeblich.

**Globale Reputation:** `s.rep` enthält heute Handel, Ankunft, gewöhnliche Aufträge und Kirchenspenden gemischt. Alte Anteile sind nicht rekonstruierbar. Wert unverändert übernehmen und sichtbar als allgemeiner/teilweise historischer Ruf behandeln; keine rückwirkende Subtraktion, keine Umrechnung in Stadtstimmen. Empfohlen: `s.rep` aus aktiven politischen Zugangsschwellen und der örtlichen Unterstützungsformel herausnehmen. Neue Handels-/Ankunfts-Rufschreibungen entfallen; keine zweite globale Politik-XP-Währung ergänzen.

Gewöhnliche Lieferaufträge behalten nach Empfehlung ihre Geldprämie; ihr heutiges pauschales+4 darf nicht automatisch politischen Verdienst bedeuten. Nur ein ausdrücklich gültiger politischer Versorgungsbrief liefert den politischen Quellenbeleg. Reale Kirchenspenden dürfen Geld kosten und allgemeine gesellschaftliche Rückmeldung geben; ihre spätere politische Anerkennung/Deckelung ist offen, kein direkter Gold→Stimmen-Konverter. Die heutige50/200-G-Mechanik wird hier nicht verändert. Erfolgreiche Piratenabwehr ist heute ein Reiseereignis, noch kein eigenständiger politischer Schutzauftrag; keine neue Anerkennungsquelle eigenmächtig erfinden.

Ein regulärer Verkauf bleibt regulär, auch wenn er profitabel ist. Erfüllt derselbe Verkauf einen zuvor angenommenen gültigen politischen Brief, zählt **dessen eindeutiger Abschluss**, nicht der Umsatz. Geldprämie eines gewöhnlichen Auftrags und politischer Dienst dürfen nicht dieselbe Quelle mehrfach politisch anerkennen. Herkunfts-/Frist-/Mengenregeln bewahren. P1.2-Endverbrauch bleibt nicht integrierter Prototyp, keine automatische zusätzliche Verbrauchsregel hier.

### Kritische Abhängigkeit der Unterstützungsformel

Heute maximal100: Wirtschaft10 + globaler Ruf15 + Dienste40 + Zusagen20 + Ratsvereinbarungen15. Entfernt man nur Wirtschaft/Ruf, bleiben **höchstens75**. Das alte Lübecker Ziel80 wäre dann unerreichbar. **Ein bloßes Löschen zweier Summanden ist keine sichere Korrektur.**

Ein einfacher technischer Vorschlag ist `Unterstützung = 100 × (Dienste + Zusagen + Vereinbarungen) /75`, weiterhin aus bestehenden lokalen Belegen, kein neuer gespeicherter Punkttopf. Die verbleibenden Komponenten sind weiterhin gedeckelt. Beispiel3 Versorgung+3 Vereinbarungen aus3 Abschnitten: lokale Summe65, normiert86,67; zuvor mit45.000 Vermögen/55 Ruf76,67. Das würde die Wahl erleichtern, ist **nicht balanceneutral und nicht beschlossen**. Alternativ Stadtziele neu fachlich bestimmen. Beides braucht Nutzerentscheidung und spätere Tests jeder Stadt; keine Zielwerte automatisch geändert. Auch normierte Unterstützung ist noch keine echte absolute Bürgerstimmenzahl.

## Einordnung der Ränge

| Stufe | Empfohlene Ausrichtung | Offene Einzelentscheidung |
|---|---|---|
| Kaufmann | Wirtschaftliche Ausgangsstellung, Handel frei ohne Gilde | Keine neue Hürde |
| Fernkaufmann | **Empfehlung: wirtschaftlicher Ehrentitel**, keine politischen Punkte/Vorteile, kein zwingender Vermögensumweg vor Ratsherr | Ehrentitel oder politische Vorstufe; Bedingungen und Darstellung ausdrücklich offen. Bestehende Titel erhalten. |
| Ratsherr | Gilde/geschützter Altzugang und ausdrücklicher Antrag plus nachgewiesene örtliche Verdienste; keine automatischen Rabatte/Kredite | Einfacher Prüfvorschlag: eine gültige Versorgung und eine gehaltene Ratsvereinbarung in politischer Heimat. Zwei bestehende Arten statt neuer Pflichtmechanik; genaue Mindestleistung offen. |
| Bürgermeister | Ratsherr, Gilde/Altzugang, Heimatkandidatur, echte örtliche Belege/Unterstützung und vorhandene Bewährungsstruktur | Neue Leistungs-/Unterstützungsformel, Vermögens-/Rufschwellen, Wahlfenster; nichts neu festgelegt. |
| Eldermann | Bewährtes Bürgermeisteramt, mehrere örtlich belegte Unterstützer/Siegel und Hansevertrag | Politische Vermögensschwelle empfohlen entkoppeln; bestehende Siegel-/Raum-/Vertragsanforderungen nicht blind ersetzen. |

Die bisherigen18.000/45.000/180.000-G-Schwellen sind **Bestand**, ihre Entfernung eine Empfehlung, kein bereits gefasster neuer Zahlenbeschluss. Falls Vermögensanforderungen bleiben, dürfen sie nur eine gegen Buchwertumlagerung neutrale Zulassungsbasis verwenden, nicht den bisherigen Kostenbuchwert. Ein Rangwechsel bleibt ausdrücklicher Antrag; keine automatische Ernennung beim Kauf einer Gildenmitgliedschaft.

Für neue Partien empfiehlt sich politische Heimat=`beginning.city`, getrennt von Betrachtungsort/Anwesenheit. Bestehende Amtsstädte und effektive politische Heimat bewahren. Bei fehlender alter Heimat keine Stadt still erfinden; einmalige ausdrücklich dokumentierte Festlegung, siehe Migrationsbericht. Keine heutige freie Stadtkandidatur rückwirkend für ungültig erklären.

## Funktionsmatrix: Bestand, gezielte Anpassung und Tests

Zeilen beziehen sich auf unveränderte HTML an Basis02ee6b8; vollständige Funktionszeilen im [lesenden Inventar](../../../tests/analysis/q1_03/inspection.json). T-IDs im Testkonzept. Sämtliche Änderungen in der Spalte „Anpassung“ sind zukünftige Entwürfe.

| Funktion/Mechanik heute | Notwendige/empfohlene Anpassung | Bleibt erhalten | Saveauswirkung | Abhängigkeit | Regression |
|---|---|---|---|---|---|
| `trade`905: positive Marge bis2 Ruf je Aktion | Kein politischer Ruf aus normalem Handel; nur expliziter Dienstabschluss separat | Preis, Zahlung, gewichtete Kosten, Herkunft, Ladung | Alte Ruf-/Kostenwerte nicht löschen | `completeQuests`, `politicalTrade` | H01–H08,P08 |
| `arrive`1026: jede Ankunft+1 Ruf | Kein politischer Ankunftsbonus; persönlichen Ort nur bei gültiger tatsächlicher Mitreise aktualisieren | Tage, Gebühren, Schäden, Schiffshäfen | Neuer versionierter Ortsbeleg | Reisevorbereitung/Fernansicht | O01–O08 |
| `s.rep`, `donate`, `completeQuests` | Kein ungeprüfter globaler Rufanteil in politischer Zulassung; gesellschaftliche Quellen gesondert entscheiden | Alte Werte, Geldprämien, vorhandene Spendenpreise | Historische Herkunft unbekannt offen markieren | Ratstafel/Ruftexte | H07,P07–P09,M06 |
| `politicalSupport`362–366: lokale plus globale Komponenten | Globale Vermögens-/Rufabkürzung entkoppeln; erreichbare Formel gemeinsam beschließen | Lokale Dienste, Zusagen, Stadtprofile | Kein zweiter persistenter Stadtruf nötig | Alte Zielwerte sonst75/80-Blockade | P04–P07 |
| `acceptPoliticalJob`, `completePoliticalSupply`, `politicalTrade` | Eintrittspolitik/Gilde klar prüfen; Abschluss aus gültiger Quelle, keine doppelte Anerkennung | Arten, IDs, Fremdherkunft, Fristen, keine neue Goldprämie | Laufende Briefe/issued erhalten | Orts-/Transaktionsguard | P08,P10,M07 |
| `witnessPoliticalJob`, `finishPoliticalAccord`453–459 | Echte persönliche Anwesenheit und Reisebeleg statt `s.city` | Annahme, gültige Zwischenbestätigung, Rückbericht, ID | Anwesenheit plus Übergangsregel laufender Jobs | Q-003, Migration | O01–O06,M07 |
| `promote`988: frühe Ränge über Netto/Ruf | Ratsherr über Gilde/Verdienste, Fernkaufmannentscheidung auslagern; keine automatische materielle Leistung | Historisch erworbene Titel, ausdrücklicher Antrag | Rangcode/Anzeige kompatibel führen, kein Entzug | Guildguard und neue Qualifikation | P01–P03,M02 |
| `mayorQuote`/`runMayorElection` | Gilde, Heimat, Anwesenheit, Verdienste; Ruf-/Vermögensanteile entscheiden | Zulässigkeit getrennt von Mehrheit, kein Wahlsieg durch Anzeige | Bestehende Amts-/Wahldaten bewahren | Erreichbare Unterstützung, Hometyp | P03–P07,M03 |
| `nextElection`/`politicsClock` | Neue aktive Regeln explizit versionieren | Gespeicherte30/60-Tage-Abschnitte, Fristen, verlorene Wahl ohne Urkundenverlust | Kein Reset beim Laden | Regeln/Altstandübernahme | P06,M04,M08 |
| `politicalOfficeProof`, `reviewMayor`, `resignMayor` | Geschützte Amtsrechte und künftige Gildenbedingung auseinanderhalten |2 neue Dienste/2 Abschnitte mit Vereinbarung als heutiger Bestand; Titel bleibt nach Amt | Amt, firstReceipt, Termine nicht neu beginnen | Laufende Dienste, Heimat | P10,M03–M04 |
| `politicalRecord` | Kanonischer einmaliger Tatbeleg, Quelle/Ort/Gültigkeit | Bestehende IDs/Urkunden,8192-Grenze sichtbar behandeln | Kein Löschen gültiger alter Belege | Doppelquellen Quest/Dienst/Import | P08,M05,M09 |
| `requestEndorsement`, `politicalLeagueAccess` | Kein neues Siegel nur durch Fernansicht/Gilde; persönlichen Antrag schützen | Beide örtlichen Arten, politischer Zugang, Heimatmandat als Heimatsiegel | Endorsements/terms unverändert | Anwesenheit, Altzugang | P10–P11,O04 |
| `accept/witness/finishHanseAgreement` | Persönliche Anwesenheit an jeder erforderlichen Station | Zwei auswärtige Fürsprecher/Handelsräume, Rückbericht,720-Tage-Frist, bestehende IDs | league/visited/leagueIssued erhalten | Keine Delegation; Übergangsbelege | P11,O04,M07 |
| `hanseQuote`/`runHanseAssembly` | Gilde/Altzugang, bewährtes Amt, echte lokale Fürsprecher; kein Buchwert-/Globalrufersatz | Erworbener Eldermanntitel, Weiterhandel, konkrete Siegel/Vertrag | Titel und elderman-Daten erhalten | Heimatamt vor Eldermann; Ortsguard | P11–P12,M03 |
| `politicalCareerModel`/Ratstafel/Hausdialoge | Neue Bedingungen/Altstatus erklären, alte Handlungsaufforderung „durch Handelsruf“ entfernen | Ein bestehendes Fortschrittsbild, Gründe/Fristen, zugängliche Gebäude | Reine Darstellung folgt Regelrevision | Keine versteckten Parallelpunkte | U01–U04 |
| `creditLimit`, `netWorth`, Lager-/Ladungswert | Buchwert nicht als beliebig hebelbare Zulassungsbasis verwenden, W1/W2 entscheiden | Geld, Bank, Schuld, Finanzkosten, reale Gewinne/Verluste | Wirtschaftsdaten nicht rückwirkend umschreiben | Kreditrahmen und Rettungsweg nutzen gemeinsame sichere Basis | H05–H12,M06 |

Eine neue Gildenfunktion darf nicht nur den Button deaktivieren. Jede mutierende Eintritts-/Aufstiegs-/Vorsprachefunktion muss den Guard serverlos am kanonischen Zustand erneut prüfen; reine UI-Sperren sind umgehbar. Dies ist ein Umsetzungsbedarf, kein hier ausgeführter Code.

## R1.11 und ungefähr90 aktive Stunden

R1.11-Budgets8+17+20+20+25 Stunden bleiben Hypothesen: erste Handelsbasis; ortsbekannte Beziehungen; Ratsherr/Bürgermeisterziel; Amtsbewährung; überregionale Bündnisse. Der Gildenantrag gehört in einen bestehenden frühen Abschnitt, **nicht als zusätzliche Stundenphase obenauf**.500 Gold oder ein Ratsabschnitt lassen sich nicht in menschliche Stunden umrechnen.

Handelsorientierte Spieler finanzieren später politische Zeit/Kosten; vorsichtige Spieler leisten kleinere zulässige Dienste, soziale Spieler benötigen echte genehmigte Quellen statt bloßer Spendenpunktkäufe. Ein militärischer Spielstil braucht erst einen separat freigegebenen konkreten Schutzauftrag. Keine fünf neuen Diensttypen versprochen. Der Bestand bietet derzeit nur Versorgung und persönliche Vereinbarung; abwechslungsreiche90 Stunden damit nicht belegt.

Nach Gilde: erste gültige lokale Aufgaben, Ratsherrziel; danach Heimatunterstützung, begrenzte Niederlage/Erholung, Amtsbewährung und fremde Siegel/Vertrag. Mehr Pflichtwiederholungen oder höhere Summen allein wären keine Qualitätssteigerung. Neue Mindestzahlen erst nach Prüfung sinnvoller Entscheidungen und Leerlauf. Spielstilvielfalt, verlorene Wahlen, wirtschaftliche Wiederaufnahme und tatsächliche aktive Zeit in später freigegebenen menschlichen Tests messen; hier keine Karriere/Simulation gestartet.
