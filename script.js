// Lists of conditions on the game
const difficulties = ["Easy", "Medium", "Hard", "Extreme"];
const times = [900, 600, 400, 250];
const seqs = [4, 9, 15, 25];

// Globals
var gamePlaying = false;
var pattern = [1]; // Randomly generated each time.
var progress = 0;
var guessCounter = 0;
var clueHoldTime = 1000;
var cluePauseTime = 333;
var difficulty = 0;
var buttonsActive = true;
var keypressed = false;

var tonePlaying = false;
var volume = 0.5;

function updateTiming(time) {
  clueHoldTime = time;
  cluePauseTime = ~~(time / 3);
}

function updateDifficulty() {
  if (gamePlaying) return;
  let btn = document.getElementById("difficulty");
  difficulty = (difficulty + 1) % 4;
  updateTiming(times[difficulty]);
  btn.innerHTML = difficulties[difficulty];
}

// Automatic on and off for buttons
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

// Turns on and off buttons, very useful
function activateButtons() {
  for (let i = 1; i < 5; i++) {
    let btn = document.getElementById("button" + i);
    btn.onclick = function() {
      guess(i);
    };
    btn.onmousedown = function() {
      startTone(i);
    };
    btn.onmouseup = function() {
      stopTone();
    };
  }
  buttonsActive = true;
}
function deactivateButtons() {
  for (let i = 1; i < 5; i++) {
    let btn = document.getElementById("button" + i);
    btn.onclick = function() {};
    btn.onmousedown = function() {};
    btn.onmouseup = function() {};
  }
  buttonsActive = false;
}

// functions for playing clues.
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}
function playClueSequence() {
  console.log(progress + "pcs");
  deactivateButtons();
  let delay = clueHoldTime;
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime + cluePauseTime;
  }
  delay -= cluePauseTime;
  setTimeout(activateButtons, delay);
}

// Main Logic for the game
function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  if (pattern[guessCounter] == btn) {
    // if finished with this level
    if (guessCounter == progress) {
      guessCounter = 0;
      progress++;
      // If finished, win game
      if (progress == pattern.length) {
        setTimeout(winGame, 500);
      } /* not finished, next level */ else {
        playClueSequence();
      }
    } /* continue with same level */ else {
      guessCounter++;
    }
  } /* guess doesn't match */ else {
    loseGame();
  }
}

// Start and stop functions
function startGame() {
  progress = 0;
  guessCounter = 0;
  let temp = [...Array(seqs[difficulty]).keys()];
  pattern = temp.map(x => Math.floor(Math.random() * 4) + 1);
  console.log(pattern);
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}
function stopGame() {
  stopTone();
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  // Unclear exactly why the context needs this but it does.
  activateButtons();
  unlockAudioContext(context);
}

function loseGame() {
  stopGame();
  alert("Game Over, You Lose!");
}
function winGame() {
  stopGame();
  alert("Congrats, You Won the Game on " + difficulties[difficulty] + "!");
}

// Start with working buttons
activateButtons();

// Adds keyboard control
document.addEventListener("keydown", e => {
  if (1 <= e.key && e.key <= 4 && buttonsActive && !keypressed) {
    startTone(e.key);
    lightButton(e.key);
    keypressed = true;
    setTimeout(guess, 100, e.key);
  }
});
document.addEventListener("keyup", e => {
  if (1 <= e.key && e.key <= 4 && keypressed) {
    stopTone();
    clearButton(e.key);
    keypressed = false;
  }
});

// Copy-pasted Sound Synthesis Functions until end of file
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 523.2
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer

// This code is modified from the original code, taken from
// https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos
// to get the AudioContext working on safari (which I was using at the time)
var AudioContext =
  window.AudioContext || // Default
  window.webkitAudioContext || // Safari and old versions of Chrome
  false;
var context = new AudioContext();
function unlockAudioContext(audioCtx) {
  console.log("audio?");
  // Unclear why this needs to be commented out, but it fixes audio after the first win/loss
  //if (context.state !== 'suspended') return;
  const b = document.body;
  const events = ["touchstart", "touchend", "mousedown", "keydown"];
  events.forEach(e => b.addEventListener(e, unlock, false));
  function unlock() {
    audioCtx.resume().then(clean);
  }
  function clean() {
    events.forEach(e => b.removeEventListener(e, unlock));
  }
}
unlockAudioContext(context);

var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
