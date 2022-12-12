<template>
  <span
    >Logged as <b>{{ username }}</b></span
  >
</template>

<script setup lang="ts">
defineProps(["username"]);
</script>
