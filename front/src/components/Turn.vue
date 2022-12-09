<template>
  <div>{{ turn.game.challenge.name }} #{{ turn.game.number }} : {{ turn.rawResult }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';

  // TODO use SDK to share API interface
  export interface Turn {
    game: {
      challenge: {
        name: string
      },
      number: number,
    },
    rawResult: string,
    result: string
  }

  export default defineComponent({
    props: {
      turn: {
        type: Object as PropType<Turn>,
        required: true,
      },
    }
  })
</script>