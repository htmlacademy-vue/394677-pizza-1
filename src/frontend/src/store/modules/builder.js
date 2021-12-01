import Vue from "vue";
import Vuex from "vuex";
import {
  SET_BUILDER,
  SET_INGREDIENTS,
  SET_PIZZA_OPTIONS,
  RESET_INGREDIENTS,
  RESET_OPTIONS,
  COUNT_INGREDIENT,
  MOVE_INGREDIENT,
  CHANGE_OPTIONS,
  INPUT_SET_NAME,
} from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    pizza: {
      name: "",
      ingredients: [],
      dough: [],
      sauces: [],
      sizes: [],
    },
  },
  getters: {
    total(state) {
      let pizzaPrice = 0;
      let multiplier;
      Object.keys(state.pizza).forEach(function (key) {
        if (typeof state.pizza[key] === "object") {
          state.pizza[key].forEach((item) => {
            if (item.checked) {
              if (key === "sizes") {
                multiplier = item.multiplier;
              } else {
                pizzaPrice += item.price;
              }
            }
            if (item.count) {
              pizzaPrice += item.count * item.price;
            }
          });
        }
      });
      return pizzaPrice * multiplier;
    },
  },
  mutations: {
    [SET_INGREDIENTS](state, payload) {
      Vue.set(state.pizza, "ingredients", payload.ingredients);
      state.pizza.ingredients.forEach((ingredient) => {
        Vue.set(ingredient, "count", 0);
      });
    },

    [SET_PIZZA_OPTIONS](state, payload) {
      Vue.set(state.pizza, payload.name, payload.options);
      Vue.set(state.pizza[payload.name][0], "checked", true);
    },

    [SET_BUILDER](state, payload) {
      state.pizza = payload.pizza;
      Vue.set(state.pizza, "id", payload.index);
    },
    [RESET_INGREDIENTS](state) {
      state.pizza.ingredients.forEach((ingredient) => {
        Vue.set(ingredient, "count", 0);
      });
    },
    [RESET_OPTIONS](state, payload) {
      for (let i = 0; i < state.pizza[payload].length; i++) {
        Vue.set(state.pizza[payload][i], "checked", i === 0);
      }
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
      for (let i = 0; i < state.pizza[payload.name].length; i++) {
        Vue.set(state.pizza[payload.name][i], "checked", i === payload.index);
      }
    },
    [INPUT_SET_NAME](state, payload) {
      Vue.set(state.pizza, "name", payload);
    },
  },
  actions: {
    async getBuilder({ commit }) {
      console.log("я печенька");
      const ingredients = this.$api.ingredients.query();
      const dough = this.$api.dough.query();
      const sauces = this.$api.sauces.query();
      const sizes = this.$api.sizes.query();
      let values = await Promise.all([ingredients, dough, sauces, sizes]);
      commit(SET_INGREDIENTS, { ingredients: values[0] });
      commit(SET_PIZZA_OPTIONS, { name: "dough", options: values[1] });
      commit(SET_PIZZA_OPTIONS, { name: "sauces", options: values[2] });
      commit(SET_PIZZA_OPTIONS, { name: "sizes", options: values[3] });
    },
    resetBuilder({ commit, state }) {
      Vue.set(state.pizza, "name", "");
      commit(RESET_INGREDIENTS);
      commit(RESET_OPTIONS, "dough");
      commit(RESET_OPTIONS, "sauces");
      commit(RESET_OPTIONS, "sizes");
    },
  },
};
