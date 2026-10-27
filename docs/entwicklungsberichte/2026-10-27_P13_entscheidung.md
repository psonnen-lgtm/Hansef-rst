# P1.3 – Entscheidung und nachvollziehbare Übergabe

**Vorsichtige Empfehlung: für Lübeck15–30 Fass je tatsächlich bestätigter Notlage, zunächst Erholung vor neuer Hilfe verlangen. Keine Produktivfreigabe.** Kleinere Quoten lassen im gleichzeitigen90-Fass-Liefervergleich mehr frei handelbare Ware zurück. Eine reine Hilfslieferung ohne Überschuss löst dagegen die freie Marktknappheit nicht. Eine Kalenderregel allein ermöglicht unbegründete Serienbelege.

Tatsächlich bearbeitet **28.10.2026 Europe/Berlin**. Angeforderte Dateinamen27.10 bleiben erhalten. Basisbranch vor Beginn auf GitHub frisch geprüft: **`development/v04-foundation` / `bfdc410059bdf935b110382a775410e30d1bef0e`**. Neuer Analysebranch **`analysis/p13-supply-market-balance`**. Keine Zusammenführung.

[Bedarfsregel und Schutzgrenzen](2026-10-27_P13_versorgungsbedarf.md) · [Marktbalance mit konkreten Messwerten](2026-10-27_P13_marktbalance.md) · [Programme/Plan](../../tests/analysis/phaseP13/README.md).

## Acht Antworten zum Abschluss

| Frage | Bestätigtes Ergebnis | Empfehlung / offene Entscheidung |
|---|---|---|
|1. Welche Menge ist vertretbar? |15/30/60 bei insgesamt90 geliefert: erste freie Erholung2/14/61 Tage. Bei ausschließlich15 öffentlich gelieferten Fass77 Tage. |15–30 als vorsichtiger Anfangsvorschlag für Lübeck, keine bewiesene allgemeine sichere Quote.60/90 nicht als Standard freigeben. |
|2. Wie schnell erholt sich der freie Markt? |Erstmals2 Tagesbeobachtungen≥90; Rückfälle ausdrücklich mitgemessen. Natürlicher20er-Markt ohne Verkauf erholt sich in diesem Seed nach77 Tagen. |Kein allgemeiner Termin garantiert, andere Ausgangsbestände/Käufe/Seeds offen. Öffentlicher Rest0 bedeutet nicht freien Markt≥90. |
|3. Wie oft neuer Bedarf? |Reine30-Tage-Wartefrist erzeugt erneute Belege bei86/97 Fass, also ohne neue Knappheit. |Frühestens90 Tage nach letzter Erfüllung, erneuter Nachweis, höchstens2 Aktionen/60 reservierte Fass in gleitenden360 Tagen; zunächst zusätzliche Erholung verlangen. Werte nicht beschlossen. |
|4. Was bei wiederholter Knappheit? |Frühere öffentliche Entnahme kann rechnerisch einen scheinbar neuen Engpass erklären. Sich wiederholende echte Notlagen nicht dynamisch nachgewiesen. |Offenen Rest weiterführen, keine automatische neue Quote. Variante1 bis Erholung pausieren; vorsichtig begrenzte chronische Variante2 separat entscheiden. Normaler Handel bleibt möglich. |
|5. Bleibt Handel attraktiv? |A erhält unverändert2.700 Erlös/1.980 Warengewinn für90 zu Kosten8 und Preis30. B/C30 reduzieren Gewinn real. |Profitable Hilfe zulassen; tatsächliche Beschaffung/Reise-/Risiko-/Anfängerbalance und hohe Sonderkurse offen. |
|6. Können kleine Händler helfen? |Mit200 Gold und15 vorhandenen fremden Fass:450 Erlös,650 Gold danach,330 Warengewinn; Teilmengen teilen gemeinsamen Bedarf. |Keine Mindestflotte/Vermögenshürde. Beschaffung/Reservebedarf nicht durch dieses Fixture garantiert; Spenden müssen freiwillig bleiben. |
|7. Künstliche Notlagen/Serienbelege verhindert? |Eigenentnahme80 trotz Lager/Schiff/Jahreswechsel erzeugt keine neue Versorgungsanerkennung. IDs/Splits/Restmengen begrenzt. Kalendernegativprobe scheitert dagegen am Regelziel. |Kein universeller Exploitschutz. Alter V13-Ansehenskreis+2 bleibt. Alle Marktänderer, Lieferanten und atomaren Schreibpfade vor Integration absichern. |
|8. Welche Regel später? |Gemeinsamer endlicher Bedarf/Endbelege bilanziell machbar, neue Auslöser rein rechnerisch geprüft. |Variante1: Einwohnerstaffel+bereinigte Knappheit+Erholung+rolling Mengen-/Häufigkeitsgrenzen. Chronische Fortschreibung höchstens als getrennt beschlossene Alternative, keine neue Preis-/Produktionswirtschaft. |

## Genau verwendeter Code und gesicherte Zwischenstände

Produktive HTML unverändert **0.8d.1b, SpeicherV13**. Letzter HTML-Commit **`c42c25cf5cf372c210b47f25b00b9f0106044ed3`**; SHA256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Kein B3/K500 und keine neue Politikengine importiert.

| Vor jeweiliger Prüfung gesicherter Commit | Tatsächlicher Zweck |
|---|---|
|`39bc6fb7cd8990d92c1acef7a07ec9b92234257a` |Ursprünglicher Plan, neun bestandene reine Rechengruppen, erster später abgebrochener dynamischer Versuch. |
|`69e41bc4f630c52e223bab8c42b3df5e4d66698c` |Korrigierter Kennzahlenleser/Elf-Kontexte-Fortsetzungsplan; **alle elf vollständigen V13-Verläufe**. |
|`ce835b064a4fc2ea64bdc5a26ab9a445611021b4` |Rohverläufe unmittelbar auf GitHub gesichert, erste rein lesende Bilanzauswertung ausgeführt. |
|`c1f15ecb147257e611c261c11a235a9b8f73cd03` |Korrigierte abschließende rein lesende Auswertung mit richtiger Fallzuordnung/Endbestandsanzeige. |
|`3bb864a487e4c651fa3bfe7092cc805c4c5115e6` |Abschließendes Audit veröffentlicht; vier zusätzliche statische Rückkehr-/Wiederholrechnungen vor deren Ausführung gesichert. |

Keine selbstreferenzielle „getestete Berichtscommit-ID“ erfunden. [Vorabquellensummen](../../tests/analysis/phaseP13/frozen-plan.json), [Fortsetzungsplan](../../tests/analysis/phaseP13/continuation-plan.json) und [Auditplan](../../tests/analysis/phaseP13/audit-plan.json) erhalten die verschiedenen geprüften Fassungen. P1.2-Harness unverändert direkt genutzt, Adapter als neue isolierte Kopie mit Bedarfsarchiv erweitert. Alle ursprünglichen HTML-Funktionen bleiben unverändert.

## Tatsächlich ausgeführte Prüfungen

| Prüfung/Befehl | Tatsächliches Ergebnis und Quelle |
|---|---|
|`node --check` der neuen CJS-Dateien |Syntax erfolgreich; keine Markttage. |
|`node tests/analysis/phaseP13/math.cjs tests/analysis/phaseP13/results/math-attempt1.json` |**9 reine Rechengruppen bestanden**: Einwohnerstaffel, echte zwei Tage, eigene/öffentliche Entnahmen, Kalender/offener Rest, Erholung,90-Tage-Abstand, rolling Budget, gemeinsame Lieferantenquote, Splits/Kosten und wenig Bargeld. [Rohwerte](../../tests/analysis/phaseP13/results/math-attempt1.json), [Log](../../tests/analysis/phaseP13/results/math-attempt1.log). Keine VM. |
|`node tests/analysis/phaseP13/checks.cjs tests/analysis/phaseP13/results/dynamic-attempt1.json` |**Abgebrochen vor erstem Handel/Tag**; erster VM-Kontext zählt. Aggregationsfehler bei Lagerhäusern. Vollständige Ausgabe konnte nicht entstehen. [Fehlerlog](../../tests/analysis/phaseP13/results/dynamic-attempt1.log), [Abbruchmetadaten](../../tests/analysis/phaseP13/results/attempt1-failure.json). |
|Fortgesetzter Prüfcode, neue Ausgabe `dynamic-attempt2.json` |**11 vollständige Verläufe bestanden**, alle verbliebenen inhaltlichen Vergleichsarme. Höchstens90 Tage, maximal5 protokollierte Handels-/Liefer-/Umladeaufrufe einschließlich Replay; mit kontrollierten Bedarfserteilungen/-ablehnungen höchstens10 Entscheidungen. [Rohdaten](../../tests/analysis/phaseP13/results/dynamic-attempt2.json), [Log](../../tests/analysis/phaseP13/results/dynamic-attempt2.log). Insgesamt12 erzeugte Kontexte inklusive Abbruch,902 neue Spieltage über alle unabhängigen Verläufe, keine menschlichen Stunden. |
|`node tests/analysis/phaseP13/audit.cjs …/results/audit.json` |Elf Cash-/Waren-/Bedarfsassertionen bestanden. Nachgeschaltete Fallzuordnung und eine Endbestandsanzeige fehlerhaft; diese Ausgabe nicht als endgültige Tabelle verwenden. [Ursprüngliches Audit](../../tests/analysis/phaseP13/results/audit.json) bleibt unverändert erhalten. |
|Korrigiertes `audit.cjs …/results/audit-final.json` |**11 gespeicherte Bilanzen richtig**, richtige90 Tagespaare und Endstände. [Abschließendes Audit](../../tests/analysis/phaseP13/results/audit-final.json), [Log](../../tests/analysis/phaseP13/results/audit-final.log), [CSV](../../tests/analysis/phaseP13/results/ledger-final.csv). Keine neue VM/Simulation. |
|`node tests/analysis/phaseP13/sensitivity.cjs …/results/sensitivity.json` |Vier reine geschlossene Wiederholrechnungen erfolgreich, keine Marktzeitreihe/VM. [Werte](../../tests/analysis/phaseP13/results/sensitivity.json), [Log](../../tests/analysis/phaseP13/results/sensitivity.log). |

Die ursprüngliche identische Wiederholung05 entfiel zugunsten der harten Zwölfergrenze; **in P1.3 keine vollständige identische Wiederholung behauptet**. Gleicher Seed und tägliche RNG-/Uhrgleichheit zwischen passenden Vergleichsarmen bestätigt, übrige120 Märkte gleich. Die tatsächliche identische Wiederholung aus P1.2 nur historisch übernommen.

Elf vollständige Pfade: normaler90er-Verkauf; A15/A30/A60; kleiner A15; B30/Rest60; C30/Rest60; natürliche Erholung ohne Verkauf; drei kalenderbasierte A15; Selbstkrise mit Lager/zwei Schiffen/Jahreswechsel;3×10 A plus Rest60. Zehn Pfade90 Tage, Selbstkrisenpfad2 Tage. Keine neuen Fahrten, vollständigen Karrieren oder Wirtschaftsserien.

## Fehler und Korrekturen unverändert nachvollziehbar

1. **Erster eigener Analysefehler:** V13-Lagerhäuser als Array statt Objekt gelesen. Vor Handelsbeginn gestoppt. Nur neue Aggregation auf `Object.values` korrigiert; verbleibendes Budget auf elf begrenzt. [Planänderung](../../tests/analysis/phaseP13/amendment.md). Keine Simulation wegen dieses Fehlers mehrfach gezählt oder aus der Historie entfernt.
2. **Erste lesende Nachauswertung:** Nach Entfall von05 waren zwei feste Fallpositionen falsch. Zudem wurde für11 der letzte Tageswert35 vor Rückverkauf statt wirklicher Endbestand115 angezeigt. Cash-/Warenassertionen benutzten bereits den korrekten Endspielstand. Neue Ausgabe, alte erhalten. [Erratum](../../tests/analysis/phaseP13/audit-erratum.md). Hauptvergleich und Erholungszeiten bleiben unverändert.
3. **Absichtlicher negativer Regelbefund:** Kalenderregel erzeugt falsche neue Krisenbelege. Technische Ausführung ist bestanden, **die Kalenderregel hat das wirtschaftliche Anerkennungsziel nicht bestanden**. Nicht durch neue Parameter nachträglich zum Erfolg umdefiniert.
4. **Produktives Altproblem:** Kauf80/Umladen/Rückverkauf ergibt gleiche Gold-/Eigenwarenmenge, aber die bekannte gemittelte Kostenrechnung hinterlässt höhere Restkosten und+2 globales Ansehen. Neu öffentliche Hilfe0; kein Allgemeinschutz des gesamten alten Politiksystems. Keine spekulative Reparatur außerhalb des Auftrags.

## Historisch übernommen, heute nicht erneut ausgeführt

[P1.2-Rohdaten](../../tests/analysis/phaseP12/results/checks-attempt1.json), Testcommit **`6179fa16df15c49afb80e550ba5c43874b0da5d9`**: zwölf damalige V13-Verläufe, öffentliche90er-Abnahme, sieben Tage; ohne Abnahme111 Fass/28 Gold, mit90er-Abnahme29/29. Historische Quest-/Quota-/Export-/ID-/FIFO-Fälle bleiben historische Nachweise. **Kein neuer90er-Lauf und keine erfundene90-Tage-Fortsetzung.**

P1.1-Unterstützungs-/Stimmenrechnungen und P1-Einwohner bleiben Konzepte; P1.3 erzeugt keine neuen Stimmen. Keine bisherigen1.500er-/2.250er-Ergebnisse aktualisiert. Die ausdrückliche Begrenzung des Auftrags überstimmt die allgemeine1500er-Regel in AGENTS.md.

## Händlerprofile und noch ungeprüfte Mechaniken

| Profil | Einordnung |
|---|---|
| Kleiner Händler |Tatsächliche Teilabgabe15/200 Gold, keine Beschaffungskarriere. |
| Normaler Kaufmann |Hauptarme10.000 Gold/90 vorhandene Fass; tatsächliche A/B/C-Transaktionen. |
| Wohlhabender Kaufmann |Konzeptionell dieselbe gemeinsame Quote, kein Vermögensmultiplikator. Keine eigene Reichenkarriere oder extreme Goldserie. |
| Mehrere eigene Schiffe |Tatsächliches Umladen über Lager/zweites Schiff umgeht Entnahmeschuld nicht. |
| Verlässlicher Fernlieferant |Fremde FIFO-Herkunft in tatsächlicher Transaktion; Reise-/Einkaufs-/Risikoroute hier nicht neu gespielt. |
| Selbsternannter Krisenretter |Tatsächlicher Vorkauf80, Jahreswechsel, keine neue öffentliche Anerkennung; alte Ansehenslücke sichtbar. |

Nicht geprüft: alle elf Städte/Waren, viele Seeds, dynamische Population, kommunale Finanzkasse, aktive reale NPC-Beschaffung/Transport, Kollusion mehrerer Eigentümer, alle Marktsonderereignisse/Bestandskappen, alle Altkosten-/Ratsauftragskombinationen, chronische echte Notlagenfolgen über Jahre, menschliche Spielbarkeit oder vollständige Politik. Der neue Beobachter ist reine Mathematik mit konstruierten Eingangsdaten; kein exakter kausaler Gegenmarkt. Konservative Entnahmeschulden können ehrliche regelmäßige Exporteure/andere Lieferanten benachteiligen. Nicht unbegründet verfallen lassen; Fachentscheidung offen.

## Bestandsschutz und spätere Einführung

**Heute kein produktives Speicherfeld und keine neue Saveversion.** HTML/V13 und sämtliche alten Ergebnisse/Berichte bleiben bytegleich; bestehende V11/V12/V13-Importpfade werden nicht verändert. Das ist struktureller Bestandsschutz durch Nichtänderung, **kein neu ausgeführter Migrationstest**. Keine Browser-/iPhone-/iPad-/Safari-/Mehrfensterprüfung, da keinerlei Oberfläche integriert wurde.

Vor einer später freigegebenen Einführung erforderlich:

- V11/V12 auf Kopie über vorhandene Migration zu validiertem V13, unverändertes Originalbackup bewahren; V13 validieren. Keine alten Bedarfe/Lieferungen/Herkünfte rückwirkend erfinden.
- Bürgermeister-/Eldermannämter und alte Dienste/Fristen/Parameter bewahren; keine automatischen Stimmen aus altem globalem Ansehen. Alle Schiffe/Standorte/Ladung/Lager/Kosten/Herkünfte, Bank/Kredite, Märkte/Informationen/Chronik/Archiv vollständig erhalten.
- Zentralen Bedarf, Reservierungen, alle Lieferantenbelege/IDs, eigene Entnahmesalden, letzte echte Erholung, rollierende Historie und tatsächlichen Gesamtverbrauch gemeinsam atomar mit Gold/Ware speichern. Kein zweiter Topf durch Import, Fenster, Schiff oder Jahreswechsel.
- Vollständigen Export/Import, Originalbackup, reale Quota-Fehler, alte Clients und echte Mehrfensterkonkurrenz absichern. Der getestete Analyseexport mit In-memory-CAS beweist keine produktive Datenbanktransaktion. Künftige neue Formatfassung separat beschließen.

Die empfohlene Regel begrenzt zusätzliche öffentliche Abnahme, heilt aber keine bestehenden Kosten-/Ansehensprobleme. Keine Änderung von `regionalStock`, `regionalPrice`, `regionalMarketDay`, Handelspreisen, Lager, Schiffen, politischem Aufstieg oder Zufallsfolgen des Produkts. Kein synthetischer Produktionsausgleich.

## GitHub-Übergabe

[Veröffentlichter Analysebranch](https://github.com/psonnen-lgtm/Hansef-rst/tree/analysis/p13-supply-market-balance) · [direkter Vergleich gegen development/v04-foundation](https://github.com/psonnen-lgtm/Hansef-rst/compare/development/v04-foundation...analysis/p13-supply-market-balance?expand=1).

Die oben genannten Test-/Rohdatencommits sind bereits veröffentlicht. Berichte/Index und abschließende Veröffentlichung werden in der Übergabedatei dokumentiert. Keine eigenständige Zusammenführung, keine Änderung an main/Pages, keine automatische Folgephase.
