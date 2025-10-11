<template>
  <div class="page">
    <h1>{{ t("joined-us") }}</h1>
    <p>{{ t("joined-us-presentation") }}</p>
    <UiLink to="/end">{{ t("see-result") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import { useI18n } from "vue-i18n";
import confetti from "canvas-confetti";
import { onMounted } from "vue";
import reqestManager from "@/tools/reqestManager";

const { t } = useI18n();

onMounted(() => {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    dropRate: 5,
  });
  reqestManager.updateAccount(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "true"
  );
});
</script>

<style lang="scss" scoped>
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
