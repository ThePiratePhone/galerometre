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
        :errored="requiredOnSubmit && name === ''"
      />
      <FormInput
        :label="t('form-registeration-firstname')"
        placeholder="Martin"
        type="text"
        @input="(value) => (firstName = value)"
        :errored="requiredOnSubmit && firstName === ''"
      />
      <FormInput
        type="tel"
        :label="t('form-registeration-phone')"
        placeholder="0712345678"
        @input="(value) => (tel = value)"
      ></FormInput>
      <FormInput
        type="mail"
        :label="t('form-registeration-mail')"
        :placeholder="`${name ? name : 'pierre'}.${firstName ? firstName : 'martin'}@mail.com`"
        @input="(value) => (email = value)"
      ></FormInput>
      <div />
      <FormSelect
        :label="t('form-registeration-city')"
        :options="[
          { label: 'grenoble', value: 'grenoble' },
          { label: 'paris', value: 'paris' },
        ]"
        other
        @input="(value) => (location = value)"
        :errored="requiredOnSubmit && location === ''"
      />
    </div>
    <UiLink @click="next">{{ t("see-result") }}</UiLink>
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
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const location = ref("");
const name = ref("");
const firstName = ref("");
const tel = ref("");
const email = ref("");
const requiredOnSubmit = ref(false);

function next() {
  if (name.value === "" || firstName.value === "" || location.value === "") {
    requiredOnSubmit.value = true;
    return;
  }

  saveResponse("name", name.value);
  saveResponse("firstName", firstName.value);
  saveResponse("location", location.value);

  reqestManager.updateAccount(
    location.value,
    email.value,
    tel.value,
    firstName.value,
    name.value
  );

  router.push({ path: "/end" });
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
