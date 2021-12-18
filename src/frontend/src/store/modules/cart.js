import Vue from "vue";
import Vuex from "vuex";
import {
  SET_CART,
  SET_CART_REPEAT_ORDER,
  SET_MISC,
  CLEAN_CART,
  SET_PIZZA_COUNT,
  SET_ADDITIONAL_COUNT,
} from "./mutation-types";
import { cloneDeep } from "lodash";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    pizza: [],
    misc: [],
    total: 0,
  },
  getters: {
    finalOrderPrice(state) {
      let orderPrice = 0;
      if (state.pizza) {
        state.pizza.forEach((pizza) => {
          orderPrice += pizza.total * pizza.count;
        });
      }
      if (state.misc) {
        state.misc.forEach((misc) => {
          orderPrice += misc.price * misc.count;
        });
      }
      return orderPrice;
    },
  },
  mutations: {
    [SET_MISC](state, payload) {
      state.misc = payload.misc;
      state.misc.forEach((misc) => {
        misc.count = 0;
      });
    },
    [SET_CART](state, payload) {
      const pizza = cloneDeep(payload.pizza);
      let newPizza = true;
      if ("id" in pizza) {
        newPizza = false;
      }
      if (!newPizza) {
        state.pizza[pizza.id] = pizza;
      } else {
        pizza.count = 1;
        pizza.total = payload.total;
        state.pizza.push(pizza);
      }
    },
    [SET_CART_REPEAT_ORDER](state, payload) {
      const order = cloneDeep(payload);
      order.orderPizzas.forEach((item) => {
        let pizza = {};
        pizza.dough = [];
        pizza.sauces = [];
        pizza.sizes = [];
        pizza.dough.push(item.dough);
        pizza.sauces.push(item.sauce);
        pizza.sizes.push(item.size);
        pizza.ingredients = item.ingredientsOrder;
        pizza.total = item.total / item.quantity;
        pizza.name = item.name;
        pizza.count = item.quantity;
        state.pizza.push(pizza);
      });
      order.misc.forEach((orderMisc) => {
        state.misc.forEach((misc) => {
          if (misc.id === orderMisc.id) {
            misc.count += orderMisc.count;
          }
        });
      });
    },
    [CLEAN_CART](state) {
      state.pizza = [];
      state.total = [];
      state.misc.forEach((misc) => {
        misc.count = 0;
      });
    },
    [SET_PIZZA_COUNT](state, payload) {
      let pizza = cloneDeep(state.pizza[payload.index]);
      if (payload.add) {
        pizza.count += 1;
      } else {
        pizza.count -= 1;
      }
      if (pizza.count > 0) {
        Vue.set(state.pizza, payload.index, pizza);
      } else {
        state.pizza.splice(payload.index, 1);
        if (state.pizza.length === 0) {
          state.misc.forEach((misc) => {
            misc.count = 0;
          });
        }
      }
    },
    [SET_ADDITIONAL_COUNT](state, payload) {
      let misc = cloneDeep(state.misc[payload.index]);
      if (payload.add) {
        misc.count += 1;
      } else {
        misc.count -= 1;
      }
      Vue.set(state.misc, payload.index, misc);
    },
  },
  actions: {
    async getMisc({ commit }) {
      const data = await this.$api.misc.query();
      commit(SET_MISC, { misc: data });
    },
    async addToCart({ commit, dispatch }, payload) {
      commit(SET_CART, payload);
      dispatch("Builder/resetBuilder", null, { root: true });
    },
  },
};
