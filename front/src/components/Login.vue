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
import { useUserStore } from "@/stores/user";
import { useStatleApiClientStore } from "@/stores/statle-api-client";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const statleApiClientStore = useStatleApiClientStore();
    return { userStore, statleApiClientStore };
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
      this.statleApiClientStore.client
        .login(this.username, this.password)
        .then((jwt) =>
          this.statleApiClientStore.client.me(jwt.access_token).then((user) => {
            this.userStore.user.jwt = jwt.access_token;
            this.userStore.user.username = user.username;
            this.$router.push("/welcome");
          })
        )
        .catch(() => {
          this.error = "Invalid username or password!";
          this.reinitInputs();
        });
    },
  },
});
</script>
