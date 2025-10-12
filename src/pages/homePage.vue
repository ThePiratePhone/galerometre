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
    <UiLink to="/autoPage/1">{{ t("start-form") }}</UiLink>
    <UiLink to="/share">{{ t("share-form") }}</UiLink>
    <UiLink to="/end">{{ t("see-result") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import UiLink from "@/components/ui/uiLink.vue";
import reqestManager from "@/tools/reqestManager";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const affiliation = computed(() => route.params.id);
onMounted(() => {
  reqestManager.createAccont(
    Array.isArray(affiliation.value) ? affiliation.value[0] : affiliation.value
  );
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
    border: 1px solid silver;
    color: gray;
  }
}
</style>
