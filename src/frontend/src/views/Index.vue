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
      doughPrice: 0,
      saucePrice: 0,
      sizePrice: 0,
      ingredientsPrice: 0,
      pizzaDoughClass: "small",
      pizzaSauceClass: "tomato",
      ingredientClassList: [],
      disabledButton: true,
    };
  },
  computed: {
    ingredients() {
      let localIngredients = [];
      for (let i = 0; i < pizza.ingredients.length; i++) {
        localIngredients[i] = pizza.ingredients[i];
        localIngredients[i].count = 0;
        let className = pizza.ingredients[i].image.split("filling/")[1];
        localIngredients[i].class = className.split(".svg")[0];
      }
      return localIngredients;
    },
    totalPrice() {
      return (
        this.doughPrice +
        this.saucePrice +
        this.sizePrice +
        this.ingredientsPrice
      );
    },
  },
  methods: {
    changeName(name) {
      this.name = name;
      this.checkDisabledButton();
    },
    countItem(item, index) {
      if (item.price < 0) {
        for (let i = 0; i < this.ingredientClassList.length; i++) {
          if (this.ingredientClassList[i] === item.class) {
            this.ingredientClassList.splice(i, 1);
          }
        }
      } else {
        this.ingredientClassList.push(item.class);
      }
      this.ingredientsPrice += item.price;
      this.ingredients[index].count = item.count;
      this.checkDisabledButton();
    },
    changeDough(dough) {
      if (this.doughPrice !== dough.price) {
        this.doughPrice = dough.price;
      }
      this.pizzaDoughClass = dough.pizzaClass;
    },
    changeSauce(sauce) {
      if (this.saucePrice !== sauce.price) {
        this.saucePrice = sauce.price;
      }
      this.pizzaSauceClass = sauce.pizzaClass;
    },
    changeSize(size) {
      if (this.sizePrice !== size.price) {
        this.sizePrice = size.price;
      }
    },
    checkDisabledButton() {
      this.disabledButton = !(this.name && this.ingredientClassList.length);
    },
  },
};
</script>

<style scoped></style>
