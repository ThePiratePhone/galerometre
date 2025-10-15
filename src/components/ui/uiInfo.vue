<template>
  <div class="uiInfo">
    <img src="@/assets/question-mark.svg" alt="interogation" height="15px" />
    <div>{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<style lang="scss" scoped>
.uiInfo {
  background-color: var(--blue-light);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(100% - 20px);

  img {
    padding: 10px;
    background-color: var(--blue-dark);
    border-radius: 100%;
    width: 15px;
    height: 15px;
  }
}
</style>
