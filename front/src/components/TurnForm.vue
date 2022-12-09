<template>
  <div class="turn-form">
    <p>Paste the result of one of your daily challenges!</p>
    <textarea rows="20" cols="50" v-model="turnResult"></textarea><br/>
    <button v-on:click="submitTurn()">Submit</button>
    <div v-if="turn">
      Saved <Turn :turn="turn"></Turn>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { defineComponent } from 'vue';
import Turn from './Turn.vue';

export default defineComponent({
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    data() {
        return {
            turnResult: "",
            turn: undefined,
            error: "",
        };
    },
    methods: {
        submitTurn() {
            this.turn = undefined
            return axios.post("http://localhost:3000/turns", {
                rawResult: this.turnResult
            }, {
                headers: {
                    authorization: `Bearer ${this.userStore.user.jwt}`
                }
            }).then(response => { console.info(response.data);this.turn = response.data })
            .catch(error => { this.error = error.response.data.message })
        }
    },
    components: { Turn }
})
</script>