# Bereitstellung vorbereiten – nichts öffentlich aktiviert

Das Testpaket 0.8b enthält das unveränderte, geprüfte Spiel 0.8a/V11 mit separat geladenen Grafiken, Startseite und kurzen Testunterlagen. Keine Spielstands-/Preis-/Friständerung. Die vollständige HTML bleibt erhalten.

## Sofort lokal testen

ZIP `releases/hansefuerst-0.8b-testpaket.zip` vollständig entpacken. Mit vorhandenem Python 3.9 oder neuer im entpackten Ordner `python START_TEST.py` (oder `python3` / `py -3`) starten. Es öffnet sich `http://127.0.0.1:8000/`, nur auf diesem PC. Mit Strg+C beenden. Der Helfer liefert ausschließlich im Manifest freigegebene Paketdateien aus; keine Uploads und keine Verzeichnislisten. Persönliche Backups/ausgefüllte Antworten außerhalb des Paketordners halten.

Für iPhone/iPad im gleichen vertrauenswürdigen Heimnetz: eigene private IPv4 des PCs in dessen Netzwerkeinstellungen nachsehen und z.B. `python START_TEST.py --lan 192.168.178.20` ausführen. Dann `http://192.168.178.20:8000/` in Safari öffnen. Der Helfer akzeptiert nur private LAN-Adressen, nicht `0.0.0.0` oder öffentliche IPs. Keine Router-/Internetfreigabe einrichten. Der PC muss laufen; die lokale Firewall kann eine Freigabe für das private Netz verlangen. Im Zweifel im begleiteten Test einrichten. Es wird kein öffentlicher Hostingdienst eingerichtet.

Python 3.9 oder neuer ist nur für diesen optionalen lokalen Helfer nötig, nicht für das Spiel. Ohne vorhandenes Python erfordert dieser Startweg dessen lokale Installation oder die später freigegebene statische Bereitstellung. Keine neue Programmierung nötig. Direktes `file://` beziehungsweise iOS-Dateivorschau bleibt geräteabhängig und ist nicht abgenommen.

## GitHub Pages – nur nach ausdrücklicher Nutzerfreigabe

Das Repository ist bereits **öffentlich**. Die GitHub-Webseite nennt `https://psonnen-lgtm.github.io/Hansef-rst/`; diese laufende Adresse und Pages-Einstellungen konnten wegen `Forbidden` nicht geprüft werden. Sie ist hier **kein zugesagter neuer Testlink**. Standard-GitHub-Pages für dieses öffentliche Repository ist als öffentlich zugänglich zu behandeln, ohne Kennwortschutz. „Private Testrunde“ bedeutet dort nur eingeladene Zielgruppe, keine technische Zugriffsbeschränkung. `noindex` in den Hilfeseiten ist kein Zugriffsschutz. Die Veröffentlichung statischer Dateien bedeutet keine Cloud-Synchronisierung von Spielständen; der Webhost erhält jedoch normale Abrufe/IP-/Browserinformationen.

**Nichts aktivieren oder umstellen, bevor beides ausdrücklich geklärt ist:** öffentliche Erreichbarkeit erlaubt; bisherige Pages-Quelle/Inhalte geprüft und mögliche Ersetzung erlaubt. Eine Pages-Aktion ersetzt das veröffentlichte Site-Artefakt. Für bestehende Inhalte stattdessen den neuen Testordner kontrolliert ergänzen; nicht blind die Quelle umstellen.

Vorbereitet ist `github-pages.yml.example`, bewusst außerhalb `.github/workflows` und dadurch inaktiv. Kein Push-/PR-/Zeittrigger. Nach Freigabe sind ungefähr diese Schritte nötig:

1. Besitzer prüft **Settings → Pages** und vorhandene Inhalte. Falls öffentliches Ersetzen gewünscht und genehmigt, **GitHub Actions** als Quelle wählen; andernfalls den Ordner in der bestehenden statischen Bereitstellung ergänzen. Keine Repository-Sichtbarkeit ändern.
2. Nur nach dieser Freigabe die Vorlage als Workflow auf dem Standardzweig verfügbar machen. Dies erfolgt nicht automatisch; kein Merge in main/development durch Codex. Die Vorlage lädt nur die nötigen statischen Quellen, baut das ZIP und veröffentlicht ausschließlich den Webordner, keine Rohdaten/Backups.
3. Workflow manuell mit der vollständigen geprüften Commit-ID aus dem Bericht und den beiden bewussten Bestätigungen starten. Das läuft nur, wenn Repository-/Actions-/Pages-Berechtigungen vorhanden sind. Danach erst die tatsächliche ausgegebene Adresse auf echtem iPhone/iPad prüfen. Die Vorlage ist strukturell geprüft, aber mangels Veröffentlichung nicht auf GitHub ausgeführt.

GitHub Pages ist für öffentliche Repositories regulär kostenlos nutzbar. Keine kostenpflichtige Option und kein neues Konto wurden eingerichtet. Die aktuelle offizielle Dokumentseite konnte in dieser Cloud nicht geladen werden; Gebühren-/Kontingenthinweise beim späteren Aktivieren im Besitzerkonto prüfen und keine kostenpflichtige Option wählen. Referenz: <https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages>.

## Paket erneut bauen

`python tools/build-private-test.py --directory build/08b-review --zip build/08b-review.zip`

Neue Zielpfade verwenden, bestehende Ergebnisse werden nicht überschrieben. Der Builder prüft die alte Assetausgabe gegen die vollständige HTML, alle Bildbytes und das identische Spielskript/CSS. Er veröffentlicht nichts. Die Ausgangsdatei bleibt unverändert; Paketversion 0.8b und Spielkennung 0.8a sind ausdrücklich verschieden.
