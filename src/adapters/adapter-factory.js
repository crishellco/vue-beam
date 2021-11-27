import { BEAMITTER } from '../constants';
import { typeResolverFactory } from '../utils';
import beamitter from './beamitter';

export default function({ state, options }) {
  const resolveType = typeResolverFactory(options.prefix);

  switch (options.adapter) {
    case BEAMITTER:
      return beamitter({ state, resolveType, options });
    default:
      return beamitter({ state, resolveType, options });
  }
}
