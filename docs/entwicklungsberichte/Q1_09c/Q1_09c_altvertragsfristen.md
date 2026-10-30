# Q1.09c – Enge einmalige Altfristschonung und V13-Bestandsschutz

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

## Nachweis vor jeder Schonung

Beim erstmaligen Übernehmen einer alten V13-Partie ohne Sicherheits-Unterrevision werden Originalbytes unverändert gesichert. Die Kopie erhält unter `politics.safety` Original-SHA256, normalisierten Anfangszustands-SHA256 und Import-Spieltag. Die Hashfunktion wurde gegen native SHA256 für ASCII, Umlaute/Emoji und längere Eingaben geprüft.

Erst beim ausdrücklichen einmaligen Personenanker darf eine Schonung entstehen. Erforderlich sind derselbe Spieltag und derselbe ursprüngliche Spielzustand abseits der neuen Sicherheitsmetadaten. Nach zwischenzeitlichem Tagesfortschritt oder veränderten Spieldaten keine automatische Schonung. Frühere M2-Partien ohne verlässlichen Erstübernahmenachweis erhalten keinen erfundenen Nachweis, unabhängig davon, ob ihr Personenort schon bekannt ist.

Automatische Erstnachweise werden hier für originale V13-Sicherungen erzeugt. Ältere Formate ohne solchen Nachweis bleiben kontrollierte Übernahmen ohne automatische Fristschonung.

Alle vorhandenen Daten bleiben erhalten. Besonders korrigiert wurde ein früher M2-Sonderfall: Fehlendes optionales `legacyPersonalJobs` darf eine gültige gespeicherte persönliche Ankunft nicht wieder auf „unbekannt“ setzen. Neue technische Zuordnung kontrolliert ergänzen, vorhandenen Personenort bewahren. [Gezielte Prüfung](../../../tests/safety/q1_09c/results/final-acceptance/person.json).

## Genauer belegbarer Fehlbetrag

Nur alte aktive Ratsvereinbarungen/Hanseverträge, deren Original-ID und Frist bekannt und beim Import noch nicht abgelaufen sind. Lieferaufträge und vollständig erfüllte Verpflichtungen erhalten keine Schonung.

- Bereits bestätigte Stationen bleiben erhalten. Fehlende persönliche Besuche werden nicht automatisch bestätigt. Ein Anker an einer fehlenden Station ist kein Reisebeleg; tatsächlicher Aus-/Rückweg bleibt erforderlich.
- Bestehende Routenformel samt Umschlagtagen und tatsächlichen Schiffsgeschwindigkeiten/-zuständen verwenden. Keine hypothetischen30%-Zustände als zusätzlicher Sturm-Puffer. Kürzeste belegte Wege und schnellere verfügbare örtliche Schiffe berücksichtigen.
- Nicht auf ein langsameres Schiff ausweichen, um mehr Schonung zu erzeugen. Ist die schnellste belegte Route nicht direkt bezahlbar, keine automatische Wirtschaftshilfe. Kann ein schnelleres entferntes Schiff durch Wechsel/Umpositionierung den Restweg verkürzen, ist die Ein-Schiff-Route nicht eindeutig: **keine automatische Schonung**, Originalfrist unverändert. Ein vollständiger Flottenreiseplaner wurde nicht eingeführt.
- `Wirksame Frist = Import-/Ankertag + konkret belegte erforderliche Reisetage`, nur falls später als die Originalfrist. Keine pauschalen Zusatz-/Wartetage und keine Verlängerung über Kalendergrenzen.

Beispiel: vorhandene Kogge mit50% Zustand, Hin-/Rückweg3+3 Tage,1 Tag Restfrist → **genau5 Tage Schonung**. Bei100% Zustand kann derselbe Weg nur2+2 Tage benötigen; dann wären es3 statt5. Wetterrisiken nach dieser ersten Berechnung erzeugen keine automatische zusätzliche Verlängerung.

## Unveränderliche Originalfrist und Einmaligkeit

Das Vertragsfeld `until` bleibt unverändert. Ein eigener validierter Beleg enthält Originalvertrag, wirksamen Termin, Originalhash, Import-/Ankertag, Ankerstadt, Schiffsdaten, bestätigte Fürsprecher und konkrete Teilstrecken. Derselbe Beleg wird von Ablaufuhr, Anzeigen, Annahme-/Besuchs-/Abschlussprüfungen verwendet. Keine zweite Speicherung außerhalb der gemeinsamen atomaren Grenze.

Pro Vertrags-ID höchstens ein Eintrag. Validator prüft exakte Felder, Tage, Herkunftsbezug, Wegberechnung, Verlängerung und doppelte Einträge. Bei kanonischem Export/Import und Neustart bleibt der Beleg erhalten. Eine lokale Wiederherstellung derselben Originalkopie übernimmt einen bereits vorhandenen Beleg anstatt eine neue längere Frist zu erzeugen. Ein externes vollständiges Zurücksetzen sämtlicher Offline-Daten wird nicht als generell verhinderbar behauptet.

Keine Gold-/Ansehens-/Urkundengutschrift durch die Schonung. Tatsächliche Erfüllung kann weiterhin einmalig den bestehenden legitimen Verdienst erzeugen. Nach Ablauf des wirksamen Termins normaler Vertragsablauf ohne erfundene Leistung. Beleg bleibt für die Nachvollziehbarkeit erhalten.

## Abnahme und Grenzen

[14 VM-Gruppen](../../../tests/safety/q1_09c/results/final-acceptance/grace.json): genaue5 Tage, Originalfrist, echte Reise/Bestätigung, normale spätere Expiration, Export/Import/Reload, keine Doppel-Schonung, Anker ist kein Zeuge, schnellere örtliche/entfernte Schiffe, Ausschlüsse, M2, verzögerter Anker, Schreibfehler und ungültige Belege sowie erhaltene Hansebesuche/Siegel. Echte Chromium-Datei-/Neustartprüfung und zwei gleichzeitig ankernde Tabs bestätigen die Einmaligkeit zusätzlich.

[Regelblock](../../../tests/safety/q1_09c/legacy-rules.js) ist bytegleich in der tatsächlichen Haupt-HTML enthalten. Alle Migrationen nur mit synthetischen oder abgeleiteten historischen Kopien. Keine echten Nutzerdateien verändert. Für ausgeschlossene unklare/fortgeschrittene Fälle besteht **keine automatische Rettungszusage**; sie müssen vor einer eventuell später genehmigten Einzelfallbehandlung geprüft werden.
