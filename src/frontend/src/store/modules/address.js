import Vue from "vue";
import Vuex from "vuex";
import {
  SET_ADDRESSES,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
} from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,

  state: {
    addresses: [],
  },

  getters: {},

  mutations: {
    [SET_ADDRESSES](state, payload) {
      state.addresses = payload;
    },

    [ADD_ADDRESS](state, payload) {
      state.addresses.push(payload);
    },

    [DELETE_ADDRESS](state, payload) {
      for (let i = 0; i <= state.addresses.length; i++) {
        if (state.addresses[i].id === payload) {
          state.addresses.splice(i, 1);
        }
      }
    },

    [EDIT_ADDRESS](state, payload) {
      for (let i = 0; i <= state.addresses.length; i++) {
        if (state.addresses[i].id === payload.id) {
          Vue.set(state.addresses, i, payload);
        }
      }
    },
  },

  actions: {
    async getAddresses({ commit }, payload) {
      try {
        const data = await this.$api.addresses.query(payload);
        commit(SET_ADDRESSES, data);
      } catch {
        console.log("Ошибка получения адреса");
      }
    },

    async saveAddresses({ commit }, payload) {
      const data = await this.$api.addresses.post(payload);
      commit(ADD_ADDRESS, data);
    },

    async deleteAddresses({ commit }, payload) {
      try {
        await this.$api.addresses.delete(payload);
        commit(DELETE_ADDRESS, payload);
      } catch {
        console.log("Ошибка удаления адреса");
      }
    },

    async editAddresses({ commit }, payload) {
      try {
        await this.$api.addresses.put(payload);
        commit(EDIT_ADDRESS, payload);
      } catch {
        console.log("Ошибка редактирования адреса");
      }
    },
  },
};
