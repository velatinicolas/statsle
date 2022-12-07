<script setup lang="ts">
  import { defineComponent, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import LoggedUser from "./components/LoggedUser.vue";
  import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import Signin from "./components/Signin.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore()

</script>

<template>
  <header>
    <h1>Welcome to Statle!</h1>
    <div>
      <LoggedUser v-if="userStore.isLoggedIn" :username="userStore.user.username"></LoggedUser>
    </div>
    <div v-if="!userStore.isLoggedIn">
      <div>
        <Login></Login>
      </div>
      <div>
        or
      </div>
      <div>
        <Signin></Signin>
      </div>
    </div>
    <Logout v-if="userStore.isLoggedIn"></Logout>

  </header>
</template>