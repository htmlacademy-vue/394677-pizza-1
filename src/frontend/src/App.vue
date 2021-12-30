<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";
import { getToken } from "@/services/jwt.service";
const defaultLayout = "MainLayout";
export default {
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  created() {
    if (getToken()) {
      setAuth(this.$store);
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
