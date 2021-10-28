<template>
  <div class="popup">
    <router-link :to="link" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="link" class="button">Отлично, я жду!</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Modal",
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    link() {
      if (this.isAuthenticated) {
        return "/orders";
      } else {
        return "/";
      }
    },
  },
};
</script>

<style scoped></style>
