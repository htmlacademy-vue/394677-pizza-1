import Vue from "vue";
import Vuex from "vuex";
import {
  SET_CART,
  SET_MISC,
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
    shippingInformation: {
      receiveOrder: "",
    },
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
      Vue.set(state, "misc", payload);
      state.misc.forEach((misc) => {
        Vue.set(misc, "count", 0);
      });
    },
    [SET_CART](state, payload) {
      let newPizza = true;
      if (payload) {
        Object.keys(payload.pizza).forEach((item) => {
          if (item === "id") {
            newPizza = false;
          }
        });
        if (!newPizza) {
          Vue.set(state.pizza[payload.pizza.id], "total", payload.total);
        } else {
          let pizza = cloneDeep(payload.pizza);
          pizza.count = 1;
          pizza.total = payload.total;
          state.pizza.push(pizza);
        }
      }
    },
    [SET_PIZZA_COUNT](state, payload) {
      let pizza = cloneDeep(state.pizza[payload.index]);
      if (payload.add) {
        pizza.count += 1;
      } else {
        pizza.count -= 1;
      }
      Vue.set(state.pizza, payload.index, pizza);
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
      data.splice(3);
      commit(SET_MISC, data);
    },
  },
};
