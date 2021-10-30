<template>
  <div>
    <appHeader></appHeader>
    <slot />
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
