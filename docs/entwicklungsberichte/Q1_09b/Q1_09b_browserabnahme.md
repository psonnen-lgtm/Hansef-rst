# Q1.09b – Tatsächliche Browserabnahme und verbleibende Blockaden

30.10.2026, Europe/Berlin · Branch `fix/q1-09b-safety-completion`. Übernommener und tatsächlich geprüfter Spielcode **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, SHA256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Ausgangspunkt Q1.09-Abschluss **`e3498f8522ec456287fb4328dd6e895b96a1d07a`**. Nominalversion 0.8d.1b, Root-V13/Politik2/Sicherheit1. **Keine produktive Spieländerung in Q1.09b.**

## Verfügbare Umgebung

Q1.09 hatte keine ausführbaren Browser. Nun ist `/usr/bin/chromium`154.0.8037.57 tatsächlich installiert und erfolgreich gestartet. Playwright verwendet diese Binärdatei, nicht einen Browser-Stub. WebKit-Start wurde einmal geprüft: Programm `/home/agent/.cache/ms-playwright/webkit-2336/pw_run.sh` fehlt. **Keine neuen Downloads versucht.** Keine Safari-/Apple-Hardware verfügbar.

Ein temporärer Testserver liefert ausschließlich die vorhandene vollständige Haupt-HTML über localhost. Keine Spiel-, Cloud- oder Serverfunktion hinzugefügt. Jeder Test verwendet ein frisches Browserprofil und eigene synthetische Speicherstände. Native APIs für LocalStorage, Web Locks, Dateilesen und Blob-Downloads bleiben echt; gezielte Störungen sind unten ausgewiesen.

## Tatsächlich ausgeführt

**19 bestandene native Chromium-Gruppen**, ergänzt um einen ausdrücklich blockierten Datei-URL-Fall. [Überprüfte Zusammenstellung mit Herkunft je Gruppe](../../../tests/safety/q1_09b/results/browser-acceptance.json).

- Bytegleiche V13-Originalsicherung; Neuladen ohne erneutes Schreiben.
- Zwei echte Tabs: zwei unter einer realen exklusiven Web-Lock-Sperre eingereihte Aktionen. Genau eine Spende, ein Geldabzug, eine Revision; anderer Tab bekommt Konflikthinweis und lädt aktuellen Stand.
- Doppelbestätigung im selben Tab; Schließen eines wartenden Tabs ohne Ausführung; Schließen des Sperrhalters gibt native Sperre frei.
- Eingespritzter `QuotaExceededError` beim kanonischen Schreiben: Geld/Ansehen/Revision/Ereignisse zurückgesetzt, danach einmaliger erfolgreicher Neuversuch. **Kein physisch vollgeschriebenes Gerät.**
- Wirklicher FileReader-Import, Original-/Kanonik-Downloads, vollständige Wiederherstellung, parse- und schreibfehlgeschlagene Importe, verzögerter Import hinter einem anderen Tab wird als veraltet verworfen.
- Fehlende Web Locks kontrolliert simuliert: verständlicher Hinweis, keine Mutation, Originaldownload möglich. Speicherleseverweigerung kontrolliert simuliert: keine Übernahme/kein Löschen.
- Persönliche Altverankerung, Fernansicht ohne Reisebeleg, gesperrte unbegleitete Fernreise, wirklicher Hin-/Rückweg und genau eine politische Urkunde. Ankunft bei Schreibfehler vollständig zurückgesetzt; erneuter Versuch gelingt einmalig.
- Native Importe/Downloads/Reloads von abgeleiteten Ratsherr-, Bürgermeister- und Eldermann-Kopien erhalten alle alten Daten. Korrupte und zukünftige aktive Revisionen werden nicht still durch alte V13 ersetzt; bestätigte Wiederherstellung bewahrt rohe Originalbytes.
-375×812 und820×1180 mit Chromium-Touch-Emulation,1280×900 per Maus. Echte `tap`/`click`-Ereignisse, Spendenangebot/Gutschrift stimmen, keine zusätzlichen Tage, Speicherdialog ohne horizontalen Überlauf, Schließen nach asynchroner Aktion geprüft. [375px](../../../tests/safety/q1_09b/results/browser-review2/viewport-375.png), [820px](../../../tests/safety/q1_09b/results/browser-review2/viewport-820.png), [1280px](../../../tests/safety/q1_09b/results/browser-review2/viewport-1280.png). Screenshots zusätzlich visuell gelesen: Text/Schaltflächen erreichbar; auf kleinem Bildschirm vertikales Scrollen notwendig.

## Offline genau eingrenzen

Bereits geladene HTTP-Seite bei abgeschaltetem Netz: lokale Spende/Speicherung und echter Dateiexport bestehen. Anschließendes Neuladen scheitert erwartbar in dieser nicht gecachten Testauslieferung mit `ERR_INTERNET_DISCONNECTED`. Das ist **kein Nachweis eines Offline-Kaltstarts** und keine neue Offline-Lösung.

Direkte `file://`-Navigation zur echten HTML-Datei scheitert hier an **`ERR_BLOCKED_BY_ADMINISTRATOR`**. Der Fall ist BLOCKIERT, nicht bestanden. Keine Umgehung der Richtlinie und keine wiederholten URL-/Downloadversuche. iOS-Datei-/Dokumentenansichten können außerdem von sicheren Browserkontexten abweichen; ohne Web Locks gibt es absichtlich keinen ungesicherten Schreibfallback.

## Was nicht abgenommen ist

WebKit/Safari, reale iPhones/iPads, Safari-Dateiimport/-download, OS-Speicherdruck, Prozess-/Stromausfall während physischer Speicherung, iOS-Hintergrundbeendigung, längere Offline-Neustarts und unterschiedliche echte Geräteadressen. Touch-Emulation im Chromium beweist keines davon.

Der erste neue Testlauf hatte Treiberfehler: neu erzeugte Fixture-IDs waren zeitabhängig, und Dialogschließen wurde noch nicht abgewartet. Die Aussagen wurden nicht abgeschwächt; Erwartungsdatei festgehalten und Aktion abgewartet. Fehlprotokolle bleiben erhalten. Nur betroffene Gruppen nachgeprüft. Die frühere automatische PASS-Zeile für den Datei-URL-Fall bedeutet im Rohdatensatz ausdrücklich BLOCKED_NOT_TESTED; die abschließende Matrix zählt ihn **nicht** als Erfolg.

## Kurzer manueller Plan: PC, iPhone, iPad

Nur exportierte Testkopien verwenden, niemals die einzige Originalpartie. Versions-/Browserstand, Datum, Adresse/Dateikontext und Ergebnis notieren.

1. PC-Chromium und iPhone-/iPad-Safari jeweils separat öffnen. Vor Aktionen Originalexport sichern. Ohne Web Locks muss eine verständliche Schreibverweigerung erscheinen; vorhandene Daten müssen exportierbar bleiben, soweit Speicher lesbar ist.
2. Alte V13-Kopie mit Bargeld, Kredit, Waren/Herkunft, Ratsherr-/Bürgermeister-/Eldermann-Titel und laufendem Vertrag importieren. Beträge, Titel, Amt, Urkunden, bestätigte Stationen und ursprüngliche Frist mit der Datei vergleichen. Kanonischen Stand und Original herunterladen; nach Neuladen erneut vergleichen.
3. Dieselbe Partie in zwei Tabs öffnen. Aus einem Tab50 Gold spenden, dann im alten Tab eine Aktion versuchen: genau ein erfolgreicher Vorgang; Konflikthinweis/Neuladen statt Überschreiben. Auch beide Auslöser möglichst gleichzeitig bestätigen. Wiederholung/Schließen eines Tabs darf keine doppelte Gutschrift erzeugen.
4. Personenanker einmal ausdrücklich bestätigen, fernes Schiff ansehen und dort politischen Besuch versuchen: Ablehnung ohne Geld-/Tages-/Urkundengewinn. Vom Personenhafen wirklich reisen; Ankunft erst nach erfolgreicher Speicherung. Unbegleitete Fernreise bleibt abgewiesen.
5. iPhone/iPad: Hoch-/Querformat, Zoom, vertikal scrollen, Touch-Ziele, Schließen, Dateiauswahl, Download in Dateien-App und erneuter Import. Nach Hintergrundwechsel/Browserbeendigung gespeicherte Beträge prüfen.
6. Geladene Seite im Flugmodus: Aktion/Export prüfen. Danach Datei bzw. Adresse tatsächlich neu öffnen. Schreibbarkeit, Web Locks und gespeicherte Daten getrennt erfassen; Fehlschlag ausdrücklich als offenen Offline-Kaltstart vermerken. Kein stilles Zurücksetzen.

**Chromium gezielt geprüft; vollständige Browser-/Gerätefreigabe weiterhin offen.**
