<script setup lang="ts">
import { RouterView } from "vue-router";
import ButtonLink from "./components/ButtonLink.vue";
import LoggedUser from "./components/LoggedUser.vue";
import Logout from "./components/Logout.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <header id="header">
    <p id="main-title">Statle<sup class="version">Beta</sup></p>
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
      <Logout v-if="userStore.isLoggedIn"></Logout>
    </div>
  </header>
  <body>
    <router-view></router-view>
  </body>
</template>
