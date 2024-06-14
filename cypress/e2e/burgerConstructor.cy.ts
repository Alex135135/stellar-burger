const BASE_URL = 'https://norma.nomoreparties.space/api';
const SELECTOR_BUN1 = `[data-cy=643d69a5c3f7b9001cfa093c]`;
const SELECTOR_BUN2 = `[data-cy=643d69a5c3f7b9001cfa093d]`;
const SELECTOR_FILLING = `[data-cy=643d69a5c3f7b9001cfa0941]`;
const SELECTOR_ORDER_BUTTON = `[data-cy=order-button]`;
const SELECTOR_OVERLAY = `[data-cy=overlay]`;
const SELECTOR_ORDER_BUN_TOP = `.constructor-element_pos_top`;
const SELECTOR_ORDER_BUN_BOTTOM = `.constructor-element_pos_bottom`;
const SELECTOR_ORDER_FILLING = `.constructor-element`;
const SELECTOR_NO_BUN = `[data-cy=no-bun]`;
const SELECTOR_NO_FILLING = `[data-cy=no-filling]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'orderResponse.json'
  });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('Добавление ингредиента из списка в конструктор', () => {
  it('инкремент счетчика ингредиента', () => {
    cy.get(SELECTOR_FILLING).children('button').click();
    cy.get(SELECTOR_FILLING).find('.counter__num').contains('1');
  });
  describe('добавление булок и начинок', () => {
    it('добавление булки и начинки в список заказа', () => {
      cy.get(SELECTOR_BUN1).children('button').click();
      cy.get(SELECTOR_FILLING).children('button').click();
      cy.get(SELECTOR_ORDER_BUN_TOP)
        .find('.constructor-element__text')
        .contains('Краторная булка');
      cy.get(SELECTOR_ORDER_BUN_BOTTOM)
        .find('.constructor-element__text')
        .contains('Краторная булка');
      cy.get(SELECTOR_ORDER_FILLING)
        .find('.constructor-element__text')
        .contains('Биокотлета');
    });
    it('добавление булки после добавления начинок', () => {
      cy.get(SELECTOR_FILLING).children('button').click();
      cy.get(SELECTOR_BUN1).children('button').click();

      cy.get(SELECTOR_ORDER_BUN_TOP)
        .find('.constructor-element__text')
        .contains('Краторная булка');
      cy.get(SELECTOR_ORDER_BUN_BOTTOM)
        .find('.constructor-element__text')
        .contains('Краторная булка');
      cy.get(SELECTOR_ORDER_FILLING)
        .find('.constructor-element__text')
        .contains('Биокотлета');
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'test');
    cy.setCookie('accessToken', 'test');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });
  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('отправка заказа c проверкой корректности ответа', () => {
    cy.get(SELECTOR_BUN1).children('button').click();
    cy.get(SELECTOR_FILLING).children('button').click();
    cy.get(SELECTOR_ORDER_BUTTON).click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('h2').contains('42180');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
    cy.get(SELECTOR_NO_BUN).should('be.visible');
    cy.get(SELECTOR_NO_FILLING).should('be.visible');
  });
});

describe('Работа модальных окон:', () => {
  it('открытие модального окна ингредиента', () => {
    cy.get('@modal').should('be.empty');
    cy.get(SELECTOR_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0941');
    cy.get('@modal').find('h3').contains('Биокотлета');
  });
  it('закрытие по клику на крестик', () => {
    cy.get('@modal').should('be.empty');
    cy.get(SELECTOR_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
  it('закрытие по клику на оверлей', () => {
    cy.get('@modal').should('be.empty');
    cy.get(SELECTOR_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get(SELECTOR_OVERLAY).click({ force: true });
    cy.get('@modal').should('be.empty');
  });
});
