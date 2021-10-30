<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";
import { getToken } from "@/services/jwt.service";
const defaultLayout = "MainLayout";
export default {
  name: "App",
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
