<template>
  <div>{{ turn.game.challenge.name }} #{{ turn.game.number }} : {{ turn.result }}<span v-if="turn.score"> with score {{ turn.score }}</span></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
import type { TurnInterface } from '@/interfaces/from-api.interface';

  export default defineComponent({
    props: {
      turn: {
        type: Object as PropType<TurnInterface>,
        required: true,
      },
    }
  })
</script>