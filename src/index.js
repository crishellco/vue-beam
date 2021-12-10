import { mixinFactory } from './mixin';

export default function install(Vue) {
  Vue.mixin(mixinFactory(Vue));
}
