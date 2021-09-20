import Vue from "vue";
import Vuex from "vuex";
import { SET_ORDERS, DELETE_ORDER } from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {
    [SET_ORDERS](state, payload) {
      state.orders = payload;
    },
    [DELETE_ORDER](state, payload) {
      state.orders.forEach((order, index) => {
        if (order.id === payload) {
          state.orders.splice(index, 1);
        }
      });
    },
  },
  actions: {
    async setOrders({ dispatch }, payload) {
      try {
        await this.$api.orders.post(payload);
      } catch {
        console.log("Ошибка оформления заказов");
      }
      dispatch("getOrders");
    },
    async getOrders({ commit }, payload) {
      try {
        const data = await this.$api.orders.query(payload);
        commit(SET_ORDERS, data);
      } catch {
        console.log("Ошибка получения заказов");
      }
    },
    async deleteOrders({ commit }, payload) {
      try {
        await this.$api.orders.delete(payload);
      } catch {
        console.log("Ошибка удаления заказа");
      }
      commit(DELETE_ORDER, payload);
    },
  },
};
