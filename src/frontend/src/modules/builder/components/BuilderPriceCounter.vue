<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <Button :disabled="disabled" label=" Готовьте!" @click="addToCart">
    </Button>
  </div>
</template>

<script>
import Button from "@/common/components/Button";
import { mapGetters } from "vuex";
export default {
  name: "BuilderPriceCounter",
  components: {
    Button,
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

<style scoped></style>
