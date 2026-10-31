# Q1.10a – Offene Probleme und klare Freigabegrenzen

31.10.2026 Europe/Berlin · `feature/q1-10a-multiple-savegames`.
Tatsächlich getesteter Code **`46d28dc04901dde0d137fa3dd8869ae11b17a982`**, SHA256 **`35187fa97fab81740dfad2f6fca580261e512f8309eb94e2b6a4912f014a29bb`**. Basis `c7201c089dbb8079c0b5a5e3e1728b5b0888f49e`. V13/Politik2/Sicherheit3, DB2/Bibliothek1.

## Implementiert und belegt

Neues Spiel, explizites Fortsetzen, fünf unabhängige Partien, Autosave, Umbenennen, bestätigtes Löschen, Einzelexport/-import und Sicherungswiederherstellung funktionieren im nativen Chromium-Test. Der vollständige letzte 40-Gruppen-Lauf besteht. Bekannte Zwischenfehler und deren Korrekturen sind im [Testbericht](Q1_10a_tests.md) erhalten. Kein noch offener Fehler der getesteten Kernabläufe wird verschwiegen.

## Echte Geräte und langlebige Speicherung

Neue Mehrpartienfassung noch nicht selbst unter Safari/WebKit oder echten iPhones/iPads geprüft. Frühere Nutzererfolge betrafen Q1.09f: iPhone Start/Speichern/Laden/Export/Import, iPad Start/Speichern/Laden. Diese Informationen sind übernommen und werden nicht als neue eigene Tests gezählt.

DB-Schema2 und gleichzeitige Tabs müssen vor Integration zusätzlich auf echten Apple-Geräten geprüft werden. Externe Exporte weiterhin behalten. Browser-/OS-Bereinigung, physischer Datenträgerfehler, langer Privatmodus und Offline-Kaltstart bleiben außerhalb der nachgewiesenen Abnahme. Keine neue Offline-/Service-Worker-Architektur.

## Rückwärtsnutzung, Grenzen und Namen

Ältere Q1.09c-Clients öffnen ausdrücklich DB-Version1 und können die Bibliothek2 nicht bearbeiten. Das ist ein Schutz gegen alte parallele Schreiber. Kein Downgrade durch Browserdatenlöschung; aktuelle Partien zunächst einzeln exportieren. Ältere LocalStorage-Clients nicht parallel weiterbespielen: es gibt keine über alte Softwarestände hinweg atomare Synchronisierung. Alte Rohquellen bleiben erhalten, werden nach Initialisierung aber nicht erneut als aktive Partie verwendet.

Fünf aktuelle Partieplätze je Browserprofil/Origin, keine geräte-/browserübergreifende Synchronisierung. Sicherungen von Importen/Löschungen bleiben zur Datenrettung erhalten und können bei sehr vielen Vorgängen Speicher beanspruchen; keine automatische Löschung historischer Originale. Quota-Fehler brechen sicher ab. Eine Rücksicherung braucht einen freien Platz.

Q1.09f-Marker `flags.q109fSynthetic` wird immer abgelehnt. Unmarkierte fremde Dateien mit klaren TEST-Kaufmannsnamen werden vorsorglich ebenfalls zurückgewiesen. Eigene Partien samt gültiger Exportmetadaten sowie reguläre gespeicherte Altquellen werden nicht allein wegen eines solchen Rufnamens unspielbar. Ein Metadaten-/TEST-Marker ist keine digitale Signatur; absichtlich manuell präparierte Dateien oder DevTools sind keine serverlos verhinderbaren Angriffe. Die reguläre App übernimmt keine Q1.09f-Speicherkennungen.

## Bekannte fachliche Altlast bleibt offen

Der neutrale Handelskreis verleiht weiterhin +1 globales Ansehen/+1⁄6 politische Rufunterstützung bei unveränderten Sicherheiten. **Nicht versehentlich behoben und kein uneingeschränkter Q001-Abschluss.** Politische Trennung, Kaufmannsgilde und die Schiffsanwesenheitsregel von Q1.10b sind nicht Bestandteil dieser Runde.

## Freigabe

Nur eigener Feature-Branch. Keine Pages-Veröffentlichung, keine Änderung der produktiven Q1.09f-Testdateien, kein Merge nach development/main, keine echte Nutzerdatei verändert und keine Folgeaufgabe begonnen. Freigabe/Integration und eine spätere echte Geräteabnahme liegen beim Nutzer.
