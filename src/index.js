import { mixinFactory } from './mixin';

export { default as busFactory } from './bus-factory';

export default function install(Vue) {
  Vue.mixin(mixinFactory(Vue));
}
