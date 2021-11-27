import Vue from 'vue';

export const WILDCARD = '*';

export const uuid = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

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

export const typeResolverFactory = prefix => type => {
  return type === WILDCARD ? type : prefix ? `${prefix}:${type}` : type;
};

export const pushEmitted = (state, type, payload) => {
  Vue.set(state.emitted, type, get(state.emitted, type, []).concat(payload));
};

export const pushHandled = (state, type, args) => {
  Vue.set(state.handled, type, get(state.handled, type, []).concat(args));
};
