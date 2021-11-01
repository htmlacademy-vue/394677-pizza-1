import Vue from "vue";
import Vuex from "vuex";
import Builder from "@/store/modules/builder";
import Cart from "@/store/modules/cart";
import Orders from "@/store/modules/orders";
import Auth from "@/store/modules/auth";
import Address from "@/store/modules/address";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Builder,
    Cart,
    Orders,
    Auth,
    Address,
  },
});
