# Q1.03 – V13-Kompatibilität und zwei Übernahmevarianten

29.10.2026 · **Migrationskonzept; keine echte oder synthetische Partie migriert.** [Gesamtbericht](Q1_03_gesamtbericht.md) · [Anwesenheit](Q1_03_politische_anwesenheit.md) · [Testkonzept](Q1_03_testkonzept.md).

## Unverhandelbare Übernahmegrundsätze

Gold/Bank/Schuld, Warenmengen, historische Einstandswerte/Buchkosten, Herkunftslose, Flotte/Schiffshäfen, Lager/Mietschuld, Bauaufträge, Marktwerte, Informationen/Archiv, Urkunden, Titel und laufende Amts-/Vertragsdaten erhalten. Keine nachträgliche Umdeutung alter Handelsrufpunkte als neue städtische Verdienste. Keine erzwungene Gebühr, keine automatische Ernennung, keine willkürliche Vermögenskorrektur. Bestehender globaler Ruf wird übernommen, auch wenn Herkunft nicht aufklärbar ist.

Waren dürfen nach einem später beschlossenen W1 anders **bewertet** werden, ohne Mengen/Kosten zu verändern. Das muss als neue Berechnungsregel erkennbar sein. Eine gesunkene neue Kreditsicherheit darf bestehende Schuld nicht erhöhen/fällig stellen oder negative Goldwerte produzieren. Keine alten Kredite löschen, keine unbegründete Zwangstilgung.

## Was V13 tatsächlich validiert

`validate`308–334 erlaubt Versionen3–13 und ruft ab11 `validatePolitics` auf. Der Politikblock hat heute **exakte Schlüsselliste und `politics.version===1`**, gespeicherte Abschnitte30/60 und Bürgermeistervermögen45.000/85.000. Ein alter Client akzeptiert unbekannte zusätzliche Root-Felder möglicherweise, aber **keinen veränderten Politikblock**. `migrateInformation`749–750 validiert V13 vor Rückgabe und liefert bei Fehler `null`.

Das ermöglicht eine kompatible neue **Unterrevision**, ohne den gesamten wirtschaftlichen V13-Kern neu zu erfinden. Es ist ein Quellenbefund, **kein bereits bestandener Import-/Altkundentest**. „V13 bleibt importierbar“ und „jeder alte V13-Client kann neue Regeln weiter schreiben“ sind verschiedene Anforderungen. Letzteres wäre mit zuverlässigem Gilden-/Präsenzschutz unvereinbar.

## Zwei Varianten

| Kriterium | M1 – optionale Root-Erweiterung bei V13/Politik1 | M2 – V13-Kern mit versioniertem Politikblock2 |
|---|---|---|
| Schema | Neue Root-Metadaten für Gilde/Ort; alte Politikstruktur unverändert | `v:13` bleibt, `politics.version:2` plus genau validierte Gilden-/Präsenz-/Übernahmedaten |
| Alte V13-Dateien | Neue Anwendung könnte fehlende Felder initialisieren | Neue Anwendung liest Politik1 und erzeugt einmalig Politik2 auf Kopie |
| Alte Clients mit erweitertem Export | Können neue Felder ignorieren, ohne Gildenguard handeln und wieder speichern | Bestehender Politik1-Validator weist Politik2 nach Quellenlogik zurück; sichere Fehlermeldung später testen |
| Spielstandsicherheit | Verdeckter Rückfall auf alte Regeln/Metadatenverlust möglich | Neue Pflichtdaten und Regelrevision nicht optional; fehlender/ungültiger Block darf nicht zum Altreset führen |
| Bestandsschutz | Wenige Schemaänderungen, aber keine verlässliche neue Regelgeltung | Mehr explizite Übernahme, Altwerte/Titel/Jobs vollständig mitführbar |
| Aufwand | Erst klein, dann hoher Sonderfall-/Altclientaufwand | Mittel bis hoch, aber klare Validator-/Import-/Transaktionsgrenze |
| Bewertung | Nicht empfohlen ohne zusätzlich wirksame Trennung der Altclients | **Empfohlen als Konzept**; kein bereits freigegebenes Politik2-Schema |

M2 braucht kein Wiederverwenden des fehlgeschlagenen V14-Prototyps. Eine Unterrevision ist eine neue Speichervereinbarung und muss trotzdem ausdrücklich genehmigt/getestet werden. Neue Exporte sollen „V13 · Politikrevision2 · neuer Client erforderlich“ sagen; nicht die bisherige pauschale Rückwärtslesbarkeit suggerieren. Falls stattdessen ein klar nummeriertes Nachfolgeformat bevorzugt wird, ist dies eine Nutzerentscheidung, keine automatische Formatänderung dieses Auftrags.

Für M2 empfohlen getrennte aktive Speicherung von der alten V13-Adresse/Schlüssel, z.B. neuer klarer Schema-Schlüssel. Sonst könnte ein alter Client nach Ablehnung eines erweiterten Stands eine neue alte Partie unter denselben Schlüssel schreiben. Altschlüssel/Originalbackup bleiben lesbare Originale, nicht laufend synchronisierte zweite Wahrheiten. Neue Anwendung muss unterscheiden: noch nicht übernommener V13-Stand, bereits aktivierte neue Revision, tatsächlich beschädigter neuer Stand. **Beschädigte neue Pflichtfelder niemals als „alte Datei ohne Gilde“ zurücksetzen.**

## Vorgeschlagene Inhalte der neuen Unterrevision

Keine implementierte JSON-Struktur, sondern zu validierende Anforderungen:

- Gildenstatus `none/member` mit einmaliger Beitrittskennung, Datum/Ort und realem Zahlungsbeleg; geschützter Altzugang separat, keine gefälschte Mitgliedschaft/Nullzahlung.
- Persönlicher Ort mit Initialisierungsquelle `new_start/legacy_anchor/travel_arrival`, letzter persönlicher Ankunft und Revision; nicht aus View neu ableiten.
- Politische Heimat samt Quelle; alte effektive Heimat/Amtsstadt vor neuem Starthafen verwenden, sofern vorhanden.
- Expliziter aktiver Karriereregelmodus; alte `rules`, Ruf- und Ranghistorie unverändert als Ausgangsdaten bewahren. Kein automatischer Reset von `sectionDays`, Wahldaten oder `firstReceipt`.
- Geschützte Alttitel/Amtsrechte, Referenz auf Ausgangsversion/Originalhash, bereits behandelte Übernahme- und Transaktionskennungen; begrenzte Übergangsregeln nur für bekannte laufende Auftrags-IDs.

Diese Daten gehören zur bestehenden Politik und deren kanonischen Transaktion, keine zweite unabhängige Rang-/Vertrauensebene. Unterstützungszahlen nach Empfehlung aus vorhandenen Urkunden ableiten, nicht neue dauerhafte Stadt-XP speichern. Gildenzahlung und persönlicher Ort sind Zustands-/Rechtsdaten, keine neuen Reputationswährungen.

## Historische Ausnahmen und neue Partien

| Ausgangsstand | Vorgeschlagene Übernahme | Neue Regel danach |
|---|---|---|
| Neuer Kaufmann | Keine Gilde, Rang0, tatsächlicher Starthafen aus `beginning`/Startauswahl | Bewusster bezahlter Eintritt und echte Verdienste; kein Handelsrufaufstieg |
| Alter Kaufmann ohne politischen Titel | Alte Ruf-/Wirtschaftsdaten erhalten, keine erfundene Mitgliedschaft | Eintritt für neue formale Aufstiege; alte angenommene Pflichten nicht verwerfen |
| Alter Fernkaufmann | Titel behalten; politische Einordnung noch offen | Nicht allein durch alten wirtschaftlichen Titel automatisch bezahltes Mitglied behaupten |
| Alter Ratsherr | Rang2 bleibt, ausdrücklich gekennzeichneter Altzugang empfohlen | Keine erzwungene nachträgliche Gebühr; weitere echte Verdienste/Ortsregeln, keine neue Gratisurkunde |
| Aktiver Bürgermeister | Amt/Stadt/Beginn/Ende/`firstReceipt`/Termine unverändert, Altzugang | Amtszeit nicht ungültig; Bewährung/neu erforderliche Schritte mit Übergangsregel |
| Bürgermeistertitel ohne aktives Amt | Titel und vorhandene Bewährungsbelege bleiben; unbekannte Amtsstadt nicht erfinden | Titel allein ist kein neu erfundenes aktives Amt; gültige historische Rechte beachten |
| Eldermann | Rang4, bestehende elderman-/Vertrags-/Siegelbelege erhalten | Kein Rückstufen wegen fehlender Gilde/Neuberechnung; Weiterhandel bleibt |
| Laufender Rats-/Hansevertrag | IDs, Arten, Frist, `witnessed/visited`, Herkunftsanforderung, issued behalten | Fehlende persönliche Schritte brauchen neue echte Anwesenheit; Fristschonung oder enges Altregelrecht vorher entscheiden |
| Unbekannte Kosten/Herkunft | `null`/unbekannt bleibt unbekannt | Keine rückwirkenden Kauflose, kein neuer Fremdbeweis aus alter Menge |
| Alte Exportdatei | Vollständiges Original bewahren, erst validierte Kopie übernehmen | Keine stillschweigende Verschmelzung mit aktueller Partie/zweite Mitgliedsgebühr |

Geschützter Altzugang ist eine **offen ausgewiesene historische Ausnahme** vom Gildenpflicht-Eintritt neuer Karrieren. Er vergibt keine bezahlte Mitgliedschaft und keine neuen Verdienste. Diese Ausnahme ist eine technische Empfehlung zum beschlossenen Titel-/Amtsschutz, ihre genaue Reichweite muss der Nutzer bestätigen. Eine Alternative, alte Titel nur anzuzeigen und sämtliche weiteren Rechte bis zur Gebührenzahlung zu sperren, wäre restriktiver und würde gerade aktive Ämter belasten; nicht empfohlen.

Auch wenn ein alter Rang unter dem alten Q-001-Fehler erreichbar war, wird er nicht nachträglich entzogen. Aus gespeicherten Endwerten lässt sich weder Erwerbsweg noch Absicht zuverlässig rekonstruieren. Neue Partien/neue Handlungen müssen die neuen Regeln einhalten.

## Persönlicher Altanker und Heimat

Ein echter alter Personenort ist unbekannt. Empfohlene einmalige, informierte Bestätigung des gültigen aktuell betrachteten eigenen Schiffshafens als **Übergangsanker**, keine behauptete frühere Ankunft. Fehlende Vertragsvorsprachen dadurch nicht erfüllen, siehe Ortsbericht. Ist `s.city`/aktives Schiff ungültig, nicht wahllos eine Stadt wählen; Übernahme abbrechen/Original erhalten und Zustand erklären.

Heimat: belegtes aktives Amt beziehungsweise heute wirksamer alter `politicalHome()`-Wert erhalten. Sonst verlässliche `beginning.city` nutzen. Fehlt beides, ausdrückliche einmalige Festlegung statt stiller Zuordnung aus der Flottenfernansicht. Konflikt zwischen alter Amtsstadt und Starthafen kennzeichnen; Amtsrechte haben Bestandsschutz. Eine Festlegung ist kein neuer Verdienst.

## Konkreter späterer Übernahme-/Speicherablauf

1. Quellversion und Unterrevision erkennen; vollständige Originalbytes sichern und Sicherungserfolg prüfen. Fehlende Sicherung/Quota: unverändert abbrechen.
2. Auf tiefer Kopie bisherige bewährte V11/V12→V13-Importstufe verwenden, soweit ältere Exporte unterstützt werden; V13/Politik1 direkt validieren. Nie dabei neue Märkte/Werte auswürfeln. Noch keine Migration ausgeführt.
3. Einmalige erklärte Gilden-/Altzugangs-/Orts-/Heimatzuordnung durchführen. Alte Belege/Regeln/Fristen kopieren, neue Quellen nur ab Aktivierung. Alle neuen Pflichtfelder streng prüfen.
4. Neue aktive Revision und ganzen Zustand in **einer** echten Transaktion speichern, anschließend erst aktiv schalten/UI aktualisieren. Gildenbetrag und Mitgliedschaft, Reisen/Personenort, Urkunden und Verbrauchszustand nicht auf mehrere unkoordinierte Writes verteilen.
5. Alle neuen Schreiber teilen dieselbe Revisions-/Writerregel. Einfaches `getItem`/`setItem` oder ein globales JavaScript-Busy-Flag ist keine atomare Zwei-Fenster-Garantie. Bestehende `politicalAction`-Kopie ist wiederverwendbare Struktur, Q-002 bleibt Integrationsvoraussetzung.
6. Export enthält komplette Revision samt Gilde/Ort/Altzugang und IDs. Import ersetzt vollständig nach Bestätigung, keine unbemerkte Zusammenführung. Bereits bearbeitete neue Revision nicht erneut initialisieren/erneut bezahlen lassen.
7. Bei unterbrochener Speicherung gilt entweder der vollständige alte oder vollständige neue aktive Stand. Originalbackup bleibt verfügbar. Wiederaufnahme liest kanonische gespeicherte Revision, nicht zuletzt betrachteten Hafen.

Vollständig zurückgesetzte Offline-Originalexporte bilden frühere Partien. Weltweiter Anti-Rollback/Manipulationsschutz ist ohne Server nicht zugesagt. Eigene alte Clients und neue Unterrevision müssen dennoch vor versehentlichem Verlust/ungültiger Weiterführung geschützt werden.

## Offene Entscheidungen vor Freigabe

M2-Unterrevision/Schlüssel und Altkundenmeldung; Umfang Altzugang; Fernkaufmannstatus; persönliche Ankerbestätigung; Heimatfälle; Fristschonung vs begrenzte Altregel für laufende Verträge; W1/W2-Kreditfolgen; aktive Unterstützungsformel. Keine dieser Entscheidungen durch bloßes Dokumentieren heimlich aktiviert. Alle Migration-/Quota-/Export-/Mehrfenstertests bleiben **geplant**.
