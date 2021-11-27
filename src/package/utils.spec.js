import { get, pushEmitted, pushHandled, typeResolverFactory, uuid, WILDCARD } from './utils';

describe('utils', () => {
  describe('uuid', () => {
    it('should generate unique ids', () => {
      const uuids = Array(1000)
        .fill(',')
        .map(uuid);

      expect(uuids.length).toBe([...new Set(uuids)].length);
    });
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

  describe('typeResolverFactory', () => {
    it('should resolve event types', () => {
      expect(typeResolverFactory()('event')).toBe('event');
      expect(typeResolverFactory('beam')('event')).toBe('beam:event');
      expect(typeResolverFactory('beam')(WILDCARD)).toBe(WILDCARD);
    });
  });

  describe('pushEmitted', () => {
    it('should push emitted events to cache', () => {
      const state = { emitted: {} };
      const payload = { foo: 'bar' };

      pushEmitted(state, 'event1', payload);
      pushEmitted(state, 'event2', payload);
      pushEmitted(state, 'event2', payload);
      expect(state.emitted).toEqual({ event1: [payload], event2: [payload, payload] });
    });
  });

  describe('pushHandled', () => {
    it('should push handled events to cache', () => {
      const state = { handled: {} };
      const payload = { foo: 'bar' };

      pushHandled(state, 'event1', payload);
      pushHandled(state, 'event2', payload);
      pushHandled(state, 'event2', payload);
      expect(state.handled).toEqual({ event1: [payload], event2: [payload, payload] });
    });
  });
});
