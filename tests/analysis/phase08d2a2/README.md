# 0.8d.2a.2 – exakte Tagesbasis und politischer Schutz, nur Analyse

27.10.2026 Europe/Berlin. Basis `c4244a84e6f4a0ed4579291dc8ebe25ffd2a110e`, neuer Branch `analysis/phase08d2a2-anchor-political`. Spiel 0.8d.1b/V13 bytegleich, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Vorherige Programme/Berichte/Ergebnisse bleiben unverändert.

## Festlegung vor Tests

Einzige Stärke **K=500**. Keine B1-/B2-Kalibrierung. Exakte rationale Kurvenbasis `C=N/D`, Anfang `C=Pa*(500²+Sa²)`. Feste ganzzahlige Übergänge `E(k)=clamp(4,10^9,round_half_up(C/(500²+k²)))`, dieselben B3-Kauf-/Verkaufssummen.

Gewählter Ansatz A1: tatsächlichen originalen täglichen Integerpreisimpuls `ΔP=Pnach−Pvor` auf **exakten** wirksamen Stückwert `U=C/(500²+Svor²)` anwenden, dann mit tatsächlichem neuen Bestand fortsetzen: `Cneu=clamp(U+ΔP,4,10^9)*(500²+Snach²)`. Nur bei echtem Preis-/Bestandswechsel; unveränderte wirtschaftliche Werte behalten exakt dieselbe Basis. Grenzen auch beim effektiven U vor Impuls berücksichtigen. Sondertipps sind tatsächliche externe absolute Überschreibungen und setzen ihre Basis erst nach originaler Preis-/Bestandsänderung; No-op bleibt No-op. Keine Zusatz-RNG-Ziehung. Revisionsprüfung, kanonische Brüche/JSON-Strings, begrenzte Präzisionsgröße (4096 Zeichen; überschreiten bedeutet Fehler, niemals still rundend zurücksetzen).

Verglichener, nicht implementierter Ansatz A2: altes gerundetes Neuankern nur bei wirklicher Änderung zulassen. Einfacher No-op-Schutz, behält aber Rundungsreset an echten Bestandswechseln und erklärt keine genaue Restwertfortschreibung. A1 bewahrt den exakten Residualwert und wird ausgewählt. Kein zweiter wirtschaftlicher K-Wert.

**Vergleichsbudget:** neun neue präzise B3-Arme (drei Seeds81001–81003 × drei ursprüngliche Kreise × kleine Richtlinie≤22) gegen neun **gelesene** alte B3-Arme aus0.8d.2a.1, also **18 gegenübergestellte Fälle insgesamt und nur neun neue Ausführungen**. Keine alten Verläufe erneut starten. Vollständige alte Startdateien/RNG/Uhr benutzen; gleiche Festwaren, Gebührenreserve6, echte Gefahren, keine Politikschutzänderung in diesen Wirtschaftsfällen. Harte Grenze12 Fahrten/120 Tage/30 Entscheidungen. Keine Wiederholung/Tuningserie. Großmengen separat nur mathematisch/isoliert.

## Politischer Forschungsprototyp: noch keine fertige Spielregel

Zwei Konzepte: (B1) gezielter Rückhandelsabgleich mit vorläufigen Anerkennungen; (B2) unabhängig von Klicks definierte politische Vermögens-/Leistungsgrundlage. B1 nicht implementiert: künftiger Rückkauf ist beim echten Verkauf unbekannt; zwischenzeitlicher Aufstieg, verschiedene Schiffe und Tage benötigen weitreichende Rückabwicklung/Finalisierung.

Ausgewählt B2 als getrennte isolierte Funktionen/VM-Beobachter:

- Physische Kosten-/Gold-/FIFO- und Dienstleistungsbuchungen bleiben original. Politisches Referenzvermögen wird auf dem aktuellen gültigen Wert kalibriert. Danach Veränderung einer gemeinsam aggregierten **Liquidationseigenkapitalfunktion**: Gold/Bank−Schuld+Schiffe/Bau−Mietschuld plus `F(S+eigeneGesamtware)−F(S)` je Stadt/Ware. Alle eigenen Schiffe und Lager zusammen, kein neuer Anker. Damit sind lokale Käufe/Verkäufe politisch wertneutral. Finanzielle Einkaufskosten bleiben unberührt.
- Handelspunkte aus **kumuliertem rationalem Gewinn des tatsächlich verkauften fremden FIFO-Anteils**, nicht je Knopf. Teilmengen behalten exakte gewichtete Schattenkosten; unbekannte Kosten erhalten keine erfundenen Gewinne. Neue Punkte als High-water-Differenz `floor(max(0,Marge)/250)`, historische Reputation/Ämter/Dienste nie löschen. Direkte Markt-/Lagerfunktionsaufrufe nutzen denselben Beobachter. Keine zweite Preisformel.
- Bewusste offene Nebenwirkungen schon vor Daten: Kalibrierte Liquidationsbewertung erkennt historische lokale stille Gewinne beim endgültigen Verkauf nicht genauso neu an wie heutiges Buchvermögen. Kumulative Punkte beseitigen den bisherigen+2-Deckel je Verkauf und können mehr Anerkennung für große echte Liefergewinne geben. Das sind **materielle Politikentscheidungen**, nicht bloß ein unsichtbarer Bugfix. Wenn Tests dies bestätigen, keine Produktivfreigabe behaupten.
- Alte ganze Politikobjekte/Ränge/Regelschemata bleiben erhalten. Keine V14-Migration, kein Browser-/Quota-Transaktionssystem. Politische Liquidationsrechnung zunächst nur bis10000 eigenen Fass je Stadt/Ware und zulässiger Absatzgrenze; größere gültige Altstände sind ein ungelöstes Produktivthema, kein stiller Warenverlust.

Geplant: exakte Preis-/Nullimpuls-/Tagessplit-/Grenz-/Exporttests; echte Original-Tagesfortschreibung, alte/neue Sondertipps/Ablauf, Jahresgrenze, Brief-/Informationsschutz; getrennte kleine Politikfälle für sämtliche18 geforderten Szenarien und dokumentierte legitime Nebenwirkungen. Keine ganze Karriere. Vor Ausführung committen, Fehlschläge erhalten. Zusätzlich bestehende19 Basis-/18 Handelsregressionen unverändert. Reine Nachprüfung gespeicherter Ergebnisse darf keine alten Verläufe starten.

```sh
node tests/analysis/phase08d2a2/price-checks.cjs <neues-json>
node tests/analysis/phase08d2a2/political-checks.cjs <neues-json>
node tests/analysis/phase08d2a2/compare.cjs <neues-ergebnisverzeichnis>
node tests/test-v04.cjs
HANSE_GAME=Hansefuerst_0_4.html node tests/phase1.cjs
```

Drei neue Abschlussberichte unter `docs/entwicklungsberichte/`, Index ergänzen, Branch pushen/PR versuchen, kein Merge/Pages/Produktiv-Patch und keine Folgephase. Alte Stände, Rohdaten und produktive Speicherfelder unverändert.
