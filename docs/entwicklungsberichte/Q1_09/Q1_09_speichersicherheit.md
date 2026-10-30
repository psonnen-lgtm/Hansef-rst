# Q1.09 – Teil B: gemeinsame Schreibgrenze

30.10.2026. Implementierungsstand vor gezielten Prüfungen, noch keine Abnahme.

Alle regulären Spielaktionen werden über `navigator.locks.request` exklusiv pro Origin serialisiert. Innerhalb der Sperre wird der geladene vollständige aktive Speicherinhalt gegen den erwarteten Stand geprüft. Der Vergleich ist kein eigenständiger CAS, sondern zusätzliche Stale-Erkennung unter Web Locks. Kandidatenkopie, gepufferte Spielereignisse und ein einzelner finaler validierter Spielstandwrite verhindern Zwischenstände. Bei Fehler vor Commit werden Zustand/Reisevorbereitung/Startentwurf zurückgenommen.

Aktiver Schlüssel `hansefuerst-v04-safety1`, bisheriger `hansefuerst-v04` bleibt lesbares Original. Wirtschaftliches V13 bleibt, Politikrevision2 enthält nur Sicherheitsrevision und qualifizierten Personenort; keine Karriere-/Gildenumstellung. Ein alter Client lehnt Politik2 ab und schreibt nicht in den neuen Schlüssel. Neue Original-/Import-/Vorersatzbackups sind nummeriert, bytegeprüft und werden nicht überschrieben.

Ohne Web Locks oder bei verweigertem Zugriff werden Änderungen sicher abgebrochen. Lesende Ansichten und Export bleiben möglich; kein unsicherer LocalStorage-Lock als Fallback. HTTPS/localhost und Browserfähigkeit erforderlich; Offline-Nutzung bei verfügbarem API ohne Serverkontakt möglich. file-URLs/ältere Safari-Versionen können nur lesbar bleiben. Keine Cloud oder Synchronisierung.

Top-Level-Aktionen sind nun asynchron; verschachtelte bestehende Spielschritte innerhalb einer Transaktion bleiben synchron. Historische Tests mit synchronen Bool-Erwartungen müssen über den gezielten neuen Harness awaiten; alte Ergebnisdateien werden nicht überschrieben. Browserabnahme derzeit durch fehlende Browser und geblockten Download eingeschränkt.

## Tatsächliche Teil-B-Prüfung

Zwölf gezielte native VM-Regressionen bestanden, Quellcommit im Resultat. Zwei erste Testanläufe scheiterten vor sachlicher Prüfung am zu kleinen Git-Quellpuffer bzw. einer unvollständigen synthetischen Lagerstruktur; ausschließlich Harness/Fixture korrigiert, Protokolle erhalten. Erfolgreich: vollständige alte V13-Kopie, keine Schreibänderung beim erneuten Laden, ein finaler Write, Quota-Rollback ohne Geisterereignisse, zwei VM-Kontexte mit gemeinsamer exklusiver Lock-API-Modellierung/stale-Abbruch, doppelte Bestätigung, Fail-closed ohne API, Backupfehler, vollständiger Export/Reload, neuere Revision abgewiesen sowie echte kleine Handels-/Bank-/Zins- und Briefaktionen. Dies sind keine echten Browser-Tabs.
