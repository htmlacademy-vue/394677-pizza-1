import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "@/views/Cart";
import { generateMockStore } from "@/store/mock";
import Button from "@/common/components/Button";
import {
  SET_BUILDER,
  SET_CART,
  SET_MISC,
  SET_USER,
} from "@/store/modules/mutation-types";
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import ItemCounter from "@/common/components/ItemCounter";
import user from "@/static/user.json";
import VueRouter from "vue-router";
const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

const authenticateUser = (store) => {
  store.commit("Auth/" + SET_USER, { isAuthenticated: true, user: user });
};

const setCart = (store) => {
  store.commit("Cart/" + SET_CART, { pizza: pizza });
};

const setMisc = (store) => {
  store.commit("Cart/" + SET_MISC, { misc: misc });
};
const router = new VueRouter();
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
      Orders: {
        setOrders: jest.fn(),
      },
      Auth: {
        login: jest.fn(),
        logout: jest.fn(),
        getMe: jest.fn(),
      },
      Address: {
        getAddresses: jest.fn(),
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
      setCart(store);
      createComponent({ localVue, store, stubs });
    });
    //Проверяем что при добавлении пиццы ее счетчик увеличивается
    it("when countPizza is add, the count should increase", () => {
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, true);
      expect(store.state.Cart.pizza[0].count).toEqual(2);
    });
    //Проверяем что при удалении пиццы ее счетчик уменьшается
    it("when countPizza is reduce, the count should decrease", () => {
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, true);
      itemCounter.vm.$emit("countItem", 0, false);
      expect(store.state.Cart.pizza[0].count).toEqual(1);
    });
    //Проверяем что если счетчик пиццы становится 0, она удаляется
    it("when countPizza is 0, the pizza should be removed", () => {
      let itemCounter = wrapper.findComponent(ItemCounter);
      itemCounter.vm.$emit("countItem", 0, false);
      expect(store.state.Cart.pizza[0]).toBeFalsy();
    });
  });
  //Проверяем работу изменения кол-ва дополнительных товаров
  describe("should be change count when countAdditional is triggered", () => {
    beforeEach(() => {
      setCart(store);
      setMisc(store);
      createComponent({ localVue, store, stubs });
    });
    //Проверяем что при добавлении доп. товара его счетчик увеличивается
    it("when countAdditional is add, the count should increase", () => {
      let itemCounter = wrapper.findAllComponents(ItemCounter).at(-1);
      itemCounter.vm.$emit("countItem", 0, true);
      expect(store.state.Cart.misc[0].count).toEqual(1);
    });
    //Проверяем что при удалении доп. товара его счетчик уменьшается
    it("when countAdditional is reduce, the count should decrease", () => {
      let itemCounter = wrapper.findAllComponents(ItemCounter).at(-1);
      itemCounter.vm.$emit("countItem", 0, true);
      itemCounter.vm.$emit("countItem", 0, false);
      expect(store.state.Cart.misc[0].count).toEqual(0);
    });
  });

  //Проверяем, что если пользователь авторизован, его номер тел. выводится в форме
  it("when isAuthenticated is true should display user's phone", () => {
    authenticateUser(store);
    setCart(store);
    setMisc(store);
    createComponent({ localVue, store, stubs });
    const phone = wrapper.find('[name="phone"]');
    expect(phone.element.value).toEqual("+777 777 777");
  });
  //Проверяем, что при изменении пиццы в билдер попадает id пиццы
  it("changePizza button is calls changePizza mutation", () => {
    setCart(store);
    setMisc(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find(".cart-list__edit");
    //ошибка push при переходе на главную страницу
    button.trigger("click");
    expect(store.state.Builder.pizza.id).toBe(0);
  });

  //Проверяем что при оформлении заказа срабатывает нужный метод
  it("setOrder button is calls setOrders action", async () => {
    setCart(store);
    setMisc(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.findComponent(Button);
    await button.trigger("click");
    expect(actions.Orders.setOrders).toHaveBeenCalled();
  });
  //Проверяем что при оформлении заказа корзина очищается
  it("after setOrders action the pizza in cart is empty", async () => {
    setCart(store);
    setMisc(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.findComponent(Button);
    await button.trigger("click");
    expect(store.state.Cart.pizza).toEqual([]);
  });

  //Проверяем, что при клике по кнопке "Хочу еще одну", мы переходим на главную страницу
  it("click link footer__more is calls router push main page", () => {
    setCart(store);
    createComponent({
      localVue,
      store,
      stubs,
      router,
    });
    const link = wrapper.find(".footer__more");
    link.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
