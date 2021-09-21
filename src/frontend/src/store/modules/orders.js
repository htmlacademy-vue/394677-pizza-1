import Vue from "vue";
import Vuex from "vuex";
import { SET_ORDERS, DELETE_ORDER } from "./mutation-types";
import { cloneDeep } from "lodash";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    formatOrders: (state, getters, rootState) => {
      console.log("getters", getters);
      console.log("rootState", rootState.Builder.pizza);
      const orders = [];
      state.orders.forEach((item) => {
        const order = cloneDeep(item);
        order.orderPizzas.forEach((pizza) => {
          rootState.Builder.pizza.dough.forEach((dough) => {
            if (pizza.doughId === dough.id) {
              pizza.dough = cloneDeep(dough);
            }
          });
          rootState.Builder.pizza.sizes.forEach((size) => {
            if (pizza.sizeId === size.id) {
              pizza.size = cloneDeep(size);
            }
          });
          rootState.Builder.pizza.sauces.forEach((sauce) => {
            if (pizza.sauceId === sauce.id) {
              pizza.sauce = cloneDeep(sauce);
            }
          });
          pizza.ingredientsData = [];
          pizza.ingredients.forEach((ingredient) => {
            rootState.Builder.pizza.ingredients.forEach((item) => {
              if (ingredient.ingredientId === item.id) {
                pizza.ingredientsData.push(item);
              }
            });
          });
        });
        order.misc = [];
        order.orderMisc.forEach((item) => {
          rootState.Cart.misc.forEach((misc) => {
            if (item.miscId === misc?.id) {
              order.misc.push(misc);
            }
          });
        });
        orders.push(order);
      });
      return orders;
    },
  },
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
