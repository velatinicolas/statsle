<template>
  <div v-if="loading" class="loader"></div>
  <div v-else>
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
  </div>
</template>

<script lang="ts">
import {
  groupBy,
  TurnsGroupByEnum,
  type TurnsInterfaceGroups,
} from "@/helpers/group-by.helper";
import { sortBy, TurnsSortByEnum } from "@/helpers/sort-by.helper";
import { useStatsleApiClientStore } from "@/stores/statsle-api-client";
import { defineComponent } from "vue";
import TurnsGroup from "./TurnsGroup.vue";

export default defineComponent({
  setup() {
    const statsleApiClientStore = useStatsleApiClientStore();
    return { statsleApiClientStore };
  },
  data(): {
    turnsList: TurnsInterfaceGroups;
    loading: boolean;
  } {
    return {
      turnsList: [],
      loading: true,
    };
  },
  created() {
    this.loadTurnsList();
  },
  methods: {
    loadTurnsList() {
      this.loading = true;
      return this.statsleApiClientStore.client
        .getSelfTurns()
        .then((turnsList) => {
          this.turnsList = groupBy(turnsList, TurnsGroupByEnum.DATE);
          this.turnsList.forEach((turns) =>
            sortBy(turns.turns, TurnsSortByEnum.CHALLENGE)
          );
          this.loading = false;
        });
    },
  },
  components: { TurnsGroup },
});
</script>
