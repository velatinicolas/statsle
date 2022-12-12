<template>
  <div v-if="turnsList.length > 0">
    <Turn v-for="turn in turnsList" :turn="turn"></Turn>
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
import Turn from "./Turn.vue";

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
  components: { Turn },
});
</script>
