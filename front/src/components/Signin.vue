<template>
  <div class="user-prompt">
    <h2>Sign in</h2>
    <input type="text" v-model="username" placeholder="pseudo" />
    <input type="password" v-model="password" placeholder="password" />
    <input type="password" v-model="confirm" placeholder="confirm" />
    <button v-on:click="trySignin()">Sign in</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="info" class="info">{{ info }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { UserResourceInterface } from "@/interfaces/from-api.interface";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      error: "",
      info: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
      this.confirm = "";
    },
    trySignin() {
      this.error = "";
      this.info = "";

      if (this.password !== this.confirm) {
        this.error = "Password and confirmation don't match!";
        this.reinitInputs();
        return;
      }

      return axios
        .post<UserResourceInterface>("http://localhost:3000/users", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.info = "Successfully signed in!";
          this.reinitInputs();
        })
        .catch((error) => {
          this.error = `Sign in failed: ${JSON.stringify(
            error.response.data.message
          )}`;
          this.reinitInputs();
        });
    },
  },
});
</script>
