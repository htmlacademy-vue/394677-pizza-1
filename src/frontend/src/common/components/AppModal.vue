<template>
  <div class="popup">
    <a
      class="close"
      @click="closeModal"
    >
      <span class="visually-hidden">Закрыть модальное окно</span>
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
import Button from "@/common/components/AppButton";
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

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/close.scss";
</style>
