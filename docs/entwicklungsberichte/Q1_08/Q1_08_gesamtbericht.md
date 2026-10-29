# Q1.08 – Erste politische Spielszenen zur Freigabe vorbereitet

30.10.2026 · **Konzeptabschluss, keine technische Implementierung oder Spieltest-Abnahme.** Branch `design/q1-08-political-vertical-slice`, direkt vom erneut remote bestätigten Entwicklungsstand **02ee6b8fc1507ad078b6b596c333e50d91eeea64**. Produkt0.8d.1b/V13 und Hauptdatei-Blob `7cf4c90244e4afef6d762a5e73ebf9d6bd9bfaa8` erneut bestätigt. Historische Auditbranches nicht als neue Produktfunktion eingeordnet oder hineingemergt.

## Was jetzt konkret vorliegt

| Teil | Fest ausgearbeiteter Vorschlag | Noch nötige Freigabe |
|---|---|---|
| Szene A | Persönliche Erststadtwahl, zwei getrennt annehmbare Briefe, Herkunftsverkauf, persönliche Partnerbestätigung/Rückbericht, bewusste Ernennung; Erfolg und Fehlschlag | Ratsherr durch beide Tatarten, Erstmandat-/Wiederholregel |
| Szene B1 | Bestätigte doppelte Versorgungslage, zwei Prioritäten, verbindlicher ausgewählter Lieferbrief, sichtbare zurückgestellte Interessen | Konservativer Auslöser und einmaliger Lübecker Pilot |
| Modell C | Eindeutige Tatbelege, abgeleitete Zusagen, konkrete Rechnung40/40/20, erklärte Mehrkomponentenwirkung | Binnenrechnung/konkrete Zusageschwellen, kein zusätzliches Kalenderminimum |
| Anlasslogik | Angeboten/aktiv/Teilnachweis/erfüllt/gescheitert/abgeschlossen, A-Versuche unter gleicher Root-ID | Details gemäß Entscheidungsvorlage |
| Dialoge | Vier Gebäudekontexte, kurze Texte mit passenden Aktionen, Quittungen ohne Zusatzbonus | Redaktion und späterer UI-Spieltest |
| Sicherheit | Q-001/Q-002/Q-003 und V13-Abnahmekriterien, keine Reparatur | Gesonderter technischer Auftrag vor Freigabe eines spielbaren Builds |

## 1. Ratsherr: kleine Geschichte mit zweiter Chance

Ein Gildenhinweis führt zu einem verlässlichen ersten Ratsmandat, nicht zu einer neuen Aufnahmeaufgabe. Der Spieler wählt persönlich die erste Ratsstadt und übernimmt Versorgung und Vereinbarung einzeln. Er kann vorhandene nachweisbare Fremdware, jedes geeignete örtliche eigene Schiff und sein Lager nutzen; keine künstliche Zusatzreise. Regulärer Handel schafft Geld, aber keine politischen Punkte.

Erfüllung erzeugt je Tat einen eindeutigen Beleg. Nach beiden Arten derselben Stadt schlägt das Konzept den bewussten Ratsherr-Antrag vor, ohne Vermögens-/Rufschwelle oder weiteren Punktetest. Rückschlag: ein Brief verfällt, die andere Urkunde bleibt. Das unerfüllte Erstmandat kann bewusst erneut versucht werden, mit gleicher Root-ID/Ware/Partner und neuem Versuch nach bestehender Fristlogik. Kein Reset eines aktiven Briefs und keine zweite Anerkennung einer schon erfüllten Tat. So entsteht keine Dauersperre nach einer schlechten Anfangsentscheidung.

**Bewertung:** klare unterschiedliche Kompetenzen und niedrige Wiederholungslast. Kann bei guter Vorbereitung rasch erreichbar sein; das ist nicht mit unbelegten Wartezeiten zu verlängern. Der Ratsherr ist ein Zwischenziel, nicht schon die gesicherte Bürgermeistermehrheit. [Vollständiger Spielablauf A](Q1_08_ratsherr_spielablauf.md).

## 2. Bürgermeister: Fisch oder Pelze

Pilot Lübeck, örtliches aktives Amt, zwei sauber belegte Versorgungsanliegen. Bestand an abgeschlossenen natürlichen Tagesupdates beobachten, bestehende Knappheitsbänder als politische Prüfgrundlage vorschlagen; keine neue Preis-/Produktionszahl. Zwei aufeinanderfolgende Beobachtungen und keine eigene Entnahme im relevanten Bedarfsabschnitt. Fehlende Historie oder selbst erzeugter Mangel berechtigen nicht zur Krisenanerkennung. Diese konservative Filterregel ist nicht bereits implementiert und kann auch legitimen Einkauf vom konkreten Anlass ausschließen.

Der Spieler sieht datierte Ursache und aktuelle Lage getrennt, wählt Fisch oder Pelze und bestätigt die konkrete Lieferpflicht. Keine Anerkennung durch Klicken. Erst regulärer Fremdwarenverkauf erfüllt die begrenzte Zusage. Vorhandene Ware zulässig; keine Pflicht zu Fernfahrt oder frischem Einkauf. Die andere Ware bleibt als zurückgestelltes Anliegen, nicht als zweite automatisch versprochene Aufgabe. Dialog aktualisiert, ob sie später weiter knapp oder inzwischen erholt ist. Keine gefälschte Aussage „Stadt gerettet“, wenn nur eine kleine Liefermenge erbracht wurde.

B1 im Pilot nur einmal je Stadt/Partie, kein neues Angebot bei erneutem Amt oder Marktflattern. Bei Scheitern keine neue Anerkennung und kein Neustart mit billigerer Alternative. Andere Dienste bleiben offen; B1 ist keine einzige zwingende Bewährungsquelle. [Vollständiger Spielablauf B1](Q1_08_buergermeister_spielablauf.md).

## 3. Eindeutige Anerkennung bei gewollter Korrelation

Beschlossen C40D/40Z/20A; folgende Binnenrechnung ausdrücklich zur Entscheidung:

D=min(40,5×(S+V)); Z=10 je erfüllter der vier begründeten Zusagen, maximal40; A=(20/3)×min(V,3). S/V sind eindeutige örtliche Versorgung/Vereinbarung. Zusagen: S≥2, S≥3, V≥2 und insgesamt sechs Taten/beide Arten. Wegfall der bisherigen zusätzlichen Drei-Abschnittsbedingung bei der vierten Zusage ist Teil dieses noch offenen Vorschlags. Keine neue vierte Währung und keine neue Goldschwelle.

S1/V1 ergibt10+0+6⅔=16⅔. S3/V3 ergibt30+40+20=90. Das sind erläuterte Zahlen, keine simulierten Wahlen oder gemessenen Karrierezeiten. Dass eine Vereinbarung Dienst und Vereinbarungskomponente trägt, ist **bewusste C-Gewichtung**. Unzulässig ist ein zweiter Beleg oder Zusatzbonus für denselben Abschluss. Dank/Ernennung/Empfang sind Rückmeldung, keine weitere Tat. Dieselbe Warenabgabe wird explizit genau einem politischen Brief zugeordnet, nicht gleichzeitig A und B1.

Sprunghafte Zusagen und bevorzugte Mischungen bleiben Balancerisiken. IDs allein lösen diese Korrelation nicht; Anzeige muss Ursprung und Wirkung zeigen. [Rechnung und Beispiele](Q1_08_modell_c_anerkennung.md).

## 4. Gelegenheiten und Bedienung

A ist verlässlicher einmaliger Einstieg mit erneuter Chance für **noch nicht erfüllte** Verpflichtung. B1 ist ein einmaliger zustandsgebundener Pilot. Neue unabhängige Verdienste brauchen neue Ursachen; Öffnen, Tageswechsel, Rückverkauf oder umbenannter Brief sind keine. Ein vollständiger Ersatz aller alten periodischen Angebote ist nicht nebenbei freigegeben oder bereits entworfen. [Zustandsmodell](Q1_08_politische_anlaesse.md).

Rathaus ist Handlungsort, Gilde gibt einen Hinweis/gesellschaftliche Reaktion, Kontor erinnert an Verpflichtung/Beleg, Badehaus kommentiert freiwillig. Keine zusätzlichen Hauptmenüs. Vor Bestätigung Ware/Menge/Frist/Fremdherkunft/Risiko; nach Abschluss kurze Quittung. Ein ausreichender einzelner Verkauf nutzt zunächst vorhandene Lieferprüfung; neue kumulierte Abgabenmaschine nicht unterstellen. Zwei Wahlkarten plus Schließen, Details ausklappbar, gleiche Regeln für Telefon/Tablet/PC. Keine tatsächlich ausgeführten Gerätetests. [Dialoge und Klickwege](Q1_08_dialoge_und_bedienung.md).

## 5. Voraussetzungen ohne Reparaturfreigabe

Q-001 darf weder politischen Zugang noch Kreditsicherheiten über Buchwertkreise verfälschen. Der Wegfall politischer Vermögenshürden allein sichert Kreditrahmen nicht. Q-003 ist jetzt fachlich entschieden: **persönliche Vorsprache erfordert tatsächliche Anwesenheit**, kostenlose Fernansicht bleibt. Die frühere offene Delegationsoption aus Q1.07 wird nicht erneut zur Entscheidung gestellt. Q-002 verlangt atomare konsistente Speicherung und echte Mehrfenster-/Revisionsabsicherung; eine Prüfung ohne geschützten Commit ist keine vollständige Lösung.

V13-Titel, Ämter, Urkunden, Ware/Kosten, Kredite, Flotte/Lager und laufende Verpflichtungen bleiben geschützt. Alte Personenhistorie nicht erfinden. Neue Daten-/Regelfassung mit Originalbackup erst in einem späteren Auftrag ausarbeiten. Keine Migration durchgeführt. [Technische Voraussetzungen und geplante Abnahmefälle](Q1_08_technische_voraussetzungen.md).

## 6. Kleinster sinnvoller Umfang und acht offene Entscheidungen

Empfehlung: erst sichere Karriere-/Gildenbasis und die bekannten Sicherheitsvoraussetzungen, dann A vollständig mit Erfolg/Fehlschlag/Wiederantrag und kurzen Textreaktionen. B1 nur als ein sauber nachgewiesener Fall nachziehen. Kein B2-Auskunftsvertrag, keine neue Eldermannverhandlung, Händler-KI, Kampf-/Stadthaushaltsengine. Wenn saubere Bedarfsattribution zu groß wird, B1 nicht fälschlich als echte Krise ausliefern; A bleibt separat prüfbar.

Die [Entscheidungsvorlage](Q1_08_entscheidungsvorlage.md) enthält genau acht Detailfragen mit bevorzugter Lösung. Keine bereits beschlossene Grundregel erneut zur Abstimmung. Die beiden Szenen sind ein kleiner Ausschnitt, kein Nachweis90 aktiver Stunden. Spaßurteile bleiben Hypothesen; Rückschläge, Kontextverständnis und Wiederholungen erst später mit Menschen prüfen.

## Quellen und Sicherungsgrenzen

Erneut gelesen: [Q1.03 Gesamtbericht](https://github.com/psonnen-lgtm/Hansef-rst/blob/15df03c02d6c3af3fdb9c8f24052f038885c2bb1/docs/entwicklungsberichte/Q1_03/Q1_03_gesamtbericht.md), [Q1.04](https://github.com/psonnen-lgtm/Hansef-rst/blob/e403e43e1488cd9930b5ff2ae8b7fe0184ff4d36/docs/entwicklungsberichte/Q1_04/Q1_04_gesamtbericht.md), [Q1.05](https://github.com/psonnen-lgtm/Hansef-rst/blob/de4ae6b04268edc4292dfa07d37ca7680ebef4f8/docs/entwicklungsberichte/Q1_05/Q1_05_gesamtbericht.md), [Q1.06 Modelle](https://github.com/psonnen-lgtm/Hansef-rst/blob/193e1d205181c608f40979902e5e9016fe12dd74/docs/entwicklungsberichte/Q1_06/Q1_06_unterstuetzungsmodelle.md) und [Bestandsschutz](https://github.com/psonnen-lgtm/Hansef-rst/blob/193e1d205181c608f40979902e5e9016fe12dd74/docs/entwicklungsberichte/Q1_06/Q1_06_bestandsschutz_und_exploits.md), [Q1.07 Szenen und Gelegenheiten](https://github.com/psonnen-lgtm/Hansef-rst/tree/354361e51360c7d57a9b619813114c15380f06ee/docs/entwicklungsberichte/Q1_07). Spätere explizite Nutzerentscheidungen sind maßgeblich.

Acht Markdown-Dateien und angehängter Berichtsindex. Alle veröffentlichten Dateien werden exakt von GitHub zurückgelesen, Differenz zur Basis auf Dokumentation begrenzt. Lokale Dokumenterstellung/Verweisprüfung ist keine Produktsimulation. Keine Spielprogrammierung, Wirtschaftsänderung, Gilden-/Politikimplementierung, Fehlerbehebung, Migration, echte Saveänderung, Pages-Änderung, neue Originalforschung oder Zusammenführung. Keine automatische Folgephase.
