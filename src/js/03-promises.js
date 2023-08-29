import Notiflix from 'notiflix';

const delayElem = document.querySelector("input[name='delay']");
const stepElem = document.querySelector("input[name='step']");
const amountElem = document.querySelector("input[name='amount']");
const createBtn = document.querySelector('button');

const inputValue = {};

delayElem.addEventListener('input', event => {
  inputValue.delay = Number.parseInt(event.target.value);
});

stepElem.addEventListener('input', event => {
  inputValue.step = Number.parseInt(event.target.value);
});

amountElem.addEventListener('input', event => {
  inputValue.amount = Number.parseInt(event.target.value);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  if (shouldResolve) {
    promise.then(result => {
      Notiflix.Notify.success(result);
    });
  } else {
    promise.catch(error => {
      Notiflix.Notify.failure(error);
    });
  }
}

createBtn.addEventListener('click', event => {
  event.preventDefault();
  let promiseDelay = inputValue.delay;
  for (let i = 1; i <= inputValue.amount; i++) {
    createPromise(i, promiseDelay);
    promiseDelay += inputValue.step;
  }
});
