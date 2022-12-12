<script setup lang="ts">
import SigninForm from "./SigninForm.vue";
import LoginForm from "./LoginForm.vue";
import { useUserStore } from "@/stores/user";
import ChallengesList from "./ChallengesList.vue";

const userStore = useUserStore();
</script>

<template>
  <div v-if="!userStore.isLoggedIn" class="user-actions">
    <div class="user-action">
      <LoginForm></LoginForm>
    </div>
    <div class="user-action">
      <h2>or</h2>
    </div>
    <div class="user-action">
      <SigninForm></SigninForm>
    </div>
  </div>
  <div>
    <ChallengesList></ChallengesList>
  </div>
</template>
