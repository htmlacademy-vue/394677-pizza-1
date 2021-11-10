<template>
  <div>
    <appHeader></appHeader>
    <sidebar></sidebar>
    <transition
      name="view"
      appear
      enter-active-class="animate__animated animate__slideInRight animate__faster"
    >
      <slot />
    </transition>
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
