# Hansefürst 0.4 – erster Entwicklungsschritt

Separate HTML-Datei; 0.3 bleibt unverändert. Noch keine vollständige 0.4-Veröffentlichung.

## Umgesetzt
- Neuer Speicherschlüssel hansefuerst-v04; automatische Übernahme aus v03 oder v01 (Spielversion 0.2), Original bleibt erhalten.
- Prüfung von Märkten, Schiffen, Ladung, Geld und Aufzeichnungen; Sicherung vor Import und Neustart sowie bei Migration. Speicherfehler werden angezeigt.
- Eigener Hafen je Schiff. Handel, Reparatur und Bewaffnung nur am Schiffsort. Konvois umfassen nur Schiffe im Ausgangshafen.
- Kreditrahmen wächst nicht mehr durch Kreditaufnahme. Bestehende Schulden bleiben bestehen; oberhalb des Rahmens keine neuen Kredite.
- Nach Auftragsabschluss fünf Spieltage bis zum nächsten Angebot. Abgelaufene Aufträge zahlen keine Prämien.
- Wahlwiederholung erst nach zehn Spieltagen; keine Ansehensprämie für Niederlagen.
- Ankunft lässt sich nur einmal verbuchen.
- Alte Ladung ohne Einstandspreis zeigt unbekannte Einkaufskosten; gemischte Bestände bleiben bis zum vollständigen Verkauf unbekannt.

## Übernahme
Alle alten Schiffe werden dem gespeicherten Spielerhafen zugeordnet. Frühere Einzelstandorte sind nicht rekonstruierbar. Gold, Eigentum und Ränge werden nicht nachträglich gekürzt. Sicherung im Spiel exportieren, bevor zwischen Versionen gewechselt wird. 0.3 und 0.4 speichern anschließend unabhängig.

## Prüfung
`node tests/test-v04.cjs`: 19 erfolgreiche Logiktests mit simuliertem DOM. Sechs zusätzliche Gebührentests prüfen einmalige Zahlung, Schiffstypen, örtliche Konvois, fehlendes Gold, exakten Betrag und Abbruch. Browserinstallation versucht; Download liefert ein unvollständiges ZIP. Browsertests deshalb weiterhin nicht ausführbar. Echte Safari-/iPhone-/iPad-Prüfung offen.

## Nächste Schritte
1. Safari und Geräteprüfung, einschließlich Import/Export, Konvois, Einzelreisen und Abbruch einer Reise.
2. Hafengebühren mit Vorschau und einmaliger Verbuchung je Ankunft; zunächst 4/6/9 Gold als Balancetest für Schnigge/Kogge/Holk.
3. Reiseabrechnung mit Warengewinn, Gebühren, Prämien und Verlusten; bisheriger Warengewinn ist kein Reiseüberschuss.
4. Stadtprofile, begrenzte Preisreaktion auf Mengen und Rückkehr zu Normalpreisen; Vermögensbewertung abstimmen.
5. Touchflächen und Konvoiauswahl verbessern; Geburtstagsereignisse aus 0.2 wiederherstellen.

Umgesetzt sind inzwischen Hafengebühren von 4/6/9 Gold pro angekommenem Schiff, Vorschau vor Abfahrt und Zahlungsbeleg bei Ankunft. Nicht enthalten: neue Preisbildung, vollständiges Transaktionsjournal, Geburtstagsereignisse. Reiseereignisse bleiben bis zur Ankunft flüchtig; ein Neuladen bricht die geplante Reise ab.
