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
                <select
                  v-model="receiveOrder"
                  @change="changeAddress"
                  name="test"
                  class="select"
                >
                  <option
                    v-for="item in shippingOptions"
                    :key="item.id"
                    :value="item"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  v-model="phoneNumber"
                  type="text"
                  name="phone"
                  placeholder="+7 999-999-99-99"
                />
              </label>
              <div v-if="!noDelivery" class="cart-form__address">
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
                      v-model="localAddress.street"
                      :disabled="existingAddress"
                      type="text"
                      name="street"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input
                      v-model="localAddress.building"
                      :disabled="existingAddress"
                      type="text"
                      name="house"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input
                      v-model="localAddress.flat"
                      :disabled="existingAddress"
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
        <Button @click="setOrder" :disabled="disabledSubmitOrder"
          >Оформить заказ</Button
        >
      </div>
    </section>
    <div class="central-form">
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__bounceIn"
      >
        <Modal v-if="showModal" @closeModal="closeModal"></Modal>
      </transition>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import Button from "@/common/components/Button";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import {
  SET_BUILDER,
  SET_PIZZA_COUNT,
  SET_ADDITIONAL_COUNT,
  CLEAN_CART,
} from "@/store/modules/mutation-types";
import Modal from "@/common/components/Modal";
import Options from "@/common/options/shipping";
import pizzasOrderOptions from "@/common/mixins/formatOrderOptions";
import miscOrderOptions from "@/common/mixins/formatOrderOptions";
import { cloneDeep } from "lodash";
export default {
  name: "Cart",
  components: {
    Button,
    ItemCounter,
    Modal,
  },
  mixins: [pizzasOrderOptions, miscOrderOptions],
  data: function () {
    return {
      receiveOrder: { id: "self", name: "Получу сам" },
      localAddress: null,
      phoneNumber: "",
      showModal: false,
    };
  },
  watch: {
    userPhone: {
      handler() {
        this.phoneNumber = cloneDeep(this.user?.phone);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState("Cart", ["pizza", "total", "misc"]),
    ...mapState("Address", ["address"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapGetters("Cart", ["finalOrderPrice"]),
    isEmptyCart() {
      return this.pizza.length === 0;
    },
    disabledSubmitOrder() {
      let disabled = false;
      if (this.newAddress) {
        Object.keys(this.localAddress).forEach((item) => {
          if (this.localAddress[item] === "") {
            disabled = true;
          }
        });
      }
      return this.phoneNumber === "" || disabled;
    },
    shippingOptions() {
      let options = [];
      if (this.address) {
        this.address.forEach((address) => {
          options.push({
            id: address.id,
            name: address.name,
          });
        });
      }
      return Options.shipping().concat(options);
    },
    newAddress() {
      return this.receiveOrder.id === "new";
    },
    noDelivery() {
      return this.receiveOrder.id === "self";
    },
    existingAddress() {
      return this.receiveOrder.id !== "self" && this.receiveOrder.id !== "new";
    },
  },
  methods: {
    ...mapMutations("Cart", [
      SET_PIZZA_COUNT,
      SET_ADDITIONAL_COUNT,
      CLEAN_CART,
    ]),
    ...mapMutations("Builder", [SET_BUILDER]),
    ...mapActions({ setOrders: "Orders/setOrders" }),
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
    changeAddress() {
      if (this.newAddress) {
        this.localAddress = { street: "", building: "", flat: "" };
      }
      if (this.noDelivery) {
        this.localAddress = null;
      }
      if (this.receiveOrder && this.isAuthenticated) {
        this.address.forEach((address) => {
          if (address.id === this.receiveOrder.id) {
            this.localAddress = address;
          }
        });
      }
    },
    setOrder() {
      const data = {
        userId: this.user?.id || null,
        pizzas: this.pizzasOrderOptions(this.pizza),
        misc: this.miscOrderOptions(this.misc),
        address: this.localAddress,
      };
      this.setOrders(data).then(() => {
        this[CLEAN_CART]();
      });
      this.showModal = true;
    },
    closeModal() {
      const element = document.querySelector(".popup");
      element.classList.add("animate__animated", "animate__bounceOutLeft");
      element.addEventListener("animationend", () => {
        if (this.isAuthenticated) {
          this.$router.push("orders");
        } else {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped></style>
