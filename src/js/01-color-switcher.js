const bodySection = document.querySelector('body');

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.disabled = 1;

startBtn.addEventListener('click', () => {
  startBtn.disabled = 1;
  stopBtn.disabled = 0;
  timerId = setInterval(() => {
    bodySection.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = 0;
  stopBtn.disabled = 1;
  clearInterval(timerId);
  timerId = null;
});
