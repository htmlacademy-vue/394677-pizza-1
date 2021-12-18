import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Header from "@/common/components/Header";
import { generateMockStore } from "@/store/mock";
import { SET_USER } from "@/store/modules/mutation-types";
import user from "@/static/user.json";
import VueRouter from "vue-router";
const localVue = createLocalVue();
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit("Auth/" + SET_USER, { isAuthenticated: true, user: user });
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
    beforeEach(() => {
      authenticateUser(store);
      createComponent({ localVue, store, stubs });
    });

    it("should display user name", () => {
      expect(wrapper.find(".header__user").text()).toContain("Вася Пупкин");
    });

    it("should show router-link with class header__logout", () => {
      expect(wrapper.find(".header__logout").exists()).toBeTruthy();
    });

    it("should not show router-link with class header__login", () => {
      expect(wrapper.find(".header__login").exists()).toBeFalsy();
    });

    it("logout button is calls logout action", async () => {
      const link = wrapper.find(".header__logout");
      await link.trigger("click");
      expect(actions.Auth.logout).toHaveBeenCalled();
    });
  });

  // Проверяем, что при получение из store isAuthenticated false генерируются нужные ссылки.
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
