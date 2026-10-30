# Q1.09b – Unbegleitete Schiffsreisen: konkrete technische Vorlage

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

**Nicht aktiviert.** Die bestehende sichere Ablehnung unklarer Fernreisen bleibt produktiv bestehen und wurde im echten Chromium nochmals bestätigt. Fernansicht, örtlicher Handel und Warenverwaltung bleiben erhalten; sie versetzen den Kaufmann nicht persönlich.

## Kleiner vorgeschlagener Ablauf

1. Reisevorbereitung ausdrücklich als `personal` oder `unaccompanied` kennzeichnen. Eine persönliche Reise setzt belegten Personenort am Ausgangshafen voraus. Eine unbegleitete Fahrt verlangt einen bereits bekannten, anderen Personenort und ein wirklich dort liegendes ausgewähltes Schiff. Unbekannte Altorte erst über die bestehende erklärte Verankerung klären.
2. Teilnehmer wie bisher: ausgewähltes örtliches Schiff oder alle eigenen örtlichen Schiffe als bestätigter Konvoi. Keine entfernten Schiffe automatisch einsammeln. Bestehende Mindestgeschwindigkeit nach Zustand, `routeTravelDays`, Umschlagtage sowie4/6/9-Gold-Gebühren unverändert übernehmen.
3. Vorbereitung ist kostenlos und verbraucht keinen Zufall. Revision und Ausgangshafen binden. Geld und Reiseereignisse erst beim bestätigten Weitersegeln in derselben gemeinsamen exklusiven Schreibgrenze behandeln.
4. Im bestätigten Vorgang dieselbe bestehende Risikologik genau einmal ausführen: Piratenabwehr/Bewaffnung/Konvoischutz, Ladungsverlust inklusive Warenherkunft, Sturmschäden, tägliche Märkte, Zinsen, Mieten, Auftrags-/Amtsfristen und Bauübergaben. Weltzeit schreitet auch bei Abwesenheit fort. Keine neue asynchrone Weltsimulation oder Delegation einführen.
5. Nur Teilnehmer bewegen. Bei `unaccompanied` bleibt der vollständige `politics.safety.person` unverändert – einschließlich Quelle/Zeitbeleg. Kein persönlicher Besuch, kein politischer Zeuge und keine Vertragsstation. Auch der einmalige Altanker wird dadurch nicht zum Ankunftsbeleg.
6. Gemeinsamer Kandidat wird einmal gespeichert; bei Fehler Geld, Zeit, Schiffe, Person, Herkunft und Ereignisse vollständig zurücksetzen. Veraltete Pläne müssen neu vorbereitet werden. Seitenneustart verwirft nur eine unbestätigte Vorbereitung wie bisher; kein halber Reiseabschluss.
7. Meldung und Ereignis müssen „Schiff angekommen“ von „Kaufmann angekommen“ unterscheiden. Keine persönliche Ankunfts-/Besuchsgutschrift bei Fernfahrt. Wie bestehendes globales Ansehen/`visits` und reisende Handelsereignisse dabei behandelt werden, ausdrücklich entscheiden; nicht nebenbei die beschlossene spätere politische Ruftrennung implementieren.

Die Ansicht kann den Zielhafen zeigen, während der Personenort zu Hause bleibt. Politische Vorsprachen prüfen weiterhin die Person, nicht die Ansicht. Nachweislich fremde Ware bleibt echte Ware; ihre Herkunft wird nicht geändert, und eine Warenlieferung ist keine persönliche Ratsvorsprache.

## Tatsächlich vorbereitet und geprüft

[Isoliertes Angebotsmodell](../../../tests/safety/q1_09b/travel-proposal.cjs), zwei der17 [Vorschlagsgruppen](../../../tests/safety/q1_09b/results/proposals-attempt1.json). Das Modell berechnet nur Teilnehmer, native Reisedauer, Gebühren, Revision und unveränderte Person. Keine Fahrtfunktion, kein Risikoresolver und kein Import in das Spiel.

Beispiel Hamburg→Brügge: Kogge allein8 Tage/6 Gold; örtlicher Konvoi im kontrollierten Beispiel8 Tage/10 Gold. Drittes Schiff in Lübeck bleibt ausgeschlossen. Unbekannte Person, fehlendes örtliches Schiff und unbezahlbare Gebühr werden im Angebotsmodell abgewiesen. Zwei kleine native persönliche Reisen sind zusätzlich im Browser geprüft; die alte44er-VM-Basis enthält Konvoi-/Ankunftsfehlerfälle.

**Nicht geprüft/noch nötig:** aktive unbegleitete Risikoverarbeitung, Konvoi/Sturm/Piraterie mit unverändertem Personenbeleg, tatsächliche Altvertrags-/Bau-/Amtswechsel während Fernfahrt, Ereignis-/Rufregeln und Benutzerfreigabe. Die Angebotsprüfungen sind kein Nachweis einer fertigen neuen Reisemechanik. Keine produktiven Felder oder Menüs hinzugefügt.
