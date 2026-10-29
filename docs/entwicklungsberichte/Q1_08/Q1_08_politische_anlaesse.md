# Kleine Anlasslogik – Lebenslauf statt Ereignisengine

30.10.2026 · **Entscheidungsreifer Konzeptvorschlag, keine Umsetzung und keine Spieltest-Abnahme.** Beschlossene Regeln bleiben unverändert. Neue Detailregeln dieses Dokuments benötigen Nutzerfreigabe. Referenz: Q1.07 `354361e51360c7d57a9b619813114c15380f06ee`.


Zwei definierte Falltypen reichen: **A-Erstmandat** (verlässlich) und **B1-Doppelbedarf** (zustandsgebunden, Pilot einmalig). Keine offene Zufallsszenenmaschine. Rathaus, Gilde und Kontor lesen dieselbe Fallkennung. Stadt, Falltyp, Ursachennachweis, gebundene Bedingungen und Regelfassung gehören zusammen.

| Zustand | Eintritt / erlaubte Aktion | Übergang und Anerkennung |
|---|---|---|
| Noch nicht verfügbar | A: vor Mitgliedschaft/Altzugang; B1: kein gültiges örtliches Amt oder keine sauberen Bestandsbelege | Kein Angebot vortäuschen; Handel bleibt möglich |
| Angeboten | A: erster persönlich angeforderter Ratsanlass; B1: bestätigte doppelte Versorgungslage | Lesen/Schließen keine Frist und keine Punkte; Inhalt stabil |
| Angenommen / aktiv | Ausdrücklich bestätigte Aufgabe bzw. B1-Wahl, konkrete Frist gespeichert | Rückkehr zeigt dieselbe Verpflichtung; kein Wechsel zum leichteren Zweig |
| Unterwegs / bestätigt | Vereinbarung vom persönlich besuchten Partner bestätigt | Nur Teilnachweis, noch keine volle Vertragsurkunde |
| Erfüllt | Lieferung oder Rückbericht regelkonform; gemeinsame Validierung von Zustand/Ressourcen/Beleg | Genau ein Tatbeleg; Zustand abgeschlossen in derselben Speicherung |
| Gescheitert | Frist überschritten oder ausdrücklich abgebrochen | Keine neue Anerkennung, erfolgreiche andere Tat bleibt |
| Abgeschlossen | B1 nach Erfolg oder Scheitern; A-Tat nach Erfolg | Nicht neu öffnen/erneut belohnen |
| A: neuer Versuch | Nur unerfüllte Tat eines gescheiterten Erstmandats, bewusster Antrag | Gleiche Root-ID, neue Attempt-ID/Frist, keine Neuauswahl; maximal ein späterer Erfolg |

Für A sind Versorgung und Vereinbarung getrennte Unteraufgaben desselben Erstmandats. Ein erfolgreiches Teilstück bleibt endgültig anerkannt, selbst wenn das andere scheitert. Gesamtszene endet mit bewusster Ratsherrernennung bzw. bleibt als unerfülltes Mandat verfügbar; kein automatischer zweiter Ratsstadtstart.

Nicht angenommene Fälle erhalten keine künstliche Spielerpflicht. B1-Angebot zurücknehmen, wenn die doppelte Bedarfslage vor Annahme nicht mehr aktuell ist; als „erledigt ohne deine Zusage“ sichtbar. Nach Annahme gilt die vorher sichtbare Lieferpflicht weiter bis Frist, auch wenn Marktwerte sich ändern; Zustimmung war keine Garantiewette auf dauerhaft hohe Preise. Der Einmaligkeitsmarker bleibt, damit Marktflattern keine Angebote würfelt. Neue Amtstexte sind kein neuer Fall.

## Wiederkehr ohne Farming

A-Wiederholung dient ausschließlich der Wiederherstellung einer noch nicht erworbenen Anfangsqualifikation. Kein positiver Fortschritt durch Scheitern, Abbrechen oder Antrag. Bereits verbrauchte Ware bleibt verbraucht; alte Teilverkäufe nicht erneut anrechnen. Aktiver Brief kann nicht durch Wiederantrag verlängert werden.

B1 wird im Pilot nicht wiederholt. Für später wiederkehrende Anlässe braucht es eine neue sachliche Ursache mit bestätigter Erholung und eigenständiger neuer Verpflichtung. Das ist außerhalb dieses Umfangs; „nächster Tag“ oder neues Amt ist keine neue Ursache. Selbstverursachte Knappheit wird nach der konservativen Beobachtungsregel im Bürgermeisterdokument ausgeschlossen; unklare Attribution sperrt den Politikfall, nicht den Handel.

Kein Softlock: Ratsherr-A ist ohne zufällige Knappheit erreichbar und nach Fehlschlag wiederholbar. B1 ist keine einzige zwingende Amtsbewährungsquelle. Andere bestehende Dienste bleiben zugänglich, sollen später aber nicht unter neuem Kalenderetikett denselben Erfolg wieder auszahlen. Ein vollständiger Ersatz aller heutigen periodischen Angebote ist **nicht** freigegeben oder in diesem kleinen Entwurf vollständig gelöst.

Fallkennung, Attempt-Kennung und Tatkennung haben verschiedene Aufgaben. Ein Doppel-Klick darf nicht zwei Attempts oder Belege erzeugen. Bereits erfüllter Fall führt beim Reload direkt zur Quittung. Altverträge behalten ihre alte Regelfassung, nicht in neue Anlässe umetikettieren. Lokale Exporte sind damit nicht allgemein gegen fremde Manipulation oder Save-Rollback geschützt; keine solche Garantie.
