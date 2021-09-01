<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizza.name"
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
    <BuilderPriceCounter :pizza="pizza"></BuilderPriceCounter>
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { INPUT_SET_NAME } from "@/store/modules/mutation-types";
import { mapMutations } from "vuex";
export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  props: {
    pizza: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
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
      if (this.pizza && this.pizza.ingredients) {
        this.pizza.ingredients.forEach((ingredient) => {
          let count = ingredient.count;
          let className = ingredient.image.split("filling/")[1];
          className = className.split(".svg")[0];
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
      }
      return classList;
    },
    pizzaDoughClass() {
      let className = "";
      if (this.pizza && this.pizza.dough) {
        this.pizza.dough.forEach((dough) => {
          if (dough.checked) {
            if (dough.name === "Тонкое") {
              className = "small";
            } else {
              className = "big";
            }
          }
        });
      }

      return className;
    },
    pizzaSauceClass() {
      let className = "";
      if (this.pizza && this.pizza.sauces) {
        this.pizza.sauces.forEach((sauce) => {
          if (sauce.checked) {
            if (sauce.name === "Сливочный") {
              className = "creamy";
            } else {
              className = "tomato";
            }
          }
        });
      }
      return className;
    },
  },
  methods: {
    ...mapMutations("Builder", [INPUT_SET_NAME]),
    changeName(e) {
      this[INPUT_SET_NAME](e.target.value);
    },
  },
};
</script>

<style scoped></style>
