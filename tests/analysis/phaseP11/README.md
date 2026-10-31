# P1.1 – ganzjährige Unterstützung, reine Rechenprüfung

Basis 808d3a981093d99b3b57be94bc96184191398066, Branch analysis/p11-year-round-support.
Keine produktive Wahlengine, kein Markt-/Karrieresimulator und keine Migration.

Aus P1 ändern: keine90-Tage-Wahlkampfphase; Wirkung und Rivalen ganzjährig; normale
gewinnbringende Nettozufuhr bei zertifizierter Knappheit darf anerkannt werden.
Zwei Anerkennungsanteile: langfristiges, gedeckeltes Vertrauen aus belegten Verdiensten;
kurzlebige Beliebtheit. Keine Jahres-/Wahlzurücksetzung.

Minimaler Versorgungsentwurf: gemeinsame Marktknappheitsbescheinigung, eigentümerweite
Entnahmeschuld und widerrufbare A/B-Mengenbelege, irreversible echte Warenspende C.
Keine weitere Preis-/Produktions-/Nachfragewirtschaft. Knappheitskorrektur ist kein
exakter kontrafaktischer Markt und negativer Tagesfluss kein Verbrauchsnachweis.

Alle Zahlen sind Kalibrierungsvorschläge. Ausschließlich synthetische Belege/Marktbeobachtungen
in Python-Arithmetik; kein HTML evaluieren, keine Spielstände schreiben, keine seedgesteuerten
Wirtschaftsläufe. Ganzjährige Beispiele sind kleine feste Beleglisten, keine Karrieren.
Quellen vor formalen Prüfungen committen. Fehlversuche/Unsicherheiten erhalten.

## Erkenntnisse nach Ausführung

Der reine Markt-Beobachter ist an der Wahlgrenze nicht ausreichend: endgültige
Unterstützung vor einer Wahl kann durch Rückkauf danach folgenlos für den alten
Wahlsieg neutralisiert werden. election_boundary.py dokumentiert den negativen
Abnahmepunkt ausdrücklich. Keine Karriere/Wahlengine wurde dabei ausgeführt.

final_receipts.py prüft anschließend nur sechs Warenbilanzen einer strengeren
Regeloption: der anerkannte Anteil wird wirklich öffentlich abgenommen, nicht
frei rückkaufbar angeboten. Das ist eine neue, noch zu genehmigende Verbrauchsregel,
keine bereits integrierte Version von model.settle. Die drei neuen Berichte
trennen diese beiden Stände und die verbleibenden Integrations-/Balancefragen.
