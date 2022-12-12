<template>
  <div>
    <a :href="turn.game.challenge.url">{{ turn.game.challenge.name }}</a> #{{
      turn.game.number
    }}
    - <b>{{ turn.result }}</b
    ><span v-if="turn.score"> with score {{ turn.score }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { TurnInterface } from "@/interfaces/from-api.interface";

export default defineComponent({
  props: {
    turn: {
      type: Object as PropType<TurnInterface>,
      required: true,
    },
  },
});
</script>
