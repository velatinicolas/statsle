<script setup lang="ts">
  import { defineComponent, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ChallengesList from "./components/ChallengesList.vue";
import LoggedUser from "./components/LoggedUser.vue";
  import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import Signin from "./components/Signin.vue";
import TurnForm from "./components/TurnForm.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore()

</script>

<template>
  <header>
    <h1>Welcome to Statle<sup class="version">Beta</sup></h1>
    <div class="user-state">
      <LoggedUser v-if="userStore.isLoggedIn" :username="userStore.user.username"></LoggedUser>
      <Logout v-if="userStore.isLoggedIn"></Logout>
    </div>
  </header>
  <body>
    <!-- <ChallengesList></ChallengesList> -->
    <div v-if="!userStore.isLoggedIn" class="user-actions">
      <div class="user-action">
        <Login></Login>
      </div>
      <div class="user-action">
        <h3>or</h3>
      </div>
      <div class="user-action">
        <Signin></Signin>
      </div>
    </div>
    <div v-if="userStore.isLoggedIn">
      <TurnForm></TurnForm>
    </div>
  </body>
</template>