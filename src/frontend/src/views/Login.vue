<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white"
      ><span class="visually-hidden"
        >Закрыть форму авторизации</span
      ></router-link
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
    <button @click="login" type="submit" class="button">Авторизоваться</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
