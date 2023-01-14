<template>
  <fieldset class="turns-group">
    <legend>{{ groupTitle }}</legend>
    <div id="turns-list" v-if="turns.length > 0">
      <TurnDisplay
        v-for="turn in turns"
        :key="turn.identifier"
        :turn="turn"
      ></TurnDisplay>
    </div>
  </fieldset>
</template>

<script lang="ts">
import type { TurnInterface } from "@/interfaces/from-api.interface";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { defineComponent, type PropType } from "vue";
import TurnDisplay from "./TurnDisplay.vue";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    return { statleApiClientStore };
  },
  props: {
    turns: {
      type: Object as PropType<TurnInterface[]>,
      required: true,
    },
    groupTitle: {
      type: String,
      required: true,
    },
  },
  components: { TurnDisplay },
});
</script>
