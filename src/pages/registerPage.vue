<template>
  <div class="page">
    <h1>{{ t("register-title") }}</h1>
    <p class="subtitle">{{ t("register-subtitle") }}</p>
    <div class="form">
      <FormInput
        :label="t('form-registeration-name')"
        placeholder="Léa"
        type="text"
      />
      <FormInput
        :label="t('form-registeration-firstname')"
        placeholder="Martin"
        type="text"
      />
      <div />
      <FormSelect
        :label="t('form-registeration-city')"
        :options="[
          { label: 'grenoble', value: 'grenoble' },
          { label: 'paris', value: 'paris' },
        ]"
        other
      />
      <FormRadio
        :label="t('form-registeration-crous')"
        :options="[
          { label: t('form-registeration-crous.on'), color: 'blue' },
          { label: t('form-registeration-crous.off'), color: 'red' },
        ]"
      />
      <FormSelect
        :label="t('form-registeration-level')"
        :options="[
          { label: 'prepa', value: 'B0' },
          { label: 'L1', value: 'B1' },
          { label: 'L2', value: 'B2' },
          { label: 'L3', value: 'B3' },
          { label: 'M1', value: 'B4' },
          { label: 'M2', value: 'B5' },
          { label: 'Doctorat', value: 'B6' },
          { label: 'autre', value: 'b-1' },
        ]"
      />
    </div>
    <UiLink to="/end">{{ t("see-result") }}</UiLink>
    <UiLink to="/">{{ t("retrun-home") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import FormInput from "@/components/formElement/FormInput.vue";
import FormRadio from "@/components/formElement/FormRadio.vue";
import FormSelect from "@/components/formElement/FormSelect.vue";
import UiLink from "@/components/ui/uiLink.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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
