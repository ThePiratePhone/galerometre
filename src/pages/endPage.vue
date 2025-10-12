<template>
  <div class="page">
    <h1>{{ t("end-thank") }}</h1>
    <UiWaitLoader :percentage="(score.result / 5) * 100" />
    <p>{{ t("thank-presentation") }}</p>
    <UiLink to="/share">{{ t("share-result") }}</UiLink>
  </div>
  <div class="page">
    <h1>{{ t("help-us") }}</h1>
    <p>{{ t("help-us-presentation") }}</p>
    <UiLink to="/share">{{ t("share-form") }}</UiLink>
  </div>
  <div class="page">
    <h1>{{ t("join-us") }}</h1>
    <p>{{ t("join-us-presentation") }}</p>
    <UiLink to="/joined">{{ t("join-us-button") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import UiWaitLoader from "@/components/ui/uiWaitLoader.vue";
import reqestManager from "@/tools/reqestManager";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const score = reqestManager.score();
window.localStorage.setItem("score", score.result);
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
