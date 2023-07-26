# RPTU TsWeb-Extension
## Allgemein
Fügt auf der Website der RPTU-Zeiterfassung eine automatische Berechnung folgender üblichen Arbeitszeiten hinzu.
- 08:45 Stunden (= 08:15 + 0:30 Pause)
- 08:18 Stunden (= 07:48 + 0:30 Pause)
- 06:00 Stunden (= 06:00 + 0:00 Pause)
- Bis jetzt (Automatische Pausenrechnung)

## Aussehen:
![](assets/preview.png)

## Installation
Download: https://github.com/JanHeist/RPTU_TsWeb-Extension/releases

### Chrome
1. Aufruf von [chrome://extensions/](chrome://extensions/)
2. Oben Rechts den "Entwicklermodus" aktivieren
3. Zip-Datei per Drag-and-Drop in das Fenster ziehen, Installation erfolgt automatisch

### Firefox
1. Eingabe von [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) in die Adressleiste
2. Klick auf "Temporäres Add-on laden"
3. Zip-Datei auswählen, Installation erfolgt
4. Eingabe von [about:addons](about:addons) in die Adressleiste
5. RPTU TsWeb-Extension auswählen
6. Tab Berechtigungen aufrufen
7. Berechtigungen erteilen für `https://zeiterfassung.verw.uni-kl.de` und `*://zeiterfassung.verw.uni-kl.de`

---

## Entwicklung
Der Quellcode ist auf GitHub hinterlegt: https://github.com/JanHeist/RPTU_TsWeb-Extension
<details>
<summary>Entwickler einblenden</summary>

- Jan Heist
  - GitHub: JanHeist
  - E-Mail: rptu-extension@janheist.dev
  - Web: https://JanHeist.dev

</details>

## Lizenz
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />Dieses Werk ist lizenziert unter einer <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 4.0 International Lizenz</a>.
