# P1.3 – begrenzter Versorgungs-/Marktvergleich

Isolierte Analyse, keine Produktivfreigabe. Basis `bfdc410059bdf935b110382a775410e30d1bef0e` vor Beginn frisch auf GitHub geprüft. Datum der tatsächlichen Arbeit: **28.10.2026 Europe/Berlin**; angeforderte Berichtsdateinamen behalten `2026-10-27`.

V13/0.8d.1b aus unveränderter HTML, letzter Spielcommit `c42c25cf5cf372c210b47f25b00b9f0106044ed3`, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Original-P1.2-Harness direkt weiterverwendet, gleicher Seed71201, kontrollierte Märkte20/30 Gold, vorhandene90 fremde Fass zu8 Gold. Keine Beschaffungsreise gespielt. Alle übrigen120 Märkte/Originalfunktionen und RNG verglichen. Kein B3/K500.

## Vor Ausführung festgelegte zwölf Verläufe

1. Regulärer Verkauf90, keine öffentliche Abnahme.
2.–4. Dieselben90 verkauft, davon15/30/60 endgültig öffentlich abgenommen.
5. Exakte Wiederholung von3.
6. Kleiner Händler:200 Gold, Schnigge,15 bereits vorhandene fremde Fass, A15 ohne weiteren freien Marktüberhang.
7. B30 zu16 Gold, weitere60 regulär verkauft.
8. C30 kostenlos, weitere60 regulär verkauft.
9. Kein Verkauf/keine Hilfe: natürliche Erholung ab20,90 eigene Fass bleiben an Bord.
10. **Absichtlich unsichere reine Kalenderregel als Negativkontrolle:** dreimal15 bei0/30/60 Tagen, zusätzlich45 regulär verkauft. Zweite/dritte Erteilung umgehen ausdrücklich den Knappheitsnachweis, keine echte neue Notlage behauptet. IDs/Archiv/Export/Reload über mehrere abgeschlossene Bedarfe bleiben erhalten. Keine dritte empfohlene Regelvariante.
11. Echter80er-Vorkauf aus110; Lager/zwei Schiffe/Jahreswechsel umgehen Entnahmeschuld nicht. Keine Anerkennung.
12. A30 in3×10,60 regulärer Überhang; kein zweiter offener Bedarf, Mengenvergleich mit3.

Je Verlauf maximal90 echte Tage und12 Handels-/Hilfsentscheidungen einschließlich versuchter Lieferungen/Replay. Normale Zeitbeobachtungen sind keine Handelsentscheidungen. Höchstens12 VM-Kontexte, keine komplette Testsuite wiederholen. Startmarker und existierende Ausgabe sperren versehentliche Wiederholung. Auch Fehler werden als Rohdaten gespeichert. Native Marktänderungen je Tag separat protokolliert; Bilanzen lesend prüfen.

## Methoden und Regelvorschläge

`adapter.cjs` ist eine neue, nachvollziehbar von P1.2 kopierte Analysefassung. Einzige sachliche Erweiterungen: frühere abgeschlossene Bedarfe archivieren, global eindeutige IDs/Belege/Entnahmesaldo/Lebensverbrauch behalten, je Bedarf bilanzieren, drei kontrollierte Mengen bis60; ausdrücklich markierter unsicherer Kalendertest. Native Handels-/FIFO-/Preis-/Produktionsfunktionen unverändert. Keine produktive Speicherintegration. Der Adapter erteilt **kontrollierte Testbedarfe**; `rules.cjs` ist ein separat rein rechnerisch geprüfter Entwurf, keine bereits integrierte automatische Krisenerkennung.

Genau zwei realistische Kandidaten: (1) echte Erholung vor erneutem Engpass, (2) konservative begrenzte chronische Fortschreibung. Beide zwei reguläre Tagesbeobachtungen≤40 nach Korrektur um alle offenen lokalen Entnahmeschulden und öffentliche Entnahme seit letzter bestätigter Erholung; mindestens90 Tage seit letzter Hilfe, höchstens2 Bedarfe/60 reservierte Fass in gleitenden360 Tagen. Erholung=2 echte Tage freier Bestand≥90. Einwohnerstaffel≤10.000:15,≤30.000:30, darüber45; mildere Knappheit nur15. Alle Werte Vorschläge. Keine tägliche neue Bevölkerungsnachfrage, keine politische Gewichtung.

Hauptvergleich: gleiche90 Fass Gesamtlieferung; eine kleinere öffentliche Quote lässt mehr **normal verkauften Rest** am freien Markt. Nicht behaupten, eine reine15er-Hilfslieferung habe denselben Effekt wie90 gesamt. Zusätzliche direkte Kleinlieferung und natürlicher Nichtverkaufsarm zeigen diesen Unterschied.

Markterholung vorab definiert: **erstmals zwei aufeinanderfolgende Tagesbeobachtungen mit freiem Bestand≥90**, Rückfälle/Minimum/Endstand ebenfalls ausweisen. Sofortbestand nicht als zwei Tagesbeobachtungen zählen. Nach90 nicht beobachtet heißt rechtszensiert, nicht „erholt sich nie“. Kauf-/Verkaufskurs in V13 identisch, Tagespreise original.

Reine Einzelrechnungen in `math.cjs` zählen nicht als neue Spielverläufe. Historischer90-Fass-Vergleich aus P1.2-JSON nur lesen, nicht neu ausführen. Lesendes `audit.cjs` importiert keine VM. Keine alten Ergebnisse überschreiben. Allgemeine1500er-Regel in AGENTS.md wird vom expliziten Auftrag mit maximal12 kurzen Verläufen überstimmt.
