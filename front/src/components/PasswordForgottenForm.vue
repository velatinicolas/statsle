<template>
  <div class="password-forgotten-prompt">
    <h2>Ask for a password recovery</h2>
    <div>
      <input type="text" v-model="username" placeholder="username" />
    </div>
    <button v-on:click="submit()">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { useToasterStore } from "@/stores/toaster";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    const toasterStore = useToasterStore();
    return { statleApiClientStore, toasterStore };
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
    },
    submit() {
      return this.statleApiClientStore.client
        .createPasswordRecovery(this.username)
        .then(() => {
          this.toasterStore.info("You should receive an email soon to recover your password. Check your spam folder!");
          this.$router.push("/");
        })
        .catch((error) => {
          this.toasterStore.error(error.response.data.message);
          this.reinitInputs();
        });
    },
  },
});
</script>