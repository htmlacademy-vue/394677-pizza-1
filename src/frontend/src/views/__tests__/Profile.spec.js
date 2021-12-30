import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "@/views/Profile";
import Button from "@/common/components/AppButton";
import { generateMockStore } from "@/store/mock";
import VueRouter from "vue-router";
import user from "@/static/user.json";
import { SET_USER, SET_ADDRESSES } from "@/store/modules/mutation-types";

const localVue = createLocalVue();

localVue.use(VueRouter, Vuex);

const authenticateUser = (store) => {
  store.commit("Auth/" + SET_USER, { isAuthenticated: true, user: user });
};

const setAddresses = (store) => {
  store.commit("Address/" + SET_ADDRESSES, [
    {
      building: "111",
      comment: "comment",
      flat: "44",
      id: 1,
      name: "Название адреса",
      street: "Улица",
      userId: null,
    },
    {
      building: "222",
      comment: "comment",
      flat: "44",
      id: 1,
      name: "Название адреса",
      street: "Улица",
      userId: null,
    },
  ]);
};

describe("Profile", () => {
  const stubs = ["router-link", "router-view"];
  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
        logout: jest.fn(),
        getMe: jest.fn(),
      },

      Address: {
        deleteAddresses: jest.fn(),
        editAddresses: jest.fn(),
        saveAddresses: jest.fn(),
        createAddress: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("if user has an addresses, all addresses must be displayed", () => {
    authenticateUser(store);
    setAddresses(store);
    createComponent({ localVue, store, stubs });
    let addressesContainer = wrapper.findAll(".address-form__header");
    expect(addressesContainer.length).toBe(2);
  });

  describe("should display user data", () => {

    beforeEach(() => {
      authenticateUser(store);
      createComponent({ localVue, store, stubs });
    });

    it("should display user name", () => {
      expect(wrapper.find(".user__name").text()).toContain("Вася Пупкин");
    });

    it("should display user phone", () => {
      expect(wrapper.find(".user__phone").text()).toContain("+777 777 777");
    });

    it("should display user avatar", () => {
      expect(wrapper.find("img").attributes("src")).toBe(user.avatar);
    });
  });

  describe("if user has addresses should display user addresses", () => {

    beforeEach(() => {
      authenticateUser(store);
      setAddresses(store);
      createComponent({ localVue, store, stubs });
    });

    it("should display address name", () => {
      expect(wrapper.find(".layout__address").text()).toContain(
        "Название адреса"
      );
    });

    it("should display address street", () => {
      expect(wrapper.find(".layout__address").text()).toContain("Улица");
    });

    it("should display address building", () => {
      expect(wrapper.find(".layout__address").text()).toContain("111");
    });

    it("should display address flat", () => {
      expect(wrapper.find(".layout__address").text()).toContain("44");
    });

    it("should display address comment", () => {
      expect(wrapper.find(".layout__address").text()).toContain("comment");
    });
  });

  describe("when triggered editAddress button", () => {

    beforeEach(() => {
      authenticateUser(store);
      setAddresses(store);
      createComponent({ localVue, store, stubs });
    });

    it("should display edit form", async () => {
      const button = wrapper.find("button");
      await button.trigger("click");
      expect(wrapper.find("#edit").exists()).toBeTruthy();
    });

    describe("should display address data in edit form", () => {

      it("should display address name in header", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        expect(wrapper.find(".address-form__header").text()).toContain(
          "Название адреса"
        );
      });

      it("should display address name in input", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        const input = wrapper.find('[name="addr-name"]');
        expect(input.element.value).toEqual("Название адреса");
      });

      it("should display street in input", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        const input = wrapper.find('[name="addr-street"]');
        expect(input.element.value).toEqual("Улица");
      });

      it("should display building in input", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        const input = wrapper.find('[name="addr-house"]');
        expect(input.element.value).toEqual("111");
      });

      it("should display flat in input", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        const input = wrapper.find('[name="addr-apartment"]');
        expect(input.element.value).toEqual("44");
      });

      it("should display comment in input", async () => {
        const button = wrapper.find("button");
        await button.trigger("click");
        const input = wrapper.find('[name="addr-comment"]');
        expect(input.element.value).toEqual("comment");
      });
    });

    it("if triggered deleteAddress button should be trigger delete method", async () => {
      const edit = wrapper.find("button");
      await edit.trigger("click");
      const button = wrapper.findAllComponents(Button).at(0);
      await button.trigger("click");
      expect(actions.Address.deleteAddresses).toHaveBeenCalled();
    });

    it("if triggered edit address button should be trigger edit method", async () => {
      const edit = wrapper.find("button");
      await edit.trigger("click");
      const button = wrapper.find('[name="save-button"]');
      await button.trigger("click");
      expect(actions.Address.editAddresses).toHaveBeenCalled();
    });

    it("if triggered cancel button should not display edit form", async () => {
      const edit = wrapper.find("button");
      await edit.trigger("click");
      const button = wrapper.findAllComponents(Button).at(1);
      await button.trigger("click");
      expect(wrapper.find("#edit").exists()).toBeFalsy();
    });
  });

  describe("when triggered addAddress button", () => {

    beforeEach(() => {
      authenticateUser(store);
      createComponent({ localVue, store, stubs });
    });

    it("should display address form", async () => {
      const button = wrapper.find('[name="add-button"]');
      await button.trigger("click");
      expect(wrapper.find("#edit").exists()).toBeTruthy();
    });

    it("id triggered saveAddresses button for new address, should be trigger saveAddresses method", async () => {
      const add = wrapper.find('[name="add-button"]');
      await add.trigger("click");
      const button = wrapper.find('[name="save-button"]');
      await button.trigger("click");
      expect(actions.Address.saveAddresses).toHaveBeenCalled();
    });

    it("if triggered cancel button should not display add form", async () => {
      const add = wrapper.find("button");
      await add.trigger("click");
      const button = wrapper.findAllComponents(Button).at(0);
      await button.trigger("click");
      expect(wrapper.find("#edit").exists()).toBeFalsy();
    });
  });
});
