<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button"
      :class="classButton({ operation: 'minus', disabled: disabledReduce })"
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
      class="counter__button"
      :class="
        classButton({ operation: 'plus', disabled: disabledAdd }) +
        ' ' +
        classNameButton
      "
      :disabled="disabledAdd"
      @click="add"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "ItemCounter",
  comments: [Button],
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    classNameButton: {
      type: String,
      required: false,
    },
    restrictions: {
      type: Number,
      required: false,
    },
  },
  computed: {
    disabledReduce() {
      return this.item.count === 0;
    },
    disabledAdd() {
      if (this.restrictions) {
        return this.item.count === this.restrictions;
      }
      return false;
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
    classButton(data) {
      if (data.disabled) {
        return "counter__button--disabled";
      } else {
        return "counter__button--" + data.operation;
      }
    },
  },
};
</script>

<style scoped></style>
