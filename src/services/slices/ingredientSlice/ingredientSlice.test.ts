import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('тестирование ingredientSlice', () => {
  describe('тестирование асинхронного экшена getIngredients', () => {

    test('тест синхронного экшена getIngredients.pending', () => {
      const newState = ingredientSlice(initialState, {
        type: getIngredients.pending.type,
        payload: null
      });
      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });

    test('тест синхронного экшена getIngredients.rejected', () => {
      const newState = ingredientSlice(initialState, {
        type: getIngredients.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('error');
    });

    test('тест синхронного экшена getIngredients.fulfilled', () => {
      const newState = ingredientSlice(initialState, {
        type: getIngredients.fulfilled.type,
        payload: ['ingredient1', 'ingredient2']
      });
      expect(newState.loading).toBe(false);
      expect(newState.ingredients).toEqual(['ingredient1', 'ingredient2']);
    });
  });
});
