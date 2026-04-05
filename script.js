function runEngine() {
    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

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
    const setDigit = sNum.slice(-1); 
    const valDigit = vNum.split('.')[0].slice(-1); 
    return { res: setDigit + valDigit, set: sNum, val: vNum };
}

function updateUI(data, h, m, s) {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) clockEl.innerText = ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')};

    const mainNum = document.getElementById("main-num");
    if (mainNum) mainNum.innerText = data.res;

    const timeSlots = ["1100", "1300", "1500", "1700", "1900", "2100"];
    timeSlots.forEach(slot => {
        const resEl = document.getElementById("res-" + slot);
        if (resEl) {
            resEl.innerText = data.res;
            document.getElementById("set-" + slot).innerText = data.set;
            document.getElementById("val-" + slot).innerText = data.val;
        }
    });
}

// Background Coin Animation
function createFalling() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.innerHTML = "💰"; 
    coin.style.position = 'fixed';
    coin.style.top = '-50px';
    coin.style.left = Math.random() * 100 + 'vw';
    coin.style.fontSize = (Math.random() * 25 + 15) + 'px';
    coin.style.zIndex = '999';
    coin.style.pointerEvents = 'none';
    coin.style.animation = fall ${Math.random() * 3 + 2}s linear forwards;
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 5000);
}

// Start Engine & Animation
setInterval(runEngine, 1000);
setInterval(createFalling, 400);
runEngine();
