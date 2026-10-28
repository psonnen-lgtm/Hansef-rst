# R1.10 – Schifffahrt, Risiken und Schutz vor erneutem Würfeln

28.10.2026. Versionierte Ergänzung der acht Katalogbereiche; historische Versionen unverändert. Status pro Aussage: **Direkt gemessen**, **Durch Originalquellen belegt**, **Im Hansefürst-Code bestätigt**, **Hypothese**, **Noch ungeprüft**. Die Fortsetzungsdaten stehen separat im R1.10-Etappenbericht. Dieser Codevergleich ist eine statische Prüfung, kein Hansefürst-Laufzeit- oder Exploittest.

Quellstand: Entwicklungsbranch `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, `Hansefuerst_0_4.html`, Remote-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8` erneut abgeglichen mit byteidentischer vorhandener Datei. Release0.8 d.1 b/V13. Keine Codeänderung und keine Simulation.

## SHIP-01 – Typen, Reisezeit, Personal und Reparatur

**Im Hansefürst-Code bestätigt:** Drei Typen Schnigge55/Tempo1,5, Kogge90/1, Holk140/0,72; Kapazitäten in Fass. `makeShip` speichert Zustand, Waffen, Ladung und Kosten, keine Besatzungszahl. Der geprüfte Reiseablauf enthält keine Mindestbesatzungs-/Anwerbeprüfung. Kein pauschaler Ausschluss aller nicht geprüften Dateien.

`routeTravelDays` berechnet mindestens1Tag aus aufgerundeter DIST/Geschwindigkeit plus feste Umschlagtage. `planTravel` nutzt `speed*(.65+.35*condition/100)`, im örtlichen Konvoi das langsamste teilnehmende Schiff. Konvoi bedeutet hier alle örtlichen Schiffe nach Bestätigung; entfernte Schiffe bleiben zurück. Gebühren summieren4/6/9 Gold je reisendem Schiffstyp.

`harborView` zeigt Reparaturkosten `ceil((100−condition)*8)`. `repairShip` zieht Geld ab und setzt Zustand100, ohne hier Spieltage vorzuschalten. Sturm senkt Zustand aller reisenden Schiffe zufällig3–10 Punkte, Untergrenze30. Im geprüften `arrive` keine zusätzliche gewöhnliche Verschleißbuchung pro Reise neben Ereignisfolgen. Waffenstufe kostet10Fass je Stufe und verbessert Piratenabwehr.

Belege: [Typen101/104](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L101), [Reiseformel795](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L795), [Hafen970/971](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L970), [Reise1019–1026](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1019).

**Durch Originalquellen belegt:** Originalhandbuch nennt vier Schiffstypen einschließlich Kraier, Zustandsprüfung/Reparaturen und reiselängenabhängige Heuer aus Bordgeld. **Direkt gemessen, historisch:** R1.08 Anwerbung0→5 für5Taler; R1.09 Reise2+2 Tage, frühere Rückreise3Tage. **Noch ungeprüft:** genaue Originalformeln, Konvoiverhalten und routenabhängiger Verschleiß.

**Beibehalten/P1:** klare Reise-/Kosten-/Teilnehmervorschau. **Weitere Forschung erforderlich/P2:** gewöhnlicher Verschleiß/zeitlicher Reparaturbedarf. **Hypothese:** Zustand als planbare Entscheidung könnte über lange Spielzeit mehr Vorbereitung erzeugen; zusätzlicher Pflichtunterhalt kann Liquiditätsfallen schaffen. Aufwand mittel bis hoch bei Mechanikänderung, Save-/Balancefolgen beachten. Keine Personalpflicht allein wegen Originalnähe empfehlen.

## EVENT-01 – Piraten, Sturm und Atmosphäre

**Im Hansefürst-Code bestätigt:** `rollTravel` verwendet einen Zufallswert je bestätigter Reise: unter0,13 Piratenbegegnung,0,13 bisunter0,27 Sturm,0,27 bisunter0,40 freundlicher Kapitän, sonst ruhiger Text. Das sind13%,14%,13%,60% im Code, keine Originalraten und keine gemessenen Häufigkeiten.

Bei Piraten entscheidet ein weiterer Zufallswert über Abwehr: `min(.94,.3+arms*.21+AnzahlSchiffe*.09)`. Erfolgreiche Abwehr erhält Zustand/Ladung im geprüften Ankunftsablauf; andernfalls werden1–3 Einheiten aus der ersten verfügbaren Ladungsart eines beladenen teilnehmenden Schiffes entnommen. Leere Schiffe können die Piratenmeldung erhalten, ohne Warenverlust. Kein aktiv gesteuertes Seegefecht in diesem Ablauf. Der freundliche Kapitän verändert den Text, setzt hier aber keinen eigenen Ereigniscode; reine Auszählung von `p.event` würde diese Atmosphärenbegegnung übersehen.

Die Gefahrenschwellen skalieren hier **nicht** mit Reisedauer/Route. Kürzeste und längste Fahrt bekommen denselben ersten Würfelaufruf. Als Folgerung aus dem Code, nicht als Simulation: häufiges kurzes Reisen erzeugt mehr Würfelaufrufe je Spieltag. Ereignisse pro Reise und pro100Reisetage müssen getrennt betrachtet werden. Konvois erhöhen Abwehr, senken hier nicht die13%-Begegnungsprüfung.

Beleg: [roll Travel1020 und arrive1026](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1020).

**Durch Originalquellen belegt:** [Originalhandbuch](https://www.mogelpower.de/manuals/Der_Patrizier_Handbuch.pdf), PDF20/21, beschreibt aktive Seegefechte als wählbare Option sowie bewaffnete Konvois. **Noch ungeprüft:** Originalwahrscheinlichkeiten, Dauer-Risiko-Beziehung, konkrete Gefechtsfolgen. Dokumentation ersetzt keinen beobachteten Angriff.

**Weitere Forschung erforderlich/P1:** Risiko je Fahrt versus Reisetag entscheiden, bevor Raten geändert werden. **Verbessern/P2:** Atmosphärebegegnungen von Schadensereignissen im Forschungsledger trennen. **Hypothese:** abwechslungsreiche harmlose Begegnungen können Geschichten schaffen; mehr Pflichtdialoge können nach vielen Wiederholungen stören. Aufwand mittel; Balancewirkung bei Zeitskalierung hoch, keine Originalraten übernehmen.

## EVENT-01 / FIN-01 – Grenzen des Würfelschutzes

**Im Hansefürst-Code bestätigt:** `planTravel` berechnet Kurs/Zeit/Gebühr und würfelt noch kein Risiko. `arrive` sperrt bereits angekommene Reisen über `pending.arrived` und ruft `rollTravel` nur ohne `pending.resolved` auf. Damit ist bloßes Öffnen/Verwerfen der Vorbereitung kein Ereigniswürfeln. Auch mehrfaches Bestätigen desselben offenen Ablaufs wird abgefangen.

`pending` ist eine eigene globale Variable neben`s`. `save()` und `exportGame()` serialisieren nur`s`; Import setzt `pending=null`. `render()` speichert den nach Ankunft veränderten Zustand. **Ein dauerhafter Schutz gegen erneutes Würfeln nach Wiederherstellung eines alten Vor-Reise-Exports ist dadurch nicht belegt.** Die vorhandene UI-/Doppelklicksicherung darf nicht als allgemeine Save-Rollback-Sicherung beschrieben werden. **Noch ungeprüft:** praktische Browser-Neulade-/Importversuche; diese Forschung führt keine Hansefürst-Laufzeittests aus.

Belege: [globale Zustände103](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L103), [save782](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L782), [render876](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L876), [Export/Import1029/1030](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1029).

**Beibehalten/P1:** keine Risikowürfe bei bloßer Vorbereitung. **Weitere Forschung erforderlich/P1:** gewünschte Persistenzgrenze klären und später separat testen. **Hypothese:** feste Entscheidungen statt beliebiger Neuversuche können Folgen glaubwürdig machen; harte Persistenz kann legitime Fehlerkorrektur erschweren. Aufwand mittel bis hoch für Saveformat, Migration, Import und reproduzierbare Reisetickets. Keine Änderung in R1.10.

## FIN-01 – Kosten

**Im Hansefürst-Code bestätigt:** Reisegebühr und Warengewinn sind getrennt; `advance` lässt Zinsen, Mieten und Fristen während Reisetagen laufen. Zustand-/Ladungsverlust wirkt zusätzlich. Die ursprünglichen R1.08/R1.09-Restbeträge werden nicht rückwirkend diesen Kategorien zugeordnet.

**Verbessern/P1:** zusammenhängender Reisebeleg mit Finanzierung, Gebühren, Ereignisfolgen und sonstigen Kosten. **Hypothese:** weniger unerklärte Abgänge erleichtern wirtschaftliche Erholung. Aufwand mittel, Risiko falscher Zuordnung mehrerer Schiffe oder doppelter Kostenerfassung.

## Weitere Bereiche

**ECON-01:** Keine neue Originalpreisreihe in R1.10; R1.09 unverändert. **Beibehalten**: bestehende Datenbasis. **CITY-01:** Original-Hotspots und verzögerte Menüwechsel verursachen Bedienaufwand; Forschungsautomation ist keine menschliche Bedienzeitstudie. **Beibehalten**: beschriftete Ziele/Bestätigung in Hansefürst. **SOC-01/POL-01:** Keine neue gesellschaftliche Aktion oder Wahl beobachtet; **Weitere Forschung erforderlich**. **LONG-01:**90 aktive Stunden bleiben Ziel, keine gemessene Dauer. **Hypothese:** anhaltende Motivation braucht Vorbereitung, unterschiedliche Reaktionen und Erholung statt bloß mehr Unterbrechungen. Aufwand hoch für spätere Langzeitvalidierung. Sämtliche Empfehlungen unverbindlich, keine Umsetzung oder neue Simulation beschlossen.

## Gesicherte R1.10-Fortsetzung – Originalbefunde

**Direkt gemessen:** T01–T05 mit2/3/3/3/17 Tagen, Summe28 einschließlich abhängiger Wiederholung. T01/T04 gleicher Save, aber2statt3Tage; gleiche14Gebühr und234Ankunftskasse. Keine identifizierten Piraten-/Sturm-/Heilermeldungen. Lange Fahrt nach Hamburg: Kreditmeldung1596am19.Heuet, Inspektorurteil„gutem Zustand“nach Ankunft. Das sind getrennte Beobachtungen, keine Originalgefahrenrate. Eine Finanzierungsmitteilung/5 Fahrten=20% und3,57 je100aufsummierte Reisetage, rein deskriptiv. Qualitative Zustandsänderung separat, kein bewiesener Sturmschaden.

**FIN-01-Ergänzung, direkt gemessen:** Portgebühren14/21/14/14/14. Reise-Netto-Kassenreste0/10/99/0/20 und Kontrollabgänge6/5/6/14/5/6 ungeklärt. Anfangsschuldenanzeige250,Ende A500,Ende B1000; Meldung1596 nicht gleichgesetzt. **Durch Originalquellen belegt:** Onlinehandbuch PDF16 beschreibt unfreiwillige Kontorkredite nach Steuerabzug; exakte Zuordnung hier **noch ungeprüft**. Frühe Kommentarlesung„Werftrechnung6“korrigiert: tatsächliche Unterschrift„Werftleitung“, keine Kostenrechnung.

Vollständige Belege, Grenzen und Kassenüberleitungen im [Abschlussbericht](../R1_10/R1_10_forschungsbericht.md). Acht Bereiche versioniert in [JSON](mechaniken_R1_10.json) und [CSV](mechaniken_R1_10.csv). R1.08/R1.09 unverändert, keine Umsetzung.
