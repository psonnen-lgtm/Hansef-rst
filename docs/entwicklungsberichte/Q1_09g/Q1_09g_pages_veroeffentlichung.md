# Q1.09g – Pages-Vorprüfung und Veröffentlichungsblockade

31.10.2026 · Europe/Berlin · Dokumentationsbranch `docs/q1-09g-pages-preflight`.
Geprüfte Basis Q1.09f `aa2ef39bdc460dabd5f1c6a18830c447fd094803`; tatsächlich in Q1.09f getestete isolierte Kopie `393006ff89f5945a501e3df79c891907721682cb`. Originalspiel Q1.09c `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`. Q1.09g verändert keinen dieser Spielstände oder Spielcodes.

## Abbruch vor jeder Veröffentlichung

Die ergänzende Veröffentlichung ist ausdrücklich beauftragt. Sie scheitert nicht an einer fehlenden Zustimmung, sondern an der nicht zuverlässig feststellbaren aktiven Pages-Konfiguration. Gemäß Abschnitt 4 des Nutzerauftrags wurde **vor jedem Eingriff gestoppt**. Keine Quelle umgestellt, kein Deployment gestartet, kein Testordner nach `qa/q1-09f/` übertragen.

Frisch ausgeführt:

```sh
gh api repos/psonnen-lgtm/Hansef-rst/pages --jq '{status,html_url,build_type,source,public,https_enforced}'
```

Ergebnis, Exit 1: `Get "https://api.github.com/repos/psonnen-lgtm/Hansef-rst/pages": Forbidden`.

Zusätzlich drei unabhängige Nur-Lese-HTTPS-Anfragen mit Python `urllib.request`:

| Angefragte Adresse | Tatsächliches Ergebnis |
| --- | --- |
| `https://api.github.com/repos/psonnen-lgtm/Hansef-rst/pages` | `Tunnel connection failed: 403 Forbidden` |
| `https://psonnen-lgtm.github.io/Hansef-rst/` | `Tunnel connection failed: 403 Forbidden` |
| `https://psonnen-lgtm.github.io/Hansef-rst/qa/q1-09f/` | `Tunnel connection failed: 403 Forbidden` |

Das sind Zugriffs-/Proxyblockaden dieser Umgebung. Daraus folgt **weder**, dass Pages deaktiviert ist, **noch**, dass der Testpfad frei/belegt ist oder die Dateien zu groß wären. Kein 404-Befund und keine erfolgreiche Antwort des eigentlichen Live-Servers behauptet.

## Welche Informationen fehlen konkret?

| Voraussetzung des Auftrags | Nachgewiesener Stand |
| --- | --- |
| Tatsächlicher Veröffentlichungszweig/Ordner beziehungsweise Actions-Quelle | Unbekannt; nicht aus main oder Vorlagen geraten |
| Aktuelle Live-/Custom-Domain-Adresse | Vorgeschlagene Basis bekannt, tatsächliche aktive Konfiguration/Weiterleitungen nicht bestätigt |
| Gesamter produktiver Live-Dateibestand | Nicht abrufbar |
| Bestehende Startseite und Live-SHA256 | Nicht abrufbar, kein Hash erfunden |
| Testpfad noch unbenutzt | Nicht feststellbar |
| Bestehender Publikationsstand als Backup gesichert | Nicht möglich, solange Quelle/Live-Dateibestand unbekannt sind |
| Kostenloser bestehender Pages-Weg verwendbar | Kontokonfiguration nicht bestätigt; keine bezahlte Funktion aktiviert |

`git ls-remote --heads origin …` bestätigt main `c1280228951d581c7b3131279b8ff164a8e36dfa`, Entwicklung `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, Q1.09f `aa2ef39bdc460dabd5f1c6a18830c447fd094803`; kein `gh-pages`-Ref geliefert. Diese **bekannten Quellrefs sind keine bestätigte Sicherung des unbekannten Live-Deployments**. Kein irreführender Backup-Tag angelegt. Die laut Nutzer vorhandenen externen Testerbackups wurden nicht angefordert/geöffnet.

## Vier Quelldateien geprüft, nicht übernommen

Alle Dateien aus `deployment/q1_09f/site/` vollständig gegen den Git-Baum des Q1.09f-Abschlusses verglichen: bytegleich. Testkennzeichnung und lokale Links bestätigt.

| Datei | Bytes | SHA256 |
| --- | ---: | --- |
| `Hansefuerst_TEST_Q1_09f.html` | 46390644 | `8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682` |
| `Q1_09d_NUR_SYNTHETISCHE_TESTDATEN.zip` | 11019 | `9568fc76954bd5decbc2b26a95180b509da72fd0a85d1856ee6292f4a959f8fb` |
| `geraete-ergebnisse.csv` | 6769 | `8022155d0e72ee6d7507f7c45ffdda9ddafbecc57ec652c27c950c12aa4951fa` |
| `index.html` | 3555 | `4f21e200787989fe7d903ac2590729119718d515ae68f2d103495a721e356847` |

Die 46.390.644 Bytes liegen lokal vollständig vor; keine öffentliche Auslieferung daraus ableiten. Root-Spiel-HTML bleibt mit SHA256 `50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048` unverändert.

Zur Auflösung der Blockade braucht es Zugang zu **Settings → Pages → Build and deployment** mit Source, Branch/Folder beziehungsweise bestehendem Actions-Weg, tatsächlicher Site-Adresse sowie erreichbare Live-Dateien für Bestands-/Hashprüfung und Sicherung. Keine neue Veröffentlichungsfreigabe nötig; bei darüber hinaus nötigem Quellen-/Domainwechsel wäre die gesonderte Entscheidung laut Auftrag erforderlich. Keine Passwörter/Tokens anfordern oder teilen. Kein riskanter Ersatzweg, anderer Anbieter oder neuer Account.
