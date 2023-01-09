<template>
  <div class="user-form">
    <h2>Recover your password</h2>
    <div>
      <input type="password" v-model="newPassword" placeholder="new password" />
    </div>
    <div>
      <input
        type="password"
        v-model="confirm"
        placeholder="confirm new password"
      />
    </div>
    <div>
      <button v-on:click="submit()">Submit</button>
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
      newPassword: "",
      confirm: "",
    };
  },
  props: {
    identifier: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    reinitInputs() {
      this.newPassword = "";
      this.confirm = "";
    },
    submit() {
      if (this.newPassword !== this.confirm) {
        this.toasterStore.error("New password and confirmation don't match!");
        this.reinitInputs();
        return;
      }

      return this.statleApiClientStore.client
        .usePasswordRecovery(this.identifier, this.token, this.newPassword)
        .then(() => {
          this.toasterStore.info(
            "Password successfully recovered! You can now log in."
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
