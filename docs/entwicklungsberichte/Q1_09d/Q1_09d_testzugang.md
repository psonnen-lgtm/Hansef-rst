# Q1.09d – Isolierter Testzugang (Einrichtungsplan, nicht veröffentlicht)

30.10.2026 · Europe/Berlin · Arbeitsbranch `test/q1-09d-ios-acceptance-preparation`.
Basis Q1.09c: `be3f367ac1374cf6ca3525e34be44d51f0eaf24b`.
Unveränderter, zuvor getesteter Spielcode: `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`, SHA256 `50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`, V13 / Politik2 / Sicherheit3 (Spielanzeige weiterhin 0.8d.1b).

## Empfehlung und Freigabegrenze

Eine **neue, eigenständige statische HTTPS-Site bei Netlify, manuell hochgeladen**, ist der bevorzugte Einrichtungsweg. Dafür genügt ein vom Nutzer verwaltetes Konto; keine GitHub-App, kein Zugriff auf das vollständige Repository, kein eigener Server und keine Spielstands-Synchronisierung. **Noch keine Site angelegt, keine Adresse reserviert und nichts hochgeladen.** Die lokale [Startseitenvorlage](../../../tests/safety/q1_09d/site/index.html) veröffentlicht sich nicht selbst.

Geplantes Adressschema, ausdrücklich kein funktionierender Link: `https://<neuer-eindeutiger-sitename>.netlify.app/`; Spiel unter `/Hansefuerst_0_4.html`. Der tatsächlich zugewiesene Hostname muss vor der Freigabe konkret genannt werden. Keine vorhandene Site, Domain, produktive URL oder deren Einstellungen verwenden. Ein erneutes Deployment derselben Test-Site muss den Hostnamen behalten, sonst entsteht wiederum ein anderer Speicherbereich.

**Kosten/Berechtigungen:** Nur einen im Besitzerkonto tatsächlich kostenlos angebotenen statischen Tarif mit Kostenobergrenze verwenden; keine Zahlungsdaten, kostenpflichtigen Zusätze oder automatischen Upgrades für diesen Auftrag. Konto darf neue Test-Site erstellen und Dateien hochladen, braucht aber keinerlei Repository-Schreibrechte. Der reguläre Free-Tarif ist eine Option, keine hier verifizierte Preiszusage. Aktuelle Tarifgrenzen, Veröffentlichungskosten und Kontingentfolgen vor Freigabe im Konto bestätigen; falls kein sicher kostenloser Weg angeboten wird, nicht veröffentlichen.

Die Spiel-HTML ist **46.389.124 Bytes (44,24 MiB)** groß. Vor dem Upload ausdrücklich das aktuelle Einzeldatei-/Deploy-Limit prüfen; keine blinde Annahme, jeder statische Gratisanbieter könne sie ausliefern. Anbieter-Dokumentation war hier am 30.10.2026 durch `Tunnel connection failed: 403 Forbidden` nicht lesbar. [Abrufbeleg](../../../tests/safety/q1_09d/results/reference-access.json). Bei unzulässiger Dateigröße nicht eigenmächtig Grafik-/Spielcode zerlegen.

## Schutz durch eine andere Origin

Origin bedeutet **Protokoll + Hostname + Port**. Die bisher dokumentierte Spieladresse `https://psonnen-lgtm.github.io/Hansef-rst/` hätte die Origin `https://psonnen-lgtm.github.io`. Die aktuelle Pages-Konfiguration/Erreichbarkeit wurde in diesem Auftrag nicht verändert und nicht neu abgenommen.

| Variante | Speichertrennung zur bisherigen Pages-Origin | Bewertung |
| --- | --- | --- |
| Anderer Pfad, anderer Branch oder anderes Repository desselben Pages-Besitzers unter `psonnen-lgtm.github.io` | Nein | Nicht verwenden; kann dieselben LocalStorage-/IndexedDB-Schlüssel sehen |
| Neuer, bisher unbenutzter Host `<sitename>.netlify.app` | Ja, bei direktem Aufruf als eigene Top-Level-Seite | Empfohlen, vorbehaltlich Tarif-/Dateigrößenprüfung und ausdrücklicher Veröffentlichungserlaubnis |
| Pages unter **neuem separaten GitHub-Besitzer/Organisation** | Ja, eigener `<anderer-besitzer>.github.io`-Host | Alternative mit öffentlichem Test-Repository; zusätzliche Konto-/Organisationsverwaltung nötig |
| HTTP über eine LAN-IP vom PC | Anderer Speicher, aber normalerweise kein sicherer Kontext | Für die verpflichtenden Web Locks ungeeignet; kein Ersatz für HTTPS |
| GitHub-Dateivorschau, Raw-Link oder lokale HTML-/Dateien-App-Vorschau | Kein zugesagter ausführbarer sicherer Spielkontext | Nur zum Herunterladen, nicht als Safari-Abnahmezugang |

Ein neues Repository im bisherigen GitHub-Konto reicht also ausdrücklich nicht. Alternativ kann ein neu angelegter kostenloser GitHub-Organisationsaccount ein eigenes öffentliches Pages-Testrepository erhalten; nur dessen eigener Host, keine Umstellung von `Hansef-rst`/dessen Pages. Auch diese Veröffentlichung braucht separate Freigabe und Prüfung der dann geltenden Pages-Limits.

Die neue Site wird ohne iframe-Einbettung und ohne Import-/Weiterleitungsautomatismen aufgerufen. Ihre Spielschlüssel dürfen gleich heißen: Browser isolieren sie nach Origin. Es gibt keinen Code zum Lesen der produktiven Adresse. **Nur die fünf künstlichen Dateien importieren.** Sollte die neue Adresse schon eine unbekannte Partie zeigen: abbrechen, URL melden, nichts löschen oder importieren. Normaler und privater Safari-Modus sowie andere Browser/Geräte sind getrennte Kontexte.

„Geschützt“ heißt hier Schutz der produktiven Version und ihrer Daten durch Isolation. Eine Free-Site ist **nicht automatisch passwortgeschützt**. Unbekannte Adresse und `noindex` sind kein Zugriffsschutz. Die Site wäre als öffentlich abrufbar zu behandeln. Der Anbieter erhält übliche Abrufdaten wie IP, Browser und Zeitpunkt. Spielstände bleiben lokal; keine echten Spielstände, Exporte oder ausgefüllten Rückmeldungen hochladen.

## Konkreter Ablauf nach gesonderter Freigabe

1. Nutzer bekommt den konkreten neuen Hostnamen, gewählten Tarif, Dateigrößenlimit und öffentlichen Zugriff zur Entscheidung. Ohne ausdrückliche Erlaubnis endet die Arbeit beim vorliegenden Plan. Für die aktuelle Vorbereitung ist keine Website-Freigabe nötig.
2. In einem frischen lokalen Upload-Ordner ausschließlich diese Dateien zusammenstellen: unveränderte `Hansefuerst_0_4.html`; [Startseite](../../../tests/safety/q1_09d/site/index.html) als `index.html`; [synthetisches ZIP](../../../tests/safety/q1_09d/Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip) unter gleichem Namen; [Matrix](../../../tests/safety/q1_09d/geraete-ergebnisse.csv) als `geraete-ergebnisse.csv`. Keine `.git`, alten Spielstände, Ergebnisordner oder Nutzerbackups hochladen. Spieldatei vor Upload gegen obigen SHA256 prüfen.
3. Nur manuelles statisches Deployment in die **neue** Site. Keine Git-Integration, Build-Befehle, Funktionen, Datenbank, Analytics-Zusätze, Service Worker oder automatischen Deployments. Keine kostenpflichtigen Funktionen aktivieren. Neue Origin darf nicht zur produktiven Site weiterleiten oder sie einbetten.
4. Rücklesen der gesamten ausgelieferten HTML und Hashvergleich, korrektes HTML/UTF-8 und gültiges HTTPS prüfen. Neue Origin exakt mit der produktiven vergleichen; statische Downloads prüfen. Erst dann die Adresse ausdrücklich als startbereit melden. Dies ist hier noch **nicht durchgeführt**.
5. Erster Gerätestart ausschließlich ohne echte Daten. Vor dem ersten Altstandimport dessen unveränderte synthetische JSON-Kopie extern in Dateien aufbewahren; nach Übernahme „Original der Erstübernahme exportieren“ herunterladen und gegen Originaldatei prüfen. Bei unklarem Inhalt/fehlendem Backup nicht weiter migrieren.
6. [Geräteanleitung](Q1_09d_geraeteanleitung.md) nacheinander auf iPhone und iPad ausführen; Ergebnisse getrennt erfassen. Kein Löschen/Zurücksetzen produktiver oder testbezogener Browserdaten erforderlich.

## Safari, Speicher und Offline

Web Locks benötigen einen sicheren unterstützten Kontext, IndexedDB muss verfügbar sein; beides ist im tatsächlichen Safari-Modus zu erproben. „Safari unterstützt API X“ ersetzt keine Geräteprüfung. Keine Lock-Emulation und kein unsicherer Schreibfallback hinzufügen. Der aktuelle Code zeigt bei fehlender Unterstützung eine Warnung und verweigert Änderungen. Falls bereits lesbare Daten existieren, Export soweit möglich erhalten. Bei gesperrtem Speicher abbrechen, nicht die Browserdaten löschen oder Sicherheitsfunktionen abschalten.

Privates Safari separat beobachten, nicht als dauerhaften Speicher empfehlen. Daten können nach Schließen aller privaten Tabs entfallen. Normales Safari kann ebenfalls Daten durch Gerätespeicherknappheit/Browsereinstellungen verlieren; externe Testexporte aufbewahren. App-Wechsel, Tab schließen und vollständiges Beenden von Safari sind verschiedene Prüfungen.

**Kein zugesicherter Offline-Kaltstart:** Die HTML enthält keinen Service Worker und kein Offline-Paket. Eine schon geladene Seite kann lokal weiterarbeiten, während ein Offline-Neustart von HTTP-/Browsercache und Lebenszyklus abhängt. Q1.09c bestand nur Offline-Nutzung/Export einer geladenen Seite; Kaltstart der damaligen `no-store`-Testadresse scheiterte. Auch ein einmal erfolgreicher Cache-Neustart ist keine dauerhafte Offline-Garantie. Lokale HTML-Datei ist ein dritter, nicht abgenommener Weg; keine iOS-Dateivorschau als gleichwertig erklären. Keine neue Offline-Architektur im Auftrag.

Quellen zum späteren Gegenprüfen (hier HTTP403, Inhalte nicht als aktuell verifiziert behauptet): [Netlify manuelle Deployments](https://docs.netlify.com/deploy/create-deploys/), [Tarife](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), [MDN Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).
