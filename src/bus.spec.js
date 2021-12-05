import { createLocalVue, shallowMount } from '@vue/test-utils';

import VueBeam from './index';
import busFactory from './bus-factory';

jest.useFakeTimers();

const getWrapper = () => {
  return shallowMount({ template: `<div><span></span></div>` }, { localVue });
};

const event = 'event-1';
const payload = { foo: 'bar' };

let localVue;
let wrapper;
let $beam;
let bus;

function init() {
  localVue = createLocalVue();
  localVue.use(VueBeam);
  wrapper = getWrapper();
  $beam = wrapper.vm.$beam;
  bus = busFactory();
}

describe('bus', () => {
  it('should emit many times', () => {
    init();
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(2);
  });

  it('should handle on many times', () => {
    init();
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.emit(event, payload);
    expect(handler).toBeCalledTimes(2);
  });

  it('should handle off', () => {
    init();
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.off(event, handler);
    $beam.emit(event, payload);
    expect(handler).toHaveBeenNthCalledWith(1, payload, event);
  });

  it('should handle off globally', () => {
    init();
    const handler = jest.fn();

    $beam.on(event, handler);
    $beam.emit(event, payload);
    $beam.off(event);
    $beam.off('another');
    $beam.emit(event, payload);
    expect(handler).toHaveBeenNthCalledWith(1, payload, event);
  });

  it('should handle once', () => {
    init();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    $beam.once(event, handler1);
    $beam.on(event, handler2);
    $beam.emit(event, payload);
    $beam.emit(event, payload);
    bus.emit(event, payload);
    expect(handler1).toHaveBeenNthCalledWith(1, payload, event);
    expect(handler2).toBeCalledTimes(3);
  });

  it('should debounce emit', () => {
    const handler1 = jest.fn();
    const delay = 500;
    const debounced = $beam.debouncedEmit(delay, event);

    $beam.on(event, handler1);

    for (let i = 0; i < 100; i++) {
      debounced(payload);
    }

    jest.runAllTimers();

    expect(handler1).toBeCalledTimes(1);
  });

  it('should make two instances', () => {
    init();
    const $internalBeam = busFactory('internal');
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();

    $beam.on(event, handler1);
    $beam.on(event, handler2);
    $internalBeam.on(event, handler2);
    $internalBeam.on(event, handler3);
    $beam.emit(event, payload);
    $internalBeam.emit(event, payload);
    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(2);
    expect(handler3).toBeCalledTimes(1);
  });

  it('should handle wildcard event types', () => {
    init();
    const handler1 = jest.fn();

    $beam.on('*', handler1);
    $beam.emit('another', payload);
    expect(handler1).toBeCalledTimes(1);
  });
});
