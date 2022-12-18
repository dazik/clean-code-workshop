// Get all needed elements from DOM
const keys = document.querySelectorAll('.piano-key');
const piano = document.getElementById('piano');
const notes_btn = document.querySelector('#btn-notes');
const letters_button = document.querySelector('#btn-letters');

function keyPressed(e) {
  const a = document.querySelector(`audio[data-key="${key}"]`);
  const k = document.querySelector(`.piano-key[data-key="${key}"]`);
  if (!a) return;
  a.currentTime = 0;
  a.play();
  k.classList.add('piano-key-active');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('piano-key-active');
}

// Transitions
const start = (event) => {
  const a = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
  const k = document.querySelector(`.piano-key[data-key="${event.target.dataset.key}"]`);
  if (!a) return;
  a.currentTime = 0;
  a.play();
  k.classList.add('piano-key-active');
  event.target.classList.add('piano-key-active');
}

const stop = (event) => {
  event.target.classList.remove('piano-key-active');
}

const startProgram = (event) => {
  const a = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
  const k = document.querySelector(`.piano-key[data-key="${event.target.dataset.key}"]`);
  if (!a) return;
  a.currentTime = 0;
  a.play();
  k.classList.add('piano-key-active');
  event.target.classList.add('piano-key-active');
  keys.forEach((elem) => {
    elem.addEventListener('mouseover', start)
    elem.addEventListener('mouseout', stop)
  })
}

const stopProgram = () => {
  keys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
    elem.removeEventListener('mouseover', start)
    elem.removeEventListener('mouseout', stop)
  })
}

// To switch fullscreen mode
function fs() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// to switch between notes and letters
function lettersOrNotes(lettersState) {
  if (lettersState) {
    keys.forEach((elem) => {
      elem.classList.remove('piano-key-letter');
    })
    notes_btn.classList.add('btn-active');
    letters_button.classList.remove('btn-active');
  } else {
    keys.forEach((elem) => {
      elem.classList.add('piano-key-letter');
    });
    notes_btn.classList.remove('btn-active');
    letters_button.classList.add('btn-active');
  }
}

// Set event listeners
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
document.querySelector('.fullscreen').addEventListener('click', fs);
window.addEventListener('keydown', keyPressed);
piano.addEventListener('mousedown', startProgram);
window.addEventListener('mouseup', stopProgram);
letters_button.addEventListener('click', () => lettersOrNotes(true));
notes_btn.addEventListener('click', () => lettersOrNotes(false));
