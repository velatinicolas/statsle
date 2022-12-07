<template>
  Log in:
  <input type="text" v-model="username" placeholder="pseudo"/>
  <input type="password" v-model="password" placeholder="password"/>
  <input type="button" v-on:click="tryLogin()" value="Log in!">
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

// TODO use SDK to share API interface
export interface UserResource {
  identifier: string
  username: string
  email: string | null
  createdAt: Date
}

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    }
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
    },
    tryLogin() {
      axios.post<{access_token: string}>(
        'http://localhost:3000/auth/login',
        {
          username: this.username,
          password: this.password,
        }
      )
      .then(response => response.data.access_token)
      .then(jwt =>
        axios.get<UserResource>('http://localhost:3000/auth/me', {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        })
        .then(response => response.data.username)
        .then(username => {
          this.userStore.user.jwt = jwt
          this.userStore.user.username = username
        })
      )
      .catch(error => {
        this.error = "Invalid username or password!"
        this.reinitInputs()
      })
    }
  }
})
</script>
