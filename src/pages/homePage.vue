<template>
  <h1>{{ t("welcome-home-page") }}</h1>
  <p>{{ t("home-presentation") }}</p>
  <span class="home-button-wrapper">
    <UiLink to="/form">{{ t("compete-form") }}</UiLink>
    <UiLink to="/share">{{ t("share-form") }}</UiLink>
    <UiLink to="/result">{{ t("see-result") }}</UiLink>
  </span>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
h1 {
  margin: 0 auto;
}

p {
  margin: 2vh;
}
.home-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}
</style>
