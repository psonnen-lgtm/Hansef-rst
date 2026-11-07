# Q1.10b – Offene Probleme und Freigabegrenzen

7. November 2026, Europe/Berlin · Hansefürst Q1.10b.

Branch: `feature/q1-10b-fleet-presence`. Basis: Q1.10a-Abschluss `ff92ce60d1c384a13313e37ba2b3954cf38e793b`.
Tatsächlich neu geprüfter Spielcode: **`ade1961b89dd5975b5a32b9c6f68383f6376c51e`**.
HTML SHA256: **`803b0c551b9c10d52b7f9c93ae9dc738d1da1288da594dfa351d0f8df1a02c80`**.
Die nominelle bisherige Releaseanzeige 0.8d.1b und das V13-Speicherformat bleiben bestehen; die Phase wird durch Branch und Commit eindeutig bestimmt.

## Nachgewiesen weiter offen

- Neutraler Handelskreis: drei Kreise ergeben im gezielten Test +1 globales Ansehen und +1/6 Ansehensanteil der politischen Unterstützung. Sicherheiten und Kreditrahmen unverändert. Q-001 bleibt offen; nicht durch die Ortsregel behoben.
- Die neue Regel erleichtert die Verwaltung stationierter Flotten und politische Bestätigungen in mehreren Städten. Das ist beabsichtigt. Langfristige Erträge, Insolvenzrisiko, Liquiditätsstillstand und Karrierezeit sind nicht neu simuliert; keine künstlichen Kosten zum Ausgleich eingeführt.

## Noch ungeprüft

- Native Safari-/WebKit-Abnahme auf tatsächlichem iPhone/iPad. Frühere Q1.09f-Gerätetests gelten ausschließlich für jene Testkopie. Manuell zu prüfen: neue Partie/zweite Partie/Fortsetzen, V13-Kopie importieren/exportieren, örtliche Gebäude ohne/mit Schiff, Reise ohne Personenwahl, anschließendes Laden, Mehrtabkonflikt, Hoch-/Querformat und Scroll-/Schließenbedienung. Nur extern gesicherte Kopien verwenden.
- Reale Geräte-Speicherknappheit, Browser-Eviction, private Modi, OS-Abbruch und Offline-Kaltstart. Native Transaktionsabbrüche und injizierte Quota-Fehler ersetzen diese Umgebungsprüfung nicht.
- Vollständige Wirtschafts-/Karriere-Langläufe und sämtliche denkbaren Exploitkombinationen. Die kontrollierten politischen Fälle sind einmalig; daraus folgt keine universelle Sicherheitsgarantie.

## Technische Grenzen des bestehenden Modells

Reisen werden synchron vollständig atomar gespeichert. Ein Hafen kann während der Abwicklung nicht durch ein reisendes Schiff autorisiert werden; ein separat persistierter Zustand „auf See“ existiert in V13 weiterhin nicht. Keine neue Hintergrundreise, Delegation oder KI eingeführt.

Historische persönliche Ortsfelder und Besuchs-/Schonungsnachweise bleiben als Kompatibilitätsdaten gespeichert. Keine neuen persönlichen Verankerungen/Schonungen. Bereits gewährte wirksame Fristen bleiben erhalten, keine rückwirkende Verkürzung oder automatische Vertragsanerkennung.

Q1.10a-Datenbankschema 2 bleibt bestehen. Alte Q1.09c-Clients sind kein parallel nutzbarer Schreibweg; vor Versions-/Gerätewechsel extern exportieren. Backups können Speicherplatz belegen; keine neue Bereinigung implementiert. Keine Cloud-Synchronisierung und kein Schutzversprechen bei manueller Datenmanipulation.

Ein eigenständiges funktionsfähiges Gildenhaus ist in dieser Basis nicht vorhanden. Kaufmannsgilde/Modell C und neue politische Szenen bleiben ausdrücklich außerhalb dieses Auftrags.

## Abschlussstatus

57 native Chromium-Gruppen bestanden. Statischer Umfangsvergleich, historische Dateien und GitHub-Rücklesen ergänzen die Abnahme; maßgebliche Belege im [Testbericht](Q1_10b_tests.md). Keine automatische Freigabe für Apple oder Langzeitbalance. Kein Merge, keine Pages-Veröffentlichung und kein Folgeauftrag.
