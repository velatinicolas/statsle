<template>
  <div class="raw-result" v-if="showRawResult">{{ turn.rawResult }}</div>
  <div @mouseover="showRawResult = true" @mouseleave="showRawResult = false">
    <a
      :href="turn.game.challenge.url"
      target="_blank"
      rel="noopener noreferer"
      >{{ turn.game.challenge.name }}</a
    >
    #{{ turn.game.number }}
    {{ resultIcon }}
    <span v-if="turn.summarizedScore"> - {{ turn.summarizedScore }}</span>
    <span v-if="turn.combo > 1"> - combo {{ turn.combo }} 🔥</span>
    <button title="Share" class="share-raw-result" @click="share()">
      {{ shareButtonLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { TurnInterface } from "@/interfaces/from-api.interface";
import { timer } from "rxjs";

export default defineComponent({
  data() {
    return {
      showRawResult: false,
      shareButtonLabel: "📋",
    };
  },
  props: {
    turn: {
      type: Object as PropType<TurnInterface>,
      required: true,
    },
  },
  computed: {
    resultIcon() {
      switch (this.turn.result) {
        case "WON":
          return "✅";
        case "ONGOING":
          return "🔁";
        default:
          return "❌";
      }
    },
  },
  methods: {
    share() {
      navigator.clipboard.writeText(this.turn.rawResult);
      this.shareButtonLabel = "✅";
      timer(2000).subscribe(() => {
        this.shareButtonLabel = "📋";
      });
    },
  },
});
</script>
