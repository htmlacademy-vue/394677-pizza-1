import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuexPlugins from "@/plugins/vuexPlugins";
Vue.config.productionTip = false;
vuexPlugins(store);

const init = async () => {
  const module = await import("@/router");
  const router = await module.default;
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
};

init();
