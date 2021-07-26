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
              v-for="(ingredient, index) in ingredients"
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
    };
  },
  methods: {
    countIngredient(index, add) {
      this.$emit("countIngredient", index, add);
    },

    changeSauce(index) {
      this.$emit("changeSauce", index);
    },
    ingredientClassName(ingredient) {
      let className = ingredient.image.split("filling/")[1];
      className = className.split(".svg")[0];
      return className;
    },
  },
};
</script>

<style scoped></style>
