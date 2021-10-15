<template>
  <div>
    <appHeader></appHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from "@/views/Header";
export default {
  name: "AppLayout",
  components: {
    appHeader,
  },
};
</script>

<style scoped></style>
