import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient,
  TConsturctorState
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';

describe('тестирование constructorSlice', () => {
  const bun: Omit<TConstructorIngredient, 'id'> = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  const ingredient1: Omit<TConstructorIngredient, 'id'> = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ingredient2: Omit<TConstructorIngredient, 'id'> = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const ingredient3: Omit<TConstructorIngredient, 'id'> = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };

  describe('тестирование экшена addIngredient', () => {
    const initialState: TConsturctorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(ingredient1)
      );

      const ingredientFromState = newState.constructorItems.ingredients[0];

      expect(ingredientFromState).toEqual({
        ...ingredient1,
        id: expect.any(String)
      });
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const initialState: TConsturctorState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            ...ingredient1,
            id: 'helloWorld'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredient('helloWorld')
      );

      const ingredientsFromState = newState.constructorItems.ingredients;
      expect(ingredientsFromState).toEqual([]);
    });
  });

  describe('тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const ing1WithId = {
      ...ingredient1,
      id: 'helloWorld'
    };

    const ing2WithId = {
      ...ingredient2,
      id: 'helloWorld2'
    };

    const ing3WithId = {
      ...ingredient3,
      id: 'helloWorld3'
    };

    const bunWithId = {
      ...bun,
      id: 'helloBun'
    };

    const initialIngredients: TConstructorIngredient[] = [
      ing1WithId,
      ing2WithId,
      ing3WithId
    ];

    const initialState = {
      constructorItems: {
        bun: bunWithId,
        ingredients: initialIngredients
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('перемещение ингредиента на позицию выше', () => {
      const pos = 2;
      const newState = constructorSlice(initialState, moveIngredientUp(pos));

      const expected = [ing1WithId, ing3WithId, ing2WithId];
      const recived = newState.constructorItems.ingredients;

      expect(recived).toEqual(expected);
    });
    test('перемещение ингредиента на позицию ниже', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(1));
      const expected = [ing1WithId, ing3WithId, ing2WithId];
      const recived = newState.constructorItems.ingredients;

      expect(recived).toEqual(expected);
    });
  });

  describe('тестирование асинхронного экшена orderBurger', () => {
    test('тест синхронного экшена orderBurger.pending', () => {
      const newState = constructorSlice(initialState, {
        type: orderBurger.pending.type,
        payload: null
      });
      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('тест синхронного экшена orderBurger.rejected', () => {
      const newState = constructorSlice(initialState, {
        type: orderBurger.rejected.type,
        error: { message: 'error' }
      });
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('error');
      expect(newState.orderModalData).toBe(null);
    });
    test('тест синхронного экшена orderBurger.fulfilled', () => {
      const newState = constructorSlice(initialState, {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 123 } }
      });
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderModalData?.number).toBe(123);
    });
  });
});
