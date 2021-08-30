<template>
  <div class="popup">
    <a href="/" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">{{ title }}Спасибо за заказ</h2>
    </div>
    <p>{{ textInfo }}Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="/" class="button">{{ buttonLabel }}Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "popap",
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
};
</script>

<style scoped></style>
