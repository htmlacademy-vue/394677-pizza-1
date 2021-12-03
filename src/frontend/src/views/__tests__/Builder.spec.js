import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Builder from "@/views/Builder";
import { generateMockStore } from "@/store/mock";
import {
  SET_INGREDIENTS,
  SET_PIZZA_OPTIONS,
  SET_BUILDER,
} from "@/store/modules/mutation-types";
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppDrop from "@/common/components/AppDrop";
const localVue = createLocalVue();
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const setBuilder = (store) => {
  store.commit("Builder/" + SET_BUILDER, { pizza: pizza });
};
describe("Builder", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-link", "router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Builder, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        getBuilder: jest.fn(),
      },
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

  //Проверяем, в компонент отдает в дочерние нужные пропсы.
  describe("should set options to child components", () => {
    beforeEach(() => {
      setBuilder(store);
      createComponent({ localVue, store, stubs });
    });
    it("should set dough options", () => {
      store.commit("Builder/" + SET_PIZZA_OPTIONS, {
        name: "dough",
        options: pizza.dough,
      });
      let doughSelector = wrapper.findComponent(BuilderDoughSelector);
      expect(doughSelector.props("doughList")).toEqual(pizza.dough);
    });

    it("should set sizes options", () => {
      store.commit("Builder/" + SET_PIZZA_OPTIONS, {
        name: "sizes",
        options: pizza.sizes,
      });
      let builderSizeSelector = wrapper.findComponent(BuilderSizeSelector);
      expect(builderSizeSelector.props("sizes")).toEqual(pizza.sizes);
    });

    it("should set ingredients options", () => {
      const ingredients = pizza.ingredients;
      store.commit("Builder/" + SET_INGREDIENTS, { ingredients });
      let builderIngredientsSelector = wrapper.findComponent(
        BuilderIngredientsSelector
      );
      expect(builderIngredientsSelector.props("pizza")).toEqual(pizza);
    });
  });

  //Проверяем что при перетаскивании ингредиента на пиццу, его счетчик получает +1.
  it("when ingredient is dropping, his count is up", () => {
    createComponent({ localVue, store, stubs });
    store.commit("Builder/" + SET_INGREDIENTS, {
      ingredients: [
        {
          name: "Грибы",
          image: "/public/img/filling/mushrooms.svg",
          price: 33,
        },
      ],
    });
    let appDrop = wrapper.findComponent(AppDrop);
    appDrop.vm.$emit("drop", { name: "Грибы" });
    expect(store.state.Builder.pizza.ingredients[0].count).toEqual(1);
  });

  //Проверяем, что при монтировании компонента, если в pizza нет id, мы вызываем и getMisc и getBuilder
  describe("should be called methods when pizza has not an index", () => {
    beforeEach(() => {
      createComponent({ localVue, store, stubs });
    });
    //Проверяем, что при монтировании компонента, если в pizza нет id, мы вызываем getBuilder
    it("when pizza has not an index call getBuilder", () => {
      createComponent({ localVue, store, stubs });
      expect(actions.Builder.getBuilder).toHaveBeenCalled();
    });
    it("when pizza has not an index call getMisc", () => {
      createComponent({ localVue, store, stubs });
      expect(actions.Cart.getMisc).toHaveBeenCalled();
    });
  });

  //Проверяем, что при монтировании компонента, если в pizza нет id, мы вызываем и getMisc и getBuilder
  describe("should be called methods when pizza has not an index", () => {
    beforeEach(() => {
      setBuilder(store);
      createComponent({ localVue, store, stubs });
    });
    it("when pizza has an index dont call getBuilder", () => {
      store.commit("Builder/" + SET_BUILDER, { pizza, index: 0 });
      expect(actions.Builder.getBuilder).toHaveBeenCalledTimes(0);
    });

    //Проверяем, что при монтировании компонента, если в pizza есть id, мы вызываем getMisc
    it("when pizza has an index call getMisc", () => {
      store.commit("Builder/" + SET_BUILDER, { pizza, index: 0 });
      expect(actions.Cart.getMisc).toHaveBeenCalled();
    });
  });
});
