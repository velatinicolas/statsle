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
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";
import TurnDisplay from "./TurnDisplay.vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const statleApiClientStore = useStatleApiClientStore();
    return { userStore, statleApiClientStore };
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
        .getSelfTurns(this.userStore.user.jwt)
        .then((turnsList) => {
          this.turnsList = turnsList;
        });
    },
  },
  components: { TurnDisplay },
});
</script>
