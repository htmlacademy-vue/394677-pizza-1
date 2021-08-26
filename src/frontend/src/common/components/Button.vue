<template>
  <div>
    <button type="button" :class="className" :disabled="disabled">
      <span class="visually-hidden">{{ label }}</span>
    </button>
  </div>
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
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
