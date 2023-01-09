<template>
  <div class="user-prompt">
    <h2>Sign in</h2>
    <div>
      <input type="text" v-model="username" placeholder="username" />
    </div>
    <div>
      <input type="text" v-model="email" placeholder="email" />
    </div>
    <div>
      <input type="password" v-model="password" placeholder="password" />
    </div>
    <div>
      <input type="password" v-model="confirm" placeholder="confirm password" />
    </div>
    <div>
      <button v-on:click="trySignin()">Sign in</button>
    </div>
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
      email: "",
      password: "",
      confirm: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.email = "";
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
        .createUser(this.username, this.password, this.email)
        .then(() => {
          this.toasterStore.info("Successfully signed in! You can now log in.");
          this.reinitInputs();
        })
        .catch((error) => {
          this.toasterStore.error(error.response.data.message);
          this.reinitInputs();
        });
    },
  },
});
</script>
