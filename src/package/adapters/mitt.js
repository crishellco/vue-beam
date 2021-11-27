import mitt from 'mitt';

import base from './base';

export default function({ resolveType }) {
  const instance = mitt();

  const adapter = base({ instance, resolveType });

  adapter.once = function(type, handler) {
    const wrappedHandler = (...args) => {
      handler(...args);
      this.off(type, wrappedHandler);
    };

    this.on(type, wrappedHandler);
  };

  return adapter;
}
