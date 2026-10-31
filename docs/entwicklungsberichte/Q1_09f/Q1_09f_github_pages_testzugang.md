# Q1.09f – Vorgeschlagener GitHub-Pages-Testzugang

31.10.2026 Europe/Berlin · Branch `test/q1-09f-github-isolated`.
Unveränderte Quellversion `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`; getestete separate Kopie **`393006ff89f5945a501e3df79c891907721682cb`**, SHA256 **`8287b7e266de64906063ee9b0b5f5ceb9a7e1fbd78bce62ca08356e671797682`**. V13/Politik2/Sicherheit3, keine wirtschaftliche oder politische Erweiterung.

## Einfachster Weg unter den neuen Vorgaben

Vorhandenes GitHub-Konto und vorhandene Pages-Site behalten. Den vorbereiteten Testordner **zusätzlich** unter einem neuen Pfad bereitstellen, mit programmgesteuert getrennten Speicherkennungen. Kein zusätzlicher Anbieter, Account, Domainkauf oder fremder Build-Service. Ein zweites Repository desselben Besitzers würde keine andere Pages-Origin liefern und erspart die Speichertrennung deshalb nicht.

Vorgeschlagene Adresse, **noch nicht veröffentlicht und kein zugesagter funktionierender Link**:

`https://psonnen-lgtm.github.io/Hansef-rst/qa/q1-09f/`

Direkte Testdatei darunter: `Hansefuerst_TEST_Q1_09f.html`. Die tatsächliche Basisadresse und eventuelle Custom-Domain-Weiterleitungen sind vor Veröffentlichung in den bestehenden Pages-Einstellungen zu prüfen. Ein anderer Pfad erzeugt keine Origin-Sicherheitsgrenze; [Speicherisolation und Restrisiken](Q1_09f_speicherisolation.md).

## Bestehende Veröffentlichungsstruktur tatsächlich untersucht

- Aktueller main-Commit auf GitHub: `c1280228951d581c7b3131279b8ff164a8e36dfa`. Baum enthält `Hansefuerst_0_2.html`, `Hansefuerst_0_3.html`, `Hansefuerst_Spiel.html`, `README.MD`; kein `index.html`, kein `docs/index.html`, keine `.github`-Workflows und kein Deploymentordner in diesem Commit.
- Aktueller Entwicklungsref: `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Enthält vorbereitete `deployment/phase08b/`-Dateien und eine **inaktive** Workflow-Beispieldatei außerhalb `.github/workflows`. Eine Vorlage beweist keine aktive Pages-Konfiguration.
- Remote-Abfrage ergab keinen `gh-pages`-Branch. Das beweist nicht, dass Pages ausgeschaltet ist; auch andere Quellen beziehungsweise Actions sind möglich.
- Pages-Einstellungen per anonymem HTTPS **und** `gh api repos/psonnen-lgtm/Hansef-rst/pages` angefragt: HTTP403/Forbidden. Auch die dokumentierte Pages-Adresse und offizielle Limits-Dokumentation sind aus dieser Umgebung blockiert. [Abrufbelege](../../../tests/safety/q1_09f/results/pages-access.json).

Daher **Veröffentlichungszweig, Ordner, Buildtyp und tatsächlicher Live-Dateibestand nicht bestätigt**. Keine Vermutung als Einstellung ausgegeben. Keine Quelle umgestellt und keine Live-Datei angefasst. Der Testbranch allein liefert keinen Safari-Spielzugang.

## Größe und Kosten

Separate Test-HTML **46.390.644 Bytes ≈ 44,24 MiB**. Die vollständige Grafik ist eingebettet; keine zusätzlichen Assetpakete nötig. Vier vorgesehene Dateien in [deployment/q1_09f/site](../../../deployment/q1_09f/README.md): Test-HTML, Startseite, synthetisches ZIP, CSV. Nicht den gesamten großen Forschungs-/Simulationsbestand des Repository deployen.

Bekannte reguläre GitHub-Grenzen sind 100 MiB für eine einzelne Git-Datei und etwa 1 GB für eine veröffentlichte Pages-Site. Die neue Datei liegt darunter; das Pushen auf den GitHub-Arbeitsbranch bestätigt ihre Aufnahme ins Repository. **Das beweist noch keine Pages-Auslieferung.** Aktuelle Pages-Limits, verbleibende Gesamtgröße des vorhandenen Auftritts, Bandbreite/Buildkontingente und Kontotarif konnten wegen gesperrter Dokumentation/Einstellungen nicht aktuell bestätigt werden. Standard-Pages für ein öffentliches Repository ist normalerweise ohne Zusatzkosten möglich; keinen kostenpflichtigen Tarif/Enterprise-Zusatz einschalten. Freigabe nur innerhalb des vorhandenen kostenlosen Angebots.

## Vor einer gesondert genehmigten Veröffentlichung

1. Besitzer prüft im bestehenden Repository **Settings → Pages**: aktuelle Quelle, Zweig/Ordner oder Actions, echte Basisadresse/Custom Domain und Tarif. Kein Quellenwechsel auf diesen Featurebranch.
2. Den aktuellen **gesamten** veröffentlichten Dateibestand mit Prüfsummen sichern. Ein Deployment nur des Testordners könnte die produktive Site ersetzen und ist ausdrücklich unzulässig.
3. Prüfen, ob `qa/q1-09f/` frei ist und die vier Dateien ergänzend durch den bisherigen Build-/Veröffentlichungsweg aufgenommen werden können. Produktive Startseite, Dateibytes und Pfade bleiben exakt erhalten. Keine rootweite `.nojekyll`-, Redirect-, Service-Worker- oder Workflow-Änderung im Auftrag.
4. Wenn die bestehende Branch-Publikation nur durch einen zusätzlichen Commit auf diesem Publikationsbranch erweitert werden kann, ist genau dieser Weg erst gesondert freizugeben. In diesem Auftrag kein Commit auf main/Entwicklung, kein Merge und keine Source-Umstellung. Bei fehlendem zulässigem Weg die Blockade melden, nicht eigenmächtig ein Ersatzdeployment starten.
5. Nach der ausdrücklichen Veröffentlichungserlaubnis ausschließlich die vier vorbereiteten Testdateien ergänzen. Keine echten Dateien, Berichte, `.git` oder lokalen Backups veröffentlichen. Keine automatischen Deployments neu aktivieren.
6. Danach tatsächliche HTTPS-Datei vollständig herunterladen; Testhash, Kennzeichnung, separate Speicherkennungen und erhaltene produktive Dateihashes kontrollieren. Erst dann „Testzugang erreichbar“ melden. Browserkontext auf derselben tatsächlichen Origin erneut prüfen; keine Browserdaten löschen. Vorhandene fremde gleichursprüngliche Skripte/Service Worker können ein zusätzliches Restrisiko sein.
7. Erst danach echte iPhone-/iPad-Abnahme mit künstlichen Partien. Die bestehende Q1.09d-Anleitung verwenden, jedoch neue TEST-Exportnamen und die strengere Eingangsprüfung beachten. Gerätefälle bleiben vorher „Nicht getestet“.

Die sichere Ergänzbarkeit unter der **tatsächlichen** aktuellen Pages-Konfiguration ist somit noch offen. Speichertrennung und lokale Browserfunktion sind nachgewiesen; öffentliche Erreichbarkeit und Apple-Kompatibilität sind nicht nachgewiesen. Keine Netlify-Nutzung, keine Registrierung, kein Merge und kein Deployment vorgenommen.
