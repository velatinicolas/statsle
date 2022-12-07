<template>
  <input type="button" v-on:click="logout()" value="Logout!">
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  methods: {
    logout() {
      // Logout only consists in a removing the access token from the store
      this.userStore.user.jwt = ""
      this.userStore.user.username = ""
    }
  }
})
</script>
