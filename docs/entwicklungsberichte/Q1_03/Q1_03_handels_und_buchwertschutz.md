# Q1.03 – Q-001: Reputation und Buchwert getrennt lösen

29.10.2026 · **Technische Varianten, keine Reparatur.** [Gesamtbericht](Q1_03_gesamtbericht.md) · [Karriere](Q1_03_karrieresystem.md) · [Testplan](Q1_03_testkonzept.md).

## Gesicherter Fehler und legitime Buchhaltung

[Q1.02-Rohdaten bei8b20432](https://github.com/psonnen-lgtm/Hansef-rst/blob/8b20432506940ef1d33bf7af7f162884eec63c01/docs/entwicklungsberichte/Q1_02/Q1_02_rohdaten.json), gleicher produktiver SHA256 wie heute. Acht damalige Fixtures wurden nur gelesen, nicht neu ausgeführt.

| Historischer Fall | Tatsächlicher Befund | Einordnung |
|---|---|---|
| A01 | Ohne alte Ware kaufen/verkaufen: gleiche Kasse/Menge, kein Ruf | Kein Fehler |
| A02 |30 Altware zu8, Markt30, dreimal30 kaufen/30 verkaufen: Kasse10.000/Menge30 gleich, Restbuch240→817,5, Ruf+1 | Keine neue Nettoposition; Buchwert/Ruf dürfen nicht als neue politische Tat gelten |
| A03 |30 kaufen/15 verkaufen: Gold−450, Menge30→45, Buchwert+615 | Echte zusätzliche Bestandsbindung, kein neutraler Kreis; legitimer Durchschnittskosteneffekt |
| A04 | Lager hin/zurück: unveränderte Werte | Kein Fehler; Transfers bewahren Herkunft/Kosten |
| A05 | Gemischter Kreis über Lager und zweites Schiff: Restbuch+330, Ruf+1 | Eine schiffsbezogene Sperre reicht nicht |
| A06 |30 vorhandene fremde Fass zu8 am Markt30 verkaufen:900 Erlös,660 realisierte Marge | Legitimer realer Verkauf, kein unzulässiger Gewinn |
| A07 |Kosten40, Verkauf30:900 Erlös,−300 Marge | Legitimer Verlust, kein positiver Leistungsnachweis |
| A08 |Gleiche Kasse/Menge, Buchnetto44.920→45.250, Ruf25→26, echter damaliger Antrag vergibt Rang2 | Politische Anforderung über Bewertungseffekt umgangen |

Gewichtete Einstandskosten bei Kauf, Teilverkauf und Restbestand sind nicht automatisch falsche Finanzbuchhaltung. Ein Verkauf kann vorhandene stille Gewinne realisieren und Neubeschaffung höhere historische Kosten hinterlassen. Die Finanzmarge bleibt ein wirtschaftlicher Beleg. Der Fehler ist die Verwendung dieses Effekts als unabhängige neue **politische Leistung/Zulassungsbasis**. Keine unendliche Goldquelle oder kompletter Eldermannweg aus diesen Fällen bewiesen.

## Problem1 – unmittelbare politische Reputation

Kauf, Verkauf, Gewinn, Umladen und schlichte Ankunft sind keine politischen Tatquellen. Handels-/Ankunftsschreibungen in `s.rep` entfernen beziehungsweise politisch vollständig entkoppeln, alte Rufwerte nicht löschen. Für neue politische Anerkennung nur ausdrücklich gültige Dienste im vorhandenen Leistungsbuch; keine Notwendigkeit eines Kreisdetektors, um normale Handelsmargen in Politikpunkte umzurechnen.

Gewöhnlicher Questabschluss bleibt Geldgeschäft; dessen pauschales+4 nicht automatisch politisch nutzen. Echte Versorgung eines angenommenen politischen Briefs ist dagegen eine genehmigte Tatklasse, nicht bloß Umsatz. Quellen-ID, Fremdherkunft, Menge, Zeit, Ort und einmalige Anerkennung prüfen. Kein doppelter politischer Eintrag unter Verkauf, gewöhnlichem Auftrag und politischem Brief.

**Das allein löst Problem2 nicht:** Selbst wenn Rufzuwachs0 ist, hängen heute `creditLimit` und mögliche Rang-/Gilden-/Vermögensbedingungen am Buchvermögen. Kreditrahmen `max(1000,round(netWorth×0,45))` steigt im A08-Beispiel rechnerisch20.214→20.363, obwohl die Kasse/Menge gleich bleiben. Das ist hier eine **neue Quellen-/Formelrechnung**, kein erneut ausgeführter Kreditabruf. Handelsfinanzierung muss mitbehandelt werden.

## Problem2 – zwei technisch mögliche Zulassungsbewertungen

Gemeinsamer Grundsatz: Finanzbuchkosten und historische Margen erhalten. Eine Zulassungsbewertung ist **kein neues politisches Punktesystem**. Sie entscheidet nur über gegebenenfalls verbleibende wirtschaftliche Sicherheiten. Globale Politik direkt daraus aufzubauen wird nicht empfohlen.

### W1 – einheitlicher Kurs je Eigentümer, Stadt und Ware (bevorzugte vollständige Bewertungsvariante)

Für eine Bewertungsrevision: alle eigenen Schiffe **am selben Ort** und dortige Lager je Ware zusammenfassen, MengeQ mit demselben kenntlich gemachten ReferenzkursP bewerten. Kein Los-/Durchschnittskostenfeld als Preisquelle. `E1 = Bargeld + Bank − Schuld + unabhängig bewertete übrige Aktiva + Σ(Q_Stadt,Ware×P_Stadt,Ware)`.

Bei neutralem Kaufen/Verkaufen zu unverändertem MarktpreisP: Bargeldänderung=−P×Mengenänderung. Daher bleibt Bargeld+Q×P gleich, unabhängig von Kostenmischung, Splits, Reihenfolge, örtlichen Schiffen/Lagern. Keine Anerkennung nach Ablauf eines Cooldowns. Ein wirklicher Transport in eine andere Stadt, Preisänderung, Zins, Gebühr, Beschädigung oder Verlust ist **keine** solche neutrale Operation.

Für örtlichen neuen Handel muss P der tatsächlich gültige bekannte Ausführungskurs sein; alte Notiz nicht als aktuelle Kursgarantie verwenden. Für entfernte Waren fehlen eventuell verlässlich bekannte aktuelle Kurse. Keine kostenlose Fernpreiskarte/Allmarkt-Orakel vorschlagen. Empfehlenswert wären konservative gekennzeichnete bekannte Sicherungswerte oder Bewertung erst nach lokaler Bestätigung; genaue Fernbewertung, Kursaktualisierung und Übergang müssen **vor Umsetzung entschieden und getrennt getestet** werden. Obergrenzen/Marktannahmefähigkeit beachten: Q×P ist bei hohen Beständen nicht automatisch sofort realisierbares Bargeld.

BeispielA08: sonstige Aktiva4.960, Bargeld39.720,30 Fass zu gemeinsamem Kurs30. E1 **vor und nach dem Kreis45.580**. Die alte stille Wertsteigerung660 ist in dieser Bewertung bereits vorher sichtbar, nicht erst nach Einkauf künstlich neu. Falls45.000 als Schwelle bliebe, wäre sie schon vorher erreicht; Gilde und echte Verdienste blieben trotzdem eigenständige Voraussetzungen. Dies ist eine reale Bewertungsänderung, kein heimlicher Goldbonus.

Vorteile: Waren bleiben als wirtschaftliches Kapital berücksichtigt; eigentümerweite, nicht kostenabhängige Invariante. Nachteile: legitime Preis-/Standortänderungen und Altwaren werden anders bewertet; unbekannte Fernkurse, Marktgrenzen und Buchvermögensanzeige müssen klar erklärt werden. **Nicht ohne fachliche Freigabe in Kreditlimit oder gespeicherte Beträge übernehmen.** Bestehende Kredite nicht fällig stellen, wenn ein neuer Sicherungsrahmen kleiner ausfällt.

### W2 – konservative Sicherungsbasis ohne Warenbuchwerte

`E2 = Bargeld + Bank − Schuld + unabhängig bestimmter genehmigter Sicherheitenwert der Schiffe/anderen eindeutig bewertbaren Aktiva`. Waren-/Lagerkosten und davon abgeleitete Werft-Buchwerte sind **nicht** Voraussetzung oder Kreditsicherheit. Finanzbuchvermögen darf weiter als beschriftete historische Buchgröße angezeigt werden; es steuert dann keinen aktiven Zugang und keinen Kreditrahmen.

Gleiche Kasse/Bank/Schuld/Schiffe bedeuten gleiche Zulassungsbasis, auch bei künstlich veränderten Warenkosten. Für Schiffe käme ein unabhängig vom Warenbuchwert berechnetes bestehendes Werftangebot als konservativer Ansatz in Betracht; letzter unverkäuflicher Rumpf ist nicht garantiert liquide. Neue Sicherungsfaktoren werden hier nicht festgelegt. Laufende Bauaufträge nicht mit manipulierbaren gespeicherten Materialbuchwerten hineinaddieren.

A08: ohne Warenwert E2=39.720+4.960=**44.680 vor/nach**. A03 mit mehr echter Ware bindet450 Bargeld: E2 sinkt450, obwohl Gesamtmarktwert bei unverändertem Kurs gleich sein kann. Das ist die bewusste konservative Abgrenzung, **keine Einstufung des Kaufs als Exploit**. Echte Verkäufe erhöhen liquide Mittel, echte Verluste bleiben im Finanzresultat sichtbar. Kreditaufnahme erhöht Geld und Schuld gleich, schafft daher kein E2; Bankumbuchung ebenfalls neutral.

Vorteile: keine Kurs-/Kostenlose, kein Fernpreiswissen, leicht prüfbare Kreisneutralität. Nachteile: ehrliche warenreiche Händler verlieren Sicherungsraum, besonders kleine liquiditätsarme Händler könnten benachteiligt werden. Deshalb konservative Alternative mit erheblicher Balanceentscheidung, kein automatischer Notfallpatch. Alte Schulden/Fristen erhalten; reduzierter Rahmen allenfalls für neue Kredite, niemals heimliche Zwangstilgung.

### Vergleich und Entscheidung

| Kriterium | W1 | W2 |
|---|---|---|
| Neutraler örtlicher Kreis bei festem gemeinsamen Kurs | Nach Gleichung invariant | Unabhängig von Warenmischung invariant |
| Mehrere örtliche Schiffe/Lager/Teilverkauf | Mengen zusammenfassen, ein Kurs | Kein Kosteneinfluss |
| Reale Gewinne/Verluste | Finanzmarge unverändert, Marktwert erkennt stille Gewinne/Verluste ggf. früher | Finanzmarge unverändert, Liquidität erst bei Zahlung |
| Unbekannte Altkosten | Kein Erfinden historischer Preise nötig | Kosten nicht qualifikationsrelevant |
| Kredite | Waren können Sicherheiten bleiben; Fernkurs-/Marktgrenzen nötig | Waren als Sicherheiten fallen weg, harte Liquiditätswirkung |
| Savebedarf | Referenz-/Bewertungsrevision und klare bekannte Kursquelle; kein zusätzlicher Politik-XP-Topf | Kleinerer Rechenbedarf, dennoch versionierte Regelrevision |
| Empfehlung | Bevorzugte fachlich vollständige Richtung, Details offen | Konservative Ausweichvariante, nicht ohne Folgen für Kreditspielraum |

Die [acht gespeicherten Fixturezustände](../../../tests/analysis/q1_03/inspection.json) wurden nur rechnerisch mit gemeinsamem Kurs30 betrachtet. A01/A02/A04/A05/A08 bleiben in beiden Zulassungsansätzen neutral. Bei A06/A07 bleibt E1 vor/nach Verkauf gleich, weil der aktuelle Marktgewinn/-verlust bereits **vor** Verkauf im Marktwert steckte; die echte realisierte Marge+660/−300 wird nicht gelöscht. **Kein getesteter vollständiger Bewertungs-/Kreditprototyp und kein allgemeiner Exploitschutz.**

## Ungeeignete Abkürzungen

- Nur Rufdeckel/Schwelle erhöhen: Kostenhebel auf Kredit/Vermögen bleibt.
- Nur FIFO-Kostenlose: Kauf30 zu30, danach Verkauf der alten30 zu8 kann30 neue Fass zu30 hinterlassen. Höherer Restbuchwert kann buchhalterisch korrekt sein; FIFO allein garantiert keine neutrale Zugangsbasis. Bestehendes Herkunfts-FIFO ist ohnehin kein Kosten-FIFO.
- Nur Cooldown/Wahlstichtag: Kreis kann später geschlossen werden, Titel/Kredit schon gewährt. Keine verlässliche Endgültigkeit.
- Kalibrierten Liquidationszuwachs mit altem Buchwert minimumkappen: bereits frühere V14-Gegenfälle mit gemischten Waren/Verlusten. Keine Übernahme dieses Ansatzes oder seiner Codebasis.
- Eigentümerweite nachträgliche Gewinnpunkte korrigieren: Für normalen Handel nach neuem Beschluss unnötig und riskant; ein bereits verliehener Titel würde dadurch nicht zuverlässig rückabgewickelt.

## Bevor spätere Umsetzung freigegeben wird

Alle Verbraucher inventarisieren: `netWorth`, `politicalWorth`, `creditLimit`, `promote`, Bürgermeister/Eldermann, GildenmodellB und gegebenenfalls Fernkaufmann, Rettungsweg mit Kreditprüfung und UI-Texte. Die sichere Basis muss überall einheitlich gelten; kein verborgener Rückfall auf alte Buchkosten. Mietschulden/alte Schulden separat transparent behandeln, nicht doppelt abziehen. Historische Einstandskosten, Warenherkunft und echte Goldwerte bleiben unverändert.

Nutzerentscheidung nötig: politische Vermögensanforderungen entfernen oder sichere Basis behalten; W1/W2 samt Kurs-/Sicherungsregeln; Kreditübernahme ohne Zwangstilgung. Bis dahin bleibt Q-001 **offen**, nicht durch diesen Bericht repariert.
