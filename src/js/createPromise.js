export function createPromise(delay, state) {
  //   const { delay, state } = event.currentTarget.elements;

  return new Promise((onResolve, onReject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        onResolve(delay);
      } else {
        onReject(delay);
      }
    }, delay);
  });
}
