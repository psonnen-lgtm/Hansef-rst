# Q1.09e – Deploymentstatus und Zugang

30.10.2026 · Europe/Berlin · Branch `deploy/q1-09e-netlify-test`.
Basis Q1.09d `ebad74f02307d596cdaa4f05b02142626d9041d9`, Sicherheitsabschluss Q1.09c `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`.
Tatsächlich zuvor getesteter und hier unveränderter Spielcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Anzeige 0.8d.1b, V13/Politik2/Sicherheit3.

## Status: Bereitstellung vorbereitet – Anmeldung erforderlich

Die separate öffentliche kostenlose Netlify-Testsite ist **ausdrücklich freigegeben**. Es wird keine erneute Freigabe angefordert. Eine tatsächliche Veröffentlichung war in dieser Umgebung nicht möglich:

- Keine Netlify-App-Verbindung unter den verfügbaren Werkzeugen.
- `netlify` nicht installiert; keine Anmeldung in den üblichen lokalen Netlify-Konfigurationen, keine gesetzte `NETLIFY_AUTH_TOKEN`-/`NETLIFY_ACCESS_TOKEN`-Variable. Ausschließlich Vorhandensein geprüft, keine Zugangswerte gelesen oder protokolliert. [Zugangsbeleg](../../../deployment/q1_09e/evidence/access-check.json).
- Frische Nur-Lese-Aufrufe von `https://api.netlify.com/api/v1/`, `https://app.netlify.com/` und offizieller Deployment-Dokumentation scheitern alle mit **`Tunnel connection failed: 403 Forbidden`**. Das ist die beobachtete Netzwerk-/Proxyblockade, kein nachgewiesener Netlify-Tarif- oder Dateigrößenfehler. [Netzwerkbeleg](../../../deployment/q1_09e/evidence/network-check.json).

Keine Anmeldeumgehung, kein anonymer Fremdaccount, keine CLI-Installation ins Blaue, keine Ersatzplattform, keine Site angelegt oder überschrieben. Keine Passwörter/Tokens angefordert oder gesichert. Keine fiktive URL oder Deployment-ID: **beides nicht vorhanden**.

## Verbindliche Hostingvorprüfung

| Voraussetzung | Tatsächlicher Stand |
| --- | --- |
| Netlify-Free-Projekt/Team verfügbar und autorisiert | Nicht prüfbar ohne Kontozugang |
| Monatliches Freiguthaben ausreichend, keine kostenpflichtige Funktion | Nicht bestätigt; keine Tarifänderung/Bestellung vorgenommen |
| Automatische kostenpflichtige Guthabenaufladung deaktiviert | Nicht prüfbar; unverzichtbare Bedingung vor Deploy |
| Einzeldatei 46.389.124 Bytes veröffentlichbar/zuverlässig auslieferbar | Lokale Datei vollständig vorhanden und geprüft; Netlify-Grenze/CDN-Auslieferung nicht geprüft |
| Neue eigene HTTPS-`netlify.app`-Origin | Noch nicht angelegt; spätere reale URL muss anderen Host als `psonnen-lgtm.github.io` haben |
| Ohne externen Build-Service | Lokal fertig erzeugbares statisches Paket, kein Netlify-Build nötig; tatsächliche Sitekonfiguration noch nicht vorhanden |

Der Nutzer hat monatliches Netlify-Free-Guthaben benannt. Aktuelle konkrete Kontingente, Deploy-/Transferkosten und Limits wurden nicht erfunden. Wenn das Konto keinen sicher kostenlosen Betrieb ohne automatische Aufladung zulässt oder die Datei zu groß ist: abbrechen und Ursache melden, nicht bezahlen oder zu anderem Anbieter wechseln.

## Veröffentlichungsordner tatsächlich vorbereitet

[Lokaler Builder](../../../deployment/q1_09e/build-package.py) und [Nachweis](../../../deployment/q1_09e/evidence/package-manifest.json):

| Datei | Rolle |
| --- | --- |
| `index.html` | Deutlich „HANSEFÜRST – TESTVERSION Q1.09c“, keine automatische Weiterleitung/Spielstandübernahme |
| `Hansefuerst_0_4.html` | Vollständiger bytegleicher geprüfter Spielcode, 46.389.124 Bytes |
| `geraeteabnahme.html` | Kurzer Ablauf ohne Entwicklerwerkzeuge, offline lesbar solange Seite geladen ist |
| `Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip` | Unveränderte fünf künstliche V13-Datensätze samt Manifest/Kurzinfo |
| `geraete-ergebnisse.csv` | Unveränderte Q1.09d-Matrix,42 Zeilen „Nicht getestet“ |

Der tatsächlich ausgeführte Befehl war `python deployment/q1_09e/build-package.py --output build/q1_09e-netlify-test`. Er schreibt nur in ein neues Ziel. Ergebnis: `site/`, Upload-ZIP **35.006.557 Bytes** und Manifest außerhalb des Veröffentlichungsordners. Alle fünf ZIP-Mitglieder nach vollständigem Rücklesen bytegleich zu den Paketdateien. Acht relative Seitenlinks geprüft. Die Kompression ersetzt nicht die Einzeldateiprüfung. Keine Reports, `.git`, Nutzerbackups oder Bibliotheken im Upload. Große generierte Kopien bleiben lokal unter dem schon ignorierten `build/`, ohne unnötigen zweiten Spielcode im Repository.

Nur Begleitseiten hinzugefügt; keine Spiel-, Wirtschafts-, Speicher- oder Reiseänderung. Die Testkennzeichnung ist auf der vorgeschalteten Startseite sichtbar; im Spiel bleibt die alte Anzeige 0.8d.1b bewusst erhalten. Keine zusätzlichen Analyse-/Formular-/Iframe-/Importautomatismen in den Begleitseiten.

## Konkreter nächster Anmeldeschritt

1. Im eigenen Browser bei **<https://app.netlify.com/>** anmelden und kostenloses Team wählen. Billing/Usage prüfen: ausreichend Guthaben, keine automatische kostenpflichtige Aufladung, kein Upgrade. Einzeldateilimit für 46.389.124 Bytes bestätigen. Keine Zugangsdaten in den Chat kopieren.
2. Für einen späteren agentengeführten Deploy braucht die bereitstellende Umgebung eine autorisierte Netlify-Verbindung oder Netlify CLI mit **Browserautorisierung über `netlify login`**. In dieser Sitzung gibt es keine solche Verbindung; bloßes Anmelden auf einem anderen PC überträgt keine Rechte. Gleichzeitig muss die beobachtete Netzwerkblockade für Netlify-App/API behoben sein. Eine CLI-Anmeldung allein löst sie nicht.
3. Alternativ darf der Nutzer nach obiger Prüfung das vorhandene Paket über die **manuelle Bereitstellung einer neuen Site** hochladen. Nur neuen eigenen `netlify.app`-Host verwenden, keine bestehende Site/produktive Domain, kein Git-Autodeploy, keine Funktionen oder kostenpflichtigen Dienste. Kein eigener Buildserver nötig.
4. Erst den echten Site-/Deployment-Nachweis sichern, dann die vollständige ausgelieferte HTML nach Download/HTTP-Dekompression gegen obigen SHA256 prüfen. HTTPS und Hostname, vollständige Dateien, Browserstart, Speicher/Export/Import, beide Reisearten und Ortsprüfung testen. Nur dann den Zugang als funktionsfähig bezeichnen.

Die bisher dokumentierte produktive Pages-Origin `https://psonnen-lgtm.github.io` bleibt unangetastet. Ein anderer Pfad dort würde nicht isolieren. Bei einer neuen Netlify-Origin sind LocalStorage/IndexedDB durch den Browser getrennt; **eine solche tatsächliche Origin wurde hier noch nicht eingerichtet oder online geprüft**. Keine produktiven Dateien/Daten importieren. Unbekannte Partie am neuen Testhost → stoppen, nicht Browserdaten löschen. Testsite öffentlich, kein Passwortschutz versprochen. Anbieter erhält übliche Abrufdaten, keine automatische Spielstandübertragung.

## Online-Abnahme nicht durchgeführt

HTTPS, vollständige CDN-Auslieferung, fehlende Dateien, JavaScript-Start, UI-Neubeginn, native IndexedDB-Speicherung/Reload, Dateiexport/-import, persönliche/unbegleitete Fahrt und Verhinderung politischer Fernvorsprachen: **sämtlich am öffentlichen Testhost nicht getestet**, weil kein Deploy erfolgt ist. Keine neuen Chromium-Ergebnisse behauptet. Q1.09c-106 Prüfgruppen und Q1.09d-fünf VM-Datenfälle bleiben übernommene historische Referenz, keine Online-Abnahme.
