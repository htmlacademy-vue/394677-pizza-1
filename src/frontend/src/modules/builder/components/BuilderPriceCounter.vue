<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button
      type="button"
      :class="[disabled ? 'button--disabled' : '', 'button']"
      :disabled="disabled"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  SET_CART,
  SET_BUILDER,
  RESET_BUILDER,
} from "@/store/modules/mutation-types";
export default {
  name: "BuilderPriceCounter",
  props: {
    pizza: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters("Builder", ["total"]),
    disabled() {
      let isSelectedIngredient = false;
      if (this.pizza.ingredients) {
        this.pizza.ingredients.forEach((ingredient) => {
          if (ingredient.count) {
            isSelectedIngredient = true;
          }
        });
      }
      return !(isSelectedIngredient && this.pizza.name);
    },
  },
  methods: {
    ...mapMutations("Cart", [SET_CART]),
    ...mapMutations("Builder", [SET_BUILDER, RESET_BUILDER]),
    addToCart() {
      this[SET_CART]({ pizza: this.pizza, total: this.total });
      this[RESET_BUILDER]();
      this[SET_BUILDER]();
    },
  },
};
</script>

<style scoped></style>
