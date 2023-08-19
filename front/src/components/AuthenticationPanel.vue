<script setup lang="ts">
import SignupForm from "./SignupForm.vue";
import LoginForm from "./LoginForm.vue";
import { useUserStore } from "@/stores/user";

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
      <SignupForm></SignupForm>
    </div>
  </div>
</template>
