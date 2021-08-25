<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in pizza.sauces"
            :key="index"
            class="radio ingridients__input"
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

        <div class="ingridients__filling">
          <p>Начинка:</p>
          <ul class="ingridients__list">
            <li
              v-for="(ingredient, index) in pizza.ingredients"
              :key="index"
              class="ingridients__item"
            >
              <AppDrag :transferData="ingredient">
                <span
                  class="filling"
                  :class="'filling--' + ingredientClassName(ingredient)"
                >
                  {{ ingredient.name }}
                </span>
                <ItemCounter
                  class="counter--orange ingridients__counter"
                  :item="ingredient"
                  :index="index"
                  @countItem="countIngredient"
                ></ItemCounter>
              </AppDrag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
import AppDrag from "../../../common/components/AppDrag";
import {
  COUNT_INGREDIENT,
  CHANGE_OPTIONS,
} from "@/store/modules/mutation-types";
import { mapMutations } from "vuex";
export default {
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
  name: "BuilderIngredientsSelector",
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

<style scoped></style>
