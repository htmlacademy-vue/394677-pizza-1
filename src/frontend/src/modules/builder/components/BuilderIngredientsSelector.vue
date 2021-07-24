<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in sauces"
            :key="index"
            class="radio ingridients__input"
          >
            <input
              type="radio"
              name="sauce"
              value="tomato"
              :checked="sauce.checked"
              @change="changeSauce(sauce)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>
          <ul class="ingridients__list">
            <li
              v-for="(ingredient, index) in localIngredients"
              :key="index"
              class="ingridients__item"
            >
              <AppDrag :transferData="ingredient" :draggable="draggable">
                <span class="filling" :class="'filling--' + ingredient.class">
                  {{ ingredient.name }}
                </span>
                <ItemCounter
                  class="counter--orange ingridients__counter"
                  :item="ingredient"
                  :index="index"
                  @countItem="countItem"
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
import { cloneDeep } from "lodash";
export default {
  components: {
    ItemCounter,
    AppDrag,
  },
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  name: "BuilderIngredientsSelector",
  data() {
    return {
      ingredientClassList: [],
      ingredientCount: 0,
      localIngredients: [],
    };
  },
  watch: {
    ingredients: {
      deep: true,
      immediate: true,
      handler() {
        this.localIngredients = cloneDeep(this.ingredients);
      },
    },
  },
  computed: {
    draggable() {
      return this.ingredientCount < 3;
    },
  },
  methods: {
    countItem(item, index) {
      this.ingredientCount = item.count;
      this.$emit("countItem", item, index);
    },

    changeSauce(sauce) {
      this.$emit("changeSauce", sauce);
    },
  },
};
</script>

<style scoped></style>
