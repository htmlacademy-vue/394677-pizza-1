<template>
  <div class="popup">
    <a @click="closeModal" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <Button @click="closeModal">Отлично, я жду!</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/common/components/Button";
export default {
  name: "Modal",
  components: {
    Button,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped></style>
