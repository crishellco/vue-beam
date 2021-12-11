export { default as beam } from '@crishellco/beam';

import { mixinFactory } from './mixin';

export default function install(Vue) {
  Vue.mixin(mixinFactory(Vue));
}
