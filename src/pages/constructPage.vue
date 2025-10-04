<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else-if="data === 'error'">
    <p>Error while loading the form</p>
  </div>
  <div v-else class="page">
    <h1 class="title">{{ data.name }}</h1>
    <p class="subtitle">{{ data.description }}</p>
    <template v-for="field in data.fields" :key="field.qu_id">
      <template v-if="field.qu_format === 'text'">
        <FormInput
          :label="field.qu_text"
          type="text"
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requeredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'number'">
        <FormInput
          :label="field.qu_text"
          type="number"
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requeredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'select'">
        <div>coucou</div>
        <FormSelect
          :label="field.qu_text"
          :options="
            Object.entries(field.qu_issues).map(([key, label]) => ({
              label: label as string,
              value: key,
            }))
          "
          other
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requeredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
    </template>
    <UiLink @click="next">{{ t("next-pages") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import FormInput from "@/components/formElement/FormInput.vue";
import FormSelect from "@/components/formElement/FormSelect.vue";
import UiLink from "@/components/ui/uiLink.vue";
import { saveResponse } from "@/tools/jsTools";
import reqestManager from "@/tools/reqestManager";
import type { pageType } from "@/types/request";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const route = useRoute();
const { locale, t } = useI18n();

const page = route.params.page;
const data = ref<"error" | Awaited<pageType>>("error");
const isLoading = ref(true);
const requeredOnSubmit = ref(false);
const dataAwnser = ref<{ id: number; answer: string }[]>([]);

onMounted(async () => {
  try {
    const result = await reqestManager.questions(locale.value, Number(page));
    if (result !== "error") {
      data.value = result;
      dataAwnser.value = result.fields.map((field) => ({
        id: field.qu_id,
        answer: "",
      }));
    } else {
      data.value = "error";
    }
  } catch (error) {
    console.error(error);
    data.value = "error";
  } finally {
    isLoading.value = false;
  }
});

function updateAnswer(id: number, value: string) {
  const target = dataAwnser.value.find((f) => f.id === id);
  if (target) {
    target.answer = value;
  }
}

function getAnswer(id: number) {
  return dataAwnser.value.find((f) => f.id === id)?.answer || "";
}

function next() {
  if (dataAwnser.value.some((f) => f.answer === "")) {
    requeredOnSubmit.value = true;
    return;
  }
  saveResponse(dataAwnser.value);
  window.location.href =
    "/autoPage/" + (data.value !== "error" ? data.value.page_id + 1 : 1);
}
</script>

<style lang="css" scoped>
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
