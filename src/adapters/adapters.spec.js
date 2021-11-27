import { createLocalVue, shallowMount } from '@vue/test-utils';
import { BEAMITTER } from '../constants';

import VueBeam from '../index';

jest.useFakeTimers();

const getWrapper = () => {
  return shallowMount({ template: `<div><span></span></div>` }, { localVue });
};

const event = 'event-1';
const payload = { foo: 'bar' };

let localVue;
let wrapper;
let $beam;

function init(adapter) {
  localVue = createLocalVue();
  localVue.use(VueBeam, { adapter });
  wrapper = getWrapper();
  $beam = wrapper.vm.$beam;
}

describe('adapters', () => {
  [BEAMITTER, 'not valid'].forEach(adapter => {
    it('should emit many times', () => {
      init(adapter);
      const handler = jest.fn();

      $beam.on(event, handler);
      $beam.emit(event);
      $beam.emit(event, payload);
      expect(handler).toBeCalledTimes(2);
    });

    it('should handle on many times', () => {
      init(adapter);
      const handler = jest.fn();

      $beam.on(event, handler);
      $beam.emit(event, payload);
      $beam.emit(event, payload);
      expect(handler).toBeCalledTimes(2);
    });

    it('should handle off', async () => {
      init(adapter);
      const handler = jest.fn();

      $beam.on(event, handler);
      $beam.emit(event, payload);
      $beam.off(event, handler);
      $beam.emit(event, payload);
      expect(handler).toBeCalledTimes(1);
    });

    it('should handle off globally', async () => {
      init(adapter);
      const handler = jest.fn();

      $beam.on(event, handler);
      $beam.emit(event, payload);
      $beam.off(event);
      $beam.emit(event, payload);
      expect(handler).toBeCalledTimes(1);
    });

    it('should handle once', async () => {
      init(adapter);
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
  });
});
