import Vue from 'vue';

export const get = (obj, path, defaultValue) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => {
        // istanbul ignore next
        return res !== null && res !== undefined ? res[key] : res;
      }, obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result === undefined || result === obj ? defaultValue : result;
};

export const pushEmitted = (state, type, payload) => {
  Vue.set(state.emitted, type, get(state.emitted, type, []).concat(payload));
};

export const pushHandled = (state, type, payload) => {
  Vue.set(state.handled, type, get(state.handled, type, []).concat(payload));
};

export const debounce = (callback, wait) => {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
