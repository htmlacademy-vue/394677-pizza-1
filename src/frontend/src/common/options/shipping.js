export default {
  shipping(user) {
    if (user) {
      return [
        { id: 1, name: "Получу сам" },
        { id: 2, name: "Новый адрес" },
        { id: 3, name: "Существующий адрес" },
      ];
    } else {
      return [
        { id: 1, name: "Получу сам" },
        { id: 2, name: "Новый адрес" },
      ];
    }
  },
};
