import Emitter from 'tiny-emitter';

import base from './base';

export default function({ resolveType }) {
  const instance = new Emitter();

  return base({ instance, resolveType });
}
