<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="index"
          class="diameter__input diameter__input--small"
        >
          <input
            type="radio"
            name="diameter"
            value="small"
            class="visually-hidden"
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
};
</script>

<style scoped></style>
