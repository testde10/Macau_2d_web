// script.js - Macau 2D Engine logic

function runEngine() {
    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    // 1. Calculate Index based on total seconds for 6-second intervals (Refresh-proof)
    const totalSeconds = (hrs * 3600) + (mins * 60) + secs;
    const cycleIndex = Math.floor(totalSeconds / 6);

    // 2. Define Freeze Slots (11:00-11:30, 13:00-13:30, etc.)
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

    // 3. Stop engine from 9:30 PM to 7:59:59 AM
    if (hrs < 8  (hrs === 21 && mins >= 30)  hrs > 21) {
        isFrozen = true;
        freezeTime = 21; 
    }

    let displayData;

    if (isFrozen) {
        // 4. Use the result from exactly X:59:54 for the frozen period
        let targetHour = freezeTime - 1;
        let freezeTotalSecs = (targetHour * 3600) + (59 * 60) + 54;
        let freezeIndex = Math.floor(freezeTotalSecs / 6);
        displayData = generateNumbers(freezeIndex);
    } else {
        // 5. Normal rotation
        displayData = generateNumbers(cycleIndex);
    }

    updateUI(displayData, hrs, mins, secs);
}

function generateNumbers(index) {
    // Seeded random to ensure same result on refresh within 6s
    const seed = index;
    const random = (s) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };

    const sNum = (random(seed) * (1999.99 - 1000.00) + 1000.00).toFixed(2);
    const vNum = (random(seed + 1) * (59999.99 - 10000.00) + 10000.00).toFixed(2);

    // Formula: Last digit of SET + Digit before decimal of VALUE
    const setDigit = sNum.slice(-1); 
    const valDigit = vNum.split('.')[0].slice(-1); 
    const resDigit = setDigit + valDigit;

    return { res: resDigit, set: sNum, val: vNum };
}

function updateUI(data, h, m, s) {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
        clockEl.innerText = ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')};
    }

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

setInterval(runEngine, 1000);
runEngine();
