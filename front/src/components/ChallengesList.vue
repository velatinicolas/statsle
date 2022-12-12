<template>
  <div id="challenges-list-main" v-if="challengesList.length > 0">
    <h3>Challenges we recognize so far:</h3>
    <div id="challenges-list">
      <a
        v-for="challenge in challengesList"
        :href="challenge.url"
        target="_blank"
        rel="noopener noreferer"
        >{{ challenge.name }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import type { ChallengeResourceInterface } from "@/interfaces/from-api.interface";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    return { statleApiClientStore };
  },
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
      return this.statleApiClientStore.client
        .getChallengesList()
        .then((challengesList) => {
          this.challengesList = challengesList.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        });
    },
  },
});
</script>
