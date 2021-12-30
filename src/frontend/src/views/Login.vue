<template>
  <div class="sign-form">
    <a @click="closeModal" class="close close--white"
      ><span class="visually-hidden">Закрыть форму авторизации</span></a
    >
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <div class="sign-form__input">
      <label class="input">
        <span>E-mail</span>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
        />
      </label>
    </div>

    <div class="sign-form__input">
      <label class="input">
        <span>Пароль</span>
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="***********"
        />
      </label>
    </div>
    <AppButton @click="login" :disabled="disabledButton"
      >Авторизоваться</AppButton
    >
  </div>
</template>

<script>
import AppButton from "@/common/components/AppButton";
import isLoggedIn from "@/middlewares/isLoggedIn";
export default {
  name: "Login",
  layout: "LoginLayout",
  middlewares: { middlewares: isLoggedIn },
  components: { AppButton },
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    disabledButton() {
      return !(this.password && this.email);
    },
  },
  methods: {
    login() {
      this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      this.closeModal();
    },
    closeModal() {
      const element = document.querySelector(".sign-form");
      element?.classList.add("animate__animated", "animate__bounceOutLeft");
      element?.addEventListener("animationend", () => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/close.scss";
</style>
