import { cloneDeep } from "lodash";

import { mutations } from "@/store/modules/mutation-types";
import modules from "@/store";
import Vuex from "vuex";

import user from "@/static/user";
import misc from "@/static/misc";
import pizza from "@/static/pizza";
import VuexPlugins from "@/plugins/vuexPlugins";

const state = () => ({
  notifications: [],
  user,
  misc,
  pizza,
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
