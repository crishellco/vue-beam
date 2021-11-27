import { createLocalVue, shallowMount } from '@vue/test-utils';
import { TINY_EMITTER } from '../constants';

import VueBeam from '../index';

const getWrapper = () => {
  return shallowMount({ template: `<div><span></span></div>` }, { localVue });
};

const event = 'event-1';
const payload = { foo: 'bar' };

let localVue;
let wrapper;
let $beam;

describe(`TINY_EMITTER`, () => {
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueBeam, { adapter: TINY_EMITTER });
    wrapper = getWrapper();
    $beam = wrapper.vm.$beam;
  });

  it('should emit many times', () => {
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(2);
  });

  it('should handle on many times', () => {
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(2);
  });

  it('should handle off', async () => {
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.off(event, handler);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(1);
  });

  it('should handle off globally', async () => {
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.off(event);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(1);
  });

  it('should handle once', async () => {
    localVue = createLocalVue();
    localVue.use(VueBeam, { adapter: 'foo' });
    wrapper = getWrapper();
    $beam = wrapper.vm.$beam;

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    $beam.once(event, handler1);
    $beam.on(event, handler2);
    $beam.emit(event, payload);
    $beam.emit(event, payload);
    $beam.emit(event, payload);
    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(3);
  });
});
