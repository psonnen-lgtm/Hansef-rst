# Q1.09e – Minimales Netlify-Testpaket

30.10.2026 Europe/Berlin. **Bereitstellung vorbereitet – Anmeldung erforderlich.** Die Veröffentlichung ist vom Nutzer freigegeben; diese Umgebung besitzt aber keine Netlify-Verbindung, CLI oder Anmeldung. App/API/Dokumentation antworten über den Netzwerkproxy mit HTTP403. Nichts veröffentlicht; keine bestehende Site geändert.

Basis `ebad74f02307d596cdaa4f05b02142626d9041d9`. Unveränderter Q1.09c-Spielcode `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; SHA256 `50ea83dcb034613ab3c89410cddf0d6328c19fd1218c33130f31798aea4e3048`.

## Paket lokal erzeugen – kein Deployment

Mit vorhandenem Python3 aus dem Repository:

```sh
python deployment/q1_09e/build-package.py --output build/q1_09e-netlify-test
```

Neues Ziel verwenden; bestehende Ordner werden nie überschrieben. Nur fünf statische Dateien werden in `site/` kopiert: unveränderte Spiel-HTML, Startseite, Apple-Kurzanleitung, unverändertes synthetisches Q1.09d-ZIP und leere Ergebnismatrix. Dazu entstehen **außerhalb** von `site/` ein lokales Upload-ZIP und ein Prüfmanifest. Nur den Inhalt von `site/` beziehungsweise dessen ZIP veröffentlichen, nicht das Repository oder den ganzen Buildordner. Der Builder braucht weder Netz noch Netlify, startet keinen Server und veröffentlicht nichts.

Das lokal erzeugte Upload-ZIP umfasst 35.006.557 Bytes; die entpackte einzelne Spieldatei weiterhin 46.389.124 Bytes. ZIP-Kompression umgeht kein Anbieter-Einzeldateilimit. Große generierte Spielkopien/Archive bleiben unter dem bereits ignorierten `build/`; sie werden nicht nochmals ins Git-Repository geschrieben. Alle notwendigen Quellen und Prüfsummen liegen im Branch.

`evidence/package-manifest.json` bestätigt exakte Quelldateien/Kopien, ZIP-Inhalte, acht lokale Vorlagenlinks und 42 weiterhin ungetestete Gerätezeilen. Keine Online- oder Apple-Abnahme daraus ableiten. Die zusätzlichen statischen Seiten sind nur Begleitunterlagen; die eigentliche Spiel-HTML bleibt bytegleich. Sichtbare Testkennzeichnung auf der Startseite, nominale alte Versionsanzeige im unveränderten Spiel erklärt.

## Noch notwendiger Zugang

- Netlify unter <https://app.netlify.com/> im Nutzerkonto anmelden; Free-Team/Tarif, verbleibendes Guthaben, Einzeldateilimit und deaktivierte automatische kostenpflichtige Aufladung bestätigen.
- Für einen agentengeführten Deploy braucht **diese bereitstellende Umgebung** eine autorisierte Verbindung oder eine installierte CLI mit Browseranmeldung (`netlify login`). Eine Anmeldung nur auf dem privaten PC autorisiert diese Sitzung nicht. Passwörter oder Tokens niemals im Chat, Repository oder Protokoll hinterlegen.
- Zusätzlich muss die Umgebung Netlify-App/API erreichen können; aktuelle HTTP403-Proxyblockade ist keine bloße abgelaufene Anmeldung und wird durch ein Token nicht behoben. Keine Umgehung versucht.
- Alternativ nach Tarifprüfung im eigenen Browser eine **neue** Site über die manuelle Bereitstellung anlegen und das geprüfte Paket hochladen. Keine bestehende Site wählen, keine Git-Integration oder kostenpflichtige Option einschalten. Die Website ist bereits freigegeben; es wird keine erneute Veröffentlichungsentscheidung verlangt.

Nach tatsächlichem Deploy: neue konkrete HTTPS-Origin/Deployment-ID sichern, HTML vollständig zurückladen und Hash prüfen, dann Online-Chromium-Abnahme und erst anschließend Apple-Gerätetests. Hier noch nicht durchgeführt. [Deploymentbericht](../../docs/entwicklungsberichte/Q1_09e/Q1_09e_deployment.md).
