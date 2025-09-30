<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <RouterView />
    <FooterBar />
  </div>
</template>
<style scoped lang="scss">
.app {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
