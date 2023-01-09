<script setup lang="ts">
import { RouterView } from "vue-router";
import ButtonLink from "./components/ButtonLink.vue";
import LoggedUser from "./components/LoggedUser.vue";
import ButtonLogout from "./components/ButtonLogout.vue";
import { useUserStore } from "./stores/user";
import { useToasterStore } from "./stores/toaster";

const userStore = useUserStore();
const toasterStore = useToasterStore();
</script>

<template>
  <header id="header">
    <router-link class="no-decoration" to="/">
      <p id="main-title">Statsle<sup class="version">Beta</sup></p>
    </router-link>
    <h3 id="subtitle">All stats of your daily challenges in one place!</h3>
    <div class="user-state">
      <LoggedUser
        v-if="userStore.isLoggedIn"
        :username="userStore.user.username"
      ></LoggedUser>
      <ButtonLink
        path="/welcome"
        label="Home"
        v-if="userStore.isLoggedIn"
      ></ButtonLink>
      <ButtonLink
        path="/stats"
        label="My saved challenges"
        v-if="userStore.isLoggedIn"
      ></ButtonLink>
      <ButtonLogout v-if="userStore.isLoggedIn"></ButtonLogout>
    </div>
  </header>
  <body>
    <router-view></router-view>
  </body>
  <footer>
    <p :class="toasterStore.message?.level">
      {{ toasterStore.message?.message }}
    </p>
  </footer>
</template>
