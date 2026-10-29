# Q1.02 – Gesamtbericht

29.10.2026. Branch `audit/q1-02-exploit-validation` direkt von erneut remote bestätigtem Entwicklungsstand **02ee6b8fc1507ad078b6b596c333e50d91eeea64**. Produkt0.8d.1b/V13, SHA256 `c8ad9d2ef453e0c80ae51dfef8a2d21f8e17dc4cad49bd583568cf0721cdd924`. Referenz [Q1.01](https://github.com/psonnen-lgtm/Hansef-rst/tree/d4cf42868a5347ec6e660f52faafb8132df5b209/docs/entwicklungsberichte/Q1_01). Keine Produktänderung oder Reparatur.

Prüfung: Node-VM lädt die Originalfunktionen aus der Hauptdatei; reine Anzeige-/Renderfunktionen und DOM-Eingaben sind ersetzt, Speicher ist eine isolierte Map, Bestätigungen werden angenommen. Originalvalidator prüft künstliche V13-Stände. RNG konstant0,5, keine Reise/Wirtschaftstage simuliert. Kein Browser-/Touch-/Persistenzfehlernachweis. Quellhash wird vor Ausführung geprüft. [Skript](Q1_02_probe.cjs), [vollständige Rohdaten](Q1_02_rohdaten.json). Befehl: `node Q1_02_probe.cjs /pfad/Hansefuerst_0_4.html /temp/results.json`. Node/Playwright wird für dieses Skript nicht benötigt außer Node selbst; keine zusätzlichen Pakete. Ausgabe nur in gesonderten Testpfad schreiben.


**Beide Fälle reproduziert.** Acht unabhängige Handelsfixtures und eine Ratsvereinbarungsprobe, maximal drei neutrale Kreise pro Fixture. Alle expliziten Assertions und Originalvalidierungen bestanden; keine Langzeitläufe.

Q001: Einfacher Kauf/Verkauf ohne Altware bleibt neutral. Gemischte Kosten erzeugen bei unveränderter Kasse/Menge höhere Restbuchwerte und Ruf. Drei Kreise: Buchwert+577,5/Ruf+1. Umladen allein neutral; gleicher Effekt über zweites Schiff möglich. Konkreter Grenzfall44920→45250 vergibt Ratsherr bei unverändertem Bargeld. Keine Goldvermehrung; legitime Gewinne und Verluste getrennt geprüft. [Handelsbericht](Q1_02_handelsexploit.md), [CSV](Q1_02_testfaelle.csv).

Q003: Zwei stationierte Schiffe erlauben Annahme, entfernte Bestätigung und Rückbericht mit einer neuen Urkunde bei0 Tagen/0 Kosten. Ursache ist gemeinsame Stadtvariable für Betrachtung und politische Aktion. Normalweg rechnerisch4 Tage/12 Gold. Weitere politische Ortsprüfungen statisch, nicht als dynamisch erfüllte Karriere ausgegeben. [Ortsbericht](Q1_02_politische_ortsbedingung.md).

Empfehlungen: eigentümerweiten Anerkennungsabgleich als erste Variante spezifizieren, alternative unabhängige politische Bewertung anhand bekannter Gegenfälle bewerten. Anzeige/Aktionsberechtigung trennen; persönliche Reise versus ausdrückliche Delegation noch entscheiden. [Varianten und Regressionen](Q1_02_loesungsvarianten.md).

Offen: Endgültigkeitsregel wirtschaftlicher Leistung, legitime Altgewinne, unbekannte Kosten, physische Anwesenheit/Delegation und kompatible Initialisierung alter Partien. Keine gesamten Ämterkarrieren, Browserprüfung oder Migration ausgeführt. Keine90-Stunden-Aussage.

Veröffentlichung nur neue Q1_02-Dateien und angehängter Berichtsindex. Q1.01 als fest verlinkte Referenz liegt auf eigenem Auditbranch, wird nicht in diese Entwicklungsbasis hineingemergt. Produktdatei, Nutzerstände, Pages, alte Forschung/Tests unverändert. Keine Reparatur, keine neue Mechanik, kein Merge. Alle Vorschläge benötigen Nutzerentscheidung.
