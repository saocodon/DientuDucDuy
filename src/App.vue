<template>
  <div v-if="error" class="q-pa-lg text-negative">
    <h5>Application Error</h5>
    <pre>{{ error }}</pre>
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import { useUserStore } from './stores/user';

const error = ref<Error | null>(null);
const userStore = useUserStore();

onErrorCaptured((err) => {
  error.value = err;
  console.error('Global error:', err);
  return false;
});

try {
  userStore.initAuth();
} catch (err) {
  error.value = err as Error;
  console.error('Auth initialization error:', err);
}
</script>

<style>
pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
