// script.js

let startTime = 0; // Store start time
let elapsedTime = 0; // Time elapsed since start
let timerInterval; // Interval for the timer
let running = false; // Flag to track if the stopwatch is running
let lapTimes = []; // Array to store lap times
let previousLapTime = 0; // Track previous lap time to display the correct difference

// DOM Elements
const timeDisplay = document.getElementById('timeDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Start/Pause Button
startPauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval); // Stop the timer
        startPauseBtn.textContent = 'Resume';
    } else {
        startTime = Date.now() - elapsedTime; // Set the start time when resumed
        timerInterval = setInterval(updateTime, 10); // Update every 10ms
        startPauseBtn.textContent = 'Pause';
    }
    running = !running;
});

// Reset Button
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    running = false;
    elapsedTime = 0; // Reset elapsed time
    previousLapTime = 0; // Reset previous lap time
    lapTimes = []; // Clear lap times
    lapList.innerHTML = ''; // Clear lap list
    timeDisplay.textContent = '00:00:00'; // Reset display
    startPauseBtn.textContent = 'Start';
});

// Lap Button
lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = elapsedTime - previousLapTime; // Calculate lap time
        previousLapTime = elapsedTime; // Set the previous lap time
        const formattedLapTime = formatTime(lapTime);
        lapTimes.push(formattedLapTime); // Store the lap time
        const li = document.createElement('li');
        li.textContent = `Lap ${lapTimes.length}: ${formattedLapTime}`;
        lapList.appendChild(li); // Display lap time in list
    }
});

// Update the stopwatch time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Format time as MM:SS:MS
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Get milliseconds (to 2 decimal places)
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

// Add leading zero if needed
function padZero(num) {
    return num < 10 ? '0' + num : num;
}
