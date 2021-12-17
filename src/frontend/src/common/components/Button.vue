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
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
