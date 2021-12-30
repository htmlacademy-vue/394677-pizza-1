<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="index"
          :class="'diameter__input--' + className(size)"
          class="diameter__input"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.class"
            :checked="size.checked"
            class="visually-hidden"
            @change="changeSize(index)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { CHANGE_OPTIONS } from "@/store/modules/mutation-types";
import { mapMutations } from "vuex";

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

  methods: {
    ...mapMutations("Builder", [CHANGE_OPTIONS]),

    changeSize(index) {
      this[CHANGE_OPTIONS]({ index: index, name: "sizes" });
    },

    className(size) {
      let name = "";
      if (size.name === "23 см") {
        name = "small";
      } else if (size.name === "32 см") {
        name = "normal";
      } else {
        name = "big";
      }
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/diameter.scss";
</style>
