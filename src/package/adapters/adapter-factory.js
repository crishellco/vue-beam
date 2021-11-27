import { MITT, TINY_EMITTER } from '../constants';
import { typeResolverFactory } from '../utils';
import mitt from './mitt';
import tinyEmitter from './tiny-emitter';

export default function({ state, options }) {
  const resolveType = typeResolverFactory(options.prefix);

  switch (options.adapter) {
    case MITT:
      return mitt({ state, resolveType, options });
    case TINY_EMITTER:
      return tinyEmitter({ state, resolveType, options });
    default:
      return mitt({ state, resolveType, options });
  }
}
