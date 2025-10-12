<template>
  <div class="page">
    <h1>{{ t("share-title") }}</h1>
    <p>{{ t("share-presentation") }}</p>
    <!-- %0D%0A is an break line sympbol -->
    <UiLink
      :href="`sms:&body=${t('share-sms-link', { n: score })}%0D%0A${'https://precariscore.qamp.fr'}`"
      >{{ t("share-sms") }}</UiLink
    >
    <UiLink
      :href="`mailto:?body=${t('share-sms-link', { n: score })}%0D%0A${'https://precariscore.qamp.fr'}`"
      >{{ t("share-mail") }}</UiLink
    >
    <UiLink @click="copy">{{ t("share-copy-link") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import reqestManager from "@/tools/reqestManager";
import confetti from "canvas-confetti";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

function copy() {
  navigator.clipboard.writeText("https://precariscore.qamp.fr");
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    dropRate: 5,
  });
}

const score = computed(() => {
  return window.localStorage.getItem("score") ?? reqestManager.score();
});
</script>

<style scoped lang="scss">
.page {
  margin: 2vh;
  padding: 2vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  h1 {
    text-align: center;
  }
}
</style>
