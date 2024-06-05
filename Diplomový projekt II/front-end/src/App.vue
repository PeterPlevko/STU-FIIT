<script setup lang="ts">
import { RouterView } from 'vue-router'
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
</script>

<template>
  <notifications position="top center" width="50%" />
  <RouterView />
</template>

<style scoped></style>
