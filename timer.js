// Global variables
let timer;
let seconds = 0;
let countdown = 0;
let timeOpen = false;
let points = 0;
let level = 1;
let lastMinute = 0;
let gameDuration = 10000;

// DOM Elements
const numberHtml = document.getElementById("number");
const startStopButton = document.getElementById("startStopButton");
const startTimerButton = document.getElementById("startTimerButton");
const modeSelect = document.getElementById("mode");
const timerDiv = document.getElementById("timerDiv");
const timerInput = document.getElementById("timer");
const timerSelect = document.getElementById("time");
const pointsDisplay = document.getElementById("pointsDisplay");
const levelDisplay = document.getElementById("levelDisplay");
const body = document.body;
const gameContainer = document.getElementById("gameContainer");
const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");

// Stopwatch Function
function startStopwatch() {
  seconds++;
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  numberHtml.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  updatePoints(minutes);
}

// Timer Countdown Function
function startTimerCountdown() {
  if (countdown > 0) {
    countdown--;
    let minutes = Math.floor(countdown / 60);
    let remainingSeconds = countdown % 60;
    numberHtml.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  } else {
    clearInterval(timer);
    showGame();
  }
}

// Points and Level System
function updatePoints(currentMinute) {
  if (currentMinute > lastMinute) {
    lastMinute = currentMinute;
    points += 10;
    pointsDisplay.textContent = `Points: ${points}`;

    if (points >= level * 1000) {
      level++;
      levelDisplay.textContent = `Level: ${level}`;
      body.style.backgroundColor = getRandomColor();
    }
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start/Stop Button Logic
function updateButtonLabel() {
  startStopButton.textContent = timeOpen ? "Stop" : "Start";
}

startStopButton.addEventListener("click", function () {
  timeOpen = !timeOpen;
  updateButtonLabel();

  if (timeOpen) {
    timer = setInterval(startStopwatch, 1000);
  } else {
    clearInterval(timer);
  }
});

// Mode Selector
modeSelect.addEventListener("change", function () {
  const mode = modeSelect.value;

  if (mode === "timer") {
    timerDiv.classList.remove("hidden");
    startStopButton.classList.add("hidden");
    numberHtml.textContent = "0:00";
    clearInterval(timer);
  } else {
    timerDiv.classList.add("hidden");
    startStopButton.classList.remove("hidden");
    numberHtml.textContent = "0:00";
    clearInterval(timer);
    seconds = 0;
    lastMinute = 0;
    updateButtonLabel();
  }
});

// Start Timer
startTimerButton.addEventListener("click", function () {
  let value = parseInt(timerInput.value);
  const unit = timerSelect.value;

  if (isNaN(value) || value <= 0) {
    alert("Please enter a valid number greater than 0.");
    return;
  }

  if (unit === "minutes") {
    countdown = value * 60;
  } else if (unit === "hours") {
    countdown = value * 3600;
  } else {
    countdown = value;
  }

  clearInterval(timer);
  timer = setInterval(startTimerCountdown, 1000);
});

// Game Logic
let score = 0;
let gameDuration = 10000;
let gameTime;

function showGame() {
  timerDiv.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  score = 0;
  scoreDisplay.textContent = score;
  moveCircle();

  gameTime = setTimeout(() => {
    circle.removeEventListener("click", clickCircle);
    alert("Time's up! Your score: " + score);
    gameContainer.classList.add("hidden");
    
    timerDiv.classList.remove("hidden");
  }, gameDuration);

  circle.addEventListener("click", clickCircle);
}

function clickCircle() {
  score++;
  scoreDisplay.textContent = score;
  moveCircle();
}

function moveCircle() {
  const maxX = window.innerWidth - 60;
  const maxY = window.innerHeight - 60;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}