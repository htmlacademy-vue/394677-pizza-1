<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="index"
          :class="'diameter__input--' + size.class"
          class="diameter__input"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.name"
            class="visually-hidden"
            :checked="size.checked"
            @change="changeSize(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "BuilderSizeSelector",
  mounted() {
    this.changeSize(this.sizes[1]);
  },
  methods: {
    changeSize(size) {
      this.$emit("changeSize", size);
    },
  },
};
</script>

<style scoped></style>
