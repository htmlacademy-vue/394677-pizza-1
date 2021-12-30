<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in pizza.sauces"
            :key="index"
            class="radio ingredients__input"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.class"
              :checked="sauce.checked"
              @change="changeSauce(index)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="(ingredient, index) in pizza.ingredients"
              :key="index"
              class="ingredients__item"
            >
              <AppDrag :transfer-data="ingredient">
                <span
                  class="filling"
                  :class="'filling--' + ingredientClassName(ingredient)"
                >
                  {{ ingredient.name }}
                </span>
                <ItemCounter
                  class="counter--orange ingredients__counter"
                  :item="ingredient"
                  :index="index"
                  :restrictions="3"
                  @countItem="countIngredient"
                />
              </AppDrag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";
import {
  COUNT_INGREDIENT,
  CHANGE_OPTIONS,
} from "@/store/modules/mutation-types";
import { mapMutations } from "vuex";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    ItemCounter,
    AppDrag,
  },

  props: {
    pizza: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      ingredientClassList: [],
    };
  },

  methods: {
    ...mapMutations("Builder", [COUNT_INGREDIENT, CHANGE_OPTIONS]),

    changeSauce(index) {
      this[CHANGE_OPTIONS]({ index: index, name: "sauces" });
    },

    ingredientClassName(ingredient) {
      let className = ingredient.image.split("filling/")[1];
      className = className.split(".svg")[0];
      return className;
    },

    countIngredient(index, add) {
      this[COUNT_INGREDIENT]({ index: index, add: add });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/ingredients.scss";
@import "~@/assets/scss/blocks/filling.scss";
@import "~@/assets/scss/blocks/radio.scss";
</style>
