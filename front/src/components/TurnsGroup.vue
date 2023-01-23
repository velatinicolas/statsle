<template>
  <fieldset class="turns-group">
    <legend>
      {{ groupTitle }}&nbsp;<button class="share-group" @click="share()">
        {{ shareButtonLabel }}
      </button>
    </legend>
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
import { timer } from "rxjs";
import { defineComponent, type PropType } from "vue";
import TurnDisplay from "./TurnDisplay.vue";

export default defineComponent({
  setup() {
    const statleApiClientStore = useStatleApiClientStore();
    return { statleApiClientStore };
  },
  data() {
    return {
      shareButtonLabel: "Share",
    };
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
  methods: {
    share() {
      const sharedContent = [
        `My results of the ${this.groupTitle} on https://www.statsle.fr`,
      ];
      this.turns.forEach((turn) => {
        const result = turn.result === "WON" ? "✅" : "❌";
        let line = `➜ ${turn.game.challenge.name} #${turn.game.number} ${result}`;

        if (turn.score) {
          line += ` - score ${turn.score}`;
        }

        if (turn.combo > 1) {
          line += ` - combo ${turn.combo} 🔥`;
        }

        sharedContent.push(line);
      });

      navigator.clipboard.writeText(sharedContent.join("\n"));
      this.shareButtonLabel = "Copied! ✅";
      timer(2000).subscribe(() => {
        this.shareButtonLabel = "Share";
      });
    },
  },
  components: { TurnDisplay },
});
</script>
