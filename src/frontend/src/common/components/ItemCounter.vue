<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="reduce"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="add"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    add() {
      this.value++;
      this.countItem(this.item.price);
    },
    reduce() {
      if (this.value > 0) {
        this.value--;
        this.countItem(-Math.abs(this.item.price));
      }
    },
    countItem(value) {
      this.$emit("countItem", value);
    },
  },
};
</script>

<style scoped></style>
