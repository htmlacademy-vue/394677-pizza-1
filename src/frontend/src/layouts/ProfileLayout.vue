<template>
  <div>
    <appHeader></appHeader>
    <sidebar></sidebar>
    <slot />
  </div>
</template>

<script>
import appHeader from "@/common/components/Header";
import sidebar from "@/common/components/Sidebar";
export default {
  name: "AppLayout",
  components: {
    appHeader,
    sidebar,
  },
};
</script>

<style scoped></style>
