<template>
  <div>
    <appHeader></appHeader>
    <slot />
  </div>
</template>

<script>
import appHeader from "@/common/components/Header";
export default {
  name: "AppLayout",
  components: {
    appHeader,
  },
};
</script>

<style scoped></style>
