<template>
  <div id="turns-list" v-if="Object.keys(turnsList).length > 0">
    <TurnsGroup
      v-for="turns in turnsList"
      :key="turns.title"
      :turns="turns.turns"
      :groupTitle="turns.title"
    ></TurnsGroup>
  </div>
  <div v-else>
    <h3>No challenges saved yet!</h3>
  </div>
</template>

<script lang="ts">
import {
  groupBy,
  TurnsGroupByEnum,
  type TurnsInterfaceGroups,
} from "@/helpers/group-by.helper";
import { sortBy, TurnsSortByEnum } from "@/helpers/sort-by.helper";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { defineComponent } from "vue";
import TurnsGroup from "./TurnsGroup.vue";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    return { statleApiClientStore };
  },
  data(): {
    turnsList: TurnsInterfaceGroups;
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
          this.turnsList = groupBy(turnsList, TurnsGroupByEnum.DATE);
          this.turnsList.forEach((turns) =>
            sortBy(turns.turns, TurnsSortByEnum.CHALLENGE)
          );
        });
    },
  },
  components: { TurnsGroup },
});
</script>
