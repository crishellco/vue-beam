import { MITT } from '../constants';
import { typeResolverFactory } from '../utils';
import mitt from './mitt';

export default function({ state, options }) {
  const resolveType = typeResolverFactory(options.prefix);

  switch (options.adapter) {
    case MITT:
      return mitt({ state, resolveType, options });
    default:
      return mitt({ state, resolveType, options });
  }
}
