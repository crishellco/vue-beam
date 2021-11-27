import { uuid } from '../utils';

export default function({ instance, resolveType }) {
  return {
    emit(type, payload = {}) {
      type = resolveType(type);
      payload.id = uuid();
      instance.emit(type, payload);
    },

    on(type, handler) {
      instance.on(resolveType(type), handler);
    },

    off(type, handler) {
      instance.off(resolveType(type), handler);
    },

    once(type, handler) {
      instance.once(resolveType(type), handler);
    },

    debouncedEmit(...args) {
      return instance.debouncedEmit(...args);
    },
  };
}
