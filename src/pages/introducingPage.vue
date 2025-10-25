<template>
  <div class="page">
    <h1>{{ t("intro-title") }}</h1>
    <p class="subtitle">{{ t("intro-subtitle") }}</p>
    <div class="form">
      <FormSelect
        :label="t('form-registeration-city')"
        :options="[
          { label: 'Artois', value: 'Artois' },
          { label: 'Besançon', value: 'Besançon' },
          { label: 'Chambéry', value: 'Chambéry' },
          { label: 'Compiègne', value: 'Compiègne' },
          { label: 'Grenoble', value: 'grenoble' },
          { label: 'La Rochelle', value: 'Rochelle' },
          { label: 'Lille', value: 'Lille' },
          { label: 'Limoges', value: 'Limoges' },
          { label: 'Littoral', value: 'Littoral' },
          { label: 'Lyon', value: 'lyon' },
          { label: 'PARIS 13', value: 'P13' },
          { label: 'PARIS 8', value: 'P8' },
          { label: 'Paris', value: 'paris' },
          { label: 'Picardie', value: 'Picardie' },
          { label: 'Saint-Etienne', value: 'Saint-Etienne' },
          { label: 'Valence', value: 'valence' },
          { label: 'Valenciennes', value: 'valenciennes' },
        ]"
        other
        @input="(value) => (location = value)"
        :errored="requiredOnSubmit && location === ''"
      />
    </div>
    <UiLink @click="next">{{ t("next-pages") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import FormSelect from "@/components/formElement/FormSelect.vue";
import UiLink from "@/components/ui/uiLink.vue";
import { router } from "@/main";
import { saveResponse } from "@/tools/jsTools";
import reqestManager from "@/tools/reqestManager";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const location = ref("");
const requiredOnSubmit = ref(false);

function next() {
  requiredOnSubmit.value = false;

  if (location.value === "") {
    requiredOnSubmit.value = true;
    return;
  }

  saveResponse("location", location.value);

  reqestManager.updateAccount({ location: location.value });

  router.push({ path: "/page/1" });
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  margin: 2vh;
  padding: 2vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  h1,
  p {
    margin: 0 auto;
    text-align: center;
  }

  p {
    font-size: small;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
