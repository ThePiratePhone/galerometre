<template>
  <div class="page">
    <h1>{{ t("register-title") }}</h1>
    <p class="subtitle">{{ t("register-subtitle") }}</p>
    <div class="form">
      <FormInput
        :label="t('form-registeration-name')"
        placeholder="Léa"
        type="text"
        @input="(value) => (name = value)"
        :errored="requeredOnSubmit && name === ''"
      />
      <FormInput
        :label="t('form-registeration-firstname')"
        placeholder="Martin"
        type="text"
        @input="(value) => (firstName = value)"
        :errored="requeredOnSubmit && firstName === ''"
      />
      <div />
      <FormSelect
        :label="t('form-registeration-city')"
        :options="[
          { label: 'grenoble', value: 'grenoble' },
          { label: 'paris', value: 'paris' },
        ]"
        other
        @input="(value) => (location = value)"
        :errored="requeredOnSubmit && location === ''"
      />
    </div>
    <UiLink @click="next">{{ t("see-result") }}</UiLink>
    <UiLink to="/">{{ t("retrun-home") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import FormInput from "@/components/formElement/FormInput.vue";
import FormSelect from "@/components/formElement/FormSelect.vue";
import UiLink from "@/components/ui/uiLink.vue";
import { saveResponse } from "@/tools/jsTools";
import reqestManager from "@/tools/reqestManager";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const location = ref("");
const name = ref("");
const firstName = ref("");
const requeredOnSubmit = ref(false);

function next() {
  if (name.value === "" || firstName.value === "" || location.value === "") {
    requeredOnSubmit.value = true;
    return;
  }

  reqestManager.createAccont(location.value);
  saveResponse([
    { id: "name", answer: name.value },
    { id: "firstName", answer: firstName.value },
    { id: "location", answer: location.value },
  ]);

  window.location.href = "/autoPage/1";
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
