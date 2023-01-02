<template>
  <div class="user-prompt">
    <h2>Sign in</h2>
    <input type="text" v-model="username" placeholder="pseudo" />
    <input type="password" v-model="password" placeholder="password" />
    <input type="password" v-model="confirm" placeholder="confirm" />
    <button v-on:click="trySignin()">Sign in</button>
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
      password: "",
      confirm: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
      this.confirm = "";
    },
    trySignin() {
      if (this.password !== this.confirm) {
        this.toasterStore.error("Password and confirmation don't match!");
        this.reinitInputs();
        return;
      }

      return this.statleApiClientStore.client
        .createUser(this.username, this.password)
        .then(() => {
          this.toasterStore.info("Successfully signed in!");
          this.reinitInputs();
        })
        .catch((error) => {
          this.toasterStore.error(
            `Sign in failed: ${JSON.stringify(error.response.data.message)}`
          );
          this.reinitInputs();
        });
    },
  },
});
</script>
