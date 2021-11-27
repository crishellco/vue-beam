import Emitter from 'tiny-emitter';

import { uuid } from '../utils';

export default function({ resolveType }) {
  const emitter = new Emitter();

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
      emitter.once(resolveType(type), handler);
    },
  };
}
