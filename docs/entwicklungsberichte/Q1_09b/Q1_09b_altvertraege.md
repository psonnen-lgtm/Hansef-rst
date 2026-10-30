# Q1.09b – Enge einmalige Fristschonung für alte Verträge

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

**Vorbereitet, nicht aktiviert. Keine bestehende Frist geändert.** Historische Titel, Urkunden, bereits bestätigte Besuche und Vertragsdaten bleiben unverändert. Ein unbekannter alter Personenort darf nicht als nachträglicher Besuch erfunden werden.

## Problem und Vorschlag

Eine früher über entfernte Schiffsansichten geplante persönliche Station kann mit echter Hin-/Rückreise nicht mehr in eine sehr kurze Altrestfrist passen. Empfohlen wird deshalb keine globale Verlängerung, sondern eine ausdrücklich bestätigte Einzelfallübernahme mit Beleg:

- Ausschließlich nachweislich im ursprünglichen V13 vorhandene, beim ursprünglichen Import noch nicht abgelaufene aktive Ratsvereinbarungen/Hanseverträge. Keine Lieferaufträge, fertigen Urkunden oder neuen Verträge.
- Originaldatei/Hash, Vertrags-ID, Originalfrist, Import-Spieltag und erster ausdrücklich bestätigter Personenanker mit örtlichem Schiff festhalten. Anker bestätigt keine fehlende persönliche Station.
- Nur einen belegten Restweg berechnen: bei unbestätigtem Ratsbrief zur Partnerstadt und zurück; bei schon bestätigtem Brief nur nötigen Rückweg; beim Hansevertrag vorhandene `visited` behalten und nur noch nötige unterstützende Städte unter der bestehenden Zwei-Handelsräume-Regel besuchen, dann nach Hause.
- Liegt der Altanker genau an einer noch fehlenden Station, ist ein tatsächlicher Aus-/Rückweg nötig. Der Anker allein darf sie nicht abhaken.
- Im Vorschlagsmodell konservativ mit dem vorhandenen ausgewählten Schiff und Zustand höchstens30% rechnen; bei alten Zuständen unter30% diesen niedrigeren Zustand verwenden. Bestehende Reiseformel einschließlich Nowgorod-/Venlo-Umschlagtage. Keine Schnellreise, keine neuen Routenparameter und kein pauschaler Zusatzpuffer.
- `Vorgeschlagene Frist = max(Originalfrist, Import-/Ankertag + konkret berechnete Reisetage)`. Nur positiver, nachgewiesener Fehlbetrag wird vorgeschlagen. Aktionsbestätigung kostet keine zusätzlichen Spieltage; letzter Tag zählt wie bisher mit.
- Ist die ursprüngliche Frist ausreichend, schon abgelaufen, kein passendes Schiff vorhanden oder die direkte Hafengebühr nicht bezahlbar: keine automatische Schonung. Wirtschaftliche Risiken/Mieten/Zinsen werden dadurch weder bezahlt noch erlassen; das ist keine Erfolgsgarantie.

## Beispiel, tatsächlich im isolierten Modell gerechnet

Alte Lübecker Vereinbarung, Ankertag486001, Originalfrist486002. Vorhandene Kogge: konservativer Hin-/Rückweg3+3 Tage,12 Gold Gebühren. Vorschlag bis486007, also **genau5 Tage Schonung**. Kein neuer Besuch, keine Urkunde, keine Goldprämie, kein politischer Punkt. Bei Anker bereits in der noch fehlenden Partnerstadt werden echte Ausfahrt/Rückkehr und Heimfahrt berechnet, nicht kostenlose Erfüllung.

[Belegmodell](../../../tests/safety/q1_09b/grace-proposal.cjs) und fünf der17 [Vorschlagsprüfgruppen](../../../tests/safety/q1_09b/results/proposals-attempt1.json): enger Fehlbetrag, Anker ist kein Zeuge, keine pauschale Schonung, bestehende Hansebesuche/Regionen erhalten, Bindung an Original und ersten Anker.

## Vor späterer Aktivierung noch verbindlich zu lösen

Das heutige Modell erzeugt nur ein **Dossier**, keine Migration, keinen wirksamen Ersatztermin und keine Verbrauchsregistrierung. Es schreibt nichts. Ein bloß erneut berechnetes identisches Dossier beweist noch keine einmalige produktive Anwendung.

Eine spätere Umsetzung braucht unter der bestehenden Schreibgrenze einen unveränderlichen Übernahmebeleg pro Original/Vertrags-ID, alten/neuen Termin samt Grund und genau einmaliger Nutzung. Aktuellen Stand zusätzlich prüfen: ID noch aktiv, nicht erledigt/gelöscht, alte Frist unverändert, vorhandene Besuche mindestens erhalten, kein bereits angewandter Beleg. Originalvertrag möglichst unverändert behalten und wirksamen Schonungstermin separat belegen; dafür nötige minimale Politikrevision ausdrücklich entscheiden. Validator, Ablaufuhr und alle Anzeige-/Abschlussprüfungen müssen denselben wirksamen Termin verwenden.

Das Modell erlaubt nur den ersten Anker ohne zwischenzeitlichen Spieltag. Für bereits fortgeschrittene M2-Partien, nachträgliche Neuimporte oder unklare Herkunft ist eine manuell begründete Einzelfallvorlage nötig; keine automatische neue Frist ab heutigem Datum. Einmaligkeit innerhalb einer Partie ist technisch absicherbar, vollständiges externes Zurücksetzen einer Offline-Datei nicht allgemein verhinderbar.

Bisherige Verträge laufen produktiv weiter nach ihrer unveränderten Frist. Dadurch bleibt das Risiko sehr knapper Altfälle **offen**. Native Aktivierungs-/Ablauf-/Doppelauszahlungsprüfungen einer Schonungsregel sind nicht ausgeführt, weil diese Regel nicht freigegeben ist.
