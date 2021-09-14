export default {
  shipping(user) {
    if (user) {
      return ["Получу сам", "Новый адрес", "Существующий адрес"];
    } else {
      return ["Получу сам", "Новый адрес"];
    }
  },
};
