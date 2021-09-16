<template>
  <div class="popup">
    <router-link :to="link" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">{{ title }}Спасибо за заказ</h2>
    </div>
    <p>{{ textInfo }}Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="link" class="button"
        >{{ buttonLabel }}Отлично, я жду!</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "",
    },
    textInfo: {
      type: String,
      default: "",
    },
    buttonLabel: {
      type: String,
      default: "",
    },
  },
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
