# R1.09 – Reproduzierbare Versuchsabläufe

28.10.2026. Nur reguläre DOS-Spielbedienung. Originalspielstände privat, kein Vertrieb. Vorherigen R108RET und SPIEL nicht überschreiben. Identitäten/Hashes im Forschungsbericht und JSON.

## Gemeinsame Vorbereitung

1. Vorhandene DOSBox0.74-3 mit R1.06-Konfiguration starten; PATRIZ im gemounteten privaten DOS-Verzeichnis.
2. Hauptmenü Laden, R108RET auswählen. Angezeigtes Wappen anhand historischer Originalkarte Rostock zuordnen, Namen regulär eingeben. Chronik verlassen.
3. Lübeck-Kontor öffnen, kleines Buch:4.Heuet1355,104Taler,5Mann,5nötig. Großes Buch: keine Ware an Bord.
4. Bank öffnen, Kredit nehmen, Partner0 Handwerker auswählen. Nicht direkt mitReturn leere Menge bestätigen. Im Angebot150 eingeben undReturn;31%/202Tage bei maximal250 angeboten. Kleines Buch bestätigt254Taler.
5. Eigener neuer Save R109BASE über Schreibfedern→Speichern→neuer Name→sichereSpiel→weiter. Unveränderte Ausgangsdateien beibehalten.

## A – Aktiver Handel und danach Zeit

Großes Buch im Kontor, Kauf-/Verkaufsmodus unten links wechseln. Je Zustand Kurs, Stadt- und Schiffsvorrat, Kasse sichern. In dieser Sitzung wurden folgende Einzeltransaktionen ausgeführt:

1. Getreide1 kaufen; erneut1 kaufen; erneut1 kaufen. Jeweils einzelne Zeile/Menge/Return, nicht Sammelkauf3.
2. Getreide dreimal einzeln1 verkaufen.
3. Bier1 kaufen und1 verkaufen.
4. Holz1 kaufen und1 verkaufen.
5. Bestände wieder am Ausgangswert, Kasse149. Keine sonstige Zahlung während dieses Abschnitts.
6. Reguläres Warten an der Kaiseite, Standardziel jeweils nächster Tag, „warten“ bestätigen.5.,6.und7.Heuet einzeln besuchen. Kleines Buch für Datum/Kasse, großes Buch für beide Kursrichtungen und drei Waren.

A02: Kauf-Nachbild entstand zu früh und zeigt noch den Vorzustand. Verkaufs-Nachbild bestätigt den korrekten neuen Zustand. CSV-Kauf-Nachquote bleibt leer; kein interpolierter Messwert. Andere Kauf-/Verkaufszustände wurden im privaten Kontaktbogen visuell geprüft.

## B – Kontrolllauf und anschließender Stadtvergleich

1. Regulär zum Hauptmenü, R109BASE laden; Kartenwappen Riga identifiziert und regulär beantwortet.4.Heuet,254Taler,0Ware,5Mann und gleiche Marktwerte im UI nachprüfen. Wiederherstellung ist keine Einnahme.
2. Ohne eigene Handelsaktion einzelne Wartetage5.und6.Heuet beobachten, beide Kursmodi fotografieren.
3. Aus Kontor-Wandkarte Rostock-Stadtikone wählen.6.→8.Heuet; fortlaufende Bildbelege der Chronik,14Taler Hafengebühr, Ankunftsbuch240Taler.
4. Rostock-Kurse für Getreide/Bier/Holz in beiden Modi. Getreide1 für48 kaufen,1 für33 verkaufen, Kasse240→192→225.
5. Lübeck-Stadtikone wählen, nicht benachbartesHamburg.8.→10.Heuet, Hafengebühr14, Kasse194. Beide Marktmodi, kleines Buch und Schuldenpapier aufnehmen. Schuldenanzeige Lübeck250.
6. Separater Endsave geschrieben. Namenseingabe ergabR109BASD, nicht beabsichtigtesR109END. Private Kopie end.PSD, BasisdateiR109BASE erhalten. Endkopie nicht erneut geladen, daher kein behaupteter Schluss-Ladetest.

## Praktische Bedienhinweise und Fehlerprotokoll

SDL-Koordinaten beziehen sich auf die konkrete R1.06-Surface-Ausgabe; Bildbreite640, Eingabe-x ungefähr halbe Bild-x. Keine universellen Hotspots:

| Funktion | SDL x/y |
|---|---|
| Lübeck-Kontor |65/340|
| kleines/großes Buch |182/352 bzw.230/400|
| Kauf/Verkauf |32/425|
| Getreide/Bier/Holz |55/80,55/195,55/350|
| Bank/Kredit nehmen |170/210, danach250/160|
| Schreibfedern/Speichern |244/272, danach155/90|
| Warten/Bestätigung |162/428, danach160/350|
| Kontor-Wandkarte |260/110|
| Rostock/Lübeck-Stadtikone in verwendeter Kartenlage |191/298 bzw.144/312|

Ein Kauf aus offenem Kaufbuch: Warenzeile klicken, Menge tippen,Return. Aus offenem Verkaufsbuch vorher Moduswechsel. „Max“ wurde nicht als Bestand oder Preis interpretiert. Geschütztes Ausgangssave unangetastet.

Bei Warteschritten bleibt die Chronik zunächst stehen bzw. läuft zeitversetzt weiter. Nicht blind Eingaben weiterreichen: tatsächlich sichtbare Stadt/Kontor/Modalmaske prüfen. Zwei Serien erwischten stattdessen ein Wartefenster. Diese privaten Fehlaufnahmen unter invalid-path-attempt bleiben aus Messdaten ausgeschlossen; korrekte Tageswerte wurden anschließend separat aufgenommen. Eine BMP-Zwischenkopie während Schreibens war unlesbar und wurde nicht ausgewertet. Menüartefakte nach Rückkehr beeinflussten die bestätigten Spielwerte nicht erkennbar. Keine Original- oder Speicherpatches zur Fehlerbehebung.

## Datenkonvention

CSV-Messwerte sind manuell aus sichtbaren Originalfenstern übertragen, keine simulierten oder generierten Originalwerte. Eine Zeile kann zwei unmittelbar nacheinander aufgenommene Kursbilder verbinden. Zeitstempel bezeichnen deren jeweilige reale Belegsicherung, nicht die Dauer menschlicher Spielarbeit. Leere Felder sind unbekannt, nicht0. Taler sind Spielgeld; Warenmengen sind angezeigte Einheiten, keine ohne Beleg angenommene Umrechnung zwischen Last und Fass. Kassenüberleitungen sind arithmetische Auswertungen dieser Daten.
