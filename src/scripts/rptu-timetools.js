const prefix = 'timetools-'; // Prefix für die Document-ID's

// Template = Ausgabe-Vorlage
const template = `
<div>
    <br/>
    <table class="tsgrid" style="width: 500px; border-collapse: collapse; font-size: large;">
        <thead>
            <tr>
                <th style="width: 50%;">Zeit vor Ort</th>
                <th>Zeiterfassung</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>08:45 <small>(08:15 + 0:30 Pause)</small></td>
                <td>Bis <span id="` + prefix + `0845"></span> Uhr</td>
            </tr>
            <tr>
                <td>08:18 <small>(07:48 + 0:30 Pause)</small></td>
                <td>Bis <span id="` + prefix + `0818"></span> Uhr</td>
            </tr>
            <tr>
                <td>06:00 <small>(06:00 + 0:00 Pause)</small></td>
                <td>Bis <span id="` + prefix + `0600"></span> Uhr</td>
            </tr>
            <tr>
                <td>Bis Jetzt</td>
                <td>+ <span id="` + prefix + `now"></span> Stunden</td>
            </tr>
        </tbody>
    </table>
</div>`;

/**
 * Führende Nullen hinzufügen
 */
function leadingZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Date formatieren
 */
function formatTime(date) {
    return leadingZero(date.getHours()) + ':' + leadingZero(date.getMinutes());
}

/**
 * Berechnen der Zeit bis jetzt
 */
function calculateNow(startTime, today) {
    // Aktuelle Zeit und Differenz ermitteln
    let _now = new Date();
    let startDate = new Date(today + startTime);
    _now = new Date(new Date(today + "00:00").setMinutes((_now.getTime() - startDate.getTime()) / 36e5 * 60));

    // Pausen berechnen
    if (_now.getHours() == 6) {
        _now.setMinutes(_now.getMinutes() - Math.min(30, _now.getMinutes()));
    } else if (_now.getHours() > 9) {
        _now.setMinutes(_now.getMinutes() - 45);
    } else if (_now.getHours() >= 6) {
        _now.setMinutes(_now.getMinutes() - 30);
    }

    // Formatieren und ausgeben
    _now = formatTime(_now);
    document.querySelector('#' + prefix + 'now').textContent = _now;
}

/**
 * Berechnen und ausgeben der Zeiten
 */
function calculateTime(startTime, today) {
    // 08:45
    let _0845 = new Date(today + startTime);
    _0845.setHours(_0845.getHours() + 8);
    _0845.setMinutes(_0845.getMinutes() + 45);
    _0845 = formatTime(_0845);

    // 08:18
    let _0818 = new Date(today + startTime);
    _0818.setHours(_0818.getHours() + 8);
    _0818.setMinutes(_0818.getMinutes() + 18);
    _0818 = formatTime(_0818);

    // 06:00
    let _0600 = new Date(today + startTime);
    _0600.setHours(_0600.getHours() + 6);
    _0600 = formatTime(_0600);

    // Ermittelte Daten ausgeben
    document.querySelector('#' + prefix + '0845').textContent = _0845;
    document.querySelector('#' + prefix + '0818').textContent = _0818;
    document.querySelector('#' + prefix + '0600').textContent = _0600;

    // Zeit bis jetzt berechnen
    calculateNow(startTime, today);
}

// region main
const dataTable = document.querySelector('#ContentPlaceHolder1_GVBuchungen_Label1_0');
if (dataTable) {
    // Neues Element anlegen
    let templateHTML = document.createElement('div');
    templateHTML.id = prefix + 'calulatedTime';
    templateHTML.innerHTML = template;

    // Neues Element einfügen
    const parentElem = document.querySelector('#ContentPlaceHolder1_GVBuchungen').parentElement;
    parentElem.append(templateHTML);

    // Zeit ermitteln
    let startTime = document.querySelector('#ContentPlaceHolder1_GVBuchungen_Label1_0').innerText;
    if (startTime) {
        // Parsen und formatieren heutiger Tag
        let today = new Date();
        let day = leadingZero(today.getDate());
        let month = leadingZero(today.getMonth() + 1);
        let year = leadingZero(today.getFullYear());
        today = month + '/' + day + '/' + year + ' ';

        // Zeit berechnen
        calculateTime(startTime, today);

        // Jede Minute aktuelle Zeit aktualisieren
        setInterval(function () {
            calculateNow(startTime, today);
        }, 60000);
    }
}

//console.log("%cRPTU Timeserver Addon von Jan Heist", "background: white; color: gray; font-size: x-large; border: 5px solid; border-radius: 3px; padding: 10px; text-align: center");
// endregion main