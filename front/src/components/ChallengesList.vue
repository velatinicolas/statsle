<template>
  <div v-if="loading" class="loader"></div>
  <div v-else-if="challengesList.length > 0" id="challenges-list-main">
    <h5>Challenges recognized so far:</h5>
    <div id="challenges-list">
      <a
        v-for="challenge in challengesList"
        :key="challenge.identifier"
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
import { useStatsleApiClientStore } from "@/stores/statsle-api-client";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const statsleApiClientStore = useStatsleApiClientStore();
    return { statsleApiClientStore };
  },
  data(): {
    challengesList: ChallengeResourceInterface[];
    loading: boolean;
  } {
    return {
      challengesList: [],
      loading: true,
    };
  },
  created() {
    this.loadChallengesList();
  },
  methods: {
    loadChallengesList() {
      this.loading = true;
      return this.statsleApiClientStore.client
        .getChallengesList()
        .then((challengesList) => {
          this.challengesList = challengesList.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          this.loading = false;
        });
    },
  },
});
</script>
