<template>
  <div class="user-form">
    <h2>Log in</h2>
    <div>
      <input type="text" v-model="username" placeholder="username" />
    </div>
    <div>
      <input
        type="password"
        @keyup.enter="tryLogin()"
        v-model="password"
        placeholder="password"
      />
    </div>
    <div>
      <button v-on:click="tryLogin()">Log in</button>
    </div>
    <div class="password-forgotten">
      <router-link to="/password-forgotten"> I forgot my password </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useStatsleApiClientStore } from "@/stores/statsle-api-client";
import { useToasterStore } from "@/stores/toaster";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const toasterStore = useToasterStore();
    const statsleApiClientStore = useStatsleApiClientStore();
    return { userStore, toasterStore, statsleApiClientStore };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
    },
    tryLogin() {
      this.statsleApiClientStore.client
        .login(this.username, this.password)
        .then((jwt) => {
          window.localStorage.setItem("jwt", jwt.access_token);
          this.statsleApiClientStore.client.me().then((user) => {
            this.userStore.user.username = user.username;
            this.$router.push("/welcome");
          });
        })
        .catch(() => {
          this.toasterStore.error("Invalid username or password!");
          this.reinitInputs();
        });
    },
  },
});
</script>
