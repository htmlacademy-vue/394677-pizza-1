import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";
export const createResources = (notifier) => {
  return {
    [resources.USER]: new ReadOnlyApiService(resources.USER, notifier),
    [resources.BUILDER]: new ReadOnlyApiService(resources.BUILDER, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};
export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};
