# Q1.01 – Bedienung, Städte und Atmosphäre

29.10.2026, Sicherungspunkt D. Produktionsbasis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Hauptdatei0.8d.1b/V13. **Neue Prüfung statisch**, historische Browsernachweise getrennt. Kein neuer realer iPhone-/iPad-/PC-Spieltest bestanden.

## 1. Browsergrenze dieses Audits

Playwright-Modul vorhanden, Browserstart scheiterte vor Erzeugung einer Spielseite: Chromium-headless-shell1234 fehlt; auch der erwartete vollständige Chromium-Pfad existiert nicht. Prozess nach Fehler beendet; keine Installation, kein langer Wiederholungsversuch. Geplante375×667,834×1194,1280×800 wurden **nicht tatsächlich geprüft**. Keine Screenshots, Klickzahlen, Konsolenfreiheit, Handelstransaktionen oder Export-/Import-Erfolge aus diesem Versuch behauptet. [Maschinenlesbarer Status](Q1_01_browserstatus.json).

Die vorbereitete Zweihafenprobe war ein temporärer Testentwurf, keine gespielte Karriere. Echte Nutzerprofile/Spielstände wurden nicht geöffnet. UI-Ergebnisse unten sind aus Code bzw. explizit historischen Berichten abgeleitet.

## 2. Was die Oberfläche bereits gut löst

| Bereich | Tatsächlich im Code vorhanden | Stärke / statische Grenze |
|---|---|---|
| Pixelstädte | Elf eigene Stadtprofile/Bilder, animierte Menschen/Arbeit/Boote/Wasser, Gebäude-Hotspots, Stadtbeschreibung | Orte haben eigenes Flair; sichtbare Bewegung ist noch kein aktiver Wirtschaftsteilnehmer |
| Orientierung | Goldene Türmarken, „Orte zeigen“, Hafenkai-Sprung, beschriftete Funktionen | Atmosphäre und Auffindbarkeit werden verbunden; ohne Namen kann Wiedererkennung anfangs schwer sein |
| Hafen/Kontor | Zustand, Reparatur, Waffen, Materialbau, Verkauf, Flotte; Bilanz und erster Hafenmeisterbrief | Wenige Weltorte mit sinnvollen Funktionsbündeln, manche Panels sehr lang |
| Markt | Menge standardmäßig0, Limits, Max-Kauf/Max-Verkauf tragen nur Menge ein; gesonderte Kauf-/Verkaufsknöpfe | Keine unabsichtliche Max-Transaktion; erneute Menge und langer Warenblock erzeugen Wiederholarbeit |
| Ortsbindung | Handel nur mit eigenem örtlichem Schiff; Schiffsauswahl zeigt Namen/Hafen/Kapazität | Verhindert Fernhandel über falsch liegendes Schiff |
| Seekarte | Städte als Marker und Zielauswahl, explizite Einzelfahrt/Konvoi, Manifest und Abbruch | Keine durch Fehlklick sofort gebuchte Reise; schematische Geografie, nicht nautische Distanz |
| Rathaus | Ist/Soll-Bedingungen, Fortschrittsbalken, nächster Schritt, örtliche Zusagen und Urkunden | Politischer Fortschritt bereits sichtbar; große Informationsdichte, keine echte Rivalenlaufbahn |
| Badehaus | Kosten15Gold/1Tag vorab, Gerüchtebuch, datierte Informationen, Ratshinweise | Gesellschaft als Ort der Information; lange Listen aus mehreren Informationssystemen |
| Bank | Guthaben/Schuld/Zins/Kreditrahmen, getrennte Aktionen | Klare Grundwerte; tatsächlicher Gesamtnettoertrag bleibt verteilt |
| Sicherung | Lokalität/Adressbindung/keinCloudsync ausdrücklich erklärt; Dateiexport/import und Warnung | Erfüllt bewusst lokale Gerätehaltung, kein automatischer iPhone↔iPad-Abgleich |

Feste Codebelege: [Markt889–905](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L889), [Ratstafel555–605](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L555), [CityLife1084–1230](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1084), [Hafen970–984](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L970).

## 3. Bedienwege und wiederholte Arbeit

Statischer Kaufweg ab Stadt: Markt-Hotspot öffnen → Ware/Menge wählen → Kaufen; ggf. zusätzliche Bestätigung bei mehr70% Bargeldeinsatz. Ein Max-Kauf ist Menge setzen plus tatsächlicher Kaufknopf. Das sind **Funktionsschritte aus Code, keine frisch gemessene Klick-/Touchzahl**. Bei Zahlenfeldeingabe entstehen je Gerät weitere Aktionen.

Reise: Seekarte öffnen → Ziel wählen → Einzelfahrt/Konvoi vorbereiten → Weitersegeln → Ankunft lesen/Handel öffnen. Diese Bestätigung erfüllt einen Zweck, weil Zeit und Geld verbindlich werden. Automatisches Wegklicken wäre keine pauschale Verbesserung. Wiederholte bekannte Handelsketten könnten aber von besser bewahrtem Kontext profitieren, ohne Ware oder Fahrt automatisch zu buchen.

Preise vergleichen: aktueller Markt, datiertes eigenes Preisbuch, Bestandsbänder, gekaufte Informationen. Keine allwissende Fernpreistabelle. Das stützt Unsicherheit, verlangt aber Quellen-/Datumswechsel. Badehaus, Archiv, Handelsbrief und Preisbuch sind verschiedene Wissensarten; ihr Nebeneinander ist nicht automatisch ein doppeltes Menü. Ein gemeinsamer verständlicher Einstieg wäre eher zu prüfen als ersatzloses Entfernen.

Gewinnanzeige: örtlicher Preis gegen Ø-Einkauf, letzter Handelsbeleg, Chronik, Kontor-Buchvermögen. Keine dauerhaft zusammenhängende Kassenüberleitung für den ganzen Törn. Kreditaufnahme kann für unerfahrene Spieler wie verfügbarer Erfolg wirken, wenn Schuld und echte Marge nicht gemeinsam betrachtet werden. Q-006 empfiehlt vorhandene Buchungen verständlicher zusammenzuführen, keine neue Bankengine.

## 4. iPhone, iPad und PC

Die lebendige Stadt hat min-width900 und Karte900 Pixel; auf schmalen Viewports ist **innerhalb dieser Bereiche bewusstes Schieben** nötig. Das ist nicht automatisch ungewollter Seitenüberlauf. Beschriftete Zielauswahl und Gebäude-Fokus sind wichtige Alternativen. Große Kontaktflächen (viele44-Pixel-Regeln), Fokusführung, Escape/Tab und reduzierte Bewegung sind vorhanden. Tatsächliche VoiceOver-/iOS-Tastatur-/Safari- und Ermüdungsqualität wurde hier nicht getestet.

Die eigenständige HTML-Datei umfasst **46.358.064 Bytes**, rund44,2MiB, großteils eingebettete Bilder. Das ist eine Dateigrößenmessung, **keine** gemessene Downloadzeit, RAM-Spitze oder FPS. Für ältere iPhones ist eine begrenzte echte Speicher-/Lade-/Wiederaufnahmeprüfung sinnvoll. Kein Grafikabbau oder Assetumbau allein aufgrund der Dateigröße beschlossen. Browserdokumenttitel nennt noch0.8a, sichtbare Releasekennung0.8d.1b; kleiner Metadatenunterschied, kein Mechanikfehler.

## 5. Historische Laufzeitevidenz

[0.8d.1b-Bericht](../2026-10-27_0.8d1b_handelsbriefe.md) dokumentiert am **tatsächlich geprüften HTML-Commit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`**, SHA256 bytegleich zur aktuellen Hauptdatei:

- Chromium154.0.8037.57,375×667/390×844/820×1180 mit emuliertem Touch und1280×900 mit Klick.
- Historischer Angebots-/Kauf-/Archiv-/Datumsablauf, realer Dateidownload/FileReader-Import/Reload; Quota-Negativprobe bei375. Keine neuen Prüfungen dieses Audits.
-18 technische Fokusgruppen,19 Basistests und18 Handelsregressionen im Bericht mit Ergebnisdateien/Fehlerchronik; anfänglicher Fehler eines Testharness gesondert erhalten.
- **Keine physischen iPhones/iPads, Safari oder VoiceOver.** Viewport375 ist kein echter iPhone-SE-2020-Gerätenachweis;820er Touch keine Freigabe eines konkreten iPad.

Ältere0.8a-Tests haben echte Anfängerschritte, Gewinn/Verlust und Reise-/Reparaturrückmeldung geprüft. Sie gelten für den dort dokumentierten Vorstand, nicht pauschal jede spätere Funktion. Entwicklergestütztes Klicken ist keine unbeeinflusste Nutzerstudie. Q1.01 hat historische Nachweise ausgewertet, keine bestandenen Tests hinzugezählt.

## 6. Atmosphäre und langfristiger Spielspaß – Urteil, keine Messung

Stärken sind die räumliche Hansewelt, dezenter Kontoraufstieg ohne Statue, Personen/Boote und datierte Briefe. Stadtleben wirkt lebendig, obwohl Figuren keine autonomen Handelsakteure sind. Die Verbindung von Markt, Hafen, Bank, Kirche und Rathaus unterstützt die ursprünglichen Projektziele.

Grenzen: Die atmosphärischen Texte der Reisen haben wenige Varianten und kaum aktive Ereignisentscheidungen. Politische Handlungen bleiben überwiegend Liefer-/Vorspracheketten. Große wiederholte Panels können Atmosphäre in Formulararbeit verwandeln. Mehr Animation oder längere Texte allein verlängern sinnvolle aktive Spielzeit nicht. Eine neue Audioatmosphäre wurde nicht beobachtet; kein akustischer Spielspaß behauptet.

Q-007/P1: echte Safari-/SE-/iPad-Kurzabnahme mit neuen QA-Daten und begrenzten Lade-/Speicher-/Tastaturwegen. Q-006/P1: Törnabschluss und tatsächliche Kosten besser sichtbar. Q-008/P2: wenige unterschiedliche Entscheidungen statt weitere Pflichtfelder. Bestehende Hotspots, sichere Reisebestätigung und Informationsbegrenzung beibehalten.
