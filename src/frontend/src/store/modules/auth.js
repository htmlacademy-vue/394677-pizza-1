import Vue from "vue";
import Vuex from "vuex";
import user from "@/static/user";
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    user: user,
  },
  getters: {},
  mutations: {},
  actions: {},
});
