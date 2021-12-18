import beam from '@crishellco/beam';

import { mixinFactory } from './mixin';

const install = (Vue) => {
  Vue.mixin(mixinFactory(Vue));
};

Object.assign(install, { beam });

export default install;
