<template>
  <div class="user-prompt">
    <h2>Log in</h2>
    <input type="text" v-model="username" placeholder="pseudo" />
    <input type="password" v-model="password" placeholder="password" />
    <button v-on:click="tryLogin()">Log in</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import type { UserResourceInterface } from "@/interfaces/from-api.interface";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
    },
    tryLogin() {
      axios
        .post<{ access_token: string }>("http://localhost:3000/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => response.data.access_token)
        .then((jwt) =>
          axios
            .get<UserResourceInterface>("http://localhost:3000/auth/me", {
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            })
            .then((response) => response.data.username)
            .then((username) => {
              this.userStore.user.jwt = jwt;
              this.userStore.user.username = username;
              this.$router.push('/welcome')
            })
        )
        .catch((error) => {
          this.error = "Invalid username or password!";
          this.reinitInputs();
        });
    },
  },
});
</script>
