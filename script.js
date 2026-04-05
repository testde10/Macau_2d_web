function runEngine() {
    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    // ၆ စက္ကန့်တစ်ခါ ဂဏန်းပြောင်းရန်
    const totalSeconds = (hrs * 3600) + (mins * 60) + secs;
    const cycleIndex = Math.floor(totalSeconds / 6);

    let isFrozen = false;
    let freezeTime = null;
    const checkSlots = [11, 13, 15, 17, 19, 21];

    for (let slot of checkSlots) {
        if (hrs === slot && mins < 30) {
            isFrozen = true;
            freezeTime = slot;
            break;
        }
    }

    if (hrs < 8  (hrs === 21 && mins >= 30)  hrs > 21) {
        isFrozen = true;
        freezeTime = 21; 
    }

    let displayData;
    if (isFrozen) {
        let targetHour = freezeTime - 1;
        let freezeTotalSecs = (targetHour * 3600) + (59 * 60) + 54;
        let freezeIndex = Math.floor(freezeTotalSecs / 6);
        displayData = generateNumbers(freezeIndex);
    } else {
        displayData = generateNumbers(cycleIndex);
    }

    updateUI(displayData, hrs, mins, secs);
}

function generateNumbers(index) {
    const seed = index;
    const random = (s) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };
    const sNum = (random(seed) * (1999.99 - 1000.00) + 1000.00).toFixed(2);
    const vNum = (random(seed + 1) * (59999.99 - 10000.00) + 10000.00).toFixed(2);
    return { 
        res: sNum.slice(-1) + vNum.split('.')[0].slice(-1), 
        set: sNum, 
        val: vNum 
    };
}

function updateUI(data, h, m, s) {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) clockEl.innerText = ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')};

    const mainNum = document.getElementById("main-num");
    if (mainNum) mainNum.innerText = data.res;

    const timeSlots = ["1100", "1300", "1500", "1700", "1900", "2100"];
    timeSlots.forEach(slot => {
        const resEl = document.getElementById("res-" + slot);
        const setEl = document.getElementById("set-" + slot);
        const valEl = document.getElementById("val-" + slot);
        if (resEl) resEl.innerText = data.res;
        if (setEl) setEl.innerText = data.set;
        if (valEl) valEl.innerText = data.val;
    });
}

function createFalling() {
    const coin = document.createElement('div');
    coin.innerHTML = "💰";
    coin.style.cssText = position:fixed; top:-50px; left:${Math.random()*100}vw; font-size:20px; z-index:9999; pointer-events:none; animation: fall ${Math.random()*3+2}s linear forwards;;
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 5000);
}

const style = document.createElement('style');
style.innerHTML = @keyframes fall { to { transform: translateY(110vh) rotate(360deg); } };
document.head.appendChild(style);

setInterval(runEngine, 1000);
setInterval(createFalling, 500);
runEngine();
