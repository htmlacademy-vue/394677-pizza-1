import Vue from "vue";
import Vuex from "vuex";
import { SET_ORDERS } from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {
    [SET_ORDERS](state, payload) {
      Vue.set(state, "orders", payload);
    },
  },
  actions: {
    async setOrders({ commit }, payload) {
      try {
        const data = await this.$api.orders.post(payload);
        commit(SET_ORDERS, data);
      } catch {
        console.log("Ошибка оформления заказов");
      }
    },
    async getOrders({ commit }, payload) {
      try {
        payload.addressId = 9;
        const data = await this.$api.orders.query(payload);
        commit(SET_ORDERS, data);
      } catch {
        console.log("Ошибка получения заказов");
      }
    },
  },
};
