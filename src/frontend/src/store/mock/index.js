import { cloneDeep } from "lodash";

import { modules } from "@/store/modules";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (actions) => {
  console.log({ actions: actions });
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }
  console.log(modulesCopy);
  return new Vuex.Store({
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
