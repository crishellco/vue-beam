import Vue from 'vue';
import { WILDCARD } from './constants';
import { debounce, pushEmitted, pushHandled } from './utils';

export default function() {
  const allHandlers = new Map();
  const state = Vue.observable({ emitted: {}, handled: {} });

  return {
    ...state,
    allHandlers,
    on(type, handler) {
      const handlers = allHandlers.get(type);

      if (handlers) {
        handlers.push(handler);
      } else {
        allHandlers.set(type, [handler]);
      }
    },

    off(type, handler) {
      const handlers = allHandlers.get(type);

      if (!handlers) return;

      if (handler) {
        handlers.indexOf(handler) > -1 && handlers.splice(handlers.indexOf(handler), 1);
      } else {
        allHandlers.set(type, []);
      }
    },

    once(type, handler) {
      const listener = (...args) => {
        handler(...args);
        this.off(type, listener);
      };

      this.on(type, listener);
    },

    emit(type, payload = {}) {
      /**
       * TODO Confirm successful receipt
       */
      const handlers = (allHandlers.get(type) || []).concat(allHandlers.get(WILDCARD) || []);

      pushEmitted(state, type, payload);

      if (handlers.length) {
        handlers.slice().map(handler => {
          pushHandled(state, type, payload);
          handler(payload, type);
        });
      }
    },

    debouncedEmit(delay, type) {
      return debounce(payload => this.emit(type, payload), delay);
    },
  };
}
