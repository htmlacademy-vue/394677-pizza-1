<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper" :key="mainKey">
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
          @countIngredient="countIngredient"
          @changeSauce="changeSauce"
        ></BuilderIngredientsSelector>
        <AppDrop @drop="moveIngredient($event)">
          <BuilderPizzaView
            :name="name"
            :ingredients="ingredients"
            :sauces="sauces"
            :sizes="sizes"
            :doughList="doughList"
            @changeName="changeName"
          ></BuilderPizzaView>
        </AppDrop>
      </div>
    </form>
    <router-view></router-view>
  </main>
</template>

<script>
import pizza from "@/static/pizza";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    AppDrop,
  },
  data() {
    return {
      name: "",
      ingredients: [],
      sauces: [],
      sizes: [],
      doughList: [],
      mainKey: Math.random(),
    };
  },
  mounted() {
    this.setInitialData();
  },
  methods: {
    setInitialData() {
      for (let i = 0; i < pizza.ingredients.length; i++) {
        this.ingredients[i] = pizza.ingredients[i];
        this.ingredients[i].count = 0;
      }
      for (let i = 0; i < pizza.sauces.length; i++) {
        this.sauces[i] = pizza.sauces[i];
        this.sauces[0].checked = true;
      }
      for (let i = 0; i < pizza.sizes.length; i++) {
        this.sizes[i] = pizza.sizes[i];
        this.sizes[0].checked = true;
      }
      for (let i = 0; i < pizza.dough.length; i++) {
        this.doughList[i] = pizza.dough[i];
        this.doughList[0].checked = true;
      }
      this.mainKey++;
    },
    changeName(name) {
      this.name = name;
    },
    countIngredient(index, add) {
      if (add) {
        this.ingredients[index].count += 1;
      } else {
        this.ingredients[index].count -= 1;
      }
      this.mainKey++;
    },
    moveIngredient(transferData) {
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].name === transferData.name) {
          this.ingredients[i].count++;
          this.mainKey++;
        }
      }
    },
    changeDough(index) {
      for (let i = 0; i < this.doughList.length; i++) {
        this.doughList[i].checked = i === index;
      }
      this.mainKey++;
    },
    changeSauce(index) {
      for (let i = 0; i < this.sauces.length; i++) {
        this.sauces[i].checked = i === index;
      }
      this.mainKey++;
    },
    changeSize(index) {
      for (let i = 0; i < this.sizes.length; i++) {
        this.sizes[i].checked = i === index;
      }
      this.mainKey++;
    },
  },
};
</script>

<style scoped></style>
