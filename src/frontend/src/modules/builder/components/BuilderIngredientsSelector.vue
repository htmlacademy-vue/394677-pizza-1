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
            <input type="radio" name="sauce" value="tomato" checked />
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
              <span class="filling filling--mushrooms">
                {{ ingredient.name }}
              </span>
              <ItemCounter
                class="counter--orange ingridients__counter"
                :item="ingredient"
                @countItem="countItem"
              ></ItemCounter>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
export default {
  components: {
    ItemCounter,
  },
  props: {
    sauces: {
      type: Array,
      default() {
        return [];
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "BuilderIngredientsSelector",
  methods: {
    countItem(value) {
      this.$emit("countItem", value);
    },
  },
};
</script>

<style scoped></style>
