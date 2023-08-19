<template>
  <div class="user-form">
    <h2>Sign up</h2>
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
      <input
        type="password"
        @keyup.enter="trySignup()"
        v-model="confirm"
        placeholder="confirm password"
      />
    </div>
    <div>
      <button v-on:click="trySignup()">Sign in</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStatsleApiClientStore } from "@/stores/statsle-api-client";
import { useToasterStore } from "@/stores/toaster";

export default defineComponent({
  setup() {
    const statsleApiClientStore = useStatsleApiClientStore();
    const toasterStore = useToasterStore();
    return { statsleApiClientStore, toasterStore };
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
    trySignup() {
      if (this.password !== this.confirm) {
        this.toasterStore.error("Password and confirmation don't match!");
        this.reinitInputs();
        return;
      }

      return this.statsleApiClientStore.client
        .createUser(this.username, this.password, this.email)
        .then(() => {
          this.toasterStore.info("Successfully signed up! You can now log in.");
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
