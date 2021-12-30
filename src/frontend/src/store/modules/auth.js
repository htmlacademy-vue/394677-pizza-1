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
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
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

    async getMe({ state, commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_USER, { isAuthenticated: true, user: data });
      } catch {
        dispatch("logout", false);
      }
      dispatch("Address/getAddresses", state.user, { root: true });
    },
  },
};
