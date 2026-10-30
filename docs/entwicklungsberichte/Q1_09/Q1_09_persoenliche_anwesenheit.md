# Q1.09 – Persönlicher Ort statt Schiffshafen-Teleport

30.10.2026 Europe/Berlin · Branch `fix/q1-09-safety-foundation` · Basis `02ee6b8fc1507ad078b6b596c333e50d91eeea64`. Tatsächlich getesteter Spiel-/Teststand **`15c2e3792d855afcddf26ba0572d6317504d8b46`**, Produktdatei `Hansefuerst_0_4.html`, SHA 256 **`dd17d5fb6bbf2126652f93ede24add5528a0f2829c67ed20cd7a0a25e9aaaa95`**. Nominale Spielversion weiterhin 0.8d.1b; Root-V13 mit minimaler Politik-Unterrevision 2/Sicherheit 1. Keine neue Karriere oder Wirtschaftsregel aktiviert.


## Drei unterschiedliche Orte

|Bedeutung|Quelle|Was darf ändern?|
|---|---|---|
|Betrachteter Hafen|`s.city`|Kostenlose Schiffsauswahl/Ansicht wie bisher|
|Schiffshafen|`ships[i].city`|Tatsächlich bestätigte Fahrt der teilnehmenden Schiffe|
|Persönlicher Ort|`politics.safety.person`|Echter Neustart, kontrollierter einmaliger Altanker, erfolgreiche persönliche Ankunft|

Rathaus/Kontor/Sicherung zeigen Ansicht und Person getrennt. Fernansicht und Fernhandel eigener Schiffe bleiben erhalten. Ein Schiffsklick ist keine persönliche Reise oder Urkunde.

## Persönliche Prüfpunkte

|Vorgang|Guard und technische Bedeutung|
|---|---|
|Ratsbrief annehmen|Person muss in der Antragsstadt sein|
|Vertragsvorsprache|Person muss tatsächlich im Partnerort sein; fehlende alte Station nicht durch Altanker erfüllen|
|Ratsrückbericht|Person am tatsächlichen Heimat-/Briefort|
|Rang-/Bürgermeisterantrag|Person in der Stadt; übrige alte Voraussetzungen unverändert|
|Amtsniederlegung|Person am Amtsort; automatisches Amtsende bleibt ein Kalendervorgang|
|Siegelantrag|Person am jeweiligen Ort, vorhandene lokale Belege erforderlich|
|Hansevertrag annehmen/abschließen|Person am tatsächlichen Amts-/Heimatort|
|Auswärtige Hansevorsprache|Person im jeweiligen unterstützenden Ort, einmalige Stationsliste|
|Hanseversammlung|Person in der Heimat, vorhandene Qualitätsnachweise bleiben erforderlich|
|Warenbasierte Versorgung|Weiterhin fremde Herkunft/Verkauf am richtigen Ziel; Lieferung wird nicht als persönliche Vorsprache umgedeutet|
|Ansichten/Bank/Lager/Handel|Örtliche Schiff-/Warenbedingungen wie bisher; kein Personenbeleg abgeleitet|
|Automatischer Tages-/Amtsablauf|Daten-/Fristfortschritt, keine erfundene persönliche Anwesenheit|

Prüfungen stehen in mutierenden Funktionen, nicht nur auf ausgegrauten Buttons. Bürgermeister-/Hansequoten erklären zusätzlich fehlende Anwesenheit. Textuelles Gesamtinventar aller Stadtverbraucher wird abschließend gesichert; kein vollständiger AST-/Fälschungssicherheitsnachweis behauptet.

## Persönliche Fahrt und atomare Ankunft

Vorbereitung beginnt nur im tatsächlichen Personenhafen und bindet die aktuelle Sicherheitsrevision. Erst „Weitersegeln“ mit passendem Ausgangsort, echten Teilnehmern und unverändertem Stand kann Tage/Gebühren/Schäden/Schiffe/Person gemeinsam aktualisieren. Abgebrochene oder veraltete Vorbereitung bewegt niemanden. Schreibfehler nimmt auch `pending.arrived` und Person zurück; keine kostenlose nächste Ankunft.

Vorhandene Konvoi-/Gebühren-/Schadensregeln unverändert. Eine zusätzliche Integration bestätigt: Wird während der Fahrt ein Neubau fertig, kommt das teilnehmende Schiff an, während der Neubau im eigenen Bauhafen bleibt. Die vorhandene Referenzerhaltung im Werftcode blieb erhalten; dafür keine spekulative neue Reiseregel eingebaut.

**Unbegleitete Fernfahrt bleibt offen:** Ein Reisebefehl aus einem Hafen, in dem die Person nicht ist, wird derzeit sicher abgewiesen. Keine neue Fernreiseautomatik oder Delegation erfunden. Bei ausdrücklicher späterer Freigabe müsste eine unbegleitete Fahrt getrennt gekennzeichnet und getestet werden; sie dürfte die Person niemals mitversetzen. Die reine Ansicht/Verwaltung ist weiterhin möglich.

## V13 ohne Personenhistorie

Alte V13 enthält keinen beweisbaren Personenort. Deshalb zunächst `{city:null, source:'unknown', at:null}`. Im bestehenden Sicherungsdialog kann einmal der gültige Hafen eines eigenen Schiffs als **informierter Übergangsanker** bestätigt werden. Zeitpunkt ist Initialisierung, keine behauptete alte Ankunft.

Neue Partien bekommen den gewählten Startort mit `new_start`. Echte Ankunft bekommt `arrival`. Eine bestätigte Altverankerung kann nicht einfach erneut durch Schiffsklick/Reload erfolgen. Ein erneuter Import der kompletten ursprünglichen Offline-Partie ist dagegen eine historische Wiederherstellung; kein universeller Anti-Rollback-Schutz versprochen.

IDs alter noch fehlender persönlicher Vertragsstationen werden begrenzt als `legacyPersonalJobs` erhalten. Ein Altanker erfüllt diese Station nicht; eine tatsächliche Ankunft ist nötig. Bereits vorhandene `witnessed`-/`visited`-Fortschritte und alle Fristen bleiben erhalten. Ein legitimer alter bereits bestätigter Brief darf am richtigen persönlichen Rückberichtsort fertiggestellt werden.

Knappe alte Fristen können mit erstmals wirksamer persönlicher Reise kollidieren. Keine eigenmächtige Verlängerung oder rückwirkende Reiseleistung. Eine einmalige gezielte Schonung ist daher gegebenenfalls noch zu entscheiden. Titel/Ämter/Urkunden werden dadurch nicht entzogen.


[Gesamtbericht](Q1_09_gesamtbericht.md) · [Regressionen](Q1_09_regressionstests.md) · [Offene Entscheidungen](Q1_09_offene_entscheidungen.md)
