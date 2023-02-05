import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const timerWrap = document.querySelector('div.timer-wrap');
console.log('timerWrap', timerWrap.style);
const datePickerInput = document.getElementById('datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const daysRemaining = document.querySelector('[data-days');
const hoursRemaining = document.querySelector('[data-hours');
const minutesRemaining = document.querySelector('[data-minutes');
const secondsRemaining = document.querySelector('[data-seconds');
const timer = document.querySelector('.timer');

btnDisabled();

let selectedDate;
let currentDate = Date.parse(new Date());
let ms;

addTimerStyle();

function addTimerStyle() {
  timerWrap.style.display = 'inline-block';
  timerWrap.style.alignItem = 'center';
  timerWrap.style.margin = 'auto';
  timerWrap.style.padding = '50px';
  timerWrap.style.border = 'thin solid #5A5096';
  timerWrap.style.borderRadius = '4px';
  timerWrap.style.backgroundColor = '#D1CEE2';

  datePickerInput.style.padding = '20px';
  datePickerInput.style.color = '#5A5096';
  datePickerInput.style.marginRight = '20px';
  datePickerInput.style.border = 'thin solid #A39EC5';
  datePickerInput.style.borderRadius = '4px';
  datePickerInput.style.backgroundColor = '#A39EC5';

  startTimerBtn.style.padding = '20px';
  startTimerBtn.style.backgroundColor = '#A39EC5';
  startTimerBtn.style.color = '#514F62';

  startTimerBtn.style.border = 'transparent';
  startTimerBtn.style.borderRadius = '4px';
  startTimerBtn.style.cursor = 'pointer';

  timer.style.display = 'flex';
  timer.style.gap = '20px';
  //   timer.style.marginLeft = '20px';
  timer.style.marginTop = '20px';
  timer.style.color = '#A39EC5';

  const fieldEL = document.querySelectorAll('.field');
  for (let i = 0; i < fieldEL.length; i++) {
    fieldEL[i].style.display = 'inline-flex';
    fieldEL[i].style.flexDirection = 'column';
    fieldEL[i].style.textAlign = 'center';
    fieldEL[i].style.padding = '2px';
    fieldEL[i].style.border = 'thin solid #A39EC5';
    fieldEL[i].style.borderRadius = '4px';
  }

  const valueEl = document.querySelectorAll('.value');
  for (let i = 0; i < valueEl.length; i++) {
    valueEl[i].style.color = '#5A5096';
    valueEl[i].style.fontSize = 'medium';
    valueEl[i].style.fontWeight = '400';
  }

  const labelEL = document.querySelectorAll('.label');
  for (let i = 0; i < labelEL.length; i++) {
    labelEL[i].style.fontWeight = '100';
    labelEL[i].style.color = '#5A5096';
  }
}

startTimerBtn.addEventListener('click', onStartTimerBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i K',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('onClose ~ selectedDates', selectedDates);
    onDateSelection(selectedDates);
  },
};

function onDateSelection(selectedDates) {
  selectedDate = Date.parse(selectedDates[0]);

  if (selectedDate < currentDate) {
    Report.failure('Please choose a date in the future');

    btnDisabled();

    return;
  }

  if (selectedDate > currentDate) {
    startTimerBtn.removeAttribute('disabled');

    const dateObj = convertMs(selectedDate - Date.now());
    console.log(dateObj);
    const { days, hours, minutes, seconds } = dateObj;

    daysRemaining.textContent = days;
    hoursRemaining.textContent = hours;
    minutesRemaining.textContent = minutes;
    secondsRemaining.textContent = seconds;

    Report.success('Valid date. Click on start!');
  }

  ms = selectedDate - currentDate;
}

flatpickr(datePickerInput, options);

function onStartTimerBtnClick() {
  let intervalID = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const deltaInSeconds = Number(((deltaTime % 60000) / 1000).toFixed(0));

    if (deltaInSeconds === 0) {
      clearInterval(intervalID);
      btnDisabled();

      Report.info(
        'Timer stopped!',
        'If you want to start new timer, reload page and pick the time.',
        'ok!'
      );
    }

    const dateObj = convertMs(deltaTime);
    console.log(dateObj);
    const { days, hours, minutes, seconds } = dateObj;

    daysRemaining.textContent = days;
    hoursRemaining.textContent = hours;
    minutesRemaining.textContent = minutes;
    secondsRemaining.textContent = seconds;
  }, 1000);
  //   const renameBtn = (startTimerBtn.textContent = 'Stop');
}

function btnDisabled() {
  startTimerBtn.setAttribute('disabled', '');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
