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
          name="pass"
          placeholder="***********"
        />
      </label>
    </div>
    <Button @click="login">Авторизоваться</Button>
  </div>
</template>

<script>
import Button from "@/common/components/Button";
export default {
  name: "Login",
  components: { Button },
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    closeModal() {
      const element = document.querySelector(".sign-form");
      element.classList.add("animate__animated", "animate__bounceOutLeft");
      element.addEventListener("animationend", () => {
        this.$router.push("/");
      });
    },
    login() {
      this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      this.closeModal();
    },
  },
};
</script>

<style scoped></style>
