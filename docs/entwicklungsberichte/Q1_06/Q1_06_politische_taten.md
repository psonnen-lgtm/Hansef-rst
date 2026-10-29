# Q1.06 – Wirtschaft, Gesellschaft und belegbare politische Taten

29.10.2026 · **Konzept, keine Umsetzung.** Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Produkt 0.8d.1b/V13, HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA 256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Alle neuen Regeln sind Empfehlungen bis zur Nutzerentscheidung.


## Vier Bedeutungen ohne vier neue Punktleisten

|Bereich|Kern|Nachweis/Darstellung|Politische Wirkung im Vorschlag|
|---|---|---|---|
|Wirtschaftlicher Erfolg|Kasse/Bank/Schuld, echter realisierter Handel, Vermögensstruktur|Bilanz; optional Fernkaufmann-Ehrenbeleg|Finanziert Zeit und Material; keine politischen Punkte|
|Gesellschaftliche Anerkennung|Sichtbarer Dank und verlässliche persönliche Geschichte|Gebäudedialog, Chronik, benannte Urkunden|Keine beliebig kaufbare XP-Leiste|
|Lokales politisches Vertrauen|Konkrete gültige Leistungen dieser Stadt und daraus erklärte Zusagen|Vorhandenes örtliches Leistungsbuch/Modell A|Trägt Ratsherr/Kandidatur; nicht aus fremdem Buchwert|
|Überregionaler Verdienst|Bewährtes Amt, örtliche Fürsprecher und tatsächlich gehaltener Vertrag|Vorhandene Siegel/Vertrags-/Amtsreferenzen|Trägt Eldermann, keine anonyme Gesamtsumme|

**Empfehlung zum alten Ruf:** `s.rep` unverändert als historischer allgemeiner Mischruf mit erklärtem Stichtag bewahren, nicht mehr als aktiven politischen Faktor benutzen. Alte Werte sind nicht zuverlässig nach Handel/Spende/Ankunft trennbar. Keine rückwirkende Bereinigung oder Umwandlung in „echte Verdienste“. Ob künftige rein gesellschaftliche Rückmeldungen weiterhin numerisch oder nur als Dank/Briefe erfolgen, separat entscheiden; empfohlen vorerst ohne neue Punktwährung. Keine jetzige Spendenregel verändert.

## Tatkatalog: Bestand, Vorschlag, Schutz

|Tätigkeit|Heute wirklich vorhanden?|Empfohlene Anerkennung|Einmaligkeit/Schutz|
|---|---|---|---|
|Normales Kaufen/Verkaufen, Gewinn|Ja, gewinnabhängig bis 2 globaler Ruf je Verkauf|Geld und Bilanz, **kein** politischer Aufstieg|Q-001 nicht durch einen politisch gelesenen Restbuchwert wieder einführen|
|Schiffsankunft|Ja, global+1 Ruf|Keine politischen Punkte; tatsächliche persönliche Mitreise nur Ortsbeleg|Ansicht/Flottenwechsel nie als persönliche Ankunft|
|Gewöhnlicher Lieferauftrag|Ja, Fremdherkunft/Frist, Verkauf+Goldprämie+4 globaler Ruf|Wirtschaftliches Geschäft; möglicher optionaler Fernkaufmannnachweis|Kein automatischer politischer Dienst; politische Anerkennung nur ausdrücklicher Ratsbrief|
|Politischer Versorgungsbrief|Ja, 6–8 nachgewiesene Fremdeinheiten, keine neue politische Goldprämie|Ein lokaler Tatbeleg|Quelle, Stadt, Frist, Menge, IDs und atomarer Abschluss; keine nachträgliche Erfindung von Altursprüngen|
|Ratsvereinbarung|Ja, annehmen → Partner → Rückbericht|Ein lokaler Vermittlungsbeleg|Echte Person an allen nötigen Stationen; einmalige ID|
|Politische Zusage einer Gruppe|Ja, aus Belegen abgeleitet|Erklärter Bestandteil der örtlichen Unterstützung|Nicht zusätzlich zum bereits enthaltenen Formelglied auszahlen; kein bezahlbarer Zusageknopf|
|Kirchenspende|Ja, 50/200 Gold, `max(1,Basis−floor(Ruf/55))`, beliebig wiederholbar|Dank/Gesellschaft, keine aktive politische Qualifikation|Kein Gold→Stimmen; heutiger Rufbeitrag ist insgesamt auf 15 Formelanteil gedeckelt, nicht unendliche lokale Punkte|
|Gemeinnützige Hilfe/Bauprojekt|Kein eigener vollständiger kommunaler Projektpfad|Optionale spätere echte, begrenzte Leistung, kein Pflicht-Goldkauf|Anlass-ID, tatsächliche Ressource/Ergebnis, keine Mehrfachabrechnung; neuer Inhalt erst entscheiden|
|Amtsbewährung|Ja, neue Dienste nach Amtsbeginn|Eigenständiger Amtsnachweis, keine Wiederverleihung alter Dienste|`firstReceipt`, Amtsort und Daten; keine Voramtsurkunde als neue Tat|
|Auswärtiger Fürsprecher|Ja, beide örtlichen Arten und Hansezugang|Stadtsiegel als qualitative Unterstützung|Nur einmal je Stadt, zwei passende Belegreferenzen, persönlicher Antrag|
|Hansevertrag|Ja, zwei Fürsprecherorte/Regionen und Heimatabschluss|Ein verknüpfter überregionaler Beleg|Einzigartige Vertrag-ID, unterschiedliche Besuchsorte, erfüllter Rückbericht|
|Hanseweite Krisenhilfe/Schutzfahrt|Kein eigener belegter neuer Krisen-/Eskortauftrag im geprüften Hauptspiel|Konzeptoption, nicht als verfügbare Aufgabe ausgeben|Keine Piratenwürfe als gewählter Schutzauftrag oder garantierter Routenschutz umdeuten|

Eine tatsächlich gehaltene Ratsvereinbarung oder Lieferung darf **referenziert** werden, um mehrere unterschiedliche Qualifikationen zu erklären (z.B. Unterstützung und einmaliger Ratsherrantrag). Das ist nicht automatisch Missbrauch. Verboten sind doppeltes Zählen desselben Belegs in derselben Menge, erneute Belohnung, zwei fingierte Taten aus einer Quelle und Voramtsbelege als neue Amtsarbeit. Urkunden nicht pauschal „verbrauchen“ oder löschen: sonst würden gültige alte Siegel-/Amtsbezüge brechen.

## Wie viel Vielfalt gibt es heute?

**Zwei örtliche Kernhandlungen:** Ware beschaffen/transportieren/verkaufen und persönlich hin-/zurückfahren mit Bericht. Der Hansevertrag ist eine dritte gespeicherte Art (`league`), spielerisch eine verkettete diplomatische Rundreise. Wahl, Siegelantrag, Verleihung und Amtsprüfung sind wichtige Entscheidungen/Prüfschritte, aber nicht fünf weitere gleichwertige Missionstypen. Unterschiedliche Stadttexte oder erhöhte Liefermengen alleine erzeugen keine neue Tätigkeit.

Weiterverwenden: Geografie, veraltete Handelsinformation, Fristen, begrenzte Kapazität, echte Herkunft, Stadtinteressen und einmalige Briefbelege. Ergänzung bevorzugt **innerhalb** vorhandener Gebäude/Briefe, nicht über neue Pflichtlisten oder eine große Rivalen-KI.

## Gebäude und lebendige Welt

|Gebäude|Bestand|Kleine empfohlene Ergänzung, nicht implementiert|
|---|---|---|
|Rathaus|Ratsbriefe, Wahl, Ratstafel, Fürsprecher, Hanseversammlung|Würdiger Ratsherrbrief; zwei verständliche Amtsalternativen; klare Ursachen statt nur Balken|
|Gildenhaus|Kein eigener Mitgliedschafts-/Gebäudepfad im aktuellen HTML|Bewusster beschlossener Eintritt, hanseweiter Status, Übersicht bestehender Kräfte; vorhandenen Welt-/Dialogrenderer nutzen|
|Kirche|Wiederholbare Spenden, korrekte aktuelle Gewinnauskunft|Öffentlicher Dank ohne politische Punkte; freiwilliger situationsbezogener Hilfsbrief als spätere Option|
|Badehaus|Handelsgerüchte und **bereits** politische Hinweise aus aktuellen örtlichen Zusagen|Kontextbezogene politische Briefe/Rivalenhinweise; unverbindliche Gerüchte klar von Wahlfakten trennen|
|Hafen|Handel/Aufträge, Reisen, Schiffe/Schäden|Auf laufende echte Ratsladung oder Hilfe hinweisen; keine neue kostenlose politische Hafenarbeit erfinden|
|Kontor|Bilanz, Beginn/Amtsstadt, Archiv und rangabhängige Optik|Ehrenname, politischer Titel, aktives Amt und Altstatus getrennt zeigen; ein vorhandenes Archiv statt zweiter Karriereübersicht|

Beim künftigen Badekonzept keine zufällige Mehrheitsänderung allein durch Öffnen des Hinweises. Gildeninformationen beruhen auf öffentlichen/verdienten Tatsachen, nicht allwissenden geheimen Marktpreisen oder einer still vorausgesetzten Händler-KI. Bestehender Badpreis 15 Gold/1 Welttag ist Bestand; neue Preise oder politische Pflichtbäder werden nicht empfohlen.

## Wiederholungen sinnvoll ersetzen

Empfohlen zunächst zwei eng begrenzte **Entscheidungsvarianten**: begründete Versorgungspriorität und Ratsvermittlung mit nachvollziehbarer Auswahl. Beide knüpfen an aktuelle Typen an, liefern aber unterschiedliche Zielkonflikte statt bloß höherer Stückzahlen. Optionaler Krisen-/Hilfsanlass später nur mit Freigabe, klarer Anlass-ID und tatsächlichem Ergebnis. Keine Pflicht zu Festen, wiederholten Spenden, Eskorten oder zwanzig weiteren Siegeln.

Kalender-/Abschnittszähler sind Herkunftsdaten, kein Beweis sinnvoller Abwechslung. Vor einem Entfernen der heutigen Quoten braucht es feste eindeutige Gelegenheiten und Schutz gegen sofortiges Neuangebot. Fehlt diese Freigabe, offen sagen: **Der heutige Inhalt beweist keine abwechslungsreiche 90-Stunden-Karriere.** Nicht mit mehr identischen Pflichtbriefen auffüllen.

[Gesamtbericht](Q1_06_gesamtbericht.md) · [Karrieremodell](Q1_06_karrieremodell.md) · [Entscheidungsmatrix](Q1_06_entscheidungsmatrix.csv)
