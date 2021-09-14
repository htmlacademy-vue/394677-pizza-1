import Vue from "vue";
import Vuex from "vuex";
import {
  SET_ADDRESS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
} from "./mutation-types";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    address: [],
  },
  getters: {},
  mutations: {
    [SET_ADDRESS](state, payload) {
      Vue.set(state, "address", payload);
    },
    [ADD_ADDRESS](state, payload) {
      state.address.push(payload);
    },
    [DELETE_ADDRESS](state, payload) {
      console.log(payload);
      state.address.splice(payload, 1);
      console.log(state.address);
    },
    [EDIT_ADDRESS](state, payload) {
      Object.keys(state.address).forEach((item) => {
        if (item.id === payload.id) {
          Vue.set(state.address, item.id, payload);
        }
      });
    },
  },
  actions: {
    async getAddresses({ commit }, payload) {
      try {
        const data = await this.$api.addresses.query(payload);
        commit(SET_ADDRESS, data);
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
        this.$api.addresses.delete(payload);
        commit(DELETE_ADDRESS, payload);
      } catch {
        console.log("Ошибка удаления адреса");
      }
    },
    async editAddresses({ commit }, payload) {
      try {
        this.$api.addresses.put(payload);
        commit(EDIT_ADDRESS, payload);
      } catch {
        console.log("Ошибка редактирования адреса");
      }
    },
  },
};
