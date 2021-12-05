import { debounce, get, pushEmitted, pushHandled } from './utils';

jest.useFakeTimers();

const payload = { foo: 'bar' };
let state;

describe('utils', () => {
  beforeEach(() => {
    state = { emitted: {}, handled: {} };
  });

  describe('get', () => {
    it('should get items in an object', () => {
      const obj = { food: { mx: ['tacos', 'nachos'] } };

      expect(get(obj, 'food')).toEqual(obj.food);
      expect(get(obj, 'food.mx')).toEqual(obj.food.mx);
      expect(get(obj, ['food', 'mx'])).toEqual(obj.food.mx);
      expect(get(obj, 'nothing')).toBeUndefined();
      expect(get(obj, 'nothing', 'default')).toBe('default');
    });
  });

  describe('pushEmitted', () => {
    it('should push emitted events to cache', () => {
      pushEmitted(state, 'event1', payload);
      pushEmitted(state, 'event2', payload);
      pushEmitted(state, 'event2', payload);
      expect(state.emitted).toEqual({ event1: [payload], event2: [payload, payload] });
    });
  });

  describe('pushHandled', () => {
    it('should push handled events to cache', () => {
      pushHandled(state, 'event1', payload);
      pushHandled(state, 'event2', payload);
      pushHandled(state, 'event2', payload);
      expect(state.handled).toEqual({ event1: [payload], event2: [payload, payload] });
    });
  });

  describe('debounce', () => {
    it('should debounce', () => {
      const delay = 500;
      const cb = jest.fn();
      const fn = debounce(cb, delay);

      for (let i = 0; i < 100; i++) {
        fn();
      }

      jest.runAllTimers();

      expect(cb).toBeCalledTimes(1);
    });
  });
});
