import getRandomHexColor from './randomHEX';

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

stopBtn.setAttribute('disabled', '');
let intervalID = 0;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalID = setInterval(() => {
    generatedColor = getRandomHexColor();
    bodyEl.style.backgroundColor = generatedColor;
  }, 1000);
}

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick(evt) {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalID);
}
