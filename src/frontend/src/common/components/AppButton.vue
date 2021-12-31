<template>
  <button
    type="button"
    :class="[disabled ? 'button--disabled' : '', 'button']"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/button.scss";
</style>
