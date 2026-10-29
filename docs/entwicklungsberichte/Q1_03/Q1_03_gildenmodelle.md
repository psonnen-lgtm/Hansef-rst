# Q1.03 – Drei Gildenmodelle und Empfehlung

29.10.2026 · **Konzept, keine Gilde implementiert.** [Gesamtbericht](Q1_03_gesamtbericht.md) · [Karriere](Q1_03_karrieresystem.md) · [Bestandsschutz](Q1_03_bestandsschutz_v13.md).

## Verbindliche Leitplanken

Bewusster Antrag in einem erkennbaren Gebäude der Spielwelt, Aufnahmegebühr, politischer Zugang statt automatischem Rufgewinn. Vermögen allein verleiht keine Mitgliedschaft. Gebührenhöhe, Vermögensprüfung, weitere Aufnahmehandlung und Informationsfunktionen sind offen. Aus historischer Atmosphäre entstehen keine zusätzlichen Pflichtmechaniken. Eine Freigabe des Konzepts ist noch keine Freigabe seiner Umsetzung.

Heute gibt es Weltgebäude und `CityLife`-Hotspots, aber keinen nachgewiesenen Gildenbeitritt/Gildenstatus. „Hafengilde“ als Unterstützerkreis ist kein Mitgliedschaftssystem. Ein neues Schild allein ohne zugängliches Gebäude erfüllte das Ziel nicht.

## Vergleich

| Kriterium | A – einfacher Eintritt | B – wirtschaftlicher Nachweis | C – überschaubare Aufnahmehandlung |
|---|---|---|---|
| Regelvorschlag | Einmalige Gebühr und ausdrücklicher Antrag | Gebühr plus ein abgeschlossener echter Handelsweg, kein politischer Ruf dafür | Gebühr plus eine einmalige persönliche Vorstellung/Zusage |
| Spielspaß | Frühe selbstbestimmte Entscheidung, kaum Bürokratie | Verbindet Handel und Institution, kann optimierte Pflichtfahrt werden | Atmosphärisch, aber Gefahr eines vorgeschalteten Laufauftrags |
| Verständlichkeit | „Beitreten kostetX, eröffnet politische Anträge, gibt keine Punkte“ | „Welcher Handel zählt?“ benötigt zusätzliche Erklärung | „Warum noch ein Auftrag vor den Ratsaufträgen?“ erklären |
| iPhone/iPad/PC | Ein kompakter Gebäude-Dialog mit eindeutiger Bestätigung | Zusätzliche Nachweisansicht auf kleinen Displays | Zusätzlicher Schritt und Rückkehrmeldung, Fokus-/Fristenrisiko |
| Wirtschaftliche Belastung | Nur vorher sichtbare einmalige Zahlung | Zahlung plus Warenbindung, Gebühren und mögliche Verluste | Zahlung plus Wege-/Zeit-/gegebenenfalls weitere Kosten |
| Wiederholungsgefahr | Gering; Beitritt genau einmal | Scheinhandel/Split-/Rückkaufnachweise müssten abgesichert werden | Nicht durch Abbruch/Laden erneut Anerkennung erzeugen |
| Politischer Fortschritt | Öffnet Zugang; Rang/Dienste bleiben gesondert | Wirtschaftlicher Nachweis darf kein Ruf und kein Ersatzverdienst sein | Aufnahmehandlung nicht zusätzlich als allgemeiner Ratsverdienst doppelt zählen |
| Technischer Aufwand | Niedrig bis mittel: Status, Zahlung, Gebäude, Migration/Transaktion | Höher: echter Herkunfts-/Wege-/Abschlussnachweis; alte Handelschronik unvollständig | Mittel: zusätzliche einmalige Quellen-ID/Anwesenheitsstufe |
| Spielstandsicherheit | Eine atomare Zahlung/Statusänderung | Zusätzlich unveränderliche Nachweisreferenz | Zusätzlich Fortschritt/Abbruch-/Importregel |
| Bewertung | **Empfohlen** | Möglich, aber gegenwärtig unnötige Hürde | Optionaler späterer Atmosphärenentwurf, heute nicht nötig |

B müsste eine wirtschaftlich echte Handlung prüfen, nicht positive `sell.profit`, `s.visits` oder erhöhten Restbuchwert. Ein Kreislauf oder die bloße Fernansicht darf nicht genügen. Alte Informationen/Telemetrie belegen nicht zuverlässig jede frühere Lieferung; keine rückwirkend erfundenen Handelsnachweise.

## Gebühren: konkrete, ausdrücklich unbeschlossene Vorschläge

Neuer V13-Start besitzt5.000 Gold. Reine Rechnung, kein Spieltest:

| Eintritt | Anteil Startgold | Rest nach Zahlung | Einschätzung |
|---|---:|---:|---|
|250 Gold |5% |4.750 |Sehr zugänglich, Institution eher symbolisch |
|**500 Gold** |**10%** |**4.500** |Empfohlener erster Testwert: spürbar, ohne die Handelsbasis grundsätzlich aufzugeben |
|1.000 Gold |20% |4.000 |Größerer Reserveverlust, für Anfänger möglicherweise zu teuer |

500 ist **kein beschlossener Preis**. Gebühren werden aus Bargeld bezahlt, kein automatischer Kredit/Verkauf, keine variable Vermögenssteuer. Keine zusätzliche Mindestvermögensgrenze empfohlen: Sie würde Q-001-Abhängigkeiten wieder einführen und politische Zugänglichkeit an Buchwerte binden. Aufnahme darf bei zu wenig Gold nachvollziehbar scheitern und später unverändert erneut beantragt werden.

Sinnvoller Zeitpunkt ist nach eigener Reserveabwägung, oft nach ersten Handelsentscheidungen. Beim Start bereits genug Gold zu haben ist kein Fehler: Die Mitgliedschaft ist eine bewusste Wahl, kein kostenloser Rang. Keine künstliche Mindestreise oder Mindestspielstunde. Zahlung gibt **weder Ruf noch lokale Unterstützung, Urkunde oder Ratsherr-Titel**.

## Gebäude und Bedienung

Vorschlag: Gildenhaus am bestehenden Stadtplatz, erkennbare Fassade/Schild, eigener Welt-Hotspot mit kurzer Beschriftung „Kaufmannsgilde“. Bestehende `CityLife`-Navigation/Fokus-/Touchmuster wiederverwenden, kein zusätzliches Hauptmenü. Noch kein Ort, Bild oder Hotspot festgelegt/geändert. Platzierung in den elf Szenen ist spätere begrenzte Grafik-/UI-Arbeit, kein bereits vorhandenes Gildenhaus behauptet.

Gebäudekarte mit höchstens: Mitgliedsstatus, einmalige Gebühr/Restgold, Hinweis „Politischer Zugang; keine automatische Anerkennung“, Knöpfe **Beitritt beantragen** und **Zurück**. Nach Beitritt statt Zahlungsbutton nur Bestätigung/Datum. Kein Untermenübaum. Aufnahme gilt hanseweit als ein Status, nicht elf Gebühren; dies ist eine technische Empfehlung, noch Nutzerentscheidung. Politische Verdienste bleiben örtlich.

Bei Fernansicht darf das Gebäude lesbar sein. Antrag setzt persönliche Anwesenheit voraus. Name, Status, Gebühr und Nachwirkung müssen vor Bestätigung stimmen. iPhone: gut treffbare Schaltflächen, kein horizontaler Zwang; iPad/PC: gleiche Bedeutung, Tastaturfokus und Screenreader-Beschriftung. Physische Gerätetests erst nach eigener Umsetzungsfreigabe, hier keine Browserprüfung.

## Atomarer Ablauf als spätere Anforderung

Ein stabiler Mitgliedschafts-/Transaktionsschlüssel je Partie, wiederholte identische Bestätigung ohne erneute Gebühr. Kandidatenkopie enthält Geldabzug und Mitgliedschaft gemeinsam. Vor Commit erneut Bargeld, Status, persönlicher Ort, Spielrevision und Fensterkonkurrenz prüfen. Abbruch/Quota/Stale: weder Zahlung noch Beitritt. Erfolgreicher Commit: genau eine Zahlung, ein Status, ein Beleg. Keine nachträgliche Reparatur „Gebühr nochmal abziehen“ beim Laden.

Vorhandene `politicalAction`-Kopier-/Validierungsstruktur ist ein Ausgangspunkt, aber **kein ausreichender Nachweis für atomare Mehrfensterkonkurrenz**. Alle konkurrierenden Schreibpfade müssen dieselbe echte Transaktions-/Writer-Regel verwenden; siehe Q-002 und Testkonzept. Kein Beitrittsprototyp ausgeführt.

Alte Ratsherren/Bürgermeister/Eldermänner erhalten empfohlen einen ausdrücklich markierten **geschützten Altzugang**, keine erfundene bezahlte Mitgliedschaft. Für neue Partien gilt bewusster Beitritt. Optionaler Beitritt alter Berechtigter und mögliche Gebührenbefreiung sind offen; niemals im Hintergrund eine Gebühr aus alten Goldständen buchen.

Konkurrenteninformationen, gesellschaftliche Kontakte und weitere Gildenfunktionen bleiben spätere Optionen. Keine neue Preisvorschau, Konkurrenten-KI, Pflichtgesellschaft oder historische Gebühr aus dem Original übernehmen. Ein Original-Gebührenangebot ist kein heutiger Balancewert.
