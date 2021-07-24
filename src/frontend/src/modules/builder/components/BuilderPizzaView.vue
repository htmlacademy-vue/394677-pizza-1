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
      :totalPrice="totalPrice"
      :disabled="disabled"
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
    pizzaDoughClass: {
      type: String,
      required: true,
    },
    pizzaSauceClass: {
      type: String,
      required: true,
    },
    ingredientClassList: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localName: cloneDeep(this.name),
    };
  },
  computed: {
    pizzaClassList() {
      let result = {};
      let classList = [];
      this.ingredientClassList.forEach(function (a) {
        if (result[a] !== undefined) ++result[a];
        else result[a] = 1;
      });
      for (let key in result)
        if (result[key] === 2) {
          classList.push(
            "pizza__filling--" + key + " " + "pizza__filling--second"
          );
        } else if (result[key] === 3) {
          classList.push(
            "pizza__filling--" + key + " " + "pizza__filling--third"
          );
        } else {
          classList.push("pizza__filling--" + key);
        }
      return classList;
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
