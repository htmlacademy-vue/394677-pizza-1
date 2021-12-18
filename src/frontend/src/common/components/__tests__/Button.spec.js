import { shallowMount } from "@vue/test-utils";
import Button from "@/common/components/Button";
describe("Button", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const slots = { default: "content" };
  const listeners = { click: null };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(Button, options);
  };

  // Перед каждым тестом мы будем заменять click-событие свежей jest-функцией.
  // Это нужно для того, чтобы очистить информацию о вызове в предыдущих тестах.
  beforeEach(() => {
    listeners.click = jest.fn();
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  // Проверяем, что при получение пропса disabled true устанавливается атрибут disabled и соответствующий класс.
  describe("when disabled true", () => {
    beforeEach(() => {
      createComponent({
        propsData: {
          disabled: true,
        },
      });
    });

    it("should set disabled on button", () => {
      let button = wrapper.find("button");
      expect(button.attributes("disabled")).toBe("disabled");
    });

    it("should set disabled class on button", () => {
      let button = wrapper.find("button");
      expect(button.classes()).toContain("button--disabled");
    });
  });

  describe("when disabled not set", () => {
    beforeEach(() => {
      createComponent();
    });

    it("should not set disabled on button", () => {
      let button = wrapper.find("button");
      expect(button.attributes("disabled")).toBe(undefined);
    });

    it("should not set disabled class on button", () => {
      let button = wrapper.find("button");
      expect(button.classes()).not.toContain("button--disabled");
    });
  });

  // Проверяем, что кнопка отображает контент дефолтного слота.
  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  // Вызывает событие click при нажатии.
  it("raises the click event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });
});
