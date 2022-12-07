<template>
  Logged as {{ username }}
</template>

<script setup lang="ts">
const props = defineProps(['username'])
</script>