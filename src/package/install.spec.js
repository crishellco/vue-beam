import { createLocalVue, shallowMount } from '@vue/test-utils';

import { DEFAULT_OPTIONS } from './constants';
import VueBeam from './index';

const getWrapper = () => {
  return shallowMount({ template: `<div><span></span></div>` }, { localVue });
};

let localVue;

describe('install', () => {
  beforeEach(() => {
    localVue = createLocalVue();
  });

  it('should install with default options', () => {
    localVue.use(VueBeam);
    const wrapper = getWrapper();

    expect(wrapper.vm.$beam.options).toEqual(DEFAULT_OPTIONS);
  });

  it('should install with custom options', () => {
    localVue.use(VueBeam, { ...DEFAULT_OPTIONS, prefix: 'beam' });

    const wrapper = getWrapper();

    expect(wrapper.vm.$beam.options).toEqual({ ...DEFAULT_OPTIONS, prefix: 'beam' });
  });
});
