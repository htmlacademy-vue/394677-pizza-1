import { shallowMount } from "@vue/test-utils";
import AppModal from "@/common/components/AppModal";
import AppButton from "@/common/components/AppButton";

describe("AppModal", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppModal, options);
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
      const button = wrapper.findComponent(AppButton);
      await button.trigger("click");
      expect(wrapper.emitted()).toBeTruthy();
    });
  });
});
