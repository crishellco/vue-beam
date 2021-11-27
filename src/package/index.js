import { DEFAULT_OPTIONS } from './constants';
import { mixinFactory } from './mixin';

export default function install(Vue, options = {}) {
  const mergedOptions = Vue.observable({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  Vue.mixin(mixinFactory(mergedOptions, Vue));
}
