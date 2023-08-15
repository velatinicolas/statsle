<template>
  <div class="user-form">
    <h2>Ask for a password recovery</h2>
    <div>
      <input
        type="text"
        @keyup.enter="submit()"
        v-model="username"
        placeholder="username"
      />
    </div>
    <div>
      <button v-on:click="submit()">Submit</button>
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
    };
  },
  methods: {
    reinitInputs() {
      this.username = "";
    },
    submit() {
      return this.statsleApiClientStore.client
        .createPasswordRecovery(this.username)
        .then(() => {
          this.toasterStore.info(
            "You should receive an email soon to recover your password. Check your spam folder!"
          );
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
