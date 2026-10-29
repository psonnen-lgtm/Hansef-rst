# Direkt verwendbare Dialogentwürfe und Bedienwege

30.10.2026 · **Entscheidungsreifer Konzeptvorschlag, keine Umsetzung und keine Spieltest-Abnahme.** Beschlossene Regeln bleiben unverändert. Neue Detailregeln dieses Dokuments benötigen Nutzerfreigabe. Referenz: Q1.07 `354361e51360c7d57a9b619813114c15380f06ee`.


Texte sind freizugebende Vorlagen; Platzhalter kommen nur aus bestätigtem Spielzustand. Keine erfundene Wirkung, kein zusätzlicher politischer Bonus.

| ID / Ort | Kurzer Text | Aktionen |
|---|---|---|
| G01 Gildenhaus nach Eintritt | „Willkommen an unserem Tisch. Eure Mitgliedschaft gilt in allen Hansestädten. Der Rat vergibt seine Plätze für gehaltene Zusagen.“ | Zum Rathaus / Weiterhandeln |
| A01 Rathausangebot | „Der Rat sucht einen verlässlichen Kaufmann. Liefert {Menge} Fass {Ware} aus fremder Herkunft. Haltet außerdem die Ratsvereinbarung mit {Partner}. Ihr könnt die Briefe einzeln übernehmen.“ | Brief wählen / Zurück |
| A02 Verpflichtung | „{Menge} Fass {Ware}, hier bis {Datum} verkaufen. Ein Verkauf muss die nötige Fremdmenge enthalten. Bereits vorhandene Fremdware zählt. Reisekosten tragt Ihr selbst.“ | Verbindlich zusagen / Zurück |
| A03 Erste Anerkennung | „Eure erste gehaltene Zusage ist beurkundet. Die Tat zählt hier in {Stadt}; gewöhnlicher Handel ersetzt keinen Ratsdienst.“ | Beleg ansehen / Zur Stadt |
| A04 Versorgung erfüllt | „{Menge} Fass {Ware} sind nachgewiesen. Die Zusage ist erfüllt. Ob die ganze Stadt wieder versorgt ist, zeigt der Markt.“ | Quittung / Weiterhandeln |
| A05 Ratszusage gescheitert | „Der Brief ist abgelaufen. Dafür gibt es keine neue Urkunde. Eure früheren Verdienste bleiben. Für das unerfüllte Erstmandat könnt Ihr einen neuen Versuch beantragen.“ | Neuer Versuch / Später |
| A06 Partner | „Der Rat von {Partner} bestätigt diesen Brief. Berichtet persönlich in {Stadt}, bevor die Frist endet.“ | Brief bestätigen / Zurück |
| A07 Ernennung | „Ihr habt Versorgung und Vereinbarung dieser Stadt gehalten. Nehmt Platz auf der Ratsbank.“ | Ernennung bestätigen / Noch nicht |
| A08 Kontor danach | „Der Rat zu {Stadt} hat Euch zum Ratsherrn ernannt. Eure Geschäfte bleiben auf eigene Rechnung.“ | Brief lesen / Schließen |
| B01 Bürgermeisterangebot | „Zwei Anliegen liegen vor: Fisch für die Versorgung, Pelze für das stockende Handwerk. Welche Zusage übernehmt Ihr zuerst?“ | Fisch zuerst / Pelze zuerst; zusätzlich Schließen ohne Wahl |
| B02 Auswahlbestätigung | „Ihr sagt {Menge} Fass {Ware} bis {Datum} zu. {AndereWare} bleibt zurückgestellt, nicht ebenfalls versprochen. Ein Klick allein erfüllt nichts.“ | Zusage bestätigen / Zurück |
| B03 Erfolg Rathaus | „Die gewählte Zusage ist belegt. {AndereGruppe} wartet noch auf eine Antwort. Der Rat vermerkt Eure Entscheidung, ohne eine zweite Leistung zu buchen.“ | Beleg / Zur Stadt |
| B04 Zurückgestellt, weiter knapp | „Wir wissen, wem Ihr zuerst geholfen habt. Unser Anliegen besteht noch. Eine neue Zusage liegt uns nicht vor.“ | Verstanden |
| B05 Zurückgestellt, entspannt | „Die Vorräte haben sich inzwischen erholt. Eure andere Zusage bleibt vermerkt; diese Entspannung ist kein zusätzlicher Verdienst.“ | Verstanden |
| S01 Badehaus | „Man erinnert sich an Eure Unterschrift. Im Rathaus könnt Ihr nachlesen, was Ihr tatsächlich zugesagt habt.“ | Verpflichtung ansehen / Zurück |
| S02 Gildenhaus | „Gehaltener Umfang, klare Worte. So entsteht Vertrauen – nicht durch einen zweiten Becher oder eine weitere Spende.“ | Schließen |

A05 nur für Erstmandat-A, niemals als kostenloser B1-Neuversuch anzeigen. A07 setzt die Prüfung voraus; fehlen Belege, stattdessen konkret „Versorgung fehlt“/„Rückbericht fehlt“. G01 erst nach gültiger Mitgliedschaft, nicht als automatische Aufnahme beim Lesen. S01 setzt keinen kostenpflichtigen Pflichtbadbesuch voraus; vorhandener Badeablauf bleibt optional und darf keine Zusage verkaufen.

## Bildschirme und Schaltflächen

Gilde: ein Hinweis, Eintritt als getrennte bewusste Aktion mit bestehend beschlossenem Testwert; keine Aufgabenliste für Aufnahme. Rathaus: erst Übersicht eines Falls mit Status, dann ein konkreter Brief. Oben Stadt, Ware/Menge/Frist, darunter eigene passende Ware und Verpflichtung/Risiko. Höchstens zwei primäre Alternativen, eine erreichbare Zurück-/Schließen-Aktion.

Markt: beim zugeordneten Ratsbrief Hinweis „Dieser Verkauf erfüllt {Tat}“ nur bei ausreichender gültiger Menge. Bei mehreren passenden Briefen vorher explizit **einen** auswählen; keine Mehrfachbeurkundung. Keine Popupkette nach jedem gewöhnlichen Verkauf. Erfolg als kurze Quittung mit zwei Links, Gesellschaftstexte später freiwillig im Gebäude lesen.

Kontor: aktuelle Zusage und letzter bestätigter Abschluss, kein neues Hauptmenü. Badehaus: höchstens ein kontextbezogener Satz mit Rathauslink, keine zweite Politikverwaltung. Lange technische Beleglisten freiwillig im vorhandenen Leistungsbuch.

iPhone/iPad/PC: gleiche Regeln; große berührbare Schaltflächen, Fokus/Tab/Escape und sichtbare Bestätigung, Frist nicht nur durch Farbe kennzeichnen. Nur Vorschau, keine tatsächlich geprüften Viewports. Rücksprung erhält Fallkontext. Betätigen von Zurück vor Bestätigung verändert nichts; nach verbindlicher Annahme ist Schließen kein Abbruch der Zusage.
