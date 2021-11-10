<template>
  <div>
    <appHeader></appHeader>
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
export default {
  name: "AppLayout",
  components: {
    appHeader,
  },
};
</script>

<style scoped></style>
