<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(dough, index) in doughList"
          class="dough__input"
          :key="index"
          :class="'dough__input--' + dough.class"
        >
          <input
            type="radio"
            name="dought"
            class="visually-hidden"
            :value="index"
            :checked="dough.checked"
            @change="changeDough(dough)"
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
  mounted() {
    this.changeDough(this.doughList[0]);
  },
  methods: {
    changeDough(dough) {
      this.$emit("changeDough", dough);
    },
  },
};
</script>

<style scoped></style>
