<script setup lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ChallengesList from "./components/ChallengesList.vue";
import LoggedUser from "./components/LoggedUser.vue";
  import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import Signin from "./components/Signin.vue";
import TurnForm from "./components/TurnForm.vue";
import TurnsList from "./components/TurnsList.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore()
const turnsListRef = ref<typeof TurnsList | null>(null)

function reloadTurnsList() {
  turnsListRef.value?.loadTurnsList()
}

</script>

<template>
  <header>
    <p id="main-title">Statle<sup class="version">Beta</sup></p>
    <h3>All your daily challenge stats in one place!</h3>
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
        <h2>or</h2>
      </div>
      <div class="user-action">
        <Signin></Signin>
      </div>
    </div>
    <div v-if="userStore.isLoggedIn">
      <TurnForm @turn-saved=""></TurnForm>
      <TurnsList ref="turnsListRef"></TurnsList>
    </div>
  </body>
</template>