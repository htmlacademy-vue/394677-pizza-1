import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuexPlugins from "@/plugins/vuexPlugins";
Vue.config.productionTip = false;
vuexPlugins(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
