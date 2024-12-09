<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>