import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');
// const input = document.querySelectorAll('input');
const delayInputEl = document.querySelector('input[name=delay]');
const stepInputEl = document.querySelector('input[name=step]');
const amountInputEl = document.querySelector('input[name=amount]');
const promiseCreateBtn = document.querySelector('button[type=submit]');

// promiseCreateBtn.setAttribute('disabled', '');

// addFormStyle();

formEl.addEventListener('submit', event => {
  event.preventDefault();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
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
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
  formEl.reset();
}

// function addFormStyle() {
//   formEl.style.display = 'grid';
//   formEl.style.backgroundColor = '#99b3dd';
//   formEl.style.color = '#031d45';
//   formEl.style.gap = '10px';
//   formEl.style.justifyItems = 'end';
//   formEl.style.justifyContent = 'center';
//   formEl.style.border = 'thin dashed #031d45';
//   formEl.style.padding = '30px';

//   promiseCreateBtn.style.padding = '3px 24px';
//   promiseCreateBtn.style.backgroundColor = '#99b3dd';
//   promiseCreateBtn.style.color = '#031d45';
//   promiseCreateBtn.style.border = 'thin dashed #031d45';
//   promiseCreateBtn.style.borderRadius = '4px';
//   promiseCreateBtn.style.cursor = 'pointer';
//   promiseCreateBtn.style.boxShadow = '2px #031d45';
// }
