<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <AppButton
      :disabled="disabled"
      @click="addToCart"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import AppButton from "@/common/components/AppButton";
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",

  components: {
    AppButton,
  },

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
    addToCart() {
      this.$store.dispatch("Cart/addToCart", {
        pizza: this.pizza,
        total: this.total,
      });
    },
  },
};
</script>

<style></style>
