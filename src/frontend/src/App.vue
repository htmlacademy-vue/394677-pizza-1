<template>
  <div id="app">
    <AppLayout>
      <component :is="layout" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
const defaultLayout = "Index";
export default {
  name: "App",
  components: {
    AppLayout,
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/views/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
