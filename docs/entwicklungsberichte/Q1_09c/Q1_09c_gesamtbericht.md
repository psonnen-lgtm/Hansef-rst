# Q1.09c – Sicherheitskorrekturen und freigegebene Regeln

30.10.2026 Europe/Berlin · Branch `fix/q1-09c-safety-finalization`. Tatsächlich geprüfter Endcode **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, SHA256 **`50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`**. Nominalversion weiterhin0.8d.1b, Speicherformat **V13 / Politik2 / Sicherheit3**. Basis: Q1.09b **`afb2bc9ce5496ecfcd8a5a17da1301825262f438`**.

**Die drei freigegebenen Regeln sind implementiert und gezielt geprüft. Keine uneingeschränkte Integrationsfreigabe:** Die finanziellen W1-S-Gegenfälle sind abgesichert; ein bestehender globaler Ansehens-/Politikpfad bleibt offen. Safari, echte Apple-Geräte und Offline-Kaltstart sind nicht abgenommen. Der Nutzer entscheidet über eine Integration.

## Was sich für den Spieler ändert

1. **Zulassung und Kredit verwenden gemeinsame Referenzwerte.** Vorhandene Waren zählen zum aktuellen Kurs ihres tatsächlichen Hafens. Historische Kosten und Warengewinne bleiben erhalten. Neutrale Buchwertkreise erhöhen den Kreditrahmen nicht mehr. Laufende Bauten besichern nur bezahlten Werftlohn bis zur alten Grenze, keine Materialbuchwerte.
2. **Schiffe dürfen ohne Kaufmann reisen.** Im entfernten Hafen ist die Fahrt unbegleitet; im eigenen Aufenthaltsort kann man im vorhandenen Reisedialog auch bewusst an Land bleiben. Weltzeit, Gebühren und Risiken gelten regulär. Der Kaufmann erhält dadurch keine persönliche Ankunft, keinen Besuch und kein Ansehen.
3. **Belegte knappe Altverträge können einmalig geschont werden.** Originalfrist bleibt erhalten; ein validierter Beleg speichert den genauen Fehlbetrag. Beispiel1 Tag Restfrist,6 belegte Reisetage:5 Tage Schonung. Keine automatische Erfüllung oder Prämie. Unsichere/fortgeschrittene Fälle bleiben unverändert.

## Zusätzliche nachgewiesene Sicherheitsfehler korrigiert

Die abschließende echte Mehrfensterprüfung reproduzierte einen Fehler der bisherigen LocalStorage-Lösung: Ein Tab konnte trotz Web Lock einen veralteten Cachewert lesen und einen neueren Spielzug überschreiben. Ein verzögerter Import schrieb im Gegenfall25000 Gold mit Revision2 über die neuere Partie. Die Fehlerprotokolle wurden erhalten.

Der **einzige aktive Spielstand liegt jetzt als vollständiges JSON in einer atomaren IndexedDB-Transaktion**, weiterhin unter derselben exklusiven Web-Lock-Grenze. Eine echte `readwrite`-Transaktion liest den aktuellen Datensatz, vergleicht ihn mit dem erwarteten Stand und schreibt den vollständigen Kandidaten. Erfolg erst nach Transaktionsabschluss. LocalStorage bleibt ausschließlich Quelle/Backup alter Partien; es gibt keinen zweiten aktiven Spielstand und keinen ungesicherten Fallback. Die frühere Speicheradresse bleibt unberührt.

Weitere Korrekturen: Derselbe fehlgeschlagene Reiseplan würfelt beim erneuten Speichern sein verborgenes Risiko/Sturmschaden nicht neu aus. Gültige persönliche Ortsinformationen früher M2-Partien bleiben auch bei fehlendem optionalem Altvertragsfeld erhalten. Mögliche schnellere Flottenwechsel führen zu keiner unbewiesen hohen automatischen Schonung.

## Ergebnisübersicht

|Bereich|Belegt|Noch offen|
|---|---|---|
|W1-S/Kredit|8 historische Handelsfälle,2 Bau-Fixtures, weitere aktive Verbraucherprüfungen|Globale politische Anerkennung alter Handelsmargen|
|Q002|Atomarer lokaler Speicher, echte Tabs, Transaktionsabbruch, Dateien/Reload|Safari/physische Speicher-/OS-Abbrüche|
|Q003/Reisen|Persönlich/unbegleitet getrennt, keine Fernvorsprache, kein doppeltes Ereignis|Keine Vollsimulation sämtlicher Reise-/Karrierekombinationen|
|Altfristen|14 gezielte Gruppen einschließlich Einmaligkeit, echter Besuche und Ausschlüssen|Fortgeschrittene M2/unklare Flottenwechsel erhalten keine automatische Schonung|
|V13|Geld, Schulden, Kosten, Herkunft, Titel, Ämter, Siegel, Urkunden und Originalfristen in geprüften Kopien erhalten|Keine echten Nutzerdateien getestet|
|Browser|31 native Chromium-Gruppen;3 Bildschirmgrößen mit Maus/Touch-Emulation|WebKit/Safari, echte iPhones/iPads, Offline-Kaltstart|

**106 gezielte Fälle/Prüfgruppen bestanden**, davon31 im echten Chromium. Zusätzlich zwei kritische Mehrfensterfälle je dreimal erneut bestanden. Ein Datei-URL-Fall administrativ blockiert, nicht als Erfolg gezählt. Die44 früheren VM- und74 späteren Gruppen dienen als historische Referenz, nicht als pauschal neu ausgeführte Gesamtsuite. Keine Großsimulation.

Eine zusätzliche kleine Integration verbindet eine unbegleitete3-Tage-Fahrt mit Zinsen, Werftübergabe am ursprünglichen Bauort und Vertragsablauf: alles in genau einem kanonischen Commit, Person unverändert, Reload identisch.

## Q001 ausdrücklich begrenzen

Der alte Bauunterschied188 Gold/85 Kredit verschwindet in der Sicherheitsbasis; beide Varianten erhalten6732 Kreditrahmen. Die historische Buchanzeige darf sich weiterhin unterscheiden. Im neutralen Handelsfall bleibt jedoch nach der alten unveränderten Regel **+1 globales Ansehen**, das die native politische Unterstützung um1/6 erhöht. Kein Kredit-/Referenzwertzuwachs, aber ein verbleibender Anerkennungspfad. **Finanzielle Abnahmekriterien bestanden; Q001 nicht uneingeschränkt vollständig geschlossen.** Keine eigenmächtige neue Karriere oder Rufregel als vermeintlicher Nebenfix.

## Umfang und Sicherung

Produktänderung ausschließlich `Hansefuerst_0_4.html`. Neue Prüfungen unter `tests/safety/q1_09c/`; sieben Berichte und ausschließlich ergänzter Berichtsindex. Bestehende Testskripte, Q1.09-/b-Belege, historische Simulationsergebnisse, Grafiken und Pages/Dist bleiben erhalten. Keine Gilde, ModellC-Aktivierung, neuen Waren/Preise, Gebührenparameter oder automatische Handelsroutine. Keine echte Nutzerdatei verändert.

GitHub vor Beginn geprüft: Entwicklung `02ee6b8fc1507ad078b6b596c333e50d91eeea64`, main `c1280228951d581c7b3131279b8ff164a8e36dfa`, Q1.09 `e3498f8522ec456287fb4328dd6e895b96a1d07a`; diese Branches und Q1.09b bleiben unverändert. AGENTS.md wird mit dem engeren ausdrücklichen Nutzerauftrag angewandt: keine pauschalen1500er-/2250er-Läufe.

[Prüfmatrix](../../../tests/safety/q1_09c/test-matrix.csv) · [Abnahmezahlen](../../../tests/safety/q1_09c/acceptance-summary.json) · [Sicherungsstände](../../../tests/safety/q1_09c/checkpoints.json) · [Offene Probleme](Q1_09c_offene_probleme.md).

[Branch](https://github.com/psonnen-lgtm/Hansef-rst/tree/fix/q1-09c-safety-finalization) · [Spielcode](https://github.com/psonnen-lgtm/Hansef-rst/blob/fix/q1-09c-safety-finalization/Hansefuerst_0_4.html) · [Änderungen seit Q1.09b](https://github.com/psonnen-lgtm/Hansef-rst/compare/fix/q1-09b-safety-completion...fix/q1-09c-safety-finalization). Vollständiges veröffentlichtes Paket wird abschließend unabhängig von GitHub zurückgelesen. Kein Merge/Deployment und keine automatische Folgeaufgabe.

## Abschließende lokale Kontrolle

[Prüfnachweis](../../../tests/safety/q1_09c/results/verification.json):3382 bestehende Dateien gegen Q1.09b geprüft. Nur Haupt-HTML und ausschließlich ergänzter Berichtsindex unterscheiden sich. Historische Testskripte/Ergebnisse, Q1.09-/b-Belege, eingebettete Grafiken und äußere HTML-/CSS-Struktur unverändert.19 Basisaussagen erhalten,17 neue JavaScript-Prüf-/Auszugsdateien syntaktisch geprüft, sieben Berichte und Quellenverweise gültig. Ein aktiver atomarer IndexedDB-Datensatz; keine kanonischen LocalStorage-Schreibvorgänge. Keine uneingeschränkte Q001-/Integrationsfreigabe.

Die vorliegenden Screenshotansichten375/820px sowie die blickdichte Speicheranzeige wurden zusätzlich visuell gelesen. Auf kleinen Bildschirmen ist vertikales Scrollen erforderlich; dies ist keine echte Apple-Geräteabnahme. [Speicheranzeige während verzögertem Commit](../../../tests/safety/q1_09c/results/final-acceptance/saving-cover.png).

## Tatsächlich von GitHub zurückgelesen

Veröffentlichter Stand **`02d24e12b2d5cedf224ca0a4fe484f336093f664`** per frischem GitHub-HTTPS-Fetch in ein von der Arbeitskopie unabhängiges Git-Objektverzeichnis ohne lokale Alternates geladen. Alle**229** damaligen Paketdateien vollständig gelesen, einschließlich aller**46389124 Bytes** der Haupt-HTML; komplette Dateimenge und Bytes identisch zur sauberen Arbeitskopie. Alle**228** Manifest-Prüfsummen stimmen. [Rücklesebeleg](../../../tests/safety/q1_09c/results/github-readback.json).

Dieser Beleg und der vorliegende Sicherungsabschnitt werden separat veröffentlicht und anschließend nochmals vollständig zurückgelesen. Keine selbstreferenzielle Test-ID behauptet. Tatsächlich geprüfter Spielcode durchgehend `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; nachfolgende Commits ändern nur Berichte/Belege. Q001 bleibt ohne die Einschränkung auf den Finanzschutz offen; keine endgültige Integrationsfreigabe. Ursprüngliche Branches, main und Entwicklung unverändert; kein Merge, keine Pages-Änderung, keine automatische Folgeaufgabe.
