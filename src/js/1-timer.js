// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  return value.toString().padStart(2, '0');
}

function setTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days > 9 ? days : addLeadingZero(days);
  hoursEl.textContent = hours > 9 ? hours : addLeadingZero(hours);
  minutesEl.textContent = minutes > 9 ? minutes : addLeadingZero(minutes);
  secondsEl.textContent = seconds > 9 ? seconds : addLeadingZero(seconds);
}

function changeTimerValues() {
  remainingMs = selectedDate - Date.now();
  if (remainingMs < 20) {
    clearInterval(intervalId);
    setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    inputEl.removeAttribute('disabled');
    inputEl.focus();
    return;
  }

  setTimer(convertMs(remainingMs));
}

function onClickStartHandler() {
  btnStartEl.setAttribute('disabled', '');
  inputEl.setAttribute('disabled', '');
  intervalId = setInterval(changeTimerValues, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      btnStartEl.setAttribute('disabled', '');

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      inputEl.focus();
      return;
    }
    selectedDate = selectedDates[0];
    btnStartEl.removeAttribute('disabled', '');
  },
};

let selectedDate;
let intervalId;
let remainingMs;

const inputEl = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const btnStartEl = document.querySelector('button[data-start]');
btnStartEl.setAttribute('disabled', '');

flatpickr(inputEl, options);
btnStartEl.addEventListener('click', onClickStartHandler);
