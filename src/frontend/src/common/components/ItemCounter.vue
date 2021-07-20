<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="disabledReduce"
      @click="reduce"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="disabledAdd"
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
      disabledReduce: false,
      disabledAdd: false,
    };
  },
  methods: {
    add() {
      if (this.value < 3) {
        this.value++;
        this.item.price = Math.abs(this.item.price);
        this.countItem(this.item);
        this.disabledReduce = false;
      }
      if (this.value === 3) {
        this.disabledAdd = true;
      }
    },
    reduce() {
      if (this.value > 0) {
        this.value--;
        this.item.price = -Math.abs(this.item.price);
        this.countItem(this.item);
        this.disabledAdd = false;
      }
      if (this.value === 0) {
        this.disabledReduce = true;
      }
    },
    countItem(item) {
      item.count = this.value;
      this.$emit("countItem", item);
    },
  },
};
</script>

<style scoped></style>
