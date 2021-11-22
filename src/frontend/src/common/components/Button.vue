<template>
  <button
    type="button"
    :class="[disabled ? 'button--disabled' : '', className, 'button']"
    :disabled="disabled"
    v-on="$listeners"
  >
    <span>{{ label }}</span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    className: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
