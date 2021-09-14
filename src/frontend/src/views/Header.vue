<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" href="index.html" class="logo">
        <img
          src="@/public/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ finalOrderPrice }} ₽</router-link>
    </div>
    <div v-if="isAuthenticated" class="header__user">
      <router-link to="/Profile">
        <picture>
          <source type="image/webp" />
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a v-if="isAuthenticated" class="header__logout" @click="logout"
        ><span>Выйти</span></a
      >
    </div>
    <div v-else class="header__user">
      <router-link to="/login" class="header__login"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters("Cart", ["finalOrderPrice"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    },
  },
};
</script>

<style scoped></style>
