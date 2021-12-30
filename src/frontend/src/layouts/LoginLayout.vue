<template>
  <div>
    <appHeader />
    <div class="central-form">
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__bounceIn"
      >
        <slot />
      </transition>
    </div>
  </div>
</template>

<script>
import appHeader from "@/common/components/AppHeader";
export default {
  name: "LoginLayout",
  components: {
    appHeader,
  },
};
</script>

<style scoped></style>
