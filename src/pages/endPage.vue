<template>
  <h1>{{ t("end-thank") }}</h1>
  <UiWaitLoader :percentage="value" />
  <p>{{ t("thank-presentation") }}</p>
</template>

<script setup lang="ts">
import UiWaitLoader from "@/components/ui/uiWaitLoader.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const value = ref(53);
</script>
