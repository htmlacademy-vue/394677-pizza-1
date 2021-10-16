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
      const orders = [];
      state.orders.forEach((item) => {
        const order = cloneDeep(item);
        order.total = 0;
        order.misc = [];
        order.orderPizzas?.forEach((pizza) => {
          pizza.ingredientsTotal = 0;
          pizza.ingredientsOrder = [];
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
          pizza.ingredients.forEach((ingredientOrder) => {
            const ingredients = cloneDeep(rootState.Builder.pizza.ingredients);
            ingredients.forEach((ingredient) => {
              if (ingredientOrder.ingredientId === ingredient.id) {
                ingredient.count = ingredientOrder.quantity;
                pizza.ingredientsTotal += ingredient.price * ingredient.count;
                pizza.ingredientsOrder.push(ingredient);
              }
            });
          });
          pizza.total =
            (pizza.sauce?.price + pizza.dough?.price + pizza.ingredientsTotal) *
            pizza.size?.multiplier;
          order.total += pizza.total;
        });
        if (order.orderMisc) {
          order.orderMisc.forEach((item) => {
            const miscLIst = cloneDeep(rootState.Cart.misc);
            miscLIst.forEach((misc) => {
              if (item.miscId === misc?.id) {
                misc.count = item.quantity;
                order.total += misc.count * misc.price;
                order.misc.push(misc);
              }
            });
          });
        }
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
      if (payload.userId) {
        dispatch("getOrders");
      }
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
