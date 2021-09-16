<template>
  <div>
    {{ orders }}
    <div class="layout__sidebar sidebar">
      <router-link to="/Profile" class="layout__link">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section
        v-for="(order, index) in orders"
        :key="index"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.orderPizzas.orderId }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: 564 ₽</span>
          </div>

          <div class="order__button">
            <button type="button" class="button button--border">Удалить</button>
          </div>
          <div class="order__button">
            <button type="button" class="button">Повторить</button>
          </div>
        </div>

        <ul
          v-for="(pizza, index) in order.orderPizzas"
          :key="index"
          class="order__list"
        >
          <li class="order__item">
            <div class="product">
              <img
                src="img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>{{ pizza.sizeId }} см, {{ pizza.doughId }}</li>
                  <li>Соус: {{ pizza.sauceId }}</li>
                  <li>
                    Начинка:
                    <span
                      v-for="(ingredient, index) in pizza.ingredients"
                      :key="index"
                      >{{ ingredient.ingredientId }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">782 ₽</p>
          </li>
          <li class="order__item">
            <div class="product">
              <img
                src="img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
              />
              <div class="product__text">
                <h2>Моя любимая</h2>
                <ul>
                  <li>30 см, на тонком тесте</li>
                  <li>Соус: томатный</li>
                  <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
                </ul>
              </div>
            </div>

            <p class="order__price">2х782 ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="(misc, index) in order.orderMisc" :key="index">
            <img
              src="img/cola.svg"
              width="20"
              height="30"
              alt="Coca-Cola 0,5 литра"
            />
            <p>
              <span>{{ misc.miscId }}</span>
              <b>56 ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки:{{ order.orderAddress.name }},
          {{ order.orderAddress.street }}, {{ order.orderAddress.building }},
          {{ order.orderAddress.flat }}, {{ order.orderAddress.comment }},
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Orders",
  computed: {
    ...mapState("Orders", ["orders"]),
  },
};
</script>

<style scoped></style>
