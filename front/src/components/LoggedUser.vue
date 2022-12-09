<template>
  <span>Logged as <b>{{ username }}</b></span>
</template>

<script setup lang="ts">
const props = defineProps(['username'])
</script>