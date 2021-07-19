<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(dough, index) in doughList"
          :key="index"
          class="dough__input dough__input--light"
        >
          <input
            type="radio"
            name="dought"
            value="light"
            class="visually-hidden"
            checked
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    doughList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "BuilderDoughSelector",
};
</script>

<style scoped></style>
