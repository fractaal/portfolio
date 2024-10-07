<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <div
      class="tw-rounded-md tw-h-6 tw-w-full"
      :style="'background-color: ' + hexColor + ';'"
    ></div>
    {{ hexColor }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: Object as () => { r: number; g: number; b: number },
    required: true,
  },
});

// rgb values are 0-1
function normalizedRgbToHex(r: number, g: number, b: number) {
  const red = Math.round(r * 255)
    .toString(16)
    .padStart(2, '0');
  const green = Math.round(g * 255)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.round(b * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const hexColor = computed(() =>
  normalizedRgbToHex(props.color.r, props.color.g, props.color.b),
);
</script>
