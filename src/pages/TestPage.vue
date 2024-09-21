<template>
  <q-page>
    <Suspense>
      <FancyWaves :speed="1" :noise-strength="1" />
    </Suspense>
  </q-page>
</template>

<script setup lang="ts">
import FancyWaves from 'src/components/FancyWaves.vue';
</script>
