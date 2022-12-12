<template>
  <router-link :to="path" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">
      {{ label }}
    </button>
  </router-link>
</template>

<script setup lang="ts">
defineProps(["path", "label"]);
</script>
