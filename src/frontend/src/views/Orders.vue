<template>
  <div>
    <div class="layout__sidebar sidebar">
      <router-link to="/Profile" class="layout__link">Мои данные</router-link>
    </div>
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section
        v-for="(order, index) in formatOrders"
        :key="index"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ # {{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: 564 ₽</span>
          </div>

          <div class="order__button">
            <button
              @click="deleteOrder(order.id)"
              type="button"
              class="button button--border"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button @click="repeatOrders(order)" type="button" class="button">
              Повторить
            </button>
          </div>
        </div>
        <template v-if="order.orderPizzas">
          <ul
            v-for="(pizza, index) in order.orderPizzas"
            :key="index"
            class="order__list"
          >
            <li class="order__item">
              <div class="product">
                <img
                  src="../public/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  :alt="pizza.name"
                />
                <div class="product__text">
                  <h2>{{ pizza.name }}</h2>
                  <ul>
                    <li>{{ pizza.size.name }}, {{ pizza.dough.name }}</li>
                    <li>Соус: {{ pizza.sauce.name }}</li>
                    <li>
                      Начинка:
                      <span
                        v-for="(ingredient, index) in pizza.ingredientsData"
                        :key="index"
                        >{{ ingredient.name }},
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p class="order__price">782 ₽</p>
            </li>
          </ul>
        </template>
        <template v-if="order.misc">
          <ul class="order__additional">
            <li v-for="(misc, index) in order.misc" :key="index">
              <img
                :src="misc.image"
                width="20"
                height="30"
                alt="Coca-Cola 0,5 литра"
              />
              <p>
                <span>{{ misc.name }}</span>
                <b>56 ₽</b>
              </p>
            </li>
          </ul>
        </template>
        <template v-if="order.orderAddress">
          <p class="order__address">
            Адрес доставки:{{ order.orderAddress.name }},
            {{ order.orderAddress.street }}, {{ order.orderAddress.building }},
            {{ order.orderAddress.flat }}, {{ order.orderAddress.comment }},
          </p>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pizzaHistoryOptions from "@/common/mixins/formatOrderOptions";
export default {
  name: "Orders",
  mixins: [pizzaHistoryOptions],
  computed: {
    ...mapGetters("Orders", ["formatOrders"]),
  },
  mounted() {
    this.setInitialData();
  },
  methods: {
    setInitialData() {
      this.$store.dispatch("Builder/getBuilder");
      this.$store.dispatch("Cart/getMisc");
      this.$store.dispatch("Orders/getOrders");
    },
    deleteOrder(id) {
      this.$store.dispatch("Orders/deleteOrders", id);
    },
    repeatOrders(order) {
      let data = {
        userId: order.userId,
        pizzas: order.orderPizzas,
        misc: order.orderMisc,
        address: order.orderAddress,
      };
      data.pizzas.forEach((pizza) => {
        delete pizza.id;
        pizza.ingredients.forEach((ingredient) => {
          delete ingredient.id;
        });
      });
      data.misc.forEach((misc) => {
        delete misc.id;
      });
      delete data.address.id;
      this.$store.dispatch("Orders/setOrders", data);
    },
  },
};
</script>

<style scoped></style>
