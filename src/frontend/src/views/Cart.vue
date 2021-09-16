<template>
  <div class="layout-form">
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
                        ><span :key="sizeIndex + size.name" v-if="size.checked">
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
                <select v-model="receiveOrder" name="test" class="select">
                  <option
                    v-for="(item, index) in shippingOptions"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
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
                      :value="localAddress.street"
                      type="text"
                      name="street"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input
                      :value="localAddress.building"
                      type="text"
                      name="house"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input
                      :value="localAddress.flat"
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
import Options from "@/common/options/shipping";
export default {
  name: "Cart",
  components: {
    ItemCounter,
    Modal,
  },
  data: function () {
    return {
      receiveOrder: {},
    };
  },
  mounted() {
    this.setInitialData();
  },
  computed: {
    ...mapState("Cart", ["pizza", "total", "misc", "shippingInformation"]),
    ...mapState("Address", ["address"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapGetters("Cart", ["finalOrderPrice"]),
    isEmptyCart() {
      return this.pizza.length === 0;
    },
    phoneNumber() {
      if (this.user) {
        return this.user.phone;
      } else {
        return "";
      }
    },
    localAddress() {
      if (this.isAuthenticated) {
        return this.address[0];
      } else {
        return { street: "", building: "", flat: "" };
      }
    },
    shippingOptions() {
      return Options.shipping(this.isAuthenticated);
    },
    newAddress() {
      return this.receiveOrder === 2;
    },
    existingAddress() {
      return this.receiveOrder === 3;
    },
    isDelivery() {
      return this.receiveOrder === 2 || this.receiveOrder === 3;
    },
    userAddress() {
      return this.user.addresses || "Нет сохраненного адреса";
    },
  },
  methods: {
    ...mapMutations("Cart", [SET_MISC, SET_PIZZA_COUNT, SET_ADDITIONAL_COUNT]),
    ...mapMutations("Builder", [SET_BUILDER]),
    setInitialData() {
      this.$store.dispatch("Cart/getMisc");
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
      const data = {
        userId: this.user.id,
        orderPizzas: [
          {
            name: "Пицца хардкор",
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            quantity: 1,
            ingredients: [
              {
                ingredientId: 1,
                quantity: 3,
              },
            ],
          },
        ],
        orderMisc: [
          {
            miscId: 1,
            quantity: 2,
          },
          {
            miscId: 3,
            quantity: 2,
          },
        ],
        address: this.localAddress,
      };
      this.$store.dispatch("Orders/setOrders", data);
    },
  },
};
</script>

<style scoped></style>
