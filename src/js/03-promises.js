import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('input[name=delay]');
const stepInputEl = document.querySelector('input[name=step]');
const amountInputEl = document.querySelector('input[name=amount]');
const promiseCreateBtn = document.querySelector('button[type=submit]');

addFormStyle();

formEl.addEventListener('submit', event => {
  event.preventDefault();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
}

promiseCreateBtn.addEventListener('click', onPromiseCreateBtnClick);

function onPromiseCreateBtnClick() {
  let delay = Number(delayInputEl.value);
  let delayStep = Number(stepInputEl.value);
  let delayAmount = Number(amountInputEl.value);
  for (let i = 0; i <= delayAmount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
  formEl.reset();
}

function addFormStyle() {
  formEl.style.display = 'grid';
  formEl.style.backgroundColor = '#689ff7';
  formEl.style.color = '#031d45';
  formEl.style.gap = '10px';
  formEl.style.justifyItems = 'end';
  formEl.style.justifyContent = 'center';
  formEl.style.border = 'thin solid darkgrey';
  formEl.style.padding = '30px';

  promiseCreateBtn.style.padding = '3px 24px';
  promiseCreateBtn.style.backgroundColor = '#689ff7';
  promiseCreateBtn.style.color = '#031d45';
  promiseCreateBtn.style.border = 'thin dashed #031d45';
  promiseCreateBtn.style.borderRadius = '4px';
  promiseCreateBtn.style.cursor = 'pointer';
}
