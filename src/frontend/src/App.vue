<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
const defaultLayout = "AppLayout";
export default {
  name: "App",
  components: {
    AppLayout,
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
