# P1.2 – isolierter V13-Adapter, nur Lübeck/Getreide

Basis22fe3c4d92c9dbac439f247ac294104d388b2f6a, Branch analysis/p12-public-grain.
Produktive HTML/V13 und bestehende Analysen bleiben unverändert. Der vorhandene
headless.cjs führt den tatsächlichen produktiven Handels-/Tagescode aus; weder
B3-Mengenpreise noch P1-Wahl-/Rivalenmodelle werden eingebunden.

Vorab festgelegte höchstens zwölf kurze Verläufe:
1. Unveränderter V13-Verkauf, unmittelbarer Rückweg, sieben tatsächliche Tage.
2–4. Gleicher Ausgang mit A/B/C, jeweils sieben tatsächliche Tage.
5. Unter-/Übermenge, gemeinsamer Bedarf, kein Nachfüllen gedeckter Notlage.
6–7. Neunmal10 bzw.90mal1 Fass, keine Spieltage dazwischen.
8. Zwei eigene Schiffe/Lager, gewichtete und unbekannte Kosten/FIFO.
9. Selbst erzeugte Knappheit, tatsächlicher Kauf/Rückverkauf.
10. Eigene Entnahme, Verkauf an Tag359, zwei echte Tage/folgender Rückkaufversuch.
11. Abbruch, ungültige Eingaben, Quote/Stale/Quota/Reentry, echter Lieferauftrag,
    vollständiger Analyseexport/Reload und Quellen-ID-Duplikate.
12. Exakte Wiederholung von A mit gleichem Seed, vollständig gleicher Endzustand.
Keine Gesamtserie wiederholen. Zusätzliche reine Betrags-/Grenz-/Preisproben erlaubt.
Bei Abbruch Befund sichern; weitere VM-Initialisierung nur innerhalb des Limits.

Öffentlicher Bedarf ist ausdrücklich kontrolliert konstruiert, nicht aus einer
vorgeblich vorhandenen echten Bürgerverbrauchsrechnung abgeleitet. Maximal eine
Bedarfs-ID/Verlauf,90 Fass,90 Tage als Testwerte; kein automatischer Notlagenzyklus.
B nutzt nur während des echten V13-Verkaufs einen freiwilligen Ausführungspreis,
stellt danach die unveränderte Marktpreisnotierung wieder her. C verwendet echte
FIFO-/Bestandshelfer ohne fake sale/Questprämie. Anerkennung nur als finaler Beleg,
keine Stimmen, keine Ränge/Amtsvergabe. Die vorhandenen V13-Ansehensereignisse von
normalen Verkäufen bleiben unverändert und sind nicht die neue Anerkennungswährung.

Atomarer Prototyp: validierte Spielkopie und Nebenbuch/RNG/Uhr in einer einzigen
Analysehülle, Speicherfehler und alte Revisionen ohne Teilübernahme. Backend nur
simulierter Speicher mit kontrollierten Fehlern/CAS, keine produktive Browserdatenbank.
Normale V13-Exporte enthalten diese Daten nicht; keine Migration behaupten.

Programme vor Ausführung committen. Vollständige Rohverläufe samt Start/Ende,
Belegen, Tageswerten, Fehlern und tatsächlichen Testcommit-IDs erhalten.
