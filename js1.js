let timer;           
let timePassed = 0;  
let running = false; 
let lapNumber = 0;   


const display = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const laps = document.getElementById('laps-list');


startBtn.addEventListener('click', startWatch);
pauseBtn.addEventListener('click', pauseWatch);
resetBtn.addEventListener('click', resetWatch);
lapBtn.addEventListener('click', addLap);

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(timePassed);
}

function startWatch() {
    if (!running) {
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;

        const startTime = Date.now() - timePassed; 

        timer = setInterval(() => {
            timePassed = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
}

// Pause the stopwatch
function pauseWatch() {
    if (running) {
        running = false;
        clearInterval(timer);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetWatch() {
    running = false;
    clearInterval(timer);
    timePassed = 0;
    lapNumber = 0;
    updateDisplay();

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;

    laps.innerHTML = ''; // Clear all laps
}

// Record a lap
function addLap() {
    lapNumber++;
    const lapTime = formatTime(timePassed);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    laps.appendChild(lapItem);
}