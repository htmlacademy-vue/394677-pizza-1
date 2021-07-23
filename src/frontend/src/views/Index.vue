<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :doughList="doughList"
          @changeDough="changeDough"
        ></BuilderDoughSelector>
        <BuilderSizeSelector
          :sizes="sizes"
          @changeSize="changeSize"
        ></BuilderSizeSelector>
        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          @countItem="countItem"
          @changeSauce="changeSauce"
        ></BuilderIngredientsSelector>
        <BuilderPizzaView
          :name="name"
          :pizzaDoughClass="pizzaDoughClass"
          :pizzaSauceClass="pizzaSauceClass"
          :ingredientClassList="ingredientClassList"
          :totalPrice="totalPrice"
          :disabled="disabledButton"
          @changeName="changeName"
        ></BuilderPizzaView>
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
export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      name: "",
      doughList: pizza.dough,
      sizes: pizza.sizes,
      sauces: pizza.sauces,
      ingredients: pizza.ingredients,
      totalPrice: 0,
      previousDoughPrice: 0,
      previousSaucePrice: 0,
      previousSizePrice: 0,
      pizzaDoughClass: "small",
      pizzaSauceClass: "tomato",
      ingredientClassList: [],
      disabledButton: true,
    };
  },
  methods: {
    changeName(name) {
      this.name = name;
      this.checkDisabledButton();
    },
    countItem(item) {
      if (item.price < 0) {
        for (let i = 0; i < this.ingredientClassList.length; i++) {
          if (this.ingredientClassList[i] === item.class) {
            this.ingredientClassList.splice(i, 1);
            this.checkDisabledButton();
            return;
          }
        }
      } else {
        this.ingredientClassList.push(item.class);
        this.checkDisabledButton();
      }
      this.totalPrice += item.price;
    },
    changeDough(dough) {
      if (this.previousDoughPrice !== dough.price) {
        this.totalPrice -= this.previousDoughPrice;
        this.previousDoughPrice = dough.price;
        this.totalPrice += this.previousDoughPrice;
      }
      this.pizzaDoughClass = dough.pizzaClass;
    },
    changeSauce(sauce) {
      if (this.previousSaucePrice !== sauce.price) {
        this.totalPrice -= this.previousSaucePrice;
        this.previousSaucePrice = sauce.price;
        this.totalPrice += this.previousSaucePrice;
      }
      this.pizzaSauceClass = sauce.pizzaClass;
    },
    changeSize(size) {
      if (this.previousSizePrice !== size.price) {
        this.totalPrice -= this.previousSizePrice;
        this.previousSizePrice = size.price;
        this.totalPrice += this.previousSizePrice;
      }
    },
    checkDisabledButton() {
      this.disabledButton = !(this.name && this.ingredientClassList.length);
    },
  },
};
</script>

<style scoped></style>
