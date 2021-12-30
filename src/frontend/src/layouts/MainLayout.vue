<template>
  <div>
    <appHeader />
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
import appHeader from "@/common/components/AppHeader";
export default {
  name: "MainLayout",
  components: {
    appHeader,
  },
};
</script>

<style scoped></style>
