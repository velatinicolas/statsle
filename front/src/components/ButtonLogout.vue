<template>
  <button v-on:click="logout()">Log out</button>
</template>

<script lang="ts">
import { useToasterStore } from "@/stores/toaster";
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const toasterStore = useToasterStore();
    return { userStore, toasterStore };
  },
  methods: {
    logout() {
      this.userStore.reset();
      window.localStorage.removeItem("jwt");
      this.toasterStore.info("Logged out!");
      this.$router.push("/");
    },
  },
});
</script>
