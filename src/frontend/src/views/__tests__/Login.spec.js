import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login";
import Button from "@/common/components/AppButton";
import { generateMockStore } from "@/store/mock";
import VueRouter from "vue-router";
const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);
const router = new VueRouter();
describe("Login", () => {
  const stubs = ["router-link", "router-view"];
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };
  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
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

  //Проверяем, что при нажатии на кнопку Авторизоваться, срабатывает нужный метод
  it("login button is calls login action", async () => {
    createComponent({
      localVue,
      store,
      stubs,
      router,
    });
    const button = wrapper.findComponent(Button);
    await wrapper.find('[name="email"]').setValue("user@example.com");
    await wrapper.find('[name="password"]').setValue("user@example.com");
    await button.trigger("click");
    expect(actions.Auth.login).toHaveBeenCalled();
  });
  //Проверяем, что при клике по кнопке "Хочу еще одну", мы переходим на главную страницу
  // it("when login button is calls router push main page", async () => {
  //   createComponent({
  //     localVue,
  //     store,
  //     stubs,
  //     router,
  //   });
  //   const button = wrapper.findComponent(Button);
  //   await wrapper.find('[name="email"]').setValue("user@example.com");
  //   await wrapper.find('[name="password"]').setValue("user@example.com");
  //   await button.trigger("click");
  //   expect(wrapper.vm.$route.path).toBe("/");
  // });
});
