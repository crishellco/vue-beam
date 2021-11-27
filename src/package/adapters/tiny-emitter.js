import Emitter from 'tiny-emitter';

import { uuid } from '../utils';

export default function({ resolveType }) {
  const tinyEmitterInstance = new Emitter();

  return {
    emit(type, payload = {}) {
      type = resolveType(type);
      payload.id = uuid();
      tinyEmitterInstance.emit(type, payload);
    },

    on(type, handler) {
      tinyEmitterInstance.on(resolveType(type), handler);
    },

    off(type, handler) {
      tinyEmitterInstance.off(resolveType(type), handler);
    },

    once(type, handler) {
      tinyEmitterInstance.once(resolveType(type), handler);
    },
  };
}
