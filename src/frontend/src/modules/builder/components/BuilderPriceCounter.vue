<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      :class="[disabled ? 'button--disabled' : '', 'button']"
      :disabled="disabled"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    totalPrice: {
      type: Number,
      default() {
        return 0;
      },
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped></style>
