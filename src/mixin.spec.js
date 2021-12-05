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
    expect(new Set(Object.keys($beam))).toEqual(
      new Set(['emit', 'on', 'off', 'once', 'allHandlers', 'debouncedEmit', 'emitted', 'handled'])
    );
  });

  it('should respect beamInstanceId', () => {
    const handler = jest.fn();
    const secondWrapper = getWrapper({ beamInstanceId: 'foo' });
    const $secondBeam = secondWrapper.vm.$beam;

    $beam.on(event, handler);
    $secondBeam.on(event, handler);
    $beam.emit(event);
    expect(handler).toHaveBeenCalledTimes(1);

    $secondBeam.emit(event);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
