<template>
  <main class="content">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <BuilderDoughSelector :doughList="pizza.dough"></BuilderDoughSelector>
      <BuilderSizeSelector :sizes="pizza.sizes"></BuilderSizeSelector>
      <BuilderIngredientsSelector :pizza="pizza"></BuilderIngredientsSelector>
      <AppDrop @drop="moveIngredient($event)">
        <BuilderPizzaView :pizza="pizza"></BuilderPizzaView>
      </AppDrop>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { MOVE_INGREDIENT } from "@/store/modules/mutation-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "Builder",
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    AppDrop,
  },
  mounted() {
    this.setInitialData();
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
  },
  methods: {
    ...mapMutations("Builder", [MOVE_INGREDIENT]),
    setInitialData() {
      if (!("id" in this.pizza)) {
        this.$store.dispatch("Builder/getBuilder");
      }
      this.$store.dispatch("Cart/getMisc");
    },
    moveIngredient(transferData) {
      this[MOVE_INGREDIENT](transferData.name);
    },
  },
};
</script>

<style scoped></style>
