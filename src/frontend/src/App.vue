<template>
  <div id="app">
    <AppLayout></AppLayout>
    <Index></Index>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import Index from "@/views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
