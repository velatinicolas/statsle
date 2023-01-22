<template>
  <div class="raw-result" v-if="showRawResult">{{ turn.rawResult }}</div>
  <div @mouseover="showRawResult = true" @mouseleave="showRawResult = false">
    <a :href="turn.game.challenge.url">{{ turn.game.challenge.name }}</a> #{{
      turn.game.number
    }}
    {{ turn.result === "WON" ? "✅" : "❌" }}
    <span v-if="turn.score"> - score {{ turn.score }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { TurnInterface } from "@/interfaces/from-api.interface";

export default defineComponent({
  data() {
    return {
      showRawResult: false,
    };
  },
  props: {
    turn: {
      type: Object as PropType<TurnInterface>,
      required: true,
    },
  },
});
</script>
