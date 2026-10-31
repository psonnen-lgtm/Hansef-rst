# Phase 0.8d.2a.3 – vorab begrenzter Prüfplan

Basis f6a211508d112a12871f20eafe08506c1715b1b1, Branch analysis/phase08d2a3-political-performance.
Nur P1 und P2 vergleichen, P2 isoliert umsetzen. Keine Produktivänderung.
B3/K500 und exakte Preisbasis aus phase08d2a2 ausschließlich unverändert importieren.

P1: eigentümerweite Liquidationsbewertung (ohne alte min-Kappung) ist lokal invariant,
bewertet aber alte Gewinne/Verluste schon vor Verkauf und ändert Übernahmewerte.
P2: separate ursprüngliche politische Kostenlose, offene Rückkaufbelege je Markt/Ware,
LIFO-Rückabgleich, beim Rückkauf politische Basis wiederherstellen. Echte Geldflüsse bleiben.
Ansehen aus bekannter kumulierter Marge, höchstens zwei Punkte je beständigem Warenposten;
gesamte Nettomarge begrenzt zusätzliche Punkte. Bei Rückkauf Korrektur nur der neuen Punkte,
keine historischen Punkte, Dienste oder Ämter entfernen. Kein drittes Konzept implementieren.

Erwartete Blockaden vor Tests ausdrücklich festgehalten:
- Sofort anerkannter legitimer Verkauf und unbekannter zukünftiger Rückkauf sind zunächst
  ununterscheidbar. Eine dazwischen gesicherte Beförderung kann trotz nachträglicher
  Werteberichtigung bestehen bleiben. Gegenprobe ausführen, nicht als Schutzpass zählen.
- Endliche Finalisierungsfristen allein lösen das Problem nicht, lange Rückkaufbelege wachsen.
- Losbildung und reversible Punkte sind neue fachliche Regeln; keine Balancefreigabe.
- Vermögens-/Punktegleichheit gilt nicht unabhängig von verborgenem Analysezustand!

Mathematische Einzelprüfungen decken 90/9×10/90×1 ab, ohne 90 Spielaktionen auszuführen.
Höchstens zwölf kurze VM-Handlungsverläufe, einschließlich altem Politik-Vergleichsarm;
je höchstens zwölf Fahrten/120 Tage/30 Handelsentscheidungen. Keine Wirtschaftsserie,
keine volle Karriere. Historische Saves nur lesen/in VM auf Kopien übernehmen.
25 explizite Anforderungen in results/checks.json zuordnen. Fachliche Gegenbeispiele
als fehlgeschlagenen Schutz ausweisen, technische Abbrüche vollständig erhalten.
Quellen vor formalen Tests committen. Danach Rohdaten, drei Berichte, Index und Übergabe.
