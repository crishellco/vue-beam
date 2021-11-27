import mitt from 'mitt';

import { uuid } from '../utils';

export default function({ resolveType }) {
  const emitter = mitt();

  return {
    emit(type, payload = {}) {
      type = resolveType(type);
      payload.id = uuid();
      emitter.emit(type, payload);
    },

    on(type, handler) {
      emitter.on(resolveType(type), handler);
    },

    off(type, handler) {
      emitter.off(resolveType(type), handler);
    },

    once(type, handler) {
      const wrappedHandler = (...args) => {
        handler(...args);
        this.off(type, wrappedHandler);
      };

      this.on(type, wrappedHandler);
    },
  };
}
