<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector :doughList="doughList"></BuilderDoughSelector>
        <BuilderSizeSelector :sizes="sizes"></BuilderSizeSelector>
        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          @countItem="countItem"
        ></BuilderIngredientsSelector>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <BuilderPizzaView></BuilderPizzaView>
          <BuilderPriceCounter :totalPrice="totalPrice"></BuilderPriceCounter>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      doughList: pizza.dough,
      sizes: pizza.sizes,
      sauces: pizza.sauces,
      ingredients: pizza.ingredients,
      totalPrice: 0,
    };
  },
  methods: {
    countItem(price) {
      this.totalPrice += price;
    },
  },
};
</script>

<style scoped></style>
