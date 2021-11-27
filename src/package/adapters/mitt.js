import mitt from 'mitt';

import { uuid } from '../utils';

export default function({ resolveType }) {
  const mittInstance = mitt();

  return {
    emit(type, payload = {}) {
      type = resolveType(type);
      payload.id = uuid();
      mittInstance.emit(type, payload);
    },

    on(type, handler) {
      mittInstance.on(resolveType(type), handler);
    },

    off(type, handler) {
      mittInstance.off(resolveType(type), handler);
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
