import { shallowMount } from "@vue/test-utils";
import Button from "@/common/components/Button";
describe("Button", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const slots = { default: "content" };
  const defaultBtnClass = "button";
  const propsClassName = { className: "button" };
  const propsDisabledValue = { disabled: "disabled" };
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

  // Если входные параметры не переданы, класс кнопки задан по умолчанию.
  it("button class is button", () => {
    createComponent();
    expect(wrapper.attributes("class")).toBe(defaultBtnClass);
  });

  // Если class для кнопки задан входными параметрами.
  it("button class is submit", () => {
    createComponent({ propsClassName });
    expect(wrapper.attributes("class")).toBe(propsClassName.className);
  });

  // Если входные параметры не переданы, но значение disabled задано по умолчанию.
  it("disabled for button", () => {
    createComponent();
    expect(wrapper.attributes().disabled).toBeUndefined();
  });

  // Если disabled задан входными параметрами.
  it("disabled for button is submit", () => {
    createComponent({ propsDisabledValue });
    console.log(wrapper.attributes());
    expect(wrapper.attributes("class")).toBe(propsDisabledValue.disabled);
  });
});
