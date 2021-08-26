import Vue from "vue";
import Vuex from "vuex";
import {
  SET_BUILDER,
  COUNT_INGREDIENT,
  MOVE_INGREDIENT,
  CHANGE_OPTIONS,
  INPUT_SET_NAME,
} from "./mutation-types";
import pizza from "@/static/pizza";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    pizza: {},
  },
  getters: {
    total(state) {
      let pizzaPrice = 0;
      Object.keys(state.pizza).forEach(function (key) {
        if (typeof state.pizza[key] !== "string") {
          state.pizza[key].forEach((item) => {
            if (item.checked) {
              pizzaPrice += item.price;
            }
            if (item.count) {
              pizzaPrice += item.count * item.price;
            }
          });
        }
      });
      return pizzaPrice;
    },
  },
  mutations: {
    [SET_BUILDER](state) {
      state.pizza = pizza;
      state.pizza.ingredients.forEach((ingredient) => {
        Vue.set(ingredient, "count", 0);
      });
      Vue.set(state.pizza.sauces[0], "checked", true);
      Vue.set(state.pizza.sizes[0], "checked", true);
      Vue.set(state.pizza.dough[0], "checked", true);
      Vue.set(state.pizza, "name", "");
    },
    [COUNT_INGREDIENT](state, payload) {
      let count = state.pizza.ingredients[payload.index].count;
      if (payload.add) {
        count += 1;
      } else {
        count -= 1;
      }
      Vue.set(state.pizza.ingredients[payload.index], "count", count);
    },
    [MOVE_INGREDIENT](state, payload) {
      state.pizza.ingredients.forEach((ingredient) => {
        if (ingredient.name === payload) {
          let count = ingredient.count + 1;
          Vue.set(ingredient, "count", count);
        }
      });
    },
    [CHANGE_OPTIONS](state, payload) {
      for (let i = 0; i < state.pizza.dough.length; i++) {
        state.pizza[payload.name][i].checked = i === payload.index;
      }
    },
    [INPUT_SET_NAME](state, payload) {
      Vue.set(state.pizza, "name", payload);
    },
  },
  actions: {},
};