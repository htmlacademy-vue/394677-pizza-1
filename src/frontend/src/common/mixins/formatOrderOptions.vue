<script>
export default {
  name: "formatOrderOptions",
  methods: {
    pizzasOrderOptions(data) {
      const pizzas = [];
      data.forEach((item) => {
        const pizza = {};
        pizza.name = item.name;
        pizza.quantity = item.count;
        pizza.ingredients = [];
        item.sauces.forEach((sauce) => {
          if (sauce.checked) {
            pizza.sauceId = sauce.id;
          }
        });
        item.dough.forEach((dough) => {
          if (dough.checked) {
            pizza.doughId = dough.id;
          }
        });
        item.sizes.forEach((size) => {
          if (size.checked) {
            pizza.sizeId = size.id;
          }
        });
        item.ingredients.forEach((ingredient) => {
          if (ingredient.count > 0) {
            pizza.ingredients.push({
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            });
          }
        });
        pizzas.push(pizza);
      });
      return pizzas;
    },
    miscOrderOptions(data) {
      const misc = [];
      data.forEach((item) => {
        if (item.count > 0) {
          misc.push({
            miscId: item.id,
            quantity: item.count,
          });
        }
      });
      return misc;
    },
  },
};
</script>

<style scoped></style>
