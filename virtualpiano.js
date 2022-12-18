const pianoKeys = document.querySelectorAll('.piano-key');
const piano = document.querySelector('#piano');
const notesBtn = document.querySelector('#btn-notes');
const lettersBtn = document.querySelector('#btn-letters');

let shouldShowLetters = true;

function playAudio(key) {
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

function handleKeyPress(key) {
  const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
  pianoKey.classList.add('piano-key-active');
  playAudio(key);
}

function toggleKeyState(key) {
  key.classList.toggle('piano-key-active');
}

const handleTransition = ({target: {dataset: key}}) => {
  const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
  playAudio()
  pianoKey.classList.add('piano-key-active');
  toggleKeyState(pianoKey);
}

const startTransition = (event) => {
  const key = event.target.dataset.key;
  const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
  pianoKey.classList.add('piano-key-active');
  playAudio(key);
  toggleKeyState(event.target);
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', handleTransition)
    elem.addEventListener('mouseout', toggleKeyStateWrapper)
  })
}

const stopTransition = (event) => {
  pianoKeys.forEach((elem) => {
    toggleKeyState(event.target);
    elem.removeEventListener('mouseover', handleTransition)
    elem.removeEventListener('mouseout', toggleKeyStateWrapper)
  })
}

function toggleKeyStateWrapper(event) {
  toggleKeyState(event.target)
}

function toggleFullScreenMode() {
  if (!document.fullscreenElement) {
    void document.documentElement.requestFullscreen();
  } else {
    void document.exitFullscreen();
  }
}

function toggleKeyContent() {
  if (shouldShowLetters) {
    showLetters();
  } else {
    showNotes();
  }
  shouldShowLetters = !shouldShowLetters;
}

function showNotes() {
  pianoKeys.forEach((elem) => {
    toggleKeyState(elem)
  })
  notesBtn.classList.add('btn-active');
  lettersBtn.classList.remove('btn-active');
}

function showLetters() {
  pianoKeys.forEach((elem) => {
    toggleKeyState(elem);
  });
  notesBtn.classList.remove('btn-active');
  lettersBtn.classList.add('btn-active');
}

pianoKeys.forEach(key => key.addEventListener('transitionend', toggleKeyStateWrapper));
document.querySelector('.fullscreen').addEventListener('click', toggleFullScreenMode);
window.addEventListener('keydown', (event) => handleKeyPress(event.target.dataset.key));
piano.addEventListener('mousedown', startTransition);
window.addEventListener('mouseup', stopTransition);
lettersBtn.addEventListener('click', toggleKeyContent);
notesBtn.addEventListener('click', toggleKeyContent);
