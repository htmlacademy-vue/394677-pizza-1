<template>
  <div>
    <AppHeader />
    <AppSidebar />
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
import AppHeader from "@/common/components/AppHeader";
import AppSidebar from "@/common/components/AppSidebar";
export default {
  name: "ProfileLayout",
  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>

<style scoped></style>
