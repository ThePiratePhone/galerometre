<template>
  <div class="page">
    <div class="logo-wraper">
      <img
        src="../../src/assets/logoWhite.png"
        alt="Logo du Galéromètre"
        width="300"
      />
      <p>
        {{ t("home-presentation") }}
      </p>
    </div>
    <div class="spoler">
      {{ t("home-spoler") }}
    </div>
    <UiLink to="/form">{{ t("start-form") }}</UiLink>
    <UiLink to="/share">{{ t("share-form") }}</UiLink>
    <button to="/result">{{ t("see-result") }}</button>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
.page {
  margin: 2vh;
  padding: 2vh;
  border: 1px solid silver;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  .logo-wraper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    text-align: justify;
    line-height: 1.5em;
  }

  .spoler {
    font-size: 0.8em;
    color: gray;
    text-align: center;
    background-color: #f5f5f7;
    padding: 2vh;
    border-radius: 10px;
    border: 1px solid silver;
  }

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 1em;
    border-radius: 10px;
    font-size: 1em;
    cursor: pointer;
  }
}
</style>
