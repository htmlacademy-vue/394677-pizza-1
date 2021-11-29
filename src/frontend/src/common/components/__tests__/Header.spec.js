import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Header from "@/common/components/Header";
import { generateMockStore } from "@/store/mock";
import { SET_USER } from "@/store/modules/mutation-types";
const localVue = createLocalVue();
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = (actions) => {
  console.log({ actionsSSSS: actions });
  actions.commit(SET_USER, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};

const logoutUser = (actions) => {
  actions.commit(SET_USER, {
    module: "Auth",
    entity: "isAuthenticated",
    value: { isAuthenticated: false, user: null },
  });
};
describe("Header", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-link", "router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Header, options);
  };

  beforeEach(() => {
    actions = {
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

  // Проверяем, что при получение из store isAuthenticated true генерирует нужные ссылки.
  describe("when isAuthenticated is true", () => {
    it("should show router-link with class header__logout", () => {
      authenticateUser(store);
      createComponent({ localVue, store, stubs });
      expect(wrapper.find(".header__logout").exists()).toBeTruthy();
    });

    it("should not show router-link with class header__login", () => {
      expect(wrapper.find(".header__login").exists()).toBeFalsy();
    });

    it("logout is active", async () => {
      authenticateUser(store);
      logoutUser(store);
      createComponent({ localVue, store, stubs });
      const link = wrapper.find(".header__logout");
      await link.trigger("click");
      expect(actions.Auth.post)
        .logout
        // expect.any(Object), // The Vuex context
        // { title: "Новый столбец" }
        ();
    });
  });

  // Проверяем, что при получение из store isAuthenticated false генерирует нужные ссылки.
  describe("when isAuthenticated is false", () => {
    beforeEach(() => {
      createComponent({ localVue, store, stubs });
    });

    it("should not show router-link with class header__logout", () => {
      expect(wrapper.find(".header__logout").exists()).toBeFalsy();
    });

    it("should show router-link with class header__login", () => {
      expect(wrapper.find(".header__login").exists()).toBeTruthy();
    });
  });
});
