<script setup lang="ts">
import { onMounted } from 'vue';
import { useTres } from '@tresjs/core';

onMounted(async () => {
  const { advance } = useTres();
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000);
  // });
  setInterval(advance, 1000 / 60);
});
</script>
