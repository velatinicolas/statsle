<template>
  <div v-if="challengesList.length > 0">
    Here are the games we recognize so far:
    <ul>
      <li v-for="challenge in challengesList"><a :href="challenge.url" target="_blank" rel="noopener noreferer">{{ challenge.name }}</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

// TODO use SDK to share API interface
export interface ChallengeResource {
  identifier: number
  name: string
  url: string
}

export default defineComponent({
  data(): {
    challengesList: ChallengeResource[]
  } {
    return {
      challengesList: [],
    }
  },
  created() {
    this.loadChallengesList()
  },
  methods: {
    loadChallengesList() {
      return axios.get<ChallengeResource[]>(
        'http://localhost:3000/challenges'
      ).then(response => { this.challengesList = response.data.sort((a, b) => a.name > b.name ? 1 : -1) })
    }
  }
})
</script>