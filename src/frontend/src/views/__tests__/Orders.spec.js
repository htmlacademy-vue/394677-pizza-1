import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "@/views/Orders";
import Button from "@/common/components/AppButton";
import { generateMockStore } from "@/store/mock";
import VueRouter from "vue-router";
import {
  SET_USER,
  SET_MISC,
  SET_ORDERS,
  SET_BUILDER,
  SET_INGREDIENTS,
  SET_PIZZA_OPTIONS,
} from "@/store/modules/mutation-types";
import user from "@/static/user.json";
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);
const router = new VueRouter();

const authenticateUser = (store) => {
  store.commit("Auth/" + SET_USER, { isAuthenticated: true, user: user });
};

const setBuilder = (store) => {
  store.commit("Builder/" + SET_BUILDER, { pizza: pizza });
};
const setIngredients = (store) => {
  const ingredients = pizza.ingredients;
  store.commit("Builder/" + SET_INGREDIENTS, { ingredients });
};
const setPizzaDough = (store) => {
  store.commit("Builder/" + SET_PIZZA_OPTIONS, {
    name: "dough",
    options: pizza.dough,
  });
};
const setPizzaSizes = (store) => {
  store.commit("Builder/" + SET_PIZZA_OPTIONS, {
    name: "sizes",
    options: pizza.sizes,
  });
};

const setPizzaSauces = (store) => {
  store.commit("Builder/" + SET_PIZZA_OPTIONS, {
    name: "sauces",
    options: pizza.sauces,
  });
};
const setMisc = (store) => {
  store.commit("Cart/" + SET_MISC, { misc: misc });
};

const orders = [
  {
    id: 2,
    userId: "ec193aee-7a8c-436a-8ba5-87f1293fb8fa",
    addressId: 1,
    orderPizzas: [
      {
        id: 2,
        name: "foo",
        quantity: 1,
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        orderId: 2,
        ingredients: [{ id: 2, quantity: 1, pizzaId: 2, ingredientId: 6 }],
      },
    ],
    orderMisc: [{ id: 2, quantity: 2, orderId: 2, miscId: 2 }],
    orderAddress: {
      id: 1,
      name: "Название адреса",
      street: "Улица",
      building: "666",
      flat: "44",
      comment: "comment",
      userId: "ec193aee-7a8c-436a-8ba5-87f1293fb8fa",
    },
  },
  {
    id: 3,
    userId: "ec193aee-7a8c-436a-8ba5-87f1293fb8fa",
    addressId: 1,
    orderPizzas: [
      {
        id: 2,
        name: "foo",
        quantity: 1,
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        orderId: 2,
        ingredients: [{ id: 2, quantity: 1, pizzaId: 2, ingredientId: 6 }],
      },
    ],
  },
];

const setOrders = (store) => {
  store.commit("Orders/" + SET_ORDERS, orders);
};
describe("Orders", () => {
  const stubs = ["router-link", "router-view"];
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };
  beforeEach(() => {
    actions = {
      Builder: {
        getBuilder: jest.fn(),
      },
      Cart: {
        getMisc: jest.fn(),
      },
      Orders: {
        getOrders: jest.fn(),
        deleteOrders: jest.fn(),
      },
      Auth: {
        login: jest.fn(),
        logout: jest.fn(),
        getMe: jest.fn(),
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
  it("when user has an orders, all orders must be displayed", () => {
    authenticateUser(store);
    setOrders(store);
    createComponent({ localVue, store, stubs });
    let ordersContainer = wrapper.findAll(".order");
    expect(ordersContainer.length).toBe(2);
  });
  describe("when user has an order in history should display order data", () => {
    beforeEach(() => {
      authenticateUser(store);
      setBuilder(store);
      setIngredients(store);
      setPizzaDough(store);
      setPizzaSizes(store);
      setPizzaSauces(store);
      setMisc(store);
      setOrders(store);
      createComponent({ localVue, store, stubs, router });
    });

    it("should display order id", () => {
      expect(wrapper.find(".order__wrapper").text()).toContain("Заказ # 2");
    });

    it("should display pizza name", () => {
      expect(wrapper.find(".product__text").text()).toContain("foo");
    });

    it("should display sauce name", () => {
      expect(wrapper.find(".product__text").text()).toContain(
        "Соус: Сливочный"
      );
    });
    it("should display size name", () => {
      expect(wrapper.find(".product__text").text()).toContain("23 см");
    });
    it("should display dough name", () => {
      expect(wrapper.find(".product__text").text()).toContain("Тонкое");
    });

    it("should display ingredient name", () => {
      expect(wrapper.find(".product__text").text()).toContain("Бекон");
    });
    it("should display pizza price", () => {
      expect(wrapper.find(".order__price").text()).toContain("392");
    });
    it("should display order price", () => {
      expect(wrapper.find(".order__wrapper").text()).toContain(
        "Сумма заказа: 412"
      );
    });
    describe("if the order came with additional items should display misc data ", () => {
      it("should display misc name", () => {
        expect(wrapper.find(".order__additional").text()).toContain(
          "Острый соус"
        );
      });
      it("should display misc price", () => {
        expect(wrapper.find(".order__additional").text()).toContain("20₽");
      });
    });
  });
  describe("if order delivery should display address data ", () => {
    beforeEach(() => {
      authenticateUser(store);
      setOrders(store);
      createComponent({ localVue, store, stubs, router });
    });
    it("should display order address street", () => {
      expect(wrapper.find(".order__address").text()).toContain("Улица");
    });
    it("should display order address building", () => {
      expect(wrapper.find(".order__address").text()).toContain("666");
    });
    it("should display order address flat", () => {
      expect(wrapper.find(".order__address").text()).toContain("44");
    });
  });
  it("delete order button is should delete action", async () => {
    authenticateUser(store);
    setOrders(store);
    createComponent({ localVue, store, stubs, router });
    const link = wrapper.findComponent(Button);
    await link.trigger("click");
    expect(actions.Orders.deleteOrders).toHaveBeenCalled();
  });
  it("repeat order button is should calls repeat mutation", async () => {
    authenticateUser(store);
    setOrders(store);
    createComponent({ localVue, store, stubs, router });
    const button = wrapper.findAllComponents(Button).at(1);
    await button.trigger("click");
    expect(store.state.Cart.pizza[0].name).toEqual("foo");
  });
  it("repeat order button is should calls router push cart page", async () => {
    authenticateUser(store);
    setOrders(store);
    createComponent({ localVue, store, stubs, router });
    const button = wrapper.findAllComponents(Button).at(1);
    await button.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/cart");
  });
});
