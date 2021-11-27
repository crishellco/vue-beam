import adapterFactory from './adapters/adapter-factory';

export const mixinFactory = (options, Vue) => {
  const state = Vue.observable({ emitted: {}, handled: {} });
  const emitter = adapterFactory({ state, options });

  return {
    computed: {
      $beam() {
        return { ...emitter, ...state, options };
      },
    },
  };
};
