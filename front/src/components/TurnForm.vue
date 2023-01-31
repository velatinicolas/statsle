<template>
  <div id="turn-form">
    <div class="large-screen-only">
      <ChallengesList></ChallengesList>
    </div>
    <textarea
      class="turn-form-input"
      placeholder="Paste the result of one of your daily challenges!"
      rows="20"
      cols="40"
      @keydown.enter.prevent
      @keyup.enter="submitTurn()"
      v-model="turnResult"
    ></textarea>
    <button v-on:click="submitTurn()">Submit</button>
  </div>
</template>

<script lang="ts">
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";
import ChallengesList from "./ChallengesList.vue";
import { useToasterStore } from "../stores/toaster";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const statleApiClientStore = useStatleApiClientStore();
    const toasterStore = useToasterStore();
    return { userStore, statleApiClientStore, toasterStore };
  },
  data() {
    return {
      turnResult: "",
    };
  },
  methods: {
    submitTurn() {
      return this.statleApiClientStore.client
        .createTurn(this.turnResult)
        .then(() => {
          this.turnResult = "";
          this.toasterStore.info("Result saved!");
        })
        .catch((error) => {
          this.toasterStore.error(error.response.data.message);
        });
    },
  },
  components: { ChallengesList },
});
</script>
