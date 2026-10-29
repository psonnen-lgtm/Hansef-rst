# Q1.01 – Technische Bestandsaufnahme, Sicherungspunkt A

29.10.2026, Europe/Berlin. Lesendes Audit, keine Änderungen am Produkt, Originalspiel oder an Nutzerständen. Auditbranch `audit/q1-01-quality` von **`ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7`** erstellt: R1.11-Abschluss mit der aktuell bestätigten Entwicklungsfassung als Vorfahr. Dadurch bleiben Forschungsquellen im Auditbranch erreichbar. Kein Merge in Entwicklungs-/Hauptbranch.

## Tatsächlich aktueller Stand

Alle **54** vor Auditerstellung sichtbaren Remotezweige per GitHub-Branches-API abgefragt, [vollständige Köpfe und Produkt-Blobs](Q1_01_zweige.csv). Commitdatum allein definiert keine neuere Produktfassung. Relevante Zuordnung:

| Zweck | Branch / fester Commit | Einordnung |
|---|---|---|
| Aktuelle Entwicklungsbasis | development/v04-foundation / `02ee6b8fc1507ad078b6b596c333e50d91eeea64` | Remote am Audittag erneut bestätigt; nicht bloß aus R1.11 übernommen |
| Letzter Produktfeaturezweig | feature/phase08d1b-trade-letters / `49367bd9c2247c4340cb41e8b96d68fd8734fa2a` | Gleicher Hauptdatei-Blob |
| Neuere Reiseanalyse | analysis/p14-voyage-times / `175c09f828084f9989888a2bccd01dadaa4dbadc` | Divergiert 5 Commits voraus/2 zurück zur Entwicklungsbasis; zusätzliche Analysen, Modelle und Berichte, keine Änderung der Hauptdatei; nicht integriert |
| Letzte Forschung | research/r1-11-politics-society / `ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7` | Berichte/Katalog; keine neuen Produktfunktionen |
| Hauptbranch | main / `c1280228951d581c7b3131279b8ff164a8e36dfa` | Älterer Upload mit Hansefuerst_0_3.html; keine aktuelle 0.4-Hauptdatei |

Geprüfte Hauptdatei: **Hansefuerst_0_4.html, 0.8d.1b, Speicher V13**. Git-Blob **`7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`**; SHA-256 **`c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`**. Datei statisch vollständig verfügbar; eingebettete Grafikzeilen in lesenden Arbeitsauszügen ausgelassen, Originaldatei nicht geändert. Gleicher Blob in Entwicklungs-, P1.4- und R1.11-Zweig. Letzter produktiver HTML-Änderungscommit laut Historie `c42c25cf5cf372c210b47f25b00b9f0106044ed3`; Berichts-/Mergecommit nicht mit Codeänderung verwechseln.

GitHub Actions zeigt als jüngsten Lauf eine erfolgreiche Pages-Bereitstellung von `02ee6b8…`; dies beweist Deployment, keine bestandenen Spiel-/Wirtschaftstests. Keine Pages-Einstellung geändert und keine Aussage über alle Browsercaches. Lokale alte Arbeitskopie enthält uncommittete historische Forschung; sie wird nicht als Veröffentlichungspaket verwendet. Eigene Auditkopie und explizite Dateiliste verhindern deren unbeabsichtigte Übernahme.

## Tatsächlich implementiert – statischer Nachweis

Alle folgenden Zeilen beziehen sich auf [feste Entwicklungsdatei](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html).

| Bereich | Vorhanden | Zeilen / Funktionen |
|---|---|---|
| Städte/Waren | 11 Städte, 11 Waren einschließlich Hansegras, Hanf/Pech/Eisenwaren/Pelze; stabile Indizes | 78–108, CITIES/GOODS/initialMarkets |
| Wirtschaft | Regionale Bestandsflüsse und tägliche Preise, reale Käufe/Verkäufe, Schiff/Lager und Kostenaufzeichnungen | 792–874, 903–905; regionalMarketDay/trade |
| Finanzen | Bankguthaben, Schulden, zeitanteilige Zinsen, Gebühren, Mietrückstände, begrenzte Hafenarbeit | 148–188, 874, 912–962 |
| Schiffe | Schnigge/Kogge/Holk, Zustand/Waffen, örtliche Flotten/Konvois, Materialbau und Verkauf | 101–104, 190–246, 915–1026 |
| Ereignisse | Ein Reiseereigniszweig je Fahrt: Piratenversuch, Sturm, Begegnung/Ruhe; normale Markt-/Gerüchteabläufe | 1020–1026 |
| Politik | Fünf Ränge, lokale Dienste/Zusagen, deterministische Wahlprüfung, Amt/Bewährung, Siegel/Hansevertrag | 347–607, 988 |
| Informationen | Öffentliche Ortskunde, datierte begrenzte Berichte, Kontorarchiv, Handelsbriefe; Badehausgerüchte | 610–779, 842–855, 906–910 |
| Oberfläche | Stadtbilder und CityLife-Einbindung, Hotspots, Seekarte, Schiffsbuch, Handelsmenüs, Ratstafel | 878–911, 980–984, 1100 ff.; zusätzlich assets/cities |
| Sicherung | Lokal pro Browser/Adresse, Export/Import, Validierung, Originalbackups und versionierte Migration | 749–755, 782–783, 1028–1030, 1267 |

Kommentare wie „current play remains five cities“ oder „no production/consumption rules“ sind überholte Vorbereitungsreste: tatsächliche Zuweisung CITIES=EXPANSION_CITIES und regionalMarketDay sind maßgeblich. Nicht aus Kommentaren eine Fünf-Städte-Fassung ableiten.

## Geplant / nicht integriert

Roadmap-Issue [#7](https://github.com/psonnen-lgtm/Hansef-rst/issues/7): 15 Waren als Ausbauziel, aktuell nur 11. Wachs/Stockfisch/Wein/Gewürze nicht als implementiert ausgeben. P1/P1.1/P1.2/P1.3 enthalten isolierte Bevölkerungs-/Stimmen-/öffentliche-Versorgungsmodelle; auch nach Dokumentationsmerges keine produktive zweite Politikengine. B3/K500 und politische V14-Prototypen sind nicht freigegeben. P1.4 ist eine nicht integrierte Reiseanalyse. Aktive politische Gegner mit eigenen Mitteln, Besatzungsanwerbung, Original-Hochzeitssystem und allgemeiner persistenter Save-Rollback-Schutz sind im geprüften Ablauf nicht nachgewiesen. 90 aktive Stunden sind Produktziel, keine bestehende Messung.

## Tests: vorhanden ist nicht gleich ausgeführt oder aktuell gültig

Gitbaum der Auditbasis: **2.781 Pfade unter tests**, davon **162 CJS-Dateien und 493 JSON-Dateien**. Das sind Dateien, keine Testfall-/Erfolgszahlen. Schwerpunkt: Basis/Handel, Regionen/Lager/Migration, Schiffbau, Politik/Startwahl, Bedienung/Browser, Informationen, historische Simulationen sowie isolierte Analysemodelle.

| Historischer Nachweis | Aussage und Grenze |
|---|---|
| Phase 1.6c, summary.json / Abschlussbericht | 2.250 Fälle und identische Replays dokumentiert; alte Wirtschaft, kein aktueller V13-Gesamtnachweis |
| Phase 0.5e/h/h2/h3 | Strategie-/Regionalitätsdaten mit verschiedenen Wirtschaftsständen; Prototyp und später aktivierte Regeln getrennt auswerten |
| Phase 0.5i/i1/j und 0.6b/c | Miet-/Bau-/Politik-/Start- und Übernahmeprüfungen samt Rohdaten; datiert und codegebunden |
| Phase 0.8a/c2/c3/d1 | Begrenzte Browser-, Bedien- und Informationsprüfungen, keine pauschale Apple-Geräteabnahme |
| 0.8d.2a.3 | Prüfungen teilweise ausdrücklich fehlgeschlagen; keine allgemeine Schutzfreigabe für politischen V14-Prototyp |
| P1.3 | 11 vollständige begrenzte V13-Verläufe plus früher Abbruch; korrigiertes audit-final maßgeblich. Bestätigter alter neutraler Handelskreis mit zusätzlichem Ruf; kein neuer Q1.01-Test |
| P1.4 | Noch separat auszuwerten; Ergebnisse nicht automatisch als aktuelle Integration oder Realdauer ausgeben |

Quellen: [Berichtsindex der Basis](https://github.com/psonnen-lgtm/Hansef-rst/blob/ad5bfd97c42433ac5e3023b2e6ee8ed07c9ff6c7/docs/entwicklungsberichte/README.md), insbesondere `2026-10-27_P13_entscheidung.md` und `2026-10-27_0.8d2a3_entscheidung.md`. Tests werden in späteren Auditberichten nach ihren tatsächlichen Geltungsbereichen bewertet. **In Q1.01 bisher kein Spieltest, keine Simulation und keine historische Testserie erneut ausgeführt.**

## Spielstände und technische Qualität

V13; Information version2/Handelsbriefe version1, regionale Wirtschaft version1, Lager- und Politikdaten mit eigener Validierung. migrate führt ältere Formate über bestehende Stufen fort; unveränderte Originalkopien vor Übernahme, kein Cloud-Sync. Speicherwarnung und Exportweg vorhanden. Neue spezialisierte Aktionen verwenden teilweise Kandidatenkopie/Validierung/Commit; allgemeines save fängt Speicherfehler ab, behält aber den In-Memory-Zustand. Daher kein universeller atomarer Gesamttransaktions- oder Mehrtab-Schutz behauptet. Lokales Backup im selben Browser ist kein externes Backup.

Historische Übernahmeprüfungen sind begrenzte technische Belege; keine aktuellen echten Nutzerstände angefasst, keine Migration ausgeführt. Ältere Clients können V13-Exporte nicht öffnen. Ränge/Titel und existierende Leistungen sind bei späterer Regeländerung besonders zu schützen.

## Bekannte offene Risiken und nächste Etappen

Politische Anerkennung neutraler Handelskreise, Dominanz einfacher Routinen, begrenzter Ereignisschutz, hohe Wiederholungsanteile örtlicher Dienste und nicht validierte 90-Stunden-Zielzeit sind gezielt zu prüfen. Ein Fehler eines nicht integrierten Prototyps ist nicht automatisch ein Produktfehler. Noch kein neuer P0-Befund aus dieser Inventur; Prioritäten folgen beleggebunden.

Nächste Sicherungspunkte: B Wirtschaft/Schifffahrt; C Politik/Langzeitmotivation; D Bedienung/Originalvergleich; E Empfehlungen/Gesamtbericht. Alle Empfehlungen bleiben „Noch nicht freigegeben“.
