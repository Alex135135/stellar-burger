import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';

describe('тестирование userSlice', () => {
  describe('тестирование асинхронного экшена getUser', () => {
    test('тест синхронного экшена getUser.pending', () => {
      const newState = userSlice(initialState, {
        type: getUser.pending.type,
        payload: null
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe(null);
    });

    test('тест синхронного экшена getUser.rejected', () => {
      const newState = userSlice(initialState, {
        type: getUser.rejected.type,
        payload: null
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe(null);
    });

    test('тест синхронного экшена getUser.fulfilled', () => {
      const newState = userSlice(initialState, {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      });
      expect(newState.request).toBe(false);
      expect(newState.userData).toEqual({
        name: 'someName',
        email: 'someEmail'
      });
    });
  });
  describe('тестирование асинхронного экшена getOrdersAll', () => {
    test('тест синхронного экшена getOrdersAll.pending', () => {
      const newState = userSlice(initialState, {
        type: getOrdersAll.pending.type,
        payload: null
      });
      expect(newState.request).toBe(true);
      expect(newState.error).toBe(null);
    });

    test('тест синхронного экшена getOrdersAll.rejected', () => {
      const newState = userSlice(initialState, {
        type: getOrdersAll.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe('error');
    });

    test('тест синхронного экшена getOrdersAll.fulfilled', () => {
      const newState = userSlice(initialState, {
        type: getOrdersAll.fulfilled.type,
        payload: ['order1', 'order2']
      });
      expect(newState.request).toBe(false);
      expect(newState.userOrders).toEqual(['order1', 'order2']);
    });
  });

  describe('тестирование асинхронного экшена registerUser', () => {
    test('тест синхронного экшена registerUser.pending', () => {
      const newState = userSlice(initialState, {
        type: registerUser.pending.type,
        payload: null
      });
      expect(newState.request).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('тест синхронного экшена registerUser.rejected', () => {
      const newState = userSlice(initialState, {
        type: registerUser.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('тест синхронного экшена registerUser.fulfilled', () => {
      const newState = userSlice(initialState, {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.userData).toEqual({
        name: 'someName',
        email: 'someEmail'
      });
    });
  });
  describe('тестирование асинхронного экшена loginUser', () => {
    test('тест синхронного экшена loginUser.pending', () => {
      const newState = userSlice(initialState, {
        type: loginUser.pending.type,
        payload: null
      });
      expect(newState.loginUserRequest).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.error).toBe(null);
    });
    test('тест синхронного экшена loginUser.rejected', () => {
      const newState = userSlice(initialState, {
        type: loginUser.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('тест синхронного экшена loginUser.fulfilled', () => {
      const newState = userSlice(initialState, {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      });
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.userData).toEqual({
        name: 'someName',
        email: 'someEmail'
      });
    });
  });
  describe('тестирование асинхронного экшена updateUser', () => {
    test('тест синхронного экшена updateUser.pending', () => {
      const newState = userSlice(initialState, {
        type: updateUser.pending.type,
        payload: null
      });
      expect(newState.request).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('тест синхронного экшена updateUser.rejected', () => {
      const newState = userSlice(initialState, {
        type: updateUser.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('тест синхронного экшена updateUser.fulfilled', () => {
      const newState = userSlice(initialState, {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      });
      expect(newState.request).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.response).toEqual({
        name: 'someName',
        email: 'someEmail'
      });
    });
    describe('тестирование асинхронного экшена logoutUser', () => {
      test('тест синхронного экшена logoutUser.pending', () => {
        const newState = userSlice(initialState, {
          type: logoutUser.pending.type,
          payload: null
        });
        expect(newState.request).toBe(true);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
        expect(newState.error).toBe(null);
      });
      test('тест синхронного экшена logoutUser.rejected', () => {
        const newState = userSlice(initialState, {
          type: logoutUser.rejected.type,
          error: { message: 'error' }
        });
        expect(newState.isAuthChecked).toBe(false);
        expect(newState.isAuthenticated).toBe(true);
        expect(newState.request).toBe(false);
        expect(newState.error).toBe('error');
      });
      test('тест синхронного экшена logoutUser.fulfilled', () => {
        const newState = userSlice(initialState, {
          type: logoutUser.fulfilled.type,
          payload: null
        });
        expect(newState.isAuthChecked).toBe(false);
        expect(newState.isAuthenticated).toBe(false);
        expect(newState.request).toBe(false);
        expect(newState.error).toBe(null);
        expect(newState.userData).toBe(null);
      });
    });
  });
});
