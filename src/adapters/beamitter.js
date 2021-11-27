import emitter from '../emitters/beamitter';

import base from './base';

export default function({ resolveType, state }) {
  const instance = new emitter({ state });

  return base({ instance, resolveType });
}
