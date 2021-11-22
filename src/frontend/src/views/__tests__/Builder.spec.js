import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import { SET_USER, SET_BUILDER } from "@/store/modules/mutation-types";
import user from "@/static/user";
import pizza from "@/static/pizza";
import Builder from "@/views/Builder.vue";
import Button from "@/common/components/Button";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
localVue.component("Button", Button);
// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = (store) => {
  store.commit(SET_USER, {
    module: "Auth",
    entity: "user",
    value: user,
  });
  store.commit(SET_USER, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};

// Создаём вспомогательный метод для добавления колонок в тест-хранилище.
const setPizza = (store) => {
  store.commit(SET_BUILDER, {
    module: "builder",
    entity: "pizza",
    value: pizza,
  });
};

// Начало блока тестов
describe("Builder", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Builder, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Pizza: {
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
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

  it("displays ingridients with ingridients class", () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".ingridients__list").exists()).toBeTruthy();
  });

  it("displays ingridients without ingridients class", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".ingridients__list").exists()).toBeFalsy();
  });

  it("displays add ingridient button", () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="add"]');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe("Больше");
  });

  it("displays reduce ingridient button", () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="reduce"]');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe("Меньше");
  });

  it("doesn't display add ingridient button", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="add"]').exists()).toBeFalsy();
  });

  it("doesn't display reduce ingridient button", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="reduce"]').exists()).toBeFalsy();
  });

  it("add ingridient to cart", async () => {
    authenticateUser(store);
    setPizza(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="addToCart"]');
    await button.trigger("click");
    // expect(actions.Columns.post).toHaveBeenCalledWith(
    //   expect.any(Object), // The Vuex context
    //   { title: "Новый столбец" }
    // );
  });

  // it("renders users filters", () => {
  //   createComponent({ localVue, store, stubs });
  //   const filters = wrapper.findAll('[data-test="user-filter"]');
  //   expect(Array.from(filters).length).toEqual(user.length);
  // });
  //
  // it("sets active user filter on click", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const filter = wrapper.find('[data-test="user-filter"]');
  //   await filter.trigger("click");
  //   expect(filter.attributes("class")).toContain("active");
  // });
  //
  // it("doesn't have active user filter", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const filter = wrapper.find('[data-test="user-filter"]');
  //   expect(filter.attributes("class")).not.toContain("active");
  // });
  //
  // it("calls the vuex mutation on user filter click", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const spyOnMutation = jest.spyOn(wrapper.vm, "UPDATE_FILTERS");
  //   const filter = wrapper.find('[data-test="user-filter"]');
  //   await filter.trigger("click");
  //   expect(spyOnMutation).toHaveBeenCalledWith({ users: [user.id] });
  // });
  //
  // it("sets active status filter on click", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const filter = wrapper.find('[data-test="status-filter"]');
  //   await filter.trigger("click");
  //   expect(filter.attributes("class")).toContain("active");
  // });
  //
  // it("doesn't have active status filter", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const filter = wrapper.find('[data-test="status-filter"]');
  //   expect(filter.attributes("class")).not.toContain("active");
  // });
  //
  // it("calls the vuex mutation on status filter click", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const spyOnMutation = jest.spyOn(wrapper.vm, "UPDATE_FILTERS");
  //   const filter = wrapper.find('[data-test="status-filter"]');
  //   await filter.trigger("click");
  //   expect(spyOnMutation).toHaveBeenCalledWith({
  //     statuses: [STATUSES[0].value],
  //   });
  // });

  // it("renders status filter icon", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const filter = wrapper.find('[data-test="status-filter-icon"]');
  //   expect(filter.attributes("class")).toContain(
  //     `meta-filter__status--${STATUSES[0].value}`
  //   );
  // });
  //
  // it("renders columns", async () => {
  //   createColumns(store);
  //   createComponent({ localVue, store, stubs });
  //   const columnsHtml = wrapper.findAll('[data-test="columns"]');
  //   expect(Array.from(columnsHtml).length).toEqual(columns.length);
  // });
  //
  // it("doesn't render columns", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const columnsHtml = wrapper.findAll('[data-test="columns"]');
  //   expect(columnsHtml.exists()).toBeFalsy();
  // });
  //
  // it("calls column update action", () => {
  //   createColumns(store);
  //   createComponent({ localVue, store, stubs });
  //   const columnHtml = wrapper.find('[data-test="columns"]');
  //   columnHtml.vm.$emit("update", "test");
  //   expect(actions.Columns.put).toHaveBeenCalledWith(
  //     expect.any(Object), // The Vuex context
  //     "test"
  //   );
  // });
  //
  // it("calls column delete action", () => {
  //   createColumns(store);
  //   createComponent({ localVue, store, stubs });
  //   const columnHtml = wrapper.find('[data-test="columns"]');
  //   columnHtml.vm.$emit("delete", "test");
  //   expect(actions.Columns.delete).toHaveBeenCalledWith(
  //     expect.any(Object), // The Vuex context
  //     "test"
  //   );
  // });
  //
  // it("renders no-columns text", async () => {
  //   createComponent({ localVue, store, stubs });
  //   const text = wrapper.findAll('[data-test="no-columns-text"]');
  //   expect(text.exists()).toBeTruthy();
  // });
  //
  // it("doesn't render no-columns text", async () => {
  //   createColumns(store);
  //   createComponent({ localVue, store, stubs });
  //   const text = wrapper.findAll('[data-test="no-columns-text"]');
  //   expect(text.exists()).toBeFalsy();
  // });
});
