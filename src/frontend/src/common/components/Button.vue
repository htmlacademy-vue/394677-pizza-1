<template>
  <button
    type="button"
    :class="[disabled ? 'button--disabled' : '', className, 'button']"
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
    className: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
