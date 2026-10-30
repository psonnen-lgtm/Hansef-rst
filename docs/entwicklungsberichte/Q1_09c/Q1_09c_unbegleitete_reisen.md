# Q1.09c – Persönliche und unbegleitete Reisen

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

## Aktives Verhalten

Der persönliche Aufenthaltsort, betrachtete Stadt und tatsächliche Schiffshäfen bleiben getrennt. Eine Fahrt vom entfernten Schiffshafen ist unbegleitet. Im Hafen des Kaufmanns bietet die vorhandene Reisevorbereitung die Wahl **„Ohne persönliche Mitreise vorbereiten“** beziehungsweise „Persönlich mitreisen“. Kein neues Menü. Persönliches Einsteigen aus einem anderen Hafen wird abgewiesen; unbekannte historische Personenorte benötigen zuerst den bestehenden einmaligen Anker.

Teilnehmer, langsamstes Schiff nach Zustand, Reise-/Umschlagzeit, Gebühren4/6/9 Gold je Typ, Bewaffnung, Konvoischutz, Piraten und Sturm bleiben unverändert. Planung/Ansichtswechsel kosten weder Geld, Zeit noch Zufall. Erst bestätigte Ankunft führt die gesamte Aktion unter gemeinsamer Schreibgrenze aus.

Unbegleitet bewegen sich nur die gewählten örtlichen Schiffe. Weltzeit, Märkte, Zinsen, Mieten, Werft- und Vertragsfristen laufen normal. `person.city/source/at` bleibt vollständig unverändert, ebenso persönliche Besuche und Ansehen. Kein Vertragszeuge und keine Delegation. Die Ankunft nennt ausdrücklich die Schiffe statt einer angeblichen persönlichen Ankunft; das Reiseereignis trägt `mode`/`personalArrival`.

## Risiko und Speicherung

Persönliche/unbegleitete Fahrt verwenden dieselbe bestehende Risikoermittlung. Wiederholte bestätigte Ankunft ist wirkungslos. Bei fehlgeschlagenem kanonischen Commit bleiben Geld, Tage, Schiffe, Person und protokollierte Ereignisse unverändert.

Zusätzlich korrigiert: Vorher würfelte ein erneuter Versuch nach Schreibfehler dasselbe Risiko nochmals. Ein noch offener Plan hält dieses Ergebnis jetzt **privat und unsichtbar**, einschließlich bereits bestimmter Sturmschäden. Derselbe Plan verwendet es beim Neuversuch. Keine Ergebnisvorschau vor erfolgreicher Speicherung. Erfolgreiche Fahrten erhalten keine zusätzlichen Zufallsaufrufe. Vorbereitung bleibt wie bisher flüchtig: Neuladen verwirft eine unbestätigte Fahrt, ohne Geld/Bewegung; der neue Zustand nach bestätigter Fahrt wird vollständig gespeichert. Ein nie veröffentlichter fehlgeschlagener Versuch ist kein dauerhaft registrierter Reiseerfolg.

## Tatsächliche Prüfungen

[10 VM-Gruppen](../../../tests/safety/q1_09c/results/final-acceptance/travel.json): gleiche native Zufallsfolgen für ruhige See, Sturm, Abwehr und Piraterie bei beiden Modi; gleiche Gebühren/Tage/Schäden/Herkunftsverluste; örtlicher Konvoi; persönliche Vorsprache trotz passender Zielstadt verweigert; Reload vor/nach Fahrt; Fehler/Neuversuch; veralteter Plan; bewusster Landaufenthalt und unmögliches Ferneinsteigen.

[Gezielte Risiko-Rückfallprüfung](../../../tests/safety/q1_09c/results/final-acceptance/risk.json) und echte Chromium-Gruppen bestätigen genau einen Risikowurf bei Schreibfehler/Neuversuch, unsichtbare Vorschau und einen gespeicherten Reisevorgang. Zwei echte Tabs können dieselbe unbegleitete Fahrt nicht doppelt verbuchen. Eine echte persönliche Rundreise erlaubt weiterhin die vorher verweigerte Ratsvereinbarung.

[Gemeinsame Uhr-Integration](../../../tests/safety/q1_09c/results/final-acceptance/clock-integration.json): Eine3-Tage-Fernfahrt vollendet den vorhandenen Bau in Lübeck, bewegt den Reiseteilnehmer zum Ziel, verzinst Bank/Kredit und lässt einen alten Vertrag ohne Verdienst ablaufen. Kaufmann unverändert, genau ein aktiver Speichercommit, Reload identisch. Nur21 kontrollierte Spieltage einschließlich Vorbereitung, keine große Simulation.

Keine automatische Handelsroutine oder Flotten-KI implementiert. Safari/echte Apple-Geräte weiterhin ungeprüft.
