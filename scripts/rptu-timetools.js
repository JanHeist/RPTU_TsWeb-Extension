const prefix = 'timetools-';
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

function leadingZero(num) {
    return num < 10 ? '0' + num : num;
}

function formatTime(date) {
    return leadingZero(date.getHours()) + ':' + leadingZero(date.getMinutes());
}

function calculateNow(start, today) {
    let _now = new Date();
    start = new Date(today + start);
    _now = _now - start;
    _now = new Date(_now);

    if (_now.getHours() == 6) {
        _now.setMinutes(_now.getMinutes() - Math.min(30, _now.getMinutes()));
    } else if (_now.getHours() > 9) {
        _now.setMinutes(_now.getMinutes() - 45);
    } else if (_now.getHours() >= 6) {
        _now.setMinutes(_now.getMinutes() - 30);
    }
    _now = formatTime(_now);
    document.querySelector('#' + prefix + 'now').textContent = _now;
}

function calculateTime(start, today) {
    let _0845 = new Date(today + start);
    _0845.setHours(_0845.getHours() + 8);
    _0845.setMinutes(_0845.getMinutes() + 45);
    _0845 = formatTime(_0845);

    let _0818 = new Date(today + start);
    _0818.setHours(_0818.getHours() + 8);
    _0818.setMinutes(_0818.getMinutes() + 18);
    _0818 = formatTime(_0818);

    let _0600 = new Date(today + start);
    _0600.setHours(_0600.getHours() + 6);
    _0600 = formatTime(_0600);

    calculateNow(start, today);

    document.querySelector('#' + prefix + '0845').textContent = _0845;
    document.querySelector('#' + prefix + '0818').textContent = _0818;
    document.querySelector('#' + prefix + '0600').textContent = _0600;
}

const data = document.querySelector('#ContentPlaceHolder1_GVBuchungen_Label1_0');
if (data) {
    const parentElem = document.querySelector('#ContentPlaceHolder1_GVBuchungen').parentElement;
    let templateHTML = document.createElement('div');
    templateHTML.id = prefix + 'calulatedTime';
    templateHTML.innerHTML = template;
    parentElem.append(templateHTML);

    let start = document.querySelector('#ContentPlaceHolder1_GVBuchungen_Label1_0').innerText;
    if (start) {
        let today = new Date();
        let d = today.getDate();
        let m = today.getMonth() + 1;
        let y = today.getFullYear();
        d = leadingZero(d);
        m = leadingZero(m);
        today = m + '/' + d + '/' + y + ' ';

        calculateTime(start, today);

        setInterval(function () {
            calculateNow(start, today);
        }, 60000);
    }
}

console.log("%cRPTU Timeserver Addon von Jan Heist", "background: white; color: gray; font-size: x-large; border: 5px solid; border-radius: 3px; padding: 10px; text-align: center");
