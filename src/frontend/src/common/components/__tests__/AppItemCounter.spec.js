import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";
describe("AppItemCounter", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };
  beforeEach(() => {
    createComponent({
      propsData: {
        index: 0,
        item: {
          count: 0,
        },
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  describe("should set props data", () => {
    beforeEach(() => {
      createComponent({
        propsData: {
          index: 0,
          classNameButton: "foo",
          item: {
            count: 2,
          },
        },
      });
    });
    it("input should display item count", () => {
      let input = wrapper.find("input");
      expect(input.element.value).toEqual("2");
    });
    it("if 'plus' button get classNameButton its should be set", () => {
      let button = wrapper.find(".counter__button--plus");
      expect(button.attributes("class")).toContain("foo");
    });
  });

  it("should set disabled on 'plus' button if count reached limit", () => {
    createComponent({
      propsData: {
        index: 0,
        restrictions: 10,
        item: {
          count: 10,
        },
      },
    });
    let button = wrapper.find(".counter__button--plus");
    expect(button.attributes("disabled")).toBe("true");
  });
  it("should set disabled on 'minus' button if count is 0", () => {
    let button = wrapper.find(".counter__button--minus");
    expect(button.attributes("disabled")).toBe("true");
  });
  it("should emit countItem with arguments", () => {
    wrapper.vm.$emit("countItem", 0, true);
    expect(wrapper.emitted().countItem).toEqual([[0, true]]);
  });
});
