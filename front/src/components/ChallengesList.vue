<template>
  <div id="challenges-list-main" v-if="challengesList.length > 0">
    <h3>Challenges we recognize so far:</h3>
    <div id="challenges-list">
      <a v-for="challenge in challengesList" :href="challenge.url" target="_blank" rel="noopener noreferer">{{
          challenge.name
        }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import type { ChallengeResourceInterface } from "@/interfaces/from-api.interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data(): {
    challengesList: ChallengeResourceInterface[];
  } {
    return {
      challengesList: [],
    };
  },
  created() {
    this.loadChallengesList();
  },
  methods: {
    loadChallengesList() {
      return axios
        .get<ChallengeResourceInterface[]>("http://localhost:3000/challenges")
        .then((response) => {
          this.challengesList = response.data.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        });
    },
  },
});
</script>
