# Q1.10a – Gezielte native Mehrpartien-Prüfungen

31.10.2026 Europe/Berlin. Ausschließlich synthetische Daten in frischen Browserprofilen, keine echten Nutzerdateien und kein Deployment.

Geprüfter Spielcode **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**. Basis **`c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`**, ursprüngliches Sicherheits-Spiel. Die Q1.09f-Testkopie und ihr Speicherpräfix werden nicht als reguläre Implementierung verwendet.

**Maßgeblich:** `results/native-release.json`, zusammengefasst in `results/acceptance.json`: **40/40 native Chromium-Gruppen bestanden**, keine ungefangenen Seitenfehler. Alle früheren Läufe einschließlich `native-final.json` und `native-landscape.json` sind erhaltene Zwischenstände anderer Codefassungen; sie ersetzen nicht die abschließende vollständige Abnahme.

## Reproduzieren

Mit vorhandenem Node, Playwright und `/usr/bin/chromium` vom Repository aus:

```sh
node tests/features/q1_10a/browser-checks.cjs /tmp/q110a-neues-ergebnis.json
```

Der aktuelle Treiber enthält 40 Gruppen; die vollständige damalige38er-Treiberversion ist im geprüften Spielcommit9aa7b7f enthalten. Der Lauf startet ausschließlich einen temporären 127.0.0.1-Server, benutzt echte IndexedDB/Web Locks/FileReader/Downloads und schließt Browser/Server danach. Neue Ergebnisdatei erforderlich. Keine Wirtschafts- oder Karriere-Langläufe. Selektive Prüfung beispielsweise mit `Q110A_ONLY='^39 ' node … <neue-datei.json>`; Ergebnisse kennzeichnen Teil-/Gesamtlauf.

`fixtures.json` enthält ausschließlich künstliche frische V13-/M2-Zustände, bewusst gesetzte Testpolitik und einen kenntlichen abgelehnten TEST-Zustand. Keine archivierten Simulationsendstände. Herkunft: bewahrte historische Fresh-State-Fabrik aus dem Q1.09c-Prüfharness. Erneute Erzeugung nur in einen **neuen** Pfad: `node tests/features/q1_10a/generate-fixtures.cjs /tmp/q110a-neue-fixtures.json`. Normale Startwerte werden im tatsächlichen neuen UI zusätzlich nativ geprüft.

## Tatsächlich ausgeführt

1. Vorab eine kurze native Zwei-Partien-Sichtprüfung auf frühem Implementierungsstand; nicht als Finalabnahme gezählt.
2. Erster umfassender Lauf auf `a02415a…`: 32 Gruppen, 30 bestanden; zwei Treiberfehler (künstlicher Quota-Fehler nach Reload wieder aktiviert, Marktansicht nicht abgewartet).
3. Selektiver Lauf `Q110A_ONLY='^(14|18|27|33|34|35|36) ' … results/native-focused.json`: 6/7 bestanden. Der letzte Fehler war die zu strenge Erwartung exakt 80 statt höchstens 80 Zeichen bei getrimmtem Anzeigenamen; ursprünglicher Spielname blieb erhalten.
4. `Q110A_ONLY='^35 ' … results/native-name-limit.json`: bereinigte Assertion bestanden. Alte rote Dateien nicht überschrieben.
5. Anschließend Datenverlustschutz für erzwungene ID-Kollisionen und ausgeschöpfte Verzeichnisrevisionen ergänzt, Code zuerst in 9aa7b7f gesichert. Vollständiger erneuter Lauf gerechtfertigt: `node tests/features/q1_10a/browser-checks.cjs tests/features/q1_10a/results/native-final.json`, **38/38 bestanden**.
6. Nach zusätzlicher Querformat-Assertion im Treibercommit `e9c72e0a4be3b1f2be45eff1155447b39c490b7e`: `Q110A_ONLY='^39 ' … results/native-landscape.json`, **1/1 bestanden** gegen unveränderten 9aa7b7f-Spielcode.

Künstlicher Quota-Fehler ist ein eingespritzter DOMException, kein real vollgeschriebenes Gerät. Zusätzlich echter nativer Transaktionsabbruch **nach** erfolgreichem Put-Request, um Rückfall von Partie, Katalog und Backup zusammen zu prüfen. Die Testumgebung benutzt einen separaten SessionStorage-Schalter nur zur Steuerung der injizierten Fehlersituation; das eigentliche Spiel verwendet ihn nicht.

7. Letzte Herkunfts-/Namensabgrenzung vor Integration: legitime reguläre TEST-Rufnamen dürfen keine unspielbare Partie erzeugen; Q1.09f-Marker weiterhin immer gesperrt. Finaler Code zuerst in `46d28dc…` gesichert, danach vollständiger Lauf nach `results/native-release.json`: **40/40 bestanden**.

## Bilder und Grenzen

Aktuelle Screenshotdateien `save-manager-375.png`, `save-manager-820.png`, `save-manager-1280.png`, `save-manager-landscape-812.png`. Erste Vorschauen wurden vor dem abschließenden Bildrefresh bytegenau aus ihrem Commit unter `initial-screenshots/` erhalten; `initial-screenshot-archive.json` ordnet die ursprünglichen im ersten Roh-JSON aufgezeichneten Pfade den archivierten Bildern zu. Auch die nachfolgenden 9aa7b7f-Screenshots sind vor dem letzten Refresh unter `before-name-provenance-fix/` bytegenau erhalten; `before-name-provenance-screenshots.json` ordnet sie den älteren Rohresultaten zu. Alle Roh-JSON-Dateien unverändert.

375×812 und 820×1180 sind Chromium-Touch-Emulation, 812×375 prüft zusätzlich Handyquerformat; 1280×900 wurde in normalen Desktopkontexten und im Größenvergleich verwendet. **Keine neue Safari-/Apple-Geräteprüfung.** Frühere Nutzerrückmeldungen zu Q1.09f werden nicht zu Q1.10a-Ergebnissen erklärt.

Der bekannte neutrale Handelskreis bleibt mit+1 globalem Ansehen/+1⁄6 Rufunterstützung offen; Sicherheiten und Kreditrahmen unverändert. Kein Q001-Abschluss behauptet. Technische Dokumentation unter [Q1_10a](../../../docs/entwicklungsberichte/Q1_10a/Q1_10a_gesamtbericht.md).
