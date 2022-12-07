<template>
  Sign in: 
  <input type="text" v-model="username" placeholder="pseudo"/>
  <input type="password" v-model="password" placeholder="password"/>
  <input type="password" v-model="confirm" placeholder="confirm"/>
  <input type="button" v-on:click="trySignin()" value="Sign in!">
  <span v-if="error">{{ error }}</span>
  <span v-if="info">{{ info }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { UserResource } from './Login.vue';

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      error: "",
      info: "",
    }
  },
  methods: {
    reinitInputs() {
      this.username = "";
      this.password = "";
      this.confirm = ""
    },
    trySignin() {
      this.error = ""
      this.info = ""

      if (this.password !== this.confirm) {
        this.error = "Password and confirmation don't match!"
        this.reinitInputs()
        return
      }
      
      return axios.post<UserResource>(
        'http://localhost:3000/users',
        {
          username: this.username,
          password: this.password,
        }
      )
      .then(() => {
        this.info = "Successfully signed in!"
        this.reinitInputs()
      })
      .catch(error => {
        this.error = `Sign in failed: ${JSON.stringify(error.response.data.message)}`
        this.reinitInputs()
      })
    }
  }
})
</script>
