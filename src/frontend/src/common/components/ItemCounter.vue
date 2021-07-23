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
    };
  },
  computed: {
    disabledReduce() {
      return this.value === 0;
    },
    disabledAdd() {
      return this.value === 3;
    },
    localItem() {
      let cloneItem = {};
      for (let key in this.item) {
        cloneItem[key] = this.item[key];
      }
      return cloneItem;
    },
  },
  methods: {
    add() {
      if (this.value < 3) {
        this.value++;
        this.localItem.price = Math.abs(this.localItem.price);
        this.countItem();
      }
    },
    reduce() {
      if (this.value > 0) {
        this.value--;
        this.localItem.price = -Math.abs(this.localItem.price);
        this.countItem();
      }
    },
    countItem() {
      this.localItem.count = this.value;
      this.$emit("countItem", this.localItem);
    },
  },
};
</script>

<style scoped></style>
