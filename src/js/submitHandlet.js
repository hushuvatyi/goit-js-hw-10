import { promiseProcessing } from './promiseProcessing';

export function submitHandler(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget.elements;

  promiseProcessing(delay.value, state.value);
  event.currentTarget.reset();
}
