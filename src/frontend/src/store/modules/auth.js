import Vue from "vue";
import Vuex from "vuex";
import { SET_USER } from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    [SET_USER](state, payload) {
      Vue.set(state, "isAuthenticated", payload.isAuthenticated);
      Vue.set(state, "user", payload.user);
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(SET_USER, { isAuthenticated: false, user: null });
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_USER, { isAuthenticated: true, user: data });
      } catch {
        dispatch("logout", false);
      }
    },
  },
};
