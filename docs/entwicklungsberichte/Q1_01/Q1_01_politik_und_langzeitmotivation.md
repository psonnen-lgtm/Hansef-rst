# Q1.01 – Politik, Aufstieg und 90 aktive Stunden

29.10.2026. Sicherungspunkt C. **Statische Prüfung der aktuellen Entwicklungsfassung** `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, [Hauptdatei](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html). Keine neue Karriere gespielt. Historische Daten explizit getrennt. Quelle des Zeitentwurfs: [R1.11-Karrierekonzept](../R1_11/R1_11_90_stunden_karrierekonzept.md), unverändert.

## 1. Gesamte belegte Karriere

| Schritt | Tatsächliche Bedingung / Verhalten | Fortschritt, Kosten und Risiko |
|---|---|---|
| Kaufmann | Neuer Start:5000 Gold, Kogge, kein Amt, Ruf0 | Anfangsreserve reicht nicht unbegrenzt; erste Entscheidungen sind Handel und Risiko |
| Fernkaufmann | Antrag, Nettovermögen18000 | Buchvermögen, keine eigene politische Leistungsprüfung |
| Ratsherr | Antrag, Nettovermögen45000 und globaler Ruf25 | Keine echte Bürgerwahl; Handels- und Spendenruf kann beschleunigen |
| Bürgermeisterkandidatur | Rang2, politisches Vermögen≥gespeicherter Schwelle (Standard45000), Ruf55, keine Mietrückstände, mindestens6 örtliche Dienste in3 Abschnitten und2 Arten, kein aktives Amt, Kandidaturfrist abgelaufen | Sechs Dienste sind Mindestzulässigkeit, keine garantierte Mehrheit |
| Bürgermeistermehrheit | Berechnete Unterstützung≥festes Stadtziel; Bestätigung ohne Wahlzufall | Rückmeldung erklärt Mehrheit/Niederlage; nächste Kandidatur nach einem Abschnitt, auch bei Niederlage |
| Amt | Standard360 Tage, ein aktives Amt, kein Preis-/Bank-/Hafenrabatt | Titel bleibt nach Amtsende; keine autonome politische Gegnersimulation |
| Amtsbewährung | Zwei neue örtliche Dienste aus2 Abschnitten seit Amtsbeginn, darunter Ratsvereinbarung | Volle Amtszeit ist nicht zwingend: bewährtes aktives Amt genügt ebenfalls |
| Fürsprecher | Politischer Zugang und beide örtlichen Dienstarten, danach Stadtsiegel beantragen | Fremdstädte benötigen eigene Leistungen; Heimatmandat zählt separat |
| Hansevertrag | Zwei auswärtige schon unterstützende Städte persönlich bestätigen, zwei Handelsräume einschließlich Heimat, Rückbericht;720 Tage Frist | Kein zusätzlicher Goldbonus; Ablauf löscht bisherige andere Verdienste nicht |
| Eldermann | Bewährtes Amt,180000 politisches Vermögen, Ruf90, keine Mietschuld,4 Siegel einschließlich3 auswärtiger Fürsprecher,2 Handelsräume, beurkundeter Hansevertrag | Deterministische Versammlungsprüfung, keine gesondert gezählten Bürgerstimmen; Handel/Bau danach weiter |

Belege:799/988;347–410;425–493;555–607. Standard-Ratsabschnitt60 Tage; ältere Partien können30 Tage und85000 Bürgermeistervermögen gespeichert haben. Keine rückwirkende Umstellung oder Aberkennung im Audit. Kalender und Recordgrenze8192 sind technische Grenzen, keine verifizierte90-Stunden-Spielzeit.

## 2. Örtliches Vertrauen und Unterstützung

Global `s.rep` ist allgemeiner Ruf. Örtliche Unterstützung ist abgeleitet aus lokalen Urkunden/Zusagen plus globalen Größen, kein zweiter unabhängig simulierter Stadtruf. Formel (362–366): Wirtschaft bis10 (`politicalWorth/18000`), Ruf bis15 (`rep/6`), Dienste5 je Urkunde bis40, vier erfüllte Zusagen je5 bis20, Ratsvereinbarungen5 bis15. Höchstens100, Ziel je Stadt fest; z.B. Lübeck80, Rostock68.

Zusagen: Bürgerschaft2 Versorgung; erste Ratsgruppe3 Versorgung; zweite2 Ratsvereinbarungen; Rat6 Dienste/3 Abschnitte/2 Arten. **Beispiel reine Formelarithmetik:** Sechs Dienste3+3,45000 politisches Vermögen und55 Ruf geben76,67 Unterstützung. Kandidatur kann zulässig sein und in Lübeck trotzdem verlieren. Mit derselben Leistung und75 Ruf erreicht die Rechnung80. Das zeigt nützliche Transparenz, aber auch den Einfluss käuflichen/globalen Rufs auf die letzte Mehrheitslücke. Keine Wahl für dieses Beispiel ausgeführt.

Rivalen sind ausdrücklich Unterstützerkreise ohne eigene Vermögen, Flotten oder Bürgerstimmen (587). Namen erzeugen Atmosphäre, aber keinen tatsächlichen gegnerischen Aufstieg. Eine menschlich interessante Gegenkampagne ist **nicht nachgewiesen**. Aktive Konkurrenz wäre eine neue, teure und genehmigungspflichtige Mechanik.

## 3. Zwei Dienste, viele Wiederholungen

Versorgung:6–8 Fass einer stadttypischen Bedarfsware mit bewiesener fremder FIFO-Herkunft verkaufen. Nicht beliebige Spende und kein lokaler Kauf/Rückverkauf. Ratsvereinbarung: Partner aus drei nächsten Städten abhängig vom Abschnitt, dort bestätigen und zurück berichten. Jede Art nur einmal je Stadt/Abschnitt; stabile IDs schützen doppelte Urkunden beim Öffnen/Laden. Fristen mindestens3 Abschnitte oder angepasste Reisezeit. Kein neuer Tages-/RNG-Verbrauch durch bloße Anzeige.

**Stärken:** Versorgung und Vermittlung sind unterschiedliche wirtschaftliche Handlungen; Bündelung mit Handel ist sinnvoll. Urkunden bleiben nach Wahlniederlage, Amtsende und Vertragsablauf grundsätzlich erhalten. Eine ungünstige Reise muss die ganze Karriere nicht zerstören.

**Wiederholungsgefahr (Designurteil):** Gleiche Versorgung/Brief-Hin-und-zurück-Struktur wiederholt sich über Heimatbewährung und drei Fürsprecher. Regionale Siegel verändern Ziele und Wege, aber nicht zwingend die Entscheidungsart. Wohlhabende Spieler können Waren vorhalten und bekannte Wege optimieren; wirtschaftliche Kosten werden dann klein relativ zur Kasse. Eine bloße Erhöhung von Anzahl/Abschnittszeit würde eher Stempelroutine verlängern. Tatsächliche Monotonie über90 Stunden wurde nicht gemessen.

## 4. Neuer Prüfpunkt: Ansicht und persönliche Vorsprache

**Im Code bestätigt, nicht zur Laufzeit getestet:** `selectFleetShip` (975–978) setzt gleichzeitig `s.active` und `s.city` auf den Hafen des gewählten eigenen Schiffs, ohne Fahrt, Kosten oder Tage. Das ist als Ansichtswechsel beschrieben. `witnessPoliticalJob` prüft dagegen lediglich Partner=`s.city` plus gültigen Auftrag (453–455); `finishPoliticalAccord` Heimat=`s.city` (457–459). Auch Hansevertrags-Vorsprachen prüfen `s.city` (480–485), keinen getrennten persönlich erreichten Ort.

Daraus ergibt sich ein fachlicher Widerspruch: Wer bereits eigene Schiffe in den benötigten Häfen besitzt, kann über den Ansichtspfad die als „persönlich“ bezeichneten Ortsbedingungen erfüllen, ohne diesen politischen Rundweg neu zu reisen. Schiffe bewegen sich dabei nicht; ursprüngliche Flottenbeschaffung/Positionierung bleibt realer Aufwand. Kein kostenloser Flottenaufbau oder komplett umgangener Eldermannpfad behauptet.

Ein eigens vorbereiteter Browsernachweis mit frischer Zweihafen-Testpartie erreichte **keinen Spielstart**, weil die Chromium-Datei fehlt. Daher keine beobachtete Urkunde, kein getesteter Nulltage-Vertrag und kein tatsächliches Testgold protokolliert. Q-003/P1: erst fachlich entscheiden, ob persönliche Anwesenheit oder Flottendelegation gelten soll, dann begrenzten Zwei-Hafen-Gegenfall prüfen. Keine neue Spielerortsvariable oder Reisepflicht im Audit implementiert.

## 5. Geld, Ansehen und politische Abkürzungen

Spenden50/200 Gold erhöhen Ruf nach `max(1,Basis−floor(rep/55))`, ohne Zeit/Cooldown (908–910). Handel gibt positive Margenpunkte je Aktion (905); jede Ankunft+1 (1026); gewöhnliche Aufträge+4 (990). Spenden sind erlaubt und kosten echtes Geld; wiederholter Rufkauf ist dadurch kein unerlaubter Geldgenerator. Die positive Mindestwirkung erlaubt jedoch auch Reichen, globale55/90 rasch zu bezahlen. Dienste, Arten, Abschnitte, Siegel und Amtsbewährung fehlen dann weiterhin.

Bestätigter Produktionsbefund P1.3: Neutraler Rückhandel kann zusätzliche Rufpunkte und höhere Restbuchkosten hinterlassen. Das ist unabhängig von der gewollten Spende problematisch, weil keine zusätzliche Nettowirtschaftsleistung vorliegt. Siehe [Wirtschaftsbericht](Q1_01_wirtschaft_und_schifffahrt.md), Q-001/P0. Feste Vermögensschwellen anheben löst die Anerkennungsfrage nicht. Nicht integrierte V14-Gegenfälle nicht als bereits gelösten Schutz ausgeben.

## 6. Dauerhaft feststecken und Rückschläge

Politisch abgelehnte Kandidatur nennt Gründe, verlorene Wahl behält Urkunden; nächste Chance nach einem Abschnitt. Abgelaufener Brief zählt nicht, neues Angebot folgt frühestens im nächsten passenden Abschnitt. Fehlende Bewährung kann durch neues Amt/weitere Dienste angegangen werden. Diese Struktur ermöglicht Erholung. **Kein allgemeiner Beweis**, dass jede erlaubte Partie immer politisch weiterkommt: Geldmangel, Mietschuld, entfernte Flotte, ungünstige Herkunft, Kalender-/Recordgrenzen und unbekannte Speicherfehler müssen getrennt geprüft werden.

Historische0.6c-Hauptreihe:102/110 Eldermann, keine protokollierten Reiseblockaden; Nichtaufsteiger waren am Horizont nicht automatisch dauerhaft gesperrt. Bei wealth/normal8/11 Eldermann, frühpolitisch11/11; bedingte Medianzeiten1333,5 versus578 Spieltage. Dies stützt die Bedeutung früher Dienste, beweist aber keine heutige optimale Strategie oder menschliche Stunden. Nur ein Hauptseed; neue Informations-/UI-Fassung später.

## 7. Karriereabschnitte als prüfbare Designhypothesen

| Aktive Zielzeit aus R1.11 | Bestehende Ziele / neue Entscheidungen | Gefahr / freiwillige Tätigkeiten | Noch zu prüfen |
|---|---|---|---|
|0–8h|Handelsreserve, erste Route, Informationen und Lager/Schiffe abwägen|Überinvestition; freiwillige Gerüchte/Erkundung/Spenden|Finden Anfänger Hilfe und Nettoverlust ohne Entwicklerwissen? |
|8–25h|Fernkaufmann, Handel ausweiten, erste lokale Dienste|Bekannte Kurzroute dominiert; freie Wahl der Stadt und Leistungswege|Werden Städte freiwillig besucht oder nur wegen Siegelpflicht? |
|25–45h|Ratsherr, Mehrheit gezielt aufbauen, Kandidatur|Abschnittsgrenzen und wiederholte Briefketten; Handel bleibt offen|Wie viel aktive Entscheidung statt Warten/Serienklicken? |
|45–65h|Amt, neue zwei Dienste, Zugang zu Hansevorhaben|Amtsbewährung ähnelt früheren Diensten; volle360 Tage nicht zwingend|Entsteht nach Amtsgewinn wirklich eine neue Rolle? |
|65–90h|Drei auswärtige Siegel, zwei Handelsräume, Hansevertrag|Mehrgleiche Besuchs-/Lieferketten; Flottenansichtsfrage; Weiterspielen frei|Reicht Vielfalt für letzten25h-Abschnitt, ohne künstliche Streckung? |

Alle Stunden sind **unvalidierte Zielbudgets**, nicht Ist-Dauer oder Mindestwartezeiten. Weltzeit läuft durch Reise/Baden/Warten/Bau, nicht durch menschliche Entscheidungstiefe.1000 automatisierte Spieltage können keine90 aktiven Stunden beweisen. Nach Eldermann laufen Handel/Lager/Bau, aber neue zwingende Nachkarriere ist nicht belegt.

## 8. Empfehlung und späterer begrenzter Testbedarf

Zuerst Anerkennungsintegrität und Ortsbedeutung entscheiden, danach örtliche Aufgaben inhaltlich variieren. Vorhandene Fortschrittsanzeigen/Bestandsschutz beibehalten. Aktive Konkurrenz nur P2-Konzept, nicht bloß wegen Attraktivität P0/P1. Ein später freigegebener Test sollte pro Meilenstein aktive Entscheidungsminuten, gleiche wiederholte Aufgaben, freiwillige Alternativen, Leerlauf und Wiederanlauf nach Niederlage protokollieren. Keine Langzeitserie in diesem Audit begonnen.
