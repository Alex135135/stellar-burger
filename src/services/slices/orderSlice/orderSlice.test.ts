import orderSlice, { initialState, getOrderByNumber } from './orderSlice';

describe('тестирование orderSlice', () => {
  describe('тестирование асинхронного экшена getOrderByNumber', () => {
    test('тест синхронного экшена getOrderByNumber.pending', () => {
      const newState = orderSlice(initialState, {
        type: getOrderByNumber.pending.type,
        payload: null
      });
      expect(newState.request).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('тест синхронного экшена getOrderByNumber.rejected', () => {
      const newState = orderSlice(initialState, {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Funny mock-error' }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe('Funny mock-error');
    });
    test('тест синхронного экшена getOrderByNumber.fulfilled', () => {
      const newState = orderSlice(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['someOrder'] }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderByNumberResponse).toBe('someOrder');
    });
  });
});
