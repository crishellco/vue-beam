import { createLocalVue, shallowMount } from '@vue/test-utils';

import VueBeam, { defaultOptions } from './index';

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

    expect(wrapper.vm.$beam.options).toEqual(defaultOptions);
  });

  it('should install with custom options', () => {
    localVue.use(VueBeam, { ...defaultOptions, prefix: 'beam' });

    const wrapper = getWrapper();

    expect(wrapper.vm.$beam.options).toEqual({ ...defaultOptions, prefix: 'beam' });
  });
});
