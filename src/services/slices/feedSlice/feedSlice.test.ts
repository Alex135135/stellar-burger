import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('тестирование feedSlice', () => {
  describe('тестирование асинхронного экшена getFeeds', () => {
    test('тест синхронного экшена getFeeds.pending', () => {
      const newState = feedSlice(initialState, {
        type: getFeeds.pending.type,
        payload: null
      });
      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });

    test('тест синхронного экшена getFeeds.rejected', () => {
      const newState = feedSlice(initialState, {
        type: getFeeds.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('error');
    });

    test('тест синхронного экшена getFeeds.fulfilled', () => {
      const newState = feedSlice(initialState, {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order1', 'order2'] }
      });
      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(['order1', 'order2']);
    });
  });
});
