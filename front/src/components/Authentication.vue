<script setup lang="ts">
import Signin from "./Signin.vue";
import Login from "./Login.vue";
import { useUserStore } from "@/stores/user";
import ChallengesList from "./ChallengesList.vue";

const userStore = useUserStore();
</script>

<template>
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
  <div>
    <ChallengesList></ChallengesList>
  </div>
</template>
