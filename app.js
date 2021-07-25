const timeInput = document.getElementById('time-input');
const stopwatchButton = document.getElementById('stopwatch-button');
const timerButton = document.getElementById('timer-button');
const stopwatchActions = document.getElementById('stopwatch-actions');
const timerActions = document.getElementById('timer-actions');
const stopwatchStartButton = document.getElementById('stopwatch-start-button');
const stopwatchStopButton = document.getElementById('stopwatch-stop-button');
const stopwatchResetButton = document.getElementById('stopwatch-reset-button');
const timerStartButton = document.getElementById('timer-start-button');
const timerStopButton = document.getElementById('timer-stop-button');
const startAudio = new Audio('start.mp3');
const stopAudio = new Audio('stop.wav');
const doneAudio = new Audio('done.wav');

let mode = 'stopwatch';
let minutes = 0;
let seconds = 0;
let stopwatchInterval = null;
let timerInterval = null;

timeInput.onchange = function () {
  const [min, sec] = timeInput.value.split(':');
  if (min) minutes = parseInt(min);
  if (sec) seconds = parseInt(sec);
}

stopwatchButton.onclick = function () {
  mode = 'stopwatch';
  timeInput.value = '0:00';
  timeInput.setAttribute('disabled', '');
  stopwatchActions.style.display = 'block';
  timerActions.style.display = 'none';
  
  if (!stopwatchButton.classList.contains('active')) {
    stopwatchButton.classList.add('active');
  }
  if (timerButton.classList.contains('active')) {
    timerButton.classList.remove('active');
  }
};

stopwatchStartButton.onclick = function () {
  if (stopwatchInterval) return;
  startAudio.play();
  stopwatchInterval = setInterval(function () {
    seconds++;
    
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    
    timeInput.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
};

stopwatchStopButton.onclick = function () {
  if (!stopwatchInterval) return;
  stopAudio.play();
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};

stopwatchResetButton.onclick = function () {
  minutes = 0;
  seconds = 0;
  timeInput.value = '0:00';
  if (!stopwatchInterval) return;
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};

timerButton.onclick = function () {
  mode = 'timer';
  timeInput.value = '0:00';
  timeInput.removeAttribute('disabled');
  timerActions.style.display = 'block';
  stopwatchActions.style.display = 'none';
  
  if (!timerButton.classList.contains('active')) {
    timerButton.classList.add('active');
  }
  if (stopwatchButton.classList.contains('active')) {
    stopwatchButton.classList.remove('active');
  }
};

timerStartButton.onclick = function () {
  if (timerInterval || !minutes && !seconds) return;
  timerInterval = setInterval(function () {
    seconds--;
    
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
    
    if (minutes == 0 && seconds == 0) {
      doneAudio.play();
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    timeInput.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
};

timerStopButton.onclick = function () {
  if (!timerInterval) return;
  doneAudio.play();
  clearInterval(timerInterval);
  timerInterval = null;
};
