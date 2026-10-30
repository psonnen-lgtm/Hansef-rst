# Q1.09 – Noch notwendige Entscheidungen und Abnahmeblockaden

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


## O1 – Gemeinsame Sicherheitenbewertung einschließlich Bauaufträgen

**Noch offen, keine Aktivierung.** Der Auftrag bestimmt: „Wenn die sichere Behebung ohne eine fachliche Entscheidung über Kreditbewertung, Referenzkurse oder Sicherheiten nicht möglich ist, diese Teiländerung nicht eigenmächtig aktivieren.“ Diese Grenze gilt.

W1/W2 wurden konkret angefragt; ohne Antwort keine Genehmigung unterstellen. W1 braucht eine festgelegte Referenz je Stadt/Ware und eine gegen Materialbuchwertzyklen sichere Bauauftragsbewertung. W2 braucht klare Behandlung von Waren sowie bereits verbuchten Baumaterialien/Werftlohn. Nur Ladung/Lager zu ändern reicht nachgewiesen nicht. Auswirkungen auf Kredit, alte politische Schwellen und Hafenarbeit/Rettung müssen gemeinsam beurteilt werden. Historische Kosten und vorhandene Schuld nicht rückwirkend löschen/umrechnen.

## O2 – Unbegleitete Fernschiffsreisen

Persönliche Fahrten vom belegten Personenhafen sind abgesichert. Ferne eigene Schiffe darf man ansehen und wirtschaftlich verwalten. Ein Reisebefehl von dort wird vorerst sicher abgewiesen.

Entscheidung: diesen sicheren engen Umfang beibehalten oder ausdrücklich unbegleitete Schiffsbewegungen zulassen, bei denen nur Schiff/Zeit/Kosten fortschreiten und der Kaufmann zurückbleibt. Letzteres benötigt klare Kennzeichnung und eigene Tests. Keine automatische Delegation oder kostenlose persönliche Mitreise erfinden. Die Frage wurde angefragt; bisher keine zustimmende Antwort vorausgesetzt.

## O3 – Sehr knappe laufende Altfristen

Alte IDs, Bestätigungen und Fristen sind erhalten. Der einmalige Altanker darf eine noch fehlende persönliche Station nicht rückwirkend erfüllen. Dadurch könnten einzelne sehr knappe alte Fristen nicht mehr schaffbar sein.

Falls nötig: einmalige konkret ID-/Strecken-bezogene Schonung ausdrücklich entscheiden und kennzeichnen. Keine globale Fristverlängerung, kein Reset, keine neue Prämie. Bereits gültige Zeugnisse/Ämter/Titel bleiben geschützt. Keine Schonungsregel hier eigenmächtig aktiviert.

## O4 – Reale Browser-/Gerätefreigabe

**Technisch blockiert:** Browserbinärdateien fehlen, Download HTTP 403. Vor Integration echte Chromium/WebKit-/Safari-Prüfung, mindestens zwei reale Tabs, Storagefehler, tatsächlicher Dateidownload/-import, Touch/Tastatur und Offlinekontext prüfen. VM-API-Modelle sind kein Ersatz für diese Abnahme.

Aktuelle sichere Strategie ohne Web Locks: keine Mutation, lesbar/exportierbar soweit LocalStorage lesbar. Soll ein nicht unterstützter Dateikontext ebenfalls schreibend funktionieren, braucht es eine separat geprüfte echte lokale Transaktionsalternative; kein ungeschützter LocalStorage-Lockfallback und kein neuer Server.

## O5 – Bestehende Testtreiber integrieren

Die neuen Aktionsgrenzen sind asynchron. Relevante ältere synchrone Tests und reine Quellmirror-Includes sind nicht automatisch kompatibel. Vor breiter Integration diese Treiber kontrolliert anpassen, keine Assertions löschen und keine Promise als booleschen Erfolg zählen. Neue gezielte Regressionen und vorhandene historische Fixtures sind gesichert; das ist keine vollständige Neuabnahme aller früheren Testskripte.

## Vorbehalten, keine erneute Grundsatzentscheidung

Die spätere Trennung von Handels-/Ankunfts-/Spendenruf und Politik ist bereits beschlossen, wird in Q1.09 aber nicht isoliert aktiviert. Neue Gilde, Ratsherrkarriere, Spielszenen, Modell C und Gebühren gehören nicht in diesen Auftrag. Ein zukünftiger Q1.10 muss alte Erfolge und vollständige Erreichbarkeit unter neuen Regeln gemeinsam behandeln. Hier keine automatische Umsetzung oder Folgeaufgabe.

## Gesamtstatus

Speicher-/Personenschutz: implementiert und gezielt VM getestet; Browserabnahme offen. Q-001: offen und nachweislich nicht vollständig behoben. Vollständige Freigabe/Integration daher noch nicht erreicht. Branch/Code/Belege werden gesichert und vollständig von GitHub zurückgelesen. Kein Merge nach main oder Entwicklung.


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
