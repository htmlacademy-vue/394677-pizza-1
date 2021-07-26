<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(dough, index) in doughList"
          class="dough__input"
          :key="index"
          :class="'dough__input--' + className(dough)"
        >
          <input
            type="radio"
            name="dought"
            class="visually-hidden"
            :value="dough.class"
            :checked="dough.checked"
            @change="changeDough(index)"
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
  methods: {
    changeDough(index) {
      this.$emit("changeDough", index);
    },
    className(dough) {
      let name = "";
      if (dough.name === "Тонкое") {
        name = "light";
      } else {
        name = "large";
      }
      return name;
    },
  },
};
</script>

<style scoped></style>
