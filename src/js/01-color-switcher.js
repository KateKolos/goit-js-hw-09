function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnWrapper = document.querySelector('.btn-wrapper');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

stopBtn.setAttribute('disabled', '');
let intervalID = 0;

addBtnStyles();

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalID = setInterval(() => {
    const generatedColor = getRandomHexColor();
    bodyEl.style.backgroundColor = generatedColor;
  }, 1000);
}

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick(evt) {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalID);
}

function addBtnStyles() {
  btnWrapper.style.display = 'flex';
  btnWrapper.style.gap = '30px';

  btnWrapper.style.justifyContent = 'center';
  btnWrapper.style.alignItems = 'center';
  btnWrapper.style.padding = '30px';

  const btn = document.querySelectorAll('button');
  for (let i = 0; i < btn.length; i++) {
    btn[i].style.paddingTop = '10px';
    btn[i].style.paddingBottom = '10px';
    btn[i].style.paddingLeft = '20px';
    btn[i].style.paddingRight = '20px';
    btn[i].style.border = 'thin solid darkgrey';
    btn[i].style.borderRadius = '4px';
    btn[i].style.cursor = 'pointer';
  }
}
