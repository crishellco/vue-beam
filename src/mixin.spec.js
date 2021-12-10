import { createLocalVue, shallowMount } from '@vue/test-utils';

import VueBeam from './index';

const getWrapper = ({ beamInstanceId } = {}) => {
  return shallowMount({ template: `<div><span></span></div>`, beamInstanceId }, { localVue });
};

const event = 'event-1';
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

  it('should add $beam to every components', () => {
    expect(Object.getOwnPropertyNames(Object.getPrototypeOf($beam))).toEqual([
      'constructor',
      'on',
      'off',
      'once',
      'emit',
      'debouncedEmit',
      'removeAllListeners',
      'listeners',
    ]);
  });

  it('should respect beamInstanceId', () => {
    const listener = jest.fn();
    const secondWrapper = getWrapper({ beamInstanceId: 'foo' });
    const $secondBeam = secondWrapper.vm.$beam;

    $beam.on(event, listener);
    $secondBeam.on(event, listener);
    $beam.emit(event);
    expect(listener).toHaveBeenCalledTimes(1);

    $secondBeam.emit(event);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
