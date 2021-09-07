<template>
  <form>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="../public/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">{{ finalOrderPrice }} ₽</a>
      </div>
      <div class="header__user">
        <a href="user-data.html">
          <picture>
            <source
              type="image/webp"
              srcset="../public/img/users/user5.webp 1../imgimg/users/user5@2x.webp 2x"
            />
            <img
              src="../public/img/users/user5.jpg"
              srcset="../public/img/users/user5@2x.jpg"
              alt="username"
              width="32"
              height="32"
            />
          </picture>
          <span>{{ userName }}</span>
        </a>
        <a href="#" class="header__logout"><span>Выйти</span></a>
      </div>
    </header>

    <div action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div v-if="isEmptyCart" class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div>
          <template v-else>
            <ul class="cart-list sheet">
              <li
                v-for="(item, index) in pizza"
                :key="index"
                class="cart-list__item"
              >
                <div class="product cart-list__product">
                  <img
                    src="../public/img/product.svg"
                    class="product__img"
                    width="56"
                    height="56"
                    :alt="item.name"
                  />
                  <div class="product__text">
                    <h2>{{ item.name }}</h2>
                    <ul>
                      <li>
                        <template v-for="(size, sizeIndex) in item.sizes"
                          ><span
                            :key="sizeIndex + size.name"
                            v-if="size.checked"
                          >
                            {{ size.name }}
                          </span> </template
                        >,
                        <template v-for="(doughitem, doughIndex) in item.dough"
                          ><span
                            :key="doughIndex + doughitem.name"
                            v-if="doughitem.checked"
                          >
                            {{ doughitem.description }}
                          </span>
                        </template>
                      </li>
                      <li>
                        <template v-for="(sauce, sauceIndex) in item.sauces"
                          ><span
                            :key="sauceIndex + sauce.name"
                            v-if="sauce.checked"
                          >
                            Соус: {{ sauce.name }}
                          </span>
                        </template>
                      </li>
                      <li>
                        Начинка:
                        <template
                          v-for="(
                            ingredient, ingredientIndex
                          ) in item.ingredients"
                          ><span
                            :key="ingredientIndex + ingredient.name"
                            v-if="ingredient.count"
                          >
                            {{ ingredient.name }},
                          </span>
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>
                <ItemCounter
                  class="cart-list__counter"
                  :item="item"
                  :index="index"
                  classNameButton="counter__button--orange"
                  @countItem="countPizza"
                ></ItemCounter>
                <div class="cart-list__price">
                  <b>{{ item.total * item.count }}</b>
                </div>

                <div class="cart-list__button">
                  <button
                    type="button"
                    class="cart-list__edit"
                    @click="changePizza(item, index)"
                  >
                    Изменить
                  </button>
                </div>
              </li>
            </ul>

            <div class="cart__additional">
              <ul class="additional-list">
                <li
                  v-for="(item, index) in misc"
                  :key="index + item.name"
                  class="additional-list__item sheet"
                >
                  <p class="additional-list__description">
                    <img
                      :src="item.image"
                      width="39"
                      height="60"
                      :alt="item.name"
                    />
                    <span>{{ item.name }} ₽</span>
                  </p>

                  <div class="additional-list__wrapper">
                    <ItemCounter
                      class="additional-list__counter"
                      :item="item"
                      :index="index"
                      classNameButton="counter__button--orange"
                      @countItem="countAdditional"
                    ></ItemCounter>
                    <div class="additional-list__price">
                      <b>{{ item.price * item.count }}</b>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="cart__form">
              <div class="cart-form">
                <label class="cart-form__select">
                  <span class="cart-form__label">Получение заказа:</span>
                  <select
                    v-model="shippingInformation.receiveOrder"
                    name="test"
                    class="select"
                  >
                    <option
                      v-for="(item, index) in shippingOption"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </label>

                <label class="input input--big-label">
                  <span>Контактный телефон:</span>
                  <input
                    :value="phoneNumber"
                    type="text"
                    name="tel"
                    placeholder="+7 999-999-99-99"
                  />
                </label>

                <div v-if="isDelivery" class="cart-form__address">
                  <span v-if="newAddress" class="cart-form__label"
                    >Новый адрес:</span
                  >
                  <span v-if="existingAddress" class="cart-form__label"
                    >Существующий адрес:</span
                  >
                  <div class="cart-form__input">
                    <label class="input">
                      <span>Улица*</span>
                      <input
                        :value="shippingInformation.address.street"
                        type="text"
                        name="street"
                      />
                    </label>
                  </div>

                  <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                      <span>Дом*</span>
                      <input
                        :value="shippingInformation.address.house"
                        type="text"
                        name="house"
                      />
                    </label>
                  </div>

                  <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                      <span>Квартира</span>
                      <input
                        :value="shippingInformation.address.apartment"
                        type="text"
                        name="apartment"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>
      <section v-if="!isEmptyCart" class="footer">
        <div class="footer__more">
          <router-link to="/" class="button button--border button--arrow"
            >Хочу еще одну</router-link
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ finalOrderPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button @click="showModal" class="button">Оформить заказ</button>
        </div>
        <Modal ref="modal" class="visually-hidden"></Modal>
      </section>
    </div>
  </form>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  SET_MISC,
  SET_BUILDER,
  SET_PIZZA_COUNT,
  SET_ADDITIONAL_COUNT,
} from "@/store/modules/mutation-types";
import Modal from "@/common/components/Modal";
export default {
  name: "Cart",
  components: {
    ItemCounter,
    Modal,
  },
  mounted() {
    this.setInitialData();
  },
  computed: {
    ...mapState("Cart", ["pizza", "total", "misc", "shippingInformation"]),
    ...mapState("Auth", ["user"]),
    userName() {
      return this.user?.name || "Нет имени";
    },
    isEmptyCart() {
      return this.pizza.length === 0;
    },
    ...mapGetters("Cart", ["finalOrderPrice"]),
    shippingOption() {
      if (this.user) {
        return ["Получу сам", "Новый адрес", "Существующий адрес"];
      } else {
        return ["Получу сам", "Новый адрес"];
      }
    },
    phoneNumber() {
      if (this.user) {
        return this.user.phone;
      } else {
        return "";
      }
    },
    newAddress() {
      return this.shippingInformation.receiveOrder === "Новый адрес";
    },
    existingAddress() {
      return this.shippingInformation.receiveOrder === "Существующий адрес";
    },
    isDelivery() {
      return this.shippingInformation.receiveOrder !== "Получу сам";
    },
  },
  methods: {
    ...mapMutations("Cart", [SET_MISC, SET_PIZZA_COUNT, SET_ADDITIONAL_COUNT]),
    ...mapMutations("Builder", [SET_BUILDER]),
    setInitialData() {
      this[SET_MISC]();
    },
    countPizza(index, add) {
      this[SET_PIZZA_COUNT]({ index, add });
    },
    countAdditional(index, add) {
      this[SET_ADDITIONAL_COUNT]({ index, add });
    },
    changePizza(pizza, index) {
      this[SET_BUILDER]({ pizza, index });
      this.$router.push("/");
    },
    showModal() {
      const element = this.$refs.modal.$el;
      element.classList.toggle("visually-hidden");
    },
  },
};
</script>

<style scoped></style>
