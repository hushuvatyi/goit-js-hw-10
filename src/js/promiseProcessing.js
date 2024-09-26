import { createPromise } from './createPromise';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function promiseProcessing(delay, state) {
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        icon: '',
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: '',
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}
