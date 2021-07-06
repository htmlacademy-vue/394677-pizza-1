<template>
  <div id="app">
    <div class="main">
      <div class="main__wrapper">
        <Index></Index>
      </div>
    </div>
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
export default {
  name: "App",
  components: {
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
