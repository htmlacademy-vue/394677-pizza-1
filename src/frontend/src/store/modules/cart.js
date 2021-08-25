import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    additionalGoods: [
      {
        name: "",
        price: null,
      },
    ],
    total: null,
    receiveOrder: {
      independently: true,
      courier: false,
    },
    phoneNumber: null,
    address: {
      street: "",
      house: "",
      apartment: "",
    },
  },
  getters: {},
  mutations: {},
  actions: {},
});
