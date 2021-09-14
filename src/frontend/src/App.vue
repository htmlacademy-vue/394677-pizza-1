<template>
  <div id="app">
    <appHeader></appHeader>
    <component :is="layout"> </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import appHeader from "@/views/Header";
import { setAuth } from "@/common/helpers";
import { getToken } from "@/services/jwt.service";
const defaultLayout = "AppLayout";
export default {
  name: "App",
  components: {
    AppLayout,
    appHeader,
  },
  created() {
    if (getToken()) {
      setAuth(this.$store);
    }
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
