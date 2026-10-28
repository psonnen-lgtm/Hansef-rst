# R1.10 – Gesicherter Unterbrechungsstand bei Wiederaufnahme

28.10.2026. Eigener Forschungsbranch `research/r1-10-events-shipping`, Basis `7abf2eac15724d35839ca832fec6c0da9b7e1535`. Diese Bestandsaufnahme beschreibt ausschließlich den Zustand vor neuen Untersuchungen der Fortsetzung; spätere Ergebnisse stehen in separaten Dateien.

## Veröffentlicht und lokal getrennt

Remote-Branches per `git ls-remote origin 'refs/heads/research/*' refs/heads/development/v04-foundation` geprüft: Forschungszweige R1.05 bis R1.09 vorhanden, kein R1.10-Zweig/Commit vor Wiederaufnahme. Letzter Forschungscommit R1.09 `7abf2eac15724d35839ca832fec6c0da9b7e1535`. Entwicklungsbranch unverändert `02ee6b8fc1507ad078b6b596c333e50d91eeea64`.

Lokal R1.10: elf Dateien – SDL-Eingabe-/Bildhelperquelle und Kompilat, Steuerungsskript, Eingabedatei/-protokoll, Kopien des ersten Versuchs, aktuelles Bildschirmabbild sowie drei private Wappen-/Kartenausschnitte einschließlich abgewiesener Zuordnung. Kein R1.10-Bericht, keine CSV-/JSON-Messreihe, kein R1.10-Spielstand. Keine weitere R1.10-Reise durch die erhaltenen Daten belegt.

**Belegbarer Stand: 0 neue abgeschlossene Reisen, 0 neue Reisetage, keine neue Ereignismessung.** Das ist keine Nullereignis-Stichprobe: Es gab noch keine auswertbare Reise. R1.05–R1.09-Reisen werden nicht erneut gezählt.

Der unterbrochene Lauf hatte DOSBox gestartet, R109BASE im Ladebuch ausgewählt und eine Wappenabfrage erreicht. Zuordnung „Nimwegen“ beim Adlerwappen wurde abgewiesen. Danach wurde der Emulator regulär neu gestartet; er stand beim Wiederaufnehmen im Hauptmenü. Keine erfolgreiche R1.10-Ladung oder Spielweltbedienung aus diesen Altdateien nachgewiesen. Keine Patch-/Schutzumgehung. Die genaue Ursache des Nutzungslimits selbst wird nicht aus Dateizeitstempeln abgeleitet.

Alle elf Dateien vor Weiterarbeit unverändert privat kopiert und als separates privates Archiv gesichert. [Inventar mit SHA-256](R1_10_bestand_bei_wiederaufnahme.json) enthält nur Metadaten, keine Originalgrafiken oder Programmteile. Vorhandene Originalspielstände SPIEL, R108PRE/RET und R109BASE/BASD liegen noch lokal vor; Prüfsummen im Inventar. Ob sie im fortgesetzten Lauf geladen werden können, ist zu diesem Sicherungszeitpunkt **noch ungeprüft**. Die früher bestätigte Ladefähigkeit wird nicht als neuer Test ausgegeben.

## Bereits begonnene Code-/Quellenprüfung

**Im Hansefürst-Code bestätigt:** Erneuter Remote-Blobabgleich der tatsächlichen Hauptdatei `Hansefuerst_0_4.html` ergibt `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8`, passend zur vorhandenen byteidentischen R1.08-Kopie am Codecommit `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Die große Remote-Datei liefert leeren Textinhalt bei vorhandenem Blob; deshalb vorhandene Kopie statisch gelesen. Kein Produktstart/Simulationstest.

Vorläufiger enger Befund: `planTravel` bereitet Zeit und Gebühren vor und würfelt kein Ereignis. `arrive` prüft `pending.arrived` und `pending.resolved`, bevor `rollTravel` aufgerufen wird. Das schützt im laufenden Ablauf vor Ereigniswürfeln allein durch Öffnen der Vorbereitung und vor mehrfacher Ankunft derselben vorbereiteten Reise. `save`/`exportGame` serialisieren `s`, während `pending` getrennt ist; `importGame` setzt `pending=null`. **Ein dauerhafter Schutz gegen Wiederherstellen eines alten Exports ist damit nicht nachgewiesen.** Keine weitergehende Schutzgarantie aufgrund früherer Beschreibungen.

Codebelege: [Vorbereitung/Ankunft1019–1026](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1019), [save782](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L782), [Export/Import1029–1030](https://github.com/psonnen-lgtm/Hansef-rst/blob/02ee6b8fc1507ad078b6b596c333e50d91eeea64/Hansefuerst_0_4.html#L1029). Laufzeitauswirkungen und konkrete Exploitversuche **noch ungeprüft**.

## Weiteres Vorgehen innerhalb R1.10

Nach Sicherung dieses Stands reguläre Ladung prüfen, separaten Ausgangssave schreiben/laden, danach höchstens fünf weitere Reisen in einer ersten Etappe. Keine bisherigen Ergebnisse erneut simulieren. Bei Blocker keine neuen Messwerte behaupten. Originalquellen, Screenshots und Saves bleiben privat. Keine Änderungen an Spielcode, produktiven Saves, Pages oder Entwicklungsbranch; keine Hansefürst-Simulation, kein Merge und keine PhaseR1.11.
