<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";
import { getToken } from "@/services/jwt.service";
const defaultLayout = "AppLayout";
export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
