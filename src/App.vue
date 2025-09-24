<script setup lang="ts">
import FooterBar from "./components/footerBar.vue";
import ConstructPage from "./pages/constructPage.vue";
</script>

<template>
  <div class="app">
    <ConstructPage />
    <FooterBar />
  </div>
</template>
<style scoped lang="scss">
.app {
  background-color: var(--brand-sand);
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
