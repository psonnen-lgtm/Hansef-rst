# 0.8d.2a – isolierter Mengenpreisprototyp

**Analyse, keine Spielversion.** Kein Script hier wird von HTML, Pages oder bestehenden Simulationen geladen. Produktiver Code und historische Daten bleiben unverändert. Aktuelle Basis: `f7b3b336da911804101b3a38e8773128bff44164`, V13 / 0.8d.1b, HTML-SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`.

## Vorab festgelegte einzige Variante

Aktive tägliche Zielkurve `f(S)=2/(1+(S/110)^2)`. Marktanker `(Pₐ,Sₐ)`, gemeinsamer Weltmarkt pro Stadt/Ware, niemals je Schiff/Öffnen neu:

`E(k)=clamp(4, 10^9, round_half_up(Pₐ × (110²+Sₐ²)/(110²+k²)))`.

`E(k)` gilt für den Übergang zwischen `k-1` und `k` Fass. Kauf von `S` nach `S-n`: Summe `E(S-n+1)…E(S)`. Verkauf nach `S+n`: Summe `E(S+1)…E(S+n)`. Beide sind Differenzen derselben diskreten Wertfunktion; Rückweg identisch, Splitbeträge teleskopieren. Exakte BigInt-Brüche und ganze Goldbeträge, keine Rundung je Klick. Stärke 110 aus aktiver Kurve übernommen, vor Vergleichen festgelegt, nicht nach Ergebnissen angepasst. Orts-/Warenprofile wirken über den echten Anfangsanker und die unveränderte Tagesfortschreibung, keine neuen Produktionsparameter.

Nach Handel setzt nur die VM den aktuellen **nächsten Kaufpreis** auf `E(S)` (bei leerem Markt rechnerisch `E(1)`); erster Verkauf verwendet `E(S+1)`, daher eventuell geringerer Preis. Nach jedem echten täglichen Marktupdate wird der Anker neu gesetzt. Tagesformeln, Reihenfolge, Gefahren und Zufallsaufrufe bleiben original. Geänderte Tages-Eingangsbestände/-preise gehören zur Wirkung der Ausführungsvariante. Alte Sondertipp-Injektion/-Ablauf ist **kein integrierter Kandidatenpfad**: spätere gemeinsame Ankeraktualisierung und Tests wären zwingend.

Das Harness ersetzt nur die Transaktionsbeträge/Buchkosten im zur Laufzeit gelesenen `trade()`-Funktionsstring und aktualisiert danach Preis/Anker. FIFO, Quests, politische Folgeroutinen, Lager, Risiko, Reise und Networth bleiben Originalfunktionen. Genau dokumentierte Ersetzungen stehen im Prüfergebnis. Zusätzlicher Schutz weist im Prototyp unzulässige Kurven-/Goldgrenzen ab. Dies ist noch kein fertig integriertes UI/Transaktions-/Speichersystem.

## Reproduktion und harte Grenzen

```sh
node tests/analysis/phase08d2a/checks.cjs /tmp/quantity-checks.json
node tests/analysis/phase08d2a/compare.cjs /tmp/quantity-comparison-new
```

`checks` führt mathematische Einzeltests und kurze Mechanikfixtures aus, keine Routenstrategie. `compare` führt **genau 36** kurze Arme aus und verweigert ein vorhandenes Ausgabeverzeichnis. Nicht als Auftrag zu erneuten Vergleichen verstehen; die veröffentlichte Serie genügt für diese Phase.

Vorab: Seeds 81001–81003 × drei Kreise × zwei Mengenrichtlinien × zwei Modelle. Originale neue Kogge, 5.000 G, Ulf; Starthafen jeweils erster Kreishafen, volle gemeinsame JSON-Sicherung samt RNG-/Uhrzustand vor A/B. Vorgaben:

- Lübeck/Salz ↔ Hamburg/Bier; Bergen/Fisch ↔ Lübeck/Getreide; Nowgorod/Pelze ↔ Brügge/Tuch.
- Klein: höchstens 22 Fass. Groß/liquiditätsangepasst: höchstens 90 Fass. Beide begrenzt durch **lokalen** Bestand, tatsächliche Kurvenkosten, freien Raum und 6 G Abreisereserve. Kein negativer Bestand/unerlaubter Holk in einer Kogge.
- Verkauf der vorhandenen Ware bei Ankunft, danach festes nächstes Gut. Warenwahl ist vorab fest, kein Fernpreis-Orakel. Das ist eine unoptimierte Festkreisprobe, kein Modell aller menschlichen Entscheidungen. Die große Richtlinie ist keine Gewinnoptimierung.
- Keine Informationskäufe/Bad/Archivkosten, keine Kredite, Reparaturen, Aufträge, Neubauten oder Warten. Vorhandener Briefkalender wird vom echten Spiel fortgeschrieben. Informationspreise bleiben unverändert; Vorteil bezahlter Information hier nicht gemessen.
- Echte Seed-Gefahren unverändert, keine zusätzliche gefahrenfreie Verlaufsserie. Höchstens 12 Fahrten, 120 tatsächliche Tage, 30 Handelsentscheidungen, erste Grenze gilt. Nächste Reise mit Überschreitung wird **vor Kauf/Abfahrt** abgelehnt; kein Überschwingen. Kaufplan und Verkauf zählen je eine Entscheidung, auch wenn Menge null.
- Originale 55/90/140-Fass-Schiffe zusätzlich in höchstens zwölf **statischen** Kapazitätsproben, keine weiteren Karrieren. Tabellen 1/5/10/25/45/90/140 mit echten Waren, aber ausdrücklich synthetischen Preisankern/Beständen.

Offene Ware bleibt Einkaufskostenbestand, nicht Gewinn. Realisierter Warengewinn, Gebühren und geraubter Buchwert getrennt; Bargeldbilanzen geprüft. Kein Schluss Spieltage→Menschenstunden. Ausbleibende Abreiseblockade ist kein allgemeiner Sackgassennachweis.

## Speichergrenze des Prototyps

Dateiexport nur als **analysemarkierte Hülle** mit Spielkopie, Ankern, RNG und Uhr. Kein produktives neues Feld und keine Migration. Reloadtest belegt das Prinzip gemeinsamer gespeicherter Anker, keine fertige V14-Implementierung. Aktuelle V13-Validatoren erlauben sogar historische Preise 1–3 G; Kandidatenanker akzeptieren absichtlich erst 4 G. Solche Altstände brauchen vor späterer Übernahme eine ausdrückliche Behandlung. Bestände bis zur bestehenden Validatorgrenze 10^9 werden exakt berechnet. Alte Ankerdateien niemals als normale Spielstände ausgeben.

Ausgangsdokumente: [Wirtschaftsvarianten](../../../docs/entwicklungsberichte/2026-10-27_0.8d0_wirtschaftsvarianten.md), [Entscheidungsplan](../../../docs/entwicklungsberichte/2026-10-27_0.8d0_entscheidungsplan.md), [Diagnose](../../../docs/entwicklungsberichte/2026-10-27_0.8c0_wirtschaftsdiagnose.md). Endbericht/Entscheidung nach Auswertung separat unter `docs/entwicklungsberichte/`. Keine produktive Freigabe durch diesen Prototyp.
