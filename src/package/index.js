import { MITT } from './constants';
import { mixinFactory } from './mixin';

export const defaultOptions = { adapter: MITT };

export default function install(Vue, options = {}) {
  const mergedOptions = Vue.observable({
    ...defaultOptions,
    ...options,
  });

  Vue.mixin(mixinFactory(mergedOptions, Vue));
}
