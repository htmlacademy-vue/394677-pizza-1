<template>
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
</template>

<script>
export default {
  name: "AppSidebar",
};
</script>

<style scoped></style>
