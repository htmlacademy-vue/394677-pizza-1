import { shallowMount } from "@vue/test-utils";
import Modal from "@/common/components/Modal";
import Button from "@/common/components/Button";

describe("Modal", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Modal, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe("raises the click event on click", () => {
    beforeEach(() => {
      createComponent();
    });
    it("close modal click link", async () => {
      const link = wrapper.find("a");
      await link.trigger("click");
      expect(wrapper.emitted()).toBeTruthy();
    });
    it("close modal click button", async () => {
      const button = wrapper.findComponent(Button);
      await button.trigger("click");
      expect(wrapper.emitted()).toBeTruthy();
    });
  });
});
