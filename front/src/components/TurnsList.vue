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
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { defineComponent } from "vue";
import Turn from "./Turn.vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
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
      return axios
        .get<TurnInterface[]>("http://localhost:3000/me/turns", {
          headers: {
            authorization: `Bearer ${this.userStore.user.jwt}`,
          },
        })
        .then((response) => {
          this.turnsList = response.data;
        });
    },
  },
  components: { Turn },
});
</script>
