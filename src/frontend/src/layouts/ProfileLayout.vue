<template>
  <div>
    <appHeader></appHeader>
    <div class="layout__sidebar sidebar">
      <router-link
        to="/profile"
        class="layout__link"
        active-class="layout__link--active"
        >Мои данные</router-link
      >
      <router-link
        to="/orders"
        class="layout__link"
        active-class="layout__link--active"
        >История заказов</router-link
      >
    </div>
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
