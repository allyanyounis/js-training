/**
 * Ensures a function is only executed once.
 * Subsequent calls return the result of the first invocation.
 */
export const once = (fn) => {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};

/**
 * Caches the results of a function based on its arguments.
 */
export const memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Delays invoking fn until `delay` ms have passed since the last call.
 */
export const debounce = (fn, delay = 300) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
