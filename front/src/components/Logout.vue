<template>
  <button v-on:click="logout()">Log out</button>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    logout() {
      // Logout only consists in removing the access token from the store
      this.userStore.user.jwt = "";
      this.userStore.user.username = "";
      this.$router.push("/");
    },
  },
});
</script>
