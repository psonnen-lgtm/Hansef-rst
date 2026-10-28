# R1.11 – Unverbindlicher Entwurf: ungefähr 90 aktive Stunden bis Eldermann

28.10.2026. **Alle Zeitbudgets und Wirkungsannahmen in diesem Dokument sind Hypothesen und Designziele.** Keine Implementierungs- oder Balancingfreigabe. Keine 90-Stunden-Partie, keine Wirtschaftssimulation und kein Beweis, dass der aktuelle Code diese Dauer bereits liefert. Original-Spieljahre sind keine menschlichen Spielstunden.

## Ausgangspunkt: Bestehendes nutzen

Im aktuellen Code gibt es bereits Kaufmann/Fernkaufmann/Ratsherr, Bürgermeisterkandidatur, örtliche Leistungsurkunden, Ratszusagen, Amtsbewährung, fremde Fürsprecher/Stadtsiegel und überregionalen Hansevertrag. Der Eldermanntitel beendet den Handel nicht. [Codevergleich](R1_11_D_vergleich_hansefuerst.md) nennt feste Commit- und Funktionsbelege.

Der Entwurf ist deshalb keine zweite Politik neben der vorhandenen. Er skizziert, wie deren Schritte langfristig unterschiedliche Entscheidungen tragen könnten. Die tatsächliche Dauer muss später in autorisierten menschlichen Tests gemessen werden; reine Code-Schwellen oder mehr Wartetage ersetzen das nicht.

## Mögliche Zielverteilung, keine erzwungenen Mindestspielzeiten

| Aktive Zielstunden | Budget | Karriereabschnitt | Wahrnehmbarer Fortschritt | Interessante Entscheidungen und Rückschläge |
|---|---:|---|---|---|
|0–8|8 h|Kaufmann und erste tragfähige Handelsbasis|Erste verlässliche Route, Reserven, erkennbare Heimatbedürfnisse|Gewinn gegen Liquidität/Versorgung; kleine Verluste mit Erholungsmöglichkeit|
|8–25|17 h|Fernkaufmann, örtlich bekannter Partner|Erste unterschiedliche Leistungen, Ratskontakte, ausgewählte Stadtbindung|Wem liefern, welche Zusage halten, wann Gesellschaftskosten sinnvoll sind; Ruf nicht nur kaufen|
|25–45|20 h|Ratsherr und aussichtsreiche Bürgermeisterkandidatur|Örtliche Mehrheit, nachvollziehbare Unterstützer, Wahlziel|Interessenkonflikte, wirtschaftliche Wahlversprechen, Konkurrenz; Niederlage öffnet neue Strategie statt Neustart|
|45–65|20 h|Bürgermeister und glaubwürdige Amtsbewährung|Neue Handlungsmöglichkeiten und sichtbare Folgen für die Stadt|Begrenztes Budget, Versorgung/Handel/Schutz abwägen; Amt verlieren darf Karrieretitel und Rettungswege nicht auslöschen|
|65–90|25 h|Überregionale Fürsprecher und Eldermann|Andere Stadtinteressen, mehrere Handelsräume, gemeinsame Vereinbarung|Heimatpflicht gegen Fernverdienst, Koalition und Vertrag; Schlussentscheidung statt letzter Geldkauf|

Summe90h als **Produktziel**, nicht als Sperre. Schnelleres Spiel darf nicht durch Leerlauf künstlich auf90h gestreckt werden. Langsames Spiel darf an Rückschlägen nicht dauerhaft festhängen. Die Budgets sind anfängliche Prüfannahmen; nach Messungen müssen sie sich ändern dürfen. Ein besonders erfahrener Spieler ist keine geeignete einzige Zeitnorm.

## Wodurch der Aufstieg tragen könnte

1. **Spürbare Ortsbindung ohne weitere undurchsichtige Rufleisten.** Bestehende örtliche Urkunden/Zusagen bleiben Kern. Handlungen erhalten verständliche Orts- und Ursachenbelege. Neue Vertrauensvariablen nur, wenn ein klarer Spielnutzen nicht schon mit dem aktuellen Modell erreichbar ist.
2. **Verschiedene Wege mit echtem Aufwand.** Handel, Versorgung, persönliche Vermittlung, Gemeinwohl und erfolgreicher Schutz dürfen unterschiedliche Stärken ansprechen. Spenden/Feste wären optionale Ergänzungen, keine Pflichtkäufe pro Abschnitt. Gegenwärtig gibt es zwei politische Diensttypen; mehr Varianten sind ein genehmigungspflichtiger Vorschlag.
3. **Vorfreude auf Wahlen, kein leeres Warten.** Kalender/Termine sollen rechtzeitig sichtbar und mit normalen Handelswegen vereinbar sein. Zwischen Terminen bleiben Wirtschaft und Gesellschaft sinnvoll. Aktuelle60-Tage-Abschnitte und360-Tage-Amtszeit nicht unbemerkt ersetzen; zweijährliche Originalwahlen nicht blind kopieren.
4. **Rivalen mit nachvollziehbaren Interessen.** Eine spätere aktive Konkurrenz sollte begrenzte Mittel, sichtbare Handlungen und erklärbare Mehrheiten haben. Keine unsichtbaren Gratisstimmen oder automatisch steigenden Ziele, nur um die Spielzeit zu verlängern. Das wäre neu; die derzeitigen Unterstützerkreise bleiben die belegte Bestandsbasis.
5. **Rückschläge mit Erholung.** Verlorene Wahl, misslungene Zusage oder Handelsverlust sollten mehrere Antworten erlauben. Bestehende Bewahrung der Urkunden nach Wahlniederlage und Trennung Titel/Amt beibehalten. Falls neue politische Folgen entstehen, müssen sie sichtbar, begrenzt und wirtschaftlich aufholbar sein.
6. **Amtsgewinn verändert die Entscheidungen.** Mehr Bedeutung für Stadtinteressen statt derselben Lieferliste mit größerer Menge. Denkbar wären wenige verständliche Ratsentscheidungen mit Ressourcenkonflikten. Konkrete Projekte, Kosten oder Mechaniken sind hier nicht beschlossen.

## Nach dem Eldermann

**Im Code bestätigt:** Handel, Lager und Schiffbau laufen weiter;Rang4 wird nicht wegen später veränderter Voraussetzungen einfach zurückgenommen. **Optionale Hypothese:** freiwillige Ziele wie Städteversorgung, bewährte Koalitionen oder Krisenhilfe könnten Freiheit nach dem Karriereziel stützen. Keine weitere zwingende Rangtreppe und kein unendlicher Pflichtdienst. Umfang/Aufwand solcher Erweiterungen wäre gesondert zu entscheiden.

## Wie man das Ziel später ehrlich prüfen könnte

Keine Tests in R1.11 gestartet. Ein später freizugebender Spieltest sollte aktive Entscheidungszeit von Abwesenheit/Automationswartezeit trennen und für jede Etappe festhalten: erreichte Ziele, freiwillige/erzwungene Wiederholungen, sinnvolle Alternativen, verlorene Wahlen, wirtschaftliche Erholung und Momente ohne Handlungsbedarf. Nicht nur die Endzeit, auch Abwechslung und Frustration bewerten. Unterschiedliche Spielstile und Ausgangssaves berücksichtigen.

Die aktuelle Mechanik kann über Codeprüfung nicht auf90h zertifiziert werden. Falls sie viel früher alle Bedingungen erfüllt, ist zuerst die Vielfalt der Entscheidungen zu prüfen, nicht pauschal jede Summe, Frist oder Warenmenge zu erhöhen. Falls sie länger braucht, nicht automatisch Urkunden schenken, sondern die tatsächlichen Engpässe unterscheiden.

## Aufwand, Bestandsschutz und Entscheidung

Informationsbelege: niedrig–mittel. Mehr Dienst-/Amtsvarianten: mittel–hoch. Aktive politische Konkurrenz: hoch. Fundierte 90-Stunden-Validierung: hoch. Alles qualitative Einschätzungen, keine Entwicklertage oder Umsetzungszusage.

Bestehende Savewerte, erworbene Titel und beurkundete Leistungen erhalten. Neue Regeln müssten explizit versioniert, migrationsfähig und für laufende Amts-/Vertragsfristen verträglich geplant werden. Keine Rückwirkung auf alte Partien durch bloße Neuberechnung. Keine Migration oder neue Regel in dieser Phase umgesetzt. Nutzer entscheidet später über jeden wesentlichen Eingriff.
