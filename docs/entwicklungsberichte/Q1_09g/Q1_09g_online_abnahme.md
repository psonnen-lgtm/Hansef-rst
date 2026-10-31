# Q1.09g – Online-Abnahme: blockiert, nicht durchgeführt

31.10.2026 Europe/Berlin · Branch `docs/q1-09g-pages-preflight`.
Quellstand `aa2ef39bdc460dabd5f1c6a18830c447fd094803`; isolierter getesteter Spielcode `393006ff89f5945a501e3df79c891907721682cb`, SHA256 `8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`. V13/Politik2/Sicherheit3. Keine produktive Änderung und kein Deployment.

## Tatsächlich geprüft

- Aktuelle GitHub-Refs per `git ls-remote` gelesen, Q1.09f-Basis mit `git fetch --no-tags origin test/q1-09f-github-isolated` gesichert und Dokumentationsbranch darauf erstellt.
- Genau vier vorhandene Quelldateien vollständig per `git show aa2ef39…:<Dateipfad>` gelesen, lokale Bytes verglichen und SHA256 ermittelt: bestanden. Keine neue Spielkopie gebaut.
- Sichtbarer TEST-Hinweis in der Quelldatei/Startseite und relative Links der Startseite auf die drei vorhandenen Dateien statisch geprüft. Das ist keine Browserprüfung. Abschlusskontrolle zusätzlich: genau vier neue Berichte und ausschließlich ergänzter Index, acht gültige relative Berichtslinks, drei gültige lokale Startseitenlinks, Originalhash unverändert; Arbeitsbaum-/Staging-Prüfung mit `git diff --check` bestanden.
- Pages-API per GitHub CLI sowie API/Live-Basis/Testpfad per HTTPS angefragt: Forbidden beziehungsweise HTTP403-Proxyblockade. [Genaue Adressen und Ergebnisse](Q1_09g_pages_veroeffentlichung.md).

## Nicht durchgeführte Abnahme

| Prüfung | Status / Grund |
| --- | --- |
| HTTPS-Auslieferung vom tatsächlichen Pages-Server | Nicht getestet; Proxy blockiert Zugriff |
| Bestätigte erreichbare Testadresse | Nicht vorhanden; Veröffentlichung nicht vorgenommen |
| Abruf aller vier Dateien / Ressourcen | Nicht getestet online |
| Vollständige ausgelieferte HTML samt SHA256 | Nicht getestet online; nur Git-/lokale Quelldatei geprüft |
| Produktive Live-Startseite bytegleich / bestehende Dateien weiterhin abrufbar | Nicht prüfbar ohne Live-Zugriff und Ausgangshashes |
| Testspiel im Browser starten | Nicht durchgeführt |
| Automatische Speicherung / Wiederöffnung | Nicht durchgeführt online |
| Synthetischer V13-Import / TEST-Export | Nicht durchgeführt online |
| Persönliche und unbegleitete Reise / Ortsprüfung / keine Fernvorsprache | Nicht durchgeführt online |
| Echte iPhone-/iPad-/Safari-Prüfung | Nicht getestet |
| Offline-Nutzung / Offline-Kaltstart | Nicht getestet; Kaltstart nicht zugesichert |

Keine neuen Chromium-Prüfungen ausgeführt, weil kein bestätigter erreichbarer Pages-Testhost vorliegt. Kein fehlgeschlagener Download als Browser-Abnahme ausgegeben. Die 17 nativen Q1.09f-Gruppen mit 665 API-Prüfungen bleiben [vorheriger Nachweis](../Q1_09f/Q1_09f_testnachweise.md); sie wurden nicht wiederholt oder zu Online-Erfolgen umetikettiert. Keine Wirtschafts-/Karrieresimulationen.

## Bedingung für spätere Online-Abnahme

Erst nach zuverlässiger Ermittlung der bestehenden Publikationsquelle, Sicherung der vollständigen bisherigen Site und ergänzendem Upload der vier Dateien: echte HTTPS-Antworten, aufgelöste Origin/Weiterleitungen, vollständigen Testhash, produktive Ausgangshashes und Ressourcen vergleichen. Danach tatsächlichen Browser mit ausschließlich synthetischem Profil benutzen. Die vorbereiteten Namensräume sind programmgesteuert getrennt, aber dieselbe Origin teilt Berechtigung und Speicherquote. Keine echte Nutzerdatei und keine Browserdatenlöschung für diese Prüfung erforderlich.
