<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      :class="[disabled ? 'button--disabled' : '', 'button']"
      :disabled="disabled"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    doughList: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    disabled() {
      let isSelectedIngredient = false;
      this.ingredients.forEach((ingredient) => {
        if (ingredient.count) {
          isSelectedIngredient = true;
        }
      });
      return !(isSelectedIngredient && this.name);
    },
    totalPrice() {
      let items = [this.ingredients, this.sauces, this.sizes, this.doughList];
      let price = 0;
      items.forEach((arr) => {
        arr.forEach((item) => {
          if (item.checked) {
            price += item.price;
            console.log(item.price);
          }
          if (item.count) {
            price += item.count * item.price;
          }
        });
      });
      return price;
    },
  },
};
</script>

<style scoped></style>
