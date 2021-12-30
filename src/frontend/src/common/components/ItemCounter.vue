<template>
  <div class="counter">
    <AppButton
      class="counter__button"
      :class="classButton({ operation: 'minus', disabled: disabledReduce })"
      :disabled="disabledReduce"
      @click="reduce"
    >
      <span class="visually-hidden">Меньше</span>
    </AppButton>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="item.count"
      :disabled="true"
    />
    <AppButton
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
    </AppButton>
  </div>
</template>

<script>
import AppButton from "@/common/components/AppButton";

export default {
  name: "ItemCounter",

  components: { AppButton },

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
      default: "",
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
        return "counter__button--disabled counter__button--" + data.operation;
      } else {
        return "counter__button--" + data.operation;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/counter.scss";
</style>
