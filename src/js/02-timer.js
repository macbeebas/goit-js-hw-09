import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import _ from 'lodash';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return JSON.stringify(value).padStart(2, '0');
}

function resetSecTS(ts) {
  let d = 60000;
  return Math.floor(ts / d) * d;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const startBtn = document.querySelector('[data-start]');
const inputItem = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

const flatPicker = flatpickr(inputItem, options);
const initDate = flatPicker.selectedDates;

let selectedDate = initDate;

let timerId = null;
let COUNTER;

startBtn.disabled = 1;

const initDateObj = { TimeStamp: resetSecTS(initDate[0].getTime()) };

const selectedDateObj = _.cloneDeep(initDateObj);

inputItem.addEventListener('input', () => {
  selectedDate = flatPicker.selectedDates;
  selectedDateObj.TimeStamp = selectedDate[0].getTime();

  if (selectedDateObj.TimeStamp > initDateObj.TimeStamp) {
    startBtn.disabled = 0;
  } else {
    startBtn.disabled = 1;
    window.alert('Please choose a date in the future');
  }
});

startBtn.addEventListener('click', () => {
  COUNTER = selectedDateObj.TimeStamp - initDateObj.TimeStamp;
  startBtn.disabled = 1;
  timerId = setInterval(() => {
    daysElem.textContent = addLeadingZero(convertMs(COUNTER).days);
    hoursElem.textContent = addLeadingZero(convertMs(COUNTER).hours);
    minutesElem.textContent = addLeadingZero(convertMs(COUNTER).minutes);
    secondsElem.textContent = addLeadingZero(convertMs(COUNTER).seconds);
    if (COUNTER <= 0) {
      clearInterval(timerId);
      timerId = null;
    } else COUNTER = COUNTER - 1000;
  }, 1000);
});
