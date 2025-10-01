<template>
  <div class="end-page">
    <h1>{{ t("end-thank") }}</h1>
    <UiWaitLoader :percentage="value" />
    <p>{{ t("thank-presentation") }}</p>
    <h2>{{ t("help-us") }}</h2>
    <p>{{ t("help-us-presentation") }}</p>
    <span>
      <UiLink to="/">{{ t("retrun-home") }}</UiLink>
      <UiLink to="/share">{{ t("share-form") }}</UiLink>
      <UiLink to="/result">{{ t("see-result") }}</UiLink>
    </span>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import UiWaitLoader from "@/components/ui/uiWaitLoader.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const value = ref(53);
</script>

<style scoped lang="scss">
.end-page {
  h2 {
    margin: 1vh auto;
  }

  span {
    display: flex;
    justify-content: space-around;
  }
}
</style>
