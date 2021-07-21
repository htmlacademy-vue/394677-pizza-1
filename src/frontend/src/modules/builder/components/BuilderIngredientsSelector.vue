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
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingridients__item"
            >
              <AppDrag :transferData="ingredient">
                <span class="filling" :class="'filling--' + ingredient.class">
                  {{ ingredient.name }}
                </span>
                <ItemCounter
                  class="counter--orange ingridients__counter"
                  :item="ingredient"
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
export default {
  components: {
    ItemCounter,
    AppDrag,
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
  data() {
    return {
      ingredientClassList: [],
    };
  },
  mounted() {
    this.changeSauce(this.sauces[0]);
  },
  methods: {
    countItem(item) {
      if (item.price < 0) {
        for (let i = 0; i < this.ingredientClassList.length; i++) {
          if (this.ingredientClassList[i] === item.class) {
            this.ingredientClassList.splice(i, 1);
            this.$emit("changeIngredientClassList", this.ingredientClassList);
            this.$emit("countItem", item.price);
            return;
          }
        }
      } else {
        this.ingredientClassList.push(item.class);
        this.$emit("changeIngredientClassList", this.ingredientClassList);
        this.$emit("countItem", item.price);
      }
    },

    changeSauce(sauce) {
      this.$emit("changeSauce", sauce);
    },
  },
};
</script>

<style scoped></style>
