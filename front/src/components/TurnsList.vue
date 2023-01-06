<template>
  <div id="turns-list" v-if="turnsList.length > 0">
    <TurnDisplay
      v-for="turn in turnsList"
      :key="turn.identifier"
      :turn="turn"
    ></TurnDisplay>
  </div>
  <div v-else>
    <h3>No challenges saved yet!</h3>
  </div>
</template>

<script lang="ts">
import type { TurnInterface } from "@/interfaces/from-api.interface";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { defineComponent } from "vue";
import TurnDisplay from "./TurnDisplay.vue";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    return { statleApiClientStore };
  },
  data(): {
    turnsList: TurnInterface[];
  } {
    return {
      turnsList: [],
    };
  },
  created() {
    this.loadTurnsList();
  },
  methods: {
    loadTurnsList() {
      return this.statleApiClientStore.client
        .getSelfTurns()
        .then((turnsList) => {
          this.turnsList = turnsList;
        });
    },
  },
  components: { TurnDisplay },
});
</script>
