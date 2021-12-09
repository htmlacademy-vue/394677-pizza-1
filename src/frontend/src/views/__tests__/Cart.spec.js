import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "@/views/Cart";
import { generateMockStore } from "@/store/mock";
import {
  SET_BUILDER,
  SET_CART,
  SET_PIZZA_COUNT,
  SET_ADDITIONAL_COUNT,
  CLEAN_CART,
  SET_PIZZA_OPTIONS,
  SET_INGREDIENTS,
} from "@/store/modules/mutation-types";
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import ItemCounter from "@/common/components/ItemCounter";
const localVue = createLocalVue();
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const setBuilder = (store) => {
  store.commit("Builder/" + SET_BUILDER, { pizza: pizza });
};

const setCart = (store) => {
  store.commit("Cart/" + SET_CART, { pizza: pizza });
};
describe("Cart", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-link", "router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        getMisc: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
  //Проверяем, что в случае пустой корзины, мы выводим соответствующи блок с сообщением
  it("should show cart__empty if its empty", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
  });
  //Проверяем, что в случае не пустой корзины, предупреждающий о пустой корзине блок не выводится
  it("should not show cart__empty if its not empty", () => {
    setCart(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".cart__empty").exists()).toBe(false);
  });
  //Проверяем работу изменения кол-ва пиццы
  describe("should be change count when countPizza is triggered", () => {
    beforeEach(() => {
      createComponent({ localVue, store, stubs });
    });
    //Проверяем что при добавлении пиццы ее счетчик увеличивается
    it("when countPizza is add, the count should increase", () => {
      setCart(store);
      createComponent({ localVue, store, stubs });
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, true);
      expect(store.state.Cart.pizza[0].count).toEqual(2);
    });
    //Проверяем что при удалении пиццы ее счетчик уменьшается
    it("when countPizza is reduce, the count should decrease", () => {
      setCart(store);
      createComponent({ localVue, store, stubs });
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, true);
      itemCounter.vm.$emit("countItem", 0, false);
      expect(store.state.Cart.pizza[0].count).toEqual(1);
    });
    //Проверяем что если счетчик пиццы становится 0, она удаляется
    it("when countPizza is 0, the pizza should be removed", () => {
      setCart(store);
      createComponent({ localVue, store, stubs });
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, false);
      expect(store.state.Cart.pizza[0]).toBeFalsy();
    });
  });
});
