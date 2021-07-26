<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="localName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="changeName"
      />
    </label>
    <div class="content__constructor">
      <div
        class="pizza"
        :class="'pizza--foundation--' + pizzaDoughClass + '-' + pizzaSauceClass"
      >
        <div class="pizza__wrapper">
          <div class="pizza__filling"></div>
          <template v-for="(ingredientClass, index) in pizzaClassList">
            <div
              class="pizza__filling"
              :key="index"
              :class="ingredientClass"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <BuilderPriceCounter
      :name="name"
      :ingredients="ingredients"
      :sauces="sauces"
      :sizes="sizes"
      :doughList="doughList"
    ></BuilderPriceCounter>
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { cloneDeep } from "lodash";
export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  props: {
    name: {
      type: String,
      required: true,
    },
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
  },
  data() {
    return {
      localName: cloneDeep(this.name),
      doughPrice: 0,
      saucePrice: 0,
      sizePrice: 0,
      ingredientsPrice: 0,
      ingredientClassList: [],
      disabledButton: true,
    };
  },
  computed: {
    pizzaClassList() {
      let classList = [];
      this.ingredients.forEach((ingredient) => {
        let count = ingredient.count;
        let className = ingredient.class;
        if (count) {
          if (count === 2) {
            classList.push(
              "pizza__filling--" + className + " " + "pizza__filling--second"
            );
          } else if (count === 3) {
            classList.push(
              "pizza__filling--" + className + " " + "pizza__filling--third"
            );
          } else {
            classList.push("pizza__filling--" + className);
          }
        }
      });
      return classList;
    },
    pizzaDoughClass() {
      let className = "small";
      this.doughList.forEach((dough) => {
        if (dough.checked) {
          className = dough.pizzaClass;
        }
      });
      return className;
    },
    pizzaSauceClass() {
      let className = "tomato";
      this.sauces.forEach((dough) => {
        if (dough.checked) {
          className = dough.pizzaClass;
        }
      });
      return className;
    },
  },
  methods: {
    changeName() {
      this.$emit("changeName", this.localName);
    },
  },
};
</script>

<style scoped></style>
