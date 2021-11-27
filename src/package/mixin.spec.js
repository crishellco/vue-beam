import { createLocalVue, shallowMount } from '@vue/test-utils';

import VueBeam from './index';

const getWrapper = () => {
  return shallowMount({ template: `<div><span></span></div>` }, { localVue });
};

let localVue;
let wrapper;
let $beam;

describe('mixin', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueBeam);
    wrapper = getWrapper();
    $beam = wrapper.vm.$beam;
  });

  it('add $beam to every components', () => {
    expect(Object.keys($beam)).toEqual(['emit', 'on', 'off', 'once', 'emitted', 'handled', 'options']);
  });
});
