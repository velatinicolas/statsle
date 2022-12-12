<template>
  <div id="turn-form">
    <p>Paste the result of one of your daily challenges!</p>
    <textarea rows="20" cols="50" v-model="turnResult"></textarea><br />
    <button v-on:click="submitTurn()">Submit</button>
    <p v-if="info" class="info">{{ info }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const statleApiClientStore = useStatleApiClientStore();
    return { userStore, statleApiClientStore };
  },
  data() {
    return {
      turnResult: "",
      info: "",
      error: "",
    };
  },
  methods: {
    submitTurn() {
      this.info = "";
      this.error = "";
      return this.statleApiClientStore.client
        .createTurn(this.turnResult, this.userStore.user.jwt)
        .then(() => {
          this.info = "Result saved!";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
});
</script>
