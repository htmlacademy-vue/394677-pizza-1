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
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="item.count"
      :disabled="true"
    />
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
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    disabledReduce() {
      return this.item.count === 0;
    },
    disabledAdd() {
      return this.item.count === 3;
    },
  },
  methods: {
    add() {
      this.countItem(true);
    },
    reduce() {
      this.countItem(false);
    },
    countItem(add) {
      this.$emit("countItem", this.index, add);
    },
  },
};
</script>

<style scoped></style>
